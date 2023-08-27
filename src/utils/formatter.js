const formatFileCSV = (data) => {
    
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    const file =  lines.length > 1 ? lines[1].split(',')[0] : '';
    const jsonData = {
        file,
        lines: [],
        success: lines.length > 1 ? true : false
    };
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const lineData = {
                text: values[1],
                number: parseInt(values[2]),
                hex: values[3]
            };
            jsonData.lines.push(lineData);
        }
    }
  
    return jsonData;
};

export default formatFileCSV;