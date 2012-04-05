$JSKK.Trait.create
(
	{
		$namespace:	'framework.trait',
		$name:		'ComponentConnector'
	}
)
(
	{
		init: function(component)
		{
			this._component=component;
		},
		getParentComponent: function()
		{
			return this._component;
		},
		getCmpName: function()
		{
			return this.getParentComponent().my.name;
		},
		getRadioTower: function()
		{
			return this.getParentComponent().radioTower;
		},
		getStateMgr: function()
		{
			return this.getParentComponent().stateMgr;
		},
		getID: function()
		{
			return this.$reflect('namespace')+'.'+this.$reflect('name');
		},
		getSafeID: function()
		{
			return (this.$reflect('namespace')+'.'+this.$reflect('name')).replace(/\./g,'-');
		},
		getCmp: function(cmp)
		{
			return this.getParentComponent().getCmp(cmp);
		},
		getModel: function(model)
		{
			return this.getParentComponent().getModel(model);
		},
		getView: function(view)
		{
			return this.getParentComponent().getView(view);
		},
		getConfig: function(key)
		{
			return this.getParentComponent().getConfig(key);
		}
	}
);