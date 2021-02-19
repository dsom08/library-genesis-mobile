import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Layout, Button, Icon, Input } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ThemeContext } from '../../theme-context';

const SearchBar = (props) => {
  const { searchBook, scannedISBN } = props
  const themeContext = React.useContext(ThemeContext);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(scannedISBN)
  }, [scannedISBN])

  const onSearchPressed = () => {
    searchBook(searchValue)
  }

  const renderClearIcon = (props) => (
    <TouchableWithoutFeedback onPress={() => setSearchValue('')}>
      <Icon {...props} name='close-circle-outline' />
    </TouchableWithoutFeedback>
  )

  const SearchIcon = (props) => (
    <Icon {...props} name='search-outline' />
  );

  const DarkModeIcon = (props) => (
    <Icon {...props} name='moon' />
  )

  const LightModeIcon = (props) => (
    <Icon {...props} name='sun-outline' />
  )

  return (
    <Layout style={styles.container} level='1'>
      { themeContext.theme === 'light' ?
        <Button appearance='ghost' size='large' accessoryLeft={DarkModeIcon} onPress={themeContext.darkTheme} /> :
        <Button appearance='ghost' size='large' accessoryLeft={LightModeIcon} onPress={themeContext.lightTheme} />
      }
      <Input
        style={styles.searchInput}
        value={searchValue}
        placeholder='Search by title, author, or ISBN...'
        size='large'
        accessoryRight={searchValue.length > 0 ? renderClearIcon : undefined}
        onChangeText={nextValue => setSearchValue(nextValue)}
        onSubmitEditing={onSearchPressed}
      />
      <Button appearance='ghost' size='large' accessoryRight={SearchIcon} onPress={onSearchPressed} />
    </Layout>
  )

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.searchInputContainer}>
  //       <TextInput
  //         placeholder={'Search by title, author, or ISBN...'}
  //         placeholderTextColor={'#969696'}
  //         style={styles.searchInput}
  //         onChangeText={text => setSearchValue(text)}
  //         value={searchValue}
  //       />
  //       {searchValue.length > 0 && 
  //         <TouchableWithoutFeedback onPress={() => setSearchValue('')}>
  //           <Ionicons name="close-circle-outline" style={styles.clearButton} size={24} color={'gray'} />
  //         </TouchableWithoutFeedback>
  //       }
  //     </View>
  //     <View style={styles.searchButton}>
  //       <TouchableWithoutFeedback onPress={onSearchPressed}>
  //         <Ionicons name="search-outline" style={styles.searchButton} size={36} color={'#eee'} />
  //       </TouchableWithoutFeedback>
  //     </View>
  //   </View>
  // )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(8),
  },
  searchInput: {
    flex: 1,
  },
  button: {
    marginHorizontal: wp(1),
  },
})

export default SearchBar
