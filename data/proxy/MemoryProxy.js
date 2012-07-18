/**
 * @class strappy.data.proxy.MemoryProxy
 * 
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.proxy',
		$name:		'MemoryProxy',
		$extends:	strappy.data.proxy.AbstractProxy
	}
)
(
	{},
	{
		/**
		 * Typically used by other utility classes to perform abstract
		 * requests.
		 * @return {Mixed}
		 */
		raw: function(config)
		{
			this._onDone(config);
		},
		sync: function(config)
		{
			this._onDone(config);
		},
		/**
		 * @private
		 * @return {void}
		 */
		_onDone: function(config)
		{
			(config.onSuccess || $JSKK.emptyFunction)({});
		}
	}
)