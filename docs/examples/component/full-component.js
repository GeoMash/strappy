$JSKK.Class.create
(
	{
		$namespace:	'Application.component',
		$name:		'MyComponent',
		$extends:	framework.Component
	}
)
(
	{
		SIGNAL:
		{
			LOGIN_SUCCESS:		'myComponent.login.success',
			LOGIN_FAILURE:		'myComponent.login.fail'
		}
	},
	{
		components:
		{
			loginForm:		'Application.component.LoginForm',
			errorWindow:	'Application.component.DialogWindow',
			successWindow:	'Application.component.DialogWindow'
		},
		models:
		[
			'State',
			'User'
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