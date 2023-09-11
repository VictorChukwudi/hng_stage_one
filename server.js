require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const port = 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const timeFunc = (number) => {
  switch (number) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    default:
      break;
  }
};

fastify.get("/api", async (req, reply) => {
  try {
    const { slack_name, track } = req.query;
    if (!slack_name || !track) {
      reply.code(400).send({
        status: "error",
        msg: "slack_name and track are required as query paramters",
      });
    } else {
      const d = new Date();
      const github_file_url =
        "https://github.com/VictorChukwudi/hng_stage_one/blob/main/server.js";
      const github_repo_url = "https://github.com/VictorChukwudi/hng_stage_one";
      reply.code(200).send({
        slack_name,
        current_day: timeFunc(d.getDay()),
        utc_time: `${d.toISOString().split(".")[0]}Z`,
        track,
        github_file_url,
        github_repo_url,
        status_code: 200,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const start = async () => {
  try {
    fastify.listen({ port, host });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
