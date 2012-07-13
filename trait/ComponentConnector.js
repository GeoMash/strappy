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
		 * 
		 * @return {strappy.Component} the parent component.
		 */
		getParentComponent: function()
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
			return this.getParentComponent().my.name;
		},
		/**
		 * Returns the Radio Tower singleton.
		 * 
		 * @return {strappy.RadioTower}
		 */
		getRadioTower: function()
		{
			return this.getParentComponent().radioTower;
		},
		/**
		 * Returns the State Manager singleton.
		 * 
		 * @return {strappy.StateMgr}
		 */
		getStateMgr: function()
		{
			return this.getParentComponent().stateMgr;
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
			return this.getParentComponent().getSafeID(cmp);
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
			return this.getParentComponent().getCmp(cmp);
		},
		/**
		 * 
		 * @return {Boolean}
		 */
		hasChildCmp: function(cmp)
		{
			return Object.isDefined(this.getParentComponent().components[cmp]);
		},
		/**
		 * Fetches a model from the parent component.
		 * 
		 * @param {String} model The name of the model.
		 * @return {strappy.mvc.Model} The Model instance.
		 */
		getStore: function(store)
		{
			return this.getParentComponent().getStore(store);
		},
		/**
		 * Fetches a controller from the parent component.
		 * 
		 * @param {String} controller The name of the controller.
		 * @return {strappy.mvc.Controller} The Controller instance.
		 */
		getController: function(controller)
		{
			return this.getParentComponent().getController(controller);
		},
		/**
		 * Fetches a view from the parent component.
		 * 
		 * @param {String} view The name of the view.
		 * @return {strappy.mvc.View} The View instance.
		 */
		getView: function(view)
		{
			return this.getParentComponent().getView(view);
		},
		/**
		 * Fetches the View Cache.
		 * 
		 * @return {strappy.mvc.ViewCache}
		 */
		getViewCache: function()
		{
			return this.getParentComponent().getViewCache();
		},
		/**
		 * Gets the value of a config property.
		 * @param {String} key The config property to get.
		 * @return 
		 */
		getConfig: function(key)
		{
			return this.getParentComponent().getConfig(key);
		},
		/**
		 * Gets the instance ID (IID) of the component.
		 * @return {String} The instance ID.
		 */
		getIID: function()
		{
			return this.getParentComponent().getIID();
		},
		makeAttachPoint: function(attachTo)
		{
			return [this.getConfig('attachTo'), attachTo].join(' ');
		},
		
		showChildComponent: function(cmp)
		{
			this.sendSignal
			(
				strappy.Signal.SHOW,
				'strappy',
				{iid:this.getCmp(cmp).getIID()}	
			);
		},
		hideChildComponent: function(cmp)
		{
			this.sendSignal
			(
				strappy.Signal.HIDE,
				'strappy',
				{iid:this.getCmp(cmp).getIID()}	
			);
		},
		setSharedState: function(key,val)
		{
			this.getStateMgr().getSharedState().set(key,val);
			return this;
		},
		getSharedState: function(key)
		{
			return this.getStateMgr().getSharedState().get(key);
		},
		newInitQueue: function(onAllReady,onItemReady)
		{
			return this.getParentComponent().newInitQueue(onAllReady,onItemReady);
		}
	}
);