import { Request, Response, Router } from "express";
import { Cache } from "../entity/Cache";

const setCache = async (req: Request, res: Response) => {
  const { identifier, cacheJson } = req.body;
  console.log(identifier);

  try {
    const existingCache = await Cache.findOne({ identifier });
    console.log(existingCache);
    if (existingCache) {
      await Cache.delete(existingCache.id);
    }

    const cacheItem = new Cache({ identifier, cacheJson });
    await cacheItem.save();

    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
};

const getCache = async (req: Request, res: Response) => {
  const { identifier } = req.body;

  try {
    const cacheItem = await Cache.findOneOrFail({ identifier });

    console.log(cacheItem);

    if (cacheItem) {
      res.send({ cacheItem });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
};

const router = Router();

router.post("/", setCache);
router.get("/", getCache);

export default router;
