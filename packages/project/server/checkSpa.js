export default function (req, res, next) {
  const { PAGE_BASE_PATH = '/pages' } = process.env;

  const noSsrPaths = [
    `${PAGE_BASE_PATH}/amis/search2`, // amis不支持ssr模式
  ];

  console.log('checkspa', req.originalUrl);
  if (noSsrPaths.includes(req.originalUrl)) {
    console.log(req.originalUrl, 'spa');
    res.spa = true;
  }

  next();
};
