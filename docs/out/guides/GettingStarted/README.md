Hello World
===============

**Level:** Beginner


Things to Understand
--------------------

This is a component-based framework. Each component can be considered as a stand-alone application. They are self-contained MVC triads which act independently of other components. 
<br>
This framework has been designed to keep each moving part of a component as isolated as possible. Models, Views, Controllers all communicate through a central signalling mechanism
called a {@link framework.RadioTower Radio Tower} and, with a few exceptions, never directly communicate with one another.
<br>
A few exceptions to this rule:
<br>
*	Controllers can directly READ and WRITE to a model.
*	Views can directly READ from a modal but CANNOT write.

<br>
<br>

Environment Setup
-----------------

You'll need a copy of the framework as well as $JSKK and jQuery. These can be placed and loaded from anywhere within your application but should be loaded in the following order:  
<br>
1. $JSKK
2. jQuery
3. Framework
<br>
Component namespaces start from the root level of your website index. So for example, if your component was "Application.component.Main", your Main.js file would
be found at "/Application/component/Main/Main.js".
