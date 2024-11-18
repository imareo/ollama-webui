# **simple webUI chat for ollama**


This is a sample React project can work with text and multimodal llm.


### Features

* Built with React 18.x
* Supports ES6 syntax and TSX
* Simple proxy server for API request forwarding

### Requirements

1. Install [Ollama](https://ollama.com/download)
2. Set ollama.service environments for cors:
   ```bash
   cd /etc/systemd/system
   sudo vi ollama.service
   
   [Service]  
   Environment="OLLAMA_ORIGINS=*"
   Environment="OLLAMA_HOST=http://0.0.0.0:11434"
   
   sudo systemctl daemon-reload && sudo systemctl restart ollama.service
   ```
3. Select and set up a [model(s)](https://ollama.com/library)

### Getting Started

1. Clone this repository: `git clone https://github.com/imareo/ollama-webui.git`
2. Install dependencies: `npm install`
3. Create /proxy/.env file with `OLLAMA_HOST_PORT=<ollama ip:port>`
4. Run dev: `npm run dev`
5. Build dist: `npm run build`
6. For update all models: `npm run model-update`


### License

This project is licensed under the MIT License. See [LICENSE](https://github.com/imareo/ollama-ui/blob/master/LICENSE) for details.
