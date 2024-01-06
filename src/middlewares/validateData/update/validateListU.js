const Joi = require("joi");

//khuon mau de validate data list
const ValidationSchema = Joi.object({
    title: Joi.string().max(40).required(),
    listId: Joi.string().max(40).required()
});

// Middleware kiểm tra và xác thực dữ liệu
const validateListU = (req, res, next) => {
    const { error, value } =ValidationSchema.validate(req.body, {abortEarly: false});
    console.log(error)
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};

module.exports = validateListU;