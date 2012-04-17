$JSKK.Class.create
(
	{
		$namespace:	'Application.component.helloWorld.model',
		$name:		'State',
		$extends:	framework.mvc.stateful.Model
	}
)
(
	{},
	{
		state:
		{
			day:		'MONDAY',
			dayWindow:	false
		}
	}
);