import dotenv from "dotenv";
dotenv.config();

const checkRequest = async (req, res, next) => {
  /**
   * TODO: Check if input text is null or empty
   */
  if (!req.body.text) {
    return res.status(400).json({
      message: "Input text is required!",
    });
  }

  let API_KEY = null;
  console.log("Call API.....");
  try {
    API_KEY = process.env.API_KEY;
    if (!API_KEY)
      return {
        status: {
          code: 500,
          msg: "API_KEY not found!",
        },
      };
  } catch (err) {
    return next(err);
  }
};

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

export { checkRequest };
