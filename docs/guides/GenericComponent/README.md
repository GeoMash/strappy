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

Open the component's Default view. It should look something like this.

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.list.view',
			$name:		'Default',
			$extends:	strappy.mvc.View
		}
	)
	(
		{},
		{
			templates:
			{
				
			},
			onReady: function()
			{
				
			},
			bindDOMEvents: function()
			{
				
			},
			syncView: function()
			{
				
			}
		}
	);


Its very simple right now as this is what a default view looks like after running it through the scaffolding tool.

Before we get started, one factor needs to be explained which affects the way you think of a view. A view is simply a helper class with a set of logic to manipulate the way your component works.
You can have multiple views, each with their own set of tasks, or cram all the logic into a single view. It really depends on the size and complexity of your component.

Each component is rendered with a container div. This div is given a unique ID based on the component namespace and name. And a class name based on the component namespace and name.

You can access this DOM element with the following helper method:

	this.getContainer()

You'll see this method and the concept of the wrapper container used and talked about many times through this and other Strappy guides.

We're going to start with some basic stuff. Templates is a container where you define which templates your component will load and use. Templates will be explained in more detail in the following section.
For now, simply change it to look like this:

	templates:
	{
		wrapper:	'wrapper.html',
		item:		'item.html'
	}

As you can see, you start of with a bunch of pre-defined callbacks. These are actually abstract methods of the parent view class. This means that they must be implemented otherwise the JSKK parser will
throw an exception complaining that your class is invalid.

###onReady

This callback is fired when all your templates have been loaded.

We won't be doing much with this method. Unfortunately, the framework doesn't yet automatically call bindDOMEvents, so we'll be calling that here. Update the method to look like this:

	onReady: function()
	{
		this.bindDOMEvents();
	}

###bindDOMEvents

This callback exists to keep your view classes clean and consistent. It is a place where you should be defining all
the live events that are associated with your view.

We only need to bind one even for this component, and that is simply a click event.

There are several helper functions which Strappy view's provide to bind DOM events each with very similar syntax, but achieve slightly different results. This ultimately helps you hook into whatever
specific behaviours your component may require.

We'll touch on one of these helper methods in this guide. So update your bindDOMEvents method to look like this:

	bindDOMEvents: function()
	{
		this.bindDOMEvent
		(
			'click',
			'li',
			'controller:Default',
			'onListSelect'
		);
	}

Let's step through the bindDOMEvent method so we can better understand it.

The first thing to note is that this wraps jQueries "on" event binder functionality and it does it to create live events. This means that you can define these events before your view has rendered
and even after having rendered new elements in your view.

Secondly, this binds to the wrapper container. This means that your events are not going to conflict with other components nor will they conflict with other instances of this component.

The first parameter is the event. In this case we want to capture click events.

The second parameter is a CSS selector. In this case we want to select all the LI's in this view.

The third parameter is the callback target. The syntax for this is simple:

	<controller|view>:<name>

Most of the time, the decision about what to do should be handled by the controller. But there are cases where it doesn't make sense to do that, so you can direct it back to the view, or another view.
The name is the class name, so in our case, we've told it to go to the Default controller.

The forth parameter is the callback method which is to be called on the target.

###syncView

This is another method to keep views consistent across all components. This is the place where logic related to take data from your stores and rendering them onto the screen should take place.
The idea as that your controllers call this method at certain steps in your business logic which require the view to be forcefully refreshed or rendered for the first time.

Before we get into code, its probably a good idea to define our templates.

In your views folder, create a new folder named "html" and create two files in it named "group.html" and "wrapper.html".

Keep an open mind about this next part. Usually for simple HTML fragments, you wouldn't bother with a template. But for the sake of demonstrating templates in this guide, we'll be using two simple templates.

Place the following code fragments into the templates:

####item.html
	<li><p></p></li>

####wrapper.html
	<div class="inner-container-x">
		<ul></ul>
	</div>

