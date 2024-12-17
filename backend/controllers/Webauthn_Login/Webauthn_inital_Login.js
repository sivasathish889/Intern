const db = require("../../db");
const {generateAuthenticationOptions } = require("@simplewebauthn/server");

require("dotenv").config();

let RP_ID = "localhost";

const Webauthn_Intial_Login = (req, res) => {
    try {
        let { username } = req.query;

        db.query(
            "select * from admin where name = ?",
            [username],
            async (err, result) => {
                if (err) throw err;
                if (result.length <= 0 ) {
                    return res
                        .status(400)
                        .json({ message: "Invalid Username", success: false });
                } else {
                    let db_data = JSON.parse(JSON.stringify(result))[0];

                    const options = await generateAuthenticationOptions({
                        rpID: RP_ID,
                        allowCredentials: [
                            {
                                id: db_data.creditional_id,
                                type: "public-key",
                                transports: db_data.transports,
                            },
                        ],
                    });

                    res.cookie(
                        "authInfo",
                        JSON.stringify({
                            userId: db_data.creditional_id,
                            challenge: options.challenge,
                        }),
                        { maxAge: 60000 }
                    );

                    return res.json(options);
                }
            }
        );
    } catch (error) {
        return res.status(400).json({ message: "Server Error", success: false });
    }
}

module.exports = Webauthn_Intial_Login