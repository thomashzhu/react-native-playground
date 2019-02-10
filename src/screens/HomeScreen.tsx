import React from 'react';
import {
  SectionList,
  StyleSheet,
  SectionListData,
  SectionListRenderItemInfo,
  ListRenderItemInfo,
} from 'react-native';

type Props = {};

type State = {};

export class HomeScreen extends React.Component<Props, State> {
  renderContactSectionHeader = ({
    section,
  }: {
    section: SectionListData<string>;
  }) => {
    const { title } = section;
    return null;
  };

  renderContactSectionListItem = (info: SectionListRenderItemInfo<string>) => {
    const { item } = info;
    return null;
  };

  renderContactListItem = (info: ListRenderItemInfo<string>) => {
    const { item } = info;
  };

  render() {
    return (
      <SectionList
        keyExtractor={item => item.id}
        renderItem={this.renderContactSectionListItem}
        renderSectionHeader={this.renderContactSectionHeader}
        sections={[{ title: '', data: [''] }]}
      />
    );
  }
}

const styles = StyleSheet.create({});
