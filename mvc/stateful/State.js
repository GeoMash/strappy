$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc.stateful',
		$name:		'State',
		$abstract:	true,
		$uses:
		[
			strappy.trait.ComponentConnector
		]
	}
)
(
	{},
	{	
		_stateController: null,
		/**
		 * @constructor
		 * 
		 * Sets up the controller by binding events and checking that a model
		 * named "State" has been defined for the associated component.
		 */
		init: function(stateController)
		{
			this._stateController = stateController;
		},
		/**
		 * NOTE: Might no be needed. Initially intended to perform activityChecks.
		 * Tests wether or not the current state should be active or inactive
		 * Check wether that test is needed after introducing the "State Pattern"
		 */
		//isActive: $JSKK.Class.ABSTRACT_METHOD,

		/**
		 * An abstract method to activate a component
		 * An "Active State" object would probably leave this method unused,
		 * for it has already been activated. However, it could still use this space 
		 * to communicate a "void" response to the user indicating why his input won't trigger any successive action.
		 * A specific "Inactive State" implementation on the other hand will do everything needed to transition
		 * from "inactive" to "active" State.
		 * Once it finished its business it will the set itself as the currentState of the StateController.
		 */
		activate: $JSKK.Class.ABSTRACT_METHOD,
		
		/**
		 * An abstract method to deactivate a component  
		 * A "Inactive State" object would probably leave this method unused,
		 * for it has already been activated. However, it could still use this space 
		 * to communicate a "void" response to the user indicating why his input won't any trigger successive action.
		 * A specific "Active State" implementation on the other hand will do everything needed to transition 
		 * from "active" to "inactive" State.
		 * Once it finished its business it will the set itself as the currentState of the StateController.
		 */
		deactivate:	$JSKK.Class.ABSTRACT_METHOD
	}
);