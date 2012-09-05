Hello World
===============

**Level:** Beginner

Sneak Peek
------------------

This is the "Hello World" guide to your first Strappy component.
By the end of this tutorial you will have created a button component, 
which toggles the visibility of an 'h1'-tag containing the string "Hello World". 


{@img helloWorld_hidden.png Alt text}
<br>
<br>
{@img helloWorld_visible.png Alt text} 
<br>

Project SetUp
------------------

First of all, set up a new project using the IDE of your choice and name it "Hello World".<br>
You should end up with something that looks more or less like this:
{@img initialProjectSetupIDEShot.png Alt text} 
<br>

Dependencies
------------------

Strappy applications depend on the following three libraries:

1. [Strappy framework][1] <br>
(All the jazz that will enable you to create scaleable and maintainable projects, ranging from simple standalone components to full-blown applications.)


2. [JSKK Classing Engine][2] <br>
(A classing engine, straight out of our mad lab's coding oven. Strappy is based on JSKK and is the reason why you will be able write OOP without runnig into those little native JS traps. It also comes with a truckload of ready to use utils.)


3. [jQuery Download Page][3] <br>
(jQuery won't need much of introducing. Strappy depends on it and you will most likely too.)<br>

[1]: https://github.com/SpinifexGroup/strappy/zipball/master
[2]: https://github.com/melechi/JS-Klass-Kit/zipball/master
[3]: http://jquery.com/

Now create three sub directories in your lib folder and name them "jQuery", "JSKK" and "strappy". <br>

Once you have extracted your compressed downloads, locate the minified versions (strappy = "framework.min.js"; JSKK = "bin/jskk.min-1.0.1.js") and place them in the appropriate sub directories you just created. <br>
For jQuery you will simply copy the latest minified source off the jQuery website, create a new .js file and paste the copied source into that file. Name it jquery1.x.x.js and place it in your newly created jQuery folder under lib.

Your project outliner window should now look similar to this screenshot:

{@img dependenciesImportedAndHookedUp.png Alt text} 

Next, hook up those libraries in your "index.html" file. <br>
NOTE: The order in which those libraries are being imported matters. <br>
Strappy depends on both - jQuery and JSSK - and therefore needs to be included last.
HTML:
<br>
	<html>
		<head>
			<title>Strappy - Hello World</title>
		</head>
		<body>
			<script type="text/javascript" src="lib/JSKK/jskk.min-1.0.1.js"></script>
			<script type="text/javascript" src="lib/jQuery/jquery1.8.0.js"></script>
			<script type="text/javascript" src="lib/strappy/framework.min.js"></script>
		</body>
	</html>
<br>
<br>


Component SetUp
---------------

Now you should create a folder structure for your component. 
We're going to use the following folder/file structure. 
Create the folders and files in them.
Leave the files blank for now.
<br>
	/Application/component/
	/Application/component/button/
	/Application/component/button/Button.js
	/Application/component/button/controller/
	/Application/component/button/controller/State.js
	/Application/component/button/controller/Default.js
	/Application/component/button/model/
	/Application/component/button/store/
	/Application/component/button/store/State.js
	/Application/component/button/view/
	/Application/component/button/view/Default.js
	/Application/component/button/view/html/
	/Application/component/button/view/html/default.html
<br>

Your IDE project profiler window should now look something like this: 

<br>
{@img manuallyScaffolded.png Alt text}
<br>

Going back to your index.html, you will of course also need to import all those still empty classes you have just created.
So beneath your library imports add the following
HTML:
<br>
	// libraries
	// ... not displayed 
	//
	// component
	<script type="text/javascript"  src="Application/component/button/Button.js"></script>
	<script type="text/javascript"  src="Application/component/button/controller/Default.js"></script>
	<script type="text/javascript"  src="Application/component/button/controller/State.js"></script>
	<script type="text/javascript"  src="Application/component/button/store/State.js"></script>
	// if time implement an object model in order to illustrate component's basic data infrastructure  
	<script type="text/javascript"  src="Application/component/button/view/Default.js"></script>
<br>

When opening "index.html" in your browser you should not recive any errors. <br> 
If you do, you most likely have wired up your dependencies incorrectly or there is a typo in your links. <br> 
Check everything thoroughly and proceed with the next step - "MVC SetUp".

<br>

MVC SetUp
------------------

Every component you create in Strappy, no matter how small, has it's own "state" and therefore exists as an independent standalone MVC triad. In order to instantiate your component, we will start to implement the bare minimum requirements of your component's MVC structure.

The first thing we will create is our base and configuration class "Button.js". In it you will define it's nature, descent, possible child components as well as default config settings.

We will then work ourselves from the bottom up - starting with the view and its html-template, over the StateStore and ending in our Default and State controllers.

<br>
<b>Your component's base class</b>
	$JSKK.Class.create
	(
		{
			$namespace: 'Application.component',
			$name:      'Button',
			$extends:   strappy.Component
		}
	)
	(
		{},
		{
			models:
			[
				'Default'
			],
			views:
			[
				'Default'
			],
			controllers:
			[
				'Default'
			],
			stores:
			[
				// your stores in here
			]
		}
	);
<br>
<br>

Inspecting our Button.js class at the very top, we can see that our class is being created passing in an initial object holding three key value pairs:

1. $namespace:	The namespace convention "Application.component", which resembles the location our component lives in.
2. $name:		The "name" is our file name without file extension.
3. $extends:	Our class extends strappy's base component class.

The third object visible contains four arrays: models, views, controllers and stores. All required classes need to be listed in the appropriate array in order to enable the framework to initialize these classes. That way they are ready for use by the time you need to access them in either a Store, Controller or View.

You also might have noticed, that StateStore and -Controller, even though we made you create a those, are not listed with the array they belong in. Strappy strictly expects those classes to be present in every component and therefore doesn't need you to declare them manually. 
<br>


<b>View & html-template</b><br>
The html template we are creating is a very simple one. It only consists of a wrapping "div" element, which we use to position things, an "input" button to trigger an action and last but not least an "h1"-tag which holds our "Hello World" message. Now, this template is neither realistic nor does it make much sense - all we are after is a proof of concept. In a real project, you would probably be more likely to separate those two elements and make two individual components for them. 
Considering the amount of code needed to create a component, that may seem like an overkill. Soon though, you will experience the advantages, that come with putting in a little more effort at the beginning. Software applications can grow to a considerable amount of components and keeping such a project structured and maintainable, can quickly end up as one big bowl of "Spaghetti-Code". Strappy nicely decouples your components and makes sure you will stay as cool as Heisenberg. 

Ok, here we go. This is your 'default.html':

HTML:
	<div class="myHolder">
		<h1 class="hidden myOutlet">HELLO WORLD</h1>
		<input class="myButton" type="button" value="show me">
	</div>
<br>

Now this html template will need to be administered by your view class, which looks like this:

JavaScript:
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.button.view',
			$name:		'Default',
			$extends:	strappy.mvc.View
		}
	)
	(
		{},
		{
			templates:
			{
				Default:		'default.html'
			},

			//  list properties here

			// list methods here

			onReady: function()
			{
				this.bindDOMEvents();
			},

			onShow: function()
			{
				// something here
			},

			bindDOMEvents: function()
			{
				this.bindContainerEvent('click.button',  'controller:Default', 'onButtonClicked');
			},

			onModelLockChange: function(signal)
			{
				// something here
			},

			syncView: function()
			{
				// something here
			},

			updateOutlet: function(isVisible)
			{
				var outlet = $(".myOutlet", this.getContainer()),
					button = $(".myButton", this.getContainer());
				switch(isVisible)
				{
					case true:
						button.val("hide me");
						outlet.removeClass('hidden');
						break;

					case false:
						button.val("show me");
						outlet.addClass('hidden');
						break;
				}
			}
		}
	);


