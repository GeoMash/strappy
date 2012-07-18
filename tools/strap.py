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
		componentsDir	=os.path.join(baseDir,'component')
		componentDir	=os.path.join(componentsDir,name)
		
		try:	shutil.copytree(templateDir,componentDir)
		except:	pass
		
		keyvals={
			'{NS_BASE}':	self.getNamespace('base',baseDir,name),
			'{NS_FULL}':	self.getNamespace('full',baseDir,name),
			'{CMP_NAME}':	name.capitalize()
		}
		
		self.replaceInDir(componentDir,keyvals)
		
		os.rename(os.path.join(componentDir,'Cmp.js'),os.path.join(componentDir,name.capitalize()+'.js'))
		
	
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
	strap.genComponent(args.dir,args.name)
elif args.action=='model':
	pass
elif args.action=='view':
	pass
elif args.action=='controller':
	pass
elif args.action=='store':
	pass
else:
	raise NameError('Invalid action "'+args.action+'".')