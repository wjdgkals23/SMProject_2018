<template>
    <ScrollView>
        <GridLayout rows="60,*">
            <CardView row="0">
                <GridLayout style="background: #ffffff;" paddingTop="15" paddingBottom="5">
                    <Image class="img" src="~/assets/images/title.png" stretch="aspectFit"></Image>
                </GridLayout>
            </CardView>
            <GridLayout row="1" rows="140,10,*,40">
                <GridLayout row="0">
                    <Image class="img" src="~/assets/images/buypannel.png"></Image>
                </GridLayout>
                <StackLayout row="2" columns="auto" class="mybold" paddingTop="10" verticalAlignment="center" horizontalAlignment="center" >
                    <GridLayout rows="260" columns="30,220,30" margin="0" paddingBottom="30" >
                        <GridLayout paddingRight="5" col="0" verticalAlignment="center" horizontalAlignment="center">
                            <Image class="img" src="~/assets/images/btn/leftarrow.png" @tap="act_swipe(1)" stretch="aspectFit"/>
                        </GridLayout>
                        <CardView col="1" elevation="0" radius="15" class="topcardStyle" >
                            <GridLayout row="0" paddingTop="5">
                                <Image class="img" :src="items.src" stretch="aspectFill"/>
                                <StackLayout paddingLeft="15" paddingTop="15">
                                    <FlexboxLayout alignItems="flex-start" v-for="(text,ind) in items.title">
                                        <StackLayout :class="textbind(ind)">
                                            <Label :order="ind" class="titletext" :text="text" />
                                        </StackLayout>
                                    </FlexboxLayout>
                                </StackLayout>
                                <StackLayout verticalAlignment="bottom" horizontalAlignment="center" paddingBottom="4">
                                    <Label class="pricetext" :text="price(items.price)" />
                                </StackLayout>
                            </GridLayout>
                        </CardView>
                        <GridLayout paddingLeft="5" col="2" verticalAlignment="center" horizontalAlignment="center">
                            <Image class="img" src="~/assets/images/btn/rightarrow.png" @tap="act_swipe(0)" stretch="aspectFit"/>
                        </GridLayout>
                    </GridLayout>
                </StackLayout>
                <GridLayout row="3" verticalAlignment="top" horizontalAlignment="center">
                    <Image class="img" src="~/assets/images/btn/sale_button.png" stretch="aspectFit" @tap="$navigateTo(page)" />
                </GridLayout>
            </GridLayout>
        </GridLayout>
    </ScrollView>
</template>

<script>
    import Constant from '../constant';
    import {apiPath} from "../lib/httpconfig";
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';
    import SellingPage from './SellingPage';

    const platformModule = require('tns-core-modules/platform');
    const gestures = require('tns-core-modules/ui/gestures');

    export default {
        name: "SellingFeed",
        data: function() {
            return {
                items: null,
                number: 0,
                page: SellingPage,
            }
        },
        created() {
            this.$store.dispatch(Constant.GSP, {api: this.api});

            for(let item in this.sellingproduct) {
                this.sellingproduct[item].title = this.sellingproduct[item].title.split(" ");
            }

            console.log(this.sellingproduct[0]);
            this.items = this.sellingproduct[0];

        },
        methods: {
            textbind(index) {
                if(index == 0){
                    return "mytext";
                }
                else{
                    return "mybold";
                }
            },
            price(item) {
                let regexp = /\B(?=(\d{3})+(?!\d))/g;
                return "₩ " + item.toString().replace(regexp, ',');
            },
            act_swipe(args) {
                if(args === 1) {
                    if(this.number === 0) {
                        this.number = this.sellingproduct.length-1;
                        this.items = this.sellingproduct[this.number];
                    }
                    else {
                        this.number--;
                        this.items = this.sellingproduct[this.number];
                    }
                }
                else {
                    if(this.number === this.sellingproduct.length-1) {
                        this.number = 0;
                        this.items = this.sellingproduct[this.number];
                    }
                    else {
                        this.number++;
                        this.items = this.sellingproduct[this.number];
                    }
                }
            }
        },
        computed : _.extend({
        },mapState([ 'sellingproduct', 'api' ])),
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
        font-size: 30%;
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
