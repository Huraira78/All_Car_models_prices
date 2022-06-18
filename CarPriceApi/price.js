import React, { useEffect, useState } from "react";
import "./price.scss";
import ScrollIntoView from "react-scroll-into-view";
import { Button } from "reactstrap";
import Header from "../../carprice/header.js";
import { useParams } from "react-router-dom";


const Carpriceapi = () => {
  const { brand } = useParams()
  const [data, setdata] = useState([]);
  const [active, setactive] = useState(0);

  const url = "https://api.autodeals.pk/cars/prices/-/";


  useEffect(() => {
    var id = brand.split('_')
    id = id[id.length - 1]

    getapi(id);
  }, [brand]);

  const getapi = async (id) => {
    const response = await fetch(url + id);
    if(!response.ok){
        throw new Error(`This is an HTTP error: The status is ${response.status}`)
    }
    const data = await response.json();
    setdata(data);
  };

//   const getMakes=()=>{
    
//     fetch("https://api.autodeals.pk/makes?category=cars&makeSize=&adsStatus=1")
//       .then((res) => {
//         if(!res.ok){
//           throw new Error(
//             `This is an HTTP error: The status is ${res.status}`
//           );
//         }
//         return res.json()
//       })
//       .then((json) => {
//         const temp = []
//         json.forEach(element => {
//             temp.push({ label: element.name, value: element.id })
//         });

//         setMakes(temp)
//       });
//   }

  return  (
    <>
      <div className="header">
        <Header />
        <div className="container first">
          <div className="btns">
            <h3>Car Prices in Pakistan</h3>
          </div>
          <div className="jumpTo d-flex ">
            <p>Jump to:</p>
            <div className="btnsDiv d-flex">
              {data &&
                data.map((elem) => (
                  <ScrollIntoView selector={`#${elem.modelName.replaceAll(' ', '-')}`} key={elem.modelId}>
                    <Button
                      key={elem.modelId}
                      onClick={() => setactive(elem.modelId)}
                    >
                      <a
                        className={`${active === elem.modelId ? "active" : ""}`}
                      >
                        {elem.modelName}
                      </a>
                    </Button>
                  </ScrollIntoView>
                ))}
            </div>
          </div>
          {data.map((elem, i) => (
            <div key={i}>
              <div className="carBlocks">
                <div className="HondaCity" id={elem.modelName.replaceAll(' ', '-')}>
                  <h2>
                    {elem.makeName} {elem.modelName} Car Price
                  </h2>
                  <div className="row">
                    <div className="col-sm-6">
                      <h4>Varients</h4>
                    </div>
                    <div className="col-sm-6">
                      <h4>Ex-Factory Prices</h4>
                    </div>
                  </div>

                  <div className="card border-0">
                    {elem.prices.map((priceElem, j) => (
                      <div className="row border my-2 p-1" key={j}>
                      <div className="features col-sm-6">
                        <span className="p1 border-bottom">
                          {priceElem.text}
                        </span>
                        <p className="p2">1500 cc, Automatic, Petrol</p>
                      </div>
                      <div className="Prices col-sm-6 d-flex justify-content-between align-items-center border-left">
                        <div>
                          <h3>PKR {priceElem.price}</h3>
                        </div>
                        <div className="pricesPara">
                          <p>{priceElem.text}</p>
                          <p>Comfort For Sale</p>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Carpriceapi;
