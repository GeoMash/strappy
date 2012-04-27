/**
 * @class framework.data.Store
 * 
 * 
 * 
 * @mixins framework.trait.ComponentConnector
 * @mixins framework.trait.signal.Send
 * @abstract
 * 
 * @uses framework.trait.ComponentConnector
 * @uses framework.trait.signal.Send
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework.data',
		$name:			'Store',
		$uses:
		[
			framework.trait.ComponentConnector,
			framework.trait.signal.Send
		]
	}
)
(
	{},
	{
		proxy:		null,
		model:		null,
		data:		[],
		records:	[],
		/**
		 * 
		 */
		init: function()
		{
			if (!Object.isNull(this.model) && Object.isDefined(this.model))
			{
				this.records=this.newRecord(this.data);
				delete this.data;
			}
			else
			{
				throw new Error('Store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" must be configured with a valid model.');
			}
		},
		/**
		 * 
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
				index=newRecords.push(new this.model(records[i]));
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
		 * @param {Mixed} record The record to be added to the store.
		 * @return {framework.mvc.Model}
		 */
		add: function(record)
		{
			this.records.push(record);
			this.sendSignal(framework.Signal.STORE_DONE_CHANGE,{id:this.getID()});
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
			this.sendSignal(framework.Signal.STORE_DONE_CHANGE,{id:this.getID()});
			return this;
		},
		/**
		 * 
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
		 * 
		 */
		first: function()
		{
			return this.getAt(0);
		},
		/**
		 * 
		 */
		last: function()
		{
			return this.getAt(this.records.length-1);
		},
		/**
		 * 
		 */
		find: function(key,value)
		{
			var records=[];
			this.each
			(
				function(record)
				{
					if (record.get(key)==value)
					{
						records.push(record);
					}
				}.bind(this)
			);
			return records;
		},
		/**
		 * 
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
		 * 
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
			var thisModel	=null,
				field		=null;
			for (field in keyVals)
			{
				for (var i=0,j=this.records.length; i<j; i++)
				{
					thisModel=transaction.attachModel(this.records[i]);
					thisModel.set(field,keyVals[field]);
				}
			}
			transaction.execute
			(
				{
					onSuccess:	function(response)
					{
						if (response.success)
						{
							transaction.commit();
							this.sendSignal(framework.Signal.STORE_DONE_CHANGE,{id:this.getID(),component:this.getCmpName()});
						}
						else
						{
							transaction.rollback();
						}
					},
					onFailure: function()
					{
						transaction.rollback();
					}
				}
			);
		},
		/**
		 * Sets a record at a given index in the store.
		 * @param {Number} index The index.
		 * @param {Mixed} data The new data to set.
		 */
        setAt: function(index,data)
		{
			data.id=this.records[0].id;
			this.records[index]=data;
//			this.sendSignal('view.change',data);
		},
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
						onSuccess:	function(data)
						{
							this.records=this.newRecord(data);
							this.sendSignal(framework.Signal.STORE_DONE_SYNC,{id:this.getID(),component:this.getCmpName()});
							this.sendSignal(framework.Signal.STORE_DONE_CHANGE,{id:this.getID(),component:this.getCmpName()});
						}.bind(this),
						onFailure: function()
						{
							this.sendSignal(framework.Signal.STORE_FAILED_SYNC,{id:this.getID(),component:this.getCmpName()});
						}.bind(this)
					}
				);
			}
			else
			{
				throw new Exception('The store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
			}
		},
		/**
		 * 
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
		}
	}
);