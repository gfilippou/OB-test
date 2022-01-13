type BidOrAsk = number[];
type BidsOrAsks = BidOrAsk[];

type DataMessage = {
  numLevels?: number;
  feed: string;
  bids: BidsOrAsks;
  asks: BidsOrAsks;
  product_id: string;
};

type DeltasBuffer = { bids: BidsOrAsks; asks: BidsOrAsks; product_id: string };

type BidsOrAsksMap = Map<number, number>;

type Snapshot = {
  bids: BidsOrAsksMap;
  asks: BidsOrAsksMap;
  product_id: string;
};
