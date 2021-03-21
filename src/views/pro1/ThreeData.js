export const ThreeData = {
  objects: [
    //地板
    {
      show: true,
      uuid: "",
      name: 'floor',
      objType: 'cube',
      width: 3000,
      depth: 2000,
      height: 10,
      style: {
        skinColor: 0x42bfff,
        skin: {
          skin_up: {
            imgurl: "floor.jpg",
            repeatx: true,
            repeaty: true,
            width: 128,
            height: 128
          },
        }
      }
    },
    //墙体
    {
      show: true,
      uuid: "",
      name: 'wall',
      objType: 'wall',
      depth: 20,
      width: 100, //根据实际的宽度来的
      height: 240,
      style: {
        skinColor: 0x42bfff,
      },
      wallData: [
        {//前面墙
          uuid: "",
          name: 'wall1',
          skin: {
            skin_behind: {
              skinColor: 0x42bfff,
              imgurl: 'wall.png',
              repeatx: true,
              repeaty: true,
              width: 128,
              height: 128
            }
          },
          startDot: {
            x: -1300,
            y: 120,
            z: 800
          },
          endDot: {
            x: 1300,
            y: 120,
            z: 800
          },
          childrens: [
            {
              op: '-',
              show: true,
              uuid: "",
              name: 'windowHole',
              objType: 'windowHole',
              depth: 20,
              height: 220,
              startDot: {
                x: -1200,
                y: 130,
                z: 800
              },
              endDot: {
                x: 1200,
                y: 130,
                z: 800
              }
            },
            {
              show: true,
              name: 'windowCaseBottom',
              uuid: "",
              objType: 'cube',
              depth: 30,
              height: 10,
              startDot: {
                x: -1200,
                y: 20,
                z: 800
              },
              endDot: {
                x: 1200,
                y: 20,
                z: 800
              },
              skinColor: 0xc0dee0,
            },
            {
              show: true,
              uuid: "",
              name: 'windowGlasses',
              objType: 'glasses',
              depth: 5,
              height: 220,
              skin: {
                skin_fore: {
                  imgurl: "glass.png",
                  transparent: true,
                  opacity: 0.25,
                  repeatx: true,
                  repeaty: true,
                },
                skin_behind: {
                  imgurl: "glass.png",
                  transparent: true,
                  opacity: 0.25,
                  repeatx: true,
                  repeaty: true,
                },
              },
              startDot: {
                x: -1200,
                y: 130,
                z: 800
              },
              endDot: {
                x: 1200,
                y: 130,
                z: 800
              }
            },
          ]
        },
        {//后面墙
          uuid: "",
          name: 'wall2',
          skin: {
            skin_fore: {
              skinColor: 0x42bfff,
              imgurl: "wall.png",
              repeatx: true,
              repeaty: true,
              width: 128,
              height: 128
            },

          },
          startDot: {
            x: -1300,
            y: 120,
            z: -800
          },
          endDot: {
            x: 1300,
            y: 120,
            z: -800
          },
          childrens: [

          ]
        },
        {//左面墙
          uuid: "",
          name: 'wall3',
          skin: {
            skin_right: {
              skinColor: 0x42bfff,
              imgurl: "wall.png",
              repeatx: true,
              repeaty: true,
              width: 128,
              height: 128
            },
          },
          startDot: {
            x: -1290,
            y: 120,
            z: -800
          },
          endDot: {
            x: -1290,
            y: 120,
            z: 800
          },
        },
        {//右面墙
          uuid: "",
          name: 'wall4',
          skin: {
            skin_left: {
              skinColor: 0x42bfff,
              imgurl: "wall.png",
              repeatx: true,
              repeaty: true,
              width: 128,
              height: 128
            }
          },
          startDot: {
            x: 1290,
            y: 120,
            z: -800
          },
          endDot: {
            x: 1290,
            y: 120,
            z: 800
          },
          childrens: [

          ]
        },
      ],
    },
    // 模型设备
    {
      show: true,
      uuid: "",
      name: 'deviceaa',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -1000,
          y: 0,
          z: -700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -1000,
          y: 0,
          z: -600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -1000,
          y: 0,
          z: -400,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -1000,
          y: 0,
          z: -300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -1000,
          y: 0,
          z: -200,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -1000,
          y: 0,
          z: 300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -1000,
          y: 0,
          z: 600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -1000,
          y: 0,
          z: 700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: -700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: -600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: -500,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: -400,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: -300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: -200,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: 300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: 500,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: 600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -834,
          y: 0,
          z: 700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: 700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: 600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: 500,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: 300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: -200,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: -300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: -400,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: -500,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: -600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -668,
          y: 0,
          z: -700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceaa',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -500,
          y: 0,
          z: -700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -500,
          y: 0,
          z: -600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -500,
          y: 0,
          z: -400,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -500,
          y: 0,
          z: -300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -500,
          y: 0,
          z: -200,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -500,
          y: 0,
          z: 300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -500,
          y: 0,
          z: 600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -500,
          y: 0,
          z: 700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: 700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: 600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: 500,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: 300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: -200,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: -300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: -400,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: -500,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: -600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -334,
          y: 0,
          z: -700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -166,
          y: 0,
          z: 700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -166,
          y: 0,
          z: 600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -166,
          y: 0,
          z: 500,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: -166,
          y: 0,
          z: 300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceaa',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: 0,
          y: 0,
          z: -700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: 0,
          y: 0,
          z: -600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: 0,
          y: 0,
          z: -400,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },

    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      size:{width:70,depth:70,height:200, thick:2},
      x:-350, y: 100, z: -220,
      rotation: [{ direction: 'y', degree: 0.5*Math.PI}],
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: 0,
          y: 0,
          z: -300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: 0,
          y: 0,
          z: -200,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: 0,
          y: 0,
          z: 300,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: 0,
          y: 0,
          z: 600,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'deviceab',
      objType: 'objDevice',
      childrens: [
        {
          name: "device-2",
          uuid: "",
          x: 0,
          y: 0,
          z: 700,
          handleScale: [0.1,0.1,0.1]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: -1000,
          y: 120,
          z: 0,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: -500,
          y: 120,
          z: 0,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: 0,
          y: 120,
          z: 0,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: 500,
          y: 120,
          z: 0,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: 1000,
          y: 120,
          z: 0,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: -1000,
          y: 120,
          z: 500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: -500,
          y: 120,
          z: 500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: 0,
          y: 120,
          z: 500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: 500,
          y: 120,
          z: 500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: 1000,
          y: 120,
          z: 500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: -1000,
          y: 120,
          z: -500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: -500,
          y: 120,
          z: -500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: 0,
          y: 120,
          z: -500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: 500,
          y: 120,
          z: -500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    {
      show: true,
      uuid: "",
      name: 'mechineWall1',
      objType: 'objMechaineWall',
      childrens: [
        {
          name: "mechineWall1",
          uuid: "",
          x: 1000,
          y: 120,
          z: -500,
          handleRotale: [0, 1, 0, -0.5 * Math.PI],
          handleScale: [0.2, 0.5, 0.3]
        },
      ]
    },
    //模型植物
    // {
    //   show: true,
    //   uuid: "",
    //   name: 'plant',
    //   objType: 'objPlant',
    //   objHandle: [{ direction: 'arb', handleScale: [0.1, 0.1, 0.1] }],
    //   childrens: [
    //     {
    //       name: "plant-right",
    //       uuid: "",
    //       x: 460,
    //       y: 0,
    //       z: 510,
    //     },
    //     {
    //       name: "plant-left",
    //       uuid: "",
    //       x: 120,
    //       y: 0,
    //       z: 510,
    //     }
    //   ]
    // },
  ]
}