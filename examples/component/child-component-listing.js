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
		components:
		{
			loginForm:		'Application.component.LoginForm',
			errorWindow:	'Application.component.DialogWindow',
			successWindow:	'Application.component.DialogWindow'
		}
	}
);