import { Col, Row } from 'antd'
import React from 'react'

export const ErrorPage = () => {
  return (
    <>
    <div className='error-page-container'>
      <Row className="error-page-block" gutter={1}>
        <Col className="gutter-row" span={1}></Col>
        <Col className="gutter-row" span={22}>
        <h2 className='title'>Oops!!! Page Not Found</h2>
        <img src={`${process.env.PUBLIC_URL}/assets/images/404.jpg`} alt="Task Tracker Image" className='error-image' />

        </Col>
        <Col className="gutter-row" span={1}></Col>
      </Row>
    </div>
  </>
  )
}
