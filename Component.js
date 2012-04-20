/**
 * @class framework.Component
 * The core class which all components extend from.
 * 
 * Components are the heart of the framework. Each component is in itself a core,
 * which means that each component is stand-alone and not dependant on any other
 * component to operate.
 * 
 * This is the core goal of the framework. If a component is not able to conform
 * to this pattern, then something is wrong with how the component has been built.
 * 
 * This class is designed to be extended from. You should never need to add any
 * additional logic in the extended class. That logic should be placed within
 * controllers and associated with this component.
 * 
 * When you extend this class, you should only need to define configuration for
 * child components, models, views and controllers.
 * 
 * More often than not, your component will require custom signals. These signals
 * should be pre-defined for consistancy and maintainability within your 
 * 
 * An example of a component, with custom signals.
 * 
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component',
			$name:		'MyComponent',
			$extends:	framework.Component
		}
	)
	(
		{
			SIGNAL:
			{
				LOGIN_SUCCESS:		'myComponent.login.success',
				LOGIN_FAILURE:		'myComponent.login.fail'
			}
		},
		{
			components:
			{
				loginForm:		'Application.component.LoginForm',
				errorWindow:	'Application.component.DialogWindow',
				successWindow:	'Application.component.DialogWindow'
			},
			models:
			[
				'State',
				'User'
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
 * 
 * @mixins $JSKK.trait.Configurable
 * @abstract
 * 
 * @uses framework.RadioTower
 * @uses framework.StateMgr
 */
