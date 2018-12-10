<template>
    <Page :actionBarHidden="abmanager">
        <ScrollView>
            <StackLayout>
                <GridLayout rows="60">
                    <CardView>
                        <GridLayout columns="auto,auto,*" style="background: #ffffff;" paddingTop="15" paddingBottom="15">
                            <GridLayout paddingLeft="10" col="0" verticalAlignment="center" horizontalAlignment="left" paddingRight="10">
                                <Image class="img" src="~/assets/images/btn/leftarrow.png" @tap="$navigateBack"></Image>
                            </GridLayout>
                            <GridLayout col="1" verticalAlignment="center" horizontalAlignment="left">
                                <Label class="headtext" text="콜라보요청" style="color: #6a1495; font-size: 20%; width: 80%; text-align: left;"/>
                            </GridLayout>
                            <GridLayout col="2" verticalAlignment="center" horizontalAlignment="right" paddingRight="10">
                                <Image class="img" src="~/assets/images/btn/collaboupload.png"></Image>
                            </GridLayout>
                        </GridLayout>
                    </CardView>
                </GridLayout>
                <GridLayout rows="20,30,20">
                    <GridLayout row="1" paddingLeft="20" paddingRight="20">
                        <TextField hint="디자이너에게 협업을 제안해보세요." class="tfstyle" style.placeholderColor="#b36a1495" ></TextField>
                    </GridLayout>
                </GridLayout>
                <GridLayout rows="auto">
                    <GridLayout row="0" paddingTop="8" paddingLeft="16" paddingRight="16">
                        <CardView class="cardStyle" radius="10">
                            <StackLayout>
                                <GridLayout paddingTop="10" rows="auto,auto">
                                    <Label row="0" paddingLeft="10" class="mytext" text="* 개인 / 기업소개" style="color: #6a1495; font-size: 15%; width: 100%; text-align: left;"/>
                                    <GridLayout paddingLeft="16" paddingRight="16" row="1" rows="80">
                                        <TextView hint="입력해주세요." textWrap="true" class="tfstyle" style.placeholderColor="#b36a1495" ></TextView>
                                    </GridLayout>
                                </GridLayout>
                                <GridLayout paddingTop="10" rows="auto,auto">
                                    <Label row="0" paddingLeft="10" class="mytext" text="* 제의 내용" style="color: #6a1495; font-size: 15%; width: 100%; text-align: left;"/>
                                    <GridLayout paddingLeft="16" paddingRight="16" row="1" rows="80">
                                        <TextView hint="입력해주세요." textWrap="true" class="tfstyle" style.placeholderColor="#b36a1495" ></TextView>
                                    </GridLayout>
                                </GridLayout>
                                <GridLayout paddingTop="10" rows="auto,auto">
                                    <Label row="0" paddingLeft="10" class="mytext" text="* 연락처" style="color: #6a1495; font-size: 15%; width: 100%; text-align: left;"/>
                                    <GridLayout paddingLeft="16" paddingRight="16" paddingBottom="16" row="1" rows="30">
                                        <TextView hint="입력해주세요." textWrap="true" class="tfstyle" style.placeholderColor="#b36a1495" ></TextView>
                                    </GridLayout>
                                </GridLayout>
                            </StackLayout>
                        </CardView>
                    </GridLayout>
                </GridLayout>
                <name-card :namecard="mynamecard"></name-card>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';
    import NameCard from "./namecard/NameCard";

    export default {
        name: "CollaboPage",
        computed: _.extend({
            likecnt() {
                return "좋아요 " + this.DetailPageData.like_count + "개";
            },
            ifsvb() {
                if(this.id_num == this.DetailPageData.author_id) {
                    return "*, 40"
                }
                else {
                    return "*"
                }
            },
        },mapState([ 'abmanager', 'id_num', 'mynamecard' ])),
        components: {
            NameCard
        },
    }
</script>

<style scoped>
    .tfstyle{
        border-bottom-width: 1px;
        border-color:#b36a1495;
    }

    .cardStyle {
        /*color: #fff;*/
        background: #e0d0ea;
        border-radius: 5px;
    }
</style>
