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
		component:		null,
		items:			[],
		processPointer:	-1,
		length:			0,
		complete:		0,
		
		init: function(component)
		{
			if (Object.isDefined(component))
			{
				this.component=component;
			}
			else
			{
				console.warn('You should provide the parent component to the InitQueue constructor'
							+' otherwise initalized child components could be unreferencable.');
			}
		},
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
			if (!this.execute.length) {
				return;
			}
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
				this.items[this.processPointer].ref=new this.items[this.processPointer].ref();
			}
			cmp=this.items[this.processPointer].ref;
			if (Object.isDefined(this.component) && !Object.isNull(this.component)
			&& Object.isUndefined(this.component.components[this.items[this.processPointer].name]))
			{
				this.component.components[this.items[this.processPointer].name]=cmp;
			}
			// else
			// {
			// 	throw new Error('Attempted to initalize a queued item but the component already has a');
			// }
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
								this.items[this.processPointer].callback();
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