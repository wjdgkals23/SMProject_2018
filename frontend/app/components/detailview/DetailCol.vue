<template>
    <StackLayout>
        <!-- 작가 -->
        <GridLayout rows="60" columns="80,*"class="content" paddingTop="0" paddingBottom="8" paddingLeft="16" paddingRight="8">
            <GridLayout row="0" col="0">
                <Image class="img" src="~/assets/images/default_user.png"></Image>
            </GridLayout>
            <GridLayout row="0" col="1" verticalAlignment="center">
                <Label class="authortext mylight" :text="first.author" textWrap="true"/>
            </GridLayout>
        </GridLayout>
        <!-- 상세 설명 및 사진 -->
        <CardView class="topcardStyle">
            <GridLayout rows="*" columns="*" margin="0">
                <GridLayout row="0">
                    <Image class="img" :src="first.url" stretch="aspectFill" />
                    <StackLayout>
                        <FlexboxLayout alignItems="flex-start" v-for="(item,index) in first.title">
                            <StackLayout :class="textbind(index)">
                                <Label :order="index" class="titletext" :text="item" />
                            </StackLayout>
                        </FlexboxLayout>
                    </StackLayout>
                </GridLayout>
            </GridLayout>
        </CardView>
        <GridLayout class="content" paddingTop="16" paddingBottom="16" paddingLeft="16" paddingRight="16">
            <Label class="authortext mytext" :text="first.content" textWrap="true"/>
        </GridLayout>
        <GridLayout rows="30" columns="60,40,60" verticalAlignment="center" horizontalAlignment="center" paddingBottom="8">
            <GridLayout row="0" col="0" verticalAlignment="center" horizontalAlignment="center">
                <Button text="이전버전" @tap="getprev"/>
            </GridLayout>
            <GridLayout row="0" col="1" verticalAlignment="center" horizontalAlignment="center">
                <Label class="mylight" style="font-size: 25px; color: purple" :text="DetailPageData.version"></Label>
            </GridLayout>
            <GridLayout row="0" col="2" verticalAlignment="center" horizontalAlignment="center">
                <Button text="다음버전" @tap="getnext"/>
            </GridLayout>
        </GridLayout>
        <GridLayout rows="150" verticalAlignment="center" horizontalAlignment="center">
            <Image class="img" src="~/assets/images/versionpannel.png"></Image>
        </GridLayout>
        <!-- 잔여 이미지 -->
        <GridLayout rows="*,*" columns="*" v-for="item in data">
            <StackLayout class="cardStyle">
                <Image class="img" :src="item.url" stretch="aspectFill" />
            </StackLayout>
        </GridLayout>
        <GridLayout rows="*" columns="*">
            <StackLayout row="0">
                <!-- 태그 리스트 뷰 -->
                <FlexboxLayout justifyContent="flex-start" flexWrap="wrap"  paddingTop="5" paddingLeft="15" paddingRight="15" >
                    <CardView :class="stylebind(item)" radius="10" v-for="(item,index) in DetailPageData.tag" >
                        <StackLayout paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                            <Label :text="item.contents" />
                        </StackLayout>
                    </CardView>
                </FlexboxLayout>
            </StackLayout>
        </GridLayout>
    </StackLayout>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';
    import Constant from '../../constant';
    import { detailget } from "../../lib/getpost";
    import DetailPage from '../DetailPage';

    export default {
        name: "DetailCol",
        props: [],
        created() {

        },
        mounted() {
            console.log("dDDDD");
            console.log(this.DetailPageData);
            // console.log(this.coldata.Image[0]);
            this.first = {
                url: this.DetailPageData.Image[0].url,
                title: this.DetailPageData.title.split(" "),
                content: this.DetailPageData.content,
                author: this.DetailPageData.author
            }
            // }
            // console.log(this.coldata.Image.length);

            for(let item in this.DetailPageData.Image) {
                console.log(item);
                if (item !== '0') {
                    this.data.push(this.DetailPageData.Image[item]);
                }
            }
        },
        data: function() {
            return {
                data: [],
                first: {},
                page: DetailPage
            }
        },
        methods: {
            stylebind(item) {
                if(item.type == "0")
                    return "clothtag"
                else
                    return "styletag"
            },
            textbind(index) {
                if(index == 0){
                    return "mytext";
                }
                else{
                    return "mybold";
                }
            },
            getprev() {
                if(this.DetailPageData.version-1 === 0) {
                    alert("첫 번째 버전입니다").then(() => {
                       console.log("first version");
                    });
                }
                else {
                    detailget(this.api, this, { postId: this.DetailPageData.id, userId: this.id_num, version: this.DetailPageData.version-1 });
                }
            },
            getnext() {
                if(this.DetailPageData.version === this.DetailPageData.maxversion) {
                    alert("마지막 버전 입니다.").then(() => {
                        console.log("last version");
                    });
                }
                else {
                    detailget(this.api, this, { postId: this.DetailPageData.id, userId: this.id_num, version: this.DetailPageData.version+1 });
                }
            }
        },
        computed: _.extend({
            likecnt() {
                return "좋아요 " + this.DetailPageData.like_count + "개";
            },
            ifsvb() {
                if(this.id_num == this.DetailPageData.id_num) {
                    return "*, 40"
                }
                else {
                    return "*"
                }
            }
        },mapState([ 'DetailPageData', 'api', 'id_num' ])),
    }
</script>

<style scoped>
    .topcardStyle {
        /*color: #fff;*/
        width: 92%;
        padding: 4%;
        font-size: 35px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }
    .cardStyle {
        /*color: #fff;*/
        width: 100%;
        /*padding: 4%;*/
        margin-top: 25px;
        font-size: 35px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }

    .img {
        /*border-radius: 15px;*/
    }

    .titletext {
        color: #6a1495;
        font-size: 35%;
        letter-spacing: 0.2mm;
        margin: 0;
    }

    .authortext {
        color: #6a1495;
        font-size: 20%;
        margin: 0;
    }

    .content {
        margin-top: 10px;
        margin-bottom: 20px;
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

</style>
