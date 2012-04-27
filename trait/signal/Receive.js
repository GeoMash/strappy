/**
 * @class framework.trait.signal.Receive
 * This trait enables a {@link framework.mvc.Model model},
 * {@link framework.mvc.View view} or {@link framework.mvc.Controller controller}
 * with the ability to register and receive signals.
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'framework.trait.signal',
		$name:		'Receive'
	}
)
(
	{
		/**
		 * Registers signals that the class implementing this trait will
		 * listen for and binds them to callbacks within the class.
		 * 
		 * Example:
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
			onReadyState: function()
			{
				this.registerSignals
				(
					[Application.component.MyComponent.SIGNAL.LOGIN_SUCCESS,'onLoginSuccess'],
					[Application.component.MyComponent.SIGNAL.LOGIN_FAILURE,'onLoginFailure']
				);
			},
			onLoginSuccess: function(signal)
			{
				//Do somthing here...
			},
			onLoginFailure: function(signal)
			{
				//Do somthing here...
			}
		}
	);
		 * 
		 * @param {Array} signals The signals to register.
		 * @throws Error if the callback to bind to does not exist.
		 */
		registerSignals: function()
		{
			var	signals=$JSKK.toArray(arguments);
			if (!Object.isArray(signals))signals=[signals];
			for (var i=0,j=signals.length; i<j; i++)
			{
				if (Object.isFunction(this[signals[i][1]]))
				{
					if (signals[i][2]!=framework.Signal.GLOBAL)
					{
						this.getRadioTower().observe
						(
							signals[i][0],
							function(i,signal)
							{
								var body=signal.getBody();
								if (body.id==this.getID()
								|| body.component==this.getCmpName())
								{
									return this[signals[i][1]](signal);
								}
							}.bind(this,i)
						);
					}
					else
					{
						this.getRadioTower().observe(signals[i][0],this[signals[i][1]].bind(this));
					}
				}
				else
				{
					throw new Error('Attempt to bind signal to undefined callback "'+signals[i][1]+'".');
				}
			}
		},
		registerSignalOnce: function(signal,callback)
		{
			if (!Object.isFunction(callback))
			{
				if (Object.isFunction(this[callback]))
				{
					callback=this[callback];
				}
				else
				{
					throw new Error('Attempt to bind signal to undefined callback "'+callback+'".');
				}
			}
			this.getRadioTower().observeOnce
			(
				signal,
				function(signal)
				{
					var body=signal.getBody();
					if (body.id==this.getID()
					|| body.component==this.getCmpName())
					{
						return callback(signal);
					}
				}.bind(this)
			);
		}
	}
);