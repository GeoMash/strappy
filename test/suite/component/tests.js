module('Basic Component Test Suite');

asyncTest
(
	'Load Application',
	function()
	{
		expect(3);
		$JSKK.require
		(
			'test.application.Application',
			function()
			{
				ok(Object.isDefined(test),					'Level 1 namespace created.');
				ok(Object.isDefined(test.application),		'Level 2 namespace created.');
				ok(Object.isDefined(test),					'Application object successfully loaded.');
				start();
				asyncTest
				(
					'Initialize Application',
					function()
					{
						expect(1);
						$application=new test.application.Application
						(
							{},
							{
								onReadyState: function()
								{
									ok(Object.isFunction($application.$reflect),'Application successfully initialized.');
									start();
									onReady();
								}
							}
						);
					}
				);
			}
		);
	}
);
function onReady()
{
	test
	(
		'Store Initialized',
		function()
		{
			console.debug($application);
			ok(Object.isFunction($application.getStore('Items').$reflect),'Store successfully initialized.');
		}
	);
}