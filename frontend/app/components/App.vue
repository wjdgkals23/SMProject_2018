<template>
    <Page :actionBarHidden="abmanager">
        <!--<ActionBar :title="pid_name">-->
            <!--<NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />-->
        <!--</ActionBar>-->
        <!--<ActivityIndicator :busy=busy @busyChange="onBusyChanged" />-->
        <GridLayout columns="*" rows="*" paddingTop="">
            <GridLayout row="0" :rows="approw">
                <component row="0" :is="currentView"></component>
                <bottom-navigation v-if="peedmanager !== 0" row="1"></bottom-navigation>
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import TotalFeed from './TotalFeed'
    import UserFeed from './UserFeed'
    import InterestFeed from './InterestFeed'
    import UploadPage from './UploadPage'
    import LoginPage from './LoginPage'
    import SellingFeed from './SellingFeed'
    import BottomNavigation from './navi/BottomNavigation'

    import Constant from '../constant'
    import _ from 'lodash/lodash.min';
    import { mapState, mapMutations } from 'vuex'

    import { tagget, top3get } from "../lib/getpost";
    import {apiPath} from "../lib/httpconfig";
    const platformModule = require("tns-core-modules/platform");
    const dialogs = require('tns-core-modules/ui/dialogs');
    // const page = require('tns-core-modules/ui/page');

    export default {
        name: "App",
        components: { TotalFeed, UserFeed, UploadPage, LoginPage, InterestFeed, SellingFeed, BottomNavigation },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                data: null, // 이곳에다 데이터 바인딩하면 이미지 데이터 변동
                pid_name: "Total",
                apipath: null,
            }
        },
        mounted() {

        },
        //Server
        created() {
            this.actionbarmanager = false;
            if(platformModule.device.os === "Android") {
                console.log("android");
                this.$store.dispatch(Constant.SAP, apiPath.android);
            }
            else {
                console.log("ios");
                this.$store.dispatch(Constant.SAP, apiPath.ios);
            }
            // this.apipath = apiPath.server;
            tagget(this.api, this);
            // top3get(this.api, this, this.id_num);

        },
        computed : _.extend({
            currentView(){
                if(this.peedmanager === 1)
                    return TotalFeed;
                else if(this.peedmanager === 2)
                    return InterestFeed;
                else if(this.peedmanager === 3)
                    return SellingFeed;
                else if(this.peedmanager === 4)
                    return UserFeed;
                else
                    return LoginPage;
                // else if(this.peedmanager == 3)
                //     return UploadPage;
            },
            approw() {
                if(this.peedmanager == 0){
                    return "*,55"
                }
                else
                    return "*,55"
            }
        },mapState([ 'peedmanager', 'abmanager', 'id_num', 'api', 'evhp', 'evname' ])),
        methods: {

        }
    }
</script>

<style scoped>

</style>
