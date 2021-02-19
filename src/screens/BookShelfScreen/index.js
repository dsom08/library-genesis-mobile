import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { List } from '@ui-kitten/components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Book from '../../components/Book';

import styles from './styles';

const BookShelfScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      importDownloadedBooks();
    }, [importDownloadedBooks])
  )

  const importDownloadedBooks = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const results = await AsyncStorage.multiGet(keys);

      setBooks(results.map(book => JSON.parse(book[1])))
    } catch (e) {
      console.log(e.message);
    }
  }

  const renderItem = useCallback(
    ({item}) => <Book book={item} navigation={navigation}></Book>,
    []
  );

  const keyExtractor = useCallback(({md5}) => md5, []);

  const ITEM_HEIGHT = hp(20)

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <List
      data={books}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={7}
      windowSize={11}
      getItemLayout={getItemLayout}
    />
  )
}

export default BookShelfScreen
