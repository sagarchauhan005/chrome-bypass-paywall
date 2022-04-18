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
  // check if the url is a medium article
  let new_url = "https://12ft.io/"+url;
  if(url.includes("medium.com")){
    new_url = "https://postscripts.medium.com/bypass-paywall-so-this-happened-2e3de621335";
  }
  console.log("Medium article cannot be bypassed, for more information please visit: https://postscripts.medium.com/bypass-paywall-so-this-happened-2e3de621335");
  console.log("new_url", new_url);
  window.open(new_url, "_blank");
}
