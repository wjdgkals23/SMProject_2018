<template>
    <GridLayout rows="60,*">
        <GridLayout row="0" columns="*,4*" paddingTop="15" width="100%">
            <StackLayout col="0" paddingTop="10" horizontalAlignment="center">
                <Label text="태그" style="font-size: 20px; color: purple;"/>
            </StackLayout>
            <StackLayout col="1" horizontalAlignment="left">
                <CardView elevation="0" radius="15">
                    <StackLayout>
                        <SearchBar verticalAlignment="center" :text="uploadcontent" editable="true" class="tagsearch"/>
                    </StackLayout>
                </CardView>
            </StackLayout>
        </GridLayout>
        <StackLayout row="1">

        </StackLayout>
    </GridLayout>
</template>

<script>
    export default {
        name: "UploadTag"
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
</style>
