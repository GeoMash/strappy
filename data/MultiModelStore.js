/**
 * @class framework.data.MultiModelStore
 * @extends framework.data.AbstractStore
 * 
 * 
 * @abstract
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework.data',
		$name:			'MultiModelStore',
		$extends:		framework.data.AbstractStore,
		$abstract:		true
	}
)
(
	{},
	{
		BTL:		null,
		BTL_GET:	null,
		BTL_SET:	null,
		model:		null,
		/**
		 * @property {Array} data initial records to start the store with.
		 * @private
		 */
		data:		[],
		/**
		 * @property {Array} records Represent an array of
		 * {@link framework.mvc.Model model} instances.
		 * @private
		 */
		records:	[],
		/**
		 * @constructor
		 * Sets up and validates the store.
		 * 
		 * @return {framework.data.MultiModelStore}
		 */
		init: function()
		{
			this.init.$parent();
			if (!Object.isNull(this.model) && Object.isDefined(this.model))
			{
				this.records=this.newRecord(this.data);
				for (var i=0,j=this.records.length; i<j; i++)
				{
					this.bindchangeEvent(this.records[i]);
				}
				delete this.data;
			}
			else
			{
				throw new Error('Store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" must be configured with a valid model.');
			}
		},
		/**
		 * Creates new model instances based on the attached model
		 * and returns them.
		 * 
		 * Also binds locking events to the new model instances which handles
		 * chaining model lock change events to the store's
		 * onModelLockChange event.
		 * 
		 * @param {Object} record an object representing the model.
		 * @return {Array} An array of {@link framework.mvc.Model Model} instances.
		 */
		newRecord: function(records)
		{
			if (!Object.isArray(records))
			{
				records=[records];
			}
			var	newRecords	=[],
				index=		0;
			for (var i=0,j=records.length; i<j; i++)
			{
				index=newRecords.push(this.newRecord.$parent(records[i]));
				newRecords[(index-1)].bindStore(this);
			}
			return newRecords;
		},
		/**
		 * This method allows you to iterate over each item
		 * in the store.
		 * 
		 * Example:
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.controller',
			$name:		'Default',
			$extends:	framework.mvc.Controller
		}
	)
	(
		{},
		{
			generateList: function()
			{
				var HTML=['<ul>'];
				this.getStore('Default').each
				(
					function(item)
					{
						HTML.push('<li><a href="'+item.url+'">'+item.name+'</a></li>');
					}
				);
				HTML.push('</ul>');
				return HTML.join('');
			}
		}
	);
		 * @param {Function} callback A closure which will be called at each iteration.
		 * The first parameter of the closure will be the data item.
		 * @return {framework.mvc.Model}
		 */
		each: function(callback)
		{
			this.records.each(callback);
			return this;
		},
		/**
		 * Adds a record to the store.
		 * 
		 * Note: The record will be flagged as dirty when it is added to the store.
		 * 
		 * @param {Mixed} record The record to be added to the store.
		 * @return {framework.mvc.Model}
		 */
		add: function(record)
		{
			record.flagDirty();
			this.records.push(record);
			this.fireEvent('onChange',this);
			return this;
		},
		/**
		 * Removes a record from the store.
		 * @param {Mixed} record The record to be removed from the store.
		 * @return {framework.mvc.Model}
		 */
		remove: function(record)
		{
			var newRecords=[];
			for (var i=0,j=this.records.length; i<j; i++)
			{
				if (this.records[i]!=record)
				{
					newRecords.push(this.records[i]);
				}
			}
			this.records=newRecords;
			this.fireEvent('onChange',this);
			return this;
		},
		/**
		 * Removes a range of records from the store.
		 * @param {Number} start index of the range to be deleted.
		 * @param {Number} end index of the range to be deleted.
		 * @return {framework.mvc.Model}
		 */
		removeByRange: function(startIndex,endIndex)
		{
			if(startIndex < 0 || startIndex > this.records.length)
			{
				console.log("StartIndex is out of range.");
				return this;
			}

			if(endIndex < startIndex)
			{
				console.log("EndIndex is invalid.");
				return this;
			}

			if(endIndex > this.records.length)
			{
				console.log("EndIndex is out of range.");
				return this;
			}
			var sliced = this.records.splice(startIndex,endIndex);
			this.fireEvent('onChange',this);
			return this;
		},
		/**
		 * Returns RecordIndex by key/value pair
		 * @param {Number} key the property key.
		 * @param {Number} value the property value.
		 * @return {framework.mvc.Model}
		 */
		getRecordIndexByValue: function(key, value)
		{
			var index = -1;
			this.each
			(
				function(model, i)
				{
					if (model.getRecord()[key]==value)
					{
						index=i;
					}
				}.bind(this)
			);
			return index;
		},
		/**
		 * Return RecordIndex by record
		 * @param {Object} record the record.
		 * @return {framework.mvc.Model}
		 */
		getRecordIndex: function(record)
		{
			var index = -1;
			this.each
			(
				function(model, i)
				{
					if (model.getRecord()===record)
					{
						index=i;
					}
				}.bind(this)
			);
			return index;
		},
		/**
		 * Returns all attched model instances (records).
		 * 
		 * @return {Array} An array of {@link framework.mvc.Model Model} instances.
		 */
		getAll: function()
		{
			return this.records;
		},
		/**
		 * Fetches a record based on its index in the store.
		 * @param {Number} index The index.
		 * @return {Mixed} The record.
		 */
        getAt: function(index)
		{
			return this.records[index];
		},
		/**
		 * Returns the first attached model.
		 * 
		 * @return {framework.mvc.Model} The model.
		 */
		first: function()
		{
			return this.getAt(0);
		},
		/**
		 * Returns the last attached model.
		 * 
		 * @return {framework.mvc.Model} The model.
		 */
		last: function()
		{
			return this.getAt(this.records.length-1);
		},
		get: function()
		{
			
		},
		set: function()
		{
			
		},
		/**
		 * 
		 */
		getById: function(modelId)
		{
			var ret=null;
			this.each
			(
				function(record)
				{
					if (record.getId()==modelId)
					{
						ret=record;
						return false;
					}
				}.bind(this)
			);
			return ret;
		},
		/**
		 * Finds attached models based on a simple key value search.
		 * 
		 * Find all Toms.
	var toms=this.getStore('Person').find('name','Tom');
		 * 
		 * Find all ACTIVE Toms.
		 * 
	var activeToms=this.getStore('Person').find
	(
		{
			name:	'Tom',
			active:	true
		}
	);
		 * 
		 * @param {String} key The key to search against.
		 * @param {Mixed} value The value to search for.
		 * @return {Array} An array of {@link framework.mvc.Model Model} instances.
		 */
		find: function()
		{
			var	args		=$JSKK.toArray(arguments),
				keyVals		={},
				records		=[];
			if (Object.isDefined(args[1]))
			{
				keyVals[args.shift()]=args.shift();
			}
			else
			{
				keyVals=args.shift();
			}
			this.each
			(
				function(record)
				{
					for (var field in keyVals)
					{
						if (record.get(field)!=keyVals[field])
						{
							return false;
						}
					}
					records.push(record);
				}.bind(this)
			);
			return records;
		},
		/**
		 * Finds attached models based on custom searching logic provided
		 * by a callback function which gets passed to this method.
		 * 
		 * The function will be called for each model instance in the store.
		 * The function should return true for evey record that you want returned.
		 * 
	var activeToms=this.getStore('Person').findBy
	(
		function(model)
		{
			if (model.get('name')=='Tom'
			&& model.get('active'))
			{
				return true;
			}
		}
	);
		 * 
		 * @param {Function} callback A function to call for each record.
		 * @return {Array} An array of {@link framework.mvc.Model Model} instances.
		 */
		findBy: function(callback)
		{
			var records=[];
			this.each
			(
				function(record)
				{
					if (callback(record))
					{
						records.push(record);
					}
				}
			);
			return records;
		},
		/**
		 * Sets all the associated models
		 */
		setAll: function()
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
			transaction.start();
			var	thisModel	=null,
				field		=null;
			for (var i=0,j=this.records.length; i<j; i++)
			{
				thisModel=transaction.attachModel(this.records[i]);
				thisModel.set(keyVals);
			}
			transaction.execute
			(
				{
					onSuccess:	function()
					{
						transaction.commit();
						this.fireEvent('onChange',this);
					}.bind(this),
					onFailure: function()
					{
						transaction.rollback();
					}
				}
			);
			return this;
		},
