#!/usr/bin/env bash
set -euo pipefail

# Install Bun (not preinstalled on Render)
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"

# Build the Vite app in /frontend (root has workspaces but no "build" script)
cd frontend
bun install
bun run build
