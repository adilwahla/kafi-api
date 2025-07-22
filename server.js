require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const { swaggerUi, swaggerSpec } = require('./docs/swagger');


const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api/private/v1', require('./routes/v1/private/injury_case.routes'));
//app.use('/api/public/v1', require('./routes/v1/public/injury_case.routes')); // If you create public endpoints



app.use('/api/private/v1', require('./routes/v1/private/dashboardAuth.routes'));
app.use('/api/public/v1', require('./routes/v1/public/dashboardAuth.routes'));

app.use('/api/public/v1', require('./routes/v1/public/mobileAuth.routes'));
app.use('/api/private/v1', require('./routes/v1/private/mobile.routes'));

app.use('/api/public/v1', require('./routes/v1/public/year.routes'));
app.use('/api/private/v1', require('./routes/v1/private/year.routes'));



// ✅ Start Server
app.listen(PORT, async () => {
  try {
  //  await sequelize.sync({alter :true}); // auto-create/alter table
    await sequelize.sync(); // auto-create/alter table
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📘 Swagger Docs available at http://localhost:${PORT}/api-docs`);
  } catch (err) {
    console.error('❌ Failed to connect DB:', err);
  }
});
