#!/bin/bash

# Change index.html to point to unmin js file
sed -i.bk 's/serverlessjs-core-min.js/serverlessjs-core.js/g' index.html
sed -i.bk 's/style-min.css/style.css/g' index.html
