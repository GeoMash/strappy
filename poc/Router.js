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
			
			console.debug($('[data-strappy-route]'));
			$('[data-strappy-route]').click(this.onClickableRoute.bind(this));
		},
		onClickableRoute: function(event)
		{
			var section=$(event.currentTarget).data('strappy-route');
			console.debug(section);
			if (Object.isString(section))
			{
				this.goTo(section);
			}
		},
		isValidRoute: function(section)
		{
			//TODO: Regex.
			return this.routes.inArray(section);
		},
		
		/**
		 * Used by everything except the state controller
		 * to set the "section".
		 */
		goTo: function(section)
		{
			this.getStore('State').set('section',section);
		},
		/**
		 * Used by the state controller to handle changes
		 * to the "section" state.
		 */
		routeTo: function(section)
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
					console.debug('routeTo:',section);
					var nodes=section.split('/');
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