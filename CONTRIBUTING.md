# Contributing to Peak Ped Manager

We welcome contributions from the community! Please follow these guidelines when opening issues or pull requests.

## Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/peak-studios/peak-pedmanager.git
   ```
2. Make changes to client, server, shared scripts, or NUI frontend in `ui/`.
3. If modifying the NUI:
   ```bash
   cd ui
   npm install
   npm run build
   ```
4. Test changes on a local FiveM server with `oxmysql` enabled.

## Pull Request Process

- Ensure code follows FiveM Lua 5.4 performance guidelines (avoid heavy loops, use distance checks).
- Rebuild NUI assets into `ui/dist` before opening a pull request.
- Keep documentation updated.
