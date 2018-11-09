<template>
    <StackLayout>
        <GridLayout rows="*" columns="*" >
            <Label text="제안할 이미지를 선택하세요." @tap="send"/>
        </GridLayout>
        <ScrollView orientation="horizontal" >
            <GridLayout rows="100" columns="*" paddingTop="6">
                <StackLayout orientation="horizontal">
                    <CardView elevation="40" v-for="item in imgdata">
                        <GridLayout rows="*" columns="*" >
                            <Image :src="item.src" stretch="aspectFill" @tap="editphoto(item.src)"/>
                        </GridLayout>
                    </CardView>
                </StackLayout>
            </GridLayout>
        </ScrollView>
        <ScrollView orientation="horizontal" >
            <GridLayout rows="100" columns="*" paddingTop="6">
                <StackLayout orientation="horizontal">
                    <CardView elevation="40" v-for="item in editimage">
                        <GridLayout rows="*" columns="*" >
                            <Image :src="item.src" stretch="aspectFill" />
                        </GridLayout>
                    </CardView>
                </StackLayout>
            </GridLayout>
        </ScrollView>
    </StackLayout>
</template>

<script>
    import { sendimage } from "../../lib/sendimage";
    import { apiPath } from "../../lib/httpconfig";
    import { PhotoEditor, PhotoEditorControl } from "nativescript-photo-editor";
    import { fromFileOrResource, fromFile } from "tns-core-modules/image-source";
    const ImageSource = require("tns-core-modules/image-source");
    const fs = require("tns-core-modules/file-system");
    const photoEditor = new PhotoEditor();
    const platformModule = require("tns-core-modules/platform");

    export default {
        name: "DetailComment",
        props: [ 'imgdata' ],
        data: function() {
            return {
                editimage: []
            }
        },
        created() {
            console.log("created");
            console.log(this.imgdata.length);
        },
        methods: {
            editphoto(src) {
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
                    let name = "edit"+ this.editimage.length +".png";
                    let temp_path = fs.path.join(folder.path, name);
                    console.log(temp_path);
                    let saved = newImage.saveToFile(temp_path, "png");

                    if(saved){
                        console.log("download success");
                        this.editimage.push({ src: temp_path, name: name });
                    }
                    // this.editimage.push({ src: newImage, name: "temp.png" });
                }).catch((e) => {
                    console.error(e);
                });
            },
            send() {
                if (platformModule.device.os === "Android") {
                    sendimage(this.editimage, apiPath.android);
                }
                else {
                    sendimage(this.editimage, apiPath.ios);
                }
            }
        }
    }
</script>

<style scoped>
    .cardStyle {
        /*color: #fff;*/
        margin-right: 5px;
    }
</style>
