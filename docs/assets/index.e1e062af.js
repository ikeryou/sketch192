var T=Object.defineProperty;var D=(l,e,t)=>e in l?T(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var s=(l,e,t)=>(D(l,typeof e!="symbol"?e+"":e,t),t);import{d as m,W as G,S as F,O as q,V as P,a as N,G as W,C as w,b as B,P as U,R as V,B as X,c as S}from"./vendor.a277b163.js";const j=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}};j();var k=`precision highp float;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;

uniform float size;
uniform float time;
uniform float ang;

attribute vec3 position;
attribute vec3 info;
attribute vec3 color;

varying vec3 vColor;

float map(float value, float beforeMin, float beforeMax, float afterMin, float afterMax) {
  return afterMin + (afterMax - afterMin) * ((value - beforeMin) / (beforeMax - beforeMin));
}

vec3 rotate(vec3 p, float angle, vec3 axis){
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    mat3 m = mat3(
        a.x * a.x * r + c,
        a.y * a.x * r + a.z * s,
        a.z * a.x * r - a.y * s,
        a.x * a.y * r - a.z * s,
        a.y * a.y * r + c,
        a.z * a.y * r + a.x * s,
        a.x * a.z * r + a.y * s,
        a.y * a.z * r - a.x * s,
        a.z * a.z * r + c
    );
    return m * p;
}

void main(){
  vColor = color;

  vec3 p = position;

  p = rotate(p, ang * info.x * 0.001, vec3(0.0, 0.0, 1.0));

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size;
}`,K=`precision highp float;

varying vec3 vColor;

void main(void) {
  gl_FragColor = vec4(vColor, 1.0);
}`;class u{constructor(){}}s(u,"LG",0),s(u,"XS",1);const y=class{constructor(){}static get instance(){return this._instance||(this._instance=new y),this._instance}random(e,t){return Math.random()*(t-e)+e}random2(e,t){let i=Math.random()*(t-e)+e;return this.hit(2)&&(i*=-1),i}randomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}hit(e=0){return e<2&&(e=2),this.randomInt(0,e-1)==0}randomArr(e){return e[this.randomInt(0,e.length-1)]}range(e){return this.random(-e,e)}clamp(e,t,i){return Math.min(i,Math.max(e,t))}map(e,t,i,n,r){if(e<=n)return t;if(e>=r)return i;const a=(i-t)/(r-n);return(e-n)*a+t}mix(e,t,i){return e*(1-i)+t*i}radian(e){return e*Math.PI/180}degree(e){return e*180/Math.PI}shuffle(e){let t=e.length;for(;--t;){let i=Math.floor(Math.random()*(t+1));if(t==i)continue;let n=e[t];e[t]=e[i],e[i]=n}}replaceAll(e,t,i){return e.split(t).join(i)}sort(e,t,i=!0){i?e.sort((n,r)=>r[t]-n[t]):e.sort((n,r)=>n[t]-r[t])}distance(e,t,i,n){const r=e-i,a=t-n;return Math.sqrt(r*r+a*a)}numStr(e,t){let i=String(e);if(i.length>=t)return i;const n=t-i.length;let r=0;for(;r<n;)i="0"+i,r++;return i}isIE(){const e=window.navigator.userAgent.toLowerCase();return e.indexOf("msie")!=-1||e.indexOf("trident/7")!=-1||e.indexOf("edge")!=-1}isIE2(){const e=window.navigator.userAgent.toLowerCase();return e.indexOf("msie")!=-1||e.indexOf("trident/7")!=-1}isWin(){return window.navigator.platform.indexOf("Win")!=-1}isChrome(){return window.navigator.userAgent.toLowerCase().indexOf("chrome")!=-1}isFF(){return window.navigator.userAgent.toLowerCase().indexOf("firefox")!=-1}isSafari(){return window.navigator.userAgent.toLowerCase().indexOf("safari")!=-1&&!this.isChrome()}useWebGL(){try{const e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");return!!(window.WebGLRenderingContext&&t&&t.getShaderPrecisionFormat)}catch{return!1}}getQuery(e){e=e.replace(/[€[]/,"\u20AC\u20AC\u20AC[").replace(/[€]]/,"\u20AC\u20AC\u20AC]");const i=new RegExp("[\u20AC\u20AC?&]"+e+"=([^&//]*)").exec(window.location.href);return i==null?"":i[1]}isTouchDevice(){return"ontouchstart"in window||navigator!=null&&navigator.maxTouchPoints>0}isPc(){return m.mobile()==!1}isSp(){return m.mobile()}isAod(){return m.android()}isIPhone(){return m.iphone()}isIPad(){return m.tablet()}};let o=y;s(o,"_instance");const C=class{constructor(){s(this,"FLG_PARAM",location.href.includes("p=yes"));s(this,"FLG_STATS",location.href.includes("p=yes"));s(this,"FLG_TEST",location.href.includes("10.0.1.33")||location.href.includes("localhost"));s(this,"PATH_IMG","./assets/img/");s(this,"USE_TOUCH",o.instance.isTouchDevice());s(this,"BREAKPOINT",768);s(this,"LG_PSD_WIDTH",1600);s(this,"XS_PSD_WIDTH",750);s(this,"IS_SIMPLE",o.instance.isPc()&&o.instance.isSafari());s(this,"IS_PC",o.instance.isPc());s(this,"IS_SP",o.instance.isSp());s(this,"IS_AND",o.instance.isAod());s(this,"IS_TAB",o.instance.isIPad());s(this,"USE_ROLLOVER",o.instance.isPc()&&!o.instance.isIPad())}static get instance(){return this._instance||(this._instance=new C),this._instance}};let c=C;s(c,"_instance");const A=class{constructor(){s(this,"_useFullScreen",o.instance.isSp()||o.instance.isIPad())}static get instance(){return this._instance||(this._instance=new A),this._instance}ratio(){return window.devicePixelRatio||1}px(e){return e+"px"}useScreen(){return screen!=null}sw(){return window.innerWidth}sh(){return this._useFullScreen?screen.height:window.innerHeight}screenOffsetY(){return(window.innerHeight-this.sh())*.5}screen(){return window.innerWidth<=c.instance.BREAKPOINT?u.XS:u.LG}isXS(){return this.screen()==u.XS}isLG(){return this.screen()==u.LG}val(e,t){return this.isXS()?e:t}r(e){const t=this.val(c.instance.XS_PSD_WIDTH,c.instance.LG_PSD_WIDTH);return e/t*this.sw()}sin1(e){return Math.sin(e)+Math.sin(2*e)}sin2(e){return(Math.sin(e)+Math.sin(2.2*e+5.52)+Math.sin(2.9*e+.93)+Math.sin(4.6*e+8.94))/4}};let _=A;s(_,"_instance");class Y{constructor(e={}){s(this,"opt");s(this,"el");this.opt=e,this.el=this.opt.el}init(){}dispose(){this.opt=null,this.el=null}getEl(){return this.el}hasData(e){return this.getEl().getAttribute(e)!=null}getData(e,t){const i=this.getEl().getAttribute(e);return i==null?t:i}qs(e){return this.el.querySelector(e)}qsAll(e){return this.el.querySelectorAll(e)}hasClass(e){return this.el.classList.contains(e)}addClass(e){this.el.classList.add(e)}attachClass(e,t){e!=null&&e.classList.add(t)}detachClass(e,t){e!=null&&e.classList.remove(t)}removeClass(e){this.el.classList.remove(e)}getWidth(e){var i;let t=(i=document.defaultView)==null?void 0:i.getComputedStyle(e,null).width;return Number(t==null?void 0:t.replace("px",""))}getHeight(e){var t;if(e==null)return 0;{let i=(t=document.defaultView)==null?void 0:t.getComputedStyle(e,null).height;return Number(i==null?void 0:i.replace("px",""))}}getRect(e){var i;const t=(i=document.defaultView)==null?void 0:i.getComputedStyle(e,null);return t!=null?{width:Number(t.width.replace("px","")),height:Number(t.height.replace("px",""))}:{}}getDataNumber(e){const t=this.getEl().getAttribute(e);return t==null?0:Number(t)}getOffsetTop(e){const t=e.getBoundingClientRect();var i=window.pageYOffset||document.documentElement.scrollTop;return t.top+i}getOffset(e){const t=e.getBoundingClientRect();var i=window.pageYOffset||document.documentElement.scrollTop;return{y:t.top+i,x:t.left}}_call(e,t=null){e!=null&&(t!=null?e(t):e())}}const L=class{constructor(){s(this,"cnt",0);s(this,"_updateList",[]);s(this,"play",!0);s(this,"_update",()=>{if(this.play){this.cnt++;for(var e of this._updateList)e!=null&&e();window.requestAnimationFrame(this._update)}});window.requestAnimationFrame(this._update)}static get instance(){return this._instance||(this._instance=new L),this._instance}add(e){this._updateList.push(e)}remove(e){const t=[];this._updateList.forEach(i=>{i!=e&&t.push(i)}),this._updateList=t}};let g=L;s(g,"_instance");class x{constructor(e=0,t=0,i=0,n=0){s(this,"x",0);s(this,"y",0);s(this,"width",0);s(this,"height",0);this.x=e,this.y=t,this.width=i,this.height=n}}const O=class{constructor(){s(this,"_list",[]);s(this,"_timer",null);s(this,"size",new x);s(this,"oldSize",new x);s(this,"_call",()=>{for(var e of this._list)e!=null&&e()});window.addEventListener("resize",()=>{this._eResize()},!1)}static get instance(){return this._instance||(this._instance=new O),this._instance}_eResize(){this._setStageSize(),this._timer===null&&(clearInterval(this._timer),this._timer=null),this._timer=setTimeout(()=>{this._call(),this.oldSize.width=this.size.width,this.oldSize.height=this.size.height},300)}_setStageSize(){this.size.width=window.innerWidth,this.size.height=window.innerHeight}add(e){this._list.push(e)}remove(e){const t=[];this._list.forEach(i=>{i!=e&&t.push(i)}),this._list=t}};let p=O;s(p,"_instance");class Q{constructor(e=0,t=0){s(this,"x",0);s(this,"y",0);this.x=e,this.y=t}set(e=0,t=0){this.x=e,this.y=t}copy(e){this.x=e.x,this.y=e.y}}class J extends Y{constructor(e={}){super(e);s(this,"_updateHandler");s(this,"_resizeHandler");s(this,"_c",0);s(this,"_isEnter",!1);s(this,"_isOneEnter",!1);s(this,"_observer");s(this,"_elPos",new Q(0,9999));s(this,"_eRollOverHandler");s(this,"_eRollOutHandler");(e.isDefEvent==null||e.isDefEvent)&&(this._updateHandler=this._update.bind(this),g.instance.add(this._updateHandler),this._resizeHandler=this._resize.bind(this),p.instance.add(this._resizeHandler))}init(){super.init()}_setHover(){this._eRollOverHandler=this._eRollOver.bind(this),this._eRollOutHandler=this._eRollOut.bind(this),this.getEl().addEventListener("mouseenter",this._eRollOverHandler),this.getEl().addEventListener("mouseleave",this._eRollOutHandler)}_disposeHover(){this._eRollOverHandler!=null&&(this.getEl().removeEventListener("mouseenter",this._eRollOverHandler),this.getEl().removeEventListener("mouseleave",this._eRollOutHandler),this._eRollOverHandler=null,this._eRollOutHandler=null)}_eRollOver(){}_eRollOut(){}_setObserver(){this._observer=new IntersectionObserver(e=>{e!=null&&e.forEach(t=>{t!=null&&t.intersectionRatio>0?this._eEnter():this._eLeave()})},{root:null}),setTimeout(()=>{if(this._observer!=null&&this._observer!=null){const e=this.getEl();e!=null&&this._observer.observe(e)}},100)}_eEnter(){this._isEnter=!0}_eLeave(){this._isEnter=!1}_disposeObserver(){(this._observer!=null||this._observer!=null)&&(this._observer.unobserve(this.getEl()),this._observer=null)}dispose(){this._updateHandler!=null&&(g.instance.remove(this._updateHandler),this._updateHandler=null),this._resizeHandler!=null&&(p.instance.remove(this._resizeHandler),this._resizeHandler=null),this._disposeHover(),this._disposeObserver(),super.dispose()}css(e,t){const i=e.style;for(var n in t)i[n]=t[n]}_update(){this._c++}_resize(){}}class Z extends J{constructor(e={}){super(e);s(this,"camera");s(this,"renderer");s(this,"mainScene");s(this,"isRender",!0);s(this,"renderSize",new x);let t={canvas:this.el,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"low-power"};this.renderer=new G(t),this.renderer.autoClear=!0,this.renderer.setClearColor(16777215,1),this.mainScene=new F,this.camera=this._makeCamera(),this.updateCamera(this.camera,10,10)}init(){super.init()}_makeCamera(){return new q(1,1,1,1)}updateCamera(e,t=10,i=10){this._updateOrthCamera(e,t,i)}_updateOrthCamera(e,t=10,i=10){e.left=-t*.5,e.right=t*.5,e.top=i*.5,e.bottom=-i*.5,e.near=-1e4,e.far=1e5,e.updateProjectionMatrix(),e.position.set(0,0,0),e.lookAt(new P(0,0,0))}_update(){super._update()}_getUni(e){return e.material.uniforms}_setUni(e,t,i){const n=this._getUni(e);n[t].value=i}}class v{constructor(){}}s(v,"HIGH",0),s(v,"MIDDLE",1),s(v,"LOW",2);const E=class{constructor(){s(this,"fps",v.MIDDLE);s(this,"debug",document.querySelector(".l-debug"));s(this,"_dat");s(this,"_stats");s(this,"main",{bgColor:{value:15790320,type:"color"}});c.instance.FLG_PARAM&&this.makeParamGUI(),c.instance.FLG_STATS&&(this._stats=N(),document.body.appendChild(this._stats.domElement)),g.instance.add(()=>{this._update()})}_update(){this._stats!=null&&this._stats.update()}static get instance(){return this._instance||(this._instance=new E),this._instance}makeParamGUI(){this._dat==null&&(this._dat=new W,this._add(this.main,"main"))}_add(e,t){const i=this._dat.addFolder(t);for(var n in e){const r=e[n];r.use==null&&(r.type=="color"?i.addColor(r,"value").name(n):r.list!=null?i.add(r,"value",r.list).name(n):i.add(r,"value",r.min,r.max).name(n))}}};let b=E;s(b,"_instance");class $ extends Z{constructor(e){super(e);s(this,"_con");s(this,"_mesh");s(this,"_ang",0);s(this,"_val",0);s(this,"_color",[]);s(this,"_imgSize",512);s(this,"_sample",[]);s(this,"_oldAng",-1);s(this,"_rotCnt",0);var t,i;for(let n=0;n<10;n++)this._color.push(new w(o.instance.random(0,1),o.instance.random(0,1),o.instance.random(0,1)));this._color[0]=new w(1-this._color[1].r,1-this._color[1].g,1-this._color[1].b),this._con=new B,this.mainScene.add(this._con),!c.instance.FLG_TEST&&window.DeviceOrientationEvent?(t=document.querySelector(".l-btn"))==null||t.addEventListener("click",()=>{window.DeviceOrientationEvent.requestPermission().then(n=>{var r;n=="granted"&&(window.addEventListener("deviceorientation",a=>{this._oldAng!=-1?this._oldAng=this._val:this._oldAng=Number(a.alpha),this._val=Number(a.alpha),b.instance.debug.innerHTML="test "+this._val,this._oldAng-this._val>300&&this._rotCnt++,this._oldAng-this._val<-300&&this._rotCnt--},!0),(r=document.querySelector(".l-btn"))==null||r.classList.add("-none"))})}):(i=document.querySelector(".l-btn"))==null||i.classList.add("-none"),this._loadImg(),this._resize()}_loadImg(){const e=new Image;e.src=c.instance.PATH_IMG+"sample-0.png",e.onload=()=>{const t=document.createElement("canvas");t.width=t.height=this._imgSize;const i=t.getContext("2d");i.drawImage(e,0,0),e.style.display="none";const r=i.getImageData(0,0,t.width,t.height).data;for(let a=0;a<r.length;a+=4){const d=~~(a/4),h=~~(d%t.width),f=~~(d/t.width),I=r[a+0],M=r[a+1],H=r[a+2],R=r[a+3],z=1;R>0&&this._sample.push({color:new w(I/255,M/255,H/255),pos:new P((h-this._imgSize*.5)*z,(f-this._imgSize*.5)*-1*z,0)})}console.log(this._sample.length),this._makeMesh()}}_makeMesh(){this._mesh=new U(this.getGeo(),new V({vertexShader:k,fragmentShader:K,transparent:!0,depthTest:!1,uniforms:{alpha:{value:0},size:{value:2},time:{value:0},ang:{value:0}}})),this._con.add(this._mesh)}_update(){if(super._update(),this._con.position.y=_.instance.screenOffsetY()*-1,c.instance.FLG_TEST&&(this._oldAng=this._val,this._val+=2,this._val=this._val%360,this._oldAng-this._val>300&&this._rotCnt++),this._mesh!=null){const e=_.instance.r(3);this._mesh.scale.set(e,e,1),this._setUni(this._mesh,"size",5);const t=this._val+this._rotCnt*360;this._ang+=(t-this._ang)*.1,this._setUni(this._mesh,"ang",o.instance.radian(this._ang))}this.isNowRenderFrame()&&this._render()}_render(){this.renderer.setClearColor(0,1),this.renderer.render(this.mainScene,this.camera)}isNowRenderFrame(){return this.isRender}_resize(e=!0){super._resize();const t=_.instance.sw(),i=_.instance.sh();if((c.instance.IS_SP||c.instance.IS_TAB)&&t==this.renderSize.width&&this.renderSize.height*2>i)return;this.renderSize.width=t,this.renderSize.height=i,this.updateCamera(this.camera,t,i);let n=window.devicePixelRatio||1;this.renderer.setPixelRatio(n),this.renderer.setSize(t,i),this.renderer.clear(),e&&this._render()}getGeo(){const e=this._sample.length,t=new X,i=new Float32Array(e*3),n=new Float32Array(e*3),r=new Float32Array(e*3);let a=0,d=0;for(;d<e;){const h=this._sample[d].pos,f=this._sample[d].color;i[a*3+0]=h.x,i[a*3+1]=h.y,i[a*3+2]=0,n[a*3+0]=Math.sqrt(h.x*h.x+h.y*h.y),n[a*3+1]=0,n[a*3+2]=0,r[a*3+0]=f.r,r[a*3+1]=f.g,r[a*3+2]=f.b,a++,d++}return t.setAttribute("position",new S(i,3)),t.setAttribute("info",new S(n,3)),t.setAttribute("color",new S(r,3)),t.computeBoundingSphere(),t}}new $({el:document.querySelector("#js-con")});