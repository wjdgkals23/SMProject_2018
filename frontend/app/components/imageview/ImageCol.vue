<template>
    <StackLayout>
        <CardView class="cardStyle" elevation="40" radius="15" v-for="(item,index) in data">
            <GridLayout rows="*" columns="*" margin="0">
                <Image class="img" :src="item.data.src" stretch="aspectFill" @tap="setdetailpagedata(item.index), $navigateTo(page)"/>
                <GridLayout verticalAlignment="bottom">
                    <StackLayout orientation="horizontal" paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="16">
                        <Label class="fa" :text="'fa-thumbs-up' | fonticon" color="#b4b9c1" v-show="item.data.like" @tap="clicklike(item.index)" />
                        <Label class="fa" :text="'fa-thumbs-up' | fonticon" color="purple" v-show="!item.data.like" @tap="clicklike(item.index)" />
                        <Label class="mytext, likecnt" :text="item.data.likecnt" paddingTop="8" paddingLeft="5" />
                    </StackLayout>
                </GridLayout>
                <GridLayout verticalAlignment="top">
                    <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="8" paddingRight="16">
                        <Label class="titletext" :text="item.data.title" textWrap="true"/>
                    </StackLayout>
                </GridLayout>
            </GridLayout>
        </CardView>
    </StackLayout>
</template>

<script>
    import DetailPage from '../DetailPage'
    import Constant from '../../constant'
    export default {
        name: "ImageCol",
        props: ['coldata'],
        created() {
            this.data = this.coldata;
        },
        data: function() {
            return {
                data: null,
                page: DetailPage,
            }
        },
        methods : {
            setdetailpagedata(index) {
                this.$store.dispatch(Constant.SDP, index);
            },
            clicklike(index){
                this.$store.dispatch(Constant.CL, index);
            }
        }
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
