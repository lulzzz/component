export const setPropValue = (elem: any, name: string, value: any): void => {
    if (!elem._values) {
        elem._values = {};
    }

    elem._values[name] = value;
};

export const getPropValue = (elem: any, name: string): any => {
    if (!elem._values) {
        elem._values = {};
    }

    if (!elem._values.hasOwnProperty(name)) {
        return;
    } else {
        return elem._values[name];
    }
};

export const runObserver = (
    elem: any,
    name: string,
    oldValue: any,
    newValue: any
): void => {
    // Run observer if it exists for a property key and only if the value has changed.
    if (
        elem.constructor._observedValues &&
        elem.constructor._observedValues[name] &&
        oldValue !== newValue
    ) {
        elem[elem.constructor._observedValues[name]](oldValue, newValue);
    }
};

export const registerObserver = (
    elem: any,
    property: string,
    name: string
): void => {
    if (!elem.constructor._observedValues) {
        elem.constructor._observedValues = {
            [property]: name
        };
    } else {
        elem.constructor._observedValues[property] = name;
    }
};

export const registerAttribute = (elem: any, attribute: string): void => {
    if (!elem.constructor._observedAttributes) {
        elem.constructor._observedAttributes = [attribute];
      } else {
        elem.constructor._observedAttributes.push(attribute);
    }
}

export const setPropertyAsAttribute = (elem: any, attribute: string, value: any) => {
    // Set attribute as present with no value if true.
    if (typeof value === 'boolean') {
        if (!value) {
            elem.removeAttribute(attribute);
        } else {
          if (!elem.hasAttribute(attribute)) {
            elem.setAttribute(attribute, '');
          }
        }
      }
      // Set attribute value if content is primitive, but not boolean.
      if (typeof value !== 'object' && typeof value !== 'boolean') {
        elem.setAttribute(attribute, value);
      }
}
