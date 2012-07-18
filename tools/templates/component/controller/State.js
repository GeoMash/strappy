$JSKK.Class.create
(
	{
		$namespace:	'{NS_FULL}.controller',
		$name:		'State',
		$extends:	strappy.mvc.stateful.Controller
	}
)
(
	{},
	{
		init: function()
		{
			this.init.$parent();
			this.getView('Structure').observe('onReady',this.onViewReady.bind(this));
		},
		onBeforeChange: function(state,key,value)
		{
			
		},
		onViewReady: function(view)
		{
			this.setViewReadyState(view.$reflect('name'));
			if (this.getReadyViews().inArray(view.$reflect('name')))
			{
				this.setReady();
			}
		}
	}
);