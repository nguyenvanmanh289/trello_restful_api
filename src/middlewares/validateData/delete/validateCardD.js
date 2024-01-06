const Joi = require("joi");

//khuon mau de validate data list
const ValidationSchema = Joi.object({
    listId : Joi.string().required(),
    cardId :Joi.string().required()
});

// Middleware kiểm tra và xác thực dữ liệu
const validateCardD = (req, res, next) => {
    const { error, value } =ValidationSchema.validate(req.query, {abortEarly: false});
    console.log(error)
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.query = value;
    next();
};

module.exports = validateCardD;