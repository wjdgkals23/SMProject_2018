<template>
    <StackLayout backgroundColor="white" padding="10" id="upload">
        <TextField :text="uploadtitle" hint="제목" editable="true" class="titlestyle"/>
        <CardView class="cardStyle" elevation="0" radius="15">
            <GridLayout rows="*" margin="0">
                <GridLayout verticalAlignment="top">
                    <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="10" paddingRight="10">
                        <TextView :text="uploadcontent" hint="내용을 작성하는 칸입니다" editable="true" class="contentstyle"/>
                    </StackLayout>
                </GridLayout>
                <GridLayout verticalAlignment="bottom" horizontalAlignment="left">
                    <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="16" width="18%" style="border-bottom: solid 1px purple">
                        <Image src="~/assets/images/btn/imageupload.png" stretch="aspectFit" @tap="uploadimage"/>
                    </StackLayout>
                </GridLayout>
            </GridLayout>
        </CardView>
        <StackLayout>
            <Image :src="imagesource" stretch="aspectFit"/>
        </StackLayout>
    </StackLayout>
</template>

<script>
    const permissions = require( "nativescript-permissions" );
    const imagepicker = require("nativescript-imagepicker");
    const platformModule = require("tns-core-modules/platform");

    export default {
        name: "UploadView",
        data: function() {
            return {
                uploadtitle: null,
                uploadcontent: null,
                titlestyle: "style1",
                imagesource: "~/assets/images/btn/imageupload.png",
            }
        },
        methods: {
            uploadimage(){

                let that = this;
                let context = imagepicker.create({
                    mode: "multiple"
                });

                if (platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23) {
                    permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions to read from storage")
                        .then(() => {
                            console.log("Permissions granted!");
                            // startSelection(context);
                            context.authorize().then(() => {
                                return context.present();
                            }).then((selection) => {
                                // console.log(selection);
                                selection.forEach((selected_item) => {
                                    console.log(selected_item);
                                    that.imagesource = selected_item;
                                    selected_item.getImageAsync().then((source) => {
                                        console.log(source);
                                    })
                                })

                            })
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
                            selection.forEach((selected_item) => {
                                console.log(selected_item);
                                that.imagesource = selected_item;
                                // selected_item.getImageAsync().then((source) => {
                                //     console.log(source);
                                // })
                            })

                        }).catch((e) => {
                            console.log(e);
                        });
                    })
                }

            }
        }
    }
</script>

<style scoped>
    #upload {
        font-family: THEmpgtB;
        font-family: THELu;
    }
    .cardStyle {
        /*color: #fff;*/
        width: 92%;
        height: 500px;
        padding: 4%;
        background: #e0d0ea;
        border-radius: 15px;
    }
    .titlestyle {
        border-bottom-width: 1px;
        border-color: purple;
        placeholder-color:purple;
        margin-bottom: 30px;
        padding: 40px;
        color: purple;
    }
    .contentstyle {
        font-size: 15px;
        border-bottom-width: 1px;
        border-color: #e0d0ea;
        placeholder-color:purple;
        width: 95%;
        height: 90%;
        padding: 5px;
        margin-top: 5px;
    }
</style>
