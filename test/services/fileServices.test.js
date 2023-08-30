import { expect } from 'chai'
import { describe, it } from 'mocha'
import sinon from 'sinon'
import axios from 'axios'
import { getSecretFiles, getFileById } from '../../src/services/filesService'
describe('getSecretFiles', () => {
  // Tests that the function successfully retrieves secret files with a valid authorization token
  it('should successfully retrieve secret files with a valid request', async () => {
    // Arrange
    const expectedData = {
      files: [
        'test1.csv',
        'test2.csv',
        'test3.csv',
        'test18.csv',
        'test4.csv',
        'test5.csv',
        'test6.csv',
        'test9.csv',
        'test15.csv'
      ]
    }
    const expectedStatus = 200
    const axiosGetStub = sinon.stub(axios, 'get').resolves({ data: expectedData, status: expectedStatus })

    // Act
    const result = await getSecretFiles()

    // Assert
    expect(result.data).to.deep.equal(expectedData)
    expect(result.status).to.equal(expectedStatus)
    expect(axiosGetStub.calledOnce).to.equal(true)

    // Clean up
    axiosGetStub.restore()
  })

  // Tests that the function returns an error message and status code when the request is unauthorized
  it('should return an error message and status code when the request is unauthorized', async () => {
    // Arrange
    const expectedErrorMessage = 'Unauthorized'
    const expectedStatus = 401
    const axiosGetStub = sinon.stub(axios, 'get').rejects({ message: expectedErrorMessage, response: { status: expectedStatus } })

    // Act
    const result = await getSecretFiles()

    // Assert
    expect(result.data).to.equal(expectedErrorMessage)
    expect(result.status).to.equal(expectedStatus)
    expect(axiosGetStub.calledOnce).to.equal(true)

    // Clean up
    axiosGetStub.restore()
  })

  // Tests that the function returns an error message and status code when a server error occurs method gets called getsecretfiles
  it('should return an error message and status code when a server error occurs', async () => {
    // Arrange
    const expectedErrorMessage = 'Internal Server Error'
    const expectedStatus = 500
    const axiosGetStub = sinon.stub(axios, 'get').rejects({ message: expectedErrorMessage, response: { status: expectedStatus } })

    // Act
    const result = await getSecretFiles()

    // Assert
    expect(result.data).to.equal(expectedErrorMessage)
    expect(result.status).to.equal(expectedStatus)
    expect(axiosGetStub.calledOnce).to.equal(true)

    // Clean up
    axiosGetStub.restore()
  })
})

describe('getFileById', () => {
  // Tests that getFileById successfully retrieves a file with a valid id
  it('should successfully retrieve a file with a valid id', async () => {
    // Arrange
    const id = 'test6.csv'
    const expectedData = `file,text,number,hex
    test15.csv,nv,,
    test15.csv,ciefysZvoaqSOE,,
    test15.csv,NewvSCUeNAqtwzQiSOKunMpIJuQCJ,,
    test15.csv,MMRejsciEBlWpQmaOAZAQhcJxqAAU,,
    test15.csv,dTJItw,,
    test15.csv,ryELNfmskz,,
    test15.csv,RDLH,,
    test15.csv,jERhufgIHwjBxUVPmVdTvXjn,,
    test15.csv,MdrilRboIZ,,,,
    test15.csv,TTvb
    test15.csv,XDGhxwcTIdAocmdOodVLV,,
    test15.csv,PIQIwxyvUHXfDTvbOjj,,
    test15.csv,I,,
    test15.csv,uVAplTjiPWkbjtdqGEYwXeqPh,,
    test15.csv,xlnpuSNcHOUo,,
    test15.csv,vwsVmbVMTTRafOHUsDpUKVUfMuXv,,`
    const expectedStatus = 200
    const axiosGetStub = sinon.stub(axios, 'get').resolves({ data: expectedData, status: expectedStatus })

    // Act
    const result = await getFileById(id)

    // Assert
    expect(result.data).to.equal(expectedData)
    expect(result.status).to.equal(200)
    expect(axiosGetStub.calledOnce).to.equal(true)

    // Clean up
    axiosGetStub.restore()
  })

  // Tests that the function returns the correct status code for a non-existent id
  it('should return the correct status code (400) for a non-existent id', async () => {
    const nonExistentId = 'test100.csv'
    const expectedData = null
    const expectedStatus = 400

    const axiosGetStub = sinon.stub(axios, 'get').resolves({ data: expectedData, status: expectedStatus })
    const result = await getFileById(nonExistentId)

    expect(result.data).to.equal(null)
    expect(result.status).to.equal(expectedStatus)
    expect(axiosGetStub.calledOnce).to.equal(true)

    // Clean up
    axiosGetStub.restore()
  })

  // Tests that the function returns an error message and status code when a server error occurs method gets called getfilesbyid
  it('should return an error message and status code when a server error occurs', async () => {
    // Arrange
    const existentId = 'test10.csv'
    const expectedErrorMessage = 'Internal Server Error'
    const expectedStatus = 500
    const axiosGetStub = sinon.stub(axios, 'get').rejects({ message: expectedErrorMessage, response: { status: expectedStatus } })

    // Act
    const result = await getFileById(existentId)

    // Assert
    expect(result.data).to.equal(expectedErrorMessage)
    expect(result.status).to.equal(expectedStatus)
    expect(axiosGetStub.calledOnce).to.equal(true)

    // Clean up
    axiosGetStub.restore()
  })
})
