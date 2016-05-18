//Create Board
var svg = d3.select('body').append('svg');

var boardSize = 1000;

//Create dataset for enemies' positions
var numEnemies = 10;
var enemyDataset = [];

for (var i = 0; i < numEnemies; i++) {
  enemyDataset[i] = i;
}

var newPositions = function() {
  return enemyDataset.map(function(i) {
    return {
      enemyIndex: i,
      x: Math.random() * boardSize,
      y: Math.random() * boardSize
    };
  });
};
var enemyPositions = newPositions();

//Create enemies
var enemies = svg.selectAll('image')
  .data(enemyPositions)
  .enter()
  .append('image')
  .attr('xlink:href', 'asteroid.png')
  .attr('x', function(d) { return d.x })
  .attr('y', function(d) { return d.y })
  .attr('class', 'enemy')
  .attr('height', 60)
  .attr('width', 60);

//Create function for enemies' random movements
var move = function () {
  enemies.transition()
    .attr('x', function(d) {
      d.x = Math.random() * boardSize;
      return d.x;
    })
    .attr('y', function(d) {
      d.y = Math.random() * boardSize;
      return d.y;
    })
    .duration(1000);
};

var moveInterval = setInterval(move, 1000);

//Create player
var playerData = [{
  x: 300,
  y: 250
}];

var player = svg.append('circle')
  .data(playerData)
  .attr('class', 'player')
  .attr('r', 15)
  .attr('cx', function(d) { return d.x })
  .attr('cy', function(d) { return d.y })
  .attr('fill', 'yellow')
  .attr('stroke', 'orange')
  .attr('stroke-width', 10);

//Create ability to drag the player around
var drag = d3.behavior.drag()
  .on("drag", function(d, i) {
    player.attr('cx', function(d) {
      d.x = d.x + d3.event.dx
      return d.x;
    }) 
      .attr('cy', function(d) {
        d.y = d.y + d3.event.dy
        return d.y;
      })
  })

player.call(drag)

//Settings for scoreboard
var score = 0;
var highScore = 0;
var collisions = 0;

//Create score tracker
var scoreTracker = function() {
  score++;
  if (score > highScore) {
    highScore = score;
  }
  d3.select('.current span').text(score);
  d3.select('.high span').text(highScore);
}

var scoreUpdateInterval = setInterval(scoreTracker, 500);

//Create collision detection function
var collisionDetection = function() {
  var checkCollision = false;

  //loop through each enemy's position to calculate distance to player
  enemies.each(function() {
    var eachEnem = d3.select(this);
    var p = player.data()[0];
    var collisionDistance = Math.sqrt ( Math.pow((p.x - eachEnem.attr('x')), 2) + Math.pow((p.y - eachEnem.attr('y')), 2) );

    if(collisionDistance < 15){
      checkCollision = true;
    }
  });
  if (checkCollision) {
    score = 0;
    collisions++;
  }
  d3.select('.collisions span').text(collisions);
};
setInterval(collisionDetection, 5);


/*Learnings from the solutions lecture 
  - set a settings object to whole all general descriptions
  - helper functions to generate random px
    - var pixelize = function(number){return number + 'px';}
    - randX = function(){return pixelize(rand(settings.w-settings.r*2))};
    - d3.range creates an array (n to -1)
*/
