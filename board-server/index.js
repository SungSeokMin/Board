const express = require('express');
const fs = require('fs');
const https = require('https');
const session = require('express-session');
const cors = require('cors');

const key = fs.readFileSync(__dirname + '/../key.pem', 'utf-8');
const cert = fs.readFileSync(__dirname + '/../cert.pem', 'utf-8');

const app = express();

app.use(
  session({
    secret: '!@#BoardDev#@!',
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 6 * 60 * 10000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'https://localhost:3000',
    methods: ['GET', 'POST', 'UPDATE', 'OPTIONS'],
    credentials: true,
  })
);

const userRouter = require('./router/user');
const boardRouter = require('./router/board');

app.use('/user', userRouter);
app.use('/board', boardRouter);

const httpsServer = https.createServer({ key, cert }, app).listen(4000, () => {
  console.log('server on 4000 port');
});

module.exports = httpsServer;

// const express = require('express');
// const app = express();
// const session = require('express-session');
// const cors = require('cors');
// const https = require('https');
// const fs = require('fs');
// const UserRouter = require('./router/user/');
// const BoardRouter = require('./router/board/');
// const key = fs.readFileSync(__dirname + '/../key.pem', 'utf-8');
// const cert = fs.readFileSync(__dirname + '/../cert.pem', 'utf-8');

// //* JSON으로 변환
// app.use(express.json());
// //* queryString 파싱
// app.use(express.urlencoded({ extended: true }));
// //* session 설정
// app.use(
//   session({
//     secret: 'Sung',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       domain: 'localhost',
//       path: '/',
//       maxAge: 24 * 6 * 60 * 10000,
//       httpOnly: true,
//       secure: true,
//       sameSite: 'none',
//     },
//   })
// );
// //* cors 설정
// app.use(
//   cors({
//     origin: 'https://localhost:3000',
//     credentials: true,
//     methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'OPTIONS'],
//   })
// );

// //* 각 엔드포인트에 대한 분기
// app.use('/board', BoardRouter);
// app.use('/user', UserRouter);

// const httpsServer = https.createServer({ key, cert }, app).listen(4000, () => {
//   console.log('running server 4000');
// });

// module.exports = httpsServer;
