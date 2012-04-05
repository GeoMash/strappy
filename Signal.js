$JSKK.Class.create
(
	{
		$namespace:		'framework',
		$name:			'Signal',
		$uses:
		[
			$JSKK.trait.Configurable
		]
	}
)
(
	{
		//Scope
		LOCAL:					'local',
		GLOBAL:					'global',
		
		//State
		STATE_CHANGE:			'state.change',
		
		//Component
		CMP_DO_RECONFIGURE:		'component.do.reconfigure',
		
		//Views
		VIEW_IS_READY:				'view.is.ready',
//		VIEW_DO_INIT:				'view.do.init',
//		VIEW_DONE_INIT:				'view.done.init',
		VIEW_DONE_GOTBASEHTML:		'view.done.gotBaseHTML',
		VIEW_DO_INSERTBASEHTML:		'view.do.insertBaseHTML',
		VIEW_BEFORE_RENDER:			'view.before.render',
		VIEW_DONE_RENDER:			'view.done.render',
		VIEW_DO_SHOW:				'view.do.show',
		VIEW_DO_HIDE:				'view.do.hide',
		VIEW_DONE_SHOW:				'view.done.show',
		VIEW_DONE_HIDE:				'view.done.hide',
		
		//Controllers
		CONTROLLER_DO_INIT:			'controller.do.init',
		CONTROLLER_DONE_INIT:		'controller.done.init',
		CONTROLLER_DO_DESTROY:		'controller.do.destroy',
		
		//Models
		MODEL_DONE_CHANGE:			'model.done.change',
		STATEFULMODEL_DONE_CHANGE:	'stateful.model.done.change',
		COMMAND_COMPLETE:			'command.complete'
		
	},
	{
		config:
		{
			name:	null,	// Required
			body:	null,	// Optional
			type:	null,	// Optional
			filter:	{}		// Optional
		},
		init: function()
		{
			
		},

		getName: function()
		{
			return this.config.name;
		},

		getBody: function()
		{
			return this.config.body;
		},

		getType: function()
		{
			return this.config.type;
		},

		getFilter: function()
		{
			return this.config.filter;
		},

		forMe: function(type,filter)
		{
			// Placeholder
		}
	}
);