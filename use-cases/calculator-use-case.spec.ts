import { Test, TestingModule } from "@nestjs/testing";

import { FoodStoreCalculatorPriceDto } from "../dto/calculator/calculator-request.dto";
import { FoodStoreCalculatorUseCase } from "./calculator-use-case";

describe("FoodStoreCalculatorUseCase", () => {
  let foodStoreCalculatorUseCase: FoodStoreCalculatorUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodStoreCalculatorUseCase],
    }).compile();

    foodStoreCalculatorUseCase = module.get<FoodStoreCalculatorUseCase>(FoodStoreCalculatorUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(foodStoreCalculatorUseCase).toBeDefined();
  });

  describe("calculatePrice", () => {
    it("should call calculatePrice success and Order doubles of Green sets will get a 5% discount", async () => {
      const mockInputData: FoodStoreCalculatorPriceDto[] = [
        {
          name: "Green",
          price: 40,
          quantity: 2,
          memberCard: false,
        },
      ];
      const mockRes = 76;

      const result = foodStoreCalculatorUseCase.calculatePrice(mockInputData);

      expect(result).toEqual(mockRes);
    });

    it("should call calculatePrice success and Order doubles of Green sets will get a 5% discount and customers have a member card.", async () => {
      const mockInputData: FoodStoreCalculatorPriceDto[] = [
        {
          name: "Green",
          price: 40,
          quantity: 2,
          memberCard: true,
        },
      ];
      const mockRes = 68.4;

      const result = foodStoreCalculatorUseCase.calculatePrice(mockInputData);

      expect(result).toEqual(mockRes);
    });

    it("should call calculatePrice success and Orange sets, if customers order 5 items per bill. customers will get a 5% discount for 4 items", async () => {
      const mockInputData: FoodStoreCalculatorPriceDto[] = [
        {
          name: "Green",
          price: 40,
          quantity: 5,
          memberCard: true,
        },
      ];
      const mockRes = 200;

      const result = foodStoreCalculatorUseCase.calculatePrice(mockInputData);

      expect(result).toEqual(mockRes);
    });
  });
});
