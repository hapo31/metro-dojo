# CLAUDE.md

You answer is in japanese.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

metro-dojo is a web service providing useful tools for Street Fighter 6 players, implemented as a monorepo with Next.js frontend and tRPC API backend. The main feature is Command Beautifier, which generates clean visual representations of fighting game command inputs.

**Important for Claude Code**: This project is configured with Serena MCP (Model Context Protocol) to enable efficient code analysis and editing. When working with this codebase, prioritize using Serena's symbolic tools (`find_symbol`, `get_symbols_overview`, `search_for_pattern`) over reading entire files to minimize token consumption. Use the overview and targeted symbol reading approach instead of full file reads whenever possible.

## Architecture

- **Monorepo structure** using pnpm workspace
- **Frontend**: Next.js 15 app (`apps/web`) with React 19, Tailwind CSS, and tRPC client
- **API**: Node.js server (`packages/api`) with tRPC, canvas rendering for image generation
- **Packages**: Modular packages in `packages/` directory for shared functionality

Key dependencies:
- tRPC for type-safe API communication
- @napi-rs/canvas for server-side image generation  
- Biome for linting and formatting
- TypeScript with strict configuration

## Development Commands

```bash
# Development (starts both API and web concurrently)
pnpm dev

# Individual services
pnpm dev:api    # API server on port 3001
pnpm dev:web    # Next.js on port 3000

# Build
pnpm build      # Builds all packages and web app

# Linting and formatting
pnpm lint       # Check code style with Biome
pnpm lint:fix   # Fix linting issues
pnpm format     # Format code with Biome

# Type checking
pnpm --filter web typecheck    # Web app type check
pnpm --filter api typecheck    # API type check

# Package management
pnpm add:web <package>    # Add dependency to web app
pnpm add:api <package>    # Add dependency to API
```

## Project Structure

```
apps/
  web/                    # Next.js frontend
    src/app/
      _trpc/             # tRPC client setup
      api/trpc/          # tRPC API route handler
      command-beautifier/ # Command beautifier UI
packages/
  api/                   # tRPC API server
    src/
      assets/icons/      # Game button/command icons
      server.ts         # Main server
      trpc.ts          # tRPC configuration
  command-renderer/      # Command rendering package (WIP)
docs/                   # Project documentation
  00_concepts.md        # Core concepts and Command Beautifier overview
  01_command_beautifier.md # Implementation details
  02_command_renderer.md   # Rendering package specification
```

## Command Beautifier Feature

Core functionality that converts fighting game command notation into clean visual representations:
- Parses command strings (e.g., "236K", "強P") into normalized format
- Generates images using canvas with game button icons
- Supports multiple display styles (numpad notation, icons, move names)
- Serves images via direct URL embedding and OGP support

The system uses a command parser to normalize various input formats (Japanese, English, full-width characters) into a consistent internal representation, then renders them as images using the icon assets in `packages/api/src/assets/icons/`.

## Type Safety

- All API communication uses tRPC for end-to-end type safety
- Workspace packages are linked with `workspace:*` pattern
- API types are built separately and consumed by web app (see predev script)
- Strict TypeScript configuration across all packages