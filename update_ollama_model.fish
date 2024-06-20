#!/bin/fish

for model in (ollama list | tail -n +2 | awk '{print $1}')
  ollama pull $model
end