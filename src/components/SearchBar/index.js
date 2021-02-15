import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const SearchBar = (props) => {
  const { searchBook, scannedISBN } = props

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(scannedISBN)
  }, [scannedISBN])

  const onSearchPressed = () => {
    searchBook(searchValue)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder={'Search by title, author, or ISBN...'}
          placeholderTextColor={'#969696'}
          style={styles.searchInput}
          onChangeText={text => setSearchValue(text)}
          value={searchValue}
        />
        {searchValue.length > 0 && 
          <TouchableWithoutFeedback onPress={() => setSearchValue('')}>
            <Ionicons name="close-circle-outline" style={styles.clearButton} size={24} color={'gray'} />
          </TouchableWithoutFeedback>
        }
      </View>
      <View style={styles.searchButton}>
        <TouchableWithoutFeedback onPress={onSearchPressed}>
          <Ionicons name="search-outline" style={styles.searchButton} size={36} color={'#eee'} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default SearchBar
