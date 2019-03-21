/**
 * 类似于 createApp ，我们也需要给每个请求一个新的 router 实例
 * 所以文件导出一个 createRouter 函数
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const getComponent = com => () => import(`../pages/${com}`);

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: getComponent(''),
      },
    ],
  });
};
