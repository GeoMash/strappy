/**
 * @class strappy.data.trait.BuildParams
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'strappy.data.trait',
		$name:		'BuildParams'
	}
)
(
	{
		buildParams: function(request)
		{
			var params={};
			if (Object.isDefined(this.config.params))
			{
				params=Object.clone(this.config.params);
			}
			Object.extend(params,request.data);
			return params;
		}
	}
);