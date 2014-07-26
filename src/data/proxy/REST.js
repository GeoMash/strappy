$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.proxy',
		$name:		'REST',
		$extends:	'strappy.data.proxy.AbstractProxy',
		$uses:
		[
			'strappy.data.trait.CRUD'
		]
	}
)
(
	{},
	{
		config:
		{
			create:		'',
			read:		'',
			upsert:		'',
			destroy:	'',
			params:		''
		}
	}
)