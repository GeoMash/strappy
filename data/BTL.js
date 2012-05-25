/**
 * @class framework.data.BTL
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
		$namespace:	'framework.data',
		$name:		'BTL',
		$uses:
		[
			$JSKK.trait.Configurable
		]
	}
)
(
	{
		APIMethod: function(call,params,callback)
		{
			this.proxy.raw
			(
				{
					url:		this.config.url,
					data:
					{
						call:	call,
						data:	params
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
			url:	'',
			proxy:	framework.data.proxy.BTL
		},
		ready:			false,
		proxy:			null,
		API:			{},
		queue:			null,
//		transaction:	null,
		init: function()
		{
			this.proxy=new this.config.proxy({url:this.config.url});
			this.getServiceAPI();
		},
		onReady: function(callback)
		{
			$JSKK.when(this,'ready').isTrue(callback);
		},
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
		setProxy: function(proxy,url)
		{
			this.proxy=new this.config.proxy({url:(url || this.config.url)});
			return this;
		},
		bindType: function(record,type)
		{
			record['_type']=type;
			return this;
		},
		startQueue: function()
		{
			this.queue=new framework.data.Queue();
			this.queue.attachProxy(this.proxy);
			return this;
		},
		executeQueue: function()
		{
			this.queue.execute();
			return this;
		}
//		startTransaction: function()
//		{
//			this.transaction=new framework.data.Transaction();
//			this.transaction.start();
//		},
//		executeTransaction: function()
//		{
//			this.transaction.execute
//			(
//				{
//					
//				}
//			);
//		},
//		commitTransaction: function()
//		{
//			
//		}
	}
);

//var	args		=$JSKK.toArray(arguments),
//	keyVals		={},
//	transaction	=new framework.data.Transaction();
//if (Object.isDefined(args[1]))
//{
//	keyVals[args.shift()]=args.shift();
//}
//else
//{
//	keyVals=args.shift();
//}
//transaction.start();
//var	thisModel	=null,
//	field		=null;
//for (field in keyVals)
//{
//	for (var i=0,j=this.records.length; i<j; i++)
//	{
//		thisModel=transaction.attachModel(this.records[i]);
//		thisModel.set(field,keyVals[field]);
//	}
//}
//transaction.execute
//(
//	{
//		onSuccess:	function()
//		{
//			transaction.commit();
//			this.fireEvent('onChange',this);
//		}.bind(this),
//		onFailure: function()
//		{
//			transaction.rollback();
//		}
//	}
//);
//return this;