import {onRequest} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {getDatabase, ServerValue} from "firebase-admin/database";

// Initialize Firebase
const app = initializeApp();
export const db = getDatabase(app);

export const addToWaitingList = onRequest(
    async (req, res) => {
        try {
            if (req.method !== "POST") {
                res.status(405).json({error: "Method Not Allowed"})
            }
            const {email} = req.body;
            if (!email || typeof email !== "string") {
                res.status(400).json({ error: "Invalid email" });
                return;
            }
            if (!validateEmail(email)) {
                res.status(400).json({ error: "Invalid email" })
                return
            }
            await db.ref("waitingList").push({
                email,
                createdAt: ServerValue.TIMESTAMP,
            });
            res.status(200).json({message: "Success"})
        } catch (e) {
            console.log("LOG_TAG---", "firebase-line#30", e)
            res.status(500).json({error: "Internal Server Error"})
        }
    }
)

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validEmail = emailRegex.test(email);
    console.log("LOG_TAG---", "EmailForm-line#13", validEmail)
    return validEmail;
};
