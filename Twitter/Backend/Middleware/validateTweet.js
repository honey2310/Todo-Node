const validateTweet = (req, res, next) => {
    const { tweet } = req.body;
    if (!tweet || tweet.trim() === "") {
      return res.status(400).json({ error: "Tweet cannot be empty" });
    }
    if (tweet.length < 5) {
      return res
        .status(400)
        .json({ error: "Tweet must be at least 5 characters long" });
    }
    next();
  };
  
  export default validateTweet;
  