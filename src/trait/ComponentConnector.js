/**
 * @class strappy.trait.ComponentConnector
 * 
 * This trait is designed to be used with {@link strappy.mvc.Model models},
 * {@link strappy.mvc.View views} and {@link strappy.mvc.Controller controllers}.
 * 
 * This trait will expose a set of useful functionality to the class that
 * is using it, including all the hooks required to access parts of the component.
 * 
 * @abstract
 */
$JSKK.Trait.create
(
	{
		$namespace:	'strappy.trait',
		$name:		'ComponentConnector'
	}
)
(
	{
		/**
		 * @constructor
		 * This method binds the component to whatever uses this trait.
		 * 
		 * @param {strappy.Component} component The component to connect.
		 */
		init: function(component)
		{
			this._component=component;
		},
		/**
		 * Returns the parent component associated with the class using this trait.
		 * @deprecated - see {@link strappy.trait.ComponentConnector#cmp cmp()}
		 * @return {strappy.Component} the parent component.
		 */
		getParentComponent: function()
		{
			return this._component;
		},
		/**
		 * Returns the parent component associated with the class using this trait.
		 * 
		 * @return {strappy.Component} the parent component.
		 */
		cmp: function()
		{
			return this._component;
		},
		/**
		 * Returns the name of the parent component associated with the class using
		 * this trait.
		 * 
		 * @return {String} The name of the parent component.
		 */
		getCmpName: function()
		{
			return this.cmp().my.name;
		},
		/**
		 * Returns the Radio Tower singleton.
		 * 
		 * @return {strappy.RadioTower}
		 */
		getRadioTower: function()
		{
			return this.cmp().radioTower;
		},
		/**
		 * Returns the State Manager singleton.
		 * 
		 * @return {strappy.StateMgr}
		 */
		getStateMgr: function()
		{
			return this.cmp().stateMgr;
		},
		/**
		 * Gets the ID of the class which implemented this trait.
		 * 
		 * @return {String} The ID.
		 */
		getID: function()
		{
			return this.$reflect('namespace')+'.'+this.$reflect('name');
		},
		/**
		 * Gets the ID of the class which implemented it and makes it safe
		 * for using as a HTML-based ID.
		 * 
		 * @return {String} The ID.
		 */
		getSafeID: function()
		{
			return this.cmp().getSafeID(cmp);
		},
		/**
		 * Get's a child component of the associated parent component.
		 * 
		 * NOTE: As a convention, you should only ever call this if you want
		 * to {@link strappy.Component#configure configure/reconfigure} the
		 * component.
		 * @param {String} cmp The reference name of the component as defined in
		 * the parent component.
		 * @return {strappy.Component} The child component.
		 */
		getCmp: function(cmp)
		{
			return this.cmp().getCmp(cmp);
		},
		/**
		 * Checks to see if a child component exists.
		 * 
		 * @param {String} cmp The child component's reference.
		 * @return {Boolean}
		 */
		hasChildCmp: function(cmp)
		{
			return Object.isDefined(this.cmp().components[cmp]);
		},
		/**
		 * Fetches a model from the parent component.
		 * 
		 * @param {String} model The name of the model.
		 * @return {strappy.mvc.Model} The Model instance.
		 */
		getStore: function(store)
		{
			return this.cmp().getStore(store);
		},
		/**
		 * Fetches a controller from the parent component.
		 * 
		 * @param {String} controller The name of the controller.
		 * @return {strappy.mvc.Controller} The Controller instance.
		 */
		getController: function(controller)
		{
			return this.cmp().getController(controller);
		},
		/**
		 * Fetches a view from the parent component.
		 * 
		 * @param {String} view The name of the view.
		 * @return {strappy.mvc.View} The View instance.
		 */
		getView: function(view)
		{
			return this.cmp().getView(view);
		},
		/**
		 * Fetches the View Cache.
		 * 
		 * @return {strappy.mvc.ViewCache}
		 */
		getViewCache: function()
		{
			return this.cmp().getViewCache();
		},
		/**
		 * Gets the value of a config property.
		 * 
		 * @param {String} key The config property to get.
		 * @return 
		 */
		getConfig: function(key)
		{
			return this.cmp().getConfig(key);
		},
		/**
		 * Gets the instance ID (IID) of the component.
		 * 
		 * @return {String} The instance ID.
		 */
		getIID: function()
		{
			return this.cmp().getIID();
		},
		/**
		 * A helper function for creating a CSS selctor to be passed to the
		 * attachTo config option of a component.
		 * 
		 * This works by grabbing the parent attachTo and adding the passed in
		 * attachTo property.
		 * 
		 * @param  {String} attachTo The attachTo string.
		 * @return {String}          The new attachToString
		 */
		makeAttachPoint: function(attachTo)
		{
			return [this.getConfig('attachTo'), attachTo].join(' ');
		},
		/**
		 * Sends a {@link strappy.Signal.SHOW Show} signal to a child component.
		 * @param  {String} cmp A reference to the child component.
		 * @return {Object} this
		 */
		showChildComponent: function(cmp)
		{
			this.sendSignal
			(
				strappy.Signal.SHOW,
				'strappy',
				{iid:this.getCmp(cmp).getIID()}	
			);
			return this;
		},
		/**
		 * Sends a {@link strappy.Signal.HIDE Hide} signal to a child component.
		 * @param  {String} cmp A reference to the child component.
		 * @return {Object} this
		 */
		hideChildComponent: function(cmp)
		{
			this.sendSignal
			(
				strappy.Signal.HIDE,
				'strappy',
				{iid:this.getCmp(cmp).getIID()}
			);
			return this;
		},
		/**
		 * Sets a shared property in the global shared state.
		 * @param {String} key The property reference.
		 * @param {Mixed} val The new value.
		 * @return {Object} this
		 */
		setSharedState: function(key,val)
		{
			this.getStateMgr().getSharedState().set(key,val);
			return this;
		},
		/**
		 * Gets a shared property in the global shared state.
		 * @param  {String} key The property reference.
		 * @return {Mixed}     The value of the property.
		 */
		getSharedState: function(key)
		{
			return this.getStateMgr().getSharedState().get(key);
		},
		/**
		 * A helper function for the {@link strappy.InitQueue Init Queue}.
		 * 
		 * This method will create the init queue object based on the component
		 * it is being called from. Which means any items that are initalised will be
		 * considered as child components.
		 * 
		 * @param  {Function} onAllReady  A callback which is called once all items have been initalised.
		 * @param  {Function} onItemReady A callback which is called after each item has been initalised.
		 * @return {strappy.InitQueue}    Returns the new Init Queue object.
		 */
		newInitQueue: function(onAllReady,onItemReady)
		{
			return this.cmp().newInitQueue(onAllReady,onItemReady);
		},
		setState: function()
		{
			return this.cmp().setState.apply(this.cmp(),arguments);
		},
		getState: function(key)
		{
			return this.cmp().getState(key);
		},
		getPublicState: function()
		{
			return this.cmp().getPublicState();
		},
		getPrivateState: function()
		{
			return this.cmp().getPrivateState();
		},
		sendSignal: function(name,type,filter,body)
		{
			return this.cmp().sendSignal(name,type,filter,body);
		}
	}
);