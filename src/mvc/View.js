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
		_templatesReady:		false,
		_ready:					false,
		_stateBindings:			{},
		templateServiceURL:		null,
		templates:				{},
		element:				null,
		stateStore:				null,
        /**
		 * Kicks off the template fetching process.
         * @constructor
		 * @public
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
		/**
		 * Fetches all templates associated with the view.
		 * Can call a callback when completed.
		 * @param {Function} onComplete Callback method.
		 */
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
				var	initialPath=this.$reflect('namespace').replace(/\./g,'/'),
					scriptTag=$('script[src*="'+initialPath+'"]');
				if (scriptTag.length)
				{
					var requestPath=null;
					if (Object.isNull(this.templateServiceURL))
					{
						requestPath=scriptTag.attr('src').replace(/\w*\.js/,'')+'html/'+this.templates[template];
					}
					else
					{
						requestPath=this.templateServiceURL+this.templates[template];
					}
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
				else
				{
					console.trace();
					throw new Error('Unable to determine template path. Best guess was "'+initialPath+'".');
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
		/**
		 * Gets a template based on the view's predefined list of templates.`
		 * 
		 * @param {string} template The reference of the template to return.
		 * @returns {string} The template as a string.
		 */
		getTemplate: function(template)
		{
			return this.templates[template];
		},
		/**
		 * Callback when is executed after the component has finished initialising.
		 * 
		 * @abstract
		 */
		onAfterCmpInit:	$JSKK.emptyFunction,
		/**
		 * Callback for whenever a state changes.
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
		 * @abstract
		 */
		syncView:		$JSKK.Class.ABSTRACT_METHOD,
		/**
		 * An abstract method to be implemented by extending classes.
		 * 
		 * This method should be used to make calls to
		 * {@link strappy.mvc.View.bindDOMEvent bindDOMEvent}.
		 * 
		 * @abstract
		 */
		bindDOMEvents:		$JSKK.Class.ABSTRACT_METHOD,
		/**
		 * Gets the container class which is the full ref of the
		 * container but with a dot prepended to it so that it may
		 * be used with a selector.
		 * 
		 * @return {string} The CSS class.
		 */
		getContainerClass: function()
		{
			return '.'+this.getSafeID();
		},
		/**
		 * Returns the container element of the component.
		 * 
		 * @return {jQuery} The element as jQuery.
		 */
		getContainer: function()
		{
			return $('#'+this.getIID());
		},
		/**
		 * Shows the container.
		 * 
		 * Also applies a class named "hidden".
		 * 
		 * @selfable
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
		 * Hids the container.
		 * 
		 * Also removes a class named "hidden".
		 * 
		 * @selfable
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
		/**
		 * Shorthand for this.getContainer().find();
		 * 
		 * @param selector
		 * @returns {mixed}
		 */
		find: function(selector)
		{
			return this.getContainer().find(selector);
		}
    }
);