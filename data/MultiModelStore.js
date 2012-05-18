/**
 * @class framework.data.SingleModelStore
 * 
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
		$extends:		framework.data.SingleModelStore,
		$abstract:		true
	}
)
(
	{},
	{
		proxy:		null,
		BTL:		null,
		BTL_GET:	null,
		BTL_SET:	null,
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
			transaction.start();
			var	thisModel	=null,
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
						onSuccess:	function(response)
						{
							this.records=this.newRecord(response.data);
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
					function(response)
					{
						console.debug('BTL_GET',arguments);
					}.bind(this)
				);
				this.BTL.executeQueue();
			}
			else
			{
				throw new Error('The store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
			}
		},
		/**
		 * 
		 */
		getProxy: function()
		{
			return this.proxy;
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
		},
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