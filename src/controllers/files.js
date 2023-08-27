import { getSecretFiles, getFileById } from '../services/filesService';
import formatFileCSV from '../utils/formatter';
import CustomError from '../utils/customError';
const getFiles = async (req, res, next) => {
    try {
        const { data, status } = await getSecretFiles();
        if (status !== 200) throw new CustomError('Error while fetching secret files', status, data);
        
        const fileNames = data.files;
        const promiseFunctions = fileNames.map( (fileName) => () => getFileById(fileName) );
        const results = await Promise.all(promiseFunctions.map(fn => fn()));
        let formatFile = [];
        results.forEach( (item) => { 
            if (item.status === 200) {
                const formatJSON = formatFileCSV(item.data);
                if (formatJSON.success) {
                    delete formatJSON['success'];
                    formatFile.push(formatJSON);
                }
            }
        });
        res.json(formatFile);
    } catch (err) {
        next(err, req, res);
    }
};

export { getFiles };