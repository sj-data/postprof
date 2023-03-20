function getUserText() {
  const input = document.querySelector('div[role="textbox"][contenteditable="true"]');
  if (!input) return null;

  const userText = input.textContent || input.innerText;
  return userText;
}

