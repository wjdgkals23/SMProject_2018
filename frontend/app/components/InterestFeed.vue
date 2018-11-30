<template>
    <GridLayout columns="*" rows="*" paddingTop="">
        <GridLayout class="page" rows="40,100,auto,50,*">
            <GridLayout row="0"></GridLayout>
            <StackLayout row="1" paddingLeft="30" paddingRight="30">
                <Label class="mylight title" text="보고싶은" />
                <Label class="mylight title" text="옷과 스타일을" />
                <Label class="mytext title" text="검색해보세요." />
            </StackLayout>
            <StackLayout row="2">
                <!-- 선택된 태그 리스트 뷰 -->
                <FlexboxLayout flexWrap="wrap" paddingTop="10" paddingLeft="15" paddingRight="15">
                    <CardView elevation="0" :class="devicetag" radius="10" v-for="(item,index) in selectedtag">
                        <StackLayout :class="stylebind(item)" paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                            <Label :text="item.contents" @tap="deletetag(index)"/>
                        </StackLayout>
                    </CardView>
                </FlexboxLayout>
            </StackLayout>
            <GridLayout row="3" style="width: 90%" paddingTop="20" verticalAlignment="center" horizontalAlignment="center">
                <SearchBar borderColor="purple" textFieldBackgroundColor="white" v-model="searchkeyword"></SearchBar>
                <!--style="background: #e0d0ea; border-radius: 5px;"-->
            </GridLayout>
            <!-- 태그 리스트 뷰 -->
            <GridLayout row="4" rows="*,55" paddingBottom="15">
                <GridLayout row="0">
                    <ScrollView>
                        <FlexboxLayout justifyContent="center" flexWrap="wrap" paddingTop="20" paddingLeft="5" paddingRight="5" >
                            <CardView v-if="tagshow" elevation="0" :class="devicetag" v-for="(item,index) in filteredList">
                                <StackLayout :class="stylebind(item)" paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                                    <Label :text="item.contents" @tap="addtag(item, index)"/>
                                </StackLayout>
                            </CardView>
                        </FlexboxLayout>
                    </ScrollView>
                </GridLayout>
                <StackLayout verticalAlignment="top" horizontalAlignment="center" row="1" >
                    <Image src="~/assets/images/btn/white_check.png" v-if="!checkshow"/>
                    <Image src="~/assets/images/btn/check.png" v-if="checkshow" @tap="searchdatabytag"/>
                </StackLayout>
            </GridLayout>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import BottomNavigation from './navi/BottomNavigation'
    import { mapState, mapMutations } from 'vuex'
    import _ from 'lodash/lodash.min'
    import Constant from '../constant'
    import { tag_sort } from "../lib/sortfunc";

    const platform = require("tns-core-modules/platform");

    export default {
        name: "InterestFeed",
        components: { BottomNavigation },
        mounted() {
            this.tags.sort(tag_sort);
        },
        data() {
            return {
                searchkeyword: "",
                selectedtag: [],
            }
        },
        computed : _.extend({
            filteredList() {
                return this.tags.filter(tag => {
                    return tag.contents.toLowerCase().includes(this.searchkeyword.toLowerCase())
                })
            },
            tagshow() {
                if(this.searchkeyword == "")
                    return false;
                else
                    return true;
            },
            checkshow() {
                if(this.selectedtag.length == 0)
                    return false;
                else
                    return true;
            },
            devicetag() {
                if(platform.device.os == "Android"){
                    return "tagcardstyle"
                }
                else {
                    return ""
                }
            }
        },mapState([ 'tags' ])),
        methods: {
            async addtag(item) {
                let index = await this.tags.findIndex((tag)=> {
                    return tag.contents == item.contents;
                });
                console.log(index);
                this.tags.splice(index,1);
                this.selectedtag.push(item);
            },
            deletetag(num) {
                let item = this.selectedtag[num];
                this.tags.push(item);
                this.tags.sort(tag_sort);
                this.selectedtag.splice(num,1);
            },
            stylebind(item) {
                if(item.type == "0")
                    return "clothtag"
                else
                    return "styletag"
            },
            searchdatabytag() {
                let data = "";
                for(let item in this.selectedtag) {
                    data += this.selectedtag[item].id;
                    if(item != this.selectedtag.length-1)
                        data += ",";
                }
                this.$store.dispatch(Constant.SETD, data);
            }
        },
    }
</script>

<style scoped>
    .page {
        background: #e0d0ea;
    }
    .title {
        font-size: 30px;
        color: #6a1495;
    }

    .tagcardstyle {
        background: #e0d0ea;
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
        background-color: white;
        margin: 10px;
        font-size: 12px;
        border-radius: 10px;
        border-color: purple;
        /*box-shadow: 3px mediumpurple;*/
    }
</style>
