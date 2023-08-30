import dot from 'dotenv'
import * as http from 'http'

import app from './middlewares/app'

// Implements configurations globals
dot.config()

// Creamos la instancia en local
const serverLocal = http.createServer(app)

serverLocal.listen(process.env.PORT || 8888, () => {
  console.log(`Server is listening on port ${process.env.PORT} || Environment: ${process.env.NODE_ENV}`)
})

export default app
