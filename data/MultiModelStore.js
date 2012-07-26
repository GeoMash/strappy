/**
 * @class strappy.data.MultiModelStore
 * @extends strappy.data.AbstractStore
 * 
 * 
 * @abstract
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.data',
		$name:			'MultiModelStore',
		$extends:		strappy.data.AbstractStore,
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
		 * {@link strappy.mvc.Model model} instances.
		 * @private
		 */
		records:	[],
		/**
		 * @constructor
		 * Sets up and validates the store.
		 * 
		 * @return {strappy.data.MultiModelStore}
		 */
		init: function()
		{
			this.init.$parent();
			
			if (!this.isShared())
			{
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
				if (!Object.isNull(this.BTL))
				{
					if (Object.isString(this.BTL))
					{
						this.BTL	=$JSKK.namespace(this.BTL);
						this.BTL_GET=$JSKK.namespace(this.BTL_GET);
						this.BTL_SET=$JSKK.namespace(this.BTL_SET);
					}
				}
			}
			else
			{
				var	shared	=this.getShared(),
					records	=shared.newRecord(this.data);
				this.shared.add(records);
				for (var i=0,j=records.length; i<j; i++)
				{
					this.bindchangeEvent(records[i]);
				}
				//Make a reference.
				this.records=this.shared.records;
				
				if (!Object.isNull(this.shared.BTL))
				{
					if (Object.isString(this.shared.BTL))
					{
						this.shared.BTL	=$JSKK.namespace(this.shared.BTL);
						this.shared.BTL_GET=$JSKK.namespace(this.shared.BTL_GET);
						this.shared.BTL_SET=$JSKK.namespace(this.shared.BTL_SET);
					}
				}
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
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
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
			$extends:	strappy.mvc.Controller
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
		 * @return {strappy.mvc.Model}
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
		 * @return {strappy.mvc.Model}
		 */
		add: function(records)
		{
			if (!Object.isArray(records))
			{
				records=[records];
			}
			for (var i=0,j=records.length; i<j; i++)
			{
				if (!Object.isFunction(records[i].$reflect))
				{
					records[i]=this.newRecord(records[i])[0];
				}
				// records[i].flagDirty();
				this.records.push(records[i]);
				this.bindchangeEvent(records[i]);
			}
			this.fireEvent('onChange',this);
			return this;
		},
		/**
		 * Removes a record from the store.
		 * @param {Mixed} record The record to be removed from the store.
		 * @return {strappy.mvc.Model}
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
		 * @return {strappy.mvc.Model}
		 */
		removeByRange: function(startIndex,endIndex)
		{
			if(startIndex < 0 || startIndex > this.records.length)
			{
				// console.log("StartIndex is out of range.");
				return this;
			}

			if(endIndex < startIndex)
			{
				// console.log("EndIndex is invalid.");
				return this;
			}

			if(endIndex > this.records.length)
			{
				// console.log("EndIndex is out of range.");
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
		 * @return {strappy.mvc.Model}
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
		 * @return {strappy.mvc.Model}
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
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
		 */
		getAll: function()
		{
			return this.records;
		},
		/**
		 * Returns the specified keys of the attached model instances (records).
		 * 
		 * @param  {Array} keys An array of keys to return.
		 * @flatten {Boolean} flatten If only one key is passed, the returned array can be flattened.
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
		 */
		getAllFiltered: function(keys,flatten)
		{
			if (!Object.isArray(keys))keys=[keys];
			
			var records=[];
			
			this.each
			(
				function(record)
				{
					var thisRecord={};
					for (var i=0,j=keys.length; i<j; i++)
					{
						thisRecord[keys[i]]=record.get(keys[i]);
					}
					records.push(thisRecord);
				}
			);
			if (flatten && keys.length)
			{
				var flattenedRecords=[];
				for (var i=0,j=records.length; i<j; i++)
				{
					flattenedRecords.push(records[i][keys[0]]);
				}
				return flattenedRecords;
			}
			else
			{
				return records;
			}
		},
		/**
		 * Returns the total number of records in this store.
		 * 
		 * @return {Number} The total number of records.
		 */
		getCount: function()
		{
			return this.records.length;
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
		 * @return {strappy.mvc.Model} The model.
		 */
		first: function()
		{
			return this.getAt(0);
		},
		/**
		 * Returns the last attached model.
		 * 
		 * @return {strappy.mvc.Model} The model.
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
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
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
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
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
				transaction	=new strappy.data.Transaction();
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
		sync: function(params)
		{
			var target=(this.isShared()?this.getShared():this);
			if (Object.isAssocArray(target.BTL))
			{
				var	changeset	=[];
				target.getDirty().each
				(
					function(model)
					{
						var index=changeset.push(model.getRecord())-1;
						// console.debug(index,changeset);
						changeset[index]=target.BTL.bindType(changeset[index],model.$reflect('name').toLowerCase());
					}.bind(target)
				);
				target.BTL.startQueue();
				if (changeset.length && Object.isFunction(target.BTL_SET))
				{
					target.BTL_SET(changeset);
				}
				target.BTL_GET
				(
					params,
					function(records)
					{
						target.records=target.newRecord(records);
						for (var i=0,j=target.records.length; i<j; i++)
						{
							target.bindchangeEvent(target.records[i]);
						}
						target.fireEvent('onChange',target,records);
						target.fireEvent('onSync',target,records);
					}.bind(target)
				);
				target.BTL.executeQueue();
			}
			else if (target.proxy && Object.isFunction(target.proxy.sync))
			{
				var changeset=[];
				target.getDirty().each
				(
					function(model)
					{
						changeset.push(model.getRecord());
					}
				);
				target.proxy.sync
				(
					{
						data:		changeset,
						onSuccess:	function(response)
						{
							target.records=target.newRecord(response.data);
							for (var i=0,j=target.records.length; i<j; i++)
							{
								target.bindchangeEvent(target.records[i]);
							}
							target.fireEvent('onChange',target,response);
							target.fireEvent('onSync',target,response);
						}.bind(target),
						onFailure: function(response)
						{
							target.fireEvent('onSyncFailed',target,response);
						}.bind(target)
					}
				);
			}
			else
			{
				throw new Error('The store "'+target.$reflect('namespace')+'.'+target.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
			}
		},
		isDirty: function()
		{
			var target=(this.isShared()?this.getShared():this);
			return Boolean(target.getDirty().length);
		},
		/**
		 * Returns all the attached models which are dirty (have been modified).
		 * 
		 * @return {Array} An array of dirty records.
		 */
		getDirty: function()
		{
			var	target	=(this.isShared()?this.getShared():this),
				dirty	=[];
			target.records.each
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
		 * @see strappy.data.BTL
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