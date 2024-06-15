import { Col, Row } from 'antd'
import React from 'react'

export const HomePage = () => {
  return (
    <>
    <div className='home-page-container'>
      <Row className="home-page-block" gutter={1}>
        <Col className="gutter-row" span={1}></Col>
        <Col className="gutter-row" span={22}>
          <h2 className='title'>Home Page</h2>
        </Col>
        <Col className="gutter-row" span={1}></Col>
      </Row>
    </div>
  </>
  )
}
