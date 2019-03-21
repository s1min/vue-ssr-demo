/**
 * app.js 是我们应用程序的 '通用 entry'
 * 在纯客户端应用程序中，我们将在此文件中创建根 Vue 实例，并直接挂载到 DOM
 * 但是，对于服务器端渲染(SSR)，责任转移到纯客户端 entery 文件
 * app.js 简单地使用 export 导出一个 createApp 函数
 */
import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';

// 创建一个工厂函数，用于创建新的应用程序、router 和 store 实例
export function createApp() {
  // 创建 router 和 store 实例
  const router = createRouter();
  const store = createStore();

  // 同步路由状态(route state)到 store
  sync(store, router);

  // 创建应用程序，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  // 暴露 app, router 和 store
  return { app, router, store };
}
