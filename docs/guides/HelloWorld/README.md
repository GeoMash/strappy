Hello World
===============

**Level:** Beginner

Download Libraries
------------------

You'll need $JSKK, jQuery and a copy of the framework. We'll use minified versions of all of these for this demo.

Download them and place them in a folder named "lib".

Connect Libraries
-----------------

Now hook up the libraries like in the example below. You should keep this order.

HTML:
<br>
<br>
	<html>
		<head>
			<title>Hello World</title>
		</head>
		<body>
			<script type="text/javascript" src="lib/jskk.min-1.0.0.js">		</script>
			<script type="text/javascript" src="lib/jquery.js">				</script>
			<script type="text/javascript" src="lib/framework.min.js">		</script>
		</body>
	</html>
<br>
<br>
This is the absolute basics and won't actually do anything just yet.

Setup Component
---------------

Now you should create a folder structure for your component. We're going to use the following folder/file structure. Create the folders and files in them.
Leave the files blank for now.
<br>
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
				'State',
				'Default'
			],
			views:
			[
				'Default'
			],
			controllers:
			[
				'State',
				'Default'
			]
		}
	);
<br>
<br>

Walking through this code we can see that the component follows a convention for the namespace "<Project>.component". The name is the same as the file name,
which follows the name of the folder "HelloWorld".
<br>
Also, it's extending the base component class "{@link framework.Component}".
<br>
Next we see the models are defined as an array, followed by views and controllers. This enables the framework to initialize these classes so that they are ready for use by the time
you need to access them in either a Controller or View.
<br>






