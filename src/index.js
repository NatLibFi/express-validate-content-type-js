export default function ({type}) {
  return (req, res, next) => {
    const contentTypeIsValid = req.is(type);
    const requestHasNoBody = contentTypeIsValid === null;

    if (contentTypeIsValid || requestHasNoBody) {
      return next();
    }
    return res.sendStatus(415);
  };
}
