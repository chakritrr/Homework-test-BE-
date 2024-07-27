import { FoodStoreCalculatorDto } from "../dto/calculator/calculator-request.dto";
import { productPrices } from "../constants/price.constant";
import { FoodStoreCalculatorUseCase } from "../use-cases/calculator-use-case";

export class FoodStoreCalculatorController {
  constructor(private readonly foodStoreCalculatorUseCase: FoodStoreCalculatorUseCase) {}

  getOrder(order: FoodStoreCalculatorDto) {
    const result = order.order.map((item) => {
      const rep = {
        name: item.name,
        price: productPrices[item.name],
        quantity: item.quantity,
        memberCard: item.memberCard,
      };

      return rep;
    });

    return this.foodStoreCalculatorUseCase.calculatePrice(result);
  }
}

const foodStoreCalculatorUseCase = new FoodStoreCalculatorUseCase();
const foodStoreCalculatorController = new FoodStoreCalculatorController(foodStoreCalculatorUseCase);

const orderData: FoodStoreCalculatorDto = {
  order: [
    { name: "Green", quantity: 2, memberCard: true },
    // { name: "Yellow", quantity: 1, memberCard: false },
  ],
};

foodStoreCalculatorController.getOrder(orderData);
