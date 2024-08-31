import React, { useContext, useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Avatar, ConfigProvider, Layout, Menu } from "antd";
import { FaMountain, FaTasks, FaUser } from "react-icons/fa";
import { AppContext } from "../context/Context";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
// TODO: Add another item interface
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Users", "1", <FaUser />),
  getItem("Resorts", "2", <FaMountain />),
  getItem("Requests", "3", <FaTasks />),
];

const App: React.FC = () => {
  const context = useContext(AppContext);
  const location = useLocation();
  const nav = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    if (context?.user) {
      if (context?.user.role !== "Admin") {
        console.log("Not an admin");
        nav("/404");
      } else {
        setLoadingPage(false);
      }
    }
    // eslint-disable-next-line
  }, [context?.user]);

  useEffect(() => {
    // Set the selected menu item based on the current path
    switch (location.pathname) {
      case "/admin/users":
        setSelectedKey("1");
        break;
      case "/admin/resorts":
        setSelectedKey("2");
        break;
      case "/admin/requests":
        setSelectedKey("3");
        break;
      default:
        setSelectedKey("1");
        break;
    }
  }, [location.pathname]);

  const onSelectKey = (key: string) => {
    switch (key) {
      case "1":
        nav("/admin/users");
        break;
      case "2":
        nav("/admin/resorts");
        break;
      case "3":
        nav("/admin/requests");
        break;
      default:
        break;
    }
  };

  if (loadingPage) {
    return <div className="text-center">Loading...</div>;
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            triggerBg: "#08453e",
            triggerColor: "#14b8a6",
          },
          Menu: {
            itemSelectedBg: "#d1faf5",
            itemSelectedColor: "#14B8A6",
          },
        },
      }}
    >
      <Layout className="center-radial-bg">
        <Sider
          style={{
            minHeight: "100vh",
            backgroundColor: "#14B8A6",
            position: "fixed",
          }} // Example color
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="flex flex-col items-center my-2 px-3">
            <Avatar
              className={`border-secondary border ${
                collapsed ? "collapsed-img" : "not-collapsed-img"
              }`}
              src={`https://via.placeholder.com/150`}
            />
            {!collapsed && (
              <div dir="rtl" className="flex flex-col items-center">
                <h5 className="m-0">Barak Goren</h5>
                <div className="flex text-secondary"></div>
              </div>
            )}
          </div>
          <Menu
            className="bg-teal-500"
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            onClick={(e) => onSelectKey(e.key)}
            items={items}
            selectedKeys={[selectedKey]}
          />
        </Sider>
        <Layout
          className={`bg-transparent ${
            collapsed ? "collapsed" : "not-collapsed"
          }`}
        >
          <Content className="overflow-y-scroll px-10">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
