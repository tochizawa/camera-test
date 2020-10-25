import React from 'react';
import ReactQrReader from 'react-qr-reader';

interface MovesProps {
  onHandleScan: (data: any) => void;
}
export default function QrReader(props: MovesProps) {

  const handleScan = (data: any) => {
    props.onHandleScan(data)
    if (data) {
    }
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  return (
    <>
      <ReactQrReader
        onScan = { handleScan }
        onError = { handleError }
        className = {'qr-reader has-text-centered'}
        delay = { 300 }
        facingMode = { 'environment' }
        style = {{ width: '100%' }}
        showViewFinder = { true }
      />
    </>
  );
}