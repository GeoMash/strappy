#1.1.0


* Added a new class "strappy.InitQueue". This class handles loading of components in queues much better than strappy.component.initQueue(). It also has a more elegant syntax.
* Deprecated strappy.component.initQueue(). Use the new strappy.InitQueue class instead.
* Added two new strappy signals for better show/hide management of components. These are strappy.Signal.SHOW and strappy.Signal.HIDE.
* 