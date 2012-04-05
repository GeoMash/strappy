$JSKK.Class.create
(
	{
		$namespace:	'framework.mvc',
		$name:		'Model',
		$uses:
		[
			framework.trait.ComponentConnector,
			framework.trait.signal.Send
		]
	}
)
(
	{},
	{
		data:		[],
		proxy:		null,
		
		
        getRecord: function(index)
		{
			return this.data[index];
		},

        setRecord: function(index,data)
		{
			data.id=this.data[0].id;
			this.data[index]=data;
			this.sendSignal('view.change',data);
		},
		get: function(key)
		{
			var	parts	=key.split('.'),
				object	=this.data;
			for (var i=0,j=parts.length; i<j; i++)
			{
				if (Object.isDefined(object[parts[i]]))
				{
					object=object[parts[i]];
				}
				else
				{
					return null;
				}
			}
			return object;
		},
		set: function(key,value)
		{
			var	parts	=key.split('.'),
				object	=this.data;
			for (var i=0,j=parts.length; i<j; i++)
			{
				if (i+1==j)
				{
					object[parts[i]]=value;
					break;
				}
				if (Object.isDefined(object[parts[i]]))
				{
					object=object[parts[i]];
				}
				else
				{
					if (i+1!=j)
					{
						object[parts[i]]={};
						object=object[parts[i]];
					}
				}
			}
			console.debug('ID:',this.getID());
			this.sendSignal(framework.Signal.MODEL_DONE_CHANGE,{name:this.getID()});
			return this;
		},
		each: function(callback)
		{
			this.data.each(callback);
		},
		add: function(record)
		{
			this.data.push(record);
			this.sendSignal(framework.Signal.MODEL_DONE_CHANGE,{name:this.getID()});
		},
		remove: function(record)
		{
			var newData=[];
			for (var i=0,j=this.data.length; i<j; i++)
			{
				if (this.data[i]!=record)
				{
					newData.push(this.data[i]);
				}
			}
			this.data=newData;
			this.sendSignal(framework.Signal.MODEL_DONE_CHANGE,{name:this.getID()});
		}
	}
);