<template>
    <ScrollView>
        <GridLayout columns="*,*" class="mybold">
            <StackLayout col="0">
                <CardView class="cardStyle" elevation="40" radius="15" v-for="item in first_col">
                    <GridLayout rows="*" columns="*" margin="0">
                        <Image class="img" :src="item.src" stretch="aspectFill" />
                        <GridLayout verticalAlignment="bottom">
                            <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="16">
                                <Label class="fa" :text="'fa-thumbs-o-up' | fonticon" color="purple"/>
                            </StackLayout>
                        </GridLayout>
                        <GridLayout verticalAlignment="top">
                            <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="8" paddingRight="16">
                                <Label class="titletext" :text="item.title" textWrap="true"/>
                            </StackLayout>
                        </GridLayout>
                    </GridLayout>
                </CardView>
            </StackLayout>
            <StackLayout col="1">
                <CardView class="cardStyle" elevation="40" radius="15" v-for="item in second_col">
                    <!--<AbsoluteLayout>-->
                        <!--<Image class="img" width="100%" :src="item.src" stretch="aspectFill" @tap="edit(item.src)"/>-->
                        <!--<Label top="20px" left="20px" class="fa" :text="'fa-thumbs-o-up' | fonticon" color="purple"/>-->
                        <!--&lt;!&ndash;<Label class="title" left="20px" :text="item.title" color="purple"/>&ndash;&gt;-->
                    <!--</AbsoluteLayout>-->
                    <GridLayout rows="*" columns="*" margin="0">
                            <Image class="img" :src="item.src" stretch="aspectFill" />
                        <GridLayout verticalAlignment="bottom">
                            <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="10" paddingRight="16">
                                <Label class="fa" :text="'fa-thumbs-o-up' | fonticon" color="purple"/>
                            </StackLayout>
                        </GridLayout>
                        <GridLayout verticalAlignment="top">
                            <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="8" paddingRight="16">
                                <Label class="titletext" :text="item.title" textWrap="true"/>
                            </StackLayout>
                        </GridLayout>
                    </GridLayout>
                </CardView>
            </StackLayout>
        </GridLayout>
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
        created() {
            this.pe = new PhotoEdit();
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
            first_col: function(){
                if(this.imgdata == null){
                    return this.data;
                }
                else{
                    let img_list = this.imgdata;
                    let firstcol = [];
                    for(let i in img_list){
                        if(i % 2 == 1){
                            firstcol.push(img_list[i])
                        }
                    }
                    return firstcol;
                }
            },
            second_col: function(){
                if(this.imgdata == null){
                    return this.data;
                }
                else{
                    let img_list = this.imgdata;
                    let secondcol = [];
                    for(let i in img_list){
                        if(i % 2 == 0){
                            secondcol.push(img_list[i])
                        }
                    }
                    return secondcol;
                }
            }
        }
    }
</script>

<style scoped>
    .cardStyle {
        /*color: #fff;*/
        width: 92%;
        padding: 4%;
        margin-top: 25px;
        font-size: 35px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }

    .img {
        border-radius: 15px;
    }

    .titletext {
        color: #ffffff;
        font-size: 20%;
        margin: 0;
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
