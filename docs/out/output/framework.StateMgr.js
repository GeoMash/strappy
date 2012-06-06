Ext.data.JsonP.framework_StateMgr({"tagname":"class","name":"framework.StateMgr","extends":null,"mixins":["framework.trait.signal.Send"],"alternateClassNames":[],"aliases":{},"singleton":true,"requires":[],"uses":["framework.trait.signal.Send"],"code_type":"nop","inheritable":false,"inheritdoc":null,"meta":{},"id":"class-framework.StateMgr","members":{"cfg":[],"property":[{"name":"eventSupported","tagname":"property","owner":"framework.StateMgr","meta":{"private":true},"id":"property-eventSupported"},{"name":"radioTower","tagname":"property","owner":"framework.StateMgr","meta":{"private":true},"id":"property-radioTower"},{"name":"state","tagname":"property","owner":"framework.StateMgr","meta":{"private":true},"id":"property-state"},{"name":"stateString","tagname":"property","owner":"framework.StateMgr","meta":{"private":true},"id":"property-stateString"},{"name":"supressNext","tagname":"property","owner":"framework.StateMgr","meta":{"private":true},"id":"property-supressNext"}],"method":[{"name":"constructor","tagname":"method","owner":"framework.StateMgr","meta":{},"id":"method-constructor"},{"name":"bindHashEvent","tagname":"method","owner":"framework.StateMgr","meta":{"private":true},"id":"method-bindHashEvent"},{"name":"getRadioTower","tagname":"method","owner":"framework.StateMgr","meta":{},"id":"method-getRadioTower"},{"name":"getState","tagname":"method","owner":"framework.StateMgr","meta":{},"id":"method-getState"},{"name":"monitorHashChange","tagname":"method","owner":"framework.StateMgr","meta":{"private":true},"id":"method-monitorHashChange"},{"name":"onHashChange","tagname":"method","owner":"framework.StateMgr","meta":{"private":true},"id":"method-onHashChange"},{"name":"onHashChangeTest","tagname":"method","owner":"framework.StateMgr","meta":{"private":true},"id":"method-onHashChangeTest"},{"name":"parseStateObject","tagname":"method","owner":"framework.StateMgr","meta":{"private":true},"id":"method-parseStateObject"},{"name":"parseStateString","tagname":"method","owner":"framework.StateMgr","meta":{"private":true},"id":"method-parseStateString"},{"name":"registerStateChanger","tagname":"method","owner":"framework.StateMgr","meta":{},"id":"method-registerStateChanger"},{"name":"sendSignal","tagname":"method","owner":"framework.trait.signal.Send","meta":{},"id":"method-sendSignal"},{"name":"updateState","tagname":"method","owner":"framework.StateMgr","meta":{},"id":"method-updateState"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"files":[{"filename":"StateMgr.js","href":"StateMgr.html#framework-StateMgr"}],"html_meta":{},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixins</h4><div class='dependency'><a href='#!/api/framework.trait.signal.Send' rel='framework.trait.signal.Send' class='docClass'>framework.trait.signal.Send</a></div><h4>Uses</h4><div class='dependency'><a href='#!/api/framework.trait.signal.Send' rel='framework.trait.signal.Send' class='docClass'>framework.trait.signal.Send</a></div><h4>Files</h4><div class='dependency'><a href='source/StateMgr.html#framework-StateMgr' target='_blank'>StateMgr.js</a></div></pre><div class='doc-contents'><p>This is the frameworks state management handler. It helps to manage\nthe state of all components.</p>\n\n<p>Note that this class doesn't actually directly change the state of any\ncomponent. That job is left up to state controllers.</p>\n\n<p>This class will capture, monitor and update state properties which are\nrecorded in the URL of the current page. This URL is a hashed url and\nconsists of key-value properties, separated by ampersands (&amp;).</p>\n\n<p>Note that this class is a singleton and should never be instantiated directly.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-eventSupported' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-property-eventSupported' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-property-eventSupported' class='name expandable'>eventSupported</a><span> : Boolean</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A flag which is set to true or false depending on weather\nor not the browser supports the \"hashchange\" event. ...</div><div class='long'><p>A flag which is set to true or false depending on weather\nor not the browser supports the \"hashchange\" event.</p>\n\n<p>See <a href=\"#!/api/framework.RadioTower\" rel=\"framework.RadioTower\" class=\"docClass\">Radio Tower</a>.</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-radioTower' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-property-radioTower' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-property-radioTower' class='name expandable'>radioTower</a><span> : Object</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A reference to the Radio Tower. ...</div><div class='long'><p>A reference to the <a href=\"#!/api/framework.RadioTower\" rel=\"framework.RadioTower\" class=\"docClass\">Radio Tower</a>.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-state' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-property-state' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-property-state' class='name expandable'>state</a><span> : Object</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>state This object contains the current stored state,\nas visualized by the hash URL. ...</div><div class='long'><p>state This object contains the current stored state,\nas visualized by the hash URL.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-stateString' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-property-stateString' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-property-stateString' class='name expandable'>stateString</a><span> : String</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>state A string representation of the state object. ...</div><div class='long'><p>state A string representation of the state object.</p>\n<p>Defaults to: <code>&quot;&quot;</code></p></div></div></div><div id='property-supressNext' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-property-supressNext' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-property-supressNext' class='name expandable'>supressNext</a><span> : Boolean</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/framework.StateMgr-method-constructor' class='name expandable'>framework.StateMgr</a>( <span class='pre'></span> ) : <a href=\"#!/api/framework.StateMgr\" rel=\"framework.StateMgr\" class=\"docClass\">framework.StateMgr</a></div><div class='description'><div class='short'>Sets up the state manager by linking it to the Radio Tower,\ntesting for \"hashchange\" event support, and creating bind...</div><div class='long'><p>Sets up the state manager by linking it to the <a href=\"#!/api/framework.RadioTower\" rel=\"framework.RadioTower\" class=\"docClass\">Radio Tower</a>,\ntesting for \"hashchange\" event support, and creating bindings\nfor the hash changes to be captured.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.StateMgr\" rel=\"framework.StateMgr\" class=\"docClass\">framework.StateMgr</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-bindHashEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-bindHashEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-bindHashEvent' class='name expandable'>bindHashEvent</a>( <span class='pre'></span> ) : void<strong class='private signature'>private</strong></div><div class='description'><div class='short'>This method will bind to the hash change event natively,\nor if the browser does not support it, then it will bind to\n...</div><div class='long'><p>This method will bind to the hash change event natively,\nor if the browser does not support it, then it will bind to\nhand over the control of monitoring the hash changes to\n<a href=\"#!/api/framework.StateMgr\" rel=\"framework.StateMgr\" class=\"docClass\">monitorHashChange</a>.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getRadioTower' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-getRadioTower' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-getRadioTower' class='name expandable'>getRadioTower</a>( <span class='pre'></span> ) : <a href=\"#!/api/framework.RadioTower\" rel=\"framework.RadioTower\" class=\"docClass\">framework.RadioTower</a></div><div class='description'><div class='short'>Fetches the Radio Tower singleton. ...</div><div class='long'><p>Fetches the Radio Tower singleton.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.RadioTower\" rel=\"framework.RadioTower\" class=\"docClass\">framework.RadioTower</a></span><div class='sub-desc'><p>The Radio Tower.</p>\n</div></li></ul></div></div></div><div id='method-getState' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-getState' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-getState' class='name expandable'>getState</a>( <span class='pre'></span> ) : Object</div><div class='description'><div class='short'>Fetches the current state. ...</div><div class='long'><p>Fetches the current state.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>The current state object.</p>\n</div></li></ul></div></div></div><div id='method-monitorHashChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-monitorHashChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-monitorHashChange' class='name expandable'>monitorHashChange</a>( <span class='pre'></span> ) : void<strong class='private signature'>private</strong></div><div class='description'><div class='short'>This method is invoked into a loop whenever the browser fails the\n\"hashchange\" event. ...</div><div class='long'><p>This method is invoked into a loop whenever the browser fails the\n\"hashchange\" event.</p>\n\n<p>It is designed to poll the hash address for changes and call\n<a href=\"#!/api/framework.StateMgr\" rel=\"framework.StateMgr\" class=\"docClass\">onHashChange</a> if a change is detected.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onHashChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-onHashChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-onHashChange' class='name expandable'>onHashChange</a>( <span class='pre'>Object event, Boolean supressSignal</span> ) : void<strong class='private signature'>private</strong></div><div class='description'><div class='short'>This method will be invoked automatically whenever a change in the\nhash address is detected. ...</div><div class='long'><p>This method will be invoked automatically whenever a change in the\nhash address is detected. It will fire the <a href=\"#!/api/framework.Signal-static-property-STATE_CHANGE\" rel=\"framework.Signal-static-property-STATE_CHANGE\" class=\"docClass\">State Change</a>\nsignal and provide the new state in the body of the signal.</p>\n\n<p>Note that the signal can be supressed by passing true to the supressSignal param.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'><p>The event object. Is null if the browser\ndoes not support the \"hashchange\" event.</p>\n</div></li><li><span class='pre'>supressSignal</span> : Boolean<div class='sub-desc'><p>Blocks the <a href=\"#!/api/framework.Signal-static-property-STATE_CHANGE\" rel=\"framework.Signal-static-property-STATE_CHANGE\" class=\"docClass\">State Change</a>\nsignal from being issued.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onHashChangeTest' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-onHashChangeTest' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-onHashChangeTest' class='name expandable'>onHashChangeTest</a>( <span class='pre'></span> ) : void<strong class='private signature'>private</strong></div><div class='description'><div class='short'>This is an internal callback method for testing if the hash\nevent is supported in the current browser. ...</div><div class='long'><p>This is an internal callback method for testing if the hash\nevent is supported in the current browser.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-parseStateObject' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-parseStateObject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-parseStateObject' class='name expandable'>parseStateObject</a>( <span class='pre'>Object A</span> ) : String<strong class='private signature'>private</strong></div><div class='description'><div class='short'>Parses a state object and coverts it to a hash address string. ...</div><div class='long'><p>Parses a state object and coverts it to a hash address string.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>A</span> : Object<div class='sub-desc'><p>key valued state object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The new state string.</p>\n</div></li></ul></div></div></div><div id='method-parseStateString' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-parseStateString' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-parseStateString' class='name expandable'>parseStateString</a>( <span class='pre'>String A</span> ) : Object<strong class='private signature'>private</strong></div><div class='description'><div class='short'>Parses a hash address string and converts it to an object. ...</div><div class='long'><p>Parses a hash address string and converts it to an object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>A</span> : String<div class='sub-desc'><p>string representing the state as key-value properties,</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>The new state object.</p>\n</div></li></ul></div></div></div><div id='method-registerStateChanger' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-registerStateChanger' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-registerStateChanger' class='name expandable'>registerStateChanger</a>( <span class='pre'>jQuery el, String A</span> ) : void</div><div class='description'><div class='short'>This is a method which views can use\nto register a dom element's \"click\" event with a state URL. ...</div><div class='long'><p>This is a method which views can use\nto register a dom element's \"click\" event with a state URL.</p>\n\n<p>This means whenever the bound element is clicked, the state will\nbe updated with the values that were bound to the event.</p>\n\n<p>Here is an example:</p>\n\n<p>The HTML:</p>\n\n<pre><code>&lt;div class=\"navContainer\"&gt;\n    &lt;ul&gt;\n        &lt;li class=\"active\"&gt;&lt;a id=\"container-home\" href=\"javascript:{};\"&gt;Home&lt;/a&gt;&lt;/li&gt;\n        &lt;li&gt;&lt;a id=\"container-news\" href=\"javascript:{};\"&gt;News&lt;/a&gt;&lt;/li&gt;\n        &lt;li&gt;&lt;a id=\"container-about\" href=\"javascript:{};\"&gt;About&lt;/a&gt;&lt;/li&gt;\n    &lt;/ul&gt;\n&lt;/div&gt;\n&lt;div id=\"outerContainer\"&gt;\n    &lt;div id=\"section-home\" class=\"active\"&gt;Home Section&lt;/div&gt;\n    &lt;div id=\"section-news\"&gt;News Section&lt;/div&gt;\n    &lt;div id=\"section-about\"&gt;About Section&lt;/div&gt;\n&lt;/div&gt;\n</code></pre>\n\n<p>The Javascript:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component.myComponent.view',\n        $name:      'Default',\n        $extends:   framework.mvc.View\n    }\n)\n(\n    {},\n    {\n        onReady: function()\n        {\n            this.bindStatefulLinks\n            (\n                ['[href=\"#container-home\"]',    'section=home'],\n                ['[href=\"#container-news\"]',    'section=news'],\n                ['[href=\"#container-about\"]',   'section=about']\n            );\n        }\n    }\n);\n</code></pre>\n\n<p>In the above example, the \"a\" tags would be bound so that the\n\"section\" state property changed whenever they were clicked.</p>\n\n<p>The state manager would then send the <a href=\"#!/api/framework.Signal-static-property-STATE_CHANGE\" rel=\"framework.Signal-static-property-STATE_CHANGE\" class=\"docClass\">State Change</a>\nsignal and a state controller\ncould take this change and apply it to it's associated\nstate model. This would then\ninvoke a method bound by the views framework.View.bindStateEvents\nmethod which could switch the visible section within the outerContainer div\nand update which li was \"active\".</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>el</span> : jQuery<div class='sub-desc'>\n</div></li><li><span class='pre'>A</span> : String<div class='sub-desc'><p>string representing the state as key-value properties,\nseparated by ampersands (&amp;).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-sendSignal' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/framework.trait.signal.Send' rel='framework.trait.signal.Send' class='defined-in docClass'>framework.trait.signal.Send</a><br/><a href='source/Send.html#framework-trait-signal-Send-method-sendSignal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.trait.signal.Send-method-sendSignal' class='name expandable'>sendSignal</a>( <span class='pre'>String name, Object body, String type, Object filter</span> ) : Boolean</div><div class='description'><div class='short'>This will send a signal to the Signal Tower where\nit will be emitted for other components and component entities to r...</div><div class='long'><p>This will send a signal to the Signal Tower where\nit will be emitted for other components and component entities to receive.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The name of the signal.</p>\n</div></li><li><span class='pre'>body</span> : Object<div class='sub-desc'><p>The body of the signal. This can contain any kind of data.</p>\n</div></li><li><span class='pre'>type</span> : String<div class='sub-desc'><p>The type of the signal. Used for further filtering by type.</p>\n</div></li><li><span class='pre'>filter</span> : Object<div class='sub-desc'><p>An extra filter parameter used to filter more abstractly.\n@throws Error if the signal name is empty.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if the signal was successfully sent.</p>\n</div></li></ul></div></div></div><div id='method-updateState' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.StateMgr'>framework.StateMgr</span><br/><a href='source/StateMgr.html#framework-StateMgr-method-updateState' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.StateMgr-method-updateState' class='name expandable'>updateState</a>( <span class='pre'>Object A</span> ) : void</div><div class='description'><div class='short'>This is a private method which wraps state change events bound with\nregisterStateChanger. ...</div><div class='long'><p>This is a private method which wraps state change events bound with\n<a href=\"#!/api/framework.StateMgr-method-registerStateChanger\" rel=\"framework.StateMgr-method-registerStateChanger\" class=\"docClass\">registerStateChanger</a>. It parses the\nnew state and applies it to the hash address.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>A</span> : Object<div class='sub-desc'><p>key valued state object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});