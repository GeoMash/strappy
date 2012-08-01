/**
 * @class strappy.data.SingleModelStore
 * @extends strappy.data.AbstractStore
 * @abstract
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.data',
		$name:			'SingleModelStore',
		$extends:		strappy.data.AbstractStore,
		$abstract:		true
	}
)
(
	{},
	{
		/**
		 * @constructor
		 * Sets up and validates the store.
		 * 
		 * @return {strappy.data.SingleModelStore}
		 */
		init: function()
		{
			this.init.$parent();
			if (!this.isShared())
			{
				if (!Object.isNull(this.model) && Object.isDefined(this.model))
				{
					this.record=this.newRecord(this.data);
					this.bindchangeEvent(this.record);
					delete this.data;
				}
				else
				{
					throw new Error('Store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" must be configured with a valid model.');
				}
			}
			else
			{
				var record=this.getShared().newRecord(this.data);
				this.getShared().add(records);
				this.bindchangeEvent(record);
				//Make a reference.
				this.record=this.getShared().record;
			}
		},
		/**
		 * Gets the value of a given field from the attached model.
		 * 
		 * @param {String} field The name of the field to fetch the value of.
		 * @return {Mixed} The value of the field.
		 */
		get: function(field)
		{
			return this.record.get(field);
		},
		/**
		 * 
		 * @return {strappy.mvc.Model}
		 */
		getRecord: function()
		{
			return this.record;
		},
		/**
		 * 
		 * @return {Object}
		 */
		getRawRecord: function()
		{
			return this.record.record;
		},
		/**
		 * Sets a value of a given field on the attached model.
		 * 
		 * @param {String} field The field to assign a value to.
		 * @param {Mixed} value The value to be assigned to the field.
		 * @return 
		 */
		set: function()
		{
			this.record.set.apply(this.record,$JSKK.toArray(arguments));
			return this;
		},
		/**
		 * This method will check if the attached model is dirty. If so,
		 * it will send it to the server. Otherwise it will ignore the model
		 * and simply request a new one.
		 * 
		 * @return {strappy.data.SingleModelStore}
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
			return this;
		},
		/**
		 * This method simply request a new model through the proxy.
		 * 
		 * @return {strappy.data.SingleModelStore}
		 */
		load: function(filter)
		{
			if (this.proxy && Object.isFunction(this.proxy.get))
			{
				this.proxy.get
				(
					{
						filter: filter,
						onSuccess:	function(response)
						{
							this.record=this.newRecord(response.data[0]);
							this.fireEvent('onChange',this,response);
							this.fireEvent('onLoad',this,response);
						}.bind(this),
						onFailure: function(response)
						{
							this.fireEvent('onLoadFailed',this,response);
						}.bind(this)
					}
				);
			}
			else
			{
				throw new Exception('The store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
			}
			return this;
		},

		isDirty: function()
		{
			return this.record.isDirty();
		}
	}
);