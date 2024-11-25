#!/bin/bash

if [ "$EUID" -ne 0 ]; then
    echo "Please run as root"
    sudo "$0"
    exit
fi

cd /etc/systemd/system || { echo "Failed to change directory"; exit 1; }

if grep -q "OLLAMA_ORIGINS" ollama.service; then
    echo "Environment variables exists. Exit"
    exit 0
else
    env_vars=(
        'Environment="OLLAMA_ORIGINS=*"'
        'Environment="OLLAMA_HOST=http://0.0.0.0:11434"'
    )

    for env_var in "${env_vars[@]}"; do
        echo "$env_var added"
        sudo sed -i "/\[Service\]/a\\$env_var" ollama.service
    done

    sudo systemctl daemon-reload && sudo systemctl restart ollama.service
fi
