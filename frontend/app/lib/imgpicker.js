const ImageSource = require("tns-core-modules/image-source");
const permissions = require( "nativescript-permissions" );
const imagepicker = require("nativescript-imagepicker");
const platformModule = require("tns-core-modules/platform");
const fs = require("tns-core-modules/file-system");
const photoEditor = new PhotoEditor();
// const Cache = require("tns-core-modules/ui/image-cache").Cache;
// const cache = new Cache();
// cache.maxRequests = 3;

import { PhotoEditor, PhotoEditorControl } from "nativescript-photo-editor";
import { fromFileOrResource, fromFile } from "tns-core-modules/image-source";

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
                    let temp_source = ImageSource.fromFile(selected_item.android);
                    let folder = fs.knownFolders.documents();
                    let name = "test"+ vue.imagesource.length +".png";
                    let temp_path = fs.path.join(folder.path, name);
                    console.log(temp_path);
                    console.log();
                    let saved = temp_source.saveToFile(temp_path, "png");

                    if(saved){
                        console.log("download success");
                        vue.imagesource.push({ src: temp_path, name: name });
                    }
                }
                else {
                    console.log("ios platform");
                    ImageSource.fromAsset(selected_item).then((image) => {
                        let ios_folder = fs.knownFolders.documents().path;
                        let ios_fileName = "test"+ vue.imagesource.length +".png";
                        let ios_path = fs.path.join(ios_folder, ios_fileName);
                        let ios_saved = image.saveToFile(ios_path, "png");
                        // const ios_base64 = image.toBase64String("png", 50)
                        if(ios_saved){
                            console.log("download success");
                            vue.imagesource.push({ src: ios_path, name: ios_fileName });
                        }
                    })
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

function imgeditor(vue, src, index) {
    console.log(src);
    // let Editcount = 0;
    // console.log("here~");
    // // const images = cache.get(src);
    // // console.log("here!");
    // // console.log(images);
    // // if(images) {
    // //     let temp = ImageSource.fromNativeSource(images);
    // //     console.log(temp.android);
    // // }
    // //

    let temp = ImageSource.fromUrl(src);

    temp.then((res) => {
        let ios_folder = fs.knownFolders.documents().path;
        let ios_fileName = "test" + ".png";
        let ios_path = fs.path.join(ios_folder, ios_fileName);
        let saved = res.saveToFile(ios_path, "png");
        if(saved) {
            console.log("download");
            let temp_source = ImageSource.fromFile(ios_path);
            photoEditor.editPhoto({
                imageSource: temp_source, // originalImage.imageSource,
                hiddenControls: [
                ],
            }).then((newImage) => {
                let name_2 = "complete_edit" + ".png";
                let temp_path_2 = fs.path.join(ios_folder, name_2);
                let saved = newImage.saveToFile(temp_path_2, "png");

                if(saved){
                    console.log("download success");
                    vue.editimage.push({ src: temp_path_2, name: name_2, index: index });
                }
                // this.editimage.push({ src: newImage, name: "temp.png" });
            }).catch((e) => {
                console.error(e);
            });
        }
    }).catch((err) => {
        console.log(err);
    })

    // if(saved){
    //     console.log("download success");
    //     let temp_source = fromFileOrResource(temp_path);
    //     photoEditor.editPhoto({
    //         imageSource: temp_source, // originalImage.imageSource,
    //         hiddenControls: [
    //         ],
    //     }).then((newImage) => {
    //         let name_2 = "complete_edit"+ Editcount +".png";
    //         let temp_path_2 = fs.path.join(folder.path, name_2);
    //         let saved = newImage.saveToFile(temp_path_2, "png");
    //
    //         if(saved){
    //             console.log("download success");
    //             vue.editimage.push({ src: temp_path_2, name: name_2, index: index });
    //         }
    //         // this.editimage.push({ src: newImage, name: "temp.png" });
    //         Editcount = Editcount + 1;
    //     }).catch((e) => {
    //         console.error(e);
    //     });
    // }
    // else {
    //     console.log("download fail");
    // }
}

export { imgpickerfunc, imgeditor };
