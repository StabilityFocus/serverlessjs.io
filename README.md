# serverlessjs.io

## Includes
* PureJS FrontEnd on ServerLess S3 bucket with CloudFront
* local dev/ debug tools
* build tools:
** obfuscation
** minification

## Requirements
* node
* npm
* yarn
* aws cli (pip3 python)


## Advantages
* Designed to be a lite weight, low cost (tco), secure, decoupled front end with minimum requirements.
* Easy to install
* Build, deploy & forget
* Single Page Application
* Pure JavaScript FrontEnd
* AJAX Fetch 
* Live Refresh
* Twitter Bootstrap CSS compatable
* Open Source

## Installation
```
	# Download repo
	git clone git@github.com:StabilityFocus/serverlessjs.io.git

	# Rename your project, example:
	mv serverlessjs.io thatsawesome.org
	cd thatsawesome.org

	# Customize conf file
	cp -vpr build.conf.template build.conf		# copy config file template
	vim build.conf 					# edit config file
	# :%s/serverlessjs/public-thatsawesome/gc	# ex: replace CHANGE ME variables

	# Setup
	./setup.sh					# run the installer
```

## Build
	# VALIDATE build.conf, then when you are ready, run:
```
	./build.sh
```


## Start & Customize
	# index-advanced-example.html -> index.html
	# To start from an advanced example, run:
```
		cp -vpr index-advanced-example.html index.html
		./build.sh
```

	# index-minimum-example.html -> index.html
	# To start from a simplistic minimum template, run:
```
		cp -vpr index-minimum-example.html index.html
		./build.sh
```




## Rinse & Repeat
	# Edit your site code, and re run build.sh
```
	vim index.html
	./build.sh
```

## Develop & Debug

```
setDevindex.sh 
debugHTTPSERVER.sh



## Motivation
* https://www.stabilityfocus.com/post/how-seo-ruined-the-world

## Working Example
* https://fe.buzzwords.news






## Credits
* creator Jacob Baloul <jacob@stabilityfocus.com> 
* :: <a href="https://www.linkedin.com/in/jacovbaloul/" target="_blank">LinkedIn</a>


