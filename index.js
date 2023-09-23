import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  let Type=req.body.type;
  let Participants=req.body.participants;
  
  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${Type}&participants=${Participants}`);
    const result = response.data;
    let index=Math.floor(Math.random()*result.length);
    res.render("index.ejs", { data: result[index] });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No matching activity!",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
