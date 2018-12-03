<template>
    <ScrollView>
        <GridLayout rows="150,*">
            <GridLayout row="0">
                <Image class="img" src="~/assets/images/buypannel.png"></Image>
            </GridLayout>
            <StackLayout row="1" columns="*" class="mybold" paddingTop="20" verticalAlignment="center" horizontalAlignment="center" >
                <GridLayout rows="310" columns="260" margin="0" paddingBottom="60" v-for="(item,index) in sellingproduct">
                    <CardView elevation="0" radius="15" class="topcardStyle">
                        <GridLayout row="0" paddingTop="5">
                            <Image class="img" :src="item.src" stretch="aspectFill" />
                            <StackLayout paddingLeft="15" paddingTop="15">
                                <FlexboxLayout alignItems="flex-start" v-for="(text,ind) in item.title">
                                    <StackLayout :class="textbind(ind)">
                                        <Label :order="ind" class="titletext" :text="text" />
                                    </StackLayout>
                                </FlexboxLayout>
                            </StackLayout>
                            <StackLayout verticalAlignment="bottom" horizontalAlignment="center" paddingBottom="4">
                                <Label class="pricetext" :text="price(item.price)" />
                            </StackLayout>
                        </GridLayout>
                    </CardView>
                </GridLayout>
            </StackLayout>
        </GridLayout>
    </ScrollView>
</template>

<script>
    import Constant from '../constant';
    import {apiPath} from "../lib/httpconfig";
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';
    const platformModule = require('tns-core-modules/platform');

    export default {
        name: "SellingFeed",
        created() {
            this.$store.dispatch(Constant.GSP, {api: this.api});

            for(let item in this.sellingproduct) {
                this.sellingproduct[item].title = this.sellingproduct[item].title.split(" ");
            }

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
        color: white;
        font-size: 25%;
        margin: 0;
    }

    .img {
        border-radius: 20px;
    }

</style>
