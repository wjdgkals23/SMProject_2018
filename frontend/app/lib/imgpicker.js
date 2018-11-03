const imageSource = require("tns-core-modules/image-source");
const frameModule = require("tns-core-modules/ui/frame");
const Observable = require("tns-core-modules/data/observable").Observable;
const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const permissions = require( "nativescript-permissions" );
const imagepicker = require("nativescript-imagepicker");
const platformModule = require("tns-core-modules/platform");
const fs = require("tns-core-modules/file-system");

function startSelection(context, vue) {
    context
        .authorize()
        .then(function () {

            return context.present();
        })
        .then(function (selection) {
            console.log("here1");
            console.log(selection);
            selection.forEach(function (selected_item) {
                console.log("there");
                selected_item.getImageAsync().then(function (imagesource) {
                    console.log("iam");
                    let localPath = null;

                    if (platformModule.device.os === "Android") {
                        console.log("here2");
                        console.log(selected_item.android);
                        localPath = selected_item.android;
                    } else {
                        // selected_item.ios for iOS is PHAsset and not path - so we are creating own path
                        let folder = fs.knownFolders.documents();
                        let path = fs.path.join(folder.path, "Test" + counter + ".png");
                        let saved = imagesource.saveToFile(path, "png");

                        localPath = path;
                    }
                    console.log("here3");
                    console.log(localPath);

                    if (localPath) {
                        let task = sendImages("Image" + counter + ".png", localPath);
                        vue.imagesource.push(fromObject({ thumb: imagesource, uri: "Image" + counter + ".png", uploadTask: task }));
                    }
                    // counter++;
                })
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
            context.authorize().then(() => {
                return context.present();
            }).then((selection) => {
                console.log(selection);
                selection.forEach((selected) => {
                    let temp = {};
                    temp.name = selected;
                    vue.imagesource.push(temp);
                })

            }).catch((e) => {
                console.log(e);
            });
        })
    }
}

export { imgpickerfunc };
