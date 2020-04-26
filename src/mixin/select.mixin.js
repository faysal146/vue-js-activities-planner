import { fetchAll } from '@/api/api';

export default {
    name: 'select_mixin',
    data() {
        return {
            categoriesFatching: false,
            categories: [],
            selectedCategories: [],
            error: null,
        };
    },
    watch: {
        categories(category) {
            this.selectedCategories = category.filter((item) => item.selected);
        },
    },
    methods: {
        // addToSelectedCategories(newItem) {
        //     if (Array.isArray(newItem)) {
        //         this.selectedCategories = [
        //             ...this.selectedCategories,
        //             ...newItem,
        //         ];
        //     } else {
        //         this.selectedCategories = [...this.selectedCategories, newItem];
        //     }
        // },
        resetCategories() {
            this.categories = [];
        },
        toggleSelect(selectedCategoryId, value = true) {
            this.categories = [...this.categories].map((item) => {
                if (item.id === selectedCategoryId) {
                    item.selected = value;
                }
                return item;
            });
        },
        async fetchCategories() {
            this.categoriesFatching = true;
            try {
                const res = await fetchAll('categories');
                this.categories = [...res.data];
            } catch (err) {
                this.error =
                    err.message === 'Network Error'
                        ? 'please check your internet connection'
                        : 'some thing went wrong';
            } finally {
                this.categoriesFatching = false;
            }
        },
        refetchCategories() {
            console.log('lkdjfksjd');
            if (this.error) {
                this.fetchCategories();
            }
        },
    },
    created() {
        this.fetchCategories();
    },
};
