<template>
    <article class="post">
        <h4 class="activity-title is-capitalized">{{ activity.title }}</h4>
        <div class="activity-settings" @click="isEditMode = !isEditMode">
            <i class="fas fa-cog" />
        </div>
        <p
            v-for="category in activity.categories"
            :key="category.text"
            class="tag is-capitalized has-text-white"
            style="margin-right: 5px"
            :style="{ background: category.background }"
        >
            {{ category.text }}
        </p>
        <p>{{ activity.notes }}</p>
        <div class="media">
            <div class="media-left">
                <p class="image is-32x32">
                    <img :src="require('@/assets/user.png')" />
                </p>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <a href="#">{{ username }}</a> updated
                        {{ activity.updatedAt | formateTime }} &nbsp;
                    </p>
                </div>
            </div>
            <div class="media-right">
                Progress
                <span :style="{ color: progressColor }"
                    >{{ activity.progress }} %</span
                >
            </div>
        </div>
        <div class="activity-controll" v-if="isEditMode">
            <button
                class="button is-warning"
                @click="$emit('toggleMode', true)"
            >
                Edit
            </button>
            <button
                class="button is-danger"
                :class="{ 'is-loading': deleting }"
                @click="deleteActivity"
            >
                Delete
            </button>
        </div>
    </article>
</template>

<script>
import { store, mututions } from '@/store';
import { progressColor } from '@/utils/utils';
export default {
    name: 'ActivityItem',
    props: ['activity'],
    data() {
        return {
            deleting: false,
            isEditMode: false,
        };
    },
    computed: {
        progressColor() {
            return progressColor(parseInt(this.activity.progress));
        },
        username() {
            return store.user.name;
        },
    },
    methods: {
        deleteActivity() {
            this.deleting = true;
            mututions.deleteActivity(this.activity.id);
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
    margin: 20px 0 0 0;
    button {
        margin-right: 10px;
    }
}
</style>
