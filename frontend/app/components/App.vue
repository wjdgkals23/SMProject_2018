<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <ActivityIndicator :busy=busy @busyChange="onBusyChanged" />
        <GridLayout rows="*,60">
            <test :imgdata="data"></test>
            <bottom-navigation></bottom-navigation>
        </GridLayout>
    </Page>
</template>

<script>
    import _ from 'lodash'
    import { mapState } from 'vuex'
    import axios from 'axios'
    import BottomNavigation from './BottomNavigation'
    import Test from './TEST'
    export default {
        name: "App",
        components: { BottomNavigation, Test },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                data: null, // 이곳에다 데이터 바인딩하면 이미지 데이터 변동
            }
        },
        methods:{

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
