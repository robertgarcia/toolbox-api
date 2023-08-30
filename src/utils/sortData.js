const sortData = (data) => {
  data.sort((a, b) => {
    const nameA = a.file.toUpperCase()
    const nameB = b.file.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
  return data
}

export default sortData
