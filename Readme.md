# 🛠️ create-jaimeet-app

A simple and interactive CLI tool to scaffold Node.js applications with either **SSR** or **API-based** backends — built by [Jaimeet Singh](https://github.com/jaimeetsingh22).

---

## ✨ Features

- 🌈 Beautiful and animated CLI using `chalk-animation`, `figlet`, and `nanospinner`
- 🔧 Choose between:
  - `Backend with API`
  - `Backend with SSR (EJS views)`
- 📁 Automatically creates project folders and boilerplate files
- 📦 Initializes `npm`, installs dependencies, and sets up scripts
- 💡 Clean exit message on `Ctrl + C` or CLI termination

---

## 🚀 Installation

```bash
npm install -g create-jaimeet-app
npx create-jaimeet-app
```
Or for development (after cloning this repo):

bash
Copy
Edit
npm link
🧪 Usage
bash
Copy
Edit
create-jaimeet-app
You will be guided through the following:

Enter your project name

Choose your backend type (SSR/API)

Let the CLI set everything up for you!

📁 Project Structure (example)
pgsql
Copy
Edit
my-app/
├── config/
├── connections/
├── middlewares/
├── models/
├── public/
├── router/
├── views/ (only for SSR)
├── index.js
└── README.md

- 🧰 Scripts Added

- "scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
- }

⚙️ Dependencies Installed

express

cors

dotenv

mongoose

(ejs, cookie-parser, multer, jsonwebtoken — for SSR setup)

nodemon (dev dependency)

📸 Preview

![CLI Preview](image.png)

![Next Step](image-1.png)

🙋‍♂️ Author
Jaimeet Singh

GitHub: [@jaimeetsingh22](https://github.com/jaimeetsingh22)

LinkedIn: [Jaimeet Singh](https://www.linkedin.com/in/jaimeet-singh-a594b62b0)

Portfolio: https://jaimeet-portfolio.vercel.app

🛡️ License
ISC License

📢 Contributions
Pull requests and suggestions are welcome!
Feel free to fork the repo and submit a PR. Let’s make open source more fun 🚀









