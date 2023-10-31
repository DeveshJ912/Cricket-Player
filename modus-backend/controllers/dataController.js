const fs = require("fs");
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvFilePath = './data/data.csv';

const header = [
    { id: 'id', title: 'id' },
    { id: 'name', title: 'name' },
    { id: 'country', title: 'country' },
    { id: 'fifty', title: 'fifty' },
    { id: 'century', title: 'century' },
    { id: 'matches', title: 'matches' },
];

exports.getData = (req, resp) => {
    const results = [];
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            resp.json({
                status: 'success',
                statusCode: 200,
                results
            });
        });
}

// Create data in the CSV file
exports.addData = (req, resp) => {
    const data = req.body;
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            if (data) {
                let id =1;
                if(results.length){
                    id = +(results[results.length-1].id) + 1;
                }else{
                    fs.writeFileSync(csvFilePath, `${header.map(header => header.title).join(',')}\n`, 'utf-8')
                }
                let data= {};
                data.id = id;
                data.name = req.body.name;
                data.country = req.body.country;
                data.fifty = req.body.fifty;
                data.century = req.body.century;
                data.matches = req.body.matches;

                const csvWriter = createCsvWriter({
                    path: csvFilePath,
                    header: header,
                    append: true,
                });

                csvWriter.writeRecords([data])
                    .then(() => resp.json({ message: 'Data has been created' , status: "success",
                    statusCode: 200}))
                    .catch((error) => resp.status(500).json({ error: error.message }));
            }

        });
}

exports.updateData = (req, resp) => {
    const id = +(req.body.id);
    const newData = req.body;
    const results = [];
    console.log(newData);
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            if (id) {
                let indexid;
                results.forEach((element, index) => {
                    if (element.id == id) {
                        indexid = index;
                    }
                });
                results[indexid] = newData;
                console.log(indexid)
                const csvWriter = createCsvWriter({
                    path: csvFilePath,
                    header: header,
                });

                csvWriter.writeRecords(results)
                    .then(() => resp.json({
                        message: 'Data has been updated', status: "success",
                        statusCode: 200
                    }))
                    .catch((error) => resp.status(500).json({ error: error.message }));
            } else {
                resp.status(404).json({ message: 'Data not found' });
            }
        });
}

exports.deleteData = (req, resp) => {
    const id = parseInt(req.body.id);
    console.log(req.body);
    const results = [];
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            if (id) {
                let indexid;
                results.forEach((element, index) => {
                    if (element.id == id) {
                        indexid = index;
                    }
                });
                results.splice(indexid, 1);
                console.log(indexid, results);
                const csvWriter = createCsvWriter({
                    path: csvFilePath,
                    header: header,
                });

                csvWriter.writeRecords(results)
                    .then(() => resp.json({
                        message: 'Data has been deleted', results, status: "success",
                        statusCode: 200
                    }))
                    .catch((error) => resp.status(500).json({ error: error.message }));
            } else {
                resp.status(404).json({ message: 'Data not found' });
            }
        });
}
