<template>
    <GridLayout columns="*" rows="*">
        <ScrollView orientation="vertical" row="0">
            <StackLayout backgroundColor="#ffffff">
                <name-card></name-card>
                <GridLayout :rows="height" columns="*" paddingTop="3" verticalAlignment="center" horizontalAlignment="center">
                    <StackLayout orientation="horizontal" row="0" col="0">
                        <!--<DropDown :class="dropdownstyle"-->
                                  <!--:items="items"-->
                                  <!--:selectedIndex="selecteditem"-->
                                  <!--@selectedIndexChanged="change"-->
                                  <!--@closed="closed"-->
                        <!--&gt;</DropDown >-->
                        <ListPicker :class="dropdownstyle"
                                    :items="items"
                                    v-model="selecteditem"
                        ></ListPicker>
                        <Label class="fa" :text="'fa-sort-down' | fonticon" color="purple" />
                    </StackLayout>
                </GridLayout>
                <image-view v-show="changefd(0)" first="2" second="3"></image-view>
                <image-view v-show="changefd(1)" first="4" second="5"></image-view>
                <!--<collabo-list v-show="changefd(1)"></collabo-list>-->
                <buy-list v-show="changefd(2)"></buy-list>
                <collabo-list v-show="changefd(3)"></collabo-list>
            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
    import BottomNavigation from './navi/BottomNavigation'
    import NameCard from './namecard/NameCard'
    import ImageView from './imageview/ImageView'
    import BuyList from './userview/BuyList'
    import CollaboList from './userview/CollaboList'
    const platformModule = require("tns-core-modules/platform");

    import { mapState } from 'vuex'
    import _ from 'lodash/lodash.min';

    import { mylikeget, mypostget } from "../lib/getpost";
    // import Upload
    export default {
        name: "UserFeed",
        components: { BottomNavigation, NameCard, ImageView, BuyList, CollaboList },
        data() {
            return {
                items : [
                    "내 게시물",
                    "관심 게시물",
                    "구입 목록",
                    "콜라보"
                ],
                selecteditem : 0,
                buffer : null,
            }
        },
        created() {
            mypostget(this.api, this, this.id_num);
            mylikeget(this.api, this, this.id_num);
        },
        methods:{
            change() {
                console.log(this.selecteditem);
            },
            closed() {
                console.log(this.selecteditem);
                console.log("피드 체인지")
                this.selecteditem = this.buffer;
            },
            changefd(val) {
                return this.selecteditem == val;
            },
        },
        computed : _.extend({
            dropdownstyle() {
                if(platformModule.device.os == "Android") {
                    return "dropdown mylight"
                }
                else{
                    return "dropdown2 mylight"
                }
            },
            height() {
                if(platformModule.device.os == "Android") {
                    return "90"
                }
                else{
                    return "75"
                }
            }
        },mapState([ 'evhp', 'evname', 'api', 'id_num' ])),
    }
</script>

<style scoped>
    .dropdown {
        background: white;
        color: #6a1495;
        font-size: 40px;
        text-align: center;
        width: 100%;
        /*padding-left: 50px;*/
    }
    .dropdown2 {
        background: white;
        color: #6a1495;
        font-size: 22px;
        text-align: center;
        width: 100%;
    }
    .cardStyle {
        /*color: #fff;*/
        width: 92%;
        padding: 4%;
        margin-top: 25px;
        font-size: 35px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }

</style>
