/**
 * @class framework.data.AbstractStore
 * @abstract
 * 
 * This is the base store of which all other stores extend from.
 * 
 * You should never use this store directly.
 * 
 * @mixins framework.trait.ComponentConnector
 * @mixins $JSKK.trait.Observable
 * 
 * @uses framework.trait.ComponentConnector
 * @uses $JSKK.trait.Observable
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework.data',
		$name:			'AbstractStore',
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
		/**
		 * @property events A list of observable events.
		 * @property events.onChange Fired whenever anything in the store is changed.
		 * @property events.onSync Fired whenever the store is synced.
		 * @property events.onSyncFailed Fired whenever the store is synced and the sync fails.
		 * @property events.onModelLockChange Fired whenever the lock state of the containing models changes.
		 * @private
		 */
		events:
		{
			onChange:			true,
			onSync:				true,
			onSyncFailed:		true,
			onModelLockChange:	true
		},
		/**
		 * @property {framework.data.proxy.AbstractProxy} proxy
		 * @private
		 */
		proxy:		null,
		/**
		 * @property {framework.mvc.Model} model A model object which new models will be created from
		 * @private
		 */
		model:		null,
		/**
		 * @property {Object} data initial record to start the store with.
		 * @private
		 */
		data:		{},
		/**
		 * @property {framework.mvc.Model} record Represents the model instance.
		 * @private
		 */
		record:		null,
		/**
		 * @constructor
		 * Sets up and validates the store.
		 * 
		 * @return {framework.data.AbstractStore}
		 */
		init: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * Creates a new model instance based on the attached model
		 * and returns it.
		 * 
		 * Also binds locking events to the model which handles chaining
		 * model lock change events to the store's onModelLockChange event.
		 * 
		 * @param {Object} record an object representing the model.
		 * @return {framework.mvc.Model}
		 */
		newRecord: function(record)
		{
			return new this.model
			(
				{
					onLockChange: function(model,lockState)
					{
						this.fireEvent('onModelLockChange',this,model,lockState);
					}.bind(this)
				},
				record
			);
		},
		/**
		 * Returns the attached model (not an instance of it).
		 * 
		 * @return {framework.mvc.Model}
		 */
		getModel: function()
		{
			return this.model;
		},
		/**
		 * Generic getter.
		 * 
		 * @return {Mixed}
		 */
		get: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * Generic setter.
		 * 
		 * @return  {framework.data.AbstractStore} this
		 */
		set: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * This method will check if the attached model is dirty. If so,
		 * it will send it to the server. Otherwise it will ignore the model
		 * and simply request a new one.
		 * 
		 * @return {framework.data.SingleModelStore}
		 */
		sync: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * Sets a new proxy on the store.
		 * 
		 * @return {framework.data.AbstractStore} this
		 */
		setProxy: function(proxy)
		{
			this.proxy=proxy;
			return this;
		},
		/**
		 * Returns the attached proxy.
		 * 
		 * @return {framework.data.proxy.AbstractProxy} The attached proxy.
		 */
		getProxy: function()
		{
			return this.proxy;
		},
		/**
		 * Checks the state of the store to determine weather or not this
		 * 
		 * @return {Boolean} true if the store is dirty.
		 */
		isDirty: $JSKK.Class.ABSTRACT_METHOD
	}
);