import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/core';

interface Params {
  url: string;
  title: string;
}

export default () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { url, title } = route.params as Params;

  useEffect(() => {
    navigation.setOptions({ title });
  });

  return (
      <WebView 
        style={styles.container}
        source={{ uri: url }}
      />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})