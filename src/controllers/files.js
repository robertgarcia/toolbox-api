import { getSecretFiles, getFileById } from '../services/filesService';
import formatFileCSV from '../utils/formatter';
const getFiles = async (req, res) => {
    try {
        const { data, status } = await getSecretFiles();
        if (status !== 200) throw new Error('Error while fetching secret files');
        const fileNames = data.files;
        const promiseFunctions = fileNames.map( (fileName) => () => getFileById(fileName) );
        const results = await Promise.all(promiseFunctions.map(fn => fn()));

        let formatFile = [];
        results.forEach( (item) => { 
            if (item.status === 200) {
                const formatJSON = formatFileCSV(item.data);
                if (formatJSON.success) {
                    // const { success, ...newItem } = formatJSON;
                    delete formatJSON['success'];
                    formatFile.push(formatJSON);
                }
            }
        });

        res.json(formatFile);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

export { getFiles };