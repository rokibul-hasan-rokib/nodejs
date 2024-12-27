import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", function (req, res) {
  res.render("index");
});

app.get('/welcome/:name',(req,res)=>{
     res.send(`Welcom to my home ${req.params.name}`)
})

app.use("/rokib", function (req, res) {
  res.send("rokib");
});

app.get("/ro", function (req, res) {
  res.send("ro");
});

app.use("/me", (req, res) => {
  res.send("This is me");
});

app.use("/akash", (res, req) => {
  res.send("rokib");
});

export default app;
