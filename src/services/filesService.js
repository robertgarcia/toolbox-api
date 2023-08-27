import axios from 'axios';
const getSecretFiles = async () => { 
    const { data, status } = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
        headers: {
            'authorization': 'Bearer aSuperSecretKey'
        }
    });
    return { data, status };
};

const getFileById = async (id) => {
    try {
        const { data, status } = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${id}`, {
            headers: {
                'authorization': 'Bearer aSuperSecretKey'
            }
        });
        return { data, status };
    } catch (err) {
        return { data: null, status: err.response.status };
    }
};

export { getSecretFiles, getFileById };