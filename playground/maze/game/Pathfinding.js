/**
 * @Credit
 * From https://www.redblobgames.com/
 * Copyright 2018 Red Blob Games <redblobgames@gmail.com>
 *
 */


import { neighborIndex } from './Utils.js';
import { Queue } from './Queue.js';
import { Movement } from './Movement.js';
const move = new Movement();
let i = 0;


export class Pathfinding{
  /**
   * 
   * @param {*} game Game stage object
   * @param {*} isBrave On the stage there is a trap block that can pass through and damage your hp,
   * but if that's a short way close to the goal.
   * The AI route search decides whether to walk through or not.
   * default is false
   */
  constructor(game, isBrave = false){
    this.game = game;
    this.done = false;
    this.path = [];
    this.came_from = {};
    this.cost_so_far = {};
    this.priority = 0;
    this.frontier = new Queue();
  }
  reconstructPath = (came_from, start, goal) => {
    let current = goal;
    while(JSON.stringify(current) !== JSON.stringify(start)){
      this.path.push(current);
      current = came_from[`[${current}]`];
    }
    this.path.push(start);
    this.path.reverse();
    for(let i = 0; i < this.path.length; i++){
      move.move(this.game, this.path[i], true);
      this.game.path_finder.push(this.path[i]);
    }
    this.done = true;
    return true;
  }
  cost = (from_node, to_node) => {
    if(!this.game.weights.hasOwnProperty(to_node)){
      throw new Error(`Invalid node: ${to_node}`);
    }
    return this.game.weights[to_node];
  }
  heuristic = (a, b) => {
    let [x1, y1] = a;
    let [x2, y2] = b;
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
  isGoal = current => {
    if((current[0] === this.game.goal_x) && (current[1] === this.game.goal_y)){
      return this.reconstructPath(this.came_from, [this.game.curr_x, this.game.curr_y], [this.game.goal_x, this.game.goal_y]);
    } else {
      return false;
    }
  }
  bfs = () => {
    this.frontier.put([this.game.curr_x, this.game.curr_y]);
    this.came_from[`[${this.game.curr_x},${this.game.curr_y}]`] = null;
    
    while(!this.frontier.empty()){
      let current = this.frontier.get();


      if(this.isGoal(current)){
        break;
      }

      let neighbors = neighborIndex(this.game, current, `${this.game.env.bombs}|${this.game.env.walls}`);
      for(let next of neighbors){
        if(this.came_from[`[${next}]`] === null){
          this.frontier.put(next);
          this.came_from[`[${next}]`] = current;
        }
      }
    }
  }
  greedy_bfs = () => {
    this.frontier.put([this.game.curr_x, this.game.curr_y]);
    this.came_from[`[${this.game.curr_x},${this.game.curr_y}]`] = null;

    while(!this.frontier.empty()){
      let current = this.frontier.get();

      if(this.isGoal(current)){
        break;
      }

      let neighbors = neighborIndex(this.game, current, `${this.game.env.bombs}|${this.game.env.walls}`);
      for(let next of neighbors){
        if(this.came_from[`[${next}]`] === undefined){
          this.priority = this.heuristic([this.goal_x, this.goal_y], next)
          this.frontier.insert(this.priority, next);
          this.came_from[`[${next}]`] = current;
        }
      }
    }
  }

  // dfs = () => {}

  dijkstra = () => {
    this.frontier.insert(0, [this.game.curr_x, this.game.curr_y]);
    this.came_from[`[${this.game.curr_x},${this.game.curr_y}]`] = null;
    this.cost_so_far[`[${this.game.curr_x},${this.game.curr_y}]`] = 0;

    while(!this.frontier.empty()){
      let current = this.frontier.get();

      if(this.isGoal(current)){
        break;
      }

      let neighbors = neighborIndex(this.game, current, `${this.game.env.bombs}|${this.game.env.walls}`);
      for(let next of neighbors){
        let new_cost = this.cost_so_far[JSON.stringify(current)] + this.cost(JSON.stringify(current), JSON.stringify(next));
        if(this.came_from[`[${next}]`] === undefined || new_cost < this.cost_so_far[JSON.stringify(next)]){
          this.cost_so_far[JSON.stringify(next)] = new_cost;
          this.priority = new_cost;
          this.frontier.insert(this.priority, next);
          this.came_from[`[${next}]`] = current;
        }
      }
    }
  }
  aStar = () => {
    this.frontier.insert(0, [this.game.curr_x, this.game.curr_y]);
    this.came_from[`[${this.game.curr_x},${this.game.curr_y}]`] = null;
    this.cost_so_far[`[${this.game.curr_x},${this.game.curr_y}]`] = 0;

    while(!this.frontier.empty()){
      let current = this.frontier.get();

      if(this.isGoal(current)){
        break;
      }

      let neighbors = neighborIndex(this.game, current, `${this.game.env.bombs}|${this.game.env.walls}`);
      for(let next of neighbors){
        let new_cost = this.cost_so_far[JSON.stringify(current)] + this.cost(JSON.stringify(current), JSON.stringify(next));
        if(this.came_from[`[${next}]`] === undefined || new_cost < this.cost_so_far[JSON.stringify(next)]){
          this.cost_so_far[JSON.stringify(next)] = new_cost;
          this.priority = new_cost + this.heuristic([this.game.goal_x, this.game.goal_y], next);
          this.frontier.insert(this.priority, next);
          this.came_from[`[${next}]`] = current;
        }
      }
    }
  }
}