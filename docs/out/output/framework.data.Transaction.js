Ext.data.JsonP.framework_data_Transaction({"tagname":"class","name":"framework.data.Transaction","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":["framework.data.Queue","framework.mvc.Model"],"code_type":"nop","inheritable":false,"inheritdoc":null,"meta":{},"id":"class-framework.data.Transaction","members":{"cfg":[],"property":[{"name":"store","tagname":"property","owner":"framework.data.Transaction","meta":{},"id":"property-store"}],"method":[{"name":"constructor","tagname":"method","owner":"framework.data.Transaction","meta":{},"id":"method-constructor"},{"name":"attachModel","tagname":"method","owner":"framework.data.Transaction","meta":{},"id":"method-attachModel"},{"name":"commit","tagname":"method","owner":"framework.data.Transaction","meta":{},"id":"method-commit"},{"name":"execute","tagname":"method","owner":"framework.data.Transaction","meta":{},"id":"method-execute"},{"name":"fullLock","tagname":"method","owner":"framework.data.Transaction","meta":{},"id":"method-fullLock"},{"name":"readOnly","tagname":"method","owner":"framework.data.Transaction","meta":{},"id":"method-readOnly"},{"name":"rollback","tagname":"method","owner":"framework.data.Transaction","meta":{},"id":"method-rollback"},{"name":"start","tagname":"method","owner":"framework.data.Transaction","meta":{},"id":"method-start"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[{"name":"STATE_COMITTED","tagname":"property","owner":"framework.data.Transaction","meta":{"static":true},"id":"static-property-STATE_COMITTED"},{"name":"STATE_COMPLETE","tagname":"property","owner":"framework.data.Transaction","meta":{"static":true},"id":"static-property-STATE_COMPLETE"},{"name":"STATE_FAILED","tagname":"property","owner":"framework.data.Transaction","meta":{"static":true},"id":"static-property-STATE_FAILED"},{"name":"STATE_INIT","tagname":"property","owner":"framework.data.Transaction","meta":{"static":true},"id":"static-property-STATE_INIT"},{"name":"STATE_ROLLEDBACK","tagname":"property","owner":"framework.data.Transaction","meta":{"static":true},"id":"static-property-STATE_ROLLEDBACK"},{"name":"STATE_STARTED","tagname":"property","owner":"framework.data.Transaction","meta":{"static":true},"id":"static-property-STATE_STARTED"},{"name":"STATE_SUCCESS","tagname":"property","owner":"framework.data.Transaction","meta":{"static":true},"id":"static-property-STATE_SUCCESS"}],"method":[],"event":[],"css_var":[],"css_mixin":[]},"files":[{"filename":"Transaction.js","href":"Transaction.html#framework-data-Transaction"}],"html_meta":{},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Uses</h4><div class='dependency'><a href='#!/api/framework.data.Queue' rel='framework.data.Queue' class='docClass'>framework.data.Queue</a></div><div class='dependency'><a href='#!/api/framework.mvc.Model' rel='framework.mvc.Model' class='docClass'>framework.mvc.Model</a></div><h4>Files</h4><div class='dependency'><a href='source/Transaction.html#framework-data-Transaction' target='_blank'>Transaction.js</a></div></pre><div class='doc-contents'><p>Model Transaction Utility.</p>\n\n<p>Example:</p>\n\n<pre><code>var store           =this.getStore('File'),\n    model1          =store.getById(112),\n    model2          =store.getById(119),\n    transaction     =new framework.data.Transaction(false),\n    clonedModel1    =transaction.attachModel(model1),\n    clonedModel2    =transaction.attachModel(model2);\n\nclonedModel1.set('name','Foo');\nclonedModel2.set('name','Bar');\n\ntransaction.execute\n(\n    {\n        onSuccess:  function()\n        {\n            //Don't actually ever unlock like this - this is for example only!!!\n            model1.lock(framework.mvc.Model.LOCK_NONE);\n            model2.lock(framework.mvc.Model.LOCK_NONE);\n            console.debug(model1.get('name'),model2.get('name'));\n            transaction.commit();\n            console.debug(model1.get('name'),model2.get('name'));\n            console.debug('Transaction success!');\n        }.bind(this),\n        onFailure: function()\n        {\n            transaction.rollback();\n            console.debug('Transaction failure!');\n        }\n    }\n);\n</code></pre>\n\n<br>\n\n\n<p>With Memory Proxy:</p>\n\n<pre><code>var store           =this.getStore('File'),\n    model1          =store.getById(112),\n    model2          =store.getById(119),\n    transaction     =new framework.data.Transaction(false),\n    clonedModel1    =transaction.attachModel(model1),\n    clonedModel2    =transaction.attachModel(model2);\n\nclonedModel1.set('name','Foo');\nclonedModel2.set('name','Bar');\n\n//Don't actually ever unlock like this - this is for example only!!!\nmodel1.lock(framework.mvc.Model.LOCK_NONE);\nmodel2.lock(framework.mvc.Model.LOCK_NONE);\nconsole.debug(model1.get('name'),model2.get('name'));\ntransaction.commit();\nconsole.debug(model1.get('name'),model2.get('name'));\n</code></pre>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance Properties</h3><div id='property-store' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-property-store' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-property-store' class='name not-expandable'>store</a><span> : Object</span></div><div class='description'><div class='short'><p>If the model has an attached store, inform it that\nthis model has been attached to a transaction.</p>\n</div><div class='long'><p>If the model has an attached store, inform it that\nthis model has been attached to a transaction.</p>\n</div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Properties</h3><div id='static-property-STATE_COMITTED' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-static-property-STATE_COMITTED' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-static-property-STATE_COMITTED' class='name expandable'>STATE_COMITTED</a><span> : Number</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>The transaction has been comitted. ...</div><div class='long'><p>The transaction has been comitted.</p>\n<p>Defaults to: <code>2</code></p></div></div></div><div id='static-property-STATE_COMPLETE' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-static-property-STATE_COMPLETE' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-static-property-STATE_COMPLETE' class='name expandable'>STATE_COMPLETE</a><span> : Number</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>The transaction has been comitted. ...</div><div class='long'><p>The transaction has been comitted.</p>\n<p>Defaults to: <code>4</code></p></div></div></div><div id='static-property-STATE_FAILED' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-static-property-STATE_FAILED' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-static-property-STATE_FAILED' class='name expandable'>STATE_FAILED</a><span> : Number</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>The transaction failed. ...</div><div class='long'><p>The transaction failed.</p>\n<p>Defaults to: <code>16</code></p></div></div></div><div id='static-property-STATE_INIT' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-static-property-STATE_INIT' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-static-property-STATE_INIT' class='name expandable'>STATE_INIT</a><span> : Number</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>The Transaction has been initalized but not started. ...</div><div class='long'><p>The Transaction has been initalized but not started.</p>\n<p>Defaults to: <code>0</code></p></div></div></div><div id='static-property-STATE_ROLLEDBACK' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-static-property-STATE_ROLLEDBACK' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-static-property-STATE_ROLLEDBACK' class='name expandable'>STATE_ROLLEDBACK</a><span> : Number</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>The transaction failed. ...</div><div class='long'><p>The transaction failed.</p>\n<p>Defaults to: <code>32</code></p></div></div></div><div id='static-property-STATE_STARTED' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-static-property-STATE_STARTED' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-static-property-STATE_STARTED' class='name expandable'>STATE_STARTED</a><span> : Number</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>The transaction has started. ...</div><div class='long'><p>The transaction has started.</p>\n<p>Defaults to: <code>1</code></p></div></div></div><div id='static-property-STATE_SUCCESS' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-static-property-STATE_SUCCESS' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-static-property-STATE_SUCCESS' class='name expandable'>STATE_SUCCESS</a><span> : Number</span><strong class='static signature'>static</strong></div><div class='description'><div class='short'>The transaction was successful. ...</div><div class='long'><p>The transaction was successful.</p>\n<p>Defaults to: <code>8</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/framework.data.Transaction-method-constructor' class='name expandable'>framework.data.Transaction</a>( <span class='pre'>Boolean queue</span> ) : <a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></div><div class='description'><div class='short'>Sets up the transaction object, enabling or disabling queueing. ...</div><div class='long'><p>Sets up the transaction object, enabling or disabling queueing.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>queue</span> : Boolean<div class='sub-desc'><p>True if queueing is enabled.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-attachModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-method-attachModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-method-attachModel' class='name expandable'>attachModel</a>( <span class='pre'><a href=\"#!/api/framework.mvc.Model\" rel=\"framework.mvc.Model\" class=\"docClass\">framework.mvc.Model</a> model</span> ) : <a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></div><div class='description'><div class='short'>Attaches a model to the transaction. ...</div><div class='long'><p>Attaches a model to the transaction. This method will return a cloned instance\nof the model. All changes to the cloned instance will be reflected on the original\nmodel once the transaction has been comitted.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>model</span> : <a href=\"#!/api/framework.mvc.Model\" rel=\"framework.mvc.Model\" class=\"docClass\">framework.mvc.Model</a><div class='sub-desc'><p>The model to attach to the transaction.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></span><div class='sub-desc'><p>A clone of the original model.</p>\n</div></li></ul></div></div></div><div id='method-commit' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-method-commit' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-method-commit' class='name expandable'>commit</a>( <span class='pre'></span> ) : <a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></div><div class='description'><div class='short'>Commits the transaction. ...</div><div class='long'><p>Commits the transaction.</p>\n\n<p>All changes made to any of the attached model's clones will\nbe reflected upon the original models.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-execute' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-method-execute' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-method-execute' class='name expandable'>execute</a>( <span class='pre'>Object config</span> ) : <a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></div><div class='description'><div class='short'>Executes the transaction. ...</div><div class='long'><p>Executes the transaction.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>A config object.</p>\n<ul><li><span class='pre'>onSuccess</span> : Function<div class='sub-desc'><p>Called when the transaction is successful.</p>\n</div></li><li><span class='pre'>onFailure</span> : Function<div class='sub-desc'><p>Called when the transaction has failed.</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-fullLock' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-method-fullLock' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-method-fullLock' class='name expandable'>fullLock</a>( <span class='pre'></span> ) : <a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></div><div class='description'><div class='short'>Applies a full lock to the associated models. ...</div><div class='long'><p>Applies a full lock to the associated models.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-readOnly' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-method-readOnly' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-method-readOnly' class='name expandable'>readOnly</a>( <span class='pre'></span> ) : <a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></div><div class='description'><div class='short'>Applies a read-only lock to the associated models. ...</div><div class='long'><p>Applies a read-only lock to the associated models.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-rollback' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-method-rollback' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-method-rollback' class='name expandable'>rollback</a>( <span class='pre'></span> ) : <a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></div><div class='description'><div class='short'>Rolls back the transaction, effectively trashing all\nchanges made to all attached models and destroying the\ntransacti...</div><div class='long'><p>Rolls back the transaction, effectively trashing all\nchanges made to all attached models and destroying the\ntransaction object.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-start' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='framework.data.Transaction'>framework.data.Transaction</span><br/><a href='source/Transaction.html#framework-data-Transaction-method-start' target='_blank' class='view-source'>view source</a></div><a href='#!/api/framework.data.Transaction-method-start' class='name expandable'>start</a>( <span class='pre'></span> ) : <a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></div><div class='description'><div class='short'>Starts the transaction process. ...</div><div class='long'><p>Starts the transaction process. Automatically calls {@see framework.Transaction#fullLock}.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/framework.data.Transaction\" rel=\"framework.data.Transaction\" class=\"docClass\">framework.data.Transaction</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>"});