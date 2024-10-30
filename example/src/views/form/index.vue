<script setup>
import { ref } from 'vue';
import { ElCard, ElButton } from 'element-plus';
import { MForm } from '@mooses/form';
import { options } from './config';

const formRef = ref(null);

async function handle() {
   const ret = await formRef.value.validate();
   if (ret) {
       console.log(ret);
   }
}

</script>

<template>
    <div class="container">
        <ElCard>
            <template #header>
                <h2>基础用法</h2>
            </template>
            <MForm ref="formRef" :options="options" />

            <div>
                <ElButton @click="handle">提交</ElButton>
            </div>
        </ElCard>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}
</style>
