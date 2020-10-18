import React from "react";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";

/**
 * Custom tooltip for the Expenditure Chart, so far only adds a unit to all entrys.
 * @param {*} props 
 */
const ExpenditureTooltip = (props) => {
  // we don't need to check payload[0] as there's a better prop for this purpose
  if (!props.active) {
    // I think returning null works based on this: http://recharts.org/en-US/examples/CustomContentOfTooltip
    return null;
  }
  // mutating props directly is against react's conventions
  // so we create a new payload with the name and value fields set to what we want

  let newPayload = [];
  Object.keys(props.payload[0].payload).forEach(function (key) {
    if (key !== "Monat") {
      newPayload.push({
        name: key,
        value: props.payload[0].payload[key],
        unit: "€",
      });
    }
  });

  // we render the default, but with our overridden payload
  return <DefaultTooltipContent {...props} payload={newPayload} />;
};

export default ExpenditureTooltip;
