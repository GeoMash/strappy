Ext.data.JsonP.strappy_trait_ComponentConnector({"tagname":"class","name":"strappy.trait.ComponentConnector","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"abstract":true},"private":null,"id":"class-strappy.trait.ComponentConnector","members":{"cfg":[],"property":[],"method":[{"name":"constructor","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-constructor"},{"name":"getCmp","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getCmp"},{"name":"getCmpName","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getCmpName"},{"name":"getConfig","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getConfig"},{"name":"getController","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getController"},{"name":"getID","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getID"},{"name":"getIID","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getIID"},{"name":"getParentComponent","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getParentComponent"},{"name":"getRadioTower","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getRadioTower"},{"name":"getSafeID","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getSafeID"},{"name":"getStateMgr","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getStateMgr"},{"name":"getStore","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getStore"},{"name":"getView","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getView"},{"name":"getViewCache","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-getViewCache"},{"name":"hasChildCmp","tagname":"method","owner":"strappy.trait.ComponentConnector","meta":{},"id":"method-hasChildCmp"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":1,"files":[{"filename":"ComponentConnector.js","href":"ComponentConnector.html#strappy-trait-ComponentConnector"}],"html_meta":{"abstract":null},"component":false,"superclasses":[],"subclasses":[],"mixedInto":["strappy.mvc.View","strappy.mvc.stateful.Controller","strappy.data.stateful.Store"],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixed into</h4><div class='dependency'><a href='#!/api/strappy.data.stateful.Store' rel='strappy.data.stateful.Store' class='docClass'>strappy.data.stateful.Store</a></div><div class='dependency'><a href='#!/api/strappy.mvc.View' rel='strappy.mvc.View' class='docClass'>strappy.mvc.View</a></div><div class='dependency'><a href='#!/api/strappy.mvc.stateful.Controller' rel='strappy.mvc.stateful.Controller' class='docClass'>strappy.mvc.stateful.Controller</a></div><h4>Files</h4><div class='dependency'><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector' target='_blank'>ComponentConnector.js</a></div></pre><div class='doc-contents'><p>This trait is designed to be used with <a href=\"#!/api/strappy.mvc.Model\" rel=\"strappy.mvc.Model\" class=\"docClass\">models</a>,\n<a href=\"#!/api/strappy.mvc.View\" rel=\"strappy.mvc.View\" class=\"docClass\">views</a> and <a href=\"#!/api/strappy.mvc.Controller\" rel=\"strappy.mvc.Controller\" class=\"docClass\">controllers</a>.</p>\n\n<p>This trait will expose a set of useful functionality to the class that\nis using it, including all the hooks required to access parts of the component.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/strappy.trait.ComponentConnector-method-constructor' class='name expandable'>strappy.trait.ComponentConnector</a>( <span class='pre'><a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a> component</span> ) : Object</div><div class='description'><div class='short'>This method binds the component to whatever uses this trait. ...</div><div class='long'><p>This method binds the component to whatever uses this trait.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>component</span> : <a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a><div class='sub-desc'><p>The component to connect.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getCmp' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getCmp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getCmp' class='name expandable'>getCmp</a>( <span class='pre'>String cmp</span> ) : <a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a></div><div class='description'><div class='short'>Get's a child component of the associated parent component. ...</div><div class='long'><p>Get's a child component of the associated parent component.</p>\n\n<p>NOTE: As a convention, you should only ever call this if you want\nto <a href=\"#!/api/strappy.Component-method-configure\" rel=\"strappy.Component-method-configure\" class=\"docClass\">configure/reconfigure</a> the\ncomponent.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cmp</span> : String<div class='sub-desc'><p>The reference name of the component as defined in\nthe parent component.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a></span><div class='sub-desc'><p>The child component.</p>\n</div></li></ul></div></div></div><div id='method-getCmpName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getCmpName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getCmpName' class='name expandable'>getCmpName</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Returns the name of the parent component associated with the class using\nthis trait. ...</div><div class='long'><p>Returns the name of the parent component associated with the class using\nthis trait.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The name of the parent component.</p>\n</div></li></ul></div></div></div><div id='method-getConfig' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getConfig' class='name expandable'>getConfig</a>( <span class='pre'>String key</span> )</div><div class='description'><div class='short'>Gets the value of a config property. ...</div><div class='long'><p>Gets the value of a config property.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : String<div class='sub-desc'><p>The config property to get.</p>\n</div></li></ul></div></div></div><div id='method-getController' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getController' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getController' class='name expandable'>getController</a>( <span class='pre'>String controller</span> ) : <a href=\"#!/api/strappy.mvc.Controller\" rel=\"strappy.mvc.Controller\" class=\"docClass\">strappy.mvc.Controller</a></div><div class='description'><div class='short'>Fetches a controller from the parent component. ...</div><div class='long'><p>Fetches a controller from the parent component.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>controller</span> : String<div class='sub-desc'><p>The name of the controller.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.mvc.Controller\" rel=\"strappy.mvc.Controller\" class=\"docClass\">strappy.mvc.Controller</a></span><div class='sub-desc'><p>The Controller instance.</p>\n</div></li></ul></div></div></div><div id='method-getID' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getID' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getID' class='name expandable'>getID</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Gets the ID of the class which implemented this trait. ...</div><div class='long'><p>Gets the ID of the class which implemented this trait.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The ID.</p>\n</div></li></ul></div></div></div><div id='method-getIID' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getIID' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getIID' class='name expandable'>getIID</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Gets the instance ID (IID) of the component. ...</div><div class='long'><p>Gets the instance ID (IID) of the component.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The instance ID.</p>\n</div></li></ul></div></div></div><div id='method-getParentComponent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getParentComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getParentComponent' class='name expandable'>getParentComponent</a>( <span class='pre'></span> ) : <a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a></div><div class='description'><div class='short'>Returns the parent component associated with the class using this trait. ...</div><div class='long'><p>Returns the parent component associated with the class using this trait.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.Component\" rel=\"strappy.Component\" class=\"docClass\">strappy.Component</a></span><div class='sub-desc'><p>the parent component.</p>\n</div></li></ul></div></div></div><div id='method-getRadioTower' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getRadioTower' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getRadioTower' class='name expandable'>getRadioTower</a>( <span class='pre'></span> ) : <a href=\"#!/api/strappy.RadioTower\" rel=\"strappy.RadioTower\" class=\"docClass\">strappy.RadioTower</a></div><div class='description'><div class='short'>Returns the Radio Tower singleton. ...</div><div class='long'><p>Returns the Radio Tower singleton.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.RadioTower\" rel=\"strappy.RadioTower\" class=\"docClass\">strappy.RadioTower</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getSafeID' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getSafeID' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getSafeID' class='name expandable'>getSafeID</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Gets the ID of the class which implemented it and makes it safe\nfor using as a HTML-based ID. ...</div><div class='long'><p>Gets the ID of the class which implemented it and makes it safe\nfor using as a HTML-based ID.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The ID.</p>\n</div></li></ul></div></div></div><div id='method-getStateMgr' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getStateMgr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getStateMgr' class='name expandable'>getStateMgr</a>( <span class='pre'></span> ) : <a href=\"#!/api/strappy.StateMgr\" rel=\"strappy.StateMgr\" class=\"docClass\">strappy.StateMgr</a></div><div class='description'><div class='short'>Returns the State Manager singleton. ...</div><div class='long'><p>Returns the State Manager singleton.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.StateMgr\" rel=\"strappy.StateMgr\" class=\"docClass\">strappy.StateMgr</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getStore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getStore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getStore' class='name expandable'>getStore</a>( <span class='pre'>String model</span> ) : <a href=\"#!/api/strappy.mvc.Model\" rel=\"strappy.mvc.Model\" class=\"docClass\">strappy.mvc.Model</a></div><div class='description'><div class='short'>Fetches a model from the parent component. ...</div><div class='long'><p>Fetches a model from the parent component.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>model</span> : String<div class='sub-desc'><p>The name of the model.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.mvc.Model\" rel=\"strappy.mvc.Model\" class=\"docClass\">strappy.mvc.Model</a></span><div class='sub-desc'><p>The Model instance.</p>\n</div></li></ul></div></div></div><div id='method-getView' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getView' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getView' class='name expandable'>getView</a>( <span class='pre'>String view</span> ) : <a href=\"#!/api/strappy.mvc.View\" rel=\"strappy.mvc.View\" class=\"docClass\">strappy.mvc.View</a></div><div class='description'><div class='short'>Fetches a view from the parent component. ...</div><div class='long'><p>Fetches a view from the parent component.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>view</span> : String<div class='sub-desc'><p>The name of the view.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.mvc.View\" rel=\"strappy.mvc.View\" class=\"docClass\">strappy.mvc.View</a></span><div class='sub-desc'><p>The View instance.</p>\n</div></li></ul></div></div></div><div id='method-getViewCache' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-getViewCache' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-getViewCache' class='name expandable'>getViewCache</a>( <span class='pre'></span> ) : <a href=\"#!/api/strappy.mvc.ViewCache\" rel=\"strappy.mvc.ViewCache\" class=\"docClass\">strappy.mvc.ViewCache</a></div><div class='description'><div class='short'>Fetches the View Cache. ...</div><div class='long'><p>Fetches the View Cache.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/strappy.mvc.ViewCache\" rel=\"strappy.mvc.ViewCache\" class=\"docClass\">strappy.mvc.ViewCache</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-hasChildCmp' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.trait.ComponentConnector'>strappy.trait.ComponentConnector</span><br/><a href='source/ComponentConnector.html#strappy-trait-ComponentConnector-method-hasChildCmp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.trait.ComponentConnector-method-hasChildCmp' class='name expandable'>hasChildCmp</a>( <span class='pre'>Object cmp</span> ) : Boolean</div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cmp</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});