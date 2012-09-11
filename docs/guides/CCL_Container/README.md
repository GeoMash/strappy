#CCL - Container Component

The container component is a component primarily designed for scaffolding. It supports three types of layouts which help you create simple or complex application structures.

This is a little guide explaining how to use it. It assumes you know how to load the Strappy CCL.

All children defined default to being a Container component unless the "cmp" config property is defined. This reduces verbosity and simplifies the creation of complex layouts.



Observer for all children that are ready.

Observer example:
	var container=new strappy.ccl.Container();

	container.observe
	(
		'onChildReady',
		function(ref,child)
		{
			
		}.bind(this)
	);

##Configs

###attachTo
Standard strappy attachTo config.


###signalKey
Standard strappy signalTo config.


###ref
The reference which this component will be given to it's parent component.


###cmp
Provide either a literal or string based reference to a component to be created. Note that this only applies to children.


###cls
One or more CSS classes to attach to the container.


###style
Custom CSS styles to attach to the container. This should be passed in as a CSS class.


###autoShow
This config enables the component to automatically be shown when it is ready. It defaults to true.


###children
A single child object or an array of child objects. They default to being Container components if "cmp" isn't specified.


###layout
The type of layout to use. Valid layouts are "auto", "card" and "html". Defaults to "auto".



##Layouts

As already mentioned, this component comes with three different layout types.


###Auto



###Card

Card layouts are commonly used for switching between content sections, often in conjunction with tab panels or wizards.

A card layout enables you to layer multiple pieces of content over the one content space (or container), and keep only one visible at any time.

Switching is enabled through the use of an switch instruction signal and providing a "card" property in the body of the signal.

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
			init: function()
			{
				this.init.$parent();
				this.getController('State')	.observe('onReadyState',this.onReadyState.bind(this));
			},
			onReadyState: function()
			{
				var container=new strappy.ccl.Container();

				container.observe
				(
					'onChildReady',
					function(ref,child)
					{
						if (ref=='card')
						{
							//Switch to the blue card in the
							this.getController('Default').sendSignal
							(
								strappy.CCL.Signal.SWITCH,
								strappy.CCL.Type.INSTRUCTION,
								{
									key:		'card1',
									destination:'container'
								},
								{card:'blue'}
							);
						}
						else if (ref=='card.blue')
						{
							//Switch to the green card in the inner card layout.
							this.getController('Default').sendSignal
							(
								strappy.CCL.Signal.SWITCH,
								strappy.CCL.Type.INSTRUCTION,
								{
									key:		'card2',
									destination:'container'
								},
								{card:'green'}
							);
						}
					}.bind(this)
				);

				container.configure
				(
					{
						ref:			'card',
						signalKey:		'card1',
						attachTo:		'#'+this.getIID(),
						cls:			'container',
						autoShow:		true,
						layout:			'card',
						activeCard:		'green',
						children:
						[
							{
								ref:			'red',
								cls:			'redContainer'
							},
							{
								ref:			'green',
								cls:			'greenContainer'
							},
							{
								ref:			'blue',
								signalKey:		'card2',
								cls:			'blueContainer',
								layout:			'card',
								activeCard:		'red',
								children:
								[
									{
										ref:			'red',
										cls:			'redContainer',
										style:
										{
											width:	100,
											height:	100,
											border: '1px solid black'
										}
									},
									{
										ref:			'green',
										cls:			'greenContainer',
										style:
										{
											width:	100,
											height:	100,
											border: '1px solid black'
										}
									},
									{
										ref:			'blue',
										cls:			'blueContainer',
										style:
										{
											width:	100,
											height:	100,
											border: '1px solid black'
										}
									}
								]
							}
						]
					}
				);
			}
		}
	);

###HTML

The HTML layout allows you to give an arbitrary amount of HTML and have it inserted into the container.

It accepts the HTML as part of the "children" config.

TODO EXAMPLE