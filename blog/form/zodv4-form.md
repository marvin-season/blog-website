---
slug: zodv4-form
title: Zodv4-Form
authors: [marvin-season]
tags: [react, zod, form]
date: "2025-10-16"
---

# Zodv4-Form

## What

A headless form library based on Zod v4.

```sh
npm install zodv4-form
```

## How

Using Zod v4 to validate the form data.

`Zod Schema -> Zod JSON Schema -> Dynamic Form Component`

## Features

- ✅ Validate the form data
- ✅ Generate the form component automatically and dynamically
- ✅ Customize the form component
- ✅ Built-in string component

<!-- truncate -->

## Example

```tsx
import { createRoot } from "react-dom/client";
import { defineComponents, ZodV4Form } from "./ZodV4Form";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1),
    email: z.email(),
    age: z.number().min(18),
});
const components = defineComponents({
    number: (props) => <input type="number" {...props} />,
});
createRoot(document.getElementById("root") as HTMLElement)?.render(
    <ZodV4Form
        schema={schema}
        onSubmit={console.log}
        components={components}
    />,
);
```

## Customize

you can use `meta.component` or `meta.type` to customize the component.

Under the hood, `const component = fieldJsonSchema.component || fieldJsonSchema.type`

```tsx
const components = defineComponents({
    "custom-component": (props) => <input type="number" {...props} />,
});

const schema = z.object({
    level: z
        .enum(["level1", "level2", "level3"])
        .meta({
            label: "Level",
            description: "The level of the user",
            component: "custom-component", // or type: "custom-component"
        })
        .default("level1"),
});
```
