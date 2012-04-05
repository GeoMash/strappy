$JSKK.Class.create
(
	{
		$namespace:	'framework.mvc',
		$name:		'Controller',
		$uses:
		[
			framework.trait.ComponentConnector,
			framework.trait.signal.Receive,
			framework.trait.signal.Send,
			framework.trait.command.Send
		]
	}
)
(
	{},
	{
        /**
         * Initialization
         *
         */
		init: function()
		{
//			this.registerSignals
//			(
//				[framework.SIGNAL.VIEW_DONE_INIT,			'onViewInit'],
//				[framework.SIGNAL.VIEW_DONE_GOTBASEHTML,	'onGotBaseHTML'],
//				[framework.SIGNAL.VIEW_BEFORE_RENDER,		'onBeforeRender']
//			);
//			this.sendSignal(framework.SIGNAL.CONTROLLER_DONE_INIT,{id:this.getID()});
			this.registerSignals
			(
				[framework.Signal.CMP_DO_RECONFIGURE,		'onReconfigure'],
				[framework.Signal.VIEW_IS_READY,			'onViewReady'],
				[framework.Signal.VIEW_DONE_GOTBASEHTML,	'onGotBaseHTML']
			);
		},
		onViewReady:	$JSKK.emptyFunction,
		onGotBaseHTML: 	$JSKK.emptyFunction,
//		onBeforeRender:	$JSKK.emptyFunction,
		onReconfigure:	$JSKK.emptyFunction
	}
);