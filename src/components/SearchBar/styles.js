import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#272727',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 45,
    marginLeft: 15,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  clearButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 15,
  },
  searchInput: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#222222',
  },
  searchButton: {
    marginHorizontal: 5,
  }
})

export default styles;
