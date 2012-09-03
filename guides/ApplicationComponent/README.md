#Building an Application Component

{@img images/ApplicationComponent.png Application Component Overview}

The idea behind creating a main application component is to create the presence of a "core" for your application. A central component which manages core business logic in your front end application.<br>

Depending on how you decide to build your application as a whole will dictate which tools you incorporate into your application component.<br>

Strappy comes with several core tools to help manage your application. Such tools are the {@link strappy.InitQueue Init Queue}, Signals, {@link strappy.ShareMgr Shared Store Manager} and {@link strappy.SharedState Shared State}.<br>

This guide will step you through the recommended way to build an application component and take advantage of the tools which Strappy provides.

##Scaffolding the Application Component

Using Strappy's command line tool, run this command, but change the path to reflect your project.

	strap.py component application -d ../../../../Project

By running that command, you have created the shell for your new application component. The new component will be found in the directory you specified under "component/application".

Note that you can run this same command for generating other components. You can also concatenate the component names with a comma to generate multiple new components at once.
Substituting "component" for "model", "view", "controller" or "store" will create those for you too, but be sure to specify which component you're generating it for by providing a "-cmp <componentName>" argument.

Before diving into the meat of the application component, you should take the time to read about Shared Entities and Signalling. There are guides for these, check them out and then return to this guide.

<br>
* [Shared Entities](#!/guide/SharedEntities)
* [Signals](#!/guide/Signals)
<br>



##Main Component File

Open Applicaiton.js, it should look something like this:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component',
			$name:		'Application',
			$extends:	strappy.Component
		}
	)
	(
		{},
		{
			config:
			{
				
			},
			components:
			{
				
			},
			stores:
			[
				
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

So far, its very simple. We'll need to add and remove some things. At this stage we're really just creating place-holders.

Your new Application.js file should look something like this:

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
				
			},
			Type:
			{
				
			},
			Key:
			{
				
			}
		},
		{
			components:
			{
				
			},
			stores:
			[
				
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

An explanation of what we're doing with those static containers are explained in the "Signals" guide. You should read that before continuing.


##Global State Store

{@img images/ApplicationComponent_GlobalStateStore.png}






##Views

{@img images/ApplicationComponent_Views.png}




###Structure

Structural views are those that you use to create an overall layout of your main view. This is then used as a foundation for sub components to be rendered into.

###Dialogue

While not all applications have dialogue windows, the concept is included in this guide for those that do.

Having a specialised view and controller pair for dealing with the showing and hiding of dialogue windows is certainly ideal.

Here are some tips which will help you create a manageable dialogue system.

* Create the contents of each dialogue as a template and define them in your view.
* Create a set of common dialogue templates.
* Override the existing getTemplate method with your own and use jquery to modify the templates when they're requested.
* If you have a specialised component for dialogues, then build a controller to create and manage a single instance of it. This speeds up performance and is generally a better practice.

Example View:

	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.view',
			$name:		'Dialogue',
			$extends:	strappy.mvc.View
		}
	)
	(
		{},
		{
			templates:
			{
				UserSettings:			'dialogue-UserSettings.html',
				CommonSave:				'dialogue-CommonSave.html',
				CommonConfirmDelete:	'dialogue-CommonConfirmDelete.html',
				CommonMessage:			'dialogue-CommonMessage.html'
			},
			onReady:		function(){},
			bindDOMEvents:	function(){},
			syncView:		function(){},
			getTemplate:	function(template,keyVals)
			{
				var	template=this.getTemplate.$parent(template),
					el		=null;
				for (var key in keyVals)
				{
					//If input
					if ((el=this.find('[name="'+key+'"][type]')).length)
					{
						el.val(keyVals[key]);
					}
					//If other
					else if ((el=this.find('[name="'+key+'"]')).length)
					{
						el.html(keyVals[key]);
					}
				}
			}
		}
	);


###Other

No doubt there will be other non-structural views that you'll need to use which don't fit into any sub component. Take what you've learnt about views and apply the same logic here. Just make specialised views for managing these templates and things will be generally easier to manage.


##Controllers

{@img images/ApplicationComponent_Controllers.png}



###Base

The base controller is where all your initialization logic lives.

Generally this is where you connect to any APIs (such as your backend's BTL API), wait for initial state to be ready


	$JSKK.Class.create
	(
		{
			$namespace:	'Project.component.application.controller',
			$name:		'Main',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			shareMgr:			null,
			API:				null,
			stateReady:			false,
			APIReady:			false,
			init: function()
			{
				this.init.$parent();
				this.getController('State')	.observe('onReadyState',this.onReadyState.bind(this));
				
				this.API=new strappy.data.BTL({url:'/api/'});
				this.API.onReady
				(
					function()
					{
						Project.BTL		=this.API;
						Project.API		=this.API.API;
						this.APIReady	=true;
					}.bind(this)
				);
				$JSKK.when
				(
					function()
					{
						return (this.stateReady && this.APIReady);
					}.bind(this)
				).isTrue(this.onReady.bind(this));
			},
			/**
			 * Called when the State Controller is ready.
			 */
			onReadyState: function()
			{
				this.stateReady=true;
			},
			/**
			 * Called when the State Controller and API are both ready.
			 */
			onReady: function()
			{
				this.shareMgr=new strappy.ShareMgr(this,Coates);
				this.getStore('State').set('mainReady',true);
				this.fireEvent('onReady',this);
				
				this.getView('Structure').show();
				
				Coates.API.user.get
				(
					null,
					{_current:true},
					function(response)
					{
						if (response.success)
						{
							this.setSharedState('authenticated',true);
							this.showMainApplication();
						}
						else
						{
							this.showLogin();
						}
					}.bind(this)
				);
			},
			showLogin: function()
			{
				if (!this.getCmp('LoginPanel').isConfigured())
				{
					var queue=this.newInitQueue
					(
						function()
						{
							this.showChildComponent('login');
						}.bind(this)
					);
					queue.add
					(
						'login',
						this.getCmp('LoginPanel'),
						{
							attachTo:			'#'+this.getIID(),
							containerClass:		'coates-local-container',
							relativeWrapper:	true,
							children:
							[
								{
									cmp:	Coates.component.Login,
									ref:	'login',
									config:
									{
										
									}
								}
							]
						}
					);
					queue.execute();
				}
				else
				{
					this.showChildComponent('LoginPanel');
				}
			}
		}
	);








###State






##Routing

A new idea which is not yet built into Strappy is the concept of a router. Routing is a way of controlling the general application flow with regards to moving between views.

While Strappy does not come with an out-of-the-box routing solution, it is very easy to roll your own. Jump on over to the routing guide.


##Waiting




##Dealing with Timing Issues





##Generic Components

We mentioned generic components earlier. This section of the guide is to explain, in detail, how to manage these components.

There are two approaches for this. I'll explain them both, but we'll be using the latter.

The first option, you can create composite components and consider them as "extensions" to your application component. That is to say, your application component instantiates these components, and these components instantiate subcomponents and manage those in similar ways to which the application component does.

The second option, and the option which we'll be demonstrating in this guide, is by using multiple controllers to handle the various sections of your application.
This approach reduces the amount of composite components and centralises the business logic by encapsulating the logic specialised controllers, managed by your application component.

Before continuing, if you have never built a generic component before, please skip over to the guide on creating generic components. Once you've completed that, return here and continue.

<br>
* [Generic Component](#!/guide/SharedEntities)
<br>