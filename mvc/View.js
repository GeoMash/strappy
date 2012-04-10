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
        /*
        * INSTANCE VARIABLES
        */
        _iid:			null,
		_ready:			false,
		_stateBindings:	{},
        contentURL:		null,
		baseHTML:		null,
		element:		null,
        // TODO: COMPOSITE PATTERN -> See bottom off this Class
        // children: [],

        /**
        * INITIALIZATION
        */
		init: function()
		{
			this.generateInstanceID();
			
//			this.registerSignals
//			(
//				[framework.SIGNAL.VIEW_DONE_INIT,			'onViewInit'],
//				[framework.SIGNAL.VIEW_DO_INSERTBASEHTML,	'insertBaseHTML']
//			);
			
			this.registerSignals
			(
				[framework.Signal.MODEL_DONE_CHANGE,			'onModelChange',	framework.Signal.GLOBAL],
				[framework.Signal.STATEFULMODEL_DONE_CHANGE,	'onStateChange',	framework.Signal.GLOBAL],
				[framework.Signal.VIEW_DO_INSERTBASEHTML,		'insertBaseHTML'],
				[framework.Signal.VIEW_DO_SHOW,					'onShow'],
				[framework.Signal.VIEW_DO_HIDE,					'onHide']
			);
			
			this.fetchContent();
//			this.sendSignal(framework.SIGNAL.VIEW_DONE_INIT,{id:this.getID()});
		},
		
		fetchContent: function()
		{
//			if (this.remoteView)
//			{
				$.get
				(
					(this.$reflect('namespace').replace(/\./g,'/'))+'/html/'+this.$reflect('name').toLowerCase()+'.html',
					function(response)
					{
						this.baseHTML=response;
						this.sendSignal(framework.Signal.VIEW_DONE_GOTBASEHTML,{component:this.getCmpName(),id:this.getID()});
					}.bind(this)
				);
//			}
		},
		
//		insertBaseHTML: function(signal)
//		{
//			var body=signal.getBody();
//			if (body.id==this.getID())
//			{
//				if (this.sendSignal(framework.SIGNAL.VIEW_BEFORE_RENDER,{id:this.getID()})!==false)
//				{
//					var where	=body.where,
//						how		=body.how,
//						element	=$(where);
//					if (element.length)
//					{
//						if (Object.isFunction(element[how]))
//						{
//							element[how](this.baseHTML);
//							this.sendSignal(framework.SIGNAL.VIEW_DONE_RENDER,{id:this.getID()});
//						}
//						else
//						{
//							throw new Error('"'+how+'" is an invalid method and cannot be called on element "'+where+'".');
//						}
//					}
//					else
//					{
//						throw new Error('Unable to insert base html into "'+where+'". Element not found.');
//					}
//				}
//			}
//		},
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
		getBaseHTML: function()
		{
			return this.baseHTML;
		},
		onReady:		$JSKK.emptyFunction,
		onViewInit: 	$JSKK.emptyFunction,
		onModelChange:	$JSKK.emptyFunction,
//		onStateChange:	$JSKK.emptyFunction,
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
        bindEventToSignal: function()
		{
			// empty function
		},
		getContainerClass: function()
		{
			return '.'+this.getSafeID();
		},
		getContainer: function()
		{
			return $('#'+this.getIID());
		},
		onShow: function()
		{
			console.debug('onShow');
			this.getContainer().fadeIn(500);
			this.sendSignal(framework.Signal.VIEW_DONE_SHOW,{component:this.getCmpName(),id:this.getID()});
		},
		onHide: function()
		{
			console.debug('onHide');
			this.getContainer().fadeOut(500);
			this.sendSignal(framework.Signal.VIEW_DONE_HIDE,{component:this.getCmpName(),id:this.getID()});
		},
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
		bindStateEvents: function()
		{
			var bindings=$JSKK.toArray(arguments);
			for (var i=0,j=bindings.length; i<j; i++)
			{
				if (Object.isFunction(this[bindings[i][1]]))
				{
					this._stateBindings[bindings[i][0]]=this[bindings[i][1]].bind(this);
				}
				else
				{
					throw new Error('Unable to bind state change event for stateful property "'+bindings[i][0]+'" because the method "'+bindings[i][1]+'" '
									+'has not been defined on view class "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'');
				}
			}
		},
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