$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'ShareMgr'
	}
)
(
	{},
	{
		rootNS:	null,
		init: function(parentCmp,rootNS)
		{
			this.parentCmp	=parentCmp;
			this.rootNS		=rootNS;
			if (Object.isDefined(this.rootNS.shared))
			{
				//Stores
				if (Object.isDefined(this.rootNS.shared.store))
				{
					for (var store in this.rootNS.shared.store)
					{
						if (!Object.isFunction(this.rootNS.shared.store[store].$reflect))
						{
							this.rootNS.shared.store[store]=new this.rootNS.shared.store[store](this.parentCmp);
						}
					}
				}
			}
		}
	}
);