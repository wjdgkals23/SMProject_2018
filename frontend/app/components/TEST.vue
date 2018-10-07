<template>
    <Page>
        <ActionBar title="Route"/>
        <ActivityIndicator :busy=busy @busyChange="onBusyChanged" />
        <GridLayout rows="*,60">
            <ScrollView row="0">
                <WrapLayout orientation="horizontal">

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
    import _ from 'lodash'
    import { mapState } from 'vuex'
    import axios from 'axios';
    export default {
        name: 'TEST',
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
                axios.get('http://10.0.2.2:3000/temp')
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
