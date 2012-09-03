Ext.data.JsonP.Signals({"guide":"<h1>Signals</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/Signals-section-1'>Filtering</a></li>\n<li><a href='#!/guide/Signals-section-2'>Type</a></li>\n<li><a href='#!/guide/Signals-section-3'>Key</a></li>\n</ol>\n</div>\n\n<p><p><img src=\"guides/Signals/images/ApplicationComponent.png\" alt=\"Application Component Overview\"></p></p>\n\n<p>Signals are predefined here and used throughout your application by components.\nThe idea is to prevent direct communication between components. We do this by emitting signals which are caught by whatever components are registered to receive them.</p>\n\n<p>Tipically it is a good idea to have a component behave as a mediator of the signals. Generally this is done by the main application component. But there are cases where you'll need to build composite components which do the same thing.</p>\n\n<p>An example of where signals, signal types and signal keys are defined.</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Project.component',\n        $name:      'Application',\n        $extends:   strappy.Component\n    }\n)\n(\n    {\n        Signal:\n        {\n            BROWSE:         'Project.signal.browse'\n        },\n        Type:\n        {\n            SELECT:         'Project.type.select'\n        },\n        Key:\n        {\n            LIST_CHANNELS:  'Project.key.listChannels'\n        }\n    },\n    {}\n);\n</code></pre>\n\n<h2 id='Signals-section-1'>Filtering</h2>\n\n<p>But a lot of the time you need to control exactly which signals reach what components. This is where filtering comes in handy.</p>\n\n<p>Sender Example (Other Component):</p>\n\n<pre><code>this.sendSignal\n(\n    Project.component.Application.Signal.BROWSE,\n    Project.component.Application.Type.SELECT,\n    {\n        key:            this.getConfig('signalKey'),\n        destination:    'application'\n    }\n);\n</code></pre>\n\n<p>Receiver Example (Application Component):</p>\n\n<pre><code>this.registerSignals\n(\n    {\n        onBrowse:\n        {\n            signal: Project.component.Application.Signal.BROWSE,\n            type:   Project.component.Application.Type.SELECT,\n            filter:\n            {\n                destination:    'application',\n                key:            Project.component.Application.Key.LIST_CHANNELS\n            }\n        }\n    }\n);\n</code></pre>\n\n<p>You can see a couple more items in those examples which haven't been explained yet. We'll get to those in a moment. But first, the important thing to note in these examples is the filtering.</p>\n\n<p>With signal filtering, you can attach any filter you like to a signal, whatever component's register for those signals will only execute their callback methods if their filter matches the filter that was set when emitting the signal.</p>\n\n<p>Some other things of note in the above example is the use of \"type\" and \"key\".</p>\n\n<h2 id='Signals-section-2'>Type</h2>\n\n<p>Type is another level of filtering. It is in fact the first level of filtering. You don't actually need to specify a type or a filter when emitting a signal but doing so helps to get the message to the right components.\nUsually type is used as the action that was taken which caused the signal to be emitted. So in the above example, the action of \"selecting\" an item on screen was the cause, so we specify the SELECT type. This could have been \"double click\" in which case we could specify a DBCLICK type.\nThis helps you to control, with precision, what user actions in your application cause which business controls to be executed, ultimately allowing different interactions to result in slightly different behaviours.</p>\n\n<h2 id='Signals-section-3'>Key</h2>\n\n<p>Depending on the size and nature of the application you're building, you may need to create generic components. Generic components are usually reusable components, that is, a component which is initialized multiple times either by the application component or by any number of composite components that you create.</p>\n\n<p>As you can imagine, when a generic component emits a signal, chances are it's going to be the exact same signal as another instance of the same component. This is where signal keys are used.</p>\n\n<p>Signal keys are unique strings which are passed to the component during its configuration phase. This string is then attached to every signal that the component emits.\nAs you can see in the above example, components can listen in for those signals and attach a key filter, which means that the listener will always receive signals from the component it was expecting to receive it from.</p>\n","title":"Signals"});