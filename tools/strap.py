import argparse
import os.path
import shutil
import re

def multiple_replace(dic, text): 
    pattern = "|".join(map(re.escape, dic.keys()))
    return re.sub(pattern, lambda m: dic[m.group()], text)
    
class Strap:
	Name="Strap"
	
	def genComponent(self,directory,name):
		templateDir		=os.path.abspath('./templates/component')
		baseDir			=os.path.abspath(directory)
		componentDir	=os.path.join(baseDir,'component',name)
		
		try:	shutil.copytree(templateDir,componentDir)
		except:	pass
		
		keyvals={
			'{NS_BASE}':	self.getNamespace('base',baseDir,name),
			'{NS_FULL}':	self.getNamespace('full',baseDir,name),
			'{CMP_NAME}':	name.capitalize()
		}
		
		self.replaceInDir(componentDir,keyvals)
		
		os.rename(os.path.join(componentDir,'Cmp.js'),os.path.join(componentDir,name.capitalize()+'.js'))
		
		return
	
	def genModel(self,directory,cmp,name):
		template		=os.path.abspath('./templates/Model.js')
		baseDir			=os.path.abspath(directory)
		componentDir	=os.path.join(baseDir,'component',cmp)
		keyvals			={
			'{NS_FULL}':	self.getNamespace('full',baseDir,cmp),
			'{MODEL_NAME}':	name.capitalize()
		}
		try:	os.mkdir(os.path.join(componentDir,'model'))
		except:	pass
		self.copyAndReplaceInFile(template,os.path.join(componentDir,'model',name.capitalize()+'.js'),keyvals);
	
	def genView(self,directory,cmp,name):
		template		=os.path.abspath('./templates/View.js')
		baseDir			=os.path.abspath(directory)
		componentDir	=os.path.join(baseDir,'component',cmp)
		keyvals			={
			'{NS_FULL}':	self.getNamespace('full',baseDir,cmp),
			'{VIEW_NAME}':	name.capitalize()
		}
		try:	os.mkdir(os.path.join(componentDir,'view'))
		except:	pass
		self.copyAndReplaceInFile(template,os.path.join(componentDir,'view',name.capitalize()+'.js'),keyvals);
		
	def genController(self,directory,cmp,name):
		template		=os.path.abspath('./templates/Controller.js')
		baseDir			=os.path.abspath(directory)
		componentDir	=os.path.join(baseDir,'component',cmp)
		keyvals			={
			'{NS_FULL}':			self.getNamespace('full',baseDir,cmp),
			'{CONTROLLER_NAME}':	name.capitalize()
		}
		try:	os.mkdir(os.path.join(componentDir,'controller'))
		except:	pass
		self.copyAndReplaceInFile(template,os.path.join(componentDir,'controller',name.capitalize()+'.js'),keyvals);
		
	def genStore(self,directory,cmp,name):
		template		=os.path.abspath('./templates/Store.js')
		baseDir			=os.path.abspath(directory)
		componentDir	=os.path.join(baseDir,'component',cmp)
		keyvals			={
			'{NS_FULL}':	self.getNamespace('full',baseDir,cmp),
			'{STORE_NAME}':	name.capitalize()
		}
		try:	os.mkdir(os.path.join(componentDir,'store'))
		except:	pass
		self.copyAndReplaceInFile(template,os.path.join(componentDir,'store',name.capitalize()+'.js'),keyvals);
		
	def replaceInDir(self,directory,keyvals):
		for root,dirs,files in os.walk(directory):
			for file in files:
				thisFile	=os.path.join(root, file);
				handler		=open(thisFile, 'r')
				content		=handler.read()
				handler.close();
				handler		=open(thisFile, 'w')
				handler.write(multiple_replace(keyvals,content))
				handler.close();
	
	def copyAndReplaceInFile(self,source,destination,keyvals):
		handler=open(source,'r');
		content=handler.read();
		handler.close();
		
		handler=open(destination,'w')
		handler.write(multiple_replace(keyvals,content))
		handler.close();
	
	def getNamespace(self,type,directory,name):
		root			=directory.split('\\')[-1]
		rootNamespace	=root+'.component'
		if type=='base':
			return rootNamespace
		elif type=='full':
			return rootNamespace+'.'+name



""" Command Line Stuff """

parser=argparse.ArgumentParser()
parser.add_argument('action',					help='Possible actions are ...')
parser.add_argument('name',						help='Relative name to the action.')
parser.add_argument('-cmp',		'--component',	help='Specify a component or list of components to compile. Pass "all" as a parameter to compile all components.')
parser.add_argument('-d',		'--dir',		help='A directory to start at.')

args	=parser.parse_args()
strap	=Strap()
if args.action=='component':
	if args.name.count(','):
		for name in args.name.split(','):
			strap.genComponent(args.dir,name)
	else:
		strap.genComponent(args.dir,args.name)
elif args.action=='model':
	strap.genModel(args.dir,args.component,args.name)
elif args.action=='view':
	strap.genView(args.dir,args.component,args.name)
elif args.action=='controller':
	strap.genController(args.dir,args.component,args.name)
elif args.action=='store':
	strap.genStore(args.dir,args.component,args.name)
else:
	raise NameError('Invalid action "'+args.action+'".')