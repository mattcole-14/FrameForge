from fastapi import FastAPI
# setup done 4-28-2026

from fastapi.middleware.cors import CORSMiddleware

from data.doa.characters import doa_characters
from data.doa.moves import DOA_MOVES
from data.vf5.combos import vf5_combos
from data.vf5.moves import vf5_moves
from data.vf5.characters import characters
from data.vf5.aoi_moves import (
    aoi_normal_moves,
    aoi_tenchi_moves,
    aoi_sundome_moves,
    aoi_jump_attacks,
    aoi_back_attacks,
    aoi_down_attacks,
    aoi_throws,
    aoi_reversals,
    aoi_rising_attacks,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

all_characters = [*characters, *doa_characters]
all_moves = [*vf5_moves, *DOA_MOVES]

aoi_move_tabs = {
    "normal": aoi_normal_moves,
    "tenchi": aoi_tenchi_moves,
    "sundome": aoi_sundome_moves,
    "jump-attacks": aoi_jump_attacks,
    "back-attacks": aoi_back_attacks,
    "down-attacks": aoi_down_attacks,
    "throws": aoi_throws,
    "reversals": aoi_reversals,
    "rising-attacks": aoi_rising_attacks,
}

character_lookup = {}

for character in all_characters:
    character_lookup[character["id"]] = character

@app.get("/")
def home():
    return {"message": "VF5 FrameLab API is running"}


@app.get("/characters")
def get_characters():
    return all_characters


@app.get("/games/{game_id}/characters")
def get_characters_by_game(game_id: str):
    gid = game_id.lower()
    if gid in ("vf5", "vf"):
        return characters
    if gid == "doa":
        return doa_characters
    return {"error": "Game not found"}


@app.get("/games/{game_id}/characters/{character_id}")
def get_character_by_game(game_id: str, character_id: int):
    gid = game_id.lower()
    source = None
    if gid in ("vf5", "vf"):
        source = characters
    elif gid == "doa":
        source = doa_characters
    else:
        return {"error": "Game not found"}

    for ch in source:
        if ch.get("id") == character_id:
            return ch

    return {"error": "Character not found"}


@app.get("/games/{game_id}/characters/{character_id}/moves")
def get_character_moves_by_game(game_id: str, character_id: int):
    gid = game_id.lower()
    if gid in ("vf5", "vf"):
        moves_source = vf5_moves
    elif gid == "doa":
        moves_source = DOA_MOVES
    else:
        return {"error": "Game not found"}

    character_moves = [m for m in moves_source if m.get("character_id") == character_id]
    return character_moves


@app.get("/games/{game_id}/characters/{character_id}/moves/tabs/{tab_name}")
def get_character_moves_by_game_tab(game_id: str, character_id: int, tab_name: str):
    gid = game_id.lower()
    # VF5 special tabs (AOI example)
    if gid in ("vf5", "vf") and character_id == 2:
        if tab_name not in aoi_move_tabs:
            return {"error": "Move tab not found"}
        return aoi_move_tabs[tab_name]

    # Fallback: filter by character_id from the game's moves
    if gid in ("vf5", "vf"):
        moves_source = vf5_moves
    elif gid == "doa":
        moves_source = DOA_MOVES
    else:
        return {"error": "Game not found"}

    results = [m for m in moves_source if m.get("character_id") == character_id]
    return results


@app.get("/characters/{character_id}")
def get_character(character_id: int):
    if character_id in character_lookup:
        return character_lookup[character_id]
    return {"error": "Character not found"}


@app.get("/characters/2/moves/tabs/{tab_name}")
def get_aoi_moves_by_tab(tab_name: str):
    if tab_name not in aoi_move_tabs:
        return {"error": "Move tab not found"}

    return aoi_move_tabs[tab_name]


@app.get("/moves")
def get_vf5_moves():
    return vf5_moves

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
    for move in vf5_moves:
        if name.lower() in move["name"].lower():
            results.append(move)
    return results


#Filter fast moves by startup
@app.get("/moves/fast")
def get_fast_moves(max_startup: int = 12):
    results = []
    for move in vf5_moves:
        startup = move["startup_frames"]
        if isinstance(startup, int) and startup <= max_startup:
            results.append(move)
    return results  



#filter safe moves
@app.get("/moves/safe")
def get_safe_moves(min_on_block: int =-5):
    results = []
    for move in vf5_moves:
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
    for move in vf5_moves:
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

@app.get("/combos")
def get_vf5_combos():
    return vf5_combos


@app.get("/characters/{character_id}/combos")
def get_character_combos(character_id: int):
    character_combos = []

    for combo in vf5_combos:
        if combo["character_id"] == character_id:
            character_combos.append(combo)

    return character_combos






