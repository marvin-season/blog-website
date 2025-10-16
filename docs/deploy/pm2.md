# 使用 PM2 在 Nginx 服务器部署 Node.js 应用

## 什么是 PM2？

PM2 是一个生产环境的 Node.js 进程管理器，具有内置的负载均衡器。它可以让你的 Node.js 应用永久运行，在应用崩溃时自动重启，并且可以实现零停机重载。

### PM2 的核心功能

- **进程守护**：应用崩溃时自动重启
- **负载均衡**：支持多核 CPU 的集群模式
- **日志管理**：统一管理应用日志
- **监控面板**：实时监控应用状态
- **启动脚本**：服务器重启后自动启动应用
- **零停机重载**：不中断服务更新应用

## 安装 PM2

### 全局安装

```bash
# 使用 npm
npm install -g pm2

# 使用 yarn
yarn global add pm2

# 验证安装
pm2 -v
```

### 更新 PM2

```bash
# 保存当前进程列表
pm2 save

# 更新 PM2
npm install -g pm2@latest

# 更新内存中的 PM2
pm2 update
```

## PM2 基础使用

### 启动应用

```bash
# 启动应用
pm2 start app.js

# 指定应用名称
pm2 start app.js --name "my-app"

# 启动 npm script
pm2 start npm --name "my-app" -- start

# 以集群模式启动（利用所有 CPU 核心）
pm2 start app.js -i max

# 指定实例数量
pm2 start app.js -i 4
```

### 管理应用

```bash
# 查看所有应用
pm2 list
# 或
pm2 ls

# 查看应用详细信息
pm2 show <app-name>

# 重启应用
pm2 restart <app-name>

# 停止应用
pm2 stop <app-name>

# 删除应用
pm2 delete <app-name>

# 重载应用（零停机）
pm2 reload <app-name>

# 停止所有应用
pm2 stop all

# 重启所有应用
pm2 restart all
```

### 监控和日志

```bash
# 实时监控
pm2 monit

# 查看日志
pm2 logs

# 查看特定应用日志
pm2 logs <app-name>

# 清空所有日志
pm2 flush

# 查看应用信息和指标
pm2 info <app-name>
```

## PM2 配置文件（推荐）

使用配置文件可以更好地管理应用配置，支持多应用和复杂配置。

### 生成配置文件

```bash
pm2 ecosystem
```

这会生成一个 `ecosystem.config.js` 文件：

```javascript
module.exports = {
    apps: [
        {
            name: "my-app", // 应用名称
            script: "./app.js", // 启动脚本
            cwd: "/path/to/app", // 应用根目录
            instances: 2, // 实例数量，'max' 表示所有 CPU 核心
            exec_mode: "cluster", // 执行模式：cluster 或 fork
            watch: false, // 监听文件变化自动重启（开发环境可用）
            max_memory_restart: "1G", // 内存超过限制自动重启
            env: {
                NODE_ENV: "production",
                PORT: 3000,
            },
            env_development: {
                NODE_ENV: "development",
                PORT: 3001,
            },
            error_file: "./logs/err.log", // 错误日志路径
            out_file: "./logs/out.log", // 输出日志路径
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            merge_logs: true, // 合并日志
            min_uptime: "10s", // 最小运行时间，小于此时间认为启动失败
            max_restarts: 10, // 异常重启次数
            autorestart: true, // 崩溃自动重启
            cron_restart: "0 0 * * *", // 定时重启（每天凌晨）
        },
    ],
};
```

### 使用配置文件启动

```bash
# 启动配置文件中的所有应用
pm2 start ecosystem.config.js

# 启动指定环境
pm2 start ecosystem.config.js --env production

# 仅启动特定应用
pm2 start ecosystem.config.js --only my-app
```

### Docusaurus 项目示例配置

针对当前项目（Docusaurus），创建 `ecosystem.config.js`：

```javascript
module.exports = {
    apps: [
        {
            name: "danny-website",
            script: "npm",
            args: "start",
            cwd: "/path/to/danny-website",
            instances: 1,
            exec_mode: "fork",
            env: {
                NODE_ENV: "production",
                PORT: 6888,
            },
            error_file: "./logs/pm2-error.log",
            out_file: "./logs/pm2-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss",
            merge_logs: true,
            max_memory_restart: "500M",
            autorestart: true,
        },
    ],
};
```

## PM2 与 Nginx 整合

PM2 负责管理 Node.js 应用进程，Nginx 作为反向代理处理外部请求。

### 架构流程

```
用户请求 → Nginx (80/443) → PM2 管理的 Node.js 应用 (内部端口) → 响应
```

### Nginx 配置示例

```nginx
# Nginx 配置示例
server {
    listen 443 ssl;
    server_name app.fuelstack.icu;

    ssl_certificate /etc/ssl/certs/fullchain.pem;
    ssl_certificate_key /etc/ssl/private/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        # 反向代理到 PM2 管理的 Node.js 应用
        proxy_pass http://localhost:6888;

        # 传递真实客户端信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name app.fuelstack.icu;
    return 301 https://$host$request_uri;
}
```

### 负载均衡配置

如果使用 PM2 集群模式运行多个实例：

```nginx
# 定义上游服务器组
upstream nodejs_cluster {
    least_conn;  # 使用最少连接负载均衡算法
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    listen 443 ssl;
    server_name app.example.com;

    location / {
        proxy_pass http://nodejs_cluster;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 开机自启动

### 设置 PM2 开机自启

```bash
# 生成启动脚本
pm2 startup

