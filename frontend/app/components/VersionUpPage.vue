<template>
    <Page :actionBarHidden="abmanager">
        <ScrollView>
            <StackLayout class="mylight" paddingBottom="30">
                <GridLayout rows="*" columns="*" style="margin-top:30px">
                    <!--<upload-view row="0" ></upload-view>-->
                    <!--<bottom-navigation row="2" colSpan="2"></bottom-navigation>-->
                    <GridLayout row="0" rows="*,auto,*" columns="*">
                        <!-- 뒤로 가기 및 업로드 -->
                        <GridLayout row="0" rows="*" columns="*,*">
                            <GridLayout row="0" col="0" verticalAlignment="top" horizontalAlignment="left" width="10%">
                                <StackLayout paddingTop="8" paddingLeft="10">
                                    <Image src="~/assets/images/btn/leftarrow.png" stretch="aspectFit" @tap="$navigateBack" />
                                </StackLayout>
                            </GridLayout>
                            <GridLayout row="0" col="1" verticalAlignment="center" horizontalAlignment="right" width="23%">
                                <StackLayout paddingTop="8" paddingRight="10">
                                    <Image verticalAlignment="center" src="~/assets/images/btn/upload.png" stretch="aspectFit" @tap="send"/>
                                </StackLayout>
                            </GridLayout>
                        </GridLayout>
                        <GridLayout row="1" v-if="chcomment.length !== 0" paddingTop="16" paddingLeft="8" paddingRight="8" paddingBottom="8" horizontalAlignment="center" verticalAlignment="center">
                            <Label class="mybold" style="font-size: 20%; color: purple;" text="선택한 댓글 보기" @tap="$showModal(page)"/>
                        </GridLayout>
                        <!-- 제목 및 내용 작성 -->
                        <StackLayout row="2" backgroundColor="white" padding="10" id="upload">
                            <CardView class="cardStyle" elevation="0" radius="15">
                                <GridLayout rows="*" margin="0">
                                    <GridLayout verticalAlignment="top">
                                        <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="10" paddingRight="10">
                                            <TextView v-model="content" :text="content" hint="내용을 작성하는 칸입니다" editable="true" class="contentstyle"/>
                                        </StackLayout>
                                    </GridLayout>
                                </GridLayout>
                            </CardView>
                            <!-- 이미지 업로드 -->
                            <GridLayout rows="*" columns="65,*">
                                <GridLayout row="0" col="0" rows="*" columns="*" verticalAlignment="center" horizontalAlignment="center" paddingLeft="5" paddingRight="5">
                                    <StackLayout row="0" col="0" style="border-bottom: solid 1px purple">
                                        <Image src="~/assets/images/btn/imageupload.png" stretch="aspectFit" @tap="uploadimage"/>
                                    </StackLayout>
                                </GridLayout>
                                <!-- 선택된 이미지 뷰 -->
                                <GridLayout row="0" col="1" rows="40,*" columns="*" paddingLeft="10" paddingTop="5">
                                    <GridLayout row="0" col="0" paddingLeft="5">
                                        <Label class="mytext" style="color: purple;" text="선택한 이미지" />
                                    </GridLayout>
                                    <GridLayout row="1" col="0">
                                        <ScrollView orientation="horizontal" >
                                            <GridLayout rows="100" columns="*">
                                                <StackLayout orientation="horizontal">
                                                    <CardView class="cardStyle2" elevation="0" radius="15" v-for="item in imagesource">
                                                        <GridLayout rows="*" columns="*" margin="0">
                                                            <Image class="img" :src="item.src" stretch="aspectFill" />
                                                        </GridLayout>
                                                    </CardView>
                                                </StackLayout>
                                            </GridLayout>
                                        </ScrollView>
                                    </GridLayout>
                                </GridLayout>
                            </GridLayout>
                        </StackLayout>
                    </GridLayout>

                    <!--<upload-tag row="1" ></upload-tag>-->
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import { imgpickerfunc } from '../lib/imgpicker';
    import { versionup } from "../lib/senddata";
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';
    import CommentList from './detailview/CommentList'

    export default {
        name: "VersionUpPage",
        data() {
            return {
                title: "",
                content: "",
                titlestyle: "style1",
                imagesource: [],
                page: CommentList
            }
        },
        created() {
            console.log(this.chcomment);
        },
        computed : _.extend({

        },mapState([ 'tags' , 'abmanager', 'api', "id_num", "DetailPageData", "chcomment" ])),
        methods: {
            uploadimage() {
                let that = this;
                return (imgpickerfunc(that));
            },
            //Server
            send() {
                console.log(this.title, this.content);
                let textdata = {
                    postId: this.DetailPageData.id,
                    contents: this.content,
                }
                versionup(this.imagesource, this.api, textdata, this);
            }
        },
    }
</script>

<style scoped>
    .tagsearchbar {
        /*color: #fff;*/
        width: 92%;
        height: 200px;
        /*padding: 4%;*/
        background: #e0d0ea;
        border-radius: 15px;
    }
    .tagsearch {
        background: #e0d0ea;
        font-size: 20px;
        width: 95%;
        height: 95%;
        border-radius: 15px;
        /*padding-top: ;*/
    }

    .clothtag {
        border-color: purple;
        color: white;
        background-color: purple;
        margin: 10px;
        font-size: 12px;
        border-radius: 10px;
    }

    .styletag {
        border-color: purple;
        color: purple;
        background-color: #e0d0ea;
        margin: 10px;
        font-size: 12px;
        border-radius: 10px;
        /*box-shadow: 3px mediumpurple;*/
    }

    .selectedtag {
        border-color: purple;
        color: white;
        background-color: gray;
        margin: 10px;
        font-size: 12px;
    }

    #upload {
        font-family: THEmpgtB;
        font-family: THELu;
    }
    .cardStyle {
        /*color: #fff;*/
        width: 92%;
        height: 500px;
        padding: 4%;
        background: #e0d0ea;
        border-radius: 15px;
    }
    .titlestyle {
        border-bottom-width: 1px;
        border-color: purple;
        placeholder-color:purple;
        margin-bottom: 30px;
        padding: 40px;
        color: purple;
    }
    .contentstyle {
        font-size: 15px;
        border-bottom-width: 1px;
        border-color: #e0d0ea;
        placeholder-color:purple;
        width: 95%;
        height: 90%;
        padding: 5px;
        margin-top: 5px;
    }

    .cardStyle2 {
        width: 92%;
        height: 500px;
        padding: 4%;
        border-radius: 15px;
    }

    .img {
        border-radius: 15px;
        margin-right: 5px;
    }

    .textview {
        background-color: transparent;
        border-color: transparent;
    }
</style>
