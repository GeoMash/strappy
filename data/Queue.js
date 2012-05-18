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
		proxies:		[],
		requests:		{},
		executing:		false,
		nextSequence:	1,
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
							request.sequence=this.nextSequence++;
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
//				console.debug('PROXY',proxy);
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
					this.requests[url][i].timestamp=Date.parse(new Date());
					requests.push
					(
						{
							sequence:	this.requests[url][i].sequence,
							data:		this.requests[url][i].data,
							timestamp:	this.requests[url][i].timestampw
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
		},
		push: function(request)
		{
			this.requests[request.url].push(request);
			delete request.url;
			return this;
		}
	}
);