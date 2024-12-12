// import { useState } from 'react';

// const useOperation = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const performOperation = async (operationFunc, ...args) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await operationFunc(...args);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, error, performOperation };
// };

// export default useOperation;