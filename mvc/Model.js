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
//			framework.trait.ComponentConnector,
			framework.trait.signal.Send
		]
	}
)
(
	{},
	{
		dirty:	false,
		fields:	[],
		record:	{},
		store:	null,
		init: function(record)
		{
			if (Object.isDefined(record))
			{
				for (var field in this.fields)
				{
					this.record[field]=this.fields[field];
				}
				this.record=record;
			}
			else
			{
				for (var field in this.fields)
				{
					this.record[field]=this.fields[field];
				}
			}
		},
		bindStore: function(store)
		{
			this.store=store;
			return this;
		},
		unbindStore: function()
		{
			this.store=null;
			return this;
		},
		getStore: function()
		{
			return this.store;
		},
		/**
		 * Fetches a record based on its index in the store.
		 * @param {Number} index The index.
		 * @return {Mixed} The record.
		 */
        get: function(key)
		{
			return this.record[key];
		},
		/**
		 * Sets a record at a given index in the store.
		 * @param {Number} index The index.
		 * @param {Mixed} data The new data to set.
		 */
        set: function(key,value)
		{
			this.record[key]=value;
			this.flagDirty();
//			this.sendSignal(framework.Signal.MODEL_DONE_CHANGE,{id:this.getID()});
//			this.sendSignal('view.change',data);
		},
		flagDirty: function()
		{
			this.dirty=true;
			return this;
		},
		flagClean: function()
		{
			this.dirty=false;
		},
		isDirty: function()
		{
			return this.dirty;
		},
		isClean: function()
		{
			return !this.dirty;
		}
	}
);