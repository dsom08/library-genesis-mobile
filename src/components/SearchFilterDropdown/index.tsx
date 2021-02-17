import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { SortMode } from './extra/data';

// sort by Title, Year, Pages, Language, Size, Extension
const placements: SortMode[] = [
  new SortMode('ID ▲', 'id', 'ASC'),
  new SortMode('ID ▼', 'id', 'DESC'),
  new SortMode('Year ▲', 'year', 'ASC'),
  new SortMode('Year ▼', 'year', 'DESC'),
  new SortMode('Pages ▲', 'pages', 'ASC'),
  new SortMode('Pages ▼', 'pages', 'DESC'),
  new SortMode('Size ▲', 'filesize', 'ASC'),
  new SortMode('Size ▼', 'filesize', 'DESC'),
  new SortMode('Extension ▲', 'extension', 'ASC'),
  new SortMode('Extension ▼', 'extension', 'DESC'),
  new SortMode('Title ▲', 'title', 'ASC'),
  new SortMode('Title ▼', 'title', 'DESC'),
  new SortMode('Language ▲', 'language', 'ASC'),
  new SortMode('Language ▼', 'language', 'DESC'),
]

const SearchFilterDropdown = ({ onSortmodeChange }) => {
  const [placementIndex, setPlacementIndex] = useState(new IndexPath(3)); // default sort by year desc
  const placement: SortMode = placements[placementIndex.row];

  const onPlacementSelect = (index: IndexPath): void => {
    setPlacementIndex(index);
    const selectedMode: SortMode = placements[index.row];
    onSortmodeChange(selectedMode.sortby, selectedMode.order);
  }

  const renderPlacementItem = (item: SortMode) => (
    <SelectItem title={item.label}/>
  )

  return (
    <Select
      style={styles.searchFilter}
      placeholder='Select sort'
      value={placement.label}
      selectedIndex={placementIndex}
      onSelect={onPlacementSelect}>
      {placements.map(renderPlacementItem)}
    </Select>
  )
}

const styles = StyleSheet.create({
  searchFilter: {
    width: wp(40),
    marginHorizontal: wp(1),
  }
})

export default SearchFilterDropdown;
