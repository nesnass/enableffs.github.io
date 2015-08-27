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

### enable-video
Add this element anywhere to create a videoplayer.

```html
<enable-video vididlc="enable-1000" vididyt="AZhcZ7AILf0" cclang="en" localmode="localmode"></enable-video>
```

* vididlc:      the filename of the local video file (NOTE: this will also load the matching poster and subtitles), see exmaple below:

```txt
- vididlc:            enable-1000
- video filename:     enable-1000.mp4
- video poster:       enable-1000__00_00_00_00.png
- video subtitles:    enable-1000_{CCLANG}.srt 
```

* vididyt:      the string id of the matching youtube video
* cclang:       the language code ('en', 'ks', etc) for loading the subtitles
* localmode:    the mode for the player (local, remote), see example below
 
```txt
- localmode="localmode":    sets the mode based on automatic detection (default)
- localmode="true":         local mode
- localmode="false":        youtube mode
```

### enable-audio
Add this element anywhere to create an audioplayer.

```html
<enable-audio sndid="enable"></enable-audio>
```

* sndid:    the filename of the sound/audio file. This requires that 2 audio files are created in the following formats:

```txt
- enable.m4a
- enable.mp3
- enable.ogg
```
