import React, { useState, useEffect } from 'react';


interface GeofenceProps {
  onHandleScan: () => void
}
interface geoIF {
  latitude: number,
  longitude: number,
}

export default function Geofence(props: GeofenceProps) {

  const [isShowModal, setIsShowModal] = useState<boolean>();
  const [geoObject, setGeoObject] = useState<geoIF>();

  const markers = [
    {
      title: "my location1",
      coordinates: {
        latitude: 36.6868231,
        longitude: 137.2158873,
      },
    },
    {
      title: "my location 2",
      coordinates: {
        latitude: 34.599912,
        longitude: 44.1147557,
      },
    },
    {
      title: "my location 3",
      coordinates: {
        latitude: 54.599912,
        longitude: 64.1147557,
      },
    },
  ];

  function handleFaceScan() {
    props.onHandleScan()
  }
  function geo() {
    setGeoObject({ latitude: 0, longitude: 0 })
  }

  useEffect(() => {
    setIsShowModal(false)
  }, [])

  return (
    <>
    <div className="has-text-centered mt-6">
      <button className="button is-large" onClick={() => { geo() }}>位置取得</button>
    </div>
      <div className={`modal ${isShowModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">位置情報</p>
            <button className="delete" aria-label="close" onClick={() => { setIsShowModal(false) }}></button>
          </header>
          <section className="modal-card-body">
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" hidden={!isShowModal} onClick={() => handleFaceScan()}>顔認証へ</button>
            <button className="button" onClick={() => { setIsShowModal(false) }}>Cancel</button>
          </footer>
        </div>
      </div>
    </>
  );
}