/**
 * @class strappy.mvc.ViewCache
 * 
 * This is a private, internally used class.
 * You should not need to use this class directly.
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:		'strappy.mvc',
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
			if (window.localStorage)
			{
				window.localStorage.setItem(String(ref),String(value));
			}
			else
			{
				this.cache[String(ref)]=String(value);
			}
			return this;
		},
		get: function(ref)
		{
			if (window.localStorage)
			{
				return window.localStorage.getItem(String(ref));
			}
			else
			{
				return this.cache[String(ref)] || null;
			}
		},
		exists: function(ref)
		{
			return !Object.isNull(this.get(String(ref)));
		},
		setFetching: function(ref)
		{
			this.set(String(ref),strappy.mvc.ViewCache.FETCHING);
			return this;
		},
		isFetching: function(ref)
		{
			return (this.get(String(ref))===strappy.mvc.ViewCache.FETCHING)
		},
		empty: function()
		{
			if (window.localStorage)
			{
				window.localStorage.clear()
			}
			else
			{
				delete this.cache;
				this.cache={};
			}
		}
	}
);