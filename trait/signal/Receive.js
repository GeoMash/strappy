/**
 * @class strappy.trait.signal.Receive
 * This trait enables a {@link strappy.mvc.Model model},
 * {@link strappy.mvc.View view} or {@link strappy.mvc.Controller controller}
 * with the ability to register and receive signals.
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'strappy.trait.signal',
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
			$extends:	strappy.mvc.Controller
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
		registerSignals: function(registrations)
		{
			for (var callback in registrations)
			{
				if (Object.isFunction(this[callback]))
				{
					if (Object.isAssocArray(registrations[callback]))
					{
						if (Object.isDefined(registrations[callback].signal))
						{
							if (Object.isDefined(registrations[callback].filter)
							|| Object.isDefined(registrations[callback].type))
							{
								this.getRadioTower().observe
								(
									registrations[callback].signal,
									function(callback,signal)
									{
										if (signal.isForMe((registrations[callback].type || null),(registrations[callback].filter || null)))
										{
											return this[callback](signal);
										}
									}.bind(this,callback)
								);
							}
							else
							{
								this.getRadioTower().observe(registrations[callback].signal,this[callback].bind(this));
							}
						}
						else
						{
							throw new Error('Signal not defined for registerSignals.');
						}
					}
					else
					{
						this.getRadioTower().observe(registrations[callback],this[callback].bind(this));
					}
				}
				else
				{
					throw new Error('Attempt to bind signal to undefined callback "'+callback+'".');
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