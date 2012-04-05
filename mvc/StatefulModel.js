$JSKK.Class.create
(
	{
		$namespace:	'framework.mvc',
		$name:		'StatefulModel',
		$uses:
		[
			framework.trait.ComponentConnector,
			framework.trait.signal.Send
		]
	}
)
(
	{},
	{
		ready:	false,
		state:{},
		set: function(key,value)
		{
			this.state[key]=value;
			this.sendSignal(framework.Signal.STATEFULMODEL_DONE_CHANGE,{change:[key,value]});
			return this;
		},
		setReady: function(ready)
		{
			this.ready=ready;
		},
		isReady: function()
		{
			return this.ready;
		},
		get: function(key)
		{
			return this.state[key];
		}
	}
);