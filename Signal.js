/**
 * @class framework.Signal
 * This is the signal class. It is used as a factory by the
 * {@link framework.trait.signal.Send} trait.
 * 
 * This class also contains constants for every framework level
 * signal that is emitted by the base {@link framework.Component component class},
 * {@link framework.mvc.Model models}, {@link framework.mvc.View views} and
 * {@link framework.mvc.Controller controllers}.
 * 
 * An instance of this class is generated for every signal
 * that is invoked by the framework.
 * 
 * Every signal contains at least a name and a body. A signal may
 * optionally contain a type property and a filter. The latter two
 * properties can be used to fine-grainly filter a signal so that it
 * is not used in the wrong way.
 * 
 * @mixin $JSKK.trait.Configurable
 * @uses $JSKK.trait.Configurable
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework',
		$name:			'Signal',
		$uses:
		[
			$JSKK.trait.Configurable
		]
	}
)
(
	{
		//Scope
		/**
		 * @property LOCAL Forces the signal to be localized within the component
		 * that it was sent from.
		 * @static
		 */
		LOCAL:						'local',
		/**
		 * @property GLOBAL Forces the signal to be global. Meaning it will be sent
		 * to all components.
		 * @static
		 */
		GLOBAL:						'global',
		
		//State
		/**
		 * @property STATE_CHANGE
		 * @static
		 */
		STATE_CHANGE:				'state.change',
		
		//Component
		/**
		 * @property CMP_DO_RECONFIGURE
		 * @static
		 */
		CMP_DO_RECONFIGURE:			'component.do.reconfigure',
		
		//Views
		/**
		 * @property VIEW_IS_READY
		 * @static
		 */
		VIEW_IS_READY:				'view.is.ready',
		/**
		 * @property VIEW_DONE_GOTBASEHTML
		 * @static
		 */
		VIEW_DONE_GOTBASEHTML:		'view.done.gotBaseHTML',
		/**
		 * @property VIEW_DO_INSERTBASEHTML
		 * @static
		 */
		VIEW_DO_INSERTBASEHTML:		'view.do.insertBaseHTML',
		/**
		 * @property VIEW_BEFORE_RENDER
		 * @static
		 */
		VIEW_BEFORE_RENDER:			'view.before.render',
		/**
		 * @property VIEW_DONE_RENDER
		 * @static
		 */
		VIEW_DONE_RENDER:			'view.done.render',
		/**
		 * @property VIEW_DO_SHOW
		 * @static
		 */
		VIEW_DO_SHOW:				'view.do.show',
		/**
		 * @property VIEW_DO_HIDE
		 * @static
		 */
		VIEW_DO_HIDE:				'view.do.hide',
		/**
		 * @property VIEW_DONE_SHOW
		 * @static
		 */
		VIEW_DONE_SHOW:				'view.done.show',
		/**
		 * @property VIEW_DONE_HIDE
		 * @static
		 */
		VIEW_DONE_HIDE:				'view.done.hide',
		
		//Controllers
		/**
		 * @property CONTROLLER_DO_INIT
		 * @static
		 */
		CONTROLLER_DO_INIT:			'controller.do.init',
		/**
		 * @property CONTROLLER_DONE_INIT
		 * @static
		 */
		CONTROLLER_DONE_INIT:		'controller.done.init',
		/**
		 * @property CONTROLLER_DO_DESTROY
		 * @static
		 */
		CONTROLLER_DO_DESTROY:		'controller.do.destroy',
		
		//Stores
		/**
		 * @property STORE_DONE_CHANGE
		 * @static
		 */
		STORE_DONE_CHANGE:			'store.done.change',
		/**
		 * @property STORE_DONE_SYNC
		 * @static
		 */
		STORE_DONE_SYNC:			'store.done.sync',
		/**
		 * @property STORE_FAILED_SYNC
		 * @static
		 */
		STORE_FAILED_SYNC:			'store.failed.sync',
		/**
		 * @property STATEFULSTORE_DONE_CHANGE
		 * @static
		 */
		STATEFULSTORE_DONE_CHANGE:	'stateful.store.done.change',
		/**
		 * @property STATEFULSTORE_IS_READY
		 * @static
		 */
		STATEFULSTORE_IS_READY:		'stateful.store.is.ready',
		
		//Models
		/**
		 * @property MODEL_DONE_CHANGE
		 * @static
		 */
		MODEL_DONE_CHANGE:			'model.done.change',
		/**
		 * @property MODEL_LOCK_CHANGE
		 * @static
		 */
		MODEL_LOCK_CHANGE:			'model.lock.change',
		/**
		 * @property COMMAND_COMPLETE
		 * @static
		 */
		COMMAND_COMPLETE:			'command.complete'
		
	},
	{
		config:
		{
			/**
			 * @cfg {String} name The name of the signal.
			 */
			name:	null,	// Required
			/**
			 * @cfg {Object} body The body of the signal. This should be an object
			 * containing key/value pair values.
			 */
			body:	null,	// Optional
			/**
			 * @cfg {String} type An additional type filter.
			 */
			type:	null,	// Optional
			/**
			 * @cfg {Object} filter An additional filter containing a mix of
			 * key/value pair values.
			 */
			filter:	{}		// Optional
		},
		/**
		 * Gets the name of the signal.
		 * @return {String} The name of the signal.
		 */
		getName: function()
		{
			return this.config.name;
		},
		/**
		 * Gets the body of the signal.
		 * 
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.controller',
			$name:		'Default',
			$extends:	framework.mvc.Controller
		}
	)
	(
		{},
		{
			onGotBaseHTML: function(signal)
			{
				if (signal.getBody().id=='Application.component.myComponent.view.Default')
				{
					//Do something here...
				}
			}
		}
	);
		 * 
		 * @return {Object} The body of the signal.
		 */
		getBody: function()
		{
			return this.config.body;
		},
		/**
		 * Gets the type of the signal.
		 * @return {String} The signal type.
		 */
		getType: function()
		{
			return this.config.type;
		},
		/**
		 * Gets the filter object of the signal.
		 * @return {Object} The signal's filter object.
		 */
		getFilter: function()
		{
			return this.config.filter;
		},
		/**
		 * This method will check the signals type and filter against
		 * the provided type and filter to see if they match.
		 * 
		 * Controllers can use this method in case they require fine-grained
		 * controll over which signals are accepted/rejected.
		 * 
		 * @param type {String} The signal type to be tested against as a string.
		 * @param filter {Object} The signal filter to be tested against as an object.
		 * @return {Boolean} True if the filter is a match.
		 * 
		 * NOTE: NOT IMPLEMENTED
		 */
		forMe: function(type,filter)
		{
			// Placeholder
		}
	}
);