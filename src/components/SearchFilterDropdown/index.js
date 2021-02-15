import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

// sort by Title, Year, Pages, Language, Size, Extension
const SearchFilterDropdown = ({ onSortmodeChange }) => {
  const [sortmode, setSortmode] = useState('year DESC')

  return (
    <Picker
      selectedValue={sortmode}
      style={{height: 40, width: 160}}
      onValueChange={(itemValue, itemIndex) => {
        setSortmode(itemValue)
        onSortmodeChange(...itemValue.split(" "))
      }}>
      <Picker.Item label="ID ▲" value="id ASC" />
      <Picker.Item label="ID ▼" value="id DESC" />
      <Picker.Item label="Year ▲" value="year ASC" />
      <Picker.Item label="Year ▼" value="year DESC" />
      <Picker.Item label="Pages ▲" value="pages ASC" />
      <Picker.Item label="Pages ▼" value="pages DESC" />
      <Picker.Item label="Size ▲" value="filesize ASC" />
      <Picker.Item label="Size ▼" value="filesize DESC" />
      <Picker.Item label="Extension ▲" value="extension ASC" />
      <Picker.Item label="Extension ▼" value="extension DESC" />
      <Picker.Item label="Title ▲" value="title ASC" />
      <Picker.Item label="Title ▼" value="title DESC" />
      <Picker.Item label="Language ▲" value="language ASC" />
      <Picker.Item label="Language ▼" value="language DESC" />
    </Picker>
  )
}

export default SearchFilterDropdown;
