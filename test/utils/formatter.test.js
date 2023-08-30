import { expect } from 'chai'
import { describe, before, it } from 'mocha'
import formatFileCSV from '../../src/utils/formatter'

describe('formatFileCSV', () => {
  // Tests that the function returns an object with 'file', 'lines', and 'success' properties when the data is empty
  it('should return an object with empty properties when the data is empty', () => {
    // Arrange
    const data = ''

    // Act
    const result = formatFileCSV(data)

    // Assert
    expect(result).to.deep.equal({
      file: '',
      lines: [],
      success: false
    })
  })

  // Tests that the function returns an object with 'file', 'lines', and 'success' properties when the data has only headers
  it('should return an object with empty properties when the data has only headers', () => {
    // Arrange
    const data = 'header1,header2,header3'

    // Act
    const result = formatFileCSV(data)

    // Assert
    expect(result).to.deep.equal({
      file: '',
      lines: [],
      success: false
    })
  })

  // Tests that the function returns an object with 'file', 'lines', and 'success' properties when the data has only one line with missing values
  it('should return an object with empty properties when the data has only one line with missing values', () => {
    // Arrange
    const data = 'header1,header2,header3\nvalue1,,value3'

    // Act
    const result = formatFileCSV(data)

    // Assert
    expect(result).to.deep.equal({
      file: '',
      lines: [],
      success: false
    })
  })

  // Tests that the function returns an object with 'file', 'lines', and 'success' properties when the data has only one line with empty 'text', 'number', or 'hex' values
  it('should return an object with empty properties when the data has only one line with empty values', () => {
    // Arrange
    const data = 'header1,header2,header3\ntext,,'

    // Act
    const result = formatFileCSV(data)

    // Assert
    expect(result).to.deep.equal({
      file: '',
      lines: [],
      success: false
    })
  })

  // Tests that the function returns an object with 'file', 'lines', and 'success' properties when the data has multiple lines with missing values
  it('should return an object with empty properties when the data has multiple lines with missing values', () => {
    // Arrange
    const data = 'file,text,number,hex\nfile1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765\nvalue4,,value6'

    // Act
    const result = formatFileCSV(data)

    // Assert
    expect(result).to.deep.equal({
      file: 'file1.csv',
      lines: [{
        hex: '70ad29aacf0b690b0467fe2b2767f765',
        number: 64075909,
        text: 'RgTya'
      }],
      success: true
    })
  })

  // Tests that the function returns an object with 'file', 'lines', and 'success' properties when the data has multiple lines with correct values but extra commas
  it('should return an object with "file", "lines", and "success" properties when the data has multiple lines with correct values but extra commas', () => {
    // Arrange
    const data = 'file,text,number,hex\nfile1,text1,1,#000\nfile1,text2,2,#FFF,\nfile1,text3,3,#ABC,\n'

    // Act
    const result = formatFileCSV(data)

    // Assert
    expect(result).to.deep.equal({
      file: 'file1',
      lines: [
        {
          text: 'text1',
          number: 1,
          hex: '#000'
        },
        {
          text: 'text2',
          number: 2,
          hex: '#FFF'
        },
        {
          text: 'text3',
          number: 3,
          hex: '#ABC'
        }
      ],
      success: true
    })
  })
})
