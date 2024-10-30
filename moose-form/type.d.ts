interface FormBaseConfig {
    label: string;
    span: number;
    field: string;
    defaultValue: any;
}

// 表单输入框配置
interface FormInputConfig extends FormBaseConfig {
    type: 'input';
}

// 表单输入框配置
interface FormInputNumberConfig extends FormBaseConfig {
    type: 'input-number';
}

// 表单选择器配置
interface FormSelectConfig extends FormBaseConfig {
    type: 'select';
    options: Array<Record<string, unknown>> | Function;
}

// 表单选择器配置 - 虚拟化选择器
interface FormVSelectConfig extends FormBaseConfig {
    type: 'select-v2';
    options: Array<Record<string, unknown>> | Function;
}

// 表单时间选择器配置
interface FormTimePickerConfig extends FormBaseConfig {
    type: 'time-picker';
    isRange: boolean;
    startField: string;
    endField: string;
}

// 表单级联选择器配置
interface FormCascaderConfig extends FormBaseConfig {
    type: 'cascader';
}

// 表单树形选择配置
interface FormTreeSelectConfig extends FormBaseConfig {
    type: 'tree-select';
}

// 表单时间选择配置
interface FormTimeSelectConfig extends FormBaseConfig {
    type: 'time-select';
}

// 表单开关配置
interface FormSwitchConfig extends FormBaseConfig {
    type: 'switch';
}

// 表单滑块配置
interface FormSliderConfig extends FormBaseConfig {
    type: 'slider';
}

// 表单单选框配置
interface FormRadioConfig extends FormBaseConfig {
    type: 'radio';
}

// 表单日期选择器配置
interface FormDatePickerConfig extends FormBaseConfig {
    type: 'date-picker';
}

// 表单颜色选择器配置
interface FormColorPickerConfig extends FormBaseConfig {
    type: 'color-picker';
}

type FormConfig =
    | FormInputConfig
    | FormInputNumberConfig
    | FormSelectConfig
    | FormVSelectConfig
    | FormTimePickerConfig
    | FormCascaderConfig
    | FormTreeSelectConfig
    | FormTimeSelectConfig
    | FormSwitchConfig
    | FormSliderConfig
    | FormRadioConfig
    | FormDatePickerConfig
    | FormColorPickerConfig;