Let's have a look at the code:

The head section gives infos about your class - where it belongs, its name and what it extends. Just as in the base class "Button.js" we created before.

Further down, the "templates" object lists your view's html-templates. Your view can orchestrate more than one html-template and switch between them as needed.
To learn more read this section: [Working with multiple html-templates][4]
[4]: http://Working with multiple html-templates.com
However, "Hello World" needs only one simple template to work.

Our first method is named "onReady" and is automatically called, when your view is ready to receive instructions. Here you usually call your init methods to setup your view. In this case we are only concerned about binding DOM events to your container. There are two different ways of binding DOM events in strappy. One binds events to a specific HTML element and the other binds it to your view's container. Every component owning a view also comes with an html-element called the container. As the name already suggests, it's sole purpose is to hold your component's templates. So when you should decide to swap templates, the holder will remain as a constant "address" for queries. So, here we are binding a container event for simplicity, as we don't need to specify a particular element. this is not a clean way of attaching a click event which is supposed to have only one specific target, but illustrates beauitfully how the container element has the whole template as target. When "Hello World" is finished you will see that pressing the "h1"-tag will also trigger the exact same action as if you were to press the button instance. Let's assess the 'bindContainerEvent' method, which takes three arguments:

1. The event specifier. 'click' is a native JS event separated by a dot from 'button', which is a custom identifier for the event. You can start getting into the habbit of "labeling" your events using the dot syntax. If you ever experienced full on debugging sessions until late night you will appreciate every extra piece of information you can possibly read out of your code. 

