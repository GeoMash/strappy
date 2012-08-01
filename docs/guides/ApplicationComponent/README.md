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

Firstly, you can create composite components and consider them as "extensions" to your application component. That is to say, your application component instantiates these components, and these components instantiate subcomponents and manage those in similar ways to which the application component does.




