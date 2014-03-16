requirejs.config
(
	{
		waitSeconds:	10,
		baseUrl:		'/test/',
		paths:
		{
			jQuery:				'//code.jquery.com/jquery-2.1.0.min',
			QUnit:				'//code.jquery.com/qunit/qunit-1.14.0',
			jskk:				'lib/jskk/jskk-1.1.0.min',
			'jskk-optional':	'lib/jskk/jskk-1.1.0-optional.min',
			$JSKK:				'lib/jskk',
			extension:			'lib/extension',
			suite:				'suite',
			test:				'/test'
		},
		packages:
		[
			{
				name:		'strappy',
				location:	'../src'
			},
			{
				name:		'strappy/ccl',
				location:	'../src/ccl'
			}
		],
		shim:
		{
			'QUnit':
			{
				exports:	'QUnit',
				init:		function()
				{
					QUnit.config.autoload = false;
					QUnit.config.autostart = false;
				}
			}
		}
	}
);

requirejs
(
	[
		'jQuery',
		'QUnit',
		'jskk'
	],
	function()
	{
		requirejs
		(
			[
				'jskk-optional',
				'extension/function',
				'extension/string',
				'strappy',
				'strappy/ccl',
				'suite/component/tests',
				'suite/data/tests'
			],
			function()
			{
				QUnit.load();
				QUnit.start();
			}
		);
	}
);