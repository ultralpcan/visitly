const { createServer } = require('http')
const path = require('path')
const next = require('next')

const port = process.env.PORT || 3000
const app = next({ dev: false, dir: __dirname })
const handle = app.getRequestHandler()

process.chdir(__dirname)

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Visitly running on port ${port} from ${path.resolve(__dirname)}`)
  })
}).catch(err => {
  console.error('Startup error:', err)
  process.exit(1)
})
