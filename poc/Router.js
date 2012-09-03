$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.application',
		$name:		'Router',
		$extends:	strappy.mvc.Controller
	}
)
(
	{},
	{
		routes:[],
		init: function()
		{
			this.init.$parent();
			this.getView('Structure').observe('onReady',this.onViewReady.bind(this));
		},
		onViewReady: function()
		{
			$('[data-strappy-route]').click(this.onClickableRoute.bind(this));
		},
		onClickableRoute: function(event)
		{
			var path=$(event.currentTarget).data('strappy-route');
			console.debug(path);
			if (Object.isString(path))
			{
				this.goTo(path);
			}
		},
		isValidRoute: function(path)
		{
			//TODO: Regex.
			return this.routes.inArray(path);
		},
		
		/**
		 * Used by everything except the state controller
		 * to set the "route".
		 */
		goTo: function(path)
		{
			this.getStore('State').set('p',path);
		},
		/**
		 * Used by the state controller to handle changes
		 * to the "p" state.
		 */
		routeTo: function(path)
		{
			$JSKK.when
			(
				function()
				{
					return this.getStore('State').get('structureReady');
				}.bind(this)
			).isTrue
			(
				function()
				{
					console.debug('routeTo:',path);
					var nodes=path.split('/');
					if (nodes.shift()=='admin')
					{
						var	node		=nodes.shift(),
							first		=node.substring(0,1),
							remainder	=node.substring(1),
							controller	=first.toUpperCase()+remainder;
						this.getController(controller)[nodes.shift()](nodes.shift());
					}
				}.bind(this)
			);
		}
	}
);