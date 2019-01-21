import React from 'react';
import {
  CameraRoll,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Permissions } from 'expo';

import { Grid, ModifiedListRenderItemInfo } from './Grid';

interface GridImage {
  uri: string;
}

interface Props {
  onPressImage: (uri: string) => void;
}
const DEFAULT_PROPS = {
  onPressImage: () => {},
};

interface State {
  images: GridImage[];
}

export class ImageGrid extends React.Component<Props, State> {
  static defaultProps = DEFAULT_PROPS;

  cursor = null;

  loading = false;

  state: State = {
    images: [],
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async (after?: string) => {
    if (this.loading) return;

    this.loading = true;

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    const results = await CameraRoll.getPhotos({
      first: 20,
      after,
    });

    const {
      edges,
      page_info: {
        end_cursor: endCursor,
        has_next_page: hasNextPage,
      },
    } = results;

    const loadedImages = edges.map(item => item.node.image);

    this.setState(({ images }) => ({
      images: images.concat(loadedImages),
    }), () => {
      this.loading = false;
      this.cursor = hasNextPage ? endCursor : null;
    });
  };

  getNextImages = () => {
    if (!this.cursor) return;

    this.getImages(this.cursor);
  };

  renderItem = (info: ModifiedListRenderItemInfo<GridImage>) => {
    const {
      item: { uri }, marginLeft, marginTop, size,
    } = info;
    const { onPressImage } = this.props;

    const style = {
      height: size,
      marginLeft,
      marginTop,
      width: size,
    };

    return (
      <TouchableOpacity
        activeOpacity={0.75}
        key={uri}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image
          source={{ uri }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { images } = this.state;

    return (
      <Grid
        data={images}
        keyExtractor={(item: GridImage) => item.uri}
        onEndReached={this.getNextImages}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
