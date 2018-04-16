const defaultResponse = {
  httpError: {
    str: 'Something went wrong.'
  }
}

const generateResponse = (status, errorCode, str) => {
  return {success: status, extras: {errorCode: errorCode, message: str}}
}

export { defaultResponse, generateResponse }
