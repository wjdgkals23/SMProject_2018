<template>
    <GridLayout columns="*" rows="*">
        <GridLayout rows="*,60">
            <ScrollView orientation="vertical">
                <StackLayout backgroundColor="#3c495e">
                    <CardView width="90%" padding="5%">
                        <GridLayout columns="*,2*" rows="80" backgroundColor="#3c495e">
                            <Label text="0,0" row="0" col="0" backgroundColor="#43b883"/>
                            <Label text="0,1" row="0" col="1" backgroundColor="#1c6b48"/>
                        </GridLayout>
                    </CardView>
                    <Label text="second" height="500" backgroundColor="#289062"/>
                    <Label text="third" height="500" backgroundColor="#1c6b48"/>
                </StackLayout>
            </ScrollView>
            <bottom-navigation @peedch="ch"></bottom-navigation>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import BottomNavigation from './navi/BottomNavigation'
    export default {
        name: "UserPeed",
        components: { BottomNavigation },
        methods:{
            ch: function(message) {
                this.$emit('peedch', message);
            }
        },
    }
</script>

<style scoped>

</style>
