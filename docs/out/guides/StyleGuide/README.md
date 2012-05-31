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

Bind everything with .bind. If you MUST create create a shortcut to this, don't use "me" use "$this".

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
<br>


