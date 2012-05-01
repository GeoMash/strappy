/**
 * @class framework.data.Transaction
 * 
 * 
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
		state:		0,
		lockState:	'full',
//		/**
//		 * 
//		 */
//		init: function()
//		{
//			
//		},
		attachModel: function(model)
		{
			if (Object.isDefined(model)
			&& Object.isFunction(model.$reflect)
			&& (model.$reflect('extends')==framework.mvc.Model))
			{
				model.lock(this.lockState);
				var clone=model.clone();
				model.attachPhantom(clone);
				this.models.push(model);
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
		 * 
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
						//TODO: QUEUEING!!!!
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
		},
		/**
		 * Commits the transaction.
		 * 
		 * @return {void}
		 */
		commit: function()
		{
			this.state|=framework.data.Transaction.STATE_COMITTED;
			this.models.each
			(
				function(model,index)
				{console.debug(model,framework.mvc.Model.LOCK_NONE);
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