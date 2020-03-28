import React, { useState, useEffect, Fragment} from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import CardPicture from "./CardPicture";
import "./CardPicture.css";
import NavbarHeader from "../navbar/Navbar";
import FilterProfile from "./FilterProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "rc-slider/assets/index.css";
import "./MatchMe.css";
import SortProfile from "./SortProfile";
import { firstFilter, heartClick, filterProfile } from "../../api";
import _ from 'lodash';

// one fetch for list of profiles
// x fetch for x imagess

const MatchMe = () => {
  const [values, setValues] = useState({
    image: [],
    uploading: false,
    profiles: [],
    resultsNumber: 0,
    moreProfiles: [0, 20],
    tmp: -1,
    activateFilter : false
    
  });
  const [moreParams, setMoreParams] = useState ({
    age: [],
    userSize: [],
    location: [],
    score: [],
    selectedTags: [],
  });

  useEffect(() => {
    firstFilter()
      .then(data => {
        setValues({ ...values, profiles: data.profiles, resultsNumber: data.resultsNumber });
      })
      .catch(err => console.log(err));
   
  }, []);

  const setFilterParams = (event, filterParams, moreProfiles) => {
    console.log(filterParams)
  if (event) 
    event.preventDefault();
      filterProfile({
        age: filterParams.age,
        userSize: filterParams.userSize,
        location: filterParams.location,
        score: filterParams.score,
        selectedTags: filterParams.selectedTags,
        moreProfiles: moreProfiles
      })
       .then(data => {  
       console.log(values.activateFilter)  
        if (values.activateFilter === false)
          {
            setValues({ ...values, 
              profiles: data.profiles, 
              resultsNumber: data.resultsNumber, 
              tmp: 0,
              activateFilter: true
            });

            setMoreParams({...moreParams,
              age: filterParams.age,
              userSize: filterParams.userSize,
              location: filterParams.location,
              score: filterParams.score,
              selectedTags: filterParams.selectedTags,
            });
          }
        else
        {
          console.log("je suis pas la ")
          let profiles = values.profiles;
          profiles = profiles.concat(data.profiles);
          setValues({ ...values, profiles: profiles,  resultsNumber: data.resultsNumber});
        }
      })
      .catch(err => console.log(err));
  };

  const setSortParams = sortParams => (event) =>{
    const profiles = _.orderBy(values.profiles, [sortParams.name], [sortParams.order]);
    setValues({ ...values, profiles});
  }

  const onMoreProfiles = (event) => {
    let moreProfiles = values.moreProfiles.map(x => x + 20)
    setValues({ ...values, moreProfiles});
    if (values.activateFilter === true )
    {
        setFilterParams(event, moreParams, moreProfiles);
    }
  };

  const onHeartClick = i => {
    let userLiked = {
      userUuid: "",
      isLiked: 0
    };
    let newProfiles = values.profiles.map((profile, j) => {
      if (i === j) {
        profile.isLiked = !profile.isLiked;
        userLiked.userUuid = profile.userUuid;
        userLiked.isLiked = profile.isLiked;
        return profile;
      } else return profile;
    });
    heartClick(userLiked).then(() => {
      setValues({ ...values, profiles: newProfiles });
    });
  };
  

  const chargeButton = () => {
    let tmp = 0;
    let a = null;
    if (values.resultsNumber > 0)
    {   
      if( (values.moreProfiles[1] !== values.tmp) &&  (values.resultsNumber > values.moreProfiles[1]))
      {
        if (values.tmp !== -1) tmp = values.moreProfiles[1]
         a = <div style={{ display: "flex", width: "50%" }}>
                    <Button
                      onClick={e => onMoreProfiles(e)}
                      className="text-uppercase mb-4 center-block"
                      variant="outline-info"
                      style={{ letterSpacing: "1px", fontWeight: "bold" }}
                    >
                  {values.tmp}
                  Charger plus
                  </Button>
              </div>
        }
        else if( (values.moreProfiles[1] === values.tmp) && (values.resultsNumber > (values.tmp + 20)))
        {
          tmp = (values.tmp + 20);
          a =  <div style={{ display: "flex", width: "50%" }}>
                <Button
                      onClick={e => onMoreProfiles(e)}
                      className="text-uppercase mb-4 center-block"
                      variant="outline-info"
                      style={{ letterSpacing: "1px", fontWeight: "bold" }}
                    >
                    {values.resultsNumber}
                    Charger plus
                </Button>
                </div>
      }
      setValues({...values, tmp : tmp})
    }    
    return (a);
  }

  const card = () => {
    return values.profiles.map((profile, i) => {
          {console.log(values.profiles)}
        {console.log(values.profiles.length)}
      return (
        <div className="styleCard py-3 px-3 mx-3 my-3" key={i}>
          <CardPicture
            firstName={profile.firstName}
            pseudo={profile.pseudo}
            age={profile.age}
            score={profile.score}
            userUuid={profile.userUuid} //change dynamic in URL
            distance={profile.distance}
          />
          <div className="heart-container mb-2 mr-2">
            <Button
              variant={profile.isLiked ? "danger" : "outline-secondary"}
              onClick={() => onHeartClick(i)}
              style={{
                border: "2px solid",
                borderRadius: "50%",
                width: "50px",
                height: "50px"
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </Button>
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <NavbarHeader />
      <Container fluid className="mt-3" style={{ color: "#545454" }}>
        <Row>
          <Col md={3}>
            <SortProfile
              setSortParams={sortParams => setSortParams(sortParams)}
             />
            <FilterProfile
              setFilterParams={(filterParams) => setFilterParams(null, filterParams, values.moreProfiles)}
            />
          </Col>
          <Col>
            <Row style={{ justifyContent: "center" }}>{card()}</Row>
            <div> {chargeButton()} </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default MatchMe;

