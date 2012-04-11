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
		config:
		{
			attachTo:	null
		},
        browser:
		{
			name:		null,
			version:	null
		},
		components:		{},
		models:			[],
		views:			[],
		controllers:	[],
		_models:		{},
		_views:			{},
		_controllers:	{},
		_configured:	false,
		my:
		{
			name:		null,
			index:		null,
			NSObject:	null
		},
		radioTower: null,
		stateMgr:	null,
		/**
		 * 
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
		initRadioTower: function()
		{
			if (Object.isUndefined(window.framework.$radioTower))
			{
				window.framework.$radioTower=new framework.RadioTower();
			}
			this.radioTower=window.framework.$radioTower;
		},
		initStateMgr: function()
		{
			if (Object.isUndefined(window.framework.$stateMgr))
			{
				window.framework.$stateMgr=new framework.StateMgr();
			}
			this.stateMgr=window.framework.$stateMgr;
		},
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
		reconfigure: function()
		{
			$JSKK.when(this,'ready').isTrue
			(
				function()
				{
					this.sendSignal(framework.Signal.CMP_DO_RECONFIGURE,{component:this.my.name});
				}.bind(this)
			);
		},
		isConfigured: function()
		{
			return this._configured;
		},
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
		getID: function()
		{
			var id=[];
			Object.extend(id,this.namespace);
			id.push(this.className);
			return id.join('.');
		},
		/**
		 * 
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
		
		/**
		 * 
		 */
//		registerSignal: function(signal,callback)
//		{
//			this.observe(signal,callback);
//		},
//		destroyController: function(signal)
//		{
//			var controller=signal.getBody().name;
//			
//			console.debug('destroyController ',controller);
//			
//			
//			if (Object.isDefined(this.controllers[controller]))
//			{
//				delete this.controllers[controller];
//			}
//			else
//			{
//				throw new Error('Call to destroyController on controller "'+controller+'" failed because the controller has not been initilized or has already been destroyed.');
//			}
//		},
//		onCommandComplete: function(signal)
//		{console.debug('onCommandComplete');
//			this.destroyController(signal);
//		}
	}
);