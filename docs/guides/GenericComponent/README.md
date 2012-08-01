#Building a Generic List Component

In this guide, we'll go through the steps of building a generic component that can be reused multiple times throughout your application.

Note that this guide isn't going to be touching on styling or anything like that. Though we will touch on the idea of attaching CSS classes to these components to make them appear differently in your application.

##Scaffolding the Component

Using Strappy's command line tool, run this command, but change the path to reflect your project.

	strap.py component list -d ../../../../Project

You should end up with something like this:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component',
			$name:		'List',
			$extends:	strappy.Component
		}
	)
	(
		{},
		{
			config:
			{
				
			},
			components:
			{
				
			},
			stores:
			[
				
			],
			views:
			[
				'Default'
			],
			controllers:
			[
				'Default'
			]
		}
	);

Lets pad it out a bit with things that we'll need.

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component',
			$name:		'List',
			$extends:	strappy.Component
		}
	)
	(
		{},
		{
			config:
			{
				attachTo:		null,
				cls:			null,
				allLabel:		'All Groups',
				recordStore:	null,
				signalKey:		null
			},
			components:
			{
				
			},
			stores:
			[
				
			],
			views:
			[
				'Default'
			],
			controllers:
			[
				'Default'
			],
			configure: function(newConfig)
			{
				this.configure.$parent(newConfig);
				this.observeOnce
				(
					'onConfigured',
					function()
					{
						this.attachSharedStore('Records',this.getConfig('recordStore'));
					}.bind(this)
				);
			}
		}
	);

Much better. But "what's that at the bottom?" I hear you ask. Well because this will be a generic component, we'll be utilising a 