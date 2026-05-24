import "./InputDisplay.css";

import pIcon from "../assets/input-icons/p.png";
import kIcon from "../assets/input-icons/k.png";
import gIcon from "../assets/input-icons/g.png";

import upIcon from "../assets/input-icons/up.png";
import downIcon from "../assets/input-icons/down.png";
import leftIcon from "../assets/input-icons/left.png";
import rightIcon from "../assets/input-icons/right.png";
import upLeftIcon from "../assets/input-icons/up-left.png";
import upRightIcon from "../assets/input-icons/up-right.png";
import downLeftIcon from "../assets/input-icons/down-left.png";
import downRightIcon from "../assets/input-icons/down-right.png";

import upHoldIcon from "../assets/input-icons/up-hold.png";
import downHoldIcon from "../assets/input-icons/down-hold.png";
import leftHoldIcon from "../assets/input-icons/left-hold.png";
import rightHoldIcon from "../assets/input-icons/right-hold.png";
import upLeftHoldIcon from "../assets/input-icons/up-left-hold.png";
import upRightHoldIcon from "../assets/input-icons/up-right-hold.png";
import downLeftHoldIcon from "../assets/input-icons/down-left-hold.png";
import downRightHoldIcon from "../assets/input-icons/down-right-hold.png";

type InputDisplayProps = {
  input?: string | null;
};

const iconMap: Record<string, string> = {
  P: pIcon,
  K: kIcon,
  G: gIcon,

  "8": upIcon,
  "2": downIcon,
  "4": leftIcon,
  "6": rightIcon,
  "7": upLeftIcon,
  "9": upRightIcon,
  "1": downLeftIcon,
  "3": downRightIcon,

  "[8]": upHoldIcon,
  "[2]": downHoldIcon,
  "[4]": leftHoldIcon,
  "[6]": rightHoldIcon,
  "[7]": upLeftHoldIcon,
  "[9]": upRightHoldIcon,
  "[1]": downLeftHoldIcon,
  "[3]": downRightHoldIcon,
};

const labelMap: Record<string, string> = {
  P: "Punch",
  K: "Kick",
  G: "Guard",

  "8": "Up",
  "2": "Down",
  "4": "Left",
  "6": "Right",
  "7": "Up-left",
  "9": "Up-right",
  "1": "Down-left",
  "3": "Down-right",

  "[8]": "Hold up",
  "[2]": "Hold down",
  "[4]": "Hold left",
  "[6]": "Hold right",
  "[7]": "Hold up-left",
  "[9]": "Hold up-right",
  "[1]": "Hold down-left",
  "[3]": "Hold down-right",
};

function tokenizeInput(input: string) {
  const tokens: string[] = [];
  let index = 0;

  while (index < input.length) {
    const char = input[index];

    if (char === " ") {
      index += 1;
      continue;
    }

    // Held direction: [6], [2], [4], etc.
    if (char === "[") {
      const closingIndex = input.indexOf("]", index);

      if (closingIndex !== -1) {
        tokens.push(input.slice(index, closingIndex + 1));
        index = closingIndex + 1;
        continue;
      }
    }

    // Known single-character commands
    if ("PKG12346789+>,-/".includes(char.toUpperCase())) {
      tokens.push(char.toUpperCase());
      index += 1;
      continue;
    }

    // Group unknown text instead of spacing every letter
    let textToken = "";

    while (
      index < input.length &&
      !"[PKG12346789+>,-/ ]".includes(input[index].toUpperCase())
    ) {
      textToken += input[index];
      index += 1;
    }

    if (textToken) {
      tokens.push(textToken);
    }
  }

  return tokens;
}

export default function InputDisplay({ input }: InputDisplayProps) {
  if (!input || input === "-") {
    return <span className="input-fallback">-</span>;
  }

  const tokens = tokenizeInput(input);

  return (
    <span className="input-display" aria-label={input}>
      {tokens.map((token, index) => {
        const icon = iconMap[token];

        if (icon) {
          return (
            <img
              key={`${token}-${index}`}
              src={icon}
              alt={labelMap[token] ?? token}
              title={labelMap[token] ?? token}
              className="input-icon"
            />
          );
        }

        if (token === "+") {
          return (
            <span key={`${token}-${index}`} className="input-symbol">
              +
            </span>
          );
        }

        if (token === ">") {
          return (
            <span key={`${token}-${index}`} className="input-symbol input-arrow">
              →
            </span>
          );
        }

        if (token === ",") {
          return (
            <span key={`${token}-${index}`} className="input-symbol">
              ,
            </span>
          );
        }

        if (token === "/") {
          return (
            <span key={`${token}-${index}`} className="input-symbol">
              /
            </span>
          );
        }

        return (
          <span key={`${token}-${index}`} className="input-text-token">
            {token}
          </span>
        );
      })}
    </span>
  );
}