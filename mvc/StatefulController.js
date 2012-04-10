$JSKK.Class.create
(
	{
		$namespace:	'framework.mvc',
		$name:		'StatefulController',
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
		stateModel:	null,
		init: function()
		{
			this.registerSignals
			(
				[framework.Signal.STATE_CHANGE,'_onStateChange',framework.Signal.GLOBAL]
			);
			if (!(this.stateModel=this.getModel('State')))
			{
				throw new Error('Unable to initialize "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" State Controller. Controller requires a state model.');
			}
		},
		_onStateChange: function(signal)
		{
//			if (this.stateModel.isReady())
//			{
//				this.onStateChange(signal.getBody());
//			}
			this.onStateChange(signal.getBody());
		},
		onStateChange:	$JSKK.emptyFunction,
		updateState: function(key,value)
		{
			this.stateModel.set(key,value);
			return this;
		}
	}
);