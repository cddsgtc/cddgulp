# cddgulp

版本：1.0.0

1.0版本终于发布，晚上了各种功能。

## 说明

	这是一个关于gulp脚手架的项目主要实现的功能如下
1. 实时预览
2. babel支持
3. 压缩js
4. 在项目完成时进行打包复制到别的文件夹"../../packageNew/.."
5. 压缩图片
6. 对静态资源进行hash添加指纹

## 使用方法

**以下命令都必须要进入app目录才能实现**

命令

### 1.开发
```
yarn dev
```
或者
```
gulp dev
```
**该命令会执行开发的一些列动作，包括：**
1. 复制html，css，js，img，网络字体
2. 生成dist文件夹，把资源都复制到其中
3. hash
4. 打开浏览器，进行实时预览开发
## 2.开启compass/sass功能，进行样式文件的开发分立

**该功能也能够实现实时预览效果**

命名

```
compass watch
```
 ## 3.打包

 命令:
 ```
 yarn build
 ```
 或者
 ```
 gulp build
 ```

该命令会把dist文件中的东西进行打包，然后添加指纹，之后压缩，文件命名方式为`build`+小时+日期+月份的方式。
 	