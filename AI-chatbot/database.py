import sqlite3
import json
import os

class Database:
    def __init__(self, db_name="chatbot_memory.db"):
        # Ensure database is stored in the same directory as this script
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), db_name)
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.create_tables()

    def create_tables(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                user_id TEXT PRIMARY KEY,
                preferences TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS sessions (
                session_id TEXT PRIMARY KEY,
                user_id TEXT,
                start_time DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT,
                role TEXT,
                content TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        self.conn.commit()

    def add_message(self, session_id, role, content):
        cursor = self.conn.cursor()
        cursor.execute("INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)", (session_id, role, content))
        self.conn.commit()

    def get_messages(self, session_id, limit=10):
        cursor = self.conn.cursor()
        cursor.execute("SELECT role, content FROM messages WHERE session_id = ? ORDER BY timestamp DESC LIMIT ?", (session_id, limit))
        return [{"role": row[0], "content": row[1]} for row in reversed(cursor.fetchall())]

    def set_preference(self, user_id, key, value):
        cursor = self.conn.cursor()
        cursor.execute("SELECT preferences FROM users WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        if row:
            prefs = json.loads(row[0])
            prefs[key] = value
            cursor.execute("UPDATE users SET preferences = ? WHERE user_id = ?", (json.dumps(prefs), user_id))
        else:
            prefs = {key: value}
            cursor.execute("INSERT INTO users (user_id, preferences) VALUES (?, ?)", (user_id, json.dumps(prefs)))
        self.conn.commit()

    def get_preferences(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT preferences FROM users WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        return json.loads(row[0]) if row else {}

    def get_user_sessions(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT session_id, start_time FROM sessions WHERE user_id = ? ORDER BY start_time DESC", (user_id,))
        return cursor.fetchall()
        
    def create_session(self, session_id, user_id):
        cursor = self.conn.cursor()
        cursor.execute("INSERT OR IGNORE INTO sessions (session_id, user_id) VALUES (?, ?)", (session_id, user_id))
        self.conn.commit()
