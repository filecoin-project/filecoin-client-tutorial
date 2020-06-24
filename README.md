# Filecoin Client Tutorial

A simple tutorial for starting an express server and storing data on the Filecoin Network in under 5 minutes.


## Satisfy dependency requirements

- Make sure you have [homebrew](https://brew.sh/).
- Make sure you run `xcode-select -p`, if the command does not return a response, run `xcode-select --install`
- Make sure you run `brew install node`
- Make sure you run `brew install go`


## Setup Docker

- `brew install docker`.
- Install [Docker for Desktop](https://www.docker.com/products/docker-desktop) if you are running MacOS.



## Terminal
You will need to run three simultaneous terminal windows:



## Setup Lotus DevNet
**In Terminal window 1:**
- Clone the [Lotus DevNet](https://github.com/textileio/lotus-devnet) repository: `git@github.com:textileio/lotus-devnet.git`
- Run `docker run --name texdevnet -e TEXLOTUSDEVNESPEED=1500 -p 1234:7777 textile/lotus-devnet`


## Setup Powergate
**In Terminal window 2:**
- Clone the [Powergate](https://github.com/textileio/powergate/) repository: `git@github.com:textileio/powergate.git`
- `cd powergate`
- Build and install the CLI: `make build-pow`
- Build the Powergate server: `make build-powd`
- `cd docker`
- `make devnet`


## Install and run
**In Terminal window 3:**

Run these commands to start the client locally.

```sh
git clone git@github.com:filecoin-project/filecoin-client-tutorial.git
cd filecoin-client-tutorial
npm install
```

## Create a server.js file

The main API you will interact with is the Filecoin File System (FFS).

```sh
//import express server
import express from "express";

import fs from "fs"
import { ffs, createPow } from "@textile/powergate-client"

const pow = createPow({ host:"http://0.0.0.0:6002" })
const server = express();

server.listen(8080, async () => {

  //create a new FFS instance.
  const { token } = await pow.ffs.create()
  console.log({token});

  //set the auth token that the Powergate client to use.
  pow.setToken(token)

  // cache data in IPFS in preparation to store it using FFS
  const { cid } = await pow.ffs.addToHot(buffer)
  console.log({cid});
  const buffer = fs.readFileSync(`dog.jpg`)

  // store the data in FFS using the default storage configuration
  const { jobId } = await pow.ffs.pushConfig(cid)
  console.log({jobId});

  // watch the FFS job status to see the storage process progressing
  const cancel = pow.ffs.watchJobs((job) => {
    console.log({job})
    if (job.status === ffs.JobStatus.CANCELED) {
      console.log("job canceled")
    } else if (job.status === ffs.JobStatus.FAILED) {
      console.log("job failed")
    } else if (job.status === ffs.JobStatus.SUCCESS) {
      console.log("job success!")
    }
  }, jobId);
});
```

- Run `node .`

Go to the [Filecoin Client](https://github.com/filecoin-project/filecoin-client/) to see the full end to end application.

## References
- https://blog.textile.io/integrating-powergate/
- https://github.com/textileio/js-powergate-client
