const fastify = require("fastify")({ logger: true });
const port = 3000;

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
    const d = new Date();
    reply.code(200).send({
      slack_name,
      current_day: timeFunc(d.getDay()),
      utc_time: d.toISOString(),
      track,
      github_file_url: "url",
      github_repo_url: "https://github.com/VictorChukwudi/hng_stage_one",
      status_code: 200,
    });
  } catch (error) {
    console.log(error);
  }
});

const start = async () => {
  try {
    fastify.listen({ port });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
