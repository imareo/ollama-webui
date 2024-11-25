# **simple webUI chat for ollama**


This is a sample React project can work with text and multimodal llm.


### Features

* Built with React 18.x
* Supports ES6 syntax and TSX
* Simple proxy server for API request forwarding

### Requirements

1. Install [Ollama](https://ollama.com/download)
2. Set ollama cors settings - use `./ollama/ollama_cors.sh` script
3. Select and set up a [model(s)](https://ollama.com/library)

### Getting Started

1. Clone this repository: `git clone https://github.com/imareo/ollama-webui.git`
2. Install dependencies: `npm install`
3. Create /proxy/.env file with `OLLAMA_HOST_PORT=<ollama ip:port>`
4. Run dev: `npm run dev`
5. Build dist: `npm run build`


### License

This project is licensed under the MIT License. See [LICENSE](https://github.com/imareo/ollama-ui/blob/master/LICENSE) for details.
