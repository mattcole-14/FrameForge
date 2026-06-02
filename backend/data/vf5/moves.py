from importlib import import_module
from itertools import chain
from typing import Any, Sequence

move_modules = [
    "akira_moves",
    "aoi_moves",
    "brad_moves",
    "dural_moves",
    "elblaze_moves",
    "eileen_moves",
    "goh_moves",
    "jacky_moves",
    "jeffry_moves",
    "kage_moves",
    "lau_moves",
    "leifei_moves",
    "lion_moves",
    "pai_moves",
    "sarah_moves",
    "shun_moves",
    "taka_moves",
    "vanessa_moves",
    "wolf_moves",
]


def _load_moves_from_module(module_name: str) -> Sequence[dict[str, Any]]:
    module = import_module(f".{module_name}", package=__package__)
    base_name = module_name[:-6] if module_name.endswith("_moves") else module_name
    candidates = [
        module_name,
        base_name,
        f"{base_name.upper()}_MOVES",
        f"{base_name.upper()}",
        "MOVES",
    ]

    for candidate in candidates:
        if hasattr(module, candidate):
            value = getattr(module, candidate)
            if isinstance(value, list):
                return value

    collected: list[dict[str, Any]] = []
    for attr_name in dir(module):
        if attr_name.startswith("_"):
            continue
        attr = getattr(module, attr_name)
        if isinstance(attr, list) and attr_name.endswith("_moves"):
            collected.extend(attr)

    if collected:
        return collected

    raise AttributeError(
        f"Could not find a move list in data.vf5.{module_name}. Checked candidates: {candidates}"
    )


vf5_moves = list(
    chain.from_iterable(_load_moves_from_module(module_name) for module_name in move_modules)
)