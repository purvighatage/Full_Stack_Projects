import streamlit as st
import uuid
import os
from database import Database
from chatbot import AIChatbot
from train_model import train_intent_model

# Page Configuration
st.set_page_config(page_title="AI Chatbot Assistant", page_icon="🤖", layout="wide")

# Initialize SQLite database (cached to avoid reconnecting)
@st.cache_resource
def get_db():
    return Database()

db = get_db()

# Ensure ML model exists on startup for seamless execution
if not os.path.exists("intent_model.pkl"):
    with st.spinner("Initializing system and training intent classification model for the first time..."):
        train_intent_model()

# User and Session State Initialization
if 'user_id' not in st.session_state:
    st.session_state.user_id = "user_" + str(uuid.uuid4())[:6]

if 'session_id' not in st.session_state:
    st.session_state.session_id = str(uuid.uuid4())

# Sidebar UI for Personalization and Multi-Session Management
with st.sidebar:
    st.title("⚙️ Personalization & Sessions")
    
    st.subheader("Your Identity")
    user_id_input = st.text_input("User ID (Change to access other profiles)", value=st.session_state.user_id)
    if user_id_input != st.session_state.user_id:
        st.session_state.user_id = user_id_input
        st.session_state.session_id = str(uuid.uuid4())
        st.rerun()
        
    prefs = db.get_preferences(st.session_state.user_id)
    if prefs:
        st.write("### 📝 Learned Preferences")
        for k, v in prefs.items():
            st.write(f"- **{k.title()}:** {v}")
    else:
        st.info("I don't know much about you yet. Try telling me 'My name is...' or 'I like...'")
    
    st.divider()
    
    st.subheader("💬 Multi-Session Memory")
    if st.button("➕ Start New Chat Session"):
        st.session_state.session_id = str(uuid.uuid4())
        st.rerun()
        
    st.caption("Past Sessions (Click to resume):")
    sessions = db.get_user_sessions(st.session_state.user_id)
    if sessions:
        for s_id, s_time in sessions[:8]:
            # Highlight active session
            btn_label = f"🟢 Session {s_id[:6]}" if s_id == st.session_state.session_id else f"⚪ Session {s_id[:6]} ({s_time[5:16]})"
            if st.button(btn_label, key=s_id):
                st.session_state.session_id = s_id
                st.rerun()

# Main Application Layout
st.title("🤖 AI-Powered Personalized Chatbot")
st.markdown("Equipped with NLP Intent Detection, Multi-Session Context Memory, and Dynamic File/Image Generation.")

# Instantiate core chatbot logic with current user/session context
bot = AIChatbot(db, user_id=st.session_state.user_id, session_id=st.session_state.session_id)

# Render Chat History
history = db.get_messages(st.session_state.session_id, limit=50)
for msg in reversed(history):
    with st.chat_message(msg['role']):
        st.write(msg['content'])

# Handle Input Iteration
if prompt := st.chat_input("Ask me a question, tell me your preferences, or ask me to generate a file/image..."):
    # Render user prompt
    with st.chat_message("user"):
        st.write(prompt)
        
    # Process and render bot response
    with st.chat_message("assistant"):
        with st.spinner("Processing intent & generating response..."):
            response, file_path, intent = bot.get_response(prompt)
            st.write(response)
            st.caption(f"🧠 Detected NLP Intent: `{intent}`")
            
            # Surface dynamically generated artifacts to the UI
            if file_path and os.path.exists(file_path):
                if file_path.endswith('.jpg') or file_path.endswith('.png'):
                    st.image(file_path, caption="AI Synthesized Image", use_column_width=True)
                    with open(file_path, "rb") as file:
                        st.download_button(label="📥 Download Image", data=file, file_name=os.path.basename(file_path), mime="image/jpeg")
                elif file_path.endswith('.txt'):
                    with open(file_path, "rb") as file:
                        st.download_button(label="📥 Download Document", data=file, file_name=os.path.basename(file_path), mime="text/plain")
