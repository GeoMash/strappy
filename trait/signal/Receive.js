$JSKK.Trait.create
(
	{
		$namespace:	'framework.trait.signal',
		$name:		'Receive',
		$implements:
		[
			framework.iface.Signal
		]
	}
)
(
	{
        /*
        * TODO: Needed? If not delete
            registerSignal: function(signal,callback)
            {
                this.getCore().observe(signal,callback);
            },
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
		}
	}
);