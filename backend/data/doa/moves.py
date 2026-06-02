from importlib import import_module
from itertools import chain
from typing import Any, Sequence

move_modules = [
    "ayane_moves",
    "bass_moves",
    "bayman_moves",
    "brad_moves",
    "christie_moves",
    "diego_moves",
    "elliot_moves",
    "hayabusa_moves",
    "hayate_moves",
    "helena_moves",
    "hitomi_moves",
    "honoka_moves",
    "jann_moves",
    "kasumi_moves",
    "kokoro_moves",
    "kula_moves",
    "leifang_moves",
    "lisa_moves",
    "mai_moves",
    "mila_moves",
    "momiji_moves",
    "nico_moves",
    "nyotengu_moves",
    "phase_moves",
    "rachel_moves",
    "raidou_moves",
    "rig_moves",
    "tamaki_moves",
    "tina_moves",
    "zack_moves",
]


def _load_moves_from_module(module_name: str) -> Sequence[dict[str, Any]]:
    module = import_module(f".{module_name}", package=__package__)
    base_name = module_name[:-6] if module_name.endswith("_moves") else module_name
    candidates = [
        f"{base_name.upper()}_MOVES_MOVES",
        f"{base_name.upper()}_MOVES",
        base_name.upper(),
        "MOVES",
    ]

    for candidate in candidates:
        if hasattr(module, candidate):
            return getattr(module, candidate)

    raise AttributeError(
        f"Could not find moves list in module data.doa.{module_name}. Expected one of: {candidates}"
    )


DOA_MOVES = list(
    chain.from_iterable(_load_moves_from_module(module_name) for module_name in move_modules)
)
