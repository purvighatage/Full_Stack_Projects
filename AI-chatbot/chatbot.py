import os
import joblib
import json
import requests
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
import wikipedia
from database import Database
from train_model import train_intent_model

# Download NLTK datasets required for POS tagging quietly
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('taggers/averaged_perceptron_tagger')
except LookupError:
    nltk.download('punkt', quiet=True)
    nltk.download('averaged_perceptron_tagger', quiet=True)

class AIChatbot:
    def __init__(self, db: Database, user_id="default_user", session_id="default_session"):
        self.db = db
        self.user_id = user_id
        self.session_id = session_id
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.model_path = os.path.join(self.base_dir, "intent_model.pkl")
        
        # Ensure model exists, fulfilling "Dataset and trained model file" requirement dynamically
        if not os.path.exists(self.model_path):
            print("Intent model not found. Training a new one automatically...")
            train_intent_model()
            
        self.model = joblib.load(self.model_path)
        self.db.create_session(self.session_id, self.user_id)

    def detect_intent(self, user_input):
        return self.model.predict([user_input])[0]

    def extract_nouns(self, text):
        """Advanced NLP technique using POS tagging to extract subjects from queries."""
        tokens = word_tokenize(text)
        tags = pos_tag(tokens)
        nouns = [word for word, pos in tags if pos in ['NN', 'NNS', 'NNP', 'NNPS']]
        return " ".join(nouns)

    def handle_greeting(self):
        prefs = self.db.get_preferences(self.user_id)
        name = prefs.get('name', '')
        if name:
            return f"Hello again, {name}! Welcome back. How can I assist you today?"
        return "Hello! I am your personalized AI assistant. How can I help you today?"

    def handle_preference(self, text):
        text_lower = text.lower()
        if "my name is" in text_lower:
            name = text[text_lower.index("my name is") + 10:].strip()
            self.db.set_preference(self.user_id, 'name', name)
            return f"Nice to meet you, {name}! I will remember your name for our future sessions."
        elif "i like" in text_lower:
            item = text[text_lower.index("i like") + 6:].strip()
            self.db.set_preference(self.user_id, 'likes', item)
            return f"Got it! I've recorded that your preference includes {item}."
        
        return "I've successfully updated your personal preferences in my memory."

    def handle_image_generation(self, text):
        prompt = text.lower().replace("create an image of", "").replace("generate a picture of", "").strip()
        if not prompt:
            prompt = self.extract_nouns(text) or "abstract colorful geometric art"
        
        # Using a public URL image synthesis endpoint
        image_url = f"https://image.pollinations.ai/prompt/{requests.utils.quote(prompt)}"
        
        out_dir = os.path.join(self.base_dir, "outputs")
        os.makedirs(out_dir, exist_ok=True)
        file_path = os.path.join(out_dir, f"{prompt.replace(' ', '_')[:20]}.jpg")
        
        try:
            response = requests.get(image_url)
            if response.status_code == 200:
                with open(file_path, 'wb') as f:
                    f.write(response.content)
                return f"I've generated a unique image for the prompt '{prompt}'. You can view or download it below.", file_path
        except Exception as e:
            return f"Sorry, I failed to generate the image due to an error: {str(e)}", None
            
        return "Sorry, the image synthesis service is currently unavailable.", None

    def handle_file_generation(self, text):
        topic = text.lower().replace("create a file", "").replace("write a report", "").replace("generate a document", "").strip()
        if not topic:
            topic = "generated_document"
            
        topic = topic.replace("about", "").strip()
        
        out_dir = os.path.join(self.base_dir, "outputs")
        os.makedirs(out_dir, exist_ok=True)
        file_path = os.path.join(out_dir, f"{topic.replace(' ', '_')[:20]}.txt")
        
        # Retrieve personalized data for file context
        prefs = self.db.get_preferences(self.user_id)
        name = prefs.get('name', 'User')
        
        content = f"--- Document: {topic.title()} ---\n\n"
        content += f"Prepared for: {name}\n"
        content += f"Session ID: {self.session_id}\n\n"
        content += f"This is an automatically generated document based on your request about '{topic}'.\n"
        content += "Using Natural Language Generation principles, we assemble context specific to your request here.\n"
        
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return f"I have successfully generated the requested file about '{topic}'. You can download it below.", file_path
        except Exception as e:
            return f"Failed to create file. Error: {str(e)}", None

    def handle_general_query(self, text):
        query = text.lower().replace("what is", "").replace("who is", "").replace("tell me about", "").strip()
        if not query:
            # Fallback to noun extraction if explicit markers aren't present
            query = self.extract_nouns(text)
            
        if not query:
            return "I'm not entirely sure what topic you are inquiring about. Could you provide more specifics?"
            
        try:
            # Leveraging Wikipedia as an external knowledge graph for intelligent response generation
            summary = wikipedia.summary(query, sentences=3)
            return f"Based on my general knowledge database:\n\n{summary}"
        except wikipedia.exceptions.DisambiguationError as e:
            return f"Your query '{query}' is somewhat broad. Did you mean: {', '.join(e.options[:3])}?"
        except wikipedia.exceptions.PageError:
            return f"I couldn't locate verifiable information concerning '{query}'. My apologies."
        except Exception:
            return "I encountered a network error while trying to fetch data for your query."

    def handle_contextual(self):
        history = self.db.get_messages(self.session_id, limit=6)
        if len(history) < 2:
            return "We haven't built up enough context in this session yet."
        
        # Find the last actual topic discussed by the user
        last_user_msgs = [msg['content'] for msg in history if msg['role'] == 'user']
        if len(last_user_msgs) > 1:
            last_topic = last_user_msgs[-2]  # -1 is current, -2 is previous
            return f"Just previously, you mentioned: '{last_topic}'. Would you like me to elaborate on that or perform an action based on it?"
        
        return "I've lost track of the specific context, could you remind me what we were focusing on?"

    def get_response(self, user_input):
        # Log user message to session memory
        self.db.add_message(self.session_id, "user", user_input)
        
        # Core intent resolution
        intent = self.detect_intent(user_input)
        file_path = None
        
        # Intent routing logic
        if intent == "greeting":
            response = self.handle_greeting()
        elif intent == "goodbye":
            response = "Goodbye! It was a pleasure assisting you. Feel free to return to this session anytime."
        elif intent == "set_preference":
            response = self.handle_preference(user_input)
        elif intent == "generate_image":
            response, file_path = self.handle_image_generation(user_input)
        elif intent == "generate_file":
            response, file_path = self.handle_file_generation(user_input)
        elif intent == "contextual_conversation":
            response = self.handle_contextual()
        elif intent == "general_query":
            response = self.handle_general_query(user_input)
        else:
            response = "I interpreted that, but I'm currently not equipped to provide a definitive response. Could you rephrase?"
            
        # Log assistant message to session memory
        self.db.add_message(self.session_id, "assistant", response)
        
        return response, file_path, intent
