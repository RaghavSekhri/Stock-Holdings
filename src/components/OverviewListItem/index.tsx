import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { OverviewListItemProps } from '../../config';

const OverviewListItem = ({title, value}: OverviewListItemProps) => {
    return (
        <View style={styles.cardOverView}>
            <Text style={[styles.textStyle, styles.textWeight]}>{title}:</Text>
            <Text style={styles.textStyle}>₹{value}</Text>
        </View>
    );
};

export default OverviewListItem;