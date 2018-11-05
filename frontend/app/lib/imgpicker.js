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

function startSelection(context, vue) {
    context
        .authorize()
        .then(function () {

            return context.present();
        })
        .then(function (selection) {
            let counter = 0;
            selection.forEach(function (selected_item) {
                if (platformModule.device.os === "Android") {
                    console.log("android platform");
                    vue.imagesource.push({ name: selected_item});
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
