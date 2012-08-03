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
			$JSKK.trait.Configurable
		]
	}
)
(
	{
		APIMethod: function(call,data,query,callback)
		{
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
					onComplete: function(response)
					{
						if (Object.isFunction(callback))callback(response);
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
			url:	'',
			/**
			 * @cfg proxy
			 */
			proxy:	strappy.data.proxy.BTL
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
		/**
		 * 
		 */
		init: function()
		{
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