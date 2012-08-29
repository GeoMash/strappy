#Building an Application Component

The idea behind creating a main application component is to create the presence of a "core" for your application. A central component which manages core business logic in your front end application.<br>

Depending on how you decide to build your application as a whole will dictate which tools you incorporate into your application component.<br>

Strappy comes with several core tools to help manage your application. Such tools are the {@link strappy.InitQueue Init Queue}, Signals, {@link strappy.ShareMgr Shared Store Manager} and {@link strappy.SharedState Shared State}.<br>

This guide will step you through the recommended way to build an application component and take advantage of the tools which Strappy provides.

##Scaffolding the Application Component

Using Strappy's command line tool, run this command, but change the path to reflect your project.

	strap.py component application -d ../../../../Project

By running that command, you have created the shell for your new application component. The new component will be found in the directory you specified under "component/application".

Note that you can run this same command for generating other components. You can also concatenate the component names with a comma to generate multiple new components at once.
Substituting "component" for "model", "view", "controller" or "store" will create those for you too, but be sure to specify which component you're generating it for by providing a "-cmp <componentName>" argument.

##Main Component File

Open Applicaiton.js, it should look something like this:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component',
			$name:		'Application',
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

So far, its very simple. We'll need to add and remove some things. At this stage we're really just creating place-holders.

Your new Application.js file should look something like this:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component',
			$name:		'Application',
			$extends:	strappy.Component
		}
	)
	(
		{
			Signal:
			{
				
			},
			Type:
			{
				
			},
			Key:
			{
				
			}
		},
		{
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

An explanation of what we're doing with those static containers will be in the next chapter.

##Signals

###Filtering

Signals are predefined here and used throughout your application by components.<br>
The idea is to prevent direct communication between components. We do this by emitting signals which are caught by whatever components are registered to receive them.<br>
But a lot of the time you need to control exactly which signals reach what components.

To achieve this, we make the application component behave as a mediator of the signals. Components (application component excluded), emit signals with a destination filter set to "application".

Sender Example (Other Component):

	this.sendSignal
	(
		Project.component.Application.Signal.BROWSE,
		Project.component.Application.Type.SELECT,
		{
			key:			this.getConfig('signalKey'),
			destination:	'application'
		}
	);

Receiver Example (Application Component):

	this.registerSignals
	(
		{
			onBrowse:
			{
				signal:	Project.component.Application.Signal.BROWSE,
				type:	Project.component.Application.Type.SELECT,
				filter:
				{
					destination:	'application',
					key:			Project.component.Application.Key.LIST_CHANNELS
				}
			}
		}
	);

You can see a couple more items in those examples which haven't been explained yet. We'll get to those in a moment. But first, the important thing to note in these examples is the filtering.

With signal filtering, you can attach any filter you like to a signal, whatever component's register for those signals will only execute their callback methods if their filter matches the filter that was set when emitting the signal.

Some other things of note in the above example is the use of "type" and "key".

###Type

Type is another level of filtering. It is in fact the first level of filtering. You don't actually need to specify a type or a filter when emitting a signal but doing so helps to get the message to the right components.
Usually type is used as the action that was taken which caused the signal to be emitted. So in the above example, the action of "selecting" an item on screen was the cause, so we specify the SELECT type. This could have been "double click" in which case we could specify a DBCLICK type.
This helps you to control, with precision, what user actions in your application cause which business controls to be executed, ultimately allowing different interactions to result in slightly different behaviours.

###Key

Depending on the size and nature of the application you're building, you may need to create generic components. Generic components are usually reusable components, that is, a component which is initialized multiple times either by the application component or by any number of composite components that you create.

As you can imagine, when a generic component emits a signal, chances are it's going to be the exact same signal as another instance of the same component. This is where signal keys are used.

Signal keys are unique strings which are passed to the component during its configuration phase. This string is then attached to every signal that the component emits.
As you can see in the above example, components can listen in for those signals and attach a key filter, which means that the listener will always receive signals from the component it was expecting to receive it from.


...

##Generic Components

We mentioned generic components earlier. This section of the guide is to explain, in detail, how to manage these components.

There are two approaches for this. I'll explain them both, but we'll be using the latter.

The first option, you can create composite components and consider them as "extensions" to your application component. That is to say, your application component instantiates these components, and these components instantiate subcomponents and manage those in similar ways to which the application component does.

The second option, and the option which we'll be demonstrating in this guide, is by using multiple controllers to handle the various sections of your application.
This approach reduces the amount of composite components and centralises the business logic by encapsulating the logic specialised controllers, managed by your application component.

Before continuing, if you have never built a generic component before, please skip over to the guide on creating generic components. Once you've completed that, return here and continue.

Assuming you've done that. Let's have a look at a diagram and talk through it.

{@img images/ApplicationComponent.png Application Component Overview}

Let's start by discussing some of things that are considered external to the Application Component

## Shared Entities

There are three different shared entities. These are state, models and stores.

### State

The state shared entity is a specialised store which holds global _private_ state properties. It is very useful for holding cross-application state or config which is used by sub components.

Nothing special is required to be done in order to use the shared state. Simply call the helper methods which are available in every view and controller to get or set shared state properties.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.controller',
			$name:		'Default',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			onReadyState: function()
			{
				var view=this.getView('Default');
				if (this.getSharedState('authenticated'))
				{
					view.showMain();
				}
				else
				{
					view.showLogin();
				}
			},
			onLogin: function(email,password)
			{
				this.asyncServerLogin
				(
					{
						email:		email,
						password:	password
					},
					function(response)
					{
						if (response.success)
						{
							this.setSharedState('authenticated');
						}
						else
						{
							this.getView('Default').displayErrorMessage(response.message);
						}
					}.bind(this);
				);
			}
		}
	);

