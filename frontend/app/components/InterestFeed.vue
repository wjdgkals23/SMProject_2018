<template>
    <GridLayout columns="*" rows="*" paddingTop="">
        <component row="0" :is="currentView"></component>
    </GridLayout>
</template>

<script>
    import TagSearch from './interested/TagSearch';
    import SearchResult from './interested/SearchResult';
    import { mapState, mapMutations } from 'vuex';
    import _ from 'lodash/lodash.min';

    const platform = require("tns-core-modules/platform");

    export default {
        name: "InterestFeed",
        components: { TagSearch },
        data() {
            return {

            }
        },
        computed : _.extend({
            currentView() {
                if(this.ifm == 1) {
                    return TagSearch;
                }
                else{
                    return SearchResult;
                }
            }
        },mapState([ 'ifm' ])),
    }
</script>

<style scoped>

</style>
