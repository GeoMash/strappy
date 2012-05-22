/**
 * @class framework.data.proxy.BTL
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
		$namespace:	'framework.data.proxy',
		$name:		'BTL',
		$uses:
		[
			$JSKK.trait.Configurable,
			$JSKK.trait.Observable
		]
	}
)
(
	{},
	{
		config:
		{
			url:	''
		},
		events:
		{
			onBeforeRequest: true
		},
		raw: function(config)
		{
			config.url=this.config.url;
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				$.ajax
				(
					{
						type:			'POST',
						contentType:	'application/json',
						processData:	false,
						url:			config.url,
						data:			$.stringify(config.data) || {}
					}
				)
				.done(this._onDone.bind(this,config))
				.fail
				(
					function(response)
					{
						console.warn('BTL Proxies raw() method hasn\'t been confiugred to deal with failures.');
//						config.onComplete();
					}
				);
			}
		},
		_onDone: function(config,response)
		{
			(config.onComplete || $JSKK.emptyFunction)(response);
		}
	}
)