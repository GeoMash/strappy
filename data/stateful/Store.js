/**
 * @class framework.data.stateful.Store
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
		$namespace:	'framework.data.stateful',
		$name:		'Store',
		$extends:	framework.data.SingleModelStore
	}
)
(
	{
		ACCESS_PRIVATE:	'private',
		ACCESS_PUBLIC:	'public',
		
		LOCK_NONE:		'none',
		LOCK_READONLY:	'readonly',
		LOCK_FULL:		'full'
	},
	{
		events:
		{
			onBeforeChange:	true,
			onChange:		true,
			onReady:		true
		},
		/**
		 * @property {Boolean} ready A flag indicating that the component's state is ready.
		 * @private
		 */
		ready:		false,
		/**
		 * @property {Array} readyViews A container filled with views which a controller has
		 * flagged as ready.
		 * 
		 * See {@link framework.data.stateful.Store#setViewReady} and
		 * {@link framework.data.stateful.Store#getReadyViews} for more information and
		 * examples of how to use this.
		 * @private
		 */
		readyViews:	[],
		/**
		 * @property {Object} stateMap A reference object for mapped private and public state properties.
		 * @private
		 */
		stateMap:{},
		/**
		 * 
		 * @property {String} lockState This property will block behaviours on this store depending on its state.
		 * @private
		 */
		lockState:	'none',
		
		keys:		[],
		init: function()
		{
			//Set the model.
			this.model=framework.mvc.stateful.Model;
			
			// for (var item in this.state)
			// {
			// 	this.keys.push(item);
			// }
			
			
			
			this.init.$parent();
			var	self=this.$reflect('self'),
				item=null;
			
			for (item in this.record.get(self.ACCESS_PRIVATE))
			{
				this.stateMap[item]=self.ACCESS_PRIVATE;
			}
			for (item in this.record.get(self.ACCESS_PUBLIC))
			{
				this.stateMap[item]=self.ACCESS_PUBLIC;
			}
		},
		/**
		 * Checks to see if the passed in state item
		 * can be managed by this store.
		 * 
		 * @param  {String} item The name of the state item to check against.
		 * @return {Boolean} True if it can be managed by this store.
		 */
		canManageStateItem: function(item)
		{
			return this.stateMap[item]==this.$reflect('self').ACCESS_PUBLIC;
		},
		
		/**
		 * Sets a state property with a new value.
		 * 
		 * Sends signal:
		 * 
		 * * {@link framework.Signal.STATEFULSTORE_DONE_CHANGE}
		 * 
		 * @param {String} key The property to set.
		 * @param {Mixed} value The new value.
		 * @return {framework.data.stateful.Store}
		 */
		set: function()
		{
			if (this.lockState==framework.data.stateful.Store.LOCK_NONE)
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
					mapping=this.stateMap[key];
					//Ignore if the value is the same.
					if (this.record.get(mapping)[key]==keyVals[key])continue;
					//Keep going otherwise...
					if (this.fireEvent('onBeforeChange',this,key,keyVals[key])!==false)
					{
						this.record.get(mapping)[key]=keyVals[key];
						if (mapping==this.$reflect('self').ACCESS_PUBLIC)
						{
							updateState		=true;
							newState[key]	=keyVals[key];
						}
						this.fireEvent('onChange',this,key,keyVals[key]);
					}
				}
				if (updateState)
				{
					this.getStateMgr().updateState(newState,true);
				}
			}
			else
			{
				throw new Error('Store "'+this.$reflect('name')+'" is in lock state "'+this.lockState+'" and so cannot be modified.');
			}
			return this;
		},
		/**
		 * This method will set the ready state of the component.
		 * 
		 * @param {Boolean} ready The ready state.
		 * @return {framework.data.stateful.Store}
		 */
		setReady: function(ready)
		{
			this.ready=ready;
			if (ready)
			{
				var globalState=this.getStateMgr().getState();
				for (var globalItem in globalState)
				{
					for (var localItem in this.state)
					{
						if (localItem==globalItem)
						{
							this.state[localItem]=globalState[globalItem];
							break;
						}
					}
				}
				this.fireEvent('onReady',this);
			}
			// this.fireEvent('onChange',this);
			return this;
		},
		/**
		 * Checks if the component's ready state is true.
		 * @return {Boolean} True if the component state is ready.
		 */
		isReady: function()
		{
			return this.ready;
		},
		/**
		 * Gets a state property from the model's store.
		 * @param {String} key The state property to fetch.
		 * @return {Mixed} The value of the property.
		 */
		get: function(key)
		{
			return this.get.$parent(this.stateMap[key])[key];
		},
		/**
		 * Stores the view name in a private store for ready views.
		 * 
		 * Example:
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.controller',
			$name:		'State',
			$extends:	framework.mvc.stateful.Controller
		}
	)
	(
		{},
		{
			onViewReady: function(signal)
			{
				this.setViewReadyState(signal.getBody().id);
			}
		}
	);
		 * @param {String} view The name of the view.
		 * @return {framework.data.stateful.Store}
		 */
		setViewReady: function(view)
		{
			this.readyViews.push(view);
			return this;
		},
		/**
		 * Returns an array of ready views.
		 * 
		 * Example:
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.controller',
			$name:		'State',
			$extends:	framework.mvc.stateful.Controller
		}
	)
	(
		{},
		{
			onViewReady: function(signal)
			{
				this.setViewReadyState(signal.getBody().id);
				var readyViews=this.getReadyViews();
				if (readyViews.inArray('Application.component.myComponent.view.Default')
				&& readyViews.inArray('Application.component.myComponent.view.OtherView'))
				{
					//All views are ready. Flag the component state as ready.
					this.setReady();
				}
			}
		}
	);
		 * @return {Array} The ready views.
		 */
		getReadyViews: function()
		{
			return this.readyViews;
		},
		/**
		 * Locks the model based on the type of lock given to this method.
		 * @param {String} lockType The type of lock. Valid lock types are:
		 * * {@link framework.data.stateful.Store#LOCK_NONE}
		 * * {@link framework.data.stateful.Store#LOCK_READONLY}
		 * * {@link framework.data.stateful.Store#LOCK_FULL}
		 * 
		 * @retrun {framework.data.stateful.Store}
		 */
		lock: function(lockType)
		{
			if (['none','readonly','full'].inArray(lockType))
			{
				this.lockState=lockType;
			}
			else
			{
				throw new Error('"'+lockType+'" is an invalid lock type. Valid locks are "none", "readonly" and "full".');
			}
			return this;
		}
	}
);