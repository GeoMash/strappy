/**
 * @class framework.data.SingleModelStore
 * 
 * 
 * 
 * @mixins framework.trait.ComponentConnector
 * @mixins $JSKK.trait.Observable
 * @abstract
 * 
 * @uses framework.trait.ComponentConnector
 * @uses $JSKK.trait.Observable
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework.data',
		$name:			'SingleModelStore',
		$abstract:		true,
		$uses:
		[
			framework.trait.ComponentConnector,
			$JSKK.trait.Observable
		]
	}
)
(
	{},
	{
		events:
		{
			onChange:		true,
			onSync:			true,
			onSyncFailed:	true
		},
		proxy:		null,
		model:		null,
		data:		{},
		record:		null,
		/**
		 * 
		 */
		init: function()
		{
			if (!Object.isNull(this.model) && Object.isDefined(this.model))
			{
				this.record=this.newRecord(this.data);
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
		newRecord: function(record)
		{
			return new this.model(null,record);
		},
		/**
		 * 
		 */
		getModel: function()
		{
			return this.record;
		},
		/**
		 * 
		 */
		get: function(field)
		{
			return this.record.get(field);
		},
		/**
		 * 
		 */
		set: function(field,value)
		{
			this.record.set(field,value);
			this.fireEvent('onChange',this);
			return this;
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
				if (this.isDirty())
				{
					changeset=[this.record];
				}
				this.proxy.sync
				(
					{
						data:		changeset,
						onSuccess:	function(response)
						{
							this.record=this.newRecord(response.data[0]);
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
			else
			{
				throw new Exception('The store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
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
		isDirty: function()
		{
			return this.record.isDirty();
		}
	}
);