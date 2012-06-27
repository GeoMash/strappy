import argparse
#import sys
import os.path
#import thread
import subprocess
import json

""" Some Config """

DIR_STRAPPY		='..\\'
IGNORE_FOLDERS	=['.git','docs','tools']

""" Main Compression Class """

class Compress:
	Name="Compress"
	
	
	def compressStrappy(self,configFile=None,outputFile=None):
		#print 'locating files...'
		
		filelist	=[]
		workingPath	=os.path.abspath(DIR_STRAPPY)
		
		if configFile==None:
			
			def callback( arg, dirname, fnames ):
				for file in fnames:
					thisFile	=os.path.join(dirname, file)
					fileParts	=os.path.splitext(thisFile)
					dirParts	=fileParts[0].split('\\')
					doContinue	=False
					for dir in dirParts:
						if dir in IGNORE_FOLDERS:
							doContinue=True
							break
					
					if doContinue:
						doContinue=False
						continue;
					
					if (fileParts[1]=='.js'):
						arg.append(thisFile)
			
			os.path.walk(workingPath,callback,filelist)
		else:
			file	=open(configFile, 'r')
			config	=json.loads(file.read())
			for file in config['files']:
				filelist.append(os.path.abspath(file))
		
		scripts='--js="'+'" --js="'.join(filelist)+'"'
		process=subprocess.Popen(
			'java '+
			'-jar '+
			'"'+os.path.join(os.path.realpath('.'),'compiler.jar')+'" '+
			scripts,
			stdout=subprocess.PIPE
		)
		
		
		if outputFile!=None:
			file=open(outputFile,'w');
			file.write(process.communicate()[0])
			print 'Successfully compressed and combined files...'
			print 'Result written to "'+os.path.abspath(outputFile)+'"'
		else:
			print process.communicate()[0]



""" Procedural rubbish... """

parser = argparse.ArgumentParser()
parser.add_argument('action',		help='Possible actions are "strappy" ?')
parser.add_argument('--config',		help='Specify a config file.')
parser.add_argument('--output',		help='Specify a file where the result will be output.')

args=parser.parse_args()
if(args.action=='strappy'):
	compressor=Compress();
	compressor.compressStrappy(
		configFile=args.config,
		outputFile=args.output
	)





# if (len(sys.argv) > 1):
# 	if(sys.argv[1]=='strappy'):
# 		print 'Compressing strappy...';
# 		compressor=Compress();
# 		configFile=None
# 		if len(sys.argv[2:]):
# 			configFile=sys.argv[2]
# 		compressor.compressStrappy(configFile=configFile)
# 	elif(sys.argv[1]=='exec'):
# 		print "Testing exec"
		
# 		result=subprocess.call(
# 			'java '+
# 			'-jar '+
# 			'"'+os.path.join(os.path.realpath('.'),'compiler.jar')+'" -?'
# 		)
		
# 		print result
# 	else:
# 		print 'Invalid command.'
		
# else:
# 	print 'No command given.'