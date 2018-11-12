<template>
    <StackLayout>
        <!-- 이미지 선택 -->
        <GridLayout rows="*" columns="*" >
            <Label text="제안할 이미지를 선택하세요." @tap="send"/>
        </GridLayout>
        <ScrollView orientation="horizontal" >
            <GridLayout rows="100" columns="*" paddingTop="6">
                <StackLayout orientation="horizontal">
                    <CardView elevation="40" v-for="(item, index) in imgdata">
                        <GridLayout rows="*" columns="*" >
                            <Image :src="item.src" stretch="aspectFill" />
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
        <GridLayout rows="100,*">
            <!-- 댓글 작성바 -->
            <GridLayout row="0" columns="*,11*,2*" paddingTop="15" width="100%">
                <StackLayout col="0" horizontalAlignment="stretch" verticalAlignment="top" paddingLeft="0">
                    <Image src="~/assets/images/icon/camera.png" width="100%" />
                </StackLayout>
                <StackLayout col="1" horizontalAlignment="left" padding="1">
                    <CardView elevation="0">
                        <StackLayout>
                            <TextView v-model="writecomment" verticalAlignment="center" text="댓글을 작성하세요" editable="true" class="tagsearch"/>
                        </StackLayout>
                    </CardView>
                </StackLayout>
                <StackLayout col="2" horizontalAlignment="stretch" verticalAlignment="center" paddingLeft="3">
                    <Image src="~/assets/images/btn/commentupload.png" width="100%" @tap="commentwrite"/>
                </StackLayout>
            </GridLayout>
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
        <!-- 수정된 이미지 뷰 -->
        <GridLayout rows="*" columns="*" paddingTop="6" paddingLeft="8" paddingRight="8" paddingBottom="30">
            <ScrollView>
                <CardView class="cardStyle" radius="15" >
                    <StackLayout>
                        <GridLayout rows="*,*" columns="3*,6*" v-for="(item, index) in comment">
                            <GridLayout row="0" col="0" rowspan="2" paddingTop="3" paddingRight="2" paddingLeft="2" paddingBottom="3" horizontalAlignment="center" verticalAlignment="center">
                                <Label :text="item.id" class="mylight" style="color: #661d7e;"/>
                            </GridLayout>
                            <GridLayout row="0" col="1" paddingTop="3" paddingRight="5" paddingLeft="2" paddingBottom="3">
                                <TextView :text="item.content" class="textview" style="color: #661d7e;"/>
                            </GridLayout>
                            <GridLayout row="1" col="1" paddingTop="3" paddingRight="5" paddingLeft="2" paddingBottom="3">
                                <Image :src="item.src" v-show="item.have_img" width="80%" horizontalAlignment="center" verticalAlignment="center" />
                            </GridLayout>
                        </GridLayout>
                    </StackLayout>
                </CardView>
            </ScrollView>
        </GridLayout>
    </StackLayout>
</template>

<script>
    import { sendimage } from "../../lib/sendimage";
    import { apiPath } from "../../lib/httpconfig";
    import { imgeditor } from "../../lib/imgpicker";
    const platformModule = require("tns-core-modules/platform");
    import Constant from "../../constant";

    import _ from 'lodash'
    import { mapState } from 'vuex'

    export default {
        name: "DetailComment",
        props: [ 'imgdata', 'comment', 'postid' ],
        data: function() {
            return {
                editimage: [],
                writecomment: "",

            }
        },
        created() {
            console.log("created");
            console.log(this.id);
        },
        methods: {
            editphoto(vue, src, index) {
                imgeditor(vue, src, index)
            },
            send() {
                if (platformModule.device.os === "Android") {
                    sendimage(this.editimage, apiPath.android);
                }
                else {
                    sendimage(this.editimage, apiPath.ios);
                }
            },
            check(index){
                this.imgdata[index].checked = !this.imgdata[index].checked;
                if(this.imgdata[index].checked == true) {
                    this.editphoto(this, this.imgdata[index].src, index);
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
                        this.$store.dispatch(Constant.WC, { id: this.id, content: this.writecomment, have_img: true, src: this.editimage[0].src } );
                        this.cleancomment();
                    }
                    else{
                        this.$store.dispatch(Constant.WC, { id: this.id, content: this.writecomment, have_img: false } );
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
            }
        },
        computed: _.extend({
            editcnt: function(){
                return this.editimage.length==0 ? false : true;
            }},mapState( [ 'id' ] ))
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
        font-size: 20px;
        width: 100%;
        height: 95%;
        border-radius: 15px;
        /*padding-top: ;*/
    }

    .textview {
        background-color: transparent;
        border-color: transparent;
    }
</style>
