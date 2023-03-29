import random
from fractions import Fraction
import copy
from js import logError

class Matrix:
  def __init__(self, name = "unnamed", is_randoms = False, rows = 3, cols = 3, nums = 0) -> None:
    self.name = name
    self.rows = rows
    self.cols = cols
    self.nums = nums
    self.randoms = is_randoms
    self.matrix = []
  def create(self, start = 0, end = 255) -> None:
    for i in range(self.rows):
      self.matrix.append([])
      for j in range(len(self.matrix[i]) + self.cols):
        if self.randoms:
          randNum = random.randint(start, end)
          self.matrix[i].append(randNum)
        else:
          self.matrix[i].append(self.nums)

# Max column
def maxcol(matrix):
  max_col = max([len(matrix[i]) for i in range(len(matrix))])
  return max_col

# Check maximum rows or columns of matrix.
def maxDimension(matrix):
  max_size = max(len(matrix), maxcol(matrix))
  return max_size

# Check properties matrix.
def checkProps(matrix):
  rows = len(matrix)
  columns = maxcol(matrix)
  matrixName = "Unnamed"
  variables = dict(globals())
  for name in variables:
    if variables[name] is matrix:
      matrixName = name
      break
  return {"name": matrixName, "rows": rows, "columns": columns}

# Check number of column in first rows of the first matrix should be equal to first columns of the second matrix.
def isMatrixEqual(matrixA, matrixB, operator):
  """
  operator\n
  plusminus or multiply
  """
  # check size first row in 1st and size first column in 2nd
  col1st = maxcol(matrixA)
  row1st = len(matrixA)
  col2nd = maxcol(matrixB)
  row2nd = len(matrixB)

  if operator == "plusminus":
    if (col1st == col2nd) & (row1st == row2nd): return True
  elif operator == "multiply":
    if col1st == row2nd: return True
  else: return False

# A == B : A[i*j] == B[i*j] and A[i][j] == B[i][j]
def isSameMatrix(matrixA, matrixB):
  # First check size by multiply row with column made it to one number
  size_matrix_A = len(matrixA) * maxcol(matrixA)
  size_matrix_B = len(matrixB) * maxcol(matrixB)

  if size_matrix_A == size_matrix_B:
    # # Loop check every members for compare matrix
    # for x in range(len(matrixA)):
    #   for y in range(len(matrixA[x])):
    #     if matrixA[x][y] == matrixB[x][y]:
    #       continue
    #     else: return False
    # return True
    # ------- Alternate Method --------
    z = zip(matrixA, matrixB)
    for i, j in z:
      inz = zip(i, j)
      for n, m in inz:
        if n == m:
          continue
        else: return False
    return True
  else: return False

def isSquareMatrix(matrix):
  max = maxDimension(matrix)
  if len(matrix) == max:
    for i in range(len(matrix)):
      if len(matrix[i]) == max:
        continue
      else: return False
  else: return False
  return True

# Generate to N x M matrix by adding zeros make all columns to be equal.
def addzeros(matrix):
  # check each rows that which columns are not equal to maxcol.
  for j in range(len(matrix)):
    for k in range(maxcol(matrix) - len(matrix[j])):
      matrix[j].append(0)
  return matrix

# Generate to N x N matrix by adding zeros following maximum rows or columns to makes rows and columns to be equal.
def squareMatrix(matrix):
  max = maxDimension(matrix)

  for i in range(max):
    if i > len(matrix) - 1: matrix.append([])
    for j in range(max):
      if j > len(matrix[i]) - 1: matrix[i].append(0)
  return matrix

# # Generate matrix to identity matrix.
def identity(matrix):
  # Identity matrix shound be square matrix
  if not isSquareMatrix(matrix): return logError("The matrix is not square.")
  size = maxDimension(squareMatrix(matrix))

  identity_matrix = [[1 if i == j else 0 for j in range(size)] for i in range(size)]
  return identity_matrix

def plus_minus(matrixA, matrixB, operator):
  """
  operator:\n
  plus, (+), p or minus, (-), m
  """
  # Check the matrix size is equal
  if not isMatrixEqual(matrixA, matrixB, "plusminus"): return logError("1st matrix is NOT EQUAL to 2nd matrix")

  res_matrix = [[0 for j in range(len(matrixA[0]))] for i in range(len(matrixA))]

  for i in range(len(matrixA)):
    for j in range(len(matrixA[i])):
      if operator == "plus" or operator == "+" or operator == "p":
        res_matrix[i][j] = matrixA[i][j] + matrixB[i][j]
      if operator == "minus" or operator == "-" or operator == "m":
        res_matrix[i][j] = matrixA[i][j] - matrixB[i][j]
  return res_matrix


