import meshVt from '../glsl/mesh.vert';
import meshFg from '../glsl/mesh.frag';
import { Func } from '../core/func';
import { Canvas } from '../webgl/canvas';
import { Object3D } from 'three/src/core/Object3D';
import { Conf } from '../core/conf';
import { Vector3 } from "three/src/math/Vector3";
import { Util } from '../libs/util';
import { Color } from 'three';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { BufferAttribute } from 'three/src/core/BufferAttribute';
import { Points } from 'three/src/objects/Points';
import { RawShaderMaterial } from 'three/src/materials/RawShaderMaterial';
import { Param } from '../core/param';

export class Con extends Canvas {

  private _con: Object3D;
  private _mesh:Points | undefined;
  private _ang:number = 0;
  private _val:number = 0;
  private _color:Array<Color> = [];
  private _imgSize:number = 512;
  private _sample:Array<any> = [];
  private _oldAng:number = -1;
  private _rotCnt:number = 0;

  constructor(opt: any) {
    super(opt);

    for(let i = 0; i < 10; i++) {
      this._color.push(new Color(Util.instance.random(0, 1), Util.instance.random(0, 1), Util.instance.random(0, 1)))
    }
    this._color[0] = new Color(1 - this._color[1].r, 1 - this._color[1].g, 1 - this._color[1].b)

    this._con = new Object3D()
    this.mainScene.add(this._con)

    // センサー取得
    if(!Conf.instance.FLG_TEST && window.DeviceOrientationEvent) {
      document.querySelector('.l-btn')?.addEventListener('click', () => {
        (window.DeviceOrientationEvent as any).requestPermission().then((r:any) => {
          if(r == 'granted') {
            window.addEventListener('deviceorientation', (e:DeviceOrientationEvent) => {
              if(this._oldAng != -1) {
                this._oldAng = this._val
              } else {
                this._oldAng = Number(e.alpha)
              }
              this._val = Number(e.alpha)

              // const alpha = e.alpha
              Param.instance.debug.innerHTML = 'test ' + this._val

              if((this._oldAng - this._val) > 300) {
                this._rotCnt++
              }
              if((this._oldAng - this._val) < -300) {
                this._rotCnt--
                // this._rotCnt = Math.max(0, this._rotCnt)
              }

            }, true)
            document.querySelector('.l-btn')?.classList.add('-none')
          }

        })
      })
    } else {
      document.querySelector('.l-btn')?.classList.add('-none')
    }

    // 画像解析
    this._loadImg()

    this._resize()
  }


  private _loadImg(): void {
    const img = new Image();
    img.src = Conf.instance.PATH_IMG + 'sample-0.png'

    img.onload = () => {
      const cvs:any = document.createElement('canvas');
      cvs.width = cvs.height = this._imgSize;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);
      img.style.display = 'none';

      const imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const key = ~~(i / 4)
        const ix = ~~(key % cvs.width)
        const iy = ~~(key / cvs.width)
        const r = data[i + 0] // 0 ~ 255
        const g = data[i + 1] // 0 ~ 255
        const b = data[i + 2] // 0 ~ 255
        const a = data[i + 3] // 0 ~ 255

        const kake = 1
        if(a > 0) {
          this._sample.push({
            color:new Color(r / 255, g / 255, b / 255),
            pos:new Vector3(
              (ix - this._imgSize * 0.5) * kake,
              ((iy - this._imgSize * 0.5) * -1) * kake,
              0
            )
          })
        }

      }
      console.log(this._sample.length);
      this._makeMesh();
    }
  }



  private _makeMesh(): void {
    this._mesh = new Points(
      this.getGeo(),
      new RawShaderMaterial({
          vertexShader:meshVt,
          fragmentShader:meshFg,
          transparent:true,
          depthTest:false,
          uniforms:{
              alpha:{value:0},
              size:{value:2},
              time:{value:0},
              ang:{value:0},
          }
      })
    )
    this._con.add(this._mesh)
  }



  protected _update(): void {
    super._update()
    this._con.position.y = Func.instance.screenOffsetY() * -1

    if(Conf.instance.FLG_TEST) {
      this._oldAng = this._val
      this._val += 2
      this._val = this._val % 360

      if((this._oldAng - this._val) > 300) {
        this._rotCnt++
      }
    } else {
      // this._oldAng = this._val
      // if((this._oldAng - this._val) > 300) {
      //   this._rotCnt++
      // }
      // if((this._oldAng - this._val) < -300) {
      //   this._rotCnt--
      // }
    }

    if(this._mesh != undefined) {
      const s = Func.instance.r(3)
      this._mesh.scale.set(s, s, 1)

      this._setUni(this._mesh, 'size', 5)

      const ang = this._val + (this._rotCnt * 360);
      this._ang += (ang - this._ang) * 0.1
      this._setUni(this._mesh, 'ang', Util.instance.radian(this._ang))
    }

    if (this.isNowRenderFrame()) {
      this._render()
    }
  }


  private _render(): void {
    const bgColor = 0x000000
    this.renderer.setClearColor(bgColor, 1)
    this.renderer.render(this.mainScene, this.camera)
  }


  public isNowRenderFrame(): boolean {
    return this.isRender
  }


  _resize(isRender: boolean = true): void {
    super._resize();

    const w = Func.instance.sw();
    const h = Func.instance.sh();

    if(Conf.instance.IS_SP || Conf.instance.IS_TAB) {
      if(w == this.renderSize.width && this.renderSize.height * 2 > h) {
        return
      }
    }

    this.renderSize.width = w;
    this.renderSize.height = h;

    this.updateCamera(this.camera, w, h);

    let pixelRatio: number = window.devicePixelRatio || 1;

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(w, h);
    this.renderer.clear();

    if (isRender) {
      this._render();
    }
  }


  // ---------------------------------
  //
  // ---------------------------------
  public getGeo():BufferGeometry {
    const num = this._sample.length

    const geometry = new BufferGeometry()

    const translate = new Float32Array(num * 3)
    const info = new Float32Array(num * 3)
    const color = new Float32Array(num * 3)

    let pKey = 0
    let i = 0
    while(i < num) {
        const p = this._sample[i].pos
        const col = this._sample[i].color

        translate[pKey*3+0] = p.x
        translate[pKey*3+1] = p.y
        translate[pKey*3+2] = 0

        info[pKey*3+0] = Math.sqrt(p.x * p.x + p.y * p.y)
        info[pKey*3+1] = 0
        info[pKey*3+2] = 0

        color[pKey*3+0] = col.r
        color[pKey*3+1] = col.g
        color[pKey*3+2] = col.b

        pKey++
        i++
    }

    geometry.setAttribute('position', new BufferAttribute(translate, 3))
    geometry.setAttribute('info', new BufferAttribute(info, 3))
    geometry.setAttribute('color', new BufferAttribute(color, 3))
    geometry.computeBoundingSphere()

    return geometry
  }

}
