// import { c } from "tar";

export function checkForActiveMaterial(activeMaterialList, activeMaterial) {
  if (
    zilver.includes(activeMaterial) &&
    activeMaterialList.includes("zilver")
  ) {
    return true;
  } else if (
    geelgoud.includes(activeMaterial) &&
    activeMaterialList.includes("geelgoud")
  ) {
    return true;
  } else if (
    rosegoud.includes(activeMaterial) &&
    activeMaterialList.includes("rosegoud")
  ) {
    return true;
  }
  return false;
}

export function calculatePrice(selectedOptions, optionSets) {
  let totalPrice = 0;
  for (let i = 0; i < selectedOptions.length; i++) {
    const optionKey = selectedOptions[i].key + "Options";
    const currentOptionSet = findOptionSet(optionSets, optionKey);

    const selectedTargetValue = selectedOptions[i].value;

    if (optionKey === "positieOptions") {
      for (let i = 0; i < selectedTargetValue.length; i++) {
        if (selectedTargetValue[i].key === "gravureLinks") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "gravure", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "gravureMidden") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "gravure", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "gravureRechts") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "gravure", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "gravureAchter") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "gravure", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "extraWoordLinks") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "extraWoorden", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "extraWoordMidden") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(
            optionSets,
            "extraWoordenOptions",
            value
          );
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "extraWoordRechts") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(
            optionSets,
            "extraWoordenOptions",
            value
          );
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "extraWoordAchter") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(
            optionSets,
            "extraWoordenOptions",
            value
          );
          totalPrice += price || 0;
        }
      }
    }

    // To do print
    console.log("optionKey");
    console.log(optionKey);

    if (optionKey === "printOptions") {
      console.log("printOptions");
      console.log(selectedTargetValue);
      for (let i = 0; i < selectedTargetValue.length; i++) {
        if (selectedTargetValue[i].key === "keuze2") {
          if (selectedTargetValue[i].value == "Ja") {
            totalPrice += 99.0;
          }
        }
        if (selectedTargetValue[i].key === "keuze3") {
          if (selectedTargetValue[i].value == "Bestand 2") {
            totalPrice += 99.0;
          }
        }
      }
      // const price = findPriceByValue(optionSets, "extraWoordenOptions", value);
      // totalPrice += price || 0;
    }

    if (typeof selectedTargetValue == "string") {
      if (!currentOptionSet) return;
      const selectedOptionSet = currentOptionSet.find(
        (option) => option.value === selectedTargetValue
      );
      totalPrice += selectedOptionSet.price || 0;
    } else {
      selectedTargetValue?.forEach((selectedTarget) => {
        if (selectedTarget.key === "extraWoord") {
          if (selectedTarget.value == "1 extra woord") {
            totalPrice += 14.95;
          } else if (selectedTarget.value == "2 extra woorden") {
            totalPrice += 19.95;
          }
        }
        const price = findPriceByValue(
          optionSets,
          selectedTarget.key,
          selectedTarget.value
        );
        totalPrice += price || 0;
      });
    }
  }
  return totalPrice;
}

export function findOptionSet(optionSets, optionSetKey) {
  return optionSets[optionSetKey] || null;
}

export function findPriceByValue(optionSets, targetKey, targetValue) {
  const optionSet = optionSets[targetKey + "Options"];

  if (optionSet && Array.isArray(optionSet)) {
    const foundOption = optionSet.find(
      (option) => option.value === targetValue
    );

    if (foundOption && typeof foundOption.price !== "undefined") {
      return foundOption.price;
    }
  }

  return null;
}
