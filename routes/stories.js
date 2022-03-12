var express = require("express");
var router = express.Router();
const stories = require("../services/stories");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/getTopStories", stories.getTopStories);

router.get("/getBestStories", stories.getbestStories);

router.get("/getNewStories", stories.getnewStories);

router.get("/getStories/:startPos/:endPos/:storyType", stories.getStoryDetails);

module.exports = router;
