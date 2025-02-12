import { ref } from 'vue';
import { defineTableColumns } from '@mooses/table';
export const columnsA = defineTableColumns([
    {
        type: 'index',
        label: 'Name',
        prop: 'name',
    },
    {
        label: 'Date',
        prop: 'date',
    },
    {
        label: 'Address',
        prop: 'address',
    },
]);

export const columnsB = defineTableColumns([
    {
        label: 'Name',
        prop: 'name',
    },
    {
        label: 'Date',
        formatter({ date }) {
            return `送达时间:${date}`;
        },
    },
    {
        label: 'Address',
        prop: 'address',
        formatter({ address }) {
            return `送达地址:${address}`;
        },
    },
]);

export const columnsC = defineTableColumns([
    {
        label: 'Name',
        prop: 'name',
    },
    {
        slot: 'date',
    },
    {
        label: 'Address',
        prop: 'address',
    },
]);

export const datum = ref([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]);
