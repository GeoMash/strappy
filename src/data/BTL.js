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
			$JSKK.trait.Configurable,
			$JSKK.trait.Observable
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
			proxy:		strappy.data.proxy.BTL
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
);