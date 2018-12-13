<template>
    <StackLayout paddingBottom="10">
        <CardView class="cardStyle" elevation="20" radius="15" v-for="(item,index) in data" >
            <GridLayout rows="*" columns="*" margin="0">
                <Image class="img" :src="item.url" @tap="setdetailpagedata(index)"/>
                <GridLayout verticalAlignment="bottom">
                    <StackLayout orientation="horizontal" paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="16">
                        <Label class="fa" :text="'fa-thumbs-up' | fonticon" color="gray" v-show="item.like" @tap="clicklike(index)" />
                        <Label class="fa" :text="'fa-thumbs-up' | fonticon" color="purple" v-show="!item.like" @tap="clicklike(index)" />
                        <Label class="mytext, likecnt" :text="item.like_count" paddingTop="8" paddingLeft="5" />
                    </StackLayout>
                </GridLayout>
                <GridLayout verticalAlignment="top">
                    <StackLayout paddingLeft="15" paddingTop="15">
                        <FlexboxLayout alignItems="flex-start" v-for="(text,ind) in item.title">
                            <StackLayout :class="textbind(ind)">
                                <Label :order="ind" class="titletext" :text="text" />
                            </StackLayout>
                        </FlexboxLayout>
                    </StackLayout>
                </GridLayout>
            </GridLayout>
        </CardView>
        <GridLayout rows="10"></GridLayout>
    </StackLayout>
</template>

<script>
    import DetailPage from '../DetailPage'
    import Temp from '../Temp';
    import Constant from '../../constant'
    import _ from "lodash";
    import { mapState } from 'vuex';
    import { detailget } from "../../lib/getpost";

    const platformModule = require("tns-core-modules/platform");

    export default {
        name: "ImageCol",
        props: [ 'colnum' ],
        created() {
            if(this.colnum === "0") {
                console.log("0" , this.colnum);
                this.data = this.secondcol;
            }
            else if(this.colnum === "1"){
                console.log("1", this.colnum);
                this.data = this.firstcol;
            }
            else if(this.colnum === "2"){
                console.log("2", this.colnum);
                this.data = this.my_post_second;
            }
            else if(this.colnum === "3"){
                console.log("3", this.colnum);
                this.data = this.my_post_first;
            }
            else if(this.colnum === "4"){
                console.log("4", this.colnum);
                this.data = this.my_like_second;
            }
            else {
                console.log("5", this.colnum);
                this.data = this.my_like_first;
            }
        },
        data: function() {
            return {
                data: [],
                page: DetailPage,
                loading: Temp,
            }
        },
        methods : {
            setdetailpagedata(index) {
                detailget(this.api, this, { postId: this.data[index].postId, userId: this.id_num });
            },
            clicklike(index){
                this.$store.dispatch(Constant.CL, { index: index, colnum: this.colnum, api: this.api } );
            },
            textbind(index) {
                if(index == 0){
                    return "mytext";
                }
                else{
                    return "mybold";
                }
            }
            // columnlen(index) {
            //     if(index%3==0) {
            //         return "2*";
            //     }
            //     else if(index%3==1){
            //         return "*";
            //     }
            //     else {
            //         return "2*";
            //     }
            // }
        },
        computed : _.extend({
        },mapState([ 'firstcol', 'secondcol', 'api', 'id_num', 'my_post_first', 'my_post_second', 'my_like_first', 'my_like_second' ])),
    }
</script>

<style scoped>
    .cardStyle {
        /*color: #fff;*/
        width: 92%;
        padding: 4%;
        margin-top: 25px;
        font-size: 35px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }

    .img {
        border-radius: 15px;
    }

    .titletext {
        color: purple;
        font-size: 20%;
        margin: 0;
    }

    .likecnt {
        font-size: 20%;
        color: #6a1495;
    }

</style>
