<template>
    <nav class="navbar-nav">
        <div class="navbar-items">
            <a
                @click="$emit('changeFilterOption', opt.all)"
                :class="['navbar-item', isActive(opt.all) && 'is-active']"
            >
                All
            </a>
            <a
                @click="$emit('changeFilterOption', opt.progress)"
                :class="['navbar-item', isActive(opt.progress) && 'is-active']"
            >
                In Progress
            </a>
            <a
                @click="$emit('changeFilterOption', opt.finished)"
                :class="['navbar-item', isActive(opt.finished) && 'is-active']"
            >
                Finished
            </a>
            <a
                @click="$emit('changeFilterOption', opt.started)"
                :class="['navbar-item', isActive(opt.started) && 'is-active']"
            >
                Started
            </a>
        </div>
    </nav>
</template>

<script>
import { filterOpitons as opt } from '@/store';
export default {
    props: ['filterBy'],
    data() {
        return { opt };
    },
    computed: {
        isActive() {
            return (str) => this.filterBy === str;
        },
    },
};
</script>

<style></style>
<style lang="scss" scoped>
.navbar-nav {
    background: #dedede;
    .is-active {
        color: rgb(27, 27, 27);
        background: rgb(168, 168, 168);
    }
    .navbar-items {
        display: flex;
        align-items: center;
        max-width: 400px;

        .navbar-item {
            padding: 1rem 1.5rem;
            &:hover {
                color: rgb(27, 27, 27);
                background: rgb(168, 168, 168);
            }
        }
    }
}
</style>
