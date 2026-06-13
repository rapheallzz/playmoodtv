import { registerRootComponent } from 'expo';
import * as Expo from 'expo';
import { createPermissionHook } from 'expo-modules-core';

// Fix for [runtime not ready]: TypeError: 0, _expo.createPermissionHook is not a function
// This occurs because some legacy packages or versions still expect createPermissionHook
// to be exported from 'expo', but it has been moved to 'expo-modules-core'.
if (!Expo.createPermissionHook) {
  Object.assign(Expo, { createPermissionHook });
}

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
