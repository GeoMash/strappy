Ext.data.JsonP.HelloWorld({"guide":"<h1>Hello World</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/HelloWorld-section-1'>Sneak Peek</a></li>\n<li><a href='#!/guide/HelloWorld-section-2'>Project SetUp</a></li>\n<li><a href='#!/guide/HelloWorld-section-3'>Dependencies</a></li>\n<li><a href='#!/guide/HelloWorld-section-4'>Component SetUp</a></li>\n<li><a href='#!/guide/HelloWorld-section-5'>MVC SetUp</a></li>\n<li><a href='#!/guide/HelloWorld-section-6'>CSS Reference</a></li>\n<li><a href='#!/guide/HelloWorld-section-7'>Python Scaffolding Tool</a></li>\n</ol>\n</div>\n\n<p><strong>Level:</strong> Beginner</p>\n\n<h2 id='HelloWorld-section-1'>Sneak Peek</h2>\n\n<p>This is the \"Hello World\" guide to your first Strappy component.\nBy the end of this tutorial you will have created a button component,\nwhich toggles the visibility of an 'h1'-tag containing the string \"Hello World\".</p>\n\n<p><p><img src=\"guides/HelloWorld/helloWorld_hidden.png\" alt=\"Alt text\"></p></p>\n\n<br>\n\n\n<br>\n\n\n<p><p><img src=\"guides/HelloWorld/helloWorld_visible.png\" alt=\"Alt text\"></p></p>\n\n<br>\n\n\n<h2 id='HelloWorld-section-2'>Project SetUp</h2>\n\n<p>First of all, set up a new project using the IDE of your choice and name it \"Hello World\".<br>\nYou should end up with something that looks more or less like this:\n<p><img src=\"guides/HelloWorld/initialProjectSetupIDEShot.png\" alt=\"Alt text\"></p></p>\n\n<br>\n\n\n<h2 id='HelloWorld-section-3'>Dependencies</h2>\n\n<p>Strappy applications depend on the following three libraries:</p>\n\n<ol>\n<li><p><a href=\"https://github.com/SpinifexGroup/strappy/zipball/master\">Strappy framework</a> <br>\n(All the jazz that will enable you to create scaleable and maintainable projects, ranging from simple standalone components to full-blown applications.)</p></li>\n<li><p><a href=\"https://github.com/melechi/JS-Klass-Kit/zipball/master\">JSKK Classing Engine</a> <br>\n(A classing engine, straight out of our mad lab's coding oven. Strappy is based on JSKK and is the reason why you will be able write OOP without runnig into those little native JS traps. It also comes with a truckload of ready to use utils.)</p></li>\n<li><p><a href=\"http://jquery.com/\">jQuery Download Page</a> <br>\n(jQuery won't need much of introducing. Strappy depends on it and you will most likely too.)<br></p></li>\n</ol>\n\n\n<p>Now create three sub directories in your lib folder and name them \"jQuery\", \"JSKK\" and \"strappy\". <br></p>\n\n<p>Once you have extracted your compressed downloads, locate the minified versions (strappy = \"tools/strappy.1.0.0.beta.min\"; JSKK = \"bin/jskk.min-1.0.1.js\") and place them in the appropriate sub directories you just created. <br>\nFor jQuery you will simply copy the latest minified source off the jQuery website, create a new .js file and paste the copied source into that file. Name it jquery1.x.x.js and place it in your newly created jQuery folder under lib.</p>\n\n<p>Your project outliner window should now look similar to this screenshot:</p>\n\n<p><p><img src=\"guides/HelloWorld/dependenciesImportedAndHookedUp.png\" alt=\"Alt text\"></p></p>\n\n<p>Next, hook up those libraries in your \"index.html\" file. <br>\nNOTE: The order in which those libraries are being imported matters. <br>\nStrappy depends on both - jQuery and JSSK - and therefore needs to be included last.</p>\n\n<p><b>Index - Index.html</b><br>\nHTML:</p>\n\n<br>\n\n\n<pre><code>&lt;html&gt;\n    &lt;head&gt;\n        &lt;title&gt;Strappy - Hello World&lt;/title&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n        &lt;script type=\"text/javascript\" src=\"lib/JSKK/jskk.min-1.0.1.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" src=\"lib/jQuery/jquery1.8.0.js\"&gt;&lt;/script&gt;\n        &lt;script type=\"text/javascript\" src=\"lib/strappy/strappy.1.0.0.beta.min.js\"&gt;&lt;/script&gt;\n    &lt;/body&gt;\n&lt;/html&gt;\n</code></pre>\n\n<br>\n\n\n<br>\n\n\n<h2 id='HelloWorld-section-4'>Component SetUp</h2>\n\n<p>Now you should create a folder structure for your component.\nWe're going to use the following folder/file structure.\nCreate the folders and files in them.\nLeave the files blank for now.</p>\n\n<br>\n\n\n<pre><code>/Application/component/\n/Application/component/button/\n/Application/component/button/Button.js\n/Application/component/button/controller/\n/Application/component/button/controller/State.js\n/Application/component/button/controller/Default.js\n/Application/component/button/model/\n/Application/component/button/store/\n/Application/component/button/store/State.js\n/Application/component/button/view/\n/Application/component/button/view/Default.js\n/Application/component/button/view/html/\n/Application/component/button/view/html/default.html\n</code></pre>\n\n<br>\n\n\n<p>Your IDE project profiler window should now look something like this:</p>\n\n<br>\n\n\n<p><p><img src=\"guides/HelloWorld/manuallyScaffolded.png\" alt=\"Alt text\"></p></p>\n\n<br>\n\n\n<p>Going back to your index.html, you will of course also need to import all those still empty classes you have just created.\nSo beneath your library imports add the following</p>\n\n<p><b>Index - Index.html</b><br>\nHTML:</p>\n\n<br>\n\n\n<pre><code>// libraries\n// ... not displayed \n//\n// component\n&lt;script type=\"text/javascript\"  src=\"Application/component/button/Button.js\"&gt;&lt;/script&gt;\n&lt;script type=\"text/javascript\"  src=\"Application/component/button/controller/Default.js\"&gt;&lt;/script&gt;\n&lt;script type=\"text/javascript\"  src=\"Application/component/button/controller/State.js\"&gt;&lt;/script&gt;\n&lt;script type=\"text/javascript\"  src=\"Application/component/button/store/State.js\"&gt;&lt;/script&gt;\n// if time implement an object model in order to illustrate component's basic data infrastructure  \n&lt;script type=\"text/javascript\"  src=\"Application/component/button/view/Default.js\"&gt;&lt;/script&gt;\n</code></pre>\n\n<br>\n\n\n<p>When opening \"index.html\" in your browser you should not recive any errors. <br>\nIf you do, you most likely have wired up your dependencies incorrectly or there is a typo in your links. <br>\nCheck everything thoroughly and proceed with the next step - \"MVC SetUp\".</p>\n\n<br>\n\n\n<h2 id='HelloWorld-section-5'>MVC SetUp</h2>\n\n<p>Every component you create in Strappy, no matter how small, has it's own \"state\" and therefore exists as an independent standalone MVC triad. In order to instantiate your component, we will start to implement the bare minimum requirements of your component's MVC structure.</p>\n\n<p>The first thing we will create is our base and configuration class \"Button.js\". In it you will define it's nature, descent, possible child components as well as default config settings.</p>\n\n<p>We will then work ourselves from the bottom up - starting with the view and its html-template, over the StateStore and ending in our Default and State controllers.</p>\n\n<br>\n\n\n<p><b>Base Class - Button.js</b><br>\nJAVASCRIPT:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component',\n        $name:      'Button',\n        $extends:   strappy.Component\n    }\n)\n(\n    {},\n    {\n        models:\n        [\n            'Default'\n        ],\n        views:\n        [\n            'Default'\n        ],\n        controllers:\n        [\n            'Default'\n        ],\n        stores:\n        [\n            // your stores in here\n        ]\n    }\n);\n</code></pre>\n\n<br>\n\n\n<br>\n\n\n<p>Inspecting our Button.js class at the very top, we can see that our class is being created passing in an initial object holding three key value pairs:</p>\n\n<ol>\n<li>$namespace:  The namespace convention \"Application.component\", which resembles the location our component lives in.</li>\n<li>$name:       The \"name\" is our file name without file extension.</li>\n<li>$extends:    Our class extends strappy's base component class.</li>\n</ol>\n\n\n<p>The third object visible contains four arrays: models, views, controllers and stores. All required classes need to be listed in the appropriate array in order to enable the framework to initialize these classes. That way they are ready for use by the time you need to access them in either a Store, Controller or View.</p>\n\n<p>You also might have noticed, that StateStore and -Controller, even though we made you create a those, are not listed with the array they belong in. Strappy strictly expects those classes to be present in every component and therefore doesn't need you to declare them manually.</p>\n\n<br>\n\n\n<p><b>View &amp; html-template</b><br>\nThe html template we are creating is a very simple one. It only consists of a wrapping \"div\" element, which we use to position things, an \"input\" button to trigger an action and last but not least an \"h1\"-tag which holds our \"Hello World\" message. Now, this template is neither realistic nor does it make much sense - all we are after is a proof of concept. In a real project, you would probably be more likely to separate those two elements and make two individual components for them.\nConsidering the amount of code needed to create a component, that may seem like an overkill. Soon though, you will experience the advantages, that come with putting in a little more effort at the beginning. Software applications can grow to a considerable amount of components and keeping such a project structured and maintainable, can quickly end up as one big bowl of \"Spaghetti-Code\". Strappy nicely decouples your components and makes sure you will stay as cool as Heisenberg.</p>\n\n<p>Ok, here we go. This is your 'default.html':</p>\n\n<p><b>HTML-template - default.html</b><br>\nHTML:</p>\n\n<pre><code>&lt;div class=\"myHolder\"&gt;\n    &lt;h1 class=\"hidden myOutlet\"&gt;HELLO WORLD&lt;/h1&gt;\n    &lt;input class=\"myButton\" type=\"button\" value=\"show me\"&gt;\n&lt;/div&gt;\n</code></pre>\n\n<br>\n\n\n<p>Now this html template will need to be administered by your view class, which looks like this:</p>\n\n<p><b>Default View - Default.js</b><br>\nJAVASCRIPT:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component.button.view',\n        $name:      'Default',\n        $extends:   strappy.mvc.View\n    }\n)\n(\n    {},\n    {\n        templates:\n        {\n            Default:        'default.html'\n        },\n\n        //  list properties here\n\n        // list methods here\n\n        onReady: function()\n        {\n            this.bindDOMEvents();\n        },\n\n        onShow: function()\n        {\n            // something here\n        },\n\n        bindDOMEvents: function()\n        {\n            this.bindContainerEvent('click.button',  'controller:Default', 'onButtonClicked');\n        },\n\n        onModelLockChange: function(signal)\n        {\n            // something here\n        },\n\n        syncView: function()\n        {\n            // something here\n        },\n\n        updateOutlet: function(isVisible)\n        {\n            var outlet = $(\".myOutlet\", this.getContainer()),\n                button = $(\".myButton\", this.getContainer());\n            switch(isVisible)\n            {\n                case true:\n                    button.val(\"hide me\");\n                    outlet.removeClass('hidden');\n                    break;\n\n                case false:\n                    button.val(\"show me\");\n                    outlet.addClass('hidden');\n                    break;\n            }\n        }\n    }\n);\n</code></pre>\n\n<p>Let's have a look at the code:</p>\n\n<p>The head section gives infos about your class - where it belongs, its name and what it extends. Just as in the base class \"Button.js\" we created before.</p>\n\n<p>Further down, the \"templates\" object lists your view's html-templates. Your view can orchestrate more than one html-template and switch between them as needed.\nTo learn more read this section: <a href=\"http://Working\">Working with multiple html-templates</a>\nHowever, \"Hello World\" needs only one simple template to work.</p>\n\n<p>Our first method is named \"onReady\" and is automatically called, when your view is ready to receive instructions. Here you usually call your init methods to setup your view. In this case we are only concerned about binding DOM events to your container. There are two different ways of binding DOM events in strappy. One binds events to a specific HTML element and the other binds it to your view's container. Every component owning a view also comes with an html-element called the container. As the name already suggests, it's sole purpose is to hold your component's templates. So when you should decide to swap templates, the holder will remain as a constant \"address\" for queries. So, here we are binding a container event for simplicity, as we don't need to specify a particular element. this is not a clean way of attaching a click event which is supposed to have only one specific target, but illustrates beauitfully how the container element has the whole template as target. When \"Hello World\" is finished you will see that pressing the \"h1\"-tag will also trigger the exact same action as if you were to press the button instance. Let's assess the 'bindContainerEvent' method, which takes three arguments:</p>\n\n<ol>\n<li><p>The event specifier. 'click' is a native JS event separated by a dot from 'button', which is a custom identifier for the event. You can start getting into the habbit of \"labeling\" your events using the dot syntax. If you ever experienced full on debugging sessions until late night you will appreciate every extra piece of information you can possibly read out of your code.</p></li>\n<li><p>The event callback. In this case we want our default controller to be the responder of this event, so we write: 'controller:Default'. We could also define ourself as responder and type the following: 'view:Default', if you wanted that event to be maintained and handled by the View instead of the Controller.\nA reason to handle this event straight away in your view could be, that an event triggered does not require any other parts of your MVC to change state and or communicate some event to other components. A good example might be a custom cursor change upon a mouseEvent being triggered. Neither other parts of your component nor the rest of the application needs to be concerned about this minor graphical state change and can therefore be maintained internally by your component's view.</p></li>\n<li><p>The event handler. This is the name of the method which is being called to handle the event.</p></li>\n</ol>\n\n\n<br>\n\n\n<p>The next two methds, \"onModelLockChange\" and \"syncView\", need to be implemented in your view but can stay blank for now, since we are not having a situation in which we either need to be notified about a model lock change nor do we need to sync our view with updated model data.</p>\n\n<p>\"updateOutlet\" on the other hand is again important to us. This method takes one argument \"isVisible\", which is a boolean value. \"updateOutlet\" is going to be called by our state controller class when it receives notification of a model state change (visible or hidden). In here we are doing two things:</p>\n\n<ol>\n<li>We are checking against the supplied argument value (true/false).</li>\n<li>Depending on the argument passed in, we change the buttons value attribute to label the action that takes place, when a user presses the button. We are also adding or removing a css attribute to or from our \"h1\"-tag. This attribute is a class attribute named 'hidden', which will change our element's visibility. See \"style.css\".</li>\n</ol>\n\n\n<p><b>Store &amp; Model</b><br>\nThere's no need to create a state model as this is being handled for us automatically by the framework. So the model directory can stay empty.</p>\n\n<p>Open your StateStore.js and copy the following code into it.</p>\n\n<p><b>State Store - State.js</b><br>\nJAVASCRIPT:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component.button.store',\n        $name:      'State',\n        $extends:   strappy.data.stateful.Store\n    }\n)\n(\n    {},\n    {\n        data:\n        {\n            'public':\n            {\n                // something here\n            },\n            'private':\n            {\n                isVisible: false\n            }\n        }\n    }\n);\n</code></pre>\n\n<p>Our \"Hello World\" example only has one store - the StateStore. If our component would hold more complex data, like a personal user profile for example requirung multiple different data fields, we could introduce an \"User\" store, which is linked to a \"User\" model. This additional store could then aid us in retrieving values out of a record or perform business operations. Here however, we only inquire about one simple private state: visible or hidden. You can also see that we are having two different places to put our state data in: the 'public' and the 'private' section inside the data object.\nSince our component has no interest in sharing it's internal state, we are putting our 'isVisible' property inside 'private'. <br>\nNOTE: A common mistake which can be difficult to track down is that public and private are being declared without quotation marks. By convention strappy requires you to use quotations here.</p>\n\n<p><b>Controller</b><br>\n\"Hello World\" get's two controllers to work with. A State- and a DefaultController. Strappy encourages the use of multiple controllers in order to serve the single responsibility principle. Meaning - if you, as a developer, delegate your specific task to specific controllers, complex components will become easier to maintain, bugs quicker to track down and your code less difficult to read - also for other developers, that might need to revisit your code.\nLet's see what our Default controller does:</p>\n\n<p><b>Default Controller - Default.js</b><br>\nJAVASCRIPT:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace:     'Application.component.button.controller',\n        $name:          'Default',\n        $extends:       strappy.mvc.Controller\n    }\n)\n(\n    {},\n    {\n        init: function()\n        {\n            // call super\n            this.init.$parent();\n\n            // let Default view report as soon as it's html template is loaded\n            this.getView('Default')     .observe('onTemplatesLoaded',   this.onTemplatesLoaded.bind(this));\n\n            //  let State controller report as soon as component has been all set up and is ready to go\n            this.getController('State') .observe('onReadyState',        this.onReadyState.bind(this));\n        },\n\n\n        // Observer Handlers\n        onTemplatesLoaded: function(view)\n        {\n            // append your html template to desired view\n            view.getContainer().append(view.getTemplate('Default'));\n        },\n\n        onReadyState: function()\n        {\n            // show command for your desired view\n            this.getView('Default').show();\n        },\n\n        onButtonClicked: function(event)\n        {\n            this.getStore('State').set('isVisible', !this.getStore('State').get('isVisible'));\n        }\n    }\n);\n</code></pre>\n\n<p>Inside init() we're calling Default Controller's super and right afterwards are setting two observers on the events \"templateLoaded\" and \"ready\".\nThe first one is being dispatched as soon as the component's template has been loaded. In its event handler \"onTemplatesLoaded()\", we are appending our view container with the template we want. <br>\nNOTE: This does NOT automatically display the template. In order to make it appear on screen you want to call the method show() on it.\nAnd that's exactly what we're doing in our second event handler \"onReadyState()\", which marks the component to be ready.</p>\n\n<p>We will include one last thing in our DefaultController. Remember how we assigned a \"mouse.click\"-event  to a button instance inside DefaultView? The next method \"onButtonClicked()\" is it's event handler. All we are doing in here is to toggle our component's private state \"isVisible\" through the StateStore we have set up in the previous section \"Store &amp; Model\". And that's already it for our DefaultController.</p>\n\n<p>There's only one more class we have to write and that's the StateController. Here's the code:</p>\n\n<p><b>State Controller - State.js</b><br>\nJAVASCRIPT:</p>\n\n<pre><code>$JSKK.Class.create\n(\n    {\n        $namespace: 'Application.component.button.controller',\n        $name:      'State',\n        $extends:   strappy.mvc.stateful.Controller\n    }\n)\n(\n    {},\n    {\n        init: function()\n        {\n            this.init.$parent();\n\n\n            // set observers\n            this.getView('Default') .observe('onReady',this.onViewReady.bind(this));\n\n            // observer state changes\n            this.bindStateChanges\n            (\n                {\n                    isVisible:  'onVisibilityChanged'\n                }\n            );\n        },\n\n        onViewReady: function(view)\n        {\n            this.setViewReadyState(view.$reflect('name'));\n            if (this.getReadyViews().inArray(view.$reflect('name')))\n            {\n                //All views are ready.\n                this.setReady();\n            }\n        },\n\n        onBeforeChange: function(state,key,value)\n        {\n            return true;\n        },\n\n        onVisibilityChanged: function(value)\n        {\n            this.getView('Default').updateOutlet(value);\n        }\n    }\n);\n</code></pre>\n\n<p>The StateController is doing two things in our example: <br>\n1. It checks on all views if they are available and flags the component \"ready\", if that is the case.<br/>\n2. Secondly it will observe state changes, which are being handled by the StateStore and either passes on this information or, in a simple component like this, calls a method directly on another class that processes that change.</p>\n\n<h2 id='HelloWorld-section-6'>CSS Reference</h2>\n\n<p>Copy and paste the following code into your style.css file:</p>\n\n<p><b>StyleSheet - style.css</b><br>\nCSS:</p>\n\n<pre><code>.hidden {\n    visibility: hidden;\n}\n\n.myHolder {\n    margin-top: 100px;\n    width: 100%;\n    height: 100%;\n    text-align: center;\n}\n\n.myOutlet {\n    left:0px;\n    right:0px;\n    top:0px;\n    bottom:0px;\n}\n\n.myButton {\n    margin-top: 20px;\n    left:0px;\n    right:0px;\n    top:0px;\n    bottom:0px;\n}\n\n.myButton:hover {\n    cursor: pointer;\n}\n</code></pre>\n\n<p>If you have followed everything thoroughly, you should be able to just call your page inside your favorite web browser (probably IE8) and see the result.</p>\n\n<h2 id='HelloWorld-section-7'>Python Scaffolding Tool</h2>\n\n<p>Doing things by hand can be very satisfying at times...setting up generic components is not one of those things. If you aggree you might as well check out <a href=\"#!/guide/ComponentScaffolding\">Component Scaffolding Tool</a> for further reading. Our lead developer developed a pyhton tool that ships with strappy, making component creation more fun than catching gummi bears with your mouth.</p>\n\n<br> \n\n","title":"Hello World Component"});