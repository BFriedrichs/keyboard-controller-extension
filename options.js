var currMap = null;
var currListener = null;

function updateStatus(text) {
  var status = document.getElementById("status");
  if(!text) {
    status.style.display = "none";
    return;
  }
  status.style.display = "block";
  status.innerHTML = text;
}

function updateKey(button, index, event) {
  var item = currMap[index];
  if (event.code === "Escape" || event.code === item.code) {
    document.removeEventListener("keydown", currListener);
    button.innerHTML = item.code.replace("Key", "");
    return;
  }
  if (currMap.find(k => k.code === event.code)) {
    updateStatus(`${event.code.replace("Key", "")} is already in use!`);
    return;
  }
  document.removeEventListener("keydown", currListener);
  currMap[index].code = event.code;

  chrome.storage.sync.set({
    keyboardMap: currMap
  }, function() {
    updateStatus();
    button.innerHTML = event.code.replace("Key", "");
  });
}

function changeKey(index, event) {
  var button = event.target;
  button.innerHTML = "[Press Key]";

  currListener = updateKey.bind(this, button, index);
  document.addEventListener("keydown", currListener);
}

function setEnabled(event) {
  chrome.storage.sync.set({
    enabled: event.target.checked
  });
}

function loadOptions() {
  var isEnabledNode = document.getElementById("enabled");
  isEnabledNode.addEventListener("change", setEnabled);

  chrome.storage.sync.get(null, function(items) {
    isEnabledNode.checked = !!items.enabled;

    currMap = items.keyboardMap || JSON.parse(JSON.stringify(KEYBOARD_MAP));

    var mappingContainer = document.getElementById("mappingContainer");
    for (var i = 0; i < currMap.length; i++) {
      var currentItem = currMap[i];
      var row = document.createElement("div");
      row.className = "row";

      var label = document.createElement("span");
      label.innerHTML = currentItem.label;
      label.className = "label";
      row.appendChild(label);

      var changeButton = document.createElement("button");
      changeButton.innerHTML = currentItem.code.replace("Key", "");
      changeButton.addEventListener('click', changeKey.bind(this, i));
      changeButton.className = "change-button";
      row.appendChild(changeButton);

      mappingContainer.append(row);
    }
  });
}
document.addEventListener('DOMContentLoaded', loadOptions);