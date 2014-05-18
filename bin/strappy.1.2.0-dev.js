$JSKK.Class.create('Strappy')
(
	{
		VERSION:				'1.2.0',
		VERSION_MAJOR:			1,
		VERSION_MINOR:			2,
		VERSION_MICRO:			0,
		VERSION_STAGE:			'',
		VERSION_STAGE_NUM:		0,
		
		config:
		{
			autoInitStateMgr:	false
		}
	},
	{}
);
define("strappy/Strappy", function(){});

(function(root) {
define("strappy/trait/ComponentConnector", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.trait.ComponentConnector
 * 
 * This trait is designed to be used with {@link strappy.mvc.Model models},
 * {@link strappy.mvc.View views} and {@link strappy.mvc.Controller controllers}.
 * 
 * This trait will expose a set of useful functionality to the class that
 * is using it, including all the hooks required to access parts of the component.
 * 
 * @abstract
 */
$JSKK.Trait.create
(
	{
		$namespace:	'strappy.trait',
		$name:		'ComponentConnector'
	}
)
(
	{
		/**
		 * @constructor
		 * This method binds the component to whatever uses this trait.
		 * 
		 * @param {strappy.Component} component The component to connect.
		 */
		init: function(component)
		{
			this._component=component;
		},
		/**
		 * Returns the parent component associated with the class using this trait.
		 * @deprecated - see {@link strappy.trait.ComponentConnector#cmp cmp()}
		 * @return {strappy.Component} the parent component.
		 */
		getParentComponent: function()
		{
			return this._component;
		},
		/**
		 * Returns the parent component associated with the class using this trait.
		 * 
		 * @return {strappy.Component} the parent component.
		 */
		cmp: function()
		{
			return this._component;
		},
		/**
		 * Returns the name of the parent component associated with the class using
		 * this trait.
		 * 
		 * @return {String} The name of the parent component.
		 */
		getCmpName: function()
		{
			return this.cmp().my.name;
		},
		/**
		 * Returns the Radio Tower singleton.
		 * 
		 * @return {strappy.RadioTower}
		 */
		getRadioTower: function()
		{
			return this.cmp().radioTower;
		},
		/**
		 * Returns the State Manager singleton.
		 * 
		 * @return {strappy.StateMgr}
		 */
		getStateMgr: function()
		{
			return this.cmp().stateMgr;
		},
		/**
		 * Gets the ID of the class which implemented this trait.
		 * 
		 * @return {String} The ID.
		 */
		getID: function()
		{
			return this.$reflect('namespace')+'.'+this.$reflect('name');
		},
		/**
		 * Gets the ID of the class which implemented it and makes it safe
		 * for using as a HTML-based ID.
		 * 
		 * @return {String} The ID.
		 */
		getSafeID: function()
		{
			return this.cmp().getSafeID(cmp);
		},
		/**
		 * Get's a child component of the associated parent component.
		 * 
		 * NOTE: As a convention, you should only ever call this if you want
		 * to {@link strappy.Component#configure configure/reconfigure} the
		 * component.
		 * @param {String} cmp The reference name of the component as defined in
		 * the parent component.
		 * @return {strappy.Component} The child component.
		 */
		getCmp: function(cmp)
		{
			return this.cmp().getCmp(cmp);
		},
		/**
		 * Checks to see if a child component exists.
		 * 
		 * @param {String} cmp The child component's reference.
		 * @return {Boolean}
		 */
		hasChildCmp: function(cmp)
		{
			return Object.isDefined(this.cmp().components[cmp]);
		},
		/**
		 * Fetches a model from the parent component.
		 * 
		 * @param {String} model The name of the model.
		 * @return {strappy.mvc.Model} The Model instance.
		 */
		getStore: function(store)
		{
			return this.cmp().getStore(store);
		},
		/**
		 * Fetches a controller from the parent component.
		 * 
		 * @param {String} controller The name of the controller.
		 * @return {strappy.mvc.Controller} The Controller instance.
		 */
		getController: function(controller)
		{
			return this.cmp().getController(controller);
		},
		/**
		 * Fetches a view from the parent component.
		 * 
		 * @param {String} view The name of the view.
		 * @return {strappy.mvc.View} The View instance.
		 */
		getView: function(view)
		{
			return this.cmp().getView(view);
		},
		/**
		 * Fetches the View Cache.
		 * 
		 * @return {strappy.mvc.ViewCache}
		 */
		getViewCache: function()
		{
			return this.cmp().getViewCache();
		},
		/**
		 * Gets the value of a config property.
		 * 
		 * @param {String} key The config property to get.
		 * @return 
		 */
		getConfig: function(key)
		{
			return this.cmp().getConfig(key);
		},
		/**
		 * Gets the instance ID (IID) of the component.
		 * 
		 * @return {String} The instance ID.
		 */
		getIID: function()
		{
			return this.cmp().getIID();
		},
		/**
		 * A helper function for creating a CSS selctor to be passed to the
		 * attachTo config option of a component.
		 * 
		 * This works by grabbing the parent attachTo and adding the passed in
		 * attachTo property.
		 * 
		 * @param  {String} attachTo The attachTo string.
		 * @return {String}          The new attachToString
		 */
		makeAttachPoint: function(attachTo)
		{
			return [this.getConfig('attachTo'), attachTo].join(' ');
		},
		/**
		 * Sends a {@link strappy.Signal.SHOW Show} signal to a child component.
		 * @param  {String} cmp A reference to the child component.
		 * @return {Object} this
		 */
		showChildComponent: function(cmp)
		{
			this.sendSignal
			(
				strappy.Signal.SHOW,
				'strappy',
				{iid:this.getCmp(cmp).getIID()}	
			);
			return this;
		},
		/**
		 * Sends a {@link strappy.Signal.HIDE Hide} signal to a child component.
		 * @param  {String} cmp A reference to the child component.
		 * @return {Object} this
		 */
		hideChildComponent: function(cmp)
		{
			this.sendSignal
			(
				strappy.Signal.HIDE,
				'strappy',
				{iid:this.getCmp(cmp).getIID()}
			);
			return this;
		},
		/**
		 * Sets a shared property in the global shared state.
		 * @param {String} key The property reference.
		 * @param {Mixed} val The new value.
		 * @return {Object} this
		 */
		setSharedState: function(key,val)
		{
			this.getStateMgr().getSharedState().set(key,val);
			return this;
		},
		/**
		 * Gets a shared property in the global shared state.
		 * @param  {String} key The property reference.
		 * @return {Mixed}     The value of the property.
		 */
		getSharedState: function(key)
		{
			return this.getStateMgr().getSharedState().get(key);
		},
		/**
		 * A helper function for the {@link strappy.InitQueue Init Queue}.
		 * 
		 * This method will create the init queue object based on the component
		 * it is being called from. Which means any items that are initalised will be
		 * considered as child components.
		 * 
		 * @param  {Function} onAllReady  A callback which is called once all items have been initalised.
		 * @param  {Function} onItemReady A callback which is called after each item has been initalised.
		 * @return {strappy.InitQueue}    Returns the new Init Queue object.
		 */
		newInitQueue: function(onAllReady,onItemReady)
		{
			return this.cmp().newInitQueue(onAllReady,onItemReady);
		},
		setState: function()
		{
			return this.cmp().setState.apply(this.cmp(),arguments);
		},
		getState: function(key)
		{
			return this.cmp().getState(key);
		},
		getPublicState: function()
		{
			return this.cmp().getPublicState();
		},
		getPrivateState: function()
		{
			return this.cmp().getPrivateState();
		},
		sendSignal: function(name,type,filter,body)
		{
			return this.cmp().sendSignal(name,type,filter,body);
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/trait/signal/Send", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.trait.signal.Send
 * This trait enables a {@link strappy.mvc.Model model},
 * {@link strappy.mvc.View view} or {@link strappy.mvc.Controller controller}
 * with the ability to send signals.
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'strappy.trait.signal',
		$name:		'Send'
	}
)
(
	{
		/**
		 * This will send a signal to the {@link strappy.SignalTower Signal Tower} where
		 * it will be emitted for other components and component entities to receive.
		 * 
		 * @param {String} name The name of the signal.
		 * @param {String} type The type of the signal. Used for further filtering by type.
		 * @param {Object} filter An extra filter parameter used to filter more abstractly.
		 * @param {Object} body The body of the signal. This can contain any kind of data.
		 * @throws Error if the signal name is empty.
		 * @return {Boolean} True if the signal was successfully sent.
		 */
		sendSignal: function(name,type,filter,body)
		{
			// console.debug(this.$reflect('namespace')+'.'+this.$reflect('name'),':: sendSignal(trait) :: ',name);
			if (!Object.isEmpty(name))
			{
				if (Object.isUndefined(filter) || Object.isNull(filter))
				{
					filter={};
				}
				if (Object.isFunction(this.getIID))
				{
					filter.origin=this.getIID();
				}
				else
				{
					filter.origin=this.$reflect('namespace')+'.'+this.$reflect('name');
				}
				return this.getRadioTower().fireEvent
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
			}
			else
			{
				throw new Error('Class '+this.$reflect('name')+' attempted to fire an empty signal.');
			}
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/trait/signal/Receive", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.trait.signal.Receive
 * This trait enables a {@link strappy.mvc.Model model},
 * {@link strappy.mvc.View view} or {@link strappy.mvc.Controller controller}
 * with the ability to register and receive signals.
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'strappy.trait.signal',
		$name:		'Receive'
	}
)
(
	{
		/**
		 * Registers signals that the class implementing this trait will
		 * listen for and binds them to callbacks within the class.
		 * 
		 * Example:
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
			onReadyState: function()
			{
				this.registerSignals
				(
					[Application.component.MyComponent.SIGNAL.LOGIN_SUCCESS,'onLoginSuccess'],
					[Application.component.MyComponent.SIGNAL.LOGIN_FAILURE,'onLoginFailure']
				);
			},
			onLoginSuccess: function(signal)
			{
				//Do somthing here...
			},
			onLoginFailure: function(signal)
			{
				//Do somthing here...
			}
		}
	);
		 * 
		 * @param {Array} signals The signals to register.
		 * @throws Error if the callback to bind to does not exist.
		 */
		registerSignals: function(registrations)
		{
			for (var callback in registrations)
			{
				if (Object.isFunction(this[callback]))
				{
					if (Object.isAssocArray(registrations[callback]))
					{
						if (Object.isDefined(registrations[callback].signal))
						{
							if (Object.isDefined(registrations[callback].filter)
							|| Object.isDefined(registrations[callback].type))
							{
								this.getRadioTower().observe
								(
									registrations[callback].signal,
									function(callback,signal)
									{
										if (signal.isForMe((registrations[callback].type || null),(registrations[callback].filter || null)))
										{
											return this[callback](signal);
										}
									}.bind(this,callback)
								);
							}
							else
							{
								this.getRadioTower().observe(registrations[callback].signal,this[callback].bind(this));
							}
						}
						else
						{
							throw new Error('Signal not defined for registerSignals.');
						}
					}
					else
					{
						this.getRadioTower().observe(registrations[callback],this[callback].bind(this));
					}
				}
				else
				{
					throw new Error('Attempt to bind signal to undefined callback "'+callback+'".');
				}
			}
		},
		registerSignalOnce: function(signal,callback)
		{
			if (!Object.isFunction(callback))
			{
				if (Object.isFunction(this[callback]))
				{
					callback=this[callback];
				}
				else
				{
					throw new Error('Attempt to bind signal to undefined callback "'+callback+'".');
				}
			}
			this.getRadioTower().observeOnce
			(
				signal,
				function(signal)
				{
					var body=signal.getBody();
					if (body.id==this.getID()
					|| body.component==this.getCmpName())
					{
						return callback(signal);
					}
				}.bind(this)
			);
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/trait/signal/Bindable", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.trait.signal.Bindable
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'strappy.trait.signal',
		$name:		'Bindable'
	}
)
(
	{
		/**
		 * 
		 */
		bindStatefulClick: function()
		{
			var links=$JSKK.toArray(arguments);
			$JSKK.when(this,'_ready').isTrue
			(
				function()
				{
					var item=null;
					for (var i=0,j=links.length; i<j; i++)
					{
						// check if the passed selector is in fact for the container
						var	container	=this.getContainer(),
							linkEl		=$(links[i][0])
						if (linkEl[0] == container[0])
						{
							item=linkEl;
						}
						else
						{
							item=$(links[i][0],container);
						}
						if (item.length)
						{
							this.getStateMgr().registerStateChanger(item,links[i][1]);
						}
					}
				}.bind(this)
			);
			return this;
		},
		/**
		 * 
		 */
		bindStateChanges: function(bindings)
		{
			if (Object.isUndefined(this._stateBindings))
			{
				this._stateBindings={};
			}
			for (var item in bindings)
			{
				if (Object.isFunction(this[bindings[item]]))
				{
					this._stateBindings[item]=this[bindings[item]].bind(this);
				}
				else
				{
					throw new Error('Unable to bind state change event for stateful property "'+item+'" because the method "'+bindings[item]+'" '
									+'has not been defined on view class "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'');
				}
			}
			return this;
		},
		/**
		 * 
		 */
		onStateChange: function(store,key,value)
		{
			if (Object.isUndefined(this._stateBindings))
			{
				this._stateBindings={};
			}
			if (Object.isFunction(this._stateBindings[key]))
			{
				this._stateBindings[key](value);
			}
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/Signal", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.Signal
 * This is the signal class. It is used as a factory by the
 * {@link strappy.trait.signal.Send} trait.
 * 
 * This class also contains constants for every framework level
 * signal that is emitted by the base {@link strappy.Component component class},
 * {@link strappy.mvc.Model models}, {@link strappy.mvc.View views} and
 * {@link strappy.mvc.Controller controllers}.
 * 
 * An instance of this class is generated for every signal
 * that is invoked by the strappy.
 * 
 * Every signal contains at least a name and a body. A signal may
 * optionally contain a type property and a filter. The latter two
 * properties can be used to fine-grainly filter a signal so that it
 * is not used in the wrong way.
 * 
 * @mixin $JSKK.trait.Configurable
 * @uses $JSKK.trait.Configurable
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy',
		$name:			'Signal',
		$uses:
		[
			'strappy.trait.signal.Send'
		]
	}
)
(
	{
		//Component
		/**
		 * @property COMPONENT_IS_READY
		 * @static
		 */
		COMPONENT_IS_READY:			'strappy.component.ready',
		
		//State
		/**
		 * @property STATE_CHANGE
		 * @static
		 */
		STATE_CHANGE:				'strappy.state.change',
		
		//Component
		/**
		 * @property CMP_DO_RECONFIGURE
		 * @static
		 */
		CMP_DO_RECONFIGURE:			'strappy.component.do.reconfigure',
		
		SHOW:						'strappy.component.show',
		HIDE:						'strappy.component.hide'
	},
	{
		config:
		{
			/**
			 * @cfg {String} name The name of the signal.
			 */
			name:	null,	// Required
			/**
			 * @cfg {Object} body The body of the signal. This should be an object
			 * containing key/value pair values.
			 */
			body:	null,	// Optional
			/**
			 * @cfg {String} type An additional type filter.
			 */
			type:	null,	// Optional
			/**
			 * @cfg {Object} filter An additional filter containing a mix of
			 * key/value pair values.
			 */
			filter:	{}		// Optional
		},
		init: function(config)
		{
			this.config.name	=config.name	|| null;
			this.config.body	=config.body	|| null;
			this.config.type	=config.type	|| null;
			this.config.filter	=config.filter	|| {};
		},
		/**
		 * Gets the name of the signal.
		 * @return {String} The name of the signal.
		 */
		getName: function()
		{
			return this.config.name;
		},
		getRadioTower: function()
		{
			return window.strappy.$radioTower;
		},
		/**
		 * Gets the body of the signal.
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
			onGotBaseHTML: function(signal)
			{
				if (signal.getBody().id=='Application.component.myComponent.view.Default')
				{
					//Do something here...
				}
			}
		}
	);
		 * 
		 * @return {Object} The body of the signal.
		 */
		getBody: function()
		{
			return this.config.body;
		},
		/**
		 * Gets the type of the signal.
		 * @return {String} The signal type.
		 */
		getType: function()
		{
			return this.config.type;
		},
		/**
		 * Gets the filter object of the signal.
		 * @return {Object} The signal's filter object.
		 */
		getFilter: function()
		{
			return this.config.filter;
		},
		/**
		 * This method will check the signals type and filter against
		 * the provided type and filter to see if they match.
		 * 
		 * Controllers can use this method in case they require fine-grained
		 * controll over which signals are accepted/rejected.
		 * 
		 * @param type {String} The signal type to be tested against as a string.
		 * @param filter {Object} The signal filter to be tested against as an object.
		 * @return {Boolean} True if the filter is a match.
		 */
		isForMe: function(type,filter)
		{
			if (!Object.isNull(type))
			{
				if (this.getType()!=type)
				{
					return false;
				}
			}
			if (!Object.isNull(filter))
			{
				var localFilter=this.getFilter();
				for (var item in filter)
				{
					if (Object.isUndefined(localFilter[item])
					|| filter[item]!=localFilter[item])
					{
						return false;
					}
				}
			}
			return true;
		},
		resend: function(filter,body)
		{
			if (Object.isUndefined(body))
			{
				body=this.getBody();
			}
			if (Object.isUndefined(filter.origin) && Object.isDefined(this.getFilter().origin))
			{
				filter.origin=this.getFilter().origin;
			}
			this.sendSignal(this.getName(),this.getType(),filter,body);
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/proxy/AbstractProxy", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.proxy.AbstractProxy
 * 
 * 
 * 
 * 
 * 
 * 
 * @abstract
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.proxy',
		$name:		'AbstractProxy',
		$abstract:	true,
		$uses:
		[
			'$JSKK.trait.Configurable',
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		/**
		 * @cfg {String} url The URL to assocate with this prxy.
		 */
		config:
		{
			url:	''
		},
		/**
		 * @property events A list of observable events.
		 * @property events.onBeforeRequest Fired before any request is made.
		 * @private
		 */
		events:
		{
			onBeforeRequest: true
		},
		/**
		 * Typically used by other utility classes to perform abstract
		 * requests.
		 * @return {Mixed}
		 */
		raw: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * @private
		 * @return {void}
		 */
		_onDone: $JSKK.Class.ABSTRACT_METHOD
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/proxy/Ajax", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.proxy.Ajax
 * @extends strappy.data.proxy.AbstractProxy
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.proxy',
		$name:		'Ajax',
		$extends:	'strappy.data.proxy.AbstractProxy'
	}
)
(
	{},
	{
		/**
		 * 
		 */
		get: function(config)
		{
			config.url=this.config.url;
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				if (Object.isUndefined(config.method))
				{
					config.method='POST';
				}
				$.get
				(
					{
						type:		config.method,
						url:		config.url,
						data:		config.filter || {}
					}
				)
				.done(this._onDone.bind(this,config))
				.fail(config.onFailure || $JSKK.emptyFunction);
			}
		},
		/**
		 * 
		 */
		sync: function(config)
		{
			config.url=this.config.url;
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				$.ajax
				(
					{
						type:	'POST',
						url:	config.url,
						data:	config.data || {}
					}
				)
				.done(this._onDone.bind(this,config))
				.fail(config.onFailure || $JSKK.emptyFunction);
			}
		},
		/**
		 * 
		 */
		raw: function(config)
		{
			console.debug('RAW DATA:',$.stringify(config.data));
			config.url=this.config.url;
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				$.ajax
				(
					{
						type:			'POST',
						contentType:	'application/json',
						processData:	false,
						url:			config.url,
						data:			$.stringify(config.data) || {}
					}
				)
				.done(this._onDone.bind(this,config))
				.fail(config.onFailure || $JSKK.emptyFunction);
			}
		},
		_onDone: function(config,response)
		{
			if (response.success)
			{
				(config.onSuccess || $JSKK.emptyFunction)(response);
			}
			else
			{
				(config.onFailure || $JSKK.emptyFunction)(response);
			}
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/proxy/BTL", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.proxy.BTL
 * @extends strappy.data.proxy.AbstractProxy
 * 
 * Batchable Transmission Layer Proxy
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.proxy',
		$name:		'BTL',
		$extends:	'strappy.data.proxy.AbstractProxy'
	}
)
(
	{},
	{
		/**
		 * Sends a raw request to the server as JSON.
		 * @param config An object containing configuration for the request. 
		 * @param config.url The url to send the request to.
		 * @param config.data The data which will be converted to a JSON string and sent
		 * with the request.
		 * @return {strappy.data.proxy.BTL} this
		 */
		raw: function(config)
		{
			config.url=this.config.url;
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				var seen=[];
				$.ajax
				(
					{
						type:			'POST',
						contentType:	'application/json',
						processData:	false,
						url:			config.url,
						data:			JSON.stringify
										(
											config.data,
											function(key, val)
											{
												if (typeof val == "object")
												{
													if (seen.indexOf(val) >= 0)
													{
														return;
													}
													seen.push(val);
												}
												return val;
											}
										) || {}
					}
				)
				.done(this._onDone.bind(this,config))
				.fail
				(
					function(response)
					{
						console.warn('BTL Proxies raw() method hasn\'t been confiugred to deal with failures.');
//						config.onComplete();
					}
				);
			}
			return this;
		},
		_onDone: function(config,response)
		{
			if (response.success)
			{
				(config.onSuccess || $JSKK.emptyFunction)(response);
			}
			else
			{
				(config.onFailure || $JSKK.emptyFunction)(response);
			}
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/proxy/MemoryProxy", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.proxy.MemoryProxy
 * 
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.proxy',
		$name:		'MemoryProxy',
		$extends:	'strappy.data.proxy.AbstractProxy'
	}
)
(
	{},
	{
		/**
		 * Typically used by other utility classes to perform abstract
		 * requests.
		 * @return {Mixed}
		 */
		raw: function(config)
		{
			this._onDone(config);
		},
		sync: function(config)
		{
			this._onDone(config);
		},
		/**
		 * @private
		 * @return {void}
		 */
		_onDone: function(config)
		{
			(config.onSuccess || $JSKK.emptyFunction)({});
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/BTL", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.BTL
 * 
 * Batchable Transmission Layer
 * 
 * 
 * 
 * 
 * @abstract
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.data',
		$name:		'BTL',
		$uses:
		[
			'$JSKK.trait.Configurable',
			'$JSKK.trait.Observable'
		],
		$requires:
		[
			'strappy.data.proxy.BTL'
		]
	}
)
(
	{
		APIMethod: function(call,data,query,callback)
		{
			// if (this.config.debug)
			// {
			// 	var contents=call+'::('+$.stringify(data)+')::('+$.stringify(query)+')';
			// 	this.debugWindow.find('ul').append('<li>'+contents+'</li>');
			// }
			this.proxy.raw
			(
				{
					url:		this.config.url,
					data:
					{
						timestamp:	new Date().getTime(),
						call:		call,
						data:		data || null,
						query:		query || null
					},
					onSuccess: function(response)
					{
						if (this.fireEvent('onAnySuccess',this,response)!==false)
						{
							if (Object.isFunction(callback))callback(response);
						}
					}.bind(this),
					onFailure: function(response)
					{
						if (this.fireEvent('onAnyFailure',this,response)!==false)
						{
							if (Object.isFunction(callback))callback(response);
						}
					}.bind(this)
				}
			);
		}
	},
	{
		config:
		{
			/**
			 * @cfg url
			 */
			url:		'',
			debug:		false,
			/**
			 * @cfg proxy
			 */
			proxy:		null
		},
		events:
		{
			onAnySuccess:	true,
			onAnyFailure:	true
		},
		/**
		 *  @property ready
		 */
		ready:			false,
		/**
		 * @property proxy
		 */
		proxy:			null,
		/**
		 * @property API
		 */
		API:			{},
		/**
		 * @property queue
		 */
		queue:			null,
		
		debugWindow:	null,
		
		/**
		 * 
		 */
		init: function()
		{
			if (Object.isUndefined(this.config.proxy) || Object.isNull(this.config.proxy))
			{
				this.config.proxy=strappy.data.proxy.BTL;
			}
			// if (this.config.debug)
			// {
			// 	this.debugWindow=$('<div id="strappy-BTL-debugWindow"><h2>BTL Requests</h2><ul></ul></div>');
			// 	this.debugWindow.css
			// 	(
			// 		{
			// 			position:		'absolute',
			// 			top:			0,
			// 			left:			0,
			// 			zIndex:			100000,
			// 			width:			600,
			// 			height:			400,
			// 			overflow:		'auto',
			// 			backgroundColor:'#58595B'
			// 		}	
			// 	);
			// 	$('body').append(this.debugWindow);
			// }
			this.proxy=new this.config.proxy({url:this.config.url});
			this.getServiceAPI();
		},
		/**
		 * 
		 */
		onReady: function(callback)
		{
			$JSKK.when(this,'ready').isTrue(callback);
		},
		/**
		 * 
		 */
		getServiceAPI: function()
		{
			$.ajax
			(
				{
					type:	'GET',
					url:	this.config.url
				}
			)
			.done(this.createAPIMethods.bind(this))
			.fail
			(
				function()
				{
					console.debug('SERVICE LOAD ERROR',arguments);
				}
			);
		},
		/**
		 * 
		 */
		createAPIMethods: function(exposedAPI)
		{
			var	controller	=null,
				i			=0,
				j			=0;
			for (controller in exposedAPI)
			{
				this.API[controller]={};
				for (i=0,j=exposedAPI[controller].length; i<j; i++)
				{
					this.API[controller][exposedAPI[controller][i]]=this.$reflect('self').APIMethod.bind(this,controller+'.'+exposedAPI[controller][i]);
				}
			}
			this.ready=true;
		},
		/**
		 * 
		 */
		setProxy: function(proxy,url)
		{
			this.proxy=new this.config.proxy({url:(url || this.config.url)});
			return this;
		},
		/**
		 * 
		 */
		bindType: function(record,type)
		{
			record['_type']=type;
			return record;
		},
		/**
		 * 
		 */
		startQueue: function()
		{
			this.queue=new strappy.data.Queue();
			this.queue.attachProxy(this.proxy);
			return this;
		},
		/**
		 * 
		 */
		executeQueue: function()
		{
			this.queue.execute();
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/AbstractStore", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.AbstractStore
 * @abstract
 * 
 * This is the base store of which all other stores extend from.
 * 
 * You should never use this store directly.
 * 
 * @uses strappy.trait.ComponentConnector
 * @uses $JSKK.trait.Observable
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.data',
		$name:			'AbstractStore',
		$abstract:		true,
		$uses:
		[
			'strappy.trait.ComponentConnector',
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		/**
		 * @property [events] A list of observable events.
		 * @property [events.onChange] Fired whenever anything in the store is changed.
		 * @property [events.onSync] Fired whenever the store is synced.
		 * @property [events.onSyncFailed] Fired whenever the store is synced and the sync fails.
		 * @property [events.onModelLockChange] Fired whenever the lock state of the containing models changes.
		 * @private
		 */
		events:
		{
			onChange:			true,
			onSync:				true,
			onSyncFailed:		true,
			onModelChange:		true,
			onModelRemove:		true,
			onModelLockChange:	true
		},
		/**
		 * @property {strappy.data.proxy.AbstractProxy} proxy
		 * @private
		 */
		proxy:			null,
		
		sharedFrom:		null,
		/**
		 * @property {strappy.mvc.Model} model A model object which new models will be created from
		 * @private
		 */
		model:			null,
		/**
		 * @property {Object} data initial record to start the store with.
		 * @private
		 */
		data:			{},
		/**
		 * @property {strappy.mvc.Model} record Represents the model instance.
		 * @private
		 */
		record:			null,
		
		transactions:	[],
		
		ready:			false,
		
		/**
		 * @constructor
		 * Sets up and validates the store.
		 * 
		 * @return {strappy.data.AbstractStore}
		 */
		init: function()
		{
			if (Object.isNull(this.proxy))
			{
				this.proxy=new strappy.data.proxy.MemoryProxy();
			}
			if (Object.isString(this.sharedFrom))
			{
				this.sharedFrom=$JSKK.namespace(this.sharedFrom);
			}
			if (Object.isString(this.model))
			{
				try
				{
					this.model=$JSKK.strToObject(this.model);
					this.ready=true;
				}
				catch(e)
				{
					$JSKK.require
					(
						this.model,
						function()
						{
							this.model=$JSKK.namespace(this.model);
							this.ready=true;
						}.bind(this)
					);
				}
				
			}
		},
		/**
		 * Creates a new model instance based on the attached model
		 * and returns it.
		 * 
		 * Also binds locking events to the model which handles chaining
		 * model lock change events to the store's onModelLockChange event.
		 * 
		 * @param {Object} record an object representing the model.
		 * @return {strappy.mvc.Model}
		 */
		newRecord: function(record)
		{
			var model=this.model;
			if  (this.isShared())
			{
				model=this.getShared().model;
			}
			return new model
			(
				{
					onLockChange: function(model,lockState)
					{
						this.fireEvent('onModelLockChange',this,model,lockState);
					}.bind(this)
				},
				record
			);
		},
		/**
		 * Binds (enables) change events to store.
		 * 
		 * @param record {strappy.mvc.Model}
		 * @returns {strappy.data.AbstractStore}
		 */
		bindChangeEvent: function(record)
		{
			var fullStoreName=this.$reflect('namespace')+'.'+this.$reflect('name');
			if (Object.isUndefined(record._storeChangeEvent[fullStoreName]))
			{
				record._storeChangeEvent[fullStoreName]=this.onModelChange.bind(this);
			}
			else
			{
				record.unobserve('onChange',record._storeChangeEvent[fullStoreName]);
			}
			record.observe('onChange',record._storeChangeEvent[fullStoreName]);
			return this;
		},
		/**
		 * Unbinds (disables) change events to store.
		 * 
		 * @param record {strappy.mvc.Model}
		 * @returns {strappy.data.AbstractStore}
		 */
		bindRemoveEvent: function(record)
		{
			var fullStoreName=this.$reflect('namespace')+'.'+this.$reflect('name');
			if (Object.isUndefined(record._storeRemoveEvent[fullStoreName]))
			{
				record._storeRemoveEvent[fullStoreName]=this.onModelRemove.bind(this);
			}
			else
			{
				record.unobserve('onRemove',record._storeRemoveEvent[fullStoreName]);
			}
			record.observe('onRemove',record._storeRemoveEvent[fullStoreName]);
			return this;
		},
		/**
		 * Private callback to handle model change events.
		 * 
		 * @private
		 * @param model {strappy.data.AbstractStore}
		 * @return {void}
		 */
		onModelChange: function(model)
		{
			/*
			 * Check if the model is in a transaction.
			 * 
			 * If the model is not in a transaction, fire the
			 * onModelChange and onChange events.
			 * 
			 * If the model is in a transaction, find the transaction
			 * and check if it is the last model in the transaction.
			 * 
			 * 	*	If it is not the last model in the transaction,
			 * 		only remove the model from the transaction's model list.
			 * 		
			 * 	*	If it is the last model in the transaction, remove the
			 * 		model from the transaction's model list and remove the
			 * 		transaction from the transaction list.
			 * 		Then fire the onChange event.
			 * 		
			 */
			if (this.isModelInAnyTransaction(model))
			{
				var index=false;
				for (var i=0,j=this.transactions.length; i<j; i++)
				{
					if (index)break;
					for (var k=0,l=this.transactions[i].models.length; k<l; k++)
					{
						if (this.transactions[i].models[k]==model)
						{
							index=i;
							break;
						}
					}
				}
				if (index!==false)
				{
					if (this.transactions[index].models.length===1)
					{
						this.releaseModelFromTransaction(model,this.transactions[index].transaction);
						this.releaseTransaction(this.transactions[index].transaction);
						this.fireEvent('onChange',this,model);
					}
					else
					{
						this.releaseModelFromTransaction(model,this.transactions[index].transaction);
					}
				}
				else
				{
					throw new Error('Unable to locate a model within a transaction. BTW, this should never happen! IOW - You\'re screwed :)');
				}
			}
			else
			{
				this.fireEvent('onModelChange',this,model);
				// this.fireEvent('onChange',this,model);
			}
		},
		/**
		 * Private callback to handle model remove events.
		 * 
		 * @private
		 * @param model {strappy.data.AbstractStore}
		 * @return {void}
		 */
		onModelRemove: function(model)
		{
			/*
			 * Check if the model is in a transaction.
			 * 
			 * If the model is not in a transaction, fire the
			 * onModelRemove and onRemove events.
			 * 
			 * If the model is in a transaction, find the transaction
			 * and check if it is the last model in the transaction.
			 * 
			 * 	*	If it is not the last model in the transaction,
			 * 		only remove the model from the transaction's model list.
			 * 		
			 * 	*	If it is the last model in the transaction, remove the
			 * 		model from the transaction's model list and remove the
			 * 		transaction from the transaction list.
			 * 		Then fire the onRemove event.
			 * 		
			 */
			if (this.isModelInAnyTransaction(model))
			{
				var index=false;
				for (var i=0,j=this.transactions.length; i<j; i++)
				{
					if (index)break;
					for (var k=0,l=this.transactions[i].models.length; k<l; k++)
					{
						if (this.transactions[i].models[k]==model)
						{
							index=i;
							break;
						}
					}
				}
				if (index!==false)
				{
					if (this.transactions[index].models.length===1)
					{
						this.releaseModelFromTransaction(model,this.transactions[index].transaction);
						this.releaseTransaction(this.transactions[index].transaction);
						this.fireEvent('onChange',this,model);
					}
					else
					{
						this.releaseModelFromTransaction(model,this.transactions[index].transaction);
					}
				}
				else
				{
					throw new Error('Unable to locate a model within a transaction. BTW, this should never happen! IOW - You\'re screwed :)');
				}
			}
			else
			{
				this.fireEvent('onModelRemove',this,model);
				// this.fireEvent('onChange',this,model);
			}
		},
		/**
		 * Returns the attached model (not an instance of it).
		 * 
		 * @return {strappy.mvc.Model}
		 */
		getModel: function()
		{
			return this.model;
		},
		/**
		 * Generic getter.
		 * 
		 * @return {Mixed}
		 */
		get: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * Generic setter.
		 * 
		 * @return  {strappy.data.AbstractStore} this
		 */
		set: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * This method will check if the attached model is dirty. If so,
		 * it will send it to the server. Otherwise it will ignore the model
		 * and simply request a new one.
		 * 
		 * @return {strappy.data.SingleModelStore}
		 */
		sync: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * Sets a new proxy on the store.
		 * 
		 * @return {strappy.data.AbstractStore} this
		 */
		setProxy: function(proxy)
		{
			this.proxy=proxy;
			return this;
		},
		/**
		 * Returns the attached proxy.
		 * 
		 * @return {strappy.data.proxy.AbstractProxy} The attached proxy.
		 */
		getProxy: function()
		{
			return this.proxy;
		},
		/**
		 * Checks the state of the store to determine weather or not this
		 * 
		 * @return {Boolean} true if the store is dirty.
		 */
		isDirty: $JSKK.Class.ABSTRACT_METHOD,
		
		/**
		 * Checks if this store is attached to a shared store.
		 * 
		 * @return {Boolean} True if the store is a shared store.
		 */
		isShared: function()
		{
			return (Object.isAssocArray(this.sharedFrom) && Object.isFunction(this.sharedFrom.$reflect));
		},
		
		getShared: function()
		{
			return this.sharedFrom;
		},
		
		informModelIsInTransaction: function(model,transaction)
		{
			if (!this.hasRecordedTransaction(transaction))
			{
				this.recordTransaction(transaction);
			}
			
			if (this.isModelInAnyTransaction(model)
			&& !this.isModelInTransaction(model,transaction))
			{
				throw new Error('A model cannot be attached to two transactions at any given time.');
			}
			if (!this.isModelInTransaction(model,transaction))
			{
				this.recordModelInTransaction(model,transaction);
			}
		},
		hasRecordedTransaction: function(transaction)
		{
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction==transaction)
				{
					return true;
				}
			}
		},
		recordTransaction: function(transaction)
		{
			this.transactions.push({transaction:transaction,models:[]});
			return this;
		},
		releaseTransaction: function(transaction)
		{
			var newArray=[];
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction!=transaction)
				{
					newArray.push(this.transactions[i]);
				}
			}
			this.transactions=newArray;
			return this;
		},
		isModelInTransaction: function(model,transaction)
		{
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction==transaction)
				{
					for (var k=0,l=this.transactions[i].models.length; k<l; k++)
					{
						if (this.transactions[i].models[k]==model)
						{
							return true;
						}
					}
				}
			}
			return false;
		},
		isModelInAnyTransaction: function(model)
		{
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				for (var k=0,l=this.transactions[i].models.length; k<l; k++)
				{
					if (this.transactions[i].models[k]==model)
					{
						return true;
					}
				}
			}
			return false;
		},
		recordModelInTransaction: function(model,transaction)
		{
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction==transaction)
				{
					this.transactions[i].models.push(model);
					break;
				}
			}
			return this;
		},
		releaseModelFromTransaction: function(model,transaction)
		{
			var newArray=[];
			for (var i=0,j=this.transactions.length; i<j; i++)
			{
				if (this.transactions[i].transaction==transaction)
				{
					for (var k=0,l=this.transactions[i].models.length; k<l; k++)
					{
						if (this.transactions[i].models[k]!=model)
						{
							newArray.push(this.transactions[i].models[k]);
						}
					}
					this.transactions[i].models=newArray;
					break;
				}
			}
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/SingleModelStore", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.SingleModelStore
 * @extends strappy.data.AbstractStore
 * @abstract
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.data',
		$name:			'SingleModelStore',
		$extends:		'strappy.data.AbstractStore',
		$abstract:		true
	}
)
(
	{},
	{
		BTL:			null,
		BTL_GET:		null,
		BTL_GET_QUERY:	null,
		BTL_SET:		null,
		BTL_REMOVE:		null,
		BTL_CHECK:		null,
		/**
		 * @constructor
		 * Sets up and validates the store.
		 * 
		 * @return {strappy.data.SingleModelStore}
		 */
		init: function()
		{
			this.init.$parent();
			if (!this.isShared())
			{
				if (!Object.isNull(this.model) && Object.isDefined(this.model))
				{
					this.record=this.newRecord(this.data);
					this.bindChangeEvent(this.record);
					this.bindRemoveEvent(this.record);
					delete this.data;
				}
				else
				{
					throw new Error('Store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" must be configured with a valid model.');
				}
				if (Object.isString(this.BTL))
				{
					this.BTL=$JSKK.namespace(this.BTL);
					if (Object.isString(this.BTL_GET))
					{
						this.BTL_GET=$JSKK.namespace(this.BTL_GET);
					}
					if (Object.isString(this.BTL_SET))
					{
						this.BTL_SET=$JSKK.namespace(this.BTL_REMOVE);
					}
					if (Object.isString(this.BTL_REMOVE))
					{
						this.BTL_REMOVE=$JSKK.namespace(this.BTL_REMOVE);
					}
					if (Object.isString(this.BTL_CHECK))
					{
						this.BTL_CHECK=$JSKK.namespace(this.BTL_CHECK);
					}
				}
			}
			else
			{
				var	shared=this.getShared(),
					record=shared.newRecord(this.data);
				this.getShared().add(records);
				this.bindChangeEvent(record);
				this.bindRemoveEvent(record);
				//Make a reference.
				this.record=shared.record;
				if (Object.isString(shared.BTL))
				{
					shared.BTL=$JSKK.namespace(shared.BTL);
					if (Object.isString(shared.BTL_GET))
					{
						shared.BTL_GET=$JSKK.namespace(shared.BTL_GET);
					}
					if (Object.isString(shared.BTL_SET))
					{
						shared.BTL_SET=$JSKK.namespace(shared.BTL_SET);
					}
					if (Object.isString(shared.BTL_REMOVE))
					{
						shared.BTL_REMOVE=$JSKK.namespace(shared.BTL_REMOVE);
					}
					if (Object.isString(shared.BTL_CHECK))
					{
						shared.BTL_CHECK=$JSKK.namespace(shared.BTL_CHECK);
					}
				}
			}
		},
		/**
		 * Gets the value of a given field from the attached model.
		 * 
		 * @param {String} field The name of the field to fetch the value of.
		 * @return {Mixed} The value of the field.
		 */
		get: function(field)
		{
			return this.record.get(field);
		},
		/**
		 * 
		 * @return {strappy.mvc.Model}
		 */
		getRecord: function()
		{
			return this.record;
		},
		/**
		 * 
		 * @return {Object}
		 */
		getRawRecord: function()
		{
			return this.record.record;
		},
		/**
		 * Sets a value of a given field on the attached model.
		 * 
		 * @param {String} field The field to assign a value to.
		 * @param {Mixed} value The value to be assigned to the field.
		 * @return 
		 */
		set: function()
		{
			this.record.set.apply(this.record,$JSKK.toArray(arguments));
			return this;
		},
		/**
		 * This method will check if the attached model is dirty. If so,
		 * it will send it to the server. Otherwise it will ignore the model
		 * and simply request a new one.
		 * 
		 * @return {strappy.data.SingleModelStore}
		 */
		sync: function(data,query)
		{
			var target=(this.isShared()?this.getShared():this);
			
			if (Object.isAssocArray(target.BTL))
			{
				target.BTL.startQueue();
				if (target.isDirty())
				{
					target.BTL_SET([target.record]);
				}
				target.BTL_GET
				(
					data,
					query,
					function(response)
					{
						var records=response.data;
						target.record=target.newRecord(records[0]);
						target.fireEvent('onChange',target,records[0]);
						target.fireEvent('onSync',target,records[0]);
					}.bind(target)
				);
				target.BTL.executeQueue();
			}
			else if (target.proxy && Object.isFunction(target.proxy.sync))
			{
				var changeset=[]; 
				if (target.isDirty())
				{
					changeset=[target.record];
				}
				target.proxy.sync
				(
					{
						data:		changeset,
						onSuccess:	function(response)
						{
							target.record=target.newRecord(response.data[0]);
							target.fireEvent('onChange',target,response);
							target.fireEvent('onSync',target,response);
						}.bind(target),
						onFailure: function(response)
						{
							target.fireEvent('onSyncFailed',target,response);
						}.bind(target)
					}
				);
			}
			else
			{
				throw new Exception('The store "'+target.$reflect('namespace')+'.'+target.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
			}
		},
		/**
		 * This method simply request a new model through the proxy.
		 * 
		 * @return {strappy.data.SingleModelStore}
		 */
		load: function(filter)
		{
			if (this.proxy && Object.isFunction(this.proxy.get))
			{
				this.proxy.get
				(
					{
						filter: filter,
						onSuccess:	function(response)
						{
							this.record=this.newRecord(response.data[0]);
							this.fireEvent('onChange',this,response);
							this.fireEvent('onLoad',this,response);
						}.bind(this),
						onFailure: function(response)
						{
							this.fireEvent('onLoadFailed',this,response);
						}.bind(this)
					}
				);
			}
			else
			{
				throw new Exception('The store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
			}
			return this;
		},

		isDirty: function()
		{
			return this.record.isDirty();
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/MultiModelStore", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.MultiModelStore
 * @extends strappy.data.AbstractStore
 * 
 * 
 * @abstract
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.data',
		$name:			'MultiModelStore',
		$extends:		'strappy.data.AbstractStore',
		$abstract:		true
	}
)
(
	{},
	{
		BTL:			null,
		BTL_GET:		null,
		BTL_GET_QUERY:	null,
		BTL_SET:		null,
		BTL_REMOVE:		null,
		BTL_CHECK:		null,
		model:			null,
		/**
		 * @property {Array} data initial records to start the store with.
		 * @private
		 */
		data:		[],
		/**
		 * @property {Array} records Represent an array of
		 * {@link strappy.mvc.Model model} instances.
		 * @private
		 */
		records:	[],
		/**
		 * @constructor
		 * Sets up and validates the store.
		 * 
		 * @return {strappy.data.MultiModelStore}
		 */
		init: function()
		{
			this.init.$parent();
			$JSKK.when(this,'ready').isTrue
			(
				function()
				{
					if (!this.isShared())
					{
						
						if (!Object.isNull(this.model) && Object.isDefined(this.model))
						{
							this.records=this.newRecord(this.data);
							for (var i=0,j=this.records.length; i<j; i++)
							{
								this.bindChangeEvent(this.records[i]);
								this.bindRemoveEvent(this.records[i]);
							}
							delete this.data;
						}
						else
						{
							throw new Error('Store "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" must be configured with a valid model.');
						}
						if (Object.isString(this.BTL))
						{
							this.BTL=$JSKK.namespace(this.BTL);
							if (Object.isString(this.BTL_GET))
							{
								this.BTL_GET=$JSKK.namespace(this.BTL_GET);
							}
							if (Object.isString(this.BTL_SET))
							{
								this.BTL_SET=$JSKK.namespace(this.BTL_SET);
							}
							if (Object.isString(this.BTL_REMOVE))
							{
								this.BTL_REMOVE=$JSKK.namespace(this.BTL_REMOVE);
							}
							if (Object.isString(this.BTL_CHECK))
							{
								this.BTL_CHECK=$JSKK.namespace(this.BTL_CHECK);
							}
						}
					}
					else
					{
						var	shared	=this.getShared(),
							records	=shared.newRecord(this.data);
						shared.add(records);
						for (var i=0,j=records.length; i<j; i++)
						{
							this.bindChangeEvent(records[i]);
							this.bindRemoveEvent(records[i]);
						}
						//Make a reference.
						this.records=shared.records;
						
						if (Object.isString(shared.BTL))
						{
							shared.BTL=$JSKK.namespace(shared.BTL);
							if (Object.isString(shared.BTL_GET))
							{
								shared.BTL_GET=$JSKK.namespace(shared.BTL_GET);
							}
							if (Object.isString(shared.BTL_SET))
							{
								shared.BTL_SET=$JSKK.namespace(shared.BTL_SET);
							}
							if (Object.isString(shared.BTL_REMOVE))
							{
								shared.BTL_REMOVE=$JSKK.namespace(shared.BTL_REMOVE);
							}
							if (Object.isString(shared.BTL_CHECK))
							{
								shared.BTL_CHECK=$JSKK.namespace(shared.BTL_CHECK);
							}
						}
					}
				}.bind(this)
			);
		},
		/**
		 * Creates new model instances based on the attached model
		 * and returns them.
		 * 
		 * Also binds locking events to the new model instances which handles
		 * chaining model lock change events to the store's
		 * onModelLockChange event.
		 * 
		 * @param {Object} record an object representing the model.
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
		 */
		newRecord: function(records)
		{
			if (!Object.isArray(records))
			{
				records=[records];
			}
			var	newRecords	=[],
				index		=0;
			for (var i=0,j=records.length; i<j; i++)
			{
				index=newRecords.push(this.newRecord.$parent(records[i]));
				newRecords[(index-1)].bindStore(this);
			}
			return newRecords;
		},
		/**
		 * This method allows you to iterate over each item
		 * in the store.
		 * 
		 * Example:
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
			generateList: function()
			{
				var HTML=['<ul>'];
				this.getStore('Default').each
				(
					function(item)
					{
						HTML.push('<li><a href="'+item.url+'">'+item.name+'</a></li>');
					}
				);
				HTML.push('</ul>');
				return HTML.join('');
			}
		}
	);
		 * @param {Function} callback A closure which will be called at each iteration.
		 * The first parameter of the closure will be the data item.
		 * @return {strappy.mvc.Model}
		 */
		each: function(callback)
		{
			this.records.each(callback);
			return this;
		},
		/**
		 * Adds a record to the store.
		 * 
		 * Note: The record will be flagged as dirty when it is added to the store.
		 * 
		 * @param {Mixed} record The record to be added to the store.
		 * @return {strappy.data.MultiModelStore} this
		 */
		add: function(records)
		{
			if (this.ready)
			{
				this._add(records);
			}
			else
			{
				$JSKK.when(this,'ready').isTrue
				(
					this._add.bind(this,records)
				);
			}
			return this;
		},
		_add: function(records)
		{
			if (!Object.isArray(records))
			{
				records=[records];
			}
			for (var i=0,j=records.length; i<j; i++)
			{
				if (!Object.isFunction(records[i].$reflect))
				{
					records[i]=this.newRecord(records[i])[0];
				}
				else
				{
					records[i].bindStore(this);
				}
				// records[i].flagDirty();
				this.records.push(records[i]);
				this.bindChangeEvent(records[i]);
				this.bindRemoveEvent(records[i]);
			}
			this.fireEvent('onChange',this);
			return this;
		},
		/**
		 * Removes a record from the store.
		 * 
		 * NOTE: This will auto remove the record form the server if
		 * it is attached to a BTL_REMOVE method.
		 * 
		 * @param {Mixed} record The record to be removed from the store.
		 * @return {strappy.data.MultiModelStore} this
		 */
		remove: function(record,supressEvent)
		{
			var	target		=(this.isShared()?this.getShared():this),
				newRecords	=[];
			if (Object.isFunction(target.BTL_REMOVE))
			{
				target.BTL_REMOVE({_type:record.get('_type'),id:record.getId()},null);
			}
			for (var i=0,j=this.records.length; i<j; i++)
			{
				if (this.records[i]!=record)
				{
					newRecords.push(this.records[i]);
				}
			}
			this.records=newRecords;
			if (!supressEvent)
			{
				record.fireEvent('onRemove',record,this);
				this.fireEvent('onChange',this);
				this.fireEvent('onModelRemove',this,record);
			}
			return this;
		},
		/**
		 * Removes all records in the store.
		 * @return {strappy.data.MultiModelStore} this
		 */
		removeAll: function()
		{
//			this.removeByRange(0,this.records.length,true);
//			this.fireEvent('onChange',this);
			
			this.removeByRange(0,this.records.length);
			return this;
		},
		/**
		 * Removes a range of records from the store.
		 * @param {Number} start index of the range to be deleted.
		 * @param {Number} end index of the range to be deleted.
		 * @return {strappy.data.MultiModelStore} this
		 */
		removeByRange: function(startIndex,endIndex,supressEvent)
		{
			if(startIndex < 0 || startIndex > this.records.length)
			{
				// console.log("StartIndex is out of range.");
				return this;
			}

			if(endIndex < startIndex)
			{
				// console.log("EndIndex is invalid.");
				return this;
			}

			if(endIndex > this.records.length)
			{
				// console.log("EndIndex is out of range.");
				return this;
			}
			var	sliced	=this.records.splice(startIndex,endIndex),
				target	=(this.isShared()?this.getShared():this);
			if (Object.isFunction(target.BTL_REMOVE))
			{
				target.BTL.startQueue();
				for (var i=0,j=sliced.length; i<j; i++)
				{
					target.BTL_REMOVE({_type:sliced[i].get('_type'),id:sliced[i].getId()},null);
				}
				target.BTL.executeQueue();
			}
			if (!supressEvent)
			{
				for (var i=0,j=sliced.length; i<j; i++)
				{
					sliced[i].fireEvent('onRemove',sliced[i],this);
					this.fireEvent('onModelRemove',this,sliced[i]);
				}
				this.fireEvent('onChange',this);
			}
			return this;
		},
		/**
		 * Returns RecordIndex by key/value pair
		 * @param {Number} key the property key.
		 * @param {Number} value the property value.
		 * @return {strappy.mvc.Model}
		 */
		getRecordIndexByValue: function(key, value)
		{
			var index = -1;
			this.each
			(
				function(model, i)
				{
					if (model.getRecord()[key]==value)
					{
						index=i;
					}
				}.bind(this)
			);
			return index;
		},
		/**
		 * Return RecordIndex by record
		 * @param {Object} record the record.
		 * @return {strappy.mvc.Model}
		 */
		getRecordIndex: function(record)
		{
			var index = -1;
			this.each
			(
				function(model, i)
				{
					if (model.getRecord()===record)
					{
						index=i;
					}
				}.bind(this)
			);
			return index;
		},
		/**
		 * Returns all attched model instances (records).
		 * 
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
		 */
		getAll: function()
		{
			return this.records;
		},
		/**
		 * Returns the specified keys of the attached model instances (records).
		 * 
		 * @param  {Array} keys An array of keys to return.
		 * @param {Boolean} flatten If only one key is passed, the returned array can be flattened.
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
		 */
		getAllFiltered: function(keys,flatten)
		{
			if (!Object.isArray(keys))keys=[keys];
			
			var records=[];
			
			this.each
			(
				function(record)
				{
					var thisRecord={};
					for (var i=0,j=keys.length; i<j; i++)
					{
						thisRecord[keys[i]]=record.get(keys[i]);
					}
					records.push(thisRecord);
				}
			);
			if (flatten && keys.length)
			{
				var flattenedRecords=[];
				for (var i=0,j=records.length; i<j; i++)
				{
					flattenedRecords.push(records[i][keys[0]]);
				}
				return flattenedRecords;
			}
			else
			{
				return records;
			}
		},
		/**
		 * Returns the total number of records in this store.
		 * 
		 * @return {Number} The total number of records.
		 */
		getCount: function()
		{
			return this.records.length;
		},
		/**
		 * Fetches a record based on its index in the store.
		 * @param {Number} index The index.
		 * @return {Mixed} The record.
		 */
        getAt: function(index)
		{
			return this.records[index];
		},
		/**
		 * Returns the first attached model.
		 * 
		 * @return {strappy.mvc.Model} The model.
		 */
		first: function()
		{
			return this.getAt(0);
		},
		/**
		 * Returns the last attached model.
		 * 
		 * @return {strappy.mvc.Model} The model.
		 */
		last: function()
		{
			return this.getAt(this.records.length-1);
		},
		get: function()
		{
			
		},
		set: function()
		{
			
		},
		/**
		 * 
		 */
		getById: function(modelId)
		{
			var ret=null;
			this.each
			(
				function(record)
				{
					if (record.getId()==modelId)
					{
						ret=record;
						return false;
					}
				}.bind(this)
			);
			return ret;
		},
		/**
		 * Finds attached models based on a simple key value search.
		 * 
		 * Find all Toms.
	var toms=this.getStore('Person').find('name','Tom');
		 * 
		 * Find all ACTIVE Toms.
		 * 
	var activeToms=this.getStore('Person').find
	(
		{
			name:	'Tom',
			active:	true
		}
	);
		 * 
		 * @param {String} key The key to search against.
		 * @param {Mixed} value The value to search for.
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
		 */
		find: function()
		{
			var	args		=$JSKK.toArray(arguments),
				keyVals		={},
				records		=[];
			if (Object.isDefined(args[1]))
			{
				keyVals[args.shift()]=args.shift();
			}
			else
			{
				keyVals=args.shift();
			}
			this.each
			(
				function(record)
				{
					for (var field in keyVals)
					{
						if (record.get(field)!=keyVals[field])
						{
							return false;
						}
					}
					records.push(record);
				}.bind(this)
			);
			return records;
		},
		/**
		 * Finds attached models based on custom searching logic provided
		 * by a callback function which gets passed to this method.
		 * 
		 * The function will be called for each model instance in the store.
		 * The function should return true for evey record that you want returned.
		 * 
	var activeToms=this.getStore('Person').findBy
	(
		function(model)
		{
			if (model.get('name')=='Tom'
			&& model.get('active'))
			{
				return true;
			}
		}
	);
		 * 
		 * @param {Function} callback A function to call for each record.
		 * @return {Array} An array of {@link strappy.mvc.Model Model} instances.
		 */
		findBy: function(callback)
		{
			var records=[];
			this.each
			(
				function(record)
				{
					if (callback(record))
					{
						records.push(record);
					}
				}
			);
			return records;
		},
		/**
		 * Returns an object in groups of arrays which match the groupBy filter provided.
		 * 
		 * @param groupBy {String} The field in which to group records by.
		 */
		getGrouped: function(groupBy)
		{
			var groups	={},
				groupKey=null;
			for (var i=0,j=this.records.length; i<j; i++)
			{
				groupKey=this.records[i].get(groupBy);
				if (Object.isUndefined(groups[groupKey]))
				{
					groups[groupKey]=[];
				}
				groups[groupKey].push(this.records[i]);
			}
			return groups;
		},
		/**
		 * Sets all the associated models
		 */
		setAll: function()
		{
			var	args		=$JSKK.toArray(arguments),
				keyVals		={},
				transaction	=new strappy.data.Transaction();
			if (Object.isDefined(args[1]))
			{
				keyVals[args.shift()]=args.shift();
			}
			else
			{
				keyVals=args.shift();
			}
			transaction.start();
			var	thisModel	=null,
				field		=null;
			for (var i=0,j=this.records.length; i<j; i++)
			{
				thisModel=transaction.attachModel(this.records[i]);
				thisModel.set(keyVals);
			}
			transaction.execute
			(
				{
					onSuccess:	function()
					{
						transaction.commit();
						this.fireEvent('onChange',this);
					}.bind(this),
					onFailure: function()
					{
						transaction.rollback();
					}
				}
			);
			return this;
		},
//		/**
//		 * Sets a record at a given index in the store.
//		 * @param {Number} index The index.
//		 * @param {Mixed} data The new data to set.
//		 * 
//		 */
//        setAt: function(index,data)
//		{
//			data.id=this.records[0].id;
//			this.records[index]=data;
//			
//			this.fireEvent('onChange',this,index,data);
//		},
		/**
		 * This method will fetch all dirty models and attach them to a
		 * proxy sync request.
		 * The expected response is a new record set. 
		 * 
		 * 
		 * TODO: Detail this.
		 */
		sync: function(data,query,callback)
		{
			var target=(this.isShared()?this.getShared():this);
			
			if (Object.isAssocArray(target.BTL))
			{
				var	changeset	=[];
				target.getDirty().each
				(
					function(model)
					{
						var index=changeset.push(model.getRecord())-1;
						// changeset[index]=target.BTL.bindType(changeset[index],model.$reflect('name').toLowerCase());
					}.bind(target)
				);
				target.BTL.startQueue();
				
				if (changeset.length && Object.isFunction(target.BTL_SET))
				{
					target.BTL_SET(changeset);
				}
				if (Object.isUndefined(query) || Object.isNull(query))
				{
					query=target.BTL_GET_QUERY;
				}
				target.BTL_GET
				(
					data,
					query,
					function(response)
					{
						var records=response.data;
						target.records=target.newRecord(records);
						this.records	=target.records;
						for (var i=0,j=target.records.length; i<j; i++)
						{
							target.bindChangeEvent(target.records[i]);
							target.bindRemoveEvent(target.records[i]);
						}
						target.fireEvent('onChange',target,records);
						target.fireEvent('onSync',target,records);
						if (Object.isFunction(callback))
						{
							callback(this);
						}
					}.bind(this)
				);
				target.BTL.executeQueue();
			}
			else if (target.proxy && Object.isFunction(target.proxy.sync))
			{
				var changeset=[];
				target.getDirty().each
				(
					function(model)
					{
						changeset.push(model.getRecord());
					}
				);
				target.proxy.sync
				(
					{
						data:		changeset,
						onSuccess:	function(response)
						{
							target.records=target.newRecord(response.data);
							this.records	=target.records;
							for (var i=0,j=target.records.length; i<j; i++)
							{
								target.bindChangeEvent(target.records[i]);
								target.bindRemoveEvent(target.records[i]);
							}
							target.fireEvent('onChange',target,response);
							target.fireEvent('onSync',target,response);
						}.bind(target),
						onFailure: function(response)
						{
							target.fireEvent('onSyncFailed',target,response);
						}.bind(this)
					}
				);
			}
			else
			{
				throw new Error('The store "'+target.$reflect('namespace')+'.'+target.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached.');
			}
		},
		/**
		 * Flags all records in the store as being dirty. 
		 * @return {strappy.data.MultiModelStore} this
		 */
		flagAllDirty: function()
		{
			this.each
			(
				function(record)
				{
					record.flagDirty();
				}
			);
		},
		/**
		 * Flags all records in the store as being clean. 
		 * @return {strappy.data.MultiModelStore} this
		 */
		flagAllClean: function()
		{
			this.each
			(
				function(record)
				{
					record.flagClean();
				}
			);
		},
		isDirty: function()
		{
			var target=(this.isShared()?this.getShared():this);
			return Boolean(target.getDirty().length);
		},
		/**
		 * Returns all the attached models which are dirty (have been modified).
		 * 
		 * @return {Array} An array of dirty records.
		 */
		getDirty: function()
		{
			var	target	=(this.isShared()?this.getShared():this),
				dirty	=[];
			target.records.each
			(
				function(model)
				{
					if (model.isDirty())
					{
						dirty.push(model);
					}
				}
			);
			return dirty;
		},
		/**
		 * 
		 * 
		 * @inheritdoc
		 */
		configureBTL: function(config)
		{
			if (!Object.isAssocArray(config.handler))
			{
				throw new Error('Invalid BTL handler assigned with MultiModelStore.configureBTL().');
			}
			if (!Object.isFunction(config.get))
			{
				throw new Error('Invalid getter assigned with MultiModelStore.configureBTL().');
			}
			if (!Object.isFunction(config.set))
			{
				throw new Error('Invalid setter assigned with MultiModelStore.configureBTL().');
			}
			this.BTL	=config.handler;
			this.BTL_GET=config.get;
			this.BTL_SET=config.set;
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/Transaction", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.Transaction
 * 
 * Model Transaction Utility.
 * 
 * 
 * Example:
	var store			=this.getStore('File'),
		model1			=store.getById(112),
		model2			=store.getById(119),
		transaction		=new strappy.data.Transaction(false),
		clonedModel1	=transaction.attachModel(model1),
		clonedModel2	=transaction.attachModel(model2);

	clonedModel1.set('name','Foo');
	clonedModel2.set('name','Bar');

	transaction.execute
	(
		{
			onSuccess:	function()
			{
				//Don't actually ever unlock like this - this is for example only!!!
				model1.lock(strappy.mvc.Model.LOCK_NONE);
				model2.lock(strappy.mvc.Model.LOCK_NONE);
				console.debug(model1.get('name'),model2.get('name'));
				transaction.commit();
				console.debug(model1.get('name'),model2.get('name'));
				console.debug('Transaction success!');
			}.bind(this),
			onFailure: function()
			{
				transaction.rollback();
				console.debug('Transaction failure!');
			}
		}
	);
 * <br>
 * With Memory Proxy:
	var store			=this.getStore('File'),
		model1			=store.getById(112),
		model2			=store.getById(119),
		transaction		=new strappy.data.Transaction(false),
		clonedModel1	=transaction.attachModel(model1),
		clonedModel2	=transaction.attachModel(model2);

	clonedModel1.set('name','Foo');
	clonedModel2.set('name','Bar');
	
	//Don't actually ever unlock like this - this is for example only!!!
	model1.lock(strappy.mvc.Model.LOCK_NONE);
	model2.lock(strappy.mvc.Model.LOCK_NONE);
	console.debug(model1.get('name'),model2.get('name'));
	transaction.commit();
	console.debug(model1.get('name'),model2.get('name'));
 * 
 * @uses strappy.data.Queue
 * @uses strappy.mvc.Model
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.data',
		$name:			'Transaction'
	}
)
(
	{
		/**
		 * @property STATE_INIT The Transaction has been initalized but not started.
		 * @static
		 */
		STATE_INIT:			0,
		/**
		 * @property STATE_STARTED The transaction has started.
		 * @static
		 */
		STATE_STARTED:		1,
		/**
		 * @property STATE_COMITTED The transaction has been comitted.
		 * @static
		 */
		STATE_COMITTED:		2,
		/**
		 * @property STATE_COMPLETE The transaction has been comitted.
		 * @static
		 */
		STATE_COMPLETE:		4,
		/**
		 * @property STATE_SUCCESS The transaction was successful.
		 * @static
		 */
		STATE_SUCCESS:		8,
		/**
		 * @property STATE_FAILED The transaction failed.
		 * @static
		 */
		STATE_FAILED:		16,
		/**
		 * @property STATE_ROLLEDBACK The transaction failed.
		 * @static
		 */
		STATE_ROLLEDBACK:	32
		
	},
	{
		models:		[],
		queue:		false,
		state:		0,
		lockState:	'full',
		/**
		 * @constructor
		 * 
		 * Sets up the transaction object, enabling or disabling queueing.
		 * 
		 * @param {Boolean} queue True if queueing is enabled.
		 * @return {strappy.data.Transaction}
		 */
		init: function(queue)
		{
			if (queue!==false)
			{
				this.queue=new strappy.data.Queue();
			}
		},
		/**
		 * Attaches a model to the transaction. This method will return a cloned instance
		 * of the model. All changes to the cloned instance will be reflected on the original
		 * model once the transaction has been comitted.
		 * 
		 * @param {strappy.mvc.Model} model The model to attach to the transaction.
		 * @return {strappy.data.Transaction} A clone of the original model.
		 */
		attachModel: function(model)
		{
			if (Object.isDefined(model)
			&& Object.isFunction(model.$reflect))
//			&& (model.$reflect('extends')==strappy.mvc.Model || model.$reflect('extends')==strappy.mvc.DynamicModel))
			{
				/**
				 * If the model has an attached store, inform it that
				 * this model has been attached to a transaction.
				 */
				var store=model.getStore();
				if (store)
				{
					store.informModelIsInTransaction(model,this);
				}
				model.lock(this.lockState);
				var clone=model.clone();
				model.attachPhantom(clone);
				this.models.push(model);
				
				if (this.queue)
				{
					this.queue.attachProxy(model.getStore().getProxy());
				}
				return clone;
			}
			else
			{
				throw new Error('Transactions can only be used with Models.');
			}
		},
		/**
		 * Starts the transaction process. Automatically calls {@see strappy.Transaction#fullLock}.
		 * @return {strappy.data.Transaction} this
		 */
		start: function()
		{
			this.state|=strappy.data.Transaction.STATE_STARTED;
			this.fullLock();
			return this;
		},
		/**
		 * Executes the transaction.
		 * 
		 * @param {Object} config A config object.
		 * @param {Function} config.onSuccess Called when the transaction is successful.
		 * @param {Function} config.onFailure Called when the transaction has failed.
		 * @return {strappy.data.Transaction} this
		 */
		execute: function(config)
		{
			var models=
			{
				total:	this.models.length,
				done:	0,
				fails:	0
			};
			$JSKK.when(models,{object:'done',value:models.total}).isEqualTo
			(
				function()
				{
					if (models.fails===0)
					{
						if (Object.isFunction(config.onSuccess))
						{
							config.onSuccess();
						}
					}
					else
					{
						if (Object.isFunction(config.onFailure))
						{
							config.onFailure();
						}
					}
				}.bind(this)
			);
			this.models.each
			(
				function(model)
				{
					//Fetch the the phantom model.
					var	phantom=model.getPhantom();
					
					//Check if anything was changed.
					if (phantom.isDirty())
					{
						/* The phantom model was changed, so submit this to the
						 * server if the original model has an associated store & proxy.
						 */
						if (model.getStore())
						{
							phantom	.bindStore(model.getStore())
									.sync
									(
										{
											onSuccess: function()
											{
												models.done++;
											},
											onFailure: function()
											{
												models.done++;
												models.fails++;
											}
										}
									)
									.unbindStore();
						}
					}
				}
			);
			if (this.queue)
			{
				this.queue.execute();
			}
			return this;
		},
		/**
		 * Commits the transaction.
		 * 
		 * All changes made to any of the attached model's clones will
		 * be reflected upon the original models.
		 * 
		 * @return {strappy.data.Transaction} this
		 */
		commit: function()
		{
			this.state|=strappy.data.Transaction.STATE_COMITTED;
			this.models.each
			(
				function(model,index)
				{
					model.lock(strappy.mvc.Model.LOCK_NONE);
					model.set(model.getPhantom().getRecord());
					model.destroyPhantom();
					delete this.models[index];
				}.bind(this)
			);
			delete this.models;
			return this;
		},
		/**
		 * Rolls back the transaction, effectively trashing all
		 * changes made to all attached models and destroying the
		 * transaction object.
		 * 
		 * @return {strappy.data.Transaction} this
		 */
		rollback: function()
		{
			this.state|=strappy.data.Transaction.STATE_ROLLEDBACK;
			
			this.models.each
			(
				function(model,index)
				{
					model.destroyPhantom();
					delete this.models[index];
				}.bind(this)
			);
			delete this.models;
			return this;
		},
		/**
		 * Applies a full lock to the associated models.
		 * 
		 * @return {strappy.data.Transaction} this
		 */
		fullLock: function()
		{
			this.lockState='full';
			this.models.each
			(
				function(model)
				{
					model.lock('full');
				}
			);
			return this;
		},
		/**
		 * Applies a read-only lock to the associated models.
		 * 
		 * @return {strappy.data.Transaction} this
		 */
		readOnly: function()
		{
			this.lockState='readonly';
			this.models.each
			(
				function(model)
				{
					model.lock('readonly');
				}
			);
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/Queue", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.Queue
 * 
 * This class is used by other data communication classes
 * to provide a means to queue up requests via proxies.
 * 
 * @uses strappy.mvc.Model
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.data',
		$name:			'Queue'
	}
)
(
	{},
	{
		/**
		 * @property proxies Contains a list of attached proxies.
		 * @private
		 */
		proxies:		[],
		/**
		 * @property requests Contains a list of captured requests.
		 * @private
		 */
		requests:		{},
		/**
		 * @property executing A flag to determin weather or not the queued items are being run or not.
		 * @private
		 */
		executing:		false,
		/**
		 * @property nextSequence Incremental sequencing number.
		 * @private
		 */
		nextSequence:	1,
		/**
		 * This method attaches a proxy to the queue object. Any request
		 * the proxy makes will be intercepted and stored in the request queue
		 * until the {@link strappy.data.Queue.execute() execute} method is called.
		 * @param {strappy.data.proxy.AbstractProxy} proxy 
		 * @return {strappy.data.Queue} this
		 */
		attachProxy: function(proxy)
		{
			if (!this.proxies.inArray(proxy))
			{
				this.proxies.push(proxy);
				proxy.observe
				(
					'onBeforeRequest',
					function(proxy,request)
					{
						if (this.executing)return true;
//						console.debug('onBeforeRequest',request);
						if (Object.isDefined(request.url))
						{
							if (Object.isUndefined(this.requests[request.url]))
							{
								this.requests[request.url]=[];
							}
							request.sequence=this.nextSequence++;
							request.proxy	=proxy;
							if (!Object.isDefined(request.data))
							{
								request.data=null;
							}
							this.requests[request.url].push(request);
							delete request.url;
						}
						return false;
					}.bind(this)
				);
//				console.debug('PROXY',proxy);
			}
			return this;
		},
		/**
		 * Executes the queue, running all queued requests as a single batched request.
		 * 
		 * @return {strappy.data.Queue} this
		 */
		execute: function()
		{
			this.executing	=true;
			var	url			=null,
				requests	=[];
			for (url in this.requests)
			{
				for (var i=0,j=this.requests[url].length; i<j; i++)
				{
					if (Object.isUndefined(this.requests[url][i].data.timestamp))
					{
						this.requests[url][i].data.timestamp=Date.parse(new Date());
					}
					this.requests[url][i].data.sequence=this.requests[url][i].sequence;
					
					requests.push
					(
						this.requests[url][i].data
					);
				}
				
				this.requests[url][0].proxy.raw
				(
					{
						data:		requests,
						onSuccess:	this.__onDone.bind(this),
						onFailure:	this.__onDone.bind(this),
						onComplete:	this.__onDone.bind(this)
					}
				);
			}
			return this;
		},
		/**
		 * 
		 * @private 
		 */
		__onDone: function(response)
		{
			var request=null;
			for (var i=0,j=response.length; i<j; i++)
			{
				request=this.getRequest(response[i].sequence);
				if (response[i].success)
				{
					if (Object.isFunction(request.onComplete))	request.onComplete(response[i]);
					if (Object.isFunction(request.onSuccess))	request.onSuccess(response[i]);
				}
				else
				{
					if (Object.isFunction(request.onComplete))	request.onComplete(response[i]);
					if (Object.isFunction(request.onFailure))	request.onFailure(response[i]);
				}
			}
		},
		/**
		 * Pushes a raw request object into the queue.
		 * 
		 * @param {Object} request A raw request object. Note that this must
		 * also include a "url" property.
		 * 
		 * @return {strappy.data.Queue} this
		 */
		push: function(request)
		{
			this.requests[request.url].push(request);
			delete request.url;
			return this;
		},
		/**
		 * Fetches a request based on its assigned sequence number.
		 * 
		 * @param {Number} sequence The sequence number for the request.
		 * @return {Mixed} The request object if found, or null.
		 */
		getRequest: function(sequence)
		{
			for (var url in this.requests)
			{
				for (var i=0,j=this.requests[url].length; i<j; i++)
				{
					if (this.requests[url][i].sequence==sequence)
					{
						return this.requests[url][i];
					}
				}
			}
			return null;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/data/stateful/Store", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.data.stateful.Store
 * 
 * 
 * 
 * @mixins strappy.trait.ComponentConnector
 * @mixins strappy.trait.signal.Send
 * @abstract
 * 
 * @uses strappy.trait.ComponentConnector
 * @uses strappy.trait.signal.Send
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.stateful',
		$name:		'Store',
		$extends:	'strappy.data.SingleModelStore'
	}
)
(
	{
		ACCESS_PRIVATE:	'private',
		ACCESS_PUBLIC:	'public',
		
		LOCK_NONE:		'none',
		LOCK_READONLY:	'readonly',
		LOCK_FULL:		'full'
	},
	{
		events:
		{
			onBeforeChange:	true,
			onChange:		true,
			onReady:		true
		},
		/**
		 * @property {Boolean} ready A flag indicating that the component's state is ready.
		 * @private
		 */
		ready:		false,
		/**
		 * @property {Array} readyViews A container filled with views which a controller has
		 * flagged as ready.
		 * 
		 * See {@link strappy.data.stateful.Store#setViewReady} and
		 * {@link strappy.data.stateful.Store#getReadyViews} for more information and
		 * examples of how to use this.
		 * @private
		 */
		readyViews:	[],
		/**
		 * @property {Object} stateMap A reference object for mapped private and public state properties.
		 * @private
		 */
		stateMap:{},
		/**
		 * 
		 * @property {String} lockState This property will block behaviours on this store depending on its state.
		 * @private
		 */
		lockState:	'none',
		
		keys:		[],
		init: function()
		{
			//Set the model.
			this.model=strappy.mvc.stateful.Model;
			
			this.init.$parent();
			this.mapStateProperties();
		},
		mapStateProperties: function()
		{
			var	self=this.$reflect('self'),
				item=null;
			
			for (item in this.record.get(self.ACCESS_PRIVATE))
			{
				this.stateMap[item]=self.ACCESS_PRIVATE;
			}
			for (item in this.record.get(self.ACCESS_PUBLIC))
			{
				this.stateMap[item]=self.ACCESS_PUBLIC;
			}
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
		 * Sets a state property with a new value.
		 * 
		 * Sends signal:
		 * 
		 * * {@link strappy.Signal.STATEFULSTORE_DONE_CHANGE}
		 * 
		 * @param {String} key The property to set.
		 * @param {Mixed} value The new value.
		 * @chainable
		 */
		set: function()
		{
			if (this.lockState==strappy.data.stateful.Store.LOCK_NONE)
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
					mapping=this.stateMap[key];
					//Ignore if the value is the same.
					if (this.record.get(mapping)[key]==keyVals[key])continue;
					//Keep going otherwise...
					if (this.fireEvent('onBeforeChange',this,key,keyVals[key])!==false)
					{
						this.record.get(mapping)[key]=keyVals[key];
						if (mapping==this.$reflect('self').ACCESS_PUBLIC)
						{
							updateState		=true;
							newState[key]	=keyVals[key];
						}
						this.fireEvent('onChange',this,key,keyVals[key]);
					}
				}
				if (updateState)
				{
					this.getStateMgr().updateState(newState,true);
				}
			}
			else
			{
				throw new Error('Store "'+this.$reflect('name')+'" is in lock state "'+this.lockState+'" and so cannot be modified.');
			}
			return this;
		},
		/**
		 * This method will set the ready state of the component.
		 * 
		 * @param {Boolean} ready The ready state.
		 * @chainable
		 */
		setReady: function(ready)
		{
			this.ready=ready;
			if (ready)
			{
				var globalState=this.getStateMgr().getState();
				for (var globalItem in globalState)
				{
					for (var localItem in this.state)
					{
						if (localItem==globalItem)
						{
							this.state[localItem]=globalState[globalItem];
							break;
						}
					}
				}
				this.fireEvent('onReady',this);
			}
			// this.fireEvent('onChange',this);
			return this;
		},
		/**
		 * Checks if the component's ready state is true.
		 * @return {Boolean} True if the component state is ready.
		 */
		isReady: function()
		{
			return this.ready;
		},
		/**
		 * Gets a state property from the model's store.
		 * @param {String} key The state property to fetch.
		 * @return {Mixed} The value of the property.
		 */
		get: function(key)
		{
			return this.get.$parent(this.stateMap[key])[key];
		},
		/**
		 * Stores the view name in a private store for ready views.
		 * 
		 * Example:
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.controller',
			$name:		'State',
			$extends:	strappy.mvc.stateful.Controller
		}
	)
	(
		{},
		{
			onViewReady: function(signal)
			{
				this.setViewReadyState(signal.getBody().id);
			}
		}
	);
		 * @param {String} view The name of the view.
		 * @chainable
		 */
		setViewReady: function(view)
		{
			this.readyViews.push(view);
			return this;
		},
		/**
		 * Returns an array of ready views.
		 * 
		 * Example:
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.controller',
			$name:		'State',
			$extends:	strappy.mvc.stateful.Controller
		}
	)
	(
		{},
		{
			onViewReady: function(signal)
			{
				this.setViewReadyState(signal.getBody().id);
				var readyViews=this.getReadyViews();
				if (readyViews.inArray('Application.component.myComponent.view.Default')
				&& readyViews.inArray('Application.component.myComponent.view.OtherView'))
				{
					//All views are ready. Flag the component state as ready.
					this.setReady();
				}
			}
		}
	);
		 * @return {Array} The ready views.
		 */
		getReadyViews: function()
		{
			return this.readyViews;
		},
		/**
		 * Locks the model based on the type of lock given to this method.
		 * @param {String} lockType The type of lock. Valid lock types are:
		 * * {@link strappy.data.stateful.Store#LOCK_NONE}
		 * * {@link strappy.data.stateful.Store#LOCK_READONLY}
		 * * {@link strappy.data.stateful.Store#LOCK_FULL}
		 * 
		 * @chainable
		 */
		lock: function(lockType)
		{
			if (['none','readonly','full'].inArray(lockType))
			{
				this.lockState=lockType;
			}
			else
			{
				throw new Error('"'+lockType+'" is an invalid lock type. Valid locks are "none", "readonly" and "full".');
			}
			return this;
		},
		/**
		 * Resets the state properties to their original values.
		 * 
		 * @chainable
		 */
		reset: function()
		{
			this.set(this.data['private']);
			this.set(this.data['public']);
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/SharedState", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.SharedState
 * 
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'SharedState',
		$extends:	'strappy.data.stateful.Store'
	}
)
(
	{},
	{
		// init: function()
		// {
		// 	this.init.$parent();
			
			
			
		// }
		
		set: function()
		{
			if (this.lockState==strappy.data.stateful.Store.LOCK_NONE)
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
					if (Object.isUndefined(this.record.fields[strappy.data.stateful.Store.ACCESS_PRIVATE][key]))
					{
						this.record.fields[strappy.data.stateful.Store.ACCESS_PRIVATE][key]=null;
					}
					if (this.fireEvent('onBeforeChange',this,key,keyVals[key])!==false)
					{
						this.record.record[strappy.data.stateful.Store.ACCESS_PRIVATE][key]=keyVals[key];
						this.fireEvent('onChange',this,key,keyVals[key]);
					}
				}
			}
			else
			{
				throw new Error('Store "'+this.$reflect('name')+'" is in lock state "'+this.lockState+'" and so cannot be modified.');
			}
		},
		get: function(key)
		{
			return this.record.record[strappy.data.stateful.Store.ACCESS_PRIVATE][key];
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/StateMgr", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.StateMgr
 * 
 * This is the frameworks state management handler. It helps to manage
 * the state of all components.
 * 
 * Note that this class doesn't actually directly change the state of any
 * component. That job is left up to {@link strappy.mvc.StatefulController state controllers}.
 * 
 * This class will capture, monitor and update state properties which are
 * recorded in the URL of the current page. This URL is a hashed url and
 * consists of key-value properties, separated by ampersands (&amp;).
 * 
 * Note that this class is a singleton and should never be instantiated directly.
 * 
 * @mixin strappy.trait.signal.Send
 * @uses strappy.trait.signal.Send
 * @singleton
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy',
		$name:			'StateMgr',
		$uses:
		[
			'strappy.trait.signal.Send'
		]
	}
)
(
	{},
	{
		/**
		 * @private state This object contains the current stored state,
		 * as visualized by the hash URL.
		 */
		state:			{},
		/**
		 * @private state A string representation of the state object.
		 */
		stateString:	'',
		/**
		 * @property radioTower A reference to the {@link strappy.RadioTower Radio Tower}. 
		 * @private
		 */
		radioTower:		null,
		
		sharedState:	null,
		
		/**
		 * @property eventSupported A flag which is set to true or false depending on weather
		 * or not the browser supports the "hashchange" event.
		 * 
		 * See {@link strappy.RadioTower Radio Tower}.
		 * @private
		 */
		eventSupported:	false,
		/**
		 * @property supressNext
		 * @private
		 */
		supressNext:	false,
		/**
		 * @constructor
		 * Sets up the state manager by linking it to the {@link strappy.RadioTower Radio Tower},
		 * testing for "hashchange" event support, and creating bindings
		 * for the hash changes to be captured.
		 * 
		 * @return {strappy.StateMgr}
		 */
		init: function()
		{
			this.radioTower		=strappy.$radioTower;
			this.sharedState	=new strappy.SharedState();
			
			$(window).bind('hashchange',this.onHashChangeTest.bind(this));
			
			this.onHashChange(null,true);
			
			var OLD_HASH=window.location.hash;
			window.location.hash='welcome';
			
			(function()
			{
				//Restore hash.
				window.location.hash=OLD_HASH;
				//Bind the hash change event.
				this.bindHashEvent.defer(200,this);
			}.bind(this)).defer(100);
		},
		/**
		 * This is an internal callback method for testing if the hash
		 * event is supported in the current browser.
		 * @private
		 * @return {void}
		 */
		onHashChangeTest: function()
		{
			this.eventSupported=true;
		},
		/**
		 * This method will bind to the hash change event natively,
		 * or if the browser does not support it, then it will bind to
		 * hand over the control of monitoring the hash changes to
		 * {@link strappy.StateMgr#monitorHashChange}.
		 * @private
		 * @return {void}
		 */
		bindHashEvent: function()
		{
			if (this.eventSupported)
			{
				$(window).bind('hashchange',this.onHashChange.bind(this));
			}
			else
			{
				this.monitorHashChange();
			}
		},
		/**
		 * This method is invoked into a loop whenever the browser fails the
		 * "hashchange" event.
		 * 
		 * It is designed to poll the hash address for changes and call
		 * {@link strappy.StateMgr#onHashChange} if a change is detected.
		 * 
		 * @private
		 * @return {void}
		 */
		monitorHashChange: function()
		{
			$JSKK.when
			(
				function()
				{
					return (window.location.hash.replace('#','')!=this.stateString);
				}.bind(this)
			).isTrue
			(
				function()
				{
					this.onHashChange();
					this.monitorHashChange();
				}.bind(this)
			);
		},
		/**
		 * This method will be invoked automatically whenever a change in the
		 * hash address is detected. It will fire the {@link strappy.Signal#STATE_CHANGE State Change}
		 * signal and provide the new state in the body of the signal.
		 * 
		 * Note that the signal can be supressed by passing true to the supressSignal param.
		 * 
		 * @param {Object} event The event object. Is null if the browser
		 * does not support the "hashchange" event.
		 * @param {Boolean} supressSignal Blocks the {@link strappy.Signal#STATE_CHANGE State Change}
		 * signal from being issued.
		 * 
		 * @private
		 * @return {void}
		 */
		onHashChange: function(event,supressSignal)
		{
			if (this.supressNext)
			{
				supressSignal	=true;
				this.supressNext=false;
			}
			this.stateString=window.location.hash.replace('#','');
			if (!Object.isEmpty(this.stateString))
			{
				this.state=this.parseStateString(this.stateString);
			}
			else
			{
				this.state={};
			}
			if (!supressSignal)
			{
				this.sendSignal(strappy.Signal.STATE_CHANGE,'state',{},this.state);
				// //At this point we update the state again so that we can deal with
				// //removing any null values.
				// for (var node in this.state)
				// {
				// 	if (Object.isNull(this.state[node]))
				// 	{
				// 		delete this.state[node];
				// 	}
				// }
				// window.location.hash=this.parseStateObject(this.state);
			}
		},
		/**
		 * This is a method which {@link strappy.View views} can use
		 * to register a dom element's "click" event with a state URL.
		 * 
		 * This means whenever the bound element is clicked, the state will
		 * be updated with the values that were bound to the event.
		 *  
		 * Here is an example:
		 * 
		 * The HTML:
	<div class="navContainer">
		<ul>
			<li class="active"><a id="container-home" href="javascript:{};">Home</a></li>
			<li><a id="container-news" href="javascript:{};">News</a></li>
			<li><a id="container-about" href="javascript:{};">About</a></li>
		</ul>
	</div>
	<div id="outerContainer">
		<div id="section-home" class="active">Home Section</div>
		<div id="section-news">News Section</div>
		<div id="section-about">About Section</div>
	</div>
		 * 
		 * The Javascript:
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.view',
			$name:		'Default',
			$extends:	strappy.mvc.View
		}
	)
	(
		{},
		{
			onReady: function()
			{
				this.bindStatefulLinks
				(
					['[href="#container-home"]',	'section=home'],
					['[href="#container-news"]',	'section=news'],
					['[href="#container-about"]',	'section=about']
				);
			}
		}
	);
		 * In the above example, the "a" tags would be bound so that the
		 * "section" state property changed whenever they were clicked.
		 * 
		 * The state manager would then send the {@link strappy.Signal#STATE_CHANGE State Change}
		 * signal and a {@link strappy.StatefulController state controller}
		 * could take this change and apply it to it's associated 
		 * {@link strappy.StatefulModel state model}. This would then
		 * invoke a method bound by the views {@link strappy.View#bindStateEvents}
		 * method which could switch the visible section within the outerContainer div
		 * and update which li was "active".
		 * 
		 * @param {jQuery}
		 * @param {String} A string representing the state as key-value properties,
		 * separated by ampersands (&amp;).
		 * @return {void}
		 */
		registerStateChanger: function(el,state)
		{
			state=this.parseStateString(state);
			el.click(this.updateState.bind(this,state,false));
		},
		/**
		 * This is a private method which wraps state change events bound with
		 * {@link strappy.StateMgr#registerStateChanger}. It parses the
		 * new state and applies it to the hash address.
		 * @param {Object} A key valued state object.
		 * @return {void}
		 */
		updateState: function(state,supressed,event)
		{
			var nullProperties=[];
			for (var node in state)
			{
				if (Object.isNull(state[node]))
				{
					nullProperties.push(node);
				}
				this.state[node]=state[node];
			}
			if (nullProperties.length)
			{
				var state={};
				for (var i=0,j=nullProperties.length; i<j; i++)
				{
					state[nullProperties[i]]=null;
				}
				this.sendSignal(strappy.Signal.STATE_CHANGE,'state',{},state);
			}
			// this.supressNext=supressed;
			window.location.hash=this.parseStateObject(this.state);
		},
		/**
		 * Fetches the current state.
		 * 
		 * @return {Object} The current state object.
		 */
		getState: function()
		{
			return this.state;
		},
		/**
		 * Parses a hash address string and converts it to an object.
		 * @private
		 * @param {String} A string representing the state as key-value properties,
		 * @return {Object} The new state object.
		 */
		parseStateString: function(state)
		{
			var	states		=state.split('&'),
				stateParts	=null,
				stateObj	={};
			for (var i=0,j=states.length; i<j; i++)
			{
				stateParts=states[i].split('=');
				if (['true','false','null'].inArray(stateParts[1]))
				{
					switch (stateParts[1])
					{
						case 'true':	stateParts[1]=true;		break;
						case 'false':	stateParts[1]=false;	break;
						case 'null':	stateParts[1]=null;		break;
					}
				}
				stateObj[stateParts[0]]=stateParts[1];
			}
			return stateObj;
		},
		/**
		 * Parses a state object and coverts it to a hash address string.
		 * @private
		 * @param {Object} A key valued state object.
		 * @return {String} The new state string.
		 */
		parseStateObject: function(state)
		{
			var stateString=[];
			for (var node in this.state)
			{
				if (!Object.isNull(this.state[node]))
				{
					stateString.push(node+'='+this.state[node]);
				}
			}
			return stateString.join('&');
		},
		/**
		 * Fetches the Radio Tower singleton.
		 * @return {strappy.RadioTower} The Radio Tower.
		 */
		getRadioTower: function()
		{
			return this.radioTower;
		},
		getSharedState: function()
		{
			return this.sharedState;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/mvc/Model", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.mvc.Model
 * 
 * 
 * @abstract
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc',
		$name:		'Model',
		$uses:
		[
			'$JSKK.trait.Observable'
		]
	}
)
(
	{
		LOCK_NONE:		'none',
		LOCK_READONLY:	'readonly',
		LOCK_FULL:		'full'
	},
	{
		events:
		{
			onSync:			true,
			onFailedSync:	true,
			onChange:		true,
			onRemove:		true,
			onLockChange:	true
		},
		_storeChangeEvent:	{},
		_storeRemoveEvent:	{},
		/**
		 * @property {Boolean} dirty A flag to show weather or not the model instance has been modified
		 * since it was last synced.
		 * @private
		 */
		dirty:		false,
		/**
		 * @property {Mixed} phantom False if no cloned instance is attached. Otherwise a cloned instance of
		 * this model.
		 * @private
		 */
		phantom:	false,
		/**
		 * @property {Boolean} _clone A flag to show weather or not the model instance has been modified
		 * since it was last synced.
		 * @private
		 */
		_clone:		false,
		/**
		 * @property {String} idField The field that is used as the ID for the model instance.
		 */
		idField:	'id',
		/**
		 * @property {Array} field A list of fields and their default values.
		 */
		fields:		[],
		/**
		 * @property {Object} record The raw record for the model instance.
		 * @private
		 */
		record:		{},
		/**
		 * @property {strappy.data.AbstractStore} store The store that the model instance is attached to.
		 * @private
		 */
		store:		null,
		/**
		 * 
		 * @property {String} lockState This property will block behaviours on this store depending on its state.
		 * @private
		 */
		lockState:	'none',
		/**
		 * @property {Boolean} eventsEnabled True to allow events and false to block them from being fired.
		 * @private
		 */
		eventsEnabled: true,
		/**
		 * 
		 */
		init: function(record)
		{
			if (Object.isDefined(record) && !Object.isNull(record))
			{
				this.record=Object.clone(this.fields);
				for (var field in this.fields)
				{
					if (Object.isDefined(record[field]))
					{
						this.record[field]=Object.clone(record[field]);
					}
				}
			}
			else
			{
				for (var field in this.fields)
				{
					this.record[field]=Object.clone(this.fields[field]);
				}
			}
		},
		/**
		 * 
		 */
		bindStore: function(store)
		{
			this.store=store;
			return this;
		},
		/**
		 * 
		 */
		unbindStore: function()
		{
			this.store=null;
			return this;
		},
		/**
		 *
		 */
		detachFromStore: function()
		{
			this.store.remove(this);
			return this;
		},
		/**
		 * 
		 */
		getStore: function()
		{
			return this.store;
		},
		BTLSync: function(callback)
		{
			var	store	=this.getStore(),
				target	=(store.isShared()?store.getShared():store);
			target.BTL.startQueue();
			if (this.isDirty())
			{
				this.flagClean();
				target.BTL_SET
				(
					this.getRecord(),
					null,
					function(response)
					{
						var record=response.data;
						this.lock(strappy.mvc.Model.LOCK_NONE,true);
						this.set(record);
						if (this.eventsEnabled)
						{
							this.fireEvent('onSync',this,record);
							this.fireEvent('onChange',this,record);
						}
						if (Object.isFunction(callback))
						{
							callback(this);
						}
					}.bind(this)
				);
			}
			else
			{
				var query={};
				query[this.idField]=this.getId();
				this.flagClean();
				target.BTL_GET
				(
					null,
					query,
					function(response)
					{
						var record=response.data;
						this.lock(strappy.mvc.Model.LOCK_NONE,true);
						this.set(record[0]);
						if (this.eventsEnabled)
						{
							this.fireEvent('onSync',this,record);
							this.fireEvent('onChange',this,record);
						}
						if (Object.isFunction(callback))
						{
							callback(this);
						}
					}.bind(this)
				);
			}
			target.BTL.executeQueue();
		},
		/**
		 * This method will attach any changes to a
		 * proxy sync request.
		 * The expected response is a replacement record. 
		 * 
		 * 
		 * TODO: Detail this.
		 * 
		 * @return {strappy.mvc.Model} this
		 */
		sync: function(config)
		{
			var proxy=this.getStore().getProxy();
			if (Object.isFunction(proxy.sync))
			{
				proxy.sync
				(
					{
						data:		(this.isDirty()?this.record:{}),
						onSuccess:	function(response)
						{
							if (Object.isDefined(response.data))
							{
								this.record=response.data;
							}
							else
							{
								//?
							}
							
							
							if (!this.isClone() && this.eventsEnabled)
							{
								this.fireEvent('onSync',this);
								this.fireEvent('onChange',this);
							}
							else
							{
								if (Object.isFunction(config.onSuccess))
								{
									config.onSuccess();
								}
							}
						}.bind(this),
						onFailure: function()
						{
							if (!this.isClone() && this.eventsEnabled)
							{
								this.fireEvent('onFailedSync',this);
							}
							else
							{
								if (Object.isFunction(config.onFailure))
								{
									config.onFailure();
								}
							}
						}.bind(this)
					}
				);
				this.flagClean();
			}
			else
			{
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" cannot be synced as it does not have a syncable proxy attached to its bound store.');
			}
			return this;
		},
		/**
		 * Fetches a value based on a field name.
		 * 
		 * Note: This method is affected by lock state.
		 * 
		 * @param {Number} index The index.
		 * @return {Mixed} The record.
		 */
        get: function(key)
		{
			if (key.indexOf('.')===-1)
			{
				return this.record[key];
			}
			else
			{
				keyParts=key.split('.');
				value=this.record;
				for (var i=0,j=keyParts.length;  i<j; i++)
				{
					value=value[keyParts[i]];
					if (Object.isUndefined(value))
					{
						value=null;
						break;
					}
				}
				return value;
			}
			
			
			
			// if (this.lockState==strappy.mvc.Model.LOCK_NONE
			// || this.lockState==strappy.mvc.Model.LOCK_READONLY
			// || this.isClone())
			// {
			// 	return this.record[key];
			// }
			// else
			// {
			// 	console.trace();
			// 	throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" is in a lock state that prevents reading.');
			// }
		},
		/**
		 * Gets the full record object of this model.
		 * 
		 * Note: This method is affected by lock state.
		 * 
		 * @return {Object} The record object.
		 */
		getRecord: function()
		{
			if (this.lockState==strappy.mvc.Model.LOCK_NONE
			|| this.lockState==strappy.mvc.Model.LOCK_READONLY
			|| this.isClone())
			{
				return this.record;
			}
			else
			{
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" is in a lock state that prevents reading.');
			}
		},
		/**
		 * Gets the ID of the model instance.
		 * 
		 * @return {Number} The id of the model instance.
		 */
		getId: function()
		{
			if (Object.isString(this.idField))
			{
				return this.get(this.idField);
			}
			return null;
		},
		/**
		 * Sets a record at a given index in the store.
		 * @param {Mixed} field The field OR an object containing key/value
		 * pairs of values to set.
		 * @param {Mixed} value The new value to set. Don't use this if "field" is an object.
		 */
        set: function()
		{
			var	args			=$JSKK.toArray(arguments),
				keyVals			={},
				someValueChanged=false;
			if (Object.isDefined(args[1]))
			{
				keyVals[args.shift()]=args.shift();
			}
			else
			{
				keyVals=args.shift();
			}
			for (var field in keyVals)
			{
				if (field.indexOf('.')===-1)
				{
					if (this.record[field]!==keyVals[field])
					{
						this.record[field]=keyVals[field];
						someValueChanged=true;
					}
				}
				else
				{
					var	fieldParts	=field.split('.'),
						object		=this.record;
					for (var i=0,j=fieldParts.length;  i<j; i++)
					{
						if (Object.isUndefined(object[fieldParts[i]]))
						{
							break;
						}
						if ((i+1)!=j)
						{
							object=object[fieldParts[i]];
						}
					}
					// console.debug('set',object,keyVals[field],field);
					if (object[fieldParts[j-1]]!==keyVals[field])
					{
						object[fieldParts[j-1]]=keyVals[field];
						someValueChanged=true;
					}
				}
			}
			if (someValueChanged)
			{
				this.flagDirty();
			}
			// if (this.lockState==strappy.mvc.Model.LOCK_NONE || this.isClone())
			// {
			// 	var	args		=$JSKK.toArray(arguments),
			// 		keyVals		={};
			// 	if (Object.isDefined(args[1]))
			// 	{
			// 		keyVals[args.shift()]=args.shift();
			// 	}
			// 	else
			// 	{
			// 		keyVals=args.shift();
			// 	}
			// 	for (var field in keyVals)
			// 	{
			// 		this.record[field]=keyVals[field];
			// 	}
			// 	this.flagDirty();
			// }
			// else
			// {
			// 	throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" is in a lock state that prevents any modification.');
			// }
			if (this.lockState==strappy.mvc.Model.LOCK_NONE && !this.isClone() && someValueChanged)
			{
				if (this.eventsEnabled)
				{
					this.fireEvent('onChange',this);
				}
			}
		},
		/**
		 * Flags the model as being changed.
		 * @return {strappy.mvc.Model} this
		 */
		flagDirty: function()
		{
			this.dirty=true;
			return this;
		},
		/**
		 * Flags the model as being unchanged.
		 * @return {strappy.mvc.Model} this
		 */
		flagClean: function()
		{
			this.dirty=false;
			return this;
		},
		/**
		 * Checks to see if any modifications have been made to this model.
		 * @return {Boolean} True if the model has been changed.
		 */
		isDirty: function()
		{
			return this.dirty;
		},
		/**
		 * Checks to see if no modifications have been made to this model.
		 * @return {Boolean} True if the model has not been changed.
		 */
		isClean: function()
		{
			return !this.dirty;
		},
		/**
		 * Locks the model based on the type of lock given to this method.
		 * @param {String} lockType The type of lock. Valid lock types are:<br>
		 * * {@link strappy.mvc.Model#LOCK_NONE}<br>
		 * * {@link strappy.mvc.Model#LOCK_READONLY}<br>
		 * * {@link strappy.mvc.Model#LOCK_FULL}<br>
		 * @param {Boolean} supressEvent Blocks the onLockChange event
		 * from being fired.
		 * 
		 * @return {strappy.data.stateful.Store}
		 */
		lock: function(lockType,supressEvent)
		{
			if (['none','readonly','full'].inArray(lockType))
			{
				this.lockState=lockType;
				if (supressEvent!==true && !this.isClone() && this.eventsEnabled)
				{
					this.fireEvent('onLockChange',this,this.lockState);
				}
			}
			else
			{
				throw new Error('"'+lockType+'" is an invalid lock type. Valid locks are "none", "readonly" and "full".');
			}
			return this;
		},
		/**
		 * Creates a copy of this model.
		 * 
		 * Note: This does not deep copy the model. It will simply
		 * take a snapshot of its record state and initatiate a new
		 * model of the same original with those record values.
		 * This new model isntance will not be flagged as dirty.
		 * 
		 * @return {strappy.mvc.Model} The cloned instance.
		 */
		clone: function()
		{
			var clone=new (this.$reflect('self'))({},this.record);
			clone._clone=true;
			return clone;
		},
		/**
		 * Checks to see if this model instance is a clone.
		 * @return {Boolean} True if the model is a clone.
		 */
		isClone: function()
		{
			return this._clone;
		},
		/**
		 * Attaches a phantom instance of this model.
		 * 
		 * Note: This is usually used with internally by transactions.
		 * 
		 * @return {strappy.mvc.Model} this
		 */
		attachPhantom: function(phantomModel)
		{
			this.phantom=phantomModel;
			return this;
		},
		/**
		 * Checks to see if a phantom record has been attached.
		 * @return {Boolean} True if this model has a phantom record attached.
		 */
		hasPhantom: function()
		{
			return Boolean(this.phantom);
		},
		/**
		 * Fetches the attached phantom record. Throws an error if there is no
		 * phantom record attached.
		 * @return {strappy.mvc.Model} The phantom record.
		 */
		getPhantom: function()
		{
			if (this.hasPhantom())
			{
				return this.phantom;
			}
			else
			{
				throw new Error('The model "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" does not have a phantom model associated with it.');
			}
		},
		/**
		 * Destroys the phantom record attached to this model.
		 * @return {strappy.mvc.Model} this
		 */
		destroyPhantom: function()
		{
			delete this.phantom;
			this.phantom=null;
			return this;
		},
		/**
		 * Enables events to be fired on this model.
		 * @return {strappy.mvc.Model} this
		 */
		enableEvents: function()
		{
			this.eventsEnabled=true;
			return this;
		},
		/**
		 * Disables events to be fired on this model.
		 * @return {strappy.mvc.Model} this
		 */
		disableEvents: function()
		{
			this.eventsEnabled=false;
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/mvc/DynamicModel", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.mvc.Model
 * 
 * 
 * @abstract
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc',
		$name:		'DynamicModel',
		$extends:	'strappy.mvc.Model'
	}
)
(
	{},
	{
		init: function(record)
		{
			if (Object.isDefined(record))
			{
				this.record=Object.clone(this.fields);
				for (var field in record)
				{
					if (Object.isUndefined(this.fields[field]))
					{
						this.fields[field]=null;
					}
					this.record[field]=Object.clone(record[field]);
				}
			}
			else
			{
				for (var field in this.fields)
				{
					
					if (Object.isUndefined(this.fields[field]))
					{
						this.fields[field]=null;
					}
					this.record[field]=Object.clone(this.fields[field]);
				}
			}
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/mvc/ViewCache", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.mvc.ViewCache
 * 
 * This is a private, internally used class.
 * You should not need to use this class directly.
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.mvc',
		$name:			'ViewCache'
	}
)
(
	{
		FETCHING:	'~*~FETCHING~*~'
	},
	{
		cache:	{},
		set: function(ref,value)
		{
			this[String(ref)]=String(value);
			return this;
		},
		get: function(ref)
		{
			return this[String(ref)] || '';
		},
		exists: function(ref)
		{
			return Object.isDefined(this[String(ref)]);
		},
		setFetching: function(ref)
		{
			this[String(ref)]=strappy.mvc.ViewCache.FETCHING;
			return this;
		},
		isFetching: function(ref)
		{
			return (this[String(ref)]===strappy.mvc.ViewCache.FETCHING)
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/mvc/View", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.mvc.View
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * @mixins strappy.trait.ComponentConnector
 * @mixins strappy.trait.signal.Bindable
 * @mixins $JSKK.trait.Observable
 * @abstract
 * 
 * @uses strappy.trait.ComponentConnector
 * @uses strappy.trait.signal.Bindable
 * @uses $JSKK.trait.Observable
 * @uses strappy.mvc.ViewCache
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.mvc',
		$name:			'View',
		$abstract:		true,
		$uses:
		[
			'strappy.trait.ComponentConnector',
			'strappy.trait.signal.Bindable',
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		events:
		{
			onTemplatesLoaded:	true,
			onReady:			true,
			onShow:				true,
			onHide:				true
		},
		_templatesReady:false,
		_ready:			false,
		_stateBindings:	{},
		templates:		{},
		element:		null,
		stateStore:		null,
        // TODO: COMPOSITE PATTERN -> See bottom off this Class
        // children: [],

        /**
        * @constructor
        * 
        * 
        */
		init: function()
		{
			this.fetchTemplateContent
			(
				function()
				{
					this._templatesReady=true;
				}.bind(this)
			);
			this.observe('onStateChange',this.onStateChange.bind(this));
		},
		fetchTemplateContent: function(onComplete)
		{
			var	numTemplates	=0,
				doneTemplates	=0;
			
			for (var template in this.templates)
			{
				numTemplates++;
			}
			
			for (var template in this.templates)
			{
				var requestPath	=(this.$reflect('namespace').replace(/\./g,'/'))+'/html/'+this.templates[template];
				if (!this.getViewCache().exists(requestPath)
				|| this.getViewCache().isFetching(requestPath))
				{
					if (this.getViewCache().isFetching(requestPath))
					{
						$JSKK.when
						(
							function()
							{
								return this.getViewCache().isFetching(requestPath);
							}.bind(this)
						).isFalse
						(
							function(requestPath,template)
							{
								this.templates[template]=this.getViewCache().get(requestPath);
								doneTemplates++;
							}.bind(this,requestPath,template)
						);
					}
					else
					{
						this.getViewCache().setFetching(requestPath);
						$.get
						(
							requestPath,
							function(requestPath,template,response)
							{
								this.templates[template]=response;
								this.getViewCache().set(requestPath,response);
								doneTemplates++;
							}.bind(this,requestPath,template)
						).fail
						(
							function()
							{
								console.warn('Missing template! "'+requestPath+'" could not be loaded. Module will not initialize!');
							}.bind(this)
						);
					}
				}
				else
				{
					this.templates[template]=this.getViewCache().get(requestPath);
					doneTemplates++;
				}
			}
			
			$JSKK.when
			(
				function()
				{
					return (numTemplates==doneTemplates);
				}
			).isTrue
			(
				function()
				{
					this.fireEvent('onTemplatesLoaded',this);
					onComplete();
				}.bind(this)
			);
		},
		getTemplate: function(template)
		{
			return this.templates[template];
		},
		onAfterCmpInit:	$JSKK.emptyFunction,
		/**
		 * 
		 * @abstract
		 */
		onReady:		$JSKK.emptyFunction,
		/**
		 * 
		 * @abstract
		 */
		onViewInit: 	$JSKK.emptyFunction,
		/**
		 * 
		 * @abstract
		 */
		onStateChange:	$JSKK.emptyFunction,
		/**
		 * An abstract method to be implemented by extending classes.
		 * 
		 * This method should be used to asure the view state is always in sync
		 * with any stores associated with it.
		 * 
		 * @return
		 */
		syncView:		$JSKK.Class.ABSTRACT_METHOD,
		/**
		 * An abstract method to be implemented by extending classes.
		 * 
		 * This method should be used to make calls to
		 * {@link strappy.mvc.View.bindDOMEvent bindDOMEvent}.
		 * 
		 * @return
		 */
		bindDOMEvents:		$JSKK.Class.ABSTRACT_METHOD,
//		bindEventToSignal: function()
//		{
//			// empty function
//		},
		/**
		 * 
		 */
		getContainerClass: function()
		{
			return '.'+this.getSafeID();
		},
		/**
		 * 
		 */
		getContainer: function()
		{
			return $('#'+this.getIID());
		},
		/**
		 * 
		 */
		show: function()
		{
//			console.debug('onShow');
			// this.getContainer().fadeIn(500);
			this.getContainer().show();
			this.getContainer().removeClass('hidden');
			this.fireEvent('onShow',this);
			return this;
		},
		/**
		 * 
		 */
		hide: function()
		{
//			console.debug('onHide');
			// this.getContainer().fadeOut(500);
			this.getContainer().addClass('hidden');
			this.getContainer().hide();
			this.fireEvent('onHide',this);
			return this;
		},
		/**
		 * 
		 * @param {String} event The event to bind to.
		 * @param {String} handler The handler which to attach the event to.
		 * @param {String} method The method in the controller which to call.
		 * @param {Object} data Any data that should be passed to the method.
		 * @return {strappy.mvc.View} this
		 */
		bindContainerEvent: function(event,handler,method,data)
		{
			return this.bindDOMEvent(event,null,handler,method,data);
		},
		/**
		 * 
		 * @param {String} event The event to bind to.
		 * @param {String} selector A CSS selector, DOM element or jQuery object.
		 * @param {String} handler The handler which to attach the event to.
		 * @param {String} method The method in the controller which to call.
		 * @param {Object} data Any data that should be passed to the method.
		 * @return {strappy.mvc.View} this
		 */
		bindDOMEvent: function(event,selector,handler,method,data)
		{
			var handle=handler.split(':');
			if (handle.length==2)
			{
				switch (handle[0])
				{
					case 'controller':		handle=this.getController(handle[1]);		break;
					case 'view':			handle=this;								break;	
				}
			}
			else
			{
				handle=this.getController(handler);
			}
			if (!Object.isArray(selector))
			{
				this.getContainer().on(event,selector,data,handle[method].bind(handle));
			}
			else
			{
				$(selector[0],this.getContainer()).on(event,selector[1],data,handle[method].bind(handle));
			}
			return this;
		},
		/**
		 * 
		 * @param {String} event The event to bind to.
		 * @param {String} selector A CSS selector, DOM element or jQuery object.
		 * @param {String} handler The handler which to attach the event to.
		 * @param {String} method The method in the controller which to call.
		 * @param {Object} data Any data that should be passed to the method.
		 * @return {strappy.mvc.View} this
		 */
		bindBodyDOMEvent: function(event,selector,handler,method,data)
		{
			var handle=handler.split(':');
			if (handle.length==2)
			{
				switch (handle[0])
				{
					case 'controller':		handle=this.getController(handle[1]);		break;
					case 'view':			handle=this;								break;	
				}
			}
			else
			{
				handle=this.getController(handler);
			}
			$('body').on(event,selector,data,handle[method].bind(handle));
			return this;
		},
		find: function(selector)
		{
			return this.getContainer().find(selector);
		}
//		bindStoreChange: function(store,bindings)
//		{
//			for (var item in bindings)
//			{
//				if (Object.isFunction(this[bindings[item]]))
//				{
//					this._storeBindings[item]=this[bindings[item]].bind(this);
//				}
//				else
//				{
//					throw new Error('Unable to bind store change event for property "'+item+'" because the method "'+bindings[item]+'" '
//									+'has not been defined on view class "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'');
//				}
//			}
//			return this;
//		},
		
		
		
		
		
		

        // TODO: COMPOSITE PATTERN?
        // TODO: Consider Composite Design pattern to distinguish between DOM related events passed down the tree from MVC signals
        // update: function(msg){
        //  $each(var child in this.children){
        //          child.update(msg);
        //      }
        // }
        // TODO: IF COMPOSITE PATTERN then -> Bring in convenience methods
        //  getChild(x), addChild(x), removeChild(x)
    }
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/mvc/Controller", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.mvc.Controller
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * Bound Signals:
 * 
 * * {@link strappy.Signal.SHOW}: {@link strappy.mvc.Controller#onSignalShow}
 * * {@link strappy.Signal.HIDE}: {@link strappy.mvc.Controller#onSignalHide}
 * * {@link strappy.Signal.VIEW_DONE_GOTBASEHTML}: {@link strappy.mvc.Controller#onGotBaseHTML}
 * * {@link strappy.Signal.STATEFULMODEL_IS_READY}: {@link strappy.mvc.Controller#onReadyState}
 * 
 * 
 * @uses strappy.trait.ComponentConnector
 * @uses strappy.trait.signal.Receive
 * @uses $JSKK.trait.Observable
 * @abstract
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc',
		$name:		'Controller',
		$abstract:	true,
		$uses:
		[
			'strappy.trait.ComponentConnector',
			'strappy.trait.signal.Receive',
			// 'strappy.trait.signal.Send',
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		events:
		{
			
		},
		/**
		 * @constructor
		 * 
		 * Sets up the controller by binding to the above mentioned signals.
		 */
		init: function()
		{
			this.registerSignals
			( 
				{
					_onSignalShow:
					{
						signal:		strappy.Signal.SHOW,
						type:		'strappy',
						filter:		{iid:this.getIID()}
					},
					_onSignalHide:
					{
						signal:		strappy.Signal.HIDE,
						type:		'strappy',
						filter:		{iid:this.getIID()}
					}
				}
			);
		},
		onAfterCmpInit:	$JSKK.emptyFunction,
		/**
		 * This method will be called when a component fires a {@link strappy.Signal.CMP_DO_RECONFIGURE Do Reconfigure}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onReconfigure:	$JSKK.emptyFunction,
		/**
		 * This method will be called when a view fires a {@link strappy.Signal.VIEW_IS_READY ready}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onViewReady:	$JSKK.emptyFunction,
		/**
		 * This method will be called when a view fires a {@link strappy.Signal.VIEW_DONE_GOTBASEHTML Got Base HTML}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onGotBaseHTML: 	$JSKK.emptyFunction,
		/**
		 * This method will be called when a state model fires a {@link strappy.Signal.STATEFULMODEL_IS_READY Stateful Model is Ready}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onReadyState:	$JSKK.emptyFunction,
		
		_onSignalShow:	function()
		{
			var controller=this.getController('State');
			$JSKK.when(controller.isReady.bind(controller)).isTrue(this.onSignalShow.bind(this));
		},
		_onSignalHide:	function()
		{
			var controller=this.getController('State');
			$JSKK.when(controller.isReady.bind(controller)).isTrue(this.onSignalHide.bind(this));
		},
		
		onSignalShow:	$JSKK.emptyFunction,
		onSignalHide:	$JSKK.emptyFunction
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/mvc/stateful/Controller", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.mvc.stateful.Controller
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * Bound Signals:
 * 
 * * {@link strappy.Signal.STATE_CHANGE}: {@link strappy.mvc.stateful.Controller#onStateChange}
 * * {@link strappy.Signal.VIEW_IS_READY}: {@link strappy.mvc.stateful.Controller#onViewReady}
 * 
 * @mixins strappy.trait.ComponentConnector
 * @mixins strappy.trait.signal.Receive
 * @mixins strappy.trait.signal.Send
 * @mixins strappy.trait.signal.Bindable
 * @abstract
 * 
 * @uses strappy.trait.ComponentConnector
 * @uses strappy.trait.signal.Receive
 * @uses strappy.trait.signal.Send
 * @uses strappy.trait.signal.Bindable
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc.stateful',
		$name:		'Controller',
		$abstract:	true,
		$uses:
		[
			'strappy.trait.ComponentConnector',
			'strappy.trait.signal.Receive',
			'strappy.trait.signal.Send',
			'strappy.trait.signal.Bindable',
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		events:
		{
			onBeforeReadyState:	true,
			onReadyState:		true
		},
		/**
		 * @property {strappy.data.stateful.Store} stateStore A reference to the
		 * associated state model.
		 * @private
		 */
		stateStore:			null,
		/**
		 * This method will be called whenever a state change signal
		 * has been received.
		 * 
		 * Note that state change signals are blocked until the associated
		 * {@link strappy.mvc.stateful.Model State Model} is ready.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onBeforeChange:		$JSKK.Class.ABSTRACT_METHOD,
		/**
		 * @property {Boolean} ready A flag identifying the readyness of the controller.
		 * @private
		 */
		ready:	false,
		/**
		 * @constructor
		 * 
		 * Sets up the controller by binding events and checking that a model
		 * named "State" has been defined for the associated component.
		 */
		init: function()
		{
			this.registerSignals
			( 
				{
					onStateChangeFromStateMgr:	strappy.Signal.STATE_CHANGE
				}
			);
			if (!(this.stateStore=this.getStore('State')))
			{
				throw new Error('Unable to initialize "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'" State Controller. Controller requires a state model.');
			}
			//Bind the state stuff before firing the onReady event.
			this.stateStore.observe('onBeforeChange',	this.onBeforeChange.bind(this));
			this.stateStore.observe('onChange',			this.onStateChange.bind(this));
		},
		/**
		 * A private method which wraps the functionality of
		 * {@link strappy.mvc.stateful.Controller#onStateChange} and blocks
		 * all signals until the associated {@link strappy.mvc.stateful.Model State Model}
		 * is ready.
		 * 
		 * @private
		 * @param {strappy.Signal} The signal object.
		 * @return {void}
		 */
		onStateChangeFromStateMgr: function(signal)
		{
			//Ignore all state changes if the state model is not flagged as ready.
			if (this.stateStore.isReady())
			{
				// this.onStateChange(signal.getBody());
				var state=signal.getBody();
				for (var item in state)
				{
					if (this.stateStore.canManageStateItem(item))
					{
						var oldValue=this.stateStore.get(item);
						if (!this.stateStore.set(item,state[item]))
						{
							var restoredState	={};
							restoredState[item]	=oldValue;
							this.getStateMgr().updateState(restoredState,true);
						}
					}
				}
			}
		},
		/**
		 * This method will be called when a view fires a {@link strappy.Signal.VIEW_IS_READY ready}
		 * signal.
		 * @abstract
		 * @param {strappy.Signal} The signal object.
		 */
		onViewReady:	$JSKK.emptyFunction,
		/**
		 * Flags the {@link strappy.mvc.stateful.Model State Model}
		 * as ready.
		 * 
		 * @return {strappy.mvc.stateful.Controller}
		 */
		setReady:		function()
		{
			this.stateStore.setReady(true);
			this.ready=true;
			if (this.fireEvent('onBeforeReadyState',this,true)!==false)
			{
				var state=this.getStateMgr().getState()
				for (var item in state)
				{
					if (this.stateStore.canManageStateItem(item))
					{
						var oldValue=this.stateStore.get(item);
						if (!this.stateStore.set(item,state[item]))
						{
							var restoredState	={};
							restoredState[item]	=oldValue;
							this.getStateMgr().updateState(restoredState,true);
						}
					}
				}
				this.fireEvent('onReadyState',this,true);
			}
			return this;
		},
		/**
		 * Updates a stateful property in the {@link strappy.mvc.stateful.Model State Model}.
		 * @param {String} key The name of the state property to update.
		 * @param {Mixed} value The new value.
		 * @return {strappy.mvc.stateful.Controller}
		 */
		updateState:	function()
		{
			this.stateStore.set.apply(this.stateStore,$JSKK.toArray(arguments));
			return this;
		},
		/**
		 * Flags a view as ready.
		 * @param {String} view The name of the view to flag as ready.
		 * @return {strappy.mvc.stateful.Controller}
		 */
		setViewReadyState: function(view)
		{
			this.stateStore.setViewReady(view);
			return this;
		},
		/**
		 * Returns a list of views that have been flagged as ready.
		 * @return {Array} An array of view names.
		 */
		getReadyViews: function()
		{
			return this.stateStore.getReadyViews();
		},
		/**
		 * Checks to see if the store has been flagged as ready.
		 * 
		 * @return {Boolean} True if ready.
		 */
		isReady: function()
		{
			return this.ready;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/mvc/stateful/Model", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.mvc.stateful.Model
 * 
 * 
 * @abstract
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc.stateful',
		$name:		'Model',
		$extends:	'strappy.mvc.Model'
	}
)
(
	{},
	{
		fields:
		{
			'private':	{},
			'public':	{}
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/RadioTower", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.RadioTower
 * This is a special container class which leverages $JSKK's
 * Observable trait to handle registering signal callbacks
 * and distributing signals.
 * 
 * You should not need to ever interface with this class
 * directly.
 * 
 * @singleton
 * @mixins $JSKK.trait.Observable
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'RadioTower',
		$uses:
		[
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		/**
		 * @property events A container for holding registered signals.
		 * @private
		 */
		events:{}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/InitQueue", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.InitQueue
 * 
 * 
 * 
 * @mixin $JSKK.trait.Observable
 * @uses $JSKK.trait.Observable
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'InitQueue',
		$uses:
		[
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		events:
		{
			onItemReady:	true,
			onAllReady:		true
		},
		component:		null,
		items:			[],
		processPointer:	-1,
		length:			0,
		complete:		0,
		
		init: function(component)
		{
			if (Object.isDefined(component))
			{
				this.component=component;
			}
			else
			{
				console.warn('You should provide the parent component to the InitQueue constructor'
							+' otherwise initalized child components could be unreferencable.');
			}
		},
		add: function(name,ref,config,callback)
		{
			if (Object.isUndefined(ref))
			{
				throw new Error('InitQueue failed to add component. "ref" for component was undefined.',$.stringify(arguments));
			}
			this.items.push
			(
				{
					name:		name,
					ref:		ref,
					config:		config,
					callback:	(callback || $JSKK.emptyFunction)
				}
			);
			this.length++;
			return this;
		},
		execute: function()
		{
			if (!this.items.length) {
				return;
			}
			$JSKK.when(this,{object:'complete',value:this.length}).isEqualTo
			(
				function()
				{
					this.fireEvent('onAllReady',this.items);
				}.bind(this)
			);
			this.processNextItem();
		},
		processNextItem: function()
		{
			this.processPointer++;
			if (Object.isString(this.items[this.processPointer].ref))
			{
				this.items[this.processPointer].ref=$JSKK.namespace(this.items[this.processPointer].ref);
			}
			if (!Object.isFunction(this.items[this.processPointer].ref.$reflect))
			{
				if (Object.isFunction(this.items[this.processPointer].ref))
				{
					this.items[this.processPointer].ref=new this.items[this.processPointer].ref();
				}
				else
				{
					throw new Error('InitQueue was unable to initalize a component. '
									+'The component with ref "'+this.items[this.processPointer].name+'" '
									+'did not have a valid constructor associated with it.');
				}
			}
			cmp=this.items[this.processPointer].ref;
			if (Object.isDefined(this.component) && !Object.isNull(this.component)
			&& Object.isUndefined(this.component.components[this.items[this.processPointer].name]))
			{
				this.component.components[this.items[this.processPointer].name]=cmp;
			}
			// else
			// {
			// 	throw new Error('Attempted to initalize a queued item but the component already has a');
			// }
			if (Object.isAssocArray(this.items[this.processPointer].config))
			{
				cmp.observeOnce
				(
					'onAfterInit',
					function(cmp)
					{
						cmp.getController('State').observeOnce
						(
							'onReadyState',
							function(pointer)
							{
								this.fireEvent('onItemReady',this.items[this.processPointer]);
								this.items[this.processPointer].callback();
								if (++this.complete!=this.length)
								{
									this.processNextItem();
								}
							}.bind(this,this.processPointer)
						);
					}.bind(this,cmp)
				);
				cmp.configure(this.items[this.processPointer].config);
			}
			else
			{
				this.complete++;
				this.processNextItem();
			}
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/Component", ["strappy/Strappy"], function() {
      return (function() {
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
			'$JSKK.trait.Configurable',
			'$JSKK.trait.Observable',
			'strappy.trait.signal.Send'
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
						}.bind(this)
					
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
			if (Object.isString(component))
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
			// else
			// {
			// 	console.trace();
			// 	throw new Error('Error - state property "'+key+'" has not been configured for component "'+this.my.name+'".');
			// }
		},
		getPublicState: function()
		{
			return this._state['public'];
		},
		getPrivateState: function()
		{
			return this._state['private'];
		},
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
		 * Fetches a config item associated with this component.
		 * 
		 * @deprecated
		 * @return {Mixed} The config item's value. 
		 */
		getConfig:		function(key)
		{
			console.warn('Use of getConfig deprecated as of Strappy 1.2. Use getState instead.');
			// if (Object.isDefined(key))
			// {
			// 	var	parts	=key.split('.'),
			// 		object	=this.config;
			// 	for (var i=0,j=parts.length; i<j; i++)
			// 	{
			// 		if (Object.isDefined(object[parts[i]]))
			// 		{
			// 			object=object[parts[i]];
			// 		}
			// 		else
			// 		{
			// 			return null;
			// 		}
			// 	}
			// 	return object;
			// }
			// return this.config;
			
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
		 * See {@link strappy.trait.signal.Send#sendSignal}
		 * @private
		 */
// 		sendSignal: function(name,type,filter,body)
// 		{
// //			console.debug(this.$reflect('namespace')+'.'+this.$reflect('name'),':: sendSignal(core) :: ',name);
// 			if (!Object.isEmpty(name))
// 			{
// 				$JSKK.when(this,'radioTower').isAssocArray
// 				(
// 					function()
// 					{
// 						this.radioTower.fireEvent
// 						(
// 							name,
// 							new strappy.Signal
// 							(
// 								{
// 									name:	name,
// 									body:	body,
// 									type:	type,
// 									filter:	filter
// 								}
// 							)
// 						);
// 					}.bind(this)
// 				);
// 			}
// 			else
// 			{
// 				throw new Error('Class '+this.className+' attempted to fire an empty signal.');
// 			}
// 		},
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
		getRef: function()
		{
			return this.getState('ref');
		},
		getFullRef: function()
		{
			return this.getState('fullRef');
		},
		eachChildCmp: function(callback)
		{
			for (var component in this.components)
			{
				callback(this.components[component],component);
			}
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ShareMgr", ["strappy/Strappy"], function() {
      return (function() {
/**
 * @class strappy.ShareMgr
 * 
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'ShareMgr'
	}
)
(
	{},
	{
		rootNS:	null,
		init: function(parentCmp,rootNS)
		{
			this.parentCmp	=parentCmp;
			this.rootNS		=rootNS;
			if (Object.isDefined(this.rootNS.shared))
			{
				//Stores
				if (Object.isDefined(this.rootNS.shared.store))
				{
					for (var store in this.rootNS.shared.store)
					{
						if (!Object.isFunction(this.rootNS.shared.store[store].$reflect))
						{
							this.rootNS.shared.store[store]=new this.rootNS.shared.store[store](this.parentCmp);
						}
					}
				}
			}
		}
	}
);      }).apply(root, arguments);
    });
}(this));

define
(
	'strappy',
	[
		'./trait/ComponentConnector',
		'./trait/signal/Send',
		'./trait/signal/Receive',
		'./trait/signal/Bindable',
		'./Signal',
		'./data/proxy/AbstractProxy',
		'./data/proxy/Ajax',
		'./data/proxy/BTL',
		'./data/proxy/MemoryProxy',
		'./data/BTL',
		'./data/AbstractStore',
		'./data/SingleModelStore',
		'./data/MultiModelStore',
		'./data/Transaction',
		'./data/Queue',
		'./data/stateful/Store',
		'./SharedState',
		'./StateMgr',
		'./mvc/Model',
		'./mvc/DynamicModel',
		'./mvc/ViewCache',
		'./mvc/View',
		'./mvc/Controller',
		'./mvc/stateful/Controller',
		'./mvc/stateful/Model',
		'./RadioTower',
		'./InitQueue',
		'./Component',
		'./ShareMgr',
		'./Strappy'
		
	]
);
define("strappy/main", function(){});

