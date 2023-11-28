import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { OverviewListItem, StockItem } from '../../components';
import { RenderStockItemProps, StockItemProps, constants } from '../../config';
import apisSet from '../../helpers/apisSet';

const HoldingsPage = () => {

    const [showLoader, setShowLoader] = useState(true);
    const [stocksData, setStocksData] = useState([]);
    const [holdingsData, setHoldingsData] = useState({currentValue: 0, totalInvestment: 0, todayPL: 0, pl: 0});

    const getStocksData = () => {
        axios.get(apisSet.GET_STOCKS_DATA)
        .then(function (response) {
            const totCurrVal = response.data.userHolding.reduce((accumulator: number, { quantity, ltp }: StockItemProps) => {
                return accumulator + (quantity * ltp)
            }, 0);
            const totInvestment = response.data.userHolding.reduce((accumulator: number, { quantity, avgPrice }: StockItemProps) => {
                return accumulator + (avgPrice - quantity)
            }, 0);
            const todayPnL = response.data.userHolding.reduce((accumulator: number, { quantity, avgPrice, ltp }: StockItemProps) => {
                return accumulator + Math.round((((ltp - avgPrice) * quantity) + Number.EPSILON) * 100) / 100
            }, 0);
            const totalPnL = totCurrVal - totInvestment;
            setStocksData(response.data.userHolding);
            setHoldingsData({
                currentValue: Math.round((totCurrVal + Number.EPSILON) * 100) / 100,
                totalInvestment: Math.round((totInvestment + Number.EPSILON) * 100) / 100,
                todayPL: Math.round((todayPnL + Number.EPSILON) * 100) / 100,
                pl: Math.round((totalPnL + Number.EPSILON) * 100) / 100
            });
            setShowLoader(false);
        })
        .catch(function (error) {
            setShowLoader(false);
            Alert.alert(  
                'Error',  
                'Something went wrong while fetching the data. Please try again after some time.',  
                [
                    {text: 'OK'},  
                ]  
            );
        });
    }

    useEffect(() => {
        getStocksData();
    }, [])

    const renderStockItem = ({item}: RenderStockItemProps) => {
        return (
            <StockItem symbol={item.symbol} quantity={item.quantity} ltp={item.ltp} avgPrice={item.avgPrice} />   
        );
    };

    const renderItemSeparator = () => {
        return (
            <View style={styles.separatorStyle}></View>
        );
    };

    const renderEmptyListDataComponent = () => {
        return (
            <Text style={styles.emptyListStyle}>{constants.Holdings.noItems}</Text>
        );
    };

    return (
        <SafeAreaView style={[styles.flexVal, styles.backColor]}>
            {showLoader ?
                <View style={[styles.flexVal, {justifyContent: 'center'}]}>
                    <ActivityIndicator />
                </View>
            :
                <View style={[styles.flexVal, {backgroundColor: '#bfbfbf', justifyContent: 'space-between'}]}>
                    <View style={styles.flexVal}>
                        <View style={{backgroundColor: '#862d86'}}>
                            <Text style={styles.heading}>{constants.Holdings.upstox}</Text>
                        </View>
                        <FlatList
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            data={stocksData}
                            renderItem={renderStockItem}
                            ItemSeparatorComponent={renderItemSeparator}
                            contentContainerStyle={[styles.backColor, {paddingHorizontal: 8}]}
                            keyExtractor={(item: StockItemProps, index: Number) => String(index)}
                            ListEmptyComponent={renderEmptyListDataComponent}
                        />
                    </View>
                    <View style={[styles.backColor, styles.overViewLayout]}>
                        <OverviewListItem title={constants.Holdings.currVal} value={holdingsData.currentValue} />
                        <OverviewListItem title={constants.Holdings.totInvst} value={holdingsData.totalInvestment} />
                        <OverviewListItem title={constants.Holdings.today} value={holdingsData.todayPL} />
                        <View style={{marginTop: 24}}>
                            <OverviewListItem title={constants.Holdings.proLos} value={holdingsData.pl} />
                        </View>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
};

export default HoldingsPage;