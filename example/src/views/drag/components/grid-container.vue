<script setup>


const gridItems = [1, 2, 3, 4, 5, 6].map(() => {
    return Array.from({ length: 20 });
});

</script>

<template>
    <div class="grid-container">
        <div v-for="item in gridItems" :key="item" class="row-a">
            <div v-for="a in item" :key="item" class="col-b"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.grid-container {

    .row-a {
        display: flex;
    }

    .col-b {
        width: 60px;
        height: 60px;
        background-color: lightblue;
        outline: 1px solid #333;
    }

}
</style>
