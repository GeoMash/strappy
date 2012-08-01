Ext.data.JsonP.GenericComponent({"guide":"<h1>Building a Generic List Component</h1>\n\n<p>In this guide, we'll go through the steps of building a generic component that can be reused multiple times throughout your application.</p>\n\n<p>Note that this guide isn't going to be touching on styling or anything like that. Though we will touch on the idea of attaching CSS classes to these components to make them appear differently in your application.</p>\n\n<h2>Scaffolding the Component</h2>\n\n<p>Using Strappy's command line tool, run this command, but change the path to reflect your project.</p>\n\n<pre><code>strap.py component list -d ../../../../Project\n</code></pre>\n\n<p>You should end up with something like this:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Project.component',\n        $name:      'List',\n        $extends:   strappy.Component\n    }\n)\n(\n    {},\n    {\n        config:\n        {\n\n        },\n        components:\n        {\n\n        },\n        stores:\n        [\n\n        ],\n        views:\n        [\n            'Default'\n        ],\n        controllers:\n        [\n            'Default'\n        ]\n    }\n);\n</code></pre>\n\n<p>Lets pad it out a bit with things that we'll need.</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Project.component',\n        $name:      'List',\n        $extends:   strappy.Component\n    }\n)\n(\n    {},\n    {\n        config:\n        {\n            attachTo:       null,\n            cls:            null,\n            allLabel:       'All Groups',\n            recordStore:    null,\n            signalKey:      null\n        },\n        components:\n        {\n\n        },\n        stores:\n        [\n\n        ],\n        views:\n        [\n            'Default'\n        ],\n        controllers:\n        [\n            'Default'\n        ],\n        configure: function(newConfig)\n        {\n            this.configure.$parent(newConfig);\n            this.observeOnce\n            (\n                'onConfigured',\n                function()\n                {\n                    this.attachSharedStore('Records',this.getConfig('recordStore'));\n                }.bind(this)\n            );\n        }\n    }\n);\n</code></pre>\n\n<p>Much better. But \"what's that at the bottom?\" I hear you ask. Well because this will be a generic component, we'll be utilising a</p>\n","title":"Generic Component"});