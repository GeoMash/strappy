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
		$extends:		'strappy.data.AbstractStore',
		$abstract:		true
	}
)
(
	{},
	{
		BTL:				null,
		BTL_GET:			null,
		BTL_GET_QUERY:		null,
		BTL_SET:			null,
		BTL_SET_QUERY:		null,
		BTL_REMOVE:			null,
		BTL_REMOVE_QUERY:	null,
		BTL_CHECK:			null,
		model:				null,
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
			$JSKK.when(this,'ready').isTrue
			(
				function()
				{
					if (!this.isShared())
					{
						
						if (!Object.isNull(this.model) && Object.isDefined(this.model))
						{
							this.records=this.newRecord(this.data);
							for (var i=0,j=this.records.length; i<j; i++)
							{
								this.bindChangeEvent(this.records[i]);
								this.bindRemoveEvent(this.records[i]);
							}
							delete this.data;
						}
						else
						{
							throw new Error('Store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" must be configured with a valid model.');
						}
						if (Object.isString(this.BTL))
						{
							this.BTL=$JSKK.namespace(this.BTL);
							if (Object.isString(this.BTL_GET))
							{
								this.BTL_GET=$JSKK.namespace(this.BTL_GET);
							}
							if (Object.isString(this.BTL_SET))
							{
								this.BTL_SET=$JSKK.namespace(this.BTL_SET);
							}
							if (Object.isString(this.BTL_REMOVE))
							{
								this.BTL_REMOVE=$JSKK.namespace(this.BTL_REMOVE);
							}
							if (Object.isString(this.BTL_CHECK))
							{
								this.BTL_CHECK=$JSKK.namespace(this.BTL_CHECK);
							}
						}
					}
					else
					{
						var	shared	=this.getShared(),
							records	=shared.newRecord(this.data);
						shared.add(records);
						for (var i=0,j=records.length; i<j; i++)
						{
							this.bindChangeEvent(records[i]);
							this.bindRemoveEvent(records[i]);
						}
						//Make a reference.
						this.records=shared.records;
						
						if (Object.isString(shared.BTL))
						{
							shared.BTL=$JSKK.namespace(shared.BTL);
							if (Object.isString(shared.BTL_GET))
							{
								shared.BTL_GET=$JSKK.namespace(shared.BTL_GET);
							}
							if (Object.isString(shared.BTL_SET))
							{
								shared.BTL_SET=$JSKK.namespace(shared.BTL_SET);
							}
							if (Object.isString(shared.BTL_REMOVE))
							{
								shared.BTL_REMOVE=$JSKK.namespace(shared.BTL_REMOVE);
							}
							if (Object.isString(shared.BTL_CHECK))
							{
								shared.BTL_CHECK=$JSKK.namespace(shared.BTL_CHECK);
							}
						}
					}
				}.bind(this)
			);
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
				index		=0;
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
		 * @return {strappy.data.MultiModelStore} this
		 */
		add: function(records)
		{
			if (this.ready)
			{
				this._add(records);
			}
			else
			{
				$JSKK.when(this,'ready').isTrue
				(
					this._add.bind(this,records)
				);
			}
			return this;
		},
		_add: function(records)
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
				else
				{
					records[i].bindStore(this);
				}
				// records[i].flagDirty();
				this.records.push(records[i]);
				this.bindChangeEvent(records[i]);
				this.bindRemoveEvent(records[i]);
			}
			this.fireEvent('onChange',this);
			return this;
		},
		/**
		 * Removes a record from the store.
		 * 
		 * NOTE: This will auto remove the record form the server if
		 * it is attached to a BTL_REMOVE method.
		 * 
		 * @param {Mixed} record The record to be removed from the store.
		 * @return {strappy.data.MultiModelStore} this
		 */
		remove: function(record,supressEvent)
		{
			var	target		=(this.isShared()?this.getShared():this),
				newRecords	=[];
			if (Object.isFunction(target.BTL_REMOVE))
			{
				var query=target.BTL_REMOVE_QUERY;
				query[record.idField]=Object.clone(record.getId());
				
				target.BTL_REMOVE(query,null);
				
//				target.BTL_REMOVE
//				(
//					{
//						_type:record.get('_type'),
//						id:record.getId()
//					},
//					null
//				);
			}
			for (var i=0,j=this.records.length; i<j; i++)
			{
				if (this.records[i]!=record)
				{
					newRecords.push(this.records[i]);
				}
			}
			this.records=newRecords;
			if (!supressEvent)
			{
				record.fireEvent('onRemove',record,this);
				this.fireEvent('onChange',this);
				this.fireEvent('onModelRemove',this,record);
			}
			return this;
		},
		/**
		 * Removes all records in the store.
		 * @return {strappy.data.MultiModelStore} this
		 */
		removeAll: function()
		{
//			this.removeByRange(0,this.records.length,true);
//			this.fireEvent('onChange',this);
			
			this.removeByRange(0,this.records.length);
			return this;
		},
		/**
		 * Removes a range of records from the store.
		 * @param {Number} start index of the range to be deleted.
		 * @param {Number} end index of the range to be deleted.
		 * @return {strappy.data.MultiModelStore} this
		 */
		removeByRange: function(startIndex,endIndex,supressEvent)
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
			var	sliced	=this.records.splice(startIndex,endIndex),
				target	=(this.isShared()?this.getShared():this);
			if (Object.isFunction(target.BTL_REMOVE))
			{
				target.BTL.startQueue();
				for (var i=0,j=sliced.length; i<j; i++)
				{
					target.BTL_REMOVE({_type:sliced[i].get('_type'),id:sliced[i].getId()},null);
				}
				target.BTL.executeQueue();
			}
			if (!supressEvent)
			{
				for (var i=0,j=sliced.length; i<j; i++)
				{
					sliced[i].fireEvent('onRemove',sliced[i],this);
					this.fireEvent('onModelRemove',this,sliced[i]);
				}
				this.fireEvent('onChange',this);
			}
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
		 * @param {Boolean} flatten If only one key is passed, the returned array can be flattened.
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
		 * Returns an object in groups of arrays which match the groupBy filter provided.
		 * 
		 * @param groupBy {String} The field in which to group records by.
		 */
		getGrouped: function(groupBy)
		{
			var groups	={},
				groupKey=null;
			for (var i=0,j=this.records.length; i<j; i++)
			{
				groupKey=this.records[i].get(groupBy);
				if (Object.isUndefined(groups[groupKey]))
				{
					groups[groupKey]=[];
				}
				groups[groupKey].push(this.records[i]);
			}
			return groups;
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
		sync: function(data,query,callback)
		{
			var target=(this.isShared()?this.getShared():this);
			
			if (Object.isAssocArray(target.BTL))
			{
				var	changeset	=[];
				target.getDirty().each
				(
					function(model)
					{
						changeset.push(model.getRecord())-1;
					}.bind(target)
				);
				target.BTL.startQueue();
				
				var setQuery=null;
				if (Object.isUndefined(query) || Object.isNull(query))
				{
					setQuery=target.BTL_SET_QUERY;
				}
				if (changeset.length && Object.isFunction(target.BTL_SET))
				{
					target.BTL_SET(changeset,setQuery);
				}
				if (Object.isUndefined(query) || Object.isNull(query))
				{
					query=target.BTL_GET_QUERY;
				}
				target.BTL_GET
				(
					data,
					query,
					function(response)
					{
						var records=response.data;
						target.records=target.newRecord(records);
						this.records	=target.records;
						for (var i=0,j=target.records.length; i<j; i++)
						{
							target.bindChangeEvent(target.records[i]);
							target.bindRemoveEvent(target.records[i]);
						}
						target.fireEvent('onChange',target,records);
						target.fireEvent('onSync',target,records);
						if (Object.isFunction(callback))
						{
							callback(this);
						}
					}.bind(this)
				);
				target.BTL.executeQueue();
			}
			else
			{
				var	onSuccess=function(response)
					{
						target.records=target.newRecord(response.data);
						this.records	=target.records;
						for (var i=0,j=target.records.length; i<j; i++)
						{
							target.bindChangeEvent(target.records[i]);
							target.bindRemoveEvent(target.records[i]);
						}
						target.fireEvent('onChange',target,response);
						target.fireEvent('onSync',target,response);
						if (Object.isFunction(callback))
						{
							callback(this);
						}
					}.bind(target),
					onFailure	=function(response)
					{
						target.fireEvent('onSyncFailed',target,response);
					}.bind(target),
					changeset	=[],
					types		=this.getTransmissionType();
				
				target.getDirty().each
				(
					function(model)
					{
						changeset.push(model.getRecord());
					}
				);
				
				if (types.inArray('sync'))
				{
					target.sync
					(
						{
							data:		changeset,
							onSuccess:	onSuccess,
							onFailure:	onFailure
						}
					);
				}
				else if (types.inArray('crud'))
				{
					target.upsert
					(
						{
							data:		changeset,
							onSuccess:	function(response)
							{
								target.read
								(
									{
										onSuccess: onSuccess,
										onFailure: onFailure
									}
								);
							}.bind(target),
							onFailure: onFailure
						}
					);
				}
				else if (types.inArray('gsrc'))
				{
					target.set
					(
						{
							data:		changeset,
							onSuccess:	function(response)
							{
								target.get
								(
									{
										onSuccess: onSuccess,
										onFailure: onFailure
									}
								);
							}.bind(target),
							onFailure: onFailure
						}
					);
				}
				else
				{
					throw new Error('The store "'+target.$reflect('fullname')+'" cannot be synced as it does not have any methods to sync with.');
				}
			}
		},
		/**
		 * Flags all records in the store as being dirty. 
		 * @return {strappy.data.MultiModelStore} this
		 */
		flagAllDirty: function()
		{
			this.each
			(
				function(record)
				{
					record.flagDirty();
				}
			);
		},
		/**
		 * Flags all records in the store as being clean. 
		 * @return {strappy.data.MultiModelStore} this
		 */
		flagAllClean: function()
		{
			this.each
			(
				function(record)
				{
					record.flagClean();
				}
			);
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
		 * @inheritdoc
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