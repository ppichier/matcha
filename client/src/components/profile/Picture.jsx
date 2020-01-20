import React, { useState } from "react";
import "./Picture.css";
import { Form } from "react-bootstrap";

const Picture = () => {
  const [values, setValues] = useState({
    images: [],
    path: [
      "https://cdn.radiofrance.fr/s3/cruiser-production/2019/04/ae78a4d3-fcd4-46ea-8973-72862c001d6d/838_lelivreimage_18_casa_azul_films-ecran_noir_productions-jpg.webp",
      "https://www.bigstockphoto.com/images/homepage/module-6.jpg"
    ],
    uploading: false
  });
  console.log(values.path[0]);
  const handleChange = event => {
    event.preventDefault();

    // this.setState({ uploading: true })
    const files = Array.from(event.target.files);
    const tmp = { ...values, images: [...values.images, files] };
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, files);
    });

    setValues(tmp);
  };

  const removeImage = id => {
    const image = {
      ...values,
      images: [...values.images, values.images.filter()]
    };
    setValues(image);
  };
  const content = () => {
    switch (true) {
      // case values.uploading:
      //   return (
      //     <div>
      //       <i
      //         className="fa fa-bowling-ball"
      //         style={{ color: "red", size: "50x" }}
      //       ></i>
      //     </div>
      //   );
      case values.images.length > 0:
        return values.path.map((image, i) => (
          <div key={i} className="fadein">
            <div
              onClick={() => removeImage(image.public_id)}
              className="delete"
            >
              <i className="fa fa-times-circle" style={{ size: "2x" }}></i>
            </div>
            <img src={values.path} alt="" />
          </div>
        ));
      default:
        return (
          <div>
            <label htmlFor="single">
              <i
                className="fa fa-image"
                style={{ color: "#3B5998", size: "10px" }}
              ></i>
            </label>
            <input type="file" id="single" onChange={handleChange} />
          </div>
        );
    }
  };
  return <div>{content()}</div>;
};

export default Picture;