$JSKK.Class.create
(
	{
		$namespace:	'framework',
		$name:		'Component',
		$uses:
		[
			$JSKK.trait.Configurable
		]
	}
)
(
	{},
	{
		/**
		 * @cfg attachTo The DOM element that this component will attach itself to. (required)
		 */
		config:
		{
			attachTo:	null
		},
		/**
		 * @property browser Contains browser information.
		 * @property browser.name The name of the browser.
		 * @property browser.version The version of the browser.
		 * @readonly
		 */
        browser:
		{
			name:		null,
			version:	null
		},
		/**
		 * @property components Specifiy a list of child components.
		 * 
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component',
			$name:		'MyComponent',
			$extends:	framework.Component
		}
	)
	(
		{},
		{
			components:
			{
				loginForm:		'Application.component.LoginForm',
				errorWindow:	'Application.component.DialogWindow',
				successWindow:	'Application.component.DialogWindow'
			}
		}
	);
		 * 
		 */
		components:		{},
		/**
		 * @property models Specify a list of models to pre-load.
		 * 
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component',
			$name:		'MyComponent',
			$extends:	framework.Component
		}
	)
	(
		{},
		{
			models:
			[
				'State',
				'User'
			]
		}
	);
		 */
		models:			[],
		/**
		 * @property views Specify a list of views to pre-load.
		 * 
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component',
			$name:		'MyComponent',
			$extends:	framework.Component
		}
	)
	(
		{},
		{
			views:
			[
				'Default'
			]
		}
	);
		 */
		views:			[],
		/**
		 * @property controllers Specify a list of controllers to pre-load.
		 * 
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component',
			$name:		'MyComponent',
			$extends:	framework.Component
		}
	)
	(
		{},
		{
			controllers:
			[
				'State',
				'Default'
			]
		}
	);
		 */
		controllers:	[],
		/**
		 * @property _models A container for all the initialized models.
		 * @private
		 */
		_models:		{},
		/**
		 * @property _views A container for all the initialized views.
		 * @private
		 */
		_views:			{},
		/**
		 * @property _controllers A container for all the initialized controllers.
		 * @private
		 */
		_controllers:	{},
		/**
		 * @property _configured A flag to indicate weather or not this component has been configured.
		 * @private
		 */
		_configured:	false,
		/**
		 * @property my A special object containing information relevant to this class.
		 * @property my.name The name of this class.
		 * @property my.index The position this component lives in within the stack of 
		 * components registered against the framework.
		 * @property my.NSObject The namespace in an object format of this class.
		 * @readonly
		 */
		my:
		{
			name:		null,
			index:		null,
			NSObject:	null
		},
		/**
		 * @property radioTower A reference to the {@link framework.RadioTower Radio Tower}. 
		 * @private
		 */
		radioTower: null,
		/**
		 * @property stateMgr A reference to the {@link framework.StateMgr State Manager}. 
		 * @private
		 */
		stateMgr:	null,
		/**
		 * @constructor
		 * Sets up the component by initalizing all it's child components,
		 * views, models and controllers.
		 * 
		 * Additionally, it connects the component to the Radio Tower,
		 * enabling signals, and the State Manager, enabling state to be
		 * captured/restored.
		 * 
		 * Note: The constructor automatically calls {@link framework.Component#reconfigure reconfigure}
		 * when it is done.
		 * 
		 * @return {framework.Component}
		 */
        init: function()
		{
			this.my.name		=this.$reflect('name');
			this.my.namespace	=this.$reflect('namespace').split('.');
			
			if (Object.isUndefined(window.framework.$components))
            {
				window.framework.$components={};
			}
            if (Object.isUndefined(window.framework.$components[this.my.name]))
            {
            	window.framework.$components[this.my.name]=[];
            }
			
			this.my.index		=window.framework.$components[this.my.name].push(this);
			this.my.NSObject	=window;
			
			for (var i=0,j=this.my.namespace.length; i<j; i++)
			{
				this.my.NSObject=this.my.NSObject[this.my.namespace[i]];
			}
			this.initRadioTower();
			this.initStateMgr();
			this.initChildComponents();
			this.initViews();
			this.initModels();
			this.initControllers();
			
			if (Object.isFunction(this.initCmp))
			{
				this.initCmp();
			}
			this.ready=true;
			this.reconfigure();
		},
		/**
		 * Initalizes the component's conneciton to the Radio Tower.
		 * 
		 * The Radio Tower enables signals to flow through this component.
		 * 
		 * @return {void}
		 */
		initRadioTower: function()
		{
			if (Object.isUndefined(window.framework.$radioTower))
			{
				window.framework.$radioTower=new framework.RadioTower();
			}
			this.radioTower=window.framework.$radioTower;
		},
		/**
		 * Initalizes the component's connection to the State Manager.
		 * 
		 * The State Manager
		 */
		initStateMgr: function()
		{
			if (Object.isUndefined(window.framework.$stateMgr))
			{
				window.framework.$stateMgr=new framework.StateMgr();
			}
			this.stateMgr=window.framework.$stateMgr;
		},
		/**
		 * Gets the browser info. Note that this is currently tied to jQuery.
		 * @private
		 */
		getBrowser: function()
		{
			if (Object.isNull(this.browser.name))
			{
				// setup browser object.
				if (Object.isDefined(jQuery.browser.msie))
				{
					this.browser.name='ie';
				}
				else if (Object.isDefined(jQuery.browser.webkit))
				{
					this.browser.name='webkit';
				}
				else if (Object.isDefined(jQuery.browser.opera))
				{
					this.browser.name='opera';
				}
				else if (Object.isDefined(jQuery.browser.mozilla))
				{
					this.browser.name='mozilla';
				}
				this.browser.version=jQuery.browser.version.split('.')[0];
			}
		},
		/**
		 * Initializes all the child components associated with this component.
		 * 
		 * @private
		 */
		initChildComponents: function()
		{
			var parts		=null,
				config		=null,
				object		=null;
			for (var component in this.components)
			{
				parts		=this.components[component].split('.');
				object		=window[parts[0]];
				if (Object.isDefined(object))
				{
					for (var i=1,j=parts.length; i<j; i++)
					{
						if (Object.isDefined(object[parts[i]]))
						{
							object=object[parts[i]];
						}
						else
						{
							throw new Error('Error! component "'+this.components[component]+'" not loaded.');
							break;
						}
					}
				}
				else
				{
					throw new Error('Error! component "'+this.components[component]+'" not loaded.');
					break;
				}
				this.components[component]=new object();
			}
		},
		/**
		 * Returns a child component which is pre-defined in this
		 * components "components" property.
		 * 
		 * @param {String} cmpName The reference name of the component to get as
		 * defined by this component.
		 * @throws Error If the component is not registered.
		 * @return {framework.Component} the requested component.
		 */
		getCmp: function(cmpName)
		{
			if (Object.isDefined(this.components[cmpName]))
			{
				return this.components[cmpName];
			}
			else
			{
				throw new Error('Unable to get component "'+cmpName+'". This component has not been registered.');
			}
		},
		/**
		 * Initializes all the controllers associated with this component.
		 * 
		 * @private
		 */
		initControllers: function()
		{
			for (var i=0,j=this.controllers.length; i<j; i++)
			{
				if (Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].controller[this.controllers[i]]))
				{
					this._controllers[this.controllers[i]]=new this.my.NSObject[this.my.name.lowerFirst()].controller[this.controllers[i]](this);
				}
				else
				{
					throw new Error('Error controller "'+this.controllers[i]+'" not loaded.');
					break;
				}
			}
		},
		/**
		 * Initializes all the views associated with this component.
		 * 
		 * @private
		 */
		initViews: function()
		{
			for (var i=0,j=this.views.length; i<j; i++)
			{
				if (Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()])
				&& Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].view[this.views[i]]))
				{
					this._views[this.views[i]]=new this.my.NSObject[this.my.name.lowerFirst()].view[this.views[i]](this);
				}
				else
				{
					throw new Error('Error - view "'+this.views[i]+'" not loaded.');
					break;
				}
			}
		},
		/**
		 * Returns an associated view which is pre-defined in this
		 * components "views" property.
		 * 
		 * @param {String} view The name of the view to get.
		 * @throws Error if the view has not been initilized.
		 * @return {framework.mvc.View} The requested view if it has been defined.
		 */
		getView: function(view)
		{
			if (Object.isDefined(this._views[view]))
			{
				return this._views[view];
			}
			else
			{
				throw new Error('Error - view "'+view+'" has not been initilized.');
			}
		},
		/**
		 * Initializes all the models associated with this component.
		 * 
		 * @private
		 */
		initModels: function()
		{
			for (var i=0,j=this.models.length; i<j; i++)
			{
				if (Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()])
				&& Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].model[this.models[i]]))
				{
					this._models[this.models[i]]=new this.my.NSObject[this.my.name.lowerFirst()].model[this.models[i]](this);
				}
				else
				{
					throw new Error('Error - model "'+this.models[i]+'" not loaded for component "'+this.my.name+'".');
					break;
				}
			}
		},
		/**
		 * Returns an associated model which is pre-defined in this
		 * components "models" property.
		 * 
		 * @param {String} model The name of the model to get.
		 * @throws 
		 * @return {framework.mvc.Model} The requested model if it has been defined.
		 */
		getModel: function(model)
		{
			if (Object.isDefined(this._models[model]))
			{
				return this._models[model];
			}
			else
			{
				throw new Error('Error - model "'+model+'" has not been initilized.');
			}
		},
		/**
		 * Configures this component with new configuration properties.
		 * 
		 * @param {Object} newConfig The new configuration object.
		 * @return {void}
		 */
		configure: function(newConfig)
		{
			$JSKK.when(this,'ready').isTrue
			(
				function()
				{
					if (Object.isDefined(this.config))
					{
						Object.extend(this.config,newConfig);
					}
					else
					{
						this.config=newConfig;
					}
					this._configured=true;
					this.sendSignal(framework.Signal.CMP_DO_RECONFIGURE,{component:this.my.name});
				}.bind(this)
			);
		},
		/**
		 * Call this method to force the component to reconfigure itself.
		 * 
		 * This essentially calls the {@link }
		 * 
		 * @return {void}
		 */
		reconfigure: function()
		{
			$JSKK.when(this,'ready').isTrue
			(
				function()
				{
					this.configure(this.config);
//					this.sendSignal(framework.Signal.CMP_DO_RECONFIGURE,{component:this.my.name});
				}.bind(this)
			);
		},
		/**
		 * A helper method to determine if this component has been configured.
		 * 
		 * @return {Boolean} true if this component has been configured.
		 */
		isConfigured: function()
		{
			return this._configured;
		},
		/**
		 * Fetches a config item associated with this component.
		 * 
		 * @return {Mixed} The config item's value. 
		 */
		getConfig:		function(key)
		{
			var	parts	=key.split('.'),
				object	=this.config;
			for (var i=0,j=parts.length; i<j; i++)
			{
				if (Object.isDefined(object[parts[i]]))
				{
					object=object[parts[i]];
				}
				else
				{
					return null;
				}
			}
			return object;
		},
		/**
		 * Calculates the ID of this component based off of
		 * its namespace and name.
		 * 
		 * @return {String} The ID of this component or the M/V/C class
		 * associated with this component.
		 */
		getID: function()
		{
			var id=[];
			Object.extend(id,this.namespace);
			id.push(this.className);
			return id.join('.');
		},
		/**
		 * See {@link framework.trait.signal.Send#sendSignal}
		 * @private
		 */
		sendSignal: function(name,body,type,filter)
		{
			console.debug(this.$reflect('namespace')+'.'+this.$reflect('name'),':: sendSignal(core) :: ',name);
			if (!Object.isEmpty(name))
			{
				$JSKK.when(this,'radioTower').isAssocArray
				(
					function()
					{
						this.radioTower.fireEvent
						(
							name,
							new framework.Signal
							(
								{
									name:	name,
									body:	body,
									type:	type,
									filter:	filter
								}
							)
						);
					}.bind(this)
				);
			}
			else
			{
				throw new Error('Class '+this.className+' attempted to fire an empty signal.');
			}
		}
	}
);