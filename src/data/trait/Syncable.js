/**
 * @class strappy.data.trait.Syncable
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'strappy.data.trait',
		$name:		'Syncable',
		$uses:
		[
			'strappy.data.trait.BuildParams',
			'strappy.data.trait.XHR'
		]
	}
)
(
	{
		sync: function(conf)
		{
			this.xhr
			(
				{
					url:		this.config.sync,
					data:		this._buildParams(request),
					onSuccess:	request.onSuccess,
					onFailure:	request.onFailure
				}
			);
		}
	}
);