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
		generateList: function()
		{
			var HTML=['<ul>'];
			this.getModel('Default').each
			(
				function(item)
				{
					HTML.push('<li><a href="'+item.url+'">'+item.name+'</a></li>');
				}
			);
			HTML.push('</ul>');
			return HTML.join('');
		}
	}
);