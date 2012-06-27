/**
 * @class strappy.mvc.stateful.Controller
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * Bound Signals:
 * 
 * * {@link strappy.Signal.STATE_CHANGE}: {@link strappy.mvc.stateful.Controller#onStateChange}
 * * {@link strappy.Signal.VIEW_IS_READY}: {@link strappy.mvc.stateful.Controller#onViewReady}
 * 
 * @mixins strappy.trait.ComponentConnector
 * @mixins strappy.trait.signal.Receive
 * @mixins strappy.trait.signal.Send
 * @mixins strappy.trait.signal.Bindable
 * @abstract
 * 
 * @uses strappy.trait.ComponentConnector
 * @uses strappy.trait.signal.Receive
 * @uses strappy.trait.signal.Send
 * @uses strappy.trait.signal.Bindable
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc.stateful',
		$name:		'Controller',
		$abstract:	true,
		$uses:
		[
			strappy.trait.ComponentConnector,
			strappy.trait.signal.Receive,
			strappy.trait.signal.Send,
			strappy.trait.signal.Bindable,
			$JSKK.trait.Observable
		]
	}
)
(
	{},
	{
		events:
		{
			onBeforeReadyState:	true,
			onReadyState:		true
		},
		/**
		 * @property {strappy.data.stateful.Store} stateStore A reference to the
		 * associated state model.
		 * @private
		 */
		stateStore:			null,
		/**
		 * This method will be called whenever a state change signal
		 * has been received.
		 * 
		 * Note that state change signals are blocked until the associated
		 * {@link strappy.mvc.stateful.Model State Model} is ready.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onBeforeChange:		$JSKK.Class.ABSTRACT_METHOD,
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
				{
					onStateChangeFromStateMgr:	strappy.Signal.STATE_CHANGE
				}
			);
			if (!(this.stateStore=this.getStore('State')))
			{
				throw new Error('Unable to initialize "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" State Controller. Controller requires a state model.');
			}
			//Bind the state stuff before firing the onReady event.
			this.stateStore.observe('onBeforeChange',	this.onBeforeChange.bind(this));
			this.stateStore.observe('onChange',			this.onStateChange.bind(this));
		},
		/**
		 * A private method which wraps the functionality of
		 * {@link strappy.mvc.stateful.Controller#onStateChange} and blocks
		 * all signals until the associated {@link strappy.mvc.stateful.Model State Model}
		 * is ready.
		 * 
		 * @private
		 * @param {strappy.Signal} The signal object.
		 * @return {void}
		 */
		onStateChangeFromStateMgr: function(signal)
		{
			//Ignore all state changes if the state model is not flagged as ready.
			if (this.stateStore.isReady())
			{
				// this.onStateChange(signal.getBody());
				var state=signal.getBody();
				for (var item in state)
				{
					if (this.stateStore.canManageStateItem(item))
					{
						var oldValue=this.stateStore.get(item);
						if (!this.stateStore.set(item,state[item]))
						{
							var restoredState	={};
							restoredState[item]	=oldValue;
							this.getStateMgr().updateState(restoredState,true);
						}
					}
				}
			}
		},
		/**
		 * This method will be called when a view fires a {@link strappy.Signal.VIEW_IS_READY ready}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onViewReady:	$JSKK.emptyFunction,
		/**
		 * Flags the {@link strappy.mvc.stateful.Model State Model}
		 * as ready.
		 * 
		 * @return {strappy.mvc.stateful.Controller}
		 */
		setReady:		function()
		{
			this.stateStore.setReady(true);
			if (this.fireEvent('onBeforeReadyState',this,true)!==false)
			{
				var state=this.getStateMgr().getState()
				for (var item in state)
				{
					if (this.stateStore.canManageStateItem(item))
					{
						var oldValue=this.stateStore.get(item);
						if (!this.stateStore.set(item,state[item]))
						{
							var restoredState	={};
							restoredState[item]	=oldValue;
							this.getStateMgr().updateState(restoredState,true);
						}
					}
				}
				this.fireEvent('onReadyState',this,true);
			}
			return this;
		},
		/**
		 * Updates a stateful property in the {@link strappy.mvc.stateful.Model State Model}.
		 * @param {String} key The name of the state property to update.
		 * @param {Mixed} value The new value.
		 * @return {strappy.mvc.stateful.Controller}
		 */
		updateState:	function()
		{
			this.stateStore.set(key,value);
			this.stateStore.set.apply(this.stateStore,$JSKK.toArray(arguments));
			return this;
		},
		/**
		 * Flags a view as ready.
		 * @param {String} view The name of the view to flag as ready.
		 * @return {strappy.mvc.stateful.Controller}
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