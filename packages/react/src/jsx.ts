import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';

// ReactElement 工厂函数
// 按照 ReactElementType 接口的结构组装一个不可变的 React 元素对象
// 渲染器（react-dom）通过 $$typeof 验证该对象是合法的 ReactElement
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE, // 类型标识符，防止非法对象被当作元素渲染
		type, // 元素类型：字符串标签('div') 或 函数/类组件
		key, // diff 算法标识，已在 jsx() 中统一转为字符串
		ref, // DOM/组件实例引用
		props, // JSX 属性 + children
		__mark: 'Matthew' // 调试标记，用于在开发阶段识别元素来源
	};

	return element;
};

// jsx() 是 JSX 的运行时转换入口
// Babel/SWC 将 <div key="k" ref={r} id="app">child</div> 编译为：
//   jsx('div', { key: 'k', ref: r, id: 'app' }, child)
//
// 参数说明：
//   type         — 元素类型，字符串标签或组件
//   config       — JSX 上的所有属性（包含 key / ref）
//   maybeChildren — 第三个参数起为 children，支持单个或多个
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];

		// key 从 config 中单独提取，不计入 props
		// 统一转为字符串，与 React 源码行为一致
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}

		// ref 从 config 中单独提取，不计入 props
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}

		// 只复制 config 自身的属性，跳过原型链上继承的属性
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}

		// 处理 children：单个子节点直接赋值，多个子节点包装为数组
		// 注意：此处 children 处理与 return 均位于 for...in 循环内部，
		// 实际上会在遍历到第一个非 key/ref 属性时立即返回，是早期实现的局限
		const maybeChildrenLength = maybeChildren.length;
		if (maybeChildrenLength) {
			if (maybeChildrenLength === 1) {
				props.children = maybeChildren[0];
			} else {
				props.children = maybeChildren;
			}
		}

		return ReactElement(type, key, ref, props);
	}
};

// jsxDEV 是开发模式下的 JSX 转换入口（由 @babel/plugin-transform-react-jsx 的 development 模式调用）
// 当前与 jsx 行为完全一致，生产实现中会附加额外的调试信息（如文件名、行号）
export const jsxDEV = jsx;
