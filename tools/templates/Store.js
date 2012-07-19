$JSKK.Class.create
(
	{
		$namespace:	'{NS_FULL}.store',
		$name:		'{STORE_NAME}',
		$extends:	strappy.data.MultiModelStore
	}
)
(
	{},
	{
		model:	{NS_FULL}.model.{STORE_NAME}
		data:	[]
	}
);