<template>
    <StackLayout>
        <CardView class="cardStyle" elevation="40" radius="15" v-for="item in data">
            <GridLayout rows="*" columns="*" margin="0">
                <Image class="img" :src="item.src" stretch="aspectFill" />
                <GridLayout verticalAlignment="bottom">
                    <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="16">
                        <Label class="fa" :text="'fa-thumbs-o-up' | fonticon" color="purple"/>
                    </StackLayout>
                </GridLayout>
                <GridLayout verticalAlignment="top">
                    <StackLayout paddingTop="8" paddingBottom="8" paddingLeft="8" paddingRight="16">
                        <Label class="titletext" :text="item.title" textWrap="true"/>
                    </StackLayout>
                </GridLayout>
            </GridLayout>
        </CardView>
    </StackLayout>
</template>

<script>
    export default {
        name: "ImageCol",
        props: ['coldata'],
        created() {
            this.data = this.coldata;
        },
        data: function() {
            return {
                data: null,
            }
        }
    }
</script>

<style scoped>
    .cardStyle {
        /*color: #fff;*/
        width: 92%;
        padding: 4%;
        margin-top: 25px;
        font-size: 35px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }

    .img {
        border-radius: 15px;
    }

    .titletext {
        color: #ffffff;
        font-size: 20%;
        margin: 0;
    }

</style>
