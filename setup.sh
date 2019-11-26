#!/bin/bash
## b"h
##
## Name: serverlessjs :: setup.sh 
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
export LOGFILE='setup.log'
exec 2> $LOGFILE   # redirect STDERR to $logfile
exec 1>&2          # redirect STDOUT to STDERR, so it also ends up in $LOGFILE
set -x          # turn trace on

## MAIN :: SETUP
./createS3bucket.sh
./createCloudFront.sh


