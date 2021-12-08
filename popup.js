// Initialize butotn with users's prefered color
let bypass = document.getElementById("bypass");

// When the button is clicked, inject setPageBackgroundColor into current page
bypass.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = tab.url;
  console.log("url", url);
  //chrome.storage.sync.set({ url });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: generateBypassLink,
    args: [url],
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function generateBypassLink(url) {
  let new_url = "https://12ft.io/"+url;
  window.open(new_url, "_blank");
}
