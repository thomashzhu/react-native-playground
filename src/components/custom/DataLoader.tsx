import React from 'react';
import { connect } from 'react-redux';

import { ReduxState } from '../../reducers';

type Props = {};

type State = {};

class _DataLoader extends React.Component<Props, State> {
  componentDidMount() {
    // TODO: Load data
  }

  render() {
    return null;
  }
}

export const DataLoader = (() => {
  const mapStateToProps = (state: ReduxState) => ({});

  const { loadAllSites } = require('../../actions/volta_actions');

  const mapDispatchToProps = {};

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(_DataLoader);
})();
