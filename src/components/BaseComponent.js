import React from 'react';
import { Breadcrumb, Col, Layout, Menu, Row, theme } from 'antd';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { TaskDetailsPage } from '../pages/TaskDetailsPage';
import { HomePage } from '../pages/HomePage';
import { ErrorPage } from '../pages/ErrorPage';
import '../styles/theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Header, Content, Footer } = Layout;

// const items = new Array(3).fill(null).map((_, index) => ({
//     key: index + 1,
//     label: `nav ${index + 1}`,
// }));

const items = [
    {
      key: 1,
      label: <Link to="/home">HOME</Link>
    },
    {
      key: 2,
      label: <Link to="/task">Task Details</Link>
    },
    {
      key: 3,
      label: <Link to="/about">About</Link>
    }
  ];

  
const BaseComponent = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
        <Layout className='base-layout-container'>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" >
                  {/* <img src='../../public/assets/images/task-tracker-image.png' /> */}
                  <img src={`${process.env.PUBLIC_URL}/assets/images/task-tracker-image.png`} alt="Task Tracker Image" className='logo' />

                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                {/* <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Row justify="center" align="middle" gutter={1}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Routes>
                                <Route path="/" element={<TaskDetailsPage />} />
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/task" element={<TaskDetailsPage />} />
                                <Route path="/old-home" element={<Navigate to="/home" replace />} />
                                <Route path="*" element={<ErrorPage />} />
                            </Routes>
                        </Col>
                    </Row>        </div>
            </Content>
            <Footer
              className='footer'
            >
                Task Tracker ©{new Date().getFullYear()} Created by Devs
            </Footer>
        </Layout>
        <ToastContainer />
        </>
    );
};
export default BaseComponent;