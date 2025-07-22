const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kafah Injury Case API',
      version: '1.0.0',
      description: 'API for managing years, injury cases, dashboard users, and more',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Year: {
          type: 'object',
          properties: {
            year: { type: 'integer', example: 2024 },
            hijri_year_range: { type: 'string', example: '1445-1446' }
          }
        },
        YearWithWeeks: {
          type: 'object',
          properties: {
            year: { type: 'integer', example: 2024 },
            hijri_year_range: { type: 'string', example: '1445-1446' },
            weeks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  week_number: { type: 'integer', example: 1 },
                  days: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string', example: 'Sunday' },
                        date: { type: 'string', example: '2024-01-07' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        DashboardUserPublic: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            full_name: { type: 'string', example: 'Super Admin' },
            username: { type: 'string', example: 'superadmin' },
            email: { type: 'string', example: 'super.admin@amanah.gov.sa' },
            role: {
              type: 'string',
              enum: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
              example: 'SUPER_ADMIN'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Invalid credentials' },
                code: { type: 'string', example: 'AUTH_FAILED' }
              }
            }
          }
        },
       MobileUserPublic: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 3 },
      full_name: { type: 'string', example: 'User 1' },
      phone: { type: 'string', example: '966500000011' },
      role: {
        type: 'string',
        enum: ['EMPLOYEE', 'FIELD_INSPECTOR'],
        example: 'FIELD_INSPECTOR'
      }
    }
  },

  MobileUserFull: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 3 },
      full_name: { type: 'string', example: 'User 1' },
      phone: { type: 'string', example: '966500000011' },
      email: { type: 'string', example: 'user1@demo.com' },
      gender: { type: 'string', example: 'Male' },
      age: { type: 'integer', example: 27 },
      profession: { type: 'string', example: 'Field Inspector' },
      country: { type: 'string', example: 'Saudi Arabia' },
      role: { type: 'string', example: 'FIELD_INSPECTOR' },
      fingerprint_login_enabled: { type: 'boolean', example: false },
      notifications_enabled: { type: 'boolean', example: true },
      app_language: { type: 'string', example: 'en' },
      is_approved: { type: 'boolean', example: true }
    }
  },
 InjuryCaseInput: {
  type: 'object',
  required: ['investigationCode', 'caseName', 'age', 'gender', 'visitDate'],
  properties: {
    investigationCode: { type: 'string', example: 'INV-10002' },
    caseName: { type: 'string', example: 'Case B' },
    age: { type: 'integer', example: 25 },
    gender: { type: 'string', example: 'Female' },
    nationality: { type: 'string', example: 'Saudi' },
    contactNumber: { type: 'string', example: '0552345678' },
    occupation: { type: 'string', example: 'Teacher' },
    language: { type: 'string', example: 'Arabic' },
    caseAddress: { type: 'string', example: 'Jeddah' },
    coordinates: { type: 'string', example: '21.4858,39.1925' },
    epidemicWeek: { type: 'integer', example: 28 },
    weekDate: { type: 'string', example: '2025-07-14' },
    visitDate: { type: 'string', example: '2025-07-15' },
    visitTime: { type: 'string', example: '11:00' },
    visitDay: { type: 'string', example: 'Monday' }
  }
}



      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    './routes/v1/private/*.js',
    './routes/v1/public/*.js',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
