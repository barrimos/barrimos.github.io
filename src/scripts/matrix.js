(function(global, factory){
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.matrices = factory();
}(typeof self !== 'undefined' ? self : this, (function(){
  'use strict';

  // Name
  const NAME_ID = 'matrices';
  const NAME_FORM = 'matrix';
  const NAME_TABLE = 'table';
  const NAME_TABLE_AREA = 'table_area';
  const NAME_ROWS = 'rows';
  const NAME_COLS = 'cols';
  const NAME_CELL = 'cell';
  const NAME_HIDE = 'hide';
  const NAME_METHOD = 'method';
  const NAME_CONTROL = 'control';
  const NAME_OPERATION = 'operation';
  const NAME_CONTROL_WRAPPER = 'control_wrapper';
  const NAME_METHOD_WRAPPER = 'method_wrapper';
  const NAME_OPERATION_WRAPPER = 'operation_wrapper';
  const NAME_CONTROL_BUTTON = 'control_button';
  const NAME_METHOD_BUTTON = 'method_button';
  const NAME_OPERATION_BUTTON = 'operation_button';
  const NAME_CELLS_RESULT = 'cellsResult';
  const NAME_INSERT_TO_CELL = 'insertToCell';
  const NAME_CLEAR_RESULT = 'clearResult'
  
  // Dataset
  const NAME_DATA_SIZE = 'data-size';
  const NAME_DATA_TABLE_SIZE = 'data-table-size';
  const NAME_DATA_ROWS = 'data-rows';
  const NAME_DATA_COLS = 'data-cols';
  const NAME_DATA_ID = 'data-id';
  const NAME_DATA_FORM = 'data-form';
  const NAME_DATA_TABLE = 'data-table';
  const NAME_DATA_AREA = 'data-area';
  const NAME_DATA_AREA_ID = 'data-area-id';
  const NAME_DATA_CELL = 'data-cell';
  const NAME_DATA_CONTROL = 'data-control';
  const NAME_DATA_METHOD = 'data-method';
  const NAME_DATA_OPERATION = 'data-operation';
  
  // Selector
  const SELECTOR_MATRICES = `.${NAME_ID}`;
  const SELECTOR_FORM = `.${NAME_FORM}`;
  const SELECTOR_TABLE = `.${NAME_TABLE}`;
  const SELECTOR_TABLE_AREA = `.${NAME_TABLE_AREA}`;
  const SELECTOR_CELL = `.${NAME_CELL}`;
  const SELECTOR_ROWS = `.${NAME_ROWS}`;
  const SELECTOR_COLS = `.${NAME_COLS}`;
  const SELECTOR_HIDE = `.${NAME_HIDE}`;
  const SELECTOR_CELLS_RESULT = `.${NAME_CELLS_RESULT}`;
  const SELECTOR_INSERT_TO_CELL = `.${NAME_INSERT_TO_CELL}`;
  
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
  const SELECTOR_DATA_AREA_ID = `[${NAME_DATA_AREA_ID}]`;
  const SELECTOR_DATA_CELL = `[${NAME_DATA_CELL}]`;
  
  const SELECTOR_DATA_CONTROL = `[${NAME_DATA_CONTROL}]`;
  const SELECTOR_DATA_METHOD = `[${NAME_DATA_METHOD}]`;
  const SELECTOR_DATA_OPERATION = `[${NAME_DATA_OPERATION}]`;
  
  // Control buttons
  const BUTTON_NAME_CLEAR = 'clear';
  const BUTTON_NAME_SWITCH = 'switch';
  const BUTTON_NAME_INCREASE = 'increase';
  const BUTTON_NAME_DECREASE = 'decrease';
  
  // Method buttons
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
  const BUTTON_NAME_TRIANGULAR = 'triangular';
  const BUTTON_NAME_PADDING = 'addPadding';
  const BUTTON_NAME_SQUARE_MATRIX = 'squareMatrix';
  const BUTTON_NAME_IS_SQUARE = 'isSquareMatrix';
  const BUTTON_NAME_ADD_ZEROS = 'addzeros';
  const BUTTON_NAME_RANK = 'rank';
  
  // Operation buttons
  const BUTTON_NAME_SWAP = 'swap';
  const BUTTON_NAME_MULTIPLY = 'multiply';
  const BUTTON_NAME_PLUS_MINUS = 'plus_minus';
  const BUTTON_NAME_CONVOLUTION = 'convolution';
  const BUTTON_NAME_CONVOLUTION_EDGE = 'convolution_edge';
  
  const REQUIRED = 'required';
  const BUTTONS = document.querySelectorAll('button[name="matrix"]');
  let cells, insertBtn;

  // Default config's value
  const Default = {
    rows: 3,
    cols: 3,
    id: 65,
    value: 0,
    axis: {
      rows: [],
      cols: [],
    },
    maxPoint: {
      rows: 0,
      cols: 0,
    },
    limit: 0,
    isHiding: false,
    oldRows: 0,
    oldCols: 0,
  }
  
  // Config
  const Config = {}
  
  const ConfigType = {
    rows: 'number',
    cols: 'number',
    id: 'string',
    axis: 'object',
    maxPoint: 'object',
    limit: 'number',
    isHiding: 'boolean',
    oldRows: 'number',
    oldCols: 'number',
  }
  
  const toType = obj => {
    if(obj === null || obj === undefined){
      return `${obj}`;
    }
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  
  const isElement = obj => {
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

  const cleanConfigs = key_idx => {
    Config[key_idx]['axis'] = {};
    Config[key_idx]['axis']['rows'] = [];
    Config[key_idx]['axis']['cols'] = [];
    Config[key_idx]['axis']['matrix'] = [];
    Config[key_idx]['oldRows'] = 0;
    Config[key_idx]['oldCols'] = 0;
    Config[key_idx]['maxPoint'] = {};
    Config[key_idx]['maxPoint']['rows'] = 0;
    Config[key_idx]['maxPoint']['cols'] = 0;
    Config[key_idx].isHiding = false;
    Config[key_idx].limit = 0;
  }

  const getConfig = matrices => {
    // Get data-size
    matrices.forEach((elem, i) => {
      let key_idx = Config[i] === undefined ? i : getKeyConfig(elem.attributes[NAME_DATA_ID].value);
      Config[key_idx] = {};
      let err;
      
      // Get size by counting html elements
      if(elem.children[0].children[0].children.length !== 0){
        Config[key_idx].rows = elem.children[0].children[0].children.length;
        Config[key_idx].cols = elem.children[0].children[0].children[0].children.length;
      } else {
        try{
          // Get size from html if not exist use data-size
          // Get size from data-size if not exist or empty string or undefined throw TypeError
          [Config[key_idx].rows, Config[key_idx].cols] = elem.attributes[NAME_DATA_SIZE].value.match(/\d+/g).map(n => {return parseInt(n)});
    
    
          if(Config[key_idx].rows === undefined || Config[key_idx].cols === undefined){
            err = [Config[key_idx].rows, Config[key_idx].cols];
            throw new TypeError;
          }
        } catch(e){
          // Set rows and cols by Default
          Config[key_idx].rows = Default.rows;
          Config[key_idx].cols = Default.cols;
          console.error(`${e}\n• HTML elements "DOESN'T EXIST" so Config will use the data-size instead.\n`+
          `• The data-size expected "TWO NUMBER" and "SAME VALUE" but got "{${err}}"\n`+
          '• Then Config will use "DEFAULT" value instead.');
        }
      }
  
      try{
        // Get id from data-id if data-id not exist throw TypeError
        Config[key_idx].id = elem.attributes[NAME_DATA_ID].value;
        if(Config[key_idx].id === ''){
          throw new TypeError;
        }
      } catch(e){
        // Set data-id by Default
        Config[key_idx].id = String.fromCharCode(Default.id + key_idx);
        elem.setAttribute(NAME_DATA_ID, Config[key_idx].id)
        console.error(`${e}\n• The data-id "DOESN'T EXIST ?" so Config will use "DEFAULT" value instead.`);
      }
  
      try{
        // If data-form not equal to data-id or data-form attribute not exist throw TypeError
        if(!document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"]`)){
          throw new TypeError;
        }
      } catch(e){
        // Set attribute data-table
        elem.children[0].setAttribute(NAME_DATA_FORM, Config[key_idx].id);
        console.error(`${e}\n• The data-form maybe it's "DOESN'T EXIST ?" or\n• The data-form's value is "NOT AS SAME AS" the data-id.\n`+
        '• The data-form will use the data-id instead.');
      }
  
      try{
        // If data-table not equal to data-id or data-table attribute not exist throw TypeError
        if(!document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"]`)){
          throw new TypeError;
        }
      } catch(e){
        let table = document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] ${SELECTOR_TABLE}`);
        table.setAttribute(NAME_DATA_TABLE, Config[key_idx].id);
        console.error(`${e}\n• The data-table maybe it's "DOESN'T EXIST ?" or\n• The data-table's value is "NOT AS SAME AS" the data-id.\n`+
        '• The data-table will use the data-id instead.');
      }
      cleanConfigs(key_idx);
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

  const getTable = id => {
    return document.querySelector(`[${NAME_DATA_TABLE}="${id}"]`);
  }

  // Max column
  const maxcol = matrix => {
    let max = 0;
    for(let i = 0; i < matrix.length; i++){
      max = Math.max(max, matrix[i].length);
    }
    return max;
  }

  // Generate to N x M matrix by adding zeros make all columns to be equal.
  const addzeros = matrix =>{
    let max = maxcol(matrix);
    // Check each rows that which columns are not equal to maxcol.
    for(let j = 0; j < matrix.length; j++){
      let n = max - matrix[j].length;
      for(let k = 0; k < n; k++){
        matrix[j].push(0);
      }
    }
    return matrix
  }

  const setDataSizeTable = (table, key_idx) => {
    table.setAttribute(NAME_DATA_TABLE_SIZE, `${Config[key_idx].rows} ${Config[key_idx].cols}`);
  }

  const isActiveButton = key_idx => {
    // Disabled increase and decrease button when table_area active
    let increase_btn = document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] [${NAME_DATA_CONTROL}="${BUTTON_NAME_INCREASE}"]`);
    let decrease_btn = document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] [${NAME_DATA_CONTROL}="${BUTTON_NAME_DECREASE}"]`);
  
    if(!Config[key_idx].isTableArea){
      increase_btn.setAttribute('disabled', '');
      decrease_btn.setAttribute('disabled', '');
      Config[key_idx].isTableArea = true;
    } else {
      increase_btn.removeAttribute('disabled');
      decrease_btn.removeAttribute('disabled');
      Config[key_idx].isTableArea = false;
    }
  }
  
  const compareDecimals = (a, b) => {
    if(a === b){
      return 0;
    }
    return a < b ? 1 : -1;
  }

  // <------------- Control
  /**
   * Clear data cell
   */
  const clearCell = (table, id) => {
    let key_idx = getKeyConfig(id);
    Array.from(table.children).forEach(rows => {
      Array.from(rows.children).forEach(cols => {
        cols.value = '';
      })
    });
    sessionStorage.removeItem(id);
    if(Config[key_idx].isTableArea){
      let clear_data = sessionStorage.getItem(Config[key_idx].id);
      document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] ${SELECTOR_TABLE_AREA}`).value = clear_data;
    }
    cleanConfigs(key_idx);
  }


  /**
   * Switch between cell and text area
   */
  const switchCell = (table, id) => {
    let key_idx = getKeyConfig(id);
    Config[key_idx].isTableArea === false ? true : false;
    let table_area = document.querySelector(`[${NAME_DATA_FORM}="${Config[key_idx].id}"] ${SELECTOR_TABLE_AREA}`);

    // Disabled increase/decrease button
    isActiveButton(key_idx);

    // If switch from table to table_area
    if(Config[key_idx].isTableArea){
      // Set oldRows/oldCols for compare later
      Config[key_idx].oldRows = Config[key_idx].rows;
      Config[key_idx].oldCols = Config[key_idx].cols;

      // If sessionStorage have data from table
      // Tabel_area shown data from table
      if(sessionStorage.getItem(Config[key_idx].id) !== null){
        writeToTableArea(table_area, key_idx, JSON.parse(sessionStorage.getItem(Config[key_idx].id)));

      } else {
        // Get data table_area to sessionStorage
        getAreaData();
      }
    }

    // If switch from table_area to table
    if(!Config[key_idx].isTableArea){
      // If table_area have a data
      if(table_area.value !== ''){
        clearAndCreateTable(table, key_idx, JSON.parse(sessionStorage.getItem(Config[key_idx].id)))

        getCellData();
      } else {
        Config[key_idx].oldRows = Default.oldRows;
        Config[key_idx].oldCols = Default.oldCols;
      }
    }

    // Switch class .hide
    [table, table_area].forEach(t => {
      if(t.classList.contains(NAME_HIDE)){
        t.classList.remove(NAME_HIDE);
      } else {
        t.classList.add(NAME_HIDE);
      }
    });
    // Cell change then call function to get cell data again
    getCellData();
  }


  /**
   * Increase or decrease matrix
   */
  const updateCell = (table, id, n) => {
    let key_idx = getKeyConfig(id);
    if(n === '1'){
      // If isHiding true it's mean decrease was clicked
      if(Config[key_idx].isHiding){
        // FIRST
        // Show last rows
        document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"] [${NAME_DATA_ROWS}="${Config[key_idx].rows}"]`).classList.remove(NAME_HIDE);
        // Update Config[key_idx].rows
        Config[key_idx].rows++;

        // Show last cols
        for(let i = 0; i < Config[key_idx].rows; i++){
          document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"] [${NAME_DATA_ROWS}="${i}"] [${NAME_DATA_COLS}="${Config[key_idx].cols}"]`).classList.remove(NAME_HIDE);
        }
        // Update Config[key_idx].cols
        Config[key_idx].cols++;

        // Update Config[key_idx].limit
        Config[key_idx].limit--;

        // Update Config[key_idx].isHiding
        Config[key_idx].isHiding = Config[key_idx].limit === 0 ? false : true;

        // Set maxPoint
        Config[key_idx]['maxPoint']['rows']++;
        Config[key_idx]['maxPoint']['cols']++;
        
        // Update data
        saveData(table, key_idx);

        // Update data_table_size
        setDataSizeTable(table, key_idx);
        return;
      }

      // FIRST
      // Loop into each rows add cols by copy last column element
      // How many rows check in Config[key_idx].rows
      for(let i = 0; i < Config[key_idx].rows; i++){
        // Copy last column each cell
        let clone = table.children[i].lastChild.cloneNode(true);

        // Change data-cols and data-cell and value to empty
        clone.setAttribute(NAME_DATA_COLS, Config[key_idx].cols); // zero-based index so Config[key_idx].cols is n + 1
        clone.setAttribute(NAME_DATA_CELL, `${i}-${Config[key_idx].cols}-${id}`);
        clone.value = '';

        // Table.children[i] (rows) appendChild clone node cols
        table.children[i].appendChild(clone);

      }
      // After added clone node update Config[key_idx].cols
      Config[key_idx].cols++;


      // SECOND
      // Add rows by copy last rows element
      // Copy last rows
      let clone = table.lastChild.cloneNode(true);
      // Change data-rows
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
        
        // Table appendChild clone node rows
        table.appendChild(clone);
      }
      // After added clone node update Config[key_idx].rows
      Config[key_idx].rows++;
    }

    if(n === '0'){
      // If Config[key_idx].rows or Config[key_idx].cols === 0
      // Generate new table by use Default.rows and Default.cols and data use Default.value
      if(Config[key_idx].rows - 1 === 0 || Config[key_idx].cols - 1 === 0){
        if(confirm('All data will be reset, Are you sure ?')){
          // Clear all innerHTML before
          table.innerHTML = '';

          // Create start matrix that mean reset all to Default
          createStartMatrix([table.parentElement.parentElement]);
          sessionStorage.removeItem(Config[key_idx].id);
          return;
        } else {
          return
        }
      }

      /** Change hide item by add style display: none. change at class .cols
      *   If matrix have a data and click decrease the data will should not delete but just hide.
      *   Beacause it will not waste the time entering data again.
      *   When click increase again the data that hide will show up again.
      **/


      // FIRST
      // Hide last rows
      document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"] [${NAME_DATA_ROWS}="${Config[key_idx].rows - 1}"]`).classList.add(NAME_HIDE);
      // Update Config[key_idx].rows
      Config[key_idx].rows--;
      // Hide last cols
      for(let i = 0; i < Config[key_idx].rows; i++){
        document.querySelector(`[${NAME_DATA_TABLE}="${Config[key_idx].id}"] [${NAME_DATA_ROWS}="${i}"] [${NAME_DATA_COLS}="${Config[key_idx].cols - 1}"]`).classList.add(NAME_HIDE);
      }
      // Update Config[key_idx].cols
      Config[key_idx].cols--;

      // Update Config[key_idx].limit
      Config[key_idx].limit++;
      
      // Update Config[key_idx].isHiding
      Config[key_idx].isHiding = true;
      
      // Set maxPoint
      Config[key_idx]['maxPoint']['rows']--;
      Config[key_idx]['maxPoint']['cols']--;
      
      // Update data
      saveData(table, key_idx);
    }
    cells = document.querySelectorAll(SELECTOR_DATA_CELL);
    
    // After update data then call itself again for update cells if table has updated
    getCellData();

    // Update data_table_size
    setDataSizeTable(table, key_idx);
  }
  // Control -------------->

  // <------------- Operation
  const swap = () => {
    // Get elements
    let formA = document.querySelector(`[${NAME_DATA_FORM}="A"]`);
    let tableA = document.querySelector(`[${NAME_DATA_TABLE}="A"]`);
    let tableAreaA = document.querySelector(`[${NAME_DATA_AREA_ID}="A"]`);
    let inSessionA = sessionStorage.getItem('A');
    let formB = document.querySelector(`[${NAME_DATA_FORM}="B"]`);
    let tableB = document.querySelector(`[${NAME_DATA_TABLE}="B"]`);
    let tableAreaB = document.querySelector(`[${NAME_DATA_AREA_ID}="B"]`);
    let inSessionB = sessionStorage.getItem('B');

    // Data
    [[tableA, tableAreaA], [tableB, tableAreaB]].forEach((list, idx) => {
      list.forEach((table, i) => {
        if(i === 0){
          table.setAttribute(NAME_DATA_TABLE, idx === 0 ? 'B' : 'A');
        }
        if(i === 1){
          table.setAttribute(NAME_DATA_AREA_ID, idx === 0 ? 'B' : 'A');
        }
        Array.from(table.childNodes).forEach((rows, i) => {
          Array.from(rows.childNodes).forEach((cols, j) => {
            cols.setAttribute(NAME_DATA_CELL, `${i}-${j}-${idx === 0 ? 'B' : 'A'}`);
          });
        });
      });
    });

    // Session data
    [inSessionA, inSessionB] = [inSessionB, inSessionA];
    [inSessionA, inSessionB].forEach((sessionData, i) => {
      if(sessionData !== null){
        sessionStorage.setItem(i === 0 ? 'A' : 'B', sessionData);
      } else {
        sessionStorage.removeItem(i === 0 ? 'A' : 'B');
      }
    })

    // Insert
    formA.insertBefore(tableB, formA.children[0]);
    formA.insertBefore(tableAreaB, formA.children[1]);
    formB.insertBefore(tableA, formB.children[0]);
    formB.insertBefore(tableAreaA, formB.children[1]);

    // Config
    [Config[0], Config[1]] = [Config[1], Config[0]];
    [Config[0].id, Config[1].id] = [Config[1].id, Config[0].id];
  }
  // Operation ------------->

  const getAreaData = () => {
    // For table area
    let txt = [];
    let isTextDown = false;
    let rows = 0;
    let cols = 0;
    let textAreas = document.querySelectorAll(SELECTOR_DATA_AREA);
    Array.from(textAreas).forEach(area => {
      area.addEventListener('input', e => {
        let key_idx = getKeyConfig(e.target.dataset.areaId);
        // If insert between number (number whitespace (insert) whitespace number) or
        // Separate into its own column 111 -> [1, 11] or [11, 1] or [1, 1, 1]
        if(e.inputType === 'insertText' && e.data === ' ' && isTextDown === false){
          isTextDown = true;
        }
        // Copy paste data
        if(e.inputType === 'insertFromPaste' && e.data === null){
          rows = 0;
          cols = 0;
          isTextDown = true;
        }
        // Delete oen or more or whitespace
        if(e.inputType === 'deleteContentBackward' || e.inputType === 'deleteWordBackward' && e.data === null || /^\s*$/.test(e.target.value)){
          // Every delete will reset rows cols then counting again
          rows = 0;
          cols = 0;
          // If data is nothing or whitespace
          if(e.target.value === null || e.target.value === '' || /^\s*$/.test(e.target.value)){
            txt = [];
            sessionStorage.removeItem(Config[key_idx].id);
            Config[key_idx]['axis']['rows'] = [];
            Config[key_idx]['axis']['cols'] = [];
            Config[key_idx]['axis']['matrix'] = [];
            isTextDown = false;
            return;
          } else {
            isTextDown = true;
          }
        }
        // If data input (all characters)
        if(e.inputType === 'insertText' && e.data !== null && e.data !== ' '){
          isTextDown = true;
        }
        if(isTextDown){
          Config[key_idx]['axis']['matrix'] = [];
          Config[key_idx]['axis']['rows'] = [];
          Config[key_idx]['axis']['cols'] = [];

          // Firse trim every whitespace leading and trailing of data
          // txt = e.target.value.trim().replace(/^\s+|\s+$/g, '');
          txt = e.target.value.trim();
          // Split \n between data to separate to be rows
          txt = txt.split(/\n+/g).map(t => {
  
            // Whitespace between digits to one whitespace
            t = t.replace(/\s+/g, ' ');
    
            // If too many \n change it to only one
            t = t.replace(/\n+/g, '\n');
    
            // Whitespace with new line or whitespace at end line change to empty
            t = t.replace(/\s+\n+|\s+$/g, '');
    
            return t.trim();
          }).map(t => {
            t = t.replace(/\s+/g, ',');
            isTextDown = false;
            return t.split(',');
          }).map((t, i) => {
            return t.map((n, j) => {
              if(isNaN(n)){
                if(!Config[key_idx]['axis']['matrix'].includes(`[${i},${j}]`)){
                  Config[key_idx]['axis']['matrix'].push(`[${i},${j}]`);
                  Config[key_idx]['axis']['rows'].push(i);
                  Config[key_idx]['axis']['cols'].push(j);
                }
                return n;
              } else {
                if(!Config[key_idx]['axis']['matrix'].includes(`[${i},${j}]`)){
                  Config[key_idx]['axis']['matrix'].push(`[${i},${j}]`);
                  Config[key_idx]['axis']['rows'].push(i);
                  Config[key_idx]['axis']['cols'].push(j);
                }
                return parseInt(n);
              }
            });
          });
        }
        getMaxPoint(key_idx);
        // Add zero make all column as same as length
        txt = addzeros(txt);
        sessionStorage.setItem(e.target.dataset.areaId, JSON.stringify(txt));
        isTextDown = false;
      });
    });
  }



  const getCellData = () => {
    cells = document.querySelectorAll(SELECTOR_DATA_CELL);
    let isErase = false;
    Array.from(cells).forEach(cell => {
      cell.onchange = () => {
        let data_cell = cell.getAttribute(NAME_DATA_CELL).split('-');
        let rows = parseInt(data_cell[0]);
        let cols = parseInt(data_cell[1]);
        let key_idx = getKeyConfig(data_cell[2]);

        if(cell.value === ''){
          isErase = true;
        }
        
        if(!isErase){
          if(!Config[key_idx]['axis']['matrix'].includes(`[${rows},${cols}]`)){
            Config[key_idx]['axis']['rows'].push(rows);
            Config[key_idx]['axis']['cols'].push(cols);
            Config[key_idx]['axis']['matrix'].push(`[${rows},${cols}]`);
          }
        } else {
          if(!Config[key_idx]['axis']['matrix'].includes(`[${rows},${cols}]`)){
            return;
          }
          [rows, cols].forEach((axis, i) => {
            let configAxis = i === 0 ? Config[key_idx]['axis']['rows'] : Config[key_idx]['axis']['cols'];
            if(configAxis.indexOf(axis) !== -1){
              configAxis.splice(configAxis.indexOf(axis), 1);
            }
          });
          if(Config[key_idx]['axis']['matrix'].indexOf(`[${rows},${cols}]`) !== -1){
            Config[key_idx]['axis']['matrix'].splice(Config[key_idx]['axis']['matrix'].indexOf(`[${rows},${cols}]`), 1);
          }
        }
        if(Config[key_idx]['axis']['matrix'].length === 0){
          sessionStorage.removeItem(Config[key_idx].id);
        } else {
          // Get maxPoint and update data into sessionStorage
          getMaxPoint(key_idx, isErase);
          saveData(getTable(data_cell[2]), key_idx);
        }
        // After update data then call itself again for update cells if table has updated
        getCellData();
      }
    });
  }

  const getMaxPoint = (key_idx, isErase = false) => {
    // Last axis added
    let lastElemAxisRows = Config[key_idx]['axis']['rows'][Config[key_idx]['axis']['rows'].length - 1];
    let lastElemAxisCols = Config[key_idx]['axis']['cols'][Config[key_idx]['axis']['cols'].length - 1];

    if(isErase){
      Config[key_idx]['axis']['rows'].sort(compareDecimals);
      Config[key_idx]['axis']['cols'].sort(compareDecimals);

      [Config[key_idx]['maxPoint']['rows'], Config[key_idx]['maxPoint']['cols']] = [Config[key_idx]['axis']['rows'][0], Config[key_idx]['axis']['cols'][0]];
      if(Config[key_idx]['maxPoint']['rows'] === undefined){
        Config[key_idx]['maxPoint']['rows'] = -1;
      }
      if(Config[key_idx]['maxPoint']['cols'] === undefined){
        Config[key_idx]['maxPoint']['cols'] = -1;
      }
    } else {
    // If last axis > max point change
      [Config[key_idx]['maxPoint']['rows'], Config[key_idx]['maxPoint']['cols']] = [
        lastElemAxisRows > Config[key_idx]['maxPoint']['rows'] ? lastElemAxisRows : Config[key_idx]['maxPoint']['rows'],
        lastElemAxisCols > Config[key_idx]['maxPoint']['cols'] ? lastElemAxisCols : Config[key_idx]['maxPoint']['cols']];
    }
  }

  const saveData = (table, key_idx) => {
    let matrix = [];
    for(let i = 0; i <= Config[key_idx]['maxPoint']['rows']; i++){
      matrix.push([]);
      for(let j = 0; j <= Config[key_idx]['maxPoint']['cols']; j++){
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
    sessionStorage.setItem(Config[key_idx].id, JSON.stringify(matrix));
  }

  const buttonHandler = () => {
    // Closure callback event
    Array.from(BUTTONS).forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        // Get dataset from button
        let keyData = Object.keys(e.target.dataset)[0];
  
        // Get id of table
        let id;
        try{
          // Get id from closest table
          id = e.target.closest(SELECTOR_MATRICES).attributes[NAME_DATA_ID].value;
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
        if(keyData === NAME_OPERATION){
          if(method === BUTTON_NAME_SWAP){
            swap();
          }
          else if(method === BUTTON_NAME_PLUS_MINUS || method === BUTTON_NAME_CONVOLUTION || method === BUTTON_NAME_CONVOLUTION_EDGE){
            constantValue.push(`'${e.target.value}'`);
            if(method === BUTTON_NAME_CONVOLUTION_EDGE){
              method = BUTTON_NAME_CONVOLUTION;
            }
          }
          method = `'${method}'`;
        }
  
  
        // Data-control
        if(keyData === NAME_CONTROL){
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
        if(keyData === NAME_METHOD){
          // One value constant
          if(method === BUTTON_NAME_SCALAR ||
          method === BUTTON_NAME_EXPONENT ||
          method === BUTTON_NAME_SHIFT ||
          method === BUTTON_NAME_TRIANGULAR ||
          method === BUTTON_NAME_PADDING){
            if(method === BUTTON_NAME_TRIANGULAR){
              // Get constant triangular from element value, 1 for lower and 0 for upper
              constantValue.push(e.target.value);
            } else {
              constantValue.push(e.target.nextElementSibling.value);
            }
            if(method === BUTTON_NAME_PADDING){
              method = `'${BUTTON_NAME_PADDING}', '${e.target.value}'`;
            } else if(method === BUTTON_NAME_EXPONENT){
              method = `'${BUTTON_NAME_MULTIPLY}'`;
            } else {
              method = `'${method}'`;
            }
          } else if(method === BUTTON_NAME_MINOR || method === BUTTON_NAME_COFACTOR){
            // Two value constant
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


  const createCellTable = (table, key_idx) => {
    let curr_rows, curr_cols;
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
    // Update data_table_size
    setDataSizeTable(table, key_idx);
  }

  // This function will execute only one time at start page.
  // Then save config and matrix on local storage.
  const createStartMatrix = elems => {
    // Get and set Config
    getConfig(elems);
    // Create start element
    elems.forEach((elem, i) => {
      let key_idx = Config[i] === undefined ? i : getKeyConfig(elem.attributes[NAME_DATA_ID].value);
      // Set specific some config
      Config[key_idx].isTableArea = false;

      let table = getTable(Config[key_idx].id)

      if(table.children.length === 0){
        createCellTable(table, key_idx);
      }
    });
  }

  // Define how many '[data-ride="matrices"]' existing in html
  const MATRIX = [].concat(...Element.prototype.querySelectorAll.call(document.documentElement, SELECTOR_DATA_RIDE));

  createStartMatrix(MATRIX);
  buttonHandler();
  Config.length = MATRIX.length; // Array-like Object
  getCellData();
  getAreaData();
  
  // Clear sessionStorge every refresh page
  window.onbeforeunload = function() {
    sessionStorage.clear();
  }

  // Export Config to use outer module
  function exportConfig(){
    return [
      Config,
      createCellTable,
      getKeyConfig,
      getTable,
      getMaxPoint,
      cleanConfigs,
      NAME_DATA_CELL,
      NAME_CELLS_RESULT,
      NAME_INSERT_TO_CELL,
      NAME_CLEAR_RESULT,
      NAME_DATA_FORM,
      NAME_TABLE,
      NAME_TABLE_AREA,
      SELECTOR_TABLE,
      SELECTOR_TABLE_AREA,
    ];
  }
  return exportConfig;
})));