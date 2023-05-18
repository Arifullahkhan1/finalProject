import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../contants/colors';

const CustomTabBarButton = props => {
  const { route, children, accessibilityState, onPress } = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={styles.activeBtn}>
          {children}
        </TouchableOpacity>
        <View style={styles.indicator} />
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.inactiveBtn
        ]}>
        {children}
      </TouchableOpacity>
    );
  }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
   
  },
  activeBtn: {
    flex: 1,
    position: 'absolute',
    top: -20,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    zIndex: 10,
  },
  indicator: {
    flex: 1,
    position: 'absolute',
    top: -20,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    zIndex: 5,
    borderColor: '#82ccdd',
    borderWidth: 5,
   
  },
  inactiveBtn: {
    flex: 1,
    // backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgGapFiller: {
    flex: 1,
    backgroundColor: colors.whit,
  },
});