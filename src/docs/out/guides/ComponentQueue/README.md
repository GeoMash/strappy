#How to use the Component Queue

NOTE THAT THIS GUIDE IS DEPRECATED!!!



The main component class has a special static method which acts as a helper to initiate components in a specific order. This is useful when you have a lot of child components which depend on other components to be loaded.

Its simple to use. Here's an example:


	strappy.Component.initQueue
	(
		[Project.component.Application,{attachTo:'body'}],
		[Project.component.ContentCard,{attachTo:'#mainContainer'}],
		function()
		{
			console.debug('ALL DONE!');
		}
	);

So what's going on here? Let's walk through it.

First we call "strappy.Component.initQueue". We parse in three arguments. But the number of arguments is limitless. It depends on how many components you want to load in the queue.

In this case, we're loading two components. The Application and the ContentCard components. We can pass these in either as objects or arrays. In this case we've used arrays. If you use an array, you can pass in an object, and a config at the same time. This is the equivalent of initializing an object and then calling configure on it.

	new Project.component.Application().configure({attachTo:'body'});

The last argument is a callback method. This is optional, but if you do decide to use it, it will be called after all the components in the queue have been initialized.
