/**
 * @class framework.data.proxy.MemoryProxy
 * 
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'framework.data.proxy',
		$name:		'MemoryProxy',
		$extends:	framework.data.proxy.AbstractProxy
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
		/**
		 * @private
		 * @return {void}
		 */
		_onDone: function(config)
		{
			(config.onSuccess || $JSKK.emptyFunction)();
		}
	}
)