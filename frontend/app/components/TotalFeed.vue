<template>
    <!-- 전체 피드 -->
    <GridLayout columns="*" rows="*">
        <GridLayout rows="*,55">
            <image-view row="0"></image-view>
            <GridLayout verticalAlignment="bottom" horizontalAlignment="right" width="15%" margin="15">
                <Image src="~/assets/images/icon/plus.png" stretch="aspectFit" @tap="$navigateTo(uploadpage)"/>
            </GridLayout>
            <bottom-navigation row="1"></bottom-navigation>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import Constant from '../constant'
    import axios from 'axios'
    import { postget } from "../lib/getpost";
    import BottomNavigation from './navi/BottomNavigation'
    import ImageView from './imageview/ImageView'
    import UploadPage from './UploadPage'
    import {apiPath} from "../lib/httpconfig";
    const platformModule = require("tns-core-modules/platform");

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
                postget(apiPath.android, this);
            }
            else {
                console.log("ios");
                postget(apiPath.ios, this);
            }
        },
        methods:{
            peedch: function(val) {
                this.$store.dispatch(Constant.PEEDCH, val);
            }
        }
    }
</script>

<style scoped>

</style>
