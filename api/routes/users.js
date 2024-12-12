const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Обновление пользователя
router.put("/:id", async (req, res) => {
    // Проверяем, имеет ли пользователь право обновлять аккаунт
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        // Если передан новый пароль, хэшируем его
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }

        try {
            // Обновляем только поля username и email, если они переданы
            const updateFields = {};
            if (req.body.username) {
                updateFields.username = req.body.username;
            }
            if (req.body.email) {
                updateFields.email = req.body.email;
            }
            if (req.body.phone) {
                updateFields.phone = req.body.phone;
            }
            if (req.body.fio) {
                updateFields.fio = req.body.fio;
            }
            if (req.body.birth_dt) {
                updateFields.birth_dt = req.body.birth_dt;
            }
            console.log(updateFields)
            // Выполняем обновление
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: updateFields,
            }, { new: true }); // Возвращаем обновленный объект пользователя

            if (!user) {
                return res.status(404).json("Пользователь не найден");
            }

            res.status(200).json("Аккаунт был обновлен");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("Вы можете обновить только свой аккаунт!");
    }
});

//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});

//get a user
router.get("/:id", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username});
            const { password, updatedAt, ...other} = user._doc;
            return res.status(200).json(other);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;