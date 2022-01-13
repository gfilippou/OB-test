type BidsOrAsksListRaw = Array<Array<number>>;

export const OrdersFormatter = (raw: BidsOrAsksListRaw, grouping: number) => {
  if (raw.length === 0) return;
  const roundOrderPriceByGroup = (price: number, group: number): number =>
    Number((Math.floor(price / group) * group).toFixed(2));

  const formatNumber = (number: number, decimals: number) => {
    return (Math.round(number * 100) / 100)
      .toFixed(decimals)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const groupOrders = (raw: BidsOrAsksListRaw, grouping: number) => {
    let roundedArray = [];

    // Round each order price based on grouping
    for (const [price, size] of raw) {
      let roundedOrder = [roundOrderPriceByGroup(price, grouping), size];
      roundedArray.push(roundedOrder);
    }

    // Calculate total size for orders with the same rounded price using a Map
    let groupedOrdersMap = roundedArray.reduce((prev, curr) => {
      let roundedOrder = prev.get(curr[0]) || 0;
      prev.set(curr[0], curr[1] + roundedOrder);
      return prev;
    }, new Map());

    return Array.from(groupedOrdersMap);
  };

  const groupedOrders = groupOrders(raw, grouping);

  const ordersSizes = groupedOrders.map((order) => {
    return order[1];
  });
  const ordersTotalsSum = ordersSizes.reduce((a, b) => a + b);

  const ordersListData = groupedOrders.map((order, index) => {
    const orderPrice = formatNumber(order[0], 2);
    const orderSize = formatNumber(order[1], 0);
    const orderTotals = ordersSizes.map((orderSize, index) =>
      ordersSizes.slice(0, index + 1).reduce((a, b) => a + b)
    );
    const orderTotal = orderTotals[index];
    const orderTotalFormatted = formatNumber(orderTotals[index], 0);
    const orderBarPercentage = Math.round((orderTotal * 100) / ordersTotalsSum);
    return {
      price: orderPrice,
      size: orderSize,
      total: orderTotalFormatted,
      barPercentage: orderBarPercentage,
    };
  });

  return ordersListData;
};
