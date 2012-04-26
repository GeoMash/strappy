$JSKK.Trait.create
(
	{
		$namespace:	'framework.trait',
		$name:		'Transactable'
	}
)
(
	{
		beginTransaction: function()
		{
			var transaction=new framework.Transaction(this);
			transaction.start();
			
			return transaction;
		}
	}
);