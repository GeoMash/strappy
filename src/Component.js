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
				'User'
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
			'$JSKK.trait.Configurable',
			'$JSKK.trait.Observable',
			'strappy.trait.signal.Send',
			'strappy.trait.signal.Receive'
		]
	}
)
(
	{
		ACCESS_PRIVATE:	'private',
		ACCESS_PUBLIC:	'public'
	},
	{
		events:
		{
			onConfigured:			true,
			onAfterInit:			true,
			onBeforeStateChange:	true,
			onStateChange:			true,
			onBeforeReadyState:		true,
			onReadyState:			true
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
			version:		null
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
		// _configured:	false,
		config:{},
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
		 * @type {Boolean}
		 * @private
		 */
		_iid:			null,
		
		state:
		{
			'public':	{},
			/**
			 * @cfg attachTo The DOM element that this component will attach itself to. (required)
			 */
			'private':
			{
				attachTo:	null,
				attachHow:	'append',
				ref:		null,
				fullRef:	null
			}
		},
		/**
		 * 
		 * @private
		 */
		_state:
		{
			'public':	{},
			'private':
			{
				attachTo:	null,
				attachHow:	'append',
				ref:		null,
				fullRef:	null
			}
		},
		/**
		 * @property {Object} stateMap A reference object for mapped private and public state properties.
		 * @private
		 */
		stateMap:{},
		
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
		 * @param initState - The state in which this component should be initalised with.
		 * @return {strappy.Component}
		 */
		init: function()
		{
			this.my.name		=this.$reflect('name');
			this.my.fullName	=this.$reflect('namespace')+'.'+this.$reflect('name');
			this.my.namespace	=this.$reflect('namespace').split('.');
			this.my.childSpace	=this.$reflect('namespace');
			
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
			this.initState(this.config);
			//We wait here so that we're 100% sure that there is a containing element for views to insert into.
			$JSKK.when
			(
				function()
				{
					return Boolean($('#'+this.getIID()).length);
				}.bind(this)
			).isTrue
			(
				function()
				{
					if (!this.getState('ref'))
					{
						this.setState('ref',this.my.fullName);
					}
					this.initChildComponents();
					var	complete	=0,
						onComplete	=function()
						{
							if (++complete==3)
							{
								var	view		=null,
									thisView	=null,
									conroller	=null;
								for (var controller in this._controllers)
								{
									this._controllers[controller].onAfterCmpInit();
								}
								for (var view in this._views)
								{
									this._views[view].onAfterCmpInit();
									this._views[view].bindDOMEvents();
									this._views[view]._ready=true;
									this._views[view].fireEvent('onReady',view);
								}
								this.fireEvent('onAfterInit',this);
								this.onAfterInit();
							}
						}.bind(this);
					
					this.initStores(onComplete);
					this.initViews(onComplete);
					this.initControllers(onComplete);
				}.bind(this)
			);
			this.insertBaseContainer();
		},
		onAfterInit:	$JSKK.emptyFunction,
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
			this.registerSignals
			( 
				{
					onStateChangeFromStateMgr:	strappy.Signal.STATE_CHANGE
				}
			);
			
		},
		onStateChangeFromStateMgr: function(signal)
		{
			var state=signal.getBody();
			for (var item in state)
			{
				if (this.canManageStateItem(item))
				{
					this.setState(item,state[item]);
				}
			}
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
							console.trace();
							throw new Error('Error! component "'+this.components[component]+'" not loaded.');
							break;
						}
					}
				}
				else
				{
					console.trace();
					throw new Error('Error! component "'+this.components[component]+'" not loaded.');
					break;
				}
				this.components[component]=new object();
			}
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
		newChildComponent: function(component,name,config,observers)
		{
			var object=component;
			if (Object.isString(component) || Object.isFunction(component.$reflect))
			{
				object=$JSKK.namespace(component);
			}
			if (Object.isDefined(object.definition))
			{
				if (!Object.isDefined(this.components[component]))
				{
					var cmp=new object(config,observers);
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
				console.trace();
				throw new Error('Error! component "'+component+'" not loaded.');
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
		 * @return {strappy.Component} the requested component.
		 */
		getCmp: function(cmpName)
		{
			if (Object.isDefined(this.components[cmpName]))
			{
				return this.components[cmpName];
			}
			return null;
		},
		/**
		 * Initializes all the controllers associated with this component.
		 * 
		 * @private
		 */
		initControllers: function(callback)
		{
			this.observeOnce
			(
				'onBeforeReadyState',
				function()
				{
					this.sendSignal
					(
						strappy.Signal.COMPONENT_IS_READY,
						'component',
						{
							origin:	this.getIID(),
							ref:	this.ref
						},
						this
					);
				}.bind(this)
			);
			var	length	=this.controllers.length,
				done	=0;
			if (!length)
			{
				callback();
			}
			for (var i=0; i<length; i++)
			{
				$JSKK.require
				(
					this.my.childSpace+'.controller.'+this.controllers[i],
					function(controller)
					{
						this._controllers[controller]=new this.my.NSObject.controller[controller](this);
						if (++done==length)
						{
							callback();
						}
					}.bind(this,this.controllers[i])
				);
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
			else if (controller=='State')
			{
				console.warn('State controllers and stores are deprecated. All stateful related things are now part of component.');
				return this;
			}
			else
			{
				console.trace();
				throw new Error('Error - controller "'+controller+'" has not been initilized on component "'+this.my.name+'".');
			}
		},
		/**
		 * Initializes all the views associated with this component.
		 * 
		 * @private
		 */
		initViews: function(callback)
		{
			var	length	=this.views.length,
				done	=0;
			if (!length)
			{
				callback();
			}
			for (var i=0; i<length; i++)
			{
				$JSKK.require
				(
					this.my.childSpace+'.view.'+this.views[i],
					function(view)
					{
						this._views[view]=new this.my.NSObject.view[view](this);
						$JSKK.when
						(
							function()
							{
								return this._views[view]._templatesReady;
							}.bind(this)
						).isTrue
						(
							function()
							{
								if (++done==length)
								{
									callback();
								}
							}
						);
					}.bind(this,this.views[i])
				);
			}
			// for (var i=0,j=this.views.length; i<j; i++)
			// {
				
			// 	if (Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()])
			// 	&& Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].view)
			// 	&& Object.isDefined(this.my.NSObject[this.my.name.lowerFirst()].view[this.views[i]]))
			// 	{
			// 		this._views[this.views[i]]=new this.my.NSObject[this.my.name.lowerFirst()].view[this.views[i]](this);
			// 	}
			// 	else
			// 	{
			// 		throw new Error('Error - view "'+this.views[i]+'" not loaded on component "'+this.my.name+'".');
			// 		break;
			// 	}
			// }
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
				console.trace();
				throw new Error('Error - view "'+view+'" has not been initilized on component "'+this.my.name+'".');
			}
		},
		/**
		 * Sets a state value.
		 * 
		 * @returns {*}
		 */
		setState: function()
		{
			var	args		=$JSKK.toArray(arguments),
				keyVals		={},
				mapping		=null,
				updateState	=false,
				newState	={};
			if (Object.isDefined(args[1]))
			{
				keyVals[args.shift()]=args.shift();
			}
			else
			{
				keyVals=args.shift();
			}
			for (var key in keyVals)
			{
				if (Object.isDefined(this.stateMap[key]))
				{
					mapping=this.stateMap[key];
					//Ignore if the value is the same.
					if (this._state[mapping][key]==keyVals[key])continue;
					//Keep going otherwise...
					if (this.fireEvent('onBeforeStateChange',this,key,keyVals[key])!==false)
					{
						this._state[mapping][key]=keyVals[key];
						if (mapping==this.$reflect('self').ACCESS_PUBLIC)
						{
							updateState		=true;
							newState[key]	=keyVals[key];
						}
						this.fireEvent('onStateChange',this,key,keyVals[key]);
					}
				}
				else
				{
					console.trace();
					throw new Error('Error - state property "'+key+'" has not been configured for component "'+this.my.name+'".');
				}
			}
			if (updateState)
			{
				this.stateMgr.updateState(newState,true);
			}
			return this;
		},
		/**
		 * Gets a state value from this component.
		 * 
		 * Returns null if no state property is found.
		 * 
		 * @returns {mixed}
		 */
		getState: function(key)
		{
			if (Object.isDefined(this.stateMap[key]))
			{
				return this._state[this.stateMap[key]][key];
			}
			else
			{
				return null;
			}
		},
		/**
		 * Gets a public state value from this component.
		 * 
		 * @returns {mixed}
		 */
		getPublicState: function()
		{
			return this._state['public'];
		},
		/**
		 * Gets a private state value from this component.
		 * 
		 * @returns {mixed}
		 */
		getPrivateState: function()
		{
			return this._state['private'];
		},
		/**
		 * Resets the public and private states to what
		 * they originally were when the component was first
		 * initialised.
		 * @selfable
		 */
		resetState: function()
		{
			this.setState(this.state['private']);
			this.setState(this.state['public']);
			return this;
		},
		/**
		 * Initalizes the state store for this component.
		 * 
		 * @private
		 */
		initState: function(state)
		{
			// console.debug('initState',state,this._state);
			var	self=this.$reflect('self'),
				item=null;
			
			for (item in this._state[self.ACCESS_PRIVATE])
			{
				this.stateMap[item]=self.ACCESS_PRIVATE;
			}
			for (item in this.state[self.ACCESS_PUBLIC])
			{
				this.stateMap[item]=self.ACCESS_PUBLIC;
			}
			for (item in this.state[self.ACCESS_PRIVATE])
			{
				this.stateMap[item]=self.ACCESS_PRIVATE;
			}
			
			for (item in state)
			{
				this.stateMap[item]=self.ACCESS_PRIVATE;
			}
			
			//Apply the initial state.
			Object.extend(this._state['public'],this.state['public']);
			Object.extend(this._state['private'],this.state['private']);
			Object.extend(this._state['private'],state);
			
			// delete this.state;
			
			this.fireEvent('onConfigured',this);
			
			
			// this.sendSignal(strappy.Signal.CMP_DO_RECONFIGURE,{component:this.my.name});
					
		},
		/**
		 * Initializes all the stores associated with this component.
		 * 
		 * @private
		 */
		initStores: function(callback)
		{
			var	length	=this.stores.length,
				done	=0;
			if (!length)
			{
				callback();
			}
			for (var i=0; i<length; i++)
			{
				$JSKK.require
				(
					this.my.childSpace+'.store.'+this.stores[i],
					function(stores)
					{
						this._stores[stores]=new this.my.NSObject.store[stores](this);
						$JSKK.when(this._stores[stores],'ready').isTrue
						(
							function()
							{
								if (++done==length)
								{
									callback();
								}
							}
						);
					}.bind(this,this.stores[i])
				);
			}
		},
		/**
		 * This method will set the ready state of the component to true.
		 * 
		 * @return {strappy.Component}
		 */
		setReady:		function()
		{
			if (this.ready)return;
			this.ready=true;
			if (this.fireEvent('onBeforeReadyState',this,true)!==false)
			{
				
				var globalState=this.stateMgr.getState();
				for (var item in globalState)
				{
					if (this.canManageStateItem(item))
					{
						var oldValue=this.getState(item);
						if (!this.setState(item,globalState[item]))
						{
							var restoredState	={};
							restoredState[item]	=oldValue;
							this.stateMgr.updateState(restoredState,true);
						}
					}
				}
				// for (var globalItem in globalState)
				// {
				// 	for (var localItem in this.state)
				// 	{
				// 		if (localItem==globalItem)
				// 		{
				// 			this._state[localItem]=globalState[globalItem];
				// 			break;
				// 		}
				// 	}
				// }
				this.fireEvent('onReadyState',this,true);
			}
			return this;
		},
		/**
		 * Checks to see if the component has been flagged as statefully ready.
		 * 
		 * @return {Boolean} True if ready.
		 */
		isReady: function()
		{
			return this.ready;
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
		 * Checks to see if the passed in state item
		 * can be managed by this store.
		 * 
		 * @param  {String} item The name of the state item to check against.
		 * @return {Boolean} True if it can be managed by this store.
		 */
		canManageStateItem: function(item)
		{
			return this.stateMap[item]==this.$reflect('self').ACCESS_PUBLIC;
		},
		/**
		 * Returns an associated store which is pre-defined in this
		 * components "models" property.
		 * 
		 * @param {String} store The name of the store to get.
		 * @throws Error Store not initialized.
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
				console.trace();
				throw new Error('Error - store "'+store+'" has not been initilized for component "'+this.my.name+'".');
			}
		},
		/**
		 * Creates the base container element for the component.
		 * 
		 * This gets created as a DIV.
		 * 
		 * @private
		 * @return {void}
		 */
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
			$(this.getState('attachTo') || 'body')[this.getState('attachHow') || 'append'](container);
		},
		/**
		 * Generates the instance ID for the component.
		 * @private
		 * @return {void}
		 */
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
		/**
		 * Returns the instance ID of the component.
		 * 
		 * @returns {Boolean} The instance iD.
		 */
		getIID: function()
		{
			return this._iid;
		},
		/**
		 * Returns a version of the component instance ID which is safe to use
		 * in CSS queries.
		 * 
		 * @returns {string} The safe instance id.
		 */
		getSafeID: function()
		{
			return (this.$reflect('namespace')+'.'+this.$reflect('name')).replace(/\./g,'-');
		},
		/**
		 * Fetches a config item associated with this component.
		 * 
		 * @deprecated
		 * @return {Mixed} The config item's value. 
		 */
		getConfig:		function(key)
		{
			console.warn('Use of getConfig deprecated as of Strappy 1.2. Use getState instead.');
			return this.getState(key);
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
		 * Returns the global radio tower object.
		 * 
		 * @returns {strappy.RadioTower} - The Radio Tower.
		 */
		getRadioTower: function()
		{
			return this.radioTower;
		},
		/**
		 * @deprecated
		 */
		configure: function()
		{
			console.warn('The use of configure() is deprecated as of Strappy 1.2. Pass "state" config into the Component construtor instead.');
		},
		/**
		 * @deprecated
		 */
		reconfigure: function()
		{
			console.warn('The use of reconfigure() is deprecated as of Strappy 1.2. Use the new state management instead.');
		},
		/**
		 * Gets the configured reference of this component.
		 * 
		 * Set this as a private state of the component.
		 * 
		 * @returns {string} The component reference.
		 */
		getRef: function()
		{
			return this.getState('ref');
		},
		/**
		 * Gets the full reference of the component.
		 * 
		 * A component's full reference is the reference of 
		 * each of it's preceding parent components separated
		 * by a dot notation.
		 * Example:
		 * 	"container.formPanel.numberInput"
		 * 
		 * @returns {string} The component's full reference.
		 */
		getFullRef: function()
		{
			return this.getState('fullRef');
		},
		/**
		 * A helper loop to loop over each child component of this component.
		 * 
		 * @param callback
		 * @selfable
		 */
		eachChildCmp: function(callback)
		{
			for (var component in this.components)
			{
				callback(this.components[component],component);
			}
			return this;
		}
	}
);