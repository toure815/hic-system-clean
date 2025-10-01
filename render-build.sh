#!/usr/bin/env bash
set -euo pipefail

# Ensure Bun is installed (Render may already provide, but this forces it)
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"

# Print Bun version for sanity
bun --version

# Install root dependencies (monorepo)
bun install

# Build frontend explicitly
cd frontend
bun install
bun run build
