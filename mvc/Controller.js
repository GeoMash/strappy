/**
 * @class strappy.mvc.Controller
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * Bound Signals:
 * 
 * * {@link strappy.Signal.CMP_DO_RECONFIGURE}: {@link strappy.mvc.Controller#onReconfigure}
 * * {@link strappy.Signal.VIEW_IS_READY}: {@link strappy.mvc.Controller#onViewReady}
 * * {@link strappy.Signal.VIEW_DONE_GOTBASEHTML}: {@link strappy.mvc.Controller#onGotBaseHTML}
 * * {@link strappy.Signal.STATEFULMODEL_IS_READY}: {@link strappy.mvc.Controller#onReadyState}
 * 
 * @mixins strappy.trait.ComponentConnector
 * @mixins strappy.trait.signal.Receive
 * @mixins strappy.trait.signal.Send
 * @abstract
 * 
 * @uses strappy.trait.ComponentConnector
 * @uses strappy.trait.signal.Receive
 * @uses strappy.trait.signal.Send
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc',
		$name:		'Controller',
		$uses:
		[
			strappy.trait.ComponentConnector,
			strappy.trait.signal.Receive,
			strappy.trait.signal.Send,
			$JSKK.trait.Observable
		]
	}
)
(
	{},
	{
		events:
		{
			
		},
		/**
		 * @constructor
		 * 
		 * Sets up the controller by binding to the above mentioned signals.
		 */
		init: function()
		{
			
		},
		/**
		 * This method will be called when a component fires a {@link strappy.Signal.CMP_DO_RECONFIGURE Do Reconfigure}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onReconfigure:	$JSKK.emptyFunction,
		/**
		 * This method will be called when a view fires a {@link strappy.Signal.VIEW_IS_READY ready}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onViewReady:	$JSKK.emptyFunction,
		/**
		 * This method will be called when a view fires a {@link strappy.Signal.VIEW_DONE_GOTBASEHTML Got Base HTML}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onGotBaseHTML: 	$JSKK.emptyFunction,
		/**
		 * This method will be called when a state model fires a {@link strappy.Signal.STATEFULMODEL_IS_READY Stateful Model is Ready}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onReadyState:	$JSKK.emptyFunction
	}
);