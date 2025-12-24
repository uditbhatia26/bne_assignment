# AI Text Processor

**Internship Assignment for Bugs & Errors Studio**

A Django web application that processes user text using OpenAI's GPT-4o model, demonstrating AI integration, clean code, and thoughtful prompt engineering.

## Features

- RESTful API endpoint for text processing
- Structured JSON output: title, key points, beginner-friendly rewrite
- Modern, responsive UI with real-time feedback
- Robust error handling and input validation

## Tech Stack

- **Backend**: Django 5.2, Django REST Framework
- **AI Integration**: LangChain, OpenAI GPT-4o
- **Frontend**: HTML5, CSS3, Vanilla JavaScript

---

## Setup & Running Instructions

### Prerequisites
- Python 3.8+
- OpenAI API key

### Installation

1. **Clone and navigate to project**
   ```bash
   cd internship_assignment_for_bne
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   
   Create `.env` file in project root:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Start server**
   ```bash
   python manage.py runserver
   ```

7. **Access application**
   - Web UI: http://127.0.0.1:8000/
   - API: http://127.0.0.1:8000/api/process/

---

## API Documentation

### Endpoint: `POST /api/process/`

Process text and return structured analysis.

#### Request Example (curl)

```bash
curl -X POST http://127.0.0.1:8000/api/process/ \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed. It uses algorithms to identify patterns and make decisions."
  }'
```

#### Success Response (200 OK)

```json
{
  "title": "Understanding Machine Learning Basics",
  "key_points": [
    "Machine learning is a subset of artificial intelligence",
    "It enables computers to learn from data automatically",
    "No explicit programming is required for learning",
    "Uses algorithms to identify patterns in data",
    "Makes decisions based on learned patterns"
  ],
  "beginner_friendly_version": "Think of machine learning as teaching a computer to learn on its own, just like how you learned to recognize cats and dogs. Instead of telling the computer every single rule, we show it lots of examples and it figures out the patterns by itself. This is a part of AI that helps computers get smarter by learning from information, and then use what they learned to make choices."
}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Text field is required"
}
```

#### Error Response (503 Service Unavailable)

```json
{
  "error": "Unable to process text. Please try again later.",
  "details": "API rate limit exceeded"
}
```

---

## Prompt Engineering Explanation

### Prompt Design Strategy

The system prompt is carefully structured to ensure consistent, high-quality outputs:

```python
"""You are an expert AI assistant.

Your task:
1. Create a short title (1 line)
2. Extract exactly 5 key bullet points
3. Rewrite the content in a beginner-friendly tone

Return ONLY valid JSON in the following format:
{
  "title": "...",
  "key_points": ["...", "...", "...", "...", "..."],
  "beginner_friendly_version": "..."
}

Text:
{input_text}"""
```

### Key Prompt Choices

**1. Clear Role Definition**
- Opens with "You are an expert AI assistant" to establish competence and reliability
- Sets expectations for professional, accurate output

**2. Numbered Task List**
- Three specific, actionable tasks prevent ambiguity
- "Exactly 5 key bullet points" enforces consistency
- "Short title (1 line)" prevents verbose summaries

**3. JSON-Only Constraint**
- "Return ONLY valid JSON" eliminates markdown formatting and preambles
- Provides exact schema to ensure parseable output
- Works seamlessly with LangChain's `JsonOutputParser`

**4. Beginner-Friendly Directive**
- Targets accessibility without sacrificing accuracy
- Encourages analogies, simpler vocabulary, and clear explanations

**5. Low Temperature (0.3)**
- Reduces randomness for predictable, consistent results
- Critical for production applications requiring reliability

### Why This Works

This prompt balances **specificity** (exact format, count requirements) with **flexibility** (creative rewrites, natural summarization). The JSON constraint prevents common LLM issues like markdown wrapping or conversational preambles. The beginner-friendly requirement ensures output is valuable across skill levels, making the tool accessible to diverse users.

---

## Bold AI Product Idea

### The Universal Molecular Matchmaker
One of the bold ideas in my mind currently is building a "Universal Molecular Matchmaker"—a predictive AI ecosystem that maps every known drug compound against every human disease protein in existence, in real-time. It’s essentially a massive, high-fidelity digital twin of human biology. Instead of the traditional "one drug, one target" approach that takes a decade and billions of dollars, this system would use deep generative modeling to simulate how existing, FDA-approved medications could be "re-coded" to switch off rare cancers or halt neurodegeneration.

What excites me most is the idea of "hidden cures"; the thought that the remedy for a terminal illness might already be sitting on a pharmacy shelf, we just haven't seen the connection yet. By bypassing the early safety trials of new drug development, this platform would collapse the timeline of medical discovery from years to weeks. It solves the ultimate problem of human suffering by ensuring that no cure remains undiscovered simply because we lacked the computational imagination to look at an old molecule in a new way.

## Project Structure

```
internship_assignment_for_bne/
├── app/
│   ├── static/app.js              # Frontend logic
│   ├── templates/index.html       # UI
│   ├── views.py                   # API endpoint & LLM integration
│   └── urls.py                    # Routing
├── internship_assignment_for_bne/
│   ├── settings.py                # Configuration
│   └── urls.py                    # Main routing
├── .env                           # Environment variables (gitignored)
├── requirements.txt               # Dependencies
└── README.md                      # This file
```

---

## Development Notes

### Error Handling
- Input validation for empty/missing text
- Graceful LLM API failures with user-friendly messages
- CSRF exemption for API endpoint

### Security Considerations
- Environment variables for sensitive API keys
- Input sanitization (strip whitespace)
- Rate limiting recommended for production

---

**Developed by**: [Udit Bhatia]  
**Contact**: [bhatiaudit.work@gmail.com]  
**Date**: 24th December 2025
