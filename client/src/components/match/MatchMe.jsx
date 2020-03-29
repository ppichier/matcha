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
    activateFilter : false
    
  });

  const [moreProfiles, setMoreProfiles] = useState([0, 20]);

  const [moreParams, setMoreParams] = useState ({
    age: [],
    userSize: [],
    location: [],
    score: [],
    selectedTags: [],
  });

  useEffect(() => {
    firstFilter(moreProfiles)
      .then(data => {
        setValues({ ...values, profiles: data.profiles, resultsNumber: data.resultsNumber });
      })
      .catch(err => console.log(err));  
  }, []);

  const setFirstFilter = (event, moreProfiles) => {
     if (event) 
      event.preventDefault();
    firstFilter(moreProfiles)
      .then(data => {
          let profiles = values.profiles;
          profiles = profiles.concat(data.profiles);
          setValues({ ...values, profiles: _.uniqBy(profiles, 'pseudo'),  resultsNumber: data.resultsNumber});
      })
      .catch(err => console.log(err));
  }

  const setFilterParams = (event, filterParams, moreProfiles) => {
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
        if (moreProfiles[0] === 0)
          {
            setValues({ ...values, 
              profiles: data.profiles, 
              resultsNumber: data.resultsNumber, 
              activateFilter: true
            });
            setMoreProfiles(moreProfiles);
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
          let profiles = values.profiles;
          profiles = profiles.concat(data.profiles);
          setValues({ ...values, profiles: _.uniqBy(profiles, 'pseudo'),  resultsNumber: data.resultsNumber});
        }
      })
      .catch(err => console.log(err));
  };

  const setSortParams = sortParams => (event) =>{
    const profiles = _.orderBy(values.profiles, [sortParams.name], [sortParams.order]);
    setValues({ ...values, profiles});
  }

  const onMoreProfiles = (event) => {
    let moreProfilesTmp = moreProfiles.map(x => x + 20)
    setMoreProfiles(moreProfilesTmp);
    if (values.activateFilter === true )
        setFilterParams(event, moreParams, moreProfilesTmp);
    else
        setFirstFilter(event, moreProfilesTmp);
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
  
  const loadProfiles = () => {
   if (values.resultsNumber > 0 && (values.resultsNumber > moreProfiles[1]))  
      return(
        <div style={{ display: "flex", width: "50%" }}>
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
      )
    else
      return(<Fragment></Fragment>)
  }

  const card = () => {
    return values.profiles.map((profile, i) => {
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
              setFilterParams={(filterParams) => setFilterParams(null, filterParams, [0, 20])}
            />
          </Col>
          <Col>
            <Row style={{ justifyContent: "center" }}>{card()}</Row>
            <div> {loadProfiles()} </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default MatchMe;

