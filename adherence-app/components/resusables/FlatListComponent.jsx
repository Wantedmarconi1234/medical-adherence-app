import { FlatList, StyleSheet } from "react-native";
import React from "react";

export default function FlatListComponent({ data, renderItem, keyExtractor, listStyle }) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor || ((item, index) => item.id?.toString() || index.toString())}
      style={[styles.list, listStyle]} // Merge default styles with custom styles
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1, // Ensures it takes full available space
  },
});
