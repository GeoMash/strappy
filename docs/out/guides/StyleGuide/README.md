This is a simple style guide for using the framework with Spinifex software.

Config
======


Place top level component config within the main component file.

Make sure to always keep an "attachTo" config option. This option should replace
any such options that insert or attach the widget that you're converting into
a component to. 
<br>
<br>
Also keep it neat and tidy so that its easy on the eyes.
<br>
<br>

Example:
	$JSKK.Class.create
	(
		{
			$namespace:	'Kleepr.component',
			$name:		'Grid',
			$extends:	framework.Component
		}
	)
	(
		{
			//Signals go here...
		},
		{
			config:
			{
				attachTo:				null,
				rootNode:				0,
				uploadProgressColumn:	null,
				childPrefix:			'child-of-',
				nodePrefix:				'grid-',
				container:				null,
				columns:				{},
				store:					null,
				width:					null,
				height:					null,
				expandOnOver:			false,
				stripes:				false,
				defaultVariant:			'fit',
				indentation:			15,
				itemDblClickHandler:	null,
				editTriggerTimeout:		0
			},
			components:
			{
				
			},
			stores:
			[
				
			],
			views:
			[
				
			],
			controllers:
			[
				
			]
		}
	);

<br>
<br>
Config is always accessed through a getter method. This is available to all MVC instances.
<br>
<br>
Example:
	$.each(this.getConfig('columns'), function(key, columnData)
	{
		if(columnData.editable) {
			this._prepareCellForEditMode($('span.' + key, item), columnData);
		}
	}.bind(this));

<br>
<br>
Binding
=======

Bind everything with the "bind" function extension. If you MUST create create a shortcut to this, don't use "me" use "$this".

<br>
Example:
	$.each(sortedChildren, function(i, child)
	{
		this.getView('Default').getWrapper().append($(child));
	}.bind(this));
	
	var $this=this;
	this.draggableConfig.helper	=this.dragHelper.bind(this);
	this.droppableConfig.drop	=function(event, ui) {$this.dropHandler(this, event, ui);};
	this.droppableConfig.over	=function(event, ui) {$this.dragOverHandler(this, event, ui);};

<br>
<br>

Controllers, Views & Traits
===========================

A few rules to follow here.

<br>
Controllers & Views
-----------
Seems that "many controllers, few views" is a good way to go.
So try to break down your controllers into categories. Eventually we'll start to see some patterns emerge as we
build components. This will increase the speed at which we can create components due to code reuse and convention.
<br>
A few good ways to identify if something should be in a controller or a view:
<br>
###Controllers:
<br>
* Does the code try to made a decision?
* Does it iteract with another controller or component?
* Does it write to a store?
<br>
###Views:
<br>
* Does it bind to a DOM event?
* Does it directly affect the DOM?
* Does USE models to generate HTML?
* Does it generate HTML?
<br>

Traits
------
Additionally, we want to try to avoid code duplication as much as possible. So if something can be rewritten to be
more generic. Rewrite it as a trait and use it in components.
<br>
We may need to break these down into "view traits" and "controller traits".
<br>
The traits namespace will be "<projectName>.trait.<controller/view>.<traitName>" and will be globally accessible.
<br>


Method Names
============

Simple rules to follow here.
<br>
* Camel case only.
* No underscores! - Not even to start the method name.
* Make them meaningful. I don't care if the method names are massive, so long as they make sense.
<br>
Constants
=========

JSKK provides a static section (its the first {} block). Put all constants there.
If a class is referring to its own constant, than the cleanest solution is to use reflection to access it.
<br>
Example:

	if (foo==this.reflect('self').SOME_CONSTANT)
	{
		//Do something...
	}

<br>
<br>