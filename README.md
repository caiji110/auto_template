 # 文档：https://phdlikeyou.feishu.cn/docs/doccn4qVmyAcLdaL0F9SLSQG6ee
 

 
 在需要使用组件的页面中的Index.json中的usingComponents进行定义以下为例
 
 
 "usingComponents": {
 
 
    "tabBar": "../../components/tabBar/index"
 
 
 }
 
 
 在页面中使用 <tabBar tabBarInfo="{{  }}" />
 
 
 每个组件都有默认参数，用户可自定义也可以使用默认效果
 
 
 关于参数的定义，具体请看相关组件的index.js最上方。
