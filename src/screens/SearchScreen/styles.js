import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  searchFilter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
  },
  resultText: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  fetchNextPage: {
    backgroundColor: 'rgba(0,255,0,0.1)',
    paddingVertical: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles;
