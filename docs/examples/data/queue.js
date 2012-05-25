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
//			var queue=new framework.data.Queue();
//			queue	.attachProxy(this.getStore('Foo').getProxy())
//					.attachProxy(this.getStore('Bar').getProxy())
//					.attachProxy(this.getStore('Baz').getProxy());
//			
//			//Make some changes to the stores ...
//			
//			queue.execute();
		}
	}
);