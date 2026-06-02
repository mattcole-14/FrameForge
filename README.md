# VirtuaDex  (FrameForge)

VirtuaDex is a web application for 3D fighting games, providing character information, 
move lists, frame data, combos, and game-specific resources in a clean and searchable interface.

The project began with Virtua Fighter 5 and is being expanded into a larger platform that 
will support multiple 3D fighting game franchises including Dead or Alive, Tekken, Soulcalibur, and more.

---

## Features

### Current Features
- Character roster pages
- Detailed character profiles
- Move list database
- Frame data display
- Move search and filtering
- Responsive web interface
- FastAPI backend API
- React + TypeScript frontend

### Planned Features
- Combo database
- Character matchup guides
- Punishment tools
- Frame data comparison
- Interactive input notation system
- 3D character model viewer
- User accounts and saved favorites
- Multi-game support

---

## Supported Games

### Available
- Virtua Fighter 5

### In Development
- Dead or Alive
- Tekken
- Soulcalibur

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- FastAPI
- Python
---

## API Endpoints

### Characters

```http
GET /characters
GET /characters/{id}
```

### Moves

```http
GET /characters/{id}/moves
```

### Combos

```http
GET /characters/{id}/combos
```

---

## Running Locally

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```
```
```
---

## Future Roadmap

- Complete Virtua Fighter 5 roster
- Complete Dead or Alive roster
- Add Tekken support
- Add Soulcalibur support
- Character matchup tools
- Combo route explorer
- Database integration
- User profiles
- Deployment

---

## Author

**Matthew Braziel**

---

## Disclaimer

VirtuaDex is a fan-made project created for educational and informational purposes.
All game characters, names, and trademarks belong to their respective owners.
