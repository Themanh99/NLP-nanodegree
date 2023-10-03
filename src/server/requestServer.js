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
  let API_URL = process.env.API_URL;
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

  const formdata = new FormData();
  formdata.append("key", API_KEY);
  formdata.append("txt", "YOUR TEXT HERE");
  formdata.append("lang", "vi");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = fetch(API_URL, requestOptions)
    .then((response) => ({
      status: response.status,
      body: response.json(),
    }))
    .then(({ status, body }) => console.log(status, body))
    .catch((error) => console.log("error", error));
};

export { checkRequest };
