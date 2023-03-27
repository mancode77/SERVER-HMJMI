const responseSuccess = (res, data) => {
  const STATUS_CODE = 200;

  let responseData = [];

  if (data && typeof data[Symbol.iterator] === "function") {
    responseData = [...data];
  }else{
    responseData = data
  }

  res.status(STATUS_CODE).json({
    took: STATUS_CODE,
    status: "OK",
    data: responseData,  
    dataLength: data.length,
    error: null,
  });
};

export default responseSuccess;
