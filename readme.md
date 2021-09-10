####脚手架使用步骤：
```
1.npm install my-dd-program-cli -g
2.my-dd-program-cli init <项目名>
3.依次输入项目描述和项目开发者名称，待出现项目初始化完成，小程序项目模版初始化结束。
```

#小程序初始化项目模版使用说明如下：
```
1、目录结构
├── assets # 静态资源文件
├── components # 全局自定义组件
├── pages # 页面文件
├── utils
│ ├── config.js # 配置文件
│ ├── request.js # 全局请求封装
│ ├── token.js # token请求，用户选择
│ ├── unit.js # 工具库
│ ├── uploadFile.js # 文件上传方法
├── app.js
├── app.json
├── app.acss



2、全局对象 dd 扩展 自定义 $ 对象
通过/utils/unit.js 导出自定义工具库对象 $, 在app.js 中 onLaunch方法内扩展 dd.$对象

3、目前支持的全局方法，无需单文件引用，全局使用即可
方法名	参数	说明
dd.$.showLoading(content)	content	全局加载状态，content加载文字
dd.$.showToast(content, type = null)	content,type	轻提示，content必传，type默认null，其他参考dd文档
dd.$.getDataSet(e, key)	e, key	获取绑定在元素上的data属性值，event对象，key：字符串，data-后的字符串，data-key=“123”
dd.$.request(object)	object	object包含，url、method-默认get、data、contentType-默认application/json，返回值为promise，请求体内有全局错误处理
dd.$.uploadFile(paths)	paths	paths图片数组，返回值为Promise.all
dd.$.***
可根据需求自定义扩展方法
```
