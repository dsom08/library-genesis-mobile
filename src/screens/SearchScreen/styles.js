import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  bookList: {
    backgroundColor: '#e4e4e4',
  },
  searchFilter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#e4e4e4',
  },
  resultText: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    backgroundColor: '#e4e4e4',
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 154,
    top: 60,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  fetchNextPage: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingVertical: 10,
  }
})

export default styles;
