var express = require("express");
var router = express.Router();
const stories = require("../services/stories");



router.get("/", stories.storiesIndex);

router.get("/getTopStories", stories.getTopStories);

router.get("/getBestStories", stories.getbestStories);

router.get("/getNewStories", stories.getnewStories);

router.get("/getStories/:startPos/:endPos/:storyType", stories.getStoryDetails);

router.get("/getUrlMetadata/*", stories.getUrlMetadata);

module.exports = router;
