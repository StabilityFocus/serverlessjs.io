#!/bin/bash
## b"h
##
## Name: serverlessjs :: createCloudFront.sh 
##
## Description:	purejs serverless s3 static front end, 
## create CloudFront CDN Distribution
## 		
##		
##
## Jacob Baloul <jacob@stabilityfocus.com>
## Created: Aug, 2019
##
##
# debug toggle
# export LOGFILE='build.log'
# exec 2> $LOGFILE   # redirect STDERR to $logfile
# exec 1>&2          # redirect STDOUT to STDERR, so it also ends up in $LOGFILE
# set -x          # turn trace on
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

# create cloudfront distro for hosting website
#
# https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-distribution.html
#
aws cloudfront create-distribution \
  --origin-domain-name ${TARGET_BUCKET}.s3.amazonaws.com \
  --default-root-object index.html
  
  check_error

#--# TODO: read created CDNID from aws clie reponse, parse the postback, and update build.conf automatically

