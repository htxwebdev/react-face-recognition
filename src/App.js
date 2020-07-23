import React, { useState } from 'react';
import './App.scss';

import Particles from 'react-particles-js'
import Signin from './components/Signin'
import Navigation from './components/Navigation'
import Rank from './components/Rank'
import ImageLinkForm from './components/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition'
import Register from './components/Register';

const particleParams = {
  "particles": {
    "number": {
      "value": 50
    },
    "size": {
      "value": 3
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}

function App() {
  const [input, setInput] = useState('');
  const [image, setImage] = useState('');
  const [boxes, setBoxes] = useState({});
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  })
  const [auth, setAuth] = useState({
    route: 'signin',
    isSignedIn: false
  })

  const updateUser = (userInfo) => {
    setUser(userInfo)
  }
  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const calculateFaceBox = (data) => {
    const imageSize = document.getElementById('result');
    const imgWidth = Number(imageSize.width);
    const imgHeight = Number(imageSize.height);
    const allBoxes = data.outputs[0].data.regions;


    const faceBoxes = allBoxes.map(item => {
      const boxInfo = item.region_info.bounding_box;

      return {
        topCord: boxInfo.top_row.toFixed(2) * imgHeight,
        bottomCord: imgHeight - (boxInfo.bottom_row.toFixed(2) * imgHeight),
        leftCord: boxInfo.left_col.toFixed(2) * imgWidth,
        rightCord: imgWidth - (boxInfo.right_col.toFixed(2) * imgWidth)
      }
    })

    return faceBoxes;
  }

  const updateBoxes = (data) => {
    setBoxes(data)
  }

  const onButtonSubmit = () => {
    setImage(input);
    fetch('https://warm-sands-37521.herokuapp.com/imageurl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: input
      })
    })
      .then(response => response.json())
      .then(response => {
        fetch('https://warm-sands-37521.herokuapp.com/image', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            setUser({
              ...user,
              entries: count
            })
          })
          .catch(console.log)
        updateBoxes(calculateFaceBox(response));
      })
      .catch(err => {
        console.log(err);
      });
  }

  const updateRoute = (data) => {
    if (data === 'signout') {
      setInput('');
      setImage('');
      setBoxes('');
    }
    let toggle = (data === 'home') ? true : false;

    setAuth({ route: data, isSignedIn: toggle })
  }

  let mainContent;

  if (auth.route === 'register') {
    mainContent = <Register updateRoute={updateRoute} updateUser={updateUser} />
  } else if (auth.route === 'home') {
    mainContent = (
      <>
        <Rank entries={user.entries} />
        <ImageLinkForm input={input} onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
        <FaceRecognition image={image} boxes={boxes} />
      </>
    )

  } else {
    mainContent = <Signin updateRoute={updateRoute} updateUser={updateUser} />
  }
  return (
    <div className="App">
      <Particles
        params={particleParams} />
      <Navigation isSignedIn={auth.isSignedIn} updateRoute={updateRoute} userName={user.name} />
      {mainContent}
    </div>
  );
}

export default App;
