<template>
    <StackLayout backgroundColor="white" padding="10" id="upload">
        <TextField :text="uploadtitle" hint="제목" editable="true" class="titlestyle"/>
        <CardView class="cardStyle" elevation="0" radius="15">
            <GridLayout rows="*" margin="0">
                <GridLayout verticalAlignment="top">
                    <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="10" paddingRight="10">
                        <TextView :text="uploadcontent" hint="내용을 작성하는 칸입니다" editable="true" class="contentstyle"/>
                    </StackLayout>
                </GridLayout>
                <GridLayout verticalAlignment="bottom" horizontalAlignment="left">
                    <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="16" width="18%" style="border-bottom: solid 1px purple">
                        <Image src="~/assets/images/btn/imageupload.png" stretch="aspectFit" />
                    </StackLayout>
                </GridLayout>
            </GridLayout>
        </CardView>
    </StackLayout>
</template>

<script>
    export default {
        name: "UploadView",
        data: function() {
            return {
                uploadtitle: null,
                uploadcontent: null,
                titlestyle: "style1",
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    #upload {
        font-family: THEmpgtB;
        font-family: THELu;
    }
    .cardStyle {
        /*color: #fff;*/
        width: 92%;
        height: 500px;
        padding: 4%;
        background: #e0d0ea;
        border-radius: 15px;
    }
    .titlestyle {
        border-bottom-width: 1px;
        border-color: purple;
        placeholder-color:purple;
        margin-bottom: 30px;
        padding: 40px;
        color: purple;
    }
    .contentstyle {
        font-size: 15px;
        border-bottom-width: 1px;
        border-color: #e0d0ea;
        placeholder-color:purple;
        width: 95%;
        height: 90%;
        padding: 5px;
        margin-top: 5px;
    }
</style>
