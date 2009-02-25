

// solar

// [0] name, [1] solar id, [2] const id, [3] region id, [4] x, [5] y, [6] z
var rit= [
["P8-BKO",30004471,20000653,10000056, 220533382.01317,  54298096.3945451, 1257452540.18458],
["RIT-A7",30004472,20000653,10000056, 240821414.832579, 38081524.7941344, 1286591222.46778],
["R4K-8L",30004473,20000653,10000056, 283436070.202102, 57626684.5024684, 1305314454.29582],
["GHZ-SJ",30004474,20000653,10000056, 253499944.555949, 18917797.7952681, 1283539656.86076],
["K-J50B",30004475,20000653,10000056, 215055425.176986, 50344369.7452019, 1292983824.45643],
["NLO-3Z",30004476,20000653,10000056, 260813253.004437, -6798971.27896243,1284933514.03115],
["5P-AIP",30004477,20000653,10000056, 259071397.796696, 14288633.7186035, 1294475349.78304]
]


// setup client viewport

var s = 6;
var d = [0, 1e11, 0];
var view= gluLookAt( rit[s][4]+d[0], rit[s][5]+d[1], rit[s][6]+d[2], 
                     rit[s][4], rit[s][5], rit[s][6]);


var m = 70e7;
var n = 1e1;
var f = 1e10;
var perspective= glFrustum(-m,m,-m,m,n,f);
//var t_viewing = perspective.x(view);

var camera = new camera(view,perspective);
mainCamera = camera;

// setup nodes

root = constellationNode(rit,renderer);



// render

var viewport = document.getElementById("view1");
root.render(camera,viewport);

//var scene = universe.render(cam,canvas)

//print("view");
//print(view.inspect());
//print("perspective");
//print(perspective.inspect());
//print("t_viewing");
//print(t_viewing.inspect());
//
//print("");
//print("results");
//print(solars.row(1).inspect());
//print(t_viewing.x(solars.row(1)).inspect());
