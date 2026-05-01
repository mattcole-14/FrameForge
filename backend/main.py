from fastapi import FastAPI
# setup done 4-28-2026

from fastapi.middleware.cors import CORSMiddleware
from data.characters import characters
from data.akira_moves import akira_moves
from data.aoi_moves import aoi_moves
from data.jean_moves import jean_moves
from data.eileen_moves import eileen_moves
from data.jacky_moves import jacky_moves    
from data.pai_moves import pai_moves

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

all_moves = (akira_moves + aoi_moves + jean_moves + eileen_moves + jacky_moves + pai_moves)

character_lookup = {}
for character in characters:
    character_lookup[character["id"]] = character

@app.get("/")
def home():
    return {"message": "VF5 FrameLab API is running"}


@app.get("/characters")
def get_characters():
    return characters


@app.get("/characters/{character_id}")
def get_character(character_id: int):
    if character_id in character_lookup:
        return character_lookup[character_id]
    return {"error": "Character not found"}


@app.get("/moves")
def get_all_moves():
    return all_moves

# Get moves for a specific character
@app.get("/characters/{character_id}/moves")
def get_character_moves(character_id: int):
    character_moves = []

    for move in all_moves:
        if move["character_id"] == character_id:
            character_moves.append(move)

    return character_moves


#Search moves by name
@app.get("/moves/search")
def search_moves(name: str):
    results = []
    for move in all_moves:
        if name.lower() in move["name"].lower():
            results.append(move)
    return results


#Filter fast moves by startup
@app.get("/moves/fast")
def get_fast_moves(max_startup: int = 12):
    results = []
    for move in all_moves:
        startup = move["startup_frames"]
        if isinstance(startup, int) and startup <= max_startup:
            results.append(move)
    return results  



#filter safe moves
@app.get("/moves/safe")
def get_safe_moves(min_on_block: int =-5):
    results = []
    for move in all_moves:
        on_block = move["on_block"]
        if isinstance(on_block, int) and on_block >= min_on_block:
            results.append(move)
    return results

#filter endpoint
@app.get("/moves/filter")
def filter_moves(
    character_id: int | None = None,
    hit_level: str | None = None,
    max_startup: int | None = None,
    min_on_block: int | None = None,
):
    results = []
    for move in all_moves:
        if character_id is not None and move["character_id"] != character_id:
            continue
        if hit_level and hit_level.lower() not in str(move["hit_level"]).lower():
            continue

        startup = move["startup_frames"]
        if max_startup is not None:
            if not isinstance(startup, int) or startup > max_startup:
                continue

        on_block = move["on_block"]
        if min_on_block is not None:
            if not isinstance(on_block, int) or on_block < min_on_block:
                continue

        results.append(move)
    return results






