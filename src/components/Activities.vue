<template>
    <div class="box content">
        <ActivitieItem
            v-for="activity in activityFilter"
            :key="activity.id"
            :activity="activity"
        />

        <p v-if="activitiesLength">total {{ activitiesLength }} activities</p>
        <div v-else style="padding: 40px 0">
            <div class="content has-text-centered">
                <p class="is-small">no activities found</p>
                <p class="is-size-3" v-if="filterBy === 'all'">
                    Create New Activitie
                </p>
                <button
                    v-if="filterBy === 'all'"
                    class="button is-danger"
                    @click="toggleFormDisplay(true)"
                >
                    Create
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import ActivitieItem from './ActivitieItem';
import { mututions, store } from '@/store';
import { filterOpitons } from '@/store';
export default {
    props: ['activities'],
    components: {
        ActivitieItem,
    },
    computed: {
        filterBy() {
            return store.filterBy;
        },
        activitiesLength() {
            return Object.keys(this.activityFilter).length;
        },
        activityFilter() {
            const { filterBy } = store;
            let condition;

            if (filterBy === filterOpitons.started) {
                condition = (value) => value === 0;
            } else if (filterBy === filterOpitons.progress) {
                condition = (value) => value > 0 && value < 100;
            } else if (filterBy === filterOpitons.finished) {
                condition = (value) => value === 100;
            } else {
                condition = () => true;
            }
            return _.pickBy(this.activities, (activity) => {
                return condition(activity.progress);
            });
        },
    },
    methods: {
        updateActivity(id, data) {
            this.$emit('updateActivity', id, data);
        },
        ..._.pick(mututions, 'toggleFormDisplay'),
    },
};
</script>

<style lang="scss" scoped></style>
