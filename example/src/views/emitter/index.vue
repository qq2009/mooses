<script setup>
import BasicUsage from '@/views/emitter/components/basic-usage.vue';
import EventNamespace from '@/views/emitter/components/event-namespace.vue';
import MaxListenersLimit from '@/views/emitter/components/max-listeners-limit.vue';
import EventPriority from '@/views/emitter/components/event-priority.vue';
import EventTriggerLimit from '@/views/emitter/components/event-trigger-limit.vue';
</script>

<template>
    <div class="moose-emitter container">
        <h3>打开开发者模式查看</h3>
        <BasicUsage />
        <EventNamespace />
        <MaxListenersLimit />
        <EventPriority />
        <EventTriggerLimit />
    </div>
</template>

<style lang="scss" scoped>
.moose-emitter {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}
</style>
