/**
 * @class strappy.data.proxy.AbstractProxy
 * 
 * 
 * 
 * 
 * 
 * 
 * @abstract
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.data.proxy',
		$name:		'AbstractProxy',
		$abstract:	true,
		$uses:
		[
			$JSKK.trait.Configurable,
			$JSKK.trait.Observable
		]
	}
)
(
	{},
	{
		/**
		 * @cfg {String} url The URL to assocate with this prxy.
		 */
		config:
		{
			url:	''
		},
		/**
		 * @property events A list of observable events.
		 * @property events.onBeforeRequest Fired before any request is made.
		 * @private
		 */
		events:
		{
			onBeforeRequest: true
		},
		/**
		 * Typically used by other utility classes to perform abstract
		 * requests.
		 * @return {Mixed}
		 */
		raw: $JSKK.Class.ABSTRACT_METHOD,
		/**
		 * @private
		 * @return {void}
		 */
		_onDone: $JSKK.Class.ABSTRACT_METHOD
	}
)