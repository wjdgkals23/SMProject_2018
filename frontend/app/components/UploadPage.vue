<template>
    <GridLayout columns="*" rows="*">
        <GridLayout rows="50,*" columns="*,*">
            <GridLayout row="0" col="0" verticalAlignment="top" horizontalAlignment="left" width="10%">
                <Image src="~/assets/images/icon/leftarrow.png" stretch="aspectFit" />
            </GridLayout>
            <GridLayout row="0" col="1" verticalAlignment="top" horizontalAlignment="right" width="23%">
                <Image verticalAlignment="center" src="~/assets/images/btn/upload.png" stretch="aspectFit" />
            </GridLayout>
            <upload-view row="1" colSpan="2"></upload-view>
            <!--<bottom-navigation row="2" colSpan="2"></bottom-navigation>-->
        </GridLayout>
    </GridLayout>
</template>

<script>
    import BottomNavigation from './navi/BottomNavigation'
    import UploadView from './uploadview/UploadView'
    export default {
        name: "UploadPage",
        components: { BottomNavigation, UploadView },
        methods:{

        },
    }
</script>

<style scoped>

</style>
