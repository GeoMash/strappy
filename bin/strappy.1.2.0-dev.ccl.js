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
define("strappy/ccl/CCL", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'CCL'
	}
)
(
	{
		version:			'1.0.0',
		Signal:
		{
			SWITCH:			'strappy.signal.ccl.switch',
			SPINNER_CHANGE:	'strappy.signal.ccl.spinner.change'
		},
		Type:
		{
			INSTRUCTION:	'strappy.type.ccl.instruction',
			CHANGE:			'strappy.type.ccl.change'
		}
	},
	{}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/trait/Containable", ["strappy/Strappy"], function() {
      return (function() {
/**
 * 
 * Implement the following config options in the component
 * using this trait.
	children:			null,					//array
	html:				null,					//string
	bodySelector:		null,					//string
	defaultChildCmp:	'strappy.ccl.Container'	//string
 
 * @class strappy.ccl.trait.Containable
 * @requires strappy.ccl.component.container.Container
 */
$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Containable',
		$requires:
		[
			'strappy.ccl.component.container.Container'
		]
	}
)
(
	{
		/**
		 * Iterates over the children config and inits them into
		 * this components containing div.
		 * @return {void}
		 */
		initChildren: function()
		{
			this.childInstances			=[];
			this.readyChildren			=0;
			var	parent			=this.getParentComponent(),
				children		=this.getState('children');
			//If HTML has been specified, ignore children.
			if (Object.isString(this.getState('html')))
			{
				if (!Object.isNull(this.getState('bodySelector')))
				{
					this.getView('Main')	.getContainer()
											.find(this.getState('bodySelector'))
											.html(this.getState('html'));
				}
				else
				{
					this.getView('Main').getContainer().html(this.getState('html'));
				}
				parent.fireEvent('onChildReady',this.getState('fullRef')+'.html',this);
			}
			//HTML was not specified, so handle the children if there are any.
			else if (!Object.isNull(children))
			{
				//Work with arrays. So convert if not already.
				if (!Object.isArray(children))
				{
					children=[children];
				}
				//Iterate over each child component.
				for (var i=0,j=children.length; i<j; i++)
				{
					this.addChild(children[i],i);
				}
			}
		},
		addChild: function(child,i)
		{
			var	parent			=this.cmp(),
				children		=this.getState('children') || [];
			if (Object.isUndefined(child.cmp))
			{
				if (!Object.isNull(this.getState('defaultChildCmp')))
				{
					child.cmp=this.getState('defaultChildCmp');
				}
				else
				{
					child.cmp='strappy.ccl.component.container.Container';
				}
			}
			//Set the parent ref.
			if (this.getState('ref') && Object.isDefined(child.ref))
			{
				var parentRef='';
				if (this.getState('parentRef'))
				{
					parentRef=this.getState('parentRef')+'.';
				}
				else
				{
					parentRef=this.$reflect('name')+'.';
				}
				child.parentRef		=parentRef+this.getState('ref');
				child.fullRef		=child.parentRef+'.'+child.ref;
			}
			else if (Object.isDefined(child.ref))
			{
				child.parentRef		=this.$reflect('name');
				child.fullRef		=child.parentRef+'.'+child.ref;
			}
			var state=Object.clone(child);
			
			//Configure it to attach itself to THIS container.
			state.attachTo='#'+this.getIID();
			if (!Object.isNull(this.getState('bodySelector')))
			{
				state.attachTo+=' '+this.getState('bodySelector');
			}
			
			//Remove the reference to the component prototype.
			delete state.cmp;
			var onReadyState=function(thisChildCmp)
			{
				//Check if all children are ready.
				if (++this.readyChildren===children.length)
				{
					var el		=null,
						testEl	=null;
					//Now check if each child is in the correct order.
					for (var i=0,j=children.length; i<j; i++)
					{
						el=$('#'+this.childInstances[i].getIID());
						testEl=$(':nth-child('+(i+1)+')',children[i].attachTo);
						//The elements must match otherwise they're in the wrong order.
						if (el[0]!=testEl[0])
						{
							//Wrong order - so now we must reorder the elements.
							var parentEl=$(children[0].appendTo);
							parentEl.children().remove();
							for (var k=0,l=children.length; k<l; k++)
							{
								parentEl.append(children[i]);
							}
							break;
						}
					}
					this.fireEvent('onAllChildrenReady');
				}
				parent.fireEvent('onChildReady',child.fullRef,thisChildCmp);
			}.bind(this),
			onChildReady=function(ref,child)
			{
				var args=$JSKK.toArray(arguments);
				args.unshift('onChildReady');
				parent.fireEvent.apply(parent,args);
			}.bind(this);
			
			if (Object.isDefined(child.events))
			{
				if (Object.isFunction(child.events.onReadyState))
				{
					child.events.onReadyState=child.events.onReadyState.join(onReadyState);
				}
				if (Object.isFunction(child.events.onChildReady))
				{
					child.events.onChildReady=child.events.onChildReady.join(onChildReady);
				}
			}
			else
			{
				child.events=
				{
					onReadyState:	onReadyState,
					onChildReady:	onChildReady
				}
			}
			//Create an instance of the child component.
			this.childInstances[i]=parent.newChildComponent
			(
				child.cmp,
				child.ref,
				state,
				child.events
			);
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/trait/Animatable", ["strappy/Strappy"], function() {
      return (function() {
/**
 * 
 * @class strappy.ccl.trait.Animatable
 */
$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Animatable'
	}
)
(
	{
		enableAnimations: function()
		{
			this.getContainer().css
			(
				{
					transition:				'all .25s linear',
					'-o-transition':		'all .25s linear',
					'-moz-transition':		'all .25s linear',
					'-webkit-transition':	'all .25s linear'
				}
			);
		},
		disableAnimations: function()
		{
			this.getContainer().css
			(
				{
					transition:				'none',
					'-o-transition':		'none',
					'-moz-transition':		'none',
					'-webkit-transition':	'none'
				}
			);
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/trait/Pluploadable", ["strappy/Strappy"], function() {
      return (function() {
/**
 * 
 * @class strappy.ccl.trait.Pluploadable
 * @uses $JSKK.trait.Observable
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Pluploadable',
		$uses:
		[
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		/*
		events:
		{
			onInit:				true,
			onFilesAdded:		true,
			onUploadProgress:	true,
			onError:			true,
			onFileUploaded:		true
		},
		
		upload_runtimes:			'gears,html5,flash,silverlight,browserplus',
		upload_browse_button:		'plupload-select',
		upload_container:			'plupload-container',
		upload_max_file_size:		'10mb',
		upload_url:					'upload.php',
		upload_flash_swf_url:		'plupload.flash.swf',
		upload_silverlight_xap_url:	'plupload.silverlight.xap',
		upload_filters:
		[
			{title : "Image files", extensions : "jpg,gif,png"},
			{title : "Zip files", extensions : "zip"}
		]
		
		
		
		*/
		initUploader: function()
		{
			this.uploader=new plupload.Uploader
			(
				{
					runtimes:				this.getState('upload_runtimes'),
					browse_button:			this.getState('upload_browse_button'),
					container:				this.getState('upload_container'),
					drop_element:			this.getState('upload_drop_element'),
					max_file_size:			this.getState('upload_max_file_size'),
					url:					this.getState('upload_url'),
					flash_swf_url:			this.getState('upload_flash_swf_url'),
					silverlight_xap_url:	this.getState('upload_silverlight_xap_url'),
					filters:				this.getState('upload_filters') || false,
					multi_selection:		this.getState('upload_multi_selection'),
					max_file_count: 		1
				}
			);
			this.uploader.bind('Init',				this.onInit.bind(this));
			// Active and non-active states
			var dropArea = $('#'+this.uploader.settings.drop_element);
			dropArea.bind('dragover',						this.onFileDragOver.bind(this));
			dropArea.bind('dragexit dragleave drop',		this.onDragOffDrop.bind(this));
			
			this.uploader.init();

			this.uploader.bind('FilesAdded',		this.onFilesAdded.bind(this));
			this.uploader.bind('UploadProgress',	this.onUploadProgress.bind(this));
			this.uploader.bind('Error',				this.onFileError.bind(this));
			this.uploader.bind('FileUploaded',		this.onFileUploaded.bind(this));

			
		},
		uploadFiles: function()
		{
			this.uploader.start();
		},
		onInit: function(uploader,params)
		{
			this.fireEvent('onInit',this,uploader,params);
		},
		onFilesAdded: function(uploader,files)
		{
			this.fireEvent('onFilesAdded',this,uploader,files);
		},
		onUploadProgress: function(uploader,file)
		{
			this.fireEvent('onUploadProgress',this,uploader,file);
		},
		onFileError: function(uploader,err)
		{
			this.fireEvent('onFileError',this,uploader,err);
		},
		onFileUploaded: function(uploader,file)
		{
			this.fireEvent('onFileUploaded',this,uploader,file);
		},
		onFileDragOver: function(uploader,file)
		{
			this.fireEvent('onFileDragOver',this,uploader,file);
		},
		onDragOffDrop: function(uploader,file)
		{
			this.fireEvent('onDragOffDrop',this,uploader,file);
		}

	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/application/Controller", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.application',
		$name:		'Controller',
		$extends:	'strappy.mvc.Controller',
		$abstract:	true,
		$requires:
		[
			'strappy.data.BTL'
		]
	}
)
(
	{},
	{
		events:
		{
			onStateReady:		true,
			onAPIReady:			true,
			onSharedMgrReady:	true,
			onReady:			true
		},
		_selfReady:		false,
		_stateReady:	false,
		_APIReady:		false,
		_sharedMgrReady:false,
		_rootNS:		null,
		
		BTL:			false,
		API:			null,
		sharedMgr:		null,
		
		onReady:		$JSKK.Class.ABSTRACT_METHOD,
		
		init: function()
		{
			this._rootNS=$JSKK.namespace(this.$reflect('namespace').split('.').first());
			
			this.init.$parent();
			this.cmp().observe('onReadyState',this.onReadyState.bind(this));
			
			if (Object.isString(this.BTL))
			{
				this.observeOnce
				(
					'onAPIReady',
					function()
					{
						this.initSharedMgr();
					}
				);
				this.initAPI();
			}
			else
			{
				this.initSharedMgr();
			}
			
			$JSKK.when
			(
				function()
				{
					return (this._stateReady && this._APIReady && this._sharedMgrReady);
				}.bind(this)
			).isTrue
			(
				function()
				{
					this._selfReady=true;
					this.fireEvent('onReady',this);
					this.onReady();
				}.bind(this)
			);
		},
		onReadyState: function()
		{
			this._stateReady=true;
		},
		initAPI: function()
		{
			this.API=new strappy.data.BTL({url:this.BTL});
			this.API.onReady
			(
				function()
				{
					this._rootNS.BTL	=this.API;
					this._rootNS.API	=this.API.API;
					this._APIReady		=true;
					this.fireEvent('onAPIReady',this,this.API);
				}.bind(this)
			);
		},
		initSharedMgr: function()
		{
			this.sharedMgr=new strappy.ShareMgr(this,this._rootNS);
			this._sharedMgrReady=true;
			this.fireEvent('onSharedMgrReady',this,this.sharedMgr);
			return this;
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/controller/Router", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.controller',
		$name:		'Router',
		$extends:	'strappy.mvc.Controller'
	}
)
(
	{},
	{
		routes:[],
		init: function()
		{
			this.init.$parent();
			this.getView('Structure').observe('onReady',this.onViewReady.bind(this));
		},
		onViewReady: function()
		{
			$('body').on('click','[data-strappy-route]',null,this.onClickableRoute.bind(this));
		},
		onClickableRoute: function(event)
		{
			var path=$(event.currentTarget).data('strappy-route');
			console.debug(path);
			if (Object.isString(path))
			{
				this.goTo(path);
			}
		},
		isValidRoute: function(path)
		{
			//TODO: Regex.
			return this.routes.inArray(path);
		},
		
		/**
		 * Used by everything except the state controller
		 * to set the "route".
		 */
		goTo: function(path)
		{
			this.getStore('State').set('p',path);
		},
		/**
		 * Used by the state controller to handle changes
		 * to the "p" state.
		 */
		routeTo: function(path)
		{
			$JSKK.when
			(
				function()
				{
					return this.getStore('State').get('structureReady');
				}.bind(this)
			).isTrue
			(
				function()
				{
					var	cmp			=this.getParentComponent(),
						nodes		=path.split('/'),
						first		=null,
						remainder	=null,
						name		=null,
						controller	=cmp._controllers,
						action		=null,
						args		=[];
					
					for (var i=0,j=nodes.length; i<j; i++)
					{
						first		=nodes[i].substring(0,1),
						remainder	=nodes[i].substring(1),
						name		=first.toUpperCase()+remainder;
						
						if (Object.isDefined(controller[name]))
						{
							controller	=controller[name];
							action		=nodes[++i];
							i++;
							while (nodes[i])
							{
								args.push(nodes[i]);
								i++;
							}
							controller[action].apply(controller,args);
							break;
						}
						else if (Object.isDefined(controller[nodes[i]]))
						{
							controller=controller[nodes[i]];
						}
						else
						{
							return;
						}
					}
				}.bind(this)
			);
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/container/Container", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container',
		$name:		'Container',
		$extends:	'strappy.Component'
	}
)
(
	{},
	{
		events:
		{
			onChildReady:	true
		},
		state:
		{
			'private':
			{
				attachTo:		null,
				ref:			null,
				cmp:			null,
				signalKey:		null,
				cls:			null,
				style:			null,
				autoShow:		true,
				scrollable:		true,
				children:		null,
				/**
				 * The type of layout for the container.
				 * 
				 * Supported layout types:
				 * 
				 * * Auto
				 * * Card
				 * * HTML
				 * 
				 * @cfg layout {String}
				 */
				layout:			'auto',
				activeCard:		null
			}
		},
		components:
		{
			
		},
		stores:
		[
			
		],
		views:
		[
			'Main'
		],
		controllers:
		[
			'Main',
			'AutoLayout',
			'CardLayout',
			'HTMLLayout'
		]
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/container/controller/Main", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'Main',
		$extends:	'strappy.mvc.Controller'
	}
)
(
	{},
	{
		layouts:	['auto','html','card'],
		onAfterCmpInit: function()
		{
			this.getView('Main').observe
			(
				'onReady',
				function()
				{
					this.cmp().setReady();
				}.bind(this)
			);
			
			// this.getView('Main').observe('onReady',this.onViewReady.bind(this));
		},
		onBeforeChange: function(state,key,value)
		{
			return true;
		},
		onViewReady: function(view)
		{
			this.setViewReadyState(view.$reflect('name'));
			
			if (this.hasValidLayout())
			{
				this.setReady();
			}
			else
			{
				console.trace();
				throw new Error('Container has been configured with an invalid layout.');
			}
		},
		hasValidLayout: function()
		{
			return this.layouts.inArray(this.getState('layout'));
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/container/controller/AutoLayout", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'AutoLayout',
		$extends:	'strappy.mvc.Controller',
		$uses:
		[
			'strappy.ccl.trait.Containable'
		]
	}
)
(
	{},
	{
		onAfterCmpInit: function()
		{
			if (this.getState('layout')=='auto')
			{
				if (this.getState('autoShow'))
				{
					this.getView('Main').getContainer().show();
				}
				this.initChildren();
			}
		},
		onSignalShow: function()
		{
			this.getView('Main').getContainer().show();
		},
		onSignalHide: function()
		{
			this.getView('Main').getContainer().hide();
		}
		// onSignalShow: function()
		// {
		// 	var view=this.getView('Main');
		// 	if (this.getState('relativeWrapper'))
		// 	{
		// 		view.getContainer().parent().show();
		// 	}
		// 	view.getContainer().show();
		// },
		// onSignalHide: function()
		// {
		// 	var view=this.getView('Main');
		// 	if (this.getState('relativeWrapper'))
		// 	{
		// 		view.getContainer().parent().hide();
		// 	}
		// 	view.getContainer().hide();
		// }
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/container/controller/CardLayout", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'CardLayout',
		$extends:	'strappy.mvc.Controller',
		$uses:
		[
			'strappy.ccl.trait.Containable'
		]
	}
)
(
	{},
	{
		cards:{},
		onAfterCmpInit: function()
		{
			if (this.getState('layout')=='card')
			{
				if (this.getState('autoShow'))
				{
					this.getView('Main').getContainer().show();
				}
				
				var	children	=this.getState('children'),
					activeCard	=this.getState('activeCard');
					
				this.cmp().observe
				(
					'onChildReady',
					function(childRef)
					{
						var	thisRef	=childRef.split('.').last(),
							cmp		=this.getCmp(thisRef),
							view	=null;
						if (thisRef==activeCard)
						{
							for (view in cmp._views)
							{
								cmp._views[view].getContainer().show();
							}
						}
						else
						{
							for (view in cmp._views)
							{
								cmp._views[view].getContainer().hide();
							}
						}
					}
				);
				this.initChildren();
			}
		},
		onSwitchInstruction: function(signal)
		{
			this.showCard(signal.getBody().card);
		},
		hideAllChildComponents: function()
		{
			var components=this.getParentComponent().components;
			for (var ref in components)
			{
				this.hideChildComponent(ref);
			}
		},
		showCard: function(ref)
		{
			this.setState('activeCard',ref);
			var	view	=null;
			
			this.cmp().eachChildCmp
			(
				function(cmp,thisCardRef)
				{
					if (ref==thisCardRef)
					{
						for (view in cmp._views)
						{
							cmp._views[view].getContainer().show();
						}
					}
					else
					{
						for (view in cmp._views)
						{
							cmp._views[view].getContainer().hide();
						}
					}
				}
			);
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/container/controller/HTMLLayout", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'HTMLLayout',
		$extends:	'strappy.mvc.Controller'
	}
)
(
	{},
	{
		onAfterCmpInit: function()
		{
			if (this.getState('layout') === 'html')
			{
				this.cmp().observe('onStateChange',this.redraw.bind(this));
				this.redraw();
				this.getView('Main').show();
			}
		},
		redraw: function()
		{
			this.getView('Main').getContainer().html('').append(this.getState('html'));
		},
		onChangeCard: function(signal)
		{
			
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/container/view/Main", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.view',
		$name:		'Main',
		$extends:	'strappy.mvc.View',
		$uses:
		[
			'strappy.ccl.trait.Scrollable'
		],
	}
)
(
	{},
	{
		templates:
		{
			
		},
		// appliedWrapper:	false,
		onAfterCmpInit: function()
		{
			this.getContainer().addClass(this.getState('cls'));
			this.getContainer().addClass(this.getState('layout'));
			if (this.getState('style'))
			{
				this.getContainer().css(this.getState('style'));
			}
			if (this.getState('scrollable'))
			{
				this.getContainer().addClass('jspscroll');
			}
			// if (this.getState('relativeWrapper'))
			// {
			// 	this.getContainer().append($('<div class="relative-wrapper" style="display:none;"></div>'));
			// 	this.appliedWrapper=true;
			// }
		},
		bindDOMEvents: function()
		{
			
		},
		onModelLockChange: function(signal)
		{
			
		},
		syncView: function()
		{
			
		},
		// getContainer: function()
		// {
		// 	if (!this.appliedWrapper || !this.getState('relativeWrapper'))
		// 	{
		// 		return $('#'+this.getIID());
		// 	}
		// 	else
		// 	{
		// 		return $('#'+this.getIID()+' .relative-wrapper');
		// 	}
		// },
		getContainerSelector: function()
		{
			return '#'+this.getIID();
			
			// if (!this.appliedWrapper || !this.getState('relativeWrapper'))
			// {
			// 	return '#'+this.getIID();
			// }
			// else
			// {
			// 	return '#'+this.getIID()+' .relative-wrapper';
			// }
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/uploader/Uploader", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.uploader',
		$name:		'Uploader',
		$extends:	'strappy.Component'
	}
)
(
	{},
	{
		state:
		{
			'private':
			{
				html:							'',
				upload_runtimes:				'html5,flash,silverlight,gears,browserplus',
				upload_container:				null,//'plupload-container',
				upload_browse_button:			null,
				upload_max_file_size:			'500mb',
				// upload_resize:					{width : 320, height : 240, quality : 90},
				upload_url:						'/',
				upload_flash_swf_url:			'/lib/plupload/plupload.flash.swf',
				upload_silverlight_xap_url:		'/lib/plupload/plupload.silverlight.xap',
				upload_container: 				null,
				upload_drop_element: 			null, 
				upload_multi_selection: 		true,
				upload_filters:					null
			}
		},
		components:
		{
			
		},
		stores:
		[
			
		],
		views:
		[
			'Main'
		],
		controllers:
		[
			'Main'
		]
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/uploader/controller/Main", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.uploader.controller',
		$name:		'Main',
		$extends:	'strappy.mvc.Controller',
		$uses:
		[
			'strappy.ccl.trait.Pluploadable'
		]
	}
)
(
	{},
	{
		events:
		{
			onInit:				true,
			onFilesAdded:		true,
			onUploadProgress:	true,
			onError:			true,
			onFileUploaded:		true
		},
		uploader:	null,
		onAfterCmpInit: function()
		{
			var view=this.getView('Main');
			view.observe('onReady',this.onViewReady.bind(this));
			this.cmp().setReady();
		},
		onViewReady: function()
		{
			var view=this.getView('Main');
			view.syncView();
//			view.show();
			if (Object.isNull(this.getState('upload_container')))
			{
				this.setState('upload_container',this.getIID());
			}
			this.initUploader();
		},
		onSignalShow: function()
		{
			this.getView('Main').show();
		},
		onSignalHide: function()
		{
			this.getView('Main').hide();
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/component/uploader/view/Main", ["strappy/Strappy"], function() {
      return (function() {
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.uploader.view',
		$name:		'Main',
		$extends:	'strappy.mvc.View'
	}
)
(
	{},
	{
		templates:
		{
			
		},
		onAfterCmpInit: function()
		{
			
			
		},
		bindDOMEvents: function()
		{
			this.bindDOMEvent
			(
				'click',
				'#'+this.getState('upload_upload_button'),
				'controller:Main',
				'uploadFiles'
			);
		},
		syncView: function()
		{
			this.getContainer().html('')
				.append(this.getState('html'));
		}
	}
);      }).apply(root, arguments);
    });
}(this));

(function(root) {
define("strappy/ccl/main", ["strappy/Strappy"], function() {
      return (function() {
requirejs.config
(
	{
		// paths
		// {
		// 	'strappy.ccl':	
		// }
	}
);
define
(
	'strappy/ccl',
	[
		'./CCL',
		'./trait/Containable',
		'./trait/Animatable',
		'./trait/Pluploadable',
		'./component/application/Controller',
		'./controller/Router',
		'./component/container/Container',
		'./component/container/controller/Main',
		'./component/container/controller/AutoLayout',
		'./component/container/controller/CardLayout',
		'./component/container/controller/HTMLLayout',
		'./component/container/view/Main',
		'./component/uploader/Uploader',
		'./component/uploader/controller/Main',
		'./component/uploader/view/Main'
	]
);      }).apply(root, arguments);
    });
}(this));

