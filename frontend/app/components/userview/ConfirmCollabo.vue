<template>
    <Page :actionBarHidden="abmanager">
        <ScrollView>
            <StackLayout>
                <GridLayout columns="*" rows="auto">
                    <GridLayout horizontalAlignment="right" width="15%" margin="0" paddingTop="20">
                        <Label class="fa" :text="'fa-times-circle' | fonticon" color="purple" style="font-size: 35px" @tap="$navigateBack" />
                        <!--<Image src="~/assets/images/btn/cancel.png" stretch="aspectFit" @tap="resetdetailpagedata(),$navigateBack()"/>-->
                    </GridLayout>
                </GridLayout>
                <GridLayout rows="20,auto,20">
                    <GridLayout row="1" paddingLeft="20" paddingRight="20">
                        <Label text="같이 작업하고 싶습니다." style="font-size: 25%;" class="tfstyle mylight" style.placeholderColor="#b36a1495" />
                    </GridLayout>
                </GridLayout>
                <GridLayout rows="auto">
                    <GridLayout row="0" paddingTop="8" paddingLeft="16" paddingRight="16">
                        <CardView class="cardStyle" radius="10">
                            <StackLayout>
                                <GridLayout paddingTop="10" rows="auto,auto">
                                    <Label row="0" paddingLeft="10" class="mytext" text="* 개인 / 기업소개" style="color: #6a1495; font-size: 15%; width: 100%; text-align: left;"/>
                                    <GridLayout paddingLeft="16" paddingRight="16" row="1" rows="auto">
                                        <TextView :text="text1" textWrap="true" class="tfstyle" style.placeholderColor="#b36a1495" ></TextView>
                                    </GridLayout>
                                </GridLayout>
                                <GridLayout paddingTop="10" rows="auto,auto">
                                    <Label row="0" paddingLeft="10" class="mytext" text="* 제의 내용" style="color: #6a1495; font-size: 15%; width: 100%; text-align: left;"/>
                                    <GridLayout paddingLeft="16" paddingRight="16" row="1" rows="auto">
                                        <TextView :text="text2" textWrap="true" class="tfstyle" style.placeholderColor="#b36a1495" ></TextView>
                                    </GridLayout>
                                </GridLayout>
                                <GridLayout paddingTop="10" rows="auto,auto">
                                    <Label row="0" paddingLeft="10" class="mytext" text="* 연락처" style="color: #6a1495; font-size: 15%; width: 100%; text-align: left;"/>
                                    <GridLayout paddingLeft="16" paddingRight="16" paddingBottom="16" row="1" rows="auto">
                                        <TextView :text="text3" textWrap="true" class="tfstyle" style.placeholderColor="#b36a1495" ></TextView>
                                    </GridLayout>
                                </GridLayout>
                            </StackLayout>
                        </CardView>
                    </GridLayout>
                </GridLayout>
                <name-card :namecard="collabo"></name-card>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';
    import NameCard from "../namecard/NameCard";

    export default {
        name: "ConfirmCollabo",
        data() {
            return {
                text1: "저희 디자이너스는 니트 의류 전문 수출업체로 출발하여\n" +
                    "일찍이 글로벌 생산 체제를 갖추고, 국내 패션브랜드 사업을 \n" +
                    "강화해 나가며, 수출과 내수의 양대 산업을 축으로 지속적인 \n" +
                    "성장을 이루고 있습니다.",
                text2: "디자이너님의 작업물이 저희 업체 브랜드 ‘탑텐’의 주 타겟층인\n" +
                    "20대 남녀에게 잘 맞을 것으로 예상하고, 어플에서의 좋아요 \n" +
                    "수가 높아 수요도 있을 것이라 생각합니다.\n" +
                    "함께 작업하고 싶습니다.  \n" +
                    "\n",
                text3: "Mail : cast_dpt@designers.com\n" +
                    "Call : 02-3408-3070\n"
            }
        },
        computed: _.extend({

        },mapState([ 'abmanager', 'id_num', 'collabo' ])),
        components: {
            NameCard
        }
    }
</script>

<style scoped>
    .tfstyle{
        border-bottom-width: 1px;
        border-color:#b36a1495;
        color: #6a1495;
    }

    .cardStyle {
        /*color: #fff;*/
        background: #e0d0ea;
        border-radius: 5px;
    }
</style>
