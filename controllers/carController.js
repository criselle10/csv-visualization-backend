const csv = require('csvtojson')
const fs = require('fs')//fs is Node's file system, required to write files in the file system
// built in-no need to install fs

module.exports.convert = async (params) => {
    //use the current date and time as the file name, with filetype hardcoded as csv
    // Dates are normally used to provide uniqueness because time in unique
    const fileName = `${Date.now()}.csv`

    //get the base64 encoded data from the request body in the route
    // When we upload the data from the CSV is converted to a base64 encoded string
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
-> data is read by csvtojson -> data from the csv -> client
*/

/*
    How file upload work
    Whenever you upload a file from a server, this is what happens:
    1. A new file is created with a unique file name. This is to ensure that there are no duplicate files
    2. Copy to contents of the uploaded file to the newly created file
    3. The new file is then saved in the server's upload folder
    
    Why the need for unique names?
    Ex. Wayne uploads a photo of his lunch in facebook. In Wayne's computer, the filename is pic001.jpg

    Brandon also uploads a photo of his cat infacebook. In Brandom computer, the filename 
*/ 