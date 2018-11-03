const Observable = require("tns-core-modules/data/observable").Observable;
const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;

import { PickerOptions, RadImagepicker } from "@nstudio/nativescript-rad-imagepicker";
// import { opts } from "./OPT.ts";

const screen = require("tns-core-modules/platform").screen;
const topmost = require("tns-core-modules/ui/frame").topmost;
const Repeater = require("tns-core-modules/ui/repeater").Repeater;

let radImagepicker = new RadImagepicker();

let opts = {
    imageLimit: 3
}

function imgpickers(vue){
    radImagepicker.pick(opts).then((selectedImages) => {
        if (selectedImages) {
            // Do something with selected images
            // currently
            // the image will be of type nativescript image source
            // tns-core-modules/image-source
            console.log(selectedImages[0]);
            vue.imagesource.push({ name: selectedImages[0] });
        }
    });
}

export { imgpickers };

