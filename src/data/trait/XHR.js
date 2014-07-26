/**
 * @class strappy.data.trait.XHR
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'strappy.data.trait',
		$name:		'XHR'
	}
)
(
	{
		xhr: function(conf)
		{
			var config=Object.clone(this.xhrConfig);
			if (Object.isUndefined(conf))
			{
				conf={};
			}
			if (Object.isDefined(config) && !Object.isNull(config))
			{
				config=Object.extend(config,conf);
			}
			else
			{
				config=Object.clone(conf);
			}
			
			$.ajax(config)
			.done(config.onSuccess || $JSKK.emptyFunction)
			.fail(config.onFailure || $JSKK.emptyFunction);
		}
	}
);