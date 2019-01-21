import React from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  PixelRatio,
  StyleSheet,
} from 'react-native';

export type ModifiedListRenderItemInfo<T> = ListRenderItemInfo<T> & {
  marginLeft: number;
  marginTop: number;
  size: number;
};

interface Props<T> {
  itemMargin?: number;
  numColumns: number;
  renderItem: (info: ModifiedListRenderItemInfo<T>) => React.ReactElement<T> | null;
}
const DEFAULT_PROPS = {
  itemMargin: StyleSheet.hairlineWidth,
};

export class Grid<T> extends React.Component<FlatListProps<T> & Props<T>, {}> {
  static defaultProps = DEFAULT_PROPS;

  renderGridItem = (info: ListRenderItemInfo<T>) => {
    const { index } = info;
    const { itemMargin, numColumns, renderItem } = this.props;

    const { width } = Dimensions.get('window');

    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns
    );

    const marginLeft = (index % numColumns === 0 ? 0 : itemMargin);

    const marginTop = (index < numColumns ? 0 : itemMargin);

    return renderItem({
      ...info,
      marginLeft,
      marginTop,
      size,
    });
  };

  render() {
    return (
      <FlatList
        {...this.props}
        renderItem={this.renderGridItem}
      />
    );
  }
}
