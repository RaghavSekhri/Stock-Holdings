import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { StockItemProps, constants } from '../../config';

const StockItem = ({symbol, quantity, ltp, avgPrice}: StockItemProps) => {
    return (
        <View style={{backgroundColor: 'white', padding: 12}}>
            <View style={[styles.cardOverView, {marginBottom: 12}]}>
                <Text style={[styles.textColor, {fontSize: 20, fontWeight: '700'}]}>{symbol}</Text>
                <Text style={[styles.textColor, styles.textSize]}>{constants.StockItem.ltp}:
                    <Text style={styles.textWeight}> ₹ {ltp}</Text>
                </Text>
            </View>
            <View style={styles.cardOverView}>
                <Text style={[styles.textColor, {fontSize: 16, fontWeight: '500'}]}>{quantity}</Text>
                <Text style={[styles.textColor, styles.textSize]}>{constants.StockItem.pl}:
                    <Text style={styles.textWeight}> ₹ {(ltp*quantity) - (avgPrice-quantity)}</Text>
                </Text>
            </View>
        </View>
    );
};

export default StockItem;