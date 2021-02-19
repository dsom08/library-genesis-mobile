import React, { useState, useEffect, useCallback } from 'react'
import {
  View
} from 'react-native';
import { Text, Layout, Divider, List, Modal, Spinner, Button } from '@ui-kitten/components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import SearchFilterDropdown from '../../components/SearchFilterDropdown';
import SearchBar from '../../components/SearchBar';
import Book from '../../components/Book';

import styles from './styles';

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size='giant' />
  </View>
)

const SearchScreen = (props) => {
  const { route, navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [scannedISBN, setScannedISBN] = useState('');
  const [resultText, setResultText] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [sort, setSort] = useState('year');
  const [sortmode, setSortmode] = useState('DESC');
  const [currentBooks, setCurrentBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [foundBookCount, setFoundBookCount] = useState(0);

  const searchBaseUrl = 'https://azjuojggh5.execute-api.ap-northeast-2.amazonaws.com/dev/search?req=';

  useEffect(() => {
    if (route.params !== undefined) {
      setScannedISBN(route.params.scannedISBN)
      searchBook(route.params.scannedISBN)
    }
  }, [route])

  useEffect(() => {
    searchBook(searchValue)
  }, [sort, sortmode])

  const searchBook = async (searchValue) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${searchBaseUrl}${searchValue}&sort=${sort}&sortmode=${sortmode}`)
      const { books, summary } = await response.json()
      setCurrentBooks(books)
      setSearchValue(searchValue)
      setCurrentPage(1)
      setFoundBookCount(summary.count)
      setResultText(`${summary.count} files found.`)
      setIsLoading(false);
    } catch (e) {
      console.log(e.message)
      setIsLoading(false);
    }
  }

  const fetchNextPage = async () => {
    try {
      if (foundBookCount <= currentPage * 25) return; // already reached the last page
      setIsFetchingNextPage(true)
      const response = await fetch(`${searchBaseUrl}${searchValue}&sort=${sort}&sortmode=${sortmode}&page=${currentPage + 1}`)
      const { books, summary } = await response.json()
      if (books.length > 0) {
        setCurrentBooks([...currentBooks, ...books])
        setCurrentPage(currentPage + 1)
      }
      setIsFetchingNextPage(false)
    } catch (e) {
      console.log(e.message)
      setIsFetchingNextPage(false)
    }
  }

  const onSortmodeChange = (sort, sortmode) => {
    setSort(sort)
    setSortmode(sortmode)
  }

  const renderItem = useCallback(
    ({item}) => <Book book={item} sort={sort} navigation={navigation}></Book>,
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
    <>
      <SearchBar searchBook={searchBook} scannedISBN={scannedISBN} />
      <Divider/>
      <Layout style={styles.searchFilter}>
        {resultText.length > 0 &&
          <Text style={styles.resultText}>{resultText}</Text>
        }
        <SearchFilterDropdown onSortmodeChange={onSortmodeChange} />
      </Layout>
      <Divider/>
      <List
        data={currentBooks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={7}
        windowSize={11}
        getItemLayout={getItemLayout}
        onEndReached={fetchNextPage}
      />
      { isLoading && <Modal
        visible={true}
        backdropStyle={styles.backdrop}>
        <Button
          size='giant'
          appearance='ghost'
          accessoryLeft={LoadingIndicator}></Button>
      </Modal> }
    </>
  )
}

export default SearchScreen
