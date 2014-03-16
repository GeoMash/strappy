module('Data Test Suite');

//module
//(
//	'Data Test Suite',
//	{
//		setup: function()
//		{
//			stop();
//			$JSKK.require
//			(
//				'test.application.Application',
//				function()
//				{
//					stop();
//					$dataTestApplication=new test.application.Application
//					(
//						{},
//						{
//							onReadyState: function()
//							{
//								start(2);
//							}
//						}
//					);
//				}
//			);
//		},
//		teardown: function()
//		{
//			delete $dataTestApplication;
//		}
//	}
//);


$JSKK.require
(
	'test.application.Application',
	function()
	{
		$dataTestApplication=new test.application.Application
		(
			{},
			{
				onReadyState: function()
				{
					
				}
			}
		);
	}
);


function onReady()
{
	test
	(
		'MultiModelStore: Create Default Record',
		function()
		{
			var record=$dataTestApplication.getStore('Items').newRecord();
			ok(Object.isArray(record),				'Returned array.');
			strictEqual(record.length,1,			'Returned 1 record.');
			ok(Object.isDefined(record[0]),			'Record found at position 0.');
			strictEqual(record[0].get('label'),'',	'Record label is blank.');
			strictEqual(record[0].get('value'),null,'Record value is null.');
		}
	);
	
	test
	(
		'MultiModelStore: Create 1 Record With Values',
		function()
		{
			var record=$dataTestApplication.getStore('Items').newRecord
			(
				{
					label:	'Foo',
					value:	'foo'
				}
			);
			ok(Object.isArray(record),					'Returned array.');
			strictEqual(record.length,1,				'Returned 1 record.');
			ok(Object.isDefined(record[0]),				'Record found at position 0.');
			strictEqual(record[0].get('label'),'Foo',	'Record label is "Foo".');
			strictEqual(record[0].get('value'),'foo',	'Record value is "foo".');
		}
	);
	
	test
	(
		'MultiModelStore: Add 3 Records as Objects',
		function()
		{
			var	store	=$dataTestApplication.getStore('Items'),
				ret		=store.add
				(
					[
						{
							label:	'Foo',
							value:	'foo'
						},
						{
							label:	'Bar',
							value:	'bar'
						},
						{
							label:	'Baz',
							value:	'baz'
						}
					]
				),
				records	=store.getAll();
			
			strictEqual(ret,store,						'Returned self.');
			strictEqual(store.getCount(),3,				'Store length is 3.');
			strictEqual(records.length,3,				'Fetched  3 records from getAll().');
			strictEqual(records[0].get('label'),'Foo',	'Record[0] label is "Foo".');
			strictEqual(records[0].get('value'),'foo',	'Record[0] value is "foo".');
			strictEqual(records[1].get('label'),'Bar',	'Record[1] label is "Bar".');
			strictEqual(records[1].get('value'),'bar',	'Record[1] value is "bar".');
			strictEqual(records[2].get('label'),'Baz',	'Record[2] label is "Baz".');
			strictEqual(records[2].get('value'),'baz',	'Record[2] value is "baz".');
			
			store.removeAll();
		}
	);
	
	
	
	test
	(
		'MultiModelStore: getGrouped()',
		function()
		{
			var	store	=$dataTestApplication.getStore('Items'),
				ret		=store.add
				(
					[
						{
							label:	'Foo',
							value:	'foo'
						},
						{
							label:	'Bar',
							value:	'bar'
						},
						{
							label:	'Baz',
							value:	'baz'
						},
						{
							label:	'Foo 2',
							value:	'foo'
						},
						{
							label:	'Foo 3',
							value:	'foo'
						},
						{
							label:	'Bar 2',
							value:	'bar'
						}
					]
				),
				groups	=store.getGrouped('value');
			
			var groupCount	=0,
				recordCount	=0;
			for (var group in groups)
			{
				groupCount++;
				for (var i=0,j=groups[group].length; i<j; i++)
				{
					recordCount++;
				}
			}
			strictEqual(store.getCount(),6,				'Store length is 6.');
			strictEqual(groupCount,3,					'Returned 3 Groups.');
			strictEqual(recordCount,6,					'Returned 6 Records.');
			ok(Object.isDefined(groups['foo']),			'Group "foo" exists.');
			ok(Object.isDefined(groups['bar']),			'Group "bar" exists.');
			ok(Object.isDefined(groups['baz']),			'Group "baz" exists.');
			
			store.removeAll();
		}
	);
	
	
}