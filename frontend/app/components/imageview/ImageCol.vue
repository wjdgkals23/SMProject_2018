<template>
    <StackLayout>
        <CardView class="cardStyle" elevation="40" radius="15" v-for="(item,index) in data">
            <GridLayout rows="*" columns="*" margin="0">
                <Image class="img" :src="item.src" stretch="aspectFill" @tap="setdetailpagedata(index), $navigateTo(page)"/>
                <GridLayout verticalAlignment="bottom">
                    <StackLayout orientation="horizontal" paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="16">
                        <Label class="fa" :text="'fa-thumbs-up' | fonticon" color="#b4b9c1" v-show="item.like" @tap="clicklike(index)" />
                        <Label class="fa" :text="'fa-thumbs-up' | fonticon" color="purple" v-show="!item.like" @tap="clicklike(index)" />
                        <Label class="mytext, likecnt" :text="item.like_count" paddingTop="8" paddingLeft="5" />
                    </StackLayout>
                </GridLayout>
                <GridLayout verticalAlignment="top">
                    <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="8" paddingRight="16">
                        <Label class="titletext" :text="item.title" textWrap="true"/>
                    </StackLayout>
                </GridLayout>
            </GridLayout>
        </CardView>
    </StackLayout>
</template>

<script>
    import DetailPage from '../DetailPage'
    import Constant from '../../constant'
    import _ from "lodash";
    import { mapState } from 'vuex';

    export default {
        name: "ImageCol",
        props: [ 'colnum' ],
        created() {
            if(this.colnum === "0") {
                console.log("0" , this.colnum);
                this.data = this.secondcol;
            }
            else{
                console.log("1", this.colnum);
                this.data = this.firstcol;
            }
        },
        data: function() {
            return {
                data: [],
                page: DetailPage,
            }
        },
        methods : {
            setdetailpagedata(index) {
                this.$store.dispatch(Constant.SDP, { index: index, colnum: this.colnum } );
            },
            clicklike(index){
                this.$store.dispatch(Constant.CL, { index: index, colnum: this.colnum } );
            }
        },
        computed : _.extend({

        },mapState([ 'firstcol', 'secondcol' ])),
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
        color: #ffffff;
        font-size: 20%;
        margin: 0;
    }

    .likecnt {
        font-size: 20%;
        color: #6a1495;
    }

</style>
