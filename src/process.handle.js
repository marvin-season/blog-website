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
}

subscriber()
subscriber()
setTimeout(() => {
  publisher('hi')
}, 1000)