def transpose(matrix):
  # Make equalize each row equal by adding zeros based on largest row
  matrix = addzeros(matrix)

  # Create zero matrix to store result matrix based on original row col
  transpose_matrix = [[0 for i in range(len(matrix))] for j in range(len(matrix[0]))]

  for i in range(len(transpose_matrix)):
    for j in range(len(transpose_matrix[i])):
      transpose_matrix[i][j] = matrix[j][i]

  # ----------- ALTERNATE METHOD -------------

  # transpose_matrix[0][0] += matrix[0][0]
  # transpose_matrix[0][1] += matrix[1][0]
  # transpose_matrix[1][0] += matrix[0][1]
  # transpose_matrix[1][1] += matrix[1][1]
  # transpose_matrix[2][0] += matrix[0][2]
  # transpose_matrix[2][1] += matrix[1][2]

  # for i in range(len(matrix[0])):
  #     for j in range(len(matrix)):
  #         transpose_matrix[i][j] = matrix[j][i]

  return transpose_matrix


def addPadding(matrix, kernel, edge = False, padding = 0):
  kernel_size_rows = len(kernel)
  matrix_size_rows = len(matrix)
  matrix_size_cols = len(matrix[0])

  if edge:
    padding_size = padding or (kernel_size_rows - 1) // 2
  else:
    padding_size = padding
  zero_padding = [0] * matrix_size_cols

  # add rows
  for i in range(padding_size):
    matrix.insert(0, list(zero_padding))
    matrix.append(list(zero_padding))
  matrix_size_rows = len(matrix)

  # add cols
  for i in range(matrix_size_rows):
    for j in range(padding_size):
      matrix[i].insert(0, 0)
      matrix[i].append(0)
  matrix_size_cols = len(matrix[0])

  return matrix

