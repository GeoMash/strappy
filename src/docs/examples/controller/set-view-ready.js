$JSKK.Class.create
(
	{
		$namespace:	'Application.component.myComponent.controller',
		$name:		'State',
		$extends:	framework.mvc.stateful.Controller
	}
)
(
	{},
	{
		onViewReady: function(signal)
		{
			this.setViewReadyState(signal.getBody().id);
		}
	}
);