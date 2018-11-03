import { PickerOptions, RadImagepicker } from "@nstudio/nativescript-rad-imagepicker";
import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { screen } from "tns-core-modules/platform";
import { topmost } from "tns-core-modules/ui/frame";
import { Repeater } from "tns-core-modules/ui/repeater";

export class PickerModel extends Observable {
    public images = new ObservableArray([]);
    private radImagepicker: RadImagepicker;
    public imageWidth;
    public hideHint = false;

    constructor() {
        super();

        if (screen.mainScreen.widthDIPs >= 350) {
            this.imageWidth = screen.mainScreen.widthDIPs / 4;
        } else {
            this.imageWidth = screen.mainScreen.widthDIPs / 3;
        }
        this.radImagepicker = new RadImagepicker();
    }

    pickImage() {
        const opts: PickerOptions = {
            doneButtonTitle: "Finish",
            allowVideoSelection: false,
            noImagesTitle: "No images here :(",
            imageLimit: 3
        };

        this.radImagepicker.pick(opts).then(selectedImages => {
            if (selectedImages) {
                this.images.length = 0;
                for (let i = 0; i < selectedImages.length; i++) {
                    this.images.push({
                        source: selectedImages[i]
                    });
                }
                return this.images;
            } else {
                console.log('User pressed cancel');
            }
        });
    }
}
