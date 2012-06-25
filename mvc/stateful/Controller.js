/**
 * @class framework.mvc.stateful.Controller
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * Bound Signals:
 * 
 * * {@link framework.Signal.STATE_CHANGE}: {@link framework.mvc.stateful.Controller#onStateChange}
 * * {@link framework.Signal.VIEW_IS_READY}: {@link framework.mvc.stateful.Controller#onViewReady}
 * 
 * @mixins framework.trait.ComponentConnector
 * @mixins framework.trait.signal.Receive
 * @mixins framework.trait.signal.Send
 * @mixins framework.trait.signal.Bindable
 * @abstract
 * 
 * @uses framework.trait.ComponentConnector
 * @uses framework.trait.signal.Receive
 * @uses framework.trait.signal.Send
 * @uses framework.trait.signal.Bindable
 */
$JSKK.Class.create
(
	{
		$namespace:	'framework.mvc.stateful',
		$name:		'Controller',
		$abstract:	true,
		$uses:
		[
			framework.trait.ComponentConnector,
			framework.trait.signal.Receive,
			framework.trait.signal.Send,
			framework.trait.signal.Bindable,
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
		 * @property {framework.data.stateful.Store} stateStore A reference to the
		 * associated state model.
		 * @private
		 */
		stateStore:			null,
		/**
		 * This method will be called whenever a state change signal
		 * has been received.
		 * 
		 * Note that state change signals are blocked until the associated
		 * {@link framework.mvc.stateful.Model State Model} is ready.
		 * @abstract
		 * @param {framework.Signal} The signal object.
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
					onStateChange:	framework.Signal.STATE_CHANGE
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
		 * {@link framework.mvc.stateful.Controller#onStateChange} and blocks
		 * all signals until the associated {@link framework.mvc.stateful.Model State Model}
		 * is ready.
		 * 
		 * @private
		 * @param {framework.Signal} The signal object.
		 * @return {void}
		 */
		onStateChange: function(signal)
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
			if (this.fireEvent('onBeforeReadyState',this,true)!==false)
			{
				this.fireEvent('onReadyState',this,true);
				
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
				
			}
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