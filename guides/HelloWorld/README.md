Hello World
===============

**Level:** Beginner

Preview
------------------

This is the "Hello World" guide to your first Strappy component.
By the end of this tutorial you will have created a button component that, if pressed, displays "Hello World".


{@img helloWorld_hidden.png Alt text}
<br>
{@img helloWorld_visible.png Alt text}


Yep! 
<br>

Dependencies
------------------

You'll need $JSKK, jQuery and a copy of the framework. We'll use minified versions of all of these for this demo.

Downloads:

[Strappy framework (ZIP)][1]

[JSKK Classing Engine (ZIP)][2]

[jQuery Download Page][3]

Download them and place them in a folder named "lib".

[1]: https://github.com/SpinifexGroup/strappy/zipball/master
[2]: https://github.com/melechi/JS-Klass-Kit/zipball/master
[3]: http://jquery.com/

Now hook up the libraries like in the example below. You should keep this order.

HTML:
<br>
	<html>
		<head>
			<title>Strappy - Hello World</title>
		</head>
		<body>
			<script type="text/javascript" src="lib/JS-Klass-Kit/jskk.min-1.0.1.js">		</script>
			<script type="text/javascript" src="lib/jquery/jquery1.8.0.js">					</script>
			<script type="text/javascript" src="lib/strappy/strappy.1.1.0.dev.min.js">		</script>
		</body>
	</html>
<br>
<br>

This is the absolute basics and won't actually do anything just yet.

Setup Component
---------------

Now you should create a folder structure for your component. 
We're going to use the following folder/file structure. 
Create the folders and files in them.
Leave the files blank for now.

<br>
	/
	/lib/jskk.min-1.0.0.js
	/lib/jquery.js
	/lib/framework.min.js
	/Application/
	/Application/component/
	/Application/component/HelloWorld/
	/Application/component/HelloWorld/HelloWorld.js
	/Application/component/HelloWorld/controller/
	/Application/component/HelloWorld/controller/State.js
	/Application/component/HelloWorld/controller/Default.js
	/Application/component/HelloWorld/model/
	/Application/component/HelloWorld/model/State.js
	/Application/component/HelloWorld/model/Default.js
	/Application/component/HelloWorld/view/
	/Application/component/HelloWorld/view/Default.js
	/Application/component/HelloWorld/view/html/
	/Application/component/HelloWorld/view/html/default.html
<br>


Pyhton Tool to the rescue
---------------

Doing things by hand can be very satisfying at times...setting up generic components is not one of those things. If you aggree you might as well check out [Component Scaffolding Tool](#!/guide/ComponentScaffolding) for further reading. Our lead developer developed a pyhton tool that ships with strappy, making component creation more fun than catching gummi bears with your mouth.

<br> 

Depending on the IDE you are using, the project should now look something like this: 

<br>
{@img projectSetup.png Alt text}
<br>

Now you also need to import all parts of your new component MVC. 
So in your index.html, under your dependency imports, add the following references:

HTML:
<br>
	<html>
		<head>
			<title>Strappy - Hello World</title>
		</head>
		<body>
			// dependencies
			<script type="text/javascript" src="lib/JS-Klass-Kit/jskk.min-1.0.1.js">						</script>
			<script type="text/javascript" src="lib/jquery/jquery1.8.0.js">									</script>
			<script type="text/javascript" src="lib/strappy/strappy.1.1.0.dev.min.js">						</script>
			<br>
			// components
			<script type="text/javascript"  src="Application/component/button/Button.js">                   </script>
			<script type="text/javascript"  src="Application/component/button/controller/Default.js">       </script>
			<script type="text/javascript"  src="Application/component/button/controller/State.js">         </script>
			<script type="text/javascript"  src="Application/component/button/store/Button.js">             </script>
			<script type="text/javascript"  src="Application/component/button/store/State.js">              </script>
			<script type="text/javascript"  src="Application/component/button/model/Default.js">            </script>
			<script type="text/javascript"  src="Application/component/button/model/State.js">              </script>
			<script type="text/javascript"  src="Application/component/button/view/Default.js">             </script>
		</body>
	</html>
<br>

Next we'll create the base component class. Open "/Application/component/HelloWorld/HelloWorld.js" and place the following code in.
<br>
<br>
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component',
			$name:		'HelloWorld',
			$extends:	framework.Component
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
			]
		}
	);
<br>
<br>

Walking through this code we can see that the component follows a convention for the namespace "<Project>.component". The name is the same as the file name,
which follows the name of the folder "HelloWorld".
<br>
Also, it's extending the base component class
<br>
Next we see the models are defined as an array, followed by views and controllers. This enables the framework to initialize these classes so that they are ready for use by the time
you need to access them in either a Controller or View.
<br>

Filling in your MVC triad
---------------

In order to be able to instantiate your component, we will start to implement the bare minimum requirements by your components MVC triad.
We start from the bottom up - the view and its template. We'll then work our way up through the State- Store and Model and finally define one Default and one State controller.

<br>

<b>View & HTML Template</b>
The html template we are creating is a very simple one. It only consists of a wrapping "div" element, which we use to position things, an "input" button to trigger an action and last but not least a "h1" which will output our "Hello World" in this simple example. Now this template is neither realistic nor does it make much sense - all we are after is a proof of concept. I an real world example i twould probably more likely to separate those two elements and make two individual components, which are detached from each other and could be extended or be reused multiple times. Here however, we need only one very specific function and in order to keep the scope of this "Hello World" example to a minimum we favor simplicity over correctness. 

Ok, here we go. This is your 'default.html':

