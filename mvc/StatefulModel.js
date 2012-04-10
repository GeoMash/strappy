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
		ready:		false,
		readyViews:	[],
		state:		{},
		set: function(key,value)
		{
			this.state[key]=value;
//			this.sendSignal(framework.Signal.STATEFULMODEL_DONE_CHANGE,{change:[key,value]});
			var changeSet	={};
			changeSet[key]	=value;
			
			this.sendSignal(framework.Signal.STATEFULMODEL_DONE_CHANGE,{component:this.getCmpName(),change:changeSet});
			return this;
		},
		setReady: function(ready)
		{
			this.ready=ready;
			if (ready)
			{
				this.sendSignal(framework.Signal.STATEFULMODEL_IS_READY,{component:this.getCmpName()});
				var globalState=this.getStateMgr().getState();
				for (var globalItem in globalState)
				{
					for (var localItem in this.state)
					{
						if (localItem==globalItem)
						{
							this.state[localItem]=globalState[globalItem];
							break;
						}
					}
				}
			}
			this.sendSignal(framework.Signal.STATEFULMODEL_DONE_CHANGE,{component:this.getCmpName(),change:globalState});
			return this;
		},
		isReady: function()
		{
			return this.ready;
		},
		get: function(key)
		{
			return this.state[key];
		},
		setViewReady: function(view)
		{
			this.readyViews.push(view);
			return this;
		},
		getReadyViews: function()
		{
			return this.readyViews;
		}
	}
);