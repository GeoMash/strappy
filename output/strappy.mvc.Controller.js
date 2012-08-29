Ext.data.JsonP.strappy_mvc_Controller({"tagname":"class","name":"strappy.mvc.Controller","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":["strappy.trait.ComponentConnector","strappy.trait.signal.Receive","strappy.trait.signal.Send"],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"abstract":true},"private":null,"id":"class-strappy.mvc.Controller","members":{"cfg":[],"property":[],"method":[{"name":"constructor","tagname":"method","owner":"strappy.mvc.Controller","meta":{},"id":"method-constructor"},{"name":"onGotBaseHTML","tagname":"method","owner":"strappy.mvc.Controller","meta":{"abstract":true},"id":"method-onGotBaseHTML"},{"name":"onReadyState","tagname":"method","owner":"strappy.mvc.Controller","meta":{"abstract":true},"id":"method-onReadyState"},{"name":"onReconfigure","tagname":"method","owner":"strappy.mvc.Controller","meta":{"abstract":true},"id":"method-onReconfigure"},{"name":"onViewReady","tagname":"method","owner":"strappy.mvc.Controller","meta":{"abstract":true},"id":"method-onViewReady"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"linenr":1,"files":[{"filename":"Controller.js","href":"Controller.html#strappy-mvc-Controller"}],"html_meta":{"abstract":null},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Uses</h4><div class='dependency'><a href='#!/api/strappy.trait.ComponentConnector' rel='strappy.trait.ComponentConnector' class='docClass'>strappy.trait.ComponentConnector</a></div><div class='dependency'><a href='#!/api/strappy.trait.signal.Receive' rel='strappy.trait.signal.Receive' class='docClass'>strappy.trait.signal.Receive</a></div><div class='dependency'><a href='#!/api/strappy.trait.signal.Send' rel='strappy.trait.signal.Send' class='docClass'>strappy.trait.signal.Send</a></div><h4>Files</h4><div class='dependency'><a href='source/Controller.html#strappy-mvc-Controller' target='_blank'>Controller.js</a></div></pre><div class='doc-contents'><p>TODO:</p>\n\n<p>Explanation &amp; Examples.</p>\n\n<p>Bound Signals:</p>\n\n<ul>\n<li>strappy.Signal.SHOW: onSignalShow</li>\n<li>strappy.Signal.HIDE: onSignalHide</li>\n<li>strappy.Signal.VIEW_DONE_GOTBASEHTML: <a href=\"#!/api/strappy.mvc.Controller-method-onGotBaseHTML\" rel=\"strappy.mvc.Controller-method-onGotBaseHTML\" class=\"docClass\">onGotBaseHTML</a></li>\n<li>strappy.Signal.STATEFULMODEL_IS_READY: <a href=\"#!/api/strappy.mvc.Controller-method-onReadyState\" rel=\"strappy.mvc.Controller-method-onReadyState\" class=\"docClass\">onReadyState</a></li>\n</ul>\n\n\n<p>@traits strappy.trait.ComponentConnector\n@traits strappy.trait.signal.Receive\n@traits strappy.trait.signal.Send</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.mvc.Controller'>strappy.mvc.Controller</span><br/><a href='source/Controller.html#strappy-mvc-Controller-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/strappy.mvc.Controller-method-constructor' class='name expandable'>strappy.mvc.Controller</a>( <span class='pre'></span> ) : Object</div><div class='description'><div class='short'>Sets up the controller by binding to the above mentioned signals. ...</div><div class='long'><p>Sets up the controller by binding to the above mentioned signals.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onGotBaseHTML' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.mvc.Controller'>strappy.mvc.Controller</span><br/><a href='source/Controller.html#strappy-mvc-Controller-method-onGotBaseHTML' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.mvc.Controller-method-onGotBaseHTML' class='name expandable'>onGotBaseHTML</a>( <span class='pre'><a href=\"#!/api/strappy.Signal\" rel=\"strappy.Signal\" class=\"docClass\">strappy.Signal</a> The</span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>This method will be called when a view fires a Got Base HTML\nsignal. ...</div><div class='long'><p>This method will be called when a view fires a Got Base HTML\nsignal.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>The</span> : <a href=\"#!/api/strappy.Signal\" rel=\"strappy.Signal\" class=\"docClass\">strappy.Signal</a><div class='sub-desc'><p>signal object.</p>\n</div></li></ul></div></div></div><div id='method-onReadyState' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.mvc.Controller'>strappy.mvc.Controller</span><br/><a href='source/Controller.html#strappy-mvc-Controller-method-onReadyState' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.mvc.Controller-method-onReadyState' class='name expandable'>onReadyState</a>( <span class='pre'><a href=\"#!/api/strappy.Signal\" rel=\"strappy.Signal\" class=\"docClass\">strappy.Signal</a> The</span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>This method will be called when a state model fires a Stateful Model is Ready\nsignal. ...</div><div class='long'><p>This method will be called when a state model fires a Stateful Model is Ready\nsignal.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>The</span> : <a href=\"#!/api/strappy.Signal\" rel=\"strappy.Signal\" class=\"docClass\">strappy.Signal</a><div class='sub-desc'><p>signal object.</p>\n</div></li></ul></div></div></div><div id='method-onReconfigure' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.mvc.Controller'>strappy.mvc.Controller</span><br/><a href='source/Controller.html#strappy-mvc-Controller-method-onReconfigure' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.mvc.Controller-method-onReconfigure' class='name expandable'>onReconfigure</a>( <span class='pre'><a href=\"#!/api/strappy.Signal\" rel=\"strappy.Signal\" class=\"docClass\">strappy.Signal</a> The</span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>This method will be called when a component fires a Do Reconfigure\nsignal. ...</div><div class='long'><p>This method will be called when a component fires a Do Reconfigure\nsignal.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>The</span> : <a href=\"#!/api/strappy.Signal\" rel=\"strappy.Signal\" class=\"docClass\">strappy.Signal</a><div class='sub-desc'><p>signal object.</p>\n</div></li></ul></div></div></div><div id='method-onViewReady' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='strappy.mvc.Controller'>strappy.mvc.Controller</span><br/><a href='source/Controller.html#strappy-mvc-Controller-method-onViewReady' target='_blank' class='view-source'>view source</a></div><a href='#!/api/strappy.mvc.Controller-method-onViewReady' class='name expandable'>onViewReady</a>( <span class='pre'><a href=\"#!/api/strappy.Signal\" rel=\"strappy.Signal\" class=\"docClass\">strappy.Signal</a> The</span> )<strong class='abstract signature' >abstract</strong></div><div class='description'><div class='short'>This method will be called when a view fires a ready\nsignal. ...</div><div class='long'><p>This method will be called when a view fires a ready\nsignal.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>The</span> : <a href=\"#!/api/strappy.Signal\" rel=\"strappy.Signal\" class=\"docClass\">strappy.Signal</a><div class='sub-desc'><p>signal object.</p>\n</div></li></ul></div></div></div></div></div></div></div>"});