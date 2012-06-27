/**
 * @class strappy.data.proxy.DummyProxy
 * 
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.proxy',
		$name:		'DummyProxy',
		$extends:	strappy.data.proxy.MemoryProxy
	}
)
(
	{},
	{
		/**
		* The default resolver tries to match a dataSet item with an id property to the request's id parameter
		*/
		defaultResolver: function(request, item)
		{
			return typeof request.data.id !== 'undefined' && typeof item.id !== 'undefined' && item.id == request.data.id;
		},

		init: function()
		{
			if(!this.config.resolver)
			{
				this.config.resolver = this.defaultResolver;
			}
		},

		/**
		*
		*/
		get: function(config)
		{
			config.url=this.config.url;
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				this.handleRequest
				(
					{
						type:		config.method,
						url:		config.url,
						data:		config.filter || {}
					},
					this._onDone.bind(this,config)
				);
			}
		},

		handleRequest: function(request, successCallback)
		{
			var response =
			{
				"success":	true,
				"data":		[]
			};
			
			$.each(this.config.dataSet, function(idx, item)
			{
				if(this.config.resolver(request, item))
				{
					response.data.push(item);
				}
			}.bind(this));

			successCallback(response);
		},

		/**
		* @private
		* @return {void}
		*/
		_onDone: function(config, response)
		{
			(config.onSuccess || $JSKK.emptyFunction)(response);
		}
	}
);