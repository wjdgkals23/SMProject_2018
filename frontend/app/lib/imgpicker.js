const ImageSource = require("tns-core-modules/image-source");
const permissions = require( "nativescript-permissions" );
const imagepicker = require("nativescript-imagepicker");
const platformModule = require("tns-core-modules/platform");
const fs = require("tns-core-modules/file-system");
import { PhotoEditor, PhotoEditorControl } from "nativescript-photo-editor";
import { fromFileOrResource, fromFile } from "tns-core-modules/image-source";
const photoEditor = new PhotoEditor();

let Editcount = 0;

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
    const imageSource = fromFileOrResource(src);

    console.log("ORIG IMAGE: ", imageSource.height, imageSource.width)

    photoEditor.editPhoto({
        imageSource: imageSource, // originalImage.imageSource,
        hiddenControls: [
            // // PhotoEditorControl.Save,
            // PhotoEditorControl.Clear,
            // PhotoEditorControl.Draw,
            // PhotoEditorControl.Text,
        ],
    }).then((newImage) => {
        console.log("NEW IMAGE: ", newImage.height, newImage.width)
        // console.log(newImage.saveToFile());
        let folder = fs.knownFolders.documents();
        let name = "edit"+ Editcount +".png";
        let temp_path = fs.path.join(folder.path, name);
        console.log(temp_path);
        let saved = newImage.saveToFile(temp_path, "png");

        if(saved){
            console.log("download success");
            vue.editimage.push({ src: temp_path, name: name, index: index });
        }
        // this.editimage.push({ src: newImage, name: "temp.png" });
        Editcount = Editcount + 1;
    }).catch((e) => {
        console.error(e);
    });
}

export { imgpickerfunc, imgeditor };
