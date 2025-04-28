  // const getChangedValues = (
  //   initialValues: ProductFormValues,
  //   currentValues: ProductFormValues
  // ) => {
  //   const changedValues: Partial<ProductFormValues> = {};

  //   Object.entries(currentValues).forEach(([key, value]) => {
  //     const initialValue = initialValues[key as keyof ProductFormValues];

  //     // Handle arrays (tags)
  //     if (Array.isArray(value) && Array.isArray(initialValue)) {
  //       if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
  //         changedValues[key as keyof ProductFormValues] = value as any;
  //       }
  //     }
  //     // Handle File objects
  //     else if (
  //       (value && typeof value === "object" && "name" in value) ||
  //       (initialValue &&
  //         typeof initialValue === "object" &&
  //         "name" in initialValue)
  //     ) {
  //       if (value !== initialValue) {
  //         changedValues[key as keyof ProductFormValues] = value as any;
  //       }
  //     }
  //     // Handle strings and booleans
  //     else if (value !== initialValue) {
  //       // Only include if not empty string and not undefined
  //       if (value !== "" && value !== undefined) {
  //         changedValues[key as keyof ProductFormValues] = value as any;
  //       }
  //     }
  //   });

  //   return changedValues;
  // };

  export const getChangedValues = <T extends Record<string, any>>(
    initialValues: T,
    currentValues: T
  ): Partial<T> => {
    const changedValues: Partial<T> = {};
  
    Object.entries(currentValues).forEach(([key, value]) => {
      const initialValue = initialValues[key as keyof T];
  
      // Handle arrays (e.g., tags)
      if (Array.isArray(value) && Array.isArray(initialValue)) {
        if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
          changedValues[key as keyof T] = value as any;
        }
      }
      // Handle File objects
      else if (
        (value && typeof value === "object" && "name" in value) ||
        (initialValue && typeof initialValue === "object" && "name" in initialValue)
      ) {
        if (value !== initialValue) {
          changedValues[key as keyof T] = value;
        }
      }
      // Handle primitive differences (string, boolean, number, etc.)
      else if (value !== initialValue) {
        if (value !== "" && value !== undefined) {
          changedValues[key as keyof T] = value;
        }
      }
    });
  
    return changedValues;
  };
  