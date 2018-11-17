<template>
    <!-- 전체 피드 -->
    <GridLayout columns="*" rows="*">
        <GridLayout rows="*,55">
            <image-view row="0"></image-view>
            <GridLayout verticalAlignment="bottom" horizontalAlignment="right" width="15%" margin="15">
                <Image src="~/assets/images/icon/plus.png" stretch="aspectFit" @tap="test"/>
            </GridLayout>
            <bottom-navigation row="1"></bottom-navigation>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import Constant from '../constant'
    import axios from 'axios'
    // import { mapstate } from ''
    import { postget } from "../lib/getpost";
    import BottomNavigation from './navi/BottomNavigation'
    import ImageView from './imageview/ImageView'
    import UploadPage from './UploadPage'
    import {apiPath} from "../lib/httpconfig";
    const platformModule = require("tns-core-modules/platform");
    // import axios from 'axios';
    export default {
        name: "TotalFeed",
        components: { ImageView, BottomNavigation, UploadPage },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                uploadpage: UploadPage,
                post: null,
            }
        },
        created() {
            if(platformModule.device.os === "Android") {
                console.log("android");
                this.post = postget(apiPath.android);
                console.log(this.msg);
            }
            else {
                console.log("ios");
                axios.get(apiPath.ios + "/api/total_feed/fetch").then((res) => {
                    this.$store.dispatch(Constant.GETPOST, res);
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        mounted() {

        },
        methods:{
            peedch: function(val) {
                this.$store.dispatch(Constant.PEEDCH, val);
            },
            test() {

            }
        }
    }
</script>

<style scoped>

</style>
