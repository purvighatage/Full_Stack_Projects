import { useEffect } from 'react';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';
import { CometChatConversations } from '@cometchat/chat-uikit-react';

function App() {
  useEffect(() => {
    const UID = "superhero1"; // Test user (or create your own in Dashboard)
    CometChatUIKit.login(UID).then(user => {
      console.log("Logged in:", user);
    }).catch(console.error);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <CometChatConversations />
    </div>
  );
}

export default App;