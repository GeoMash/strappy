Ext.data.JsonP.framework_trait_signal_Send({"tagname":"class","name":"framework.trait.signal.Send","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"code_type":"nop","inheritable":false,"inheritdoc":null,"meta":{"abstract":true},"id":"class-framework.trait.signal.Send","members":{"cfg":[],"property":[],"method":[{"name":"sendSignal","tagname":"method","owner":"framework.trait.signal.Send","meta":{},"id":"method-sendSignal"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"files":[{"filename":"Send.js","href":"Send.html#framework-trait-signal-Send"}],"html_meta":{"abstract":null},"component":false,"superclasses":[],"subclasses":[],"mixedInto":["framework.StateMgr","framework.mvc.Model","framework.mvc.View","framework.mvc.Controller","framework.mvc.stateful.Model","framework.mvc.stateful.Controller"],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixed into</h4><div class='dependency'><a href='#!/api/framework.StateMgr' rel='framework.StateMgr' class='docClass'>framework.StateMgr</a></div><div class='dependency'><a href='#!/api/framework.mvc.Controller' rel='framework.mvc.Controller' class='docClass'>framework.mvc.Controller</a></div><div class='dependency'><a href='#!/api/framework.mvc.Model' rel='framework.mvc.Model' class='docClass'>framework.mvc.Model</a></div><div class='dependency'><a href='#!/api/framework.mvc.View' rel='framework.mvc.View' class='docClass'>framework.mvc.View</a></div><div class='dependency'><a href='#!/api/framework.mvc.stateful.Controller' rel='framework.mvc.stateful.Controller' class='docClass'>framework.mvc.stateful.Controller</a></div><div class='dependency'><a href='#!/api/framework.mvc.stateful.Model' rel='framework.mvc.stateful.Model' class='docClass'>framework.mvc.stateful.Model</a></div><h4>Files</h4><div class='dependency'><a href='source/Send.html#framework-trait-signal-Send' target='_blank'>Send.js</a></div></pre><div class='doc-contents'><p>This trait enables a <a href=\"#!/api/framework.mvc.Model\" rel=\"framework.mvc.Model\" class=\"docClass\">model</a>,\n<a href=\"#!/api/framework.mvc.View\" rel=\"framework.mvc.View\" class=\"docClass\">view</a> or <a href=\"#!/api/framework.mvc.Controller\" rel=\"framework.mvc.Controller\" class=\"docClass\">controller</a>\nwith the ability to send signals.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-sendSignal' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.trait.signal.Send'>framework.trait.signal.Send</span><br/><a href='source/Send.html#framework-trait-signal-Send-method-sendSignal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.trait.signal.Send-method-sendSignal' class='name expandable'>sendSignal</a>( <span class='pre'>String name, Object body, String type, Object filter</span> ) : Boolean</div><div class='description'><div class='short'>This will send a signal to the Signal Tower where\nit will be emitted for other components and component entities to r...</div><div class='long'><p>This will send a signal to the Signal Tower where\nit will be emitted for other components and component entities to receive.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The name of the signal.</p>\n</div></li><li><span class='pre'>body</span> : Object<div class='sub-desc'><p>The body of the signal. This can contain any kind of data.</p>\n</div></li><li><span class='pre'>type</span> : String<div class='sub-desc'><p>The type of the signal. Used for further filtering by type.</p>\n</div></li><li><span class='pre'>filter</span> : Object<div class='sub-desc'><p>An extra filter parameter used to filter more abstractly.\n@throws Error if the signal name is empty.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if the signal was successfully sent.</p>\n</div></li></ul></div></div></div></div></div></div></div>"});