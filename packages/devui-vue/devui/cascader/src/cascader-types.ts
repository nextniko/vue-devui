import type { PropType, ExtractPropTypes, Ref } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'

type TriggerTypes = 'hover'|'click'

export interface CascaderItem {
  label: string
  value: number | string
  isLeaf?: boolean
  children?: CascaderItem[]
  checked?: boolean
  halfChecked?: boolean
  disabled?: boolean
  active?: boolean
  _loading?: boolean
  icon?: string
  // 用户可以传入自定义属性，并在dropDownItemTemplate中使用
  [prop: string]: any
}

type CascaderModelValue = number[]
export type CascaderValueType = CascaderModelValue | [CascaderModelValue]
export const cascaderProps = {
  /**
   * 可选，指定展开次级菜单方式
   * @description 可选择的值 'hover', 'click'
   * @type {('hover'|'click')}
   * @default 'hover'
   */
  trigger: {
    type: String as PropType<TriggerTypes>,
    default: 'hover'
  },
  /**
   * 必选，级联器的菜单信息
   * @type {CascaderItem[]}
   * @default []
   */
  options: {
    type: Array as PropType<CascaderItem[]>,
    default: [],
    required: true
  },
  /**
   * 可选，级联器是否开启多选模式，开启后为 checkbox 选择
   * @type {Boolean}
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false
  },
  /**
   * 可选，级联器选中项是否显示路径，仅单选模式下生效
   */
  showPath: {
    type: Boolean,
    default: false
  },
  /**
   * 可选，需要选中项的value集合
   * @type {CascaderValueType}
   * @default []
   */
  value: {
    type: Array as PropType<CascaderValueType>,
    default: []
  },
  /**
   * 可选，级联器是否禁用
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 可选，没有选择时的输入框展示信息
   * @type {string}
   * @default '''
   */
  placeholder: {
    type: String,
    default: ''
  },
  change: {
    type: Function as PropType<(v: CascaderValueType, k: CascaderItem[]) => void>,
    default: undefined
  },
} as const

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export interface PopupTypes {
  menuShow: Ref<boolean>
  menuOpenClass: Ref<string>
  stopDefault: Ref<boolean>
  openPopup:  (e?: MouseEvent) => void
  updateStopDefaultType: () => void
}

export type CaascaderOptionsType = UnwrapNestedRefs<[CascaderItem[]]>
export interface OptionsCallback {
  cascaderOptions: never | CaascaderOptionsType
  changeCascaderIndexs: (optionItem: CascaderItem, ulIndex: number) => void
}

// type cascaderItemExtendsProps = 'trigger'
// export type PickCascader = Pick<CascaderProps, cascaderItemExtendsProps>
// export interface CascaderItemNeedType extends PickCascader {
  export interface CascaderItemNeedType {
  valueCache?: CascaderValueType
  trigger?: TriggerTypes
  value?: CascaderValueType
  inputValueCache?: Ref<string>
  confirmInputValueFlg?: Ref<boolean>
  multiple?: boolean
  stopDefault?: Ref<boolean>
  activeIndexs?: number[]
  tagList?: UnwrapNestedRefs<CascaderItem[]>
}
export interface UseCascaderItemCallback {
  cascaderItemNeedProps: CascaderItemNeedType
  // getInputValue: (a: string, b?: CascaderItem[], c?: Ref<boolean>) => void
}

export type CheckedType = 'checked' | 'halfChecked'
export interface UseCascaderMultipleCallback {
  // tagList: UnwrapNestedRefs<CascaderItem[]>
  addTagList: (arr: CascaderItem[], singleItem: CascaderItem) => void
  deleteTagList: (arr: CascaderItem[], singleItem: CascaderItem) => void
  initTagList: (arr: CascaderItem[]) => void
  initMultipleCascaderItem: (targetValues: number[], cascaderOptions: CascaderItem[], tagList: CascaderItem[]) => void
  updateCheckOptionStatus: (node: CascaderItem, options: CaascaderOptionsType, ulIndex: number) => void
  initActiveIndexs: (values: CascaderValueType, currentOption: CascaderItem[], index: number, activeIndexs: number[]) => void
  updateCheckStatusLoop: (node: CascaderItem, type: CheckedType,  ulIndex: number, status?: boolean) => void
  getParentNode: (childValue: string | number, options: CaascaderOptionsType, ulIndex: number) => CascaderItem
  updateParentNodeStatus: (node: CascaderItem, options: CaascaderOptionsType, ulIndex: number) => void
  getInputValue: (label: string, arr: CascaderItem[], inputValueCache: Ref<string>, showPath?: boolean) => void
}
