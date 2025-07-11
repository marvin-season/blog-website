# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

[在线Demo 地址1](https://marvin-season.github.io/blog-website/)

[在线 Demo 地址 2](http://www.fuelstack.icu/blog-website/)

### Installation

```
pnpm install
```

### Local Development

```
pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Local Static Deployment

```ssh

pnpm run build
```

```sh
pnpm run publish
```

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
