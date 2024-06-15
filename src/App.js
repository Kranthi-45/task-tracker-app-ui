import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TaskDetailsPage } from './pages/TaskDetailsPage';
import { ErrorPage } from './pages/ErrorPage';
import { Row, Col } from "antd";
import BaseComponent from './components/BaseComponent';

// import 'antd/dist/antd.css'; // Import Ant Design CSS

function App() {
  return (
    <div className="App">
      <BaseComponent/>
      {/* <Row justify="center" align="middle" gutter={1}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Routes>
            <Route path="/" element={<TaskDetailsPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/task" element={<TaskDetailsPage />} />
            <Route path="/old-home" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Col>
      </Row> */}
    </div>
  );
}

export default App;
