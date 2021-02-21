import React from 'react';
import { Image, ScrollView, SafeAreaView, Share } from 'react-native';
import { Divider, StyleService, Text, useStyleSheet, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { DetailsList } from './extra/details-list.component';
import { Book, BookDetails } from './extra/data';
import { DOWNLOAD_LINK_BASE_URL, IMAGE_BASE_URL } from '@env';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
)

const ShareIcon = (props) => (
  <Icon {...props} name='share' />
)

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
      const response = await fetch(`${DOWNLOAD_LINK_BASE_URL}${book.md5}`)
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
        <Image source={{ uri: `${IMAGE_BASE_URL}${bookdata.thumbnail}`}} style={styles.primaryImage} />
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
        <Divider />
        <Text style={styles.infoLabel} category='label' appearance='hint'>file size</Text>
        <Text style={styles.infoValue} category='p1'>{book.size}</Text>
        <Text style={styles.infoLabel} category='label' appearance='hint'>pages</Text>
        <Text style={styles.infoValue} category='p1'>{book.pages}</Text>
        <Text style={styles.infoLabel} category='label' appearance='hint'>publisher</Text>
        <Text style={styles.infoValue} category='p1'>{book.publisher}</Text>
        <Text style={styles.infoLabel} category='label' appearance='hint'>edition</Text>
        <Text style={styles.infoValue} category='p1'>{book.edition}</Text>
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
    paddingVertical: hp(3),
  },
  primaryImage: {
    alignSelf: 'center',
    width: wp(60),
    height: wp(84),
    borderRadius: 8,
  },
  titleLabel: {
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: wp(10),
    marginTop: hp(3),
  },
  subtitleLabel: {
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  detailsList: {
    alignSelf: 'center',
    marginVertical: hp(3),
  },
  infoLabel: {
    marginTop: hp(1.4),
    alignSelf: 'center',
  },
  infoValue: {
    alignSelf: 'center',
  }
});
