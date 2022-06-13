<template>
    <div :style="{color: color, borderColor: color}" class="__item">{{ streamer_handle }}</div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'handle',
    props: {
        streamer_handle: String,
        color: {
            default: "#bf94ff",
            type: String,
        }
    }
}
</script>

<style scoped>
.__item {
    border-style: solid;
    border-color: #bf94ff;
    width: auto;
    margin: 10px 10px 10px 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    color: #bf94ff;
    cursor: pointer;
    padding: 8px 8px 8px 8px;
};

.__item:hover {
    opacity: .8;
    cursor:pointer;
}
</style>