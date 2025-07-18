# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

[在线地址1](https://marvin-season.github.io/blog-website/)

[在线地址 2](http://www.fuelstack.icu/blog-website/)

### Installation

```
yarn install
```

### Local Development

```
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
yarn build
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Github Pages Deployment

auto deploy when push to `main` branch

look up `.github/workflows/deploy.yml`

### Self-Host

config ssh

```sh
Host fuelstack
  HostName fuelstack.icu
  User root
  IdentityFile ~/.ssh/macmini.pem # 你的登陆私钥
  IdentitiesOnly yes

```

`ssh fuelstack`执行测试连接
