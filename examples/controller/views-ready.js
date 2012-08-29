$JSKK.Class.create
(
	{
		$namespace:	'Application.component.myComponent.controller',
		$name:		'State',
		$extends:	framework.mvc.stateful.Controller
	}
)
(
	{},
	{
		onViewReady: function(signal)
		{
			this.setViewReadyState(signal.getBody().id);
			var readyViews=this.getReadyViews();
			if (readyViews.inArray('Application.component.myComponent.view.Default')
			&& readyViews.inArray('Application.component.myComponent.view.OtherView'))
			{
				//All views are ready. Flag the component state as ready.
				this.setReady();
			}
		}
	}
);