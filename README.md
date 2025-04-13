# polyflow-airdrop-bot

A simple automation bot to farm Scan2Earn points on PolyFlow by continuously uploading a predefined image and submitting it as an invoice. Built for educational and experimental purposes.

---

## 🔧 Features

- Supports multiple bearer tokens (accounts)
- Automatically retries on server errors
- Logs success/failure with colorful output
- Runs infinitely until stopped manually

---

## 🚀 Setup

1. **Clone this repo**  

   ```bash
   git clone https://github.com/dante4rt/polyflow-airdrop-bot.git
   cd polyflow-airdrop-bot
   ```

2. **Install dependencies**  

   ```bash
   npm install
   ```

3. **Add your image**  
   Make sure your image is named `IMAGE.jpg` and placed in the root folder.

4. **Get your Bearer Token**  
   - Visit: [PolyFlow App](https://app.polyflow.tech/?refCode=5C50AB28D9)
   - Open **DevTools** > **Console**
   - Run:

     ```js
     localStorage.getItem("token")
     ```

   - Copy the token returned

5. **Create `BEARERS.json`**  
   In the project root, create a file named `BEARERS.json` and insert your tokens as an array:

   ```json
   [
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....",
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
   ]
   ```

---

## ▶️ Run the bot

```bash
npm start
```

The bot will loop endlessly, rotating through all tokens and submitting invoices every few seconds.

---

## 📌 Disclaimer

> This project is for **educational purposes** only. Use responsibly and respect all platform rules. We are not affiliated with PolyFlow.

## Contributing

Feel free to open issues or submit pull requests if you have improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with 💚 by [HappyCuanAirdrop](https://t.me/HappyCuanAirdrop)