###Models

Shared models are useful for defining data structures which are commonly used across the application. Generally these are representations of your tables in your database, but may also include meta data for component-specific use.

These models, and also shared stores, need to be namespaced in a "shared" space within your top level namespace for your project.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.shared.model',
			$name:		'User',
			$extends:	strappy.mvc.Model
		}
	)
	(
		{},
		{
			fields:
			{
				id:					null,
				email:				'',
				password:			null,					//Always null unless being changed.
				last_activity:		'0000-00-00 00:00:00',
				created:			'0000-00-00 00:00:00',
				status:				0						//0 - Inactive; 1 - Active
			}
		}
	);

Like normal models, they are initalised for each record in a store. So the only other work involved is to attach your shared models to stores. Keeping in mind that they can be attached to any type
of store, be they shared or private.

###Stores

Shared stores are one of the most useful tools in the framework. They allow you to define a store which can be plugged into any number of components. There are various ways to do them, we're going to cover them all here and explain where and why you would use each approach.

Before we do that. This must be metioned again. Any shared store must be namespaced in a  "shared" space within your top level namespace for your project. Failing to do this with a shared store will render it unusable unless you manually initalise it - which defeats the purpose of shared stores.
This is because the component core manually initalises the {@link strappy.ShareMgr shared store manager}. This in turn initialises each shared store found in the shared namespace, overriding their definitions and recreating them as singletons.

First, lets let at what a shared store looks like.

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.shared.store',
			$name:		'Users',
			$extends:	strappy.data.MultiModelStore
		}
	)
	(
		{},
		{
			model:		Project.shared.model.User,
			BTL:		'Project.BTL',
			BTL_GET:	'Project.API.user.get',
			BTL_SET:	'Project.API.user.set'
		}
	);


Note the above example is using BTL for managing the data. See the BTL guide for more information about that.

Now let's look at how to use these stores.

####Direct Usage

One way to use a shared store is to simply access it directly via its full namespace. This is generally only ever done in your applicaiton controllers. This is because child components should always be considered dumb and never try to communicate with anything outside of its scope.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.controller',
			$name:		'Default',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			onReadyState: function()
			{
				//Sync the system users so we can show a table of them...
				Project.shared.store.Users.sync();
				this.getView('Default').drawUsersTable();
			}
		}
	);

####Attaching

Another way is to attach the stores "as is" directly to the component.

The best way to do this is by overriding the component's configure method and observing when the component has been configured.

This is almost always done when a child component needs to be dynamically configured with a store. This is generally the case for generic components, as they should never know their data
source until it is provided to them during thier configuration phase.

Below is a good example of how this can be done.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component',
			$name:		'Grid',
			$extends:	strappy.Component
		}
	)
	(
		{},
		{
			config:
			{
				signalKey:				null,
				columnStore:			null,
				recordStore:			null
			},
			components:	{},
			stores:		[],
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
						this.attachSharedStore('Columns',this.getConfig('columnStore'));
						this.attachSharedStore('Records',this.getConfig('recordStore'));
					}.bind(this)
				);
				this.configure.$parent(newConfig);
			}
		}
	);


####Binding & Extending

Finally, there is a way in which you can create a component level store and tell it to share all the properties and funtionality from another store.

The great thing about this feature is that it isn't limited to shared stores. Techincally you can tell it to share from any store application-wide, but for best practices it is encouraged that you only share from shared stores.

Below is an example of how its done.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.store',
			$name:		'Users',
			$extends:	strappy.data.MultiModelStore
		}
	)
	(
		{},
		{
			sharedFrom:	'Project.shared.store.Users'
		}
	);

So as you can see, its pretty straight forward. Simply define a "sharedFrom" property on your store and it will behave as if it were that shared store. This is completely transparent to the rest of your code, so you simply access the store as you usually would.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.view',
			$name:		'Default',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			drawUsersTable: function()
			{
				var wrapper=$(
					[
						'<table>',
							'<tr>',
								'<th>Email</th>',
								'<th>Last Active</th>',
								'<th>Created</th>',
							'</tr>',
						'</table>'
					].join(''));
				this.getStore('Users').each
				(
					function(record)
					{
						wrapper.append
						(
							[
								'<tr>',
									'<td>'+record.get('email')+'</td>',
									'<td>'+record.get('last_activity')+'</td>',
									'<td>'+record.get('created')+'</td>',
								'</tr>'
							].join('')
						);
					}.bind(this)
				);
				this.getContainer()	.html('')			//Empty
									.append(wrapper);	//Insert
			}
		}
	);

So that's all pretty simple stuff and works really well. But the real power of using shared from comes from the ability to override and add additional functionality to that store instance and leave the shared store unaffected by the additions.

Let's have a look at some examples of this in action.

First, let's assume that we want our view to only show active users, but we don't want to put that logic into the view. We'll extend the store to provide this functionality.


	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.store',
			$name:		'Users',
			$extends:	strappy.data.MultiModelStore
		}
	)
	(
		{},
		{
			sharedFrom:	'Project.shared.store.Users',
			
			//Override the each method.
			each: function(callback)
			{
				this.find({status:1}).each(callback);
				return this;
			}
		}
	);

Now the next time that the "drawUsersTable" method is called, only users with a status of 1 (active), will be shown.

