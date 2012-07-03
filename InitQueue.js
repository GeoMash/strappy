$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'InitQueue',
		$uses:
		[
			$JSKK.trait.Observable
		]
	}
)
(
	{},
	{
		events:
		{
			onItemReady:	true,
			onAllReady:		true
		},
		items:		[],
		
		processPointer:	-1,
		length:			0,
		complete:		0,
		
		add: function(name,ref,config,callback)
		{
			this.items.push
			(
				{
					name:		name,
					ref:		ref,
					config:		config,
					callback:	(callback || $JSKK.emptyFunction)
				}
			);
			this.length++;
			return this;
		},
		execute: function()
		{
			$JSKK.when(this,{object:'complete',value:this.length}).isEqualTo
			(
				function()
				{
					this.fireEvent('onAllReady',this.items);
				}.bind(this)
			);
			this.processNextItem();
		},
		processNextItem: function()
		{
			this.processPointer++;
			if (!Object.isFunction(this.items[this.processPointer].ref.$reflect))
			{
				cmp=new this.items[this.processPointer].ref();
			}
			else
			{
				cmp=this.items[this.processPointer].ref;
			}
			if (Object.isAssocArray(this.items[this.processPointer].config))
			{
				cmp.observeOnce
				(
					'onAfterInit',
					function(cmp)
					{
						cmp.getController('State').observeOnce
						(
							'onReadyState',
							function(pointer)
							{
								this.fireEvent('onItemReady',this.items[this.processPointer]);
								if (++this.complete!=this.length)
								{
									this.processNextItem();
								}
							}.bind(this,this.processPointer)
						);
					}.bind(this,cmp)
				);
				cmp.configure(this.items[this.processPointer].config);
			}
			else
			{
				this.complete++;
				this.processNextItem();
			}
		}
	}
)