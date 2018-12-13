<template>
    <Page actionBarHidden="true">
        <GridLayout columns="*" rows="*">
            <ScrollView orientation="vertical" row="0">
                <StackLayout backgroundColor="#ffffff">
                    <GridLayout rows="70">
                        <CardView>
                            <GridLayout style="background: #ffffff;" paddingTop="15" paddingBottom="15" verticalAlignment="center" horizontalAlignment="center">
                                <GridLayout verticalAlignment="center" horizontalAlignment="center">
                                    <Label class="headtext" text="마이피드" style="color: #6a1495; font-size: 25%; width: 100%; text-align: center;"/>
                                </GridLayout>
                            </GridLayout>
                        </CardView>
                    </GridLayout>
                    <name-card :namecard="namecard"></name-card>
                    <image-view first="2" second="3"></image-view>
                    <!--<collabo-list></collabo-list>-->
                </StackLayout>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script>
    import { mylikeget, mypostget } from "../../platforms/ios/frontend/app/lib/getpost";
    import { mapState } from 'vuex';
    import NameCard from './namecard/NameCard';
    import ImageView from './imageview/ImageView'
    import CollaboList from './userview/CollaboList'
    import _ from 'lodash/lodash.min';

    export default {
        name: "AnotherUserPage",
        data() {
            return {
            }
        },
        components: { NameCard, ImageView, CollaboList },
        created() {
            mypostget(this.api, this, this.DetailPageData.author_id);
        },
        methods:{

        },
        computed : _.extend({


        },mapState([ 'api', 'id_num', 'namecard', 'DetailPageData' ])),
    }
</script>

<style scoped>
    .dropdown {
        background: white;
        color: #6a1495;
        font-size: 40px;
        text-align: center;
        width: 100%;
        /*padding-left: 50px;*/
    }
    .dropdown2 {
        background: white;
        color: #6a1495;
        font-size: 22px;
        text-align: center;
        width: 100%;
    }
</style>
