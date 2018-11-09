<template>
    <GridLayout rows="*,*" columns="*">
        <GridLayout row="0" rows="*" columns="*,*">
            <GridLayout row="0" col="0" verticalAlignment="top" horizontalAlignment="left" width="10%">
                <StackLayout paddingTop="8" paddingLeft="10">
                    <Image src="~/assets/images/icon/leftarrow.png" stretch="aspectFit" @tap="$navigateBack" />
                </StackLayout>
            </GridLayout>
            <GridLayout row="0" col="1" verticalAlignment="center" horizontalAlignment="right" width="23%">
                <StackLayout paddingTop="8" paddingRight="10">
                    <Image verticalAlignment="center" src="~/assets/images/btn/upload.png" stretch="aspectFit" @tap="sendimage"/>
                </StackLayout>
            </GridLayout>
        </GridLayout>
        <StackLayout row="1" backgroundColor="white" padding="10" id="upload">
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
            <GridLayout rows="*" columns="*" :Visibility="visible">
                <Label text="PreView" />
            </GridLayout>
            <ScrollView orientation="horizontal" :Visibility="preview">
                <GridLayout rows="100" columns="*">
                    <StackLayout orientation="horizontal">
                        <CardView class="cardStyle" elevation="40" radius="15" v-for="item in imagesource">
                            <GridLayout rows="*" columns="*" margin="0">
                                <Image class="img" :src="item.src" stretch="aspectFill" />
                            </GridLayout>
                        </CardView>
                    </StackLayout>
                </GridLayout>
            </ScrollView>
        </StackLayout>
    </GridLayout>
</template>

<script>
    import { imgpickerfunc } from '../../lib/imgpicker';
    import { sendimage } from "../../lib/sendimage";
    import axios from 'axios';
    import { apiPath } from "../../lib/httpconfig";
    const platformModule = require("tns-core-modules/platform");

    function extractImageName(fileUri) {
        let pattern = /[^/]*$/;
        let imageName = fileUri.match(pattern);

        return imageName;
    }

    export default {
        name: "UploadView",
        data: function() {
            return {
                uploadtitle: null,
                uploadcontent: null,
                titlestyle: "style1",
                imagesource: [],
                counter: 0
            }
        },
        created(){

        },
        methods: {
            uploadimage() {
                let that = this;
                return (imgpickerfunc(that));
            },
            sendimage() {
                if (platformModule.device.os === "Android") {
                    sendimage(this.imagesource, apiPath.android);
                }
                else {
                    sendimage(this.imagesource, apiPath.ios);
                }
            }
        },
        computed: {
            visible() {
                if(this.imagesource.lenbits === 0)
                    return "collapse";
                else
                    return "visible";
            },
            preview() {
                if(this.imagesource.lenbits === 0)
                    return "visible";
                else
                    return "collapse";
            }
        },
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

    .cardStyle {
        /*color: #fff;*/
        width: 92%;
        padding: 4%;
        font-size: 35px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }

    .img {
        border-radius: 15px;
        margin-right: 5px;
    }
</style>
