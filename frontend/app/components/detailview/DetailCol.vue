<template>
    <StackLayout>
        <!-- 작가 -->
        <GridLayout rows="60" columns="80,*"class="content" paddingTop="0" paddingBottom="8" paddingLeft="16" paddingRight="8">
            <GridLayout row="0" col="0">
                <Image class="img" src="~/assets/images/author.png"></Image>
            </GridLayout>
            <GridLayout row="0" col="1" verticalAlignment="center">
                <Label class="authortext mylight" :text="first.author" textWrap="true"/>
            </GridLayout>
        </GridLayout>
        <!-- 상세 설명 및 사진 -->
        <CardView class="topcardStyle">
            <GridLayout rows="*" columns="*" margin="0">
                <GridLayout row="0">
                    <Image class="img" :src="first.src" stretch="aspectFill" />
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
        <GridLayout class="content" paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="8">
            <Label class="authortext mytext" :text="first.content" textWrap="true"/>
        </GridLayout>
        <GridLayout rows="20" columns="60,30,60" verticalAlignment="center" horizontalAlignment="center" paddingBottom="8">
            <GridLayout row="0" col="0" verticalAlignment="center" horizontalAlignment="center">
                <Image class="img" src="~/assets/images/btn/leftarrow.png"></Image>
            </GridLayout>
            <GridLayout row="0" col="1" verticalAlignment="center" horizontalAlignment="center">
                <Label class="mylight" style="font-size: 25px; color: purple" :text="coldata.version"></Label>
            </GridLayout>
            <GridLayout row="0" col="2" verticalAlignment="center" horizontalAlignment="center">
                <Image class="img" src="~/assets/images/btn/rightarrow.png"></Image>
            </GridLayout>
        </GridLayout>
        <GridLayout rows="150" verticalAlignment="center" horizontalAlignment="center">
            <Image class="img" src="~/assets/images/versionpannel.png"></Image>
        </GridLayout>
        <!-- 잔여 이미지 -->
        <GridLayout rows="*,*" columns="*" v-for="item in data">
            <StackLayout class="cardStyle">
                <Image class="img" :src="item.src" stretch="aspectFill" />
            </StackLayout>
        </GridLayout>
        <GridLayout rows="*" columns="*">
            <StackLayout row="0">
                <!-- 태그 리스트 뷰 -->
                <FlexboxLayout justifyContent="flex-start" flexWrap="wrap"  paddingTop="5" paddingLeft="15" paddingRight="15" >
                    <CardView :class="stylebind(item)" radius="10" v-for="(item,index) in coldata.tag" >
                        <StackLayout paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                            <Label :text="item.name" />
                        </StackLayout>
                    </CardView>
                </FlexboxLayout>
            </StackLayout>
        </GridLayout>
    </StackLayout>
</template>

<script>
    export default {
        name: "DetailCol",
        props: ['coldata'],
        created() {
            // console.log(this.coldata.Image[0]);
            this.first = {
                src: this.coldata.Image[0].src,
                title: this.coldata.title.split(" "),
                content: this.coldata.content,
                author: this.coldata.author
            }
            console.log(this.coldata.Image.length);
            for(let item in this.coldata.Image) {
                console.log(item);
                if(item !== '0') {
                    this.data.push(this.coldata.Image[item]);
                }
            }
        },
        data: function() {
            return {
                data: [],
                first: {},
            }
        },
        methods: {
            stylebind(item) {
                if(item.type == "cloth")
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
            }
        }
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
