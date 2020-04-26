<template>
    <div class="dropdown is-up" :class="{ 'is-active': showDropDown }">
        <div class="dropdown-trigger">
            <button
                id="select-category"
                class="button"
                :class="{ 'is-loading': loading }"
                aria-haspopup="true"
                aria-controls="dropdown-menu3"
                type="button"
                @click="handleClick"
            >
                <span>Select Categories</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-up"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu3" role="menu">
            <ul class="dropdown-content" style="padding:0">
                <li
                    v-for="category in categories"
                    :key="category.id"
                    @click="selectItem(category)"
                    class="dropdown-item select-item"
                    style="margin-top:0;"
                    :style="category.selected && styles"
                >
                    {{ category.text }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    props: ['categories', 'loading'],
    data() {
        return {
            showDropDown: false,
            styles: {
                background: 'hsl(0, 0%, 86%)',
                opacity: 0.9,
            },
        };
    },
    methods: {
        selectItem(category) {
            this.$emit('selectCategory', category.id);
            this.showDropDown = false;
        },
        handleClick() {
            this.showDropDown = !this.showDropDown;
        },
    },
};
</script>

<style lang="scss">
.select-item {
    cursor: pointer;
    &:hover {
        background: hsl(0, 0%, 86%);
    }
}
#select-category.is-loading::after {
    border: 2px solid #888888;
    border-right-color: transparent;
    border-top-color: transparent;
}
</style>
