<template>
    <StackLayout>
        <!-- 이미지 선택 -->
        <GridLayout rows="*" columns="*" >
            <Label text="제안할 이미지를 선택하세요."/>
        </GridLayout>
        <!-- 수정 가능한 이미지 뷰 -->
        <ScrollView orientation="horizontal" >
            <GridLayout rows="100" columns="*" paddingTop="6">
                <StackLayout orientation="horizontal">
                    <CardView elevation="40" v-for="(item, index) in imgdata">
                        <GridLayout rows="*" columns="*" >
                            <Image :src="item.url" stretch="aspectFill" />
                            <GridLayout verticalAlignment="top" horizontalAlignment="right" paddingTop="5" paddingRight="5" >
                                <Label class="fa" :text="'fa-check-circle' | fonticon" color="purple" style="font-size: 30px;" v-show="item.checked" @tap="check(index)"/>
                                <Label class="fa" :text="'fa-check-circle' | fonticon" color="gray" style="font-size: 30px;" v-show="!item.checked" @tap="check(index)"/>
                            </GridLayout>
                        </GridLayout>
                    </CardView>
                </StackLayout>
            </GridLayout>
        </ScrollView>
        <!-- 댓글 뷰 -->
        <GridLayout rows="50,*">
            <!-- 댓글 작성바 -->
            <GridLayout row="0" columns="*,9*,2*" paddingTop="15" paddingLeft="10" paddingRight="5" width="100%">
                <StackLayout col="0" horizontalAlignment="center" verticalAlignment="center" paddingLeft="0">
                    <Image src="~/assets/images/icon/camera.png" width="100%" />
                </StackLayout>
                <StackLayout col="1" horizontalAlignment="right" padding="1" paddingLeft="5">
                    <CardView elevation="0">
                        <StackLayout>
                            <TextView v-model="writecomment" verticalAlignment="center" text="댓글을 작성하세요" editable="true" class="tagsearch"/>
                        </StackLayout>
                    </CardView>
                </StackLayout>
                <StackLayout col="2" horizontalAlignment="left" verticalAlignment="center" paddingLeft="3">
                    <Image src="~/assets/images/btn/commentupload.png" width="100%" @tap="commentwrite"/>
                </StackLayout>
            </GridLayout>
            <!-- 수정한 이미지 뷰 -->
            <ScrollView row="1" orientation="horizontal" v-show="editcnt">
                <GridLayout rows="100" columns="*" paddingTop="6">
                    <StackLayout orientation="horizontal">
                        <CardView elevation="40" v-for="item in editimage">
                            <GridLayout rows="*" columns="*" >
                                <Image :src="item.src" stretch="aspectFill" />
                            </GridLayout>
                        </CardView>
                    </StackLayout>
                </GridLayout>
            </ScrollView>
        </GridLayout>
        <!-- 댓글 리스트 -->
        <GridLayout rows="500" columns="*" paddingTop="6" paddingLeft="8" paddingRight="8" paddingBottom="30">
            <CardView class="cardStyle" radius="15" >
                <ScrollView>
                    <StackLayout>
                        <!--3*,5*,*-->
                        <GridLayout rows="*,*" columns="3*,5*,*" v-for="(item, index) in comment" paddingBottom="5">
                            <GridLayout row="0" col="0" rowspan="2" paddingTop="3" paddingRight="2" paddingLeft="2" paddingBottom="3" horizontalAlignment="center" verticalAlignment="center">
                                <Label :text="item.name" class="mylight" style="color: #661d7e;"/>
                            </GridLayout>
                            <GridLayout row="0" col="1" paddingTop="3" paddingRight="2" paddingLeft="5" paddingBottom="3">
                                <TextView editable="false" :text="item.contents" class="textview" style="color: #661d7e;"/>
                            </GridLayout>
                            <GridLayout row="1" col="1" paddingTop="3" paddingRight="5" paddingLeft="2" paddingBottom="3">
                                <Image :src="item.url" v-show="item.have_img" width="80%" horizontalAlignment="center" verticalAlignment="center" />
                            </GridLayout>
                            <GridLayout v-show="id_num === DetailPageData.author_id && id_num !== item.user_id" row="1" col="2" rowspan="2" horizontalAlignment="center" verticalAlignment="center" paddingRight="10">
                                <Image src="~/assets/images/ncommentch.png" v-if="!commentch(item.select_type)" @tap="commentcheck(index)"/>
                                <Image src="~/assets/images/commentch.png" v-if="commentch(item.select_type)" @tap="commentcheck(index)"/>
                                <!--v-show="item.checked" @tap="check(index)"-->
                            </GridLayout>
                            <GridLayout row="0" col="2" rowspan="2" horizontalAlignment="center" verticalAlignment="center" paddingRight="10">
                                <Label class="mybold" style="font-size: 10%; color: purple;" :text="versiontext(item.version)"/>
                                <!--v-show="item.checked" @tap="check(index)"-->
                            </GridLayout>
                        </GridLayout>
                    </StackLayout>
                </ScrollView>
            </CardView>
        </GridLayout>
    </StackLayout>
