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
			$JSKK.trait.Configurable
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
		get: function(config)
		{
			if (Object.isUndefined(config.method))
			{
				method='POST';
			}
			$.get
			(
				{
					method:		'POST',
					url:		this.config.url,
					data:		config.filter || {}
				}
			)
			.done
			(
				function(response)
				{
					if (response.success)
					{
						(config.onSuccess || $JSKK.emptyFunction)(response.data,response.message);
					}
					else
					{
						(config.onFailure || $JSKK.emptyFunction)(response.message);
					}
				}
			)
			.fail(config.onFailure || $JSKK.emptyFunction);
		},
		/**
		 * 
		 */
		sync: function(config)
		{
			$.ajax
			(
				{
					type:	'POST',
					url:	this.config.url,
					data:	config.data || {}
				}
			)
			.done
			(
				function(response)
				{
					if (response.success)
					{
						(config.onSuccess || $JSKK.emptyFunction)(response.data,response.message);
					}
					else
					{
						(config.onFailure || $JSKK.emptyFunction)(response.message);
					}
				}
			)
			.fail(config.onFailure || $JSKK.emptyFunction);
		}
	}
)