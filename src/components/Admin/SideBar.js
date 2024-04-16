// import 'react-pro-sidebar/dist/css/styles.css';
// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { FaTachmoeterAlt, FaGem, FaList, FaGithub, FaHeart } from 'react-icons/fa'
// const SideBar = () => {
//   return (
//     <>
//       <ProSidebar>
//         <Menu iconShape="square">
//           <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
//           <SubMenu title="Components" icon={<FaHeart />}>
//             <MenuItem>Component 1</MenuItem>
//             <MenuItem>Component 2</MenuItem>
//           </SubMenu>
//         </Menu>
//       </ProSidebar>;
//     </>
//   )
// }
// export default SideBar

import 'react-pro-sidebar/dist/css/styles.css';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from 'react-icons/di'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom';


const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <DiReact sixe={'3em'} color={"00bfff"} />
            <span> Trần Quốc Lộc</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              suffix={<span className="badge red">New</span>}
            >
              dashboard
              <Link to='/admin' />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu

              icon={<FaGem />}
              title="Features"
            >
              <MenuItem>
                Quản lý Users
                <Link to='/admin/manage-users' />

              </MenuItem>
              <MenuItem> Quản lý Bài Quiz</MenuItem>
              <MenuItem> Quản lý Câu Hỏi</MenuItem>
            </SubMenu>

          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href="https://github.com/quocloc11/React_Udemi-Quizz"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                &#169; Trần Quốc Lộc
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  )
}

export default SideBar;