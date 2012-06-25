/**
 * @class framework.trait.signal.Bindable
 * 
 * @abstract
 */
 $JSKK.Trait.create
(
	{
		$namespace:	'framework.trait.signal',
		$name:		'Bindable'
	}
)
(
	{
		/**
		 * 
		 */
		bindStatefulClick: function()
		{
			var links=$JSKK.toArray(arguments);
			$JSKK.when(this,'_ready').isTrue
			(
				function()
				{
					var item=null;
					for (var i=0,j=links.length; i<j; i++)
					{
						// check if the passed selector is in fact for the container
						var	container	=this.getContainer(),
							linkEl		=$(links[i][0])
						if (linkEl[0] == container[0])
						{
							item=linkEl;
						}
						else
						{
							item=$(links[i][0],container);
						}
						if (item.length)
						{
							this.getStateMgr().registerStateChanger(item,links[i][1]);
						}
					}
				}.bind(this)
			);
			return this;
		},
		/**
		 * 
		 */
		bindStateChanges: function(bindings)
		{
			if (Object.isUndefined(this._stateBindings))
			{
				this._stateBindings={};
			}
			for (var item in bindings)
			{
				if (Object.isFunction(this[bindings[item]]))
				{
					this._stateBindings[item]=this[bindings[item]].bind(this);
				}
				else
				{
					throw new Error('Unable to bind state change event for stateful property "'+item+'" because the method "'+bindings[item]+'" '
									+'has not been defined on view class "'+this.$reflect('namespace')+'.'+this.$reflect('name')+'');
				}
			}
			return this;
		},
		/**
		 * 
		 */
		onStateChange: function(store,key,value)
		{
			if (Object.isUndefined(this._stateBindings))
			{
				this._stateBindings={};
			}
			if (Object.isFunction(this._stateBindings[key]))
			{
				this._stateBindings[key](value);
			}
		}
	}
);