2. The event callback. In this case we want our default controller to be the responder of this event, so we write: 'controller:Default'. We could also define ourself as responder and type the following: 'view:Default', if you wanted that event to be maintained and handled by the View instead of the Controller.
A reason to handle this event straight away in your view could be, that an event triggered does not require any other parts of your MVC to change state and or communicate some event to other components. A good example might be a custom cursor change upon a mouseEvent being triggered. Neither other parts of your component nor the rest of the application needs to be concerned about this minor graphical state change and can therefore be maintained internally by your component's view.

3. The event handler. This is the name of the method which is being called to handle the event.

<br>

The next two methds, "onModelLockChange" and "syncView", need to be implemented in your view but can stay blank for now, since we are not having a situation in which we either need to be notified about a model lock change nor do we need to sync our view with updated model data.

"updateOutlet" on the other hand is again important to us. This method takes one argument "isVisible", which is a boolean value. "updateOutlet" is going to be called by our state controller class when it receives notification of a model state change (visible or hidden). In here we are doing two things:

1. We are checking against the supplied argument value (true/false). 
2. Depending on the argument passed in, we change the buttons value attribute to label the action that takes place, when a user presses the button. We are also adding or removing a css attribute to or from our "h1"-tag. This attribute is a class attribute named 'hidden', which will change our element's visibility. See "style.css".


<b>Store & Model</b><br>
There's no need to create a state model as this is being handled for us automatically by the framework. So the model directory can stay empty.

Open your StateStore.js and copy the following code into it.

JavaScript.js
$JSKK.Class.create
(
	{
		$namespace:	'Application.component.button.store',
		$name:		'State',
		$extends:	strappy.data.stateful.Store
	}
)
(
	{},
	{
		data:
		{
			'public':
			{
				// something here
			},
			'private':
			{
				isVisible: false
			}
		}
	}
);

Our "Hello World" example only has one store - the StateStore. If our component would hold more complex data, like a personal user profile for example requirung multiple different data fields, we could introduce an "User" store, which is linked to a "User" model. This additional store could then aid us in retrieving values out of a record or perform business operations. Here however, we only inquire about one simple private state: visible or hidden. You can also see that we are having two different places to put our state data in: the 'public' and the 'private' section inside the data object.
Since our component has no interest in sharing it's internal state, we are putting our 'isVisible' property inside 'private'. <br> 
NOTE: A common mistake which can be difficult to track down is that public and private are being declared without quotation marks. By convention strappy requires you to use quotations here.


