const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export default async function timeout(delay){
  await sleep(delay)
}
