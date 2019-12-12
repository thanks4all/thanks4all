import * as React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../static/7885-codey-riding-a-rocket.json';
import * as heart1 from '../../static/322-favorite.json';
import * as heart2 from '../../static/67-exploding-heart.json';
import { get } from 'lodash';
import Typist from 'react-typist';
import './styles/App.css';


export const App: React.FC = () => {

  const [animationState, setAnimationState] = React.useState({ rocketEngineStatus: "flying", hideBody: false, showHeart: "1", isLottieStopped: false })
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: get(animationData, "default"),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const heart_1 = {
    loop: false,
    autoplay: true,
    animationData: get(heart1, "default"),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const heart_2 = {
    loop: false,
    autoplay: true,
    animationData: get(heart2, "default"),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const endTypingAnimation = (engineStatus: string) => {
    setAnimationState({ ...animationState, rocketEngineStatus: engineStatus })
  }

  const getRocketAnimation = () => {
    if (animationState.rocketEngineStatus === "flying") {
      return "rocket-animation-in";
    } else if (animationState.rocketEngineStatus === "readyForDeparture") {
      return "rocket-animation-out";
    }
    return "rocket-animation-vibrate";
  }

  const getContainerAnimation = () => {
    if (animationState.rocketEngineStatus === "readyForDeparture") {
      return "container-out";
    }
    return "container-in"
  }


  const getTypingsAnimation = () => {
    if (animationState.rocketEngineStatus === "readyForDeparture") {
      return "typings-container-out";
    }
    return "typings-container-in"
  }

  const onEndTypingsAnimation = () => {
    setAnimationState({ ...animationState, hideBody: true })
  }

  const onSwitchHeart = () => {
    if (animationState.showHeart === "2") {
      setAnimationState({ ...animationState, isLottieStopped: true })
    } else {
      setAnimationState({ ...animationState, showHeart: "2" })
    }
  }

  const heart = animationState.showHeart === "1" ? heart_1 : heart_2;

  return (
    <div id="container" className={getContainerAnimation()}>
      {!animationState.hideBody ? (
        <div id="greetings-container">
          <div id="rocket" className={getRocketAnimation()}>
            <Lottie options={defaultOptions}
              isClickToPauseDisabled={true}
              height={437}
              width={364}
            />
          </div>
          <div onAnimationEnd={() => { onEndTypingsAnimation() }} className={getTypingsAnimation()}>
            <div id="title-typings" className="title-typings">
              <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }} onTypingDone={() => endTypingAnimation("intoTheSky")}>
                <span> THANKS TO EVERYONE </span>
              </Typist>
            </div>
            <div id="subtitle-typings" className="subtitle-typings" >
              <Typist onTypingDone={() => endTypingAnimation("readyForDeparture")}>
                <Typist.Delay ms={2000} />
                <span> Per avermi aiutato </span>
                <Typist.Backspace count={20} delay={300} />
                <span> Per aver riso con me </span>
                <Typist.Backspace count={22} delay={300} />
                <span> Perchè senza voi non sarebbe stato lo stesso </span>
                <Typist.Delay ms={100} />
              </Typist>
            </div>
          </div></div>) : (
          <div id="heart-container">
            <div>
              {!animationState.isLottieStopped ? <Lottie options={heart}
                height={437}
                width={364}
                isClickToPauseDisabled={true}
                isStopped={animationState.isLottieStopped}
                eventListeners={[
                  {
                    eventName: 'complete',
                    callback: () => {
                      console.log("lottie complete")
                      onSwitchHeart()
                    },
                  },
                ]}
              /> : (
                  <Typist className="title-typings" cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>
                    <span> I'm free now! </span>
                  </Typist>)}
            </div>

          </div>)}
    </div>
  );
}

