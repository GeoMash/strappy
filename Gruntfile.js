module.exports = function(grunt)
{
	var BANNER=	"/*\r\n"
				+' Strappy v<%= pkg.version %>'
				+' | (c) 2014 Timothy Chandler <tim@pi-co.io>'
				+' | See attached license file. '
				+"\r\n"
				+' Date Built: <%= grunt.template.today("yyyy-mm-dd") %>'
				+"\r\n*/\r\n";
//	
	function getShim()
	{
		var shim	={},
			deps	={'deps':['strappy/Strappy']},
			prefix	='strappy/';
		grunt.file.recurse
		(
			'./src/',
			function(abspath, rootdir, subdir, filename)
			{
				if (!subdir
				&& (filename=='main.js' || filename=='Strappy.js'))
				{
					return;
				}
				if (filename.indexOf('.js')!==-1 && (!subdir || subdir.indexOf('docs')===-1))
				{
					if (subdir)
					{
						shim[prefix+subdir+'/'+filename.replace('.js','')]=deps;
					}
					else
					{
						shim[prefix+filename.replace('.js','')]=deps;
					}
				}
			}
		);
//		grunt.file.write('build/Shim.json',JSON.stringify(shim));
		return shim;
	}
//	
	var shim=getShim();
	
	require('grunt-recurse')(grunt, __dirname);
	
	if (!grunt.option('noccl'))
	{
		grunt.grunt('./src/ccl');
	}
	
	
	
	
	
	
	
	
	// Project configuration.
	grunt.Config=
	{
		pkg:	grunt.file.readJSON('package.json'),
		requirejs:
		{
			main:
			{
				options:
				{
					stripBanners:	true,
					banner:			BANNER,
					baseUrl:		'src/',
					name:			'strappy',
					packages:
					[
						{
							name:		'strappy',
							location:	'.'
						}
					],
					optimize:		"none",
					shim:			shim,
					wrapShim:		true,
					out:			"bin/<%= pkg.name %>.<%= pkg.version %>.js"
				}
			}
		},
		concat:
		{
			main:
			{
				src:
				[
					'bin/<%= pkg.name %>.<%= pkg.version %>.js',
					'bin/<%= pkg.name %>.<%= pkg.version %>.ccl.js'
				],
				dest: 'bin/<%= pkg.name %>.<%= pkg.version %>.ccl.js'
			}
		},
		uglify:
		{
			main:
			{
				options:
				{
					banner:	BANNER
				},
				files:
				[
					{
						src:	'bin/<%= pkg.name %>.<%= pkg.version %>.ccl.js',
						dest:	'bin/<%= pkg.name %>.<%= pkg.version %>.ccl.min.js'
					}
				]
			},
			noccl:
			{
				options:
				{
					banner:	BANNER
				},
				files:
				[
					{
						src:	'bin/<%= pkg.name %>.<%= pkg.version %>.js',
						dest:	'bin/<%= pkg.name %>.<%= pkg.version %>.min.js'
					}
				]
			}
		},
	};
	
	var buildTasks=['requirejs:main'];
	
	if (!grunt.option('noccl'))
	{
		buildTasks=buildTasks.concat
		(
			[
				'requirejs:ccl',
				'concat',
				'uglify:main'
			]
		);
	}
	else
	{
		buildTasks.push('uglify:noccl');
	}
	
	grunt.registerTask('default',		['build']);
	grunt.registerTask('build',			buildTasks);
	
	grunt.finalize();
};