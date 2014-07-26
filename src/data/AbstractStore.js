/**
 * @class strappy.data.AbstractStore
 * @abstract
 * 
 * This is the base store of which all other stores extend from.
 * 
 * You should never use this store directly.
 * 
 * @uses strappy.trait.ComponentConnector
 * @uses $JSKK.trait.Observable
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.data',
		$name:			'AbstractStore',
		$abstract:		true,
		$uses:
		[
			'strappy.trait.ComponentConnector',
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		/**
		 * @property [events] A list of observable events.
		 * @property [events.onChange] Fired whenever anything in the store is changed.
		 * @property [events.onSync] Fired whenever the store is synced.
		 * @property [events.onSyncFailed] Fired whenever the store is synced and the sync fails.
		 * @property [events.onModelLockChange] Fired whenever the lock state of the containing models changes.
		 * @private
		 */
		events:
		{
			onChange:			true,
			onSync:				true,
			onSyncFailed:		true,
			onModelChange:		true,
			onModelRemove:		true,
			onModelLockChange:	true
		},
		/**
		 * @property {strappy.data.proxy.AbstractProxy} proxy
		 * @public
		 */
		proxy:			null,
		
		/**
		 * @property {Object} Config which is passed to the proxy when it is initialised.
		 * @public
		 */
		proxyConfig:	{},
		/**
		 * @property {strappy.data.AbstractStore} Which store was is this store sharing data with.
		 * @private
		 */
		sharedFrom:		null,
		/**
		 * @property {strappy.mvc.Model} model A model object which new models will be created from
		 * @private
		 */
		model:			null,
		/**
		 * @property {Object} data initial record to start the store with.
		 * @private
		 */
		data:			{},
		/**
		 * @property {strappy.mvc.Model} record Represents the model instance.
		 * @private
		 */
		record:			null,
		
		transactions:	[],
		
		ready:			false,
		
		/**
		 * @constructor
		 * Sets up and validates the store.
		 * 
		 * @return {strappy.data.AbstractStore}
		 */
		init: function()
		{
			var ready		=0,
				readyLimit	=0;
			if (Object.isString(this.sharedFrom))
			{
				this.sharedFrom=$JSKK.namespace(this.sharedFrom);
			}
			if (Object.isNull(this.proxy))
			{
				this.proxy=new strappy.data.proxy.MemoryProxy();
			}
			else if (Object.isString(this.proxy))
			{
				readyLimit++;
				try
				{
					this.proxy=new ($JSKK.strToObject(this.proxy))(this.proxyConfig);
					ready++;
				}
				catch(e)
				{
					$JSKK.require
					(
						this.proxy,
						function()
						{
							this.proxy=new ($JSKK.namespace(this.proxy))(this.proxyConfig);
							ready++;
						}.bind(this)
					);
				}
			}
			else
			{
				console.trace();
				throw new Error('Store didn\'t have a bindable proxy!');
			}
			if (Object.isString(this.model))
			{
				readyLimit++;
				try
				{
					this.model=$JSKK.strToObject(this.model);
					ready++;
				}
				catch(e)
				{
					$JSKK.require
					(
						this.model,
						function()
						{
							this.model=$JSKK.namespace(this.model);
							ready++;
						}.bind(this)
					);
				}
			}
			$JSKK.when
			(
				function()
				{
					return (ready==readyLimit);
				}
			).isTrue
			(
				function()
				{
					this.ready=true;
				}.bind(this)
			);
		},
		/**
		 * Creates a new model instance based on the attached model
		 * and returns it.
		 * 
		 * Also binds locking events to the model which handles chaining
		 * model lock change events to the store's onModelLockChange event.
		 * 
		 * @param {Object} record an object representing the model.
		 * @return {strappy.mvc.Model}
		 */
		newRecord: function(record)
		{
			var model=this.model;
			if  (this.isShared())
			{
				model=this.getShared().model;
			}
			return new model
			(
				{
					onLockChange: function(model,lockState)
					{
						this.fireEvent('onModelLockChange',this,model,lockState);
					}.bind(this)
				},
				record
			);
		},
		/**
		 * Binds (enables) change events to store.
		 * 
		 * @param record {strappy.mvc.Model}
		 * @returns {strappy.data.AbstractStore}
		 */
		bindChangeEvent: function(record)
		{
			var fullStoreName=this.$reflect('namespace')+'.'+this.$reflect('name');
			if (Object.isUndefined(record._storeChangeEvent[fullStoreName]))
			{
				record._storeChangeEvent[fullStoreName]=this.onModelChange.bind(this);
			}
			else
			{
				record.unobserve('onChange',record._storeChangeEvent[fullStoreName]);
			}
			record.observe('onChange',record._storeChangeEvent[fullStoreName]);
			return this;
		},
		/**
		 * Unbinds (disables) change events to store.
		 * 
		 * @param record {strappy.mvc.Model}
		 * @returns {strappy.data.AbstractStore}
		 */
		bindRemoveEvent: function(record)
		{
			var fullStoreName=this.$reflect('namespace')+'.'+this.$reflect('name');
			if (Object.isUndefined(record._storeRemoveEvent[fullStoreName]))
			{
				record._storeRemoveEvent[fullStoreName]=this.onModelRemove.bind(this);
			}
			else
			{
				record.unobserve('onRemove',record._storeRemoveEvent[fullStoreName]);
			}
			record.observe('onRemove',record._storeRemoveEvent[fullStoreName]);
			return this;
		},
		/**
		 * Private callback to handle model change events.
		 * 
		 * @private
		 * @param model {strappy.data.AbstractStore}
		 * @return {void}
		 */
		onModelChange: function(model)
		{
			/*
			 * Check if the model is in a transaction.
			 * 
			 * If the model is not in a transaction, fire the
			 * onModelChange and onChange events.
			 * 
			 * If the model is in a transaction, find the transaction
			 * and check if it is the last model in the transaction.
			 * 
			 * 	*	If it is not the last model in the transaction,
			 * 		only remove the model from the transaction's model list.
			 * 		
			 * 	*	If it is the last model in the transaction, remove the
			 * 		model from the transaction's model list and remove the
			 * 		transaction from the transaction list.
			 * 		Then fire the onChange event.
			 * 		
			 */
			if (this.isModelInAnyTransaction(model))
			{
				var index=false;
				for (var i=0,j=this.transactions.length; i<j; i++)
				{
					if (index)break;
					for (var k=0,l=this.transactions[i].models.length; k<l; k++)
					{
						if (this.transactions[i].models[k]==model)
						{
							index=i;
							break;
						}
					}
				}
				if (index!==false)
				{
					if (this.transactions[index].models.length===1)
					{
						this.releaseModelFromTransaction(model,this.transactions[index].transaction);
						this.releaseTransaction(this.transactions[index].transaction);
						this.fireEvent('onChange',this,model);
					}
					else
					{
						this.releaseModelFromTransaction(model,this.transactions[index].transaction);
					}
				}
				else
				{
					throw new Error('Unable to locate a model within a transaction. BTW, this should never happen! IOW - You\'re screwed :)');
				}
			}
			else
			{
				this.fireEvent('onModelChange',this,model);
				// this.fireEvent('onChange',this,model);
			}
		},
		/**
		 * Private callback to handle model remove events.
		 * 
		 * @private
		 * @param model {strappy.data.AbstractStore}
		 * @return {void}
		 */
		onModelRemove: function(model)
		{
			/*
			 * Check if the model is in a transaction.
			 * 
			 * If the model is not in a transaction, fire the
			 * onModelRemove and onRemove events.
			 * 
			 * If the model is in a transaction, find the transaction
			 * and check if it is the last model in the transaction.
			 * 
			 * 	*	If it is not the last model in the transaction,
			 * 		only remove the model from the transaction's model list.
			 * 		
			 * 	*	If it is the last model in the transaction, remove the
			 * 		model from the transaction's model list and remove the
			 * 		transaction from the transaction list.
			 * 		Then fire the onRemove event.
			 * 		
			 */
			if (this.isModelInAnyTransaction(model))
			{
				var index=false;
				for (var i=0,j=this.transactions.length; i<j; i++)
				{
					if (index)break;
					for (var k=0,l=this.transactions[i].models.length; k<l; k++)
					{
						if (this.transactions[i].models[k]==model)
						{
							index=i;
							break;
						}
					}
				}
				if (index!==false)
				{
					if (this.transactions[index].models.length===1)
					{
						this.releaseModelFromTransaction(model,this.transactions[index].transaction);
						this.releaseTransaction(this.transactions[index].transaction);
						this.fireEvent('onChange',this,model);
					}
					else
					{
						this.releaseModelFromTransaction(model,this.transactions[index].transaction);
					}
				}
				else
				{
					throw new Error('Unable to locate a model within a transaction. BTW, this should never happen! IOW - You\'re screwed :)');
				}
			}
			else
			{
				this.fireEvent('onModelRemove',this,model);
				// this.fireEvent('onChange',this,model);
			}
		},
		/**
		 * Returns the attached model (not an instance of it).
		 * 
		 * @return {strappy.mvc.Model}
		 */
		getModel: function()
		{
			return this.model;
		},
		/**
		 * Generic getter.
		 * 
		 * @return {Mixed}
		 */
		get: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * Generic setter.
		 * 
		 * @return  {strappy.data.AbstractStore} this
		 */
		set: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * This method will check if the attached model is dirty. If so,
		 * it will send it to the server. Otherwise it will ignore the model
		 * and simply request a new one.
		 * 
		 * @return {strappy.data.SingleModelStore}
		 */
		sync: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * Sets a new proxy on the store.
		 * 
		 * @return {strappy.data.AbstractStore} this
		 */
		setProxy: function(proxy)
		{
			this.proxy=proxy;
			return this;
		},
		/**
		 * Returns the attached proxy.
		 * 
		 * @return {strappy.data.proxy.AbstractProxy} The attached proxy.
		 */
		getProxy: function()
		{
			return this.proxy;
		},
		/**
		 * Checks the state of the store to determine weather or not this
		 * 
		 * @return {Boolean} true if the store is dirty.
		 */
		isDirty: $JSKK.Class.ABSTRACT_METHOD,
		
		/**
		 * Checks if this store is attached to a shared store.
		 * 
		 * @return {Boolean} True if the store is a shared store.
		 */
		isShared: function()
		{
			return (Object.isAssocArray(this.sharedFrom) && Object.isFunction(this.sharedFrom.$reflect));
		},
		
		getShared: function()
		{
			return this.sharedFrom;
		},
		
		informModelIsInTransaction: function(model,transaction)
		{
			if (!this.hasRecordedTransaction(transaction))
			{
				this.recordTransaction(transaction);
			}
			
			if (this.isModelInAnyTransaction(model)
			&& !this.isModelInTransaction(model,transaction))
			{
				throw new Error('A model cannot be attached to two transactions at any given time.');
			}
			if (!this.isModelInTransaction(model,transaction))
			{
				this.recordModelInTransaction(model,transaction);
			}
		},
		hasRecordedTransaction: function(transaction)
		{
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction==transaction)
				{
					return true;
				}
			}
		},
		recordTransaction: function(transaction)
		{
			this.transactions.push({transaction:transaction,models:[]});
			return this;
		},
		releaseTransaction: function(transaction)
		{
			var newArray=[];
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction!=transaction)
				{
					newArray.push(this.transactions[i]);
				}
			}
			this.transactions=newArray;
			return this;
		},
		isModelInTransaction: function(model,transaction)
		{
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction==transaction)
				{
					for (var k=0,l=this.transactions[i].models.length; k<l; k++)
					{
						if (this.transactions[i].models[k]==model)
						{
							return true;
						}
					}
				}
			}
			return false;
		},
		isModelInAnyTransaction: function(model)
		{
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				for (var k=0,l=this.transactions[i].models.length; k<l; k++)
				{
					if (this.transactions[i].models[k]==model)
					{
						return true;
					}
				}
			}
			return false;
		},
		recordModelInTransaction: function(model,transaction)
		{
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction==transaction)
				{
					this.transactions[i].models.push(model);
					break;
				}
			}
			return this;
		},
		releaseModelFromTransaction: function(model,transaction)
		{
			var newArray=[];
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction==transaction)
				{
					for (var k=0,l=this.transactions[i].models.length; k<l; k++)
					{
						if (this.transactions[i].models[k]!=model)
						{
							newArray.push(this.transactions[i].models[k]);
						}
					}
					this.transactions[i].models=newArray;
					break;
				}
			}
			return this;
		},
		getTransmissionType: function()
		{
			var	uses	=this.proxy.$reflect('uses'),
				types	=[];
			for (var i=0,j=uses.length; i<j; i++)
			{
				if (uses.indexOf('strappy.data.trait.Syncable')!==-1)
				{
					types.push('sync');
					break;
				}
				else if (uses.indexOf('strappy.data.trait.CRUD')!==-1)
				{
					types.push('crud');
					break;
				}
				else if (uses.indexOf('strappy.data.trait.GSRC')!==-1)
				{
					types.push('gsrc');
					break;
				}
			}
			return types;
		}
	}
);