#Shared Entities

{@img images/ApplicationComponent.png Application Component Overview}

There are three different shared entities. These are state, models and stores.

## State

The state shared entity is a specialised store which holds global _private_ state properties. It is very useful for holding cross-application state or config which is used by sub components.

Nothing special is required to be done in order to use the shared state. Simply call the helper methods which are available in every view and controller to get or set shared state properties.

Example:

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
			onReadyState: function()
			{
				var view=this.getView('Default');
				if (this.getSharedState('authenticated'))
				{
					view.showMain();
				}
				else
				{
					view.showLogin();
				}
			},
			onLogin: function(email,password)
			{
				this.asyncServerLogin
				(
					{
						email:		email,
						password:	password
					},
					function(response)
					{
						if (response.success)
						{
							this.setSharedState('authenticated');
						}
						else
						{
							this.getView('Default').displayErrorMessage(response.message);
						}
					}.bind(this);
				);
			}
		}
	);

##Models

Shared models are useful for defining data structures which are commonly used across the application. Generally these are representations of your tables in your database, but may also include meta data for component-specific use.

These models, and also shared stores, need to be namespaced in a "shared" space within your top level namespace for your project.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.shared.model',
			$name:		'User',
			$extends:	strappy.mvc.Model
		}
	)
	(
		{},
		{
			fields:
			{
				id:					null,
				email:				'',
				password:			null,					//Always null unless being changed.
				last_activity:		'0000-00-00 00:00:00',
				created:			'0000-00-00 00:00:00',
				status:				0						//0 - Inactive; 1 - Active
			}
		}
	);

Like normal models, they are initalised for each record in a store. So the only other work involved is to attach your shared models to stores. Keeping in mind that they can be attached to any type
of store, be they shared or private.

##Stores

Shared stores are one of the most useful tools in the framework. They allow you to define a store which can be plugged into any number of components. There are various ways to do them, we're going to cover them all here and explain where and why you would use each approach.

Before we do that. This must be metioned again. Any shared store must be namespaced in a  "shared" space within your top level namespace for your project. Failing to do this with a shared store will render it unusable unless you manually initalise it - which defeats the purpose of shared stores.
This is because the component core manually initalises the {@link strappy.ShareMgr shared store manager}. This in turn initialises each shared store found in the shared namespace, overriding their definitions and recreating them as singletons.

First, lets let at what a shared store looks like.

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.shared.store',
			$name:		'Users',
			$extends:	strappy.data.MultiModelStore
		}
	)
	(
		{},
		{
			model:		Project.shared.model.User,
			BTL:		'Project.BTL',
			BTL_GET:	'Project.API.user.get',
			BTL_SET:	'Project.API.user.set'
		}
	);


Note the above example is using BTL for managing the data. See the BTL guide for more information about that.

Now let's look at how to use these stores.

###Direct Usage

One way to use a shared store is to simply access it directly via its full namespace. This is generally only ever done in your applicaiton controllers. This is because child components should always be considered dumb and never try to communicate with anything outside of its scope.

Example:

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
			onReadyState: function()
			{
				//Sync the system users so we can show a table of them...
				Project.shared.store.Users.sync();
				this.getView('Default').drawUsersTable();
			}
		}
	);

###Attaching

Another way is to attach the stores "as is" directly to the component.

The best way to do this is by overriding the component's configure method and observing when the component has been configured.

This is almost always done when a child component needs to be dynamically configured with a store. This is generally the case for generic components, as they should never know their data
source until it is provided to them during thier configuration phase.

Below is a good example of how this can be done.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component',
			$name:		'Grid',
			$extends:	strappy.Component
		}
	)
	(
		{},
		{
			config:
			{
				signalKey:				null,
				columnStore:			null,
				recordStore:			null
			},
			components:	{},
			stores:		[],
			views:
			[
				'Default'
			],
			controllers:
			[
				'Default'
			],
			configure: function(newConfig)
			{
				this.observeOnce
				(
					'onConfigured',
					function()
					{
						this.attachSharedStore('Columns',this.getConfig('columnStore'));
						this.attachSharedStore('Records',this.getConfig('recordStore'));
					}.bind(this)
				);
				this.configure.$parent(newConfig);
			}
		}
	);


###Binding & Extending

Finally, there is a way in which you can create a component level store and tell it to share all the properties and funtionality from another store.

The great thing about this feature is that it isn't limited to shared stores. Techincally you can tell it to share from any store application-wide, but for best practices it is encouraged that you only share from shared stores.

Below is an example of how its done.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.store',
			$name:		'Users',
			$extends:	strappy.data.MultiModelStore
		}
	)
	(
		{},
		{
			sharedFrom:	'Project.shared.store.Users'
		}
	);

So as you can see, its pretty straight forward. Simply define a "sharedFrom" property on your store and it will behave as if it were that shared store. This is completely transparent to the rest of your code, so you simply access the store as you usually would.

Example:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.view',
			$name:		'Default',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			drawUsersTable: function()
			{
				var wrapper=$(
					[
						'<table>',
							'<tr>',
								'<th>Email</th>',
								'<th>Last Active</th>',
								'<th>Created</th>',
							'</tr>',
						'</table>'
					].join(''));
				this.getStore('Users').each
				(
					function(record)
					{
						wrapper.append
						(
							[
								'<tr>',
									'<td>'+record.get('email')+'</td>',
									'<td>'+record.get('last_activity')+'</td>',
									'<td>'+record.get('created')+'</td>',
								'</tr>'
							].join('')
						);
					}.bind(this)
				);
				this.getContainer()	.html('')			//Empty
									.append(wrapper);	//Insert
			}
		}
	);

So that's all pretty simple stuff and works really well. But the real power of using shared from comes from the ability to override and add additional functionality to that store instance and leave the shared store unaffected by the additions.

Let's have a look at some examples of this in action.

First, let's assume that we want our view to only show active users, but we don't want to put that logic into the view. We'll extend the store to provide this functionality.


	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.store',
			$name:		'Users',
			$extends:	strappy.data.MultiModelStore
		}
	)
	(
		{},
		{
			sharedFrom:	'Project.shared.store.Users',
			
			//Override the each method.
			each: function(callback)
			{
				this.find({status:1}).each(callback);
				return this;
			}
		}
	);

Now the next time that the "drawUsersTable" method is called, only users with a status of 1 (active), will be shown.
