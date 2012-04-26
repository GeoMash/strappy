/**
 * @class framework.mvc.Controller
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * Bound Signals:
 * 
 * * {@link framework.Signal.CMP_DO_RECONFIGURE}: {@link framework.mvc.Controller#onReconfigure}
 * * {@link framework.Signal.VIEW_IS_READY}: {@link framework.mvc.Controller#onViewReady}
 * * {@link framework.Signal.VIEW_DONE_GOTBASEHTML}: {@link framework.mvc.Controller#onGotBaseHTML}
 * * {@link framework.Signal.STATEFULMODEL_IS_READY}: {@link framework.mvc.Controller#onReadyState}
 * 
 * @mixins framework.trait.ComponentConnector
 * @mixins framework.trait.signal.Receive
 * @mixins framework.trait.signal.Send
 * @abstract
 * 
 * @uses framework.trait.ComponentConnector
 * @uses framework.trait.signal.Receive
 * @uses framework.trait.signal.Send
 */
$JSKK.Class.create
(
	{
		$namespace:	'framework.mvc',
		$name:		'Controller',
		$uses:
		[
			framework.trait.ComponentConnector,
			framework.trait.signal.Receive,
			framework.trait.signal.Send
		]
	}
)
(
	{},
	{
		/**
		 * @constructor
		 * 
		 * Sets up the controller by binding to the above mentioned signals.
		 */
		init: function()
		{
			this.registerSignals
			(
				[framework.Signal.CMP_DO_RECONFIGURE,		'onReconfigure'],
				[framework.Signal.VIEW_IS_READY,			'onViewReady'],
				[framework.Signal.VIEW_DONE_GOTBASEHTML,	'onGotBaseHTML'],
				[framework.Signal.STATEFULSTORE_IS_READY,	'onReadyState']
			);
		},
		/**
		 * This method will be called when a component fires a {@link framework.Signal.CMP_DO_RECONFIGURE Do Reconfigure}
		 * signal.
		 * @abstract
		 * @param {framework.Signal} The signal object.
		 */
		onReconfigure:	$JSKK.emptyFunction,
		/**
		 * This method will be called when a view fires a {@link framework.Signal.VIEW_IS_READY ready}
		 * signal.
		 * @abstract
		 * @param {framework.Signal} The signal object.
		 */
		onViewReady:	$JSKK.emptyFunction,
		/**
		 * This method will be called when a view fires a {@link framework.Signal.VIEW_DONE_GOTBASEHTML Got Base HTML}
		 * signal.
		 * @abstract
		 * @param {framework.Signal} The signal object.
		 */
		onGotBaseHTML: 	$JSKK.emptyFunction,
		/**
		 * This method will be called when a state model fires a {@link framework.Signal.STATEFULMODEL_IS_READY Stateful Model is Ready}
		 * signal.
		 * @abstract
		 * @param {framework.Signal} The signal object.
		 */
		onReadyState:	$JSKK.emptyFunction
	}
);