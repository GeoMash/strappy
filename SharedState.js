/**
 * @class strappy.SharedState
 * 
 * 
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'SharedState',
		$extends:	strappy.data.stateful.Store
	}
)
(
	{},
	{
		// init: function()
		// {
		// 	this.init.$parent();
			
			
			
		// }
		
		set: function()
		{
			if (this.lockState==strappy.data.stateful.Store.LOCK_NONE)
			{
				var	args		=$JSKK.toArray(arguments),
					keyVals		={},
					mapping		=null,
					updateState	=false,
					newState	={};
				if (Object.isDefined(args[1]))
				{
					keyVals[args.shift()]=args.shift();
				}
				else
				{
					keyVals=args.shift();
				}
				for (var key in keyVals)
				{
					if (Object.isUndefined(this.record.fields[strappy.data.stateful.Store.ACCESS_PRIVATE][key]))
					{
						this.record.fields[strappy.data.stateful.Store.ACCESS_PRIVATE][key]=null;
					}
					if (this.fireEvent('onBeforeChange',this,key,keyVals[key])!==false)
					{
						this.record.record[strappy.data.stateful.Store.ACCESS_PRIVATE][key]=keyVals[key];
						this.fireEvent('onChange',this,key,keyVals[key]);
					}
				}
			}
			else
			{
				throw new Error('Store "'+this.$reflect('name')+'" is in lock state "'+this.lockState+'" and so cannot be modified.');
			}
		},
		get: function(key)
		{
			return this.record.record[strappy.data.stateful.Store.ACCESS_PRIVATE][key];
		}
	}
);