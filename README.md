Memory
=======
JS Course Project in [Master MWT](http://mwt.disim.univaq.it/).

## Description 

This is a Javascript implementation of the game 'Memory'.

This project uses [npm](https://www.npmjs.com/) package manager, [webpack](https://webpack.js.org/) module bundler and 
the [file-loader](https://www.npmjs.com/package/file-loader) package as an addon to webpack.

## Author
* **[Riccardo Armando Di Prinzio](mailto:riccardoarmando.diprinzio@student.univaq.it)** [Matr: 268568]

## Project structure

##### Directory tree:
<pre>
/
├── dist
│   ├── images
│   │   └── ...
│   ├── index.html
│   └── main.js
├── src
│   ├── domain
│   │   ├── Card.js
│   │   └── CardManager.js
│   ├── img
│   │   └── ...
│   ├── utils
│   │   ├── helpers.js
│   │   └── ImageUtils.js
│   ├── index.js
│   ├── memory.js
│   ├── victory.js
│   └── welcome.js
├── package.json
├── package-lock.json
├── README.md
└── webpack.config.js
</pre>

##### Directories and files description:
* **dist**: directory that contains the production code (index.html and a (minified) main.js) and the utilized (emitted) 
images.

* **node_modules**: npm modules directory.

* **src**: directory that contains all the application's JS source code and assets.

    * **domain**: directory that contains the model objects.
        * **Card.js**: object that represents a card structure.
        * **CardManager.js**: object that deals with cards.
        
    * **img**: directory that contains memory card's images.
    
    * **utils**: directory that contains the handling logic for images and general helpers functions and objects.
        * **helpers.js**: file that contains helpers functions and objects.
        * **ImageUtils.js**: file that contains Image and ImageUtils objects that handle images.
        
    * **index.js**: it creates the root div and calls the welcome file (this file is webpack entry point).
    * **memory.js**: the Memory game.
    * **victory.js**: it is called by the memory file if the player win.
    * **welcome.js**: it is called by the index file, contains the welcome screen.
    
## Browser known compatibility issues
| Browser  | Program Execution  | Issues  	|
|:--------:|:------------------:|:---------:|
| Chrome (v.80) |    Perfect 		    | Undetected |
| Firefox (v.73)|    Perfect  		    | Undetected |
| Opera (v.66)  |    Perfect 		    | Undetected |
| Edge (v.44)   |    Perfect 		    | Undetected |
| IE (v.11)	    |    Not running at all	| main.js: JS syntax error (maybe ES6 not supported) |