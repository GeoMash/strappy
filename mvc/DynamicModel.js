/**
 * @class strappy.mvc.Model
 * 
 * 
 * @abstract
 * 
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.mvc',
		$name:		'DynamicModel',
		$extends:	strappy.mvc.Model
	}
)
(
	{},
	{
		init: function(record)
		{
			if (Object.isDefined(record))
			{
				this.record=Object.clone(this.fields);
				for (var field in record)
				{
					if (Object.isUndefined(this.fields[field]))
					{
						this.fields[field]=null;
					}
					this.record[field]=Object.clone(record[field]);
				}
			}
			else
			{
				for (var field in this.fields)
				{
					
					if (Object.isUndefined(this.fields[field]))
					{
						this.fields[field]=null;
					}
					this.record[field]=Object.clone(this.fields[field]);
				}
			}
		}
	}
);