import { h, ref, reactive } from 'vue';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { useDynamic } from '@mooses/dynamic';

function initializeFormOptions(options) {
    return {
        title: '表单对话框', // 对话框标题
        width: '500px', // 对话框宽度
        initialFormData: {}, // 表单初始数据
        rules: {}, // 表单验证规则
        onSubmit: null, // 提交回调
        onCancel: null, // 取消回调
        ...options,
    };
}

export function useDynamicForm(options = {}) {
    const settings = initializeFormOptions(options);
    const { load, destroyAll } = useDynamic(ElDialog);

    const formData = reactive({ ...settings.initialFormData });
    const formRef = ref(null);

    function loadForm() {
        load(
            h(
                ElForm,
                {
                    model: formData,
                    rules: settings.rules,
                    ref: formRef,
                },
                () => [
                    // 动态生成表单项 (比如用户名和邮箱)
                    h(ElFormItem, { label: '用户名', prop: 'username' }, () => [
                        h(ElInput, {
                            modelValue: formData.username,
                            'onUpdate:modelValue': (val) =>
                                (formData.username = val),
                        }),
                    ]),
                    h(ElFormItem, { label: '邮箱', prop: 'email' }, () => [
                        h(ElInput, {
                            modelValue: formData.email,
                            'onUpdate:modelValue': (val) =>
                                (formData.email = val),
                        }),
                    ]),
                    // 底部的提交和取消按钮
                    h('div', { class: 'dialog-footer' }, [
                        h(
                            ElButton,
                            {
                                onClick: handleCancel,
                            },
                            '取消',
                        ),
                        h(
                            ElButton,
                            {
                                type: 'primary',
                                onClick: handleSubmit,
                            },
                            '提交',
                        ),
                    ]),
                ],
            ),
            {},
            {
                title: settings.title,
                width: settings.width,
                modelValue: true,
                appendToBody: true,
                // 设置关闭对话框的回调
                onClosed: handleCancel,
            },
        );
    }

    // 提交表单逻辑
    function handleSubmit() {
        formRef.value.validate((valid) => {
            if (valid && typeof settings.onSubmit === 'function') {
                settings.onSubmit(formData); // 提交回调
                destroyAll(); // 提交后关闭对话框
            }
        });
    }

    // 取消逻辑
    function handleCancel() {
        if (typeof settings.onCancel === 'function') {
            settings.onCancel(); // 取消回调
        }
        destroyAll(); // 关闭对话框
    }

    return {
        loadForm
    };
}
