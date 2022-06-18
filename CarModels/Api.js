import React from "react";
import "./Api.scss";
import {Link} from "react-router-dom"
import Header from '../carprice/header.js'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isloading: false,
    };
  }
  componentDidMount() {
    fetch("https://api.autodeals.pk/makes?category=cars&makeSize=&adsStatus=1")
      .then((res) => {
        if(!res.ok){
          throw new Error(
            `This is an HTTP error: The status is ${res.status}`
          );
        }
        return res.json()
      })
      .then((json) => {
        this.setState({
          data: json,
          isloading: true,
        });
      });
  }
  render() {
    const { isloading, data } = this.state;

    if (!isloading) {
      <div>
        <h1>Data is loading wait...</h1>;
      </div>;
    }
    return (
      // <div className="mainDiv">
      //   <h1>Api data is given below</h1>
      //   {
      //     data.map((elem)=>(
      //       <div key={elem.id}>
      //         <h5>{elem.name}</h5>
      //         <img src={elem.logoUrl} alt="logo" />
      //       </div>
      //     ))
      //   }
      // </div>
      <div className="header">
           <Header />
      <div className="container firstCon">
        <h3>New Car Prices In Pakistan By Brand</h3>
        <div className="row">
          <div className="Maincard col-sm-12 d-flex flex-wrap">
            {data.map((data) => {
              // const { id, name, logoUrl } = data;
              return (
                <div key={data.id} className="col-sm-2">
                  <div className="card border-0 mb-3">
                    {/* <a href="/" >
                      <img src={data.logoUrl} alt="Brand" />
                    </a> */}
                    <Link to={`/brands/price/${data.name.toLowerCase().trim().replace(' ', '-')}_${data.id}`} className="card border-0 shadow-sm d-flex justify-content-center mx-3 link">
                    <img src={data.logoUrl} alt="Brand" />
                    </Link>
                    <p >{data.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    );
  }
}
export default App;