<b>Controller</b><br>
"Hello World" get's two controllers to work with. A State- and a DefaultController. Strappy encourages the use of multiple controllers in order to serve the single responsibility principle. Meaning - if you, as a developer, delegate your specific task to specific controllers, complex components will become easier to maintain, bugs quicker to track down and your code less difficult to read - also for other developers, that might need to revisit your code. 
Let's see what our Default controller does:

JavaScript:
	$JSKK.Class.create
	(
		{
			$namespace:		'Application.component.button.controller',
			$name:			'Default',
			$extends:		strappy.mvc.Controller
		}
	)
	(
		{},
		{
			init: function()
			{
				// call super
				this.init.$parent();

				/**
				 *  set observers
				 */
				// let Default view report as soon as it's html template is loaded
				this.getView('Default')		.observe('onTemplatesLoaded',	this.onTemplatesLoaded.bind(this));

				//  let State controller report as soon as component has been all set up and is ready to go
				this.getController('State')	.observe('onReadyState',	    this.onReadyState.bind(this));
			},


			// Observer Handlers
			onTemplatesLoaded: function(view)
			{
				// append your html template to desired view
				view.getContainer().append(view.getTemplate('Default'));
			},

			onReadyState: function()
			{
				// show command for your desired view
				this.getView('Default').show();
			},

			onButtonClicked: function(event)
			{
				this.getStore('State').set('isVisible', !this.getStore('State').get('isVisible'));
			}
		}
	);

Inside init() we're calling Default Controller's super and right afterwards are setting two observers on the events "templateLoaded" and "ready". 
The first one is being dispatched as soon as the component's template has been loaded. In its event handler "onTemplatesLoaded()", we are appending our view container with the template we want. <br> 
NOTE: This does NOT automatically display the template. In order to make it appear on screen you want to call the method show() on it.
And that's exactly what we're doing in our second event handler "onReadyState()", which marks the component to be ready. 

We will include one last thing in our DefaultController. Remember how we assigned a "mouse.click"-event  to a button instance inside DefaultView? The next method "onButtonClicked()" is it's event handler. All we are doing in here is to toggle our component's private state "isVisible" through the StateStore we have set up in the previous section "Store & Model". And that's already it for our DefaultController.

There's only one more class we have to write and that's the StateController. Here's the code:

JavaScript:
$JSKK.Class.create
(
	{
		$namespace:	'Application.component.button.controller',
		$name:		'State',
		$extends:	strappy.mvc.stateful.Controller
	}
)
(
	{},
	{
		init: function()
		{
			this.init.$parent();


			// set observers
			this.getView('Default') .observe('onReady',this.onViewReady.bind(this));

			// observer state changes
			this.bindStateChanges
				(
					{
						isVisible:	'onVisibilityChanged'
					}
				);
		},

		onViewReady: function(view)
		{
			this.setViewReadyState(view.$reflect('name'));
			if (this.getReadyViews().inArray(view.$reflect('name')))
			{
				//All views are ready.
				this.setReady();
			}
		},

		onBeforeChange: function(state,key,value)
		{
			return true;
		},

		onVisibilityChanged: function(value)
		{
			this.getView('Default').updateOutlet(value);
		}
	}
);


The StateController is doing two things in our example: 
1. It checks on all views if they are available and flags the component "ready", if that is the case.  
2. Secondly it will observe state changes, which are being handled by the StateStore and either passes on this information or, in a simple component like this, calls a method directly on another class that processes that change.

If you have followed everything thoroughly, you should be able to just call your page inside your favorite web browser (probably IE8) and see the result. 


Python Scaffolding Tool
---------------

Doing things by hand can be very satisfying at times...setting up generic components is not one of those things. If you aggree you might as well check out [Component Scaffolding Tool](#!/guide/ComponentScaffolding) for further reading. Our lead developer developed a pyhton tool that ships with strappy, making component creation more fun than catching gummi bears with your mouth.

<br> 
