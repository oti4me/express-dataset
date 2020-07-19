const db = require('../db/db');

/**
 * Gets dinstinct actors with frequency count
 *
 * @returns {Promise<Array<object>>}
 */
const getUniqueActors = async (actorList = null) => {
  let actors = actorList || (await db.find({}));
  const mapData = new Map();

  actors.forEach(({ actor }) => {
    if (!actor.count) actor.count = 0;

    if (!mapData.has(actor.id)) {
      actor.count += 1;
      mapData.set(actor.id, actor);
    } else {
      actor = mapData.get(actor.id);
      mapData.set(actor.id, { ...actor, count: actor.count + 1 });
    }
  });
  return [...mapData.values()];
};

const getActorStreak = async () => {
  const events = await db
    .find({})
    .sort({
      created_at: -1,
      'actor.login': 1,
    })
    .exec();

  let actors = await getUniqueActors(events);
  const strak = actors.map((actor) => {
    if (!actor.streak) actor.streak = 0;
    for (let index = 0; index <= events.length; index++) {
      if (
        actor.id === events[index].actor.id &&
        actor.id === events[index + 1].actor.id
      ) {
        const days =
          (new Date(events[index].created_at).getTime() -
            new Date(events[index + 1].created_at).getTime()) /
          (1000 * 3600 * 24);

        if (days <= 1) {
          actor.streak += 1;
        }
      }
      return actor;
    }
  });

  return strak;
};

module.exports = {
  getUniqueActors,
  getActorStreak,
};
