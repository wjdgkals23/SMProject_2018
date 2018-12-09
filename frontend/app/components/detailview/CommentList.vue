<template>
    <Page class="cardStyle">
        <GridLayout rows="500" columns="*" paddingTop="6" paddingLeft="8" paddingRight="8" paddingBottom="30">
            <ScrollView>
                <CardView radius="15" >
                    <StackLayout>
                        <!--3*,5*,*-->
                        <GridLayout rows="*,*" columns="3*,5*" v-for="(item, index) in chcomment" paddingBottom="5">
                            <GridLayout row="0" col="0" rowspan="2" paddingTop="3" paddingRight="2" paddingLeft="2" paddingBottom="3" horizontalAlignment="center" verticalAlignment="center">
                                <Label :text="item.name" class="mylight" style="color: #661d7e;"/>
                            </GridLayout>
                            <GridLayout row="0" col="1" paddingTop="3" paddingRight="2" paddingLeft="5" paddingBottom="3">
                                <TextView :text="item.contents" class="textview" style="color: #661d7e;"/>
                            </GridLayout>
                            <GridLayout row="1" col="1" paddingTop="3" paddingRight="5" paddingLeft="2" paddingBottom="3">
                                <Image :src="item.url" v-show="item.have_img" width="80%" horizontalAlignment="center" verticalAlignment="center" />
                            </GridLayout>
                        </GridLayout>
                    </StackLayout>
                </CardView>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';

    export default {
        name: "CommentList",
        computed : _.extend({

        },mapState([ "chcomment" ])),
    }
</script>

<style scoped>
    .cardStyle {
        /*color: #fff;*/
        background: #e0d0ea;
        border-radius: 5px;
    }

    .tagsearch {
        background: #e0d0ea;
        font-size: 12px;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        /*padding-top: ;*/
    }

    .textview {
        background-color: transparent;
        border-color: transparent;
    }
</style>
