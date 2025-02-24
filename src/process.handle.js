class Producer {
  constructor(coreProcessor) {
    this.coreProcessor = coreProcessor
  }
  async produce(message) {
    this.coreProcessor.queue.push({
      middleware: (message) => {
        return message
      },
      stream: false,
    })
    this.coreProcessor.handle(message)
  }
}

class Consumer {
  constructor(coreProcessor) {
    this.coreProcessor = coreProcessor
  }
  async consume(message) {
    console.log('consume', message)
  }
}

class CoreProcessor {
  queue = [] // middleware queue
  constructor() {
    this.producer = new Producer(this)
    this.consumer = new Consumer(this)
  }

  use(middleware, { stream = false } = {}) {
    this.queue.push({
      middleware,
      stream,
    })
  }

  async handleStream(message, middleware) {
    const iter = middleware(message)
    let msg = ''
    for await (const item of iter) {
      msg += item
      this.consumer.consume(item)
    }
    return msg
  }

  async handle(msg) {
    let message = msg
    for (const { middleware, stream } of this.queue) {
      if (stream) {
        message = await this.handleStream(message, middleware)
      } else {
        message = await middleware(message)
      }
    }
    this.consumer.consume(message)
  }
}

const coreProcessor = new CoreProcessor()

coreProcessor.use(
  async function* (promiseMessage) {
    for await (const item of promiseMessage) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      yield item
    }
  },
  {
    stream: true,
  }
)

coreProcessor.use((message) => {
  console.log('full log', message)
  return message
})
coreProcessor.producer.produce('hi')
