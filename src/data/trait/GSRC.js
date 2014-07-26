/**
 * @class strappy.data.trait.CRUDable
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'strappy.data.trait',
		$name:		'GSRC',
		$uses:
		[
			'strappy.data.trait.BuildParams',
			'strappy.data.trait.XHR'
		]
	}
)
(
	{
		/*
		config:
		{
			get:		'',
			set:		'',
			remove:		'',
			check:		'',
			params:		{}
		},
		*/
		set: function(request)
		{
			this.xhr
			(
				{
					url:		this.config.set,
					data:		this.buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		},
		get: function(request)
		{
			this.xhr
			(
				{
					url:		this.config.get,
					data:		this.buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		},
		remove: function(request)
		{
			this.xhr
			(
				{
					url:		this.config.remove,
					data:		this.buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		},
		check: function(request)
		{
			this.xhr
			(
				{
					url:		this.config.check,
					data:		this.buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		}
	}
);