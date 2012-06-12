/**
 * @class framework.mvc.View
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * @mixins framework.trait.ComponentConnector
 * @abstract
 * 
 * @uses framework.trait.ComponentConnector
 * @uses framework.trait.signal.Receive
 * @uses framework.trait.signal.Send
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework.mvc',
		$name:			'View',
		$abstract:		true,
		$uses:
		[
			framework.trait.ComponentConnector,
			$JSKK.trait.Observable
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
			var	cmp=this.getParentComponent();
			$JSKK.when(cmp.isConfigured.bind(cmp)).isTrue
			(
				function()
				{
					this.fetchTemplateContent
					(
						function()
						{
							if ((this.stateStore=this.getStore('State')))
							{
								this.stateStore.observe('onChange',this.onStateChange.bind(this));
							}
							
							this._ready=true;
							/*
							 * The following two lines need to be in this order so that
							 * the view has a chance to set itself up before the state
							 * controller flags the component as ready.
							 */
							this.onReady();
							this.fireEvent('onReady',this);
						}.bind(this)
					);
				}.bind(this)
			);
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
				if (!this.getViewCache().exists(requestPath))
				{
					if (this.getViewCache().isFetching(requestPath))
					{
						$PWT.when
						(
							function()
							{
								this.getViewCache().isFetching(requestPath);
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
								this.getViewCache().set(requestPath,response);
								this.templates[template]=response;
								doneTemplates++;
							}.bind(this,requestPath,template)
						);
					}
				}
				else
				{
					(function()
					{
						this.templates[template]=this.getViewCache().get(requestPath);
						doneTemplates++;
					}.bind(this,requestPath,template)).defer(100);
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
		onStoreChange:	$JSKK.emptyFunction,
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
		 * {@link framework.mvc.View.bindDOMEvent bindDOMEvent}.
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
			this.getContainer().fadeIn(500);
			this.fireEvent('onShow',this);
			return this;
		},
		/**
		 * 
		 */
		hide: function()
		{
//			console.debug('onHide');
			this.getContainer().fadeOut(500);
			this.fireEvent('onHide',this);
			return this;
		},
		/**
		 * 
		 * @param {String} event The event to bind to.
		 * @param {String} handler The handler which to attach the event to.
		 * @param {String} method The method in the controller which to call.
		 * @param {Object} data Any data that should be passed to the method.
		 * @return {framework.mvc.View} this
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
		 * @return {framework.mvc.View} this
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
		 * @return {framework.mvc.View} this
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
						var container = this.getContainer();
						var linkEl = $(links[i][0])
						if (linkEl[0] == container[0]) {
							item=linkEl;
						} else {
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
		/**
		 * 
		 */
		bindStateChanges: function(bindings)
		{
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
//			for (var i=0,j=bindings.length; i<j; i++)
//			{
//				
//			}
			return this;
		},
		/**
		 * 
		 */
		onStateChange: function(store,key,value)
		{
//			console.debug('onStateChange(view handler)',key,value);
			if (Object.isFunction(this._stateBindings[key]))
			{
				this._stateBindings[key](value);
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

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
);