const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3000;
const Company = require("./model/company");
const cors = require("cors");
const Ads = require("./model/ads");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
const conn_str =
  "mongodb+srv://tikam:asdf1234@cluster0.w6i7yuy.mongodb.net/advertisment?retryWrites=true&w=majority";
mongoose.connect(
  conn_str,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
      console.log("error in connection");
    } else {
      console.log("mongodb is connected");
    }
  }
);
app.get("/all-ads", async (req, res) => {
  Ads.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "companyId",
        foreignField: "_id",
        let: { companyId: "$companyId" },
        pipeline: [{ $match: { $expr: { $eq: ["$$companyId", "$_id"] } } }],
        as: "companies",
      },
    },
  ]).exec((err, result) => {
    return res.send(result);
  });
});
app.get("/search/:key", async (req, res) => {
  Ads.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "companyId",
        foreignField: "_id",
        let: { companyId: "$companyId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$$companyId", "$_id"],
              },
            },
          },
        ],
        as: "companies",
      },
    },
    {
      $match: {
        $or: [
          { "companies.company_name": new RegExp(`^.*${req.params.key}.*$`,"i")  },
          { "headline": new RegExp(`^.*${req.params.key}.*$`,"i")  },
          { "description": new RegExp(`^.*${req.params.key}.*$`,"i")  },
          { "primaryText": new RegExp(`^.*${req.params.key}.*$`,"i")  },
        ],
      },
    },
  ]).exec((err, result) => {
    return res.send(result);
  });
});
// {
//   $lookup: {
//     from: "companies",
//     localField: "companyId",
//     foreignField: "_id",    
//     as: "companies",
//   },
// },
// {
//   $project: {
//     "companies.company_name": 1,
//     headline: 1,
//     description: 1,
//     primaryText: 1,   
//   },
// },
app.listen(port, () => {
  console.log("starting the server");
});
