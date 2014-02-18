#CCL - Router Controller

The CCL Router controller has been designed to simplify working with dynamic section states in your application.

What we mean by dynamic section states is, simply put, a URL schema for your front end application.

Let's step through how to set it up. Note that this guide assumes you're already familiar with using things from CCL.

First of all, create a new controller and have it extend 

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.controller',
			$name:		'Router',
			$extends:	strappy.ccl.controller.Router
		}
	)
	(
		{},
		{
			routes:
			[
				
			]
		}
	);

As it is, its pretty simple and won't actually do anything.

The idea is that you define valid routes, or paths, within your application. But it is important that you understand how the paths work.

Routes have meaning. They're not random strings that are thrown together. Because of this, they must conform to a given convention. Let's add some routes to the above example and explain and they work.

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.controller',
			$name:		'Router',
			$extends:	strappy.ccl.controller.Router
		}
	)
	(
		{},
		{
			routes:
			[
				'user/login',
				'user/account',
				'main/home'
			]
		}
	);


So in the above example, we have defined three routes. Lets break down what it means and how it works.

	'user/account'

Like all routes, this one looks like a standard path you would see in a file system or URL. That's because its actually pointing to files and actions in your application.

The slash (/) between each word splits the route into meaningful parts. In this case the first part "user" refers to the "User" controller, while the second part "account" refers to the "account" action (method) in that controller.

This routing for this is executed by the "p" state being set to that path.

	http://myProject.dev.lan/#p=user/account

So when that happens, you can actually do whatever you like in your code. In this case, we would likely bring up an account management view for the currently logged in user.

You can also route via HTML elements in the HTML document. Any element can be routable and be made routable at any time by simply giving it a "data-strappy-route" property, the value of which is the routable path.

	<a href="javascript:;" data-strappy-route="user/account">My Account</a>

Because the router uses live events, you can dynamically include things like the above in your application without having to worry about binding routing events - they just work!

It is also possible to trigger the routing manually in your code. You can do this by using the router controller's "goTo" method as follows:

	this.getController('Router').goTo('user/account');

Since Strappy 1.2, you can now nest views and controllers in folders. The router component takes advantage of this by allowing you to extend your paths and route into nested folders. This makes it possible for the above to be changed to something a little more structured.

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.controller',
			$name:		'Router',
			$extends:	strappy.ccl.controller.Router
		}
	)
	(
		{},
		{
			routes:
			[
				'user/login',
				'user/account/view',
				'user/account/update',
				'user/account/changePassword',
				'main/home'
			]
		}
	);

Notice that there are more parts of the URL now. So the way the router interprets this is by traversing each part of the path as namespace. So for example, if we take the path "user/account/view", the router will look for a controller with the namespace "GeoMash.component.<routingComponent>.controller.user" with the name "account" and the action (method) "view".

