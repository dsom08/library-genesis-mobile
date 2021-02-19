import React from 'react';
import { Image, ScrollView, SafeAreaView, Share } from 'react-native';
import { Divider, StyleService, Text, useStyleSheet, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { DetailsList } from './extra/details-list.component';
import { Book, BookDetails } from './extra/data';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
)

const ShareIcon = (props) => (
  <Icon {...props} name='share' />
)

const downloadLinkBaseUrl = 'https://azjuojggh5.execute-api.ap-northeast-2.amazonaws.com/dev/link?md5='

export default ({ route, navigation }): React.ReactElement => {
  const { book } = route.params;

  const bookdata: Book = new Book(book.md5,
                                  book.thumbnail,
                                  book.title,
                                  book.author,
                                  book.publisher,
                                  book.year,
                                  book.edition,
                                  book.language,
                                  book.pages,
                                  book.id,
                                  book.size,
                                  book.extension,
                                  [
                                    BookDetails.yearDetail(book.year),
                                    BookDetails.languageDetail(book.language),
                                    BookDetails.extensionDetail(book.extension)
                                  ])

  const imageBaseUrl = 'http://library.lol'
  const styles = useStyleSheet(themedStyles);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  const ShareAction = () => (
    <TopNavigationAction icon={ShareIcon} onPress={onShare} />
  )

  const onShare = async () => {
    try {
      const response = await fetch(`${downloadLinkBaseUrl}${book.md5}`)
      const { link } = await response.json()

      const result = await Share.share({
        title: `${bookdata.title}`,
        message:
          link,
        url: link
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Book Information' alignment='center' accessoryLeft={BackAction} accessoryRight={ShareAction} />
      <Divider />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Image source={{ uri: `${imageBaseUrl}${bookdata.thumbnail}`}} style={styles.primaryImage} />
        <Text
          style={styles.titleLabel}
          category='h6'>
          {bookdata.title}
        </Text>
        <Text
          style={styles.subtitleLabel}
          category='p2'>
          {bookdata.author}
        </Text>
        <Divider />
        <DetailsList
          style={styles.detailsList}
          data={bookdata.details}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  primaryImage: {
    alignSelf: 'center',
    width: 256,
    height: 360,
    borderRadius: 8,
  },
  titleLabel: {
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 64,
    marginTop: 24,
  },
  subtitleLabel: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  detailsList: {
    alignSelf: 'center',
    marginVertical: 24,
  },
});
