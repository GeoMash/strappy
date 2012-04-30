/**
 * @class framework.mvc.stateful.Controller
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * Bound Signals:
 * 
 * * {@link framework.Signal.STATE_CHANGE}: {@link framework.mvc.stateful.Controller#_onStateChange}
 * * {@link framework.Signal.VIEW_IS_READY}: {@link framework.mvc.stateful.Controller#onViewReady}
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
		$namespace:	'framework.mvc.stateful',
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
		 * @property {framework.data.stateful.Store} stateStore A reference to the
		 * associated state model.
		 * @private
		 */
		stateStore:	null,
		/**
		 * @constructor
		 * 
		 * Sets up the controller by binding events and checking that a model
		 * named "State" has been defined for the associated component.
		 */
		init: function()
		{
			this.registerSignals
			(
				[framework.Signal.STATE_CHANGE,				'_onStateChange',framework.Signal.GLOBAL],
				[framework.Signal.VIEW_IS_READY,			'onViewReady']
			);
			if (!(this.stateStore=this.getStore('State')))
			{
				throw new Error('Unable to initialize "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" State Controller. Controller requires a state model.');
			}
			(this.$reflect('uses') || []).each
			(
				function(trait)
				{
					console.debug(trait.toString());
//					console.debug(trait.$reflect('name'));
				}
			);
//			console.debug('USES: ',this.$reflect('uses'));
		},
		/**
		 * A private method which wraps the functionality of
		 * {@link framework.mvc.stateful.Controller#onStateChange} and blocks
		 * all signals until the associated {@link framework.mvc.stateful.Model State Model}
		 * is ready.
		 * 
		 * @private
		 * @param {framework.Signal} The signal object.
		 * @return {void}
		 */
		_onStateChange: function(signal)
		{
			//Ignore all state changes if the state model is not flagged as ready.
			if (this.stateStore.isReady())
			{
				this.onStateChange(signal.getBody());
			}
		},
		/**
		 * This method will be called whenever a state change signal
		 * has been received.
		 * 
		 * Note that state change signals are blocked until the associated
		 * {@link framework.mvc.stateful.Model State Model} is ready.
		 * @abstract
		 * @param {framework.Signal} The signal object.
		 */
		onStateChange:	$JSKK.emptyFunction,
		/**
		 * This method will be called when a view fires a {@link framework.Signal.VIEW_IS_READY ready}
		 * signal.
		 * @abstract
		 * @param {framework.Signal} The signal object.
		 */
		onViewReady:	$JSKK.emptyFunction,
		/**
		 * Flags the {@link framework.mvc.stateful.Model State Model}
		 * as ready.
		 * 
		 * @return {framework.mvc.stateful.Controller}
		 */
		setReady:		function()
		{
			this.stateStore.setReady(true);
			return this;
		},
		/**
		 * Updates a stateful property in the {@link framework.mvc.stateful.Model State Model}.
		 * @param {String} key The name of the state property to update.
		 * @param {Mixed} value The new value.
		 * @return {framework.mvc.stateful.Controller}
		 */
		updateState:	function(key,value)
		{
			this.stateStore.set(key,value);
			return this;
		},
		/**
		 * Flags a view as ready.
		 * @param {String} view The name of the view to flag as ready.
		 * @return {framework.mvc.stateful.Controller}
		 */
		setViewReadyState: function(view)
		{
			this.stateStore.setViewReady(view);
			return this;
		},
		/**
		 * Returns a list of views that have been flagged as ready.
		 * @return {Array} An array of view names.
		 */
		getReadyViews: function()
		{
			return this.stateStore.getReadyViews();
		}
	}
);