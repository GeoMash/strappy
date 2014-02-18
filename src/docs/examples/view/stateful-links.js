$JSKK.Class.create
(
	{
		$namespace:	'Application.component.myComponent.view',
		$name:		'Default',
		$extends:	framework.mvc.View
	}
)
(
	{},
	{
		onReady: function()
		{
			this.bindStatefulLinks
			(
				['[href="#container-home"]',	'section=home'],
				['[href="#container-news"]',	'section=news'],
				['[href="#container-about"]',	'section=about']
			);
		}
	}
);