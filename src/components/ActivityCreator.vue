<template>
    <div class="create-form">
        <h5 class="title is">Create Activity</h5>
        <form>
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input
                        v-model="activity.title"
                        class="input"
                        type="text"
                        placeholder="Read a Book"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Notes</label>
                <div class="control">
                    <textarea
                        v-model="activity.notes"
                        class="textarea"
                        placeholder="Write some notes here"
                    ></textarea>
                </div>
            </div>
            <SelectedTag
                :selectedCategories="activity.selectedCategories"
                @removeTag="unMarkSelected"
            />
            <CategorySelect
                :categories="categoriesList"
                @selectCategory="markSeleted"
            />
            <div class="field is-grouped button-group">
                <div class="control">
                    <button
                        @click="createActivity"
                        class="button is-primary"
                        :class="{ 'is-loading': activityCreateing }"
                        :disabled="buttonIsDisabled"
                        type="button"
                    >
                        createActivity
                    </button>
                </div>
                <div class="control">
                    <button
                        @click="toggleFormDisplay(false)"
                        class="button is-danger"
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import _ from 'lodash';
import { mututions, store } from '@/store';
import CategorySelect from '@/components/CategorySelect';
import SelectedTag from '@/components/SelectedCategoryTag';

const initialData = { title: '', notes: '', selectedCategories: [] };

export default {
    name: 'activity-creator',
    props: {
        categories: {
            type: Object,
            default: () => store.categories,
        },
    },
    data() {
        return {
            activity: { ...initialData },
            activityCreateing: false,
        };
    },

    computed: {
        buttonIsDisabled() {
            return Object.keys(this.activity).some((key) => {
                if (key === 'selectedCategories') {
                    return this.activity[key].length < 1;
                }
                const val = this.activity[key].trim();
                return val === '';
            });
        },
        categoriesList() {
            const transformObj = _.keyBy(
                this.activity.selectedCategories,
                'id'
            );
            return _.mapValues(store.categories, (values, key) => {
                const val = { ...values };
                if (transformObj[key]) val.selected = true;
                return val;
            });
        },
    },
    methods: {
        markSeleted(categoriesId) {
            const { selectedCategories } = this.activity;

            const ids = _.map(selectedCategories, 'id');

            if (!ids.includes(categoriesId))
                this.activity.selectedCategories = selectedCategories.concat(
                    this.categories[categoriesId]
                );
        },
        unMarkSelected(categoriesId) {
            this.activity.selectedCategories = _.filter(
                this.activity.selectedCategories,
                ({ id }) => id !== categoriesId
            );
        },
        async createActivity() {
            this.activityCreateing = true;
            await mututions.createActivity({
                ..._.omit(this.activity, 'selectedCategories'),
                categories: this.activity.selectedCategories,
            });
            this.activityCreateing = false;
            this.activity = { ...initialData };
            mututions.toggleFormDisplay(false);
        },
        ..._.pick(mututions, 'toggleFormDisplay'),
    },
    components: {
        CategorySelect,
        SelectedTag,
    },
};
</script>

<style scoped>
.button-group {
    margin-top: 15px;
}
.title {
    margin: 8px 0;
}
</style>
