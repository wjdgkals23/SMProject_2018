<template>
    <GridLayout rows="*,60,*">
        <!-- 선택된 태그 -->
        <StackLayout row="0">
            <!-- 태그 리스트 뷰 -->
            <StackLayout col="0" paddingTop="10" horizontalAlignment="center">
                <Label text="선택된 태그" style="font-size: 20px; color: purple;"/>
            </StackLayout>
            <FlexboxLayout flexWrap="wrap" paddingTop="10" paddingLeft="15" paddingRight="15">
                <CardView class="selectedtag" radius="10" v-for="(item,index) in selectedtag">
                    <StackLayout paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                        <Label :text="item.name" @tap="deletetag(index)"/>
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
                <CardView elevation="10">
                    <StackLayout>
                        <SearchBar v-model="searchkeyword" verticalAlignment="center" :text="uploadcontent" editable="true" class="tagsearch"/>
                    </StackLayout>
                </CardView>
            </StackLayout>
        </GridLayout>

        <StackLayout row="2">
            <!-- 태그 리스트 뷰 -->
            <FlexboxLayout flexWrap="wrap" paddingTop="20" paddingLeft="15" paddingRight="15" v-if="tagshow">
                <CardView v-for="item in filteredList">
                    <StackLayout :class="stylebind(item)" radius="10" paddingTop="5" paddingBottom="5" paddingLeft="15" paddingRight="15">
                        <Label :text="item.name" @tap="addtag(item.name)"/>
                    </StackLayout>
                </CardView>
            </FlexboxLayout>
        </StackLayout>
    </GridLayout>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import _ from 'lodash'
    export default {
        data: function() {
            return {
                selectedtag: [],
                searchkeyword: "",
                tagdata: null,
            }
        },
        name: "UploadTag",
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
            }
        },mapState([ 'tags' ])),
        created(){
          this.tagdata = this.tags;
        },
        methods: {
            addtag: function(name) {
                // console.log(name);
                let obj = {
                    name: name
                }
                this.selectedtag.push(obj);
            },
            deletetag: function(num) {
                this.selectedtag.splice(num,1);
            },
            stylebind(item) {
                if(item.type == "cloth")
                    return "clothtag"
                else
                    return "styletag"
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
        background-color: white;
        margin: 10px;
        font-size: 12px;
        border-radius: 10px;
    }

    .selectedtag {
        border-color: purple;
        color: white;
        background-color: darkmagenta;
        margin: 10px;
        font-size: 12px;
    }
</style>
