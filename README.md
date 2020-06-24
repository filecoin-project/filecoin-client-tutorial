# Filecoin Client Tutorial

#### Store data on the Filecoin Network in under 5 minutes.

## Satisfy dependency requirements

- Make sure you have [homebrew](https://brew.sh/).
- Make sure you run `xcode-select -p`, if the command does not return a response, run `xcode-select --install`.
- Make sure you run `brew install node`.
- Make sure you run `brew install go`.

## Setup Docker

- `brew install docker`.
- Install [Docker for Desktop](https://www.docker.com/products/docker-desktop) if you are running MacOS.

## Terminal
You will need to run three simultaneous terminal windows:

## Setup Lotus DevNet
**In Terminal window 1:**
- Clone the [Lotus DevNet](https://github.com/textileio/lotus-devnet) repository.
- Run `docker run --name texdevnet -e TEXLOTUSDEVNESPEED=1500 -p 1234:7777 textile/lotus-devnet`.


## Setup Powergate
**In Terminal window 2:**
- Clone [Powergate](https://github.com/textileio/powergate/).
- `cd powergate`.
- Build and install the CLI: `make build-pow`.
- Build the Powergate server: `make build-powd`.
- `cd docker`.
- `make devnet`.


## Install and run
**In Terminal window 3:**

Run these commands to start the client locally.

```sh
git clone git@github.com:filecoin-project/filecoin-client-tutorial.git
cd filecoin-client-tutorial
npm install
npm run dev
```
