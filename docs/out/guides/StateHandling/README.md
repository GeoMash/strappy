#State Handling Guide



##Under the Hood
<br>
<br>
State is recorded via a query string within the URL, placed after a hash (#).
<br>
Example:
	http://localhost/#foo=bar&baz=foo&bar=123
<br>
<br>


<br>
State is ultimately handled by the State Manager. The State Manager interprets the hash and converts it into a key value paired map. The State Manager continues to track changes to the hash change and update its internal mapping of the state.
<br>
The State Manager will emit signals whenever the state changes. The signal will contain the current state (in full) as a key value map.
<br>
Every component has a State Controller and a State Store. The controller listens for state change signals.
<br>
Upon receipt of a state change, if the signal contains any state properties that the controller's store is interested in, the controller calls an internal private method "_onStateChange". Every state controller must implement its own "onStateChange" method, this is called by "_onStateChange", if and only if the store has been flagged as ready.
<br>
<br>

Flow:<br>
framework.StateMgr<br>
||<br>
\/<br>
framework.mcv.stateful.Controller<br>
||<br>
\/<br>
framework.data.stateful.Store<br>
||<br>
\/<br>
framework.mcv.View<br>
<br>
<br>



1. State controller receives signal.
2. State controller calls _onStateChange method.
3. State controller tests if its state store cares about any of the changes.
4. State controller SETS items on its state store.
5. State store fires onBeforeChange event.
6. State controller calls onBeforeChange method.
7. State store fires onChange event.
<br>
<br>
* If the state store returns false for onBeforeChange, the state change will be rejected and the state will return to its previous state.







##Usage Example

A typical example of flagging a store as ready:

	$JSKK.Class.create
	(
		{
			$namespace:	'Coates.component.application.controller',
			$name:		'State',
			$extends:	framework.mvc.stateful.Controller
		}
	)
	(
		{},
		{
			init: function()
			{
				this.init.$parent();
				this.getView('Default')	.observe('onReady',	this.onViewReady.bind(this));
			},
			onBeforeChange: function(state,key,value)
			{
				if (key!='section')return false;
				if (!['Build','Program','Assign','Distribution','Maintainance'].inArray(value))
				{
					return false;
				}
				return true;
			},
			onViewReady: function(view)
			{
				this.setViewReadyState(view.$reflect('name'));
				if (this.getReadyViews().inArray(view.$reflect('name')))
				{
					//All views are ready.
					this.setReady();
				}
			}
		}
	);
<br>
<br>
Example State Store:

	$JSKK.Class.create
	(
		{
			$namespace:	'Coates.component.application.store',
			$name:		'State',
			$extends:	framework.data.stateful.Store
		}
	)
	(
		{},
		{
			state:
			{
				section:	false
			}
		}
	);
<br>
<br>
Views can very easily hook into the changes for the store.

	this.bindStateChanges
	(
		{
			section:	'onSectionChange'
		}
	);
<br>
<br>
The "onSectionChange" method is called whenever the "section" state property changes. Note that this is safe because the state controller has already accepted the change.
<br>
Subsequently, the "onSectionChange" method could then fetch the state item and use it.
<br>
Example:
	var section=this.getStore('State').get('section');
	//Do something with section...
<br>
<br>

Additionally, views have the ability to bind state changing click events directly to DOM elements. This is done with the "bindStatefulLinks" method.
<br>
<br>
Example:
	var item=this.getStore('Section').getById(id);
	this.bindStatefulLinks(['[href="#'+item.get('name')+'-container"]',	'section='+item.get('name')]);
<br>
<br>
The above would cause the "section" state property to be changed with the state manager whenever any matched element was clicked.