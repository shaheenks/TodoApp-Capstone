import React from 'react';
import {connect} from 'react-redux';

const Link = ({
    active,
    onClick,
    children
  }) => {
    if (active) {
      return <span>{children}</span>
    } else {
      return (
        <a href="#" onClick={(e)=>{
          e.preventDefault();
          onClick()
        }}>{children}</a>
    )
    }
  };

const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
});
const mapStateToFilterLinkProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
})
const mapDispatchToFilterLinkProps = (dispatch, ownProps) => ({
    onClick() {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
})
const FilterLink = connect(
  mapStateToFilterLinkProps,
  mapDispatchToFilterLinkProps
)(Link);

const Footer = () => {
    return (
      <p>Show:{' '}
          <FilterLink filter="SHOW_ALL">All</FilterLink>{' '}
          <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{' '}
          <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
      </p>
    )
  };

export default Footer;