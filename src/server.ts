import cors from "cors";
import express from "express";
import historicRouter from "./routes/historic.routes";
import pressedKeysRouter from "./routes/pressedKeys.routes";
import textsRouter from "./routes/texts.routes";
import userRouter from "./routes/users.routes";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/historic", historicRouter);
app.use("/pressedKeys", pressedKeysRouter);
app.use("/texts", textsRouter);
app.use("/user", userRouter);
app.listen(PORT, () => console.log("server running on port", PORT));
