import React, { useState, useRef, useCallback, useEffect } from "react";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { FaMapMarkerAlt } from "react-icons/fa";

import "../../../tailwind.css";

const MapsContent = () => {
  const [showPopup, setShowPopup] = useState({});
  const [viewport, SetViewport] = useState({
    latitude: 14.5995,
    longitude: 120.9842,

    zoom: 10,
  });

  const mapRef = useRef();

  const [json, setjson] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_NOCODE_API, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await response.json();
        setjson(res);
        console.log(res);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="py-4 h-screen col-span-3 overflow-auto">
      <div className="h-screen p-4">
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          width="100%"
          height="100%"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/urescueme/ckjoia2tu0w5219ry1cns1a7e"
          onViewportChange={viewport => {
            SetViewport(viewport);
          }}
        >
          {json &&
            json.data.map(data => (
              <React.Fragment key={data.row_id}>
                <Marker
                  latitude={parseFloat(data.Lat)}
                  longitude={parseFloat(data.Lng)}
                  offsetLeft={-10}
                  offsetTop={-5}
                >
                  <div
                    onClick={() =>
                      setShowPopup({
                        [data.row_id]: true,
                      })
                    }
                  >
                    {/* <FaMapMarkerAlt
                      className="text-2xl text-red-600 border-solid border-2 border-white "
                    
                    /> */}
                    <svg
                      fill="red"
                      stroke="white"
                      stroke-width="1"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg%22%3E<"
                      style={{
                        height: `${3 * viewport.zoom}px`,
                        width: `${3 * viewport.zoom}px`,
                      }}
                    >
                      <g>
                        <path
                          fill-rule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clip-rule="evenodd"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </Marker>

                {showPopup[data.row_id] ? (
                  <Popup
                    latitude={parseFloat(data.Lat)}
                    longitude={parseFloat(data.Lng)}
                    closeButton={true}
                    closeOnClick={false}
                    dynamicPosition={true}
                    className="z-10"
                    onClose={() => setShowPopup(false)}
                    anchor="top"
                  >
                    <div className="popup">
                      <p>
                        Name : <strong>{data.Names}</strong>
                      </p>
                      <p>
                        Address : <strong>{data.Address}</strong>
                      </p>
                      <p>
                        Remarks :<strong>{data.Remarks}</strong>{" "}
                      </p>
                    </div>
                  </Popup>
                ) : null}
              </React.Fragment>
            ))}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default MapsContent;
