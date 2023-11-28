export type RootStackParamList = {
    AppStack: undefined;
    HoldingsPage: undefined;
};

export type OverviewListItemProps = {
    title: string;
    value: number;
};

export type StockItemProps = {
    symbol: string;
    quantity: number;
    ltp: number;
    avgPrice: number;
};

export type RenderStockItemProps = {
    item: StockItemProps;
}