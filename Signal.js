/**
 * @class strappy.Signal
 * This is the signal class. It is used as a factory by the
 * {@link strappy.trait.signal.Send} trait.
 * 
 * This class also contains constants for every framework level
 * signal that is emitted by the base {@link strappy.Component component class},
 * {@link strappy.mvc.Model models}, {@link strappy.mvc.View views} and
 * {@link strappy.mvc.Controller controllers}.
 * 
 * An instance of this class is generated for every signal
 * that is invoked by the strappy.
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
		$namespace:		'strappy',
		$name:			'Signal',
		$uses:
		[
			strappy.trait.signal.Send
		]
	}
)
(
	{
		//Component
		/**
		 * @property COMPONENT_IS_READY
		 * @static
		 */
		COMPONENT_IS_READY:			'strappy.component.ready',
		
		//State
		/**
		 * @property STATE_CHANGE
		 * @static
		 */
		STATE_CHANGE:				'strappy.state.change',
		
		//Component
		/**
		 * @property CMP_DO_RECONFIGURE
		 * @static
		 */
		CMP_DO_RECONFIGURE:			'strappy.component.do.reconfigure',
		
		SHOW:						'strappy.component.show',
		HIDE:						'strappy.component.hide'
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
		init: function(config)
		{
			this.config.name	=config.name	|| null;
			this.config.body	=config.body	|| null;
			this.config.type	=config.type	|| null;
			this.config.filter	=config.filter	|| {};
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
			$extends:	strappy.mvc.Controller
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
		 */
		isForMe: function(type,filter)
		{
			if (!Object.isNull(type))
			{
				if (this.getType()!=type)
				{
					return false;
				}
			}
			if (!Object.isNull(filter))
			{
				var localFilter=this.getFilter();
				for (var item in filter)
				{
					if (Object.isUndefined(localFilter[item])
					|| filter[item]!=localFilter[item])
					{
						return false;
					}
				}
			}
			return true;
		},
		resend: function(filter,body)
		{
			if (Object.isUndefined(body))
			{
				body=this.getBody();
			}
			this.sendSignal(this.getName(),this.getType(),filter,body);
			return this;
		}
	}
);