export const validateAddress = (address) => {
    const errors = {};
    
    if (!address.trim()) {
      errors.required = 'Shipping address is required';
    } else if (address.length < 10) {
      errors.length = 'Address must be at least 10 characters long';
    } else if (!/\d/.test(address)) {
      errors.number = 'Address should include a house/building number';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };