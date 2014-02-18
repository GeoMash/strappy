#Signals

{@img images/ApplicationComponent.png Application Component Overview}

Signals are predefined here and used throughout your application by components.
The idea is to prevent direct communication between components. We do this by emitting signals which are caught by whatever components are registered to receive them.

Tipically it is a good idea to have a component behave as a mediator of the signals. Generally this is done by the main application component. But there are cases where you'll need to build composite components which do the same thing.

An example of where signals, signal types and signal keys are defined.
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
				BROWSE:			'Project.signal.browse'
			},
			Type:
			{
				SELECT:			'Project.type.select'
			},
			Key:
			{
				LIST_CHANNELS:	'Project.key.listChannels'
			}
		},
		{}
	);

##Filtering

But a lot of the time you need to control exactly which signals reach what components. This is where filtering comes in handy.

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

##Type

Type is another level of filtering. It is in fact the first level of filtering. You don't actually need to specify a type or a filter when emitting a signal but doing so helps to get the message to the right components.
Usually type is used as the action that was taken which caused the signal to be emitted. So in the above example, the action of "selecting" an item on screen was the cause, so we specify the SELECT type. This could have been "double click" in which case we could specify a DBCLICK type.
This helps you to control, with precision, what user actions in your application cause which business controls to be executed, ultimately allowing different interactions to result in slightly different behaviours.

##Key

Depending on the size and nature of the application you're building, you may need to create generic components. Generic components are usually reusable components, that is, a component which is initialized multiple times either by the application component or by any number of composite components that you create.

As you can imagine, when a generic component emits a signal, chances are it's going to be the exact same signal as another instance of the same component. This is where signal keys are used.

Signal keys are unique strings which are passed to the component during its configuration phase. This string is then attached to every signal that the component emits.
As you can see in the above example, components can listen in for those signals and attach a key filter, which means that the listener will always receive signals from the component it was expecting to receive it from.


