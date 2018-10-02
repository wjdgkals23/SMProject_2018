<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <ActivityIndicator :busy=busy @busyChange="onBusyChanged" />
        <GridLayout rows="*,60">
            <ScrollView row="0">
                <WrapLayout orientation="horizontal">
                    <GridLayout v-for="item in data" width="50%" height="150" rows="2*,*">
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
            <StackLayout orientation="horizontal" row="1" id="navigation">
                <Label width="25%" class="fa" :text="'fa-eye' | fonticon" @tap="talk"/>
                <Label width="25%" class="fa" :text="'fa-heart' | fonticon" />
                <Label width="25%" class="fa" :text="'fa-user' | fonticon" />
                <Label width="25%" class="fa" :text="'fa-user' | fonticon" />
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Hello World!',
                data:[
                    {title:"head", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"body", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"leg", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"foot", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"head", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"body", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"leg", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"foot", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"head", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"body", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"leg", src: "~/assets/images/NativeScript-Vue.png"},
                    {title:"foot", src: "~/assets/images/NativeScript-Vue.png"}
                ],
                busy: true
            }
        },
        methods:{
            talk: function(){
                console.log("talk");
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
