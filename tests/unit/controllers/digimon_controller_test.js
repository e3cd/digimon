const DigimonController = require("./../../../controllers/digimon_controller");
const DigimonModel = require("./../../../database/models/digimon_model");

describe("DigimonController", () => {
  describe("index()", () => {
    test("call res.json()", async () => {
      const res = {
        render: jest.fn() //use jest function for res.render object
      };

      const digimons = [];

      DigimonModel.find = jest.fn().mockResolvedValue(digimons); //jest function replaces authormodel.find

      await DigimonController.index(null, res);
      expect(DigimonModel.find).toBeCalledTimes(1);
      expect(res.json).toHaveBeenLastCalledWith("digimons/index", { digimons });
    });
  });
});
