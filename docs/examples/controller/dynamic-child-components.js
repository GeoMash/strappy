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
		onGotBaseHTML: function(view)
		{
			var thisChildCmp=null;
			for (var i=0; i<10; i++)
			{
				thisChildCmp=this.getParentComponent().newChildComponent('Application.component.Tile');
				thisChildCmp.configure({attachTo:view.getContainer()});
			}
		}
	}
);