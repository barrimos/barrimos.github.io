import js
from js import document, getConfigResult, logError, arrayMethodButton, sessionStorage
from pyodide.ffi import create_proxy
import sys
import ast
sys.path.append("../../src/scripts")
import matrix

def getDataCell(id):
  return sessionStorage.getItem(id)

def callMethod(e):
  id, method, constantValue = sessionStorage.getItem("method").split("-")
  mId = ast.literal_eval(id)
  method = ast.literal_eval(method)
  constantValue = ast.literal_eval(constantValue)
  matrixData = []
  res = None

  if method[0] in ["swap", "increase", "decrease", "switch", "clear"]:
    # # Just swap it already done in javascript so don"t have to do anything here
    return
  
  # Array matrix data
  if len(mId) == 2:
    try:
      matrixData.append(ast.literal_eval(getDataCell(mId[0])))
      matrixData.append(ast.literal_eval(getDataCell(mId[1])))
    except ValueError:
      logError('This operation requires two matrices.')
    
  if len(mId) == 1:
    try:
      matrixData.append(ast.literal_eval(getDataCell(mId[0])))
    except ValueError:
      logError('The matrix entered the wrong type or was empty.')

  # # method[0] is method name
  # # method[1] is specific value USE FOR MINOR_COFACTOR ADDPADDING CONVOLUTION method
  # # Method that from sessionStorage is string then getattr() to get function from other module with using string name set to be callback

  # # matrix A operation with matrix B or with itself
  if len(matrixData) == 2:
    # # Take two matrices
    if method[0] == "multiply":
      """
      multiply(matrixData[0], matrixData[1])
      """
      callbackMethod = getattr(matrix, method[0])

      # # call method with send parameter
      res = callbackMethod(matrixData[0], matrixData[1])

    elif method[0] == "plus_minus":
      """
      plus_minus(matrixData[0], matrixData[1], constantValue[0])
      """
      callbackMethod = getattr(matrix, method[0])

      # # call method with send parameter
      res = callbackMethod(matrixData[0], matrixData[1], constantValue[0])

    elif method[0] == "convolution":
      """
      convolution(matrixData[0], matrixData[1], edge = False)
      """
      callbackMethod = getattr(matrix, method[0])

      # # call method with send parameter
      res = callbackMethod(matrixData[0], matrixData[1], edge = True if constantValue[0] == 'True' else False)

  elif len(matrixData) == 1:
    if method[0] == "addPadding":
      """
      addPadding(matrixData[0], padding = 0)
      """
      callbackMethod = getattr(matrix, method[0])

      # # call method with send parameter
      res = callbackMethod(matrixData[0], constantValue[0])
  
    elif method[0] == "multiply":
      """
      multiply(matrixData[0], matrixData[0])
      """
      callbackMethod = getattr(matrix, "multiply")

      if constantValue[0] == 0:
        callbackMethod = getattr(matrix, "identity")
        res = callbackMethod(matrixData[0])
      else:
        res = matrixData[0]
        while constantValue[0] > 1:
          # # call method with send parameter
          res = callbackMethod(res, matrixData[0])
          constantValue[0] -= 1

    elif method[0] in ["scalar", "shift", "triangular"]:
      # # Take one argument
      callbackMethod = getattr(matrix, method[0])

      """
      scalar(matrixData[0], constantValue[0])
      triangular(matrixData[0], constantValue[0])
      shift(matrixData[0], constantValue[0], reverse[True(Counter-clockwise) / False(Clockwise): default value])
      """
      # # call method with send parameter
      res = callbackMethod(matrixData[0], constantValue[0])

    elif method[0] in ["minor_cofactor"]:
      # # Take two arguments with specific value
      callbackMethod = getattr(matrix, method[0])

      """
      minor_cofactor(matrixData[0], constantValue[0], constantValue[1], method[1])
      """
      # # call method with send parameter
      res = callbackMethod(matrixData[0], constantValue[0], constantValue[1], method[1])


    else:
      # # Don"t need argument just matrix data
      callbackMethod = getattr(matrix, method[0])

      """
      identity(matrixData[0])
      transpose(matrixData[0])
      determinant(matrixData[0])
      diagonal(matrixData[0])
      inverse(matrixData[0])
      trace(matrixData[0])
      rank(matrixData[0])
      """
      # # call method with send parameter
      res = callbackMethod(matrixData[0])

  getConfigResult(matrixData, str(res))

# Implement event listener
for btn in arrayMethodButton:
  btn.addEventListener("click", create_proxy(callMethod))