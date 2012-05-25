/**
 * @class framework.data.Queue
 * 
 * This class is used by other data communication classes
 * to provide a means to queue up requests via proxies.
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
	{},
	{
		/**
		 * @property proxies Contains a list of attached proxies.
		 * @private
		 */
		proxies:		[],
		/**
		 * @property requests Contains a list of captured requests.
		 * @private
		 */
		requests:		{},
		/**
		 * @property executing A flag to determin weather or not the queued items are being run or not.
		 * @private
		 */
		executing:		false,
		/**
		 * @property nextSequence Incremental sequencing number.
		 * @private
		 */
		nextSequence:	1,
		/**
		 * This method attaches a proxy to the queue object. Any request
		 * the proxy makes will be intercepted and stored in the request queue
		 * until the {@link framework.data.Queue.execute() execute} method is called.
		 * @param {framework.data.proxy.AbstractProxy} proxy 
		 * @return {framework.data.Queue} this
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
		 * Executes the queue, running all queued requests as a single batched request.
		 * 
		 * @return {framework.data.Queue} this
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
							timestamp:	this.requests[url][i].timestamp
						}
					);
				}
				
				this.requests[url][0].proxy.raw
				(
					{
						data:		requests,
						onSuccess:	this.__onDone.bind(this),
						onFailure:	this.__onDone.bind(this),
						onComplete:	this.__onDone.bind(this)
					}
				);
			}
			return this;
		},
		/**
		 * 
		 * @private 
		 */
		__onDone: function(response)
		{
			var request=null;
			for (var i=0,j=response.length; i<j; i++)
			{
				request=this.getRequest(response[i].sequence);
				if (response[i].success)
				{
					if (Object.isFunction(request.onComplete))	request.onComplete(response[i].data);
					if (Object.isFunction(request.onSuccess))	request.onSuccess(response[i].data);
				}
				else
				{
					if (Object.isFunction(request.onComplete))	request.onComplete(response[i].data);
					if (Object.isFunction(request.onFailure))	request.onFailure(response[i].data);
				}
			}
		},
		/**
		 * Pushes a raw request object into the queue.
		 * 
		 * @param {Object} request A raw request object. Note that this must
		 * also include a "url" property.
		 * 
		 * @return {framework.data.Queue} this
		 */
		push: function(request)
		{
			this.requests[request.url].push(request);
			delete request.url;
			return this;
		},
		/**
		 * Fetches a request based on its assigned sequence number.
		 * 
		 * @param {Number} sequence The sequence number for the request.
		 * @return {Mixed} The request object if found, or null.
		 */
		getRequest: function(sequence)
		{
			for (var url in this.requests)
			{
				for (var i=0,j=this.requests[url].length; i<j; i++)
				{
					if (this.requests[url][i].sequence==sequence)
					{
						return this.requests[url][i];
					}
				}
			}
			return null;
		}
	}
);