</template>

<script>
    import { apiPath } from "../../lib/httpconfig";
    import { imgeditor } from "../../lib/imgpicker";
    import Constant from "../../constant";
    import {upload, uploadcomment} from "../../lib/senddata";
    import _ from 'lodash'
    import { mapState } from 'vuex'

    const platformModule = require("tns-core-modules/platform");

    export default {
        name: "DetailComment",
        props: [],
        data: function() {
            return {
                editimage: [],
                writecomment: "",
                imadata: "",
                comment: "",
                postid: "",
            }
        },
        created() {
            //:imgdata="commentpreview" :comment="DetailPageData.comment" :postid="DetailPageData.id"
            this.imgdata = this.DetailPageData.Image;
            this.comment = this.DetailPageData.comment;
            this.postid = this.DetailPageData.id;
        },
        methods: {
            editphoto(vue, src, index) {
                if(this.editimage.length == 1) {
                    alert({
                        title: "하나의 댓글에는 하나의 이미지만 제안가능합니다.",
                        okButtonText: "OK"
                    }).then(() => {
                        // console.log("Alert dialog closed");
                        this.imgdata[index].checked = !this.imgdata[index].checked;
                    });
                }
                else{
                    imgeditor(vue, src, index)
                }
            },
            check(index){
                this.imgdata[index].checked = !this.imgdata[index].checked;
                if(this.imgdata[index].checked == true) {
                    this.editphoto(this, this.imgdata[index].url, index);
                }
                else{
                    for(let item in this.editimage){
                        console.log(item);
                        if(this.editimage[item].index == index) {
                            this.editimage.pop(item);
                        }
                    }
                }
            },
            commentwrite() {
                if(this.writecomment == "") {
                    alert({
                        title: "댓글을 작성하세요.",
                        okButtonText: "OK"
                    }).then(() => {
                        console.log("Alert dialog closed");
                    });
                }
                else{
                    if(this.editimage.length != 0){
                        let data = { id: this.id_num, post_id: this.DetailPageData.id, com_id: this.id, contents: this.writecomment, have_img: true, url: this.editimage[0].src, name: this.mynamecard.name, version: this.DetailPageData.version };
                        uploadcomment(this.api, data, this);
                        this.cleancomment();
                    }
                    else{
                        let data = { id: this.id_num, post_id: this.DetailPageData.id, com_id: this.id, contents: this.writecomment, have_img: false, name: this.mynamecard.name, version: this.DetailPageData.version };
                        uploadcomment(this.api, data, this);
                        this.cleancomment();
                    }
                //    { id: "nayekim", content: "왼쪽 가슴 아래에 포켓하나 더 있으면 좋을거같아요!!", have_img: true, src: "~/assets/images/source_1.jpg"}
                }
            },
            cleancomment() {
                this.editimage = [];
                this.writecomment = "";
                for(let item in this.imgdata){
                    if(this.imgdata[item].checked == true)
                        this.imgdata[item].checked = false;
                }
            },
            commentch(type) {
                if(type === 1)
                    return true;
                else
                    return false;
            },
            commentcheck(ind) {
                this.$store.dispatch(Constant.CC, { index: ind } );
            },
            versiontext(text) {
                return "버전" + text;
            }
        },
        computed: _.extend({
            editcnt: function(){
                return this.editimage.length==0 ? false : true;
            },
            commenttype() {
                return this.id_num === this.DetailPageData.author_id ? "3*,5*,*" : "3*,5*";
            },
            versionch() {
                return this.id_num === this.DetailPageData.author_id;
            },
        },mapState( [ 'id', 'api', "id_num", "DetailPageData", "mynamecard" ] ))
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