So we're going to load these and use them to generate our list.

Change your syncView method to look like this:

	syncView: function()
	{
		var wrapper			=$(this.getTemplate('wrapper')),
			itemTemplate	=this.getTemplate('item');
		this.getStore('Records').each
		(
			function(item)
			{
				var itemEl=$(itemTemplate);
				itemEl.data('model',item);
				
				if (item.get('active'))
				{
					itemEl.addClass('active');
				}
				itemEl.find('p').html(item.get('label'));
				wrapper.find('ul').append(itemEl);
			}.bind(this)
		);
		this.getContainer().append(wrapper);
	}

Let's step through the code.

First we load the two templates and save them into local variables. We want to be appending instances of itemTemplates to the wrapper template. So we make the wrapper template a DOM element with jQuery.

Next we loop through each record in our records store with the built in "each" iterator.

For each record, we create a new DOM element from the item template.

We also need access to the model instance for the event which we hooked into controller earlier. So we bind it into the element by way of the jQuery data API.

Next we test if the item's "active" property is set to true. If it is, we attach an "active" class to the item.

Next we set the contents of the "p" tag which is within the li to the value of the "label" property.

The last step for each item is to attach it to the wrapper.

Finally at the end of the syncView method, we attach the wrapper to the component wrapper.

That is the bare minimum for what we need to do. However, it would be nice for the active class to be toggled on and off based on the model being changed.

This can be done very simply with the following line of code:

	item.observe('onChange',this.onRecordChange.bind(this,itemEl));

So now your syncView method should look like this:

	syncView: function()
	{
		var wrapper			=$(this.getTemplate('wrapper')),
			itemTemplate	=this.getTemplate('item');
		this.getStore('Records').each
		(
			function(item)
			{
				var itemEl=$(itemTemplate);
				itemEl.data('model',item);
				
				if (item.get('active'))
				{
					itemEl.addClass('active');
				}
				itemEl.find('p').html(item.get('label'));
				wrapper.find('ul').append(itemEl);
				item.observe('onChange',this.onRecordChange.bind(this,itemEl));
			}.bind(this)
		);
		this.getContainer().append(wrapper);
	}

Obviously you'll need to write the "onRecordChange" callback method. It will look like this:

	onRecordChange: function(itemEl,model)
	{
		itemEl.find('p').html(model.get('label'));
		itemEl.removeClass('active');
		if (model.get('active'))
		{
			itemEl.addClass('active');
		}
	}

This function simply updated the view to reflect the active state of the model instance.

So finally, your view is complete. It should look something like this:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.list.view',
			$name:		'Default',
			$extends:	strappy.mvc.View
		}
	)
	(
		{},
		{
			templates:
			{
				wrapper:	'wrapper.html',
				item:		'item.html'
			},
			onReady: function()
			{
				this.bindDOMEvents();
			},
			bindDOMEvents: function()
			{
				this.bindDOMEvent
				(
					'click',
					'li',
					'controller:Default',
					'onListSelect'
				);
			},
			syncView: function()
			{
				var wrapper			=$(this.getTemplate('wrapper')),
					itemTemplate	=this.getTemplate('item');
				this.getStore('Records').each
				(
					function(item)
					{
						var itemEl=$(itemTemplate);
						itemEl.data('model',item);
						
						if (item.get('active'))
						{
							itemEl.addClass('active');
						}
						itemEl.find('p').html(item.get('label'));
						wrapper.find('ul').append(itemEl);
						item.observe('onChange',this.onRecordChange.bind(this,itemEl));
					}.bind(this)
				);
				this.getContainer().append(wrapper);
			},
			onRecordChange: function(itemEl,model)
			{
				itemEl.find('p').html(model.get('label'));
				itemEl.removeClass('active');
				if (model.get('active'))
				{
					itemEl.addClass('active');
				}
			}
		}
	);
