import dotenv from "dotenv";
import app from "./server";
dotenv.config();

const PORT = process.env.PORT || 3184;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
