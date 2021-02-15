import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: wp(96),
    height: hp(20),
    marginHorizontal: wp(2),
    marginTop: hp(1),
    padding: wp(1),
    backgroundColor: '#f8f8f8',
    borderRadius: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    flexDirection: 'row',
  },
  thumbnail: {
    width: wp(25),
    height: hp(19),
  },
  contentsContainer: {
    flex: 1,
    height: hp(18.5),
    marginHorizontal: wp(2),
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(2.5),
  },
  author: {
    fontFamily: 'Roboto-thin',
    fontSize: hp(2),
    color: '#767676',
  },
  year: {
    marginTop: hp(2),
    fontFamily: 'Roboto-Regular'
  },
  downloadButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: hp(1),
    marginTop: hp(2),
    width: wp(20),
    height: hp(6),

    borderRadius: 6,
    backgroundColor: '#D44949',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 8,
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    color: '#eee',
  },
  downloading: {
    position: 'absolute',
    bottom: hp(1),
    right: 0,
    width: wp(20),
    height: hp(6),

    borderRadius: 6,
    backgroundColor: '#E4E4E4',
  },
  openButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: hp(1),
    marginTop: hp(2),
    width: wp(20),
    height: hp(6),

    borderRadius: 6,
    backgroundColor: 'green',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 8,
  },
  removeButton: {
    position: 'absolute',
    bottom: hp(1),
    right: wp(23),
    width: wp(20),
    height: hp(6),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 6,
    backgroundColor: '#E4E4E4',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 8,
  },
  removeButtonText: {
    fontFamily: 'Roboto-Medium',
    color: '#888',
  },
})

export default styles;
