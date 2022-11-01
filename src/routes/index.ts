import express from 'express';
import user from '../user/user.router';
import auth from '../auth/auth.router';
import { createTestMailAccount } from '../utils/mailer';

const router = express.Router();

router.get('/healthcheck', (_, res) => {
    res.sendStatus(200);
})

router.get('/create-dummys', async (_, res) => {
    const response: any = {};
    response.mailAccount = await createTestMailAccount(); //  paste mail credentials to config/default.ts
    res.json(response)
})

router.use(user);
router.use(auth);

export default router;