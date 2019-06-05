import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'cart', ...(require('E:/2018-study/OneDrive/开课吧10期/myCode/12_React电商项目实战/umi-test/src/models/cart.js').default) });
app.model({ namespace: 'user', ...(require('E:/2018-study/OneDrive/开课吧10期/myCode/12_React电商项目实战/umi-test/src/models/user.js').default) });
app.model({ namespace: 'goods', ...(require('E:/2018-study/OneDrive/开课吧10期/myCode/12_React电商项目实战/umi-test/src/pages/goods/models/goods.js').default) });
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
