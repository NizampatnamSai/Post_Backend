const express = require("express");
const { CreatePosts } = require("./Controllers/PostsController");
const dotEnv = require("dotenv").config();
const cors = require("cors");

const port = 7001;
const app = express();
const formidable = require("express-formidable");
const connectDb = require("./config/dbConnection");
const { default: axios } = require("axios");
connectDb();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/posts", require("./Routes/PostsRoute"));
app.use("/user", require("./Routes/Userroute"));
app.use("/api/ai", require("./Routes/GoogleGimini"));

// 🔥 Mock Auto Logs Sync API
const FAILURE_RATE = 0.3; // 30% failure simulation
const RESPONSE_DELAY_MS = 800;

app.post("/sync-auto-logs", async (req, res) => {
  try {
    const { logs } = req.body;

    console.log("📥 /sync-auto-logs hit");
    console.log("Logs count:", logs, logs?.length || 0);

    if (!logs || !Array.isArray(logs)) {
      return res.status(400).json({
        success: false,
        message: "Logs array required",
      });
    }

    // ⏳ simulate delay
    await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY_MS));

    // 🎲 Random failure simulation
    const shouldFail = Math.random() < FAILURE_RATE;

    if (shouldFail) {
      console.log("❌ Simulated sync failure");

      return res.status(500).json({
        success: false,
        message: "Simulated server failure",
      });
    }

    // ✅ Simulated success
    const syncedIds = logs.map((log) => log.id);

    console.log("✅ Simulated sync success");

    res.json({
      success: true,
      message: "Logs synced (mock)",
      syncedIds,
    });
  } catch (error) {
    console.error("💥 Sync API Error:", error);

    res.status(500).json({
      success: false,
      message: "Unexpected server error",
    });
  }
});

// app.get("/api/spyfu", async (req, res) => {
//   // const domain = req.query.domain;
//   const domain = req.query.domain;

//   // if (!domain) {
//   //   return res.status(400).json({ error: "Missing domain query param" });
//   // }

//   try {
//     const response = await axios.get(
//       // `https://www.spyfu.com/apis/domain_stats_api/v2/getLatestDomainStats?domain=topazlabs.com&api_key=UX8BMIBN`
//       `https://www.spyfu.com/apis/domain_stats_api/v2/getLatestDomainStats?domain=${encodeURIComponent(
//         domain
//       )}&api_key=UX8BMIBN`
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching SpyFu data:", error.message);
//     res.status(500).json({ error: "Failed to fetch data from SpyFu" });
//   }
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
