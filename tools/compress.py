import sys
import os.path

""" Some Config """

DIR_STRAPPY='../';


""" Main Compression Class """

class Compress:
	Name="Compress"
	
	def compressStrappy(self):
		print 'locating files...'
		#print os.path.exists(DIR_STRAPPY)
		#print os.path.isdir(DIR_STRAPPY)
		#print os.path.isfile(DIR_STRAPPY)
		#print os.path.isabs(DIR_STRAPPY)

		def callback( arg, dirname, fnames ):
			sum = 0
			#print dirname
			#print fnames
			for file in fnames:
				print os.path.join(dirname, file)
				sum += os.path.getsize(os.path.join(dirname, file))
			arg.append(sum)
			
		arglist = []
		os.path.walk(DIR_STRAPPY,callback,arglist)
		
		sum = 0
		for value in arglist:
			sum += value
			
		print "Size of directory:",sum



""" Procedural rubbish... """

if (len(sys.argv) > 1):
	if(sys.argv[1]=='strappy'):
		print 'Compressing strappy...';
		compressor=Compress();
		compressor.compressStrappy();
	else:
		print 'Invalid command.'
		
else:
	print 'No command given.'