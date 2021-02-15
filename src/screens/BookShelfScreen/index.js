import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList } from 'react-native';

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

  return (
    <FlatList
      style={styles.bookList}
      data={books}
      renderItem={({item}) => <Book book={item} navigation={navigation} />}
      keyExtractor={({md5}) => md5}
    />
  )
}

export default BookShelfScreen
