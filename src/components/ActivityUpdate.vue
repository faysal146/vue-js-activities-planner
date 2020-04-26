<template>
    <article class="post">
        <div class="field">
            <div class="control">
                <input v-model="title" class="input" type="text" />
            </div>
        </div>
        <div class="field">
            <div class="control">
                <textarea v-model="notes" class="textarea"></textarea>
            </div>
        </div>

        <SelectedTag
            :selectedCategories="categories"
            @removeTag="unMarkSelected"
        />
        <div class="activity-update-progress">
            <CategorySelect
                :categories="categoriesList"
                @selectCategory="markSeleted"
            />
            <div>
                <VueSlideBar
                    style="padding:none"
                    v-model="progress"
                    :min="0"
                    :max="100"
                    :lineHeight="10"
                    :tooltipStyles="toolTipColor"
                    :process-style="toolTipColor"
                />
            </div>
        </div>
        <div class="media mt-4">
            <div class="media-left">
                <p class="image is-32x32">
                    <img :src="require('@/assets/user.png')" />
                </p>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <a href="#">{{ username }}</a>
                    </p>
                </div>
            </div>

            <div class="activity-controll media-right">
                <button
                    :class="{ 'is-loading': updateing }"
                    class="button is-warning"
                    @click="updateActivity"
                >
                    update
                </button>
                <button
                    class="button is-danger"
                    @click="$emit('toggleMode', false)"
                >
                    cancle
                </button>
            </div>
        </div>
    </article>
</template>

<script>
import { progressColor } from '@/utils/utils';
import VueSlideBar from 'vue-slide-bar';
import { store, mututions } from '@/store';
import CategorySelect from '@/components/CategorySelect';
import SelectedTag from '@/components/SelectedCategoryTag';

export default {
    name: 'update-activity',
    props: ['activity'],
    data() {
        return {
            ...this.activity,
            updateing: false,
        };
    },
    components: {
        CategorySelect,
        SelectedTag,
        VueSlideBar,
    },
    computed: {
        username() {
            return store.user.name;
        },
        categoriesList() {
            const transformObj = _.keyBy(this.categories, 'id');
            return _.mapValues(store.categories, (values, key) => {
                const val = { ...values };
                if (transformObj[key]) val.selected = true;
                return val;
            });
        },
        toolTipColor() {
            return {
                backgroundColor: progressColor(this.progress),
                borderColor: progressColor(this.progress),
            };
        },
    },
    methods: {
        markSeleted(categoriesId) {
            const selectedIds = _.map(this.categories, 'id');

            if (!selectedIds.includes(categoriesId)) {
                this.categories = _.concat(
                    this.categories,
                    store.categories[categoriesId]
                );
            }
        },
        unMarkSelected(categoriesId) {
            this.categories = _.filter(
                this.categories,
                ({ id }) => id !== categoriesId
            );
        },
        async updateActivity() {
            this.updateing = true;
            const updateData = {
                ..._.pick(this.$data, [
                    'categories',
                    'notes',
                    'progress',
                    'title',
                ]),
                updatedAt: Date.now(),
            };
            await mututions.updateActivity(this.id, updateData);
            this.updateing = false;
            this.$emit('toggleMode', false);
        },
    },
};
</script>

<style lang="scss" scoped>
.media-left img {
    border-radius: 50%;
}
.media-content p {
    font-size: 14px;
    line-height: 2.3;
    font-weight: 700;
    color: #8f99a3;
}
article.post {
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e6eaee;
}
article.post:last-child {
    padding-bottom: 0;
    border-bottom: none;
}
article.post .activity-title {
    margin-bottom: 5px;
}
.activity-settings {
    float: right;
    font-size: 22px;
    &:hover {
        cursor: pointer;
    }
}
.activity-controll {
    button {
        margin-right: 10px;
    }
}
.mt-4 {
    margin: 15px 0 20px;
}
.activity-update-progress {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
}
</style>
