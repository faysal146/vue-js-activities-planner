<template>
    <article class="message has-text-centered error-alert">
        <div class="message-body error-alert-body" style="padding: 12px 1.5em">
            {{ message }}
        </div>
    </article>
</template>

<script>
export default {
    name: 'alert-message',
    props: ['message', 'alert'],
};
</script>

<style lang="scss" scoped>
.error-alert {
    width: 400px;
    position: absolute;
    z-index: 100;
    right: 40px;
    &-body {
        border-color: #ffc872;
        background: #ff1d5dd9;
        color: #fff;
        box-shadow: 0 5px 10px rgba(#000, 0.2);
    }
}
</style>
