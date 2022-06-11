const jwt = require('jsonwebtoken');
const userDB = require('../models/user');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' '); // 공백을 기준으로 잘라 배열로 반환.

    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인이 필요한 페이지 입니다.',
        });
        return;
    }
    try {
        const { authorId } = jwt.verify(tokenValue, 'yushin-secret-key'); // 유효한 토큰인지 확인. verify
      
        const user = userDB.findById(authorId);
        if(!user)
            res.status(401).send({ errorMessage: '로그인이 필요한 페이지 입니다.'});
        res.locals.user = user;
        next();
       
    } catch (error) {
        // 토큰이 없거나, 유효하지 않은 토큰인 경우 이쪽으로 접근.
        res.status(401).send({ errorMessage: '로그인이 필요한 페이지 입니다.' });
        return;
    }
};