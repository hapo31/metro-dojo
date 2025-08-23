#!/bin/bash

npm install -g @anthropic-ai/claude-code
npm install -g @google/gemini-cli

# Install Serena MCP with uv
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project $(pwd)

pnpm install
