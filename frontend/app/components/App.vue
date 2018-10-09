<template>
    <Page>
        <ActionBar :title="pid_name" v-on:click="talk" />
        <ActivityIndicator :busy=busy @busyChange="onBusyChanged" />
        <component :is="currentView"></component>
    </Page>
</template>

<script>
    import axios from 'axios'
    import TotalPid from './TotalPid'
    export default {
        name: "App",
        components: { TotalPid },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                data: null, // 이곳에다 데이터 바인딩하면 이미지 데이터 변동
                currentView: TotalPid,
                pid_name: "Total"
            }
        },
        methods:{
            talk: function(){
                axios.get('http://10.0.2.2:3000/temp')
                    .then(function (response) {
                        console.log("");
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
