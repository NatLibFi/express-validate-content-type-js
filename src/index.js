export default function ({type}) {
  return (req, res, next) => {
    if (!req.is(type)) {
      res.sendStatus(415);
      return;
    }
    next();
  };
}
