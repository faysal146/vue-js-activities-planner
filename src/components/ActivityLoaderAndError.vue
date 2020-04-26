<template>
    <div class="box content" style="padding: 100px">
        <div id="loader" v-show="fetchingActivities"></div>

        <div class="is-size-4 has-text-centered" v-show="error">
            <p>
                {{ error }}
            </p>
            <button @click="fetchActivitys" class="button is-warning is-active">
                Try Again
            </button>
        </div>
    </div>
</template>

<script>
import { mututions } from '@/store';
export default {
    name: 'activity-error',
    props: ['fetchingActivities', 'error'],
    methods: {
        fetchActivitys: mututions.fetchActivity,
    },
};
</script>

<style lang="scss" scoped></style>
