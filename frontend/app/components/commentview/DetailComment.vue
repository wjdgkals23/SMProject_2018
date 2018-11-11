<template>
    <StackLayout>
        <!-- 이미지 선택 -->
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
        <!-- 수정된 이미지 뷰 -->
        <ScrollView orientation="horizontal" v-show="editcnt">
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
        <!-- 댓글 뷰 -->
        <GridLayout rows="100,*">
            <!-- 댓글 작성바 -->
            <GridLayout row="0" columns="2*,10*,2*" paddingTop="15" width="100%">
                <StackLayout col="0" horizontalAlignment="stretch" verticalAlignment="center" paddingLeft="0">
                    <Image src="~/assets/images/icon/camera.png" width="100%" />
                </StackLayout>
                <StackLayout col="1" horizontalAlignment="left" padding="1">
                    <CardView elevation="0">
                        <StackLayout>
                            <TextView v-model="writecomment" verticalAlignment="center" text="댓글을 작성하세요" editable="true" class="tagsearch"/>
                        </StackLayout>
                    </CardView>
                </StackLayout>
                <StackLayout col="2" horizontalAlignment="stretch" verticalAlignment="center" paddingLeft="3">
                    <Image src="~/assets/images/btn/commentupload.png" width="100%" />
                </StackLayout>
            </GridLayout>
            <StackLayout row="1">
                <!-- 댓글 리스트 뷰 -->
                <GridLayout ></GridLayout>
            </StackLayout>
        </GridLayout>
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
        props: [ 'imgdata', 'comment' ],
        data: function() {
            return {
                editimage: [],
                writecomment: "",

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
        },
        computed: {
            editcnt: function(){
                return this.editimage.length==0 ? false : true;
            }
        }
    }
</script>

<style scoped>
    .cardStyle {
        /*color: #fff;*/
        margin-right: 5px;
    }

    .tagsearch {
        background: #e0d0ea;
        font-size: 20px;
        width: 100%;
        height: 95%;
        border-radius: 15px;
        /*padding-top: ;*/
    }
</style>
