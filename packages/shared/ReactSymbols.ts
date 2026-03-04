// 检测运行环境是否同时支持 Symbol 和 Symbol.for（全局注册表）
// 需要两个条件同时满足：Symbol 存在 且 Symbol.for 可用（部分老版本缺失后者）
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// React 元素的类型标识符，挂载在每个 ReactElement 的 $$typeof 字段上
// 用途：
//   1. 区分 React 元素与普通对象，防止渲染器误处理非法对象
//   2. 防御 XSS 攻击：用户输入的 JSON 无法包含 Symbol，攻击者无法伪造合法的 ReactElement
//
// 使用 Symbol.for 而非 Symbol()：
//   Symbol.for 将 Symbol 注册到全局表，同一 key 在任何模块/iframe 中返回同一个值，
//   确保跨模块实例的 $$typeof 比较仍然有效
//
// 降级方案：不支持 Symbol 的环境（如旧版 IE）使用数字 0xeac7 作为替代标识
// 用于标识 ‌React 元素（React Element）‌ 的后备类型标签（type tag）
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
