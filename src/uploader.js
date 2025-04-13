const axios = require("axios");
const fs = require("fs");
const path = require("path");

const { delay } = require("./utils");

async function uploadAndSaveOnce(AUTH_TOKEN, IMAGE_FILE) {
  try {
    const { data } = await axios.get(
      `https://api-v2.polyflow.tech/api/scan2earn/get_presigned_url?file_name=${IMAGE_FILE}`,
      {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      }
    );

    const presignedUrl = data.msg.presigned_url;
    const key = data.msg.key;
    const fileBuffer = fs.readFileSync(path.join(__dirname, "../", IMAGE_FILE));

    await axios.put(presignedUrl, fileBuffer, {
      headers: { "Content-Type": "image/jpeg" },
    });

    console.log("✅ ".green + "Image uploaded successfully");

    const response = await axios.post(
      "https://api-v2.polyflow.tech/api/scan2earn/save_invoice",
      { invoice_path: key },
      {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      }
    );

    if (!response.data.success && response.data.err_code === 1000030) {
      console.warn("⚠️ Server error, retrying...".yellow);
      return await uploadAndSaveOnce(AUTH_TOKEN, IMAGE_FILE);
    }

    console.log("✅ ".green + `Invoice saved: ${key}`);
    console.log(`🏅 Points: ${response.data.msg?.my_point ?? "N/A"}`.cyan);
    console.log(`✅ Success: ${response.data.success}`.green);
  } catch (error) {
    const err = error.response?.data || error.message;
    console.error("❌ ".red + "Error:", err?.err_msg || err);

    if (err?.err_code === 1000030 || err === "server error") {
      console.warn("⚠️ Retrying due to server error...".yellow);
      return await uploadAndSaveOnce(AUTH_TOKEN, IMAGE_FILE);
    }

    await delay(2000);
  }
}

module.exports = { uploadAndSaveOnce };
