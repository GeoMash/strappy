$JSKK.Class.create
(
	{
		$namespace:	'Application.component.myComponent.controller',
		$name:		'Default',
		$extends:	framework.mvc.Controller
	}
)
(
	{},
	{
		onGotBaseHTML: function(signal)
		{
			if (signal.getBody().id=='Application.component.myComponent.view.Default')
			{
				//Do something here...
			}
		}
	}
);