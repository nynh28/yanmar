import React, { Component, Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom';
import '../../assets/dependencies';
// import { Container } from 'reactstrap';
// import EmptyLayout from './EmptyLayout.js'
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
class Sidebar extends Component {
    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation"
                style={{
                    zIndex: 100000,
                    backgroundColor: 'rgba(0,0,0, 0.9)',
                    boxShadow: '-2px 0px 8px 0 rgb(0 0 0 / 24%)'
                }}>
                <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: 'auto', height: '100%' }}>
                    <div className="sidebar-collapse" style={{ overflow: 'hidden', width: 'auto', height: '100%' }}>
                        <a className="close-canvas-menu" onClick={() => {
                            $("body").removeClass("canvas-menu pace-done mini-navbar");
                            $("body").addClass("canvas-menu")
                        }}><i className="fa fa-times" style={{ fontSize: 20 }} /></a>
                        <ul className="nav metismenu" id="side-menu" style={{ paddingTop: 40 }}>
                            <li>
                                <a href="#"><i className="fa fa-home"></i> <span className="nav-label">Home</span></a>
                            </li>
                            <li>
                                <a href="#/DashboardV1"><i className="fa fa-pie-chart"></i> <span className="nav-label">Dashboard V1</span></a>
                            </li>
                            <li>
                                <a href="#/DashboardV2"><i className="fa fa-pie-chart"></i> <span className="nav-label">Dashboard V2</span></a>
                            </li>
                            <li>
                                <a href="#/Profile"><i className="fa fa-address-card"></i> <span className="nav-label">Profile</span></a>
                            </li>
                            <li>
                                <a href="#/Contacts"><i className="fa fa-diamond"></i> <span className="nav-label">Contacts</span></a>
                            </li>
                            <li>
                                <a href="#/Inbox"><i className="fa fa-inbox"></i> <span className="nav-label">Inbox</span></a>
                            </li>
                            <li>
                                <a href="#/Permissions"><i className="fa fa-lock"></i> <span className="nav-label">Permissions</span></a>
                            </li>
                            <li>
                                <a href="#/Management"><i className="fa fa-lock"></i> <span className="nav-label">Management</span></a>
                            </li>
                            {/* <li>
                                <a href="index.html"><i className="fa fa-th-large"></i> <span className="nav-label">Dashboards</span> <span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="index.html">Dashboard v.1</a></li>
                                    <li><a href="dashboard_2.html">Dashboard v.2</a></li>
                                    <li><a href="dashboard_3.html">Dashboard v.3</a></li>
                                    <li><a href="dashboard_4_1.html">Dashboard v.4</a></li>
                                    <li><a href="dashboard_5.html">Dashboard v.5 <span className="label label-primary pull-right">NEW</span></a></li>
                                </ul>
                            </li> */}
                            {/* <li>
                                <a href="#"><i className="fa fa-bar-chart-o"></i> <span className="nav-label">Graphs</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="graph_flot.html">Flot Charts</a></li>
                                    <li><a href="graph_morris.html">Morris.js Charts</a></li>
                                    <li><a href="graph_rickshaw.html">Rickshaw Charts</a></li>
                                    <li><a href="graph_chartjs.html">Chart.js</a></li>
                                    <li><a href="graph_chartist.html">Chartist</a></li>
                                    <li><a href="c3.html">c3 charts</a></li>
                                    <li><a href="graph_peity.html">Peity Charts</a></li>
                                    <li><a href="graph_sparkline.html">Sparkline Charts</a></li>
                                </ul>
                            </li> */}
                            {/* <li>
                                <a href="mailbox.html"><i className="fa fa-envelope"></i> <span className="nav-label">Mailbox </span><span className="label label-warning pull-right">16/24</span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="mailbox.html">Inbox</a></li>
                                    <li><a href="mail_detail.html">Email view</a></li>
                                    <li><a href="mail_compose.html">Compose email</a></li>
                                    <li><a href="email_template.html">Email templates</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="metrics.html"><i className="fa fa-pie-chart"></i> <span className="nav-label">Metrics</span>  </a>
                            </li>
                            <li>
                                <a href="widgets.html"><i className="fa fa-flask"></i> <span className="nav-label">Widgets</span></a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-edit"></i> <span className="nav-label">Forms</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="form_basic.html">Basic form</a></li>
                                    <li><a href="form_advanced.html">Advanced Plugins</a></li>
                                    <li><a href="form_wizard.html">Wizard</a></li>
                                    <li><a href="form_file_upload.html">File Upload</a></li>
                                    <li><a href="form_editors.html">Text Editor</a></li>
                                    <li><a href="form_markdown.html">Markdown</a></li>
                                </ul>
                            </li>
                            <li className="active">
                                <a href="#"><i className="fa fa-desktop"></i> <span className="nav-label">App Views</span>  <span className="pull-right label label-primary">SPECIAL</span></a>
                                <ul className="nav nav-second-level collapse in">
                                    <li><a href="contacts.html">Contacts</a></li>
                                    <li><a href="profile.html">Profile</a></li>
                                    <li><a href="profile_2.html">Profile v.2</a></li>
                                    <li><a href="contacts_2.html">Contacts v.2</a></li>
                                    <li><a href="projects.html">Projects</a></li>
                                    <li><a href="project_detail.html">Project detail</a></li>
                                    <li><a href="teams_board.html">Teams board</a></li>
                                    <li><a href="social_feed.html">Social feed</a></li>
                                    <li><a href="clients.html">Clients</a></li>
                                    <li><a href="full_height.html">Outlook view</a></li>
                                    <li><a href="vote_list.html">Vote list</a></li>
                                    <li><a href="file_manager.html">File manager</a></li>
                                    <li><a href="calendar.html">Calendar</a></li>
                                    <li><a href="issue_tracker.html">Issue tracker</a></li>
                                    <li><a href="blog.html">Blog</a></li>
                                    <li className="active"><a href="article.html">Article</a></li>
                                    <li><a href="faq.html">FAQ</a></li>
                                    <li><a href="timeline.html">Timeline</a></li>
                                    <li><a href="pin_board.html">Pin board</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-files-o"></i> <span className="nav-label">Other Pages</span><span className="fa arrow"></span></a>
                                <ul className="nav nav-second-level collapse">
                                    <li><a href="search_results.html">Search results</a></li>
                                    <li><a href="lockscreen.html">Lockscreen</a></li>
                                    <li><a href="invoice.html">Invoice</a></li>
                                    <li><a href="login.html">Login</a></li>
                                    <li><a href="login_two_columns.html">Login v.2</a></li>
                                    <li><a href="forgot_password.html">Forget password</a></li>
                                    <li><a href="register.html">Register</a></li>
                                    <li><a href="404.html">404 Page</a></li>
                                    <li><a href="500.html">500 Page</a></li>
                                    <li><a href="empty_page.html">Empty page</a></li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Sidebar
