<template>
    <ScrollView row="0">
        <WrapLayout orientation="horizontal" padding="5">
            <CardView class="cardStyle" margin="6" elevation="40" radius="5" v-for="item in img_list" width="45%">
                <GridLayout rows="auto, auto" columns="auto, auto, *">
                    <Image :src="item.src" stretch="aspectFill" colSpan="3" row="0" />
                    <Label class="fa" :text="'fa-heart' | fonticon" row="1" colSpan="3" padding="10"/>
                </GridLayout>
            </CardView>
        </WrapLayout>
    </ScrollView>
</template>

<script>
    import CardView from 'nativescript-cardview'
    export default {
        name: 'ImageView',
        props: ['imgdata'],
        components: {
            CardView
        },
        data() {
            return {
                msg: 'Hello World!',
                data:[
                    {title:"none", src: "~/assets/images/NativeScript-Vue.png"},
                ],
                busy: true,
            }
        },
        methods:{

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
