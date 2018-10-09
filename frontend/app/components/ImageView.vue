<template>
    <ScrollView row="0">
        <WrapLayout orientation="horizontal">
            <GridLayout v-for="item in img_list" width="50%" height="150" rows="2*,*">
                <Image
                        :src="item.src"
                        stretch="aspectFill"
                        row="0"
                        width="100%"
                ></Image>
                <Label
                        row="1"
                        :text=item.title
                        horizontalAlignment="center"
                        verticalAlignment="bottom"
                        backgroundColor="rgb(81,197,247, 0.8)"
                        padding="10"
                        fontSize="13"
                        color="white"
                ></Label>
            </GridLayout>
        </WrapLayout>
    </ScrollView>
</template>

<script>
    export default {
        name: 'ImageView',
        props: ['imgdata'],
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
