$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.proxy',
		$name:		'REST',
		$extends:	'strappy.data.proxy.AbstractProxy'
	}
)
(
	{},
	{
		config:
		{
			url:	'',
			params:	''
		},
		init: function()
		{
			if (Object.isAssocArray(this.config.params))
			{
				this.config.params=Object.toQueryString(this.config.params);
			}
		},
		/**
		 * Sends a raw request to the server as JSON.
		 * @param config An object containing configuration for the request. 
		 * @param config.url The url to send the request to.
		 * @param config.data The data which will be converted to a JSON string and sent
		 * with the request.
		 * @return {strappy.data.proxy.REST} this
		 */
		raw: function(config)
		{
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				var seen=[];
				$.ajax
				(
					{
						type:			'POST',
						processData:	false,
						url:			this.config.url+'?'+this.config.params,
						data:			config.data
					}
				)
				.done(this._onDone.bind(this,config))
				.fail(config.onFailure || $JSKK.emptyFunction);
			}
			return this;
		},
		sync: function(config)
		{
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				
				$.ajax
				(
					{
						type:	'POST',
						url:	this.config.url+'?'+this.config.params,
						data:	config.data || {}
					}
				)
				.done(this._onDone.bind(this,config))
				.fail(config.onFailure || $JSKK.emptyFunction);
			}
		},
		_onDone: function(config,response)
		{
			if (response.success)
			{
				(config.onSuccess || $JSKK.emptyFunction)(response);
			}
			else
			{
				(config.onFailure || $JSKK.emptyFunction)(response);
			}
		}
	}
)