import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { DataTable } from 'react-native-paper'

import styles from './styles';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;

  const imageBaseUrl = 'http://library.lol'

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Image source={{ uri: `${imageBaseUrl}${book.thumbnail}` }} style={styles.thumbnail}/>
        <Text style={styles.title}>{book.title}</Text>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title></DataTable.Title>
            <DataTable.Title></DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>author</DataTable.Cell>
            <DataTable.Cell>{book.author}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>publisher</DataTable.Cell>
            <DataTable.Cell>{book.publisher}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>year</DataTable.Cell>
            <DataTable.Cell>{book.year}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>edition</DataTable.Cell>
            <DataTable.Cell>{book.edition}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>language</DataTable.Cell>
            <DataTable.Cell>{book.language}</DataTable.Cell>
          </DataTable.Row>
          
          <DataTable.Row>
            <DataTable.Cell>size</DataTable.Cell>
            <DataTable.Cell>{book.size}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>pages</DataTable.Cell>
            <DataTable.Cell>{book.pages}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>extension</DataTable.Cell>
            <DataTable.Cell>{book.extension}</DataTable.Cell>
          </DataTable.Row>

        </DataTable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BookDetailScreen;
