/**
 * @class strappy.mvc.Controller
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * Bound Signals:
 * 
 * * {@link strappy.Signal.SHOW}: {@link strappy.mvc.Controller#onSignalShow}
 * * {@link strappy.Signal.HIDE}: {@link strappy.mvc.Controller#onSignalHide}
 * * {@link strappy.Signal.VIEW_DONE_GOTBASEHTML}: {@link strappy.mvc.Controller#onGotBaseHTML}
 * * {@link strappy.Signal.STATEFULMODEL_IS_READY}: {@link strappy.mvc.Controller#onReadyState}
 * 
 * 
 * @uses strappy.trait.ComponentConnector
 * @uses strappy.trait.signal.Receive
 * @uses $JSKK.trait.Observable
 * @abstract
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc',
		$name:		'Controller',
		$abstract:	true,
		$uses:
		[
			'strappy.trait.ComponentConnector',
			'strappy.trait.signal.Receive',
			// 'strappy.trait.signal.Send',
			'$JSKK.trait.Observable'
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
			this.registerSignals
			( 
				{
					onSignalShow:
					{
						signal:		strappy.Signal.SHOW,
						type:		'strappy',
						filter:		{iid:this.getIID()}
					},
					onSignalHide:
					{
						signal:		strappy.Signal.HIDE,
						type:		'strappy',
						filter:		{iid:this.getIID()}
					}
				}
			);
		},
		/**
		 * This method will be called when a component fires the onAfterCmpInit event.
		 * signal.
		 * @abstract
		 */
		onAfterCmpInit:	$JSKK.emptyFunction,
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
		 * @deprecated
		 * This method will be called when a view fires a {@link strappy.Signal.VIEW_DONE_GOTBASEHTML Got Base HTML}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onGotBaseHTML: 	$JSKK.emptyFunction,
		/**
		 * @deprecated
		 * This method will be called when a state model fires a {@link strappy.Signal.STATEFULMODEL_IS_READY Stateful Model is Ready}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onReadyState:	$JSKK.emptyFunction,
		/**
		 * This method will be called when something fires a {@link strappy.Signal.SHOW Show component signal}.
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onSignalShow:	$JSKK.emptyFunction,
		/**
		 * This method will be called when something fires a {@link strappy.Signal.HIDE Hide component signal}.
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onSignalHide:	$JSKK.emptyFunction
	}
);