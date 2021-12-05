import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Progress, Button } from 'reactstrap';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

import { getDashboardStats } from '../../../store/actions/dashboardActions';
import { Loader } from '../../../vibe';

export default function Dashboard() {
  const [dashboardStatistics, setDashboardStatistics] = useState({});
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();

  // access store to get appropriate data and store in the variable
  // NB: data gotten from store ends with _store for readability
  const dashboard_store = useSelector(state => state.dashboard.dashboardStats);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchDashboardStats();
  }, []);

  // This use effect hook stores the data gotten from
  // the store in the appropriate state when the data arrives
  useEffect(() => {
    setDashboardStatistics(dashboard_store);
  }, [dashboard_store]);

  const fetchDashboardStats = async () => {
    setLoadingData(true);
    try {
      await dispatch(getDashboardStats());
      setLoadingData(false);
    } catch (error) {
      const err = error.response.data.message;
      console.log('fff', error.response.data.message);
      setLoadingData(false);
      setErrorMessage(err);
    }
  };

  //Config for the chart, to be exported to another file
  const chartColors = {
    red: 'rgb(233, 30, 99)',
    danger: 'rgb(233, 30, 99)',
    dangerTransparent: 'rgba(233, 30, 99, .8)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 180, 0)',
    green: 'rgb(34, 182, 110)',
    blue: 'rgb(68, 159, 238)',
    primary: 'rgb(68, 159, 238)',
    primaryTransparent: 'rgba(68, 159, 238, .8)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',

    primaryShade1: '#5b86e5',
    primaryShade2: '#0b2a2c',
    primaryShade3: '#5b86e5',
    primaryShade4: '#36d1dc',
    primaryShade5: 'rgb(12, 70, 117)',
  };
  const donutData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        data: [200, 150, 50, 100],
        backgroundColor: [
          chartColors.primaryShade1,
          chartColors.primaryShade4,
          chartColors.primaryShade2,
          chartColors.primaryShade3,
        ],
        hoverBackgroundColor: [chartColors.primaryShade2, chartColors.primaryShade4, chartColors.primaryShade4],
      },
    ],
  };
  const line = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Attendees',
          data: [28, 16, 10, 4, 18, 6],
          borderColor: 'transparent',
          backgroundColor: [
            chartColors.primaryShade3,
            chartColors.primaryShade4,
            chartColors.primaryShade2,
            chartColors.primaryShade3,
            chartColors.primaryShade1,
            chartColors.primaryShade3,
          ],
          pointBackgroundColor: 'rgba(0,0,0,0)',
          pointBorderColor: 'rgba(0,0,0,0)',
          borderWidth: 4,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
          },
        ],
        yAxes: [
          {
            display: true,
          },
        ],
      },
      legend: {
        display: true,
      },
      tooltips: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <Card
        className="primary-color-text"
        style={{
          borderRadius: 5,
          padding: 10,
        }}
      >
        <Row>
          <Col>
            <h2>Dashboard</h2>
            <p className="text-muted">Here's what's going on with MUON today.</p>
          </Col>
        </Row>
      </Card>
      {loadingData ? (
        <Loader type="bars" />
      ) : (
        <>
          <Row>
            <Col md={12} sm={12}>
              <Card>
                <CardHeader className="primary-color-text">Conversions</CardHeader>
                <CardBody>
                  <Row className="m-b-md text-center">
                    <Col xs={4}>
                      <h5>New Investors</h5>
                      <div className="h2" className="primary-color-text">
                        <h2>{dashboardStatistics.investors}</h2>
                      </div>
                      <small className="text-muted">117 Last Week</small>
                    </Col>
                    <Col xs={4}>
                      <h5>New Founders</h5>
                      <div className="h2" className="primary-color-text">
                        <h2>{dashboardStatistics.founders}</h2>
                      </div>
                      <small className="text-muted">250 Last Week</small>
                    </Col>
                    <Col xs={4}>
                      <h5>New Events</h5>
                      <div className="h2" className="primary-color-text">
                        <h2>{dashboardStatistics.events}</h2>
                      </div>
                      <small className="text-muted">100 Last Week</small>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={4} sm={12}>
              <Card>
                <CardHeader className="primary-color-text">Event Sales</CardHeader>
                <CardBody>
                  <Doughnut data={donutData} width={908} height={768} legend={{ display: false }} />
                </CardBody>
              </Card>
            </Col>
            <Col md={8} sm={12}>
              <Card>
                <CardHeader className="primary-color-text">Event Registration</CardHeader>
                <CardBody>
                  <div className="full-bleed">
                    <Bar data={line.data} width={2068} height={846} legend={{ display: true }} options={line.options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
  // }
}
