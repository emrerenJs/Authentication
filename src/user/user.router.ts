import express from 'express';
import { validatePayload } from '../utils/validator';
import { createUserHandler } from './user.controller';
import { createUserSchema } from './user.schema';

const router = express.Router();

router.post('/users', validatePayload(createUserSchema), createUserHandler);

export default router;