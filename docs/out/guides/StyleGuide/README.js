Ext.data.JsonP.StyleGuide({"guide":"<p>This is a simple style guide for using the framework with Spinifex software.</p>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/StyleGuide-section-1'>Controllers &amp; Views</a></li>\n<li><a href='#!/guide/StyleGuide-section-2'>Traits</a></li>\n</ol>\n</div>\n\n<h1>Config</h1>\n\n<p>Place top level component config within the main component file.</p>\n\n<p>Make sure to always keep an \"attachTo\" config option. This option should replace\nany such options that insert or attach the widget that you're converting into\na component to.</p>\n\n<br>\n\n\n<br>\n\n\n<p>Also keep it neat and tidy so that its easy on the eyes.</p>\n\n<br>\n\n\n<br>\n\n\n<p>Example:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Kleepr.component',\n        $name:      'Grid',\n        $extends:   framework.Component\n    }\n)\n(\n    {\n        //Signals go here...\n    },\n    {\n        config:\n        {\n            attachTo:               null,\n            rootNode:               0,\n            uploadProgressColumn:   null,\n            childPrefix:            'child-of-',\n            nodePrefix:             'grid-',\n            container:              null,\n            columns:                {},\n            store:                  null,\n            width:                  null,\n            height:                 null,\n            expandOnOver:           false,\n            stripes:                false,\n            defaultVariant:         'fit',\n            indentation:            15,\n            itemDblClickHandler:    null,\n            editTriggerTimeout:     0\n        },\n        components:\n        {\n\n        },\n        stores:\n        [\n\n        ],\n        views:\n        [\n\n        ],\n        controllers:\n        [\n\n        ]\n    }\n);\n</code></pre>\n\n<br>\n\n\n<br>\n\n\n<p>Config is always accessed through a getter method. This is available to all MVC instances.</p>\n\n<br>\n\n\n<br>\n\n\n<p>Example:</p>\n\n<pre><code>$.each(this.getConfig('columns'), function(key, columnData)\n{\n    if(columnData.editable) {\n        this._prepareCellForEditMode($('span.' + key, item), columnData);\n    }\n}.bind(this));\n</code></pre>\n\n<br>\n\n\n<br>\n\n\n<h1>Binding</h1>\n\n<p>Bind everything with the \"bind\" function extension. If you MUST create create a shortcut to this, don't use \"me\" use \"$this\".</p>\n\n<br>\n\n\n<p>Example:</p>\n\n<pre><code>$.each(sortedChildren, function(i, child)\n{\n    this.getView('Default').getWrapper().append($(child));\n}.bind(this));\n\nvar $this=this;\nthis.draggableConfig.helper =this.dragHelper.bind(this);\nthis.droppableConfig.drop   =function(event, ui) {$this.dropHandler(this, event, ui);};\nthis.droppableConfig.over   =function(event, ui) {$this.dragOverHandler(this, event, ui);};\n</code></pre>\n\n<br>\n\n\n<br>\n\n\n<h1>Controllers, Views &amp; Traits</h1>\n\n<p>A few rules to follow here.</p>\n\n<br>\n\n\n<h2 id='StyleGuide-section-1'>Controllers &amp; Views</h2>\n\n<p>Seems that \"many controllers, few views\" is a good way to go.\nSo try to break down your controllers into categories. Eventually we'll start to see some patterns emerge as we\nbuild components. This will increase the speed at which we can create components due to code reuse and convetion.</p>\n\n<br>\n\n\n<p>A few good ways to identify if something should be in a controller or a view:</p>\n\n<br>\n\n\n<h3>Controllers:</h3>\n\n<br>\n\n\n<ul>\n<li>Does the code try to made a decision?</li>\n<li>Does it iteract with another controller or component?</li>\n<li>Does it write to a store?</li>\n</ul>\n\n\n<br>\n\n\n<h3>Views:</h3>\n\n<br>\n\n\n<ul>\n<li>Does it bind to a DOM event?</li>\n<li>Does it directly affect the DOM?</li>\n<li>Does USE models to generate HTML?</li>\n<li>Does it generate HTML?</li>\n</ul>\n\n\n<br>\n\n\n<h2 id='StyleGuide-section-2'>Traits</h2>\n\n<p>Additionally, we want to try to avoid code duplication as much as possible. So if something can be rewritten to be\nmore generic. Rewrite it as a trait and use it in components.</p>\n\n<br>\n\n\n<p>We may need to break these down into \"view traits\" and \"controller traits\".</p>\n\n<br>\n\n\n<p>The traits namespace will be \"<projectName>.trait.<controller/view>.<traitName>\" and will be globally accessible.</p>\n\n<br>\n\n\n<h1>Method Names</h1>\n\n<p>Simple rules to follow here.</p>\n\n<br>\n\n\n<ul>\n<li>Camel case only.</li>\n<li>No underscores! - Not even to start the method name.</li>\n<li>Make them meaningful. I don't care if the method names are massive, so long as they make sense.</li>\n</ul>\n\n\n<br>\n\n\n<h1>Constants</h1>\n\n<p>JSKK provides a static section (its the first {} block). Put all constants there.\nIf a class is referring to its own constant, than the cleanest solution is to use reflection to access it.</p>\n\n<br>\n\n\n<p>Example:</p>\n\n<pre><code>if (foo==this.reflect('self').SOME_CONSTANT)\n{\n    //Do something...\n}\n</code></pre>\n\n<br>\n\n\n<br>\n\n","title":"Style Guide"});