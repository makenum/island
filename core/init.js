const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
  }

  // 加载全部路由
  static initLoadRouters() {
    // 获取绝对路径
    const apiDirectory = `${process.cwd()}/app/api`

    // 路由自动懒加载
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })
    // 判断 requireDirectory 加载的模块是否为路由
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }
}

module.exports = InitManager
