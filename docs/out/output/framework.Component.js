Ext.data.JsonP.framework_Component({"tagname":"class","name":"framework.Component","extends":null,"mixins":["$JSKK.trait.Configurable"],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":["framework.RadioTower","framework.StateMgr"],"code_type":"nop","inheritable":false,"inheritdoc":null,"meta":{"abstract":true},"id":"class-framework.Component","members":{"cfg":[{"name":"attachTo","tagname":"cfg","owner":"framework.Component","meta":{},"id":"cfg-attachTo"}],"property":[{"name":"_configured","tagname":"property","owner":"framework.Component","meta":{"private":true},"id":"property-_configured"},{"name":"_controllers","tagname":"property","owner":"framework.Component","meta":{"private":true},"id":"property-_controllers"},{"name":"_models","tagname":"property","owner":"framework.Component","meta":{"private":true},"id":"property-_models"},{"name":"_views","tagname":"property","owner":"framework.Component","meta":{"private":true},"id":"property-_views"},{"name":"browser","tagname":"property","owner":"framework.Component","meta":{"readonly":true},"id":"property-browser"},{"name":"components","tagname":"property","owner":"framework.Component","meta":{},"id":"property-components"},{"name":"controllers","tagname":"property","owner":"framework.Component","meta":{},"id":"property-controllers"},{"name":"models","tagname":"property","owner":"framework.Component","meta":{},"id":"property-models"},{"name":"my","tagname":"property","owner":"framework.Component","meta":{"readonly":true},"id":"property-my"},{"name":"radioTower","tagname":"property","owner":"framework.Component","meta":{"private":true},"id":"property-radioTower"},{"name":"stateMgr","tagname":"property","owner":"framework.Component","meta":{"private":true},"id":"property-stateMgr"},{"name":"views","tagname":"property","owner":"framework.Component","meta":{},"id":"property-views"}],"method":[{"name":"constructor","tagname":"method","owner":"framework.Component","meta":{},"id":"method-constructor"},{"name":"configure","tagname":"method","owner":"framework.Component","meta":{},"id":"method-configure"},{"name":"getBrowser","tagname":"method","owner":"framework.Component","meta":{"private":true},"id":"method-getBrowser"},{"name":"getCmp","tagname":"method","owner":"framework.Component","meta":{},"id":"method-getCmp"},{"name":"getConfig","tagname":"method","owner":"framework.Component","meta":{},"id":"method-getConfig"},{"name":"getID","tagname":"method","owner":"framework.Component","meta":{},"id":"method-getID"},{"name":"getModel","tagname":"method","owner":"framework.Component","meta":{},"id":"method-getModel"},{"name":"getView","tagname":"method","owner":"framework.Component","meta":{},"id":"method-getView"},{"name":"initChildComponents","tagname":"method","owner":"framework.Component","meta":{"private":true},"id":"method-initChildComponents"},{"name":"initControllers","tagname":"method","owner":"framework.Component","meta":{"private":true},"id":"method-initControllers"},{"name":"initModels","tagname":"method","owner":"framework.Component","meta":{"private":true},"id":"method-initModels"},{"name":"initRadioTower","tagname":"method","owner":"framework.Component","meta":{},"id":"method-initRadioTower"},{"name":"initStateMgr","tagname":"method","owner":"framework.Component","meta":{},"id":"method-initStateMgr"},{"name":"initViews","tagname":"method","owner":"framework.Component","meta":{"private":true},"id":"method-initViews"},{"name":"isConfigured","tagname":"method","owner":"framework.Component","meta":{},"id":"method-isConfigured"},{"name":"reconfigure","tagname":"method","owner":"framework.Component","meta":{},"id":"method-reconfigure"},{"name":"sendSignal","tagname":"method","owner":"framework.Component","meta":{"private":true},"id":"method-sendSignal"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"files":[{"filename":"Component.js","href":"Component.html#framework-Component"}],"html_meta":{"abstract":null},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixins</h4><div class='dependency'>$JSKK.trait.Configurable</div><h4>Uses</h4><div class='dependency'><a href='#!/api/framework.RadioTower' rel='framework.RadioTower' class='docClass'>framework.RadioTower</a></div><div class='dependency'><a href='#!/api/framework.StateMgr' rel='framework.StateMgr' class='docClass'>framework.StateMgr</a></div><h4>Files</h4><div class='dependency'><a href='source/Component.html#framework-Component' target='_blank'>Component.js</a></div></pre><div class='doc-contents'><p>The core class which all components extend from.</p>\n\n<p>Components are the heart of the framework. Each component is in itself a core,\nwhich means that each component is stand-alone and not dependant on any other\ncomponent to operate.</p>\n\n<p>This is the core goal of the framework. If a component is not able to conform\nto this pattern, then something is wrong with how the component has been built.</p>\n\n<p>This class is designed to be extended from. You should never need to add any\nadditional logic in the extended class. That logic should be placed within\ncontrollers and associated with this component.</p>\n\n<p>When you extend this class, you should only need to define configuration for\nchild components, models, views and controllers.</p>\n\n<p>More often than not, your component will require custom signals. These signals\nshould be pre-defined for consistancy and maintainability within your</p>\n\n<p>An example of a component, with custom signals.</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component',\n        $name:      'MyComponent',\n        $extends:   framework.Component\n    }\n)\n(\n    {\n        SIGNAL:\n        {\n            LOGIN_SUCCESS:      'myComponent.login.success',\n            LOGIN_FAILURE:      'myComponent.login.fail'\n        }\n    },\n    {\n        components:\n        {\n            loginForm:      'Application.component.LoginForm',\n            errorWindow:    'Application.component.DialogWindow',\n            successWindow:  'Application.component.DialogWindow'\n        },\n        models:\n        [\n            'State',\n            'User'\n        ],\n        views:\n        [\n            'Default'\n        ],\n        controllers:\n        [\n            'State',\n            'Default'\n        ]\n    }\n);\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-attachTo' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-cfg-attachTo' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-cfg-attachTo' class='name expandable'>attachTo</a><span> : Object</span></div><div class='description'><div class='short'>The DOM element that this component will attach itself to. ...</div><div class='long'><p>The DOM element that this component will attach itself to. (required)</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-_configured' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-_configured' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-_configured' class='name expandable'>_configured</a><span> : Boolean</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A flag to indicate weather or not this component has been configured. ...</div><div class='long'><p>A flag to indicate weather or not this component has been configured.</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-_controllers' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-_controllers' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-_controllers' class='name expandable'>_controllers</a><span> : Object</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A container for all the initialized controllers. ...</div><div class='long'><p>A container for all the initialized controllers.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-_models' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-_models' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-_models' class='name expandable'>_models</a><span> : Object</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A container for all the initialized models. ...</div><div class='long'><p>A container for all the initialized models.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-_views' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-_views' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-_views' class='name expandable'>_views</a><span> : Object</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A container for all the initialized views. ...</div><div class='long'><p>A container for all the initialized views.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-browser' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-browser' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-browser' class='name expandable'>browser</a><span> : Object</span><strong class='readonly signature'>readonly</strong></div><div class='description'><div class='short'>Contains browser information. ...</div><div class='long'><p>Contains browser information.</p>\n<p>Defaults to: <code>{name: null, version: null}</code></p><ul><li><span class='pre'>name</span> : <div class='sub-desc'><p>The name of the browser.</p>\n</div></li><li><span class='pre'>version</span> : <div class='sub-desc'><p>The version of the browser.</p>\n</div></li></ul></div></div></div><div id='property-components' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-components' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-components' class='name expandable'>components</a><span> : Object</span></div><div class='description'><div class='short'>Specifiy a list of child components. ...</div><div class='long'><p>Specifiy a list of child components.</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component',\n        $name:      'MyComponent',\n        $extends:   framework.Component\n    }\n)\n(\n    {},\n    {\n        components:\n        {\n            loginForm:      'Application.component.LoginForm',\n            errorWindow:    'Application.component.DialogWindow',\n            successWindow:  'Application.component.DialogWindow'\n        }\n    }\n);\n</code></pre>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-controllers' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-controllers' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-controllers' class='name expandable'>controllers</a><span> : Array</span></div><div class='description'><div class='short'>Specify a list of controllers to pre-load. ...</div><div class='long'><p>Specify a list of controllers to pre-load.</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component',\n        $name:      'MyComponent',\n        $extends:   framework.Component\n    }\n)\n(\n    {},\n    {\n        controllers:\n        [\n            'State',\n            'Default'\n        ]\n    }\n);\n</code></pre>\n<p>Defaults to: <code>[]</code></p></div></div></div><div id='property-models' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-models' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-models' class='name expandable'>models</a><span> : Array</span></div><div class='description'><div class='short'>Specify a list of models to pre-load. ...</div><div class='long'><p>Specify a list of models to pre-load.</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component',\n        $name:      'MyComponent',\n        $extends:   framework.Component\n    }\n)\n(\n    {},\n    {\n        models:\n        [\n            'State',\n            'User'\n        ]\n    }\n);\n</code></pre>\n<p>Defaults to: <code>[]</code></p></div></div></div><div id='property-my' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-my' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-my' class='name expandable'>my</a><span> : Object</span><strong class='readonly signature'>readonly</strong></div><div class='description'><div class='short'>A special object containing information relevant to this class. ...</div><div class='long'><p>A special object containing information relevant to this class.</p>\n<p>Defaults to: <code>{name: null, index: null, NSObject: null}</code></p><ul><li><span class='pre'>name</span> : <div class='sub-desc'><p>The name of this class.</p>\n</div></li><li><span class='pre'>index</span> : <div class='sub-desc'><p>The position this component lives in within the stack of\ncomponents registered against the framework.</p>\n</div></li><li><span class='pre'>NSObject</span> : <div class='sub-desc'><p>The namespace in an object format of this class.</p>\n</div></li></ul></div></div></div><div id='property-radioTower' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-radioTower' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-radioTower' class='name expandable'>radioTower</a><span> : Object</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A reference to the Radio Tower. ...</div><div class='long'><p>A reference to the <a href=\"#!/api/framework.RadioTower\" rel=\"framework.RadioTower\" class=\"docClass\">Radio Tower</a>.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-stateMgr' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-stateMgr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-stateMgr' class='name expandable'>stateMgr</a><span> : Object</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A reference to the State Manager. ...</div><div class='long'><p>A reference to the <a href=\"#!/api/framework.StateMgr\" rel=\"framework.StateMgr\" class=\"docClass\">State Manager</a>.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-views' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-property-views' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-property-views' class='name expandable'>views</a><span> : Array</span></div><div class='description'><div class='short'>Specify a list of views to pre-load. ...</div><div class='long'><p>Specify a list of views to pre-load.</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component',\n        $name:      'MyComponent',\n        $extends:   framework.Component\n    }\n)\n(\n    {},\n    {\n        views:\n        [\n            'Default'\n        ]\n    }\n);\n</code></pre>\n<p>Defaults to: <code>[]</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/framework.Component-method-constructor' class='name expandable'>framework.Component</a>( <span class='pre'></span> ) : <a href=\"#!/api/framework.Component\" rel=\"framework.Component\" class=\"docClass\">framework.Component</a></div><div class='description'><div class='short'>Sets up the component by initalizing all it's child components,\nviews, models and controllers. ...</div><div class='long'><p>Sets up the component by initalizing all it's child components,\nviews, models and controllers.</p>\n\n<p>Additionally, it connects the component to the Radio Tower,\nenabling signals, and the State Manager, enabling state to be\ncaptured/restored.</p>\n\n<p>Note: The constructor automatically calls <a href=\"#!/api/framework.Component-method-reconfigure\" rel=\"framework.Component-method-reconfigure\" class=\"docClass\">reconfigure</a>\nwhen it is done.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.Component\" rel=\"framework.Component\" class=\"docClass\">framework.Component</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-configure' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-configure' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-configure' class='name expandable'>configure</a>( <span class='pre'>Object newConfig</span> ) : void</div><div class='description'><div class='short'>Configures this component with new configuration properties. ...</div><div class='long'><p>Configures this component with new configuration properties.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>newConfig</span> : Object<div class='sub-desc'><p>The new configuration object.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getBrowser' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-getBrowser' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-getBrowser' class='name expandable'>getBrowser</a>( <span class='pre'></span> )<strong class='private signature'>private</strong></div><div class='description'><div class='short'>Gets the browser info. ...</div><div class='long'><p>Gets the browser info. Note that this is currently tied to jQuery.</p>\n</div></div></div><div id='method-getCmp' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-getCmp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-getCmp' class='name expandable'>getCmp</a>( <span class='pre'>String cmpName</span> ) : <a href=\"#!/api/framework.Component\" rel=\"framework.Component\" class=\"docClass\">framework.Component</a></div><div class='description'><div class='short'>Returns a child component which is pre-defined in this\ncomponents \"components\" property. ...</div><div class='long'><p>Returns a child component which is pre-defined in this\ncomponents \"components\" property.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cmpName</span> : String<div class='sub-desc'><p>The reference name of the component to get as\ndefined by this component.\n@throws Error If the component is not registered.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.Component\" rel=\"framework.Component\" class=\"docClass\">framework.Component</a></span><div class='sub-desc'><p>the requested component.</p>\n</div></li></ul></div></div></div><div id='method-getConfig' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-getConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-getConfig' class='name expandable'>getConfig</a>( <span class='pre'>Object key</span> ) : Mixed</div><div class='description'><div class='short'>Fetches a config item associated with this component. ...</div><div class='long'><p>Fetches a config item associated with this component.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'><p>The config item's value.</p>\n</div></li></ul></div></div></div><div id='method-getID' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-getID' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-getID' class='name expandable'>getID</a>( <span class='pre'></span> ) : String</div><div class='description'><div class='short'>Calculates the ID of this component based off of\nits namespace and name. ...</div><div class='long'><p>Calculates the ID of this component based off of\nits namespace and name.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The ID of this component or the M/V/C class\nassociated with this component.</p>\n</div></li></ul></div></div></div><div id='method-getModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-getModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-getModel' class='name expandable'>getModel</a>( <span class='pre'>String model</span> ) : <a href=\"#!/api/framework.mvc.Model\" rel=\"framework.mvc.Model\" class=\"docClass\">framework.mvc.Model</a></div><div class='description'><div class='short'>Returns an associated model which is pre-defined in this\ncomponents \"models\" property. ...</div><div class='long'><p>Returns an associated model which is pre-defined in this\ncomponents \"models\" property.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>model</span> : String<div class='sub-desc'><p>The name of the model to get.\n@throws</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.mvc.Model\" rel=\"framework.mvc.Model\" class=\"docClass\">framework.mvc.Model</a></span><div class='sub-desc'><p>The requested model if it has been defined.</p>\n</div></li></ul></div></div></div><div id='method-getView' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-getView' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-getView' class='name expandable'>getView</a>( <span class='pre'>String view</span> ) : <a href=\"#!/api/framework.mvc.View\" rel=\"framework.mvc.View\" class=\"docClass\">framework.mvc.View</a></div><div class='description'><div class='short'>Returns an associated view which is pre-defined in this\ncomponents \"views\" property. ...</div><div class='long'><p>Returns an associated view which is pre-defined in this\ncomponents \"views\" property.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>view</span> : String<div class='sub-desc'><p>The name of the view to get.\n@throws Error if the view has not been initilized.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.mvc.View\" rel=\"framework.mvc.View\" class=\"docClass\">framework.mvc.View</a></span><div class='sub-desc'><p>The requested view if it has been defined.</p>\n</div></li></ul></div></div></div><div id='method-initChildComponents' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-initChildComponents' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-initChildComponents' class='name expandable'>initChildComponents</a>( <span class='pre'></span> )<strong class='private signature'>private</strong></div><div class='description'><div class='short'>Initializes all the child components associated with this component. ...</div><div class='long'><p>Initializes all the child components associated with this component.</p>\n</div></div></div><div id='method-initControllers' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-initControllers' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-initControllers' class='name expandable'>initControllers</a>( <span class='pre'></span> )<strong class='private signature'>private</strong></div><div class='description'><div class='short'>Initializes all the controllers associated with this component. ...</div><div class='long'><p>Initializes all the controllers associated with this component.</p>\n</div></div></div><div id='method-initModels' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-initModels' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-initModels' class='name expandable'>initModels</a>( <span class='pre'></span> )<strong class='private signature'>private</strong></div><div class='description'><div class='short'>Initializes all the models associated with this component. ...</div><div class='long'><p>Initializes all the models associated with this component.</p>\n</div></div></div><div id='method-initRadioTower' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-initRadioTower' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-initRadioTower' class='name expandable'>initRadioTower</a>( <span class='pre'></span> ) : void</div><div class='description'><div class='short'>Initalizes the component's conneciton to the Radio Tower. ...</div><div class='long'><p>Initalizes the component's conneciton to the Radio Tower.</p>\n\n<p>The Radio Tower enables signals to flow through this component.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-initStateMgr' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-initStateMgr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-initStateMgr' class='name expandable'>initStateMgr</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Initalizes the component's connection to the State Manager. ...</div><div class='long'><p>Initalizes the component's connection to the State Manager.</p>\n\n<p>The State Manager</p>\n</div></div></div><div id='method-initViews' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-initViews' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-initViews' class='name expandable'>initViews</a>( <span class='pre'></span> )<strong class='private signature'>private</strong></div><div class='description'><div class='short'>Initializes all the views associated with this component. ...</div><div class='long'><p>Initializes all the views associated with this component.</p>\n</div></div></div><div id='method-isConfigured' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-isConfigured' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-isConfigured' class='name expandable'>isConfigured</a>( <span class='pre'></span> ) : Boolean</div><div class='description'><div class='short'>A helper method to determine if this component has been configured. ...</div><div class='long'><p>A helper method to determine if this component has been configured.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>true if this component has been configured.</p>\n</div></li></ul></div></div></div><div id='method-reconfigure' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-reconfigure' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-reconfigure' class='name expandable'>reconfigure</a>( <span class='pre'></span> ) : void</div><div class='description'><div class='short'>Call this method to force the component to reconfigure itself. ...</div><div class='long'><p>Call this method to force the component to reconfigure itself.</p>\n\n<p>This essentially calls the </p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>void</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-sendSignal' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.Component'>framework.Component</span><br/><a href='source/Component.html#framework-Component-method-sendSignal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.Component-method-sendSignal' class='name expandable'>sendSignal</a>( <span class='pre'>Object name, Object body, Object type, Object filter</span> )<strong class='private signature'>private</strong></div><div class='description'><div class='short'>See framework.trait.signal.Send.sendSignal ...</div><div class='long'><p>See <a href=\"#!/api/framework.trait.signal.Send-method-sendSignal\" rel=\"framework.trait.signal.Send-method-sendSignal\" class=\"docClass\">framework.trait.signal.Send.sendSignal</a></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>body</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>type</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>filter</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});