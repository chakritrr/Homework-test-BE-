class OrderItemDto {
  name: string;
  quantity: number;
  memberCard: boolean;
}

export class FoodStoreCalculatorDto {
  order: OrderItemDto[];
}

export class FoodStoreCalculatorPriceDto {
  name: string;
  price: number;
  quantity: number;
  memberCard: boolean;
}
