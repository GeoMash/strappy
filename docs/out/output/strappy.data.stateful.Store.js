Ext.data.JsonP.strappy_data_stateful_Store({"tagname":"class","name":"strappy.data.stateful.Store","extends":null,"mixins":["strappy.trait.ComponentConnector","strappy.trait.signal.Send"],"traits":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":["strappy.trait.ComponentConnector","strappy.trait.signal.Send"],"code_type":"nop","inheritable":false,"inheritdoc":null,"meta":{"abstract":true},"id":"class-strappy.data.stateful.Store","members":{"cfg":[],"property":[{"name":"lockState","tagname":"property","owner":"strappy.data.stateful.Store","meta":{"private":true},"id":"property-lockState"},{"name":"ready","tagname":"property","owner":"strappy.data.stateful.Store","meta":{"private":true},"id":"property-ready"},{"name":"readyViews","tagname":"property","owner":"strappy.data.stateful.Store","meta":{"private":true},"id":"property-readyViews"},{"name":"stateMap","tagname":"property","owner":"strappy.data.stateful.Store","meta":{"private":true},"id":"property-stateMap"}],"method":[{"name":"constructor","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-constructor"},{"name":"canManageStateItem","tagname":"method","owner":"strappy.data.stateful.Store","meta":{},"id":"method-canManageStateItem"},{"name":"get","tagname":"method","owner":"strappy.data.stateful.Store","meta":{},"id":"method-get"},{"name":"getCmp","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getCmp"},{"name":"getCmpName","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getCmpName"},{"name":"getConfig","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getConfig"},{"name":"getController","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getController"},{"name":"getID","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getID"},{"name":"getIID","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getIID"},{"name":"getParentComponent","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getParentComponent"},{"name":"getRadioTower","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getRadioTower"},{"name":"getReadyViews","tagname":"method","owner":"strappy.data.stateful.Store","meta":{},"id":"method-getReadyViews"},{"name":"getSafeID","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getSafeID"},{"name":"getStateMgr","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getStateMgr"},{"name":"getStore","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getStore"},{"name":"getView","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getView"},{"name":"getViewCache","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getViewCache"},{"name":"hasChildCmp","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-hasChildCmp"},{"name":"isReady","tagname":"method","owner":"strappy.data.stateful.Store","meta":{},"id":"method-isReady"},{"name":"lock","tagname":"method","owner":"strappy.data.stateful.Store","meta":{},"id":"method-lock"},{"name":"sendSignal","tagname":"method","owner":"strappy.trait.signal.Send","meta":{},"id":"method-sendSignal"},{"name":"set","tagname":"method","owner":"strappy.data.stateful.Store","meta":{},"id":"method-set"},{"name":"setReady","tagname":"method","owner":"strappy.data.stateful.Store","meta":{},"id":"method-setReady"},{"name":"setViewReady","tagname":"method","owner":"strappy.data.stateful.Store","meta":{},"id":"method-setViewReady"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"files":[{"filename":"Store.js","href":"Store.html#strappy-data-stateful-Store"}],"html_meta":{"abstract":null},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"usedBy":[],"parentMixins":[],"parentTraits":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixins</h4><div class='dependency'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='docClass'>strappy.trait.ComponentConnector</a></div><div class='dependency'><a href='#!/api/strappy.trait.signal.Send' rel='strappy.trait.signal.Send' class='docClass'>strappy.trait.signal.Send</a></div><h4>Uses</h4><div class='dependency'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='docClass'>strappy.trait.ComponentConnector</a></div><div class='dependency'><a href='#!/api/strappy.trait.signal.Send' rel='strappy.trait.signal.Send' class='docClass'>strappy.trait.signal.Send</a></div><h4>Files</h4><div class='dependency'><a href='source/Store.html#strappy-data-stateful-Store' target='_blank'>Store.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-lockState' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-property-lockState' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-property-lockState' class='name expandable'>lockState</a><span> : String</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>This property will block behaviours on this store depending on its state. ...</div><div class='long'><p>This property will block behaviours on this store depending on its state.</p>\n<p>Defaults to: <code>&quot;none&quot;</code></p></div></div></div><div id='property-ready' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-property-ready' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-property-ready' class='name expandable'>ready</a><span> : Boolean</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A flag indicating that the component's state is ready. ...</div><div class='long'><p>A flag indicating that the component's state is ready.</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-readyViews' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-property-readyViews' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-property-readyViews' class='name expandable'>readyViews</a><span> : Array</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A container filled with views which a controller has\nflagged as ready. ...</div><div class='long'><p>A container filled with views which a controller has\nflagged as ready.</p>\n\n<p>See <a href=\"#!/api/strappy.data.stateful.Store-method-setViewReady\" rel=\"strappy.data.stateful.Store-method-setViewReady\" class=\"docClass\">setViewReady</a> and\n<a href=\"#!/api/strappy.data.stateful.Store-method-getReadyViews\" rel=\"strappy.data.stateful.Store-method-getReadyViews\" class=\"docClass\">getReadyViews</a> for more information and\nexamples of how to use this.</p>\n<p>Defaults to: <code>[]</code></p></div></div></div><div id='property-stateMap' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-property-stateMap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-property-stateMap' class='name expandable'>stateMap</a><span> : Object</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A reference object for mapped private and public state properties. ...</div><div class='long'><p>A reference object for mapped private and public state properties.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/strappy.trait.ComponentConnector-method-constructor' class='name expandable'>strappy.data.stateful.Store</a>( <span class='pre'><a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a> component</span> ) : Object</div><div class='description'><div class='short'>This method binds the component to whatever uses this trait. ...</div><div class='long'><p>This method binds the component to whatever uses this trait.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>component</span> : <a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a><div class='sub-desc'><p>The component to connect.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-canManageStateItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-method-canManageStateItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-method-canManageStateItem' class='name expandable'>canManageStateItem</a>( <span class='pre'>String item</span> ) : Boolean</div><div class='description'><div class='short'>Checks to see if the passed in state item\ncan be managed by this store. ...</div><div class='long'><p>Checks to see if the passed in state item\ncan be managed by this store.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : String<div class='sub-desc'><p>The name of the state item to check against.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if it can be managed by this store.</p>\n</div></li></ul></div></div></div><div id='method-get' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-method-get' class='name expandable'>get</a>( <span class='pre'>String key</span> ) : Mixed</div><div class='description'><div class='short'>Gets a state property from the model's store. ...</div><div class='long'><p>Gets a state property from the model's store.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : String<div class='sub-desc'><p>The state property to fetch.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'><p>The value of the property.</p>\n</div></li></ul></div></div></div><div id='method-getCmp' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getCmp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getCmp' class='name expandable'>getCmp</a>( <span class='pre'>String cmp</span> ) : <a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a></div><div class='description'><div class='short'>Get's a child component of the associated parent component. ...</div><div class='long'><p>Get's a child component of the associated parent component.</p>\n\n<p>NOTE: As a convention, you should only ever call this if you want\nto <a href=\"#!/api/strappy.Component-method-configure\" rel=\"strappy.Component-method-configure\" class=\"docClass\">configure/reconfigure</a> the\ncomponent.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cmp</span> : String<div class='sub-desc'><p>The reference name of the component as defined in\nthe parent component.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a></span><div class='sub-desc'><p>The child component.</p>\n</div></li></ul></div></div></div><div id='method-getCmpName' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getCmpName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getCmpName' class='name expandable'>getCmpName</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Returns the name of the parent component associated with the class using\nthis trait. ...</div><div class='long'><p>Returns the name of the parent component associated with the class using\nthis trait.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The name of the parent component.</p>\n</div></li></ul></div></div></div><div id='method-getConfig' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getConfig' class='name expandable'>getConfig</a>( <span class='pre'>String key</span> )</div><div class='description'><div class='short'>Gets the value of a config property. ...</div><div class='long'><p>Gets the value of a config property.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : String<div class='sub-desc'><p>The config property to get.</p>\n</div></li></ul></div></div></div><div id='method-getController' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getController' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getController' class='name expandable'>getController</a>( <span class='pre'>String controller</span> ) : <a href=\"#!/api/strappy.mvc.Controller\" rel=\"strappy.mvc.Controller\" class=\"docClass\">strappy.mvc.Controller</a></div><div class='description'><div class='short'>Fetches a controller from the parent component. ...</div><div class='long'><p>Fetches a controller from the parent component.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>controller</span> : String<div class='sub-desc'><p>The name of the controller.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.mvc.Controller\" rel=\"strappy.mvc.Controller\" class=\"docClass\">strappy.mvc.Controller</a></span><div class='sub-desc'><p>The Controller instance.</p>\n</div></li></ul></div></div></div><div id='method-getID' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getID' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getID' class='name expandable'>getID</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Gets the ID of the class which implemented this trait. ...</div><div class='long'><p>Gets the ID of the class which implemented this trait.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The ID.</p>\n</div></li></ul></div></div></div><div id='method-getIID' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getIID' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getIID' class='name expandable'>getIID</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Gets the instance ID (IID) of the component. ...</div><div class='long'><p>Gets the instance ID (IID) of the component.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The instance ID.</p>\n</div></li></ul></div></div></div><div id='method-getParentComponent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getParentComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getParentComponent' class='name expandable'>getParentComponent</a>( <span class='pre'></span> ) : <a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a></div><div class='description'><div class='short'>Returns the parent component associated with the class using this trait. ...</div><div class='long'><p>Returns the parent component associated with the class using this trait.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a></span><div class='sub-desc'><p>the parent component.</p>\n</div></li></ul></div></div></div><div id='method-getRadioTower' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getRadioTower' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getRadioTower' class='name expandable'>getRadioTower</a>( <span class='pre'></span> ) : <a href=\"#!/api/strappy.RadioTower\" rel=\"strappy.RadioTower\" class=\"docClass\">strappy.RadioTower</a></div><div class='description'><div class='short'>Returns the Radio Tower singleton. ...</div><div class='long'><p>Returns the Radio Tower singleton.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.RadioTower\" rel=\"strappy.RadioTower\" class=\"docClass\">strappy.RadioTower</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getReadyViews' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-method-getReadyViews' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-method-getReadyViews' class='name expandable'>getReadyViews</a>( <span class='pre'></span> ) : Array</div><div class='description'><div class='short'>Returns an array of ready views. ...</div><div class='long'><p>Returns an array of ready views.</p>\n\n<p>Example:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component.myComponent.controller',\n        $name:      'State',\n        $extends:   strappy.mvc.stateful.Controller\n    }\n)\n(\n    {},\n    {\n        onViewReady: function(signal)\n        {\n            this.setViewReadyState(signal.getBody().id);\n            var readyViews=this.getReadyViews();\n            if (readyViews.inArray('Application.component.myComponent.view.Default')\n            &amp;&amp; readyViews.inArray('Application.component.myComponent.view.OtherView'))\n            {\n                //All views are ready. Flag the component state as ready.\n                this.setReady();\n            }\n        }\n    }\n);\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'><p>The ready views.</p>\n</div></li></ul></div></div></div><div id='method-getSafeID' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getSafeID' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getSafeID' class='name expandable'>getSafeID</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Gets the ID of the class which implemented it and makes it safe\nfor using as a HTML-based ID. ...</div><div class='long'><p>Gets the ID of the class which implemented it and makes it safe\nfor using as a HTML-based ID.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The ID.</p>\n</div></li></ul></div></div></div><div id='method-getStateMgr' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getStateMgr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getStateMgr' class='name expandable'>getStateMgr</a>( <span class='pre'></span> ) : <a href=\"#!/api/strappy.StateMgr\" rel=\"strappy.StateMgr\" class=\"docClass\">strappy.StateMgr</a></div><div class='description'><div class='short'>Returns the State Manager singleton. ...</div><div class='long'><p>Returns the State Manager singleton.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.StateMgr\" rel=\"strappy.StateMgr\" class=\"docClass\">strappy.StateMgr</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getStore' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getStore' class='name expandable'>getStore</a>( <span class='pre'>String model</span> ) : <a href=\"#!/api/strappy.mvc.Model\" rel=\"strappy.mvc.Model\" class=\"docClass\">strappy.mvc.Model</a></div><div class='description'><div class='short'>Fetches a model from the parent component. ...</div><div class='long'><p>Fetches a model from the parent component.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>model</span> : String<div class='sub-desc'><p>The name of the model.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.mvc.Model\" rel=\"strappy.mvc.Model\" class=\"docClass\">strappy.mvc.Model</a></span><div class='sub-desc'><p>The Model instance.</p>\n</div></li></ul></div></div></div><div id='method-getView' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getView' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getView' class='name expandable'>getView</a>( <span class='pre'>String view</span> ) : <a href=\"#!/api/strappy.mvc.View\" rel=\"strappy.mvc.View\" class=\"docClass\">strappy.mvc.View</a></div><div class='description'><div class='short'>Fetches a view from the parent component. ...</div><div class='long'><p>Fetches a view from the parent component.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>view</span> : String<div class='sub-desc'><p>The name of the view.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.mvc.View\" rel=\"strappy.mvc.View\" class=\"docClass\">strappy.mvc.View</a></span><div class='sub-desc'><p>The View instance.</p>\n</div></li></ul></div></div></div><div id='method-getViewCache' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getViewCache' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getViewCache' class='name expandable'>getViewCache</a>( <span class='pre'></span> ) : <a href=\"#!/api/strappy.mvc.ViewCache\" rel=\"strappy.mvc.ViewCache\" class=\"docClass\">strappy.mvc.ViewCache</a></div><div class='description'><div class='short'>Fetches the View Cache. ...</div><div class='long'><p>Fetches the View Cache.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.mvc.ViewCache\" rel=\"strappy.mvc.ViewCache\" class=\"docClass\">strappy.mvc.ViewCache</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-hasChildCmp' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='defined-in docClass'>strappy.trait.ComponentConnector</a><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-hasChildCmp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-hasChildCmp' class='name expandable'>hasChildCmp</a>( <span class='pre'>Object cmp</span> ) : Boolean</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cmp</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isReady' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-method-isReady' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-method-isReady' class='name expandable'>isReady</a>( <span class='pre'></span> ) : Boolean</div><div class='description'><div class='short'>Checks if the component's ready state is true. ...</div><div class='long'><p>Checks if the component's ready state is true.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if the component state is ready.</p>\n</div></li></ul></div></div></div><div id='method-lock' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-method-lock' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-method-lock' class='name expandable'>lock</a>( <span class='pre'>String lockType</span> )</div><div class='description'><div class='short'>Locks the model based on the type of lock given to this method. ...</div><div class='long'><p>Locks the model based on the type of lock given to this method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>lockType</span> : String<div class='sub-desc'><p>The type of lock. Valid lock types are:\n* LOCK_NONE\n* LOCK_READONLY\n* LOCK_FULL</p>\n\n<p>@retrun {strappy.data.stateful.Store}</p>\n</div></li></ul></div></div></div><div id='method-sendSignal' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/strappy.trait.signal.Send' rel='strappy.trait.signal.Send' class='defined-in docClass'>strappy.trait.signal.Send</a><br/><a href='source/Send.html#strappy-trait-signal-Send-method-sendSignal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.signal.Send-method-sendSignal' class='name expandable'>sendSignal</a>( <span class='pre'>String name, String type, Object filter, Object body</span> ) : Boolean</div><div class='description'><div class='short'>This will send a signal to the Signal Tower where\nit will be emitted for other components and component entities to r...</div><div class='long'><p>This will send a signal to the Signal Tower where\nit will be emitted for other components and component entities to receive. Error if the signal name is empty.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The name of the signal.</p>\n</div></li><li><span class='pre'>type</span> : String<div class='sub-desc'><p>The type of the signal. Used for further filtering by type.</p>\n</div></li><li><span class='pre'>filter</span> : Object<div class='sub-desc'><p>An extra filter parameter used to filter more abstractly.</p>\n</div></li><li><span class='pre'>body</span> : Object<div class='sub-desc'><p>The body of the signal. This can contain any kind of data.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if the signal was successfully sent.</p>\n</div></li></ul><h3 class='pa'>Throws</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>Error if the signal name is empty.</p>\n</div></li></ul></div></div></div><div id='method-set' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-method-set' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-method-set' class='name expandable'>set</a>( <span class='pre'>String key, Mixed value</span> ) : <a href=\"#!/api/strappy.data.stateful.Store\" rel=\"strappy.data.stateful.Store\" class=\"docClass\">strappy.data.stateful.Store</a></div><div class='description'><div class='short'>Sets a state property with a new value. ...</div><div class='long'><p>Sets a state property with a new value.</p>\n\n<p>Sends signal:</p>\n\n<ul>\n<li>strappy.Signal.STATEFULSTORE_DONE_CHANGE</li>\n</ul>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : String<div class='sub-desc'><p>The property to set.</p>\n</div></li><li><span class='pre'>value</span> : Mixed<div class='sub-desc'><p>The new value.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.data.stateful.Store\" rel=\"strappy.data.stateful.Store\" class=\"docClass\">strappy.data.stateful.Store</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setReady' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-method-setReady' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-method-setReady' class='name expandable'>setReady</a>( <span class='pre'>Boolean ready</span> ) : <a href=\"#!/api/strappy.data.stateful.Store\" rel=\"strappy.data.stateful.Store\" class=\"docClass\">strappy.data.stateful.Store</a></div><div class='description'><div class='short'>This method will set the ready state of the component. ...</div><div class='long'><p>This method will set the ready state of the component.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>ready</span> : Boolean<div class='sub-desc'><p>The ready state.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.data.stateful.Store\" rel=\"strappy.data.stateful.Store\" class=\"docClass\">strappy.data.stateful.Store</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setViewReady' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.data.stateful.Store'>strappy.data.stateful.Store</span><br/><a href='source/Store.html#strappy-data-stateful-Store-method-setViewReady' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.data.stateful.Store-method-setViewReady' class='name expandable'>setViewReady</a>( <span class='pre'>String view</span> ) : <a href=\"#!/api/strappy.data.stateful.Store\" rel=\"strappy.data.stateful.Store\" class=\"docClass\">strappy.data.stateful.Store</a></div><div class='description'><div class='short'>Stores the view name in a private store for ready views. ...</div><div class='long'><p>Stores the view name in a private store for ready views.</p>\n\n<p>Example:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component.myComponent.controller',\n        $name:      'State',\n        $extends:   strappy.mvc.stateful.Controller\n    }\n)\n(\n    {},\n    {\n        onViewReady: function(signal)\n        {\n            this.setViewReadyState(signal.getBody().id);\n        }\n    }\n);\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>view</span> : String<div class='sub-desc'><p>The name of the view.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.data.stateful.Store\" rel=\"strappy.data.stateful.Store\" class=\"docClass\">strappy.data.stateful.Store</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});