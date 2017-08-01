# resize-image-cli
Command line tool which resize the .png and .jpg images. 

# prerequisite software
It uses `imagemagic` software to resize your images.
- Install `brew` 
- Install `imagemagic`

## Module Usage 

### Install
```sh
 npm install resize-image-cli -g
 ```
 
```sh 
resize-image -s images/ -d resize -w 100 -h 100
```
 Usage: resize-image  -d destinationFolder -s sourceFolder [-w width] [-h height] 
 
 Options:
 
     -V, --version                                   output the version number
     -s, --source <source-directory-path>            mention the source directory path.
     -d, --destination <destination-directory-path>  mention destination directory path.
     -w, --width <width>                             mention required width.
     -h, --height <height>                           mention required height.
     -h, --help                                      output usage information.

# For Bugs / Features request please visit the following links:-
- https://github.com/kashishgupta1990/resize-image-cli/issues