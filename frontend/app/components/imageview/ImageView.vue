<template>
    <ScrollView row="0">
        <WrapLayout orientation="horizontal" padding="5">
            <CardView class="cardStyle" margin="6" elevation="40" radius="5" v-for="item in img_list" width="45%">
                <GridLayout rows="auto, auto" columns="auto, auto, *">
                    <Image :src="item.src" stretch="aspectFill" colSpan="3" row="0" @tap="edit(item.src)"/>
                    <Label class="fa" :text="'fa-heart' | fonticon" row="1" colSpan="3" padding="10" background="#fff" color="red"/>
                </GridLayout>
            </CardView>
        </WrapLayout>
    </ScrollView>
</template>

<script>
    // import CardView from 'nativescript-cardview'
    const PhotoEdit = require('nativescript-photo-editor').PhotoEditor;
    const PhotoEditorControl = require('nativescript-photo-editor').PhotoEditorControl;
    const imgs = require('tns-core-modules/image-source').ImageSource;
    const ffor = require('tns-core-modules/image-source').fromFileOrResource;
    export default {
        name: 'ImageView',
        props: ['imgdata'],
        components: {
            // CardView
        },
        data() {
            return {
                msg: 'Hello World!',
                data:[
                    {title:"none", src: "~/assets/images/NativeScript-Vue.png"},
                ],
                busy: true,
                result: null,
                pe: new PhotoEdit(),
                imagesource: imgs,
                pec: PhotoEditorControl,
            }
        },
        mounted() {
            // this.pe = new PhotoEdit();
        },
        methods:{
            edit: function(src) {
                // console.log(this.pec.Crop);
                let imageSource = ffor(src);
                this.pe.editPhoto({
                    imageSource: imageSource,
                    hiddenControls: [
                        // PhotoEditorControl.Save,
                        // this.pec.Crop,
                    ],
                }).then((ImageSource) => {
                    // Here you can save newImage, send it to your backend or simply display it in your app
                    console.log(ImageSource);
                }).catch((e) => {
                    console.error(e);
                });
            }
        },
        computed: {
            img_list: function(){
                if(this.imgdata == null){
                    return this.data;
                }
                else{
                    return this.imgdata;
                }
            }
        }
    }
</script>

<style scoped>
    .cardStyle {
        background-color: #3489db;
        color: #fff;
    }

    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20px;
        color: #333333;
    }

    #navigation {
        background-color: aquamarine;
    }

    #navigation Label {
        text-align:center;
        font-size: 25%;
        color: darkslategray;
        vertical-align: middle;
        /*hover*/
    }
</style>
