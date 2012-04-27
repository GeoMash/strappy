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
		 */
		sync: function()
		{
			var proxy=this.getStore().getProxy();
			if (Object.isFunction(proxy.sync))
			{
				proxy.sync
				(
					{
						data:		(this.isDirty()?this.record:{}),
						onSuccess:	function(data)
						{
							this.record=data;
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
						}.bind(this)
					}
				);
				this.flagClean();
			}
			else
			{
				throw new Exception('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached to its bound store.');
			}
		},
		/**
		 * Fetches a record based on its index in the store.
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
		 * 
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
			var	args		=$JSKK.toArray(arguments),
				keyVals		={},
				transaction	=new framework.data.Transaction();
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
			else
			{
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" is in a lock state that prevents any modification.');
			}
		},
		/**
		 * 
		 */
		flagDirty: function()
		{
			this.dirty=true;
			return this;
		},
		/**
		 * 
		 */
		flagClean: function()
		{
			this.dirty=false;
		},
		/**
		 * 
		 */
		isDirty: function()
		{
			return this.dirty;
		},
		/**
		 * 
		 */
		isClean: function()
		{
			return !this.dirty;
		},
		/**
		 * Locks the model based on the type of lock given to this method.
		 * @param {String} lockType The type of lock. Valid lock types are:
		 * * {@link framework.mvc.Model#LOCK_NONE}
		 * * {@link framework.mvc.Model#LOCK_READONLY}
		 * * {@link framework.mvc.Model#LOCK_FULL}
		 * @param {Boolean} supressSignal Blocks the MODLEL_LOCK_CHANGE signal
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
		 * 
		 */
		clone: function()
		{
			var clone=new (this.$reflect('self'))(this.record);
			clone._clone=true;
			return clone;
		},
		/**
		 * 
		 */
		isClone: function()
		{
			return this._clone;
		},
		/**
		 * 
		 */
		attachPhantom: function(phantomModel)
		{
			this.phantom=phantomModel;
			return this;
		},
		/**
		 * 
		 */
		hasPhantom: function()
		{
			return Boolean(this.phantom);
		},
		/**
		 * 
		 */
		getPhantom: function()
		{
			if (this.hasPhantom())
			{
				return this.phatom;
			}
			else
			{
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" does not have a phantom model associated with it.');
			}
		},
		/**
		 * 
		 */
		destroyPhantom: function()
		{
			delete this.phantom;
			this.phantom=null;
		}
	}
);