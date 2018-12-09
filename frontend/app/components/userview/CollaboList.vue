<template>
    <StackLayout>
        <CardView class="cardStyle" elevation="20" radius="10" v-for="item in collabolist">
            <GridLayout rows="auto" columns="*" paddingTop="0" paddingBottom="8" paddingLeft="10" paddingRight="10">
                <GridLayout rows="3*,2*" columns="14*,*">
                    <GridLayout row="0" col="0">
                        <Label :text="item.name"></Label>
                    </GridLayout>
                    <GridLayout row="1" col="0">
                        <Label :text="item.name"></Label>
                    </GridLayout>
                    <GridLayout row="0" col="1" rowSpan="2" paddingTop="10" verticalAlignment="top" horizontalAlignment="right" >
                        <Image src="~/assets/images/btn/check.png" stretch="aspectFit" />
                    </GridLayout>
                </GridLayout>
            </GridLayout>
        </CardView>
    </StackLayout>
</template>

<script>
    export default {
        name: "CollaboList",
        data() {
            return {
                collabolist: [
                    { name: "temp" },
                    { name: "temp" },
                    { name: "temp" },
                ]
            }
        }
    }
</script>

<style scoped>
    .cardStyle {
        color: #fff;
        background: #e0d0ea;
        width: 92%;
        padding: 4%;
        margin-top: 25px;
        font-size: 35px;
        /*font-family: THEmpgtB;*/
        /*font-family: THELu;*/
    }
</style>
