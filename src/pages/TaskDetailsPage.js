import { Col, Row } from 'antd'
import React from 'react'

export const TaskDetailsPage = () => {
  return (
    <>
      <div className='task-details-container'>
        <Row className="task-details-block" gutter={1}>
          <Col className="gutter-row" span={1}></Col>
          <Col className="gutter-row" span={22}>
            <h2 className='title'>Task Detail Page</h2>
          </Col>
          <Col className="gutter-row" span={1}></Col>
        </Row>
      </div>
    </>
  )
}
