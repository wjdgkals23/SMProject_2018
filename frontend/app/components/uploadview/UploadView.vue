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
        <GridLayout rows="*" columns="*" :Visibility="visible">
            <Label text="PreView" />
        </GridLayout>
        <ScrollView orientation="horizontal" :Visibility="preview">
            <GridLayout rows="100" columns="*">
                <StackLayout orientation="horizontal">
                    <CardView class="cardStyle" elevation="40" radius="15" v-for="item in imagesource">
                        <GridLayout rows="*" columns="*" margin="0">
                            <Image class="img" :src="item.name" stretch="aspectFill" @tap="getinfo(item.base64)" />
                        </GridLayout>
                    </CardView>
                </StackLayout>
            </GridLayout>
        </ScrollView>
    </StackLayout>
</template>

<script>
    import { imgpickerfunc } from '../../lib/imgpicker'
    import * as http from "http";
    const imgs = require('tns-core-modules/image-source').ImageSource;
    const ffor = require('tns-core-modules/image-source').fromFileOrResource;
    const fs = require("tns-core-modules/file-system");
    const platformModule = require("tns-core-modules/platform");
    const bghttpModule = require("nativescript-background-http");
    const session = bghttpModule.session("image-upload");

    const config = {
        headers: { 'Content-Type': 'multipart/form-data', "File-Name": "temp.png" }
    }


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
            getinfo(src) {
                if (platformModule.device.os === "Android") {
                    console.log(src);
                    let formdata = new FormData();
                    console.log("temp");
                    formdata.append("img", src);
                    http.request({
                        url: "http://10.0.2.2:3000/api/test/img",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: src
                    }).then(response => {
                        console.log(response);
                    }, error => {
                        console.error(error);
                    });
                    // axios.post("http://10.0.2.2:3000/api/test/img", formdata, config).then((res) => {
                    //     console.log(res);
                    // })
                    // let request = {
                    //     url: "http://10.0.2.2:3000/api/test/img",
                    //     method: "POST",
                    //     headers: config.headers,
                    //     description: "{ 'uploading': " + "temp.png" + " }"
                    // };
                    // let task = session.uploadFile(formdata, request);
                    // task.on("complete", (event) => {
                    //     console.log(event);
                    // });
                    // console.log("done");
                }
                else {
                    console.log(src);
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