HTML:
	<div class="myHolder">
		<h1 class="hidden myOutlet">HELLO WORLD</h1>
		<input class="myButton" type="button" value="show me">
	</div>


<br>
Now this template will be administered by your view class, which looks like this:

Default.js:
	$JSKK.Class.create
	(
		{
			$namespace:	'HelloWorld.component.button.view',
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

The head section gives infos about your class - where it belongs, its name and what it extends.
The "templates" object sole purpose is to list your view's html templates. Yes your view can orchestrate more than one template and switch between them as needed. But more about that later. "Hello World" needs only one simple template to work.

The "onReady" method is automatically called when your view is ready to receive instructions. Here you usually call your init methods to setup your view. In this case we are only concerned about binding DOM events to your container. Therea are two different ways of binding DOM events in strappy. One binds events to a specific HTML element and the other binds it to your view's container. Every component owning a view also comes with a HTML element called the container. As the name already suggests, it's sole purpose is to hold your templates. So when you should decide to swap templates, the holder will remain constant and addressable. So here we are binding a container event for simplicity, as we don't need to specify a particular element. this is not a clean way of attaching a click event which is supposed to have only one specific target, but illustrates beauitfully how the contianer element has the whole template as target. When "Hello World" is finished you will see that pressing the h1 tag wil also trigger the exact same action as if you were to press the button instance. Let's asses the 'bindContainerEvent' method, which takes three arguments:

The first argument is the event specifier. 'click' is the native DOM event separated by a dot from 'button' which is a custom value add on for the event. Since javascript only deals with the event name information before the dot, one can take advantage of this fact in order to label a generic event and make itmore specific and therefore easier to identify. 

Argument number two is the instance dealing with the event callback. In this case we want our default controller to be the responder of this event, so we write: 'controller:Default'. We could also define ourself as responder and type the following: 'view:Default' if you wanted that event to be maintained and handled only by the view.
A reason to handle this event straight away in your view could be that some event triggered does not require any other parts of your MVC to change a state or to communicate a change to other components. Event though you could achieve such thing via css, a good example might be a cursor change upon a mouseEvent triggered. The rest of your application really doesn't need to be concerned about minor, internal graphical states and can therefore be maintained by your component's view directly.

The last parameter is the event handler method. This is the name of the method which is being called to handle the event.

<br>

The next two methds - onModelLockChange and syncView - need to be implemented in your view but can stay blank for now since we are not having a situation in which we either need to be notified about a model lock change nor do we need to sync our view with data received from an async call.

"updateOutlet" on the other hand is again important to us. this method takes one argument "isVisible", which is a boolean value. "updateOutlet" is going to be called by our state controller class when it receives notification of a model state change. (visible or hidden) In here we are basically doing two things:

First we are checking against the supplied argument value (true/false). Secondly, depending on the argument passed on we change the buttons value attribute to label the action taking palce on press as well as adding or removing a css attribute to our h1 tag. this attribute is a class attribute named 'hidden', which will change our elements visibility to either hidden or visible. See style.css.

<b>Store & Model</b>

There's no need to create a state model as this is being handled for us automatically by the framework. So the model directory can stay empty.

Store.js
	$JSKK.Class.create
	(
		{
			$namespace:	'HelloWorld.component.button.store',
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

Our "Hello World" example only has one store. The state store. If our component would hold more complex data, like a personal user profile for example with multiple fields, we could introduce an "User" store which is linked to a "User" model. This would aid us in retrieving values out of a record or perform business logic procedures on that record to maybe update that record of a user with a record that lives somewhere on a remote server. Here however, all we wanna know is a particular state of our component: visible or not. you can also see that we are having two different places to put our state data in: the 'public' and the 'private' section inside data{}.
Since our component has no interest in sharing its internal state, we are putting our 'isVisible' property inside 'private'. NOTE: A common mistake which can be difficult to track down is that public and private are being declared without quotation marks. By convention strappy requires you to use quotations here.

<b>Controller</b>

"Hello World" get's two controllers to work with. A State and a Default controller. Both of which are mandatory. Strappy encourages the use of multiple controllers in order to serve the single responsibility principle. Meaning - if you as a developer delegate your specific task to specific controllers, complex components will become easier to maintain, bugs quicker to track and resolve and your code less difficult to read for other developers, that might need to revisit your code. So, having said that let's see what our Default controller does. Here's the code:

Default.js

	$JSKK.Class.create
	(
		{
			$namespace:		'HelloWorld.component.button.controller',
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

Inside init() we're doing three things. At first we're calling Default Controller's super init() and right after setting two observers on the events templateLoaded and ready. Both events are rather self explanatory.

The first one is being dispatched as soon as the component's template has been loaded. in its event handler "onTemplatesLoaded()", we are appending our view container with the template in question. Note that this does NOT automatically display the template. In order to make it appear on screen you want to call the method show() on it.
And that's exactly what we're doing in our second event handler "onReadyState()", which marks the component to be ready. 

We will include one last thing in our Default controller. Remember how we assigned a DOM mouse.click event in our Default view at the very beginning? The next method "onButtonClicked()" is its event handler. All we are doing in here is to toggle our component's internal or private state "isVisible/*Boolean*/" through the 'State' store we have set up in the last section "Store & Model". And that's it for our Default controller.

There's only one more class we have to write and that's the State controller. The state controller is basically doing two things in our example. It checks on all view and flags the component "ready". A state for all other MVC members of that component to react upon. Secondly it will observe state changes, which are being handled by the state store and either orchestrates or, in a simple component like this, directly calls all methods processing this piece of state information.

If you have foolowed everything correctly you should be able to just call your page inside your favorite web browser (probably IE8) and see the amazing result. 


