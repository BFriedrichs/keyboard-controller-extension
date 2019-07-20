// maps keycode to button index
var KEYBOARD_MAP = [
  { type: "axis", index: 1, value: -1, code: "KeyW", label: "Left Stick: Up" },
  { type: "axis", index: 0, value: -1, code: "KeyA", label: "Left Stick: Left" },
  { type: "axis", index: 1, value: 1, code: "KeyS", label: "Left Stick: Down" },
  { type: "axis", index: 0, value: 1, code: "KeyD", label: "Left Stick: Right" },
  { type: "button", index: 12, code: "KeyI", label: "DPad Up" },
  { type: "button", index: 14, code: "KeyJ", label: "DPad Left" },
  { type: "button", index: 13, code: "KeyK", label: "DPad Down" },
  { type: "button", index: 15, code: "KeyL", label: "DPad Right" },
  { type: "button", index: 8, code: "Backspace", label: "Select" },
  { type: "button", index: 1, code: "KeyZ", label: "A" },
  { type: "button", index: 0, code: "KeyX", label: "B" },
  { type: "button", index: 2, code: "KeyC", label: "Y" },
  { type: "button", index: 3, code: "KeyV", label: "X" },
  { type: "axis", index: 2, value: -1, code: "ArrowUp", label: "Right Stick: Up" },
  { type: "axis", index: 3, value: -1, code: "ArrowLeft", label: "Right Stick: Left" },
  { type: "axis", index: 2, value: 1, code: "ArrowDown", label: "Right Stick: Down" },
  { type: "axis", index: 3, value: 1, code: "ArrowRight", label: "Right Stick: Right" },
  { type: "button", index: 9, code: "Enter", label: "Start" },
  { type: "button", index: 4, code: "KeyQ", label: "Shoulder Left: Front" },
  { type: "button", index: 5, code: "KeyE", label: "Shoulder Right: Front" },
  { type: "button", index: 6, code: "KeyU", label: "Shoulder Left: Back" },
  { type: "button", index: 7, code: "KeyO", label: "Shoulder Right: Front" },
];

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === "install") {
    chrome.storage.sync.set({
      keyboardMap: KEYBOARD_MAP,
      enabled: true
    });
  }
});