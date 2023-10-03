const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/', async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content to return
  const refreshToken = cookies.jwt;

  const foundUser = false; // usersDB.users.find(person => person.refreshToken === refreshToken); TODO: Search db for user with refresh token
  if (foundUser) {
    // TODO: Replace refreshToken from user in db with empty string ''
    // const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    // const currentUser = { ...foundUser, refreshToken: '' };
    // usersDB.setUsers([...otherUsers, currentUser]);
    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'model', 'users.json'),
    //     JSON.stringify(usersDB.users)
    // );
  }

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204);
});

module.exports = router;
