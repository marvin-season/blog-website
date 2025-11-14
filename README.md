# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

[github.io](https://marvin-season.github.io/blog-website/)

[fuelstack.icu](http://www.fuelstack.icu/blog-website/)

## Deprecated

https://github.com/marvin-season/registry-template/

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

#### Github Pages Deployment

auto deploy when push to `main` branch

look up `.github/workflows/deploy.yml`

#### Self-Host

`config ssh`

```sh
Host fuelstack
  HostName fuelstack.icu
  User username
  IdentityFile ~/.ssh/private.pem
  IdentitiesOnly yes

```

`ssh fuelstack`执行测试连接

```sh
./deploy.sh

```

Errors You May Encounter:

- Permission denied (publickey).

    - Please check whether your private key is correct and that your account has permission to access the server.
    - Try using `sudo xxx` if necessary.

- Docker error: "Error response from daemon: network not found"
    - Please check your Docker networks, or create one with: `docker network create common_network`
