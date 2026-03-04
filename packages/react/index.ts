// react 包的对外公共入口
// 外部通过 `import React from 'react'` 访问，内部实现细节对消费方不可见
import { jsx } from './src/jsx';

export default {
	// 对应真实 React 的 React.version，可用于运行时环境检测
	version: '0.0.0',
	// 将内部运行时函数 jsx 以 createElement 名称对外暴露
	// 与真实 React API 保持一致：React.createElement(type, config, ...children)
	createElement: jsx
};
