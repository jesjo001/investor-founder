import React from 'react';
import { Card, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, withButton, buttonText, buttonIcon, buttonLink }) => {
  return (
    <Card className="card-class primary-color-text">
      <Row>
        <div className="col-md-11">
          <h2>{title}</h2>
        </div>
        <div className="m-auto">
          {withButton && (
            <Link to={buttonLink}>
              <Button className="btn-small" color="">
                {buttonText} &nbsp;
                <i className={`fa ${buttonIcon}`} />
              </Button>
            </Link>
          )}
        </div>
      </Row>
    </Card>
  );
};

export default PageHeader;
