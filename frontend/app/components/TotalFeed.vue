<template>
    <!-- 전체 피드 -->
    <GridLayout rows="*">
        <image-view row="0" first="0" second="1"></image-view>
        <GridLayout verticalAlignment="bottom" horizontalAlignment="right" width="15%" margin="15">
            <Image src="~/assets/images/btn/plus.png" stretch="aspectFit" @tap="$navigateTo(uploadpage)"/>
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
    import { mapState } from 'vuex'
    import _ from 'lodash/lodash.min';

    export default {
        name: "TotalFeed",
        components: { ImageView, BottomNavigation, UploadPage },
        created() {
            postget(this.api, this, this.id_num);
        },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                uploadpage: UploadPage,
                post: null,
            }
        },
        methods:{
            getinfo() {

            }
        },
        computed : _.extend({

        },mapState([ 'evhp', 'evname', 'api', 'id_num' ])),
    }
</script>

<style scoped>

</style>
