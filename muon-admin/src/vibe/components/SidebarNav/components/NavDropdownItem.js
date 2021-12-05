import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FontAwesome from '@fortawesome/free-solid-svg-icons';
import NavBadge from './NavBadge';
import NavSingleItem from './NavSingleItem';
import { isSuperAdmin } from '../../../../utils/roles';

const NavDropdownItem = props => {
  const [open, setOpen] = useState(false);

  const toggle = e => {
    setOpen(!open);
    e.preventDefault();
    e.stopPropagation();
  };

  const { item } = props;
  const isExpanded = open ? 'open' : '';
  const Icon = item.icon ? <FontAwesomeIcon className="side-nav-icon" icon={item.icon} /> : null;
  const ExpandIcon = open ? (
    <FontAwesomeIcon className="menu-expand-icon" icon={FontAwesome.faChevronDown} />
  ) : (
    <FontAwesomeIcon className="menu-expand-icon" icon={FontAwesome.faChevronRight} />
  );
  return (
    <>
      {isSuperAdmin() && item.superAdmin ? (
        <li className={`nav-item has-submenu ${isExpanded}`}>
          <a href="#!" role="button" onClick={toggle}>
            {item.icon && Icon && Icon}
            <span className="nav-item-label">{item.name}</span>{' '}
            {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
            {ExpandIcon}
          </a>
          {(open || props.isSidebarCollapsed) && (
            <ul className="nav-submenu">
              {item.children.map((item, index) => (
                <NavSingleItem item={item} key={index} />
              ))}
            </ul>
          )}
        </li>
      ) : (
        !item.superAdmin && (
          <li className={`nav-item has-submenu ${isExpanded}`}>
            <a href="#!" role="button" onClick={toggle}>
              {item.icon && Icon && Icon}
              <span className="nav-item-label">{item.name}</span>{' '}
              {item.badge && <NavBadge color={item.badge.variant} text={item.badge.text} />}
              {ExpandIcon}
            </a>
            {(open || props.isSidebarCollapsed) && (
              <ul className="nav-submenu">
                {item.children.map((item, index) => (
                  <NavSingleItem item={item} key={index} />
                ))}
              </ul>
            )}
          </li>
        )
      )}
    </>
  );
};

export default NavDropdownItem;
