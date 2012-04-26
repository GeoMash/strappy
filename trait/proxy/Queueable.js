/**
 * @class framework.trait.proxy.Ajax
 * 
 * This trait is designed to be used in combination with any proxy.
 * 
 * 
 * 
 * 
 * @abstract
 */
$JSKK.Trait.create
(
	{
		$namespace:	'framework.trait.proxy',
		$name:		'Queueable'
	}
)
(
	{},
	{
		initQueue: function()
		{
			
			this.nextTID		=0;
			this.transactions	=[];
		},
		createTransaction: function()
		{
			
		}
	}
)