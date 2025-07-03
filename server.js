const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/auth.route.js');
const bookRoutes = require('./routes/book.route.js');
const logger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/errorHandler.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(logger);

const PORT = process.env.PORT

const swaggerOptions = {
  swaggerOptions: {
    persistAuthorization: true 
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use('/auth', authRoutes);
app.use('/book', bookRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
