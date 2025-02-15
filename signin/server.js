const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// 允許 CORS（讓前端可以請求這個後端）
app.use(cors());
app.use(bodyParser.json());

// 設定 JSON 檔案路徑
const FILE_PATH = "email_password.json";

// 處理 POST 請求，儲存 Email 和 Password
app.post("/save", (req, res) => {
    const newData = req.body;

    // 讀取現有的 JSON 檔案
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        let jsonData = [];

        if (!err && data) {
            try {
                jsonData = JSON.parse(data); // 解析 JSON
            } catch (parseErr) {
                return res.status(500).json({ message: "JSON 格式錯誤" });
            }
        }

        jsonData.push(newData); // 新增新資料

        // 將更新後的 JSON 資料寫回檔案
        fs.writeFile(FILE_PATH, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ message: "帳號創建失敗" });
            res.json({ message: "帳號創建成功！" });
        });
    });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`✅ 伺服器運行中: http://localhost:${PORT}`);
});
