import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CometChatUIKit, UIKitSettingsBuilder } from '@cometchat/chat-uikit-react';

const COMETCHAT_CONFIG = {
  App_id: "277690ff2029695a", // From Dashboard
  Region: "in", // e.g., "us"
  Auth_Key: "aa5b1a11cfeed8805f5da3eb18b488557e9108c6" // From Dashboard
};

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONFIG.App_id)
  .setRegion(COMETCHAT_CONFIG.Region)
  .setAuthKey(COMETCHAT_CONFIG.Auth_Key)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(uiKitSettings)?.then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});