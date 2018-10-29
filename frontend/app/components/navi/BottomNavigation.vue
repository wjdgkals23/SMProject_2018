<template>
    <FlexboxLayout justifyContent="space-around" row="1" id="navigation">
        <Image src="~/assets/images/icon/menu.png" stretch="aspectFit" @tap="peedch(1)"/>
        <Image src="~/assets/images/icon/thumbs.png" stretch="aspectFit" @tap="peedch(2)"/>
        <Image src="~/assets/images/icon/cart.png" stretch="aspectFit" />
        <Image src="~/assets/images/icon/person.png" stretch="aspectFit" />
        <!-- 각각의 라벨 터치 할때마다 최상위 부모의 currentView 값 수정 -->
    </FlexboxLayout>
</template>

<script>
    import _ from 'lodash'
    import { mapState } from 'vuex'
    import { apiPath } from '../../lib/httpconfig'
    import axios from 'axios'
    import Constant from '../../constant'

    export default {
        name: "BottomNavigation",
        data(){
            return{

            }
        },
        methods: {
            peedch: function(val) {
                this.$store.dispatch(Constant.PEEDCH, val);
            },
            talk: function(){
                // console.log("test");
                axios.get(apiPath.android+'/temp')
                    .then(function (response) {
                        console.log("");
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                axios.get(apiPath.ios+'/temp')
                    .then(function (response) {
                        console.log("");
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    #navigation {
        background-color: white;
        padding: 20px;
    }

    #navigation Image {
        /*text-align:center;*/
        /*padding: 10px;*/
        color: purple;
        /*vertical-align: middle;*/
        /*hover*/
    }
</style>
