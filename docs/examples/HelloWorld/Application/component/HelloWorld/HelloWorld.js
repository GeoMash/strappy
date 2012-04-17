$JSKK.Class.create
(
	{
		$namespace:	'Application.component',
		$name:		'HelloWorld',
		$extends:	framework.Component
	}
)
(
	{},
	{
		models:
		[
			'State',
			'Default'
		],
		views:
		[
			'Default'
		],
		controllers:
		[
			'State',
			'Default'
		]
	}
);