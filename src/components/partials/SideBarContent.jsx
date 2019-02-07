import React from 'react';

const SidebarContent = (props) => {
  const listOf = ['Manage Employees', 'Manage Jobs', 'Manage Job Codes', 'Download Time Sheets'];
  const listLinks = listOf.map(item => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a key={item} href="#">
      {item}
    </a>
  ));

  return (
    <div>
        Test
      {listLinks}
    </div>
  );
};

export default SidebarContent;
