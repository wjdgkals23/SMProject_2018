<template>
    <Page :actionBarHidden="abmanager">
        <ScrollView>
            <GridLayout columns="*" rows="*" class="mylight" paddingBottom="20">
                <StackLayout>
                    <GridLayout columns="*" rows="70">
                        <GridLayout horizontalAlignment="right" width="15%" margin="0" paddingTop="10">
                            <Label class="fa" :text="'fa-times-circle' | fonticon" color="purple" style="font-size: 40px" @tap="resetdetailpagedata(),$navigateBack()" />
                            <!--<Image src="~/assets/images/btn/cancel.png" stretch="aspectFit" @tap="resetdetailpagedata(),$navigateBack()"/>-->
                        </GridLayout>
                    </GridLayout>
                    <GridLayout columns="*" class="mybold">
                        <detail-col col="0" :coldata="DetailPageData"></detail-col>
                        <!-- 이미지 태그 데이터 바인딩 -->
                    </GridLayout>
                    <StackLayout>
                        <name-card></name-card>
                        <GridLayout verticalAlignment="">
                            <StackLayout orientation="horizontal" paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="16">
                                <Label class="fa" style="font-size: 40%;" :text="'fa-thumbs-up' | fonticon" color="#b4b9c1" v-show="DetailPageData.like" @tap="clicklike" />
                                <Label class="fa" style="font-size: 40%;" :text="'fa-thumbs-up' | fonticon" color="purple" v-show="!DetailPageData.like" @tap="clicklike" />
                                <Label class="mytext likecnt" :text="likecnt" paddingTop="8" paddingLeft="5" />
                            </StackLayout>
                        </GridLayout>
                        <!-- 네임카드 좋아요 -->
                    </StackLayout>
                    <GridLayout columns="*" class="mytext" paddingTop="10" paddingLeft="8" paddingRight="8">
                        <detail-comment :imgdata="commentpreview" :comment="DetailPageData.comment" :postid="DetailPageData.id"></detail-comment>
                        <!-- 댓글 -->
                    </GridLayout>
                </StackLayout>
            </GridLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import DetailCol from "./detailview/DetailCol";
    import DetailComment from './detailview/DetailComment'
    import NameCard from './namecard/NameCard'
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash';
    import Constant from "../constant";
    export default {
        name: "DetailPage",
        components: { DetailCol, DetailComment, NameCard },
        data: function() {
            return {
                commentpreview: null,
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
            }
        },mapState([ 'DetailPageData', 'abmanager' ])),
        methods:{
            resetdetailpagedata() {
                this.$store.dispatch(Constant.RSDP);
            },
            clicklike(){
                this.DetailPageData.like = !this.DetailPageData.like;
                if(!this.DetailPageData.like) {
                    this.DetailPageData.like_count += 1;
                }
                else{
                    this.DetailPageData.like_count -= 1;
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
</style>
