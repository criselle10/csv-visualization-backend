const csv = require('csvtojson')
const fs = require('fs')//fs is Node's file system, required to write files in the file system

module.exports.convert = async (params) => {
    //use the current date and time as the file name, with filetype hardcoded as csv
    const fileName = `${Date.now()}.csv`
    //get the base64 encoded data from the request body in the route
    const base64String = params.csvData
    //prepare the base64 encoded string to be rebuilt back to csv format
    const base64Csv = base64String.split(';base64,').pop()
    //designated file path where file will be written, directory HAS TO EXIST, will NOT be created if non-existent at time of writing
    const csvFilePath = `uploads/${fileName}`
    //save the CSV file in the designated file path
    await fs.writeFile(csvFilePath, base64Csv, {encoding: 'base64'}, () => {})
    //convert csv to json using the fromFile() method of the object created from csvtojson's csv() constructor
    const jsonArray = await csv().fromFile(csvFilePath)
    console.log(jsonArray)
    return {jsonArray: jsonArray}
}

/* 
client-side:
csv -> base64 string -> request body as stringified JSON

API-side:
stringified JSON in request body -> convert back to CSV file type -> save in file system via Node fs
*/