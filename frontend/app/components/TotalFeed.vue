<template>
    <!-- 전체 피드 -->
    <GridLayout rows="*">
        <image-view row="0" firstcol="0" secondcol="1"></image-view>
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
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                uploadpage: UploadPage,
                post: null,
            }
        },
        mounted() {
            let that = this;
            console.log("########TEST");
            console.log(this.evhp);
            if(this.evhp == null || this.evname == null) {
                setTimeout(function() {
                    prompt('핸드폰번호를 입력해주세요.', 'EX: 01011112222')
                        .then(result => {
                            prompt('이름을 입력해주세요.', 'EX: 홍길동')
                                .then(result2 => {
                                    that.$store.dispatch(Constant.SEI, { hp: result.text, name: result2.text });
                                }).catch(err2 => {
                                console.log(err2);
                            })
                        }).catch(err => {
                        console.log(err);
                    })
                }, 100);
            }
        },
        methods:{
            getinfo() {

            }
        },
        computed : _.extend({

        },mapState([ 'evhp', 'evname' ])),
    }
</script>

<style scoped>

</style>
