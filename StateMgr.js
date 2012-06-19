/**
 * @class framework.StateMgr
 * 
 * This is the frameworks state management handler. It helps to manage
 * the state of all components.
 * 
 * Note that this class doesn't actually directly change the state of any
 * component. That job is left up to {@link framework.mvc.StatefulController state controllers}.
 * 
 * This class will capture, monitor and update state properties which are
 * recorded in the URL of the current page. This URL is a hashed url and
 * consists of key-value properties, separated by ampersands (&amp;).
 * 
 * Note that this class is a singleton and should never be instantiated directly.
 * 
 * @mixin framework.trait.signal.Send
 * @uses framework.trait.signal.Send
 * @singleton
 */
$JSKK.Class.create
(
	{
		$namespace:		'framework',
		$name:			'StateMgr',
		$uses:
		[
			framework.trait.signal.Send
		]
	}
)
(
	{},
	{
		/**
		 * @private state This object contains the current stored state,
		 * as visualized by the hash URL.
		 */
		state:			{},
		/**
		 * @private state A string representation of the state object.
		 */
		stateString:	'',
		/**
		 * @property radioTower A reference to the {@link framework.RadioTower Radio Tower}. 
		 * @private
		 */
		radioTower:		null,
		/**
		 * @property eventSupported A flag which is set to true or false depending on weather
		 * or not the browser supports the "hashchange" event.
		 * 
		 * See {@link framework.RadioTower Radio Tower}.
		 * @private
		 */
		eventSupported:	false,
		/**
		 * @property supressNext
		 * @private
		 */
		supressNext:	false,
		/**
		 * @constructor
		 * Sets up the state manager by linking it to the {@link framework.RadioTower Radio Tower},
		 * testing for "hashchange" event support, and creating bindings
		 * for the hash changes to be captured.
		 * 
		 * @return {framework.StateMgr}
		 */
		init: function()
		{
			this.radioTower		=framework.$radioTower;
			
			$(window).bind('hashchange',this.onHashChangeTest.bind(this));
			
			this.onHashChange(null,true);
			
			var OLD_HASH=window.location.hash;
			window.location.hash='welcome';
			
			(function()
			{
				//Restore hash.
				window.location.hash=OLD_HASH;
				//Bind the hash change event.
				this.bindHashEvent.defer(200,this);
			}.bind(this)).defer(100);
		},
		/**
		 * This is an internal callback method for testing if the hash
		 * event is supported in the current browser.
		 * @private
		 * @return {void}
		 */
		onHashChangeTest: function()
		{
			this.eventSupported=true;
		},
		/**
		 * This method will bind to the hash change event natively,
		 * or if the browser does not support it, then it will bind to
		 * hand over the control of monitoring the hash changes to
		 * {@link framework.StateMgr#monitorHashChange}.
		 * @private
		 * @return {void}
		 */
		bindHashEvent: function()
		{
			if (this.eventSupported)
			{
				$(window).bind('hashchange',this.onHashChange.bind(this));
			}
			else
			{
				this.monitorHashChange();
			}
		},
		/**
		 * This method is invoked into a loop whenever the browser fails the
		 * "hashchange" event.
		 * 
		 * It is designed to poll the hash address for changes and call
		 * {@link framework.StateMgr#onHashChange} if a change is detected.
		 * 
		 * @private
		 * @return {void}
		 */
		monitorHashChange: function()
		{
			$JSKK.when
			(
				function()
				{
					return (window.location.hash.replace('#','')!=this.stateString);
				}.bind(this)
			).isTrue
			(
				function()
				{
					this.onHashChange();
					this.monitorHashChange();
				}.bind(this)
			);
		},
		/**
		 * This method will be invoked automatically whenever a change in the
		 * hash address is detected. It will fire the {@link framework.Signal#STATE_CHANGE State Change}
		 * signal and provide the new state in the body of the signal.
		 * 
		 * Note that the signal can be supressed by passing true to the supressSignal param.
		 * 
		 * @param {Object} event The event object. Is null if the browser
		 * does not support the "hashchange" event.
		 * @param {Boolean} supressSignal Blocks the {@link framework.Signal#STATE_CHANGE State Change}
		 * signal from being issued.
		 * 
		 * @private
		 * @return {void}
		 */
		onHashChange: function(event,supressSignal)
		{
			if (this.supressNext)
			{
				supressSignal	=true;
				this.supressNext=false;
			}
			this.stateString=window.location.hash.replace('#','');
			if (!Object.isEmpty(this.stateString))
			{
				this.state=this.parseStateString(this.stateString);
			}
			else
			{
				this.state={};
			}
			if (!supressSignal)
			{
				this.sendSignal(framework.Signal.STATE_CHANGE,this.state);
			}
		},
		/**
		 * This is a method which {@link framework.View views} can use
		 * to register a dom element's "click" event with a state URL.
		 * 
		 * This means whenever the bound element is clicked, the state will
		 * be updated with the values that were bound to the event.
		 *  
		 * Here is an example:
		 * 
		 * The HTML:
	<div class="navContainer">
		<ul>
			<li class="active"><a id="container-home" href="javascript:{};">Home</a></li>
			<li><a id="container-news" href="javascript:{};">News</a></li>
			<li><a id="container-about" href="javascript:{};">About</a></li>
		</ul>
	</div>
	<div id="outerContainer">
		<div id="section-home" class="active">Home Section</div>
		<div id="section-news">News Section</div>
		<div id="section-about">About Section</div>
	</div>
		 * 
		 * The Javascript:
	$JSKK.Class.create
	(
		{
			$namespace:	'Application.component.myComponent.view',
			$name:		'Default',
			$extends:	framework.mvc.View
		}
	)
	(
		{},
		{
			onReady: function()
			{
				this.bindStatefulLinks
				(
					['[href="#container-home"]',	'section=home'],
					['[href="#container-news"]',	'section=news'],
					['[href="#container-about"]',	'section=about']
				);
			}
		}
	);
		 * In the above example, the "a" tags would be bound so that the
		 * "section" state property changed whenever they were clicked.
		 * 
		 * The state manager would then send the {@link framework.Signal#STATE_CHANGE State Change}
		 * signal and a {@link framework.StatefulController state controller}
		 * could take this change and apply it to it's associated 
		 * {@link framework.StatefulModel state model}. This would then
		 * invoke a method bound by the views {@link framework.View#bindStateEvents}
		 * method which could switch the visible section within the outerContainer div
		 * and update which li was "active".
		 * 
		 * @param {jQuery}
		 * @param {String} A string representing the state as key-value properties,
		 * separated by ampersands (&amp;).
		 * @return {void}
		 */
		registerStateChanger: function(el,state)
		{
			state=this.parseStateString(state);
			el.click(this.updateState.bind(this,state,false));
		},
		/**
		 * This is a private method which wraps state change events bound with
		 * {@link framework.StateMgr#registerStateChanger}. It parses the
		 * new state and applies it to the hash address.
		 * @param {Object} A key valued state object.
		 * @return {void}
		 */
		updateState: function(state,supressed,event)
		{
			for (var node in state)
			{
				this.state[node]=state[node];
			}
			this.supressNext=supressed;
			window.location.hash=this.parseStateObject(this.state);
		},
		/**
		 * Fetches the current state.
		 * 
		 * @return {Object} The current state object.
		 */
		getState: function()
		{
			return this.state;
		},
		/**
		 * Parses a hash address string and converts it to an object.
		 * @private
		 * @param {String} A string representing the state as key-value properties,
		 * @return {Object} The new state object.
		 */
		parseStateString: function(state)
		{
			var	states		=state.split('&'),
				stateParts	=null,
				stateObj	={};
			for (var i=0,j=states.length; i<j; i++)
			{
				stateParts=states[i].split('=');
				if (['true','false'].inArray(stateParts[1]))
				{
					switch (stateParts[1])
					{
						case 'true':	stateParts[1]=true;		break;
						case 'false':	stateParts[1]=false;	break;
					}
				}
				stateObj[stateParts[0]]=stateParts[1];
			}
			return stateObj;
		},
		/**
		 * Parses a state object and coverts it to a hash address string.
		 * @private
		 * @param {Object} A key valued state object.
		 * @return {String} The new state string.
		 */
		parseStateObject: function(state)
		{
			var stateString=[];
			for (var node in this.state)
			{
				stateString.push(node+'='+this.state[node]);
			}
			return stateString.join('&');
		},
		/**
		 * Fetches the Radio Tower singleton.
		 * @return {framework.RadioTower} The Radio Tower.
		 */
		getRadioTower: function()
		{
			return this.radioTower;
		}
	}
);