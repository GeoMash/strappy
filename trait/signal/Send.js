$JSKK.Trait.create
(
	{
		$namespace:	'framework.trait.signal',
		$name:		'Send'
	}
)
(
	{
		sendSignal: function(name,body,type,filter)
		{
			console.debug(this.$reflect('namespace')+'.'+this.$reflect('name'),':: sendSignal(trait) :: ',name);
			if (!Object.isEmpty(name))
			{
				return this.getRadioTower().fireEvent
				(
					name,
					new framework.Signal
					(
						{
							name:	name,
							body:	body,
							type:	type,
							filter:	filter
						}
					)
				);
			}
			else
			{
				throw new Error('Class '+this.$reflect('name')+' attempted to fire an empty signal.');
			}
		}
	}
);