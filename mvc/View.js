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
			onGotBaseHTML:		true,
			onInsertBaseHTML:	true,
			onReady:			true,
			onShow:				true,
			onHide:				true
		},
		
        _iid:			null,
		_ready:			false,
		_stateBindings:	{},
        contentURL:		null,
		baseHTML:		null,
		element:		null,
        // TODO: COMPOSITE PATTERN -> See bottom off this Class
        // children: [],

        /**
        * @constructor
        * 
        * 
        */
		init: function()
		{
			this.generateInstanceID();
			
			this.fetchContent();
		},
		/**
		 * 
		 */
		fetchContent: function()
		{
			$.get
			(
				(this.$reflect('namespace').replace(/\./g,'/'))+'/html/'+this.$reflect('name').toLowerCase()+'.html',
				function(response)
				{
					this.baseHTML=response;
					this.fireEvent('onGotBaseHTML',this);
				}.bind(this)
			);
		},
		/**
		 * 
		 */
		insertBaseHTML: function(config)
		{
			console.debug('insertBaseHTML');
			var	view=$(this.getBaseHTML());
			
			view.attr('id',this.getIID());
			$(config.where)[config.how](view);
			this.fireEvent('onInsertBaseHTML',this);
			this._ready=true;
			this.onReady();
			this.fireEvent('onReady',this);
			return this;
		},
		/**
		 * 
		 */
		getBaseHTML: function()
		{
			return this.baseHTML;
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
		 * 
		 */
		syncView:		$JSKK.Class.ABSTRACT_METHOD,
		/**
		 * 
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
		 * 
		 */
		getIID: function()
		{
			return this._iid;
		},
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
			console.debug('onShow');
			this.getContainer().fadeIn(500);
			this.fireEvent('onShow',this);
			return this;
		},
		/**
		 * 
		 */
		hide: function()
		{
			console.debug('onHide');
			this.getContainer().fadeOut(500);
			this.fireEvent('onHide',this);
			return this;
		},
		/**
		 * 
		 */
		bindStatefulLinks: function()
		{
			var links=$JSKK.toArray(arguments);
			$JSKK.when(this,'_ready').isTrue
			(
				function()
				{
					var item=null;
					for (var i=0,j=links.length; i<j; i++)
					{
						item=$(links[i][0],this.getContainer());
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
		bindStateEvents: function(bindings)
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
		onStateChange: function(signal)
		{
			console.debug('onStateChange');
			var changeSet=signal.getBody().change;
			for (var item in changeSet)
			{
				if (Object.isFunction(this._stateBindings[item]))
				{
					this._stateBindings[item](changeSet[item]);
				}
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