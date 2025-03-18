import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DB_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
