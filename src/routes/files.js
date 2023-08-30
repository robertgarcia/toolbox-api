/**
 * Files
 * Path : /files/data
 */
import exp from 'express'
import { getFiles } from '../controllers/files'
const fileRouter = exp.Router()
fileRouter.get('/', getFiles)

export { fileRouter }
