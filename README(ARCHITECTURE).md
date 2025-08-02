src/
├─ features/
│ ├─ marketplace/ # Product listing and marketplace UI
│ └─ recommendations/ # All recommendation-related logic
│ ├─ index.js # Entry point: exports main recommendation functions
│ ├─ trending.js # Logic for trending product calculation
│ ├─ personalized.js # (Future) Personalized/user-based recommendations
│ ├─ scoring.js # Reusable scoring/ranking logic
│ ├─ utils.js # Helpers: date filtering, deduplication, formatting, etc.
│ └─ tests/ # (Optional) Unit tests for scoring or filtering
