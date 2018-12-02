<template>
    <!-- App 컴포넌트 화면 전환 -->
    <GridLayout columns="*,*,*,*" rows="*" row="1" id="navigation">
        <GridLayout col="0" horizontalAlignment="center" verticalAlignment="center">
            <GridLayout row="0" :class="currentfeed(1)">
                <Image src="~/assets/images/btn/menu.png" stretch="aspectFit" @tap="peedch(1)"/>
            </GridLayout>
        </GridLayout>
        <GridLayout col="1" horizontalAlignment="center" verticalAlignment="center">
            <GridLayout row="0" :class="currentfeed(2)">
                <Image src="~/assets/images/btn/thumbs.png" stretch="aspectFit" @tap="peedch(2)" />
            </GridLayout>
        </GridLayout>
        <GridLayout col="2" horizontalAlignment="center" verticalAlignment="center">
            <GridLayout row="0" :class="currentfeed(3)">
                <Image src="~/assets/images/btn/cart.png" stretch="aspectFit" @tap="peedch(3)" />
            </GridLayout>
        </GridLayout>
        <GridLayout :class="currentfeed(4)" col="3" horizontalAlignment="center" verticalAlignment="center">
            <GridLayout row="0" >
                <Image src="~/assets/images/btn/person.png" stretch="aspectFit" @tap="peedch(4)"/>
            </GridLayout>
        </GridLayout>
        <!-- 각각의 라벨 터치 할때마다 최상위 부모의 currentView 값 수정 -->
    </GridLayout>
</template>

<script>
    import Constant from '../../constant'
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';

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
            currentfeed(num) {
                if(this.peedmanager == num){
                    return "selected";
                }
                else
                    return "unselected";
            }
        },
        computed: _.extend({

        },mapState([ 'peedmanager' ])),
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

    .selected {
        background: #e6d9ec;
    }

    .unselected {
        background: white;
    }
</style>
