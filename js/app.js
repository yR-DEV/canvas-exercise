function Shape(x, y, width, height, color) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 1;
  this.height = height || 1;
  this.color = color;
}

//drawing the shape with the given context
Shape.prototype.draw = function(context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
};

//determining whether or not the point is inside of the shapes boundaries
Shape.prototype.contains = function(mouseX, mouseY) {
  //just making sure that the mouse location is within the shape
  //this code is very similar to the collision detection function I wrote in my game
  //but instead of checking the boundaries of 2 objects I only have to search for one which is awesome
  return (this.x <= mouseX) && (this.x + this.width >= mouseX) && (this.y <= mouseY) && (this.y + this.height >= mouseY);
}

function TheCanvas(canvas) {
  //random var declaration
  var paddingLeft, paddingTop, borderLeft, borderTop;

  //just in case I want to havemultiple canvases layered on top of eachother
  this.canvas = canvas;
  this.height = height;
  this.width = width;
  this.context = canvas.getContext("2d");

  //need an array for the shapes, In my game I made a function called pools
  //that held arrays of objects
  this.shapes = [];
  //keeping track of when the user is draggin an objects
  this.userDragging = false;
  //the object in the shapes array that is currently selected
  this.selection = null;
  //these interact with the mouse move events below
  this.draggingX = 0;
  this.draggingY = 0;

  //when an event is fired on the canvas, the context of 'this' right here
  //is going to refer to this canvas function! In order to continue to refer to the canvas
  //and its state in the following events I need to reference it.
  var canvasState = this;

  //draggingggggg! :D
  canvas.addEventListener("mousedown", function(para) {
    var userMouse = canvasState.getMouse(para);
    var mouseX = userMouse.x;
    var mouseY = userMouse.y;
    var shapes = canvasState.shapes;
    //length of the shapes array, will be used int he loop
    var length = shapes.length;
    //this for loop will start at the objects number and move down
    for(var i = length - 1; i >= 0; i--) {
      if(shapes[i].contains(mouseX, mouseY)) {
      var theSelection = shapes[i];
      //the shape moves more smoothly accross the screen when we keep track of
      //exactly where it was clicked
      canvasState.draggingX = mouseX - theSelection.x;
      canvasState.draggingY = mouseY - theSelection.y;
      canvasState.userDragging = true;
      canvasState.selection = theSelection;
      canvasState.valid = false;
      return;
      }
    }
    // if the users mouse coords and the shapes coords do not match up
    //it means the user has failed to select anything
    //if there was something selected, then we deselect it
    if(canvasState.selection) {
      canvasState.selection = null;
      //clearing the old selection border
      canvasState.valid = false;
    }
  }, true);
  canvas.addEventListener('mousemove', function(para) {
    if(canvasState.userDragging) {
      var userMouse = canvasState.getMouse(para);
      //adding code so that the user is not dragging the object from 0,0 or the top left corner
      //and instead is going to save the mouse coords and move the object by that
      canvasState.selection.x = userMouse.x - canvasState.draggingX;
      canvasState.selection.y = userMouse.y - canvasState.draggingY;
      //because something is moving, we need to redraw it
      canvasState.valid = false;
    }
  }, true);
  canvas.addEventListener('mosueup', function(para) {
    //the user is no longer moving a shape so set bool to false;
    canvasState.userDragging = false;
  }, true;)
  //in order to make new shapes the user can double click
  canvas.addEventListener('dblclick', function(para) {
    var userMouse = canvasState.getMouse(para);
    canvasState.addShape(new Shape
    (userMouse.x - 8, userMouse.y - 8, 18, 18, 'rgba(0, 255,0, 1)'));
  }, true);
  //some more options
  this.selectionColor= 
}
TheCanvas.prototype.addShape = function(shape) {
  this.shapes.push(shape);
  this.valid = false;
}

TheCanvas.prototype.clearShape = function() {
  this.proto.clearRect(0, 0, this.width, this.height);
}
