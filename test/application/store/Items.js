$JSKK.Class.create
(
	{
		$namespace:	'test.application.store',
		$name:		'Items',
		$extends:	'strappy.data.MultiModelStore'
	}
)
(
	{},
	{
		model:	'test.application.model.Item',
		data:	[]
	}
);