const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'data.json');


app.get('/api/data', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    });
});


app.post('/api/data', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const existingData = JSON.parse(data);
            const newData = req.body;

            existingData.push(newData);

            fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.json(newData);
                }
            });
        }
    });
});


app.put('/api/data/:index', (req, res) => {
    const index = parseInt(req.params.index);
    
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const existingData = JSON.parse(data);
            const updatedData = req.body;

            existingData[index] = updatedData;

            fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.json(updatedData);
                }
            });
        }
    });
});


app.delete('/api/data/:index', (req, res) => {
    const index = parseInt(req.params.index);

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const existingData = JSON.parse(data);
            existingData.splice(index, 1);

            fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send('Deleted successfully');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
