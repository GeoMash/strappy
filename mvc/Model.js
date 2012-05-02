/**
 * @class framework.mvc.Model
 * 
 * 
 * @abstract
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'framework.mvc',
		$name:		'Model'
	}
)
(
	{
		LOCK_NONE:		'none',
		LOCK_READONLY:	'readonly',
		LOCK_FULL:		'full'
	},
	{
		dirty:		false,
		phantom:	false,
		_clone:		false,
		fields:		[],
		record:		{},
		store:		null,
		/**
		 * 
		 * @property {String} lockState This property will block behaviours on this store depending on its state.
		 * @private
		 */
		lockState:	'none',
		/**
		 * 
		 */
		init: function(record)
		{
			if (Object.isDefined(record))
			{
				this.record=Object.clone(this.fields);
				for (var field in this.fields)
				{
					if (Object.isDefined(record[field]))
					{
						this.record[field]=record[field];
					}
				}
			}
			else
			{
				for (var field in this.fields)
				{
					this.record[field]=this.fields[field];
				}
			}
		},
		/**
		 * 
		 */
		bindStore: function(store)
		{
			this.store=store;
			return this;
		},
		/**
		 * 
		 */
		unbindStore: function()
		{
			this.store=null;
			return this;
		},
		/**
		 * 
		 */
		getStore: function()
		{
			return this.store;
		},
		/**
		 * This method will attach any changes to a
		 * proxy sync request.
		 * The expected response is a replacement record. 
		 * 
		 * 
		 * TODO: Detail this.
		 * 
		 * @return {framework.mvc.Model} this
		 */
		sync: function(config)
		{
			var proxy=this.getStore().getProxy();
			if (Object.isFunction(proxy.sync))
			{
				proxy.sync
				(
					{
						data:		(this.isDirty()?this.record:{}),
						onSuccess:	function(response)
						{
							this.record=response.data;
							if (!this.isClone())
							{
								this.sendSignal
								(
									framework.Signal.MODEL_DONE_SYNC,
									{
										id:			this.getID(),
										component:	this.getCmpName(),
										model:		this
									}
								);
								this.sendSignal
								(
									framework.Signal.MODEL_DONE_CHANGE,
									{
										id:			this.getID(),
										component:	this.getCmpName(),
										model:		this
									}
								);
							}
							else
							{
								if (Object.isFunction(config.onSuccess))
								{
									config.onSuccess();
								}
							}
						}.bind(this),
						onFailure: function()
						{
							if (!this.isClone())
							{
								this.sendSignal
								(
									framework.Signal.MODEL_FAILED_SYNC,
									{
										id:			this.getID(),
										component:	this.getCmpName(),
										model:		this
									}
								);
							}
							else
							{
								if (Object.isFunction(config.onFailure))
								{
									config.onFailure();
								}
							}
						}.bind(this)
					}
				);
				this.flagClean();
			}
			else
			{
				throw new Exception('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached to its bound store.');
			}
			return this;
		},
		/**
		 * Fetches a record based on its index in the store.
		 * 
		 * Note: This method is affected by lock state.
		 * 
		 * @param {Number} index The index.
		 * @return {Mixed} The record.
		 */
        get: function(key)
		{
			if (this.lockState==framework.mvc.Model.LOCK_NONE
			|| this.lockState==framework.mvc.Model.LOCK_READONLY
			|| this.isClone())
			{
				return this.record[key];
			}
			else
			{
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" is in a lock state that prevents reading.');
			}
		},
		/**
		 * Gets the full record object of this model.
		 * 
		 * Note: This method is affected by lock state.
		 * 
		 * @return {Object} The record object.
		 */
		getRecord: function()
		{
			if (this.lockState==framework.mvc.Model.LOCK_NONE
			|| this.lockState==framework.mvc.Model.LOCK_READONLY
			|| this.isClone())
			{
				return this.record;
			}
			else
			{
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" is in a lock state that prevents reading.');
			}
		},
		/**
		 * Sets a record at a given index in the store.
		 * @param {Mixed} field The field OR an object containing key/value
		 * pairs of values to set.
		 * @param {Mixed} value The new value to set. Don't use this if "field" is an object.
		 */
        set: function()
		{
			
			if (this.lockState==framework.mvc.Model.LOCK_NONE || this.isClone())
			{
				var	args		=$JSKK.toArray(arguments),
					keyVals		={};
				if (Object.isDefined(args[1]))
				{
					keyVals[args.shift()]=args.shift();
				}
				else
				{
					keyVals=args.shift();
				}
				for (var field in keyVals)
				{
					this.record[field]=keyVals[field];
				}
				this.flagDirty();
			}
			else
			{
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" is in a lock state that prevents any modification.');
			}
			if (this.lockState==framework.mvc.Model.LOCK_NONE && !this.isClone())
			{
				this.getStore().sendSignal
				(
					framework.Signal.MODEL_DONE_CHANGE,
					{
						id:			this.getStore().getID(),
						component:	this.getStore().getCmpName(),
						model:		this
					}
				);
			}
		},
		/**
		 * Flags the model as being changed.
		 * @return {framework.mvc.Model} this
		 */
		flagDirty: function()
		{
			this.dirty=true;
			return this;
		},
		/**
		 * Flags the model as being unchanged.
		 * @return {framework.mvc.Model} this
		 */
		flagClean: function()
		{
			this.dirty=false;
			return this;
		},
		/**
		 * Checks to see if any modifications have been made to this model.
		 * @return {Boolean} True if the model has been changed.
		 */
		isDirty: function()
		{
			return this.dirty;
		},
		/**
		 * Checks to see if no modifications have been made to this model.
		 * @return {Boolean} True if the model has not been changed.
		 */
		isClean: function()
		{
			return !this.dirty;
		},
		/**
		 * Locks the model based on the type of lock given to this method.
		 * @param {String} lockType The type of lock. Valid lock types are:<br>
		 * * {@link framework.mvc.Model#LOCK_NONE}<br>
		 * * {@link framework.mvc.Model#LOCK_READONLY}<br>
		 * * {@link framework.mvc.Model#LOCK_FULL}<br>
		 * @param {Boolean} supressSignal Blocks the MODEL_LOCK_CHANGE signal
		 * from being fired.
		 * 
		 * @retrun {framework.data.stateful.Store}
		 */
		lock: function(lockType,supressSignal)
		{
			if (['none','readonly','full'].inArray(lockType))
			{
				this.lockState=lockType;
				if (supressSignal!==true && !this.isClone())
				{
					this.getStore().sendSignal
					(
						framework.Signal.MODEL_LOCK_CHANGE,
						{
							id:			this.getStore().getID(),
							component:	this.getStore().getCmpName(),
							model:		this,
							lock:		this.lockState
						}
					);
				}
			}
			else
			{
				throw new Error('"'+lockType+'" is an invalid lock type. Valid locks are "none", "readonly" and "full".');
			}
			return this;
		},
		/**
		 * Creates a copy of this model.
		 * 
		 * Note: This does not deep copy the model. It will simply
		 * take a snapshot of its record state and initatiate a new
		 * model of the same original with those record values.
		 * This new model isntance will not be flagged as dirty.
		 * 
		 * @return {framework.mvc.Model} The cloned instance.
		 */
		clone: function()
		{
			var clone=new (this.$reflect('self'))(this.record);
			clone._clone=true;
			return clone;
		},
		/**
		 * Checks to see if this model instance is a clone.
		 * @return {Boolean} True if the model is a clone.
		 */
		isClone: function()
		{
			return this._clone;
		},
		/**
		 * Attaches a phantom instance of this model.
		 * 
		 * Note: This is usually used with internally by transactions.
		 * 
		 * @return {framework.mvc.Model} this
		 */
		attachPhantom: function(phantomModel)
		{
			this.phantom=phantomModel;
			return this;
		},
		/**
		 * Checks to see if a phantom record has been attached.
		 * @return {Boolean} True if this model has a phantom record attached.
		 */
		hasPhantom: function()
		{
			return Boolean(this.phantom);
		},
		/**
		 * Fetches the attached phantom record. Throws an error if there is no
		 * phantom record attached.
		 * @return {framework.mvc.Model} The phantom record.
		 */
		getPhantom: function()
		{
			if (this.hasPhantom())
			{
				return this.phantom;
			}
			else
			{
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" does not have a phantom model associated with it.');
			}
		},
		/**
		 * Destroys the phantom record attached to this model.
		 * @return {framework.mvc.Model} this
		 */
		destroyPhantom: function()
		{
			delete this.phantom;
			this.phantom=null;
			return this;
		}
	}
);