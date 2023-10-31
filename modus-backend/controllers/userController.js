const fs = require("fs");
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));


exports.registerUser = (req, resp) => {
    const newUser = Object.assign(req.body);
    const user = users.find(el => el.email === req.body.email);
    if (user) {
        return resp.status(200).json({
            status: "fail",
            statusCode: 204,
            message: `User with email ${req.body.email} already exists, please login`
        })
    }
    users.push(newUser);
    fs.writeFile('./data/users.json', JSON.stringify(users), (err) => {
        resp.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Created",
            data: {
                user: newUser
            }
        })
    })
}

exports.login = (req, resp) => {
    console.log(req.body);
    const user = users.find(el => el.email === req.body.email);
    if (!user) {
        return resp.status(404).json({
            status: "fail",
            statusCode: 404,
            message: `User with email ${req.body.email} not found. Please Register`
        })
    } else {
        if (user.password == req.body.password) {
            return resp.status(200).json({
                status: "success",
                statusCode: 200,
                user
            })
        }
        return resp.status(200).json({
            status: "success",
            statusCode: 400,
            message:"Please enter correct credentials"
        })


    }
}

exports.validateBody = (req, resp, next) => {
    console.log(req.body)
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
        return resp.status(400).json({
            status: "fail",
            statusCode: 400,
            message: "Invalid request"
        })
    }
    next();
}