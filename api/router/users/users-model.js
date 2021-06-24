const db = require("../../../data/config")

module.exports= {
	add,
    findBy,
    find
}

function find() {
  return db("users as u")
    .select("u.id", "u.username", "u.email");
}
async function add(user) {
    const [id] = await db("users").insert(user);
    return findById(id);
  }
  
  function findBy(username) {
    return db("users as u")
      .select("u.id", "u.username")
      .where("u.username", username);
  }
  
  function findById(id) {
    return db("users as u")
      .select("u.id", "u.username")
      .where("u.id", id)
      .first();
  }
  