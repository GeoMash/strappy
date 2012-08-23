/**
 * @class strappy.mvc.Model
 * 
 * 
 * @abstract
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc',
		$name:		'Model',
		$uses:
		[
			$JSKK.trait.Observable
		]
	}
)
(
	{
		LOCK_NONE:		'none',
		LOCK_READONLY:	'readonly',
		LOCK_FULL:		'full'
	},
	{
		events:
		{
			onSync:			true,
			onFailedSync:	true,
			onChange:		true,
			onLockChange:	true
		},
		/**
		 * @property {Boolean} dirty A flag to show weather or not the model instance has been modified
		 * since it was last synced.
		 * @private
		 */
		dirty:		false,
		/**
		 * @property {Mixed} phantom False if no cloned instance is attached. Otherwise a cloned instance of
		 * this model.
		 * @private
		 */
		phantom:	false,
		/**
		 * @property {Boolean} _clone A flag to show weather or not the model instance has been modified
		 * since it was last synced.
		 * @private
		 */
		_clone:		false,
		/**
		 * @property {String} idField The field that is used as the ID for the model instance.
		 */
		idField:	'id',
		/**
		 * @property {Array} field A list of fields and their default values.
		 */
		fields:		[],
		/**
		 * @property {Object} record The raw record for the model instance.
		 * @private
		 */
		record:		{},
		/**
		 * @property {strappy.data.AbstractStore} store The store that the model instance is attached to.
		 * @private
		 */
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
						this.record[field]=Object.clone(record[field]);
					}
				}
			}
			else
			{
				for (var field in this.fields)
				{
					this.record[field]=Object.clone(this.fields[field]);
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
		BTLSync: function()
		{
			var	store	=this.getStore(),
				target	=(store.isShared()?store.getShared():store);
			target.BTL.startQueue();
			if (this.isDirty())
			{
				target.BTL_SET
				(
					this.getRecord(),
					null,
					function(record)
					{
						this.lock(strappy.mvc.Model.LOCK_NONE,true);
						this.set(record[0]);
						this.flagClean();
						this.fireEvent('onSync',this,record);
						this.fireEvent('onChange',this,record);
					}.bind(this)
				);
			}
			else
			{
				var query={};
				query[this.idField]=this.getId();
				target.BTL_GET
				(
					null,
					query,
					function(record)
					{
						this.lock(strappy.mvc.Model.LOCK_NONE,true);
						this.set(record[0]);
						this.flagClean();
						this.fireEvent('onSync',this,record);
						this.fireEvent('onChange',this,record);
					}.bind(this)
				);
			}
			target.BTL.executeQueue();
		},
		/**
		 * This method will attach any changes to a
		 * proxy sync request.
		 * The expected response is a replacement record. 
		 * 
		 * 
		 * TODO: Detail this.
		 * 
		 * @return {strappy.mvc.Model} this
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
							if (Object.isDefined(response.data))
							{
								this.record=response.data;
							}
							else
							{
								//?
							}
							
							
							if (!this.isClone())
							{
								this.fireEvent('onSync',this);
								this.fireEvent('onChange',this);
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
								this.fireEvent('onFailedSync',this);
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
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached to its bound store.');
			}
			return this;
		},
		/**
		 * Fetches a value based on a field name.
		 * 
		 * Note: This method is affected by lock state.
		 * 
		 * @param {Number} index The index.
		 * @return {Mixed} The record.
		 */
        get: function(key)
		{
			return this.record[key];
			
			
			// if (this.lockState==strappy.mvc.Model.LOCK_NONE
			// || this.lockState==strappy.mvc.Model.LOCK_READONLY
			// || this.isClone())
			// {
			// 	return this.record[key];
			// }
			// else
			// {
			// 	console.trace();
			// 	throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" is in a lock state that prevents reading.');
			// }
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
			if (this.lockState==strappy.mvc.Model.LOCK_NONE
			|| this.lockState==strappy.mvc.Model.LOCK_READONLY
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
		 * Gets the ID of the model instance.
		 * 
		 * @return {Number} The id of the model instance.
		 */
		getId: function()
		{
			if (Object.isString(this.idField))
			{
				return this.get(this.idField);
			}
			return null;
		},
		/**
		 * Sets a record at a given index in the store.
		 * @param {Mixed} field The field OR an object containing key/value
		 * pairs of values to set.
		 * @param {Mixed} value The new value to set. Don't use this if "field" is an object.
		 */
        set: function()
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
			// if (this.lockState==strappy.mvc.Model.LOCK_NONE || this.isClone())
			// {
			// 	var	args		=$JSKK.toArray(arguments),
			// 		keyVals		={};
			// 	if (Object.isDefined(args[1]))
			// 	{
			// 		keyVals[args.shift()]=args.shift();
			// 	}
			// 	else
			// 	{
			// 		keyVals=args.shift();
			// 	}
			// 	for (var field in keyVals)
			// 	{
			// 		this.record[field]=keyVals[field];
			// 	}
			// 	this.flagDirty();
			// }
			// else
			// {
			// 	throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" is in a lock state that prevents any modification.');
			// }
			if (this.lockState==strappy.mvc.Model.LOCK_NONE && !this.isClone())
			{
				this.fireEvent('onChange',this);
			}
		},
		/**
		 * Flags the model as being changed.
		 * @return {strappy.mvc.Model} this
		 */
		flagDirty: function()
		{
			this.dirty=true;
			return this;
		},
		/**
		 * Flags the model as being unchanged.
		 * @return {strappy.mvc.Model} this
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
		 * * {@link strappy.mvc.Model#LOCK_NONE}<br>
		 * * {@link strappy.mvc.Model#LOCK_READONLY}<br>
		 * * {@link strappy.mvc.Model#LOCK_FULL}<br>
		 * @param {Boolean} supressEvent Blocks the onLockChange event
		 * from being fired.
		 * 
		 * @retrun {strappy.data.stateful.Store}
		 */
		lock: function(lockType,supressEvent)
		{
			if (['none','readonly','full'].inArray(lockType))
			{
				this.lockState=lockType;
				if (supressEvent!==true && !this.isClone())
				{
					this.fireEvent('onLockChange',this,this.lockState);
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
		 * @return {strappy.mvc.Model} The cloned instance.
		 */
		clone: function()
		{
			var clone=new (this.$reflect('self'))({},this.record);
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
		 * @return {strappy.mvc.Model} this
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
		 * @return {strappy.mvc.Model} The phantom record.
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
		 * @return {strappy.mvc.Model} this
		 */
		destroyPhantom: function()
		{
			delete this.phantom;
			this.phantom=null;
			return this;
		}
	}
);