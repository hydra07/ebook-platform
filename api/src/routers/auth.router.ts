import { Router } from 'express';
import authenticate from '../services/auth.service';

const router = Router();

router.post('/', async (req, res) => {
  const { provider, providerAccountId, name, email, image, username } =
    req.body;
  const result = await authenticate(
    { name, email, image, username },
    { provider, providerAccountId },
  );
  return res.json(result);
});

export default router;
