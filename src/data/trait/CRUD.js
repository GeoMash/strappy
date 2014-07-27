/**
 * @class strappy.data.trait.CRUD
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'strappy.data.trait',
		$name:		'CRUD',
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
			create:		'',
			read:		'',
			upsert:		'',
			destroy:	'',
			params:		{}
		},
		*/
		create: function(request)
		{
			this.xhr
			(
				{
					url:		this.config.create,
					data:		this.buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		},
		read: function(request)
		{
			this.xhr
			(
				{
					url:		this.config.read,
					data:		this.buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		},
		upsert: function(request)
		{
			this.xhr
			(
				{
					url:		this.config.upsert,
					data:		this.buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		},
		destroy: function(request)
		{
			this.xhr
			(
				{
					url:		this.config.destroy,
					data:		this.buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		}
	}
);