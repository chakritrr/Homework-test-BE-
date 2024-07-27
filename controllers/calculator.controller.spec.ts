import { Test, TestingModule } from "@nestjs/testing";

import { FoodStoreCalculatorUseCase } from "../use-cases/calculator-use-case";
import { FoodStoreCalculatorController } from "./calculator.controller";
import { FoodStoreCalculatorDto } from "../dto/calculator/calculator-request.dto";

const mockFoodStoreCalculatorUseCase = {
  calculatePrice: jest.fn(),
};

describe("FoodStoreCalculatorController", () => {
  let foodStoreCalculatorController: FoodStoreCalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodStoreCalculatorController],
      providers: [
        {
          provide: FoodStoreCalculatorUseCase,
          useValue: mockFoodStoreCalculatorUseCase,
        },
      ],
    }).compile();

    foodStoreCalculatorController = module.get<FoodStoreCalculatorController>(FoodStoreCalculatorController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(foodStoreCalculatorController).toBeDefined();
  });

  describe("getOrder", () => {
    it("should call postConfigProjectRequest success and Order doubles of Green sets will get a 5% discount", async () => {
      const mockInputData: FoodStoreCalculatorDto = {
        order: [
          {
            name: "Green",
            quantity: 2,
            memberCard: false,
          },
        ],
      };
      const mockRes = 76;

      jest.spyOn(mockFoodStoreCalculatorUseCase, "calculatePrice").mockReturnValue(mockRes);

      const result = foodStoreCalculatorController.getOrder(mockInputData);

      expect(result).toEqual(mockRes);
      expect(mockFoodStoreCalculatorUseCase.calculatePrice).toHaveBeenCalled();
    });

    it("should call postConfigProjectRequest success and Order doubles of Green sets will get a 5% discount and customers have a member card.", async () => {
      const mockInputData: FoodStoreCalculatorDto = {
        order: [
          {
            name: "Green",
            quantity: 2,
            memberCard: true,
          },
        ],
      };
      const mockRes = 68.4;

      jest.spyOn(mockFoodStoreCalculatorUseCase, "calculatePrice").mockReturnValue(mockRes);

      const result = foodStoreCalculatorController.getOrder(mockInputData);

      expect(result).toEqual(mockRes);
      expect(mockFoodStoreCalculatorUseCase.calculatePrice).toHaveBeenCalled();
    });

    it("should call postConfigProjectRequest success and Orange sets, if customers order 5 items per bill. customers will get a 5% discount for 4 items", async () => {
      const mockInputData: FoodStoreCalculatorDto = {
        order: [
          {
            name: "Green",
            quantity: 5,
            memberCard: false,
          },
        ],
      };
      const mockRes = 200;

      jest.spyOn(mockFoodStoreCalculatorUseCase, "calculatePrice").mockReturnValue(mockRes);

      const result = foodStoreCalculatorController.getOrder(mockInputData);

      expect(result).toEqual(mockRes);
      expect(mockFoodStoreCalculatorUseCase.calculatePrice).toHaveBeenCalled();
    });
  });
});
