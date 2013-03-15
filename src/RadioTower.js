/**
 * @class strappy.RadioTower
 * This is a special container class which leverages $JSKK's
 * Observable trait to handle registering signal callbacks
 * and distributing signals.
 * 
 * You should not need to ever interface with this class
 * directly.
 * 
 * @singleton
 * @mixins $JSKK.trait.Observable
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'RadioTower',
		$uses:
		[
			$JSKK.trait.Observable
		]
	}
)
(
	{},
	{
		/**
		 * @property events A container for holding registered signals.
		 * @private
		 */
		events:{}
	}
);