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
		_buildParams: function(request)
		{
			var params={};
			if (Object.isDefined(this.config.params))
			{
				params=Object.clone(this.config.params);
			}
			params=Object.extend(params,request.data);
			return params;
		},
		create: function(request)
		{
			this.xhr
			(
				{
					url:		this.config.create,
					data:		this._buildParams(request),
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
					data:		this._buildParams(request),
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
					url:		this.config.update,
					data:		this._buildParams(request),
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
					data:		this._buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		}
	}
);