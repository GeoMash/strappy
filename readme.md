Strappy
=======

Strappy is a Component Framework which was created to enable web application developers to break down their JavaScript 
applications into reusable, more manageable components, each comprised of their own MVC stack, 
allowing them to be instantiated and tested discretely.

Ultimately, Strappy everything a front-end application developer needs. While most other component frameworks fall short
by introducing complex HTML and CSS stacks which must be worked into your existing application, Strappy only provides 
the tools, empowering the developer to construct and skin their components however they like.

Strappy CCL
-----------

Strappy is *not* a Component Library, however it does offer a small set of reusable components, controllers,
traits and helpers as part of the Strappy Common Component Library.

Strappy CCL is completely optional to use. However it does provide some really useful out-of-the-box components
to help you bootstrap your application development.

Key Features
------------

* Powered by the powerful [JSKK](http://geomash.com/open-source/jskk/) JavaScript classing engine.
* The view engine relies on jQuery. Use the most popular JavaScript library which you're already familiar with.
* Each Component has its own full MVC stack.
* Complete State Management for in depth control of Components.
* Data Stores add power to the MVC stack.
* Data Transactions & Queues.
* Event Signalling, eliminating messy overlaps between components.
* Resource Sharing Pools.
* Built-In support for the [BTL](http://geomash.com/open-source/strappy/documentation/btl) specification.
* Built-In [RequireJS](http://requirejs.org/) compatibility.
* Fully extensible.
* Power to the Developer. Build components your way.

Use Cases
---------
* Enforcing clean architecture for frontend applications.
* Working with large datasets, local or remote.
* Create components that can be reused across multiple projects.

Browser Compatibility
---------------------
* IE 8+
* Chrome 8+
* Firefox 10+
* Safari 3+
* Opera 10.6+

How to Build Strappy
--------------------

### Install Grunt

Strappy is built using [Grunt](http://gruntjs.com/).

```
npm install -g grunt-cli
```

With grunt installed, you can not only build strappy from source, but you can also run
scaffolding, unit testing and CCL installation commands.

### Build Strappy

Perform a full build with:

```
grunt
```

If Strappy CCL has also been checked out, it will also be built with the full build.

If you would like to build without CCL, run the following command:

```
grunt build noccl
```

