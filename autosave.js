// autosave.js
const { exec } = require("child_process");

setInterval(() => {
  const time = new Date().toLocaleTimeString();
  console.log(`🕒 Auto-saving at ${time}...`);

  exec(
    `git add . && git commit -m "🛠️ Auto-save at ${time}" && git push`,
    (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Error:", err.message);
        return;
      }
      if (stderr) console.error("⚠️ stderr:", stderr);
      if (stdout) console.log("✅ Output:\n", stdout);
    }
  );
}, 5000); // 5 seconds
