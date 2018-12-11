<template>
    <GridLayout columns="*" rows="*">
        <ScrollView orientation="vertical" row="0">
            <StackLayout backgroundColor="#ffffff">
                <GridLayout rows="70">
                    <CardView>
                        <GridLayout style="background: #ffffff;" paddingTop="15" paddingBottom="15" verticalAlignment="center" horizontalAlignment="center">
                            <GridLayout verticalAlignment="center" horizontalAlignment="center">
                                <Label class="headtext" text="태그 검색" style="color: #6a1495; font-size: 25%; width: 100%; text-align: center;"/>
                            </GridLayout>
                        </GridLayout>
                    </CardView>
                </GridLayout>
                <GridLayout rows="*" columns="*">
                    <image-view row="0" first="0" second="1"></image-view>
                </GridLayout>
            </StackLayout>
        </ScrollView>
        <GridLayout verticalAlignment="bottom" horizontalAlignment="right" width="15%" margin="15">
            <Image src="~/assets/images/btn/tag_search.png" stretch="aspectFit" @tap="research" />
        </GridLayout>
    </GridLayout>
</template>

<script>
    import ImageView from "../imageview/ImageView";
    import Constant from "../../constant";
    export default {
        name: "SearchResult",
        components: { ImageView },
        methods: {
            research() {
                this.$store.dispatch(Constant.RT);
            }
        },
    }
</script>

<style scoped>

</style>
