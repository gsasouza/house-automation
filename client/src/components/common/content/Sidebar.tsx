import * as React from 'react'
import {
  EuiNavDrawer,
  EuiNavDrawerGroup,
  EuiHorizontalRule,
  EuiImage,
  EuiI18n,
} from '@elastic/eui'
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setNavDrawerRef }) => {
  const navigate = useNavigate();
  const publicLinks = [
    {
      label: 'Home',
      onClick: () => navigate('/dashboard'),
      iconType: 'dashboardApp',
    },
    {
      label: 'Cômodos',
      onClick: () => navigate('/dashboard/rooms'),
      iconType: 'spacesApp',
    },
  ];

  const adminLinks = [
    {
      label: 'Placas',
      onClick: () => navigate('/dashboard/boards'),
      iconType: 'managementApp',
    },
    {
      label: 'Dispositivos',
      onClick: () => navigate('/dashboard/boardIos'),
      iconType: 'graphApp',
    },
  ];

  return (
    <EuiNavDrawer ref={ref => setNavDrawerRef(ref)}>
      <EuiNavDrawerGroup listItems={publicLinks} />
      <EuiHorizontalRule margin="none" />
      <EuiNavDrawerGroup listItems={adminLinks} />
    </EuiNavDrawer>
  );
}

export default Sidebar;
