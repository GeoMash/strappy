/**
 * @class framework.mvc.Model
 * 
 * 
 * 
 * @mixins framework.trait.ComponentConnector
 * @mixins framework.trait.signal.Send
 * @abstract
 * 
 * @uses framework.trait.ComponentConnector
 * @uses framework.trait.signal.Send
 */
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
		/**
		 * @property {Array} data Holds the data for this model (store).
		 * @private 
		 */
		data:		[],
		/**
		 * @property {framework.Proxy} proxy
		 * @private
		 * @ignore
		 */
		proxy:		null,
		/**
		 * Fetches a record based on its index in the store.
		 * @param {Number} index The index.
		 * @return {Mixed} The record.
		 */
        getRecord: function(index)
		{
			return this.data[index];
		},
		/**
		 * Sets a record at a given index in the store.
		 * @param {Number} index The index.
		 * @param {Mixed} data The new data to set.
		 */
        setRecord: function(index,data)
		{
			data.id=this.data[0].id;
			this.data[index]=data;
			this.sendSignal('view.change',data);
		},
//		get: function(key)
//		{
//			var	parts	=key.split('.'),
//				object	=this.data;
//			for (var i=0,j=parts.length; i<j; i++)
//			{
//				if (Object.isDefined(object[parts[i]]))
//				{
//					object=object[parts[i]];
//				}
//				else
//				{
//					return null;
//				}
//			}
//			return object;
//		},
//		set: function(key,value)
//		{
//			var	parts	=key.split('.'),
//				object	=this.data;
//			for (var i=0,j=parts.length; i<j; i++)
//			{
//				if (i+1==j)
//				{
//					object[parts[i]]=value;
//					break;
//				}
//				if (Object.isDefined(object[parts[i]]))
//				{
//					object=object[parts[i]];
//				}
//				else
//				{
//					if (i+1!=j)
//					{
//						object[parts[i]]={};
//						object=object[parts[i]];
//					}
//				}
//			}
//			console.debug('ID:',this.getID());
//			this.sendSignal(framework.Signal.MODEL_DONE_CHANGE,{name:this.getID()});
//			return this;
//		},
		/**
		 * This method allows you to iterate over each item
		 * in the model's data store.
		 * 
		 * Example:
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.controller',
			$name:		'Default',
			$extends:	framework.mvc.Controller
		}
	)
	(
		{},
		{
			generateList: function()
			{
				var HTML=['<ul>'];
				this.getModel('Default').each
				(
					function(item)
					{
						HTML.push('<li><a href="'+item.url+'">'+item.name+'</a></li>');
					}
				);
				HTML.push('</ul>');
				return HTML.join('');
			}
		}
	);
		 * @param {Function} callback A closure which will be called at each iteration.
		 * The first parameter of the closure will be the data item.
		 * @return {framework.mvc.Model}
		 */
		each: function(callback)
		{
			this.data.each(callback);
			return this;
		},
		/**
		 * Adds a record to the model's store.
		 * @param {Mixed} record The record to be added to the store.
		 * @return {framework.mvc.Model}
		 */
		add: function(record)
		{
			this.data.push(record);
			this.sendSignal(framework.Signal.MODEL_DONE_CHANGE,{id:this.getID()});
			return this;
		},
		/**
		 * Removes a record from the store.
		 * @param {Mixed} record The record to be removed from the store.
		 * @return {framework.mvc.Model}
		 */
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
			this.sendSignal(framework.Signal.MODEL_DONE_CHANGE,{id:this.getID()});
			return this;
		}
	}
);