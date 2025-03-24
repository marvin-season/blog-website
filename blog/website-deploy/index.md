---
title: Website Deploy
---

## Static Website
**借助Nginx来完成部署静态站点。**
+ 编写docker-compose 
+ 配置 nginx
+ docker-compose up -d

`docker-compose.yml`
```shell
services:
  nginx:
    container_name: nginx_resume
    image: nginx:latest
    ports:
      - "9999:80"  # 暴露此ng容器的端口为：8888
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf  # 挂载 Nginx 配置文件
      - ./dist/:/usr/share/nginx/html
    networks:
      - common_network

networks:
  common_network:
    external: true
```
`nginx.conf`
```shell
server {
    listen 80;
    server_name fuelstack.icu;
    include mime.types;
    types {
        application/javascript js mjs; # make sure .mjs file's header convert to be application/javascript
    }
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html; 
        index index.html;
    }
}
```

## Main WebSite
配置一个主站点。分发或导航到其他子站点, 例如：`fuelstack.icu`, `sub.fuelstack.icu`。

`nginx.conf`
```shell
events {
    worker_connections 1024;
}

http {
    # 主站点配置
    server {
        listen 80;
        server_name fuelstack.icu;   
        include mime.types;
        
        # 将 /danny-website 路径映射到网站根目录
        location /danny-website {
            # With alias, your files should be directly in /usr/share/nginx/html/
            # With root, your files should be in /usr/share/nginx/html/danny-website/
            alias /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /danny-website/index.html;
            add_header Cache-Control "public, max-age=3600";
        }

        # 重定向根路径到 /danny-website
        location = / {
            return 301 /danny-website/;
        }
        # 添加 404 错误页面映射
        error_page 404 /404.html;
        # 404 page
        location = /404.html {
            root /usr/share/nginx/html;
            internal;
        }
    }
    # 处理 resume.fuelstack.icu 子域名
    server {
        listen 80;
        server_name resume.fuelstack.icu;

        location / {
            proxy_pass http://nginx_resume:80/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        # 添加 404 错误页面映射
        error_page 404 /404.html;
        # 404 page
        location = /404.html {
            root /usr/share/nginx/html;
            internal;
        }
    }
}
```

## Deploy script
本地构建产物，并将产物推送到服务器，然后在服务器上解压并重启容器。

`deploy.sh`
```shell
#!/bin/bash
# pnpm build

# 服务器信息
SERVER="root@fuelstack.icu"
TARGET_DIR="/root/projects/nginx"

# 检查远程目录是否存在，如果不存在则创建
ssh $SERVER "mkdir -p $TARGET_DIR"

# 生成带时间戳的 zip 文件名
TIMESTAMP=$(date +%Y%m%d%H%M%S)
ZIP_FILE="build_${TIMESTAMP}.zip"

# 压缩本地的 build 目录
echo "压缩本地的 build 目录为 $ZIP_FILE..."
# zip -r $ZIP_FILE ./build
# 使用 -x 选项排除不必要的文件：
zip -r $ZIP_FILE ./build -x "*/__MACOSX*" "*/.DS_Store"

# 上传 zip 文件到服务器
echo "上传 $ZIP_FILE 到服务器..."
scp $ZIP_FILE $SERVER:$TARGET_DIR/
scp docker-compose.yml $SERVER:$TARGET_DIR/
scp nginx.conf $SERVER:$TARGET_DIR/

# 在服务器上解压并替换 build 目录
echo "在服务器上解压并替换 build 目录..."
ssh $SERVER "
  cd $TARGET_DIR && \
  rm -rf build && \
  unzip -o $ZIP_FILE -d $TARGET_DIR && \
  docker-compose up -d --force-recreate --build
"

# 删除本地的 zip 文件
echo "清理本地的 $ZIP_FILE..."
rm $ZIP_FILE

echo "部署完成！"
```