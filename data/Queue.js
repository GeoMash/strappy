/**
 * @class framework.data.Queue
 * 
 * 
 * @uses framework.mvc.Model
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework.data',
		$name:			'Queue'
	}
)
(
	{
	
	},
	{
		proxies:	[],
		requests:	{},
		executing:	false,
		nextRID:	1,
		/**
		 * 
		 */
		attachProxy: function(proxy)
		{
			if (!this.proxies.inArray(proxy))
			{
				this.proxies.push(proxy);
				proxy.observe
				(
					'onBeforeRequest',
					function(proxy,request)
					{
						if (this.executing)return true;
//						console.debug('onBeforeRequest',request);
						if (Object.isDefined(request.url))
						{
							if (Object.isUndefined(this.requests[request.url]))
							{
								this.requests[request.url]=[];
							}
							request.rid		=this.nextRID++;
							request.proxy	=proxy;
							if (!Object.isDefined(request.data))
							{
								request.data=null;
							}
							this.requests[request.url].push(request);
							delete request.url;
						}
						return false;
					}.bind(this)
				);
				console.debug('PROXY',proxy);
			}
			return this;
		},
		/**
		 * 
		 */
		execute: function()
		{
			this.executing	=true;
			var	url			=null,
				requests	=[];
			for (url in this.requests)
			{
				for (var i=0,j=this.requests[url].length; i<j; i++)
				{
					this.requests[url][i].ts=Date.parse(new Date());
					requests.push
					(
						{
							rid:	this.requests[url][i].rid,
							data:	this.requests[url][i].data,
							ts:		this.requests[url][i].ts
						}
					);
				}
				
				this.requests[url][0].proxy.raw
				(
					{
						data:		requests,
						onSuccess: function(response)
						{
							console.debug('Queue response:',response);
						},
						onFailure: function()
						{
							console.debug('Queue failed:',response);
						}
					}
				);
			}
		}
	}
);