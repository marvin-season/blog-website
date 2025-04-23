# TypeScript 面试题全集（含答案解析）

## 🌱 一、基础语法与类型系统

### 1. TypeScript 中的基础类型有哪些？请举例说明。
- **回答**：包括 `number`、`string`、`boolean`、`null`、`undefined`、`symbol`、`bigint`、`void`、`any`、`unknown`、`never`。
- **示例**：
```ts
let age: number = 25;
let name: string = "张三";
let flag: boolean = true;
```

### 2. `any`、`unknown`、`never` 区别？
- `any`: 放弃类型检查，绕过 TS 的类型保护。
- `unknown`: 安全的任意类型，使用前需做类型判断。
- `never`: 表示不可能存在的值，例如函数抛异常或死循环。

### 3. `void` 和 `undefined` 区别？
- `void`: 函数无返回值。
- `undefined`: 实际是一个值，可赋值使用。

### 4. 什么是字面量类型？
- **回答**：指定变量只能是某些确定的值。
```ts
let direction: "left" | "right" = "left";
```

### 5. 类型断言写法？
```ts
const a = someValue as string;
const b = <string>someValue;
```

---

## 🧩 二、类型体操与泛型

### 6. `type` vs `interface` 区别
- `interface` 可合并声明、可被类实现。
- `type` 更灵活，支持联合、交叉、条件类型等。

### 7. interface 能否定义联合类型？
- 不能，type 才支持联合：
```ts
type A = { a: number } | { b: string };
```

### 8. key 工具类型示例
```ts
type Keys = keyof { a: string; b: number }; // "a" | "b"
type ReadonlyAll<T> = { readonly [K in keyof T]: T[K] };
```

### 9. 泛型函数
```ts
function identity<T>(arg: T): T {
  return arg;
}
```

### 10. 泛型约束
```ts
function getLength<T extends { length: number }>(x: T): number {
  return x.length;
}
```

---

## 🧠 三、常见手写工具类型

### 11. 实现 `Partial<T>`
```ts
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
```

### 12. 实现 `Pick<T, K>`
```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### 13. 实现 `Omit<T, K>`
```ts
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

### 14. 实现 `DeepReadonly<T>`
```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

---

## 🏗 四、实战类型应用

### 15. Axios 响应类型封装
```ts
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}
```

### 16. Redux 状态类型定义
```ts
interface State {
  user: {
    name: string;
    age: number;
  };
  loading: boolean;
}
```

### 17. React 中 props 泛型
```ts
interface Props<T> {
  data: T;
  onSelect: (item: T) => void;
}
```

---

## 🚨 五、类型推断与陷阱

### 18. 推断区别
```ts
const a = [1, 2, 3]; // number[]
const b: number[] = [1, 2, 3]; // number[]
const c = [1, "2", true]; // (string | number | boolean)[]
```

### 19. `as const` 的作用
- 把对象所有属性标记为 readonly 和精确字面量类型。

### 20. infer 使用
```ts
type ReturnType<T> = T extends (...args: any) => infer R ? R : any;
```

---

## 🔥 六、挑战类型题

### 21. 实现 `Flatten<T>`
```ts
type Flatten<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...Flatten<F>, ...Flatten<R>]
    : [F, ...Flatten<R>]
  : [];
```

### 22. 实现 `IsUnion<T>`
```ts
type IsUnion<T, C = T> = T extends any ? ([C] extends [T] ? false : true) : never;
```

### 23. 实现 `TupleToUnion<T>`
```ts
type TupleToUnion<T extends any[]> = T[number];
```

---

## 📘 七、TS 最佳实践

### 24. tsconfig 推荐配置
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "esModuleInterop": true,
  "skipLibCheck": true
}
```

### 25. 声明模块文件 `d.ts`
```ts
declare module "*.svg" {
  const content: string;
  export default content;
}
```

---

> 如需继续补充 TypeScript 类型体操 进阶题、结合 React Hooks 类型使用、项目实战案例、常见源码解析，欢迎继续提问～

