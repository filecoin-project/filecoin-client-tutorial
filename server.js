import express from "express";
import fs from "fs"
import { ffs, createPow } from "@textile/powergate-client"

const pow = createPow({ host:"http://0.0.0.0:6002" })
const server = express();

server.listen(8080, async () => {

  const { token } = await pow.ffs.create() // save this token for later use!
  console.log({token});
  pow.setToken(token)

  const { cid } = await pow.ffs.addToHot(buffer)
  console.log({cid});
  // store the data in FFS using the default storage configuration
  const { jobId } = await pow.ffs.pushConfig(cid)
  console.log({jobId});
  // cache data in IPFS in preparation to store it using FFS
  const buffer = fs.readFileSync(`dog.jpg`)
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