# 系统会提示执行一条命令（类似下面），复制执行
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u your-user --hp /home/your-user

# 保存当前 PM2 进程列表
pm2 save

# 冻结进程列表（防止意外修改）
pm2 save --force
```

### 取消开机自启

```bash
pm2 unstartup
```

## 部署流程实战

### 完整部署步骤

```bash
# 1. 连接到服务器
ssh user@your-server.com

# 2. 克隆或更新代码
cd /var/www
git clone https://github.com/your/repo.git
cd repo

# 3. 安装依赖
npm install
# 或
yarn install

# 4. 构建应用（如果需要）
npm run build

# 5. 创建日志目录
mkdir -p logs

# 6. 使用 PM2 启动应用
pm2 start ecosystem.config.js --env production

# 7. 保存 PM2 进程列表
pm2 save

# 8. 设置开机自启（首次部署）
pm2 startup

# 9. 验证应用状态
pm2 list
pm2 logs
```

### 更新部署

```bash
# 1. 拉取最新代码
cd /var/www/your-app
git pull origin main

# 2. 安装新依赖（如果有）
npm install

# 3. 重新构建
npm run build

# 4. 零停机重载应用
pm2 reload ecosystem.config.js --env production

# 5. 查看日志确认更新成功
pm2 logs --lines 100
```

## 常用运维命令

```bash
# 监控所有应用资源占用
pm2 monit

# 显示应用详细信息
pm2 describe <app-name>

# 重置重启次数计数器
pm2 reset <app-name>

# 扩展/缩减实例数量
pm2 scale <app-name> 4

# 备份 PM2 配置
pm2 save

# 恢复 PM2 配置
pm2 resurrect

# 清空所有应用
pm2 delete all

# 更新 PM2
pm2 update
```

## 日志管理

### 日志文件位置

默认日志位置：`~/.pm2/logs/`

```bash
# 查看日志文件路径
pm2 show <app-name> | grep log

# 实时查看日志
pm2 logs <app-name>

# 查看最近 N 行日志
pm2 logs <app-name> --lines 200

# 查看错误日志
pm2 logs <app-name> --err

# 查看输出日志
pm2 logs <app-name> --out
```

### 日志轮转

安装 PM2 日志轮转模块：

```bash
pm2 install pm2-logrotate

# 配置日志轮转
pm2 set pm2-logrotate:max_size 10M        # 单个日志文件最大 10MB
pm2 set pm2-logrotate:retain 30           # 保留 30 个日志文件
pm2 set pm2-logrotate:compress true       # 压缩旧日志
pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
```

## 性能优化建议

### 1. 集群模式

对于 CPU 密集型应用，使用集群模式充分利用多核 CPU：

```javascript
{
  instances: 'max',  // 或具体数字，如 4
  exec_mode: 'cluster'
}
```

### 2. 内存限制

防止内存泄漏导致系统崩溃：

```javascript
{
    max_memory_restart: "1G";
}
```

### 3. 优雅关闭

在应用中监听 SIGINT 信号，确保进程优雅退出：

```javascript
process.on("SIGINT", async () => {
    console.log("收到 SIGINT 信号，准备关闭...");
    // 关闭数据库连接
    await db.close();
    // 完成正在处理的请求
    await server.close();
    process.exit(0);
});
```

### 4. 健康检查

配置 Nginx 健康检查：

```nginx
location /health {
    access_log off;
    proxy_pass http://localhost:3000/health;
}
```

在 Node.js 中实现健康检查端点：

```javascript
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});
```

## 常见问题排查

### 应用启动失败

```bash
# 查看错误日志
pm2 logs <app-name> --err

# 查看详细信息
pm2 describe <app-name>

# 检查端口占用
lsof -i :<port>
netstat -tunlp | grep <port>
```

### 内存泄漏

```bash
# 实时监控内存使用
pm2 monit

# 查看内存使用情况
pm2 list

# 生成堆快照（需要安装 heapdump）
pm2 trigger <app-name> heapdump
```

### 应用频繁重启

检查配置中的 `min_uptime` 和 `max_restarts` 参数，查看启动日志找出原因。

## 最佳实践总结

1. **使用配置文件**：通过 `ecosystem.config.js` 管理应用配置
2. **合理设置实例数**：根据服务器 CPU 核心数和应用特性调整
3. **配置日志轮转**：防止日志文件占满磁盘空间
4. **设置内存限制**：避免内存泄漏导致系统崩溃
5. **使用零停机重载**：生产环境更新时使用 `pm2 reload` 而不是 `restart`
6. **定期备份配置**：使用 `pm2 save` 保存进程列表
7. **监控应用状态**：定期检查 `pm2 list` 和 `pm2 logs`
8. **结合 Nginx**：使用 Nginx 作为反向代理，提供静态文件服务和 SSL 支持
9. **设置开机自启**：确保服务器重启后应用自动运行
10. **实施健康检查**：配置应用健康检查端点，便于监控

## 参考资源

- [PM2 官方文档](https://pm2.keymetrics.io/)
- [PM2 GitHub 仓库](https://github.com/Unitech/pm2)
- [Nginx 官方文档](https://nginx.org/en/docs/)

## 总结

PM2 是 Node.js 生产环境部署的必备工具，结合 Nginx 可以构建高可用、高性能的 Web 应用架构。通过合理的配置和运维实践，可以确保应用稳定运行，快速响应各种异常情况。
