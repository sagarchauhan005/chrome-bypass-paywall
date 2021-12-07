// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = tab.url;
  console.log("url", url);
  //chrome.storage.sync.set({ url });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
    args: [url],
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor(url) {
  let new_url = "https://12ft.io/"+url;
  window.open(new_url, "_blank");
}
