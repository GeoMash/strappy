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
		onReadyState: function()
		{
			this.registerSignals
			(
				[Application.component.MyComponent.SIGNAL.LOGIN_SUCCESS,'onLoginSuccess'],
				[Application.component.MyComponent.SIGNAL.LOGIN_FAILURE,'onLoginFailure']
			);
		},
		onLoginSuccess: function(signal)
		{
			//Do somthing here...
		},
		onLoginFailure: function(signal)
		{
			//Do somthing here...
		}
	}
);