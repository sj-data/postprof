chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchReformatButtonHTML') {
    fetch(chrome.runtime.getURL('reformat-button.html'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch reformat-button.html');
        }
        return response.text();
      })
      .then((html) => sendResponse({html}))
      .catch((error) => sendResponse({error: error.message}));
    return true; // Required to use `sendResponse` asynchronously.
  }

});