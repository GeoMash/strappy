Ext.data.JsonP.framework_Signal({"tagname":"class","name":"framework.Signal","extends":null,"mixins":["$JSKK.trait.Configurable"],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":["$JSKK.trait.Configurable"],"code_type":"nop","inheritable":false,"inheritdoc":null,"meta":{},"id":"class-framework.Signal","members":{"cfg":[{"name":"body","tagname":"cfg","owner":"framework.Signal","meta":{},"id":"cfg-body"},{"name":"filter","tagname":"cfg","owner":"framework.Signal","meta":{},"id":"cfg-filter"},{"name":"name","tagname":"cfg","owner":"framework.Signal","meta":{},"id":"cfg-name"},{"name":"type","tagname":"cfg","owner":"framework.Signal","meta":{},"id":"cfg-type"}],"property":[],"method":[{"name":"getBody","tagname":"method","owner":"framework.Signal","meta":{},"id":"method-getBody"},{"name":"getFilter","tagname":"method","owner":"framework.Signal","meta":{},"id":"method-getFilter"},{"name":"getName","tagname":"method","owner":"framework.Signal","meta":{},"id":"method-getName"},{"name":"getType","tagname":"method","owner":"framework.Signal","meta":{},"id":"method-getType"},{"name":"isForMe","tagname":"method","owner":"framework.Signal","meta":{},"id":"method-isForMe"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[{"name":"CMP_DO_RECONFIGURE","tagname":"property","owner":"framework.Signal","meta":{"static":true},"id":"static-property-CMP_DO_RECONFIGURE"},{"name":"COMPONENT_IS_READY","tagname":"property","owner":"framework.Signal","meta":{"static":true},"id":"static-property-COMPONENT_IS_READY"},{"name":"GLOBAL","tagname":"property","owner":"framework.Signal","meta":{"static":true},"id":"static-property-GLOBAL"},{"name":"LOCAL","tagname":"property","owner":"framework.Signal","meta":{"static":true},"id":"static-property-LOCAL"},{"name":"STATE_CHANGE","tagname":"property","owner":"framework.Signal","meta":{"static":true},"id":"static-property-STATE_CHANGE"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"files":[{"filename":"Signal.js","href":"Signal.html#framework-Signal"}],"html_meta":{},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixins</h4><div class='dependency'>$JSKK.trait.Configurable</div><h4>Uses</h4><div class='dependency'>$JSKK.trait.Configurable</div><h4>Files</h4><div class='dependency'><a href='source/Signal.html#framework-Signal' target='_blank'>Signal.js</a></div></pre><div class='doc-contents'><p>This is the signal class. It is used as a factory by the\n<a href=\"#!/api/framework.trait.signal.Send\" rel=\"framework.trait.signal.Send\" class=\"docClass\">framework.trait.signal.Send</a> trait.</p>\n\n<p>This class also contains constants for every framework level\nsignal that is emitted by the base <a href=\"#!/api/framework.Component\" rel=\"framework.Component\" class=\"docClass\">component class</a>,\n<a href=\"#!/api/framework.mvc.Model\" rel=\"framework.mvc.Model\" class=\"docClass\">models</a>, <a href=\"#!/api/framework.mvc.View\" rel=\"framework.mvc.View\" class=\"docClass\">views</a> and\n<a href=\"#!/api/framework.mvc.Controller\" rel=\"framework.mvc.Controller\" class=\"docClass\">controllers</a>.</p>\n\n<p>An instance of this class is generated for every signal\nthat is invoked by the framework.</p>\n\n<p>Every signal contains at least a name and a body. A signal may\noptionally contain a type property and a filter. The latter two\nproperties can be used to fine-grainly filter a signal so that it\nis not used in the wrong way.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-body' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-cfg-body' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-cfg-body' class='name expandable'>body</a><span> : Object</span></div><div class='description'><div class='short'>The body of the signal. ...</div><div class='long'><p>The body of the signal. This should be an object\ncontaining key/value pair values.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='cfg-filter' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-cfg-filter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-cfg-filter' class='name expandable'>filter</a><span> : Object</span></div><div class='description'><div class='short'>An additional filter containing a mix of\nkey/value pair values. ...</div><div class='long'><p>An additional filter containing a mix of\nkey/value pair values.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='cfg-name' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-cfg-name' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-cfg-name' class='name expandable'>name</a><span> : String</span></div><div class='description'><div class='short'>The name of the signal. ...</div><div class='long'><p>The name of the signal.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='cfg-type' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-cfg-type' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-cfg-type' class='name expandable'>type</a><span> : String</span></div><div class='description'><div class='short'>An additional type filter. ...</div><div class='long'><p>An additional type filter.</p>\n<p>Defaults to: <code>null</code></p></div></div></div></div></div><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Properties</h3><div id='static-property-CMP_DO_RECONFIGURE' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-static-property-CMP_DO_RECONFIGURE' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-static-property-CMP_DO_RECONFIGURE' class='name expandable'>CMP_DO_RECONFIGURE</a><span> : String</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;component.do.reconfigure&quot;</code></p></div></div></div><div id='static-property-COMPONENT_IS_READY' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-static-property-COMPONENT_IS_READY' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-static-property-COMPONENT_IS_READY' class='name expandable'>COMPONENT_IS_READY</a><span> : String</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;component.ready&quot;</code></p></div></div></div><div id='static-property-GLOBAL' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-static-property-GLOBAL' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-static-property-GLOBAL' class='name expandable'>GLOBAL</a><span> : String</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>Forces the signal to be global. ...</div><div class='long'><p>Forces the signal to be global. Meaning it will be sent\nto all components.</p>\n<p>Defaults to: <code>&quot;global&quot;</code></p></div></div></div><div id='static-property-LOCAL' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-static-property-LOCAL' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-static-property-LOCAL' class='name expandable'>LOCAL</a><span> : String</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>Forces the signal to be localized within the component\nthat it was sent from. ...</div><div class='long'><p>Forces the signal to be localized within the component\nthat it was sent from.</p>\n<p>Defaults to: <code>&quot;local&quot;</code></p></div></div></div><div id='static-property-STATE_CHANGE' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-static-property-STATE_CHANGE' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-static-property-STATE_CHANGE' class='name expandable'>STATE_CHANGE</a><span> : String</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;state.change&quot;</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-getBody' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-method-getBody' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-method-getBody' class='name expandable'>getBody</a>( <span class='pre'></span> ) : Object</div><div class='description'><div class='short'>Gets the body of the signal. ...</div><div class='long'><p>Gets the body of the signal.</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component.myComponent.controller',\n        $name:      'Default',\n        $extends:   framework.mvc.Controller\n    }\n)\n(\n    {},\n    {\n        onGotBaseHTML: function(signal)\n        {\n            if (signal.getBody().id=='Application.component.myComponent.view.Default')\n            {\n                //Do something here...\n            }\n        }\n    }\n);\n</code></pre>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>The body of the signal.</p>\n</div></li></ul></div></div></div><div id='method-getFilter' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-method-getFilter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-method-getFilter' class='name expandable'>getFilter</a>( <span class='pre'></span> ) : Object</div><div class='description'><div class='short'>Gets the filter object of the signal. ...</div><div class='long'><p>Gets the filter object of the signal.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>The signal's filter object.</p>\n</div></li></ul></div></div></div><div id='method-getName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-method-getName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-method-getName' class='name expandable'>getName</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Gets the name of the signal. ...</div><div class='long'><p>Gets the name of the signal.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The name of the signal.</p>\n</div></li></ul></div></div></div><div id='method-getType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-method-getType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-method-getType' class='name expandable'>getType</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Gets the type of the signal. ...</div><div class='long'><p>Gets the type of the signal.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The signal type.</p>\n</div></li></ul></div></div></div><div id='method-isForMe' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Signal'>framework.Signal</span><br/><a href='source/Signal.html#framework-Signal-method-isForMe' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Signal-method-isForMe' class='name expandable'>isForMe</a>( <span class='pre'>Object type, Object filter</span> ) : Boolean</div><div class='description'><div class='short'>This method will check the signals type and filter against\nthe provided type and filter to see if they match. ...</div><div class='long'><p>This method will check the signals type and filter against\nthe provided type and filter to see if they match.</p>\n\n<p>Controllers can use this method in case they require fine-grained\ncontroll over which signals are accepted/rejected.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : Object<div class='sub-desc'><p>{String} The signal type to be tested against as a string.</p>\n</div></li><li><span class='pre'>filter</span> : Object<div class='sub-desc'><p>{Object} The signal filter to be tested against as an object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if the filter is a match.</p>\n\n<p>NOTE: NOT IMPLEMENTED</p>\n</div></li></ul></div></div></div></div></div></div></div>"});