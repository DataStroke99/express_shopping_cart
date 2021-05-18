let express = require('express');
let app = express();
let path = require('path');







//Routes
let basic = require('../routes/index')
app.use(basic)




app.use(express.static('public'))



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`))




