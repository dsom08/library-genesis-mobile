import React, { useState, useEffect } from 'react'
import { 
  View,
  Text, 
  Image, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MIMETypeMapper from '../../libs/MIMETypeMapper';

import styles from './styles';

const Book = ({ book, sort }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isStored, setIsStored] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem(book.md5)
                .then(res => {
                  if (res === null) {
                    setIsStored(false)
                  } else {
                    setIsStored(true)
                  }
                })
                .catch(e => {
                  console.log(e.message);
                })
  }, [])

  const imageBaseUrl = 'http://library.lol'
  const downloadLinkBaseUrl = 'https://azjuojggh5.execute-api.ap-northeast-2.amazonaws.com/dev/link?md5='

  const storeBook = async (book) => {
    try {
      const jsonValue = JSON.stringify(book)
      await AsyncStorage.setItem(book.md5, jsonValue)
    } catch (e) {
      console.log(e.message)
    }
  }

  const onPressDownloadButton = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Library Genesis Mobile Permission',
          message: 'Library Genesis Mobile needs permission to write external storage',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission granted')
        downloadBook()
      } else {
        alert('WRITE_EXTERNAL_STORAGE Permission Denied')
      }
    } else {
      console.log('not android')
      downloadBook()
    }
  }

  const downloadBook = async () => {
    try {
      setIsDownloading(true)
      const response = await fetch(`${downloadLinkBaseUrl}${book.md5}`)
      const { link } = await response.json()
      console.log(link)
      console.log(RNFetchBlob.fs.dirs.DownloadDir)

      let task = RNBackgroundDownloader.download({
        id: book.id,
        url: link,
        destination: `${RNFetchBlob.fs.dirs.DownloadDir}/${book.title.replace(/:/g, ';')}_${book.id}.${book.extension}`
      }).begin((expectedBytes) => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      }).progress((percent) => {
        console.log(`Downloaded: ${percent * 100}%`);
      }).done(() => {
        console.log('Download is done!');
        storeBook(book).then(() => setIsStored(true));
        setIsDownloading(false);
      }).error((error) => {
        console.log('Download canceled due to error: ', error);
        setIsDownloading(false);
      });
      
    } catch (e) {
      console.log(e.message)
      setIsDownloading(false);
    }
  }

  const openBook = () => {
    RNFetchBlob.android.actionViewIntent(`${RNFetchBlob.fs.dirs.DownloadDir}/${book.title.replace(/:/g, ';')}_${book.id}.${book.extension}`, MIMETypeMapper(book.extension))
  }

  const deleteBook = async () => {
    try {
      AsyncStorage.removeItem(book.md5).then(() => {
        setIsStored(false)
      })
      await RNFetchBlob.fs.unlink(`${RNFetchBlob.fs.dirs.DownloadDir}/${book.title.replace(/:/g, ';')}_${book.id}.${book.extension}`)
    } catch (e) {
      console.log(e.message)
    }
  }

  const onPress = () => {
    navigation.navigate("BookDetail", { book: book });
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container} >
        <View style={styles.imageContainer}>
          <Image source={{ uri: `${imageBaseUrl}${book.thumbnail}` }} style={styles.thumbnail}/>
        </View>
        <View style={styles.contentsContainer}>
          <Text 
            style={styles.title}
            numberOfLines={2}
          >{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.year}>{book[(sort === 'filesize' ? 'size' : sort)]}</Text>
          {(() => {
            if (isStored) {
              return <>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={deleteBook}
                        >
                          <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.openButton}
                          onPress={openBook}
                        >
                          <Text style={styles.buttonText}> Open {book.extension.toUpperCase()}</Text>
                        </TouchableOpacity>
                      </>
            } else if (isDownloading) {
              return <ActivityIndicator size="small" color="#888" style={styles.downloading} />
            } else {
              return <TouchableOpacity
                      style={styles.downloadButton}
                      onPress={onPressDownloadButton}
                      disabled={isDownloading}
                    >
                      <MaterialCommunityIcons name={'download'} size={20} color={'#eee'}/>
                      <Text style={styles.buttonText}> {book.extension.toUpperCase()}</Text>
                    </TouchableOpacity>
            }
          })()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Book
