/**
 * @class framework.data.proxy.Ajax
 * 
 * 
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
		$name:		'Ajax',
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
		get: function(config)
		{
			config.url=this.config.url;
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				if (Object.isUndefined(config.method))
				{
					config.method='POST';
				}
				$.get
				(
					{
						type:		config.method,
						url:		config.url,
						data:		config.filter || {}
					}
				)
				.done(this._onDone.bind(this,config))
				.fail(config.onFailure || $JSKK.emptyFunction);
			}
		},
		/**
		 * 
		 */
		sync: function(config)
		{
			config.url=this.config.url;
			if (this.fireEvent('onBeforeRequest',this,config)!==false)
			{
				$.ajax
				(
					{
						type:	'POST',
						url:	config.url,
						data:	config.data || {}
					}
				)
				.done(this._onDone.bind(this,config))
				.fail(config.onFailure || $JSKK.emptyFunction);
			}
		},
		/**
		 * 
		 */
		raw: function(config)
		{
			console.debug('RAW DATA:',$.stringify(config.data));
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
				.fail(config.onFailure || $JSKK.emptyFunction);
			}
		},
		/**
		 * 
		 * @private
		 */
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