//		/**
//		 * Sets a record at a given index in the store.
//		 * @param {Number} index The index.
//		 * @param {Mixed} data The new data to set.
//		 * 
//		 */
//        setAt: function(index,data)
//		{
//			data.id=this.records[0].id;
//			this.records[index]=data;
//			
//			this.fireEvent('onChange',this,index,data);
//		},
		/**
		 * This method will fetch all dirty models and attach them to a
		 * proxy sync request.
		 * The expected response is a new record set. 
		 * 
		 * 
		 * TODO: Detail this.
		 */
		sync: function()
		{
			if (this.proxy && Object.isFunction(this.proxy.sync))
			{
				var changeset=[];
				this.getDirty().each
				(
					function(model)
					{
						changeset.push(model.getRecord());
					}
				);
				this.proxy.sync
				(
					{
						data:		changeset,
						onSuccess:	function(response)
						{
							this.records=this.newRecord(response.data);
							for (var i=0,j=this.records.length; i<j; i++)
							{
								this.bindchangeEvent(this.records[i]);
							}
							this.fireEvent('onChange',this,response);
							this.fireEvent('onSync',this,response);
						}.bind(this),
						onFailure: function(response)
						{
							this.fireEvent('onSyncFailed',this,response);
						}.bind(this)
					}
				);
			}
			else if (Object.isAssocArray(this.BTL))
			{
				var	changeset	=[];
				this.getDirty().each
				(
					function(model)
					{
						var index=changeset.push(model.getRecord())-1;
						console.debug(index,changeset);
						changeset[index]=this.BTL.bindType(changeset[index],model.$reflect('name').toLowerCase());
					}.bind(this)
				);
				this.BTL.startQueue();
				if (changeset.length)
				{
					this.BTL_SET(changeset);
				}
				this.BTL_GET
				(
					null,
					function(records)
					{
						this.records=this.newRecord(records);
						for (var i=0,j=this.records.length; i<j; i++)
						{
							this.bindchangeEvent(this.records[i]);
						}
						this.fireEvent('onChange',this,records);
						this.fireEvent('onSync',this,records);
					}.bind(this)
				);
				this.BTL.executeQueue();
			}
			else
			{
				throw new Error('The store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
			}
		},
		isDirty: function()
		{
			return Boolean(this.getDirty().length);
		},
		/**
		 * Returns all the attached models which are dirty (have been modified).
		 * 
		 * @return {Array} An array of dirty records.
		 */
		getDirty: function()
		{
			var dirty=[];
			this.records.each
			(
				function(model)
				{
					if (model.isDirty())
					{
						dirty.push(model);
					}
				}
			);
			return dirty;
		},
		/**
		 * 
		 * 
		 * @see framework.data.BTL
		 */
		configureBTL: function(config)
		{
			if (!Object.isAssocArray(config.handler))
			{
				throw new Error('Invalid BTL handler assigned with MultiModelStore.configureBTL().');
			}
			if (!Object.isFunction(config.get))
			{
				throw new Error('Invalid getter assigned with MultiModelStore.configureBTL().');
			}
			if (!Object.isFunction(config.set))
			{
				throw new Error('Invalid setter assigned with MultiModelStore.configureBTL().');
			}
			this.BTL	=config.handler;
			this.BTL_GET=config.get;
			this.BTL_SET=config.set;
			return this;
		}
	}
);