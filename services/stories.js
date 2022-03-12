const axios = require("axios");

const stories = {
  getTopStories: async function (req, res, next) {
    try {
      const topstories = await axios
        .get(
          "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
        )
        .then((topStoriesRes) => {
          return topStoriesRes.data;
        })
        .catch((error) => {
          console.error(error);
        });

      res.send(topstories);
    } catch (err) {
      throw Error("Something Wend wrong!!");
    }
  },

  getbestStories: async function (req, res, next) {
    try {
      const bestStories = await axios
        .get(
          "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
        )
        .then((bestStoriesRes) => {
          return bestStoriesRes.data;
        })
        .catch((error) => {
          console.error(error);
        });
      res.send(bestStories);
    } catch (err) {
      throw Error("Something Wend wrong!!");
    }
  },

  getnewStories: async function (req, res, next) {
    try {
      const newStories = await axios
        .get(
          "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
        )
        .then((newStoriesRes) => {
          if (req.body.startPos && req.body.endPos) {
            return newStoriesRes.data.slice(req.body.startPos, req.body.endPos);
          } else {
            return newStoriesRes.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });

      res.send(newStories);
    } catch (err) {
      throw Error("Something Wend wrong!!");
    }
  },

  getStoryDetails: async function (req, res, next) {
    try {
      let response = [];
      console.log(req.params);
      if (req.params.startPos && req.params.endPos && req.params.storyType) {
        let data = await getDifferentStories({
          startPos: req.params.startPos,
          endPos: req.params.endPos,
        });
        await Promise.all(
          data.map(async (ele) => {
            await axios
              .get(`https://hacker-news.firebaseio.com/v0/item/${ele}.json`)
              .then((newStoriesRes) => {
                response.push(newStoriesRes.data);
              });
          })
        );
        res.send(response);
      }
    } catch (err) {
      throw Error("Something Wend wrong!!");
    }
  },
};
module.exports = stories;

async function getDifferentStories(body) {
  try {
    searchUrl = "";
    switch (body.newsType) {
      case "topStories":
        searchUrl = `https://hacker-news.firebaseio.com/v0/topstories.json`;
        break;
      case "newStories":
        searchUrl = `https://hacker-news.firebaseio.com/v0/newstories.json`;
        break;
      case "bestStories":
        searchUrl = `https://hacker-news.firebaseio.com/v0/beststories.json`;
        break;
      default:
        searchUrl = `https://hacker-news.firebaseio.com/v0/topstories.json`;
    }
    const stories = await axios
      .get(searchUrl)
      .then((storiesResponse) => {
        if (body.startPos && body.endPos) {
          return storiesResponse.data.slice(body.startPos, body.endPos);
        } else {
          return storiesResponse.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return stories;
  } catch (err) {
    throw Error("Something Wend wrong!!");
  }
}
