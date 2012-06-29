import argparse
#import sys
import os.path
#import thread
import subprocess
import json
import re

""" Some Config """

DIR_STRAPPY		='..\\'
IGNORE_FOLDERS	=['.git','docs','tools']
IGNORE_FILES	=['min.js']

""" Main Compression Class """

class Compress:
	Name="Compress"
	
	def compressfileList(self,fileList):
		print 'Compressing the following files:'
		print fileList
		scripts='--js="'+'" --js="'.join(fileList)+'"'
		process=subprocess.Popen(
			'java '+
			'-jar '+
			'"'+os.path.join(os.path.realpath('.'),'compiler.jar')+'" '+
			scripts,
			stdout=subprocess.PIPE,
			stderr=subprocess.PIPE
		)
		result=process.communicate()
		
		
		if len(result[1]):
			print 'Errors found during compiling...'
			errors=[]
			for error in result[1].split('\r\n'):
				thisError=error.strip().strip('^')
				if len(thisError) and thisError.find('error(s)')==-1:
					print '--------------------'
					print thisError
					print '--------------------'
			return ''
		else:
			return result[0]
	
	
	def dirIterator(self, arg, dirname, fnames ):
		for file in fnames:
			thisFile	=os.path.join(dirname, file)
			fileParts	=os.path.splitext(thisFile)
			dirParts	=fileParts[0].split('\\')
			doContinue	=False
			for dir in dirParts:
				for ignoreFile in IGNORE_FILES:
					if file.find(ignoreFile)!=-1:
						doContinue=True
						break
				
				if doContinue:
					break
				
				if dir in IGNORE_FOLDERS:
					doContinue=True
					break
				
					
			if doContinue:
				doContinue=False
				continue;
			
			if (fileParts[1]=='.js'):
				arg.append(thisFile)
	
	
	
	def compressStrappy(self,configFile=None,targetDir=None):
		fileList	=[]
		
		if configFile==None:
			if targetDir:
				targetDir	=os.path.abspath(targetDir)
				configFile	=os.path.join(targetDir,'compile.json')
				if os.path.isfile(configFile):
					print 'Found compile.json file. Using that instead.'
					file	=open(configFile, 'r')
					config	=json.loads(file.read())
					for file in config['files']:
						fileList.append(os.path.abspath(file))
				else:
					print 'Could not find compile.json file.'
					os.path.walk(os.path.abspath(DIR_STRAPPY),self.dirIterator,fileList)
			else:
				os.path.walk(os.path.abspath(DIR_STRAPPY),self.dirIterator,fileList)
		else:
			file	=open(configFile, 'r')
			config	=json.loads(file.read())
			for file in config['files']:
				fileList.append(os.path.abspath(file))
		
		return self.compressfileList(fileList)
	
	def compressComponent(self,componentDir):
		fullPath		=os.path.abspath(componentDir)
		componentName	=fullPath.split('\\')[-1:][0]
		componentName	=componentName[0].upper()+componentName[1:]
		fileList		=[]
		
		if os.path.isfile(os.path.join(fullPath,'compile.json')):
			file=open(os.path.join(fullPath,'compile.json'),'r')
			config	=json.loads(file.read())
			for file in config['files']:
				fileList.append(os.path.join(componentDir,file))
			
			self.writeFileList(fileList,baseDir=componentDir)
			
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
			print 'COMPONENT DIR:'+componentDir
			
			self.writeFileList(fileList,baseDir=componentDir)
		else:
			raise NameError('Main component class not found!')
		
		result=self.compressfileList(fileList)
		
		compressor.writeResult(
			result		=result,
			targetDir	=componentDir,
			outputFile	=componentName+'.min.js'
		)
		
		return result
	
	
	
	def writeFileList(self,fileList,baseDir):
		print 'Writing file list...'
		print baseDir
		newList=[]
		for file in fileList:
			thisFile=file.replace(baseDir,'')
			if thisFile[:1]=='\\' or thisFile[:1]=='/':
				thisFile=thisFile[1:]
			newList.append(thisFile)
		file=open(os.path.join(baseDir,'compile.json'),'w')
		file.write(json.dumps({"files":newList},indent=4))
		file.close()
		
	
	def writeResult(self,result,targetDir=None,outputFile=None):
		return
		if targetDir==None:
			targetDir=os.path.abspath('.')
		else:
			targetDir=os.path.abspath(targetDir)
		
		if outputFile!=None:
			filePath=os.path.join(targetDir,outputFile)
			file=open(filePath,'w')
			file.write(result)
			file.close()
			print 'Successfully compressed and combined files...'
			print 'Result written to "'+os.path.abspath(filePath)+'"'
		#else:
		#	print result




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

if args.dir!=None:
	targetDir=os.path.abspath(args.dir)
else:
	targetDir=os.path.abspath('.')

if args.strappy:
	print "Compressing Strappy Framework..."
	compressor=Compress()
	result+=compressor.compressStrappy(
		configFile	=args.config,
		targetDir	=args.dir
	)
if args.component:
	componentList	=args.component.split(',')
	dirList			=[]
	if len(componentList)==1 and componentList[0]=='all':
		print 'Compiling all components in target dir...'
		for name in os.listdir(targetDir):
			dirList.append(os.path.join(targetDir,name))
	else:
		print 'Compiling selected components...'
		for name in os.listdir(targetDir):
			if name in componentList:
				dirList.append(os.path.join(targetDir,name))
		
	compressor=Compress()
	for dir in dirList:
		result+=compressor.compressComponent(dir)
		
	#print result

# compressor.writeResult(
# 	result		=result,
# 	targetDir	=targetDir,
# 	outputFile	=args.file
# )

