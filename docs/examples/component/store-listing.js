$JSKK.Class.create
(
	{
		$namespace:	'Application.component',
		$name:		'MyComponent',
		$extends:	framework.Component
	}
)
(
	{},
	{
		stores:
		[
			'State',
			'User'
		]
	}
);