<template>
    <GridLayout rows="*" columns="*">
        <image-view row="0" col="0" first="0" second="1"></image-view>
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
