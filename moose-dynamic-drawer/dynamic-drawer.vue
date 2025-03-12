<script setup>
import { ref } from 'vue';
import { ElDrawer } from 'element-plus';

const visible = ref(true);

</script>

<template>
    <ElDrawer class="moose-dynamic-drawer" v-model="visible" v-bind="$attrs">
        <slot></slot>
    </ElDrawer>
</template>

<style scoped lang="scss"></style>
