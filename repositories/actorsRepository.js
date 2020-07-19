const db = require('../db/db');

const getUniqueActors = async () => {
  let actors = await db.find({});
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

module.exports = {
  getUniqueActors,
};
