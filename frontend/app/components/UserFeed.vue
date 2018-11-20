<template>
    <GridLayout columns="*" rows="*">
        <GridLayout rows="*,55">
            <ScrollView orientation="vertical" row="0">
                <StackLayout backgroundColor="#ffffff">
                    <name-card></name-card>
                    <GridLayout rows="55" paddingTop="16" paddingLeft="10" paddingRight="10" paddingBottom="10">
                        <GridLayout row="0" rows="*" columns="30,20,170,30" verticalAlignment="center" horizontalAlignment="center">
                            <GridLayout row="0" col="0" verticalAlignment="center" horizontalAlignment="center">
                                <Label class="dropdown mytext">/</Label>
                            </GridLayout>
                            <GridLayout row="0" col="1" verticalAlignment="center" horizontalAlignment="center">
                                <Label class="fa" :text="'fa-sort-down' | fonticon" color="purple" ></Label>
                            </GridLayout>
                            <GridLayout row="0" col="2" verticalAlignment="center" horizontalAlignment="center">
                                <DropDown class="dropdown mytext"
                                          :items="items"
                                          :selectedIndex="selecteditem"
                                          @selectedIndexChanged="change"
                                          @closed="closed"
                                ></DropDown >
                            </GridLayout>
                            <GridLayout row="0" col="3" verticalAlignment="center" horizontalAlignment="center">
                                <Label class="dropdown mytext">/</Label>
                            </GridLayout>
                        </GridLayout>
                    </GridLayout>
                    <image-view v-show="changefd(0)" firstcol="0" secondcol="1"></image-view>
                    <collabo-list v-show="changefd(1)"></collabo-list>
                    <buy-list v-show="changefd(2)"></buy-list>
                </StackLayout>
            </ScrollView>
            <bottom-navigation row="1"></bottom-navigation>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import BottomNavigation from './navi/BottomNavigation'
    import NameCard from './namecard/NameCard'
    import ImageView from './imageview/ImageView'
    import BuyList from './userview/BuyList'
    import CollaboList from './userview/CollaboList'
    // import Upload
    export default {
        name: "UserFeed",
        components: { BottomNavigation, NameCard, ImageView, BuyList, CollaboList },
        data() {
            return {
                items : [
                    "관심 게시물",
                    "콜라보",
                    "구입 목록"
                ],
                selecteditem : 0,
                buffer : null,
            }
        },
        methods:{
            change(arg) {
                console.log(arg.oldIndex);
                this.buffer = arg.newIndex;
            },
            closed() {
                console.log(this.selecteditem);
                console.log("피드 체인지")
                this.selecteditem = this.buffer;
            },
            changefd(val) {
                return this.selecteditem == val;
            }
        },
    }
</script>

<style scoped>
    .dropdown {
        background: white;
        color: #6a1495;
        font-size: 25px;
        text-align: center;
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
