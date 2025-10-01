#!/usr/bin/env bash
set -euo pipefail

# Force Bun install
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"

# Print Bun version for sanity
bun --version

# Install dependencies in root (monorepo)
bun install

# Build frontend explicitly
cd frontend
bun install
bun run build
cd ..
