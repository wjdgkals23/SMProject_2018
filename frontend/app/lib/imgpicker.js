const imageSource = require("tns-core-modules/image-source");
const frameModule = require("tns-core-modules/ui/frame");
const Observable = require("tns-core-modules/data/observable").Observable;
const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const permissions = require( "nativescript-permissions" );
const imagepicker = require("nativescript-imagepicker");
const platformModule = require("tns-core-modules/platform");
const fs = require("tns-core-modules/file-system");
const imageAssetModule = require("tns-core-modules/image-asset/image-asset");
const ffor = require('tns-core-modules/image-source').fromFileOrResource;


const bghttpModule = require("nativescript-background-http");
const session = bghttpModule.session("image-upload");
const axios = require('axios');

let imageName = null;

function logEvent(e) {
    console.log("currentBytes: " + e.currentBytes);
    console.log("totalBytes: " + e.totalBytes);
    console.log("eventName: " + e.eventName);
}

function extractImageName(fileUri) {
    let pattern = /[^/]*$/;
    let imageName = fileUri.match(pattern);

    return imageName;
}

function sendImages(uri, fileUri) {
    console.log(fileUri);
    imageName = extractImageName(fileUri);
    console.log(imageName);

    let request = {
        url: "http://52.78.178.50/api/test/img",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream",
            "File-Name": imageName
        },
        description: "{ 'uploading': " + imageName + " }"
    };

    let task = session.uploadFile(fileUri, request);

    task.on("progress", logEvent);
    task.on("error", logEvent);
    task.on("complete", logEvent);

    function logEvent(e) {
        console.log("currentBytes: " + e.currentBytes);
        console.log("totalBytes: " + e.totalBytes);
        console.log("eventName: " + e.eventName);
    }

    return task;
}

function startSelection(context, vue) {
    context
        .authorize()
        .then(function () {

            return context.present();
        })
        .then(function (selection) {
            let counter = 0;
            selection.forEach(function (selected_item) {
                let localPath = null;
                if (platformModule.device.os === "Android") {
                    console.log("android platform");
                    let temp_source = imageSource.fromFile(selected_item.android);
                    let folder = fs.knownFolders.documents();
                    let temp_path = fs.path.join(folder.path, "test.png");
                    console.log(temp_path);
                    let saved = temp_source.saveToFile(temp_path, "png");
                    if(saved){
                        console.log("download success");
                    }
                    // console.log(selected_item);
                    // let source = ffor(selected_item.android);
                    // console.log(source);
                    // let folder = fs.knownFolders.documents();
                    // let path = fs.path.join(folder.path, "Test" + counter + ".png");
                    // selected_item.saveToFile(path, "png");
                    vue.imagesource.push({ name: temp_path});
                    // let task = sendImages("Image" + counter + ".jpg", localPath);
                    // task();
                }
                else {
                    console.log("ios platform");
                    vue.imagesource.push({ name: selected_item});
                    // let asset = new imageAssetModule.ImageAsset(selected_item);
                    // vue.imagesource.push({ name:asset });
                }
                counter++;
            });
        }).catch(function (e) {
        console.log(e.eventName);
    });
}

function imgpickerfunc(vue) {

    let context = imagepicker.create({
        mode: "multiple"
    });

    if (platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23) {
        permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions to read from storage")
            .then(() => {
                console.log("Permissions granted!");
                startSelection(context,vue);
            })
            .catch(() => {
                console.log("Uh oh, no permissions - plan B time!");
            });
    } else {
        permissions.requestPermission().then(() => {
            console.log("Permissions granted!");
            startSelection(context,vue);
        }).catch((e) => {
            console.log(e);
        });
    }
}

export { imgpickerfunc };
