# Tweet Reformatter

A Chrome extension that adds a button to reformat tweets using OpenAI's GPT-3.5 API.

![Tweet Reformatter Logo](icon256.png)

## Features

- Adds a "Reformat" button to tweet input fields on Twitter.
- Reformats tweets using OpenAI's GPT-3.5 API in the user-defined style.
- Automatically inserts the reformatted text into the tweet input field.
- Allows users to save their desired text style for future use.

## Installation

1. Clone this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable Developer mode by toggling the switch in the top-right corner.
4. Click "Load unpacked" and select the repository folder.
5. The extension should now be added to your browser.

## Usage

1. Visit Twitter and navigate to a tweet input field.
2. Click the "Reformat" button beneath the input field to reformat the text using the GPT-3.5 API.
3. Optionally, right-click the extension icon and choose "Options" to set the desired text style.

## Project Structure

- `background.js`: Handles fetching the `reformat-button.html` content.
- `content.js`: Main script that adds the "Reformat" button and interacts with the GPT-3.5 API.
- `manifest.json`: Chrome extension manifest file.
- `popup.html`: HTML for the extension popup.
- `popup.js`: Script for saving the user-defined style.
- `readInput.js`: Function for getting the user's text from the input field.
- `reformat-button.js`: HTML template for the "Reformat" button.
- `styles.css`: Custom styles for the "Reformat" button.

## License

[MIT License](LICENSE)
