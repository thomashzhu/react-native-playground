import React from 'react';
import {
  Image,
  ListRenderItemInfo,
  SectionList,
  StyleSheet,
  SectionListData,
  SectionListRenderItemInfo,
  View,
  ActivityIndicator,
} from 'react-native';

import { getImageUri, MediaType } from '../utils/camera_utils';

type Props = {};

type State = {};

export class HomeScreen extends React.Component<Props, State> {
  state = {
    uri: null,
  };

  async componentDidMount() {
    setTimeout(async () => {
      const uri = await getImageUri(MediaType.PhotoLibrary);
      this.setState({ uri });
    }, 1000);
  }

  handleLoadComplete = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { uri } = this.state;

    /* prettier-ignore */
    return (
      <View style={styles.imageContainer}>
        {!!uri && (
          <Image
            source={{ uri }}
            style={styles.image}
          />
        )}

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
