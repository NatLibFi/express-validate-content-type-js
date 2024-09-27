export default function ({type}) {
  return (req, res, next) => {
    if (req.is(type)) {
      return next();
    }
    return res.sendStatus(415);
  };
}
