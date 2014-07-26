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
		$extends:		'strappy.data.AbstractStore',
		$abstract:		true
	}
)
(
	{},
	{
		BTL:			null,
		BTL_GET:		null,
		BTL_GET_QUERY:	null,
		BTL_SET:		null,
		BTL_REMOVE:		null,
		BTL_CHECK:		null,
		/**
		 * @constructor
		 * Sets up and validates the store.
		 * 
		 * @return {strappy.data.SingleModelStore}
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
							this.record=this.newRecord(this.data);
							this.bindChangeEvent(this.record);
							this.bindRemoveEvent(this.record);
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
								this.BTL_SET=$JSKK.namespace(this.BTL_REMOVE);
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
						var	shared=this.getShared(),
							record=shared.newRecord(this.data);
						this.getShared().add(records);
						this.bindChangeEvent(record);
						this.bindRemoveEvent(record);
						//Make a reference.
						this.record=shared.record;
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
		sync: function(data,query,callback)
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
					function(response)
					{
						var record=null;
						if (Object.isArray(response.data))
						{
							record=response.data[0];
						}
						else
						{
							record=response.data;
						}
						target.record=this.newRecord(record);
						target.fireEvent('onChange',target,record);
						target.fireEvent('onSync',target,record);
						if (Object.isFunction(callback))
						{
							callback(this);
						}
					}.bind(target)
				);
				target.BTL.executeQueue();
			}
//			else if (target.proxy && Object.isFunction(target.proxy.sync))
			else
			{
				var	onSuccess=function(response)
					{
						var record=null;
						if (Object.isArray(response.data))
						{
							record=response.data[0];
						}
						else
						{
							record=response.data;
						}
						target.record=this.newRecord(record);
						target.fireEvent('onChange',target,record);
						target.fireEvent('onSync',target,record);
						if (Object.isFunction(callback))
						{
							callback(this,response);
						}
					}.bind(target),
					onFailure	=function(response)
					{
						target.fireEvent('onSyncFailed',target,response);
					}.bind(target),
					changeset	=[],
					types		=this.getTransmissionType();
				if (target.isDirty())
				{
					changeset=Object.clone(target.record.getRecord());
				}
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
								target.proxy.read
								(
									{
										onSuccess:	onSuccess,
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
								target.proxy.get
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
					throw new Error('The store "'+target.$reflect('fullname')+'" cannot be synced as it\'s proxy does not have any methods to sync with.');
				}
			}
		},
		/**
		 * This method simply request a new model through the proxy.
		 * 
		 * @return {strappy.data.SingleModelStore}
		 */
		load: function(data,callback)
		{
			var target=(this.isShared()?this.getShared():this);
			var	types		=this.getTransmissionType()
				verb		=null;
			if (types.inArray('crud'))
			{
				verb='read';
			}
			else if (types.inArray('gsrc'))
			{
				verb='get';
			}
			else
			{
				throw new Error('The store "'+target.$reflect('fullname')+'" cannot load a model as it does not have any methods to load with.');
			}
			target[verb]
			(
				{
					data:		data,
					onSuccess:	function(response)
					{
						var record=null;
						if (Object.isArray(response.data))
						{
							record=response.data[0];
						}
						else
						{
							record=response.data;
						}
						target.record=this.newRecord(record);
						target.fireEvent('onChange',target,record);
						target.fireEvent('onLoad',target,record);
						if (Object.isFunction(callback))
						{
							callback(this,response);
						}
					}.bind(target),
					onFailure:	function(response)
					{
						target.fireEvent('onLoadFailed',target,response);
					}.bind(target)
				}
			);
			return this;
		},

		isDirty: function()
		{
			return this.record.isDirty();
		}
	}
);