def convolution(matrix, kernel, edge = False, stride = 1, padding = 0):
  if isinstance(padding, int) and padding < 0: return logError("Padding parameter should be whole number")

  p = 0 or padding
  s = stride or 1
  input_kernel_rows = len(kernel)
  input_kernel_cols = len(kernel[0])

  value = 0

  k_r_odd = input_kernel_rows % 2 == 1
  k_c_odd = input_kernel_cols % 2 == 1

  matrixIsSmaller = len(matrix) + (2 * p) < input_kernel_rows or len(matrix[0]) + (2 * p) < input_kernel_cols
  if edge:
    if k_r_odd != k_c_odd:
      return logError("Kernel is not odd-size")
    else:
      # if dimension of matrix smaller than kernel filter
      if matrixIsSmaller:
        addPadding(matrix, kernel, edge, padding = abs(len(matrix) + (2 * p) - input_kernel_rows))
  else:
    # if dimension of matrix smaller than kernel filter
    if matrixIsSmaller:
      return logError("Matrix smaller than kernel filter then determine edge argument as True")

  # get len of matrix after add padding
  input_matrix_cols = len(matrix[0])
  input_matrix_rows = len(matrix)

  if not isSquareMatrix(kernel): addzeros(kernel)
  if not isSquareMatrix(matrix): addzeros(matrix)

  output_size_rows = abs((input_matrix_rows - input_kernel_rows + (2 * p)) // s) + 1
  output_size_cols = abs((input_matrix_cols - input_kernel_cols + (2 * p)) // s) + 1
  
  move_rows = input_matrix_rows + (2 * p) - input_kernel_rows + 1
  move_cols = input_matrix_cols + (2 * p) - input_kernel_cols + 1

  conv2D = [[0] * output_size_cols] * output_size_rows

  for i in range(move_rows):
    for j in range(move_cols):
      for k in range(input_kernel_rows):
        for l in range(input_kernel_cols):
          value += matrix[k][l] * kernel[k][l]
      conv2D[i][j] = round(value)
      value = 0

  return conv2D


def scalar(matrix, scalar):
  new_list = copy.deepcopy(matrix)
  for i in range(len(new_list)):
    for j in range(len(new_list[i])):
      fraction = Fraction(int(round(scalar * new_list[i][j], 3) * 1000), 1000)
      if (int(scalar) != scalar):
        new_list[i][j] = [[], fraction.numerator, fraction.denominator]
      else:
        new_list[i][j] = int(scalar) * new_list[i][j]
      # matrix[i][j] = round(scalar * matrix[i][j], 3)

  return new_list

# use for exponent too
def multiply(matrixA, matrixB):
  # Make equalize each row equal by adding zeros based on largest row
  matrixA = addzeros(matrixA)
  matrixB = addzeros(matrixB)

  # If complex number
  complex_number = False

  # Check if multiplication is Possible.
  if not isMatrixEqual(matrixA, matrixB, "multiply"): return logError("Rows of 1st matrix is NOT EQUAL to Columns of 2nd matrix")

  # Create zero matrix to store result matrix based on number row of 1st matrix with number column of 2nd matrix
  multiply_matrix = [[0 for i in range(len(matrixB[0]))] for z in range(len(matrixA))]

  for i in range(len(matrixA)):
    for j in range(len(matrixB[0])):
      for k in range(len(matrixB)):
        
        if type(matrixA[i][k]) == str:
          if matrixA[i][k].isdigit():
            matrixA[i][k] = int(matrixA[i][k])
        if type(matrixB[k][j]) == str:
          if matrixB[k][j].isdigit():
            matrixB[k][j] = int(matrixB[k][j])

        if type(multiply_matrix[i][j]) == str or type(matrixA[i][k]) == str or type(matrixB[k][j]) == str:
          if ~complex_number:
            complex_number = True
          if multiply_matrix[i][j] == 0:
            multiply_matrix[i][j] = str(matrixA[i][k]) + str(matrixB[k][j])
          else:
            if type(matrixA[i][k]) == int and type(matrixB[k][j]) == int:
              multiply_matrix[i][j] = str(multiply_matrix[i][j]) + " + " + str(matrixA[i][k] * matrixB[k][j])
            else:
              multiply_matrix[i][j] = str(multiply_matrix[i][j]) + " + " + str(matrixA[i][k]) + str(matrixB[k][j])
          continue

        multiply_matrix[i][j] += matrixA[i][k] * matrixB[k][j]

      if complex_number:
        if type(multiply_matrix[i][j]) == str:
          rs = multiply_matrix[i][j].split(" ")
          c = 0
          res = []
          sum = 0
          for k in rs:
            if k.isdigit():
              rs[c] = int(k)
              sum += rs[c]
            elif k != "+":
              res.append(rs[c])
            c += 1
          if sum != 0:
            res.append(str(sum))
          res = " + ".join(res)
          multiply_matrix[i][j] = res

  return multiply_matrix

def determinant(matrix):
  # use Bareiss algorithm
  # determinant matrix should be square
  if not isSquareMatrix(matrix): return logError("The matrix is not square.")

  # the value of the support element in the previous step
  prev_sup_val = 1

  pivot = 0
  prev_matrix = [x[:] for x in matrix]
  prev_matrix_size_rows = len(prev_matrix)
  prev_matrix_size_cols = len(prev_matrix[0])
  det_matrix = [[0 for j in range(prev_matrix_size_cols)] for i in range(prev_matrix_size_rows)]
  det_matrix_size_rows = len(det_matrix)

  for r in range(prev_matrix_size_rows):
    for i in range(det_matrix_size_rows):
      for j in range(len(det_matrix[i])):
        if i == r:
          det_matrix[i][j] = prev_matrix[i][j]
        else:
          det_matrix[i][j] = 0 if prev_sup_val == 0 else ((prev_matrix[pivot][pivot] * prev_matrix[i][j]) - (prev_matrix[i][pivot] * prev_matrix[pivot][j])) // prev_sup_val
    pivot += 1
    prev_matrix = [x[:] for x in det_matrix]
    prev_sup_val = prev_matrix[r][r]

  # det_matrix[0][0] = prev_matrix[0][0]
  # det_matrix[0][1] = prev_matrix[0][1]
  # det_matrix[0][2] = prev_matrix[0][2]
  # det_matrix[1][0] = ((prev_matrix[0][0] * prev_matrix[1][0]) - (prev_matrix[1][0] * prev_matrix[0][0])) // p
  # det_matrix[1][1] = ((prev_matrix[0][0] * prev_matrix[1][1]) - (prev_matrix[1][0] * prev_matrix[0][1])) // p
  # det_matrix[1][2] = ((prev_matrix[0][0] * prev_matrix[1][2]) - (prev_matrix[1][0] * prev_matrix[0][2])) // p
  # det_matrix[2][0] = ((prev_matrix[0][0] * prev_matrix[2][0]) - (prev_matrix[2][0] * prev_matrix[0][0])) // p
  # det_matrix[2][1] = ((prev_matrix[0][0] * prev_matrix[2][1]) - (prev_matrix[2][0] * prev_matrix[0][1])) // p
  # det_matrix[2][2] = ((prev_matrix[0][0] * prev_matrix[2][2]) - (prev_matrix[2][0] * prev_matrix[0][2])) // p

  # prev_matrix = [x[:] for x in det_matrix]
  # prev_sup_val = prev_matrix[0][0]

  # det_matrix[0][0] = ((prev_matrix[1][1] * prev_matrix[0][0]) - (prev_matrix[0][1] * prev_matrix[1][0])) // p
  # det_matrix[0][1] = ((prev_matrix[1][1] * prev_matrix[0][1]) - (prev_matrix[0][1] * prev_matrix[1][1])) // p
  # det_matrix[0][2] = ((prev_matrix[1][1] * prev_matrix[0][2]) - (prev_matrix[0][1] * prev_matrix[1][2])) // p
  # det_matrix[1][0] = prev_matrix[1][0]
  # det_matrix[1][1] = prev_matrix[1][1]
  # det_matrix[1][2] = prev_matrix[1][2]
  # det_matrix[2][0] = ((prev_matrix[1][1] * prev_matrix[2][0]) - (prev_matrix[2][1] * prev_matrix[1][0])) // p
  # det_matrix[2][1] = ((prev_matrix[1][1] * prev_matrix[2][1]) - (prev_matrix[2][1] * prev_matrix[1][1])) // p
  # det_matrix[2][2] = ((prev_matrix[1][1] * prev_matrix[2][2]) - (prev_matrix[2][1] * prev_matrix[1][2])) // p

  # prev_matrix = [x[:] for x in det_matrix]
  # prev_sup_val = prev_matrix[1][1]

  # det_matrix[0][0] = ((prev_matrix[2][2] * prev_matrix[0][0]) - (prev_matrix[0][2] * prev_matrix[2][0])) // p
  # det_matrix[0][1] = ((prev_matrix[2][2] * prev_matrix[0][1]) - (prev_matrix[0][2] * prev_matrix[2][1])) // p
  # det_matrix[0][2] = ((prev_matrix[2][2] * prev_matrix[0][2]) - (prev_matrix[0][2] * prev_matrix[2][2])) // p
  # det_matrix[1][0] = ((prev_matrix[2][2] * prev_matrix[1][0]) - (prev_matrix[1][2] * prev_matrix[2][0])) // p
  # det_matrix[1][1] = ((prev_matrix[2][2] * prev_matrix[1][1]) - (prev_matrix[1][2] * prev_matrix[2][1])) // p
  # det_matrix[1][2] = ((prev_matrix[2][2] * prev_matrix[1][2]) - (prev_matrix[1][2] * prev_matrix[2][2])) // p
  # det_matrix[2][0] = prev_matrix[2][0]
  # det_matrix[2][1] = prev_matrix[2][1]
  # det_matrix[2][2] = prev_matrix[2][2]

  # det_matrix_size_rows = len(det_matrix)
  # det_value = (1**det_matrix_size_rows) * det_matrix[r][r]

  return det_matrix[r][r]

def minor_cofactor(matrix, posI, posJ, sel = "m"):
  """
  sel - type m or c\n
  m = Determinant of matrix(i, j)\n
  c = Cofactor of matrix(i, j)
  """
  rows = len(matrix)
  cols = maxcol(matrix)
  select = ["m", "c"]

  if sel not in select: return "m or c"
  if not isSquareMatrix(matrix): return logError("The matrix is not square.")
  if posI not in range(rows) or posJ not in range(cols): return logError(f"Out of range of rows or cols.\nProperties of the matrix is\n{checkProps(matrix)}")
  
  # Copy the matrix to avoid damaging the original matrix.
  # because parameter of matrix is reference to orginal
  dummy_matrix = [x[:] for x in matrix]
  dummy_matrix_rows = len(dummy_matrix)

  # Delete row and column
  for i in range(dummy_matrix_rows):
    if i == posI:
      del dummy_matrix[i]
      break
  for j in dummy_matrix:
    del j[posJ]

  det = determinant(dummy_matrix)

  result = det if sel == "m" else (-1)**(posI + posJ) * det
  return result


def triangular(matrix, dir = 1):
  new_list = copy.deepcopy(matrix)
  """
  dir:\n
  1 is lower triangular\n
  0 is upper triangular
  """

  if dir not in [1, 0]:
    return logError("dir argument is wrong it's must to be 1 or 0")

  # [0 -1 -2]
  # [1 0 -1]
  # [2 1 0]
  
  # [[0, 0], [0, 1], [0, 2]]
  # [[1, 0], [1, 1], [1, 2]]
  # [[2, 0], [2, 1], [2, 2]]

  for i in range(len(new_list)):
    if dir == 1:
      for j in range(i, len(new_list[0])):
        if i - j < 0:
          new_list[i][j] = 0
    if dir == 0:
      for j in range(0, i + 1):
        if i - j > 0:
          new_list[i][j] = 0

  return new_list


def diagonal(matrix):
  diagonal_matrix = [[0 for j in range(len(matrix[0]))] for i in range(len(matrix))]
  for i in range(len(matrix)):
    diagonal_matrix[i][i] = matrix[i][i]
  return diagonal_matrix

# def rank(matrix):
#   result = 0
#   return result

# def rotate(matrix, clockwise = True, k = 1):
#   rows = len(matrix)
#   cols = len(matrix[0])

#   i = 0
#   j = 0

#   left = []
#   top_bottom = []
#   right = []

#   return matrix

def spiralOrder(matrix, clockwise = True):
  rows = len(matrix)
  cols = len(matrix[0])
  ele = rows * cols
  i = 0
  j = 0
  di = 0
  ans = []
  ring = 0
  prev = 0

  traveller = list()

  while len(traveller) < ele:

    if [i, j] in traveller:
      break
    ans.append(matrix[i][j])
    traveller.append([i, j])

    # cur_border is number of border each ring
    # r is order of each ring of matrix start with 0
    cur_border = ((cols - (ring * 2)) * 2) + (((rows - (ring * 2)) - 2) * 2)

    # prev is outer border number when cur_border + prev, the result should be summation of border each ring
    if len(traveller) == cur_border + prev:
      prev = cur_border
      ring += 1

    cr = rows - 1 - ring
    cc = cols - 1 - ring

    if clockwise:
      if i <= cr and j < cc and i == ring:
        j += 1
      elif i < cr and j == cc:
        i += 1
      elif i == cr and j > 0 + ring:
        j -= 1
      elif i > 0 + ring and j == 0 + ring:
        i -= 1
    else:
      if i < cr and j == 0 + ring:
        i += 1
      elif i == cr and j < cc:
        j += 1
      elif i > 0 + ring and j == cc:
        i -= 1
      elif i == 0 + ring and j > 0 + ring:
        j -= 1




      # dr = [0, 1, 0, -1] if clockwise else [1, 0, -1, 0]
      # dc = [1, 0, -1, 0] if clockwise else [0, 1, 0, -1]

      # cr = i + dr[di]
      # cc = j + dc[di]

      # if 0 <= cr and cr < rows and 0 <= cc and cc < cols and [cr, cc] not in traveller:
      #   i = cr
      #   j = cc
      # else:
      #   di = (di + 1) % 4
      #   i += dr[di]
      #   j += dc[di]


  return ans

def shift(matrix, k = 1, rev = False):
  rows = len(matrix)
  new_list = copy.deepcopy(matrix)
  while k > 0:
    if not rev:
      for i in range(rows):
        first = new_list[i].pop(-(len(new_list[i])))
        new_list[i].append(first)
    else:
      for i in range(rows):
        last = new_list[i].pop()
        new_list[i].insert(0, last)

    k -= 1

  return new_list

def inverse(matrix):
  if not isSquareMatrix(matrix): return logError("The matrix is not square.")

  rows = len(matrix)
  cols = maxcol(matrix)
  det_matrix = determinant(matrix)

  # if determinant equal 0 the matrix is not invertible
  if det_matrix == 0: return logError("The determinant is 0 the matrix is not invertible.")

  # Copy matrix for storing new value
  cof_matrix = [x[:] for x in matrix]

  for i in range(rows):
    for j in range(cols):
      cof_matrix[i][j] = minor_cofactor(matrix, i, j, "c")

  inverse_matrix = scalar(transpose(cof_matrix), 1 / det_matrix)
  return inverse_matrix

def trace(matrix):
  trace_matrix = 0
  if not isSquareMatrix(matrix): return logError("The matrix is not square.")
  for i in range(len(matrix)):
    trace_matrix += matrix[i][i]
  return trace_matrix