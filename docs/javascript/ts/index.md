# TS

## 枚举关联类型

```ts
enum ECategory {
    A,
    B,
    C,
}

// 关联类型
// type TCategory = ECategory.A | ECategory.B | ECategory.C; // 不推荐
type TCategory = `${ECategory}; // 推荐

```
