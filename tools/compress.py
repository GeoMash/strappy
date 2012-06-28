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
	
	def compressfileList(self,fileList):
		scripts='--js="'+'" --js="'.join(fileList)+'"'
		process=subprocess.Popen(
			'java '+
			'-jar '+
			'"'+os.path.join(os.path.realpath('.'),'compiler.jar')+'" '+
			scripts,
			stdout=subprocess.PIPE
		)
		return process.communicate()[0]
	
	
	def dirIterator(self, arg, dirname, fnames ):
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
	
	
	def compressStrappy(self,configFile=None,outputFile=None):
		#print 'locating files...'
		
		fileList	=[]
		workingPath	=os.path.abspath(DIR_STRAPPY)
		
		if configFile==None:
			
			os.path.walk(workingPath,self.dirIterator,fileList)
		else:
			file	=open(configFile, 'r')
			config	=json.loads(file.read())
			for file in config['files']:
				fileList.append(os.path.abspath(file))
		
		return self.compressfileList(fileList)
		
	
	def compressComponent(self,componentDir,outputFile=None):
		fullPath		=os.path.abspath(componentDir)
		componentName	=fullPath.split('\\')[-1:][0]
		fileList		=[]
		
		if os.path.isfile(os.path.join(fullPath,'compress.json')):
			file=open(os.path.join(fullPath,'compress.json'),'r')
			config	=json.loads(file.read())
			for file in config['files']:
				fileList.append(os.path.abspath(file))
			
		elif os.path.isfile(os.path.join(fullPath,componentName+'.js')):
			fileList.append(os.path.join(fullPath,componentName+'.js'))
			controllerDir	=os.path.join(fullPath,'controller')
			viewDir			=os.path.join(fullPath,'view')
			modelDir		=os.path.join(fullPath,'model')
			storeDir		=os.path.join(fullPath,'store')
			# Controllers
			if os.path.isdir(controllerDir):
				os.path.walk(controllerDir,self.dirIterator,fileList)
			# Views
			if os.path.isdir(viewDir):
				os.path.walk(viewDir,self.dirIterator,fileList)
			#Models
			if os.path.isdir(modelDir):
				os.path.walk(modelDir,self.dirIterator,fileList)
			#Stores
			if os.path.isdir(storeDir):
				os.path.walk(storeDir,self.dirIterator,fileList)
			
			file=open(os.path.join(fullPath,'compile.json'),'w')
			file.write(json.dumps({"files":fileList}))
		else:
			raise NameError('Main component class not found!')
		
		result=self.compressfileList(fileList)
		
		compressor.writeResult(result,componentName+'.min.js')
		
		return result
		
		
		
	def writeResult(self,result,outputDir=None,outputFile=None):
		if outputDir==None:
			outputDir=os.path.abspath('.')
		else:
			outputDir=os.path.abspath(outputDir)
		if outputFile!=None:
				filePath=os.path.join(outputDir,outputFile)
				file=open(filePath,'w');
				file.write(result)
				print 'Successfully compressed and combined files...'
				print 'Result written to "'+os.path.abspath(filePath)+'"'
		else:
			print result




""" Command Line Stuff """

parser=argparse.ArgumentParser()
#parser.add_argument('action',					help='Possible actions are "strappy", "component".')
parser.add_argument('-s',		'--strappy',	help='Also compile the strappy framework.',action='store_true')
parser.add_argument('-cmp',		'--component',	help='Specify a component or list of components to compile. Pass "all" as a parameter to compile all components.')
parser.add_argument('-c',		'--config',		help='Specify a config file.')
parser.add_argument('-d',		'--dir',		help='A directory to start at.')
parser.add_argument('-f',		'--file',		help='Specify a file where the result will be output.')

args=parser.parse_args()

result=''

if args.strappy:
	compressor=Compress()
	result+=compressor.compressStrappy(
		configFile=args.config
	)
if args.component:
	compressor=Compress()
	result+=compressor.compressComponent(args.dir)

compressor.writeResult(result,args.dir,args.file)

