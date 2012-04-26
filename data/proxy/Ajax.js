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
		get: function(url)
		{
			
		},
		sync: function(config)
		{
			$.ajax
			(
				{
//					dataType:	'json',
					method:		'GET',
					url:		this.config.url
				}
			).done
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
			.fail(config.onFailure || $JSKK.emptyFunction)
		}
	}
)