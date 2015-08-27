# Enable Project

The Enable project is based on github pages, which means that the files and folders in the master branch can be accessed on github web server at the following url:
http://enableffs.github.io/


## Install

> Preconditions: 
- install git on your system [https://git-scm.com/]
- install npm on your system [https://nodejs.org/]
- install grunt-cli on your system [http://gruntjs.com/installing-grunt]

In order to run the project locally, create a local git copy, 'cd' to the root of the project and run the following command: 

```sh
$ git clone https://github.com/enableffs/enableffs.github.io.git
$ cd enableffs.github.io/
$ npm start
```

This will dowload all the necessary npm packages, build the search dictionary, generate the docs for the api (available at: http://enableffs.github.io/docs/), and finally launch a local webserver available at: http://localhost:8000/


## Widgets

### ENABLE-VIDEO
Add this element anywhere to create a quiz. Quiz questions are currently taken from quiz.json located at root level

* vididlc:      the filename of the local video file (NOTE: this will also load the matching poster and subtitles)

```sh
- vididlc:            enable-1000
- video filename:     enable-1000.mp4
- video poster:       enable-1000__00_00_00_00.png
- video subtitles:    enable-1000_{CCLANG}.srt 
```

* vididyt:      the string id of the matching youtube video
* cclang:       the language code ('en', 'ks', etc) for loading the subtitles
* localmode:    the mode for the player (local, remote).
 
```sh
- localmode (default):  sets the mode based on automatic detection
- true:                 local mode
- false:                youtube mode
```

```html
<enable-video vididlc="enable-1000" vididyt="AZhcZ7AILf0" cclang="en" localmode="localmode"></enable-video>
```