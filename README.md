# react-native-route

react-native-route是react-native环境下的一个路由控制器，在开发模式下，默认页面会是一个list页面，展示路由中定义的所有页面，以方便调试进入任意页面。

而在release模式则根据路由设置，展示根路由页面或者手动设置的default路由页面。

## Install
```
$ npm install react-native-route --save
```
## Usage

###用法

```js
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Router, Route } from 'react-native-route';

export default class app extends Component {
  render() {
    return (
      <Router>
        <Route path='home' component={HomeComponent}>
          <Route path='page1' component={PageComponent} />
        </Route>
        <Route path='mine' component={MineComponent} animation='FloatFromBottom'></Route>
      </Router>
    );
  }
}

AppRegistry.registerComponent('app', () => app);

```

#### 属性

* *default* (bool): 当default设置为true时，当前页面将成为路由的根页面，默认为Router中的第一个页面。 
* *path* (string): 某个页面的路径。 
* *component* (object): 需要展示的页面组件。 
* *animation* (object): 当前页面出现的动画。默认值FloatFromRight。可选值：PushFromRight, FloatFromRight, FloatFromLeft, FloatFromBottom, HorizontalSwipeJump, HorizontalSwipeJumpFromRight, VerticalUpSwipeJump, VerticalDownSwipeJump。

#### 方法

在Route对应的component中，可通过`this.props.push`, `this.props.pop`以及`this.props.popToTop`来控制路由跳转。

其中`this.props.push(path, params, animation)`可接收三个参数：

* *path* (string): 必填参数，需要跳转的目标页面的path，及上面定义的path。 
* *params* (object): 选填参数，需要传给目标页面的数据，在目标页面中可通过`this.props.params`获取。 
* *animation* (string): 选填参数，跳转到目标页面时的动画，在push中强行指定动画时，此动画将会覆盖在Route中指定的动画效果。 

## Example

*run demo*

```
cd example
npm install
npm start
```

### IOS

打开ios目录下的xcode工程，点击run

### Android

使用Android studio打开Android目录，点击run

## License

native-echarts is released under the MIT license.
