<template>
    <Page :actionBarHidden="abmanager">
        <!--<ActionBar :title="pid_name">-->
            <!--<NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />-->
        <!--</ActionBar>-->
        <!--<ActivityIndicator :busy=busy @busyChange="onBusyChanged" />-->
        <component :is="currentView"></component>
    </Page>
</template>

<script>
    import TotalFeed from './TotalFeed'
    import UserFeed from './UserFeed'
    import UploadPage from './UploadPage'
    import LoginPage from './LoginPage'
    import Constant from '../constant'
    import _ from 'lodash'
    import { mapState, mapMutations } from 'vuex'

    import { postget } from "../lib/getpost";
    import {apiPath} from "../lib/httpconfig";
    const platformModule = require("tns-core-modules/platform");
    // const page = require('tns-core-modules/ui/page');

    export default {
        name: "App",
        components: { TotalFeed, UserFeed, UploadPage, LoginPage },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                data: null, // 이곳에다 데이터 바인딩하면 이미지 데이터 변동
                pid_name: "Total",
                apipath: null,
            }
        },
        //Server
        created() {
            this.actionbarmanager = false;
            if(platformModule.device.os === "Android") {
                console.log("android");
                this.apipath = apiPath.android;
            }
            else {
                console.log("ios");
                this.apipath = apiPath.ios;
            }
            // this.apipath = apiPath.server;
            this.$store.dispatch(Constant.CLEANPOST);
            postget(this.apipath, this, this.id_num);
        },
        computed : _.extend({
            currentView(){
                if(this.peedmanager == 1)
                    return TotalFeed;
                else if(this.peedmanager == 2)
                    return UserFeed;
                else if(this.peedmanager == 3)
                    return LoginPage;
                // else if(this.peedmanager == 3)
                //     return UploadPage;
            }
        },mapState([ 'peedmanager', 'abmanager', 'id_num' ]))
    }
</script>

<style scoped>

</style>
