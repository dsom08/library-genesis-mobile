import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: wp(96),
    height: hp(20),
    marginHorizontal: wp(2),
    marginTop: hp(1),
    padding: 0,
    flexDirection: 'row'
  },
  thumbnail: {
    width: wp(26),
    height: hp(20),
  },
  contentsContainer: {
    height: hp(18.5),
    flexDirection: 'row',
  },
  details: {
    width: wp(70),
    height: hp(20),
    paddingHorizontal: wp(3)
  },
  sortDetail: {
    marginTop: hp(2)
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: hp(2),
    right: wp(4),
    width: wp(20),
    height: hp(5),
  },
  deleteButton: {
    position: 'absolute',
    bottom: hp(2),
    right: wp (26),
    width: wp(20),
    height: hp(5),
  }
})

export default styles;
