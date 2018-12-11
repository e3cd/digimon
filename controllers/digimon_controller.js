const DigimonModel = require("./../database/models/digimon_model");

async function index(req, res, next) {
  const digimons = await DigimonModel.find();
  res.json(digimons);
  //   res.redirect(`/digimons/${digimon._id}`);
  //   return next(new HTTPError(401, "You are not authorized"));
}

async function show(req, res) {
  const { id } = req.params;
  const digimons = await DigimonModel.findById(id);

  res.json(digimons);
}

function make(req, res) {
  res.json("digimons/make");
}

async function create(req, res) {
  const { name, weakness, evolution } = req.body;
  const digimon = await DigimonModel.create({ name, weakness, evolution });

  res.redirect(`/digimons/${digimon._id}`);
}

async function update(req, res) {
  const { id } = req.params;
  const { name, weakness, evolution } = req.body;
  const digimon = await DigimonModel.findByIdAndUpdate(id, {
    name,
    weakness,
    evolution
  });

  res.redirect("/digimons");
}

async function destroy(req, res) {
  const { id } = req.params;
  await DigimonModel.findByIdAndRemove(id);

  res.redirect("/digimons");
}

module.exports = {
  index,
  show,
  make,
  create,
  update,
  destroy
};
