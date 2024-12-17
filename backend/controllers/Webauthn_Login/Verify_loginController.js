const jwt = require("jsonwebtoken");
const db = require("../../db");
require("dotenv").config();
const {verifyAuthenticationResponse } = require("@simplewebauthn/server");

let RP_ID = "localhost";

const Verify_loginController =  async (req, res) => {
    try {
        if (!req.cookies.authInfo) {
            return res.status(400).json({ error: "Authentication info not found" });
        }
        let regInfo = JSON.parse(req.cookies.authInfo);

        db.query(
            "select * from admin where creditional_id=?",
            [regInfo.userId],
            async (err, result) => {
                if (err) throw err;
                else {
                    let db_data = JSON.parse(JSON.stringify(result))[0];
                    if (result.length < 0) {
                        return res.status(400).json({ error: "Invalid user" });
                    } else {
                        let PublicKeyBase64 = db_data.public_Key;
                        const publicKeyBuffer = Buffer.from(PublicKeyBase64, "base64");
                        const publicKeyArray = new Uint8Array(publicKeyBuffer);
                        const verification = await verifyAuthenticationResponse({
                            response: req.body,
                            expectedChallenge: regInfo.challenge,
                            expectedOrigin: process.env.CLIENT_URL,
                            expectedRPID: RP_ID,
                            credential: {
                                id: result.creditional_id,
                                publicKey: publicKeyArray,
                                counter: result.counter,
                                transports: result.transport,
                            },
                        });

                        if (verification.verified) {
                            db.query(
                                `UPDATE admin set counter=? where creditional_id=?`,
                                [verification.authenticationInfo.newCounter, regInfo.userId],
                                (err) => {
                                    if (err) console.log(err);
                                    else {
                                        // jwt token creation
                                        let payload = { username: db_data.name };

                                        const token = jwt.sign(payload, process.env.JWT_STRING);

                                        let cookieOptions = {
                                            maxAge: 30 * 24 * 60 * 60 * 1000, // would expire after 30 days
                                            httpOnly: true,
                                        };
                                        // cookie set
                                        res.cookie("token", token, cookieOptions);
                                        res.clearCookie("authInfo");

                                        return res.json({
                                            message: "Login Successfull",
                                            success: true,
                                        });
                                    }
                                }
                            );
                        }
                    }
                }
            }
        );
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

module.exports = Verify_loginController