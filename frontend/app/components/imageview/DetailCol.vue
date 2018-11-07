<template>
    <StackLayout>
        <GridLayout rows="60" columns="80,*"class="content" paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="8">
            <GridLayout row="0" col="0">
                <Image class="img" src="~/assets/images/icon/person.png"></Image>
            </GridLayout>
            <GridLayout row="0" col="1" verticalAlignment="center">
                <Label class="authortext mylight" :text="first.author" textWrap="true"/>
            </GridLayout>
        </GridLayout>
        <CardView class="cardStyle">
            <GridLayout rows="*,*" columns="*" margin="0">
                <GridLayout row="0">
                    <Image class="img" :src="first.src" stretch="aspectFill" />
                    <GridLayout verticalAlignment="top">
                        <StackLayout paddingTop="8">
                            <Label class="titletext" :text="first.title" textWrap="true"/>
                        </StackLayout>
                    </GridLayout>
                </GridLayout>
            </GridLayout>
        </CardView>
        <GridLayout class="content" paddingTop="8" paddingBottom="8" paddingLeft="16" paddingRight="8">
            <Label class="authortext mytext" :text="first.content" textWrap="true"/>
        </GridLayout>
        <CardView class="cardStyle" v-for="item in data">
            <GridLayout rows="*" columns="*">
                <StackLayout>
                    <Image class="img" :src="item.src" stretch="aspectFill" />
                </StackLayout>
            </GridLayout>
        </CardView>
    </StackLayout>
</template>

<script>
    export default {
        name: "DetailCol",
        props: ['coldata'],
        created() {
            // console.log(this.coldata.Image[0]);
            this.first = {
                src: this.coldata.Image[0].src,
                title: this.coldata.title,
                content: this.coldata.content,
                author: this.coldata.author
            }
            this.coldata.Image.splice(0,1);
            console.log(this.coldata.Image);
            this.data = this.coldata.Image;
        },
        data: function() {
            return {
                data: null,
                first: {},
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
        /*border-radius: 15px;*/
    }

    .titletext {
        color: #6a1495;
        font-size: 25%;
        margin: 0;
    }

    .authortext {
        color: #6a1495;
        font-size: 20%;
        margin: 0;
    }

    .content {
        margin-top: 10px;
        margin-bottom: 20px;
    }

</style>
