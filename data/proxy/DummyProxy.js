/**
 * @class framework.data.proxy.MemoryProxy
 * 
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'framework.data.proxy',
		$name:		'DummyProxy',
		$extends:	framework.data.proxy.MemoryProxy
	}
)
(
	{},
	{
		dataSet: [],

		resolver: $JSKK.emptyFunction,

		init: function(dataSet, resolver)
		{
			this.dataSet = dataSet === null ?	[]	:	dataSet;
			this.resolver = resolver === null ?	[]	:	resolver;
		},

		/**
		 *
		 */
		get: function(config)
		{
			config.url=this.config.url;
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				this.resolve
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

		resolve: function(request, successCallback)
		{
			var response = 
			{
				"success":	true,
				"data":		[]
			};
			$.each(this.dataSet, function(idx, item)
			{
				if(this.resolver !== $JSKK.emptyFunction && this.resolver(request, item)) 
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