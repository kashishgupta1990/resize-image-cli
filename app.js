#!/usr/bin/env node

var im = require('imagemagick');
var fs = require('fs');
var async = require('async');
var mkpath = require('mkpath');
var program = require('commander');
var package = require('./package.json');
var path = require('path');
var imgResizeTask = [];

// Help Window
program
    .version(package.version)
    .usage('[ -d destinationFolder ] [ -k SedasdeEEW1231asd213 ] -s sourceFolder ')
    .option('-s, --source <source-directory-path>', 'mention the source directory path.')
    .option('-d, --destination <destination-directory-path>', 'mention destination directory path.')
    .option('-w, --width <width>', 'mention required width.')
    .option('-h, --height <height>', 'mention required height.')
    .parse(process.argv);

// Default Options
var option = {
    sourceDir: '',
    destinationDir: '',
    width: 0,
    height: 0
};

option.sourceDir = program.source || option.sourceDir;
option.destinationDir = program.destination || option.destinationDir;
option.width = program.width || option.width;
option.height = program.height || option.height;


if (option.sourceDir) {
    var sourceStat = fs.lstatSync(option.sourceDir);
    if(sourceStat.isDirectory()){
        //If destination not mentioned
        if(!option.destinationDir){
            option.destinationDir = path.join(option.sourceDir, 'resize');
        }
        mkpath.sync(option.destinationDir);

        var listOfFiles = readImageFilesFromDirectory(option.sourceDir);
        listOfFiles.forEach(function (imgLink) {
            var fileName = path.basename(imgLink);
            var destinationCompletePath = path.join(option.destinationDir, fileName);
            imgResizeTask.push(function(callback){
                im.resize({
                    srcPath: imgLink,
                    dstPath: destinationCompletePath,
                    width:   option.width,
                    height: option.height
                }, function(err, stdout, stderr){
                    if(err){
                        callback(null, 'Error: ' + imgLink);
                    }else{
                        callback(null, 'Success: ' + imgLink);
                    }
                });
            });
        });
        async.series(imgResizeTask, function (err, data) {
            if(err){
                console.log('\nError in Resize: ', err);
            }
            console.log('\n-- Image Resize completed --\n', data.join('\n'));
        })
    }
}else{
    console.log('please mention the source destination.');
}

function readImageFilesFromDirectory(dirPath) {
    var allFileList = fs.readdirSync(dirPath);
    var imgFileList = allFileList.filter(function (filePath) {
        var completePath = path.join(dirPath, filePath);
        var stat = fs.lstatSync(completePath);
        if (stat.isFile()) {
            var ext = path.extname(completePath).toLowerCase().trim();
            if (ext.toLowerCase().trim() === '.jpg' || ext === '.jpeg' || ext === '.png') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });
    imgFileList = imgFileList.map(function (imgName) {
        return path.join(dirPath, imgName);
    });
    return imgFileList;
}


