// src/components/Chat/VideoCallUnlock.js
export const VideoCallUnlock = ({ unlocked }) => {
  return (
    <div className={`video-call-unlock ${unlocked ? 'unlocked' : 'locked'}`}>
      {unlocked ? (
        <button className="video-call-button">Start Video Call</button>
      ) : (
        <p>Reach 100 messages to unlock video calling</p>
      )}
    </div>
  );
};