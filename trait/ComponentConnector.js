/**
 * @class framework.trait.ComponentConnector
 * 
 * This trait is designed to be used with {@link framework.mvc.Model models},
 * {@link framework.mvc.View views} and {@link framework.mvc.Controller controllers}.
 * 
 * This trait will expose a set of useful functionality to the class that
 * is using it, including all the hooks required to access parts of the component.
 * 
 * @abstract
 */
$JSKK.Trait.create
(
	{
		$namespace:	'framework.trait',
		$name:		'ComponentConnector'
	}
)
(
	{
		/**
		 * @constructor
		 * This method binds the component to whatever uses this trait.
		 * 
		 * @param {framework.Component} component The component to connect.
		 */
		init: function(component)
		{
			this._component=component;
		},
		/**
		 * Returns the parent component associated with the class using this trait.
		 * 
		 * @return {framework.Component} the parent component.
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
		 * @return {framework.RadioTower}
		 */
		getRadioTower: function()
		{
			return this.getParentComponent().radioTower;
		},
		/**
		 * Returns the State Manager singleton.
		 * 
		 * @return {framework.StateMgr}
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
			return (this.$reflect('namespace')+'.'+this.$reflect('name')).replace(/\./g,'-');
		},
		/**
		 * Get's a child component of the associated parent component.
		 * 
		 * NOTE: As a convention, you should only ever call this if you want
		 * to {@link framework.Component#configure configure/reconfigure} the
		 * component.
		 * @param {String} cmp The reference name of the component as defined in
		 * the parent component.
		 * @return {framework.Component} The child component.
		 */
		getCmp: function(cmp)
		{
			return this.getParentComponent().getCmp(cmp);
		},
		/**
		 * Fetches a model from the parent component.
		 * 
		 * @param {String} model The name of the model.
		 * @return {framework.mvc.Model} The Model instance.
		 */
		getModel: function(model)
		{
			return this.getParentComponent().getModel(model);
		},
		/**
		 * Fetches a view from the parent component.
		 * 
		 * @param {String} view The name of the view.
		 * @return {framework.mvc.View} The View instance.
		 */
		getView: function(view)
		{
			return this.getParentComponent().getView(view);
		},
		/**
		 * Gets the value of a config property.
		 * @param {String} key The config property to get.
		 * @return 
		 */
		getConfig: function(key)
		{
			return this.getParentComponent().getConfig(key);
		}
	}
);