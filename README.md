# Website

```
$ yarn
```

### Local Development

```
$ yarn start
```

### Build

```
$ yarn build
```

### Deployment

需要先 build 再 serve,然后在另一个终端执行 deploy

有两种方式

$符不用输入

Using SSH:

```
$ USE_SSH=true yarn deploy
```

// 部署到 github.io 上

```
$ GIT_USER=Moriarty123 yarn deploy
```
