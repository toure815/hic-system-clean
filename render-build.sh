#!/usr/bin/env bash
set -euo pipefail

# Install Bun
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"

echo "Using Bun version:"
bun --version

# Install root deps (monorepo style)
bun install --no-save

# Build frontend
cd frontend
bun install --no-save
bun run build
