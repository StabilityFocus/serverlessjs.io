#!/bin/bash
## b"h
##
## Name: serverlessjs :: build.sh 
##
## Description:	purejs serverless s3 static front end
## 		
##		
##
## Jacob Baloul <jacob@stabilityfocus.com>
## Created: Aug, 2019
##
##
# debug toggle
export LOGFILE='build.log'
echo "when build completes, see $LOGFILE for details."
exec 2> $LOGFILE   # redirect STDERR to $logfile
exec 1>&2          # redirect STDOUT to STDERR, so it also ends up in $LOGFILE
set -x          # turn trace on
#
#
#
##########################
##
## VARIABLES || OVERRIDES
##
##########################


export APPCONF="./build.conf"

#########


##########################
##
## APP ESSENTIALS (bootstrap)
## 
##########################
if test -f $APPCONF ; then
	source $APPCONF
	if test $? -gt 0
	  then
		echo "missing conf file @ $APPCONF"
		exit 1
	fi
fi
##



###
# Functions
###
function check_error(){
if test $? -gt 0
  then
	echo "

	$(date) :: ooops, something broke :-S

	STEP :: $STEP

" | tee -a $LOGFILE
	exit 1
fi
}
###
###
function repoint_index_min() {
#
# Make sure index.html is pointing to min file
#
sed -i.bk 's/serverlessjs-core.js/serverlessjs-core-min.js/g' index.html
sed -i.bk 's/style.css/style-min.css/g' index.html
}
###
###
function obfuscate_code() {

#
# Obfuscate serverlessjs-core.js
#
# https://github.com/javascript-obfuscator/javascript-obfuscator
yarn add --dev javascript-obfuscator
# npm install --save-dev javascript-obfuscator
export jsLock='node_modules/javascript-obfuscator/bin/javascript-obfuscator'

# javascript-obfuscator input_file_name.js --output output_file_name.js [options]
# javascript-obfuscator samples/sample.js --output output/output.js --compact true --self-defending false
# javascript-obfuscator samples/sample.js --output output/output.js --compact true --self-defending true
$jsLock serverlessjs-core.js --output serverlessjs-core-min.js --compact true --self-defending true


#
#
# Obfuscate CSS
#
# https://www.npmjs.com/package/uglifycss
npm install uglifycss -g
# uglifycss [options] [filename] [...] > output
uglifycss --ugly-comments style.css  > style-min.css

}
###
###
function create_release() {

mkdir -p releases/current

# 
# Copy files
#
#cp -vpr index.html releases/current/.
echo "index.html
error.html
logo.svg
style-min.css
serverlessjs-core-min.js
icons
favicon.ico
manifest.json
browserconfig.xml" | while read appfile ;
do
  cp -vpr $appfile releases/current/.
done

}
###
###
function s3_deploy() {
# Upload to bucket
#--# controlled in build.conf
aws s3 sync --no-follow-symlinks releases/current s3://${TARGET_BUCKET}/
}
###
###
function purge_cloudfront(){
#
# Purge CloudFront
#
# CDNID purge logic src from build.conf
#--# aws cloudfront create-invalidation --distribution-id E1AHI6W6DDRFJZ \
aws cloudfront create-invalidation --distribution-id $CDNID \
  --paths /index.html /error.html /serverlessjs-core-min.js /style-min.css /logo.svg
}


####################
##
## MAIN
##
###################

echo "
=============
BEGIN
=============

DATE: $(date)"


###################################################
###
###
export STEP="Starting build..."
echo "
====
STEP START: $STEP
====
# $(date)
===
" | tee -a $LOGFILE


###################################################
###
###
export STEP="repoint_index_min"
echo "
====
STEP START: $STEP
====
# $(date)
===
" | tee -a $LOGFILE

repoint_index_min
  check_error

echo "
===
# $(date)
==== 
STEP DONE: $STEP
==== 
" | tee -a $LOGFILE
###
###
###################################################
###
###
export STEP="obfuscate_code"
echo "
====
STEP START: $STEP
====
# $(date)
===
" | tee -a $LOGFILE


### logic
obfuscate_code
  check_error


echo "
===
# $(date)
==== 
STEP DONE: $STEP
==== 
" | tee -a $LOGFILE
###
###
###################################################
###
###
export STEP="create_release"
echo "
====
STEP START: $STEP
====
# $(date)
===
" | tee -a $LOGFILE


### logic
create_release
  check_error


echo "
===
# $(date)
==== 
STEP DONE: $STEP
==== 
" | tee -a $LOGFILE
###
###
###################################################
###
###
export STEP="s3_deploy"
echo "
====
STEP START: $STEP
====
# $(date)
===
" | tee -a $LOGFILE


### logic
s3_deploy
  check_error


echo "
===
# $(date)
==== 
STEP DONE: $STEP
==== 
" | tee -a $LOGFILE
###
###
###################################################
###
###
export STEP="purge_cloudfront"
echo "
====
STEP START: $STEP
====
# $(date)
===
" | tee -a $LOGFILE


### logic
purge_cloudfront
  check_error


echo "
===
# $(date)
==== 
STEP DONE: $STEP
==== 
" | tee -a $LOGFILE
###
###
###################################################
###
###
echo "

Site ready at :: $TARGET_BUCKET_URL


https://serverlessjs.io/


deploy complete, see $LOGFILE for details

"
