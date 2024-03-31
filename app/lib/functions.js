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
        if (selectedTargetValue[i].key === "GravureLinks") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "Gravure", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "GravureMidden") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "Gravure", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "GravureRechts") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "Gravure", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "GravureAchter") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "Gravure", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "ExtraWoordLinks") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(optionSets, "ExtraWoorden", value);
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "ExtraWoordMidden") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(
            optionSets,
            "extraWoordenOptions",
            value
          );
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "ExtraWoordRechts") {
          const value = selectedTargetValue[i].value;
          const price = findPriceByValue(
            optionSets,
            "extraWoordenOptions",
            value
          );
          totalPrice += price || 0;
        } else if (selectedTargetValue[i].key === "ExtraWoordAchter") {
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

    if (optionKey === "printOptions") {
      for (let i = 0; i < selectedTargetValue.length; i++) {
        if (selectedTargetValue[i].key === "Keuze2") {
          if (selectedTargetValue[i].value == "Ja") {
            totalPrice += 99.0;
          }
        }
        if (selectedTargetValue[i].key === "Keuze3") {
          if (selectedTargetValue[i].value == "Bestand 2") {
            totalPrice += 99.0;
          }
        }
      }
    }

    if (typeof selectedTargetValue == "string") {
      if (!currentOptionSet) return;
      const selectedOptionSet = currentOptionSet.find(
        (option) => option.value === selectedTargetValue
      );
      totalPrice += selectedOptionSet.price || 0;
    } else {
      selectedTargetValue?.forEach((selectedTarget) => {
        if (selectedTarget.key === "ExtraWoord") {
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
