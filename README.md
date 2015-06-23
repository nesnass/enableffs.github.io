# Enable Project

The Enable project is based on github pages, which means that the files and folders in the master branch can be accessed on github web server at the following url:
http://enableffs.github.io/


## Install

> Precondition: 
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

