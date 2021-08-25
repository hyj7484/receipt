const app         = require('express')();
const bodyParser  = require('body-parser');
const cors        = require('cors');
const api         = require('./app');

app.use(bodyParser.json());
app.use(cors())
app.use('/', api);
const port = 3100;
app.listen(port, ()=>console.log(`Listening on port ${port}`))
