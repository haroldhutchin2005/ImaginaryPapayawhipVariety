// routes/tiktok.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/tikstalk', async (req, res) => {
  try {
    const { unique_id } = req.query;
    if (!unique_id) return res.json({ error: 'Missing unique_id parameter.' });

    const response = await axios.post('https://www.tikwm.com/api/user/info?unique_id=@', {
      unique_id: unique_id
    });

    const data = response.data.data;
    console.log(data);

    if (!data || !data.user) {
      return res.json({ error: 'User data not found.' });
    }

    const userInfo = {
      id: data.user.id,
      nickname: data.user.uniqueId,
      username: data.user.nickname,
      avatarLarger: data.user.avatarLarger,
      signature: data.user.signature,
      secUid: data.user.secUid,
      relation: data.user.relation,
      bioLink: data.user.bioLink,
      videoCount: data.stats.videoCount,
      followingCount: data.stats.followingCount,
      followerCount: data.stats.followerCount,
      heartCount: data.stats.heartCount,
      diggCount: data.stats.diggCount
    };

    res.json(userInfo);
  } catch (error) {
    res.json({ error: 'Internal server error.' });
  }
});

module.exports = router;
