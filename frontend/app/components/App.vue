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
    import TotalPeed from './TotalPeed'
    import UserPeed from './UserPeed'
    import UploadPage from './UploadPage'
    import Constant from '../constant'
    import { mapState, mapMutations } from 'vuex'
    import _ from 'lodash'
    // const page = require('tns-core-modules/ui/page');

    export default {
        name: "App",
        components: { TotalPeed, UserPeed, UploadPage },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                data: null, // 이곳에다 데이터 바인딩하면 이미지 데이터 변동
                pid_name: "Total",
            }
        },
        created() {
          this.actionbarmanager = false;
        },
        computed : _.extend({
            currentView(){
                if(this.peedmanager == 1)
                    return TotalPeed;
                else if(this.peedmanager == 2)
                    return UserPeed;
                // else if(this.peedmanager == 3)
                //     return UploadPage;
            }
        },mapState([ 'peedmanager', 'abmanager' ]))
    }
</script>

<style scoped>

</style>
