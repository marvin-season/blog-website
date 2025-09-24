---
title: Network
---

## 无法科学上网

### github
解决思路：修改Host

使用 https://www.ipaddress.com/ 查询 github.com 和 raw.githubusercontent.com 的IP地址

最后，修改服务器的/etc/hosts,添加如下两行：

```
140.82.112.4 github.com
185.199.108.133 raw.githubusercontent.com

```