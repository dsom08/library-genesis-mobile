import React from 'react';
import { Image, ImageSourcePropType, ListRenderItemInfo, ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { DetailsList } from './extra/details-list.component';
import { Book, BookDetails } from './extra/data';

export default ({ route }): React.ReactElement => {
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

  return (
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
