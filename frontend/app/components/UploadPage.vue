<template>
    <Page :actionBarHidden="abmanager">
        <ScrollView>
            <GridLayout columns="*" rows="*" class="mylight" paddingBottom="30">
                <GridLayout rows="*,*" columns="*" style="margin-top:30px">
                    <!--<upload-view row="0" ></upload-view>-->
                    <!--<bottom-navigation row="2" colSpan="2"></bottom-navigation>-->
                    <GridLayout row="0" rows="*,*" columns="*">
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
                        <!-- 제목 및 내용 작성 -->
                        <StackLayout row="1" backgroundColor="white" padding="10" id="upload">
                            <TextField v-model="title" :text="title" hint="제목" editable="true" class="titlestyle"/>
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
                            <GridLayout rows="*" columns="75,*">
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
                    <GridLayout row="1" rows="*,60,*">
                        <!-- 선택된 태그 -->
                        <StackLayout row="0">
                            <!-- 태그 리스트 뷰 -->
                            <StackLayout col="0" paddingTop="10" horizontalAlignment="center">
                                <Label text="선택된 태그" style="font-size: 20px; color: purple;"/>
                            </StackLayout>
                            <FlexboxLayout flexWrap="wrap" paddingTop="10" paddingLeft="15" paddingRight="15">
                                <CardView :class="stylebind(item)" elevation="0" radius="10" v-for="(item,index) in selectedtag">
                                    <StackLayout paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                                        <Label :text="item.contents" @tap="deletetag(index, item.contents)"/>
                                    </StackLayout>
                                </CardView>
                            </FlexboxLayout>

                        </StackLayout>

                        <!-- 태그 검색바 -->
                        <GridLayout row="1" columns="*,4*" paddingTop="15" width="100%">
                            <StackLayout col="0" paddingTop="10" horizontalAlignment="center">
                                <Label text="태그" style="font-size: 20px; color: purple;"/>
                            </StackLayout>
                            <StackLayout col="1" horizontalAlignment="left">
                                <CardView elevation="0">
                                    <StackLayout>
                                        <SearchBar v-model="searchkeyword" verticalAlignment="center" :text="uploadcontent" editable="true" class="tagsearch"/>
                                    </StackLayout>
                                </CardView>
                            </StackLayout>
                        </GridLayout>

                        <StackLayout row="2">
                            <!-- 태그 리스트 뷰 -->
                            <FlexboxLayout justifyContent="center" flexWrap="wrap" paddingTop="20" >
                                <CardView v-if="tagshow" elevation="0" v-for="(item,index) in filteredList" paddingTop="20" paddingLeft="15" paddingRight="15">
                                    <StackLayout :class="stylebind(item)" radius="10" paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                                        <Label :text="item.contents" @tap="addtag(item, index)"/>
                                    </StackLayout>
                                </CardView>
                            </FlexboxLayout>
                        </StackLayout>
                    </GridLayout>
                </GridLayout>
            </GridLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import UploadView from './uploadview/UploadView'
    import UploadTag from './uploadview/UploadTag'
    import { mapState } from 'vuex'
    import _ from 'lodash/lodash.min';
    import Constant from '../constant';
    import { imgpickerfunc } from '../lib/imgpicker';
    import { upload } from "../lib/senddata";
    import axios from 'axios';
    import { apiPath } from "../lib/httpconfig";
    import { tag_sort } from "../lib/sortfunc";
    import us from 'underscore/underscore-min';
    const platformModule = require("tns-core-modules/platform");
    export default {
        name: "UploadPage",
        components: { UploadView, UploadTag },
        data: function() {
            return {
                selectedtag: [],
                searchkeyword: "",
                tagdata: null,
                title: "",
                content: "",
                uploadcontent: "",
                titlestyle: "style1",
                imagesource: [],
                counter: 0,
                tagdatas: ""
            }
        },
        name: "UploadTag",
        computed : _.extend({
            filteredList() {
                return this.tagdatas.filter((tag) => {
                    return tag.contents.toLowerCase().includes(this.searchkeyword.toLowerCase())
                })
            },
            tagshow() {
                if(this.searchkeyword == "")
                    return false;
                else
                    return true;
            }
        },mapState([ 'tags' , 'abmanager', 'api', "id_num" ])),
        mounted() {
            this.tags.sort(tag_sort);
        },
        created(){
            this.tagdatas = us.clone(this.tags)
        },
        methods: {
            async addtag(item) {
                let index = await this.tagdatas.findIndex((tag)=> {
                    return tag.contents == item.contents;
                });
                console.log(index);
                this.tagdatas.splice(index,1);
                this.selectedtag.push(item);
            },
            deletetag(num, name) {
                let item = this.selectedtag[num];
                this.tagdatas.push(item);
                this.tagdatas.sort(tag_sort);
                this.selectedtag.splice(num,1);
            },
            stylebind(item) {
                if(item.type == "0")
                    return "clothtag"
                else
                    return "styletag"
            },
            uploadimage() {
                let that = this;
                return (imgpickerfunc(that));
            },
            //Server
            send() {
                console.log(this.title, this.content);
                let textdata = {
                    userId: this.id_num,
                    title: this.title,
                    content: this.content,
                }
                let tagdata = [];
                for(let item in this.selectedtag) {
                    tagdata.push({id: this.selectedtag[item].id});
                    // this.tags.push(item);
                }
                upload(this.imagesource, this.api, textdata, tagdata, this);
            }
        }
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
</style>
