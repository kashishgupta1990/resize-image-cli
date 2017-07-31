# resize-image-cli
Command line tool which resize the .png and .jpg images. It uses `imagemagic` software to resize your images.

## Module Usage 

### Install
```sh
 npm install resize-image-cli -g
 ```
 
```sh 
resize-image -s images/ -d resize -w 100 -h 100
```
 Usage: shrink-pic [ -d destinationFolder ] [ -k SedasdeEEW1231asd213 ] -s sourceFolder

  Options:

    -s, --source <source-directory-path>            mention the source directory path.
    -d, --destination <destination-directory-path>  mention destination directory path.
    -d, --width <width>  mention required width.
    -d, --height <height>  mention required height.

