// React 内部核心类型定义，供整个 monorepo 共享
// 当前均为 any 占位，早期开发阶段保持灵活性，后续逐步收窄为精确类型

export type Type = any; // ReactElement 的元素类型：字符串标签('div') 或 组件函数/类
export type Key = any; // diff 算法的唯一标识，对应 JSX 的 key 属性
export type Ref = any; // DOM/组件实例引用，对应 JSX 的 ref 属性
export type Props = any; // 组件接收的 props 对象，包含 children
export type ElementType = any; // createElement 第一个参数的类型

// ReactElement 的完整结构
// 由 packages/react/src/jsx.ts 中的 ReactElement 工厂函数按此结构创建
export interface ReactElementType {
	$$typeof: symbol | number; // 类型标识符，值来自 ReactSymbols.ts（Symbol 或降级数字 0xeac7）
	type: ElementType; // 'div' | 'span' | FunctionComponent | ClassComponent 等
	key: Key; // list diff 用的 key，null 表示未设置
	props: Props; // 所有 JSX 属性及 children
	ref: Ref; // ref 引用，null 表示未设置
	__mark: string; // 开发调试字段，标记元素来源，生产环境可忽略
}
