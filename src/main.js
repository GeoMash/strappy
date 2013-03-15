// define
// (
// 	function(require)
// 	{
// 		require
// 		(
// 			[
// 				'./trait/ComponentConnector',
// 				'./trait/signal/Send',
// 				'./trait/signal/Receive',
// 				'./trait/signal/Bindable',
// 				'./Signal',
// 				'./data/proxy/AbstractProxy',
// 				'./data/proxy/Ajax',
// 				'./data/proxy/BTL',
// 				'./data/proxy/MemoryProxy',
// 				'./data/BTL',
// 				'./data/AbstractStore',
// 				'./data/SingleModelStore',
// 				'./data/MultiModelStore',
// 				'./data/Transaction',
// 				'./data/Queue',
// 				'./data/stateful/Store',
// 				'./SharedState',
// 				'./StateMgr',
// 				'./mvc/Model',
// 				'./mvc/ViewCache',
// 				'./mvc/View',
// 				'./mvc/Controller',
// 				'./mvc/stateful/Controller',
// 				'./mvc/stateful/Model',
// 				'./RadioTower',
// 				'./InitQueue',
// 				'./Component',
// 				'./ShareMgr',
// 				'./Strappy'
// 			]
// 		);
// 	}
// );

requirejs.config
(
	{
		deps:
		[
			'require',
			'./trait/ComponentConnector',
		]
		// shim:
		// {
			
		// }
	}
);