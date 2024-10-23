<script setup>
import BasicUsage from '@/views/drag/components/basic-usage.vue';
import BoundedDraggable from '@/views/drag/components/bounded-draggable.vue';
import HandleDraggable from '@/views/drag/components/handle-draggable.vue';
import DirectionalDraggable from '@/views/drag/components/directional-draggable.vue';
import SnapToBoundary from '@/views/drag/components/snap-to-boundary.vue';
import GridAlignment from '@/views/drag/components/grid-alignment.vue';
</script>

<template>
    <div class="drag container">
        <BasicUsage />
        <BoundedDraggable />
        <HandleDraggable />
        <DirectionalDraggable />
        <SnapToBoundary />
        <GridAlignment />
    </div>
</template>

<style lang="scss" scoped>
.drag {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}
</style>
