/**
 * @class framework.mvc.View
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 * Bound Signals:
 * 
 * * {@link framework.Signal.STORE_DONE_CHANGE}: {@link framework.mvc.View#onStoreChange} (global)
 * * {@link framework.Signal.STATEFULSTORE_DONE_CHANGE}: {@link framework.mvc.View#onStateChange} (global)
 * * {@link framework.Signal.VIEW_DO_INSERTBASEHTML}: {@link framework.mvc.View#insertBaseHTML}
 * * {@link framework.Signal.VIEW_DO_SHOW}: {@link framework.mvc.View#onShow}
 * * {@link framework.Signal.VIEW_DO_HIDE}: {@link framework.mvc.View#onHide}
 * 
 * @mixins framework.trait.ComponentConnector
 * @mixins framework.trait.signal.Receive
 * @mixins framework.trait.signal.Send
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
		$uses:
		[
			framework.trait.ComponentConnector,
			framework.trait.signal.Receive,
			framework.trait.signal.Send
		]
	}
)
(
	{},
	{
		
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
			
			this.registerSignals
			(
				[framework.Signal.STORE_DONE_CHANGE,			'onStoreChange',	framework.Signal.GLOBAL],
				[framework.Signal.STATEFULSTORE_DONE_CHANGE,	'onStateChange',	framework.Signal.GLOBAL],
				[framework.Signal.VIEW_DO_INSERTBASEHTML,		'insertBaseHTML'],
				[framework.Signal.VIEW_DO_SHOW,					'onShow'],
				[framework.Signal.VIEW_DO_HIDE,					'onHide']
			);
			
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
						this.sendSignal(framework.Signal.VIEW_DONE_GOTBASEHTML,{component:this.getCmpName(),id:this.getID()});
					}.bind(this)
				);
		},
		/**
		 * 
		 */
		insertBaseHTML: function(signal)
		{
			console.debug('insertBaseHTML');
			var	body=signal.getBody(),
				view=$(this.getBaseHTML());
			
			view.attr('id',this.getIID());
			$(body.where)[body.how](view);
			this._ready=true;
			this.onReady();
			this.sendSignal(framework.Signal.VIEW_IS_READY,{component:this.getCmpName(),id:this.getID()});
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
		onShow: function()
		{
			console.debug('onShow');
			this.getContainer().fadeIn(500);
			this.sendSignal(framework.Signal.VIEW_DONE_SHOW,{component:this.getCmpName(),id:this.getID()});
		},
		/**
		 * 
		 */
		onHide: function()
		{
			console.debug('onHide');
			this.getContainer().fadeOut(500);
			this.sendSignal(framework.Signal.VIEW_DONE_HIDE,{component:this.getCmpName(),id:this.getID()});
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
			for (var i=0,j=bindings.length; i<j; i++)
			{
				
			}
		},
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