# Enable Project

> Run shell commands

A good way to interact with other CLI tools. E.g. compiling Compass `compass compile` or get the current git branch `git branch`.

**Use [StackOverflow](http://stackoverflow.com/questions/tagged/gruntjs) for support questions.**


## Install

```sh
$ npm install --save-dev grunt-shell
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	shell: {
		options: {
			stderr: false
		},
		target: {
			command: 'ls'
		}
	}
});

grunt.registerTask('default', ['shell']);
```