/**
 * @class framework.data.SingleModelStore
 * @extends framework.data.AbstractStore
 * @abstract
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework.data',
		$name:			'SingleModelStore',
		$extends:		framework.data.AbstractStore,
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
		 * @return {framework.data.SingleModelStore}
		 */
		init: function()
		{
			this.init.$parent();
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
		 * Sets a value of a given field on the attached model.
		 * 
		 * @param {String} field The field to assign a value to.
		 * @param {Mixed} value The value to be assigned to the field.
		 * @return 
		 */
		set: function(field,value)
		{
			this.record.set(field,value);
			this.fireEvent('onChange',this);
			return this;
		},
		/**
		 * This method will check if the attached model is dirty. If so,
		 * it will send it to the server. Otherwise it will ignore the model
		 * and simply request a new one.
		 * 
		 * @return {framework.data.SingleModelStore}
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
		isDirty: function()
		{
			return this.record.isDirty();
		}
	}
);