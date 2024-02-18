import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./PrintableTranscript";

export default function PrintComponent() {
  const componentRef = useRef<ComponentToPrint>(null);

  return (
    <>
      <div>
        {/* Button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button style={{margin:"50px"}}>Print this out!</button>}
          content={() => componentRef.current}
          
        />
        {/* Component to be printed */}
        <ComponentToPrint ref={componentRef} />
      </div>
    </>
  );
}
