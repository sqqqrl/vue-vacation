// class BaseDAO {
//   static query () {
//     return super.query.apply(this, arguments).onError(error => {
//       return Promise.reject(wrapError(error))
//         .catch(error => {
//           error = error.nativeError || error

//           if (error instanceof UniqueViolationError) {
//             throw new AppError({
//               ...errorCodes.DB_DUPLICATE_CONFLICT,
//               message: `Column '${error.columns}' duplicate in '${error.table}' table`,
//               layer: 'DAO'
//             })
//           }

//           if (error instanceof NotNullViolationError) {
//             throw new AppError({
//               ...errorCodes.DB_NOTNULL_CONFLICT,
//               message: `Not null conflict failed for table '${error.table}' and column '${error.column}'`,
//               layer: 'DAO'
//             })
//           }

//           throw new AppError({ ...errorCodes.DB, message: error.message, layer: 'DAO' })
//         })
//     })
//   }
// }

// module.exports = { BaseDAO }