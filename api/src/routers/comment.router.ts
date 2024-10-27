import { Router } from 'express';
import roleRequire from '../configs/middleware.config';
import {
  addComment,
  addReply,
  getCommentsByObjectId,
} from '../services/comment.service';

const router = Router();

router.post('/', roleRequire(), async (req, res) => {
  const userId = req.userId as string;
  const { objectId, content } = req.body;
  try {
    const comment = await addComment(userId, objectId, content);
    res.status(200).json(comment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/reply/:id', roleRequire(), async (req, res) => {
  const userId = req.userId as string;
  const rootCommentId = req.params.id;
  const { objectId, content } = req.body;
  try {
    const repply = await addReply(rootCommentId, userId, content);
    res.status(200).json(repply);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  const objectId = req.params.id;
  try {
    const comments = await getCommentsByObjectId(objectId);
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
