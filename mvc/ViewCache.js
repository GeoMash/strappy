/**
 * @class framework.mvc.ViewCache
 * 
 * TODO:
 * 
 * Explanation & Examples.
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework.mvc',
		$name:			'ViewCache'
	}
)
(
	{
		FETCHING:	'~*~FETCHING~*~'
	},
	{
		cache:	{},
		set: function(ref,value)
		{
			this[String(ref)]=String(value);
			return this;
		},
		get: function(ref)
		{
			return this[String(ref)] || '';
		},
		exists: function(ref)
		{
			return Object.isDefined(this[String(ref)]);
		},
		setFetching: function(ref)
		{
			this[String(ref)]=framework.mvc.ViewCache.FETCHING;
			return this;
		},
		isFetching: function(ref)
		{
			return (this[String(ref)]===framework.mvc.ViewCache.FETCHING)
		}
	}
);