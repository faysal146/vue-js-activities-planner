<template>
    <div class="selected-categories">
        <span
            class="tag is-small has-text-white select-category"
            v-for="category in selectedCategories"
            :key="category.id"
            :style="{ background: category.background }"
        >
            {{ category.text }}
            <button
                class="delete is-small"
                type="button"
                @click="$emit('removeTag', category.id)"
            ></button>
        </span>
    </div>
</template>

<script>
export default {
    props: ['selectedCategories'],
};
</script>

<style lang="scss" scoped>
.selected-categories {
    margin: 10px 0;
}
.select-category {
    margin-right: 3px;
    margin-bottom: 10px;
}
</style>
