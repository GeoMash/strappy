/**
 * @class framework.data.Transaction
 * 
 * Model Transaction Utility.
 * 
 * 
 * Example:
	var store			=this.getStore('File'),
		model1			=store.getById(112),
		model2			=store.getById(119),
		transaction		=new framework.data.Transaction(false),
		clonedModel1	=transaction.attachModel(model1),
		clonedModel2	=transaction.attachModel(model2);

	clonedModel1.set('name','Foo');
	clonedModel2.set('name','Bar');

	transaction.execute
	(
		{
			onSuccess:	function()
			{
				//Don't actually ever unlock like this - this is for example only!!!
				model1.lock(framework.mvc.Model.LOCK_NONE);
				model2.lock(framework.mvc.Model.LOCK_NONE);
				console.debug(model1.get('name'),model2.get('name'));
				transaction.commit();
				console.debug(model1.get('name'),model2.get('name'));
				console.debug('Transaction success!');
			}.bind(this),
			onFailure: function()
			{
				transaction.rollback();
				console.debug('Transaction failure!');
			}
		}
	);
 * <br>
 * With Memory Proxy:
	var store			=this.getStore('File'),
		model1			=store.getById(112),
		model2			=store.getById(119),
		transaction		=new framework.data.Transaction(false),
		clonedModel1	=transaction.attachModel(model1),
		clonedModel2	=transaction.attachModel(model2);

	clonedModel1.set('name','Foo');
	clonedModel2.set('name','Bar');
	
	//Don't actually ever unlock like this - this is for example only!!!
	model1.lock(framework.mvc.Model.LOCK_NONE);
	model2.lock(framework.mvc.Model.LOCK_NONE);
	console.debug(model1.get('name'),model2.get('name'));
	transaction.commit();
	console.debug(model1.get('name'),model2.get('name'));
 * 
 * @uses framework.data.Queue
 * @uses framework.mvc.Model
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework.data',
		$name:			'Transaction'
	}
)
(
	{
		/**
		 * @property STATE_INIT The Transaction has been initalized but not started.
		 * @static
		 */
		STATE_INIT:			0,
		/**
		 * @property STATE_STARTED The transaction has started.
		 * @static
		 */
		STATE_STARTED:		1,
		/**
		 * @property STATE_COMITTED The transaction has been comitted.
		 * @static
		 */
		STATE_COMITTED:		2,
		/**
		 * @property STATE_COMPLETE The transaction has been comitted.
		 * @static
		 */
		STATE_COMPLETE:		4,
		/**
		 * @property STATE_SUCCESS The transaction was successful.
		 * @static
		 */
		STATE_SUCCESS:		8,
		/**
		 * @property STATE_FAILED The transaction failed.
		 * @static
		 */
		STATE_FAILED:		16,
		/**
		 * @property STATE_ROLLEDBACK The transaction failed.
		 * @static
		 */
		STATE_ROLLEDBACK:	32
		
	},
	{
		models:		[],
		queue:		false,
		state:		0,
		lockState:	'full',
		/**
		 * @constructor
		 * 
		 * Sets up the transaction object, enabling or disabling queueing.
		 * 
		 * @param {Boolean} queue True if queueing is enabled.
		 * @return {framework.data.Transaction}
		 */
		init: function(queue)
		{
			if (queue!==false)
			{
				this.queue=new framework.data.Queue();
			}
		},
		/**
		 * Attaches a model to the transaction. This method will return a cloned instance
		 * of the model. All changes to the cloned instance will be reflected on the original
		 * model once the transaction has been comitted.
		 * 
		 * @param {framework.mvc.Model} model The model to attach to the transaction.
		 * @return {framework.data.Transaction} A clone of the original model.
		 */
		attachModel: function(model)
		{
			if (Object.isDefined(model)
			&& Object.isFunction(model.$reflect)
			&& (model.$reflect('extends')==framework.mvc.Model))
			{
				/**
				 * If the model has an attached store, inform it that
				 * this model has been attached to a transaction.
				 */
				var store=model.getStore();
				if (store)
				{
					store.informModelIsInTransaction(model,this);
				}
				model.lock(this.lockState);
				var clone=model.clone();
				model.attachPhantom(clone);
				this.models.push(model);
				
				if (this.queue)
				{
					this.queue.attachProxy(model.getStore().getProxy());
				}
				return clone;
			}
			else
			{
				throw new Error('Transactions can only be used with Models.');
			}
		},
		/**
		 * Starts the transaction process. Automatically calls {@see framework.Transaction#fullLock}.
		 * @return {framework.data.Transaction} this
		 */
		start: function()
		{
			this.state|=framework.data.Transaction.STATE_STARTED;
			this.fullLock();
			return this;
		},
		/**
		 * Executes the transaction.
		 * 
		 * @param {Object} config A config object.
		 * @param {Function} config.onSuccess Called when the transaction is successful.
		 * @param {Function} config.onFailure Called when the transaction has failed.
		 * @return {framework.data.Transaction} this
		 */
		execute: function(config)
		{
			var models=
			{
				total:	this.models.length,
				done:	0,
				fails:	0
			};
			$JSKK.when(models,{object:'done',value:models.total}).isEqualTo
			(
				function()
				{
					if (models.fails===0)
					{
						if (Object.isFunction(config.onSuccess))
						{
							config.onSuccess();
						}
					}
					else
					{
						if (Object.isFunction(config.onFailure))
						{
							config.onFailure();
						}
					}
				}.bind(this)
			);
			this.models.each
			(
				function(model)
				{
					//Fetch the the phantom model.
					var	phantom=model.getPhantom();
					
					//Check if anything was changed.
					if (phantom.isDirty())
					{
						/* The phantom model was changed, so submit this to the
						 * server if the original model has an associated store & proxy.
						 */
						if (model.getStore())
						{
							phantom	.bindStore(model.getStore())
									.sync
									(
										{
											onSuccess: function()
											{
												models.done++;
											},
											onFailure: function()
											{
												models.done++;
												models.fails++;
											}
										}
									)
									.unbindStore();
						}
					}
				}
			);
			if (this.queue)
			{
				this.queue.execute();
			}
			return this;
		},
		/**
		 * Commits the transaction.
		 * 
		 * All changes made to any of the attached model's clones will
		 * be reflected upon the original models.
		 * 
		 * @return {framework.data.Transaction} this
		 */
		commit: function()
		{
			this.state|=framework.data.Transaction.STATE_COMITTED;
			this.models.each
			(
				function(model,index)
				{
					model.lock(framework.mvc.Model.LOCK_NONE);
					model.set(model.getPhantom().getRecord());
					model.destroyPhantom();
					delete this.models[index];
				}.bind(this)
			);
			delete this.models;
			delete this;
		},
		/**
		 * Rolls back the transaction, effectively trashing all
		 * changes made to all attached models and destroying the
		 * transaction object.
		 * 
		 * @return {framework.data.Transaction} this
		 */
		rollback: function()
		{
			this.state|=framework.data.Transaction.STATE_ROLLEDBACK;
			
			this.models.each
			(
				function(model,index)
				{
					model.destroyPhantom();
					delete this.models[index];
				}.bind(this)
			);
			delete this.models;
			delete this;
		},
		/**
		 * Applies a full lock to the associated models.
		 * 
		 * @return {framework.data.Transaction} this
		 */
		fullLock: function()
		{
			this.lockState='full';
			this.models.each
			(
				function(model)
				{
					model.lock('full');
				}
			);
			return this;
			return this;
		},
		/**
		 * Applies a read-only lock to the associated models.
		 * 
		 * @return {framework.data.Transaction} this
		 */
		readOnly: function()
		{
			this.lockState='readonly';
			this.models.each
			(
				function(model)
				{
					model.lock('readonly');
				}
			);
			return this;
		}
	}
);