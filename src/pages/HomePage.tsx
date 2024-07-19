import React, { useEffect, useState } from "react";
import SVG_WAVE2 from "/public/2wave.svg";
import SVGLightEffect1 from "/public/light effect 1.svg";
import SVGLightEffect2 from "/public/light effect 2.svg";
import SVGWatch from "/public/watch.svg";
import SVG_ from "/public/_.svg";
import PNG_Persons from "/public/persons.png";
import { Link } from "react-router-dom";

const HomePage = (props) => {
  const [products, setProducts] = useState<Object[]>([]);

  useEffect(() => {
    setProducts([
      {
        thumbnail: { url: PNG_Persons, alt: "wordpress template for store" },
        title: "wordpress template for store",
        slug: "wordpress-template-for-store",
        content: "test",
        expert: "test",
        date: "03/03/1403",
        price: "20000",
        regular_price: "400000",
        exists: true,
        number_of_exists: 3,
      },
    ]);
  }, []);
  return (
    <div className="flex-1 min-h-full flex flex-col gap-3">
      <div className="hero relative overflow-hidden w-full h-[100vh] bg-gradient-to-bl from-primary to-secondary">
        <div
          className="bg-1 absolute z-0 blur-[200px]"
          style={{
            width: "800px",
            height: "800px",
            top: "-200px",
            right: "-175px",
            backgroundImage: `url(${SVGLightEffect1})`,
            backgroundBlendMode: "color-burn",
            backgroundPosition: "center",
            backgroundSize: "800px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="bg-2 absolute z-0 blur-[200px]"
          style={{
            width: "1200px",
            height: "1200px",
            top: "-100px",
            left: "-300px",
            backgroundImage: `url(${SVGLightEffect2})`,
            backgroundBlendMode: "color-burn",
            backgroundPosition: "center",
            backgroundSize: "1200px",
            backgroundRepeat: "no-repeat",
            rotate: "-1.5deg",
          }}
        ></div>
        <div className="flex justify-center h-full">
          <div className="container h-full">
            <div className="content flex flex-1 lg:flex-row sm:flex-col h-full w-full relative">
              <div className="flex flex-1 flex-col h-full align-middle w-full justify-center text-start z-[3] gap-3">
                <h1 className="font-bold text-[62px] text-white font-Poppins">
                  Hello World!
                </h1>
                <p className="text-[22px] text-white font-Poppins">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
                  quisquam aut dolorum, praesentium expedita impedit, temporibus
                  voluptatum placeat iste dolorem tenetur aperiam dicta sed
                  explicabo vel! Unde accusantium amet debitis.
                </p>
                <div className="flex gap-3 align-middle justify-start">
                  <Link
                    to="/about#contact"
                    className="bg-white text-[#212121] px-[35px] py-[20px] w-[242px] h-[68px] flex justify-center align-middle rounded-full text-[22px] font-bold shadow-lg min-w-fit"
                  >
                    Contact Us
                  </Link>
                  <div className="w-auto h-fit relative">
                    <div>
                      <object data={SVGWatch} type=""></object>
                    </div>
                    <Link
                      to="/hiw"
                      className="absolute top-0 left-0 w-full h-full"
                    ></Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-end h-full w-full relative">
                <div
                  className="h-full absolute left-0 top-0 z-0 lg:w-[800px] md:w-[400px] sm:w-[200px]"
                  style={{
                    backgroundImage: `url(${PNG_Persons})`,
                    backgroundPosition: "bottom",
                    backgroundSize: "auto",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <object
          data={SVG_WAVE2}
          type=""
          className="absolute -bottom-1 left-0 z-[2] w-full"
        ></object>
      </div>

      <div className="service relative overflow-hidden w-full h-[100vh] bg-white">
        <div className="flex justify-center align-middle">
          <div className="container flex flex-col gap-12">
            <div className="flex flex-row h-fit">
              <div className="flex-1 w-full">
                <h2 className="font-Poppins text-[48px] font-bold text-gray-900">
                  Other Service of <span className="text-primary">ARUSH</span>
                </h2>
                <Link
                  to={"/"}
                  className="font-Poppins text-[16px] border-2 px-6 py-1.5 rounded-full border-primary text-primary"
                >
                  see more
                </Link>
              </div>
              <div className="flex-1 flex w-full justify-end align-middle">
                <div className="flex flex-row gap-3 w-[50%]">
                  <object data={SVG_} type="" className="w-8 h-8"></object>
                  <p className="text-[14px] font-Poppins">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="card text-gray-900 bg-white shadow-md flex gap-3 flex-row px-3 py-1.5 w-fit rounded">
                <div className="icon bg-secondary-100 text-secondary w-20 h-20 flex justify-center align-middle rounded"></div>
                <div className="content flex justify-start align-middle flex-col">
                  <h5 className="text-black font-Poppins text-[22px] font-semibold">
                    web developer
                  </h5>
                  <h5 className="text-gray-900 font-Poppins text-[18px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, in!
                  </h5>
                </div>
              </div>
              <div className="card text-gray-900 bg-white shadow-md flex gap-3 flex-row px-3 py-1.5 w-fit rounded">
                <div className="icon bg-secondary-100 text-secondary w-20 h-20 flex justify-center align-middle rounded"></div>
                <div className="content flex justify-start align-middle flex-col">
                  <h5 className="text-black font-Poppins text-[22px] font-semibold">
                    web developer
                  </h5>
                  <h5 className="text-gray-900 font-Poppins text-[18px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, in!
                  </h5>
                </div>
              </div>
              <div className="card text-gray-900 bg-white shadow-md flex gap-3 flex-row px-3 py-1.5 w-fit rounded">
                <div className="icon bg-secondary-100 text-secondary w-20 h-20 flex justify-center align-middle rounded"></div>
                <div className="content flex justify-start align-middle flex-col">
                  <h5 className="text-black font-Poppins text-[22px] font-semibold">
                    web developer
                  </h5>
                  <h5 className="text-gray-900 font-Poppins text-[18px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, in!
                  </h5>
                </div>
              </div>
              <div className="card text-gray-900 bg-white shadow-md flex gap-3 flex-row px-3 py-1.5 w-fit rounded">
                <div className="icon bg-secondary-100 text-secondary w-20 h-20 flex justify-center align-middle rounded"></div>
                <div className="content flex justify-start align-middle flex-col">
                  <h5 className="text-black font-Poppins text-[22px] font-semibold">
                    web developer
                  </h5>
                  <h5 className="text-gray-900 font-Poppins text-[18px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, in!
                  </h5>
                </div>
              </div>
              <div className="card text-gray-900 bg-white shadow-md flex gap-3 flex-row px-3 py-1.5 w-fit rounded">
                <div className="icon bg-secondary-100 text-secondary w-20 h-20 flex justify-center align-middle rounded"></div>
                <div className="content flex justify-start align-middle flex-col">
                  <h5 className="text-black font-Poppins text-[22px] font-semibold">
                    web developer
                  </h5>
                  <h5 className="text-gray-900 font-Poppins text-[18px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, in!
                  </h5>
                </div>
              </div>
              <div className="card text-gray-900 bg-white shadow-md flex gap-3 flex-row px-3 py-1.5 w-fit rounded">
                <div className="icon bg-secondary-100 text-secondary w-20 h-20 flex justify-center align-middle rounded"></div>
                <div className="content flex justify-start align-middle flex-col">
                  <h5 className="text-black font-Poppins text-[22px] font-semibold">
                    web developer
                  </h5>
                  <p className="text-gray-900 font-Poppins text-[18px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, in!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="products relative overflow-hidden w-full h-[100vh] bg-white">
        <div className="flex justify-center align-middle">
          <div className="container flex flex-col gap-12">
            <div className="flex flex-row h-fit">
              <div className="flex-1 w-full">
                <h2 className="font-Poppins text-[48px] font-bold text-gray-900">
                  Popular <span className="text-primary">Products</span>
                </h2>
              </div>
              <div className="flex-1 flex w-full justify-end align-middle">
                <Link
                  to={"/"}
                  className="font-Poppins h-fit text-[16px] border-2 px-6 py-1.5 rounded-full border-primary text-primary"
                >
                  see more
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {products &&
                products.map((product, index) => {
                  return (
                    <Link to={product.slug}>
                      <div
                        className="card text-gray-900 bg-white shadow-md flex gap-3 flex-col px-3 py-1.5 w-[300px] rounded"
                        key={index}
                      >
                        <img
                          src={product.thumbnail.url}
                          alt={product.thumbnail.alt}
                        />
                        <div className="content flex justify-start align-middle flex-col">
                          <h5
                            className="text-black font-Poppins text-[22px] font-semibold"
                            dangerouslySetInnerHTML={{ __html: product.title }}
                          ></h5>
                          <p
                            className="text-gray-900 font-Poppins text-[18px]"
                            dangerouslySetInnerHTML={{ __html: product.expert }}
                          ></p>
                          <p className="text-[green] text-end font-Poppins text-[18px] font-bold">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: new Intl.NumberFormat().format(
                                  product.price
                                ),
                              }}
                            ></span>{" "}
                            <span
                              className="text-black before:w-full before:absolute before:top-[50%] before:left-0 before:h-[2px] before:bg-black relative before:-rotate-12"
                              dangerouslySetInnerHTML={{
                                __html: new Intl.NumberFormat().format(
                                  product.regular_price
                                ),
                              }}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
