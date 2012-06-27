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
		
		result=self.compressfileList(fileList)
		
		if outputFile!=None:
			file=open(outputFile,'w');
			file.write(result)
			print 'Successfully compressed and combined files...'
			print 'Result written to "'+os.path.abspath(outputFile)+'"'
		else:
			print result
	
	def compressComponent(self,componentDir,outputFile=None):
		fullPath		=os.path.abspath(componentDir)
		componentName	=fullPath.split('\\')[-1:][0]
		fileList		=[]
		
		if os.path.isfile(os.path.join(fullPath,'compress.json')):
			
			
			
		if os.path.isfile(os.path.join(fullPath,componentName+'.js')):
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
			
			result=self.compressfileList(fileList)
			
			if outputFile!=None:
				file=open(outputFile,'w');
				file.write(result)
				print 'Successfully compressed and combined files...'
				print 'Result written to "'+os.path.abspath(outputFile)+'"'
			else:
				print result
		
		else:
			raise NameError('Main component class not found!')
		
		
		
		
		
		

""" Command Line Stuff """

parser = argparse.ArgumentParser()
parser.add_argument('action',					help='Possible actions are "strappy", "component".')
parser.add_argument('-d',		'--dir',		help='A directory to focus on.')
parser.add_argument('-c',		'--config',		help='Specify a config file.')
parser.add_argument('-o',		'--output',		help='Specify a file where the result will be output.')

args=parser.parse_args()
if args.action=='strappy':
	compressor=Compress()
	compressor.compressStrappy(
		configFile=args.config,
		outputFile=args.output
	)
elif args.action=='component':
	compressor=Compress()
	compressor.compressComponent(args.dir)