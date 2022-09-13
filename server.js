const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
// REQUIRE ROUTES
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data for POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make these files static resources, so that all of our front-end
// code can be accessed w/o having a specific server endpt. created for it
app.use(express.static('public'));

// USE ROUTES HERE
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});