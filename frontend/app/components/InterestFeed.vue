<template>
    <GridLayout columns="*" rows="*" paddingTop="">
        <GridLayout rows="*,55">
            <GridLayout class="page" rows="50,100,auto,50,*,55">
                <GridLayout row="0"></GridLayout>
                <StackLayout row="1" paddingLeft="30" paddingRight="30">
                    <Label class="mylight title" text="보고싶은" />
                    <Label class="mylight title" text="옷과 스타일을" />
                    <Label class="mytext title" text="검색해보세요." />
                </StackLayout>
                <StackLayout row="2">
                    <!-- 태그 리스트 뷰 -->
                    <FlexboxLayout flexWrap="wrap" paddingTop="10" paddingLeft="15" paddingRight="15">
                        <CardView class="selectedtag" radius="10" v-for="(item,index) in selectedtag">
                            <StackLayout :class="stylebind(item)" paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                                <Label :text="item.name" @tap="deletetag(index)"/>
                            </StackLayout>
                        </CardView>
                    </FlexboxLayout>
                </StackLayout>
                <GridLayout row="3" style="width: 90%" paddingTop="20" verticalAlignment="center" horizontalAlignment="center">
                    <SearchBar borderColor="#e0d0ea" textFieldBackgroundColor="#F4F8FB" v-model="searchkeyword"></SearchBar>
                    <!--style="background: #e0d0ea; border-radius: 5px;"-->
                </GridLayout>
                <StackLayout row="4">
                    <ScrollView>
                        <FlexboxLayout justifyContent="center" flexWrap="wrap" paddingTop="20" paddingLeft="5" paddingRight="5" verticalAlignment="center" horizontalAlignment="center">
                            <CardView v-for="item in filteredList" paddingTop="20">
                                <StackLayout :class="stylebind(item)" radius="10" paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                                    <Label :text="item.name" @tap="addtag(item)"/>
                                </StackLayout>
                            </CardView>
                        </FlexboxLayout>
                    </ScrollView>
                </StackLayout>
                <StackLayout row="5" verticalAlignment="center" horizontalAlignment="center" paddingBottom="10">
                    <Image src="~/assets/images/btn/white_check.png" v-if="!checkshow"/>
                    <Image src="~/assets/images/btn/check.png" v-if="checkshow" @tap="searchdatabytag"/>
                </StackLayout>
            </GridLayout>
            <bottom-navigation row="1"></bottom-navigation>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import BottomNavigation from './navi/BottomNavigation'
    import { mapState, mapMutations } from 'vuex'
    import _ from 'lodash/lodash.min'
    import Constant from '../constant'

    export default {
        name: "InterestFeed",
        components: { BottomNavigation },
        data() {
            return {
                searchkeyword: "",
                selectedtag: [],
            }
        },
        computed : _.extend({
            filteredList() {
                return this.tags.filter(tag => {
                    return tag.name.toLowerCase().includes(this.searchkeyword.toLowerCase())
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
            }
        },mapState([ 'tags' ])),
        methods: {
            addtag(item) {
                return this.selectedtag.push(item);
            },
            deletetag(num) {
                return this.selectedtag.splice(num,1);
            },
            stylebind(item) {
                if(item.type == "cloth")
                    return "clothtag"
                else
                    return "styletag"
            },
            searchdatabytag() {
                let data = "";
                for(let item in this.selectedtag) {
                    data += this.selectedtag[item].name;
                    if(item != this.selectedtag.length-1)
                        data += ",";
                }
                this.$store.dispatch(Constant.STD, data);
            }
        }
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
