import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Aside = styled.aside`
  overflow: auto;
  width: 180px;
  padding: 2rem 0 2rem 1rem;
  color: #fff;
`;

const Header = styled.header`
  font-size: 22px;
  text-align: center;
  padding: 0 0 1rem 0;
  margin-right: 1rem;
  border-bottom: 1px solid #f8f8f840;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  position: relative;
  font-size: 18px;
  > div {
    padding: 1rem 1.5rem;
  }
`;

const ItemsWrapper = styled.nav`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  .item-selected {
    transition: border-radius 0.5s;
    border-radius: 50px 0 0 50px;
    background-color: #e3e3e3;
    color: ${props => props.theme.palette.accent};
  }

  .item-selected + a {
    transition: border-radius 0.5s;
    background-color: #e3e3e3;
    > div {
      transition: border-radius 0.5s;
      border-radius: 0 50px 0 0;
      background-color: ${props => props.theme.palette.accent};
    }
  }
  .item-selected::before {
    position: absolute;
    content: ' ';
    background: #e3e3e3;
    right: 0;
    width: 50px;
    height: 2rem;
    top: -2rem;
  }
  .item-selected::after {
    position: absolute;
    content: ' ';
    background: ${props => props.theme.palette.accent};
    right: 0;
    width: 50px;
    height: 2rem;
    top: -2rem;
    border-radius: 0 0 50px 0;
  }
  .item-selected + div {
    > div {
      transition: border-radius 0.5s;
      border-radius: 0 50px 0 0;
      background-color: ${props => props.theme.palette.accent};
      width: 100%;
      height: 50px;
    }
  }
`;

const BorderPresence = styled.div`
  width: 100%;
  z-index: 1;
  background: #e3e3e3;
  > div {
    border-radius: 0;
    background-color: ${props => props.theme.palette.accent};
    width: 100%;
    height: 50px;
  }
`;

const Sidebar = ({ items = [] }) => {
  return (
    <Aside>
      <Header>
        <span>House JS</span>
      </Header>
      <ItemsWrapper>
        {items.map(({ label, path }) => (
          <Item to={path} key={path} activeClassName="item-selected">
            <div>{label}</div>
          </Item>
        ))}
        <BorderPresence>
          <div />
        </BorderPresence>
      </ItemsWrapper>
    </Aside>
  );
};

export default Sidebar;
