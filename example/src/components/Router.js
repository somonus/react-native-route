import React, { Component, createClass } from 'react';
import { Navigator, ListView, TouchableOpacity, Text } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import animationMap from './animationMap';

export default class Router extends Component {
  constructor(props) {
    super(props);

    this.routeMap = {};
    this.routesList = [];
    this.getChildren('', props.children);
    this.animationType = 'FloatFromRight';
    this.state = {
      initialRoute: this.getInitialRoute(),
    }
  }

  renderDemoList() {
    const self = this;
    return class DemoList extends Component {
      listPush(name) {
        self.push(name);
      }

      render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
          <ListView
            removeClippedSubviews={false}
            style={{
              marginTop: 20,
              padding: 15,
            }}
            dataSource={ds.cloneWithRows(self.routesList)}
            renderRow={(rowData) =>
              <TouchableOpacity
                onPress={this.listPush.bind(this, rowData)}
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1
              }}>
                <Text>{rowData}</Text>
              </TouchableOpacity>
            }
          />
        )
      }
    }
  }

  getInitialRoute() {
    if(process.env.NODE_ENV === 'development') {
      return {
        name: 'DemoList',
        component: this.renderDemoList(),
      };
    }
    return this.initialRoute;
  }

  getChildren(preHeader, children) {
    React.Children.forEach(children, (child, index) => {
      const { path, component, animation } = child.props;
      const route = preHeader + path;
      this.routesList.push(route);
      if (!this.routeMap[route]) {
        this.routeMap[route] = {
          name: route,
          component,
          animation,
        }
      }
      if (child.props.default || !this.initialRoute) {
        this.initialRoute = this.routeMap[path];
      }
      if (child.props.children) {
        this.getChildren(route === '/' ? '/' : route + '/', child.props.children);
      }
    });
  }

  push(name, params, animation) {
    dismissKeyboard();
    const currentRoutes = this.refs.nav.getCurrentRoutes();
    const pushRoute = this.routeMap[name] || this.routeMap['/' + name];

    if(currentRoutes.indexOf(pushRoute) !== -1) {
      return;
    }

    if (animation !== undefined && animation.constructor === String) {
      this.animationType = animation;
      this.navPush(name, params);
    } else {
      this.animationType = pushRoute.animation || 'FloatFromRight';
      this.navPush(name, params);
    }
  }

  navPush(name, params) {
    const route = this.routeMap[name] || this.routeMap['/' + name];
    if (route) {
      if (params) {
        route.params = params;
      } else {
        route.params = null;
      }
      this.refs.nav.push(route);
    } else {
      console.error("No such route!");
    }
  }

  pop() {
    dismissKeyboard();
    this.refs.nav.pop();
  }

  popToTop() {
    dismissKeyboard();
    this.refs.nav.popToTop();
  }

  renderScene(route, navigator) {
    const Component = route.component;
    return (
      <Component
        navigator={navigator}
        route={route}
        params={route.params}
        push={this.push.bind(this)}
        pop={this.pop.bind(this)}
        popToTop={this.popToTop.bind(this)} />
    );
  }

  render() {
    return (
      <Navigator
        ref="nav"
        initialRoute={this.state.initialRoute}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => animationMap[this.animationType] } />
    );
  }
}
