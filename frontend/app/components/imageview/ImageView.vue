<template>
    <ScrollView>
        <GridLayout columns="*,*" class="mybold">
            <image-col :coldata="first_col" col="0"></image-col>
            <image-col :coldata="second_col" col="1"></image-col>
        </GridLayout>
    </ScrollView>
</template>

<script>
    // import CardView from 'nativescript-cardview'
    const PhotoEdit = require('nativescript-photo-editor').PhotoEditor;
    const PhotoEditorControl = require('nativescript-photo-editor').PhotoEditorControl;
    const imgs = require('tns-core-modules/image-source').ImageSource;
    const ffor = require('tns-core-modules/image-source').fromFileOrResource;
    import ImageCol from "./ImageCol"
    export default {
        name: 'ImageView',
        props: ['imgdata'],
        components: {
            // CardView
            ImageCol
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
            first_col(){
                if(this.imgdata == null){
                    return this.data;
                }
                else{
                    let img_list = this.imgdata;
                    let firstcol = [];
                    for(let i in img_list){
                        if(i % 2 == 1){
                            firstcol.push({ data: img_list[i], index: i });
                        }
                    }
                    return firstcol;
                }
            },
            second_col(){
                if(this.imgdata == null){
                    return this.data;
                }
                else{
                    let img_list = this.imgdata;
                    let secondcol = [];
                    for(let i in img_list){
                        if(i % 2 == 0){
                            secondcol.push({ data: img_list[i], index: i })
                        }
                    }
                    return secondcol;
                }
            }
        }
    }
</script>

<style scoped>

</style>
