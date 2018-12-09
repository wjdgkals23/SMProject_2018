<template>
    <Page :actionBarHidden="abmanager">
        <GridLayout columns="*" :rows="ifsvb">
            <GridLayout row="0">
                <ScrollView>
                    <GridLayout columns="*" rows="*" class="mylight" paddingBottom="20">
                        <StackLayout>
                            <GridLayout columns="*" rows="70">
                                <GridLayout horizontalAlignment="right" width="15%" margin="0" paddingTop="20">
                                    <Label class="fa" :text="'fa-times-circle' | fonticon" color="purple" style="font-size: 35px" @tap="$navigateBack" />
                                    <!--<Image src="~/assets/images/btn/cancel.png" stretch="aspectFit" @tap="resetdetailpagedata(),$navigateBack()"/>-->
                                </GridLayout>
                            </GridLayout>
                            <GridLayout columns="*" class="mybold">
                                <detail-col col="0"></detail-col>
                                <!-- 이미지 태그 데이터 바인딩 -->
                            </GridLayout>
                            <StackLayout>
                                <name-card></name-card>
                                <GridLayout verticalAlignment="">
                                    <StackLayout orientation="horizontal" paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="16">
                                        <Label class="fa" style="font-size: 40%;" :text="'fa-thumbs-up' | fonticon" color="#b4b9c1" v-show="!DetailPageData.selectLike" @tap="clicklike" />
                                        <Label class="fa" style="font-size: 40%;" :text="'fa-thumbs-up' | fonticon" color="purple" v-show="DetailPageData.selectLike" @tap="clicklike" />
                                        <StackLayout paddingTop="14" paddingLeft="5">
                                            <Label class="mylight likecnt" :text="likecnt" />
                                        </StackLayout>
                                    </StackLayout>
                                </GridLayout>
                                <!-- 네임카드 좋아요 -->
                            </StackLayout>
                            <GridLayout columns="*" class="mytext" paddingTop="10" paddingLeft="8" paddingRight="8">
                                <detail-comment></detail-comment>
                                <!-- 댓글 -->
                            </GridLayout>
                        </StackLayout>
                        <!-- 작성자 버전업 버튼 -->
                    </GridLayout>
                </ScrollView>
            </GridLayout>
            <GridLayout class="versionupbtn" row="1" v-show="id_num==DetailPageData.author_id">
                <GridLayout verticalAlignment="center" horizontalAlignment="center" @tap="$navigateTo(versionup)">
                    <Label text="버전업!" />
                </GridLayout>
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import DetailCol from "./detailview/DetailCol";
    import DetailComment from './detailview/DetailComment';
    import NameCard from './namecard/NameCard';
    import VersionUpPage from './VersionUpPage';
    import App from './App';
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';
    import Constant from "../constant";
    export default {
        name: "DetailPage",
        components: { DetailCol, DetailComment, NameCard },
        data: function() {
            return {
                commentpreview: null,
                app: App,
                versionup: VersionUpPage
            }
        },
        created() {
            console.log(this.DetailPageData.Image.length);
            this.commentpreview = this.DetailPageData.Image;
            console.log(this.DetailPageData.author);
        },
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
        },mapState([ 'DetailPageData', 'abmanager', 'id_num' ])),
        methods:{
            resetdetailpagedata() {
                this.$store.dispatch(Constant.RSDP);
            },
            clicklike(){
                if(this.DetailPageData.selectLike) {
                    //delete like
                    this.$store.dispatch(Constant.DCL, {type:"delete"});
                }
                else{
                    //insert like
                    this.$store.dispatch(Constant.DCL, {type:"insert"});
                }
            }
        }
    }
</script>

<style scoped>
    .likecnt {
        font-size: 20%;
        color: #6a1495;
    }
    .versionupbtn {
        background: #6a1495;
        color: white;
    }
</style>
