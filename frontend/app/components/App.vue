<template>
    <Page :actionBarHidden="abmanager">
        <!--<ActionBar :title="pid_name">-->
            <!--<NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />-->
        <!--</ActionBar>-->
        <!--<ActivityIndicator :busy=busy @busyChange="onBusyChanged" />-->
        <GridLayout columns="*" rows="*" paddingTop="">
            <GridLayout rows="*,55">
                <component row="0" :is="currentView"></component>
                <bottom-navigation row="1"></bottom-navigation>
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

    import { postget, tagget } from "../lib/getpost";
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
            let that = this;
            let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            let evfunc = function() {
                setTimeout(function() {
                    prompt('핸드폰번호를 입력해주세요.', 'EX: 01011112222')
                        .then(result => {
                            if(!result.text.match(phoneno)) {
                                alert("핸드폰 양식에 맞지 않습니다.").then(_ => {
                                    evfunc();
                                }).catch(err => {
                                    console.log(err);
                                })
                            }
                            else{
                                prompt('이름을 입력해주세요.', 'EX: 홍길동')
                                    .then(result2 => {
                                        that.$store.dispatch(Constant.SEI, { hp: result.text, name: result2.text });
                                    }).catch(err2 => {
                                    console.log(err2);
                                })
                            }
                        }).catch(err => {
                        console.log(err);
                    })
                }, 0);
            };
            // 이벤트 활성화
            // evfunc();
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
            postget(this.api, this, this.id_num);
            tagget(this.api, this);
        },
        computed : _.extend({
            currentView(){
                if(this.peedmanager == 1)
                    return TotalFeed;
                else if(this.peedmanager == 2)
                    return InterestFeed;
                else if(this.peedmanager == 3)
                    return SellingFeed;
                else
                    return UserFeed;
                // else if(this.peedmanager == 3)
                //     return UploadPage;
            }
        },mapState([ 'peedmanager', 'abmanager', 'id_num', 'api', 'evhp', 'evname' ])),
        methods: {

        }
    }
</script>

<style scoped>

</style>
