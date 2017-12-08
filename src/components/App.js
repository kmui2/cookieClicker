import React, { Component } from 'react';
import './../styles/App.css';
import CookieButton from './CookieButton';
import Header from './Header';
import mysterious_figure from './../images/mysterious_figure.jpg';
import merchant from './/../images/merchant.jpg'
import EatCookies from './EatCookies'
import UpgradeClick from './upgradeClick'
import Memaw from './Memaw'
import FireMemaw from './FireMemaw';
import 'bootstrap/dist/css/bootstrap.min.css'
import Farm from './Farm'
import BurnFarm from './BurnFarm'
// import { Button } from 'react-bootstrap';


export default class App extends Component {
  timer = setInterval(() => {
    this.setState((prevState) => {
      return {
        clicks: prevState.clicks + prevState.meMaws + prevState.farms,
        Ate: false
      }
    });

  }, 1000)
  state = {
    clicks: 1,
    power: 1,
    consecEat: 1,
    Ate: false,
    meMaws: 0,
    upgradeClickPrice: 10,
    farms: 0
  };
  componentDidMount() {
    const clicks = parseInt(localStorage.getItem('clicks'), 10);
    const meMaws = parseInt(localStorage.getItem('meMaws'), 10);
    const power = parseInt(localStorage.getItem('power'), 10);
    const farms = parseInt(localStorage.getItem('farms'), 10);
    if (!isNaN(clicks) && !isNaN(meMaws) && !isNaN(power) && !isNaN(farms)) {
      this.setState(() => ({ clicks, meMaws, power, farms }));
    }

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.meMaws !== this.state.meMaws) {
      const meMaws = this.state.meMaws;
      localStorage.setItem('meMaws', meMaws)
    }
    if (prevState.farms !== this.state.farms) {
      const farms = this.state.farms;
      localStorage.setItem('farms', farms)
    }
    if (prevState.clicks !== this.state.clicks) {
      const clicks = this.state.clicks;
      localStorage.setItem('clicks', clicks)
    }
    if (prevState.power !== this.state.power) {
      const power = this.state.power;
      localStorage.setItem('power', power)
    }
  }
  upgradeClick = (prevState) => {
    if (this.state.clicks - this.state.upgradeClickPrice >= 0) {
      this.setState((prevState) => {
        return {
          power: prevState.power + 1,
          clicks: prevState.clicks - prevState.upgradeClickPrice,
          upgradeClickPrice: prevState.upgradeClickPrice + 10
        }
      })
    }
  }
  makeCookies = (prevstate) => {
    this.setState((prevState) => {
      return {
        consecEat: 1,
        clicks: prevState.clicks + prevState.power,
        Ate: false
      }
    });
  };
  eatCookies = (prevState) => {
    this.setState((prevState) => {
      if (prevState.clicks - prevState.consecEat * 2 < 0) {
        return {
          clicks: 0
        }
      }
      return {
        consecEat: prevState.consecEat *= 2,
        clicks: prevState.clicks - prevState.consecEat,
        Ate: true
      }
    });
  }
  Memaw = (prevState) => {
    this.setState((prevState) => {
      return { meMaws: prevState.meMaws + 1 }
    })

  }
  fireMemaw = () => {
    if (this.state.meMaws > 0) {
      this.setState((prevState) => {
        return {
          meMaws: prevState.meMaws - 1
        }
      })
    }
  }
  buildFarm = () => {
    this.setState((prevState) => {
      return {
        farms: prevState.farms + 1
      }
    })
  }
  burnFarm = () => {
    this.setState((prevState) => {
      return {
        farms: prevState.farms - 1
      }
    })
  }
  render() {
    const subTitle = 'Welcome to Cookie Clicker';
    return (
      <div className="App">
        <header className="App-header">
          <Header subTitle={subTitle} />
          <CookieButton
            makeCookies={this.makeCookies}
          />
          <EatCookies
            eatCookies={this.eatCookies}
          />
          <h1>Count: {(this.state.clicks !== 0) ? this.state.clicks : "You Ate All The Cookies!"}</h1>
          <h2>{(this.state.Ate === true && this.state.clicks !== 0) && <p>You Ate {this.state.consecEat} Cookies!</p>} </h2>
        </header>
        <body>
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-12">
              {(this.state.clicks < 10) ? <img align="left" src={mysterious_figure} /> : <img align="left" src={merchant} />}
            </div>
            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-12">
              <br />
              <ul>
                <li>
                  <UpgradeClick
                    upgradeClick={this.upgradeClick}
                  />
                </li>
                <br />
                <li>
                  <Memaw
                    Memaw={this.Memaw}
                  />
                </li>
                <br />
                <li>
                  <FireMemaw
                    fireMemaw={this.fireMemaw}
                  />
                </li>
                <br />
                <li>
                <Farm
                  buildFarm={this.buildFarm}
                />
              </li>
              <br />
              <li>
              <BurnFarm
                burnFarm={this.burnFarm}
              />
            </li>
              </ul>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

