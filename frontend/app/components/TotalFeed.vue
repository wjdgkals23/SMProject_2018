<template>
    <!-- 전체 피드 -->
    <GridLayout columns="*" rows="*">
        <GridLayout rows="*,55">
            <image-view row="0" :imgdata="posts"></image-view>
            <GridLayout verticalAlignment="bottom" horizontalAlignment="right" width="15%" margin="15">
                <Image src="~/assets/images/icon/plus.png" stretch="aspectFit" @tap="$navigateTo(uploadpage)"/>
            </GridLayout>
            <bottom-navigation row="1"></bottom-navigation>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import _ from 'lodash'
    import { mapState } from 'vuex'
    import Constant from '../constant'
    import axios from 'axios'
    // import { mapstate } from ''
    import BottomNavigation from './navi/BottomNavigation'
    import ImageView from './imageview/ImageView'
    import UploadPage from './UploadPage'
    // import axios from 'axios';
    export default {
        name: "TotalFeed",
        components: { ImageView, BottomNavigation, UploadPage },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                uploadpage: UploadPage
            }
        },
        methods:{
            peedch: function(val) {
                this.$store.dispatch(Constant.PEEDCH, val);
            },
            test: function() {
                axios.get("http://52.78.178.50/api/test/con").then((response) => {
                    console.log(response);
                })
            }
        },
        computed : _.extend({

        },mapState([ 'posts' ]))
    }
</script>

<style scoped>

</style>
