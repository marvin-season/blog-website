const queue = []

function publisher(data) {
  queue.forEach((resolve) => {
    resolve(data)
  })
}

async function subscriber() {
  const result = await new Promise((resolve) => {
    queue.push(resolve)
  })
  console.log('subscriber', result)
  return subscriber()
}

subscriber()
subscriber()
let i = 0

setInterval(() => {
  publisher(i++)
}, 1000)
