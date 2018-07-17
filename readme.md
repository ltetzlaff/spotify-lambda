# spotify-lambda

[![Build Status](https://travis-ci.com/ai-hackathon-affective-computing/spotify-lambda.svg?branch=master)](https://travis-ci.com/ai-hackathon-affective-computing/spotify-lambda)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Setup (in ./)

### Install NodeJS

[Download](https://nodejs.org/en/download/current/)

### Fetch dependencies

```bash
npm install
```

## Dev (in ./)

Typescript builds are automatic and watch for file changes:
```bash
npm run build
```

or run this to build only once:
```bash
npm run buildOnce
```

Building, Linting, Formatting, Testing:
```bash
npm test
```

## Deploy

- Put your stuff in `.env` and `.serverless.env.yml` file

```bash
npm run deploy
```

## Use

- Go to [spotify dev dashboard](https://developer.spotify.com/dashboard/applications)
  - Set redirect uri to be this app's public url for the `/redirect` handler
  - Put `SPOTIFY_SECRET`, `SPOTIFY_CLIENT_ID` and `SPOTIFY_REDIRECT_URI` in your `.env`
- Send users to `/login` to approve login
- Send users to `/api` to retrieve stuff from API

## Useful Ressources

[guides](https://developer.spotify.com/documentation/general/guides/scopes/)
