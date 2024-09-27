export default function ({type}) {
  return (req, res, next) => {
    if (req.is(type)) {
      return next();
    }
    res.sendStatus(415);
  };
}
