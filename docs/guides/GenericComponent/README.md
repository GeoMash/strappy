#Building a Generic List Component

In this guide, we'll go through the steps of building a generic component that can be reused multiple times throughout your application.

Note that this guide isn't going to be touching on styling or anything like that. Though we will touch on the idea of attaching CSS classes to these components to make them appear differently in your application.

This component is going to be an interactive list. You'll be able to select an item and have some other component in your application use the value of that list item that was clicked.

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
				allLabel:		'All Items',
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
				this.observeOnce
				(
					'onConfigured',
					function()
					{
						this.attachSharedStore('Records',this.getConfig('recordStore'));
					}.bind(this)
				);
				this.configure.$parent(newConfig);
			}
		}
	);

Much better. But "what's that at the bottom?" I hear you ask. Well because this will be a generic component, we'll be utilising a shared store.

Shared stores are stores which don't belong to a particular component. They can be used by multiple components either natively or abstractly.In this case, we'll be using a shared store natively.
We do this by overriding the component's configure method. We re-factor it so that we can observe when the component has been configured, before anything else gets a chance to observe the same.
This technique ensures that the shared store can be natively attached before any other part of the component attempts to access it.

##Controller

Open the Default controller. It should look something like this:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.list.controller',
			$name:		'Default',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			init: function()
			{
				this.init.$parent();
				this.getController('State')	.observe('onReadyState',		this.onReadyState.bind(this));
			},
			onReadyState: function()
			{
				this.getView('Default').syncView();
			},
			onSignalShow: function()
			{
				this.getView('Default').show();
			},
			onSignalHide: function()
			{
				this.getView('Default').hide();
			}
		}
	);

For this example we won't be needing onTemplatesLoaded, so delete that the observer and local callback method.

It should now look like this:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.list.controller',
			$name:		'Default',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			init: function()
			{
				this.init.$parent();
				this.getController('State').observe('onReadyState',this.onReadyState.bind(this));
			},
			onReadyState: function()
			{
				this.getView('Default').syncView();
			},
			onSignalShow: function()
			{
				this.getView('Default').show();
			},
			onSignalHide: function()
			{
				this.getView('Default').hide();
			}
		}
	);

A bit too simple. We need to make it do something. So what we're going to do is build a method which our view will hook into to manage what happens when a list item is clicked.

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.list.controller',
			$name:		'Default',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			init: function()
			{
				this.init.$parent();
				this.getController('State').observe('onReadyState',this.onReadyState.bind(this));
			},
			onReadyState: function()
			{
				this.getView('Default').syncView();
			},
			onSignalShow: function()
			{
				this.getView('Default').show();
			},
			onSignalHide: function()
			{
				this.getView('Default').hide();
			},
			onListItemClick: function(event)
			{
				var model=$(event.currentTarget).data('model');
				this.sendSignal
				(
					Project.component.Application.Signal.BROWSE,
					Project.component.Application.Type.CLICK,
					{
						key:		this.getConfig('signalKey'),
						destination:'application'
					},
					model
				);
			}
		}
	);

This new method, onListItemClick, will be called when a list item is clicked. We'll get to how this happens a little later. Firstly lets step through what's happening here.

We receive a jQuery event object and we extract the model instance that was associated with it. We then send a signal with that model attached.

The signal itself is made up of four parts. The signal name, which is a BROWSE signal, the type of signal, which is a CLICK type and a filter. Here we're attaching the signalKey which will be passed
into the component when it gets configured.

Finally we attach the model to the signal as its body. This enables anything that receives the signal to work with the model instance directly. Note that the model will still be attached to its store,
so any changes to the model will cause store change events to be fired. Since this model will belong to a shared store, this is a very powerful thing as you effectively update every component currently using
this shared store simply by modifying the model instance.

We're assuming your data is coming from the server. So we want to update our view to reflect any large changes that may happen. To do this we can tie into the onSync event of the store.

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.list.controller',
			$name:		'Default',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			init: function()
			{
				this.init.$parent();
				this.getController('State')	.observe('onReadyState',this.onReadyState.bind(this));
				this.getStore('Records')	.observe('onSync',		this.onSync.bind(this));
			},
			onReadyState: function()
			{
				this.getView('Default').syncView();
			},
			onSignalShow: function()
			{
				this.getView('Default').show();
			},
			onSignalHide: function()
			{
				this.getView('Default').hide();
			},
			onListItemClick: function(event)
			{
				var model=$(event.currentTarget).data('model');
				this.sendSignal
				(
					Project.component.Application.Signal.BROWSE,
					Project.component.Application.Type.CLICK,
					{
						key:		this.getConfig('signalKey'),
						destination:'application'
					},
					model
				);
			},
			onSync: function()
			{
				this.getView('Default').syncView();
			}
		}
	);

As you can see, we added this line into our init:

	this.getStore('Records')	.observe('onSync',		this.onSync.bind(this));

That calls our local onSync method which calls syncView() on the view.

##View

