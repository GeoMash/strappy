Ext.data.JsonP.ApplicationComponent({"guide":"<h1>Building an Application Component</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/ApplicationComponent-section-1'>Scaffolding the Application Component</a></li>\n<li><a href='#!/guide/ApplicationComponent-section-2'>Main Component File</a></li>\n<li><a href='#!/guide/ApplicationComponent-section-3'>Signals</a></li>\n<li><a href='#!/guide/ApplicationComponent-section-4'>Generic Components</a></li>\n</ol>\n</div>\n\n<p>The idea behind creating a main application component is to create the presence of a \"core\" for your application. A central component which manages core business logic in your front end application.<br></p>\n\n<p>Depending on how you decide to build your application as a whole will dictate which tools you incorporate into your application component.<br></p>\n\n<p>Strappy comes with several core tools to help manage your application. Such tools are the <a href=\"#!/api/strappy.InitQueue\" rel=\"strappy.InitQueue\" class=\"docClass\">Init Queue</a>, Signals, <a href=\"#!/api/strappy.ShareMgr\" rel=\"strappy.ShareMgr\" class=\"docClass\">Shared Store Manager</a> and <a href=\"#!/api/strappy.SharedState\" rel=\"strappy.SharedState\" class=\"docClass\">Shared State</a>.<br></p>\n\n<p>This guide will step you through the recommended way to build an application component and take advantage of the tools which Strappy provides.</p>\n\n<h2 id='ApplicationComponent-section-1'>Scaffolding the Application Component</h2>\n\n<p>Using Strappy's command line tool, run this command, but change the path to reflect your project.</p>\n\n<pre><code>strap.py component application -d ../../../../Project\n</code></pre>\n\n<p>By running that command, you have created the shell for your new application component. The new component will be found in the directory you specified under \"component/application\".</p>\n\n<p>Note that you can run this same command for generating other components. You can also concatenate the component names with a comma to generate multiple new components at once.\nSubstituting \"component\" for \"model\", \"view\", \"controller\" or \"store\" will create those for you too, but be sure to specify which component you're generating it for by providing a \"-cmp <componentName>\" argument.</p>\n\n<h2 id='ApplicationComponent-section-2'>Main Component File</h2>\n\n<p>Open Applicaiton.js, it should look something like this:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Project.component',\n        $name:      'Application',\n        $extends:   strappy.Component\n    }\n)\n(\n    {},\n    {\n        config:\n        {\n\n        },\n        components:\n        {\n\n        },\n        stores:\n        [\n\n        ],\n        views:\n        [\n            'Default'\n        ],\n        controllers:\n        [\n            'Default'\n        ]\n    }\n);\n</code></pre>\n\n<p>So far, its very simple. We'll need to add and remove some things. At this stage we're really just creating place-holders.</p>\n\n<p>Your new Application.js file should look something like this:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Project.component',\n        $name:      'Application',\n        $extends:   strappy.Component\n    }\n)\n(\n    {\n        Signal:\n        {\n\n        },\n        Type:\n        {\n\n        },\n        Key:\n        {\n\n        }\n    },\n    {\n        components:\n        {\n\n        },\n        stores:\n        [\n\n        ],\n        views:\n        [\n            'Default'\n        ],\n        controllers:\n        [\n            'Default'\n        ]\n    }\n);\n</code></pre>\n\n<p>An explanation of what we're doing with those static containers will be in the next chapter.</p>\n\n<h2 id='ApplicationComponent-section-3'>Signals</h2>\n\n<h3>Filtering</h3>\n\n<p>Signals are predefined here and used throughout your application by components.<br>\nThe idea is to prevent direct communication between components. We do this by emitting signals which are caught by whatever components are registered to receive them.<br>\nBut a lot of the time you need to control exactly which signals reach what components.</p>\n\n<p>To achieve this, we make the application component behave as a mediator of the signals. Components (application component excluded), emit signals with a destination filter set to \"application\".</p>\n\n<p>Sender Example (Other Component):</p>\n\n<pre><code>this.sendSignal\n(\n    Project.component.Application.Signal.BROWSE,\n    Project.component.Application.Type.SELECT,\n    {\n        key:            this.getConfig('signalKey'),\n        destination:    'application'\n    }\n);\n</code></pre>\n\n<p>Receiver Example (Application Component):</p>\n\n<pre><code>this.registerSignals\n(\n    {\n        onBrowse:\n        {\n            signal: Project.component.Application.Signal.BROWSE,\n            type:   Project.component.Application.Type.SELECT,\n            filter:\n            {\n                destination:    'application',\n                key:            Project.component.Application.Key.LIST_CHANNELS\n            }\n        }\n    }\n);\n</code></pre>\n\n<p>You can see a couple more items in those examples which haven't been explained yet. We'll get to those in a moment. But first, the important thing to note in these examples is the filtering.</p>\n\n<p>With signal filtering, you can attach any filter you like to a signal, whatever component's register for those signals will only execute their callback methods if their filter matches the filter that was set when emitting the signal.</p>\n\n<p>Some other things of note in the above example is the use of \"type\" and \"key\".</p>\n\n<h3>Type</h3>\n\n<p>Type is another level of filtering. It is in fact the first level of filtering. You don't actually need to specify a type or a filter when emitting a signal but doing so helps to get the message to the right components.\nUsually type is used as the action that was taken which caused the signal to be emitted. So in the above example, the action of \"selecting\" an item on screen was the cause, so we specify the SELECT type. This could have been \"double click\" in which case we could specify a DBCLICK type.\nThis helps you to control, with precision, what user actions in your application cause which business controls to be executed, ultimately allowing different interactions to result in slightly different behaviours.</p>\n\n<h3>Key</h3>\n\n<p>Depending on the size and nature of the application you're building, you may need to create generic components. Generic components are usually reusable components, that is, a component which is initialized multiple times either by the application component or by any number of composite components that you create.</p>\n\n<p>As you can imagine, when a generic component emits a signal, chances are it's going to be the exact same signal as another instance of the same component. This is where signal keys are used.</p>\n\n<p>Signal keys are unique strings which are passed to the component during its configuration phase. This string is then attached to every signal that the component emits.\nAs you can see in the above example, components can listen in for those signals and attach a key filter, which means that the listener will always receive signals from the component it was expecting to receive it from.</p>\n\n<p>...</p>\n\n<h2 id='ApplicationComponent-section-4'>Generic Components</h2>\n\n<p>We mentioned generic components earlier. This section of the guide is to explain, in detail, how to manage these components.</p>\n\n<p>There are two approaches for this. I'll explain them both, but we'll be using the latter.</p>\n\n<p>The first option, you can create composite components and consider them as \"extensions\" to your application component. That is to say, your application component instantiates these components, and these components instantiate subcomponents and manage those in similar ways to which the application component does.</p>\n\n<p>The second option, and the option which we'll be demonstrating in this guide, is by using multiple controllers to handle the various sections of your application.\nThis approach reduces the amount of composite components and centralises the business logic by encapsulating the logic specialized controllers, managed by your application component.</p>\n\n<p>Before continuing, if you have never built a generic component before, please skip over to the guide on creating generic components. Once you've completed that, return here and continue.</p>\n","title":"Application Component"});