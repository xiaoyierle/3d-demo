import * as THREE from 'three';
import 'imports-loader?THREE=three!threebsp'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'   //r100及以上
import { deepCopy } from '../../utils/basicUtil'
// var OrbitControls = require('three-orbit-controls')(THREE)  //r100 以下
export default class ThreeMap {
  constructor(props, dataJson) {
    this.props = props
    this.objList = dataJson.objects || [];//对象列表
    this.dom = document.getElementById(this.props.domID);
    this.mouseClick = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.tooltip = null;
    this.tooltipBG='#ACDEFE';
    this.BASE_PATH = "./images/"
    this.objects = [];  //存放对象
    this.sprite=[];  //存放告警精灵图标
    this.lastElement=null;  //存放最后一个设备
    this.progressSuccess=0;
    this.loadtimer=null;
  }
  init() {
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initLight();
    this.render();
    this.setControl();
    this.initData();  //添加3D对象、事件等
    this.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
    this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
  }
  //初始化渲染场景
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
    this.dom.appendChild(this.renderer.domElement);
  }
  //初始化相机
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.dom.offsetWidth / this.dom.offsetHeight, 1, 100000);
    this.camera.name = 'mainCamera';
    this.camera.position.set(0, 1000, 1800)
    //默认就是以Y轴为上方的
    // this.camera.up.x = 0;
    // this.camera.up.y =1;
    // this.camera.up.z =0;
    this.camera.lookAt({ x: 0, y: 0, z: 0 });
    this.scene.add(this.camera);
  }
  //初始化场景
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x225F93);
  }
  //初始化灯光
  initLight() {
    var light = new THREE.AmbientLight(0xcccccc);
    light.position.set(0, 0, 0);
    this.scene.add(light);
    var light2 = new THREE.PointLight(0x555555);
    light2.shadow.camera.near = 1;
    light2.shadow.camera.far = 5000;
    light2.position.set(0, 350, 0);
    light2.castShadow = true;//表示这个光是可以产生阴影的
    this.scene.add(light2);
  }
  //渲染
  render() {
    this.animate()
  }
  animate() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
  setHelper() {
    //红色x,绿色y,蓝色z
    const axesHelper = new THREE.AxisHelper(5);
    this.scene.add(axesHelper);
  }
  //鼠标拖拽控制
  setControl() {
    this.controls = new OrbitControls(this.camera, this.dom);
    this.controls.update();
  }
  initData() {
    if (this.objList.length > 0) {
      for (let i = 0; i < this.objList.length; i++) {
        this.InitAddObject(this.objList[i]);
      }
    }
    this.InitTooltip();
    // this.LoadSuccess();
  }
  LoadSuccess(){
    let _this=this;
    if(this.progressSuccess==20){
      console.log(this.progressSuccess)
        let load=this.dom.querySelector("#loading");
        load.style.display="none";
        clearTimeout(this.loadtimer);
    }else{
        this.loadtimer = setTimeout(function(){
            _this.LoadSuccess();
        },1000); 
    }
}
  //添加提示框
  InitTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.setAttribute('id', 'tooltip');
    this.tooltip.style.display = 'none';
    this.tooltip.style.position = 'absolute';
    this.tooltip.style.color = "#000";
    this.tooltip.style.maxWidth = "200px";
    this.tooltip.style.width = '32px';
    this.tooltip.style.height = 'auto';
    this.tooltip.style.lineHeight = "22px";
    this.tooltip.style.textAlign = "center";
    this.tooltip.style.padding = "10px";
    this.tooltip.style.background = this.tooltipBG;
    this.tooltip.style.opacity = 0.8;
    this.tooltip.style['border-radius'] = '5px';
    let tipdiv = document.createElement('div');
    tipdiv.setAttribute("id", "tipdiv");
    let tipspan = document.createElement('span');
    tipspan.style.marginLeft = "50%";
    tipspan.style.bottom = "-10px";
    tipspan.style.left = "-10px";
    tipspan.style.position = "absolute";
    tipspan.style.borderTop = "10px solid " + this.tooltipBG;
    tipspan.style.borderLeft = "10px solid transparent";
    tipspan.style.borderRight = "10px solid transparent";
    this.tooltip.appendChild(tipspan);
    this.tooltip.appendChild(tipdiv);
    this.dom.appendChild(this.tooltip);
  }

  //添加3D对象
  InitAddObject(obj) {
    if (obj.show == null || typeof (obj.show) == 'undefined' || obj.show) {
      let tempObj = null;
      switch (obj.objType) {
        case 'cube':
          tempObj = this.createCube(obj)
          this.addObject(tempObj, "scene");
          break;
        case 'wall':
          this.CreateWall(obj);
          break;
        case 'emptyCabinet':
          tempObj = this.createEmptyCabinet(obj);
          this.addObject(tempObj, "scene");
          break;
        // case 'cylinderPlant':  //自定义花
        //   tempObj = this.createCylinderPlant(obj)
        //   this.addObject(tempObj, "scene");
        //   break;
        case 'objPlant':  //模型花
          this.createObjPlant(obj);
          break;
        case 'objAnnihilator':  //模型灭火器
          this.createObjAnnihilator(obj);
          break;
        case 'objCamera':  //模型摄像头
          this.createObjCamera(obj);
          break;
        case 'objDevice':  //模型设备
          this.createMechine(obj);
          break;
        case 'objTest':
          this.createTestDube(obj)
          break;
        case 'objMechaineWall':
          this.createMechineWall(obj)
          break;
      }
    }
  }

  //创建墙
  CreateWall(obj) {
    let _this = this;
    var commonDepth = obj.depth || 40;//墙体厚度
    var commonHeight = obj.height || 100;//墙体高度
    var commonWidth = obj.width || 300;//墙体宽度
    var commonSkin = obj.style.skinColor || 0x98750f;
    //建立墙面
    obj.wallData.forEach(function (wallobj, index) {
      var wallWidth = commonWidth;
      var wallDepth = wallobj.depth || commonDepth;
      var positionX = ((wallobj.startDot.x || 0) + (wallobj.endDot.x || 0)) / 2;
      var positionY = ((wallobj.startDot.y || 0) + (wallobj.endDot.y || 0)) / 2;
      var positionZ = ((wallobj.startDot.z || 0) + (wallobj.endDot.z || 0)) / 2;
      //z相同 表示x方向为长度
      if (wallobj.startDot.z == wallobj.endDot.z) {
        wallWidth = Math.abs(wallobj.startDot.x - wallobj.endDot.x);
        wallDepth = wallobj.depth || commonDepth;
      } else if (wallobj.startDot.x == wallobj.endDot.x) {
        wallWidth = wallobj.depth || commonDepth;
        wallDepth = Math.abs(wallobj.startDot.z - wallobj.endDot.z);
      }
      var cubeobj = {
        width: wallWidth,
        height: wallobj.height || commonHeight,
        depth: wallDepth,
        rotation: wallobj.rotation,
        x: positionX,
        y: positionY,
        z: positionZ,
        uuid: wallobj.uuid,
        name: wallobj.name,
        style: {
          skinColor: commonSkin,
          skin: wallobj.skin
        }
      }
      var cube = _this.createCube(cubeobj);
      if (_this.commonFunc.hasObj(wallobj.childrens) && wallobj.childrens.length > 0) {
        wallobj.childrens.forEach(function (walchildobj, index) {
          var newobj = _this.CreateHole(walchildobj);
          cube = _this.mergeModel(walchildobj.op, cube, newobj, commonSkin);
        })
      }
      _this.addObject(cube, "scene");
    });
  }

  //模型合并 使用ThreeBSP插件mergeOP计算方式 -表示减去 +表示加上 
  mergeModel(mergeOP, fobj, sobj, commonSkin) {
    var fobjBSP = new ThreeBSP(fobj);
    var sobjBSP = new ThreeBSP(sobj);
    var resultBSP = null;
    if (mergeOP == '-') {
      resultBSP = fobjBSP.subtract(sobjBSP);
    } else if (mergeOP == '+') {
      var subMesh = new THREE.Mesh(sobj);
      sobj.updateMatrix();
      fobj.geometry.merge(sobj.geometry, sobj.matrix);
      return fobj;
      //    resultBSP = fobjBSP.union(sobjBSP);
    } else if (mergeOP == '&') {//交集
      resultBSP = fobjBSP.intersect(sobjBSP);
    } else {
      this.addObject(sobj, "scene");
      return fobj;
    }
    var cubeMaterialArray = [];
    cubeMaterialArray.push(new THREE.MeshLambertMaterial({
      vertexColors: THREE.FaceColors
    }));
    var result = resultBSP.toMesh(cubeMaterialArray);
    result.material.shading = THREE.FlatShading;
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();
    result.uuid = fobj.uuid + mergeOP + sobj.uuid;
    result.name = fobj.name + mergeOP + sobj.name;
    result.material.needsUpdate = true;
    result.geometry.buffersNeedUpdate = true;
    result.geometry.uvsNeedUpdate = true;

    result.material = fobj.material;

    for (var i = 0; i < result.geometry.faces.length; i++) {
      var faceset = false;
      for (var j = 0; j < fobj.geometry.faces; j++) {
        if (result.geometry.faces[i].vertexNormals[0].x === fobj.geometry.faces[j].vertexNormals[0].x
          && result.geometry.faces[i].vertexNormals[0].y === fobj.geometry.faces[j].vertexNormals[0].y
          && result.geometry.faces[i].vertexNormals[0].z === fobj.geometry.faces[j].vertexNormals[0].z
          && result.geometry.faces[i].vertexNormals[1].x === fobj.geometry.faces[j].vertexNormals[1].x
          && result.geometry.faces[i].vertexNormals[1].y === fobj.geometry.faces[j].vertexNormals[1].y
          && result.geometry.faces[i].vertexNormals[1].z === fobj.geometry.faces[j].vertexNormals[1].z
          && result.geometry.faces[i].vertexNormals[2].x === fobj.geometry.faces[j].vertexNormals[2].x
          && result.geometry.faces[i].vertexNormals[2].y === fobj.geometry.faces[j].vertexNormals[2].y
          && result.geometry.faces[i].vertexNormals[2].z === fobj.geometry.faces[j].vertexNormals[2].z) {
          result.geometry.faces[i].color.setHex(commonSkin);
          result.geometry.faces[i].materialIndex = fobj.geometry.faces[j].materialIndex
          faceset == true
        }
      }
      if (faceset == false) {
        for (var j = 0; j < sobj.geometry.faces.length; j++) {
          if (result.geometry.faces[i].vertexNormals[0].x === sobj.geometry.faces[j].vertexNormals[0].x
            && result.geometry.faces[i].vertexNormals[0].y === sobj.geometry.faces[j].vertexNormals[0].y
            && result.geometry.faces[i].vertexNormals[0].z === sobj.geometry.faces[j].vertexNormals[0].z
            && result.geometry.faces[i].vertexNormals[1].x === sobj.geometry.faces[j].vertexNormals[1].x
            && result.geometry.faces[i].vertexNormals[1].y === sobj.geometry.faces[j].vertexNormals[1].y
            && result.geometry.faces[i].vertexNormals[1].z === sobj.geometry.faces[j].vertexNormals[1].z
            && result.geometry.faces[i].vertexNormals[2].x === sobj.geometry.faces[j].vertexNormals[2].x
            && result.geometry.faces[i].vertexNormals[2].y === sobj.geometry.faces[j].vertexNormals[2].y
            && result.geometry.faces[i].vertexNormals[2].z === sobj.geometry.faces[j].vertexNormals[2].z) {
            result.geometry.faces[i].color.setHex(commonSkin);
            result.geometry.faces[i].materialIndex = sobj.geometry.faces[j].materialIndex;
            faceset = true;
          }
        }
      }
      if (faceset == false) {
        //最后剩余的一点点给颜色
        result.geometry.faces[i].color.setHex(commonSkin);
      }
    }

    result.castShadow = true;
    result.receiveShadow = true;
    return result;
  }
  //挖洞、玻璃、挂东西
  CreateHole(obj) {
    var commonDepth = 40;//厚度
    var commonHeight = 100;//高度
    var commonWidth = 300;//强体高度
    var commonSkin = 0x98750f;
    //建立墙面
    var wallWidth = commonWidth;
    var wallDepth = obj.depth || commonDepth;
    var positionX = ((obj.startDot.x || 0) + (obj.endDot.x || 0)) / 2;
    var positionY = ((obj.startDot.y || 0) + (obj.endDot.y || 0)) / 2;
    var positionZ = ((obj.startDot.z || 0) + (obj.endDot.z || 0)) / 2;
    //z相同 表示x方向为长度
    if (obj.startDot.z == obj.endDot.z) {
      wallWidth = Math.abs(obj.startDot.x - obj.endDot.x);
      wallDepth = obj.depth || commonDepth;
    } else if (obj.startDot.x == obj.endDot.x) {
      wallWidth = obj.depth || commonDepth;
      wallDepth = Math.abs(obj.startDot.z - obj.endDot.z);
    }
    var cubeobj = {
      width: wallWidth,
      height: obj.height || commonHeight,
      depth: wallDepth,
      rotation: obj.rotation,
      uuid: obj.uuid,
      name: obj.name,
      objType: obj.objType,
      x: positionX,
      y: positionY,
      z: positionZ,
      style: {
        skinColor: obj.skinColor || commonSkin,
        skin: obj.skin
      }
    }
    var cube = this.createCube(cubeobj);
    return cube;
  }

  //添加对象
  addObject(obj, info) {
    if (info) {
      if (info == "object") {
        this.objects.push(obj);
      }
      if (info == "scene") {
        this.scene.add(obj);
      }
    } else {
      this.objects.push(obj);
      this.scene.add(obj);
    }
  }

  // 设备
  createObjDevice(obj) {
    let _this = this;
    var mtlLoader = new MTLLoader();
    mtlLoader.load(_this.commonFunc.getPath('newt/machine.mtl'), function (materials) {
      materials.preload();
      var objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(_this.commonFunc.getPath('newt/machine.obj'), function (object) {
        obj.childrens.forEach(function (childobj) {
          var newobj = object.clone();
          if (!newobj.objHandle) {
            if (childobj.objHandle) {
              newobj.objHandle = childobj.objHandle;
            } else if (obj.objHandle) {
              newobj.objHandle = obj.objHandle;
            }
          }
          newobj = _this.handleObj(newobj);
          newobj.position.set(childobj.x || 0, childobj.y || 0, childobj.z || 0);
          console.log(newobj)
          _this.scene.add(newobj);
        });
        _this.progressSuccess += 1;
      }, _this.onProgress, _this.onError);
    });
  }

  //模型植物加载
  createObjPlant(obj) {
    let _this = this;
    var mtlLoader = new MTLLoader();
    mtlLoader.load(_this.commonFunc.getPath('plant/plant.mtl'), function (materials) {
      materials.preload();
      var objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(_this.commonFunc.getPath('plant/plant.obj'), function (object) {
        obj.childrens.forEach(function (childobj) {
          var newobj = object.clone();
          if (!newobj.objHandle) {
            if (childobj.objHandle) {
              newobj.objHandle = childobj.objHandle;
            } else if (obj.objHandle) {
              newobj.objHandle = obj.objHandle;
            }
          }
          newobj = _this.handleObj(newobj);
          newobj.position.set(childobj.x || 0, childobj.y || 0, childobj.z || 0);
          _this.scene.add(newobj);
        });
        _this.progressSuccess += 1;
      }, _this.onProgress, _this.onError);
    });
  }

  // 测试代码
  createTestDube(obj) {
    // let _this = this;
    // var mtlLoader = new MTLLoader();
    // mtlLoader.load(_this.commonFunc.getPath('ttt/test.mtl'), function (materials) {
    //   materials.preload();
    //   var objLoader = new OBJLoader();
    //   objLoader.setMaterials(materials);
    //   objLoader.load(_this.commonFunc.getPath('ttt/test.obj'), function (object) {
    //     obj.childrens.forEach(function (childobj) {
    //       var newobj = object.clone();
    //       if (!newobj.objHandle) {
    //         if (childobj.objHandle) {
    //           newobj.objHandle = childobj.objHandle;
    //         } else if (obj.objHandle) {
    //           newobj.objHandle = obj.objHandle;
    //         }
    //       }
    //       newobj = _this.handleObj(newobj);
    //       newobj.position.set(childobj.x || 0, childobj.y || 0, childobj.z || 0);
    //       _this.scene.add(newobj);
    //     });
    //     _this.progressSuccess += 1;
    //   }, _this.onProgress, _this.onError);
    // });
    // this.createObjContainMtl()
    // this.testGLTF(obj)
    this.testObj(obj)
    // this.createObjContainMtl()
  }

  testGLTF(obj) {
    //加载GLTF
    var _this = this;
    var loader = new GLTFLoader();
    console.log(_this.commonFunc.getPath('newtest/subzarmt.gltf'))
    loader.load(_this.commonFunc.getPath('newtest/subzarmt.gltf'), function (object) {
      obj.childrens.forEach(function (childobj) {
        // console.log(deepCopy)
        let newobj = object
        console.log(newobj)
        newobj.scene.position.x = childobj.x || 0
        newobj.scene.position.y = childobj.y || 0
        newobj.scene.position.z = childobj.z || 0
        console.log(childobj)
        if (childobj.handleRotale && childobj.handleRotale.length == 4) {
          newobj.scene.rotateOnAxis(new THREE.Vector3(childobj.handleRotale[0], childobj.handleRotale[1], childobj.handleRotale[2]), childobj.handleRotale[3]);
        }
        if (childobj.handleScale && childobj.handleScale.length == 3) {
          newobj.scene.scale.x = childobj.handleScale[0]
          newobj.scene.scale.y = childobj.handleScale[1]
          newobj.scene.scale.z = childobj.handleScale[2]
        }
        _this.scene.add(newobj.scene);
      });
      _this.progressSuccess += 1;
    }, (xhr) => {
      // called while loading is progressing
      console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
      })
  }
  // 加载设备
  createMechine(obj) {
    //加载GLTF
    var _this = this;
    var loader = new GLTFLoader();
    loader.load(_this.commonFunc.getPath('newt/machine.gltf'), function (object) {
      obj.childrens.forEach(function (childobj) {
        // console.log(deepCopy)
        let newobj = object
        console.log(newobj)
        newobj.scene.position.x = childobj.x || 0
        newobj.scene.position.y = childobj.y || 0
        newobj.scene.position.z = childobj.z || 0
        console.log(childobj)
        if (childobj.handleRotale && childobj.handleRotale.length == 4) {
          newobj.scene.rotateOnAxis(new THREE.Vector3(childobj.handleRotale[0], childobj.handleRotale[1], childobj.handleRotale[2]), childobj.handleRotale[3]);
        }
        if (childobj.handleScale && childobj.handleScale.length == 3) {
          newobj.scene.scale.x = childobj.handleScale[0]
          newobj.scene.scale.y = childobj.handleScale[1]
          newobj.scene.scale.z = childobj.handleScale[2]
        }
        console.log(newobj)
        _this.scene.add(newobj.scene);
        _this.addObject(newobj.scene.children[0], "object");
      });
      _this.progressSuccess += 1;
    }, (xhr) => {
      // called while loading is progressing
      console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
      })
  }
  // 加载墙
  createMechineWall(obj) {
    //加载GLTF
    var _this = this;
    var loader = new GLTFLoader();
    loader.load(_this.commonFunc.getPath('newt/model.gltf'), function (object) {
      obj.childrens.forEach(function (childobj) {
        // console.log(deepCopy)
        let newobj = object
        console.log(newobj)
        newobj.scene.position.x = childobj.x || 0
        newobj.scene.position.y = childobj.y || 0
        newobj.scene.position.z = childobj.z || 0
        console.log(childobj)
        if (childobj.handleRotale && childobj.handleRotale.length == 4) {
          newobj.scene.rotateOnAxis(new THREE.Vector3(childobj.handleRotale[0], childobj.handleRotale[1], childobj.handleRotale[2]), childobj.handleRotale[3]);
        }
        if (childobj.handleScale && childobj.handleScale.length == 3) {
          newobj.scene.scale.x = childobj.handleScale[0]
          newobj.scene.scale.y = childobj.handleScale[1]
          newobj.scene.scale.z = childobj.handleScale[2]
        }
        // var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        // var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        // var mesh = new THREE.Mesh( geometry, material )
        console.log(newobj)
        _this.addObject(newobj.scene, "scene");
        if (_this.commonFunc.hasObj(obj.size)) {
          //文本信息
          var width = obj.size.width || 70;
          var height = obj.size.height || 70;
          var canvas = document.createElement('canvas');
          canvas['width'] = width;
          canvas['height'] = height;
          var context = canvas.getContext('2d');
          context.beginPath();
          context.rect(0, 0, width, height);
          context.fillStyle = 'rgba(255, 255, 255, 0)';  //canvas设置为透明
          context.fill();

          var marker = function (context, x, y, text) {
            var color = '#ffffff';
            context.font = 12 + 'px "Microsoft Yahei" ';
            context.fillStyle = color;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.strokeStyle = color;
            context.fillText(text, x, y);
          }
          marker(context, width / 2, height / 2, obj.data.name);
          var alarmobj = {
            width: width,
            height: height,
            imgurl: canvas,
            y: obj.size.height / 2 + 1,
            transparent: true,
            opacity: 0.8,
            rotation: [{ direction: 'x', degree: -0.5 * Math.PI }],
          }
          var text = this.createPlaneGeometry(alarmobj);
          tempobj.add(text);
          //告警信息
          var url = "data:image/png;base64,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"
          var texture = new THREE.TextureLoader().load(url);
          var spriteMaterial = new THREE.SpriteMaterial({
            color: this.alarmColor.level1,//设置精灵矩形区域颜色
            map: texture,//设置精灵纹理贴图
          });
          // 创建精灵模型对象，不需要几何体geometry参数
          var sprite = new THREE.Sprite(spriteMaterial);
          sprite.position.set(obj.x, obj.y + obj.size.height / 2 + 22, obj.z);
          sprite.scale.set(25, 25, 1); // 控制精灵大小，比如可视化中精灵大小表征数据大小 只需要设置x、y两个分量就可以
          sprite.data = { "cabinetUUID": uuid, "level": "1", alarmInfo: [] }; //告警等级默认给1，给最低告警
          sprite.name = "spriteAlarm";
          sprite.visible = false;
          this.addObject(sprite);
          this.sprite.push(sprite);
        }
      });
      _this.progressSuccess += 1;
    }, (xhr) => {
      // called while loading is progressing
      console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
      })
  }
  // 测试加载模型
  testObj(obj) {
    let _this = this;
    var texture = new THREE.TextureLoader().load(_this.commonFunc.getPath('ttt/002.png'));
    var loader = new OBJLoader();
    loader.load(_this.commonFunc.getPath('plant/model2.obj'), function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
          // child.material.map = texture;
          child.material.name = "wire_153228214"
          child.material.map = texture;
          console.log(child)
        }
      });

      console.log(object)
      // _this.scene.add(object);
    })
  }
  //测试自己生成obj文件带mtl材质的
  createObjContainMtl() {
    //如果obj文件没有包含材质关联的时候，自己生成带材质的关联obj文件
    let _this = this;
    var leaftexture = new THREE.TextureLoader().load('./images/plant/Archmodels66_leaf_33.jpg');
    var soiltexture = new THREE.TextureLoader().load('./images/plant/Archmodels66_dirt_1.jpg');
    var barktexture = new THREE.TextureLoader().load('./images/plant/Archmodels66_bark_1.jpg');
    var jardinieretexture = new THREE.TextureLoader().load('./images/plant/Archmodels66_jardiniere.jpg');
    var objLoader = new OBJLoader();
    objLoader.load("./images/plant/plant.obj", function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
          if (child.name == "3DXY_geometry_769" || child.name == "3DXY_geometry_773") {
            child.material.name = "wire_153228214"
            child.material.map = leaftexture;
          } else if (child.name == "3DXY_geometry_772" || child.name == "3DXY_geometry_776" || child.name == "3DXY_geometry_777" || child.name == "3DXY_geometry_778") {
            child.material.name = "wire_108008136"
            child.material.map = barktexture;
          } else if (child.name == "3DXY_geometry_774" || child.name == "3DXY_geometry_775") {
            child.material.name = "wire_177148027"
            child.material.map = soiltexture;
          } else if (child.name == "3DXY_geometry_770") {
            child.material.name = "wire_198225087"
            child.material.map = jardinieretexture;
          }
        }
      });
      _this.scene.add(object)
      // let objExporter = new OBJExporter();
      // var output = objExporter.parse(object);
      // var link = document.createElement('a');
      // link.style.display = 'none';
      // document.body.appendChild(link);
      // link.href = URL.createObjectURL(new Blob([output], { type: 'text/plain' }));
      // link.download = "object.obj";
      // link.click();
      //然后自己制作mtl文件就可以了
    }, this.onProgress, this.onError)
  }

  handleObj(obj) {
    if (obj.objHandle != null && typeof (obj.objHandle) != 'undefined' && obj.objHandle.length > 0) {
      obj.objHandle.forEach(function (childobj) {
        // objHandle: [{ direction: 'x', ratio: 0.5 ,degree:0.5*Math.PI}], 
        switch (childobj.direction) {
          case 'x':
            if (childobj.ratio) {
              obj.scale.x = childobj.ratio;
            }
            if (childobj.degree) {
              obj.rotateX(childobj.degree);
            }
            break;
          case 'y':
            if (childobj.ratio) {
              obj.scale.y = childobj.ratio;
            }
            if (childobj.degree) {
              obj.rotateY(childobj.degree);
            }
            break;
          case 'z':
            if (childobj.ratio) {
              obj.scale.z = childobj.ratio;
            }
            if (childobj.degree) {
              obj.rotateZ(childobj.degree);
            }
            break;
          case 'arb':  //{ direction: 'arb', handleScale: [0.01,0.01,0.01], handleRotale: [0,1,0,0.5*Math.PI]}
            if (childobj.handleScale && childobj.handleScale.length == 3) {
              obj.scale.set(childobj.handleScale[0], childobj.handleScale[1], childobj.handleScale[2]);
            }
            if (childobj.handleRotale && childobj.handleRotale.length == 4) {
              obj.rotateOnAxis(new THREE.Vector3(childobj.handleRotale[0], childobj.handleRotale[1], childobj.handleRotale[2]), childobj.handleRotale[3]);
            }
            break;
        }
      });
    }
    return obj;
  }

  //进度通知
  onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      // console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
    }
  };
  //报错通知
  onError = function (xhr) {
    console.error('出现了一个加载模型的错误', xhr)
  };

  //设置旋转中心
  changePivot(obj, x, y, z) {
    let tempobj = new THREE.Object3D();
    tempobj.position.set(obj.position.x + x, obj.position.y + y, obj.position.z + z);
    obj.position.set(-x, -y, -z);
    tempobj.add(obj);
    return tempobj;
  }

  //创建皮肤材质操作
  createSkinOption(width, height, obj, cube, cubeColor, cubefacenub) {
    if (this.commonFunc.hasObj(obj)) {
      if (this.commonFunc.hasObj(obj.imgurl)) {
        var MaterParam = {
          color: cubeColor,
          map: this.createSkin(width, height, obj),
          opacity: obj.opacity || 1,
        }
        if (obj.transparent) {
          MaterParam.transparent = obj.transparent;
        }
        if (obj.blending) {
          MaterParam.blending = THREE.AdditiveBlending//使用饱和度叠加渲染
        }
        return MaterParam;
      } else {
        if (this.commonFunc.hasObj(obj.skinColor)) {
          cube.faces[cubefacenub].color.setHex(obj.skinColor);
          cube.faces[cubefacenub + 1].color.setHex(obj.skinColor);
        }
        return {
          vertexColors: THREE.FaceColors
        }
      }
    } else {
      return {
        vertexColors: THREE.FaceColors
      }
    }
  }


  //使用材质图片
  createSkin(width, height, obj) {
    var imgwidth = 128, imgheight = 128;
    if (obj.width != null && typeof (obj.width) != 'undefined') {
      imgwidth = obj.width;
    }
    if (obj.height != null && typeof (obj.height) != 'undefined') {
      imgheight = obj.height;
    }
    var texture = new THREE.TextureLoader().load(this.commonFunc.getPath(obj.imgurl));
    var repeat = false;
    if (obj.repeatx != null && typeof (obj.repeatx) != 'undefined' && obj.repeatx == true) {
      texture.wrapS = THREE.RepeatWrapping;
      repeat = true;
    }
    if (obj.repeaty != null && typeof (obj.repeaty) != 'undefined' && obj.repeaty == true) {
      texture.wrapT = THREE.RepeatWrapping;
      repeat = true;
    }
    if (repeat) {
      texture.repeat.set(width / imgwidth, height / imgheight);
    }
    return texture;
  }

  //创建盒子体
  createCube(obj) {
    var width = obj.width || 1000;  //x轴
    var height = obj.height || 10;  //y轴
    var depth = obj.depth || width;  //z轴
    var x = obj.x || 0, y = obj.y || 0, z = obj.z || 0;
    var skinColor = obj.style.hasOwnProperty('skinColor') ? obj.style.skinColor : "";
    //width：是x方向上的长度；height：是y方向上的长度；depth：是z方向上的长度；
    var cubeGeometry = new THREE.CubeGeometry(width, height, depth, 0, 0, 1);

    //六面颜色
    for (var i = 0; i < cubeGeometry.faces.length; i += 2) {
      cubeGeometry.faces[i].color.setHex(skinColor);
      cubeGeometry.faces[i + 1].color.setHex(skinColor);
    }
    //六面纹理
    var skin_up_obj = {
      vertexColors: THREE.FaceColors
    }
    var skin_down_obj = skin_up_obj,
      skin_fore_obj = skin_up_obj,
      skin_behind_obj = skin_up_obj,
      skin_left_obj = skin_up_obj,
      skin_right_obj = skin_up_obj;
    var skin_opacity = 1;
    if (obj.style != null && typeof (obj.style) != 'undefined'
      && obj.style.skin != null && typeof (obj.style.skin) != 'undefined') {
      //透明度
      if (obj.style.skin.opacity != null && typeof (obj.style.skin.opacity) != 'undefined') {
        skin_opacity = obj.style.skin.opacity;
      }
      let skin_right = obj.style.skin.hasOwnProperty("skin_right") && obj.style.skin.skin_right.hasOwnProperty('skinColor') ? obj.style.skin.skin_right.skinColor : obj.style.skin.hasOwnProperty("skinColor") ? obj.style.skin.skinColor : "";
      let skin_left = obj.style.skin.hasOwnProperty("skin_left") && obj.style.skin.skin_left.hasOwnProperty('skinColor') ? obj.style.skin.skin_left.skinColor : obj.style.skin.hasOwnProperty("skinColor") ? obj.style.skin.skinColor : "";
      let skin_up = obj.style.skin.hasOwnProperty("skin_up") && obj.style.skin.skin_up.hasOwnProperty('skinColor') ? obj.style.skin.skin_up.skinColor : obj.style.skin.hasOwnProperty("skinColor") ? obj.style.skin.skinColor : "";
      let skin_down = obj.style.skin.hasOwnProperty("skin_down") && obj.style.skin.skin_down.hasOwnProperty('skinColor') ? obj.style.skin.skin_down.skinColor : obj.style.skin.hasOwnProperty("skinColor") ? obj.style.skin.skinColor : "";
      let skin_fore = obj.style.skin.hasOwnProperty("skin_fore") && obj.style.skin.skin_fore.hasOwnProperty('skinColor') ? obj.style.skin.skin_fore.skinColor : obj.style.skin.hasOwnProperty("skinColor") ? obj.style.skin.skinColor : "";
      let skin_behind = obj.style.skin.hasOwnProperty("skin_behind") && obj.style.skin.skin_behind.hasOwnProperty('skinColor') ? obj.style.skin.skin_behind.skinColor : obj.style.skin.hasOwnProperty("skinColor") ? obj.style.skin.skinColor : "";

      //右
      skin_right_obj = this.createSkinOption(depth, height, obj.style.skin.skin_right, cubeGeometry, skin_right, 0);
      //左
      skin_left_obj = this.createSkinOption(depth, height, obj.style.skin.skin_left, cubeGeometry, skin_left, 2);
      //上
      skin_up_obj = this.createSkinOption(width, depth, obj.style.skin.skin_up, cubeGeometry, skin_up, 4);
      //下
      skin_down_obj = this.createSkinOption(width, depth, obj.style.skin.skin_down, cubeGeometry, skin_down, 6);
      //前
      skin_fore_obj = this.createSkinOption(width, height, obj.style.skin.skin_fore, cubeGeometry, skin_fore, 8);
      //后
      skin_behind_obj = this.createSkinOption(width, height, obj.style.skin.skin_behind, cubeGeometry, skin_behind, 10);
    }
    var cubeMaterialArray = [];//右，左，上，下，前，后
    //右：134、364；左：570、720；上：451、501；下：762、632；前：021、231；后：465、675；
    //正面：上左上右下左下右(0123)；后面正对看：上左上右下左下右(4567)
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_right_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_left_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_up_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_down_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_fore_obj));
    cubeMaterialArray.push(new THREE.MeshLambertMaterial(skin_behind_obj));

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterialArray);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.uuid = obj.uuid;
    cube.name = obj.name;
    cube.position.set(x, y, z);
    if (obj.rotation != null && typeof (obj.rotation) != 'undefined' && obj.rotation.length > 0) {
      obj.rotation.forEach(function (rotation_obj, index) {
        // rotation: [{ direction: 'x', degree: 0.5*Math.PI }], 
        switch (rotation_obj.direction) {
          case 'x':
            cube.rotateX(rotation_obj.degree);
            break;
          case 'y':
            cube.rotateY(rotation_obj.degree);
            break;
          case 'z':
            cube.rotateZ(rotation_obj.degree);
            break;
          case 'arb':  //{ direction: 'arb', degree: [x,y,z,angle] }  x,y,z是向量0,1,0 表示y轴旋转
            cube.rotateOnAxis(new THREE.Vector3(rotation_obj.degree[0], rotation_obj.degree[1], rotation_obj.degree[2]), rotation_obj.degree[3]);
            break;
        }
      });
    }
    return cube;
  }

  commonFunc = {
    _this: this,
    //判断对象
    hasObj: function (obj) {
      if (obj != null && typeof (obj) != 'undefined') {
        return true;
      } else {
        return false;
      }
    },
    //查找对象
    findObject: function (objname) {
      var findedobj = null;
      this.objects.forEach(function (obj, index) {
        if (obj.name != null && obj.name != '' && obj.name == objname) {
          findedobj = obj;
          return findedobj;
        }
      });
      return findedobj;
    },
    //获取路径
    getPath: function (file) {
      return this._this.BASE_PATH + file;
    },
    //生成GUID
    guid: function () {
      return (this.guidRandom() + this.guidRandom() + "-" + this.guidRandom() + "-" + this.guidRandom() + "-" + this.guidRandom() + "-" + this.guidRandom() + this.guidRandom() + this.guidRandom());
    },
    guidRandom() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
  }



  /*
    *事件部分
    */

  //鼠标按下事件
  onDocumentMouseDown(event) {
    this.dbclick++;
    var _this = this;
    setTimeout(function () { _this.dbclick = 0 }, 500);
    event.preventDefault();
    if (this.dbclick >= 2) {
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      this.mouseClick.x = (event.offsetX / this.dom.offsetWidth) * 2 - 1;
      this.mouseClick.y = -(event.offsetY / this.dom.offsetHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouseClick, this.camera);
      var intersects = this.raycaster.intersectObjects(this.objects);
      if (intersects.length > 0) {
        this.controls.enabled = false;
        let SELECTED = intersects[0].object;
        console.log(SELECTED)
        if (this.eventList != null && this.eventList.dbclick != null && this.eventList.dbclick.length > 0) {
          this.eventList.dbclick.forEach(function (_obj, index) {
            if ("string" == typeof (_obj.obj_name)) {
              if (_obj.obj_name == SELECTED.name) {
                _obj.obj_event(SELECTED, _this);
              }
            } else if (_obj.findObject != null || 'function' == typeof (_obj.findObject)) {
              if (_obj.findObject(SELECTED.name)) {
                _obj.obj_event(SELECTED, _this);
              }
            }
          })
        }
        this.controls.enabled = true;
      }
    }
  }

  //鼠标移动
  onDocumentMouseMove(event) {
    let _this = this;
    var currentElement = null;
    this.mouseClick.x = (event.offsetX / this.dom.offsetWidth) * 2 - 1;
    this.mouseClick.y = -(event.offsetY / this.dom.offsetHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouseClick, this.camera);
    var intersects = this.raycaster.intersectObjects(this.objects);
    if (intersects.length > 0) {
      let SELECTED = intersects[0].object;
      if (SELECTED.name.toString().indexOf("Factory_Unit_12") != -1) {
        currentElement = SELECTED;
      }
    }
    if (this.lastElement != currentElement) {
      clearTimeout(this.tipTimer);
      if (currentElement) {
        this.tipTimer = setTimeout(function () {
          console.log(currentElement)
          let tipInfo = "";
          if (currentElement.name.toString().indexOf("Factory_Unit_12") != -1) {
            tipInfo = 111 || currentElement.data.tipInfo;
            _this.tooltip.style.background = _this.tooltipBG;
            _this.tooltip.querySelector("span").style.borderTop = "10px solid " + _this.tooltipBG;
          }
          console.log(_this.tooltip)
          let tiplen = tipInfo.length;
          _this.tooltip.querySelector("#tipdiv").innerHTML = tipInfo
          _this.tooltip.style.width = tiplen * 15 + "px";
          _this.tooltip.style.display = 'block';
          _this.tooltip.style.left = (_this.lastEvent.pageX - _this.tooltip.clientWidth / 2) + 'px';
          _this.tooltip.style.top = (_this.lastEvent.pageY - _this.tooltip.clientHeight - 15) + 'px';
        }, 1000);
      }
    }
    //设置上一次的网元为当前网元
    this.lastElement = currentElement;
    //如果当前鼠标下没有网元，隐藏tooltip
    if (currentElement == null) {
      _this.tooltip.style.display = 'none';
    }
    //设置每次移动时鼠标的事件对象
    this.lastEvent = event;
  }

}