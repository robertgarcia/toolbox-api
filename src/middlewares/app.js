import exp from 'express'
import corsx from 'cors'

import errorHandler from './handlerError'
import { fileRouter } from '../routes/files'

const app = exp()

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: ['GET', 'OPTIONS']
}

app.use(corsx(corsOptions))
app.use(exp.json({ limit: '50mb' }))
app.use('/files/data', fileRouter)
app.use(errorHandler)

export default app
