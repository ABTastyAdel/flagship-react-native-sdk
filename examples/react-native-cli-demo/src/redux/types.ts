import {DemoState} from './stuff/demo/types';
import {SdkSettingsState} from './stuff/sdkSettings/types';

export type AppState = {
  sdkSettings: SdkSettingsState;
  demo: DemoState;
};
