---
title: 开发工具配置
---

## VSCODE 配置

```json
{
    "editor.fontSize": 15,
    "editor.fontFamily": "JetBrains Mono, monospace",
    "window.commandCenter": true,
    "explorer.confirmDelete": false,
    "window.openFilesInNewWindow": "default",
    "window.openFoldersInNewWindow": "on",
    "editor.gotoLocation.multipleDefinitions": "goto",
    "typescript.experimental.useTsgo": true,
    "typescript.validate.enable": true,
    "typescript.suggest.autoImports": true,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "typescript.preferences.importModuleSpecifier": "non-relative",
    "typescript.referencesCodeLens.enabled": true,
    "typescript.implementationsCodeLens.enabled": true,
    "workbench.colorTheme": "One Dark Pro Flat",
    "workbench.iconTheme": "material-icon-theme",
    "redhat.telemetry.enabled": false,
    "xstate.nestTypegenFiles": false,
    "explorer.fileNesting.patterns": {
        "*.ts": "${capture}.js",
        "*.js": "${capture}.js.map, ${capture}.min.js, ${capture}.d.ts",
        "*.jsx": "${capture}.js",
        "*.tsx": "${capture}.ts",
        "tsconfig.json": "tsconfig.*.json",
        "package.json": "package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb, bun.lock"
    },
    "prettier.requireConfig": true,

    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.removeUnused.ts": "explicit",
        "source.addMissingImports.ts": "explicit"
    },

    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "reactSnippets.settings.prettierEnabled": true
}
```
