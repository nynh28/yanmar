import React, { Component, Suspense } from 'react';
import { t } from '../Components/Translation'
import { Row, Col } from 'reactstrap'

class SidebarFooter extends Component {

  render() {
    // return null
    // Uncomment following code lines to add Sidebar Footer
    return (
      <Row className="footer-fixed">
        <Col sm={6} lg={6}>
          <span>{t('last_version_1')}</span>
        </Col>
        <Col sm={6} lg={6} style={{ textAlign: 'right' }}>
          <span>Copyright </span>
          <a style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Onelink Technology Co.,Ltd. © 2020</a>
        </Col>
      </Row>
    )
    //   return (
    //     <div className="footer-fixed">
    //       {/* <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
    //         <span style={{ fontSize: 12 }}>{t('last_version_1')}</span>
    //       </div> */}
    //       {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 40, paddingLeft: 5 }}>
    //         <span style={{ padding: "10px 10px" }}>Copyright </span>
    //         <a style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Onelink Technology Co.,Ltd. © 2020</a>
    //       </div> */}
    //       <div>

    //         {/* <Col md={12} lg={6}>{t('last_version_1')}</Col>
    //         <Col md={12} lg={6} style={{ textAlign: 'right' }}> Copyright{' '}
    //           <a style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Onelink Technology Co.,Ltd. © 2020</a></Col> */}


    //         {/* <span style={{ padding: "0px 10px" }}>{t('last_version_1')}</span>
    //         <span style={{ textAlign: 'right' }}>
    //           Copyright{' '}
    //           <a style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Onelink Technology Co.,Ltd. © 2020</a>
    //         </span> */}
    //       </div>

    //     </div>
    //   )
  }
}

export default SidebarFooter;
