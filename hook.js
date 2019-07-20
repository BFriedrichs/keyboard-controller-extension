function injectKeyboardGamepad(keyboardMap) {
  function injection() {
    var keyboardMap = JSON.parse('__KEYBOARD_MAP__');

    function setKeyCode(code, value) {
      var result = keyboardMap.find(k => k.code === code);
      if (result === undefined) {
        return;
      }
      switch(result.type) {
        case "button":
          window.keyboardGamepad.buttons[result.index].value = value;
          break;
        case "axis":
          window.keyboardGamepad.axes[result.index] = value !== 0 ? result.value : 0;
          break;
      }
    };

    document.addEventListener("keydown", function(event) {
      setKeyCode(event.code, 1);
    }, false);
    document.addEventListener("keyup", function(event) {
      setKeyCode(event.code, 0);
    }, false);

    window.KeyboardGamepad = function() {
      this.id = "keyboardGamepad";
      this.buttons = [];
      this.axes = [0, 0, 0, 0];
      this.index = 0;
      this.connected = true;
    };
    window.keyboardGamepad = new window.KeyboardGamepad();

    for (var j = 0; j < 18; j++) {
      window.keyboardGamepad.buttons.push({
        value: 0,
        pressed: false
      })
    };

    var gamepads = window.navigator.getGamepads();
    var injectedGamepads = [window.keyboardGamepad];
    for (var i = 0; i < gamepads.length; i++) {
      injectedGamepads.push(gamepads.item(i));
    }
    window.navigator.getGamepads = function() {
      return injectedGamepads;
    };
  }

  return injection.toString().replace("__KEYBOARD_MAP__", JSON.stringify(keyboardMap));
}

(function() {
  chrome.storage.sync.get(null, function(items) {
    if (!items.enabled) {
      return;
    }

    var scriptTag = document.createElement("script");
    scriptTag.async = false;
    scriptTag.innerHTML = `(${injectKeyboardGamepad(items.keyboardMap)})();`;
    document.documentElement.appendChild(scriptTag);
  });
})();
