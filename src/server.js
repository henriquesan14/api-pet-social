import app from './app';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './swagger.json'

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
app.listen(3333);
