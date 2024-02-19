import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./PrintableTranscript";
import { Button } from "@mui/material";

export default function PrintComponent() {
  const componentRef = useRef<ComponentToPrint>(null);

  return (
    <>
      <div>
        <ReactToPrint
          trigger={() => <Button  variant="contained" color="primary" style={{margin:"50px"}}>Print Transcript</Button>}
          content={() => componentRef.current}
          
        />
        <ComponentToPrint ref={componentRef} />
      </div>
    </>
  );
}
