import { Navigator, Platform } from 'react-native';

export default {
  'PushFromRight': Navigator.SceneConfigs.PushFromRight,
  'FloatFromRight': Navigator.SceneConfigs.FloatFromRight,
  'FloatFromLeft': Navigator.SceneConfigs.FloatFromLeft,
  'FloatFromBottom': Navigator.SceneConfigs.FloatFromBottom,
  'HorizontalSwipeJump': {
    ...Navigator.SceneConfigs.HorizontalSwipeJump,
    gestures: Navigator.SceneConfigs.PushFromRight.gestures,
  },
  'HorizontalSwipeJumpFromRight': Navigator.SceneConfigs.HorizontalSwipeJumpFromRight,
  'VerticalUpSwipeJump': Navigator.SceneConfigs.VerticalUpSwipeJump,
  'VerticalDownSwipeJump': Navigator.SceneConfigs.VerticalDownSwipeJump
}
