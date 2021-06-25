import React from 'react';
import { View } from 'react-native';

export const Line = ({color='black'}) => {
  return <View style={{minHeight: 1, width: '100%', backgroundColor: color}} />;
};
