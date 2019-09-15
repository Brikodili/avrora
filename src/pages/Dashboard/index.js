import React from 'react';
import Layout from 'components/Layout';
import Article from './article';
import './style.scss';

export default function () {
  return (
    <Layout>
      <div className="dashboard has-background-grey-lighter">
        <div className="container">
          <div className="columns">
            <div className="column">
              <p className="result has-text-weight-medium">Найдено
                <span className="has-text-grey-light">(192 услуги)</span></p>
              <div className="box">
                <Article/>
                <Article/>
                <Article/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};
