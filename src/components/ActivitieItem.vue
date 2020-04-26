<template>
    <div>
        <ActivityUpdate
            v-if="isupdateMode"
            :activity="activity"
            @toggleMode="toggleMode"
        />
        <ActivityDetails v-else :activity="activity" @toggleMode="toggleMode" />
    </div>
</template>

<script>
import ActivityDetails from './ActivityDetails';
import ActivityUpdate from './ActivityUpdate';

export default {
    props: ['activity'],
    data() {
        return {
            isupdateMode: false,
        };
    },
    methods: {
        toggleMode(value) {
            if (typeof value === 'boolean') this.isupdateMode = value;
            else this.isupdateMode = !this.isupdateMode;
        },
    },
    components: {
        ActivityDetails,
        ActivityUpdate,
    },
};
</script>

<style lang="scss" scoped></style>
