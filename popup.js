const saveStyleButton = document.getElementById('save-style');
const styleInput = document.getElementById('style-input');

// Load the last saved style
chrome.storage.sync.get('style', (data) => {
  styleInput.value = data.style || '';
});

saveStyleButton.addEventListener('click', () => {
  const style = styleInput.value;
  chrome.storage.sync.set({ 'style': style }, () => {
    console.log('Style saved:', style);
  });
});