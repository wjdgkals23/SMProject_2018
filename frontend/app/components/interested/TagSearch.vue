<template>
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
                        <Label :text="tagcontent(item.contents)" @tap="deletetag(index)"/>
                    </StackLayout>
                </CardView>
            </FlexboxLayout>
            <StackLayout paddingLeft="15" paddingRight="15" class="hr-light m-x-4" style="color: purple;"></StackLayout>
        </StackLayout>
        <GridLayout row="3" style="width: 90%" paddingTop="20" verticalAlignment="center" horizontalAlignment="center">
            <SearchBar borderColor="purple" textFieldBackgroundColor="white" v-model="searchkeyword"></SearchBar>
            <!--style="background: #e0d0ea; border-radius: 5px;"-->
        </GridLayout>
        <!-- 태그 리스트 뷰 -->
        <GridLayout row="4" rows="*,45" paddingBottom="15">
            <GridLayout row="0">
                <ScrollView>
                    <FlexboxLayout justifyContent="center" flexWrap="wrap" paddingTop="20" paddingLeft="5" paddingRight="5" >
                        <GridLayout columns="auto" paddingTop="10" paddingLeft="5" paddingRight="5" v-for="(item,index) in filteredList">
                            <CardView borderColor="purple" :class="stylebind(item),devicetag" v-if="tagshow" radius="10" elevation="0">
                                <StackLayout paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                                    <Label :text="tagcontent(item.contents)" @tap="addtag(item, index)"/>
                                </StackLayout>
                            </CardView>
                        </GridLayout>
                    </FlexboxLayout>
                </ScrollView>
            </GridLayout>
            <GridLayout verticalAlignment="top" horizontalAlignment="center" row="1" >
                <Image src="~/assets/images/btn/tag_search_white.png" v-if="!checkshow"/>
                <Image src="~/assets/images/btn/tag_search_purple.png" v-if="checkshow" @tap="searchdatabytag"/>
            </GridLayout>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import _ from 'lodash/lodash.min'
    import Constant from '../../constant'
    import { tag_sort } from "../../lib/sortfunc";
    import { tagpostget } from "../../lib/getpost";

    const platform = require("tns-core-modules/platform");

    export default {
        name: "TagSearch",
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
        },mapState([ 'tags', 'id_num', 'api' ])),
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
                if(item.type == "1")
                    return "clothtag"
                else
                    return "styletag"
            },
            searchdatabytag() {
                let data = [];
                for(let item in this.selectedtag) {
                    data.push(this.selectedtag[item].id);
                }
                tagpostget(this.api, this, this.id_num, data);
            },
            tagcontent(con) {
                return "#" + con;
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
        /*box-shadow: 3px mediumpurple;*/
    }
</style>
