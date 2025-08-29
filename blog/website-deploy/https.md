---
title: "HTTPS"
---

## letsencrypt 升级Https
### 申请使用通配符证书（覆盖所有二级域名）
1.	安装 Certbot（在宿主机上即可，不用在容器里）：
```sh
sudo apt update
sudo apt install certbot -y
```

2.	申请通配符证书（DNS 验证）：
```sh
sudo certbot -d "*.fuelstack.icu" -d "fuelstack.icu" --manual --preferred-challenges dns certonly
```

3.	Certbot 会提示你在 DNS 添加 TXT 记录：(控制台会输出信息)
```txt
_acme-challenge.fuelstack.icu  value_from_certbot
```

4.	证书默认位置：

```txt
/etc/letsencrypt/live/fuelstack.icu/fullchain.pem
/etc/letsencrypt/live/fuelstack.icu/privkey.pem
```

###  将证书挂载到 Docker 中的 Nginx