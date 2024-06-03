const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const { execSync } = require("child_process");

const app = express();
let port = process.env.PORT || 5288;
function getRandomPort() {
  return Math.floor(Math.random() * (65535 - 49152 + 1)) + 49152;
}

app.use(express.static("public"));
app.use(bodyParser.json());

let userData = [];


app.use((req, res, next) => {
  const start = Date.now();
  const ipAddress = req.ip || req.connection.remoteAddress;
  const currentDate = new Date().toISOString();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusColor =
      res.statusCode >= 200 && res.statusCode < 300 ? "green" : "red";

    console.log(
      chalk.bold(
        `Request on ${chalk.cyanBright(req.path)} took ${duration} ms - Status: ${chalk[statusColor](res.statusCode)} - IP: ${ipAddress} - Date: ${currentDate}`
      )
    );

    userData.push({
      path: req.path,
      duration: duration,
      status: res.statusCode,
      ip: ipAddress,
      date: currentDate,
    });

    try {
      fs.writeFileSync(
        "userData.json",
        JSON.stringify(userData, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.error(chalk.bold.red(`Error writing to userData.json: ${error.message}`));
    }
  });

  next();
});


const loadRoute = (filePath) => {
  try {
    const route = require(filePath);
    app.use("/api", route);
    console.log(chalk.bold.cyan(`DEPLOYED ROUTE [${path.basename(filePath, ".js")}]`));
  } catch (error) {
    console.error(chalk.bold.red(`Error loading route ${filePath}: ${error.message}`));
  }
};

const loadRoutes = (directory) => {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    loadRoute(filePath);
  });
};

// Install missing npm modules
const installMissingModules = () => {
  const packageJsonPath = path.join(__dirname, "package.json");
  const packageLockPath = path.join(__dirname, "package-lock.json");

  if (!fs.existsSync(packageJsonPath) || !fs.existsSync(packageLockPath)) {
    console.error(chalk.bold.red("Error: No package.json or package-lock.json found."));
    process.exit(1);
  }

  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf-8")
  );
  const missingModules = [];

  for (const dependency in packageJson.dependencies) {
    try {
      require.resolve(dependency);
    } catch (error) {
      missingModules.push(dependency);
    }
  }

  if (missingModules.length > 0) {
    console.log(chalk.bold.green("Installing missing modules..."));
    execSync(`npm install ${missingModules.join(" ")}`);
    console.log(chalk.bold.green("Modules installed successfully."));
  } else {
    console.log(chalk.bold.green("No missing modules found."));
  }
};

function startServer() {
  try {
    console.log(chalk.bold.cyan("Deploying routes..."));
    loadRoutes(path.join(__dirname, "routes"));
    console.log(chalk.bold.cyan("Routes deployment complete."));

    console.log(chalk.bold.cyan("Checking and installing missing modules..."));
    installMissingModules();
    console.log(chalk.bold.cyan("Module installation complete."));

    app.get("/login", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "login.html"));
    });

    app.post("/api/login", (req, res) => {
      const { username, password } = req.body;
      if (username === "jonellcc" && password === "haroldcc") {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, message: "❌ Incorrect Password or Username Please Try again" });
      }
    });

    app.get("/dashboard.html", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "dashboard.html"));
    });

    app.get("/api/userData", (req, res) => {
      try {
        const userData = JSON.parse(fs.readFileSync("userData.json", "utf-8"));
        res.status(200).json(userData);
      } catch (error) {
        console.error("Error reading user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/commands", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "commands.html"));
    });

    const server = app.listen(port, () => {
      console.log(chalk.bold(`Server is running on http://localhost:${port}`));
    });


    server.on("error", (err) => {
      console.error(chalk.bold.red(`Server error: ${err.message}`));
      console.log(chalk.bold.yellow("Restarting server..."));

      server.close(() => {
        port = getRandomPort();
        startServer();
      });
    });

    process.on('uncaughtException', (err) => {
      console.error(chalk.bold.red(`Uncaught Exception: ${err.message}`));
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error(chalk.bold.red('Unhandled Rejection at:', promise, 'reason:', reason));
    });
  } catch (error) {
    console.error(chalk.bold.red(`Error starting server: ${error.message}`));
  }
}

startServer();
