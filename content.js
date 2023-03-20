function fetchReformatButtonHTML(callback) {
  chrome.runtime.sendMessage(
    {action: 'fetchReformatButtonHTML'},
    (response) => {
      if (chrome.runtime.lastError) {
        callback(chrome.runtime.lastError, null);
      } else if (response.error) {
        callback(new Error(response.error), null);
      } else {
        callback(null, response.html);
      }
    }
  );
}

function addButton() {
  const tweetButton = document.querySelector('[data-testid="tweetButtonInline"]');
  const replyButtons = document.querySelectorAll('[data-testid="tweetButton"]');

  if (tweetButton) {
    const existingReformatButton = tweetButton.nextElementSibling;
    if (!existingReformatButton || !existingReformatButton.matches('[data-testid="reformatButtonInline"]')) {
      insertReformatButton(tweetButton);
    }
  }

  replyButtons.forEach((replyButton) => {
    const existingReformatButton = replyButton.nextElementSibling;
    if (!existingReformatButton || !existingReformatButton.matches('[data-testid="reformatButtonInline"]')) {
      insertReformatButton(replyButton);
    }
  });
}
function insertReformatButton(afterElement) {
  fetchReformatButtonHTML((error, reformatButtonHTML) => {
    if (error) {
      console.error('Failed to fetch reformat-button.html:', error);
      return;
    }

    const template = document.createElement('template');
    template.innerHTML = reformatButtonHTML;
    const reformatButton = template.content.firstChild;

    reformatButton.addEventListener('click', insertTest);

    afterElement.parentNode.insertBefore(reformatButton, afterElement.nextSibling);
  });
}

// Add this function
async function fetchModifiedText(userText, style) {
console.log('Sending userText and style to server:', { userText, style }); // Log the userText and style being sent

  return fetch('https://sjdata.net:444/generate-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userText: userText, style: style }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch modified text from server');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Server data:', data); // Log the received data
      return data;
    });
}

function insertTest(event, modifiedText) {
  const input = document.querySelector('div[role="textbox"][contenteditable="true"]');
  if (!input) return;


  // Focus the input field
  input.focus();

  // Insert the new text at the current cursor position
  document.execCommand('insertText', false, modifiedText);
}

function deleteOriginalText() {
  const input = document.querySelector('div[role="textbox"][contenteditable="true"]');
  if (!input) return;

  // Get the current selection
  const selection = window.getSelection();

  // Create a range from the current cursor position to the end of the input text
  const range = document.createRange();
  range.setStart(selection.anchorNode, selection.anchorOffset);
  range.setEndAfter(input.lastChild);

  // Set the selection to the range
  selection.removeAllRanges();
  selection.addRange(range);

  // Delete the selected text
  document.execCommand('delete');

  // Move the cursor to the end of the text
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}


document.addEventListener('click', async (event) => {
  if (event.target.closest('[data-testid="reformatButtonInline"]')) {
    const userText = getUserText();

    // Wrap the style retrieval in a Promise
    const getStyle = () => {
      return new Promise((resolve) => {
        chrome.storage.sync.get('style', (data) => {
          resolve(data.style || 'Pirate style');
        });
      });
    };

    // Await the style retrieval
    const style = await getStyle();

    // Modify this part to request generated text from GPT API or any other text manipulation
    const modifiedText = await fetchModifiedText(userText, style);
    console.log('Server returned:', modifiedText.modifiedText); // Log the modified text

    // Insert the modified text
    insertTest(event, modifiedText.modifiedText);

    // Add a delay before deleting the original text
    setTimeout(() => {
      deleteOriginalText();
    }, 200);
  }
});
// Check for the "Tweet" button every 500ms
setInterval(addButton, 500);
