<template>
    <GridLayout rows="40,*">
        <GridLayout row="0" columns="*,150" paddingRight="5" paddingLeft="5" paddingcenter="5">
            <GridLayout col="1" columns="*" horizontalAlignment="right" >
                <!--<FlexboxLayout>-->
                    <!--<Label class="mytext switchtext" text="날짜순" />-->
                    <!--<Switch v-model="itemEnabled" @checkedChange="temp" />-->
                    <!--<Label class="mytext switchtext" text="인기순" />-->
                <!--</FlexboxLayout>-->
                <GridLayout col="0" columns="*,*,*">
                    <GridLayout col="0" verticalAlignment="center" >
                        <Label class="mytext switchtext" text="날짜순" />
                    </GridLayout>
                    <GridLayout col="1" verticalAlignment="center" >
                        <Switch v-model="itemEnabled" @checkedChange="temp" />
                    </GridLayout>
                    <GridLayout col="2" verticalAlignment="center" >
                        <Label class="mytext switchtext" text="인기순" />
                    </GridLayout>
                </GridLayout>
            </GridLayout>
        </GridLayout>
        <GridLayout row="1">
            <ScrollView>
                <GridLayout columns="*,*" class="mybold" paddingBottom="15">
                    <image-col :colnum="first" col="0"></image-col>
                    <image-col :colnum="second" col="1"></image-col>
                </GridLayout>
            </ScrollView>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import ImageCol from "./ImageCol"
    import _ from 'lodash/lodash.min';
    import { mapState } from 'vuex'
    import Constant from "../../constant"

    export default {
        name: 'ImageView',
        components: {
            // CardView
            ImageCol
        },
        created() {
            // console.log("#####IMAGEVIEW" + this.first + this.second);
        },
        props: [ 'first', 'second' ],
        data() {
            return {
                msg: 'Hello World!',
                data:[
                    {title:"none", src: "~/assets/images/NativeScript-Vue.png"},
                ],
                busy: true,
                result: null,
                itemEnabled: false,
            }
        },
        methods: {
            temp() {
                let num = this.firstcol.length;
                let num2 = this.secondcol.length;
                let length = {
                    first: num,
                    second: num2
                };
                if(this.itemEnabled) {
                    this.$store.dispatch(Constant.PSLC, length);
                }
                else {
                    // await this.$store.dispatch(Constant.CLEANPOST);
                    this.$store.dispatch(Constant.PSD, length);
                }
            }
        },
        computed : _.extend({
        },mapState([ 'firstcol', 'secondcol', 'api' ])),
    }
</script>

<style scoped>
    .switchtext {
        color: gray;
        font-size: 15px;
    }
</style>
