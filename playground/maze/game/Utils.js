/**
 * 
 * @param {*} game                  is the current game object. (or this keyword for object method)
 * @param {*} axis                  position want to check the neighbors parameter take an array [x, y].
 * @param {*} notLooking            `Default is 1` find the neighbors that `NOT` equal to argument
 * @param {*} is_all_dir            `true` check all cell around itself. `Default is false` check only "up right down left".
 */
// eg. current position is [1, 1]
// you want to check the neighbors only up, side, down,
// and not looking for pathway.
// 
//  □ □ ×
//  · · ·
//  × □ ×
// 
// neighborIndex([1, 1], '·');
// return [[0, 1], [2, 1]]
// 
// neighborIndex([1, 1], '·', true);
// return [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]]
//
// not looking for walls or bombs.
// neighborIndex([1, 1], '×|□');
// return [[1, 0], [1, 2]]
//
// not looking for pathway.
// neighborIndex([1, 1], '·');
// return [[0, 1], [2, 1]]
export const neighborIndex = (game, axis, notLooking, is_all_dir = false) => {
  let neighbors = [];
  let [curr_x, curr_y] = axis;

  // start - start loop at rows 0 if curr_x is top of stage, otherwise start at row position - 1 if not.
  // loop - if rows is top rows and bottom rows that mean just 2 loops is enough. and other 3 loops.
  let start = curr_x === 0 ? 0 : curr_x - 1;
  let loop = curr_x === 0 ? 2 : curr_x === game.rows - 1 ? 2 : 3;

  for(let i = 0; i < loop; i++){
    let all_directions = is_all_dir ? true : start + i === curr_x;

    // delete all space and change to string for check if that item includes in visited, queue or not.
    let q = JSON.stringify(game.queue);
    let v = JSON.stringify(game.visited);
    let up = JSON.stringify([start + i, curr_y - 1]);
    let side = JSON.stringify([start + i, curr_y]);
    let down = JSON.stringify([start + i, curr_y + 1]);
    let env;

    
    if(curr_y - 1 >= 0 && all_directions){
      env = game.stage[start + i][curr_y - 1];
      if(!notLooking.includes(env) && !q.includes(up) && !v.includes(up)){
        neighbors.push([start + i, curr_y - 1]);
      }
    }
    if(start + i !== curr_x){
      env = game.stage[start + i][curr_y];
      if(!notLooking.includes(env) && !q.includes(side) && !v.includes(side)){
        neighbors.push([start + i, curr_y]);
      }
    }
    if(curr_y + 1 < game.cols && all_directions){
      env = game.stage[start + i][curr_y + 1];
      if(!notLooking.includes(env) && !q.includes(down) && !v.includes(down)){
        neighbors.push([start + i, curr_y + 1]);
      }
    }
  }
  return neighbors;
}