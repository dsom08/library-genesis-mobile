import React, { useState, useEffect } from 'react'
import { 
  View,
  Image, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Layout, Text, Card, Icon, Spinner, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MIMETypeMapper from '../../libs/MIMETypeMapper';
import { IMAGE_BASE_URL, DOWNLOAD_LINK_BASE_URL } from '@env';

import styles from './styles';

const DownloadIcon = (props) => (
  <Icon {...props} name='download-outline'/>
)

const BookOpenIcon = (props) => (
  <Icon {...props} name='book-open-outline'/>
)

const DeleteIcon = (props) => (
  <Icon {...props} name='trash-2-outline'/>
)

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size='small' />
  </View>
)

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
      const response = await fetch(`${DOWNLOAD_LINK_BASE_URL}${book.md5}`)
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
    <Card style={styles.container} onPress={onPress}>
      <Layout style={styles.contentsContainer}>
        <Image source={{ uri: `${IMAGE_BASE_URL}${book.thumbnail}` }} style={styles.thumbnail}/>
        <Layout style={styles.details}>
          <Text
            numberOfLines={2}
            category='h6'
          >{book.title}</Text>
          <Text category='p2'>{book.author}</Text>
          <Text style={styles.sortDetail} category='label'>{book[(sort === 'filesize' ? 'size' : sort)]}</Text>
          {(() => {
            if (isStored) {
              return <>
                      <Button
                        style={styles.deleteButton}
                        status='danger'
                        accessoryLeft={DeleteIcon}
                        onPress={deleteBook}></Button>
                      <Button
                        style={styles.button}
                        status='success'
                        accessoryLeft={BookOpenIcon}
                        onPress={openBook}></Button>
                    </>
            } else if (isDownloading) {
              return <Button
                        style={styles.button}
                        appearance='ghost'
                        accessoryLeft={LoadingIndicator}
                        disabled={true}
                        ></Button>
            } else {
              return <Button 
                        style={styles.button} 
                        appearance='primary'
                        accessoryLeft={DownloadIcon}
                        onPress={onPressDownloadButton}>
                        {book.extension}</Button> 
            }
          })()}
          {/* {(() => {
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
          })()} */}
        </Layout>
      </Layout>
    </Card>
  )
}

export default Book
