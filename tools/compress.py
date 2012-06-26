import sys
import os.path
import thread
import subprocess

""" Some Config """

DIR_STRAPPY		='..\\'
IGNORE_FOLDERS	=['.git','docs','tools']

""" Main Compression Class """

class Compress:
	Name="Compress"
	
	
	
	def compressStrappy(self):
		print 'locating files...'
		
		filelist	=[]
		workingPath	=os.path.abspath(DIR_STRAPPY)
		
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
		
		#print filelist
		scripts='--js="'+'" --js="'.join(filelist)+'"'
		
		
		result=subprocess.call(
			'java '+
			'-jar '+
			'"'+os.path.join(os.path.realpath('.'),'compiler.jar')+'" '+
			scripts
		)
		print result;



""" Procedural rubbish... """

if (len(sys.argv) > 1):
	if(sys.argv[1]=='strappy'):
		print 'Compressing strappy...';
		compressor=Compress();
		compressor.compressStrappy();
	elif(sys.argv[1]=='exec'):
		print "Testing exec"
		print 
		
		result=subprocess.call(
			'java '+
			'-jar '+
			'"'+os.path.join(os.path.realpath('.'),'compiler.jar')+'" -?'
		)
		
		print result
	else:
		print 'Invalid command.'
		
else:
	print 'No command given.'