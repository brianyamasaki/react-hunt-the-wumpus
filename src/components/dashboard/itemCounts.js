import React, { Component } from 'react';

import './itemCounts.css';

class ItemCounts extends Component {
  static defaultProps = {
    descriptions: {
      singular: 'singular',
      plural: 'plural'
    },
    count: 13,
    icon: ''
  };

  render() {
    const { descriptions, count } = this.props;
    const description = count !== 1 ? descriptions.plural : descriptions.singular;
    return <div className="itemCounts">{count} {description}</div>;
  }
};

export default ItemCounts;