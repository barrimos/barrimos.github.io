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

def isFullMatrix(matrix):
  maxDim = maxcol(matrix)
  for rows in matrix:
    if len(rows) != maxDim:
      return False
    else:
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
  if not isFullMatrix(matrix):
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


def addPadding(matrix, padding = 0):
  if not isinstance(padding, int) or padding < 0: return logError("Padding parameter should be whole number")
  new_list = copy.deepcopy(matrix)
  matrix_size_rows = len(new_list)
  matrix_size_cols = len(new_list[0])
  
  zero_padding = [0] * matrix_size_cols

  # add rows
  for i in range(padding):
    new_list.insert(0, list(zero_padding))
    new_list.append(list(zero_padding))
  matrix_size_rows = len(new_list)

  # add cols
  for i in range(matrix_size_rows):
    for j in range(padding):
      new_list[i].insert(0, 0)
      new_list[i].append(0)
  matrix_size_cols = len(new_list[0])

  return new_list

def convolution(matrix, kernel, edge = False, padding = 1, stride = 1):
  """
  edge = True: The center of kernel will start fit to top left coner of matrix\n
      \tMatrix will add padding by 0 value following difference with kernel size at least 1 round\n
      \t= (DEFAULT) False: Both of top left will fit together\n
      \tIf matrix smaller than kernel: matrix will add padding\n
  padding = Use when edge is True\n
  stride = Move's step each rows and columns\n
  """
  if padding < 0 or type(padding) != int or stride < 1 or type(stride) != int: return logError("Your put wrong stride or padding parameter value")

  if edge:
    if len(kernel) != len(kernel[0]) or len(kernel) % 2 != 1: return logError("When parameter edge is True, The kernel's rows and columns should be same size and odd size")
  else:
    if len(matrix) < len(kernel) or len(matrix[0]) < len(kernel[0]): return logError("Matrix is smaller than kernel then set parameter edge as True or change your matrix")

  input_kernel_rows = len(kernel)
  input_kernel_cols = len(kernel[0])

  value = 0

  if edge:
    p = max(abs(len(matrix) - input_kernel_rows), abs(len(matrix[0]) - input_kernel_cols))
    if p == 0:
      p = padding
    if padding > 1:
      p = padding
    matrix = addPadding(matrix, padding = p)

  # get len of matrix after add padding
  input_matrix_cols = len(matrix[0])
  input_matrix_rows = len(matrix)

  move_rows = abs((input_matrix_rows - input_kernel_rows) // stride) + 1
  move_cols = abs((input_matrix_cols - input_kernel_cols) // stride) + 1

  conv2D = [[0] * move_cols] * move_rows

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
  if not isFullMatrix(matrixA):
    matrixA = addzeros(matrixA)
  if not isFullMatrix(matrixB):
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

def bareiss(matrix, rank = False):
  # divisor is the value of previous matrix's pivot axis, start defualt is 1 for pivot [0, 0]
  divisor = 1

  # start pivot [0, 0]
  pivot = 0

  # dim is minimum dimension value of matrix
  # for rank will use minimum dimension value
  # for determinant both of two dimension is available because rows and columns are equal
  dim = min(len(matrix), len(matrix[0]))
  sparse_matrix = [x[:] for x in matrix]
  result_matrix = [[0 for j in i] for i in sparse_matrix]

  while pivot < dim:

    if sparse_matrix[pivot][pivot] == 0 and pivot < len(sparse_matrix) - 1:
      result_matrix[pivot], result_matrix[pivot + 1] = result_matrix[pivot + 1], result_matrix[pivot] if rank else scalar([result_matrix[pivot]], -1)[0]
      if rank:
        if result_matrix[pivot][pivot] == 0 and result_matrix[pivot + 1][pivot + 1] == 0:
          break
      sparse_matrix = [x[:] for x in result_matrix]

    for i in range(len(sparse_matrix)):
      for j in range(len(sparse_matrix[i])):
        if i == pivot:
          result_matrix[i][j] = sparse_matrix[pivot][j]
        else:
          if rank:
            result_matrix[i][j] = ((sparse_matrix[pivot][pivot] * sparse_matrix[i][j]) - (sparse_matrix[i][pivot] * sparse_matrix[pivot][j])) // divisor
          else:
            result_matrix[i][j] = 0 if divisor == 0 else ((sparse_matrix[pivot][pivot] * sparse_matrix[i][j]) - (sparse_matrix[i][pivot] * sparse_matrix[pivot][j])) // divisor
    
    sparse_matrix = [x[:] for x in result_matrix]
    divisor = sparse_matrix[pivot][pivot]
    pivot += 1

  if not rank:
    det_value = (1**len(result_matrix)) * result_matrix[pivot - 1][pivot - 1]
    return [result_matrix, det_value]
  else:
    return [result_matrix, pivot]


def determinant(matrix):
  # use Bareiss algorithm
  # matrix should be square
  if not isSquareMatrix(matrix): return logError("The matrix is not square.")

  [det_matrix, det_value] = bareiss(matrix)

  return [det_matrix, det_value]

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

def rank(matrix):
  # If matrix not full add zeros
  if not isFullMatrix(matrix):
    matrix = addzeros(matrix)

  [rank_matrix, order] = bareiss(matrix, True)

  return [rank_matrix, order]

def rotate(matrix, k = 1):
  # k is positive clockwise number is amount to rotate
  # k is negative counter-clockwise number is amount to rotate

  # If matrix is not full add zeros
  if not isFullMatrix(matrix):
    matrix = addzeros(matrix)

  rows = len(matrix)
  cols = len(matrix[0])
  result_matrix = [x[:] for x in matrix]

  # term is how many steps to completely 1 round of matrix
  term = 0
  if rows - 2 == 0 or cols - 2 == 0:
    term = rows * cols
  elif rows != cols and (rows - 2 > 0 or cols - 2 > 0):
    term = ((rows - 2) * 2) + ((cols - 2) * 2) + 4
  else:
    term = ((rows - 2) * 4) + 4

  # modulo steps with term
  roundLoop = abs(k) % term
  
  # if round step is 0 or equals to term return original matrix
  if roundLoop == term or roundLoop == 0:
    return matrix

  # Algorithm from https://www.geeksforgeeks.org/rotate-matrix-elements/

  if not rows:
    return

  """
  top : starting row index
  bottom : ending row index
  left : starting column index
  right : ending column index
  """

  while roundLoop > 0:
    top = 0
    bottom = rows - 1

    left = 0
    right = cols - 1
    while left < right and top < bottom:
      # count += 1
      # Store the first element of next row,
      # this element will replace first element of
      # current row
      prev = result_matrix[top + 1][left]

      # Move elements of top row one step right
      for i in range(left, right + 1):
        curr = result_matrix[top][i]
        result_matrix[top][i] = prev
        prev = curr

      top += 1

      # Move elements of rightmost column one step downwards
      for i in range(top, bottom + 1):
        curr = result_matrix[i][right]
        result_matrix[i][right] = prev
        prev = curr

      right -= 1

      # Move elements of bottom row one step left
      for i in range(right, left - 1, -1):
        curr = result_matrix[bottom][i]
        result_matrix[bottom][i] = prev
        prev = curr

      bottom -= 1

      # Move elements of leftmost column one step upwards
      for i in range(bottom, top - 1, -1):
        curr = result_matrix[i][left]
        result_matrix[i][left] = prev
        prev = curr

      left += 1
    roundLoop -= 1

  return result_matrix

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
    r = 0 + ring

    if clockwise:
      if i <= cr and j < cc and i == ring:
        j += 1
      elif i < cr and j == cc:
        i += 1
      elif i == cr and j > r:
        j -= 1
      elif i > r and j == r:
        i -= 1
    else:
      if i < cr and j == r:
        i += 1
      elif i == cr and j < cc:
        j += 1
      elif i > r and j == cc:
        i -= 1
      elif i == r and j > r:
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