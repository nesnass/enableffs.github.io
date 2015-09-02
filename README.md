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

### enable-section-header
Add this element anywhere to create a header for a section. This includes a background picture and an overlay section title, all accessible.

```html
<enable-section-header picpath="africa01.jpg" picalt="Inclusion of learners with visual impairment" title="Introduction"></enable-section-header>
```

* picpath:  The relative path of the image to be used as a background for the section header
* picalt:   The alternative text to be read by screenreaders when accessing the picture above
* title:    The title of the section to be displayed in the overlay


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

* sndid:    the filename of the sound/audio file. This requires that 3 audio files are created in the following formats:

```txt
- enable.m4a
- enable.mp3
- enable.ogg
```

### enable-image
Add this element anywhere to create an audioplayer.

```html
<enable-image picname="africa02.jpg" picalt="Description of the picture comes here"></enable-image>
```

* picname:   the name of the picture to insert (relative to the media folder where the section is loaded from). this must include picture extension (.jpg, .gif, .png)
* picalt:    the alternative text for the picture to be read by screenreaders


### enable-slideshow
Add this element anywhere to create a slideshow.

```html
<enable-slideshow path="slideshow1"></enable-slideshow>
```

* path:    the relative path to the slideshow folder, which must contain:

```txt
- a "init.json" file defining the slideshow
- the pictures to be loaded by this slideshow
```

The "init.json" file should look like something like this

```json
[
  {
    "src": "picture1.jpg",
    "text_en": "Picture 1 ",
    "text_fr": "Image 1"
  },
  {
      "src": "picture2.jpg",
      "text_en": "Picture 2",
      "text_fr": "Image 2"
  }
]
```


### enable-read-more
Add this element anywhere to create a "read-more" expandable section.

```html
<enable-read-more>THE HIDDEN TEXT</enable-read-more>
```

This will show a large "read more" button, which, once clicked, will reveal/hide the hidden text.


### enable-quick-question
Add this element anywhere to create a "question / answer" interaction.


```html
<enable-quick-question e-question="This is the question" e-answer="This is the answer"></enable-quick-question>
```

* e-question:   The question
* e-answer:     The answer


### enable-quote-box
Add this element anywhere to create a "quote box" section with a choice of two types.


```html
<enable-quote-box e-type="story">This is the story text</enable-quote-box>
```

* e-type:   Type of formatting for the text - 'story' or 'quote' types

### enable-grey-box
Add this element anywhere to create a "grey box" section with a choice of icons.


```html
<enable-grey-box e-type="warning">The text in the box</enable-grey-box>
```

* e-type:   The icon to use.  'funfact', 'warning', 'story', 'quote'

### enable-link
Add this element anywhere to create a styled link.


```html
<enable-link href="link">Link text</enable-link>
```
