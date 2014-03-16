$JSKK.Class.create
(
	{
		$namespace:	'test.application.controller',
		$name:		'Main',
		$extends:	'strappy.mvc.Controller'
	}
)
(
	{},
	{
		onAfterCmpInit: function()
		{
			var view=this.getView('Main');
//			view.show();
//			if (!Object.isNull(this.getState('filters')))
//			{
//				this.getStore('Items').add(this.getState('filters'));
//			}
			this.cmp().setReady();
		}
	}
);