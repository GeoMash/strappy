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
		BTL:		null,
		BTL_GET:	null,
		BTL_SET:	null,
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
				var	shared=this.getShared(),
					record=shared.newRecord(this.data);
				this.getShared().add(records);
				this.bindchangeEvent(record);
				//Make a reference.
				this.record=shared.record;
				if (!Object.isNull(shared.BTL))
				{
					if (Object.isString(shared.BTL))
					{
						shared.BTL		=$JSKK.namespace(shared.BTL);
						shared.BTL_GET	=$JSKK.namespace(shared.BTL_GET);
						shared.BTL_SET	=$JSKK.namespace(shared.BTL_SET);
					}
				}
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
		sync: function(data,query)
		{
			var target=(this.isShared()?this.getShared():this);
			
			if (Object.isAssocArray(target.BTL))
			{
				target.BTL.startQueue();
				if (target.isDirty())
				{
					target.BTL_SET([target.record]);
				}
				target.BTL_GET
				(
					data,
					query,
					function(records)
					{
						target.record=target.newRecord(records[0]);
						target.fireEvent('onChange',target,records[0]);
						target.fireEvent('onSync',target,records[0]);
					}.bind(target)
				);
				target.BTL.executeQueue();
			}
			else if (target.proxy && Object.isFunction(target.proxy.sync))
			{
				var changeset=[]; 
				if (target.isDirty())
				{
					changeset=[target.record];
				}
				target.proxy.sync
				(
					{
						data:		changeset,
						onSuccess:	function(response)
						{
							target.record=target.newRecord(response.data[0]);
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
				throw new Exception('The store "'+target.$reflect('namespace')+'.'+target.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
			}
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