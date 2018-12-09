<template>
    <!-- 전체 피드 -->
    <GridLayout rows="60,*">
        <CardView row="0">
            <GridLayout style="background: #ffffff;" paddingTop="20" paddingBottom="5">
                <Image class="img" src="~/assets/images/voda60.png" stretch="aspectFit"></Image>
            </GridLayout>
        </CardView>
        <ScrollView row="1">
            <GridLayout rows="15,auto,*">
                <GridLayout row="1" rows="80,30,*">
                    <GridLayout row="0" paddingTop="0" paddingLeft="13" paddingRight="13">
                        <Image class="img" src="~/assets/images/totalslash.png" stretch="aspectFit"></Image>
                        <GridLayout verticalAlignment="center" horizontalAlignment="center" rows="*,*">
                            <GridLayout row="0" verticalAlignment="center" horizontalAlignment="center">
                                <Label class="mytext" style="font-size: 25%; color: #651493" text="12월 첫째 주"/>
                            </GridLayout>
                            <GridLayout row="1" verticalAlignment="center" horizontalAlignment="center">
                                <Label class="mybold" style="font-size: 25%; color: #651493" text="TOP 3"/>
                            </GridLayout>
                        </GridLayout>
                    </GridLayout>
                    <StackLayout row="2" columns="*" class="mybold" paddingTop="20" verticalAlignment="center" horizontalAlignment="center" >
                        <GridLayout rows="230" columns="230" margin="0" paddingBottom="30" >
                            <CardView elevation="0" radius="15" class="topcardStyle">
                                <GridLayout row="0" paddingTop="5">
                                    <Image class="img" :src="items.src" stretch="aspectFill"/>
                                    <StackLayout paddingLeft="15" paddingTop="15">
                                        <FlexboxLayout alignItems="flex-start" v-for="(text,ind) in items.title">
                                            <StackLayout :class="textbind(ind)">
                                                <Label :order="ind" class="titletext" :text="text" />
                                            </StackLayout>
                                        </FlexboxLayout>
                                    </StackLayout>
                                </GridLayout>
                            </CardView>
                        </GridLayout>
                    </StackLayout>
                </GridLayout>
                <image-view row="2" first="0" second="1"></image-view>
                <GridLayout row="2" verticalAlignment="bottom" horizontalAlignment="right" width="15%" margin="15">
                    <Image src="~/assets/images/btn/plus.png" stretch="aspectFit" @tap="$navigateTo(uploadpage)"/>
                </GridLayout>
            </GridLayout>
        </ScrollView>
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

            this.$store.dispatch(Constant.GSP, {api: this.api});

            for(let item in this.sellingproduct) {
                this.sellingproduct[item].title = this.sellingproduct[item].title.split(" ");
            }

            console.log(this.sellingproduct[0]);
            this.items = this.sellingproduct[0];
        },
        data() {
            return {
                msg: 'Hello World!',
                busy: true,
                uploadpage: UploadPage,
                post: null,
                items: null,
                number: 0,
            }
        },
        methods:{
            getinfo() {

            },
            textbind(index) {
                if(index == 0){
                    return "mytext";
                }
                else{
                    return "mybold";
                }
            },
        },
        computed : _.extend({

        },mapState([ 'evhp', 'evname', 'api', 'id_num', 'sellingproduct' ])),
    }
</script>

<style scoped>
    .topcardStyle {
        /*color: #fff;*/
        /*width: 70%;*/
        padding: 4%;
        font-size: 35px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }

    .titletext {
        color: #6a1495;
        font-size: 25%;
        letter-spacing: 0.2mm;
        margin: 0;
    }

    .pricetext {
        color: purple;
        font-size: 25%;
        margin: 0;
    }

    .img {
        border-radius: 20px;
    }
</style>
