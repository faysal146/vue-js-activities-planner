<template>
    <div id="vueGoalApp">
        <div style="position:relative" v-if="Object.keys(errorMessages).length">
            <AlertMessage
                v-for="(errorMessage, key, index) in errorMessages"
                :message="errorMessage"
                :key="key"
                :style="{
                    top: setOffset(index),
                }"
            />
        </div>
        <Header />
        <Navgations
            :filterBy="filterBy"
            @changeFilterOption="changeFiltering"
        />
        <section class="container">
            <div class="columns">
                <div class="column is-3">
                    <button
                        @click="toggleFormDisplay(true)"
                        class="button is-primary is-info is-medium"
                        style="width:100%"
                        v-if="!isFormDisplayed"
                    >
                        New Activity
                    </button>
                    <ActivityCreator v-else />
                </div>
                <div class="column is-9">
                    <Activities
                        v-if="
                            !this.fetchingActivities &&
                                !this.fetchingActivitiesError
                        "
                        :activities="activities"
                    />
                    <ActivityLoaderAndError
                        v-else
                        :error="fetchingActivitiesError"
                        :fetchingActivities="fetchingActivities"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { store, mututions } from '@/store';
import Activities from '@/components/Activities';
import AlertMessage from '@/components/AlertMessage';
import Header from '@/components/Header';
import Navgations from '@/components/Navgations';
import ActivityCreator from '@/components/ActivityCreator';
import ActivityLoaderAndError from '@/components/ActivityLoaderAndError';
import _ from 'lodash';

export default {
    name: 'app',
    data() {
        return store;
    },
    computed: {
        setOffset() {
            return (index) => {
                const defaultOffset = 20;
                if (index === 0) return defaultOffset + 'px';
                return index * 50 + defaultOffset + 'px';
            };
        },
    },
    components: {
        Activities,
        Navgations,
        Header,
        ActivityCreator,
        ActivityLoaderAndError,
        AlertMessage,
    },
    methods: {
        ..._.pick(mututions, ['toggleFormDisplay']),
        changeFiltering(option) {
            this.filterBy = option;
        },
    },
    created() {
        mututions.fetchUser();
        mututions.fetchActivity();
        mututions.fetchCategories();
    },
};
</script>

<style lang="scss">
html,
body {
    font-family: 'Open Sans', serif;
    background: #f2f6fa;
}
footer {
    background-color: #f2f6fa !important;
}

.example-wrapper {
    margin-left: 30px;
}

.container .columns {
    margin: 3rem 0;
}

aside.menu {
    padding-top: 3rem;
    .menu-list {
        line-height: 1.5;
    }
    .menu-label {
        padding-left: 10px;
        font-weight: 700;
    }
}

#loader {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(110, 110, 110, 0.712);
    border-bottom-color: transparent;
    border-radius: 50%;
    margin: auto;
    animation: loader 0.8s infinite cubic-bezier(0.55, 0.15, 0.45, 0.85);
    @keyframes loader {
        100% {
            transform: rotate(360deg);
        }
    }
}
#wrap {
    padding-top: 0 !important;
}
</style>
