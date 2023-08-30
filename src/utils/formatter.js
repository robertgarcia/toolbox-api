const formatFileCSV = (data) => {
  const lines = data.split('\n')
  const headers = lines[0].split(',')
  const jsonData = {
    file: '',
    lines: [],
    success: false
  }
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').filter(element => element)
    if (values.length === headers.length) {
      if (values[1] !== '' && values[2] !== '' && values[3] !== '') {
        const lineData = {
          text: values[1],
          number: parseInt(values[2]),
          hex: values[3]
        }
        jsonData.lines.push(lineData)
      }
    }
  }

  jsonData.lines.length > 0 ? jsonData.success = true : jsonData.success = false
  jsonData.lines.length > 0 ? jsonData.file = lines[1].split(',')[0] : jsonData.file = ''

  return jsonData
}

export default formatFileCSV
