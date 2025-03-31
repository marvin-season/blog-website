## em vs rem

`em` is relative to the font-size of the parent element

`rem` is relative to the font-size of the root element

## http cache

客户端请求静态资源，服务器返回资源，若响应头**Cache-Control: max-age=3600**, 在3600 sec内，该资源**强缓存**，
3600 sec后，进入**缓存协商阶段**：浏览器发送请求头If-None-Match（携带ETag）或 If-Modified-Since（携带Last-Modified），服务器返回304 Not Modified表示资源未变，浏览器使用缓存；返回200则下载新资源

### 强缓存 & 协商缓存

**强缓存**
直接使用本地缓存，无需服务器参与：Cache-Control: max-age=3600

**协商缓存**
浏览器发送请求头If-None-Match（携带ETag）或 If-Modified-Since（携带Last-Modified）。
服务器返回304 Not Modified表示资源未变，浏览器使用缓存；返回200则下载新资源

### 缓存常见问题与解决

**缓存击穿**(Cache Miss风暴)
空缓存策略：返回空对象或默认值，避免请求风暴.

**缓存雪崩**(大量缓存同时失效)
随机过期时间：为缓存设置不同过期时间（如max-age=3600±600）
熔断机制：监控后端服务状态，异常时直接返回缓存或降级数据

**缓存污染**(旧数据未及时清除)
精准过期时间：避免全局设置过长的max-age。
版本化控制：通过URL或请求头区分资源版本（如v1/image.jpg）
