<template>
    <CardView class="cardStyle" elevation="30" row="0" col="0" radius="15" paddingTop="16" paddingLeft="10" paddingRight="10" paddingBottom="16">
        <GridLayout rows="110" columns="*">
            <AbsoluteLayout horizontalAlignment="center" verticalAlignment="center" style="z-index: -1;">
                <!--<Image src="~/assets/images/btn/leftarrow.png"></Image>-->
            </AbsoluteLayout>
            <GridLayout row="0" col="0" columns="2*,*" style="z-index: 1;">
                <StackLayout col="0" paddingLeft="30" horizontalAlignment="left" verticalAlignment="center">
                    <Label class="mylight name" :text="namecard.name"></Label>
                    <Label class="mytext info" :text="namecard.email"></Label>
                    <Label class="mytext info" :text="namecard.university"></Label>
                    <Label class="mytext info" :text="namecard.major"></Label>
                </StackLayout>
                <GridLayout col="1" paddingTop="5" horizontalAlignment="left" verticalAlignment="center">
                    <Image class="img" src="~/assets/images/default_user.png"></Image>
                </GridLayout>
            </GridLayout>
        </GridLayout>
    </CardView>
</template>

<script>
    import Constant from "../../constant";
    import _ from 'lodash/lodash.min';
    import { mapState } from 'vuex'
    export default {
        name: "NameCard",
        props: [ "namecard" ]
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
        font-size: 20%;
        color: #6a1495;
    }
    .info {
        font-size: 13%;
        color: #6a1495;
        padding-top: 2px;
        padding-bottom: 2px;
    }
</style>
