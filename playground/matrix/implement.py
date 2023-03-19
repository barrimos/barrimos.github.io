import js
from js import document, getMethod, arrayMethodButton, sessionStorage
from pyodide.ffi import create_proxy
import sys
import ast
sys.path.append("../../src/scripts")
import matrix

def getDataCell(id):
  return sessionStorage.getItem(f"{id}")

def callMethod(e):
  id, method, constantValue = sessionStorage.getItem("method").split("-")

  mid = ast.literal_eval(id)

  mA = ast.literal_eval(getDataCell(mid[0]))
  mB = []
  try:
      mB = ast.literal_eval(getDataCell(mid[1]))
  except:
      mB = None

  lenC = len(ast.literal_eval(constantValue))

  # # If method don't ever need constantValue
  if lenC == 0:
     pass
  
  # # If method need constantValue
  if lenC == 1:
     pass

  # # If method is minor or cofactor need axis i, j
  if lenC == 2:
     pass

  # # If mb variable not to be None that means both of matrices must be used in order to operate.
  # # If length of constantValue equal to 1

  method = ast.literal_eval(method)
  # # method[0] is method name
  # # method[1] is specific value for minor_cofactor

  # # Method that from sessionStorage is string then getattr() to get function from other module with using string name set to be callback
  if method[0] == 'exponent':
    callbackMethod = getattr(matrix, 'multiply')
  else:
    callbackMethod = getattr(matrix, method[0])


  if method[0] in ['scalar', 'exponent', 'shift', 'padding', 'plus_minus', 'convolution']:
     pass
  if method[0] in ['minor_cofactor']:
     pass







for btn in arrayMethodButton:
  btn.addEventListener("click", create_proxy(callMethod))