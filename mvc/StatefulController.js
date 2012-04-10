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
				[framework.Signal.STATE_CHANGE,				'_onStateChange',framework.Signal.GLOBAL],
				[framework.Signal.VIEW_IS_READY,			'onViewReady']
			);
			if (!(this.stateModel=this.getModel('State')))
			{
				throw new Error('Unable to initialize "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" State Controller. Controller requires a state model.');
			}
		},
		_onStateChange: function(signal)
		{
			//Ignore all state changes if the state model is not flagged as ready.
			if (this.stateModel.isReady())
			{
				this.onStateChange(signal.getBody());
			}
		},
		onStateChange:	$JSKK.emptyFunction,
		onViewReady:	$JSKK.emptyFunction,
		setReady:		function()
		{
			this.stateModel.setReady(true);
		},
		updateState:	function(key,value)
		{
			this.stateModel.set(key,value);
			return this;
		},
		setViewReadyState: function(view)
		{
			this.stateModel.setViewReady(view);
			return this;
		},
		getReadyViews: function()
		{
			return this.stateModel.getReadyViews();
		}
	}
);