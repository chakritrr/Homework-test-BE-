import { FoodStoreCalculatorPriceDto } from "../dto/calculator/calculator-request.dto";

export class FoodStoreCalculatorUseCase {
  calculatePrice(order: FoodStoreCalculatorPriceDto[]) {
    let totalPrice = 0;
    const specialItems = ["Orange", "Pink", "Green"];

    if (order) {
      order.forEach((item) => {
        totalPrice += item.price * item.quantity;

        if (specialItems.includes(item.name) && item.quantity % 2 === 0) {
          totalPrice -= item.price * item.quantity * 0.05;
        }
      });

      if (order.some((item) => item.memberCard)) {
        totalPrice *= 0.9;
      }
    }

    console.log(`Total price : ${totalPrice} THB`);
    return totalPrice;
  }
}
