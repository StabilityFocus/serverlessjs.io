#!/bin/bash
## b"h
##
## Name: serverlessjs :: createS3bucket.sh 
##
## Description:	purejs serverless s3 static front end
## 		
##		
##
## Jacob Baloul <jacob@stabilityfocus.com>
## Created: Aug, 2019
##
##
#--# Debug toggle ::
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



# create s3 bucket with public website hosting capability
# https://docs.aws.amazon.com/cli/latest/reference/s3/website.html
#
aws s3api create-bucket --bucket ${TARGET_BUCKET} --region ${AWS_REGION}
  check_error
aws s3 website s3://${TARGET_BUCKET}/ --index-document index.html --error-document error.html
  check_error

echo '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Allow Public Access to All Objects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'$TARGET_BUCKET'/*"
    }
  ]
}' > public-s3-bucket-policy.json
  check_error

echo '{
  "IndexDocument": {
    "Suffix": "index.html"
  },
  "ErrorDocument": {
    "Key": "error.html"
  },
  "RoutingRules": [
    {
      "Redirect": {
        "ReplaceKeyWith": "index.html"
      },
      "Condition": {
        "KeyPrefixEquals": "/"
      }
    }
  ]
}' > s3-website-config.json
  check_error

aws s3api put-bucket-policy --bucket $TARGET_BUCKET --policy file://public-s3-bucket-policy.json
  check_error
aws s3api put-bucket-website --bucket $TARGET_BUCKET --website-configuration file://s3-website-config.json
  check_error




