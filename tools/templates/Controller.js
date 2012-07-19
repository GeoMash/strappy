$JSKK.Class.create
(
	{
		$namespace:	'{NS_FULL}.controller',
		$name:		'{CONTROLLER_NAME}',
		$extends:	strappy.mvc.Controller
	}
)
(
	{},
	{
		init: function()
		{
			this.init.$parent();
			
		}
	}
);