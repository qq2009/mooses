<script setup>
import { ref } from 'vue';
import { MSvgEditor } from '@mooses/svg-editor';
import { ElTree, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { useDynamicDialogMethod } from '@/components/dynamic-dialog/components/config';

const editorRef = ref(null);
const dynamicDialog = useDynamicDialogMethod();

const formData = ref({
    a1: '指挥中心LED屏1',
    a2: '',
});

const data = [
    {
        label: 'AB门系统',
        children: [
            {
                label: '${外来人员}',
                value: 1,
            },
            {
                label: '${外来车辆}',
                value: 2,
            },
        ],
    },
    {
        label: '罪犯统计',
        children: [
            {
                label: '${在册罪犯}',
                value: 3,
            },
            {
                label: '${在押罪犯}',
                value: 4,
            },
            {
                label: '${严管罪犯}',
                value: 5,
            },
        ],
    },
];

const defaultProps = {
    children: 'children',
    label: 'label',
};

const aa = {
    text: {
        t: 'text',
        content: '文本标签',
    },
    line: {
        t: 'line',
    },
    rect: {
        t: 'rect',
    },
    table: {
        t: 'table',
        content: '${外来人员}',
    },
};

function onDragStart(event, type) {
    const opt = aa[type];
    event.dataTransfer.setData('options', JSON.stringify(opt));
}

function handleDragDrop(opt) {
    const { ctx, x, y, options } = opt;
    const { t, content } = JSON.parse(options);
    switch (t) {
        case 'text': {
            ctx.textManager.addText(x, y, content);
            break;
        }
        case 'line': {
            ctx.lineManager.addLine(x, y, x + 100, y);
            break;
        }
        case 'rect': {
            ctx.rectManager.addRect(x, y, 100, 50);
            break;
        }
    }
}

function handleDelayer(id) {
    console.log(id);
}

function handleRender() {
    const astString = JSON.stringify([
        {
            id: 'SvgjsRect1015',
            label: '背景',
            type: 'background-panel',
            attr: {
                width: 800,
                height: 600,
                fill: '#ffffff',
            },
            children: [
                {
                    id: 'SvgjsLine1016',
                    label: '直线',
                    type: 'line-panel',
                    attr: {
                        plot: [189, 100, 289, 100],
                        color: '#e81616',
                        strokeWidth: 1,
                        strokeDasharray: '5,5',
                        transform:
                            'matrix(0.9656879778101767,0.25970508180028073,-0.25970508180028073,0.9656879778101767,34.171081483395625,-58.63831233128468)',
                    },
                    children: [],
                },
                {
                    id: 'SvgjsText1017',
                    label: '文字标签',
                    type: 'text-panel',
                    attr: {
                        x: 203,
                        y: 354,
                        content: '文本标签',
                        fontSize: 16,
                        fill: '#000000',
                        fontFamily: '宋体',
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                    },
                    children: [],
                },
                {
                    id: 'SvgjsText1018',
                    label: '文字标签',
                    type: 'text-panel',
                    attr: {
                        x: 420,
                        y: 297,
                        content: '文本标签',
                        fontSize: 16,
                        fill: '#000000',
                        fontFamily: '宋体',
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                    },
                    children: [],
                },
            ],
        },
    ]);

    editorRef.value.render(astString);
}

function save() {
    const ast = editorRef.value.generateAST();
    console.log(ast);
}
</script>

<template>
    <div class="read-write">
        <div class="read-write__head">
            <h2 class="head-title">信息发布</h2>

            <div class="head-btn">
                <ElButton @click="handleRender">渲染</ElButton>
                <ElButton>发布</ElButton>
                <ElButton @click="save">保存</ElButton>
                <ElButton @click="() => dynamicDialog.close()">退出</ElButton>
            </div>
        </div>

        <div class="read-write__body">
            <div class="body__left">
                <div class="base-info">
                    <ElForm>
                        <ElFormItem>
                            <ElInput v-model="formData.a1" readonly />
                        </ElFormItem>
                        <ElFormItem>
                            <ElInput v-model="formData.a2" placeholder="标题" />
                        </ElFormItem>
                    </ElForm>
                </div>

                <div class="control">
                    <div
                        draggable="true"
                        @dragstart="($event) => onDragStart($event, 'text')"
                    >
                        文本
                    </div>

                    <div
                        draggable="true"
                        @dragstart="($event) => onDragStart($event, 'line')"
                    >
                        直线
                    </div>

                    <div
                        draggable="true"
                        @dragstart="($event) => onDragStart($event, 'rect')"
                    >
                        矩形
                    </div>

                    <div
                        draggable="true"
                        @dragstart="($event) => onDragStart($event, 'table')"
                    >
                        业务数据
                    </div>
                </div>

                <div class="dynamic-info">
                    <h3 class="dynamic-info__title">动态信息</h3>
                </div>
                <ElTree :data="data" :props="defaultProps" />
            </div>

            <MSvgEditor
                ref="editorRef"
                :is-toolbar="false"
                @drag-drop="handleDragDrop"
                @delayer="handleDelayer"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.read-write {
    height: 100vh;

    &__head {
        height: 60px;
        border-bottom: 1px solid #ccc;

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;

        .head-title {
            font-size: 24px;
        }

        .head-btn {
        }
    }

    &__body {
        display: flex;
        height: calc(100vh - 64px);

        .body__left {
            width: 16vw;

            .control {
                min-height: 200px;
            }

            .dynamic-info__title {
                text-align: center;
                font-size: 20px;
                border-bottom: 1px solid #ccc;
            }
        }
    }
}
</style>
