/**
 * @class strappy.Component
 * The core class which all components extend from.
 * 
 * Components are the heart of the strappy. Each component is in itself a core,
 * which means that each component is stand-alone and not dependant on any other
 * component to operate.
 * 
 * This is the core goal of the strappy. If a component is not able to conform
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
			$extends:	strappy.Component
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
			stores:
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
 * @mixins $JSKK.trait.Observable
 * @abstract
 * 
 * @uses $JSKK.trait.Observable
 * @uses strappy.RadioTower
 * @uses strappy.StateMgr
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'Component',
		$uses:
		[
			$JSKK.trait.Observable
		]
	}
)
(
	{
		/**
		 * @deprecated Use {@link strappy.InitQueue} instead.
		 */
		initQueue: function(queue,callback)
		{
			console.warn('use of strappy.Component.initQueue is deprecated. Use strappy.InitQueue instead.');
			var	args		=$JSKK.toArray(arguments);
			
			if (Object.isDefined(args[1]))
			{
				if (Object.isFunction(args.last()))
				{
					callback=args.pop();
				}
				queue=args;
			}
			
			var	index		=-1,
				length		=queue.length,
				cmp			=null,
				processNext	=function()
				{
					index++;
					if (Object.isUndefined(queue[index]))
					{
						if (Object.isFunction(callback))callback();
						return;
					}
					if (Object.isArray(queue[index]))
					{
						if (!Object.isFunction(queue[index][0].$reflect))
						{
							cmp=new queue[index][0]();
						}
						else
						{
							cmp=queue[index][0];
						}
						if (Object.isAssocArray(queue[index][1]))
						{
							cmp.observeOnce
							(
								'onAfterInit',
								function(index)
								{
									cmp.getController('State').observeOnce
									(
										'onReadyState',
										function()
										{
											processNext();
										}
									);
								}.bind(this,index)
							);
						}
						else
						{
							processNext();
						}
						
						cmp.configure(queue[index][1]);
					}
					else
					{
						if (!Object.isAssocArray(queue[index]))
						{
							new queue[index]();
						}
						processNext();
					}
				};
			processNext();
		}
	},
	{
		events:
		{
			onConfigured:	true,
			onAfterInit:	true
		},
		/**
		 * @cfg attachTo The DOM element that this component will attach itself to. (required)
		 */
		config:
		{
			attachTo:	null,
			attachHow:	'append'
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
			$extends:	strappy.Component
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
		 * @property stores Specify a list of stores to pre-load.
		 * 
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component',
			$name:		'MyComponent',
			$extends:	strappy.Component
		}
	)
	(
		{},
		{
			stores:
			[
				'State',
				'User'
			]
		}
	);
		 */
		stores:			[],
		/**
		 * @property views Specify a list of views to pre-load.
		 * 
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component',
			$name:		'MyComponent',
			$extends:	strappy.Component
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
			$extends:	strappy.Component
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
		 * @property _stores A container for all the initialized stores.
		 * @private
		 */
		_stores:		{},
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
		 * components registered against the strappy.
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
		 * @property radioTower A reference to the {@link strappy.RadioTower Radio Tower}. 
		 * @private
		 */
		radioTower: null,
		/**
		 * @property stateMgr A reference to the {@link strappy.StateMgr State Manager}. 
		 * @private
		 */
		stateMgr:	null,
		/**
		 * @property viewCache A reference to the {@link strappy.ViewCache View Cache}. 
		 * @private
		 */
		viewCache:	null,
		
		/**
		 * [readyForConfig description]
		 * @type {Boolean}
		 */
		readyForConfig:	false,
		/**
		 * [_iid description]
		 * @type {Boolean}
		 */
		_iid:			null,
		
		/**
		 * @constructor
		 * Sets up the component by initalizing all it's child components,
		 * views, models and controllers.
		 * 
		 * Additionally, it connects the component to the Radio Tower,
		 * enabling signals, and the State Manager, enabling state to be
		 * captured/restored.
		 * 
		 * Note: The constructor automatically calls {@link strappy.Component#reconfigure reconfigure}
		 * when it is done.
		 * 
		 * @return {strappy.Component}
		 */
		init: function()
		{
			this.my.name		=this.$reflect('name');
			this.my.namespace	=this.$reflect('namespace').split('.');
			
			if (Object.isUndefined(window.strappy.$components))
			{
				window.strappy.$components={};
			}
			if (Object.isUndefined(window.strappy.$components[this.my.name]))
			{
				window.strappy.$components[this.my.name]=[];
			}
			
			this.my.index		=window.strappy.$components[this.my.name].push(this);
			this.my.NSObject	=window;
			
			for (var i=0,j=this.my.namespace.length; i<j; i++)
			{
				this.my.NSObject=this.my.NSObject[this.my.namespace[i]];
			}
			
			this.initRadioTower();
			this.initStateMgr();
			this.initViewCache();
			this.generateInstanceID();
			
			$JSKK.when(this.isConfigured.bind(this)).isTrue
			(
				function()
				{
					this.generateInstanceID();
					this.insertBaseContainer();
					this.initChildComponents();
					this.initStores();
					this.initViews();
					this.initControllers();
					
					this.fireEvent('onAfterInit',this);
				}.bind(this)
			);
			
			if (Object.isFunction(this.initCmp))
			{
				this.initCmp();
			}
			this.readyForConfig=true;
		},
		/**
		 * Initalizes the component's conneciton to the Radio Tower.
		 * 
		 * The Radio Tower enables signals to flow through this component.
		 * 
		 * @private
		 * @return {void}
		 */
		initRadioTower: function()
		{
			if (Object.isUndefined(window.strappy.$radioTower))
			{
				window.strappy.$radioTower=new strappy.RadioTower();
			}
			this.radioTower=window.strappy.$radioTower;
		},
		/**
		 * Initalizes the component's connection to the State Manager.
		 * 
		 * The State Manager
		 * 
		 * @private
		 * @return {void}
		 */
		initStateMgr: function()
		{
			if (Object.isUndefined(window.strappy.$stateMgr))
			{
				window.strappy.$stateMgr=new strappy.StateMgr();
			}
			this.stateMgr=window.strappy.$stateMgr;
		},
		/**
		 * Initalizes the component's connection to the View Cache.
		 * 
		 * @private
		 * @return {void}
		 */
		initViewCache: function()
		{
			if (Object.isUndefined(window.strappy.$viewCache))
			{
				window.strappy.$viewCache=new strappy.mvc.ViewCache();
			}
			this.viewCache=window.strappy.$viewCache;
		},
		/**
		 * Fetches the view cache.
		 * 
		 * @return {strappy.mvc.ViewCache}
		 */
		getViewCache: function()
		{
			return this.viewCache;
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
				object		=null;//,
				// queue		=[];
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
				// queue.push(object);
				this.components[component]=new object();
			}
			// this.$reflect('self').initQueue(queue);
		},
		/**
		 * Creates a new child component.
		 * 
		 * This can be useful for when you want to dynamically
		 * create child components.
		 * 
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.controller',
			$name:		'Default',
			$extends:	strappy.mvc.Controller
		}
	)
	(
		{},
		{
			onGotBaseHTML: function(view)
			{
				var thisChildCmp=null;
				for (var i=0; i<10; i++)
				{
					thisChildCmp=this.getParentComponent().newChildComponent('Application.component.Tile');
					thisChildCmp.configure({attachTo:view.getContainer()});
				}
			}
		}
	);
		 * 
		 */
		newChildComponent: function(component,name)
		{
			var object=component;
			if (Object.isFunction(component.$reflect))
			{
				object=$JSKK.namespace(component);
			}
			if (Object.isDefined(object.definition))
			{
				if (!Object.isDefined(this.components[component]))
				{
					var cmp=new object();
					if (Object.isUndefined(name))
					{
						if (!Object.isArray(this.components[component]))
						{
							this.components[component]=[];
						}
						this.components[component].push(cmp);
					}
					else
					{
						this.components[name]=cmp;
					}
					return cmp;
				}
			}
			else
			{
				throw new Error('Error! component "'+this.components[component]+'" not loaded.');
			}
		},
		newInitQueue: function(onAllReady,onItemReady)
		{
			var queue=new strappy.InitQueue({},this);
			if (Object.isFunction(onAllReady))
			{
				queue.observe('onAllReady',onAllReady);
			}
			if (Object.isFunction(onItemReady))
			{
				queue.observe('onItemReady',onItemReady);
			}
			return queue;
		},
		/**
		 * Returns a child component which is pre-defined in this
		 * components "components" property.
		 * 
		 * @param {String} cmpName The reference name of the component to get as
		 * defined by this component.
		 * @throws Error If the component is not registered.
		 * @return {strappy.Component} the requested component.
		 */
		getCmp: function(cmpName)
		{
			if (Object.isDefined(this.components[cmpName]))
			{
				return this.components[cmpName];
			}
			else
			{
				console.trace();
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
			var stateController=null;
			if (Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].controller['State']))
			{
				stateController=this._controllers['State']=new this.my.NSObject[this.my.name.lowerFirst()].controller['State'](this);
				stateController.observeOnce
				(
					'onBeforeReadyState',
					function()
					{
						this.sendSignal(strappy.Signal.COMPONENT_IS_READY,'component',{origin:this.getIID()},this);
					}.bind(this)
				);
				
				for (var i=0,j=this.controllers.length; i<j; i++)
				{
					if (Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].controller[this.controllers[i]]))
					{
						this._controllers[this.controllers[i]]=new this.my.NSObject[this.my.name.lowerFirst()].controller[this.controllers[i]](this);
					}
					else
					{
						throw new Error('Error controller "'+this.controllers[i]+'" not loaded on component "'+this.my.name+'".');
						break;
					}
				}
			}
			else
			{
				throw new Error('State controller has not been loaded for component "'+this.my.name+'". '
								+'A component MUST have a state store and controller.');
			}
		},
		/**
		 * Returns an associated controller which is pre-defined in this
		 * components "controllers" property.
		 * 
		 * @param {String} controller The name of the controller to get.
		 * @throws Error if the controller has not been initilized.
		 * @return {strappy.mvc.View} The requested controller if it has been defined.
		 */
		getController: function(controller)
		{
			if (Object.isDefined(this._controllers[controller]))
			{
				return this._controllers[controller];
			}
			else
			{
				throw new Error('Error - controller "'+controller+'" has not been initilized on component "'+this.my.name+'".');
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
				&& Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].view)
				&& Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].view[this.views[i]]))
				{
					this._views[this.views[i]]=new this.my.NSObject[this.my.name.lowerFirst()].view[this.views[i]](this);
				}
				else
				{
					throw new Error('Error - view "'+this.views[i]+'" not loaded on component "'+this.my.name+'".');
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
		 * @return {strappy.mvc.View} The requested view if it has been defined.
		 */
		getView: function(view)
		{
			if (Object.isDefined(this._views[view]))
			{
				return this._views[view];
			}
			else
			{
				throw new Error('Error - view "'+view+'" has not been initilized on component "'+this.my.name+'".');
			}
		},
		/**
		 * Initializes all the stores associated with this component.
		 * 
		 * @private
		 */
		initStores: function()
		{
			if (Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].store['State']))
			{
				this._stores['State']=new this.my.NSObject[this.my.name.lowerFirst()].store['State'](this);
				for (var i=0,j=this.stores.length; i<j; i++)
				{
					if (Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()])
					&& Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].store[this.stores[i]]))
					{
						this._stores[this.stores[i]]=new this.my.NSObject[this.my.name.lowerFirst()].store[this.stores[i]](this);
					}
					else
					{
						throw new Error('Error - store "'+this.stores[i]+'" not loaded for component "'+this.my.name+'".');
						break;
					}
				}
			}
			else
			{
				throw new Error('State store has not been loaded for component "'+this.my.name+'". '
								+'A component MUST have a state store and controller.');
			}
		},
		/**
		 * Attaches a shared store to the component as a locally referenced and used store.
		 * 
		 * @param  {string} localRef The local name of the store. Eg "MyStore".
		 * @param  {string} sharedRef The shared full namespace of the store. Eg "Project.shared.store.MyStore".
		 * @return {strappy.Component} this
		 */
		attachSharedStore: function(localRef,sharedRef)
		{
			this._stores[localRef]=$JSKK.namespace(sharedRef);
			return this;
		},
		/**
		 * Returns an associated store which is pre-defined in this
		 * components "models" property.
		 * 
		 * @param {String} store The name of the store to get.
		 * @throws 
		 * @return {strappy.mvc.Model} The requested store if it has been defined.
		 */
		getStore: function(store)
		{
			if (Object.isDefined(this._stores[store]))
			{
				return this._stores[store];
			}
			else
			{
				throw new Error('Error - store "'+store+'" has not been initilized for component "'+this.my.name+'".');
			}
		},
		insertBaseContainer: function()
		{
			var container=
			$([
				'<div',
				' class="'+this.$reflect('namespace').replace(/\./g,'-')+'-'+this.$reflect('name')+'-container"',
				' id="'+this.getIID()+'"',
				' style="display:none;">',
				'</div>'
			].join(''));
			container.data('component',this);
			$(this.getConfig('attachTo') || 'body')[this.getConfig('attachHow') || 'append'](container);
			
		},
		generateInstanceID: function()
		{
			var	chars	='0123456789abcdefghijklmnopqrstuvwxyz'.split(''),
				iid		=[];
			for (var i=0; i<8; i++)
			{
				iid.push(chars[Math.floor(Math.random()*25)]);
			}
			this._iid=this.getSafeID()+'-'+iid.join('');
		},
		getIID: function()
		{
			return this._iid;
		},
		getSafeID: function()
		{
			return (this.$reflect('namespace')+'.'+this.$reflect('name')).replace(/\./g,'-');
		},
		/**
		 * Configures this component with new configuration properties.
		 * 
		 * @param {Object} newConfig The new configuration object.
		 * @return {void}
		 */
		configure: function(newConfig)
		{
			$JSKK.when(this,'readyForConfig').isTrue
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
					this.fireEvent('onConfigured',this);
					this.sendSignal(strappy.Signal.CMP_DO_RECONFIGURE,{component:this.my.name});
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
			$JSKK.when(this,'readyForConfig').isTrue
			(
				function()
				{
					this.configure(this.config);
//					this.sendSignal(strappy.Signal.CMP_DO_RECONFIGURE,{component:this.my.name});
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
			if (Object.isDefined(key))
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
			}
			return this.config;
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
		 * See {@link strappy.trait.signal.Send#sendSignal}
		 * @private
		 */
		sendSignal: function(name,type,filter,body)
		{
//			console.debug(this.$reflect('namespace')+'.'+this.$reflect('name'),':: sendSignal(core) :: ',name);
			if (!Object.isEmpty(name))
			{
				$JSKK.when(this,'radioTower').isAssocArray
				(
					function()
					{
						this.radioTower.fireEvent
						(
							name,
							new strappy.Signal
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