import { Col, Row } from 'antd'
import React, { useState } from 'react'
import AddTaskModalComponent from '../components/AddTaskModalComponent'
import ViewTasksComponent from '../components/ViewTasksComponent'
import { ReconciliationOutlined } from '@ant-design/icons'

export const TaskDetailsPage = () => {

  const [taskFormData, setTaskFormData] = useState({});
  const [open, setOpen] = useState(false);
  const [taskMode, setTaskMode] = useState("Add");

  return (
    <>
      <div className='task-details-container'>
        <Row className="task-details-block" gutter={1}>
          <Col className="gutter-row" span={1}></Col>
          <Col className="gutter-row" span={22}>
            <h2 className='title'>Task Details Page <ReconciliationOutlined /></h2>
            <AddTaskModalComponent setTaskFormData={setTaskFormData} taskFormData={taskFormData} setOpen={setOpen} open={open} setTaskMode={setTaskMode} taskMode={taskMode} />
            <ViewTasksComponent setTaskFormData={setTaskFormData} taskFormData={taskFormData} setOpen={setOpen} open={open} setTaskMode={setTaskMode} taskMode={taskMode} />
          </Col>
          <Col className="gutter-row" span={1}></Col>
        </Row>
      </div>
    </>
  )
}
