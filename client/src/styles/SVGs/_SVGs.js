import React from "react";
import axios from "axios";

import { togglePopupEdit, addEditingCatId } from "../../features/users";

import { addRooms } from "../../features/users";
import { useDispatch, useSelector } from "react-redux";

// import CamOff from './videoOff.svg';
// import FullScreen0 from './fullScreen.svg';

const changeMode = (mediaData, setMediaData, button) => {
  // "data" should be immutable (send a new array each time)
  let data = { audio: mediaData.audio, video: mediaData.video };

  if (button === "video") data.video = !mediaData.video;
  else if (button === "audio") data.audio = !mediaData.audio;

  setMediaData(data);
};

const EditSVG = ({ id }) => {
  const editCat = (e) => {
    e.preventDefault();
    dispatch(addEditingCatId({ id: id }));
    // Todo: !!!!! set redux editingCatId as id
    dispatch(togglePopupEdit());
    console.log("id:", reduxData.editingCatId);
    // add code so it toggle active
    // setElementId(id);
  };
  const reduxData = useSelector((state) => state.users.value);
  const dispatch = useDispatch();

  return (
    <svg
      onClick={(event) => editCat(event)}
      height="20px"
      viewBox="0 0 24 24"
      width="20px"
      fill="#fff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
};

const TrashSVG = ({ id }) => {
  const trash = (e) => {
    e.preventDefault();

    axios
      .post("/api/deleteCategory", { deleteId: id })
      .then((res) => {
        if (res.data.status === "deleted") {
          //console.log("deleted successfully");
          console.log("id:", id);
          let newj = [];
          let newJson = reduxData.rooms.map((cat) => {
            if (cat._id !== id) newj.push(cat);
          });

          dispatch(addRooms({ rooms: newj }));
        }
      })
      .catch((err) => console.error(err));
  };
  const reduxData = useSelector((state) => state.users.value);
  const dispatch = useDispatch();

  return (
    <svg
      onClick={(event) => trash(event)}
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#fff"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
};

const MicSVGOff = ({ mediaData, setMediaData }) => (
  <svg
    className="svg micoff"
    onClick={() => changeMode(mediaData, setMediaData, "audio")}
    aria-hidden="false"
    viewBox="0 0 24 24"
  >
    <path
      d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z"
      fill="currentColor"
    ></path>
    <path
      d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z"
      fill="currentColor"
    ></path>
    <path
      d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z"
      fill="currentColor"
    ></path>
    <path
      d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z"
      class="strikethrough-2Kl6HF"
      fill="currentColor"
    ></path>
  </svg>
);
const MicSVGOn = ({ mediaData, setMediaData }) => (
  <svg
    className="svg micon"
    onClick={() => changeMode(mediaData, setMediaData, "audio")}
    aria-hidden="false"
    viewBox="0 0 24 24"
  >
    <path
      d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V21H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1ZM12 4C11.2 4 11 4.66667 11 5V11C11 11.3333 11.2 12 12 12C12.8 12 13 11.3333 13 11V5C13 4.66667 12.8 4 12 4Z"
      fill="currentColor"
    ></path>
    <path
      d="M14.99 11C14.99 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5L14.99 11ZM12 16.1C14.76 16.1 17.3 14 17.3 11H19C19 14.42 16.28 17.24 13 17.72V22H11V17.72C7.72 17.23 5 14.41 5 11H6.7C6.7 14 9.24 16.1 12 16.1Z"
      fill="currentColor"
    ></path>
  </svg>
);

// const CamSVGOff0 = ({ mediaData, setMediaData }) => (
//   <img
//     className="svg camoff"
//     onClick={() => changeMode(mediaData, setMediaData, "video")}
//     src={require("./camOff.svg")}
//   />
// );
const CamSVGOn = ({ mediaData, setMediaData }) => (
  <svg
    className="svg camon"
    onClick={() => changeMode(mediaData, setMediaData, "video")}
    aria-hidden="false"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M21.526 8.149C21.231 7.966 20.862 7.951 20.553 8.105L18 9.382V7C18 5.897 17.103 5 16 5H4C2.897 5 2 5.897 2 7V17C2 18.104 2.897 19 4 19H16C17.103 19 18 18.104 18 17V14.618L20.553 15.894C20.694 15.965 20.847 16 21 16C21.183 16 21.365 15.949 21.526 15.851C21.82 15.668 22 15.347 22 15V9C22 8.653 21.82 8.332 21.526 8.149Z"
    ></path>
  </svg>
);
const CamSVGOff = ({ mediaData, setMediaData }) => (
  <svg
    className="svg camoff"
    onClick={() => changeMode(mediaData, setMediaData, "video")}
    width="40"
    height="41"
    viewBox="0 0 40 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.6903 18.7789L0.399902 37.1473L1.7095 38.4625L3.0103 39.7689L7.2579 35.5032L11.4963 31.2467L18.8495 31.2202L26.1939 31.1937L26.6719 30.998C27.8223 30.5272 28.6539 29.6652 28.9815 28.5986C29.1319 28.1009 29.1583 27.7723 29.1583 26.288C29.1583 24.9371 29.1847 24.5639 29.2735 24.5997C29.3267 24.6173 30.6983 25.1327 32.2999 25.7373C35.4323 26.9103 35.7599 26.9902 36.2111 26.6528C36.7419 26.2531 36.7243 26.5194 36.7243 19.8636C36.7243 13.9006 36.7243 13.7673 36.5475 13.4652C36.3175 13.0743 35.8483 12.8164 35.4591 12.8787C35.3087 12.9052 33.8399 13.4206 32.2115 14.034C30.5831 14.647 29.2295 15.1536 29.2031 15.1536C29.1767 15.1536 29.1587 14.7804 29.1587 14.3361V13.5094L34.3795 8.2663L39.5999 3.02324L38.2903 1.70805L36.9895 0.401707L18.6903 18.7789Z"
      fill="#CFD9E4"
    />
    <path
      d="M9.80625 8.58606C8.74425 8.71943 7.60305 9.50155 7.09865 10.4166C6.58545 11.3675 6.59425 11.2875 6.59425 18.7078V25.5059L15.0002 17.0641C19.6282 12.4252 23.4066 8.5953 23.4066 8.55955C23.4066 8.46193 10.505 8.48845 9.80625 8.58606Z"
      fill="#CFD9E4"
    />
  </svg>
);

const ScreenShareOff = ({ mediaData, setMediaData }) => <></>;
const ScreenShareOn = ({ mediaData, setMediaData }) => (
  <svg
    className="svg screenon"
    onClick={() => changeMode(mediaData, setMediaData, "screen")}
    viewBox="0 0 24 24"
  >
    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.11-.9-2-2-2H4c-1.11 0-2 .89-2 2v10c0 1.1.89 2 2 2H0v2h24v-2h-4zM4 16V6h16v10.01L4 16zm9-6.87c-3.89.54-5.44 3.2-6 5.87 1.39-1.87 3.22-2.72 6-2.72v2.19l4-3.74L13 7v2.13z" />
  </svg>
);

// const FullScreen = () => <img className="svg fullscreen" onClick={() => changeMode()} src={require('./fullScreen.svg')} /> // <FullScreen0 />

export {
  EditSVG,
  TrashSVG,
  MicSVGOff,
  MicSVGOn,
  CamSVGOff,
  CamSVGOn,
  ScreenShareOff,
  ScreenShareOn,
  // FullScreen
};
