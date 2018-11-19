<template>
    <CardView class="cardStyle" elevation="30" row="0" col="0" radius="15" paddingTop="16" paddingLeft="10" paddingRight="10" paddingBottom="16">
        <GridLayout rows="110" columns="*">
            <GridLayout rows="45,*" columns="110,*,100">
                <GridLayout paddingLeft="10" row="0" rowSpan="2" col="0" horizontalAlignment="center" verticalAlignment="center">
                    <Label class="mytext name" :text="namecard.name"></Label>
                </GridLayout>
                <GridLayout row="0" col="1" horizontalAlignment="center" verticalAlignment="bottom">
                    <Label class="mytext info" :text="namecard.email"></Label>
                </GridLayout>
                <GridLayout row="1" col="1" rows="*,*" horizontalAlignment="center" verticalAlignment="top" >
                    <GridLayout row="0" horizontalAlignment="right" verticalAlignment="bottom">
                        <Label class="mytext info" :text="namecard.university"></Label>
                    </GridLayout>
                    <GridLayout row="1" horizontalAlignment="right" verticalAlignment="bottom">
                        <Label class="mytext info" :text="namecard.major"></Label>
                    </GridLayout>
                </GridLayout>
                <GridLayout paddingRight="5" row="0" rowSpan="2" col="2" horizontalAlignment="center" verticalAlignment="center">
                    <Image class="img" src="~/assets/images/author.png"></Image>
                </GridLayout>
            </GridLayout>
        </GridLayout>
    </CardView>
</template>

<script>
    import Constant from "../../constant";
    import _ from 'lodash'
    import { mapState } from 'vuex'
    export default {
        name: "NameCard",
        computed: _.extend({
                temper() {
                    return this.namecard.university + " " + this.namecard.major;
                }
            },mapState( [ 'namecard' ] ))
    }
</script>

<style scoped>
    .cardStyle {
        /*color: #fff;*/
        background: #f4f4f4;
        border-radius: 5px;
        width: 92%;
        padding: 4%;
        margin-top: 25px;
    }
    .name {
        font-size: 35%;
        color: #6a1495;
    }
    .info {
        font-size: 13%;
        color: #6a1495;
        padding-top: 2px;
        padding-bottom: 2px;
    }
</style>
