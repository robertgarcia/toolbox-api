import { getSecretFiles, getFileById } from '../services/filesService'
import formatFileCSV from '../utils/formatter'
import CustomError from '../utils/customError'
const getFiles = async (req, res, next) => {
  try {
    const { data, status } = await getSecretFiles()
    if (status !== 200) throw new CustomError('Error while fetching secret files', status, data)

    const fileNames = data.files
    const promiseFunctions = fileNames.map((fileName) => () => getFileById(fileName))
    const results = await Promise.all(promiseFunctions.map(fn => fn()))
    const formatFile = []
    results.forEach((item) => {
      if (item.status === 200) {
        const formatJSON = formatFileCSV(item.data)
        if (formatJSON.success) {
          delete formatJSON.success
          formatFile.push(formatJSON)
        }
      }
    })
    formatFile.sort((a, b) => {
      const nameA = a.file.toUpperCase() // ignore upper and lowercase
      const nameB = b.file.toUpperCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      // names must be equal
      return 0
    })
    res.json(formatFile)
  } catch (err) {
    next(err, req, res)
  }
}

export { getFiles }
