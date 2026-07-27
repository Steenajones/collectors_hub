# Collector's Hub

A responsive React + TypeScript app for discovering collectible items, exploring a community feed, and managing a personal collection.

## Features
- Marketplace with search, category/condition filters, sorting, and duplicate protection when adding items to collection
- Community feed with searchable posts, likes, saves, and post cards
- My Collection with owned, wishlist, and selling views, search, filtering, moving between collections, and removal
- Local persistence so collection and feed preferences remain after refresh

## Setup
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open the local Vite URL shown in the terminal

## Scripts
- `npm run dev` - start development mode
- `npm run build` - build for production
- `npx vitest run` - run test suite

## Assumptions
- The app uses mock data rather than a live backend
- Collection actions are intentionally local and client-side for the assignment scope

## Libraries used
- React
- TypeScript
- React Router DOM
- Vite
- Vitest
