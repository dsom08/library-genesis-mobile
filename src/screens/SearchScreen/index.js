import React, { useState, useEffect } from 'react'
import { 
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Text, Layout, Divider } from '@ui-kitten/components';

import SearchFilterDropdown from '../../components/SearchFilterDropdown';
import SearchBar from '../../components/SearchBar';
import Book from '../../components/Book';

import styles from './styles';

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
      <FlatList
        style={styles.bookList}
        data={currentBooks}
        renderItem={({item}) => <Book book={item} sort={sort} navigation={navigation} />}
        keyExtractor={({md5}) => md5}
        onEndReached={fetchNextPage}
      />
      { isFetchingNextPage && <ActivityIndicator style={styles.fetchNextPage} size={30} color="#444" /> }
      { isLoading && <ActivityIndicator style={styles.loading} size={100} color="#DDD" /> }
    </>
  )
}

export default SearchScreen
