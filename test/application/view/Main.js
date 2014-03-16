$JSKK.Class.create
(
	{
		$namespace:	'test.application.view',
		$name:		'Main',
		$extends:	'strappy.mvc.View',
		$uses:
		[
			'strappy.ccl.trait.Scrollable'
		]
	}
)
(
	{},
	{
		templates:
		{
			
		},
		onAfterCmpInit: function()
		{
			this.getStore('Items').observe('onSync',this.syncView.bind(this));
			this.syncView();
		},
		bindDOMEvents: function()
		{
//			this.bindDOMEvent
//			(
//				'click',
//				'',
//				'controller:Main',
//				''
//			);
		},
		syncView: function()
		{
			
		}
	}
);