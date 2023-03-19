(function(global, factory){
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.matrices = factory());
}(this, (function(){
  'use strict';

  // name
  const NAME_ID = 'matrices';
  const NAME_FORM = 'matrix';
  const NAME_TABLE = 'table';
  const NAME_TABLE_AREA = 'table_area';
  const NAME_ROWS = 'rows';
  const NAME_COLS = 'cols';
  const NAME_CELL = 'cell';
  const NAME_HIDE = 'hide';
  const NAME_CONTROL_WRAPPER = 'control_wrapper';
  const NAME_METHOD_WRAPPER = 'method_wrapper';
  const NAME_OPERATION_WRAPPER = 'operation_wrapper';
  const NAME_CONTROL_BUTTON = 'control_button';
  const NAME_METHOD_BUTTON = 'method_button';
  const NAME_OPERATION_BUTTON = 'operation_button';
  
  // data
  const NAME_DATA_SIZE = 'data-size';
  const NAME_DATA_TABLE_SIZE = 'data-table-size';
  const NAME_DATA_ROWS = 'data-rows';
  const NAME_DATA_COLS = 'data-cols';
  const NAME_DATA_ID = 'data-id';
  const NAME_DATA_FORM = 'data-form';
  const NAME_DATA_TABLE = 'data-table';
  const NAME_DATA_AREA = 'data-area';
  const NAME_DATA_CELL = 'data-cell';
  const NAME_DATA_CONTROL = 'data-control';
  const NAME_DATA_METHOD = 'data-method';
  const NAME_DATA_OPERATION = 'data-operation';
  
  // selector
  const SELECTOR_MATRICES = `.${NAME_ID}`;
  const SELECTOR_FORM = `.${NAME_FORM}`;
  const SELECTOR_TABLE = `.${NAME_TABLE}`;
  const SELECTOR_TABLE_AREA = `.${NAME_TABLE_AREA}`;
  const SELECTOR_CELL = `.${NAME_CELL}`;
  const SELECTOR_ROWS = `.${NAME_ROWS}`;
  const SELECTOR_COLS = `.${NAME_COLS}`;
  const SELECTOR_HIDE = `.${NAME_HIDE}`;
  
  const SELECTOR_CONTROL_WRAPPER = `.${NAME_CONTROL_WRAPPER}`;
  const SELECTOR_CONTROL_BUTTON = `.${NAME_CONTROL_BUTTON}`;
  
  const SELECTOR_METHOD_WRAPPER = `.${NAME_METHOD_WRAPPER}`;
  const SELECTOR_METHOD_BUTTON = `.${NAME_METHOD_BUTTON}`;
  
  const SELECTOR_OPERATION_WRAPPER = `.${NAME_OPERATION_WRAPPER}`;
  const SELECTOR_OPERATION_BUTTON = `.${NAME_OPERATION_BUTTON}`;
  
  const SELECTOR_DATA_RIDE = `[data-ride="${NAME_ID}"]`;
  const SELECTOR_DATA_SIZE = `[${NAME_DATA_SIZE}]`;
  const SELECTOR_DATA_TABLE_SIZE = `[${NAME_DATA_TABLE_SIZE}]`;
  const SELECTOR_DATA_ROWS = `[${NAME_DATA_ROWS}]`;
  const SELECTOR_DATA_COLS = `[${NAME_DATA_COLS}]`;
  const SELECTOR_DATA_ID = `[${NAME_DATA_ID}]`;
  const SELECTOR_DATA_FORM = `[${NAME_DATA_FORM}]`;
  const SELECTOR_DATA_TABLE = `[${NAME_DATA_TABLE}]`;
  const SELECTOR_DATA_AREA = `[${NAME_DATA_AREA}]`;
  const SELECTOR_DATA_CELL = `[${NAME_DATA_CELL}]`;
  
  const SELECTOR_DATA_CONTROL = `[${NAME_DATA_CONTROL}]`;
  const SELECTOR_DATA_METHOD = `[${NAME_DATA_METHOD}]`;
  const SELECTOR_DATA_OPERATION = `[${NAME_DATA_OPERATION}]`;
  
  // control buttons
  const BUTTON_NAME_CLEAR = 'clear';
  const BUTTON_NAME_SWITCH = 'switch';
  const BUTTON_NAME_INCREASE = 'increase';
  const BUTTON_NAME_DECREASE = 'decrease';
  
  // method buttons
  const BUTTON_NAME_DETERMINANT = 'determinant';
  const BUTTON_NAME_TRANSPOSE = 'transpose';
  const BUTTON_NAME_IDENTITY = 'identity';
  const BUTTON_NAME_INVERSE = 'inverse';
  const BUTTON_NAME_SCALAR = 'scalar';
  const BUTTON_NAME_EXPONENT = 'exponent';
  const BUTTON_NAME_SHIFT = 'shift';
  const BUTTON_NAME_MINOR = 'minor';
  const BUTTON_NAME_COFACTOR = 'cofactor';
  const BUTTON_NAME_DIAGONAL = 'diagonal';
  const BUTTON_NAME_TRACE = 'trace';
  const BUTTON_NAME_UPPER_TRIANGULAR = 'upper_triangular';
  const BUTTON_NAME_LOWER_TRIANGULAR = 'lower_triangular';
  const BUTTON_NAME_PADDING = 'padding';
  const BUTTON_NAME_TO_SQUARE = 'to_square';
  const BUTTON_NAME_IS_SQUARE = 'is_square';
  const BUTTON_NAME_ADD_ZEROES = 'add_zeroes';
  const BUTTON_NAME_RANK = 'rank';
  
  // operation buttons
  const BUTTON_NAME_SWAP = 'swap';
  const BUTTON_NAME_MULTIPLY = 'multiply';
  const BUTTON_NAME_PLUS = 'plus';
  const BUTTON_NAME_MINUS = 'minus';
  const BUTTON_NAME_CONVOLUTION = 'convolution';
  
  const REQUIRED = 'required';
  let buttons = document.getElementsByTagName('button');
  let cells;
  // default
  const Default = {
    rows: 3,
    cols: 3,
    id: 65,
    value: 0,
  }
  
  // config
  const Config = {}
  
  const ConfigType = {
    rows: 'number',
    cols: 'number',
    id: 'string',
  }
  
  // result
  const Result = {
    rows: null,
    cols: null,
    data: null,
  }
  
  
  const toType = obj => {
    if(obj === null || obj === undefined){
      return `${obj}`;
    }
  
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  
  const isElement = (obj) => {
    if(!obj || typeof obj !== 'object'){
      return false;
    }
  }
  
  const checkConfigType = (config, configType) => {
    Object.keys(configType).forEach(props => {
      const expectedType = configType[props];
      const value = config[props]; // can be correct or incorrect
      const valueType = value && isElement(value) ? 'element' : toType(value);
  
      if(!new RegExp(expectedType).test(valueType)){
        throw new TypeError(`"${props}" provided type "${valueType}" but expected type "${expectedType}".`);
      }
    });
  }
  
  const getConfig = matrices => {
    // get data-size
    matrices.forEach((elem, i) => {
      let key_idx = Config[i] === undefined ? i : getKeyConfig(elem.attributes[NAME_DATA_ID].value);
      Config[key_idx] = {};
      let err;
      
      // get size by counting html elements
      if(elem.children[0].children[0].children.length !== 0){
        Config[key_idx].rows = elem.children[0].children[0].children.length;
        Config[key_idx].cols = elem.children[0].children[0].children[0].children.length;
      } else {
        try{
          // get size from html if not exist use data-size
          // get size from data-size if not exist or empty string or undefined throw TypeError
          [Config[key_idx].rows, Config[key_idx].cols] = elem.attributes[NAME_DATA_SIZE].value.match(/\d+/g).map(n => {return parseInt(n)});
    
    
          if(Config[key_idx].rows === undefined || Config[key_idx].cols === undefined || Config[key_idx].rows !== Config[key_idx].cols){
            err = [Config[key_idx].rows, Config[key_idx].cols];
            throw new TypeError;
          }
        } catch(e){
          // set rows and cols by Default
          Config[key_idx].rows = Default.rows;
          Config[key_idx].cols = Default.cols;
          console.error(`${e}\n• HTML elements "DOESN'T EXIST" so Config will use the data-size instead.\n`+
          `• The data-size expected "TWO NUMBER" and "SAME VALUE" but got "{${err}}"\n`+
          '• Then Config will use "DEFAULT" value instead.');
        }
      }
  
      try{
        // get id from data-id if data-id not exist throw TypeError
        Config[key_idx].id = elem.attributes[NAME_DATA_ID].value;
        if(Config[key_idx].id === ''){
          throw new TypeError;
        }
      } catch(e){
        // set data-id by Default
        Config[key_idx].id = String.fromCharCode(Default.id + key_idx);
        elem.setAttribute(NAME_DATA_ID, Config[key_idx].id)
        console.error(`${e}\n• The data-id "DOESN'T EXIST ?" so Config will use "DEFAULT" value instead.`);
      }
  
      try{
        // if data-form not equal to data-id or data-form attribute not exist throw TypeError
        if(!document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"]`)){
          throw new TypeError;
        }
      } catch(e){
        // set attribute data-table
        elem.children[0].setAttribute(NAME_DATA_FORM, Config[key_idx].id);
        console.error(`${e}\n• The data-form maybe it's "DOESN'T EXIST ?" or\n• The data-form's value is "NOT AS SAME AS" the data-id.\n`+
        '• The data-form will use the data-id instead.');
      }
  
      try{
        // if data-table not equal to data-id or data-table attribute not exist throw TypeError
        if(!document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"]`)){
          throw new TypeError;
        }
      } catch(e){
        let table = document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] ${SELECTOR_TABLE}`);
        table.setAttribute(NAME_DATA_TABLE, Config[key_idx].id);
        console.error(`${e}\n• The data-table maybe it's "DOESN'T EXIST ?" or\n• The data-table's value is "NOT AS SAME AS" the data-id.\n`+
        '• The data-table will use the data-id instead.');
      }
  
      checkConfigType(Config[key_idx], ConfigType);
    });
  }
  
  const getKeyConfig = id => {
    let key_idx;
    Object.keys(Config).forEach(key => {
      if(Config[key].id === id){
        key_idx = key;
      }
    });
    return key_idx;
  }
  
  const getData = (config, table) => {
    let matrix = [];
    for(let i = 0; i < config.rows; i++){
      matrix.push([]);
      for(let j = 0; j < config.cols; j++){
        let data = table.children[i].children[j].value;
        if(!data){
          matrix[i].push(Default.value);
        } else {
          if(isNaN(data)){
            matrix[i].push(data);
          } else {
            matrix[i].push(Number(data));
          }
        }
      }
    }
    sessionStorage.setItem(config.id, JSON.stringify(matrix));
  }
  
  
  const isSquare = (elem) => {
    let arr;
    if(typeof elem === 'string'){
      arr = JSON.parse(elem);
    }
    for(let i = 0; i < arr.length; i++){
      if(arr.length !== arr[i].length){
        return false;
      }
    }
    return true;
  }
  
  const isActiveButton = (config, increase_btn, decrease_btn) => {
    // disabled increase and decrease button when table_area active
    if(!config.disabled){
      increase_btn.setAttribute('disabled', '');
      decrease_btn.setAttribute('disabled', '');
      config.disabled = true;
    } else {
      increase_btn.removeAttribute('disabled');
      decrease_btn.removeAttribute('disabled');
      config.disabled = false;
    }
  }

  const setDataSizeTable = (table, key_idx) => {
    table.setAttribute('data-table-size', `${Config[key_idx].rows} ${Config[key_idx].cols}`);
  }
  
  const getTable = (id) => {
    return document.querySelector(`[${NAME_DATA_TABLE}="${id}"]`);
  }

  // This function will execute only one time at start page.
  // then save config and matrix on local storage.
  const createStartMatrix = elems => {
    // get and set Config
    getConfig(elems);
    // create start element
    elems.forEach((elem, i) => {
      let key_idx = Config[i] === undefined ? i : getKeyConfig(elem.attributes[NAME_DATA_ID].value);
      // set specific some config
      Config[key_idx].isHiding = false;
      Config[key_idx].limit = 0;
      Config[key_idx].disabled = false;
  
      let table = getTable(Config[key_idx].id), curr_rows, curr_cols;
      if(table.children.length === 0){
        for(let j = 0; j < Config[key_idx].rows; j++){
          curr_rows = document.createElement('div');
          curr_rows.setAttribute('class', NAME_ROWS);
          curr_rows.setAttribute(NAME_DATA_ROWS, j);
          table.appendChild(curr_rows);
          for(let k = 0; k < Config[key_idx].cols; k++){
            curr_cols = document.createElement('input');
            curr_cols.setAttribute('type', 'text');
            curr_cols.setAttribute('class', `${NAME_COLS} ${NAME_CELL}`);
            curr_cols.setAttribute('placeholder', '0');
            curr_cols.setAttribute(NAME_DATA_COLS, k);
            curr_cols.setAttribute(NAME_DATA_CELL, `${j}-${k}-${Config[key_idx].id}`);
            table.children[j].appendChild(curr_cols);
          }
        }
      } else {
        getData(Config[key_idx], table);
      }
      getData(Config[key_idx], table);
      setDataSizeTable(table, key_idx);
    });
  }
  
  // <------------- control
  /**
   * increase or decrease matrix
   */
  const updateCell = (table, id, n) => {
    let key_idx = getKeyConfig(id);
    if(n === '1'){
      // if isHiding true it's mean decrease was clicked
      if(Config[key_idx].isHiding){
        // FIRST
        // show last rows
        document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"] [${NAME_DATA_ROWS}="${Config[key_idx].rows}"]`).classList.remove(NAME_HIDE);
        // update Config[key_idx].rows
        Config[key_idx].rows++;
  
        // show last cols
        for(let i = 0; i < Config[key_idx].rows; i++){
          document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"] [${NAME_DATA_ROWS}="${i}"] [${NAME_DATA_COLS}="${Config[key_idx].cols}"]`).classList.remove(NAME_HIDE);
        }
        // update Config[key_idx].cols
        Config[key_idx].cols++;
  
        // update Config[key_idx].limit
        Config[key_idx].limit--;
  
        // update Config[key_idx].isHiding
        Config[key_idx].isHiding = Config[key_idx].limit === 0 ? false : true;
  
        // update data
        getData(Config[key_idx], table);
        setDataSizeTable(table, key_idx);
        return;
      }
  
      // FIRST
      // loop into each rows add cols by copy last column element
      // how many rows check in Config[key_idx].rows
      for(let i = 0; i < Config[key_idx].rows; i++){
        // copy last column each cell
        let clone = table.children[i].lastChild.cloneNode(true);
  
        // change data-cols and data-cell and value to empty
        clone.setAttribute(NAME_DATA_COLS, Config[key_idx].cols); // zero-based index so Config[key_idx].cols is n + 1
        clone.setAttribute(NAME_DATA_CELL, `${i}-${Config[key_idx].cols}-${id}`);
        clone.value = '';
  
        // table.children[i] (rows) appendChild clone node cols
        table.children[i].appendChild(clone);
  
      }
      // after added clone node update Config[key_idx].cols
      Config[key_idx].cols++;
  
  
  
      // SECOND
      // add rows by copy last rows element
      // copy last rows
      let clone = table.lastChild.cloneNode(true);
      // change data-rows
      clone.setAttribute(NAME_DATA_ROWS, Config[key_idx].rows); // zero-based index so Config[key_idx].rows is n + 1
      // change data-cell each children(cols) at first value iterator by Config[key_idx].cols and empty value
      for(let i = 0; i < Config[key_idx].cols; i++){
        let data_cell = clone.children[i].attributes[NAME_DATA_CELL].value.split('-');
        data_cell.forEach((v, _) => {
          if(_ === 0){
            data_cell[_] = Config[key_idx].rows; // zero-based index so Config[key_idx].rows is n + 1
          }
        });
        let new_data_cell = data_cell.join('-');
        clone.children[i].setAttribute(NAME_DATA_CELL, new_data_cell);
        clone.children[i].value = '';
        
        // table appendChild clone node rows
        table.appendChild(clone);
      }
      // after added clone node update Config[key_idx].rows
      Config[key_idx].rows++;
  
      // update data
      getData(Config[key_idx], table);
    }
  
    if(n === '0'){
      // if Config[key_idx].rows or Config[key_idx].cols === 0
      // generate new table by use Default.rows and Default.cols and data use Default.value
      if(Config[key_idx].rows - 1 === 0 || Config[key_idx].cols - 1 === 0){
        if(confirm('All data will be reset, Are you sure ?')){
          // clear all innerHTML before
          table.innerHTML = '';
  
          // create start matrix that mean reset all to Default
          createStartMatrix([table.parentElement.parentElement]);
          return;
        } else {
          return
        }
      }
  
      /** change hide item by add style display: none. change at class .cols
      *   if matrix have a data and click decrease the data will should not delete but just hide.
      *   beacause it will not waste the time entering data again.
      *   when click increase again the data that hide will show up again.
      **/
  
      // FIRST
      // hide last rows
      document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"] [${NAME_DATA_ROWS}="${Config[key_idx].rows - 1}"]`).classList.add(NAME_HIDE);
      // update Config[key_idx].rows
      Config[key_idx].rows--;
  
      // hide last cols
      for(let i = 0; i < Config[key_idx].rows; i++){
        document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"] [${NAME_DATA_ROWS}="${i}"] [${NAME_DATA_COLS}="${Config[key_idx].cols - 1}"]`).classList.add(NAME_HIDE);
      }
      // update Config[key_idx].cols
      Config[key_idx].cols--;
  
      // update Config[key_idx].limit
      Config[key_idx].limit++;
      
      // update Config[key_idx].isHiding
      Config[key_idx].isHiding = true;
  
      // update data
      getData(Config[key_idx], table);
    }
    cells = document.querySelectorAll(SELECTOR_DATA_CELL);
    getCellData();
    setDataSizeTable(table, key_idx);
  }
  /**
   * clear data cell
   */
  const clearCell = (table, id) => {
    let key_idx = getKeyConfig(id);
    Array.from(table.children).forEach(rows => {
      Array.from(rows.children).forEach(cols => {
        cols.value = '';
      })
    });
    getData(Config[key_idx], table);
    if(Config[key_idx].disabled){
      let clear_data = sessionStorage.getItem(Config[key_idx].id);
      document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] ${SELECTOR_TABLE_AREA}`).value = clear_data;
    }
  }
  
  /**
   * switch between cell and text area
   */
  const switchCell = (table, id) => {
    let key_idx = getKeyConfig(id);
    let table_area = document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] ${SELECTOR_TABLE_AREA}`);
    let curr_data;
    let increase_btn = document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] [${NAME_DATA_CONTROL}="${BUTTON_NAME_INCREASE}"]`);
    let decrease_btn = document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] [${NAME_DATA_CONTROL}="${BUTTON_NAME_DECREASE}"]`);
  
    // disabled button
    isActiveButton(Config[key_idx], increase_btn, decrease_btn);
  
    // if switch from table to table_area
    if(!table.classList.contains(NAME_HIDE)){
  
      // save data table to sessionStorage
      getData(Config[key_idx], table);
  
      curr_data = sessionStorage.getItem(Config[key_idx].id);
      // table_area get data from sessionStorage
      table_area.value = curr_data;
    }
  
    // if switch from table_area to table
    if(!table_area.classList.contains(NAME_HIDE)){
      // check data is square or not before if not then try again and not change to table
      if(!isSquare(table_area.value)){
        alert(ReferenceError + 'The matrix is not square.');
        return;
      }
  
      // get data table from sessionStorage to compare table_area.value
      curr_data = sessionStorage.getItem(Config[key_idx].id);
  
      // if not as same as, update new data table_area.value to sessionStorage
      if(JSON.stringify(table_area.value) !== JSON.stringify(curr_data)){
        // check new data from table_area more or less compare to old data.
        let n = JSON.parse(table_area.value).length < Config[key_idx].rows ? '0' : '1';
        // difference from old
        let diff = Math.abs(JSON.parse(table_area.value).length - Config[key_idx].rows);

        // update table
        while(diff > 0){
          updateCell(table, Config[key_idx].id, n);
          diff--;
        }

        // set new data
        sessionStorage.setItem(Config[key_idx].id, table_area.value);
        
        // table get new data entering to cell
        JSON.parse(table_area.value).forEach((rows, i) => {
          rows.forEach((cols, j) => {
            document.querySelector(`[${NAME_DATA_CELL}="${i}-${j}-${Config[key_idx].id}"]`).value = cols;
          })
        });
      }
    }
  
    // switch class .hide
    [table, table_area].forEach(t => {
      if(t.classList.contains(NAME_HIDE)){
        t.classList.remove(NAME_HIDE);
      } else {
        t.classList.add(NAME_HIDE);
      }
    });
  }
  // control ------------>
  
  
  // <------------- operation
  const swap = () => {
    let aRows = Config[0].rows;
    let bRows = Config[1].rows;
    let tRows;
    let table;
    // Diff size of cell, this value will determine how each table add or remove cells
    let n = Math.abs(aRows - bRows);

    // If positive that mean add and vice versa
    for(let c = 0; c < Config.length; c++){
      for(let i = 0; i < n; i++){
        table = getTable(Config[c].id);
        if(aRows < bRows){
          updateCell(table, Config[c].id, '1');
        } else {
          updateCell(table, Config[c].id, '-1');
        }
      }
    }


    // Swap method is process like switchCell() method but have to swap Config each other first
    [Config[0], Config[1]] = [Config[1], Config[0]];
    Config[0].id = 'A';
    Config[1].id = 'B';

    // Then swap data in sessionStorage
    let mA = sessionStorage.getItem('B');
    let mB = sessionStorage.getItem('A');
    sessionStorage.setItem('A', mA);
    sessionStorage.setItem('B', mB);
  }
  // operation ------------->


  const buttonHandler = () => {
    // closure callback event
    Array.from(buttons).forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        // Get dataset from button
        let keyData = Object.keys(e.target.dataset)[0];

        // Get id of table
        let id;
        try{
          // Get id from closest table
          id = e.target.closest('.matrices').attributes[NAME_DATA_ID].value;
        } catch {
          // If not closest table or it be null data-operation was click
          id = `${'A\', \'B'}`;
        }

        // Get method name
        let method = e.target.attributes[`data-${keyData}`].value;

        // Get table
        let table = getTable(id);

        // For constant value if exist
        let constantValue = [];

        // Data-operation
        if(keyData === 'operation'){
          if(method === BUTTON_NAME_SWAP){
            swap();
          }
          if(method === 'plus_minus' || method === 'convolution_edge'){
            constantValue.push(`'${e.target.value}'`);
            if(method === 'convolution_edge'){
              method = 'convolution';
            }
          }
          method = `'${method}'`;
        }


        // Data-control
        if(keyData === 'control'){
          if(method === BUTTON_NAME_INCREASE || method === BUTTON_NAME_DECREASE){
            updateCell(table, id, e.target.value);
          } else if(method === BUTTON_NAME_CLEAR){
            clearCell(table, id);
          } else if(method === BUTTON_NAME_SWITCH){
            switchCell(table, id);
          }
          method = `'${method}'`;
        }


        // Data-method
        if(keyData === 'method'){
          // One value constant
          if(method === BUTTON_NAME_SCALAR ||
          method === BUTTON_NAME_EXPONENT ||
          method === BUTTON_NAME_SHIFT ||
          method === BUTTON_NAME_PADDING){
            constantValue.push(e.target.nextElementSibling.value);
          }
          // Get constant triangular from element value, 1 for lower and 0 for upper
          if(method === 'triangular'){
            constantValue.push(e.target.value);
          }
          // Two value constant
          if(method === BUTTON_NAME_MINOR || method === BUTTON_NAME_COFACTOR){
            Array.from(document.querySelectorAll(`[data-id="${id}"] input[name="${method}"]`)).forEach(c => {
              try{
                if(isNaN(c.valueAsNumber)){
                  throw new Error('Input is not a number.');
                }
              } catch(e){
                alert(e);
                return;
              }
              constantValue.push(c.valueAsNumber);
            });
            method = `'minor_cofactor', '${method[0]}'`;
          } else {
            method = `'${method}'`;
          }
        }
        // Keep it to storage
        sessionStorage.setItem('method', `['${id}']-[${method}]-[${constantValue}]`);
      });
    });
  }

  // define how many '[data-ride="matrices"]' existing in html
  const matrix = [].concat(...Element.prototype.querySelectorAll.call(document.documentElement, SELECTOR_DATA_RIDE));
  
  createStartMatrix(matrix);
  buttonHandler();
  
  cells = document.querySelectorAll(SELECTOR_DATA_CELL);
  const getCellData = () => {
    Array.from(cells).forEach(cell => {
      cell.onchange = function(){
        let data_cell = cell.getAttribute(`${NAME_DATA_CELL}`).split('-');
        let matrix = JSON.parse(sessionStorage.getItem(data_cell[2]));
        matrix[data_cell[0]][data_cell[1]] = Number(cell.value) || 0;
        sessionStorage.setItem(data_cell[2], JSON.stringify(matrix));
        cells = document.querySelectorAll(SELECTOR_DATA_CELL);
        // After update data then call itself again for update cells if table has updated
        getCellData();
      }
    });
  }
  // Call to get cell data once at start
  getCellData();
  Config.length = matrix.length; // Array-like Object

  window.onbeforeunload = function() {
    sessionStorage.clear();
  }
})));