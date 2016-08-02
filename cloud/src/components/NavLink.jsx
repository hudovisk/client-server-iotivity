import React from 'react';
import { Link } from 'react-router';

export const NavLink = React.createClass({
  contextTypes: {
    router: function () {
      return React.PropTypes.func.isRequired;
    }
  },
  render: function() {
    const { router } = this.context;
    const { to, children } = this.props;

    const isActive = router.isActive(to);

    return (
      <li className={isActive ? 'active' : ''}>
        <Link to={to}>{children}</Link>
      </li>
    )
  }
});