function pb(e,t){for(var r=0;r<t.length;r++){const o=t[r];if(typeof o!="string"&&!Array.isArray(o)){for(const i in o)if(i!=="default"&&!(i in e)){const s=Object.getOwnPropertyDescriptor(o,i);s&&Object.defineProperty(e,i,s.get?s:{enumerable:!0,get:()=>o[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();var el=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Kc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function mb(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function o(){return this instanceof o?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(o){var i=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(r,o,i.get?i:{enumerable:!0,get:function(){return e[o]}})}),r}var M0={exports:{}},Qc={},$0={exports:{}},Re={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ba=Symbol.for("react.element"),xb=Symbol.for("react.portal"),gb=Symbol.for("react.fragment"),vb=Symbol.for("react.strict_mode"),wb=Symbol.for("react.profiler"),yb=Symbol.for("react.provider"),bb=Symbol.for("react.context"),jb=Symbol.for("react.forward_ref"),Sb=Symbol.for("react.suspense"),kb=Symbol.for("react.memo"),Nb=Symbol.for("react.lazy"),_m=Symbol.iterator;function Cb(e){return e===null||typeof e!="object"?null:(e=_m&&e[_m]||e["@@iterator"],typeof e=="function"?e:null)}var L0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},I0=Object.assign,A0={};function Ji(e,t,r){this.props=e,this.context=t,this.refs=A0,this.updater=r||L0}Ji.prototype.isReactComponent={};Ji.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ji.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function D0(){}D0.prototype=Ji.prototype;function Hf(e,t,r){this.props=e,this.context=t,this.refs=A0,this.updater=r||L0}var Vf=Hf.prototype=new D0;Vf.constructor=Hf;I0(Vf,Ji.prototype);Vf.isPureReactComponent=!0;var Em=Array.isArray,F0=Object.prototype.hasOwnProperty,qf={current:null},B0={key:!0,ref:!0,__self:!0,__source:!0};function U0(e,t,r){var o,i={},s=null,a=null;if(t!=null)for(o in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(s=""+t.key),t)F0.call(t,o)&&!B0.hasOwnProperty(o)&&(i[o]=t[o]);var c=arguments.length-2;if(c===1)i.children=r;else if(1<c){for(var l=Array(c),d=0;d<c;d++)l[d]=arguments[d+2];i.children=l}if(e&&e.defaultProps)for(o in c=e.defaultProps,c)i[o]===void 0&&(i[o]=c[o]);return{$$typeof:Ba,type:e,key:s,ref:a,props:i,_owner:qf.current}}function _b(e,t){return{$$typeof:Ba,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Yf(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ba}function Eb(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var Tm=/\/+/g;function ru(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Eb(""+e.key):t.toString(36)}function Tl(e,t,r,o,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Ba:case xb:a=!0}}if(a)return a=e,i=i(a),e=o===""?"."+ru(a,0):o,Em(i)?(r="",e!=null&&(r=e.replace(Tm,"$&/")+"/"),Tl(i,t,r,"",function(d){return d})):i!=null&&(Yf(i)&&(i=_b(i,r+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(Tm,"$&/")+"/")+e)),t.push(i)),1;if(a=0,o=o===""?".":o+":",Em(e))for(var c=0;c<e.length;c++){s=e[c];var l=o+ru(s,c);a+=Tl(s,t,r,l,i)}else if(l=Cb(e),typeof l=="function")for(e=l.call(e),c=0;!(s=e.next()).done;)s=s.value,l=o+ru(s,c++),a+=Tl(s,t,r,l,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function tl(e,t,r){if(e==null)return e;var o=[],i=0;return Tl(e,o,"","",function(s){return t.call(r,s,i++)}),o}function Tb(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ar={current:null},Pl={transition:null},Pb={ReactCurrentDispatcher:ar,ReactCurrentBatchConfig:Pl,ReactCurrentOwner:qf};Re.Children={map:tl,forEach:function(e,t,r){tl(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return tl(e,function(){t++}),t},toArray:function(e){return tl(e,function(t){return t})||[]},only:function(e){if(!Yf(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Re.Component=Ji;Re.Fragment=gb;Re.Profiler=wb;Re.PureComponent=Hf;Re.StrictMode=vb;Re.Suspense=Sb;Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Pb;Re.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=I0({},e.props),i=e.key,s=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,a=qf.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in t)F0.call(t,l)&&!B0.hasOwnProperty(l)&&(o[l]=t[l]===void 0&&c!==void 0?c[l]:t[l])}var l=arguments.length-2;if(l===1)o.children=r;else if(1<l){c=Array(l);for(var d=0;d<l;d++)c[d]=arguments[d+2];o.children=c}return{$$typeof:Ba,type:e.type,key:i,ref:s,props:o,_owner:a}};Re.createContext=function(e){return e={$$typeof:bb,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:yb,_context:e},e.Consumer=e};Re.createElement=U0;Re.createFactory=function(e){var t=U0.bind(null,e);return t.type=e,t};Re.createRef=function(){return{current:null}};Re.forwardRef=function(e){return{$$typeof:jb,render:e}};Re.isValidElement=Yf;Re.lazy=function(e){return{$$typeof:Nb,_payload:{_status:-1,_result:e},_init:Tb}};Re.memo=function(e,t){return{$$typeof:kb,type:e,compare:t===void 0?null:t}};Re.startTransition=function(e){var t=Pl.transition;Pl.transition={};try{e()}finally{Pl.transition=t}};Re.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};Re.useCallback=function(e,t){return ar.current.useCallback(e,t)};Re.useContext=function(e){return ar.current.useContext(e)};Re.useDebugValue=function(){};Re.useDeferredValue=function(e){return ar.current.useDeferredValue(e)};Re.useEffect=function(e,t){return ar.current.useEffect(e,t)};Re.useId=function(){return ar.current.useId()};Re.useImperativeHandle=function(e,t,r){return ar.current.useImperativeHandle(e,t,r)};Re.useInsertionEffect=function(e,t){return ar.current.useInsertionEffect(e,t)};Re.useLayoutEffect=function(e,t){return ar.current.useLayoutEffect(e,t)};Re.useMemo=function(e,t){return ar.current.useMemo(e,t)};Re.useReducer=function(e,t,r){return ar.current.useReducer(e,t,r)};Re.useRef=function(e){return ar.current.useRef(e)};Re.useState=function(e){return ar.current.useState(e)};Re.useSyncExternalStore=function(e,t,r){return ar.current.useSyncExternalStore(e,t,r)};Re.useTransition=function(){return ar.current.useTransition()};Re.version="18.2.0";$0.exports=Re;var p=$0.exports;const Ne=Kc(p),Ob=pb({__proto__:null,default:Ne},[p]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zb=p,Rb=Symbol.for("react.element"),Mb=Symbol.for("react.fragment"),$b=Object.prototype.hasOwnProperty,Lb=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ib={key:!0,ref:!0,__self:!0,__source:!0};function W0(e,t,r){var o,i={},s=null,a=null;r!==void 0&&(s=""+r),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(a=t.ref);for(o in t)$b.call(t,o)&&!Ib.hasOwnProperty(o)&&(i[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps,t)i[o]===void 0&&(i[o]=t[o]);return{$$typeof:Rb,type:e,key:s,ref:a,props:i,_owner:Lb.current}}Qc.Fragment=Mb;Qc.jsx=W0;Qc.jsxs=W0;M0.exports=Qc;var n=M0.exports,uh={},H0={exports:{}},Cr={},V0={exports:{}},q0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(z,A){var R=z.length;z.push(A);e:for(;0<R;){var q=R-1>>>1,X=z[q];if(0<i(X,A))z[q]=A,z[R]=X,R=q;else break e}}function r(z){return z.length===0?null:z[0]}function o(z){if(z.length===0)return null;var A=z[0],R=z.pop();if(R!==A){z[0]=R;e:for(var q=0,X=z.length,oe=X>>>1;q<oe;){var J=2*(q+1)-1,xe=z[J],je=J+1,Se=z[je];if(0>i(xe,R))je<X&&0>i(Se,xe)?(z[q]=Se,z[je]=R,q=je):(z[q]=xe,z[J]=R,q=J);else if(je<X&&0>i(Se,R))z[q]=Se,z[je]=R,q=je;else break e}}return A}function i(z,A){var R=z.sortIndex-A.sortIndex;return R!==0?R:z.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var a=Date,c=a.now();e.unstable_now=function(){return a.now()-c}}var l=[],d=[],u=1,f=null,m=3,b=!1,x=!1,h=!1,v=typeof setTimeout=="function"?setTimeout:null,w=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function j(z){for(var A=r(d);A!==null;){if(A.callback===null)o(d);else if(A.startTime<=z)o(d),A.sortIndex=A.expirationTime,t(l,A);else break;A=r(d)}}function y(z){if(h=!1,j(z),!x)if(r(l)!==null)x=!0,D(k);else{var A=r(d);A!==null&&Y(y,A.startTime-z)}}function k(z,A){x=!1,h&&(h=!1,w(N),N=-1),b=!0;var R=m;try{for(j(A),f=r(l);f!==null&&(!(f.expirationTime>A)||z&&!L());){var q=f.callback;if(typeof q=="function"){f.callback=null,m=f.priorityLevel;var X=q(f.expirationTime<=A);A=e.unstable_now(),typeof X=="function"?f.callback=X:f===r(l)&&o(l),j(A)}else o(l);f=r(l)}if(f!==null)var oe=!0;else{var J=r(d);J!==null&&Y(y,J.startTime-A),oe=!1}return oe}finally{f=null,m=R,b=!1}}var _=!1,E=null,N=-1,T=5,M=-1;function L(){return!(e.unstable_now()-M<T)}function I(){if(E!==null){var z=e.unstable_now();M=z;var A=!0;try{A=E(!0,z)}finally{A?$():(_=!1,E=null)}}else _=!1}var $;if(typeof g=="function")$=function(){g(I)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,F=V.port2;V.port1.onmessage=I,$=function(){F.postMessage(null)}}else $=function(){v(I,0)};function D(z){E=z,_||(_=!0,$())}function Y(z,A){N=v(function(){z(e.unstable_now())},A)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(z){z.callback=null},e.unstable_continueExecution=function(){x||b||(x=!0,D(k))},e.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<z?Math.floor(1e3/z):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return r(l)},e.unstable_next=function(z){switch(m){case 1:case 2:case 3:var A=3;break;default:A=m}var R=m;m=A;try{return z()}finally{m=R}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(z,A){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var R=m;m=z;try{return A()}finally{m=R}},e.unstable_scheduleCallback=function(z,A,R){var q=e.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?q+R:q):R=q,z){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=R+X,z={id:u++,callback:A,priorityLevel:z,startTime:R,expirationTime:X,sortIndex:-1},R>q?(z.sortIndex=R,t(d,z),r(l)===null&&z===r(d)&&(h?(w(N),N=-1):h=!0,Y(y,R-q))):(z.sortIndex=X,t(l,z),x||b||(x=!0,D(k))),z},e.unstable_shouldYield=L,e.unstable_wrapCallback=function(z){var A=m;return function(){var R=m;m=A;try{return z.apply(this,arguments)}finally{m=R}}}})(q0);V0.exports=q0;var Ab=V0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Y0=p,kr=Ab;function Q(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var K0=new Set,qs={};function Jo(e,t){$i(e,t),$i(e+"Capture",t)}function $i(e,t){for(qs[e]=t,e=0;e<t.length;e++)K0.add(t[e])}var Mn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),hh=Object.prototype.hasOwnProperty,Db=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Pm={},Om={};function Fb(e){return hh.call(Om,e)?!0:hh.call(Pm,e)?!1:Db.test(e)?Om[e]=!0:(Pm[e]=!0,!1)}function Bb(e,t,r,o){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return o?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ub(e,t,r,o){if(t===null||typeof t>"u"||Bb(e,t,r,o))return!0;if(o)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function lr(e,t,r,o,i,s,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=o,this.attributeNamespace=i,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=a}var Vt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Vt[e]=new lr(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Vt[t]=new lr(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Vt[e]=new lr(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Vt[e]=new lr(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Vt[e]=new lr(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Vt[e]=new lr(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Vt[e]=new lr(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Vt[e]=new lr(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Vt[e]=new lr(e,5,!1,e.toLowerCase(),null,!1,!1)});var Kf=/[\-:]([a-z])/g;function Qf(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Kf,Qf);Vt[t]=new lr(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Kf,Qf);Vt[t]=new lr(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Kf,Qf);Vt[t]=new lr(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Vt[e]=new lr(e,1,!1,e.toLowerCase(),null,!1,!1)});Vt.xlinkHref=new lr("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Vt[e]=new lr(e,1,!1,e.toLowerCase(),null,!0,!0)});function Xf(e,t,r,o){var i=Vt.hasOwnProperty(t)?Vt[t]:null;(i!==null?i.type!==0:o||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ub(t,r,i,o)&&(r=null),o||i===null?Fb(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):i.mustUseProperty?e[i.propertyName]=r===null?i.type===3?!1:"":r:(t=i.attributeName,o=i.attributeNamespace,r===null?e.removeAttribute(t):(i=i.type,r=i===3||i===4&&r===!0?"":""+r,o?e.setAttributeNS(o,t,r):e.setAttribute(t,r))))}var Fn=Y0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,rl=Symbol.for("react.element"),ci=Symbol.for("react.portal"),di=Symbol.for("react.fragment"),Gf=Symbol.for("react.strict_mode"),fh=Symbol.for("react.profiler"),Q0=Symbol.for("react.provider"),X0=Symbol.for("react.context"),Zf=Symbol.for("react.forward_ref"),ph=Symbol.for("react.suspense"),mh=Symbol.for("react.suspense_list"),Jf=Symbol.for("react.memo"),Xn=Symbol.for("react.lazy"),G0=Symbol.for("react.offscreen"),zm=Symbol.iterator;function cs(e){return e===null||typeof e!="object"?null:(e=zm&&e[zm]||e["@@iterator"],typeof e=="function"?e:null)}var mt=Object.assign,nu;function Ns(e){if(nu===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);nu=t&&t[1]||""}return`
`+nu+e}var ou=!1;function iu(e,t){if(!e||ou)return"";ou=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var o=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){o=d}e.call(t.prototype)}else{try{throw Error()}catch(d){o=d}e()}}catch(d){if(d&&o&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),s=o.stack.split(`
`),a=i.length-1,c=s.length-1;1<=a&&0<=c&&i[a]!==s[c];)c--;for(;1<=a&&0<=c;a--,c--)if(i[a]!==s[c]){if(a!==1||c!==1)do if(a--,c--,0>c||i[a]!==s[c]){var l=`
`+i[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=a&&0<=c);break}}}finally{ou=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?Ns(e):""}function Wb(e){switch(e.tag){case 5:return Ns(e.type);case 16:return Ns("Lazy");case 13:return Ns("Suspense");case 19:return Ns("SuspenseList");case 0:case 2:case 15:return e=iu(e.type,!1),e;case 11:return e=iu(e.type.render,!1),e;case 1:return e=iu(e.type,!0),e;default:return""}}function xh(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case di:return"Fragment";case ci:return"Portal";case fh:return"Profiler";case Gf:return"StrictMode";case ph:return"Suspense";case mh:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case X0:return(e.displayName||"Context")+".Consumer";case Q0:return(e._context.displayName||"Context")+".Provider";case Zf:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Jf:return t=e.displayName||null,t!==null?t:xh(e.type)||"Memo";case Xn:t=e._payload,e=e._init;try{return xh(e(t))}catch{}}return null}function Hb(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return xh(t);case 8:return t===Gf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function go(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Z0(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Vb(e){var t=Z0(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),o=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var i=r.get,s=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){o=""+a,s.call(this,a)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return o},setValue:function(a){o=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function nl(e){e._valueTracker||(e._valueTracker=Vb(e))}function J0(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),o="";return e&&(o=Z0(e)?e.checked?"true":"false":e.value),e=o,e!==r?(t.setValue(e),!0):!1}function ec(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function gh(e,t){var r=t.checked;return mt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function Rm(e,t){var r=t.defaultValue==null?"":t.defaultValue,o=t.checked!=null?t.checked:t.defaultChecked;r=go(t.value!=null?t.value:r),e._wrapperState={initialChecked:o,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ev(e,t){t=t.checked,t!=null&&Xf(e,"checked",t,!1)}function vh(e,t){ev(e,t);var r=go(t.value),o=t.type;if(r!=null)o==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(o==="submit"||o==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?wh(e,t.type,r):t.hasOwnProperty("defaultValue")&&wh(e,t.type,go(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Mm(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var o=t.type;if(!(o!=="submit"&&o!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function wh(e,t,r){(t!=="number"||ec(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Cs=Array.isArray;function Ni(e,t,r,o){if(e=e.options,t){t={};for(var i=0;i<r.length;i++)t["$"+r[i]]=!0;for(r=0;r<e.length;r++)i=t.hasOwnProperty("$"+e[r].value),e[r].selected!==i&&(e[r].selected=i),i&&o&&(e[r].defaultSelected=!0)}else{for(r=""+go(r),t=null,i=0;i<e.length;i++){if(e[i].value===r){e[i].selected=!0,o&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function yh(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(Q(91));return mt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function $m(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(Q(92));if(Cs(r)){if(1<r.length)throw Error(Q(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:go(r)}}function tv(e,t){var r=go(t.value),o=go(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),o!=null&&(e.defaultValue=""+o)}function Lm(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function rv(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function bh(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?rv(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ol,nv=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,o,i){MSApp.execUnsafeLocalFunction(function(){return e(t,r,o,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ol=ol||document.createElement("div"),ol.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ol.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ys(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var zs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(zs).forEach(function(e){qb.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),zs[t]=zs[e]})});function ov(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||zs.hasOwnProperty(e)&&zs[e]?(""+t).trim():t+"px"}function iv(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var o=r.indexOf("--")===0,i=ov(r,t[r],o);r==="float"&&(r="cssFloat"),o?e.setProperty(r,i):e[r]=i}}var Yb=mt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function jh(e,t){if(t){if(Yb[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(Q(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(Q(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(Q(61))}if(t.style!=null&&typeof t.style!="object")throw Error(Q(62))}}function Sh(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var kh=null;function ep(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Nh=null,Ci=null,_i=null;function Im(e){if(e=Ha(e)){if(typeof Nh!="function")throw Error(Q(280));var t=e.stateNode;t&&(t=ed(t),Nh(e.stateNode,e.type,t))}}function sv(e){Ci?_i?_i.push(e):_i=[e]:Ci=e}function av(){if(Ci){var e=Ci,t=_i;if(_i=Ci=null,Im(e),t)for(e=0;e<t.length;e++)Im(t[e])}}function lv(e,t){return e(t)}function cv(){}var su=!1;function dv(e,t,r){if(su)return e(t,r);su=!0;try{return lv(e,t,r)}finally{su=!1,(Ci!==null||_i!==null)&&(cv(),av())}}function Ks(e,t){var r=e.stateNode;if(r===null)return null;var o=ed(r);if(o===null)return null;r=o[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(Q(231,t,typeof r));return r}var Ch=!1;if(Mn)try{var ds={};Object.defineProperty(ds,"passive",{get:function(){Ch=!0}}),window.addEventListener("test",ds,ds),window.removeEventListener("test",ds,ds)}catch{Ch=!1}function Kb(e,t,r,o,i,s,a,c,l){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(u){this.onError(u)}}var Rs=!1,tc=null,rc=!1,_h=null,Qb={onError:function(e){Rs=!0,tc=e}};function Xb(e,t,r,o,i,s,a,c,l){Rs=!1,tc=null,Kb.apply(Qb,arguments)}function Gb(e,t,r,o,i,s,a,c,l){if(Xb.apply(this,arguments),Rs){if(Rs){var d=tc;Rs=!1,tc=null}else throw Error(Q(198));rc||(rc=!0,_h=d)}}function ei(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function uv(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Am(e){if(ei(e)!==e)throw Error(Q(188))}function Zb(e){var t=e.alternate;if(!t){if(t=ei(e),t===null)throw Error(Q(188));return t!==e?null:e}for(var r=e,o=t;;){var i=r.return;if(i===null)break;var s=i.alternate;if(s===null){if(o=i.return,o!==null){r=o;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===r)return Am(i),e;if(s===o)return Am(i),t;s=s.sibling}throw Error(Q(188))}if(r.return!==o.return)r=i,o=s;else{for(var a=!1,c=i.child;c;){if(c===r){a=!0,r=i,o=s;break}if(c===o){a=!0,o=i,r=s;break}c=c.sibling}if(!a){for(c=s.child;c;){if(c===r){a=!0,r=s,o=i;break}if(c===o){a=!0,o=s,r=i;break}c=c.sibling}if(!a)throw Error(Q(189))}}if(r.alternate!==o)throw Error(Q(190))}if(r.tag!==3)throw Error(Q(188));return r.stateNode.current===r?e:t}function hv(e){return e=Zb(e),e!==null?fv(e):null}function fv(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=fv(e);if(t!==null)return t;e=e.sibling}return null}var pv=kr.unstable_scheduleCallback,Dm=kr.unstable_cancelCallback,Jb=kr.unstable_shouldYield,ej=kr.unstable_requestPaint,jt=kr.unstable_now,tj=kr.unstable_getCurrentPriorityLevel,tp=kr.unstable_ImmediatePriority,mv=kr.unstable_UserBlockingPriority,nc=kr.unstable_NormalPriority,rj=kr.unstable_LowPriority,xv=kr.unstable_IdlePriority,Xc=null,xn=null;function nj(e){if(xn&&typeof xn.onCommitFiberRoot=="function")try{xn.onCommitFiberRoot(Xc,e,void 0,(e.current.flags&128)===128)}catch{}}var rn=Math.clz32?Math.clz32:sj,oj=Math.log,ij=Math.LN2;function sj(e){return e>>>=0,e===0?32:31-(oj(e)/ij|0)|0}var il=64,sl=4194304;function _s(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function oc(e,t){var r=e.pendingLanes;if(r===0)return 0;var o=0,i=e.suspendedLanes,s=e.pingedLanes,a=r&268435455;if(a!==0){var c=a&~i;c!==0?o=_s(c):(s&=a,s!==0&&(o=_s(s)))}else a=r&~i,a!==0?o=_s(a):s!==0&&(o=_s(s));if(o===0)return 0;if(t!==0&&t!==o&&!(t&i)&&(i=o&-o,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(o&4&&(o|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=o;0<t;)r=31-rn(t),i=1<<r,o|=e[r],t&=~i;return o}function aj(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function lj(e,t){for(var r=e.suspendedLanes,o=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var a=31-rn(s),c=1<<a,l=i[a];l===-1?(!(c&r)||c&o)&&(i[a]=aj(c,t)):l<=t&&(e.expiredLanes|=c),s&=~c}}function Eh(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function gv(){var e=il;return il<<=1,!(il&4194240)&&(il=64),e}function au(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ua(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-rn(t),e[t]=r}function cj(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var o=e.eventTimes;for(e=e.expirationTimes;0<r;){var i=31-rn(r),s=1<<i;t[i]=0,o[i]=-1,e[i]=-1,r&=~s}}function rp(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var o=31-rn(r),i=1<<o;i&t|e[o]&t&&(e[o]|=t),r&=~i}}var Ue=0;function vv(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var wv,np,yv,bv,jv,Th=!1,al=[],io=null,so=null,ao=null,Qs=new Map,Xs=new Map,Jn=[],dj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Fm(e,t){switch(e){case"focusin":case"focusout":io=null;break;case"dragenter":case"dragleave":so=null;break;case"mouseover":case"mouseout":ao=null;break;case"pointerover":case"pointerout":Qs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xs.delete(t.pointerId)}}function us(e,t,r,o,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:r,eventSystemFlags:o,nativeEvent:s,targetContainers:[i]},t!==null&&(t=Ha(t),t!==null&&np(t)),e):(e.eventSystemFlags|=o,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function uj(e,t,r,o,i){switch(t){case"focusin":return io=us(io,e,t,r,o,i),!0;case"dragenter":return so=us(so,e,t,r,o,i),!0;case"mouseover":return ao=us(ao,e,t,r,o,i),!0;case"pointerover":var s=i.pointerId;return Qs.set(s,us(Qs.get(s)||null,e,t,r,o,i)),!0;case"gotpointercapture":return s=i.pointerId,Xs.set(s,us(Xs.get(s)||null,e,t,r,o,i)),!0}return!1}function Sv(e){var t=Oo(e.target);if(t!==null){var r=ei(t);if(r!==null){if(t=r.tag,t===13){if(t=uv(r),t!==null){e.blockedOn=t,jv(e.priority,function(){yv(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ol(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Ph(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var o=new r.constructor(r.type,r);kh=o,r.target.dispatchEvent(o),kh=null}else return t=Ha(r),t!==null&&np(t),e.blockedOn=r,!1;t.shift()}return!0}function Bm(e,t,r){Ol(e)&&r.delete(t)}function hj(){Th=!1,io!==null&&Ol(io)&&(io=null),so!==null&&Ol(so)&&(so=null),ao!==null&&Ol(ao)&&(ao=null),Qs.forEach(Bm),Xs.forEach(Bm)}function hs(e,t){e.blockedOn===t&&(e.blockedOn=null,Th||(Th=!0,kr.unstable_scheduleCallback(kr.unstable_NormalPriority,hj)))}function Gs(e){function t(i){return hs(i,e)}if(0<al.length){hs(al[0],e);for(var r=1;r<al.length;r++){var o=al[r];o.blockedOn===e&&(o.blockedOn=null)}}for(io!==null&&hs(io,e),so!==null&&hs(so,e),ao!==null&&hs(ao,e),Qs.forEach(t),Xs.forEach(t),r=0;r<Jn.length;r++)o=Jn[r],o.blockedOn===e&&(o.blockedOn=null);for(;0<Jn.length&&(r=Jn[0],r.blockedOn===null);)Sv(r),r.blockedOn===null&&Jn.shift()}var Ei=Fn.ReactCurrentBatchConfig,ic=!0;function fj(e,t,r,o){var i=Ue,s=Ei.transition;Ei.transition=null;try{Ue=1,op(e,t,r,o)}finally{Ue=i,Ei.transition=s}}function pj(e,t,r,o){var i=Ue,s=Ei.transition;Ei.transition=null;try{Ue=4,op(e,t,r,o)}finally{Ue=i,Ei.transition=s}}function op(e,t,r,o){if(ic){var i=Ph(e,t,r,o);if(i===null)gu(e,t,o,sc,r),Fm(e,o);else if(uj(i,e,t,r,o))o.stopPropagation();else if(Fm(e,o),t&4&&-1<dj.indexOf(e)){for(;i!==null;){var s=Ha(i);if(s!==null&&wv(s),s=Ph(e,t,r,o),s===null&&gu(e,t,o,sc,r),s===i)break;i=s}i!==null&&o.stopPropagation()}else gu(e,t,o,null,r)}}var sc=null;function Ph(e,t,r,o){if(sc=null,e=ep(o),e=Oo(e),e!==null)if(t=ei(e),t===null)e=null;else if(r=t.tag,r===13){if(e=uv(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return sc=e,null}function kv(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(tj()){case tp:return 1;case mv:return 4;case nc:case rj:return 16;case xv:return 536870912;default:return 16}default:return 16}}var ro=null,ip=null,zl=null;function Nv(){if(zl)return zl;var e,t=ip,r=t.length,o,i="value"in ro?ro.value:ro.textContent,s=i.length;for(e=0;e<r&&t[e]===i[e];e++);var a=r-e;for(o=1;o<=a&&t[r-o]===i[s-o];o++);return zl=i.slice(e,1<o?1-o:void 0)}function Rl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ll(){return!0}function Um(){return!1}function _r(e){function t(r,o,i,s,a){this._reactName=r,this._targetInst=i,this.type=o,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(r=e[c],this[c]=r?r(s):s[c]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ll:Um,this.isPropagationStopped=Um,this}return mt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=ll)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=ll)},persist:function(){},isPersistent:ll}),t}var es={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},sp=_r(es),Wa=mt({},es,{view:0,detail:0}),mj=_r(Wa),lu,cu,fs,Gc=mt({},Wa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ap,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==fs&&(fs&&e.type==="mousemove"?(lu=e.screenX-fs.screenX,cu=e.screenY-fs.screenY):cu=lu=0,fs=e),lu)},movementY:function(e){return"movementY"in e?e.movementY:cu}}),Wm=_r(Gc),xj=mt({},Gc,{dataTransfer:0}),gj=_r(xj),vj=mt({},Wa,{relatedTarget:0}),du=_r(vj),wj=mt({},es,{animationName:0,elapsedTime:0,pseudoElement:0}),yj=_r(wj),bj=mt({},es,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),jj=_r(bj),Sj=mt({},es,{data:0}),Hm=_r(Sj),kj={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nj={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Cj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _j(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Cj[e])?!!t[e]:!1}function ap(){return _j}var Ej=mt({},Wa,{key:function(e){if(e.key){var t=kj[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Rl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Nj[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ap,charCode:function(e){return e.type==="keypress"?Rl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Rl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Tj=_r(Ej),Pj=mt({},Gc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Vm=_r(Pj),Oj=mt({},Wa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ap}),zj=_r(Oj),Rj=mt({},es,{propertyName:0,elapsedTime:0,pseudoElement:0}),Mj=_r(Rj),$j=mt({},Gc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Lj=_r($j),Ij=[9,13,27,32],lp=Mn&&"CompositionEvent"in window,Ms=null;Mn&&"documentMode"in document&&(Ms=document.documentMode);var Aj=Mn&&"TextEvent"in window&&!Ms,Cv=Mn&&(!lp||Ms&&8<Ms&&11>=Ms),qm=String.fromCharCode(32),Ym=!1;function _v(e,t){switch(e){case"keyup":return Ij.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ev(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ui=!1;function Dj(e,t){switch(e){case"compositionend":return Ev(t);case"keypress":return t.which!==32?null:(Ym=!0,qm);case"textInput":return e=t.data,e===qm&&Ym?null:e;default:return null}}function Fj(e,t){if(ui)return e==="compositionend"||!lp&&_v(e,t)?(e=Nv(),zl=ip=ro=null,ui=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Cv&&t.locale!=="ko"?null:t.data;default:return null}}var Bj={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Km(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Bj[e.type]:t==="textarea"}function Tv(e,t,r,o){sv(o),t=ac(t,"onChange"),0<t.length&&(r=new sp("onChange","change",null,r,o),e.push({event:r,listeners:t}))}var $s=null,Zs=null;function Uj(e){Fv(e,0)}function Zc(e){var t=pi(e);if(J0(t))return e}function Wj(e,t){if(e==="change")return t}var Pv=!1;if(Mn){var uu;if(Mn){var hu="oninput"in document;if(!hu){var Qm=document.createElement("div");Qm.setAttribute("oninput","return;"),hu=typeof Qm.oninput=="function"}uu=hu}else uu=!1;Pv=uu&&(!document.documentMode||9<document.documentMode)}function Xm(){$s&&($s.detachEvent("onpropertychange",Ov),Zs=$s=null)}function Ov(e){if(e.propertyName==="value"&&Zc(Zs)){var t=[];Tv(t,Zs,e,ep(e)),dv(Uj,t)}}function Hj(e,t,r){e==="focusin"?(Xm(),$s=t,Zs=r,$s.attachEvent("onpropertychange",Ov)):e==="focusout"&&Xm()}function Vj(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Zc(Zs)}function qj(e,t){if(e==="click")return Zc(t)}function Yj(e,t){if(e==="input"||e==="change")return Zc(t)}function Kj(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var sn=typeof Object.is=="function"?Object.is:Kj;function Js(e,t){if(sn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),o=Object.keys(t);if(r.length!==o.length)return!1;for(o=0;o<r.length;o++){var i=r[o];if(!hh.call(t,i)||!sn(e[i],t[i]))return!1}return!0}function Gm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zm(e,t){var r=Gm(e);e=0;for(var o;r;){if(r.nodeType===3){if(o=e+r.textContent.length,e<=t&&o>=t)return{node:r,offset:t-e};e=o}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Gm(r)}}function zv(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?zv(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Rv(){for(var e=window,t=ec();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=ec(e.document)}return t}function cp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Qj(e){var t=Rv(),r=e.focusedElem,o=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&zv(r.ownerDocument.documentElement,r)){if(o!==null&&cp(r)){if(t=o.start,e=o.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=r.textContent.length,s=Math.min(o.start,i);o=o.end===void 0?s:Math.min(o.end,i),!e.extend&&s>o&&(i=o,o=s,s=i),i=Zm(r,s);var a=Zm(r,o);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>o?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Xj=Mn&&"documentMode"in document&&11>=document.documentMode,hi=null,Oh=null,Ls=null,zh=!1;function Jm(e,t,r){var o=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;zh||hi==null||hi!==ec(o)||(o=hi,"selectionStart"in o&&cp(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Ls&&Js(Ls,o)||(Ls=o,o=ac(Oh,"onSelect"),0<o.length&&(t=new sp("onSelect","select",null,t,r),e.push({event:t,listeners:o}),t.target=hi)))}function cl(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var fi={animationend:cl("Animation","AnimationEnd"),animationiteration:cl("Animation","AnimationIteration"),animationstart:cl("Animation","AnimationStart"),transitionend:cl("Transition","TransitionEnd")},fu={},Mv={};Mn&&(Mv=document.createElement("div").style,"AnimationEvent"in window||(delete fi.animationend.animation,delete fi.animationiteration.animation,delete fi.animationstart.animation),"TransitionEvent"in window||delete fi.transitionend.transition);function Jc(e){if(fu[e])return fu[e];if(!fi[e])return e;var t=fi[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Mv)return fu[e]=t[r];return e}var $v=Jc("animationend"),Lv=Jc("animationiteration"),Iv=Jc("animationstart"),Av=Jc("transitionend"),Dv=new Map,ex="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function jo(e,t){Dv.set(e,t),Jo(t,[e])}for(var pu=0;pu<ex.length;pu++){var mu=ex[pu],Gj=mu.toLowerCase(),Zj=mu[0].toUpperCase()+mu.slice(1);jo(Gj,"on"+Zj)}jo($v,"onAnimationEnd");jo(Lv,"onAnimationIteration");jo(Iv,"onAnimationStart");jo("dblclick","onDoubleClick");jo("focusin","onFocus");jo("focusout","onBlur");jo(Av,"onTransitionEnd");$i("onMouseEnter",["mouseout","mouseover"]);$i("onMouseLeave",["mouseout","mouseover"]);$i("onPointerEnter",["pointerout","pointerover"]);$i("onPointerLeave",["pointerout","pointerover"]);Jo("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Jo("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Jo("onBeforeInput",["compositionend","keypress","textInput","paste"]);Jo("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Jo("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Jo("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Es="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Jj=new Set("cancel close invalid load scroll toggle".split(" ").concat(Es));function tx(e,t,r){var o=e.type||"unknown-event";e.currentTarget=r,Gb(o,t,void 0,e),e.currentTarget=null}function Fv(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var o=e[r],i=o.event;o=o.listeners;e:{var s=void 0;if(t)for(var a=o.length-1;0<=a;a--){var c=o[a],l=c.instance,d=c.currentTarget;if(c=c.listener,l!==s&&i.isPropagationStopped())break e;tx(i,c,d),s=l}else for(a=0;a<o.length;a++){if(c=o[a],l=c.instance,d=c.currentTarget,c=c.listener,l!==s&&i.isPropagationStopped())break e;tx(i,c,d),s=l}}}if(rc)throw e=_h,rc=!1,_h=null,e}function rt(e,t){var r=t[Ih];r===void 0&&(r=t[Ih]=new Set);var o=e+"__bubble";r.has(o)||(Bv(t,e,2,!1),r.add(o))}function xu(e,t,r){var o=0;t&&(o|=4),Bv(r,e,o,t)}var dl="_reactListening"+Math.random().toString(36).slice(2);function ea(e){if(!e[dl]){e[dl]=!0,K0.forEach(function(r){r!=="selectionchange"&&(Jj.has(r)||xu(r,!1,e),xu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[dl]||(t[dl]=!0,xu("selectionchange",!1,t))}}function Bv(e,t,r,o){switch(kv(t)){case 1:var i=fj;break;case 4:i=pj;break;default:i=op}r=i.bind(null,t,r,e),i=void 0,!Ch||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),o?i!==void 0?e.addEventListener(t,r,{capture:!0,passive:i}):e.addEventListener(t,r,!0):i!==void 0?e.addEventListener(t,r,{passive:i}):e.addEventListener(t,r,!1)}function gu(e,t,r,o,i){var s=o;if(!(t&1)&&!(t&2)&&o!==null)e:for(;;){if(o===null)return;var a=o.tag;if(a===3||a===4){var c=o.stateNode.containerInfo;if(c===i||c.nodeType===8&&c.parentNode===i)break;if(a===4)for(a=o.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;a=a.return}for(;c!==null;){if(a=Oo(c),a===null)return;if(l=a.tag,l===5||l===6){o=s=a;continue e}c=c.parentNode}}o=o.return}dv(function(){var d=s,u=ep(r),f=[];e:{var m=Dv.get(e);if(m!==void 0){var b=sp,x=e;switch(e){case"keypress":if(Rl(r)===0)break e;case"keydown":case"keyup":b=Tj;break;case"focusin":x="focus",b=du;break;case"focusout":x="blur",b=du;break;case"beforeblur":case"afterblur":b=du;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=Wm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=gj;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=zj;break;case $v:case Lv:case Iv:b=yj;break;case Av:b=Mj;break;case"scroll":b=mj;break;case"wheel":b=Lj;break;case"copy":case"cut":case"paste":b=jj;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=Vm}var h=(t&4)!==0,v=!h&&e==="scroll",w=h?m!==null?m+"Capture":null:m;h=[];for(var g=d,j;g!==null;){j=g;var y=j.stateNode;if(j.tag===5&&y!==null&&(j=y,w!==null&&(y=Ks(g,w),y!=null&&h.push(ta(g,y,j)))),v)break;g=g.return}0<h.length&&(m=new b(m,x,null,r,u),f.push({event:m,listeners:h}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",b=e==="mouseout"||e==="pointerout",m&&r!==kh&&(x=r.relatedTarget||r.fromElement)&&(Oo(x)||x[$n]))break e;if((b||m)&&(m=u.window===u?u:(m=u.ownerDocument)?m.defaultView||m.parentWindow:window,b?(x=r.relatedTarget||r.toElement,b=d,x=x?Oo(x):null,x!==null&&(v=ei(x),x!==v||x.tag!==5&&x.tag!==6)&&(x=null)):(b=null,x=d),b!==x)){if(h=Wm,y="onMouseLeave",w="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(h=Vm,y="onPointerLeave",w="onPointerEnter",g="pointer"),v=b==null?m:pi(b),j=x==null?m:pi(x),m=new h(y,g+"leave",b,r,u),m.target=v,m.relatedTarget=j,y=null,Oo(u)===d&&(h=new h(w,g+"enter",x,r,u),h.target=j,h.relatedTarget=v,y=h),v=y,b&&x)t:{for(h=b,w=x,g=0,j=h;j;j=ii(j))g++;for(j=0,y=w;y;y=ii(y))j++;for(;0<g-j;)h=ii(h),g--;for(;0<j-g;)w=ii(w),j--;for(;g--;){if(h===w||w!==null&&h===w.alternate)break t;h=ii(h),w=ii(w)}h=null}else h=null;b!==null&&rx(f,m,b,h,!1),x!==null&&v!==null&&rx(f,v,x,h,!0)}}e:{if(m=d?pi(d):window,b=m.nodeName&&m.nodeName.toLowerCase(),b==="select"||b==="input"&&m.type==="file")var k=Wj;else if(Km(m))if(Pv)k=Yj;else{k=Vj;var _=Hj}else(b=m.nodeName)&&b.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(k=qj);if(k&&(k=k(e,d))){Tv(f,k,r,u);break e}_&&_(e,m,d),e==="focusout"&&(_=m._wrapperState)&&_.controlled&&m.type==="number"&&wh(m,"number",m.value)}switch(_=d?pi(d):window,e){case"focusin":(Km(_)||_.contentEditable==="true")&&(hi=_,Oh=d,Ls=null);break;case"focusout":Ls=Oh=hi=null;break;case"mousedown":zh=!0;break;case"contextmenu":case"mouseup":case"dragend":zh=!1,Jm(f,r,u);break;case"selectionchange":if(Xj)break;case"keydown":case"keyup":Jm(f,r,u)}var E;if(lp)e:{switch(e){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else ui?_v(e,r)&&(N="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(N="onCompositionStart");N&&(Cv&&r.locale!=="ko"&&(ui||N!=="onCompositionStart"?N==="onCompositionEnd"&&ui&&(E=Nv()):(ro=u,ip="value"in ro?ro.value:ro.textContent,ui=!0)),_=ac(d,N),0<_.length&&(N=new Hm(N,e,null,r,u),f.push({event:N,listeners:_}),E?N.data=E:(E=Ev(r),E!==null&&(N.data=E)))),(E=Aj?Dj(e,r):Fj(e,r))&&(d=ac(d,"onBeforeInput"),0<d.length&&(u=new Hm("onBeforeInput","beforeinput",null,r,u),f.push({event:u,listeners:d}),u.data=E))}Fv(f,t)})}function ta(e,t,r){return{instance:e,listener:t,currentTarget:r}}function ac(e,t){for(var r=t+"Capture",o=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Ks(e,r),s!=null&&o.unshift(ta(e,s,i)),s=Ks(e,t),s!=null&&o.push(ta(e,s,i))),e=e.return}return o}function ii(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function rx(e,t,r,o,i){for(var s=t._reactName,a=[];r!==null&&r!==o;){var c=r,l=c.alternate,d=c.stateNode;if(l!==null&&l===o)break;c.tag===5&&d!==null&&(c=d,i?(l=Ks(r,s),l!=null&&a.unshift(ta(r,l,c))):i||(l=Ks(r,s),l!=null&&a.push(ta(r,l,c)))),r=r.return}a.length!==0&&e.push({event:t,listeners:a})}var e2=/\r\n?/g,t2=/\u0000|\uFFFD/g;function nx(e){return(typeof e=="string"?e:""+e).replace(e2,`
`).replace(t2,"")}function ul(e,t,r){if(t=nx(t),nx(e)!==t&&r)throw Error(Q(425))}function lc(){}var Rh=null,Mh=null;function $h(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Lh=typeof setTimeout=="function"?setTimeout:void 0,r2=typeof clearTimeout=="function"?clearTimeout:void 0,ox=typeof Promise=="function"?Promise:void 0,n2=typeof queueMicrotask=="function"?queueMicrotask:typeof ox<"u"?function(e){return ox.resolve(null).then(e).catch(o2)}:Lh;function o2(e){setTimeout(function(){throw e})}function vu(e,t){var r=t,o=0;do{var i=r.nextSibling;if(e.removeChild(r),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(o===0){e.removeChild(i),Gs(t);return}o--}else r!=="$"&&r!=="$?"&&r!=="$!"||o++;r=i}while(r);Gs(t)}function lo(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ix(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var ts=Math.random().toString(36).slice(2),pn="__reactFiber$"+ts,ra="__reactProps$"+ts,$n="__reactContainer$"+ts,Ih="__reactEvents$"+ts,i2="__reactListeners$"+ts,s2="__reactHandles$"+ts;function Oo(e){var t=e[pn];if(t)return t;for(var r=e.parentNode;r;){if(t=r[$n]||r[pn]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=ix(e);e!==null;){if(r=e[pn])return r;e=ix(e)}return t}e=r,r=e.parentNode}return null}function Ha(e){return e=e[pn]||e[$n],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function pi(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(Q(33))}function ed(e){return e[ra]||null}var Ah=[],mi=-1;function So(e){return{current:e}}function ot(e){0>mi||(e.current=Ah[mi],Ah[mi]=null,mi--)}function et(e,t){mi++,Ah[mi]=e.current,e.current=t}var vo={},Gt=So(vo),gr=So(!1),Ho=vo;function Li(e,t){var r=e.type.contextTypes;if(!r)return vo;var o=e.stateNode;if(o&&o.__reactInternalMemoizedUnmaskedChildContext===t)return o.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in r)i[s]=t[s];return o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function vr(e){return e=e.childContextTypes,e!=null}function cc(){ot(gr),ot(Gt)}function sx(e,t,r){if(Gt.current!==vo)throw Error(Q(168));et(Gt,t),et(gr,r)}function Uv(e,t,r){var o=e.stateNode;if(t=t.childContextTypes,typeof o.getChildContext!="function")return r;o=o.getChildContext();for(var i in o)if(!(i in t))throw Error(Q(108,Hb(e)||"Unknown",i));return mt({},r,o)}function dc(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||vo,Ho=Gt.current,et(Gt,e),et(gr,gr.current),!0}function ax(e,t,r){var o=e.stateNode;if(!o)throw Error(Q(169));r?(e=Uv(e,t,Ho),o.__reactInternalMemoizedMergedChildContext=e,ot(gr),ot(Gt),et(Gt,e)):ot(gr),et(gr,r)}var kn=null,td=!1,wu=!1;function Wv(e){kn===null?kn=[e]:kn.push(e)}function a2(e){td=!0,Wv(e)}function ko(){if(!wu&&kn!==null){wu=!0;var e=0,t=Ue;try{var r=kn;for(Ue=1;e<r.length;e++){var o=r[e];do o=o(!0);while(o!==null)}kn=null,td=!1}catch(i){throw kn!==null&&(kn=kn.slice(e+1)),pv(tp,ko),i}finally{Ue=t,wu=!1}}return null}var xi=[],gi=0,uc=null,hc=0,Rr=[],Mr=0,Vo=null,Nn=1,Cn="";function _o(e,t){xi[gi++]=hc,xi[gi++]=uc,uc=e,hc=t}function Hv(e,t,r){Rr[Mr++]=Nn,Rr[Mr++]=Cn,Rr[Mr++]=Vo,Vo=e;var o=Nn;e=Cn;var i=32-rn(o)-1;o&=~(1<<i),r+=1;var s=32-rn(t)+i;if(30<s){var a=i-i%5;s=(o&(1<<a)-1).toString(32),o>>=a,i-=a,Nn=1<<32-rn(t)+i|r<<i|o,Cn=s+e}else Nn=1<<s|r<<i|o,Cn=e}function dp(e){e.return!==null&&(_o(e,1),Hv(e,1,0))}function up(e){for(;e===uc;)uc=xi[--gi],xi[gi]=null,hc=xi[--gi],xi[gi]=null;for(;e===Vo;)Vo=Rr[--Mr],Rr[Mr]=null,Cn=Rr[--Mr],Rr[Mr]=null,Nn=Rr[--Mr],Rr[Mr]=null}var Sr=null,jr=null,ct=!1,Jr=null;function Vv(e,t){var r=Lr(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function lx(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Sr=e,jr=lo(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Sr=e,jr=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Vo!==null?{id:Nn,overflow:Cn}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=Lr(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Sr=e,jr=null,!0):!1;default:return!1}}function Dh(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Fh(e){if(ct){var t=jr;if(t){var r=t;if(!lx(e,t)){if(Dh(e))throw Error(Q(418));t=lo(r.nextSibling);var o=Sr;t&&lx(e,t)?Vv(o,r):(e.flags=e.flags&-4097|2,ct=!1,Sr=e)}}else{if(Dh(e))throw Error(Q(418));e.flags=e.flags&-4097|2,ct=!1,Sr=e}}}function cx(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Sr=e}function hl(e){if(e!==Sr)return!1;if(!ct)return cx(e),ct=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!$h(e.type,e.memoizedProps)),t&&(t=jr)){if(Dh(e))throw qv(),Error(Q(418));for(;t;)Vv(e,t),t=lo(t.nextSibling)}if(cx(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Q(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){jr=lo(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}jr=null}}else jr=Sr?lo(e.stateNode.nextSibling):null;return!0}function qv(){for(var e=jr;e;)e=lo(e.nextSibling)}function Ii(){jr=Sr=null,ct=!1}function hp(e){Jr===null?Jr=[e]:Jr.push(e)}var l2=Fn.ReactCurrentBatchConfig;function Xr(e,t){if(e&&e.defaultProps){t=mt({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}var fc=So(null),pc=null,vi=null,fp=null;function pp(){fp=vi=pc=null}function mp(e){var t=fc.current;ot(fc),e._currentValue=t}function Bh(e,t,r){for(;e!==null;){var o=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,o!==null&&(o.childLanes|=t)):o!==null&&(o.childLanes&t)!==t&&(o.childLanes|=t),e===r)break;e=e.return}}function Ti(e,t){pc=e,fp=vi=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(pr=!0),e.firstContext=null)}function Dr(e){var t=e._currentValue;if(fp!==e)if(e={context:e,memoizedValue:t,next:null},vi===null){if(pc===null)throw Error(Q(308));vi=e,pc.dependencies={lanes:0,firstContext:e}}else vi=vi.next=e;return t}var zo=null;function xp(e){zo===null?zo=[e]:zo.push(e)}function Yv(e,t,r,o){var i=t.interleaved;return i===null?(r.next=r,xp(t)):(r.next=i.next,i.next=r),t.interleaved=r,Ln(e,o)}function Ln(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Gn=!1;function gp(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Kv(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function _n(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function co(e,t,r){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,Le&2){var i=o.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),o.pending=t,Ln(e,r)}return i=o.interleaved,i===null?(t.next=t,xp(o)):(t.next=i.next,i.next=t),o.interleaved=t,Ln(e,r)}function Ml(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var o=t.lanes;o&=e.pendingLanes,r|=o,t.lanes=r,rp(e,r)}}function dx(e,t){var r=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,r===o)){var i=null,s=null;if(r=r.firstBaseUpdate,r!==null){do{var a={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};s===null?i=s=a:s=s.next=a,r=r.next}while(r!==null);s===null?i=s=t:s=s.next=t}else i=s=t;r={baseState:o.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:o.shared,effects:o.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function mc(e,t,r,o){var i=e.updateQueue;Gn=!1;var s=i.firstBaseUpdate,a=i.lastBaseUpdate,c=i.shared.pending;if(c!==null){i.shared.pending=null;var l=c,d=l.next;l.next=null,a===null?s=d:a.next=d,a=l;var u=e.alternate;u!==null&&(u=u.updateQueue,c=u.lastBaseUpdate,c!==a&&(c===null?u.firstBaseUpdate=d:c.next=d,u.lastBaseUpdate=l))}if(s!==null){var f=i.baseState;a=0,u=d=l=null,c=s;do{var m=c.lane,b=c.eventTime;if((o&m)===m){u!==null&&(u=u.next={eventTime:b,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var x=e,h=c;switch(m=t,b=r,h.tag){case 1:if(x=h.payload,typeof x=="function"){f=x.call(b,f,m);break e}f=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=h.payload,m=typeof x=="function"?x.call(b,f,m):x,m==null)break e;f=mt({},f,m);break e;case 2:Gn=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,m=i.effects,m===null?i.effects=[c]:m.push(c))}else b={eventTime:b,lane:m,tag:c.tag,payload:c.payload,callback:c.callback,next:null},u===null?(d=u=b,l=f):u=u.next=b,a|=m;if(c=c.next,c===null){if(c=i.shared.pending,c===null)break;m=c,c=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);if(u===null&&(l=f),i.baseState=l,i.firstBaseUpdate=d,i.lastBaseUpdate=u,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);Yo|=a,e.lanes=a,e.memoizedState=f}}function ux(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var o=e[t],i=o.callback;if(i!==null){if(o.callback=null,o=r,typeof i!="function")throw Error(Q(191,i));i.call(o)}}}var Qv=new Y0.Component().refs;function Uh(e,t,r,o){t=e.memoizedState,r=r(o,t),r=r==null?t:mt({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var rd={isMounted:function(e){return(e=e._reactInternals)?ei(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var o=sr(),i=ho(e),s=_n(o,i);s.payload=t,r!=null&&(s.callback=r),t=co(e,s,i),t!==null&&(nn(t,e,i,o),Ml(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var o=sr(),i=ho(e),s=_n(o,i);s.tag=1,s.payload=t,r!=null&&(s.callback=r),t=co(e,s,i),t!==null&&(nn(t,e,i,o),Ml(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=sr(),o=ho(e),i=_n(r,o);i.tag=2,t!=null&&(i.callback=t),t=co(e,i,o),t!==null&&(nn(t,e,o,r),Ml(t,e,o))}};function hx(e,t,r,o,i,s,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,s,a):t.prototype&&t.prototype.isPureReactComponent?!Js(r,o)||!Js(i,s):!0}function Xv(e,t,r){var o=!1,i=vo,s=t.contextType;return typeof s=="object"&&s!==null?s=Dr(s):(i=vr(t)?Ho:Gt.current,o=t.contextTypes,s=(o=o!=null)?Li(e,i):vo),t=new t(r,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=rd,e.stateNode=t,t._reactInternals=e,o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function fx(e,t,r,o){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,o),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,o),t.state!==e&&rd.enqueueReplaceState(t,t.state,null)}function Wh(e,t,r,o){var i=e.stateNode;i.props=r,i.state=e.memoizedState,i.refs=Qv,gp(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=Dr(s):(s=vr(t)?Ho:Gt.current,i.context=Li(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Uh(e,t,s,r),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&rd.enqueueReplaceState(i,i.state,null),mc(e,r,i,o),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function ps(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(Q(309));var o=r.stateNode}if(!o)throw Error(Q(147,e));var i=o,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(a){var c=i.refs;c===Qv&&(c=i.refs={}),a===null?delete c[s]:c[s]=a},t._stringRef=s,t)}if(typeof e!="string")throw Error(Q(284));if(!r._owner)throw Error(Q(290,e))}return e}function fl(e,t){throw e=Object.prototype.toString.call(t),Error(Q(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function px(e){var t=e._init;return t(e._payload)}function Gv(e){function t(w,g){if(e){var j=w.deletions;j===null?(w.deletions=[g],w.flags|=16):j.push(g)}}function r(w,g){if(!e)return null;for(;g!==null;)t(w,g),g=g.sibling;return null}function o(w,g){for(w=new Map;g!==null;)g.key!==null?w.set(g.key,g):w.set(g.index,g),g=g.sibling;return w}function i(w,g){return w=fo(w,g),w.index=0,w.sibling=null,w}function s(w,g,j){return w.index=j,e?(j=w.alternate,j!==null?(j=j.index,j<g?(w.flags|=2,g):j):(w.flags|=2,g)):(w.flags|=1048576,g)}function a(w){return e&&w.alternate===null&&(w.flags|=2),w}function c(w,g,j,y){return g===null||g.tag!==6?(g=Cu(j,w.mode,y),g.return=w,g):(g=i(g,j),g.return=w,g)}function l(w,g,j,y){var k=j.type;return k===di?u(w,g,j.props.children,y,j.key):g!==null&&(g.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===Xn&&px(k)===g.type)?(y=i(g,j.props),y.ref=ps(w,g,j),y.return=w,y):(y=Fl(j.type,j.key,j.props,null,w.mode,y),y.ref=ps(w,g,j),y.return=w,y)}function d(w,g,j,y){return g===null||g.tag!==4||g.stateNode.containerInfo!==j.containerInfo||g.stateNode.implementation!==j.implementation?(g=_u(j,w.mode,y),g.return=w,g):(g=i(g,j.children||[]),g.return=w,g)}function u(w,g,j,y,k){return g===null||g.tag!==7?(g=Fo(j,w.mode,y,k),g.return=w,g):(g=i(g,j),g.return=w,g)}function f(w,g,j){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Cu(""+g,w.mode,j),g.return=w,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case rl:return j=Fl(g.type,g.key,g.props,null,w.mode,j),j.ref=ps(w,null,g),j.return=w,j;case ci:return g=_u(g,w.mode,j),g.return=w,g;case Xn:var y=g._init;return f(w,y(g._payload),j)}if(Cs(g)||cs(g))return g=Fo(g,w.mode,j,null),g.return=w,g;fl(w,g)}return null}function m(w,g,j,y){var k=g!==null?g.key:null;if(typeof j=="string"&&j!==""||typeof j=="number")return k!==null?null:c(w,g,""+j,y);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case rl:return j.key===k?l(w,g,j,y):null;case ci:return j.key===k?d(w,g,j,y):null;case Xn:return k=j._init,m(w,g,k(j._payload),y)}if(Cs(j)||cs(j))return k!==null?null:u(w,g,j,y,null);fl(w,j)}return null}function b(w,g,j,y,k){if(typeof y=="string"&&y!==""||typeof y=="number")return w=w.get(j)||null,c(g,w,""+y,k);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case rl:return w=w.get(y.key===null?j:y.key)||null,l(g,w,y,k);case ci:return w=w.get(y.key===null?j:y.key)||null,d(g,w,y,k);case Xn:var _=y._init;return b(w,g,j,_(y._payload),k)}if(Cs(y)||cs(y))return w=w.get(j)||null,u(g,w,y,k,null);fl(g,y)}return null}function x(w,g,j,y){for(var k=null,_=null,E=g,N=g=0,T=null;E!==null&&N<j.length;N++){E.index>N?(T=E,E=null):T=E.sibling;var M=m(w,E,j[N],y);if(M===null){E===null&&(E=T);break}e&&E&&M.alternate===null&&t(w,E),g=s(M,g,N),_===null?k=M:_.sibling=M,_=M,E=T}if(N===j.length)return r(w,E),ct&&_o(w,N),k;if(E===null){for(;N<j.length;N++)E=f(w,j[N],y),E!==null&&(g=s(E,g,N),_===null?k=E:_.sibling=E,_=E);return ct&&_o(w,N),k}for(E=o(w,E);N<j.length;N++)T=b(E,w,N,j[N],y),T!==null&&(e&&T.alternate!==null&&E.delete(T.key===null?N:T.key),g=s(T,g,N),_===null?k=T:_.sibling=T,_=T);return e&&E.forEach(function(L){return t(w,L)}),ct&&_o(w,N),k}function h(w,g,j,y){var k=cs(j);if(typeof k!="function")throw Error(Q(150));if(j=k.call(j),j==null)throw Error(Q(151));for(var _=k=null,E=g,N=g=0,T=null,M=j.next();E!==null&&!M.done;N++,M=j.next()){E.index>N?(T=E,E=null):T=E.sibling;var L=m(w,E,M.value,y);if(L===null){E===null&&(E=T);break}e&&E&&L.alternate===null&&t(w,E),g=s(L,g,N),_===null?k=L:_.sibling=L,_=L,E=T}if(M.done)return r(w,E),ct&&_o(w,N),k;if(E===null){for(;!M.done;N++,M=j.next())M=f(w,M.value,y),M!==null&&(g=s(M,g,N),_===null?k=M:_.sibling=M,_=M);return ct&&_o(w,N),k}for(E=o(w,E);!M.done;N++,M=j.next())M=b(E,w,N,M.value,y),M!==null&&(e&&M.alternate!==null&&E.delete(M.key===null?N:M.key),g=s(M,g,N),_===null?k=M:_.sibling=M,_=M);return e&&E.forEach(function(I){return t(w,I)}),ct&&_o(w,N),k}function v(w,g,j,y){if(typeof j=="object"&&j!==null&&j.type===di&&j.key===null&&(j=j.props.children),typeof j=="object"&&j!==null){switch(j.$$typeof){case rl:e:{for(var k=j.key,_=g;_!==null;){if(_.key===k){if(k=j.type,k===di){if(_.tag===7){r(w,_.sibling),g=i(_,j.props.children),g.return=w,w=g;break e}}else if(_.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===Xn&&px(k)===_.type){r(w,_.sibling),g=i(_,j.props),g.ref=ps(w,_,j),g.return=w,w=g;break e}r(w,_);break}else t(w,_);_=_.sibling}j.type===di?(g=Fo(j.props.children,w.mode,y,j.key),g.return=w,w=g):(y=Fl(j.type,j.key,j.props,null,w.mode,y),y.ref=ps(w,g,j),y.return=w,w=y)}return a(w);case ci:e:{for(_=j.key;g!==null;){if(g.key===_)if(g.tag===4&&g.stateNode.containerInfo===j.containerInfo&&g.stateNode.implementation===j.implementation){r(w,g.sibling),g=i(g,j.children||[]),g.return=w,w=g;break e}else{r(w,g);break}else t(w,g);g=g.sibling}g=_u(j,w.mode,y),g.return=w,w=g}return a(w);case Xn:return _=j._init,v(w,g,_(j._payload),y)}if(Cs(j))return x(w,g,j,y);if(cs(j))return h(w,g,j,y);fl(w,j)}return typeof j=="string"&&j!==""||typeof j=="number"?(j=""+j,g!==null&&g.tag===6?(r(w,g.sibling),g=i(g,j),g.return=w,w=g):(r(w,g),g=Cu(j,w.mode,y),g.return=w,w=g),a(w)):r(w,g)}return v}var Ai=Gv(!0),Zv=Gv(!1),Va={},gn=So(Va),na=So(Va),oa=So(Va);function Ro(e){if(e===Va)throw Error(Q(174));return e}function vp(e,t){switch(et(oa,t),et(na,e),et(gn,Va),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:bh(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=bh(t,e)}ot(gn),et(gn,t)}function Di(){ot(gn),ot(na),ot(oa)}function Jv(e){Ro(oa.current);var t=Ro(gn.current),r=bh(t,e.type);t!==r&&(et(na,e),et(gn,r))}function wp(e){na.current===e&&(ot(gn),ot(na))}var ht=So(0);function xc(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var yu=[];function yp(){for(var e=0;e<yu.length;e++)yu[e]._workInProgressVersionPrimary=null;yu.length=0}var $l=Fn.ReactCurrentDispatcher,bu=Fn.ReactCurrentBatchConfig,qo=0,ft=null,Rt=null,It=null,gc=!1,Is=!1,ia=0,c2=0;function Yt(){throw Error(Q(321))}function bp(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!sn(e[r],t[r]))return!1;return!0}function jp(e,t,r,o,i,s){if(qo=s,ft=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,$l.current=e===null||e.memoizedState===null?f2:p2,e=r(o,i),Is){s=0;do{if(Is=!1,ia=0,25<=s)throw Error(Q(301));s+=1,It=Rt=null,t.updateQueue=null,$l.current=m2,e=r(o,i)}while(Is)}if($l.current=vc,t=Rt!==null&&Rt.next!==null,qo=0,It=Rt=ft=null,gc=!1,t)throw Error(Q(300));return e}function Sp(){var e=ia!==0;return ia=0,e}function hn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return It===null?ft.memoizedState=It=e:It=It.next=e,It}function Fr(){if(Rt===null){var e=ft.alternate;e=e!==null?e.memoizedState:null}else e=Rt.next;var t=It===null?ft.memoizedState:It.next;if(t!==null)It=t,Rt=e;else{if(e===null)throw Error(Q(310));Rt=e,e={memoizedState:Rt.memoizedState,baseState:Rt.baseState,baseQueue:Rt.baseQueue,queue:Rt.queue,next:null},It===null?ft.memoizedState=It=e:It=It.next=e}return It}function sa(e,t){return typeof t=="function"?t(e):t}function ju(e){var t=Fr(),r=t.queue;if(r===null)throw Error(Q(311));r.lastRenderedReducer=e;var o=Rt,i=o.baseQueue,s=r.pending;if(s!==null){if(i!==null){var a=i.next;i.next=s.next,s.next=a}o.baseQueue=i=s,r.pending=null}if(i!==null){s=i.next,o=o.baseState;var c=a=null,l=null,d=s;do{var u=d.lane;if((qo&u)===u)l!==null&&(l=l.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),o=d.hasEagerState?d.eagerState:e(o,d.action);else{var f={lane:u,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};l===null?(c=l=f,a=o):l=l.next=f,ft.lanes|=u,Yo|=u}d=d.next}while(d!==null&&d!==s);l===null?a=o:l.next=c,sn(o,t.memoizedState)||(pr=!0),t.memoizedState=o,t.baseState=a,t.baseQueue=l,r.lastRenderedState=o}if(e=r.interleaved,e!==null){i=e;do s=i.lane,ft.lanes|=s,Yo|=s,i=i.next;while(i!==e)}else i===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function Su(e){var t=Fr(),r=t.queue;if(r===null)throw Error(Q(311));r.lastRenderedReducer=e;var o=r.dispatch,i=r.pending,s=t.memoizedState;if(i!==null){r.pending=null;var a=i=i.next;do s=e(s,a.action),a=a.next;while(a!==i);sn(s,t.memoizedState)||(pr=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),r.lastRenderedState=s}return[s,o]}function ew(){}function tw(e,t){var r=ft,o=Fr(),i=t(),s=!sn(o.memoizedState,i);if(s&&(o.memoizedState=i,pr=!0),o=o.queue,kp(ow.bind(null,r,o,e),[e]),o.getSnapshot!==t||s||It!==null&&It.memoizedState.tag&1){if(r.flags|=2048,aa(9,nw.bind(null,r,o,i,t),void 0,null),Dt===null)throw Error(Q(349));qo&30||rw(r,t,i)}return i}function rw(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=ft.updateQueue,t===null?(t={lastEffect:null,stores:null},ft.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function nw(e,t,r,o){t.value=r,t.getSnapshot=o,iw(t)&&sw(e)}function ow(e,t,r){return r(function(){iw(t)&&sw(e)})}function iw(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!sn(e,r)}catch{return!0}}function sw(e){var t=Ln(e,1);t!==null&&nn(t,e,1,-1)}function mx(e){var t=hn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:sa,lastRenderedState:e},t.queue=e,e=e.dispatch=h2.bind(null,ft,e),[t.memoizedState,e]}function aa(e,t,r,o){return e={tag:e,create:t,destroy:r,deps:o,next:null},t=ft.updateQueue,t===null?(t={lastEffect:null,stores:null},ft.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(o=r.next,r.next=e,e.next=o,t.lastEffect=e)),e}function aw(){return Fr().memoizedState}function Ll(e,t,r,o){var i=hn();ft.flags|=e,i.memoizedState=aa(1|t,r,void 0,o===void 0?null:o)}function nd(e,t,r,o){var i=Fr();o=o===void 0?null:o;var s=void 0;if(Rt!==null){var a=Rt.memoizedState;if(s=a.destroy,o!==null&&bp(o,a.deps)){i.memoizedState=aa(t,r,s,o);return}}ft.flags|=e,i.memoizedState=aa(1|t,r,s,o)}function xx(e,t){return Ll(8390656,8,e,t)}function kp(e,t){return nd(2048,8,e,t)}function lw(e,t){return nd(4,2,e,t)}function cw(e,t){return nd(4,4,e,t)}function dw(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function uw(e,t,r){return r=r!=null?r.concat([e]):null,nd(4,4,dw.bind(null,t,e),r)}function Np(){}function hw(e,t){var r=Fr();t=t===void 0?null:t;var o=r.memoizedState;return o!==null&&t!==null&&bp(t,o[1])?o[0]:(r.memoizedState=[e,t],e)}function fw(e,t){var r=Fr();t=t===void 0?null:t;var o=r.memoizedState;return o!==null&&t!==null&&bp(t,o[1])?o[0]:(e=e(),r.memoizedState=[e,t],e)}function pw(e,t,r){return qo&21?(sn(r,t)||(r=gv(),ft.lanes|=r,Yo|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,pr=!0),e.memoizedState=r)}function d2(e,t){var r=Ue;Ue=r!==0&&4>r?r:4,e(!0);var o=bu.transition;bu.transition={};try{e(!1),t()}finally{Ue=r,bu.transition=o}}function mw(){return Fr().memoizedState}function u2(e,t,r){var o=ho(e);if(r={lane:o,action:r,hasEagerState:!1,eagerState:null,next:null},xw(e))gw(t,r);else if(r=Yv(e,t,r,o),r!==null){var i=sr();nn(r,e,o,i),vw(r,t,o)}}function h2(e,t,r){var o=ho(e),i={lane:o,action:r,hasEagerState:!1,eagerState:null,next:null};if(xw(e))gw(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var a=t.lastRenderedState,c=s(a,r);if(i.hasEagerState=!0,i.eagerState=c,sn(c,a)){var l=t.interleaved;l===null?(i.next=i,xp(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}r=Yv(e,t,i,o),r!==null&&(i=sr(),nn(r,e,o,i),vw(r,t,o))}}function xw(e){var t=e.alternate;return e===ft||t!==null&&t===ft}function gw(e,t){Is=gc=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function vw(e,t,r){if(r&4194240){var o=t.lanes;o&=e.pendingLanes,r|=o,t.lanes=r,rp(e,r)}}var vc={readContext:Dr,useCallback:Yt,useContext:Yt,useEffect:Yt,useImperativeHandle:Yt,useInsertionEffect:Yt,useLayoutEffect:Yt,useMemo:Yt,useReducer:Yt,useRef:Yt,useState:Yt,useDebugValue:Yt,useDeferredValue:Yt,useTransition:Yt,useMutableSource:Yt,useSyncExternalStore:Yt,useId:Yt,unstable_isNewReconciler:!1},f2={readContext:Dr,useCallback:function(e,t){return hn().memoizedState=[e,t===void 0?null:t],e},useContext:Dr,useEffect:xx,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Ll(4194308,4,dw.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Ll(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ll(4,2,e,t)},useMemo:function(e,t){var r=hn();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var o=hn();return t=r!==void 0?r(t):t,o.memoizedState=o.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},o.queue=e,e=e.dispatch=u2.bind(null,ft,e),[o.memoizedState,e]},useRef:function(e){var t=hn();return e={current:e},t.memoizedState=e},useState:mx,useDebugValue:Np,useDeferredValue:function(e){return hn().memoizedState=e},useTransition:function(){var e=mx(!1),t=e[0];return e=d2.bind(null,e[1]),hn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var o=ft,i=hn();if(ct){if(r===void 0)throw Error(Q(407));r=r()}else{if(r=t(),Dt===null)throw Error(Q(349));qo&30||rw(o,t,r)}i.memoizedState=r;var s={value:r,getSnapshot:t};return i.queue=s,xx(ow.bind(null,o,s,e),[e]),o.flags|=2048,aa(9,nw.bind(null,o,s,r,t),void 0,null),r},useId:function(){var e=hn(),t=Dt.identifierPrefix;if(ct){var r=Cn,o=Nn;r=(o&~(1<<32-rn(o)-1)).toString(32)+r,t=":"+t+"R"+r,r=ia++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=c2++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},p2={readContext:Dr,useCallback:hw,useContext:Dr,useEffect:kp,useImperativeHandle:uw,useInsertionEffect:lw,useLayoutEffect:cw,useMemo:fw,useReducer:ju,useRef:aw,useState:function(){return ju(sa)},useDebugValue:Np,useDeferredValue:function(e){var t=Fr();return pw(t,Rt.memoizedState,e)},useTransition:function(){var e=ju(sa)[0],t=Fr().memoizedState;return[e,t]},useMutableSource:ew,useSyncExternalStore:tw,useId:mw,unstable_isNewReconciler:!1},m2={readContext:Dr,useCallback:hw,useContext:Dr,useEffect:kp,useImperativeHandle:uw,useInsertionEffect:lw,useLayoutEffect:cw,useMemo:fw,useReducer:Su,useRef:aw,useState:function(){return Su(sa)},useDebugValue:Np,useDeferredValue:function(e){var t=Fr();return Rt===null?t.memoizedState=e:pw(t,Rt.memoizedState,e)},useTransition:function(){var e=Su(sa)[0],t=Fr().memoizedState;return[e,t]},useMutableSource:ew,useSyncExternalStore:tw,useId:mw,unstable_isNewReconciler:!1};function Fi(e,t){try{var r="",o=t;do r+=Wb(o),o=o.return;while(o);var i=r}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function ku(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Hh(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var x2=typeof WeakMap=="function"?WeakMap:Map;function ww(e,t,r){r=_n(-1,r),r.tag=3,r.payload={element:null};var o=t.value;return r.callback=function(){yc||(yc=!0,ef=o),Hh(e,t)},r}function yw(e,t,r){r=_n(-1,r),r.tag=3;var o=e.type.getDerivedStateFromError;if(typeof o=="function"){var i=t.value;r.payload=function(){return o(i)},r.callback=function(){Hh(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(r.callback=function(){Hh(e,t),typeof o!="function"&&(uo===null?uo=new Set([this]):uo.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),r}function gx(e,t,r){var o=e.pingCache;if(o===null){o=e.pingCache=new x2;var i=new Set;o.set(t,i)}else i=o.get(t),i===void 0&&(i=new Set,o.set(t,i));i.has(r)||(i.add(r),e=P2.bind(null,e,t,r),t.then(e,e))}function vx(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function wx(e,t,r,o,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=_n(-1,1),t.tag=2,co(r,t,1))),r.lanes|=1),e)}var g2=Fn.ReactCurrentOwner,pr=!1;function ir(e,t,r,o){t.child=e===null?Zv(t,null,r,o):Ai(t,e.child,r,o)}function yx(e,t,r,o,i){r=r.render;var s=t.ref;return Ti(t,i),o=jp(e,t,r,o,s,i),r=Sp(),e!==null&&!pr?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,In(e,t,i)):(ct&&r&&dp(t),t.flags|=1,ir(e,t,o,i),t.child)}function bx(e,t,r,o,i){if(e===null){var s=r.type;return typeof s=="function"&&!Rp(s)&&s.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=s,bw(e,t,s,o,i)):(e=Fl(r.type,null,o,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var a=s.memoizedProps;if(r=r.compare,r=r!==null?r:Js,r(a,o)&&e.ref===t.ref)return In(e,t,i)}return t.flags|=1,e=fo(s,o),e.ref=t.ref,e.return=t,t.child=e}function bw(e,t,r,o,i){if(e!==null){var s=e.memoizedProps;if(Js(s,o)&&e.ref===t.ref)if(pr=!1,t.pendingProps=o=s,(e.lanes&i)!==0)e.flags&131072&&(pr=!0);else return t.lanes=e.lanes,In(e,t,i)}return Vh(e,t,r,o,i)}function jw(e,t,r){var o=t.pendingProps,i=o.children,s=e!==null?e.memoizedState:null;if(o.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},et(yi,br),br|=r;else{if(!(r&1073741824))return e=s!==null?s.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,et(yi,br),br|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},o=s!==null?s.baseLanes:r,et(yi,br),br|=o}else s!==null?(o=s.baseLanes|r,t.memoizedState=null):o=r,et(yi,br),br|=o;return ir(e,t,i,r),t.child}function Sw(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Vh(e,t,r,o,i){var s=vr(r)?Ho:Gt.current;return s=Li(t,s),Ti(t,i),r=jp(e,t,r,o,s,i),o=Sp(),e!==null&&!pr?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,In(e,t,i)):(ct&&o&&dp(t),t.flags|=1,ir(e,t,r,i),t.child)}function jx(e,t,r,o,i){if(vr(r)){var s=!0;dc(t)}else s=!1;if(Ti(t,i),t.stateNode===null)Il(e,t),Xv(t,r,o),Wh(t,r,o,i),o=!0;else if(e===null){var a=t.stateNode,c=t.memoizedProps;a.props=c;var l=a.context,d=r.contextType;typeof d=="object"&&d!==null?d=Dr(d):(d=vr(r)?Ho:Gt.current,d=Li(t,d));var u=r.getDerivedStateFromProps,f=typeof u=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(c!==o||l!==d)&&fx(t,a,o,d),Gn=!1;var m=t.memoizedState;a.state=m,mc(t,o,a,i),l=t.memoizedState,c!==o||m!==l||gr.current||Gn?(typeof u=="function"&&(Uh(t,r,u,o),l=t.memoizedState),(c=Gn||hx(t,r,c,o,m,l,d))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=o,t.memoizedState=l),a.props=o,a.state=l,a.context=d,o=c):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),o=!1)}else{a=t.stateNode,Kv(e,t),c=t.memoizedProps,d=t.type===t.elementType?c:Xr(t.type,c),a.props=d,f=t.pendingProps,m=a.context,l=r.contextType,typeof l=="object"&&l!==null?l=Dr(l):(l=vr(r)?Ho:Gt.current,l=Li(t,l));var b=r.getDerivedStateFromProps;(u=typeof b=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(c!==f||m!==l)&&fx(t,a,o,l),Gn=!1,m=t.memoizedState,a.state=m,mc(t,o,a,i);var x=t.memoizedState;c!==f||m!==x||gr.current||Gn?(typeof b=="function"&&(Uh(t,r,b,o),x=t.memoizedState),(d=Gn||hx(t,r,d,o,m,x,l)||!1)?(u||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(o,x,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(o,x,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=o,t.memoizedState=x),a.props=o,a.state=x,a.context=l,o=d):(typeof a.componentDidUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),o=!1)}return qh(e,t,r,o,s,i)}function qh(e,t,r,o,i,s){Sw(e,t);var a=(t.flags&128)!==0;if(!o&&!a)return i&&ax(t,r,!1),In(e,t,s);o=t.stateNode,g2.current=t;var c=a&&typeof r.getDerivedStateFromError!="function"?null:o.render();return t.flags|=1,e!==null&&a?(t.child=Ai(t,e.child,null,s),t.child=Ai(t,null,c,s)):ir(e,t,c,s),t.memoizedState=o.state,i&&ax(t,r,!0),t.child}function kw(e){var t=e.stateNode;t.pendingContext?sx(e,t.pendingContext,t.pendingContext!==t.context):t.context&&sx(e,t.context,!1),vp(e,t.containerInfo)}function Sx(e,t,r,o,i){return Ii(),hp(i),t.flags|=256,ir(e,t,r,o),t.child}var Yh={dehydrated:null,treeContext:null,retryLane:0};function Kh(e){return{baseLanes:e,cachePool:null,transitions:null}}function Nw(e,t,r){var o=t.pendingProps,i=ht.current,s=!1,a=(t.flags&128)!==0,c;if((c=a)||(c=e!==null&&e.memoizedState===null?!1:(i&2)!==0),c?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),et(ht,i&1),e===null)return Fh(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=o.children,e=o.fallback,s?(o=t.mode,s=t.child,a={mode:"hidden",children:a},!(o&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=sd(a,o,0,null),e=Fo(e,o,r,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Kh(r),t.memoizedState=Yh,e):Cp(t,a));if(i=e.memoizedState,i!==null&&(c=i.dehydrated,c!==null))return v2(e,t,a,o,c,i,r);if(s){s=o.fallback,a=t.mode,i=e.child,c=i.sibling;var l={mode:"hidden",children:o.children};return!(a&1)&&t.child!==i?(o=t.child,o.childLanes=0,o.pendingProps=l,t.deletions=null):(o=fo(i,l),o.subtreeFlags=i.subtreeFlags&14680064),c!==null?s=fo(c,s):(s=Fo(s,a,r,null),s.flags|=2),s.return=t,o.return=t,o.sibling=s,t.child=o,o=s,s=t.child,a=e.child.memoizedState,a=a===null?Kh(r):{baseLanes:a.baseLanes|r,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=e.childLanes&~r,t.memoizedState=Yh,o}return s=e.child,e=s.sibling,o=fo(s,{mode:"visible",children:o.children}),!(t.mode&1)&&(o.lanes=r),o.return=t,o.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=o,t.memoizedState=null,o}function Cp(e,t){return t=sd({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function pl(e,t,r,o){return o!==null&&hp(o),Ai(t,e.child,null,r),e=Cp(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function v2(e,t,r,o,i,s,a){if(r)return t.flags&256?(t.flags&=-257,o=ku(Error(Q(422))),pl(e,t,a,o)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=o.fallback,i=t.mode,o=sd({mode:"visible",children:o.children},i,0,null),s=Fo(s,i,a,null),s.flags|=2,o.return=t,s.return=t,o.sibling=s,t.child=o,t.mode&1&&Ai(t,e.child,null,a),t.child.memoizedState=Kh(a),t.memoizedState=Yh,s);if(!(t.mode&1))return pl(e,t,a,null);if(i.data==="$!"){if(o=i.nextSibling&&i.nextSibling.dataset,o)var c=o.dgst;return o=c,s=Error(Q(419)),o=ku(s,o,void 0),pl(e,t,a,o)}if(c=(a&e.childLanes)!==0,pr||c){if(o=Dt,o!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(o.suspendedLanes|a)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Ln(e,i),nn(o,e,i,-1))}return zp(),o=ku(Error(Q(421))),pl(e,t,a,o)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=O2.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,jr=lo(i.nextSibling),Sr=t,ct=!0,Jr=null,e!==null&&(Rr[Mr++]=Nn,Rr[Mr++]=Cn,Rr[Mr++]=Vo,Nn=e.id,Cn=e.overflow,Vo=t),t=Cp(t,o.children),t.flags|=4096,t)}function kx(e,t,r){e.lanes|=t;var o=e.alternate;o!==null&&(o.lanes|=t),Bh(e.return,t,r)}function Nu(e,t,r,o,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:o,tail:r,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=o,s.tail=r,s.tailMode=i)}function Cw(e,t,r){var o=t.pendingProps,i=o.revealOrder,s=o.tail;if(ir(e,t,o.children,r),o=ht.current,o&2)o=o&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kx(e,r,t);else if(e.tag===19)kx(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}o&=1}if(et(ht,o),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(r=t.child,i=null;r!==null;)e=r.alternate,e!==null&&xc(e)===null&&(i=r),r=r.sibling;r=i,r===null?(i=t.child,t.child=null):(i=r.sibling,r.sibling=null),Nu(t,!1,i,r,s);break;case"backwards":for(r=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&xc(e)===null){t.child=i;break}e=i.sibling,i.sibling=r,r=i,i=e}Nu(t,!0,r,null,s);break;case"together":Nu(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Il(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function In(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Yo|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(Q(153));if(t.child!==null){for(e=t.child,r=fo(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=fo(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function w2(e,t,r){switch(t.tag){case 3:kw(t),Ii();break;case 5:Jv(t);break;case 1:vr(t.type)&&dc(t);break;case 4:vp(t,t.stateNode.containerInfo);break;case 10:var o=t.type._context,i=t.memoizedProps.value;et(fc,o._currentValue),o._currentValue=i;break;case 13:if(o=t.memoizedState,o!==null)return o.dehydrated!==null?(et(ht,ht.current&1),t.flags|=128,null):r&t.child.childLanes?Nw(e,t,r):(et(ht,ht.current&1),e=In(e,t,r),e!==null?e.sibling:null);et(ht,ht.current&1);break;case 19:if(o=(r&t.childLanes)!==0,e.flags&128){if(o)return Cw(e,t,r);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),et(ht,ht.current),o)break;return null;case 22:case 23:return t.lanes=0,jw(e,t,r)}return In(e,t,r)}var _w,Qh,Ew,Tw;_w=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};Qh=function(){};Ew=function(e,t,r,o){var i=e.memoizedProps;if(i!==o){e=t.stateNode,Ro(gn.current);var s=null;switch(r){case"input":i=gh(e,i),o=gh(e,o),s=[];break;case"select":i=mt({},i,{value:void 0}),o=mt({},o,{value:void 0}),s=[];break;case"textarea":i=yh(e,i),o=yh(e,o),s=[];break;default:typeof i.onClick!="function"&&typeof o.onClick=="function"&&(e.onclick=lc)}jh(r,o);var a;r=null;for(d in i)if(!o.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var c=i[d];for(a in c)c.hasOwnProperty(a)&&(r||(r={}),r[a]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(qs.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in o){var l=o[d];if(c=i!=null?i[d]:void 0,o.hasOwnProperty(d)&&l!==c&&(l!=null||c!=null))if(d==="style")if(c){for(a in c)!c.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(r||(r={}),r[a]="");for(a in l)l.hasOwnProperty(a)&&c[a]!==l[a]&&(r||(r={}),r[a]=l[a])}else r||(s||(s=[]),s.push(d,r)),r=l;else d==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,c=c?c.__html:void 0,l!=null&&c!==l&&(s=s||[]).push(d,l)):d==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(d,""+l):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(qs.hasOwnProperty(d)?(l!=null&&d==="onScroll"&&rt("scroll",e),s||c===l||(s=[])):(s=s||[]).push(d,l))}r&&(s=s||[]).push("style",r);var d=s;(t.updateQueue=d)&&(t.flags|=4)}};Tw=function(e,t,r,o){r!==o&&(t.flags|=4)};function ms(e,t){if(!ct)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Kt(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,o=0;if(t)for(var i=e.child;i!==null;)r|=i.lanes|i.childLanes,o|=i.subtreeFlags&14680064,o|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)r|=i.lanes|i.childLanes,o|=i.subtreeFlags,o|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=o,e.childLanes=r,t}function y2(e,t,r){var o=t.pendingProps;switch(up(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Kt(t),null;case 1:return vr(t.type)&&cc(),Kt(t),null;case 3:return o=t.stateNode,Di(),ot(gr),ot(Gt),yp(),o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),(e===null||e.child===null)&&(hl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Jr!==null&&(nf(Jr),Jr=null))),Qh(e,t),Kt(t),null;case 5:wp(t);var i=Ro(oa.current);if(r=t.type,e!==null&&t.stateNode!=null)Ew(e,t,r,o,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!o){if(t.stateNode===null)throw Error(Q(166));return Kt(t),null}if(e=Ro(gn.current),hl(t)){o=t.stateNode,r=t.type;var s=t.memoizedProps;switch(o[pn]=t,o[ra]=s,e=(t.mode&1)!==0,r){case"dialog":rt("cancel",o),rt("close",o);break;case"iframe":case"object":case"embed":rt("load",o);break;case"video":case"audio":for(i=0;i<Es.length;i++)rt(Es[i],o);break;case"source":rt("error",o);break;case"img":case"image":case"link":rt("error",o),rt("load",o);break;case"details":rt("toggle",o);break;case"input":Rm(o,s),rt("invalid",o);break;case"select":o._wrapperState={wasMultiple:!!s.multiple},rt("invalid",o);break;case"textarea":$m(o,s),rt("invalid",o)}jh(r,s),i=null;for(var a in s)if(s.hasOwnProperty(a)){var c=s[a];a==="children"?typeof c=="string"?o.textContent!==c&&(s.suppressHydrationWarning!==!0&&ul(o.textContent,c,e),i=["children",c]):typeof c=="number"&&o.textContent!==""+c&&(s.suppressHydrationWarning!==!0&&ul(o.textContent,c,e),i=["children",""+c]):qs.hasOwnProperty(a)&&c!=null&&a==="onScroll"&&rt("scroll",o)}switch(r){case"input":nl(o),Mm(o,s,!0);break;case"textarea":nl(o),Lm(o);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(o.onclick=lc)}o=i,t.updateQueue=o,o!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=rv(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof o.is=="string"?e=a.createElement(r,{is:o.is}):(e=a.createElement(r),r==="select"&&(a=e,o.multiple?a.multiple=!0:o.size&&(a.size=o.size))):e=a.createElementNS(e,r),e[pn]=t,e[ra]=o,_w(e,t,!1,!1),t.stateNode=e;e:{switch(a=Sh(r,o),r){case"dialog":rt("cancel",e),rt("close",e),i=o;break;case"iframe":case"object":case"embed":rt("load",e),i=o;break;case"video":case"audio":for(i=0;i<Es.length;i++)rt(Es[i],e);i=o;break;case"source":rt("error",e),i=o;break;case"img":case"image":case"link":rt("error",e),rt("load",e),i=o;break;case"details":rt("toggle",e),i=o;break;case"input":Rm(e,o),i=gh(e,o),rt("invalid",e);break;case"option":i=o;break;case"select":e._wrapperState={wasMultiple:!!o.multiple},i=mt({},o,{value:void 0}),rt("invalid",e);break;case"textarea":$m(e,o),i=yh(e,o),rt("invalid",e);break;default:i=o}jh(r,i),c=i;for(s in c)if(c.hasOwnProperty(s)){var l=c[s];s==="style"?iv(e,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&nv(e,l)):s==="children"?typeof l=="string"?(r!=="textarea"||l!=="")&&Ys(e,l):typeof l=="number"&&Ys(e,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(qs.hasOwnProperty(s)?l!=null&&s==="onScroll"&&rt("scroll",e):l!=null&&Xf(e,s,l,a))}switch(r){case"input":nl(e),Mm(e,o,!1);break;case"textarea":nl(e),Lm(e);break;case"option":o.value!=null&&e.setAttribute("value",""+go(o.value));break;case"select":e.multiple=!!o.multiple,s=o.value,s!=null?Ni(e,!!o.multiple,s,!1):o.defaultValue!=null&&Ni(e,!!o.multiple,o.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=lc)}switch(r){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}}o&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Kt(t),null;case 6:if(e&&t.stateNode!=null)Tw(e,t,e.memoizedProps,o);else{if(typeof o!="string"&&t.stateNode===null)throw Error(Q(166));if(r=Ro(oa.current),Ro(gn.current),hl(t)){if(o=t.stateNode,r=t.memoizedProps,o[pn]=t,(s=o.nodeValue!==r)&&(e=Sr,e!==null))switch(e.tag){case 3:ul(o.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ul(o.nodeValue,r,(e.mode&1)!==0)}s&&(t.flags|=4)}else o=(r.nodeType===9?r:r.ownerDocument).createTextNode(o),o[pn]=t,t.stateNode=o}return Kt(t),null;case 13:if(ot(ht),o=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ct&&jr!==null&&t.mode&1&&!(t.flags&128))qv(),Ii(),t.flags|=98560,s=!1;else if(s=hl(t),o!==null&&o.dehydrated!==null){if(e===null){if(!s)throw Error(Q(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(Q(317));s[pn]=t}else Ii(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Kt(t),s=!1}else Jr!==null&&(nf(Jr),Jr=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(o=o!==null,o!==(e!==null&&e.memoizedState!==null)&&o&&(t.child.flags|=8192,t.mode&1&&(e===null||ht.current&1?Mt===0&&(Mt=3):zp())),t.updateQueue!==null&&(t.flags|=4),Kt(t),null);case 4:return Di(),Qh(e,t),e===null&&ea(t.stateNode.containerInfo),Kt(t),null;case 10:return mp(t.type._context),Kt(t),null;case 17:return vr(t.type)&&cc(),Kt(t),null;case 19:if(ot(ht),s=t.memoizedState,s===null)return Kt(t),null;if(o=(t.flags&128)!==0,a=s.rendering,a===null)if(o)ms(s,!1);else{if(Mt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=xc(e),a!==null){for(t.flags|=128,ms(s,!1),o=a.updateQueue,o!==null&&(t.updateQueue=o,t.flags|=4),t.subtreeFlags=0,o=r,r=t.child;r!==null;)s=r,e=o,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,e=a.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return et(ht,ht.current&1|2),t.child}e=e.sibling}s.tail!==null&&jt()>Bi&&(t.flags|=128,o=!0,ms(s,!1),t.lanes=4194304)}else{if(!o)if(e=xc(a),e!==null){if(t.flags|=128,o=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),ms(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!ct)return Kt(t),null}else 2*jt()-s.renderingStartTime>Bi&&r!==1073741824&&(t.flags|=128,o=!0,ms(s,!1),t.lanes=4194304);s.isBackwards?(a.sibling=t.child,t.child=a):(r=s.last,r!==null?r.sibling=a:t.child=a,s.last=a)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=jt(),t.sibling=null,r=ht.current,et(ht,o?r&1|2:r&1),t):(Kt(t),null);case 22:case 23:return Op(),o=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==o&&(t.flags|=8192),o&&t.mode&1?br&1073741824&&(Kt(t),t.subtreeFlags&6&&(t.flags|=8192)):Kt(t),null;case 24:return null;case 25:return null}throw Error(Q(156,t.tag))}function b2(e,t){switch(up(t),t.tag){case 1:return vr(t.type)&&cc(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Di(),ot(gr),ot(Gt),yp(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return wp(t),null;case 13:if(ot(ht),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(Q(340));Ii()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ot(ht),null;case 4:return Di(),null;case 10:return mp(t.type._context),null;case 22:case 23:return Op(),null;case 24:return null;default:return null}}var ml=!1,Xt=!1,j2=typeof WeakSet=="function"?WeakSet:Set,se=null;function wi(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(o){wt(e,t,o)}else r.current=null}function Xh(e,t,r){try{r()}catch(o){wt(e,t,o)}}var Nx=!1;function S2(e,t){if(Rh=ic,e=Rv(),cp(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var o=r.getSelection&&r.getSelection();if(o&&o.rangeCount!==0){r=o.anchorNode;var i=o.anchorOffset,s=o.focusNode;o=o.focusOffset;try{r.nodeType,s.nodeType}catch{r=null;break e}var a=0,c=-1,l=-1,d=0,u=0,f=e,m=null;t:for(;;){for(var b;f!==r||i!==0&&f.nodeType!==3||(c=a+i),f!==s||o!==0&&f.nodeType!==3||(l=a+o),f.nodeType===3&&(a+=f.nodeValue.length),(b=f.firstChild)!==null;)m=f,f=b;for(;;){if(f===e)break t;if(m===r&&++d===i&&(c=a),m===s&&++u===o&&(l=a),(b=f.nextSibling)!==null)break;f=m,m=f.parentNode}f=b}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r=r||{start:0,end:0}}else r=null;for(Mh={focusedElem:e,selectionRange:r},ic=!1,se=t;se!==null;)if(t=se,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,se=e;else for(;se!==null;){t=se;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var h=x.memoizedProps,v=x.memoizedState,w=t.stateNode,g=w.getSnapshotBeforeUpdate(t.elementType===t.type?h:Xr(t.type,h),v);w.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var j=t.stateNode.containerInfo;j.nodeType===1?j.textContent="":j.nodeType===9&&j.documentElement&&j.removeChild(j.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(Q(163))}}catch(y){wt(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,se=e;break}se=t.return}return x=Nx,Nx=!1,x}function As(e,t,r){var o=t.updateQueue;if(o=o!==null?o.lastEffect:null,o!==null){var i=o=o.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&Xh(t,r,s)}i=i.next}while(i!==o)}}function od(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var o=r.create;r.destroy=o()}r=r.next}while(r!==t)}}function Gh(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Pw(e){var t=e.alternate;t!==null&&(e.alternate=null,Pw(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[pn],delete t[ra],delete t[Ih],delete t[i2],delete t[s2])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ow(e){return e.tag===5||e.tag===3||e.tag===4}function Cx(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ow(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Zh(e,t,r){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=lc));else if(o!==4&&(e=e.child,e!==null))for(Zh(e,t,r),e=e.sibling;e!==null;)Zh(e,t,r),e=e.sibling}function Jh(e,t,r){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(o!==4&&(e=e.child,e!==null))for(Jh(e,t,r),e=e.sibling;e!==null;)Jh(e,t,r),e=e.sibling}var Wt=null,Gr=!1;function Wn(e,t,r){for(r=r.child;r!==null;)zw(e,t,r),r=r.sibling}function zw(e,t,r){if(xn&&typeof xn.onCommitFiberUnmount=="function")try{xn.onCommitFiberUnmount(Xc,r)}catch{}switch(r.tag){case 5:Xt||wi(r,t);case 6:var o=Wt,i=Gr;Wt=null,Wn(e,t,r),Wt=o,Gr=i,Wt!==null&&(Gr?(e=Wt,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):Wt.removeChild(r.stateNode));break;case 18:Wt!==null&&(Gr?(e=Wt,r=r.stateNode,e.nodeType===8?vu(e.parentNode,r):e.nodeType===1&&vu(e,r),Gs(e)):vu(Wt,r.stateNode));break;case 4:o=Wt,i=Gr,Wt=r.stateNode.containerInfo,Gr=!0,Wn(e,t,r),Wt=o,Gr=i;break;case 0:case 11:case 14:case 15:if(!Xt&&(o=r.updateQueue,o!==null&&(o=o.lastEffect,o!==null))){i=o=o.next;do{var s=i,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Xh(r,t,a),i=i.next}while(i!==o)}Wn(e,t,r);break;case 1:if(!Xt&&(wi(r,t),o=r.stateNode,typeof o.componentWillUnmount=="function"))try{o.props=r.memoizedProps,o.state=r.memoizedState,o.componentWillUnmount()}catch(c){wt(r,t,c)}Wn(e,t,r);break;case 21:Wn(e,t,r);break;case 22:r.mode&1?(Xt=(o=Xt)||r.memoizedState!==null,Wn(e,t,r),Xt=o):Wn(e,t,r);break;default:Wn(e,t,r)}}function _x(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new j2),t.forEach(function(o){var i=z2.bind(null,e,o);r.has(o)||(r.add(o),o.then(i,i))})}}function Qr(e,t){var r=t.deletions;if(r!==null)for(var o=0;o<r.length;o++){var i=r[o];try{var s=e,a=t,c=a;e:for(;c!==null;){switch(c.tag){case 5:Wt=c.stateNode,Gr=!1;break e;case 3:Wt=c.stateNode.containerInfo,Gr=!0;break e;case 4:Wt=c.stateNode.containerInfo,Gr=!0;break e}c=c.return}if(Wt===null)throw Error(Q(160));zw(s,a,i),Wt=null,Gr=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(d){wt(i,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Rw(t,e),t=t.sibling}function Rw(e,t){var r=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Qr(t,e),un(e),o&4){try{As(3,e,e.return),od(3,e)}catch(h){wt(e,e.return,h)}try{As(5,e,e.return)}catch(h){wt(e,e.return,h)}}break;case 1:Qr(t,e),un(e),o&512&&r!==null&&wi(r,r.return);break;case 5:if(Qr(t,e),un(e),o&512&&r!==null&&wi(r,r.return),e.flags&32){var i=e.stateNode;try{Ys(i,"")}catch(h){wt(e,e.return,h)}}if(o&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,a=r!==null?r.memoizedProps:s,c=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{c==="input"&&s.type==="radio"&&s.name!=null&&ev(i,s),Sh(c,a);var d=Sh(c,s);for(a=0;a<l.length;a+=2){var u=l[a],f=l[a+1];u==="style"?iv(i,f):u==="dangerouslySetInnerHTML"?nv(i,f):u==="children"?Ys(i,f):Xf(i,u,f,d)}switch(c){case"input":vh(i,s);break;case"textarea":tv(i,s);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var b=s.value;b!=null?Ni(i,!!s.multiple,b,!1):m!==!!s.multiple&&(s.defaultValue!=null?Ni(i,!!s.multiple,s.defaultValue,!0):Ni(i,!!s.multiple,s.multiple?[]:"",!1))}i[ra]=s}catch(h){wt(e,e.return,h)}}break;case 6:if(Qr(t,e),un(e),o&4){if(e.stateNode===null)throw Error(Q(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(h){wt(e,e.return,h)}}break;case 3:if(Qr(t,e),un(e),o&4&&r!==null&&r.memoizedState.isDehydrated)try{Gs(t.containerInfo)}catch(h){wt(e,e.return,h)}break;case 4:Qr(t,e),un(e);break;case 13:Qr(t,e),un(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Tp=jt())),o&4&&_x(e);break;case 22:if(u=r!==null&&r.memoizedState!==null,e.mode&1?(Xt=(d=Xt)||u,Qr(t,e),Xt=d):Qr(t,e),un(e),o&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!u&&e.mode&1)for(se=e,u=e.child;u!==null;){for(f=se=u;se!==null;){switch(m=se,b=m.child,m.tag){case 0:case 11:case 14:case 15:As(4,m,m.return);break;case 1:wi(m,m.return);var x=m.stateNode;if(typeof x.componentWillUnmount=="function"){o=m,r=m.return;try{t=o,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(h){wt(o,r,h)}}break;case 5:wi(m,m.return);break;case 22:if(m.memoizedState!==null){Tx(f);continue}}b!==null?(b.return=m,se=b):Tx(f)}u=u.sibling}e:for(u=null,f=e;;){if(f.tag===5){if(u===null){u=f;try{i=f.stateNode,d?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(c=f.stateNode,l=f.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,c.style.display=ov("display",a))}catch(h){wt(e,e.return,h)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(h){wt(e,e.return,h)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Qr(t,e),un(e),o&4&&_x(e);break;case 21:break;default:Qr(t,e),un(e)}}function un(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Ow(r)){var o=r;break e}r=r.return}throw Error(Q(160))}switch(o.tag){case 5:var i=o.stateNode;o.flags&32&&(Ys(i,""),o.flags&=-33);var s=Cx(e);Jh(e,s,i);break;case 3:case 4:var a=o.stateNode.containerInfo,c=Cx(e);Zh(e,c,a);break;default:throw Error(Q(161))}}catch(l){wt(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function k2(e,t,r){se=e,Mw(e)}function Mw(e,t,r){for(var o=(e.mode&1)!==0;se!==null;){var i=se,s=i.child;if(i.tag===22&&o){var a=i.memoizedState!==null||ml;if(!a){var c=i.alternate,l=c!==null&&c.memoizedState!==null||Xt;c=ml;var d=Xt;if(ml=a,(Xt=l)&&!d)for(se=i;se!==null;)a=se,l=a.child,a.tag===22&&a.memoizedState!==null?Px(i):l!==null?(l.return=a,se=l):Px(i);for(;s!==null;)se=s,Mw(s),s=s.sibling;se=i,ml=c,Xt=d}Ex(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,se=s):Ex(e)}}function Ex(e){for(;se!==null;){var t=se;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Xt||od(5,t);break;case 1:var o=t.stateNode;if(t.flags&4&&!Xt)if(r===null)o.componentDidMount();else{var i=t.elementType===t.type?r.memoizedProps:Xr(t.type,r.memoizedProps);o.componentDidUpdate(i,r.memoizedState,o.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&ux(t,s,o);break;case 3:var a=t.updateQueue;if(a!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}ux(t,a,r)}break;case 5:var c=t.stateNode;if(r===null&&t.flags&4){r=c;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&r.focus();break;case"img":l.src&&(r.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var u=d.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&Gs(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(Q(163))}Xt||t.flags&512&&Gh(t)}catch(m){wt(t,t.return,m)}}if(t===e){se=null;break}if(r=t.sibling,r!==null){r.return=t.return,se=r;break}se=t.return}}function Tx(e){for(;se!==null;){var t=se;if(t===e){se=null;break}var r=t.sibling;if(r!==null){r.return=t.return,se=r;break}se=t.return}}function Px(e){for(;se!==null;){var t=se;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{od(4,t)}catch(l){wt(t,r,l)}break;case 1:var o=t.stateNode;if(typeof o.componentDidMount=="function"){var i=t.return;try{o.componentDidMount()}catch(l){wt(t,i,l)}}var s=t.return;try{Gh(t)}catch(l){wt(t,s,l)}break;case 5:var a=t.return;try{Gh(t)}catch(l){wt(t,a,l)}}}catch(l){wt(t,t.return,l)}if(t===e){se=null;break}var c=t.sibling;if(c!==null){c.return=t.return,se=c;break}se=t.return}}var N2=Math.ceil,wc=Fn.ReactCurrentDispatcher,_p=Fn.ReactCurrentOwner,Ir=Fn.ReactCurrentBatchConfig,Le=0,Dt=null,_t=null,Ht=0,br=0,yi=So(0),Mt=0,la=null,Yo=0,id=0,Ep=0,Ds=null,fr=null,Tp=0,Bi=1/0,jn=null,yc=!1,ef=null,uo=null,xl=!1,no=null,bc=0,Fs=0,tf=null,Al=-1,Dl=0;function sr(){return Le&6?jt():Al!==-1?Al:Al=jt()}function ho(e){return e.mode&1?Le&2&&Ht!==0?Ht&-Ht:l2.transition!==null?(Dl===0&&(Dl=gv()),Dl):(e=Ue,e!==0||(e=window.event,e=e===void 0?16:kv(e.type)),e):1}function nn(e,t,r,o){if(50<Fs)throw Fs=0,tf=null,Error(Q(185));Ua(e,r,o),(!(Le&2)||e!==Dt)&&(e===Dt&&(!(Le&2)&&(id|=r),Mt===4&&eo(e,Ht)),wr(e,o),r===1&&Le===0&&!(t.mode&1)&&(Bi=jt()+500,td&&ko()))}function wr(e,t){var r=e.callbackNode;lj(e,t);var o=oc(e,e===Dt?Ht:0);if(o===0)r!==null&&Dm(r),e.callbackNode=null,e.callbackPriority=0;else if(t=o&-o,e.callbackPriority!==t){if(r!=null&&Dm(r),t===1)e.tag===0?a2(Ox.bind(null,e)):Wv(Ox.bind(null,e)),n2(function(){!(Le&6)&&ko()}),r=null;else{switch(vv(o)){case 1:r=tp;break;case 4:r=mv;break;case 16:r=nc;break;case 536870912:r=xv;break;default:r=nc}r=Uw(r,$w.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function $w(e,t){if(Al=-1,Dl=0,Le&6)throw Error(Q(327));var r=e.callbackNode;if(Pi()&&e.callbackNode!==r)return null;var o=oc(e,e===Dt?Ht:0);if(o===0)return null;if(o&30||o&e.expiredLanes||t)t=jc(e,o);else{t=o;var i=Le;Le|=2;var s=Iw();(Dt!==e||Ht!==t)&&(jn=null,Bi=jt()+500,Do(e,t));do try{E2();break}catch(c){Lw(e,c)}while(1);pp(),wc.current=s,Le=i,_t!==null?t=0:(Dt=null,Ht=0,t=Mt)}if(t!==0){if(t===2&&(i=Eh(e),i!==0&&(o=i,t=rf(e,i))),t===1)throw r=la,Do(e,0),eo(e,o),wr(e,jt()),r;if(t===6)eo(e,o);else{if(i=e.current.alternate,!(o&30)&&!C2(i)&&(t=jc(e,o),t===2&&(s=Eh(e),s!==0&&(o=s,t=rf(e,s))),t===1))throw r=la,Do(e,0),eo(e,o),wr(e,jt()),r;switch(e.finishedWork=i,e.finishedLanes=o,t){case 0:case 1:throw Error(Q(345));case 2:Eo(e,fr,jn);break;case 3:if(eo(e,o),(o&130023424)===o&&(t=Tp+500-jt(),10<t)){if(oc(e,0)!==0)break;if(i=e.suspendedLanes,(i&o)!==o){sr(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Lh(Eo.bind(null,e,fr,jn),t);break}Eo(e,fr,jn);break;case 4:if(eo(e,o),(o&4194240)===o)break;for(t=e.eventTimes,i=-1;0<o;){var a=31-rn(o);s=1<<a,a=t[a],a>i&&(i=a),o&=~s}if(o=i,o=jt()-o,o=(120>o?120:480>o?480:1080>o?1080:1920>o?1920:3e3>o?3e3:4320>o?4320:1960*N2(o/1960))-o,10<o){e.timeoutHandle=Lh(Eo.bind(null,e,fr,jn),o);break}Eo(e,fr,jn);break;case 5:Eo(e,fr,jn);break;default:throw Error(Q(329))}}}return wr(e,jt()),e.callbackNode===r?$w.bind(null,e):null}function rf(e,t){var r=Ds;return e.current.memoizedState.isDehydrated&&(Do(e,t).flags|=256),e=jc(e,t),e!==2&&(t=fr,fr=r,t!==null&&nf(t)),e}function nf(e){fr===null?fr=e:fr.push.apply(fr,e)}function C2(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var o=0;o<r.length;o++){var i=r[o],s=i.getSnapshot;i=i.value;try{if(!sn(s(),i))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function eo(e,t){for(t&=~Ep,t&=~id,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-rn(t),o=1<<r;e[r]=-1,t&=~o}}function Ox(e){if(Le&6)throw Error(Q(327));Pi();var t=oc(e,0);if(!(t&1))return wr(e,jt()),null;var r=jc(e,t);if(e.tag!==0&&r===2){var o=Eh(e);o!==0&&(t=o,r=rf(e,o))}if(r===1)throw r=la,Do(e,0),eo(e,t),wr(e,jt()),r;if(r===6)throw Error(Q(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Eo(e,fr,jn),wr(e,jt()),null}function Pp(e,t){var r=Le;Le|=1;try{return e(t)}finally{Le=r,Le===0&&(Bi=jt()+500,td&&ko())}}function Ko(e){no!==null&&no.tag===0&&!(Le&6)&&Pi();var t=Le;Le|=1;var r=Ir.transition,o=Ue;try{if(Ir.transition=null,Ue=1,e)return e()}finally{Ue=o,Ir.transition=r,Le=t,!(Le&6)&&ko()}}function Op(){br=yi.current,ot(yi)}function Do(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,r2(r)),_t!==null)for(r=_t.return;r!==null;){var o=r;switch(up(o),o.tag){case 1:o=o.type.childContextTypes,o!=null&&cc();break;case 3:Di(),ot(gr),ot(Gt),yp();break;case 5:wp(o);break;case 4:Di();break;case 13:ot(ht);break;case 19:ot(ht);break;case 10:mp(o.type._context);break;case 22:case 23:Op()}r=r.return}if(Dt=e,_t=e=fo(e.current,null),Ht=br=t,Mt=0,la=null,Ep=id=Yo=0,fr=Ds=null,zo!==null){for(t=0;t<zo.length;t++)if(r=zo[t],o=r.interleaved,o!==null){r.interleaved=null;var i=o.next,s=r.pending;if(s!==null){var a=s.next;s.next=i,o.next=a}r.pending=o}zo=null}return e}function Lw(e,t){do{var r=_t;try{if(pp(),$l.current=vc,gc){for(var o=ft.memoizedState;o!==null;){var i=o.queue;i!==null&&(i.pending=null),o=o.next}gc=!1}if(qo=0,It=Rt=ft=null,Is=!1,ia=0,_p.current=null,r===null||r.return===null){Mt=1,la=t,_t=null;break}e:{var s=e,a=r.return,c=r,l=t;if(t=Ht,c.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=l,u=c,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var m=u.alternate;m?(u.updateQueue=m.updateQueue,u.memoizedState=m.memoizedState,u.lanes=m.lanes):(u.updateQueue=null,u.memoizedState=null)}var b=vx(a);if(b!==null){b.flags&=-257,wx(b,a,c,s,t),b.mode&1&&gx(s,d,t),t=b,l=d;var x=t.updateQueue;if(x===null){var h=new Set;h.add(l),t.updateQueue=h}else x.add(l);break e}else{if(!(t&1)){gx(s,d,t),zp();break e}l=Error(Q(426))}}else if(ct&&c.mode&1){var v=vx(a);if(v!==null){!(v.flags&65536)&&(v.flags|=256),wx(v,a,c,s,t),hp(Fi(l,c));break e}}s=l=Fi(l,c),Mt!==4&&(Mt=2),Ds===null?Ds=[s]:Ds.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var w=ww(s,l,t);dx(s,w);break e;case 1:c=l;var g=s.type,j=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||j!==null&&typeof j.componentDidCatch=="function"&&(uo===null||!uo.has(j)))){s.flags|=65536,t&=-t,s.lanes|=t;var y=yw(s,c,t);dx(s,y);break e}}s=s.return}while(s!==null)}Dw(r)}catch(k){t=k,_t===r&&r!==null&&(_t=r=r.return);continue}break}while(1)}function Iw(){var e=wc.current;return wc.current=vc,e===null?vc:e}function zp(){(Mt===0||Mt===3||Mt===2)&&(Mt=4),Dt===null||!(Yo&268435455)&&!(id&268435455)||eo(Dt,Ht)}function jc(e,t){var r=Le;Le|=2;var o=Iw();(Dt!==e||Ht!==t)&&(jn=null,Do(e,t));do try{_2();break}catch(i){Lw(e,i)}while(1);if(pp(),Le=r,wc.current=o,_t!==null)throw Error(Q(261));return Dt=null,Ht=0,Mt}function _2(){for(;_t!==null;)Aw(_t)}function E2(){for(;_t!==null&&!Jb();)Aw(_t)}function Aw(e){var t=Bw(e.alternate,e,br);e.memoizedProps=e.pendingProps,t===null?Dw(e):_t=t,_p.current=null}function Dw(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=b2(r,t),r!==null){r.flags&=32767,_t=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Mt=6,_t=null;return}}else if(r=y2(r,t,br),r!==null){_t=r;return}if(t=t.sibling,t!==null){_t=t;return}_t=t=e}while(t!==null);Mt===0&&(Mt=5)}function Eo(e,t,r){var o=Ue,i=Ir.transition;try{Ir.transition=null,Ue=1,T2(e,t,r,o)}finally{Ir.transition=i,Ue=o}return null}function T2(e,t,r,o){do Pi();while(no!==null);if(Le&6)throw Error(Q(327));r=e.finishedWork;var i=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(Q(177));e.callbackNode=null,e.callbackPriority=0;var s=r.lanes|r.childLanes;if(cj(e,s),e===Dt&&(_t=Dt=null,Ht=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||xl||(xl=!0,Uw(nc,function(){return Pi(),null})),s=(r.flags&15990)!==0,r.subtreeFlags&15990||s){s=Ir.transition,Ir.transition=null;var a=Ue;Ue=1;var c=Le;Le|=4,_p.current=null,S2(e,r),Rw(r,e),Qj(Mh),ic=!!Rh,Mh=Rh=null,e.current=r,k2(r),ej(),Le=c,Ue=a,Ir.transition=s}else e.current=r;if(xl&&(xl=!1,no=e,bc=i),s=e.pendingLanes,s===0&&(uo=null),nj(r.stateNode),wr(e,jt()),t!==null)for(o=e.onRecoverableError,r=0;r<t.length;r++)i=t[r],o(i.value,{componentStack:i.stack,digest:i.digest});if(yc)throw yc=!1,e=ef,ef=null,e;return bc&1&&e.tag!==0&&Pi(),s=e.pendingLanes,s&1?e===tf?Fs++:(Fs=0,tf=e):Fs=0,ko(),null}function Pi(){if(no!==null){var e=vv(bc),t=Ir.transition,r=Ue;try{if(Ir.transition=null,Ue=16>e?16:e,no===null)var o=!1;else{if(e=no,no=null,bc=0,Le&6)throw Error(Q(331));var i=Le;for(Le|=4,se=e.current;se!==null;){var s=se,a=s.child;if(se.flags&16){var c=s.deletions;if(c!==null){for(var l=0;l<c.length;l++){var d=c[l];for(se=d;se!==null;){var u=se;switch(u.tag){case 0:case 11:case 15:As(8,u,s)}var f=u.child;if(f!==null)f.return=u,se=f;else for(;se!==null;){u=se;var m=u.sibling,b=u.return;if(Pw(u),u===d){se=null;break}if(m!==null){m.return=b,se=m;break}se=b}}}var x=s.alternate;if(x!==null){var h=x.child;if(h!==null){x.child=null;do{var v=h.sibling;h.sibling=null,h=v}while(h!==null)}}se=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,se=a;else e:for(;se!==null;){if(s=se,s.flags&2048)switch(s.tag){case 0:case 11:case 15:As(9,s,s.return)}var w=s.sibling;if(w!==null){w.return=s.return,se=w;break e}se=s.return}}var g=e.current;for(se=g;se!==null;){a=se;var j=a.child;if(a.subtreeFlags&2064&&j!==null)j.return=a,se=j;else e:for(a=g;se!==null;){if(c=se,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:od(9,c)}}catch(k){wt(c,c.return,k)}if(c===a){se=null;break e}var y=c.sibling;if(y!==null){y.return=c.return,se=y;break e}se=c.return}}if(Le=i,ko(),xn&&typeof xn.onPostCommitFiberRoot=="function")try{xn.onPostCommitFiberRoot(Xc,e)}catch{}o=!0}return o}finally{Ue=r,Ir.transition=t}}return!1}function zx(e,t,r){t=Fi(r,t),t=ww(e,t,1),e=co(e,t,1),t=sr(),e!==null&&(Ua(e,1,t),wr(e,t))}function wt(e,t,r){if(e.tag===3)zx(e,e,r);else for(;t!==null;){if(t.tag===3){zx(t,e,r);break}else if(t.tag===1){var o=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(uo===null||!uo.has(o))){e=Fi(r,e),e=yw(t,e,1),t=co(t,e,1),e=sr(),t!==null&&(Ua(t,1,e),wr(t,e));break}}t=t.return}}function P2(e,t,r){var o=e.pingCache;o!==null&&o.delete(t),t=sr(),e.pingedLanes|=e.suspendedLanes&r,Dt===e&&(Ht&r)===r&&(Mt===4||Mt===3&&(Ht&130023424)===Ht&&500>jt()-Tp?Do(e,0):Ep|=r),wr(e,t)}function Fw(e,t){t===0&&(e.mode&1?(t=sl,sl<<=1,!(sl&130023424)&&(sl=4194304)):t=1);var r=sr();e=Ln(e,t),e!==null&&(Ua(e,t,r),wr(e,r))}function O2(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Fw(e,r)}function z2(e,t){var r=0;switch(e.tag){case 13:var o=e.stateNode,i=e.memoizedState;i!==null&&(r=i.retryLane);break;case 19:o=e.stateNode;break;default:throw Error(Q(314))}o!==null&&o.delete(t),Fw(e,r)}var Bw;Bw=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||gr.current)pr=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return pr=!1,w2(e,t,r);pr=!!(e.flags&131072)}else pr=!1,ct&&t.flags&1048576&&Hv(t,hc,t.index);switch(t.lanes=0,t.tag){case 2:var o=t.type;Il(e,t),e=t.pendingProps;var i=Li(t,Gt.current);Ti(t,r),i=jp(null,t,o,e,i,r);var s=Sp();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,vr(o)?(s=!0,dc(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,gp(t),i.updater=rd,t.stateNode=i,i._reactInternals=t,Wh(t,o,e,r),t=qh(null,t,o,!0,s,r)):(t.tag=0,ct&&s&&dp(t),ir(null,t,i,r),t=t.child),t;case 16:o=t.elementType;e:{switch(Il(e,t),e=t.pendingProps,i=o._init,o=i(o._payload),t.type=o,i=t.tag=M2(o),e=Xr(o,e),i){case 0:t=Vh(null,t,o,e,r);break e;case 1:t=jx(null,t,o,e,r);break e;case 11:t=yx(null,t,o,e,r);break e;case 14:t=bx(null,t,o,Xr(o.type,e),r);break e}throw Error(Q(306,o,""))}return t;case 0:return o=t.type,i=t.pendingProps,i=t.elementType===o?i:Xr(o,i),Vh(e,t,o,i,r);case 1:return o=t.type,i=t.pendingProps,i=t.elementType===o?i:Xr(o,i),jx(e,t,o,i,r);case 3:e:{if(kw(t),e===null)throw Error(Q(387));o=t.pendingProps,s=t.memoizedState,i=s.element,Kv(e,t),mc(t,o,null,r);var a=t.memoizedState;if(o=a.element,s.isDehydrated)if(s={element:o,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=Fi(Error(Q(423)),t),t=Sx(e,t,o,r,i);break e}else if(o!==i){i=Fi(Error(Q(424)),t),t=Sx(e,t,o,r,i);break e}else for(jr=lo(t.stateNode.containerInfo.firstChild),Sr=t,ct=!0,Jr=null,r=Zv(t,null,o,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Ii(),o===i){t=In(e,t,r);break e}ir(e,t,o,r)}t=t.child}return t;case 5:return Jv(t),e===null&&Fh(t),o=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,a=i.children,$h(o,i)?a=null:s!==null&&$h(o,s)&&(t.flags|=32),Sw(e,t),ir(e,t,a,r),t.child;case 6:return e===null&&Fh(t),null;case 13:return Nw(e,t,r);case 4:return vp(t,t.stateNode.containerInfo),o=t.pendingProps,e===null?t.child=Ai(t,null,o,r):ir(e,t,o,r),t.child;case 11:return o=t.type,i=t.pendingProps,i=t.elementType===o?i:Xr(o,i),yx(e,t,o,i,r);case 7:return ir(e,t,t.pendingProps,r),t.child;case 8:return ir(e,t,t.pendingProps.children,r),t.child;case 12:return ir(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(o=t.type._context,i=t.pendingProps,s=t.memoizedProps,a=i.value,et(fc,o._currentValue),o._currentValue=a,s!==null)if(sn(s.value,a)){if(s.children===i.children&&!gr.current){t=In(e,t,r);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var c=s.dependencies;if(c!==null){a=s.child;for(var l=c.firstContext;l!==null;){if(l.context===o){if(s.tag===1){l=_n(-1,r&-r),l.tag=2;var d=s.updateQueue;if(d!==null){d=d.shared;var u=d.pending;u===null?l.next=l:(l.next=u.next,u.next=l),d.pending=l}}s.lanes|=r,l=s.alternate,l!==null&&(l.lanes|=r),Bh(s.return,r,t),c.lanes|=r;break}l=l.next}}else if(s.tag===10)a=s.type===t.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(Q(341));a.lanes|=r,c=a.alternate,c!==null&&(c.lanes|=r),Bh(a,r,t),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===t){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}ir(e,t,i.children,r),t=t.child}return t;case 9:return i=t.type,o=t.pendingProps.children,Ti(t,r),i=Dr(i),o=o(i),t.flags|=1,ir(e,t,o,r),t.child;case 14:return o=t.type,i=Xr(o,t.pendingProps),i=Xr(o.type,i),bx(e,t,o,i,r);case 15:return bw(e,t,t.type,t.pendingProps,r);case 17:return o=t.type,i=t.pendingProps,i=t.elementType===o?i:Xr(o,i),Il(e,t),t.tag=1,vr(o)?(e=!0,dc(t)):e=!1,Ti(t,r),Xv(t,o,i),Wh(t,o,i,r),qh(null,t,o,!0,e,r);case 19:return Cw(e,t,r);case 22:return jw(e,t,r)}throw Error(Q(156,t.tag))};function Uw(e,t){return pv(e,t)}function R2(e,t,r,o){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Lr(e,t,r,o){return new R2(e,t,r,o)}function Rp(e){return e=e.prototype,!(!e||!e.isReactComponent)}function M2(e){if(typeof e=="function")return Rp(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Zf)return 11;if(e===Jf)return 14}return 2}function fo(e,t){var r=e.alternate;return r===null?(r=Lr(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Fl(e,t,r,o,i,s){var a=2;if(o=e,typeof e=="function")Rp(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case di:return Fo(r.children,i,s,t);case Gf:a=8,i|=8;break;case fh:return e=Lr(12,r,t,i|2),e.elementType=fh,e.lanes=s,e;case ph:return e=Lr(13,r,t,i),e.elementType=ph,e.lanes=s,e;case mh:return e=Lr(19,r,t,i),e.elementType=mh,e.lanes=s,e;case G0:return sd(r,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Q0:a=10;break e;case X0:a=9;break e;case Zf:a=11;break e;case Jf:a=14;break e;case Xn:a=16,o=null;break e}throw Error(Q(130,e==null?e:typeof e,""))}return t=Lr(a,r,t,i),t.elementType=e,t.type=o,t.lanes=s,t}function Fo(e,t,r,o){return e=Lr(7,e,o,t),e.lanes=r,e}function sd(e,t,r,o){return e=Lr(22,e,o,t),e.elementType=G0,e.lanes=r,e.stateNode={isHidden:!1},e}function Cu(e,t,r){return e=Lr(6,e,null,t),e.lanes=r,e}function _u(e,t,r){return t=Lr(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function $2(e,t,r,o,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=au(0),this.expirationTimes=au(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=au(0),this.identifierPrefix=o,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Mp(e,t,r,o,i,s,a,c,l){return e=new $2(e,t,r,c,l),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Lr(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:o,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},gp(s),e}function L2(e,t,r){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ci,key:o==null?null:""+o,children:e,containerInfo:t,implementation:r}}function Ww(e){if(!e)return vo;e=e._reactInternals;e:{if(ei(e)!==e||e.tag!==1)throw Error(Q(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(vr(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(Q(171))}if(e.tag===1){var r=e.type;if(vr(r))return Uv(e,r,t)}return t}function Hw(e,t,r,o,i,s,a,c,l){return e=Mp(r,o,!0,e,i,s,a,c,l),e.context=Ww(null),r=e.current,o=sr(),i=ho(r),s=_n(o,i),s.callback=t??null,co(r,s,i),e.current.lanes=i,Ua(e,i,o),wr(e,o),e}function ad(e,t,r,o){var i=t.current,s=sr(),a=ho(i);return r=Ww(r),t.context===null?t.context=r:t.pendingContext=r,t=_n(s,a),t.payload={element:e},o=o===void 0?null:o,o!==null&&(t.callback=o),e=co(i,t,a),e!==null&&(nn(e,i,a,s),Ml(e,i,a)),a}function Sc(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Rx(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function $p(e,t){Rx(e,t),(e=e.alternate)&&Rx(e,t)}function I2(){return null}var Vw=typeof reportError=="function"?reportError:function(e){console.error(e)};function Lp(e){this._internalRoot=e}ld.prototype.render=Lp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(Q(409));ad(e,t,null,null)};ld.prototype.unmount=Lp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ko(function(){ad(null,e,null,null)}),t[$n]=null}};function ld(e){this._internalRoot=e}ld.prototype.unstable_scheduleHydration=function(e){if(e){var t=bv();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Jn.length&&t!==0&&t<Jn[r].priority;r++);Jn.splice(r,0,e),r===0&&Sv(e)}};function Ip(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function cd(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Mx(){}function A2(e,t,r,o,i){if(i){if(typeof o=="function"){var s=o;o=function(){var d=Sc(a);s.call(d)}}var a=Hw(t,o,e,0,null,!1,!1,"",Mx);return e._reactRootContainer=a,e[$n]=a.current,ea(e.nodeType===8?e.parentNode:e),Ko(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof o=="function"){var c=o;o=function(){var d=Sc(l);c.call(d)}}var l=Mp(e,0,!1,null,null,!1,!1,"",Mx);return e._reactRootContainer=l,e[$n]=l.current,ea(e.nodeType===8?e.parentNode:e),Ko(function(){ad(t,l,r,o)}),l}function dd(e,t,r,o,i){var s=r._reactRootContainer;if(s){var a=s;if(typeof i=="function"){var c=i;i=function(){var l=Sc(a);c.call(l)}}ad(t,a,e,i)}else a=A2(r,t,e,i,o);return Sc(a)}wv=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=_s(t.pendingLanes);r!==0&&(rp(t,r|1),wr(t,jt()),!(Le&6)&&(Bi=jt()+500,ko()))}break;case 13:Ko(function(){var o=Ln(e,1);if(o!==null){var i=sr();nn(o,e,1,i)}}),$p(e,1)}};np=function(e){if(e.tag===13){var t=Ln(e,134217728);if(t!==null){var r=sr();nn(t,e,134217728,r)}$p(e,134217728)}};yv=function(e){if(e.tag===13){var t=ho(e),r=Ln(e,t);if(r!==null){var o=sr();nn(r,e,t,o)}$p(e,t)}};bv=function(){return Ue};jv=function(e,t){var r=Ue;try{return Ue=e,t()}finally{Ue=r}};Nh=function(e,t,r){switch(t){case"input":if(vh(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var o=r[t];if(o!==e&&o.form===e.form){var i=ed(o);if(!i)throw Error(Q(90));J0(o),vh(o,i)}}}break;case"textarea":tv(e,r);break;case"select":t=r.value,t!=null&&Ni(e,!!r.multiple,t,!1)}};lv=Pp;cv=Ko;var D2={usingClientEntryPoint:!1,Events:[Ha,pi,ed,sv,av,Pp]},xs={findFiberByHostInstance:Oo,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},F2={bundleType:xs.bundleType,version:xs.version,rendererPackageName:xs.rendererPackageName,rendererConfig:xs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Fn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=hv(e),e===null?null:e.stateNode},findFiberByHostInstance:xs.findFiberByHostInstance||I2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gl.isDisabled&&gl.supportsFiber)try{Xc=gl.inject(F2),xn=gl}catch{}}Cr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=D2;Cr.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ip(t))throw Error(Q(200));return L2(e,t,null,r)};Cr.createRoot=function(e,t){if(!Ip(e))throw Error(Q(299));var r=!1,o="",i=Vw;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Mp(e,1,!1,null,null,r,!1,o,i),e[$n]=t.current,ea(e.nodeType===8?e.parentNode:e),new Lp(t)};Cr.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(Q(188)):(e=Object.keys(e).join(","),Error(Q(268,e)));return e=hv(t),e=e===null?null:e.stateNode,e};Cr.flushSync=function(e){return Ko(e)};Cr.hydrate=function(e,t,r){if(!cd(t))throw Error(Q(200));return dd(null,e,t,!0,r)};Cr.hydrateRoot=function(e,t,r){if(!Ip(e))throw Error(Q(405));var o=r!=null&&r.hydratedSources||null,i=!1,s="",a=Vw;if(r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(s=r.identifierPrefix),r.onRecoverableError!==void 0&&(a=r.onRecoverableError)),t=Hw(t,null,e,1,r??null,i,!1,s,a),e[$n]=t.current,ea(e),o)for(e=0;e<o.length;e++)r=o[e],i=r._getVersion,i=i(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,i]:t.mutableSourceEagerHydrationData.push(r,i);return new ld(t)};Cr.render=function(e,t,r){if(!cd(t))throw Error(Q(200));return dd(null,e,t,!1,r)};Cr.unmountComponentAtNode=function(e){if(!cd(e))throw Error(Q(40));return e._reactRootContainer?(Ko(function(){dd(null,null,e,!1,function(){e._reactRootContainer=null,e[$n]=null})}),!0):!1};Cr.unstable_batchedUpdates=Pp;Cr.unstable_renderSubtreeIntoContainer=function(e,t,r,o){if(!cd(r))throw Error(Q(200));if(e==null||e._reactInternals===void 0)throw Error(Q(38));return dd(e,t,r,!1,o)};Cr.version="18.2.0-next-9e3b772b8-20220608";function qw(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qw)}catch(e){console.error(e)}}qw(),H0.exports=Cr;var Ap=H0.exports,$x=Ap;uh.createRoot=$x.createRoot,uh.hydrateRoot=$x.hydrateRoot;/**
 * @remix-run/router v1.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function at(){return at=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},at.apply(this,arguments)}var Nt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Nt||(Nt={}));const Lx="popstate";function B2(e){e===void 0&&(e={});function t(o,i){let{pathname:s,search:a,hash:c}=o.location;return ca("",{pathname:s,search:a,hash:c},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function r(o,i){return typeof i=="string"?i:Qo(i)}return W2(t,r,null,e)}function Oe(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ui(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function U2(){return Math.random().toString(36).substr(2,8)}function Ix(e,t){return{usr:e.state,key:e.key,idx:t}}function ca(e,t,r,o){return r===void 0&&(r=null),at({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Bn(t):t,{state:r,key:t&&t.key||o||U2()})}function Qo(e){let{pathname:t="/",search:r="",hash:o=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),o&&o!=="#"&&(t+=o.charAt(0)==="#"?o:"#"+o),t}function Bn(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let o=e.indexOf("?");o>=0&&(t.search=e.substr(o),e=e.substr(0,o)),e&&(t.pathname=e)}return t}function W2(e,t,r,o){o===void 0&&(o={});let{window:i=document.defaultView,v5Compat:s=!1}=o,a=i.history,c=Nt.Pop,l=null,d=u();d==null&&(d=0,a.replaceState(at({},a.state,{idx:d}),""));function u(){return(a.state||{idx:null}).idx}function f(){c=Nt.Pop;let v=u(),w=v==null?null:v-d;d=v,l&&l({action:c,location:h.location,delta:w})}function m(v,w){c=Nt.Push;let g=ca(h.location,v,w);r&&r(g,v),d=u()+1;let j=Ix(g,d),y=h.createHref(g);try{a.pushState(j,"",y)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;i.location.assign(y)}s&&l&&l({action:c,location:h.location,delta:1})}function b(v,w){c=Nt.Replace;let g=ca(h.location,v,w);r&&r(g,v),d=u();let j=Ix(g,d),y=h.createHref(g);a.replaceState(j,"",y),s&&l&&l({action:c,location:h.location,delta:0})}function x(v){let w=i.location.origin!=="null"?i.location.origin:i.location.href,g=typeof v=="string"?v:Qo(v);return Oe(w,"No window.location.(origin|href) available to create URL for href: "+g),new URL(g,w)}let h={get action(){return c},get location(){return e(i,a)},listen(v){if(l)throw new Error("A history only accepts one active listener");return i.addEventListener(Lx,f),l=v,()=>{i.removeEventListener(Lx,f),l=null}},createHref(v){return t(i,v)},createURL:x,encodeLocation(v){let w=x(v);return{pathname:w.pathname,search:w.search,hash:w.hash}},push:m,replace:b,go(v){return a.go(v)}};return h}var bt;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(bt||(bt={}));const H2=new Set(["lazy","caseSensitive","path","id","index","children"]);function V2(e){return e.index===!0}function of(e,t,r,o){return r===void 0&&(r=[]),o===void 0&&(o={}),e.map((i,s)=>{let a=[...r,s],c=typeof i.id=="string"?i.id:a.join("-");if(Oe(i.index!==!0||!i.children,"Cannot specify children on an index route"),Oe(!o[c],'Found a route id collision on id "'+c+`".  Route id's must be globally unique within Data Router usages`),V2(i)){let l=at({},i,t(i),{id:c});return o[c]=l,l}else{let l=at({},i,t(i),{id:c,children:void 0});return o[c]=l,i.children&&(l.children=of(i.children,t,a,o)),l}})}function bi(e,t,r){r===void 0&&(r="/");let o=typeof t=="string"?Bn(t):t,i=rs(o.pathname||"/",r);if(i==null)return null;let s=Yw(e);q2(s);let a=null;for(let c=0;a==null&&c<s.length;++c)a=tS(s[c],oS(i));return a}function Yw(e,t,r,o){t===void 0&&(t=[]),r===void 0&&(r=[]),o===void 0&&(o="");let i=(s,a,c)=>{let l={relativePath:c===void 0?s.path||"":c,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};l.relativePath.startsWith("/")&&(Oe(l.relativePath.startsWith(o),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+o+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(o.length));let d=En([o,l.relativePath]),u=r.concat(l);s.children&&s.children.length>0&&(Oe(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Yw(s.children,t,u,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:J2(d,s.index),routesMeta:u})};return e.forEach((s,a)=>{var c;if(s.path===""||!((c=s.path)!=null&&c.includes("?")))i(s,a);else for(let l of Kw(s.path))i(s,a,l)}),t}function Kw(e){let t=e.split("/");if(t.length===0)return[];let[r,...o]=t,i=r.endsWith("?"),s=r.replace(/\?$/,"");if(o.length===0)return i?[s,""]:[s];let a=Kw(o.join("/")),c=[];return c.push(...a.map(l=>l===""?s:[s,l].join("/"))),i&&c.push(...a),c.map(l=>e.startsWith("/")&&l===""?"/":l)}function q2(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:eS(t.routesMeta.map(o=>o.childrenIndex),r.routesMeta.map(o=>o.childrenIndex)))}const Y2=/^:\w+$/,K2=3,Q2=2,X2=1,G2=10,Z2=-2,Ax=e=>e==="*";function J2(e,t){let r=e.split("/"),o=r.length;return r.some(Ax)&&(o+=Z2),t&&(o+=Q2),r.filter(i=>!Ax(i)).reduce((i,s)=>i+(Y2.test(s)?K2:s===""?X2:G2),o)}function eS(e,t){return e.length===t.length&&e.slice(0,-1).every((o,i)=>o===t[i])?e[e.length-1]-t[t.length-1]:0}function tS(e,t){let{routesMeta:r}=e,o={},i="/",s=[];for(let a=0;a<r.length;++a){let c=r[a],l=a===r.length-1,d=i==="/"?t:t.slice(i.length)||"/",u=rS({path:c.relativePath,caseSensitive:c.caseSensitive,end:l},d);if(!u)return null;Object.assign(o,u.params);let f=c.route;s.push({params:o,pathname:En([i,u.pathname]),pathnameBase:lS(En([i,u.pathnameBase])),route:f}),u.pathnameBase!=="/"&&(i=En([i,u.pathnameBase]))}return s}function rS(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,o]=nS(e.path,e.caseSensitive,e.end),i=t.match(r);if(!i)return null;let s=i[0],a=s.replace(/(.)\/+$/,"$1"),c=i.slice(1);return{params:o.reduce((d,u,f)=>{if(u==="*"){let m=c[f]||"";a=s.slice(0,s.length-m.length).replace(/(.)\/+$/,"$1")}return d[u]=iS(c[f]||"",u),d},{}),pathname:s,pathnameBase:a,pattern:e}}function nS(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),Ui(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let o=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/\/:(\w+)/g,(a,c)=>(o.push(c),"/([^\\/]+)"));return e.endsWith("*")?(o.push("*"),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),o]}function oS(e){try{return decodeURI(e)}catch(t){return Ui(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function iS(e,t){try{return decodeURIComponent(e)}catch(r){return Ui(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+r+").")),e}}function rs(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,o=e.charAt(r);return o&&o!=="/"?null:e.slice(r)||"/"}function sS(e,t){t===void 0&&(t="/");let{pathname:r,search:o="",hash:i=""}=typeof e=="string"?Bn(e):e;return{pathname:r?r.startsWith("/")?r:aS(r,t):t,search:cS(o),hash:dS(i)}}function aS(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?r.length>1&&r.pop():i!=="."&&r.push(i)}),r.length>1?r.join("/"):"/"}function Eu(e,t,r,o){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(o)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ud(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Dp(e,t,r,o){o===void 0&&(o=!1);let i;typeof e=="string"?i=Bn(e):(i=at({},e),Oe(!i.pathname||!i.pathname.includes("?"),Eu("?","pathname","search",i)),Oe(!i.pathname||!i.pathname.includes("#"),Eu("#","pathname","hash",i)),Oe(!i.search||!i.search.includes("#"),Eu("#","search","hash",i)));let s=e===""||i.pathname==="",a=s?"/":i.pathname,c;if(o||a==null)c=r;else{let f=t.length-1;if(a.startsWith("..")){let m=a.split("/");for(;m[0]==="..";)m.shift(),f-=1;i.pathname=m.join("/")}c=f>=0?t[f]:"/"}let l=sS(i,c),d=a&&a!=="/"&&a.endsWith("/"),u=(s||a===".")&&r.endsWith("/");return!l.pathname.endsWith("/")&&(d||u)&&(l.pathname+="/"),l}const En=e=>e.join("/").replace(/\/\/+/g,"/"),lS=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),cS=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,dS=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;class Fp{constructor(t,r,o,i){i===void 0&&(i=!1),this.status=t,this.statusText=r||"",this.internal=i,o instanceof Error?(this.data=o.toString(),this.error=o):this.data=o}}function Qw(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Xw=["post","put","patch","delete"],uS=new Set(Xw),hS=["get",...Xw],fS=new Set(hS),pS=new Set([301,302,303,307,308]),mS=new Set([307,308]),Tu={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},xS={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},gs={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},Gw=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,gS=e=>({hasErrorBoundary:!!e.hasErrorBoundary});function vS(e){const t=e.window?e.window:typeof window<"u"?window:void 0,r=typeof t<"u"&&typeof t.document<"u"&&typeof t.document.createElement<"u",o=!r;Oe(e.routes.length>0,"You must provide a non-empty routes array to createRouter");let i;if(e.mapRouteProperties)i=e.mapRouteProperties;else if(e.detectErrorBoundary){let P=e.detectErrorBoundary;i=O=>({hasErrorBoundary:P(O)})}else i=gS;let s={},a=of(e.routes,i,void 0,s),c,l=e.basename||"/",d=at({v7_normalizeFormMethod:!1,v7_prependBasename:!1},e.future),u=null,f=new Set,m=null,b=null,x=null,h=e.hydrationData!=null,v=bi(a,e.history.location,l),w=null;if(v==null){let P=Or(404,{pathname:e.history.location.pathname}),{matches:O,route:B}=qx(a);v=O,w={[B.id]:P}}let g=!v.some(P=>P.route.lazy)&&(!v.some(P=>P.route.loader)||e.hydrationData!=null),j,y={historyAction:e.history.action,location:e.history.location,matches:v,initialized:g,navigation:Tu,restoreScrollPosition:e.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:e.hydrationData&&e.hydrationData.loaderData||{},actionData:e.hydrationData&&e.hydrationData.actionData||null,errors:e.hydrationData&&e.hydrationData.errors||w,fetchers:new Map,blockers:new Map},k=Nt.Pop,_=!1,E,N=!1,T=!1,M=[],L=[],I=new Map,$=0,V=-1,F=new Map,D=new Set,Y=new Map,z=new Map,A=new Map,R=!1;function q(){return u=e.history.listen(P=>{let{action:O,location:B,delta:ee}=P;if(R){R=!1;return}Ui(A.size===0||ee!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let fe=Bt({currentLocation:y.location,nextLocation:B,historyAction:O});if(fe&&ee!=null){R=!0,e.history.go(ee*-1),vt(fe,{state:"blocked",location:B,proceed(){vt(fe,{state:"proceeding",proceed:void 0,reset:void 0,location:B}),e.history.go(ee)},reset(){let pe=new Map(y.blockers);pe.set(fe,gs),J({blockers:pe})}});return}return G(O,B)}),y.initialized||G(Nt.Pop,y.location),j}function X(){u&&u(),f.clear(),E&&E.abort(),y.fetchers.forEach((P,O)=>Qe(O)),y.blockers.forEach((P,O)=>dt(O))}function oe(P){return f.add(P),()=>f.delete(P)}function J(P){y=at({},y,P),f.forEach(O=>O(y))}function xe(P,O){var B,ee;let fe=y.actionData!=null&&y.navigation.formMethod!=null&&Zr(y.navigation.formMethod)&&y.navigation.state==="loading"&&((B=P.state)==null?void 0:B._isRedirect)!==!0,pe;O.actionData?Object.keys(O.actionData).length>0?pe=O.actionData:pe=null:fe?pe=y.actionData:pe=null;let ue=O.loaderData?Vx(y.loaderData,O.loaderData,O.matches||[],O.errors):y.loaderData,ce=y.blockers;ce.size>0&&(ce=new Map(ce),ce.forEach((ze,Ye)=>ce.set(Ye,gs)));let ne=_===!0||y.navigation.formMethod!=null&&Zr(y.navigation.formMethod)&&((ee=P.state)==null?void 0:ee._isRedirect)!==!0;c&&(a=c,c=void 0),N||k===Nt.Pop||(k===Nt.Push?e.history.push(P,P.state):k===Nt.Replace&&e.history.replace(P,P.state)),J(at({},O,{actionData:pe,loaderData:ue,historyAction:k,location:P,initialized:!0,navigation:Tu,revalidation:"idle",restoreScrollPosition:K(P,O.matches||y.matches),preventScrollReset:ne,blockers:ce})),k=Nt.Pop,_=!1,N=!1,T=!1,M=[],L=[]}async function je(P,O){if(typeof P=="number"){e.history.go(P);return}let B=sf(y.location,y.matches,l,d.v7_prependBasename,P,O==null?void 0:O.fromRouteId,O==null?void 0:O.relative),{path:ee,submission:fe,error:pe}=Dx(d.v7_normalizeFormMethod,!1,B,O),ue=y.location,ce=ca(y.location,ee,O&&O.state);ce=at({},ce,e.history.encodeLocation(ce));let ne=O&&O.replace!=null?O.replace:void 0,ze=Nt.Push;ne===!0?ze=Nt.Replace:ne===!1||fe!=null&&Zr(fe.formMethod)&&fe.formAction===y.location.pathname+y.location.search&&(ze=Nt.Replace);let Ye=O&&"preventScrollReset"in O?O.preventScrollReset===!0:void 0,_e=Bt({currentLocation:ue,nextLocation:ce,historyAction:ze});if(_e){vt(_e,{state:"blocked",location:ce,proceed(){vt(_e,{state:"proceeding",proceed:void 0,reset:void 0,location:ce}),je(P,O)},reset(){let Ae=new Map(y.blockers);Ae.set(_e,gs),J({blockers:Ae})}});return}return await G(ze,ce,{submission:fe,pendingError:pe,preventScrollReset:Ye,replace:O&&O.replace})}function Se(){if(ke(),J({revalidation:"loading"}),y.navigation.state!=="submitting"){if(y.navigation.state==="idle"){G(y.historyAction,y.location,{startUninterruptedRevalidation:!0});return}G(k||y.historyAction,y.navigation.location,{overrideNavigation:y.navigation})}}async function G(P,O,B){E&&E.abort(),E=null,k=P,N=(B&&B.startUninterruptedRevalidation)===!0,Tr(y.location,y.matches),_=(B&&B.preventScrollReset)===!0;let ee=c||a,fe=B&&B.overrideNavigation,pe=bi(ee,O,l);if(!pe){let Ae=Or(404,{pathname:O.pathname}),{matches:Xe,route:Ut}=qx(ee);St(),xe(O,{matches:Xe,loaderData:{},errors:{[Ut.id]:Ae}});return}if(y.initialized&&!T&&SS(y.location,O)&&!(B&&B.submission&&Zr(B.submission.formMethod))){xe(O,{matches:pe});return}E=new AbortController;let ue=ws(e.history,O,E.signal,B&&B.submission),ce,ne;if(B&&B.pendingError)ne={[ji(pe).route.id]:B.pendingError};else if(B&&B.submission&&Zr(B.submission.formMethod)){let Ae=await ae(ue,O,B.submission,pe,{replace:B.replace});if(Ae.shortCircuited)return;ce=Ae.pendingActionData,ne=Ae.pendingActionError,fe=vl(O,B.submission),ue=new Request(ue.url,{signal:ue.signal})}let{shortCircuited:ze,loaderData:Ye,errors:_e}=await ge(ue,O,pe,fe,B&&B.submission,B&&B.fetcherSubmission,B&&B.replace,ce,ne);ze||(E=null,xe(O,at({matches:pe},ce?{actionData:ce}:{},{loaderData:Ye,errors:_e})))}async function ae(P,O,B,ee,fe){fe===void 0&&(fe={}),ke();let pe=ES(O,B);J({navigation:pe});let ue,ce=lf(ee,O);if(!ce.route.action&&!ce.route.lazy)ue={type:bt.error,error:Or(405,{method:P.method,pathname:O.pathname,routeId:ce.route.id})};else if(ue=await vs("action",P,ce,ee,s,i,l),P.signal.aborted)return{shortCircuited:!0};if(Oi(ue)){let ne;return fe&&fe.replace!=null?ne=fe.replace:ne=ue.location===y.location.pathname+y.location.search,await W(y,ue,{submission:B,replace:ne}),{shortCircuited:!0}}if(Bs(ue)){let ne=ji(ee,ce.route.id);return(fe&&fe.replace)!==!0&&(k=Nt.Push),{pendingActionData:{},pendingActionError:{[ne.route.id]:ue.error}}}if(Mo(ue))throw Or(400,{type:"defer-action"});return{pendingActionData:{[ce.route.id]:ue.data}}}async function ge(P,O,B,ee,fe,pe,ue,ce,ne){let ze=ee||vl(O,fe),Ye=fe||pe||Qx(ze),_e=c||a,[Ae,Xe]=Fx(e.history,y,B,Ye,O,T,M,L,Y,D,_e,l,ce,ne);if(St(Ee=>!(B&&B.some(zt=>zt.route.id===Ee))||Ae&&Ae.some(zt=>zt.route.id===Ee)),V=++$,Ae.length===0&&Xe.length===0){let Ee=be();return xe(O,at({matches:B,loaderData:{},errors:ne||null},ce?{actionData:ce}:{},Ee?{fetchers:new Map(y.fetchers)}:{})),{shortCircuited:!0}}if(!N){Xe.forEach(zt=>{let qt=y.fetchers.get(zt.key),Kr=ys(void 0,qt?qt.data:void 0);y.fetchers.set(zt.key,Kr)});let Ee=ce||y.actionData;J(at({navigation:ze},Ee?Object.keys(Ee).length===0?{actionData:null}:{actionData:Ee}:{},Xe.length>0?{fetchers:new Map(y.fetchers)}:{}))}Xe.forEach(Ee=>{I.has(Ee.key)&&Me(Ee.key),Ee.controller&&I.set(Ee.key,Ee.controller)});let Ut=()=>Xe.forEach(Ee=>Me(Ee.key));E&&E.signal.addEventListener("abort",Ut);let{results:Jt,loaderResults:ur,fetcherResults:Hr}=await ie(y.matches,B,Ae,Xe,P);if(P.signal.aborted)return{shortCircuited:!0};E&&E.signal.removeEventListener("abort",Ut),Xe.forEach(Ee=>I.delete(Ee.key));let Ot=Yx(Jt);if(Ot){if(Ot.idx>=Ae.length){let Ee=Xe[Ot.idx-Ae.length].key;D.add(Ee)}return await W(y,Ot.result,{replace:ue}),{shortCircuited:!0}}let{loaderData:$t,errors:yr}=Hx(y,B,Ae,ur,ne,Xe,Hr,z);z.forEach((Ee,zt)=>{Ee.subscribe(qt=>{(qt||Ee.done)&&z.delete(zt)})});let Vr=be(),qr=Be(V),Yr=Vr||qr||Xe.length>0;return at({loaderData:$t,errors:yr},Yr?{fetchers:new Map(y.fetchers)}:{})}function te(P){return y.fetchers.get(P)||xS}function we(P,O,B,ee){if(o)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");I.has(P)&&Me(P);let fe=c||a,pe=sf(y.location,y.matches,l,d.v7_prependBasename,B,O,ee==null?void 0:ee.relative),ue=bi(fe,pe,l);if(!ue){Ve(P,O,Or(404,{pathname:pe}));return}let{path:ce,submission:ne,error:ze}=Dx(d.v7_normalizeFormMethod,!0,pe,ee);if(ze){Ve(P,O,ze);return}let Ye=lf(ue,ce);if(_=(ee&&ee.preventScrollReset)===!0,ne&&Zr(ne.formMethod)){Ie(P,O,ce,Ye,ue,ne);return}Y.set(P,{routeId:O,path:ce}),H(P,O,ce,Ye,ue,ne)}async function Ie(P,O,B,ee,fe,pe){if(ke(),Y.delete(P),!ee.route.action&&!ee.route.lazy){let Ge=Or(405,{method:pe.formMethod,pathname:B,routeId:O});Ve(P,O,Ge);return}let ue=y.fetchers.get(P),ce=TS(pe,ue);y.fetchers.set(P,ce),J({fetchers:new Map(y.fetchers)});let ne=new AbortController,ze=ws(e.history,B,ne.signal,pe);I.set(P,ne);let Ye=$,_e=await vs("action",ze,ee,fe,s,i,l);if(ze.signal.aborted){I.get(P)===ne&&I.delete(P);return}if(Oi(_e))if(I.delete(P),V>Ye){let Ge=li(void 0);y.fetchers.set(P,Ge),J({fetchers:new Map(y.fetchers)});return}else{D.add(P);let Ge=ys(pe);return y.fetchers.set(P,Ge),J({fetchers:new Map(y.fetchers)}),W(y,_e,{submission:pe,isFetchActionRedirect:!0})}if(Bs(_e)){Ve(P,O,_e.error);return}if(Mo(_e))throw Or(400,{type:"defer-action"});let Ae=y.navigation.location||y.location,Xe=ws(e.history,Ae,ne.signal),Ut=c||a,Jt=y.navigation.state!=="idle"?bi(Ut,y.navigation.location,l):y.matches;Oe(Jt,"Didn't find any matches after fetcher action");let ur=++$;F.set(P,ur);let Hr=ys(pe,_e.data);y.fetchers.set(P,Hr);let[Ot,$t]=Fx(e.history,y,Jt,pe,Ae,T,M,L,Y,D,Ut,l,{[ee.route.id]:_e.data},void 0);$t.filter(Ge=>Ge.key!==P).forEach(Ge=>{let kt=Ge.key,Lt=y.fetchers.get(kt),er=ys(void 0,Lt?Lt.data:void 0);y.fetchers.set(kt,er),I.has(kt)&&Me(kt),Ge.controller&&I.set(kt,Ge.controller)}),J({fetchers:new Map(y.fetchers)});let yr=()=>$t.forEach(Ge=>Me(Ge.key));ne.signal.addEventListener("abort",yr);let{results:Vr,loaderResults:qr,fetcherResults:Yr}=await ie(y.matches,Jt,Ot,$t,Xe);if(ne.signal.aborted)return;ne.signal.removeEventListener("abort",yr),F.delete(P),I.delete(P),$t.forEach(Ge=>I.delete(Ge.key));let Ee=Yx(Vr);if(Ee){if(Ee.idx>=Ot.length){let Ge=$t[Ee.idx-Ot.length].key;D.add(Ge)}return W(y,Ee.result)}let{loaderData:zt,errors:qt}=Hx(y,y.matches,Ot,qr,void 0,$t,Yr,z);if(y.fetchers.has(P)){let Ge=li(_e.data);y.fetchers.set(P,Ge)}let Kr=Be(ur);y.navigation.state==="loading"&&ur>V?(Oe(k,"Expected pending action"),E&&E.abort(),xe(y.navigation.location,{matches:Jt,loaderData:zt,errors:qt,fetchers:new Map(y.fetchers)})):(J(at({errors:qt,loaderData:Vx(y.loaderData,zt,Jt,qt)},Kr||$t.length>0?{fetchers:new Map(y.fetchers)}:{})),T=!1)}async function H(P,O,B,ee,fe,pe){let ue=y.fetchers.get(P),ce=ys(pe,ue?ue.data:void 0);y.fetchers.set(P,ce),J({fetchers:new Map(y.fetchers)});let ne=new AbortController,ze=ws(e.history,B,ne.signal);I.set(P,ne);let Ye=$,_e=await vs("loader",ze,ee,fe,s,i,l);if(Mo(_e)&&(_e=await ey(_e,ze.signal,!0)||_e),I.get(P)===ne&&I.delete(P),ze.signal.aborted)return;if(Oi(_e))if(V>Ye){let Xe=li(void 0);y.fetchers.set(P,Xe),J({fetchers:new Map(y.fetchers)});return}else{D.add(P),await W(y,_e);return}if(Bs(_e)){let Xe=ji(y.matches,O);y.fetchers.delete(P),J({fetchers:new Map(y.fetchers),errors:{[Xe.route.id]:_e.error}});return}Oe(!Mo(_e),"Unhandled fetcher deferred data");let Ae=li(_e.data);y.fetchers.set(P,Ae),J({fetchers:new Map(y.fetchers)})}async function W(P,O,B){let{submission:ee,replace:fe,isFetchActionRedirect:pe}=B===void 0?{}:B;O.revalidate&&(T=!0);let ue=ca(P.location,O.location,at({_isRedirect:!0},pe?{_isFetchActionRedirect:!0}:{}));if(Oe(ue,"Expected a location on the redirect navigation"),r){let ze=!1;if(O.reloadDocument)ze=!0;else if(Gw.test(O.location)){const Ye=e.history.createURL(O.location);ze=Ye.origin!==t.location.origin||rs(Ye.pathname,l)==null}if(ze){fe?t.location.replace(O.location):t.location.assign(O.location);return}}E=null;let ce=fe===!0?Nt.Replace:Nt.Push,ne=ee||Qx(P.navigation);if(mS.has(O.status)&&ne&&Zr(ne.formMethod))await G(ce,ue,{submission:at({},ne,{formAction:O.location}),preventScrollReset:_});else if(pe)await G(ce,ue,{overrideNavigation:vl(ue),fetcherSubmission:ne,preventScrollReset:_});else{let ze=vl(ue,ne);await G(ce,ue,{overrideNavigation:ze,preventScrollReset:_})}}async function ie(P,O,B,ee,fe){let pe=await Promise.all([...B.map(ne=>vs("loader",fe,ne,O,s,i,l)),...ee.map(ne=>ne.matches&&ne.match&&ne.controller?vs("loader",ws(e.history,ne.path,ne.controller.signal),ne.match,ne.matches,s,i,l):{type:bt.error,error:Or(404,{pathname:ne.path})})]),ue=pe.slice(0,B.length),ce=pe.slice(B.length);return await Promise.all([Kx(P,B,ue,ue.map(()=>fe.signal),!1,y.loaderData),Kx(P,ee.map(ne=>ne.match),ce,ee.map(ne=>ne.controller?ne.controller.signal:null),!0)]),{results:pe,loaderResults:ue,fetcherResults:ce}}function ke(){T=!0,M.push(...St()),Y.forEach((P,O)=>{I.has(O)&&(L.push(O),Me(O))})}function Ve(P,O,B){let ee=ji(y.matches,O);Qe(P),J({errors:{[ee.route.id]:B},fetchers:new Map(y.fetchers)})}function Qe(P){let O=y.fetchers.get(P);I.has(P)&&!(O&&O.state==="loading"&&F.has(P))&&Me(P),Y.delete(P),F.delete(P),D.delete(P),y.fetchers.delete(P)}function Me(P){let O=I.get(P);Oe(O,"Expected fetch controller: "+P),O.abort(),I.delete(P)}function he(P){for(let O of P){let B=te(O),ee=li(B.data);y.fetchers.set(O,ee)}}function be(){let P=[],O=!1;for(let B of D){let ee=y.fetchers.get(B);Oe(ee,"Expected fetcher: "+B),ee.state==="loading"&&(D.delete(B),P.push(B),O=!0)}return he(P),O}function Be(P){let O=[];for(let[B,ee]of F)if(ee<P){let fe=y.fetchers.get(B);Oe(fe,"Expected fetcher: "+B),fe.state==="loading"&&(Me(B),F.delete(B),O.push(B))}return he(O),O.length>0}function qe(P,O){let B=y.blockers.get(P)||gs;return A.get(P)!==O&&A.set(P,O),B}function dt(P){y.blockers.delete(P),A.delete(P)}function vt(P,O){let B=y.blockers.get(P)||gs;Oe(B.state==="unblocked"&&O.state==="blocked"||B.state==="blocked"&&O.state==="blocked"||B.state==="blocked"&&O.state==="proceeding"||B.state==="blocked"&&O.state==="unblocked"||B.state==="proceeding"&&O.state==="unblocked","Invalid blocker state transition: "+B.state+" -> "+O.state);let ee=new Map(y.blockers);ee.set(P,O),J({blockers:ee})}function Bt(P){let{currentLocation:O,nextLocation:B,historyAction:ee}=P;if(A.size===0)return;A.size>1&&Ui(!1,"A router only supports one blocker at a time");let fe=Array.from(A.entries()),[pe,ue]=fe[fe.length-1],ce=y.blockers.get(pe);if(!(ce&&ce.state==="proceeding")&&ue({currentLocation:O,nextLocation:B,historyAction:ee}))return pe}function St(P){let O=[];return z.forEach((B,ee)=>{(!P||P(ee))&&(B.cancel(),O.push(ee),z.delete(ee))}),O}function De(P,O,B){if(m=P,x=O,b=B||null,!h&&y.navigation===Tu){h=!0;let ee=K(y.location,y.matches);ee!=null&&J({restoreScrollPosition:ee})}return()=>{m=null,x=null,b=null}}function Zt(P,O){return b&&b(P,O.map(ee=>_S(ee,y.loaderData)))||P.key}function Tr(P,O){if(m&&x){let B=Zt(P,O);m[B]=x()}}function K(P,O){if(m){let B=Zt(P,O),ee=m[B];if(typeof ee=="number")return ee}return null}function me(P){s={},c=of(P,i,void 0,s)}return j={get basename(){return l},get state(){return y},get routes(){return a},initialize:q,subscribe:oe,enableScrollRestoration:De,navigate:je,fetch:we,revalidate:Se,createHref:P=>e.history.createHref(P),encodeLocation:P=>e.history.encodeLocation(P),getFetcher:te,deleteFetcher:Qe,dispose:X,getBlocker:qe,deleteBlocker:dt,_internalFetchControllers:I,_internalActiveDeferreds:z,_internalSetRoutes:me},j}function wS(e){return e!=null&&("formData"in e&&e.formData!=null||"body"in e&&e.body!==void 0)}function sf(e,t,r,o,i,s,a){let c,l;if(s!=null&&a!=="path"){c=[];for(let u of t)if(c.push(u),u.route.id===s){l=u;break}}else c=t,l=t[t.length-1];let d=Dp(i||".",ud(c).map(u=>u.pathnameBase),rs(e.pathname,r)||e.pathname,a==="path");return i==null&&(d.search=e.search,d.hash=e.hash),(i==null||i===""||i===".")&&l&&l.route.index&&!Bp(d.search)&&(d.search=d.search?d.search.replace(/^\?/,"?index&"):"?index"),o&&r!=="/"&&(d.pathname=d.pathname==="/"?r:En([r,d.pathname])),Qo(d)}function Dx(e,t,r,o){if(!o||!wS(o))return{path:r};if(o.formMethod&&!CS(o.formMethod))return{path:r,error:Or(405,{method:o.formMethod})};let i=()=>({path:r,error:Or(400,{type:"invalid-body"})}),s=o.formMethod||"get",a=e?s.toUpperCase():s.toLowerCase(),c=Jw(r);if(o.body!==void 0){if(o.formEncType==="text/plain"){if(!Zr(a))return i();let m=typeof o.body=="string"?o.body:o.body instanceof FormData||o.body instanceof URLSearchParams?Array.from(o.body.entries()).reduce((b,x)=>{let[h,v]=x;return""+b+h+"="+v+`
`},""):String(o.body);return{path:r,submission:{formMethod:a,formAction:c,formEncType:o.formEncType,formData:void 0,json:void 0,text:m}}}else if(o.formEncType==="application/json"){if(!Zr(a))return i();try{let m=typeof o.body=="string"?JSON.parse(o.body):o.body;return{path:r,submission:{formMethod:a,formAction:c,formEncType:o.formEncType,formData:void 0,json:m,text:void 0}}}catch{return i()}}}Oe(typeof FormData=="function","FormData is not available in this environment");let l,d;if(o.formData)l=af(o.formData),d=o.formData;else if(o.body instanceof FormData)l=af(o.body),d=o.body;else if(o.body instanceof URLSearchParams)l=o.body,d=Wx(l);else if(o.body==null)l=new URLSearchParams,d=new FormData;else try{l=new URLSearchParams(o.body),d=Wx(l)}catch{return i()}let u={formMethod:a,formAction:c,formEncType:o&&o.formEncType||"application/x-www-form-urlencoded",formData:d,json:void 0,text:void 0};if(Zr(u.formMethod))return{path:r,submission:u};let f=Bn(r);return t&&f.search&&Bp(f.search)&&l.append("index",""),f.search="?"+l,{path:Qo(f),submission:u}}function yS(e,t){let r=e;if(t){let o=e.findIndex(i=>i.route.id===t);o>=0&&(r=e.slice(0,o))}return r}function Fx(e,t,r,o,i,s,a,c,l,d,u,f,m,b){let x=b?Object.values(b)[0]:m?Object.values(m)[0]:void 0,h=e.createURL(t.location),v=e.createURL(i),w=b?Object.keys(b)[0]:void 0,j=yS(r,w).filter((k,_)=>{if(k.route.lazy)return!0;if(k.route.loader==null)return!1;if(bS(t.loaderData,t.matches[_],k)||a.some(T=>T===k.route.id))return!0;let E=t.matches[_],N=k;return Bx(k,at({currentUrl:h,currentParams:E.params,nextUrl:v,nextParams:N.params},o,{actionResult:x,defaultShouldRevalidate:s||h.pathname+h.search===v.pathname+v.search||h.search!==v.search||Zw(E,N)}))}),y=[];return l.forEach((k,_)=>{if(!r.some(L=>L.route.id===k.routeId))return;let E=bi(u,k.path,f);if(!E){y.push({key:_,routeId:k.routeId,path:k.path,matches:null,match:null,controller:null});return}let N=t.fetchers.get(_),T=lf(E,k.path),M=!1;d.has(_)?M=!1:c.includes(_)?M=!0:N&&N.state!=="idle"&&N.data===void 0?M=s:M=Bx(T,at({currentUrl:h,currentParams:t.matches[t.matches.length-1].params,nextUrl:v,nextParams:r[r.length-1].params},o,{actionResult:x,defaultShouldRevalidate:s})),M&&y.push({key:_,routeId:k.routeId,path:k.path,matches:E,match:T,controller:new AbortController})}),[j,y]}function bS(e,t,r){let o=!t||r.route.id!==t.route.id,i=e[r.route.id]===void 0;return o||i}function Zw(e,t){let r=e.route.path;return e.pathname!==t.pathname||r!=null&&r.endsWith("*")&&e.params["*"]!==t.params["*"]}function Bx(e,t){if(e.route.shouldRevalidate){let r=e.route.shouldRevalidate(t);if(typeof r=="boolean")return r}return t.defaultShouldRevalidate}async function Ux(e,t,r){if(!e.lazy)return;let o=await e.lazy();if(!e.lazy)return;let i=r[e.id];Oe(i,"No route found in manifest");let s={};for(let a in o){let l=i[a]!==void 0&&a!=="hasErrorBoundary";Ui(!l,'Route "'+i.id+'" has a static property "'+a+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+a+'" will be ignored.')),!l&&!H2.has(a)&&(s[a]=o[a])}Object.assign(i,s),Object.assign(i,at({},t(i),{lazy:void 0}))}async function vs(e,t,r,o,i,s,a,c){c===void 0&&(c={});let l,d,u,f=x=>{let h,v=new Promise((w,g)=>h=g);return u=()=>h(),t.signal.addEventListener("abort",u),Promise.race([x({request:t,params:r.params,context:c.requestContext}),v])};try{let x=r.route[e];if(r.route.lazy)if(x)d=(await Promise.all([f(x),Ux(r.route,s,i)]))[0];else if(await Ux(r.route,s,i),x=r.route[e],x)d=await f(x);else if(e==="action"){let h=new URL(t.url),v=h.pathname+h.search;throw Or(405,{method:t.method,pathname:v,routeId:r.route.id})}else return{type:bt.data,data:void 0};else if(x)d=await f(x);else{let h=new URL(t.url),v=h.pathname+h.search;throw Or(404,{pathname:v})}Oe(d!==void 0,"You defined "+(e==="action"?"an action":"a loader")+" for route "+('"'+r.route.id+"\" but didn't return anything from your `"+e+"` ")+"function. Please return a value or `null`.")}catch(x){l=bt.error,d=x}finally{u&&t.signal.removeEventListener("abort",u)}if(NS(d)){let x=d.status;if(pS.has(x)){let w=d.headers.get("Location");if(Oe(w,"Redirects returned/thrown from loaders/actions must have a Location header"),!Gw.test(w))w=sf(new URL(t.url),o.slice(0,o.indexOf(r)+1),a,!0,w);else if(!c.isStaticRequest){let g=new URL(t.url),j=w.startsWith("//")?new URL(g.protocol+w):new URL(w),y=rs(j.pathname,a)!=null;j.origin===g.origin&&y&&(w=j.pathname+j.search+j.hash)}if(c.isStaticRequest)throw d.headers.set("Location",w),d;return{type:bt.redirect,status:x,location:w,revalidate:d.headers.get("X-Remix-Revalidate")!==null,reloadDocument:d.headers.get("X-Remix-Reload-Document")!==null}}if(c.isRouteRequest)throw{type:l===bt.error?bt.error:bt.data,response:d};let h,v=d.headers.get("Content-Type");return v&&/\bapplication\/json\b/.test(v)?h=await d.json():h=await d.text(),l===bt.error?{type:l,error:new Fp(x,d.statusText,h),headers:d.headers}:{type:bt.data,data:h,statusCode:d.status,headers:d.headers}}if(l===bt.error)return{type:l,error:d};if(kS(d)){var m,b;return{type:bt.deferred,deferredData:d,statusCode:(m=d.init)==null?void 0:m.status,headers:((b=d.init)==null?void 0:b.headers)&&new Headers(d.init.headers)}}return{type:bt.data,data:d}}function ws(e,t,r,o){let i=e.createURL(Jw(t)).toString(),s={signal:r};if(o&&Zr(o.formMethod)){let{formMethod:a,formEncType:c}=o;s.method=a.toUpperCase(),c==="application/json"?(s.headers=new Headers({"Content-Type":c}),s.body=JSON.stringify(o.json)):c==="text/plain"?s.body=o.text:c==="application/x-www-form-urlencoded"&&o.formData?s.body=af(o.formData):s.body=o.formData}return new Request(i,s)}function af(e){let t=new URLSearchParams;for(let[r,o]of e.entries())t.append(r,typeof o=="string"?o:o.name);return t}function Wx(e){let t=new FormData;for(let[r,o]of e.entries())t.append(r,o);return t}function jS(e,t,r,o,i){let s={},a=null,c,l=!1,d={};return r.forEach((u,f)=>{let m=t[f].route.id;if(Oe(!Oi(u),"Cannot handle redirect results in processLoaderData"),Bs(u)){let b=ji(e,m),x=u.error;o&&(x=Object.values(o)[0],o=void 0),a=a||{},a[b.route.id]==null&&(a[b.route.id]=x),s[m]=void 0,l||(l=!0,c=Qw(u.error)?u.error.status:500),u.headers&&(d[m]=u.headers)}else Mo(u)?(i.set(m,u.deferredData),s[m]=u.deferredData.data):s[m]=u.data,u.statusCode!=null&&u.statusCode!==200&&!l&&(c=u.statusCode),u.headers&&(d[m]=u.headers)}),o&&(a=o,s[Object.keys(o)[0]]=void 0),{loaderData:s,errors:a,statusCode:c||200,loaderHeaders:d}}function Hx(e,t,r,o,i,s,a,c){let{loaderData:l,errors:d}=jS(t,r,o,i,c);for(let u=0;u<s.length;u++){let{key:f,match:m,controller:b}=s[u];Oe(a!==void 0&&a[u]!==void 0,"Did not find corresponding fetcher result");let x=a[u];if(!(b&&b.signal.aborted))if(Bs(x)){let h=ji(e.matches,m==null?void 0:m.route.id);d&&d[h.route.id]||(d=at({},d,{[h.route.id]:x.error})),e.fetchers.delete(f)}else if(Oi(x))Oe(!1,"Unhandled fetcher revalidation redirect");else if(Mo(x))Oe(!1,"Unhandled fetcher deferred data");else{let h=li(x.data);e.fetchers.set(f,h)}}return{loaderData:l,errors:d}}function Vx(e,t,r,o){let i=at({},t);for(let s of r){let a=s.route.id;if(t.hasOwnProperty(a)?t[a]!==void 0&&(i[a]=t[a]):e[a]!==void 0&&s.route.loader&&(i[a]=e[a]),o&&o.hasOwnProperty(a))break}return i}function ji(e,t){return(t?e.slice(0,e.findIndex(o=>o.route.id===t)+1):[...e]).reverse().find(o=>o.route.hasErrorBoundary===!0)||e[0]}function qx(e){let t=e.find(r=>r.index||!r.path||r.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:t}],route:t}}function Or(e,t){let{pathname:r,routeId:o,method:i,type:s}=t===void 0?{}:t,a="Unknown Server Error",c="Unknown @remix-run/router error";return e===400?(a="Bad Request",i&&r&&o?c="You made a "+i+' request to "'+r+'" but '+('did not provide a `loader` for route "'+o+'", ')+"so there is no way to handle the request.":s==="defer-action"?c="defer() is not supported in actions":s==="invalid-body"&&(c="Unable to encode submission body")):e===403?(a="Forbidden",c='Route "'+o+'" does not match URL "'+r+'"'):e===404?(a="Not Found",c='No route matches URL "'+r+'"'):e===405&&(a="Method Not Allowed",i&&r&&o?c="You made a "+i.toUpperCase()+' request to "'+r+'" but '+('did not provide an `action` for route "'+o+'", ')+"so there is no way to handle the request.":i&&(c='Invalid request method "'+i.toUpperCase()+'"')),new Fp(e||500,a,new Error(c),!0)}function Yx(e){for(let t=e.length-1;t>=0;t--){let r=e[t];if(Oi(r))return{result:r,idx:t}}}function Jw(e){let t=typeof e=="string"?Bn(e):e;return Qo(at({},t,{hash:""}))}function SS(e,t){return e.pathname!==t.pathname||e.search!==t.search?!1:e.hash===""?t.hash!=="":e.hash===t.hash?!0:t.hash!==""}function Mo(e){return e.type===bt.deferred}function Bs(e){return e.type===bt.error}function Oi(e){return(e&&e.type)===bt.redirect}function kS(e){let t=e;return t&&typeof t=="object"&&typeof t.data=="object"&&typeof t.subscribe=="function"&&typeof t.cancel=="function"&&typeof t.resolveData=="function"}function NS(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.headers=="object"&&typeof e.body<"u"}function CS(e){return fS.has(e.toLowerCase())}function Zr(e){return uS.has(e.toLowerCase())}async function Kx(e,t,r,o,i,s){for(let a=0;a<r.length;a++){let c=r[a],l=t[a];if(!l)continue;let d=e.find(f=>f.route.id===l.route.id),u=d!=null&&!Zw(d,l)&&(s&&s[l.route.id])!==void 0;if(Mo(c)&&(i||u)){let f=o[a];Oe(f,"Expected an AbortSignal for revalidating fetcher deferred result"),await ey(c,f,i).then(m=>{m&&(r[a]=m||r[a])})}}}async function ey(e,t,r){if(r===void 0&&(r=!1),!await e.deferredData.resolveData(t)){if(r)try{return{type:bt.data,data:e.deferredData.unwrappedData}}catch(i){return{type:bt.error,error:i}}return{type:bt.data,data:e.deferredData.data}}}function Bp(e){return new URLSearchParams(e).getAll("index").some(t=>t==="")}function _S(e,t){let{route:r,pathname:o,params:i}=e;return{id:r.id,pathname:o,params:i,data:t[r.id],handle:r.handle}}function lf(e,t){let r=typeof t=="string"?Bn(t).search:t.search;if(e[e.length-1].route.index&&Bp(r||""))return e[e.length-1];let o=ud(e);return o[o.length-1]}function Qx(e){let{formMethod:t,formAction:r,formEncType:o,text:i,formData:s,json:a}=e;if(!(!t||!r||!o)){if(i!=null)return{formMethod:t,formAction:r,formEncType:o,formData:void 0,json:void 0,text:i};if(s!=null)return{formMethod:t,formAction:r,formEncType:o,formData:s,json:void 0,text:void 0};if(a!==void 0)return{formMethod:t,formAction:r,formEncType:o,formData:void 0,json:a,text:void 0}}}function vl(e,t){return t?{state:"loading",location:e,formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text}:{state:"loading",location:e,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function ES(e,t){return{state:"submitting",location:e,formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text}}function ys(e,t){return e?{state:"loading",formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text,data:t," _hasFetcherDoneAnything ":!0}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:t," _hasFetcherDoneAnything ":!0}}function TS(e,t){return{state:"submitting",formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text,data:t?t.data:void 0," _hasFetcherDoneAnything ":!0}}function li(e){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:e," _hasFetcherDoneAnything ":!0}}/**
 * React Router v6.15.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function kc(){return kc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},kc.apply(this,arguments)}const hd=p.createContext(null),ty=p.createContext(null),ns=p.createContext(null),fd=p.createContext(null),No=p.createContext({outlet:null,matches:[],isDataRoute:!1}),ry=p.createContext(null);function PS(e,t){let{relative:r}=t===void 0?{}:t;qa()||Oe(!1);let{basename:o,navigator:i}=p.useContext(ns),{hash:s,pathname:a,search:c}=oy(e,{relative:r}),l=a;return o!=="/"&&(l=a==="/"?o:En([o,a])),i.createHref({pathname:l,search:c,hash:s})}function qa(){return p.useContext(fd)!=null}function ti(){return qa()||Oe(!1),p.useContext(fd).location}function ny(e){p.useContext(ns).static||p.useLayoutEffect(e)}function de(){let{isDataRoute:e}=p.useContext(No);return e?US():OS()}function OS(){qa()||Oe(!1);let e=p.useContext(hd),{basename:t,navigator:r}=p.useContext(ns),{matches:o}=p.useContext(No),{pathname:i}=ti(),s=JSON.stringify(ud(o).map(l=>l.pathnameBase)),a=p.useRef(!1);return ny(()=>{a.current=!0}),p.useCallback(function(l,d){if(d===void 0&&(d={}),!a.current)return;if(typeof l=="number"){r.go(l);return}let u=Dp(l,JSON.parse(s),i,d.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:En([t,u.pathname])),(d.replace?r.replace:r.push)(u,d.state,d)},[t,r,s,i,e])}function Up(){let{matches:e}=p.useContext(No),t=e[e.length-1];return t?t.params:{}}function oy(e,t){let{relative:r}=t===void 0?{}:t,{matches:o}=p.useContext(No),{pathname:i}=ti(),s=JSON.stringify(ud(o).map(a=>a.pathnameBase));return p.useMemo(()=>Dp(e,JSON.parse(s),i,r==="path"),[e,s,i,r])}function zS(e,t,r){qa()||Oe(!1);let{navigator:o}=p.useContext(ns),{matches:i}=p.useContext(No),s=i[i.length-1],a=s?s.params:{};s&&s.pathname;let c=s?s.pathnameBase:"/";s&&s.route;let l=ti(),d;if(t){var u;let h=typeof t=="string"?Bn(t):t;c==="/"||(u=h.pathname)!=null&&u.startsWith(c)||Oe(!1),d=h}else d=l;let f=d.pathname||"/",m=c==="/"?f:f.slice(c.length)||"/",b=bi(e,{pathname:m}),x=IS(b&&b.map(h=>Object.assign({},h,{params:Object.assign({},a,h.params),pathname:En([c,o.encodeLocation?o.encodeLocation(h.pathname).pathname:h.pathname]),pathnameBase:h.pathnameBase==="/"?c:En([c,o.encodeLocation?o.encodeLocation(h.pathnameBase).pathname:h.pathnameBase])})),i,r);return t&&x?p.createElement(fd.Provider,{value:{location:kc({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:Nt.Pop}},x):x}function RS(){let e=BS(),t=Qw(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},s=null;return p.createElement(p.Fragment,null,p.createElement("h2",null,"Unexpected Application Error!"),p.createElement("h3",{style:{fontStyle:"italic"}},t),r?p.createElement("pre",{style:i},r):null,s)}const MS=p.createElement(RS,null);class $S extends p.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error||r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error?p.createElement(No.Provider,{value:this.props.routeContext},p.createElement(ry.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function LS(e){let{routeContext:t,match:r,children:o}=e,i=p.useContext(hd);return i&&i.static&&i.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=r.route.id),p.createElement(No.Provider,{value:t},o)}function IS(e,t,r){var o;if(t===void 0&&(t=[]),r===void 0&&(r=null),e==null){var i;if((i=r)!=null&&i.errors)e=r.matches;else return null}let s=e,a=(o=r)==null?void 0:o.errors;if(a!=null){let c=s.findIndex(l=>l.route.id&&(a==null?void 0:a[l.route.id]));c>=0||Oe(!1),s=s.slice(0,Math.min(s.length,c+1))}return s.reduceRight((c,l,d)=>{let u=l.route.id?a==null?void 0:a[l.route.id]:null,f=null;r&&(f=l.route.errorElement||MS);let m=t.concat(s.slice(0,d+1)),b=()=>{let x;return u?x=f:l.route.Component?x=p.createElement(l.route.Component,null):l.route.element?x=l.route.element:x=c,p.createElement(LS,{match:l,routeContext:{outlet:c,matches:m,isDataRoute:r!=null},children:x})};return r&&(l.route.ErrorBoundary||l.route.errorElement||d===0)?p.createElement($S,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:b(),routeContext:{outlet:null,matches:m,isDataRoute:!0}}):b()},null)}var iy=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(iy||{}),Nc=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Nc||{});function AS(e){let t=p.useContext(hd);return t||Oe(!1),t}function DS(e){let t=p.useContext(ty);return t||Oe(!1),t}function FS(e){let t=p.useContext(No);return t||Oe(!1),t}function sy(e){let t=FS(),r=t.matches[t.matches.length-1];return r.route.id||Oe(!1),r.route.id}function BS(){var e;let t=p.useContext(ry),r=DS(Nc.UseRouteError),o=sy(Nc.UseRouteError);return t||((e=r.errors)==null?void 0:e[o])}function US(){let{router:e}=AS(iy.UseNavigateStable),t=sy(Nc.UseNavigateStable),r=p.useRef(!1);return ny(()=>{r.current=!0}),p.useCallback(function(i,s){s===void 0&&(s={}),r.current&&(typeof i=="number"?e.navigate(i):e.navigate(i,kc({fromRouteId:t},s)))},[e,t])}const WS="startTransition",Xx=Ob[WS];function HS(e){let{fallbackElement:t,router:r,future:o}=e,[i,s]=p.useState(r.state),{v7_startTransition:a}=o||{},c=p.useCallback(f=>{a&&Xx?Xx(()=>s(f)):s(f)},[s,a]);p.useLayoutEffect(()=>r.subscribe(c),[r,c]);let l=p.useMemo(()=>({createHref:r.createHref,encodeLocation:r.encodeLocation,go:f=>r.navigate(f),push:(f,m,b)=>r.navigate(f,{state:m,preventScrollReset:b==null?void 0:b.preventScrollReset}),replace:(f,m,b)=>r.navigate(f,{replace:!0,state:m,preventScrollReset:b==null?void 0:b.preventScrollReset})}),[r]),d=r.basename||"/",u=p.useMemo(()=>({router:r,navigator:l,static:!1,basename:d}),[r,l,d]);return p.createElement(p.Fragment,null,p.createElement(hd.Provider,{value:u},p.createElement(ty.Provider,{value:i},p.createElement(qS,{basename:d,location:i.location,navigationType:i.historyAction,navigator:l},i.initialized?p.createElement(VS,{routes:r.routes,state:i}):t))),null)}function VS(e){let{routes:t,state:r}=e;return zS(t,void 0,r)}function qS(e){let{basename:t="/",children:r=null,location:o,navigationType:i=Nt.Pop,navigator:s,static:a=!1}=e;qa()&&Oe(!1);let c=t.replace(/^\/*/,"/"),l=p.useMemo(()=>({basename:c,navigator:s,static:a}),[c,s,a]);typeof o=="string"&&(o=Bn(o));let{pathname:d="/",search:u="",hash:f="",state:m=null,key:b="default"}=o,x=p.useMemo(()=>{let h=rs(d,c);return h==null?null:{location:{pathname:h,search:u,hash:f,state:m,key:b},navigationType:i}},[c,d,u,f,m,b,i]);return x==null?null:p.createElement(ns.Provider,{value:l},p.createElement(fd.Provider,{children:r,value:x}))}new Promise(()=>{});function YS(e){let t={hasErrorBoundary:e.ErrorBoundary!=null||e.errorElement!=null};return e.Component&&Object.assign(t,{element:p.createElement(e.Component),Component:void 0}),e.ErrorBoundary&&Object.assign(t,{errorElement:p.createElement(e.ErrorBoundary),ErrorBoundary:void 0}),t}/**
 * React Router DOM v6.15.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function da(){return da=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},da.apply(this,arguments)}function KS(e,t){if(e==null)return{};var r={},o=Object.keys(e),i,s;for(s=0;s<o.length;s++)i=o[s],!(t.indexOf(i)>=0)&&(r[i]=e[i]);return r}function QS(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function XS(e,t){return e.button===0&&(!t||t==="_self")&&!QS(e)}const GS=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"];function ZS(e,t){return vS({basename:t==null?void 0:t.basename,future:da({},t==null?void 0:t.future,{v7_prependBasename:!0}),history:B2({window:t==null?void 0:t.window}),hydrationData:(t==null?void 0:t.hydrationData)||JS(),routes:e,mapRouteProperties:YS}).initialize()}function JS(){var e;let t=(e=window)==null?void 0:e.__staticRouterHydrationData;return t&&t.errors&&(t=da({},t,{errors:ek(t.errors)})),t}function ek(e){if(!e)return null;let t=Object.entries(e),r={};for(let[o,i]of t)if(i&&i.__type==="RouteErrorResponse")r[o]=new Fp(i.status,i.statusText,i.data,i.internal===!0);else if(i&&i.__type==="Error"){if(i.__subType){let s=window[i.__subType];if(typeof s=="function")try{let a=new s(i.message);a.stack="",r[o]=a}catch{}}if(r[o]==null){let s=new Error(i.message);s.stack="",r[o]=s}}else r[o]=i;return r}const tk=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",rk=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,C=p.forwardRef(function(t,r){let{onClick:o,relative:i,reloadDocument:s,replace:a,state:c,target:l,to:d,preventScrollReset:u}=t,f=KS(t,GS),{basename:m}=p.useContext(ns),b,x=!1;if(typeof d=="string"&&rk.test(d)&&(b=d,tk))try{let g=new URL(window.location.href),j=d.startsWith("//")?new URL(g.protocol+d):new URL(d),y=rs(j.pathname,m);j.origin===g.origin&&y!=null?d=y+j.search+j.hash:x=!0}catch{}let h=PS(d,{relative:i}),v=nk(d,{replace:a,state:c,target:l,preventScrollReset:u,relative:i});function w(g){o&&o(g),g.defaultPrevented||v(g)}return p.createElement("a",da({},f,{href:b||h,onClick:x||s?o:w,ref:r,target:l}))});var Gx;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher"})(Gx||(Gx={}));var Zx;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Zx||(Zx={}));function nk(e,t){let{target:r,replace:o,state:i,preventScrollReset:s,relative:a}=t===void 0?{}:t,c=de(),l=ti(),d=oy(e,{relative:a});return p.useCallback(u=>{if(XS(u,r)){u.preventDefault();let f=o!==void 0?o:Qo(l)===Qo(d);c(e,{replace:f,state:i,preventScrollReset:s,relative:a})}},[l,c,d,o,i,r,e,s,a])}function ay(e){var t,r,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=ay(e[t]))&&(o&&(o+=" "),o+=r);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function oo(){for(var e,t,r=0,o="";r<arguments.length;)(e=arguments[r++])&&(t=ay(e))&&(o&&(o+=" "),o+=t);return o}const Us=e=>typeof e=="number"&&!isNaN(e),Xo=e=>typeof e=="string",mr=e=>typeof e=="function",Bl=e=>Xo(e)||mr(e)?e:null,Pu=e=>p.isValidElement(e)||Xo(e)||mr(e)||Us(e);function ok(e,t,r){r===void 0&&(r=300);const{scrollHeight:o,style:i}=e;requestAnimationFrame(()=>{i.minHeight="initial",i.height=o+"px",i.transition=`all ${r}ms`,requestAnimationFrame(()=>{i.height="0",i.padding="0",i.margin="0",setTimeout(t,r)})})}function pd(e){let{enter:t,exit:r,appendPosition:o=!1,collapse:i=!0,collapseDuration:s=300}=e;return function(a){let{children:c,position:l,preventExitTransition:d,done:u,nodeRef:f,isIn:m}=a;const b=o?`${t}--${l}`:t,x=o?`${r}--${l}`:r,h=p.useRef(0);return p.useLayoutEffect(()=>{const v=f.current,w=b.split(" "),g=j=>{j.target===f.current&&(v.dispatchEvent(new Event("d")),v.removeEventListener("animationend",g),v.removeEventListener("animationcancel",g),h.current===0&&j.type!=="animationcancel"&&v.classList.remove(...w))};v.classList.add(...w),v.addEventListener("animationend",g),v.addEventListener("animationcancel",g)},[]),p.useEffect(()=>{const v=f.current,w=()=>{v.removeEventListener("animationend",w),i?ok(v,u,s):u()};m||(d?w():(h.current=1,v.className+=` ${x}`,v.addEventListener("animationend",w)))},[m]),Ne.createElement(Ne.Fragment,null,c)}}function Jx(e,t){return e!=null?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const zr={list:new Map,emitQueue:new Map,on(e,t){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(t),this},off(e,t){if(t){const r=this.list.get(e).filter(o=>o!==t);return this.list.set(e,r),this}return this.list.delete(e),this},cancelEmit(e){const t=this.emitQueue.get(e);return t&&(t.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach(t=>{const r=setTimeout(()=>{t(...[].slice.call(arguments,1))},0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(r)})}},wl=e=>{let{theme:t,type:r,...o}=e;return Ne.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${r})`,...o})},Ou={info:function(e){return Ne.createElement(wl,{...e},Ne.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return Ne.createElement(wl,{...e},Ne.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return Ne.createElement(wl,{...e},Ne.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return Ne.createElement(wl,{...e},Ne.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return Ne.createElement("div",{className:"Toastify__spinner"})}};function ik(e){const[,t]=p.useReducer(b=>b+1,0),[r,o]=p.useState([]),i=p.useRef(null),s=p.useRef(new Map).current,a=b=>r.indexOf(b)!==-1,c=p.useRef({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:a,getToast:b=>s.get(b)}).current;function l(b){let{containerId:x}=b;const{limit:h}=c.props;!h||x&&c.containerId!==x||(c.count-=c.queue.length,c.queue=[])}function d(b){o(x=>b==null?[]:x.filter(h=>h!==b))}function u(){const{toastContent:b,toastProps:x,staleId:h}=c.queue.shift();m(b,x,h)}function f(b,x){let{delay:h,staleId:v,...w}=x;if(!Pu(b)||function(I){return!i.current||c.props.enableMultiContainer&&I.containerId!==c.props.containerId||s.has(I.toastId)&&I.updateId==null}(w))return;const{toastId:g,updateId:j,data:y}=w,{props:k}=c,_=()=>d(g),E=j==null;E&&c.count++;const N={...k,style:k.toastStyle,key:c.toastKey++,...Object.fromEntries(Object.entries(w).filter(I=>{let[$,V]=I;return V!=null})),toastId:g,updateId:j,data:y,closeToast:_,isIn:!1,className:Bl(w.className||k.toastClassName),bodyClassName:Bl(w.bodyClassName||k.bodyClassName),progressClassName:Bl(w.progressClassName||k.progressClassName),autoClose:!w.isLoading&&(T=w.autoClose,M=k.autoClose,T===!1||Us(T)&&T>0?T:M),deleteToast(){const I=Jx(s.get(g),"removed");s.delete(g),zr.emit(4,I);const $=c.queue.length;if(c.count=g==null?c.count-c.displayedToast:c.count-1,c.count<0&&(c.count=0),$>0){const V=g==null?c.props.limit:1;if($===1||V===1)c.displayedToast++,u();else{const F=V>$?$:V;c.displayedToast=F;for(let D=0;D<F;D++)u()}}else t()}};var T,M;N.iconOut=function(I){let{theme:$,type:V,isLoading:F,icon:D}=I,Y=null;const z={theme:$,type:V};return D===!1||(mr(D)?Y=D(z):p.isValidElement(D)?Y=p.cloneElement(D,z):Xo(D)||Us(D)?Y=D:F?Y=Ou.spinner():(A=>A in Ou)(V)&&(Y=Ou[V](z))),Y}(N),mr(w.onOpen)&&(N.onOpen=w.onOpen),mr(w.onClose)&&(N.onClose=w.onClose),N.closeButton=k.closeButton,w.closeButton===!1||Pu(w.closeButton)?N.closeButton=w.closeButton:w.closeButton===!0&&(N.closeButton=!Pu(k.closeButton)||k.closeButton);let L=b;p.isValidElement(b)&&!Xo(b.type)?L=p.cloneElement(b,{closeToast:_,toastProps:N,data:y}):mr(b)&&(L=b({closeToast:_,toastProps:N,data:y})),k.limit&&k.limit>0&&c.count>k.limit&&E?c.queue.push({toastContent:L,toastProps:N,staleId:v}):Us(h)?setTimeout(()=>{m(L,N,v)},h):m(L,N,v)}function m(b,x,h){const{toastId:v}=x;h&&s.delete(h);const w={content:b,props:x};s.set(v,w),o(g=>[...g,v].filter(j=>j!==h)),zr.emit(4,Jx(w,w.props.updateId==null?"added":"updated"))}return p.useEffect(()=>(c.containerId=e.containerId,zr.cancelEmit(3).on(0,f).on(1,b=>i.current&&d(b)).on(5,l).emit(2,c),()=>{s.clear(),zr.emit(3,c)}),[]),p.useEffect(()=>{c.props=e,c.isToastActive=a,c.displayedToast=r.length}),{getToastToRender:function(b){const x=new Map,h=Array.from(s.values());return e.newestOnTop&&h.reverse(),h.forEach(v=>{const{position:w}=v.props;x.has(w)||x.set(w,[]),x.get(w).push(v)}),Array.from(x,v=>b(v[0],v[1]))},containerRef:i,isToastActive:a}}function eg(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function tg(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function sk(e){const[t,r]=p.useState(!1),[o,i]=p.useState(!1),s=p.useRef(null),a=p.useRef({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,c=p.useRef(e),{autoClose:l,pauseOnHover:d,closeToast:u,onClick:f,closeOnClick:m}=e;function b(y){if(e.draggable){y.nativeEvent.type==="touchstart"&&y.nativeEvent.preventDefault(),a.didMove=!1,document.addEventListener("mousemove",w),document.addEventListener("mouseup",g),document.addEventListener("touchmove",w),document.addEventListener("touchend",g);const k=s.current;a.canCloseOnClick=!0,a.canDrag=!0,a.boundingRect=k.getBoundingClientRect(),k.style.transition="",a.x=eg(y.nativeEvent),a.y=tg(y.nativeEvent),e.draggableDirection==="x"?(a.start=a.x,a.removalDistance=k.offsetWidth*(e.draggablePercent/100)):(a.start=a.y,a.removalDistance=k.offsetHeight*(e.draggablePercent===80?1.5*e.draggablePercent:e.draggablePercent/100))}}function x(y){if(a.boundingRect){const{top:k,bottom:_,left:E,right:N}=a.boundingRect;y.nativeEvent.type!=="touchend"&&e.pauseOnHover&&a.x>=E&&a.x<=N&&a.y>=k&&a.y<=_?v():h()}}function h(){r(!0)}function v(){r(!1)}function w(y){const k=s.current;a.canDrag&&k&&(a.didMove=!0,t&&v(),a.x=eg(y),a.y=tg(y),a.delta=e.draggableDirection==="x"?a.x-a.start:a.y-a.start,a.start!==a.x&&(a.canCloseOnClick=!1),k.style.transform=`translate${e.draggableDirection}(${a.delta}px)`,k.style.opacity=""+(1-Math.abs(a.delta/a.removalDistance)))}function g(){document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",g),document.removeEventListener("touchmove",w),document.removeEventListener("touchend",g);const y=s.current;if(a.canDrag&&a.didMove&&y){if(a.canDrag=!1,Math.abs(a.delta)>a.removalDistance)return i(!0),void e.closeToast();y.style.transition="transform 0.2s, opacity 0.2s",y.style.transform=`translate${e.draggableDirection}(0)`,y.style.opacity="1"}}p.useEffect(()=>{c.current=e}),p.useEffect(()=>(s.current&&s.current.addEventListener("d",h,{once:!0}),mr(e.onOpen)&&e.onOpen(p.isValidElement(e.children)&&e.children.props),()=>{const y=c.current;mr(y.onClose)&&y.onClose(p.isValidElement(y.children)&&y.children.props)}),[]),p.useEffect(()=>(e.pauseOnFocusLoss&&(document.hasFocus()||v(),window.addEventListener("focus",h),window.addEventListener("blur",v)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",h),window.removeEventListener("blur",v))}),[e.pauseOnFocusLoss]);const j={onMouseDown:b,onTouchStart:b,onMouseUp:x,onTouchEnd:x};return l&&d&&(j.onMouseEnter=v,j.onMouseLeave=h),m&&(j.onClick=y=>{f&&f(y),a.canCloseOnClick&&u()}),{playToast:h,pauseToast:v,isRunning:t,preventExitTransition:o,toastRef:s,eventHandlers:j}}function ly(e){let{closeToast:t,theme:r,ariaLabel:o="close"}=e;return Ne.createElement("button",{className:`Toastify__close-button Toastify__close-button--${r}`,type:"button",onClick:i=>{i.stopPropagation(),t(i)},"aria-label":o},Ne.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},Ne.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function ak(e){let{delay:t,isRunning:r,closeToast:o,type:i="default",hide:s,className:a,style:c,controlledProgress:l,progress:d,rtl:u,isIn:f,theme:m}=e;const b=s||l&&d===0,x={...c,animationDuration:`${t}ms`,animationPlayState:r?"running":"paused",opacity:b?0:1};l&&(x.transform=`scaleX(${d})`);const h=oo("Toastify__progress-bar",l?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${m}`,`Toastify__progress-bar--${i}`,{"Toastify__progress-bar--rtl":u}),v=mr(a)?a({rtl:u,type:i,defaultClassName:h}):oo(h,a);return Ne.createElement("div",{role:"progressbar","aria-hidden":b?"true":"false","aria-label":"notification timer",className:v,style:x,[l&&d>=1?"onTransitionEnd":"onAnimationEnd"]:l&&d<1?null:()=>{f&&o()}})}const lk=e=>{const{isRunning:t,preventExitTransition:r,toastRef:o,eventHandlers:i}=sk(e),{closeButton:s,children:a,autoClose:c,onClick:l,type:d,hideProgressBar:u,closeToast:f,transition:m,position:b,className:x,style:h,bodyClassName:v,bodyStyle:w,progressClassName:g,progressStyle:j,updateId:y,role:k,progress:_,rtl:E,toastId:N,deleteToast:T,isIn:M,isLoading:L,iconOut:I,closeOnClick:$,theme:V}=e,F=oo("Toastify__toast",`Toastify__toast-theme--${V}`,`Toastify__toast--${d}`,{"Toastify__toast--rtl":E},{"Toastify__toast--close-on-click":$}),D=mr(x)?x({rtl:E,position:b,type:d,defaultClassName:F}):oo(F,x),Y=!!_||!c,z={closeToast:f,type:d,theme:V};let A=null;return s===!1||(A=mr(s)?s(z):p.isValidElement(s)?p.cloneElement(s,z):ly(z)),Ne.createElement(m,{isIn:M,done:T,position:b,preventExitTransition:r,nodeRef:o},Ne.createElement("div",{id:N,onClick:l,className:D,...i,style:h,ref:o},Ne.createElement("div",{...M&&{role:k},className:mr(v)?v({type:d}):oo("Toastify__toast-body",v),style:w},I!=null&&Ne.createElement("div",{className:oo("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!L})},I),Ne.createElement("div",null,a)),A,Ne.createElement(ak,{...y&&!Y?{key:`pb-${y}`}:{},rtl:E,theme:V,delay:c,isRunning:t,isIn:M,closeToast:f,hide:u,type:d,style:j,className:g,controlledProgress:Y,progress:_||0})))},md=function(e,t){return t===void 0&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},ck=pd(md("bounce",!0));pd(md("slide",!0));pd(md("zoom"));pd(md("flip"));const cf=p.forwardRef((e,t)=>{const{getToastToRender:r,containerRef:o,isToastActive:i}=ik(e),{className:s,style:a,rtl:c,containerId:l}=e;function d(u){const f=oo("Toastify__toast-container",`Toastify__toast-container--${u}`,{"Toastify__toast-container--rtl":c});return mr(s)?s({position:u,rtl:c,defaultClassName:f}):oo(f,Bl(s))}return p.useEffect(()=>{t&&(t.current=o.current)},[]),Ne.createElement("div",{ref:o,className:"Toastify",id:l},r((u,f)=>{const m=f.length?{...a}:{...a,pointerEvents:"none"};return Ne.createElement("div",{className:d(u),style:m,key:`container-${u}`},f.map((b,x)=>{let{content:h,props:v}=b;return Ne.createElement(lk,{...v,isIn:i(v.toastId),style:{...v.style,"--nth":x+1,"--len":f.length},key:`toast-${v.key}`},h)}))}))});cf.displayName="ToastContainer",cf.defaultProps={position:"top-right",transition:ck,autoClose:5e3,closeButton:ly,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let zu,To=new Map,Ts=[],dk=1;function cy(){return""+dk++}function uk(e){return e&&(Xo(e.toastId)||Us(e.toastId))?e.toastId:cy()}function Ws(e,t){return To.size>0?zr.emit(0,e,t):Ts.push({content:e,options:t}),t.toastId}function Cc(e,t){return{...t,type:t&&t.type||e,toastId:uk(t)}}function yl(e){return(t,r)=>Ws(t,Cc(e,r))}function Je(e,t){return Ws(e,Cc("default",t))}Je.loading=(e,t)=>Ws(e,Cc("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),Je.promise=function(e,t,r){let o,{pending:i,error:s,success:a}=t;i&&(o=Xo(i)?Je.loading(i,r):Je.loading(i.render,{...r,...i}));const c={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(u,f,m)=>{if(f==null)return void Je.dismiss(o);const b={type:u,...c,...r,data:m},x=Xo(f)?{render:f}:f;return o?Je.update(o,{...b,...x}):Je(x.render,{...b,...x}),m},d=mr(e)?e():e;return d.then(u=>l("success",a,u)).catch(u=>l("error",s,u)),d},Je.success=yl("success"),Je.info=yl("info"),Je.error=yl("error"),Je.warning=yl("warning"),Je.warn=Je.warning,Je.dark=(e,t)=>Ws(e,Cc("default",{theme:"dark",...t})),Je.dismiss=e=>{To.size>0?zr.emit(1,e):Ts=Ts.filter(t=>e!=null&&t.options.toastId!==e)},Je.clearWaitingQueue=function(e){return e===void 0&&(e={}),zr.emit(5,e)},Je.isActive=e=>{let t=!1;return To.forEach(r=>{r.isToastActive&&r.isToastActive(e)&&(t=!0)}),t},Je.update=function(e,t){t===void 0&&(t={}),setTimeout(()=>{const r=function(o,i){let{containerId:s}=i;const a=To.get(s||zu);return a&&a.getToast(o)}(e,t);if(r){const{props:o,content:i}=r,s={delay:100,...o,...t,toastId:t.toastId||e,updateId:cy()};s.toastId!==e&&(s.staleId=e);const a=s.render||i;delete s.render,Ws(a,s)}},0)},Je.done=e=>{Je.update(e,{progress:1})},Je.onChange=e=>(zr.on(4,e),()=>{zr.off(4,e)}),Je.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},Je.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},zr.on(2,e=>{zu=e.containerId||e,To.set(zu,e),Ts.forEach(t=>{zr.emit(0,t.content,t.options)}),Ts=[]}).on(3,e=>{To.delete(e.containerId||e),To.size===0&&zr.off(0).off(1).off(5)});var dy={exports:{}},uy={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wi=p;function hk(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var fk=typeof Object.is=="function"?Object.is:hk,pk=Wi.useState,mk=Wi.useEffect,xk=Wi.useLayoutEffect,gk=Wi.useDebugValue;function vk(e,t){var r=t(),o=pk({inst:{value:r,getSnapshot:t}}),i=o[0].inst,s=o[1];return xk(function(){i.value=r,i.getSnapshot=t,Ru(i)&&s({inst:i})},[e,r,t]),mk(function(){return Ru(i)&&s({inst:i}),e(function(){Ru(i)&&s({inst:i})})},[e]),gk(r),r}function Ru(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!fk(e,r)}catch{return!0}}function wk(e,t){return t()}var yk=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?wk:vk;uy.useSyncExternalStore=Wi.useSyncExternalStore!==void 0?Wi.useSyncExternalStore:yk;dy.exports=uy;var bk=dy.exports,hy={exports:{}},fy={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xd=p,jk=bk;function Sk(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var kk=typeof Object.is=="function"?Object.is:Sk,Nk=jk.useSyncExternalStore,Ck=xd.useRef,_k=xd.useEffect,Ek=xd.useMemo,Tk=xd.useDebugValue;fy.useSyncExternalStoreWithSelector=function(e,t,r,o,i){var s=Ck(null);if(s.current===null){var a={hasValue:!1,value:null};s.current=a}else a=s.current;s=Ek(function(){function l(b){if(!d){if(d=!0,u=b,b=o(b),i!==void 0&&a.hasValue){var x=a.value;if(i(x,b))return f=x}return f=b}if(x=f,kk(u,b))return x;var h=o(b);return i!==void 0&&i(x,h)?x:(u=b,f=h)}var d=!1,u,f,m=r===void 0?null:r;return[function(){return l(t())},m===null?void 0:function(){return l(m())}]},[t,r,o,i]);var c=Nk(e,s[0],s[1]);return _k(function(){a.hasValue=!0,a.value=c},[c]),Tk(c),c};hy.exports=fy;var Pk=hy.exports;function Ok(e){e()}let py=Ok;const zk=e=>py=e,Rk=()=>py,rg=Symbol.for("react-redux-context"),ng=typeof globalThis<"u"?globalThis:{};function Mk(){var e;if(!p.createContext)return{};const t=(e=ng[rg])!=null?e:ng[rg]=new Map;let r=t.get(p.createContext);return r||(r=p.createContext(null),t.set(p.createContext,r)),r}const wo=Mk();function Wp(e=wo){return function(){return p.useContext(e)}}const my=Wp(),$k=()=>{throw new Error("uSES not initialized!")};let xy=$k;const Lk=e=>{xy=e},Ik=(e,t)=>e===t;function Ak(e=wo){const t=e===wo?my:Wp(e);return function(o,i={}){const{equalityFn:s=Ik,stabilityCheck:a=void 0,noopCheck:c=void 0}=typeof i=="function"?{equalityFn:i}:i,{store:l,subscription:d,getServerState:u,stabilityCheck:f,noopCheck:m}=t();p.useRef(!0);const b=p.useCallback({[o.name](h){return o(h)}}[o.name],[o,f,a]),x=xy(d.addNestedSub,l.getState,u||l.getState,b,s);return p.useDebugValue(x),x}}const xt=Ak();var gy={exports:{}},We={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ft=typeof Symbol=="function"&&Symbol.for,Hp=Ft?Symbol.for("react.element"):60103,Vp=Ft?Symbol.for("react.portal"):60106,gd=Ft?Symbol.for("react.fragment"):60107,vd=Ft?Symbol.for("react.strict_mode"):60108,wd=Ft?Symbol.for("react.profiler"):60114,yd=Ft?Symbol.for("react.provider"):60109,bd=Ft?Symbol.for("react.context"):60110,qp=Ft?Symbol.for("react.async_mode"):60111,jd=Ft?Symbol.for("react.concurrent_mode"):60111,Sd=Ft?Symbol.for("react.forward_ref"):60112,kd=Ft?Symbol.for("react.suspense"):60113,Dk=Ft?Symbol.for("react.suspense_list"):60120,Nd=Ft?Symbol.for("react.memo"):60115,Cd=Ft?Symbol.for("react.lazy"):60116,Fk=Ft?Symbol.for("react.block"):60121,Bk=Ft?Symbol.for("react.fundamental"):60117,Uk=Ft?Symbol.for("react.responder"):60118,Wk=Ft?Symbol.for("react.scope"):60119;function Er(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case Hp:switch(e=e.type,e){case qp:case jd:case gd:case wd:case vd:case kd:return e;default:switch(e=e&&e.$$typeof,e){case bd:case Sd:case Cd:case Nd:case yd:return e;default:return t}}case Vp:return t}}}function vy(e){return Er(e)===jd}We.AsyncMode=qp;We.ConcurrentMode=jd;We.ContextConsumer=bd;We.ContextProvider=yd;We.Element=Hp;We.ForwardRef=Sd;We.Fragment=gd;We.Lazy=Cd;We.Memo=Nd;We.Portal=Vp;We.Profiler=wd;We.StrictMode=vd;We.Suspense=kd;We.isAsyncMode=function(e){return vy(e)||Er(e)===qp};We.isConcurrentMode=vy;We.isContextConsumer=function(e){return Er(e)===bd};We.isContextProvider=function(e){return Er(e)===yd};We.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Hp};We.isForwardRef=function(e){return Er(e)===Sd};We.isFragment=function(e){return Er(e)===gd};We.isLazy=function(e){return Er(e)===Cd};We.isMemo=function(e){return Er(e)===Nd};We.isPortal=function(e){return Er(e)===Vp};We.isProfiler=function(e){return Er(e)===wd};We.isStrictMode=function(e){return Er(e)===vd};We.isSuspense=function(e){return Er(e)===kd};We.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===gd||e===jd||e===wd||e===vd||e===kd||e===Dk||typeof e=="object"&&e!==null&&(e.$$typeof===Cd||e.$$typeof===Nd||e.$$typeof===yd||e.$$typeof===bd||e.$$typeof===Sd||e.$$typeof===Bk||e.$$typeof===Uk||e.$$typeof===Wk||e.$$typeof===Fk)};We.typeOf=Er;gy.exports=We;var Hk=gy.exports,wy=Hk,Vk={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},qk={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},yy={};yy[wy.ForwardRef]=Vk;yy[wy.Memo]=qk;var Ke={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yp=Symbol.for("react.element"),Kp=Symbol.for("react.portal"),_d=Symbol.for("react.fragment"),Ed=Symbol.for("react.strict_mode"),Td=Symbol.for("react.profiler"),Pd=Symbol.for("react.provider"),Od=Symbol.for("react.context"),Yk=Symbol.for("react.server_context"),zd=Symbol.for("react.forward_ref"),Rd=Symbol.for("react.suspense"),Md=Symbol.for("react.suspense_list"),$d=Symbol.for("react.memo"),Ld=Symbol.for("react.lazy"),Kk=Symbol.for("react.offscreen"),by;by=Symbol.for("react.module.reference");function Ur(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case Yp:switch(e=e.type,e){case _d:case Td:case Ed:case Rd:case Md:return e;default:switch(e=e&&e.$$typeof,e){case Yk:case Od:case zd:case Ld:case $d:case Pd:return e;default:return t}}case Kp:return t}}}Ke.ContextConsumer=Od;Ke.ContextProvider=Pd;Ke.Element=Yp;Ke.ForwardRef=zd;Ke.Fragment=_d;Ke.Lazy=Ld;Ke.Memo=$d;Ke.Portal=Kp;Ke.Profiler=Td;Ke.StrictMode=Ed;Ke.Suspense=Rd;Ke.SuspenseList=Md;Ke.isAsyncMode=function(){return!1};Ke.isConcurrentMode=function(){return!1};Ke.isContextConsumer=function(e){return Ur(e)===Od};Ke.isContextProvider=function(e){return Ur(e)===Pd};Ke.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Yp};Ke.isForwardRef=function(e){return Ur(e)===zd};Ke.isFragment=function(e){return Ur(e)===_d};Ke.isLazy=function(e){return Ur(e)===Ld};Ke.isMemo=function(e){return Ur(e)===$d};Ke.isPortal=function(e){return Ur(e)===Kp};Ke.isProfiler=function(e){return Ur(e)===Td};Ke.isStrictMode=function(e){return Ur(e)===Ed};Ke.isSuspense=function(e){return Ur(e)===Rd};Ke.isSuspenseList=function(e){return Ur(e)===Md};Ke.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===_d||e===Td||e===Ed||e===Rd||e===Md||e===Kk||typeof e=="object"&&e!==null&&(e.$$typeof===Ld||e.$$typeof===$d||e.$$typeof===Pd||e.$$typeof===Od||e.$$typeof===zd||e.$$typeof===by||e.getModuleId!==void 0)};Ke.typeOf=Ur;function Qk(){const e=Rk();let t=null,r=null;return{clear(){t=null,r=null},notify(){e(()=>{let o=t;for(;o;)o.callback(),o=o.next})},get(){let o=[],i=t;for(;i;)o.push(i),i=i.next;return o},subscribe(o){let i=!0,s=r={callback:o,next:null,prev:r};return s.prev?s.prev.next=s:t=s,function(){!i||t===null||(i=!1,s.next?s.next.prev=s.prev:r=s.prev,s.prev?s.prev.next=s.next:t=s.next)}}}}const og={notify(){},get:()=>[]};function Xk(e,t){let r,o=og,i=0,s=!1;function a(h){u();const v=o.subscribe(h);let w=!1;return()=>{w||(w=!0,v(),f())}}function c(){o.notify()}function l(){x.onStateChange&&x.onStateChange()}function d(){return s}function u(){i++,r||(r=t?t.addNestedSub(l):e.subscribe(l),o=Qk())}function f(){i--,r&&i===0&&(r(),r=void 0,o.clear(),o=og)}function m(){s||(s=!0,u())}function b(){s&&(s=!1,f())}const x={addNestedSub:a,notifyNestedSubs:c,handleChangeWrapper:l,isSubscribed:d,trySubscribe:m,tryUnsubscribe:b,getListeners:()=>o};return x}const Gk=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Zk=Gk?p.useLayoutEffect:p.useEffect;function Jk({store:e,context:t,children:r,serverState:o,stabilityCheck:i="once",noopCheck:s="once"}){const a=p.useMemo(()=>{const d=Xk(e);return{store:e,subscription:d,getServerState:o?()=>o:void 0,stabilityCheck:i,noopCheck:s}},[e,o,i,s]),c=p.useMemo(()=>e.getState(),[e]);Zk(()=>{const{subscription:d}=a;return d.onStateChange=d.notifyNestedSubs,d.trySubscribe(),c!==e.getState()&&d.notifyNestedSubs(),()=>{d.tryUnsubscribe(),d.onStateChange=void 0}},[a,c]);const l=t||wo;return p.createElement(l.Provider,{value:a},r)}function jy(e=wo){const t=e===wo?my:Wp(e);return function(){const{store:o}=t();return o}}const e5=jy();function t5(e=wo){const t=e===wo?e5:jy(e);return function(){return t().dispatch}}const cr=t5();Lk(Pk.useSyncExternalStoreWithSelector);zk(Ap.unstable_batchedUpdates);var xr=function(){return xr=Object.assign||function(t){for(var r,o=1,i=arguments.length;o<i;o++){r=arguments[o];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},xr.apply(this,arguments)};function ua(e,t,r){if(r||arguments.length===2)for(var o=0,i=t.length,s;o<i;o++)(s||!(o in t))&&(s||(s=Array.prototype.slice.call(t,0,o)),s[o]=t[o]);return e.concat(s||Array.prototype.slice.call(t))}var nt="-ms-",Hs="-moz-",Fe="-webkit-",Sy="comm",Id="rule",Qp="decl",r5="@import",ky="@keyframes",n5="@layer",o5=Math.abs,Xp=String.fromCharCode,df=Object.assign;function i5(e,t){return At(e,0)^45?(((t<<2^At(e,0))<<2^At(e,1))<<2^At(e,2))<<2^At(e,3):0}function Ny(e){return e.trim()}function Sn(e,t){return(e=t.exec(e))?e[0]:e}function Ce(e,t,r){return e.replace(t,r)}function Ul(e,t){return e.indexOf(t)}function At(e,t){return e.charCodeAt(t)|0}function Hi(e,t,r){return e.slice(t,r)}function fn(e){return e.length}function Cy(e){return e.length}function Ps(e,t){return t.push(e),e}function s5(e,t){return e.map(t).join("")}function ig(e,t){return e.filter(function(r){return!Sn(r,t)})}var Ad=1,Vi=1,_y=0,Br=0,Ct=0,os="";function Dd(e,t,r,o,i,s,a,c){return{value:e,root:t,parent:r,type:o,props:i,children:s,line:Ad,column:Vi,length:a,return:"",siblings:c}}function Qn(e,t){return df(Dd("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function si(e){for(;e.root;)e=Qn(e.root,{children:[e]});Ps(e,e.siblings)}function a5(){return Ct}function l5(){return Ct=Br>0?At(os,--Br):0,Vi--,Ct===10&&(Vi=1,Ad--),Ct}function on(){return Ct=Br<_y?At(os,Br++):0,Vi++,Ct===10&&(Vi=1,Ad++),Ct}function Bo(){return At(os,Br)}function Wl(){return Br}function Fd(e,t){return Hi(os,e,t)}function uf(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function c5(e){return Ad=Vi=1,_y=fn(os=e),Br=0,[]}function d5(e){return os="",e}function Mu(e){return Ny(Fd(Br-1,hf(e===91?e+2:e===40?e+1:e)))}function u5(e){for(;(Ct=Bo())&&Ct<33;)on();return uf(e)>2||uf(Ct)>3?"":" "}function h5(e,t){for(;--t&&on()&&!(Ct<48||Ct>102||Ct>57&&Ct<65||Ct>70&&Ct<97););return Fd(e,Wl()+(t<6&&Bo()==32&&on()==32))}function hf(e){for(;on();)switch(Ct){case e:return Br;case 34:case 39:e!==34&&e!==39&&hf(Ct);break;case 40:e===41&&hf(e);break;case 92:on();break}return Br}function f5(e,t){for(;on()&&e+Ct!==47+10;)if(e+Ct===42+42&&Bo()===47)break;return"/*"+Fd(t,Br-1)+"*"+Xp(e===47?e:on())}function p5(e){for(;!uf(Bo());)on();return Fd(e,Br)}function m5(e){return d5(Hl("",null,null,null,[""],e=c5(e),0,[0],e))}function Hl(e,t,r,o,i,s,a,c,l){for(var d=0,u=0,f=a,m=0,b=0,x=0,h=1,v=1,w=1,g=0,j="",y=i,k=s,_=o,E=j;v;)switch(x=g,g=on()){case 40:if(x!=108&&At(E,f-1)==58){Ul(E+=Ce(Mu(g),"&","&\f"),"&\f")!=-1&&(w=-1);break}case 34:case 39:case 91:E+=Mu(g);break;case 9:case 10:case 13:case 32:E+=u5(x);break;case 92:E+=h5(Wl()-1,7);continue;case 47:switch(Bo()){case 42:case 47:Ps(x5(f5(on(),Wl()),t,r,l),l);break;default:E+="/"}break;case 123*h:c[d++]=fn(E)*w;case 125*h:case 59:case 0:switch(g){case 0:case 125:v=0;case 59+u:w==-1&&(E=Ce(E,/\f/g,"")),b>0&&fn(E)-f&&Ps(b>32?ag(E+";",o,r,f-1,l):ag(Ce(E," ","")+";",o,r,f-2,l),l);break;case 59:E+=";";default:if(Ps(_=sg(E,t,r,d,u,i,c,j,y=[],k=[],f,s),s),g===123)if(u===0)Hl(E,t,_,_,y,s,f,c,k);else switch(m===99&&At(E,3)===110?100:m){case 100:case 108:case 109:case 115:Hl(e,_,_,o&&Ps(sg(e,_,_,0,0,i,c,j,i,y=[],f,k),k),i,k,f,c,o?y:k);break;default:Hl(E,_,_,_,[""],k,0,c,k)}}d=u=b=0,h=w=1,j=E="",f=a;break;case 58:f=1+fn(E),b=x;default:if(h<1){if(g==123)--h;else if(g==125&&h++==0&&l5()==125)continue}switch(E+=Xp(g),g*h){case 38:w=u>0?1:(E+="\f",-1);break;case 44:c[d++]=(fn(E)-1)*w,w=1;break;case 64:Bo()===45&&(E+=Mu(on())),m=Bo(),u=f=fn(j=E+=p5(Wl())),g++;break;case 45:x===45&&fn(E)==2&&(h=0)}}return s}function sg(e,t,r,o,i,s,a,c,l,d,u,f){for(var m=i-1,b=i===0?s:[""],x=Cy(b),h=0,v=0,w=0;h<o;++h)for(var g=0,j=Hi(e,m+1,m=o5(v=a[h])),y=e;g<x;++g)(y=Ny(v>0?b[g]+" "+j:Ce(j,/&\f/g,b[g])))&&(l[w++]=y);return Dd(e,t,r,i===0?Id:c,l,d,u,f)}function x5(e,t,r,o){return Dd(e,t,r,Sy,Xp(a5()),Hi(e,2,-2),0,o)}function ag(e,t,r,o,i){return Dd(e,t,r,Qp,Hi(e,0,o),Hi(e,o+1,-1),o,i)}function Ey(e,t,r){switch(i5(e,t)){case 5103:return Fe+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Fe+e+e;case 4789:return Hs+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Fe+e+Hs+e+nt+e+e;case 5936:switch(At(e,t+11)){case 114:return Fe+e+nt+Ce(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Fe+e+nt+Ce(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Fe+e+nt+Ce(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Fe+e+nt+e+e;case 6165:return Fe+e+nt+"flex-"+e+e;case 5187:return Fe+e+Ce(e,/(\w+).+(:[^]+)/,Fe+"box-$1$2"+nt+"flex-$1$2")+e;case 5443:return Fe+e+nt+"flex-item-"+Ce(e,/flex-|-self/g,"")+(Sn(e,/flex-|baseline/)?"":nt+"grid-row-"+Ce(e,/flex-|-self/g,""))+e;case 4675:return Fe+e+nt+"flex-line-pack"+Ce(e,/align-content|flex-|-self/g,"")+e;case 5548:return Fe+e+nt+Ce(e,"shrink","negative")+e;case 5292:return Fe+e+nt+Ce(e,"basis","preferred-size")+e;case 6060:return Fe+"box-"+Ce(e,"-grow","")+Fe+e+nt+Ce(e,"grow","positive")+e;case 4554:return Fe+Ce(e,/([^-])(transform)/g,"$1"+Fe+"$2")+e;case 6187:return Ce(Ce(Ce(e,/(zoom-|grab)/,Fe+"$1"),/(image-set)/,Fe+"$1"),e,"")+e;case 5495:case 3959:return Ce(e,/(image-set\([^]*)/,Fe+"$1$`$1");case 4968:return Ce(Ce(e,/(.+:)(flex-)?(.*)/,Fe+"box-pack:$3"+nt+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Fe+e+e;case 4200:if(!Sn(e,/flex-|baseline/))return nt+"grid-column-align"+Hi(e,t)+e;break;case 2592:case 3360:return nt+Ce(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(o,i){return t=i,Sn(o.props,/grid-\w+-end/)})?~Ul(e+(r=r[t].value),"span")?e:nt+Ce(e,"-start","")+e+nt+"grid-row-span:"+(~Ul(r,"span")?Sn(r,/\d+/):+Sn(r,/\d+/)-+Sn(e,/\d+/))+";":nt+Ce(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(o){return Sn(o.props,/grid-\w+-start/)})?e:nt+Ce(Ce(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Ce(e,/(.+)-inline(.+)/,Fe+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(fn(e)-1-t>6)switch(At(e,t+1)){case 109:if(At(e,t+4)!==45)break;case 102:return Ce(e,/(.+:)(.+)-([^]+)/,"$1"+Fe+"$2-$3$1"+Hs+(At(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ul(e,"stretch")?Ey(Ce(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return Ce(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(o,i,s,a,c,l,d){return nt+i+":"+s+d+(a?nt+i+"-span:"+(c?l:+l-+s)+d:"")+e});case 4949:if(At(e,t+6)===121)return Ce(e,":",":"+Fe)+e;break;case 6444:switch(At(e,At(e,14)===45?18:11)){case 120:return Ce(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Fe+(At(e,14)===45?"inline-":"")+"box$3$1"+Fe+"$2$3$1"+nt+"$2box$3")+e;case 100:return Ce(e,":",":"+nt)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ce(e,"scroll-","scroll-snap-")+e}return e}function _c(e,t){for(var r="",o=0;o<e.length;o++)r+=t(e[o],o,e,t)||"";return r}function g5(e,t,r,o){switch(e.type){case n5:if(e.children.length)break;case r5:case Qp:return e.return=e.return||e.value;case Sy:return"";case ky:return e.return=e.value+"{"+_c(e.children,o)+"}";case Id:if(!fn(e.value=e.props.join(",")))return""}return fn(r=_c(e.children,o))?e.return=e.value+"{"+r+"}":""}function v5(e){var t=Cy(e);return function(r,o,i,s){for(var a="",c=0;c<t;c++)a+=e[c](r,o,i,s)||"";return a}}function w5(e){return function(t){t.root||(t=t.return)&&e(t)}}function y5(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case Qp:e.return=Ey(e.value,e.length,r);return;case ky:return _c([Qn(e,{value:Ce(e.value,"@","@"+Fe)})],o);case Id:if(e.length)return s5(r=e.props,function(i){switch(Sn(i,o=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":si(Qn(e,{props:[Ce(i,/:(read-\w+)/,":"+Hs+"$1")]})),si(Qn(e,{props:[i]})),df(e,{props:ig(r,o)});break;case"::placeholder":si(Qn(e,{props:[Ce(i,/:(plac\w+)/,":"+Fe+"input-$1")]})),si(Qn(e,{props:[Ce(i,/:(plac\w+)/,":"+Hs+"$1")]})),si(Qn(e,{props:[Ce(i,/:(plac\w+)/,nt+"input-$1")]})),si(Qn(e,{props:[i]})),df(e,{props:ig(r,o)});break}return""})}}var b5={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},qi=typeof process<"u"&&process.env!==void 0&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",Gp=typeof window<"u"&&"HTMLElement"in window,j5=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&process.env!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&process.env!==void 0&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY),Bd=Object.freeze([]),Yi=Object.freeze({});function S5(e,t,r){return r===void 0&&(r=Yi),e.theme!==r.theme&&e.theme||t||r.theme}var Ty=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),k5=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,N5=/(^-|-$)/g;function lg(e){return e.replace(k5,"-").replace(N5,"")}var C5=/(a)(d)/gi,cg=function(e){return String.fromCharCode(e+(e>25?39:97))};function ff(e){var t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=cg(t%52)+r;return(cg(t%52)+r).replace(C5,"$1-$2")}var $u,Si=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Py=function(e){return Si(5381,e)};function Oy(e){return ff(Py(e)>>>0)}function _5(e){return e.displayName||e.name||"Component"}function Lu(e){return typeof e=="string"&&!0}var zy=typeof Symbol=="function"&&Symbol.for,Ry=zy?Symbol.for("react.memo"):60115,E5=zy?Symbol.for("react.forward_ref"):60112,T5={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},P5={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},My={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},O5=(($u={})[E5]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},$u[Ry]=My,$u);function dg(e){return("type"in(t=e)&&t.type.$$typeof)===Ry?My:"$$typeof"in e?O5[e.$$typeof]:T5;var t}var z5=Object.defineProperty,R5=Object.getOwnPropertyNames,ug=Object.getOwnPropertySymbols,M5=Object.getOwnPropertyDescriptor,$5=Object.getPrototypeOf,hg=Object.prototype;function $y(e,t,r){if(typeof t!="string"){if(hg){var o=$5(t);o&&o!==hg&&$y(e,o,r)}var i=R5(t);ug&&(i=i.concat(ug(t)));for(var s=dg(e),a=dg(t),c=0;c<i.length;++c){var l=i[c];if(!(l in P5||r&&r[l]||a&&l in a||s&&l in s)){var d=M5(t,l);try{z5(e,l,d)}catch{}}}}return e}function Ki(e){return typeof e=="function"}function Zp(e){return typeof e=="object"&&"styledComponentId"in e}function $o(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function pf(e,t){if(e.length===0)return"";for(var r=e[0],o=1;o<e.length;o++)r+=t?t+e[o]:e[o];return r}function ha(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function mf(e,t,r){if(r===void 0&&(r=!1),!r&&!ha(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var o=0;o<t.length;o++)e[o]=mf(e[o],t[o]);else if(ha(t))for(var o in t)e[o]=mf(e[o],t[o]);return e}function Jp(e,t){Object.defineProperty(e,"toString",{value:t})}function Ya(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var L5=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,o=0;o<t;o++)r+=this.groupSizes[o];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var o=this.groupSizes,i=o.length,s=i;t>=s;)if((s<<=1)<0)throw Ya(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(o),this.length=s;for(var a=i;a<s;a++)this.groupSizes[a]=0}for(var c=this.indexOfGroup(t+1),l=(a=0,r.length);a<l;a++)this.tag.insertRule(c,r[a])&&(this.groupSizes[t]++,c++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],o=this.indexOfGroup(t),i=o+r;this.groupSizes[t]=0;for(var s=o;s<i;s++)this.tag.deleteRule(o)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var o=this.groupSizes[t],i=this.indexOfGroup(t),s=i+o,a=i;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(`/*!sc*/
`);return r},e}(),Vl=new Map,Ec=new Map,Iu=1,bl=function(e){if(Vl.has(e))return Vl.get(e);for(;Ec.has(Iu);)Iu++;var t=Iu++;return Vl.set(e,t),Ec.set(t,e),t},I5=function(e,t){Vl.set(e,t),Ec.set(t,e)},A5="style[".concat(qi,"][").concat("data-styled-version",'="').concat("6.0.7",'"]'),D5=new RegExp("^".concat(qi,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),F5=function(e,t,r){for(var o,i=r.split(","),s=0,a=i.length;s<a;s++)(o=i[s])&&e.registerName(t,o)},B5=function(e,t){for(var r,o=((r=t.textContent)!==null&&r!==void 0?r:"").split(`/*!sc*/
`),i=[],s=0,a=o.length;s<a;s++){var c=o[s].trim();if(c){var l=c.match(D5);if(l){var d=0|parseInt(l[1],10),u=l[2];d!==0&&(I5(u,d),F5(e,u,l[3]),e.getTag().insertRules(d,i)),i.length=0}else i.push(c)}}};function U5(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Ly=function(e){var t=document.head,r=e||t,o=document.createElement("style"),i=function(c){var l=Array.from(c.querySelectorAll("style[".concat(qi,"]")));return l[l.length-1]}(r),s=i!==void 0?i.nextSibling:null;o.setAttribute(qi,"active"),o.setAttribute("data-styled-version","6.0.7");var a=U5();return a&&o.setAttribute("nonce",a),r.insertBefore(o,s),o},W5=function(){function e(t){this.element=Ly(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var o=document.styleSheets,i=0,s=o.length;i<s;i++){var a=o[i];if(a.ownerNode===r)return a}throw Ya(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),H5=function(){function e(t){this.element=Ly(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var o=document.createTextNode(r);return this.element.insertBefore(o,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),V5=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),fg=Gp,q5={isServer:!Gp,useCSSOMInjection:!j5},Iy=function(){function e(t,r,o){t===void 0&&(t=Yi),r===void 0&&(r={});var i=this;this.options=xr(xr({},q5),t),this.gs=r,this.names=new Map(o),this.server=!!t.isServer,!this.server&&Gp&&fg&&(fg=!1,function(s){for(var a=document.querySelectorAll(A5),c=0,l=a.length;c<l;c++){var d=a[c];d&&d.getAttribute(qi)!=="active"&&(B5(s,d),d.parentNode&&d.parentNode.removeChild(d))}}(this)),Jp(this,function(){return function(s){for(var a=s.getTag(),c=a.length,l="",d=function(f){var m=function(w){return Ec.get(w)}(f);if(m===void 0)return"continue";var b=s.names.get(m),x=a.getGroup(f);if(b===void 0||x.length===0)return"continue";var h="".concat(qi,".g").concat(f,'[id="').concat(m,'"]'),v="";b!==void 0&&b.forEach(function(w){w.length>0&&(v+="".concat(w,","))}),l+="".concat(x).concat(h,'{content:"').concat(v,'"}').concat(`/*!sc*/
`)},u=0;u<c;u++)d(u);return l}(i)})}return e.registerId=function(t){return bl(t)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(xr(xr({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var o=r.useCSSOMInjection,i=r.target;return r.isServer?new V5(i):o?new W5(i):new H5(i)}(this.options),new L5(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(bl(t),this.names.has(t))this.names.get(t).add(r);else{var o=new Set;o.add(r),this.names.set(t,o)}},e.prototype.insertRules=function(t,r,o){this.registerName(t,r),this.getTag().insertRules(bl(t),o)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(bl(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Y5=/&/g,K5=/^\s*\/\/.*$/gm;function Ay(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(o){return"".concat(t," ").concat(o)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Ay(r.children,t)),r})}function Q5(e){var t,r,o,i=e===void 0?Yi:e,s=i.options,a=s===void 0?Yi:s,c=i.plugins,l=c===void 0?Bd:c,d=function(m,b,x){return x===r||x.startsWith(r)&&x.endsWith(r)&&x.replaceAll(r,"").length>0?".".concat(t):m},u=l.slice();u.push(function(m){m.type===Id&&m.value.includes("&")&&(m.props[0]=m.props[0].replace(Y5,r).replace(o,d))}),a.prefix&&u.push(y5),u.push(g5);var f=function(m,b,x,h){b===void 0&&(b=""),x===void 0&&(x=""),h===void 0&&(h="&"),t=h,r=b,o=new RegExp("\\".concat(r,"\\b"),"g");var v=m.replace(K5,""),w=m5(x||b?"".concat(x," ").concat(b," { ").concat(v," }"):v);a.namespace&&(w=Ay(w,a.namespace));var g=[];return _c(w,v5(u.concat(w5(function(j){return g.push(j)})))),g};return f.hash=l.length?l.reduce(function(m,b){return b.name||Ya(15),Si(m,b.name)},5381).toString():"",f}var X5=new Iy,xf=Q5(),Dy=Ne.createContext({shouldForwardProp:void 0,styleSheet:X5,stylis:xf});Dy.Consumer;Ne.createContext(void 0);function pg(){return p.useContext(Dy)}var Fy=function(){function e(t,r){var o=this;this.inject=function(i,s){s===void 0&&(s=xf);var a=o.name+s.hash;i.hasNameForId(o.id,a)||i.insertRules(o.id,a,s(o.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Jp(this,function(){throw Ya(12,String(o.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=xf),this.name+t.hash},e}(),G5=function(e){return e>="A"&&e<="Z"};function mg(e){for(var t="",r=0;r<e.length;r++){var o=e[r];if(r===1&&o==="-"&&e[0]==="-")return e;G5(o)?t+="-"+o.toLowerCase():t+=o}return t.startsWith("ms-")?"-"+t:t}var By=function(e){return e==null||e===!1||e===""},Uy=function(e){var t,r,o=[];for(var i in e){var s=e[i];e.hasOwnProperty(i)&&!By(s)&&(Array.isArray(s)&&s.isCss||Ki(s)?o.push("".concat(mg(i),":"),s,";"):ha(s)?o.push.apply(o,ua(ua(["".concat(i," {")],Uy(s),!1),["}"],!1)):o.push("".concat(mg(i),": ").concat((t=i,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in b5||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return o};function Uo(e,t,r,o){if(By(e))return[];if(Zp(e))return[".".concat(e.styledComponentId)];if(Ki(e)){if(!Ki(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var i=e(t);return Uo(i,t,r,o)}var s;return e instanceof Fy?r?(e.inject(r,o),[e.getName(o)]):[e]:ha(e)?Uy(e):Array.isArray(e)?Array.prototype.concat.apply(Bd,e.map(function(a){return Uo(a,t,r,o)})):[e.toString()]}function Z5(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(Ki(r)&&!Zp(r))return!1}return!0}var J5=Py("6.0.7"),eN=function(){function e(t,r,o){this.rules=t,this.staticRulesId="",this.isStatic=(o===void 0||o.isStatic)&&Z5(t),this.componentId=r,this.baseHash=Si(J5,r),this.baseStyle=o,Iy.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,o){var i=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,o):"";if(this.isStatic&&!o.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))i=$o(i,this.staticRulesId);else{var s=pf(Uo(this.rules,t,r,o)),a=ff(Si(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var c=o(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,c)}i=$o(i,a),this.staticRulesId=a}else{for(var l=Si(this.baseHash,o.hash),d="",u=0;u<this.rules.length;u++){var f=this.rules[u];if(typeof f=="string")d+=f;else if(f){var m=pf(Uo(f,t,r,o));l=Si(l,m),d+=m}}if(d){var b=ff(l>>>0);r.hasNameForId(this.componentId,b)||r.insertRules(this.componentId,b,o(d,".".concat(b),void 0,this.componentId)),i=$o(i,b)}}return i},e}(),Wy=Ne.createContext(void 0);Wy.Consumer;var Au={};function tN(e,t,r){var o=Zp(e),i=e,s=!Lu(e),a=t.attrs,c=a===void 0?Bd:a,l=t.componentId,d=l===void 0?function(j,y){var k=typeof j!="string"?"sc":lg(j);Au[k]=(Au[k]||0)+1;var _="".concat(k,"-").concat(Oy("6.0.7"+k+Au[k]));return y?"".concat(y,"-").concat(_):_}(t.displayName,t.parentComponentId):l,u=t.displayName;u===void 0&&function(j){return Lu(j)?"styled.".concat(j):"Styled(".concat(_5(j),")")}(e);var f=t.displayName&&t.componentId?"".concat(lg(t.displayName),"-").concat(t.componentId):t.componentId||d,m=o&&i.attrs?i.attrs.concat(c).filter(Boolean):c,b=t.shouldForwardProp;if(o&&i.shouldForwardProp){var x=i.shouldForwardProp;if(t.shouldForwardProp){var h=t.shouldForwardProp;b=function(j,y){return x(j,y)&&h(j,y)}}else b=x}var v=new eN(r,f,o?i.componentStyle:void 0);function w(j,y){return function(k,_,E){var N=k.attrs,T=k.componentStyle,M=k.defaultProps,L=k.foldedComponentIds,I=k.styledComponentId,$=k.target,V=Ne.useContext(Wy),F=pg(),D=k.shouldForwardProp||F.shouldForwardProp,Y=function(oe,J,xe){for(var je,Se=xr(xr({},J),{className:void 0,theme:xe}),G=0;G<oe.length;G+=1){var ae=Ki(je=oe[G])?je(Se):je;for(var ge in ae)Se[ge]=ge==="className"?$o(Se[ge],ae[ge]):ge==="style"?xr(xr({},Se[ge]),ae[ge]):ae[ge]}return J.className&&(Se.className=$o(Se.className,J.className)),Se}(N,_,S5(_,V,M)||Yi),z=Y.as||$,A={};for(var R in Y)Y[R]===void 0||R[0]==="$"||R==="as"||R==="theme"||(R==="forwardedAs"?A.as=Y.forwardedAs:D&&!D(R,z)||(A[R]=Y[R]));var q=function(oe,J){var xe=pg(),je=oe.generateAndInjectStyles(J,xe.styleSheet,xe.stylis);return je}(T,Y),X=$o(L,I);return q&&(X+=" "+q),Y.className&&(X+=" "+Y.className),A[Lu(z)&&!Ty.has(z)?"class":"className"]=X,A.ref=E,p.createElement(z,A)}(g,j,y)}var g=Ne.forwardRef(w);return g.attrs=m,g.componentStyle=v,g.shouldForwardProp=b,g.foldedComponentIds=o?$o(i.foldedComponentIds,i.styledComponentId):"",g.styledComponentId=f,g.target=o?i.target:e,Object.defineProperty(g,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(j){this._foldedDefaultProps=o?function(y){for(var k=[],_=1;_<arguments.length;_++)k[_-1]=arguments[_];for(var E=0,N=k;E<N.length;E++)mf(y,N[E],!0);return y}({},i.defaultProps,j):j}}),Jp(g,function(){return".".concat(g.styledComponentId)}),s&&$y(g,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),g}function xg(e,t){for(var r=[e[0]],o=0,i=t.length;o<i;o+=1)r.push(t[o],e[o+1]);return r}var gg=function(e){return Object.assign(e,{isCss:!0})};function Hy(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(Ki(e)||ha(e)){var o=e;return gg(Uo(xg(Bd,ua([o],t,!0))))}var i=e;return t.length===0&&i.length===1&&typeof i[0]=="string"?Uo(i):gg(Uo(xg(i,t)))}function gf(e,t,r){if(r===void 0&&(r=Yi),!t)throw Ya(1,t);var o=function(i){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,Hy.apply(void 0,ua([i],s,!1)))};return o.attrs=function(i){return gf(e,t,xr(xr({},r),{attrs:Array.prototype.concat(r.attrs,i).filter(Boolean)}))},o.withConfig=function(i){return gf(e,t,xr(xr({},r),i))},o}var Vy=function(e){return gf(tN,e)},S=Vy;Ty.forEach(function(e){S[e]=Vy(e)});function Wr(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var o=pf(Hy.apply(void 0,ua([e],t,!1))),i=Oy(o);return new Fy(i,o)}const Ze="/PLAYMOOD_DEF.png";var qy={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},vg=Ne.createContext&&Ne.createContext(qy),po=globalThis&&globalThis.__assign||function(){return po=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++){t=arguments[r];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},po.apply(this,arguments)},rN=globalThis&&globalThis.__rest||function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(r[o[i]]=e[o[i]]);return r};function Yy(e){return e&&e.map(function(t,r){return Ne.createElement(t.tag,po({key:r},t.attr),Yy(t.child))})}function He(e){return function(t){return Ne.createElement(nN,po({attr:po({},e.attr)},t),Yy(e.child))}}function nN(e){var t=function(r){var o=e.attr,i=e.size,s=e.title,a=rN(e,["attr","size","title"]),c=i||r.size||"1em",l;return r.className&&(l=r.className),e.className&&(l=(l?l+" ":"")+e.className),Ne.createElement("svg",po({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,o,a,{className:l,style:po(po({color:e.color||r.color},r.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),s&&Ne.createElement("title",null,s),e.children)};return vg!==void 0?Ne.createElement(vg.Consumer,null,function(r){return t(r)}):t(qy)}function em(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"}}]})(e)}const tn="/icon-profile.png",fa="/newp.png",pa="/snowflakes.png",ma="/favourite.png",xa="/categories.png",ga="/home.png",va="/search_white.png",wa="/search_red.png",ya="/thumbs.png",ba="/thumbs_red.png",ja="/location_white.png",Sa="/home_red.png",ka="/newp_red.png",Na="/snowflakes_red.png",Ca="/location.png",_a="/schedule_white.png",Ea="/schedule_red.png",Ta="/plus.png",Pa="/star_red.png";var Ky={},Qy={},Ud={},Xy={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={animating:!1,autoplaying:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,dragging:!1,edgeDragged:!1,initialized:!1,lazyLoadedList:[],listHeight:null,listWidth:null,scrolling:!1,slideCount:null,slideHeight:null,slideWidth:null,swipeLeft:null,swiped:!1,swiping:!1,touchObject:{startX:0,startY:0,curX:0,curY:0},trackStyle:{},trackWidth:0,targetSlide:0},r=t;e.default=r})(Xy);var oN="Expected a function",wg=0/0,iN="[object Symbol]",sN=/^\s+|\s+$/g,aN=/^[-+]0x[0-9a-f]+$/i,lN=/^0b[01]+$/i,cN=/^0o[0-7]+$/i,dN=parseInt,uN=typeof el=="object"&&el&&el.Object===Object&&el,hN=typeof self=="object"&&self&&self.Object===Object&&self,fN=uN||hN||Function("return this")(),pN=Object.prototype,mN=pN.toString,xN=Math.max,gN=Math.min,Du=function(){return fN.Date.now()};function vN(e,t,r){var o,i,s,a,c,l,d=0,u=!1,f=!1,m=!0;if(typeof e!="function")throw new TypeError(oN);t=yg(t)||0,vf(r)&&(u=!!r.leading,f="maxWait"in r,s=f?xN(yg(r.maxWait)||0,t):s,m="trailing"in r?!!r.trailing:m);function b(_){var E=o,N=i;return o=i=void 0,d=_,a=e.apply(N,E),a}function x(_){return d=_,c=setTimeout(w,t),u?b(_):a}function h(_){var E=_-l,N=_-d,T=t-E;return f?gN(T,s-N):T}function v(_){var E=_-l,N=_-d;return l===void 0||E>=t||E<0||f&&N>=s}function w(){var _=Du();if(v(_))return g(_);c=setTimeout(w,h(_))}function g(_){return c=void 0,m&&o?b(_):(o=i=void 0,a)}function j(){c!==void 0&&clearTimeout(c),d=0,o=l=i=c=void 0}function y(){return c===void 0?a:g(Du())}function k(){var _=Du(),E=v(_);if(o=arguments,i=this,l=_,E){if(c===void 0)return x(l);if(f)return c=setTimeout(w,t),b(l)}return c===void 0&&(c=setTimeout(w,t)),a}return k.cancel=j,k.flush=y,k}function vf(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function wN(e){return!!e&&typeof e=="object"}function yN(e){return typeof e=="symbol"||wN(e)&&mN.call(e)==iN}function yg(e){if(typeof e=="number")return e;if(yN(e))return wg;if(vf(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=vf(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(sN,"");var r=lN.test(e);return r||cN.test(e)?dN(e.slice(2),r?2:8):aN.test(e)?wg:+e}var bN=vN,Gy={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var t={}.hasOwnProperty;function r(){for(var o=[],i=0;i<arguments.length;i++){var s=arguments[i];if(s){var a=typeof s;if(a==="string"||a==="number")o.push(s);else if(Array.isArray(s)){if(s.length){var c=r.apply(null,s);c&&o.push(c)}}else if(a==="object"){if(s.toString!==Object.prototype.toString&&!s.toString.toString().includes("[native code]")){o.push(s.toString());continue}for(var l in s)t.call(s,l)&&s[l]&&o.push(l)}}}return o.join(" ")}e.exports?(r.default=r,e.exports=r):window.classNames=r})()})(Gy);var Ka=Gy.exports;const Zy=Kc(Ka);var re={};Object.defineProperty(re,"__esModule",{value:!0});re.checkSpecKeys=re.checkNavigable=re.changeSlide=re.canUseDOM=re.canGoNext=void 0;re.clamp=Jy;re.swipeStart=re.swipeMove=re.swipeEnd=re.slidesOnRight=re.slidesOnLeft=re.slideHandler=re.siblingDirection=re.safePreventDefault=re.lazyStartIndex=re.lazySlidesOnRight=re.lazySlidesOnLeft=re.lazyEndIndex=re.keyHandler=re.initializedState=re.getWidth=re.getTrackLeft=re.getTrackCSS=re.getTrackAnimateCSS=re.getTotalSlides=re.getSwipeDirection=re.getSlideCount=re.getRequiredLazySlides=re.getPreClones=re.getPostClones=re.getOnDemandLazySlides=re.getNavigableIndexes=re.getHeight=re.extractObject=void 0;var jN=SN(p);function SN(e){return e&&e.__esModule?e:{default:e}}function bg(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,o)}return r}function st(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?bg(Object(r),!0).forEach(function(o){kN(e,o,r[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):bg(Object(r)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(r,o))})}return e}function kN(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Jy(e,t,r){return Math.max(t,Math.min(e,r))}var Wo=function(t){var r=["onTouchStart","onTouchMove","onWheel"];r.includes(t._reactName)||t.preventDefault()};re.safePreventDefault=Wo;var tm=function(t){for(var r=[],o=rm(t),i=nm(t),s=o;s<i;s++)t.lazyLoadedList.indexOf(s)<0&&r.push(s);return r};re.getOnDemandLazySlides=tm;var NN=function(t){for(var r=[],o=rm(t),i=nm(t),s=o;s<i;s++)r.push(s);return r};re.getRequiredLazySlides=NN;var rm=function(t){return t.currentSlide-e1(t)};re.lazyStartIndex=rm;var nm=function(t){return t.currentSlide+t1(t)};re.lazyEndIndex=nm;var e1=function(t){return t.centerMode?Math.floor(t.slidesToShow/2)+(parseInt(t.centerPadding)>0?1:0):0};re.lazySlidesOnLeft=e1;var t1=function(t){return t.centerMode?Math.floor((t.slidesToShow-1)/2)+1+(parseInt(t.centerPadding)>0?1:0):t.slidesToShow};re.lazySlidesOnRight=t1;var Tc=function(t){return t&&t.offsetWidth||0};re.getWidth=Tc;var om=function(t){return t&&t.offsetHeight||0};re.getHeight=om;var im=function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,o,i,s,a;return o=t.startX-t.curX,i=t.startY-t.curY,s=Math.atan2(i,o),a=Math.round(s*180/Math.PI),a<0&&(a=360-Math.abs(a)),a<=45&&a>=0||a<=360&&a>=315?"left":a>=135&&a<=225?"right":r===!0?a>=35&&a<=135?"up":"down":"vertical"};re.getSwipeDirection=im;var sm=function(t){var r=!0;return t.infinite||(t.centerMode&&t.currentSlide>=t.slideCount-1||t.slideCount<=t.slidesToShow||t.currentSlide>=t.slideCount-t.slidesToShow)&&(r=!1),r};re.canGoNext=sm;var CN=function(t,r){var o={};return r.forEach(function(i){return o[i]=t[i]}),o};re.extractObject=CN;var _N=function(t){var r=jN.default.Children.count(t.children),o=t.listRef,i=Math.ceil(Tc(o)),s=t.trackRef&&t.trackRef.node,a=Math.ceil(Tc(s)),c;if(t.vertical)c=i;else{var l=t.centerMode&&parseInt(t.centerPadding)*2;typeof t.centerPadding=="string"&&t.centerPadding.slice(-1)==="%"&&(l*=i/100),c=Math.ceil((i-l)/t.slidesToShow)}var d=o&&om(o.querySelector('[data-index="0"]')),u=d*t.slidesToShow,f=t.currentSlide===void 0?t.initialSlide:t.currentSlide;t.rtl&&t.currentSlide===void 0&&(f=r-1-t.initialSlide);var m=t.lazyLoadedList||[],b=tm(st(st({},t),{},{currentSlide:f,lazyLoadedList:m}));m=m.concat(b);var x={slideCount:r,slideWidth:c,listWidth:i,trackWidth:a,currentSlide:f,slideHeight:d,listHeight:u,lazyLoadedList:m};return t.autoplaying===null&&t.autoplay&&(x.autoplaying="playing"),x};re.initializedState=_N;var EN=function(t){var r=t.waitForAnimate,o=t.animating,i=t.fade,s=t.infinite,a=t.index,c=t.slideCount,l=t.lazyLoad,d=t.currentSlide,u=t.centerMode,f=t.slidesToScroll,m=t.slidesToShow,b=t.useCSS,x=t.lazyLoadedList;if(r&&o)return{};var h=a,v,w,g,j={},y={},k=s?a:Jy(a,0,c-1);if(i){if(!s&&(a<0||a>=c))return{};a<0?h=a+c:a>=c&&(h=a-c),l&&x.indexOf(h)<0&&(x=x.concat(h)),j={animating:!0,currentSlide:h,lazyLoadedList:x,targetSlide:h},y={animating:!1,targetSlide:h}}else v=h,h<0?(v=h+c,s?c%f!==0&&(v=c-c%f):v=0):!sm(t)&&h>d?h=v=d:u&&h>=c?(h=s?c:c-1,v=s?0:c-1):h>=c&&(v=h-c,s?c%f!==0&&(v=0):v=c-m),!s&&h+m>=c&&(v=c-m),w=za(st(st({},t),{},{slideIndex:h})),g=za(st(st({},t),{},{slideIndex:v})),s||(w===g&&(h=v),w=g),l&&(x=x.concat(tm(st(st({},t),{},{currentSlide:h})))),b?(j={animating:!0,currentSlide:v,trackStyle:am(st(st({},t),{},{left:w})),lazyLoadedList:x,targetSlide:k},y={animating:!1,currentSlide:v,trackStyle:Oa(st(st({},t),{},{left:g})),swipeLeft:null,targetSlide:k}):j={currentSlide:v,trackStyle:Oa(st(st({},t),{},{left:g})),lazyLoadedList:x,targetSlide:k};return{state:j,nextState:y}};re.slideHandler=EN;var TN=function(t,r){var o,i,s,a,c,l=t.slidesToScroll,d=t.slidesToShow,u=t.slideCount,f=t.currentSlide,m=t.targetSlide,b=t.lazyLoad,x=t.infinite;if(a=u%l!==0,o=a?0:(u-f)%l,r.message==="previous")s=o===0?l:d-o,c=f-s,b&&!x&&(i=f-s,c=i===-1?u-1:i),x||(c=m-l);else if(r.message==="next")s=o===0?l:o,c=f+s,b&&!x&&(c=(f+l)%u+o),x||(c=m+l);else if(r.message==="dots")c=r.index*r.slidesToScroll;else if(r.message==="children"){if(c=r.index,x){var h=i1(st(st({},t),{},{targetSlide:c}));c>r.currentSlide&&h==="left"?c=c-u:c<r.currentSlide&&h==="right"&&(c=c+u)}}else r.message==="index"&&(c=Number(r.index));return c};re.changeSlide=TN;var PN=function(t,r,o){return t.target.tagName.match("TEXTAREA|INPUT|SELECT")||!r?"":t.keyCode===37?o?"next":"previous":t.keyCode===39?o?"previous":"next":""};re.keyHandler=PN;var ON=function(t,r,o){return t.target.tagName==="IMG"&&Wo(t),!r||!o&&t.type.indexOf("mouse")!==-1?"":{dragging:!0,touchObject:{startX:t.touches?t.touches[0].pageX:t.clientX,startY:t.touches?t.touches[0].pageY:t.clientY,curX:t.touches?t.touches[0].pageX:t.clientX,curY:t.touches?t.touches[0].pageY:t.clientY}}};re.swipeStart=ON;var zN=function(t,r){var o=r.scrolling,i=r.animating,s=r.vertical,a=r.swipeToSlide,c=r.verticalSwiping,l=r.rtl,d=r.currentSlide,u=r.edgeFriction,f=r.edgeDragged,m=r.onEdge,b=r.swiped,x=r.swiping,h=r.slideCount,v=r.slidesToScroll,w=r.infinite,g=r.touchObject,j=r.swipeEvent,y=r.listHeight,k=r.listWidth;if(!o){if(i)return Wo(t);s&&a&&c&&Wo(t);var _,E={},N=za(r);g.curX=t.touches?t.touches[0].pageX:t.clientX,g.curY=t.touches?t.touches[0].pageY:t.clientY,g.swipeLength=Math.round(Math.sqrt(Math.pow(g.curX-g.startX,2)));var T=Math.round(Math.sqrt(Math.pow(g.curY-g.startY,2)));if(!c&&!x&&T>10)return{scrolling:!0};c&&(g.swipeLength=T);var M=(l?-1:1)*(g.curX>g.startX?1:-1);c&&(M=g.curY>g.startY?1:-1);var L=Math.ceil(h/v),I=im(r.touchObject,c),$=g.swipeLength;return w||(d===0&&(I==="right"||I==="down")||d+1>=L&&(I==="left"||I==="up")||!sm(r)&&(I==="left"||I==="up"))&&($=g.swipeLength*u,f===!1&&m&&(m(I),E.edgeDragged=!0)),!b&&j&&(j(I),E.swiped=!0),s?_=N+$*(y/k)*M:l?_=N-$*M:_=N+$*M,c&&(_=N+$*M),E=st(st({},E),{},{touchObject:g,swipeLeft:_,trackStyle:Oa(st(st({},r),{},{left:_}))}),Math.abs(g.curX-g.startX)<Math.abs(g.curY-g.startY)*.8||g.swipeLength>10&&(E.swiping=!0,Wo(t)),E}};re.swipeMove=zN;var RN=function(t,r){var o=r.dragging,i=r.swipe,s=r.touchObject,a=r.listWidth,c=r.touchThreshold,l=r.verticalSwiping,d=r.listHeight,u=r.swipeToSlide,f=r.scrolling,m=r.onSwipe,b=r.targetSlide,x=r.currentSlide,h=r.infinite;if(!o)return i&&Wo(t),{};var v=l?d/c:a/c,w=im(s,l),g={dragging:!1,edgeDragged:!1,scrolling:!1,swiping:!1,swiped:!1,swipeLeft:null,touchObject:{}};if(f||!s.swipeLength)return g;if(s.swipeLength>v){Wo(t),m&&m(w);var j,y,k=h?x:b;switch(w){case"left":case"up":y=k+yf(r),j=u?wf(r,y):y,g.currentDirection=0;break;case"right":case"down":y=k-yf(r),j=u?wf(r,y):y,g.currentDirection=1;break;default:j=k}g.triggerSlideHandler=j}else{var _=za(r);g.trackStyle=am(st(st({},r),{},{left:_}))}return g};re.swipeEnd=RN;var r1=function(t){for(var r=t.infinite?t.slideCount*2:t.slideCount,o=t.infinite?t.slidesToShow*-1:0,i=t.infinite?t.slidesToShow*-1:0,s=[];o<r;)s.push(o),o=i+t.slidesToScroll,i+=Math.min(t.slidesToScroll,t.slidesToShow);return s};re.getNavigableIndexes=r1;var wf=function(t,r){var o=r1(t),i=0;if(r>o[o.length-1])r=o[o.length-1];else for(var s in o){if(r<o[s]){r=i;break}i=o[s]}return r};re.checkNavigable=wf;var yf=function(t){var r=t.centerMode?t.slideWidth*Math.floor(t.slidesToShow/2):0;if(t.swipeToSlide){var o,i=t.listRef,s=i.querySelectorAll&&i.querySelectorAll(".slick-slide")||[];if(Array.from(s).every(function(l){if(t.vertical){if(l.offsetTop+om(l)/2>t.swipeLeft*-1)return o=l,!1}else if(l.offsetLeft-r+Tc(l)/2>t.swipeLeft*-1)return o=l,!1;return!0}),!o)return 0;var a=t.rtl===!0?t.slideCount-t.currentSlide:t.currentSlide,c=Math.abs(o.dataset.index-a)||1;return c}else return t.slidesToScroll};re.getSlideCount=yf;var Wd=function(t,r){return r.reduce(function(o,i){return o&&t.hasOwnProperty(i)},!0)?null:console.error("Keys Missing:",t)};re.checkSpecKeys=Wd;var Oa=function(t){Wd(t,["left","variableWidth","slideCount","slidesToShow","slideWidth"]);var r,o,i=t.slideCount+2*t.slidesToShow;t.vertical?o=i*t.slideHeight:r=o1(t)*t.slideWidth;var s={opacity:1,transition:"",WebkitTransition:""};if(t.useTransform){var a=t.vertical?"translate3d(0px, "+t.left+"px, 0px)":"translate3d("+t.left+"px, 0px, 0px)",c=t.vertical?"translate3d(0px, "+t.left+"px, 0px)":"translate3d("+t.left+"px, 0px, 0px)",l=t.vertical?"translateY("+t.left+"px)":"translateX("+t.left+"px)";s=st(st({},s),{},{WebkitTransform:a,transform:c,msTransform:l})}else t.vertical?s.top=t.left:s.left=t.left;return t.fade&&(s={opacity:1}),r&&(s.width=r),o&&(s.height=o),window&&!window.addEventListener&&window.attachEvent&&(t.vertical?s.marginTop=t.left+"px":s.marginLeft=t.left+"px"),s};re.getTrackCSS=Oa;var am=function(t){Wd(t,["left","variableWidth","slideCount","slidesToShow","slideWidth","speed","cssEase"]);var r=Oa(t);return t.useTransform?(r.WebkitTransition="-webkit-transform "+t.speed+"ms "+t.cssEase,r.transition="transform "+t.speed+"ms "+t.cssEase):t.vertical?r.transition="top "+t.speed+"ms "+t.cssEase:r.transition="left "+t.speed+"ms "+t.cssEase,r};re.getTrackAnimateCSS=am;var za=function(t){if(t.unslick)return 0;Wd(t,["slideIndex","trackRef","infinite","centerMode","slideCount","slidesToShow","slidesToScroll","slideWidth","listWidth","variableWidth","slideHeight"]);var r=t.slideIndex,o=t.trackRef,i=t.infinite,s=t.centerMode,a=t.slideCount,c=t.slidesToShow,l=t.slidesToScroll,d=t.slideWidth,u=t.listWidth,f=t.variableWidth,m=t.slideHeight,b=t.fade,x=t.vertical,h=0,v,w,g=0;if(b||t.slideCount===1)return 0;var j=0;if(i?(j=-Vs(t),a%l!==0&&r+l>a&&(j=-(r>a?c-(r-a):a%l)),s&&(j+=parseInt(c/2))):(a%l!==0&&r+l>a&&(j=c-a%l),s&&(j=parseInt(c/2))),h=j*d,g=j*m,x?v=r*m*-1+g:v=r*d*-1+h,f===!0){var y,k=o&&o.node;if(y=r+Vs(t),w=k&&k.childNodes[y],v=w?w.offsetLeft*-1:0,s===!0){y=i?r+Vs(t):r,w=k&&k.children[y],v=0;for(var _=0;_<y;_++)v-=k&&k.children[_]&&k.children[_].offsetWidth;v-=parseInt(t.centerPadding),v+=w&&(u-w.offsetWidth)/2}}return v};re.getTrackLeft=za;var Vs=function(t){return t.unslick||!t.infinite?0:t.variableWidth?t.slideCount:t.slidesToShow+(t.centerMode?1:0)};re.getPreClones=Vs;var n1=function(t){return t.unslick||!t.infinite?0:t.slideCount};re.getPostClones=n1;var o1=function(t){return t.slideCount===1?1:Vs(t)+t.slideCount+n1(t)};re.getTotalSlides=o1;var i1=function(t){return t.targetSlide>t.currentSlide?t.targetSlide>t.currentSlide+s1(t)?"left":"right":t.targetSlide<t.currentSlide-a1(t)?"right":"left"};re.siblingDirection=i1;var s1=function(t){var r=t.slidesToShow,o=t.centerMode,i=t.rtl,s=t.centerPadding;if(o){var a=(r-1)/2+1;return parseInt(s)>0&&(a+=1),i&&r%2===0&&(a+=1),a}return i?0:r-1};re.slidesOnRight=s1;var a1=function(t){var r=t.slidesToShow,o=t.centerMode,i=t.rtl,s=t.centerPadding;if(o){var a=(r-1)/2+1;return parseInt(s)>0&&(a+=1),!i&&r%2===0&&(a+=1),a}return i?r-1:0};re.slidesOnLeft=a1;var MN=function(){return!!(typeof window<"u"&&window.document&&window.document.createElement)};re.canUseDOM=MN;var Hd={};function bf(e){"@babel/helpers - typeof";return bf=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},bf(e)}Object.defineProperty(Hd,"__esModule",{value:!0});Hd.Track=void 0;var Zn=l1(p),Fu=l1(Ka),Bu=re;function l1(e){return e&&e.__esModule?e:{default:e}}function jf(){return jf=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},jf.apply(this,arguments)}function $N(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function jg(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function LN(e,t,r){return t&&jg(e.prototype,t),r&&jg(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function IN(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Sf(e,t)}function Sf(e,t){return Sf=Object.setPrototypeOf||function(o,i){return o.__proto__=i,o},Sf(e,t)}function AN(e){var t=FN();return function(){var o=Pc(e),i;if(t){var s=Pc(this).constructor;i=Reflect.construct(o,arguments,s)}else i=o.apply(this,arguments);return DN(this,i)}}function DN(e,t){if(t&&(bf(t)==="object"||typeof t=="function"))return t;if(t!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return kf(e)}function kf(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function FN(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Pc(e){return Pc=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},Pc(e)}function Sg(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,o)}return r}function hr(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Sg(Object(r),!0).forEach(function(o){Nf(e,o,r[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Sg(Object(r)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(r,o))})}return e}function Nf(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Uu=function(t){var r,o,i,s,a;t.rtl?a=t.slideCount-1-t.index:a=t.index,i=a<0||a>=t.slideCount,t.centerMode?(s=Math.floor(t.slidesToShow/2),o=(a-t.currentSlide)%t.slideCount===0,a>t.currentSlide-s-1&&a<=t.currentSlide+s&&(r=!0)):r=t.currentSlide<=a&&a<t.currentSlide+t.slidesToShow;var c;t.targetSlide<0?c=t.targetSlide+t.slideCount:t.targetSlide>=t.slideCount?c=t.targetSlide-t.slideCount:c=t.targetSlide;var l=a===c;return{"slick-slide":!0,"slick-active":r,"slick-center":o,"slick-cloned":i,"slick-current":l}},BN=function(t){var r={};return(t.variableWidth===void 0||t.variableWidth===!1)&&(r.width=t.slideWidth),t.fade&&(r.position="relative",t.vertical?r.top=-t.index*parseInt(t.slideHeight):r.left=-t.index*parseInt(t.slideWidth),r.opacity=t.currentSlide===t.index?1:0,t.useCSS&&(r.transition="opacity "+t.speed+"ms "+t.cssEase+", visibility "+t.speed+"ms "+t.cssEase)),r},Wu=function(t,r){return t.key||r},UN=function(t){var r,o=[],i=[],s=[],a=Zn.default.Children.count(t.children),c=(0,Bu.lazyStartIndex)(t),l=(0,Bu.lazyEndIndex)(t);return Zn.default.Children.forEach(t.children,function(d,u){var f,m={message:"children",index:u,slidesToScroll:t.slidesToScroll,currentSlide:t.currentSlide};!t.lazyLoad||t.lazyLoad&&t.lazyLoadedList.indexOf(u)>=0?f=d:f=Zn.default.createElement("div",null);var b=BN(hr(hr({},t),{},{index:u})),x=f.props.className||"",h=Uu(hr(hr({},t),{},{index:u}));if(o.push(Zn.default.cloneElement(f,{key:"original"+Wu(f,u),"data-index":u,className:(0,Fu.default)(h,x),tabIndex:"-1","aria-hidden":!h["slick-active"],style:hr(hr({outline:"none"},f.props.style||{}),b),onClick:function(g){f.props&&f.props.onClick&&f.props.onClick(g),t.focusOnSelect&&t.focusOnSelect(m)}})),t.infinite&&t.fade===!1){var v=a-u;v<=(0,Bu.getPreClones)(t)&&a!==t.slidesToShow&&(r=-v,r>=c&&(f=d),h=Uu(hr(hr({},t),{},{index:r})),i.push(Zn.default.cloneElement(f,{key:"precloned"+Wu(f,r),"data-index":r,tabIndex:"-1",className:(0,Fu.default)(h,x),"aria-hidden":!h["slick-active"],style:hr(hr({},f.props.style||{}),b),onClick:function(g){f.props&&f.props.onClick&&f.props.onClick(g),t.focusOnSelect&&t.focusOnSelect(m)}}))),a!==t.slidesToShow&&(r=a+u,r<l&&(f=d),h=Uu(hr(hr({},t),{},{index:r})),s.push(Zn.default.cloneElement(f,{key:"postcloned"+Wu(f,r),"data-index":r,tabIndex:"-1",className:(0,Fu.default)(h,x),"aria-hidden":!h["slick-active"],style:hr(hr({},f.props.style||{}),b),onClick:function(g){f.props&&f.props.onClick&&f.props.onClick(g),t.focusOnSelect&&t.focusOnSelect(m)}})))}}),t.rtl?i.concat(o,s).reverse():i.concat(o,s)},WN=function(e){IN(r,e);var t=AN(r);function r(){var o;$N(this,r);for(var i=arguments.length,s=new Array(i),a=0;a<i;a++)s[a]=arguments[a];return o=t.call.apply(t,[this].concat(s)),Nf(kf(o),"node",null),Nf(kf(o),"handleRef",function(c){o.node=c}),o}return LN(r,[{key:"render",value:function(){var i=UN(this.props),s=this.props,a=s.onMouseEnter,c=s.onMouseOver,l=s.onMouseLeave,d={onMouseEnter:a,onMouseOver:c,onMouseLeave:l};return Zn.default.createElement("div",jf({ref:this.handleRef,className:"slick-track",style:this.props.trackStyle},d),i)}}]),r}(Zn.default.PureComponent);Hd.Track=WN;var Vd={};function Cf(e){"@babel/helpers - typeof";return Cf=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Cf(e)}Object.defineProperty(Vd,"__esModule",{value:!0});Vd.Dots=void 0;var jl=c1(p),HN=c1(Ka),kg=re;function c1(e){return e&&e.__esModule?e:{default:e}}function Ng(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,o)}return r}function VN(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Ng(Object(r),!0).forEach(function(o){qN(e,o,r[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ng(Object(r)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(r,o))})}return e}function qN(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function YN(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Cg(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function KN(e,t,r){return t&&Cg(e.prototype,t),r&&Cg(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function QN(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_f(e,t)}function _f(e,t){return _f=Object.setPrototypeOf||function(o,i){return o.__proto__=i,o},_f(e,t)}function XN(e){var t=JN();return function(){var o=Oc(e),i;if(t){var s=Oc(this).constructor;i=Reflect.construct(o,arguments,s)}else i=o.apply(this,arguments);return GN(this,i)}}function GN(e,t){if(t&&(Cf(t)==="object"||typeof t=="function"))return t;if(t!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return ZN(e)}function ZN(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function JN(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Oc(e){return Oc=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},Oc(e)}var e4=function(t){var r;return t.infinite?r=Math.ceil(t.slideCount/t.slidesToScroll):r=Math.ceil((t.slideCount-t.slidesToShow)/t.slidesToScroll)+1,r},t4=function(e){QN(r,e);var t=XN(r);function r(){return YN(this,r),t.apply(this,arguments)}return KN(r,[{key:"clickHandler",value:function(i,s){s.preventDefault(),this.props.clickHandler(i)}},{key:"render",value:function(){for(var i=this.props,s=i.onMouseEnter,a=i.onMouseOver,c=i.onMouseLeave,l=i.infinite,d=i.slidesToScroll,u=i.slidesToShow,f=i.slideCount,m=i.currentSlide,b=e4({slideCount:f,slidesToScroll:d,slidesToShow:u,infinite:l}),x={onMouseEnter:s,onMouseOver:a,onMouseLeave:c},h=[],v=0;v<b;v++){var w=(v+1)*d-1,g=l?w:(0,kg.clamp)(w,0,f-1),j=g-(d-1),y=l?j:(0,kg.clamp)(j,0,f-1),k=(0,HN.default)({"slick-active":l?m>=y&&m<=g:m===y}),_={message:"dots",index:v,slidesToScroll:d,currentSlide:m},E=this.clickHandler.bind(this,_);h=h.concat(jl.default.createElement("li",{key:v,className:k},jl.default.cloneElement(this.props.customPaging(v),{onClick:E})))}return jl.default.cloneElement(this.props.appendDots(h),VN({className:this.props.dotsClass},x))}}]),r}(jl.default.PureComponent);Vd.Dots=t4;var Qi={};function Ef(e){"@babel/helpers - typeof";return Ef=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ef(e)}Object.defineProperty(Qi,"__esModule",{value:!0});Qi.PrevArrow=Qi.NextArrow=void 0;var zi=u1(p),d1=u1(Ka),r4=re;function u1(e){return e&&e.__esModule?e:{default:e}}function zc(){return zc=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},zc.apply(this,arguments)}function _g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,o)}return r}function Rc(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?_g(Object(r),!0).forEach(function(o){n4(e,o,r[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_g(Object(r)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(r,o))})}return e}function n4(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function h1(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Eg(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f1(e,t,r){return t&&Eg(e.prototype,t),r&&Eg(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function p1(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Tf(e,t)}function Tf(e,t){return Tf=Object.setPrototypeOf||function(o,i){return o.__proto__=i,o},Tf(e,t)}function m1(e){var t=s4();return function(){var o=Mc(e),i;if(t){var s=Mc(this).constructor;i=Reflect.construct(o,arguments,s)}else i=o.apply(this,arguments);return o4(this,i)}}function o4(e,t){if(t&&(Ef(t)==="object"||typeof t=="function"))return t;if(t!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return i4(e)}function i4(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function s4(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Mc(e){return Mc=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},Mc(e)}var a4=function(e){p1(r,e);var t=m1(r);function r(){return h1(this,r),t.apply(this,arguments)}return f1(r,[{key:"clickHandler",value:function(i,s){s&&s.preventDefault(),this.props.clickHandler(i,s)}},{key:"render",value:function(){var i={"slick-arrow":!0,"slick-prev":!0},s=this.clickHandler.bind(this,{message:"previous"});!this.props.infinite&&(this.props.currentSlide===0||this.props.slideCount<=this.props.slidesToShow)&&(i["slick-disabled"]=!0,s=null);var a={key:"0","data-role":"none",className:(0,d1.default)(i),style:{display:"block"},onClick:s},c={currentSlide:this.props.currentSlide,slideCount:this.props.slideCount},l;return this.props.prevArrow?l=zi.default.cloneElement(this.props.prevArrow,Rc(Rc({},a),c)):l=zi.default.createElement("button",zc({key:"0",type:"button"},a)," ","Previous"),l}}]),r}(zi.default.PureComponent);Qi.PrevArrow=a4;var l4=function(e){p1(r,e);var t=m1(r);function r(){return h1(this,r),t.apply(this,arguments)}return f1(r,[{key:"clickHandler",value:function(i,s){s&&s.preventDefault(),this.props.clickHandler(i,s)}},{key:"render",value:function(){var i={"slick-arrow":!0,"slick-next":!0},s=this.clickHandler.bind(this,{message:"next"});(0,r4.canGoNext)(this.props)||(i["slick-disabled"]=!0,s=null);var a={key:"1","data-role":"none",className:(0,d1.default)(i),style:{display:"block"},onClick:s},c={currentSlide:this.props.currentSlide,slideCount:this.props.slideCount},l;return this.props.nextArrow?l=zi.default.cloneElement(this.props.nextArrow,Rc(Rc({},a),c)):l=zi.default.createElement("button",zc({key:"1",type:"button"},a)," ","Next"),l}}]),r}(zi.default.PureComponent);Qi.NextArrow=l4;var x1=function(){if(typeof Map<"u")return Map;function e(t,r){var o=-1;return t.some(function(i,s){return i[0]===r?(o=s,!0):!1}),o}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var o=e(this.__entries__,r),i=this.__entries__[o];return i&&i[1]},t.prototype.set=function(r,o){var i=e(this.__entries__,r);~i?this.__entries__[i][1]=o:this.__entries__.push([r,o])},t.prototype.delete=function(r){var o=this.__entries__,i=e(o,r);~i&&o.splice(i,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,o){o===void 0&&(o=null);for(var i=0,s=this.__entries__;i<s.length;i++){var a=s[i];r.call(o,a[1],a[0])}},t}()}(),Pf=typeof window<"u"&&typeof document<"u"&&window.document===document,$c=function(){return typeof global<"u"&&global.Math===Math?global:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()}(),c4=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind($c):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}}(),d4=2;function u4(e,t){var r=!1,o=!1,i=0;function s(){r&&(r=!1,e()),o&&c()}function a(){c4(s)}function c(){var l=Date.now();if(r){if(l-i<d4)return;o=!0}else r=!0,o=!1,setTimeout(a,t);i=l}return c}var h4=20,f4=["top","right","bottom","left","width","height","size","weight"],p4=typeof MutationObserver<"u",m4=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=u4(this.refresh.bind(this),h4)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,o=r.indexOf(t);~o&&r.splice(o,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!Pf||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),p4?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!Pf||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,o=r===void 0?"":r,i=f4.some(function(s){return!!~o.indexOf(s)});i&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),g1=function(e,t){for(var r=0,o=Object.keys(t);r<o.length;r++){var i=o[r];Object.defineProperty(e,i,{value:t[i],enumerable:!1,writable:!1,configurable:!0})}return e},Xi=function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||$c},v1=qd(0,0,0,0);function Lc(e){return parseFloat(e)||0}function Tg(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(o,i){var s=e["border-"+i+"-width"];return o+Lc(s)},0)}function x4(e){for(var t=["top","right","bottom","left"],r={},o=0,i=t;o<i.length;o++){var s=i[o],a=e["padding-"+s];r[s]=Lc(a)}return r}function g4(e){var t=e.getBBox();return qd(0,0,t.width,t.height)}function v4(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return v1;var o=Xi(e).getComputedStyle(e),i=x4(o),s=i.left+i.right,a=i.top+i.bottom,c=Lc(o.width),l=Lc(o.height);if(o.boxSizing==="border-box"&&(Math.round(c+s)!==t&&(c-=Tg(o,"left","right")+s),Math.round(l+a)!==r&&(l-=Tg(o,"top","bottom")+a)),!y4(e)){var d=Math.round(c+s)-t,u=Math.round(l+a)-r;Math.abs(d)!==1&&(c-=d),Math.abs(u)!==1&&(l-=u)}return qd(i.left,i.top,c,l)}var w4=function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof Xi(e).SVGGraphicsElement}:function(e){return e instanceof Xi(e).SVGElement&&typeof e.getBBox=="function"}}();function y4(e){return e===Xi(e).document.documentElement}function b4(e){return Pf?w4(e)?g4(e):v4(e):v1}function j4(e){var t=e.x,r=e.y,o=e.width,i=e.height,s=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,a=Object.create(s.prototype);return g1(a,{x:t,y:r,width:o,height:i,top:r,right:t+o,bottom:i+r,left:t}),a}function qd(e,t,r,o){return{x:e,y:t,width:r,height:o}}var S4=function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=qd(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=b4(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e}(),k4=function(){function e(t,r){var o=j4(r);g1(this,{target:t,contentRect:o})}return e}(),N4=function(){function e(t,r,o){if(this.activeObservations_=[],this.observations_=new x1,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=o}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof Xi(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new S4(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof Xi(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)&&(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(o){return new k4(o.target,o.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),w1=typeof WeakMap<"u"?new WeakMap:new x1,y1=function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=m4.getInstance(),o=new N4(t,r,this);w1.set(this,o)}return e}();["observe","unobserve","disconnect"].forEach(function(e){y1.prototype[e]=function(){var t;return(t=w1.get(this))[e].apply(t,arguments)}});var C4=function(){return typeof $c.ResizeObserver<"u"?$c.ResizeObserver:y1}();const _4=Object.freeze(Object.defineProperty({__proto__:null,default:C4},Symbol.toStringTag,{value:"Module"})),E4=mb(_4);Object.defineProperty(Ud,"__esModule",{value:!0});Ud.InnerSlider=void 0;var tr=Qa(p),T4=Qa(Xy),P4=Qa(bN),O4=Qa(Ka),ut=re,z4=Hd,R4=Vd,Pg=Qi,M4=Qa(E4);function Qa(e){return e&&e.__esModule?e:{default:e}}function Ic(e){"@babel/helpers - typeof";return Ic=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ic(e)}function Ac(){return Ac=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},Ac.apply(this,arguments)}function $4(e,t){if(e==null)return{};var r=L4(e,t),o,i;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)o=s[i],!(t.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}function L4(e,t){if(e==null)return{};var r={},o=Object.keys(e),i,s;for(s=0;s<o.length;s++)i=o[s],!(t.indexOf(i)>=0)&&(r[i]=e[i]);return r}function Og(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,o)}return r}function ve(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Og(Object(r),!0).forEach(function(o){Pe(e,o,r[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Og(Object(r)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(r,o))})}return e}function I4(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function zg(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function A4(e,t,r){return t&&zg(e.prototype,t),r&&zg(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function D4(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Of(e,t)}function Of(e,t){return Of=Object.setPrototypeOf||function(o,i){return o.__proto__=i,o},Of(e,t)}function F4(e){var t=U4();return function(){var o=Dc(e),i;if(t){var s=Dc(this).constructor;i=Reflect.construct(o,arguments,s)}else i=o.apply(this,arguments);return B4(this,i)}}function B4(e,t){if(t&&(Ic(t)==="object"||typeof t=="function"))return t;if(t!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Te(e)}function Te(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function U4(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Dc(e){return Dc=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},Dc(e)}function Pe(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var W4=function(e){D4(r,e);var t=F4(r);function r(o){var i;I4(this,r),i=t.call(this,o),Pe(Te(i),"listRefHandler",function(a){return i.list=a}),Pe(Te(i),"trackRefHandler",function(a){return i.track=a}),Pe(Te(i),"adaptHeight",function(){if(i.props.adaptiveHeight&&i.list){var a=i.list.querySelector('[data-index="'.concat(i.state.currentSlide,'"]'));i.list.style.height=(0,ut.getHeight)(a)+"px"}}),Pe(Te(i),"componentDidMount",function(){if(i.props.onInit&&i.props.onInit(),i.props.lazyLoad){var a=(0,ut.getOnDemandLazySlides)(ve(ve({},i.props),i.state));a.length>0&&(i.setState(function(l){return{lazyLoadedList:l.lazyLoadedList.concat(a)}}),i.props.onLazyLoad&&i.props.onLazyLoad(a))}var c=ve({listRef:i.list,trackRef:i.track},i.props);i.updateState(c,!0,function(){i.adaptHeight(),i.props.autoplay&&i.autoPlay("update")}),i.props.lazyLoad==="progressive"&&(i.lazyLoadTimer=setInterval(i.progressiveLazyLoad,1e3)),i.ro=new M4.default(function(){i.state.animating?(i.onWindowResized(!1),i.callbackTimers.push(setTimeout(function(){return i.onWindowResized()},i.props.speed))):i.onWindowResized()}),i.ro.observe(i.list),document.querySelectorAll&&Array.prototype.forEach.call(document.querySelectorAll(".slick-slide"),function(l){l.onfocus=i.props.pauseOnFocus?i.onSlideFocus:null,l.onblur=i.props.pauseOnFocus?i.onSlideBlur:null}),window.addEventListener?window.addEventListener("resize",i.onWindowResized):window.attachEvent("onresize",i.onWindowResized)}),Pe(Te(i),"componentWillUnmount",function(){i.animationEndCallback&&clearTimeout(i.animationEndCallback),i.lazyLoadTimer&&clearInterval(i.lazyLoadTimer),i.callbackTimers.length&&(i.callbackTimers.forEach(function(a){return clearTimeout(a)}),i.callbackTimers=[]),window.addEventListener?window.removeEventListener("resize",i.onWindowResized):window.detachEvent("onresize",i.onWindowResized),i.autoplayTimer&&clearInterval(i.autoplayTimer),i.ro.disconnect()}),Pe(Te(i),"componentDidUpdate",function(a){if(i.checkImagesLoad(),i.props.onReInit&&i.props.onReInit(),i.props.lazyLoad){var c=(0,ut.getOnDemandLazySlides)(ve(ve({},i.props),i.state));c.length>0&&(i.setState(function(u){return{lazyLoadedList:u.lazyLoadedList.concat(c)}}),i.props.onLazyLoad&&i.props.onLazyLoad(c))}i.adaptHeight();var l=ve(ve({listRef:i.list,trackRef:i.track},i.props),i.state),d=i.didPropsChange(a);d&&i.updateState(l,d,function(){i.state.currentSlide>=tr.default.Children.count(i.props.children)&&i.changeSlide({message:"index",index:tr.default.Children.count(i.props.children)-i.props.slidesToShow,currentSlide:i.state.currentSlide}),i.props.autoplay?i.autoPlay("update"):i.pause("paused")})}),Pe(Te(i),"onWindowResized",function(a){i.debouncedResize&&i.debouncedResize.cancel(),i.debouncedResize=(0,P4.default)(function(){return i.resizeWindow(a)},50),i.debouncedResize()}),Pe(Te(i),"resizeWindow",function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,c=!!(i.track&&i.track.node);if(c){var l=ve(ve({listRef:i.list,trackRef:i.track},i.props),i.state);i.updateState(l,a,function(){i.props.autoplay?i.autoPlay("update"):i.pause("paused")}),i.setState({animating:!1}),clearTimeout(i.animationEndCallback),delete i.animationEndCallback}}),Pe(Te(i),"updateState",function(a,c,l){var d=(0,ut.initializedState)(a);a=ve(ve(ve({},a),d),{},{slideIndex:d.currentSlide});var u=(0,ut.getTrackLeft)(a);a=ve(ve({},a),{},{left:u});var f=(0,ut.getTrackCSS)(a);(c||tr.default.Children.count(i.props.children)!==tr.default.Children.count(a.children))&&(d.trackStyle=f),i.setState(d,l)}),Pe(Te(i),"ssrInit",function(){if(i.props.variableWidth){var a=0,c=0,l=[],d=(0,ut.getPreClones)(ve(ve(ve({},i.props),i.state),{},{slideCount:i.props.children.length})),u=(0,ut.getPostClones)(ve(ve(ve({},i.props),i.state),{},{slideCount:i.props.children.length}));i.props.children.forEach(function(E){l.push(E.props.style.width),a+=E.props.style.width});for(var f=0;f<d;f++)c+=l[l.length-1-f],a+=l[l.length-1-f];for(var m=0;m<u;m++)a+=l[m];for(var b=0;b<i.state.currentSlide;b++)c+=l[b];var x={width:a+"px",left:-c+"px"};if(i.props.centerMode){var h="".concat(l[i.state.currentSlide],"px");x.left="calc(".concat(x.left," + (100% - ").concat(h,") / 2 ) ")}return{trackStyle:x}}var v=tr.default.Children.count(i.props.children),w=ve(ve(ve({},i.props),i.state),{},{slideCount:v}),g=(0,ut.getPreClones)(w)+(0,ut.getPostClones)(w)+v,j=100/i.props.slidesToShow*g,y=100/g,k=-y*((0,ut.getPreClones)(w)+i.state.currentSlide)*j/100;i.props.centerMode&&(k+=(100-y*j/100)/2);var _={width:j+"%",left:k+"%"};return{slideWidth:y+"%",trackStyle:_}}),Pe(Te(i),"checkImagesLoad",function(){var a=i.list&&i.list.querySelectorAll&&i.list.querySelectorAll(".slick-slide img")||[],c=a.length,l=0;Array.prototype.forEach.call(a,function(d){var u=function(){return++l&&l>=c&&i.onWindowResized()};if(!d.onclick)d.onclick=function(){return d.parentNode.focus()};else{var f=d.onclick;d.onclick=function(){f(),d.parentNode.focus()}}d.onload||(i.props.lazyLoad?d.onload=function(){i.adaptHeight(),i.callbackTimers.push(setTimeout(i.onWindowResized,i.props.speed))}:(d.onload=u,d.onerror=function(){u(),i.props.onLazyLoadError&&i.props.onLazyLoadError()}))})}),Pe(Te(i),"progressiveLazyLoad",function(){for(var a=[],c=ve(ve({},i.props),i.state),l=i.state.currentSlide;l<i.state.slideCount+(0,ut.getPostClones)(c);l++)if(i.state.lazyLoadedList.indexOf(l)<0){a.push(l);break}for(var d=i.state.currentSlide-1;d>=-(0,ut.getPreClones)(c);d--)if(i.state.lazyLoadedList.indexOf(d)<0){a.push(d);break}a.length>0?(i.setState(function(u){return{lazyLoadedList:u.lazyLoadedList.concat(a)}}),i.props.onLazyLoad&&i.props.onLazyLoad(a)):i.lazyLoadTimer&&(clearInterval(i.lazyLoadTimer),delete i.lazyLoadTimer)}),Pe(Te(i),"slideHandler",function(a){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,l=i.props,d=l.asNavFor,u=l.beforeChange,f=l.onLazyLoad,m=l.speed,b=l.afterChange,x=i.state.currentSlide,h=(0,ut.slideHandler)(ve(ve(ve({index:a},i.props),i.state),{},{trackRef:i.track,useCSS:i.props.useCSS&&!c})),v=h.state,w=h.nextState;if(v){u&&u(x,v.currentSlide);var g=v.lazyLoadedList.filter(function(j){return i.state.lazyLoadedList.indexOf(j)<0});f&&g.length>0&&f(g),!i.props.waitForAnimate&&i.animationEndCallback&&(clearTimeout(i.animationEndCallback),b&&b(x),delete i.animationEndCallback),i.setState(v,function(){d&&i.asNavForIndex!==a&&(i.asNavForIndex=a,d.innerSlider.slideHandler(a)),w&&(i.animationEndCallback=setTimeout(function(){var j=w.animating,y=$4(w,["animating"]);i.setState(y,function(){i.callbackTimers.push(setTimeout(function(){return i.setState({animating:j})},10)),b&&b(v.currentSlide),delete i.animationEndCallback})},m))})}}),Pe(Te(i),"changeSlide",function(a){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,l=ve(ve({},i.props),i.state),d=(0,ut.changeSlide)(l,a);if(!(d!==0&&!d)&&(c===!0?i.slideHandler(d,c):i.slideHandler(d),i.props.autoplay&&i.autoPlay("update"),i.props.focusOnSelect)){var u=i.list.querySelectorAll(".slick-current");u[0]&&u[0].focus()}}),Pe(Te(i),"clickHandler",function(a){i.clickable===!1&&(a.stopPropagation(),a.preventDefault()),i.clickable=!0}),Pe(Te(i),"keyHandler",function(a){var c=(0,ut.keyHandler)(a,i.props.accessibility,i.props.rtl);c!==""&&i.changeSlide({message:c})}),Pe(Te(i),"selectHandler",function(a){i.changeSlide(a)}),Pe(Te(i),"disableBodyScroll",function(){var a=function(l){l=l||window.event,l.preventDefault&&l.preventDefault(),l.returnValue=!1};window.ontouchmove=a}),Pe(Te(i),"enableBodyScroll",function(){window.ontouchmove=null}),Pe(Te(i),"swipeStart",function(a){i.props.verticalSwiping&&i.disableBodyScroll();var c=(0,ut.swipeStart)(a,i.props.swipe,i.props.draggable);c!==""&&i.setState(c)}),Pe(Te(i),"swipeMove",function(a){var c=(0,ut.swipeMove)(a,ve(ve(ve({},i.props),i.state),{},{trackRef:i.track,listRef:i.list,slideIndex:i.state.currentSlide}));c&&(c.swiping&&(i.clickable=!1),i.setState(c))}),Pe(Te(i),"swipeEnd",function(a){var c=(0,ut.swipeEnd)(a,ve(ve(ve({},i.props),i.state),{},{trackRef:i.track,listRef:i.list,slideIndex:i.state.currentSlide}));if(c){var l=c.triggerSlideHandler;delete c.triggerSlideHandler,i.setState(c),l!==void 0&&(i.slideHandler(l),i.props.verticalSwiping&&i.enableBodyScroll())}}),Pe(Te(i),"touchEnd",function(a){i.swipeEnd(a),i.clickable=!0}),Pe(Te(i),"slickPrev",function(){i.callbackTimers.push(setTimeout(function(){return i.changeSlide({message:"previous"})},0))}),Pe(Te(i),"slickNext",function(){i.callbackTimers.push(setTimeout(function(){return i.changeSlide({message:"next"})},0))}),Pe(Te(i),"slickGoTo",function(a){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(a=Number(a),isNaN(a))return"";i.callbackTimers.push(setTimeout(function(){return i.changeSlide({message:"index",index:a,currentSlide:i.state.currentSlide},c)},0))}),Pe(Te(i),"play",function(){var a;if(i.props.rtl)a=i.state.currentSlide-i.props.slidesToScroll;else if((0,ut.canGoNext)(ve(ve({},i.props),i.state)))a=i.state.currentSlide+i.props.slidesToScroll;else return!1;i.slideHandler(a)}),Pe(Te(i),"autoPlay",function(a){i.autoplayTimer&&clearInterval(i.autoplayTimer);var c=i.state.autoplaying;if(a==="update"){if(c==="hovered"||c==="focused"||c==="paused")return}else if(a==="leave"){if(c==="paused"||c==="focused")return}else if(a==="blur"&&(c==="paused"||c==="hovered"))return;i.autoplayTimer=setInterval(i.play,i.props.autoplaySpeed+50),i.setState({autoplaying:"playing"})}),Pe(Te(i),"pause",function(a){i.autoplayTimer&&(clearInterval(i.autoplayTimer),i.autoplayTimer=null);var c=i.state.autoplaying;a==="paused"?i.setState({autoplaying:"paused"}):a==="focused"?(c==="hovered"||c==="playing")&&i.setState({autoplaying:"focused"}):c==="playing"&&i.setState({autoplaying:"hovered"})}),Pe(Te(i),"onDotsOver",function(){return i.props.autoplay&&i.pause("hovered")}),Pe(Te(i),"onDotsLeave",function(){return i.props.autoplay&&i.state.autoplaying==="hovered"&&i.autoPlay("leave")}),Pe(Te(i),"onTrackOver",function(){return i.props.autoplay&&i.pause("hovered")}),Pe(Te(i),"onTrackLeave",function(){return i.props.autoplay&&i.state.autoplaying==="hovered"&&i.autoPlay("leave")}),Pe(Te(i),"onSlideFocus",function(){return i.props.autoplay&&i.pause("focused")}),Pe(Te(i),"onSlideBlur",function(){return i.props.autoplay&&i.state.autoplaying==="focused"&&i.autoPlay("blur")}),Pe(Te(i),"render",function(){var a=(0,O4.default)("slick-slider",i.props.className,{"slick-vertical":i.props.vertical,"slick-initialized":!0}),c=ve(ve({},i.props),i.state),l=(0,ut.extractObject)(c,["fade","cssEase","speed","infinite","centerMode","focusOnSelect","currentSlide","lazyLoad","lazyLoadedList","rtl","slideWidth","slideHeight","listHeight","vertical","slidesToShow","slidesToScroll","slideCount","trackStyle","variableWidth","unslick","centerPadding","targetSlide","useCSS"]),d=i.props.pauseOnHover;l=ve(ve({},l),{},{onMouseEnter:d?i.onTrackOver:null,onMouseLeave:d?i.onTrackLeave:null,onMouseOver:d?i.onTrackOver:null,focusOnSelect:i.props.focusOnSelect&&i.clickable?i.selectHandler:null});var u;if(i.props.dots===!0&&i.state.slideCount>=i.props.slidesToShow){var f=(0,ut.extractObject)(c,["dotsClass","slideCount","slidesToShow","currentSlide","slidesToScroll","clickHandler","children","customPaging","infinite","appendDots"]),m=i.props.pauseOnDotsHover;f=ve(ve({},f),{},{clickHandler:i.changeSlide,onMouseEnter:m?i.onDotsLeave:null,onMouseOver:m?i.onDotsOver:null,onMouseLeave:m?i.onDotsLeave:null}),u=tr.default.createElement(R4.Dots,f)}var b,x,h=(0,ut.extractObject)(c,["infinite","centerMode","currentSlide","slideCount","slidesToShow","prevArrow","nextArrow"]);h.clickHandler=i.changeSlide,i.props.arrows&&(b=tr.default.createElement(Pg.PrevArrow,h),x=tr.default.createElement(Pg.NextArrow,h));var v=null;i.props.vertical&&(v={height:i.state.listHeight});var w=null;i.props.vertical===!1?i.props.centerMode===!0&&(w={padding:"0px "+i.props.centerPadding}):i.props.centerMode===!0&&(w={padding:i.props.centerPadding+" 0px"});var g=ve(ve({},v),w),j=i.props.touchMove,y={className:"slick-list",style:g,onClick:i.clickHandler,onMouseDown:j?i.swipeStart:null,onMouseMove:i.state.dragging&&j?i.swipeMove:null,onMouseUp:j?i.swipeEnd:null,onMouseLeave:i.state.dragging&&j?i.swipeEnd:null,onTouchStart:j?i.swipeStart:null,onTouchMove:i.state.dragging&&j?i.swipeMove:null,onTouchEnd:j?i.touchEnd:null,onTouchCancel:i.state.dragging&&j?i.swipeEnd:null,onKeyDown:i.props.accessibility?i.keyHandler:null},k={className:a,dir:"ltr",style:i.props.style};return i.props.unslick&&(y={className:"slick-list"},k={className:a}),tr.default.createElement("div",k,i.props.unslick?"":b,tr.default.createElement("div",Ac({ref:i.listRefHandler},y),tr.default.createElement(z4.Track,Ac({ref:i.trackRefHandler},l),i.props.children)),i.props.unslick?"":x,i.props.unslick?"":u)}),i.list=null,i.track=null,i.state=ve(ve({},T4.default),{},{currentSlide:i.props.initialSlide,slideCount:tr.default.Children.count(i.props.children)}),i.callbackTimers=[],i.clickable=!0,i.debouncedResize=null;var s=i.ssrInit();return i.state=ve(ve({},i.state),s),i}return A4(r,[{key:"didPropsChange",value:function(i){for(var s=!1,a=0,c=Object.keys(this.props);a<c.length;a++){var l=c[a];if(!i.hasOwnProperty(l)){s=!0;break}if(!(Ic(i[l])==="object"||typeof i[l]=="function")&&i[l]!==this.props[l]){s=!0;break}}return s||tr.default.Children.count(this.props.children)!==tr.default.Children.count(i.children)}}]),r}(tr.default.Component);Ud.InnerSlider=W4;var H4=function(e){return e.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()}).toLowerCase()},V4=H4,q4=V4,Y4=function(e){var t=/[height|width]$/;return t.test(e)},Rg=function(e){var t="",r=Object.keys(e);return r.forEach(function(o,i){var s=e[o];o=q4(o),Y4(o)&&typeof s=="number"&&(s=s+"px"),s===!0?t+=o:s===!1?t+="not "+o:t+="("+o+": "+s+")",i<r.length-1&&(t+=" and ")}),t},K4=function(e){var t="";return typeof e=="string"?e:e instanceof Array?(e.forEach(function(r,o){t+=Rg(r),o<e.length-1&&(t+=", ")}),t):Rg(e)},Q4=K4,b1={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=r(p);function r(s){return s&&s.__esModule?s:{default:s}}var o={accessibility:!0,adaptiveHeight:!1,afterChange:null,appendDots:function(a){return t.default.createElement("ul",{style:{display:"block"}},a)},arrows:!0,autoplay:!1,autoplaySpeed:3e3,beforeChange:null,centerMode:!1,centerPadding:"50px",className:"",cssEase:"ease",customPaging:function(a){return t.default.createElement("button",null,a+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:null,nextArrow:null,onEdge:null,onInit:null,onLazyLoadError:null,onReInit:null,pauseOnDotsHover:!1,pauseOnFocus:!1,pauseOnHover:!0,prevArrow:null,responsive:null,rows:1,rtl:!1,slide:"div",slidesPerRow:1,slidesToScroll:1,slidesToShow:1,speed:500,swipe:!0,swipeEvent:null,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,waitForAnimate:!0},i=o;e.default=i})(b1);var Hu,Mg;function X4(){if(Mg)return Hu;Mg=1;function e(t){this.options=t,!t.deferSetup&&this.setup()}return e.prototype={constructor:e,setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},Hu=e,Hu}var Vu,$g;function j1(){if($g)return Vu;$g=1;function e(o,i){var s=0,a=o.length,c;for(s;s<a&&(c=i(o[s],s),c!==!1);s++);}function t(o){return Object.prototype.toString.apply(o)==="[object Array]"}function r(o){return typeof o=="function"}return Vu={isFunction:r,isArray:t,each:e},Vu}var qu,Lg;function G4(){if(Lg)return qu;Lg=1;var e=X4(),t=j1().each;function r(o,i){this.query=o,this.isUnconditional=i,this.handlers=[],this.mql=window.matchMedia(o);var s=this;this.listener=function(a){s.mql=a.currentTarget||a,s.assess()},this.mql.addListener(this.listener)}return r.prototype={constuctor:r,addHandler:function(o){var i=new e(o);this.handlers.push(i),this.matches()&&i.on()},removeHandler:function(o){var i=this.handlers;t(i,function(s,a){if(s.equals(o))return s.destroy(),!i.splice(a,1)})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){t(this.handlers,function(o){o.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var o=this.matches()?"on":"off";t(this.handlers,function(i){i[o]()})}},qu=r,qu}var Yu,Ig;function Z4(){if(Ig)return Yu;Ig=1;var e=G4(),t=j1(),r=t.each,o=t.isFunction,i=t.isArray;function s(){if(!window.matchMedia)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!window.matchMedia("only all").matches}return s.prototype={constructor:s,register:function(a,c,l){var d=this.queries,u=l&&this.browserIsIncapable;return d[a]||(d[a]=new e(a,u)),o(c)&&(c={match:c}),i(c)||(c=[c]),r(c,function(f){o(f)&&(f={match:f}),d[a].addHandler(f)}),this},unregister:function(a,c){var l=this.queries[a];return l&&(c?l.removeHandler(c):(l.clear(),delete this.queries[a])),this}},Yu=s,Yu}var Ku,Ag;function J4(){if(Ag)return Ku;Ag=1;var e=Z4();return Ku=new e,Ku}(function(e){function t(N){"@babel/helpers - typeof";return t=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(T){return typeof T}:function(T){return T&&typeof Symbol=="function"&&T.constructor===Symbol&&T!==Symbol.prototype?"symbol":typeof T},t(N)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=c(p),o=Ud,i=c(Q4),s=c(b1),a=re;function c(N){return N&&N.__esModule?N:{default:N}}function l(){return l=Object.assign||function(N){for(var T=1;T<arguments.length;T++){var M=arguments[T];for(var L in M)Object.prototype.hasOwnProperty.call(M,L)&&(N[L]=M[L])}return N},l.apply(this,arguments)}function d(N,T){var M=Object.keys(N);if(Object.getOwnPropertySymbols){var L=Object.getOwnPropertySymbols(N);T&&(L=L.filter(function(I){return Object.getOwnPropertyDescriptor(N,I).enumerable})),M.push.apply(M,L)}return M}function u(N){for(var T=1;T<arguments.length;T++){var M=arguments[T]!=null?arguments[T]:{};T%2?d(Object(M),!0).forEach(function(L){k(N,L,M[L])}):Object.getOwnPropertyDescriptors?Object.defineProperties(N,Object.getOwnPropertyDescriptors(M)):d(Object(M)).forEach(function(L){Object.defineProperty(N,L,Object.getOwnPropertyDescriptor(M,L))})}return N}function f(N,T){if(!(N instanceof T))throw new TypeError("Cannot call a class as a function")}function m(N,T){for(var M=0;M<T.length;M++){var L=T[M];L.enumerable=L.enumerable||!1,L.configurable=!0,"value"in L&&(L.writable=!0),Object.defineProperty(N,L.key,L)}}function b(N,T,M){return T&&m(N.prototype,T),M&&m(N,M),Object.defineProperty(N,"prototype",{writable:!1}),N}function x(N,T){if(typeof T!="function"&&T!==null)throw new TypeError("Super expression must either be null or a function");N.prototype=Object.create(T&&T.prototype,{constructor:{value:N,writable:!0,configurable:!0}}),Object.defineProperty(N,"prototype",{writable:!1}),T&&h(N,T)}function h(N,T){return h=Object.setPrototypeOf||function(L,I){return L.__proto__=I,L},h(N,T)}function v(N){var T=j();return function(){var L=y(N),I;if(T){var $=y(this).constructor;I=Reflect.construct(L,arguments,$)}else I=L.apply(this,arguments);return w(this,I)}}function w(N,T){if(T&&(t(T)==="object"||typeof T=="function"))return T;if(T!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return g(N)}function g(N){if(N===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return N}function j(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function y(N){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(M){return M.__proto__||Object.getPrototypeOf(M)},y(N)}function k(N,T,M){return T in N?Object.defineProperty(N,T,{value:M,enumerable:!0,configurable:!0,writable:!0}):N[T]=M,N}var _=(0,a.canUseDOM)()&&J4(),E=function(N){x(M,N);var T=v(M);function M(L){var I;return f(this,M),I=T.call(this,L),k(g(I),"innerSliderRefHandler",function($){return I.innerSlider=$}),k(g(I),"slickPrev",function(){return I.innerSlider.slickPrev()}),k(g(I),"slickNext",function(){return I.innerSlider.slickNext()}),k(g(I),"slickGoTo",function($){var V=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return I.innerSlider.slickGoTo($,V)}),k(g(I),"slickPause",function(){return I.innerSlider.pause("paused")}),k(g(I),"slickPlay",function(){return I.innerSlider.autoPlay("play")}),I.state={breakpoint:null},I._responsiveMediaHandlers=[],I}return b(M,[{key:"media",value:function(I,$){_.register(I,$),this._responsiveMediaHandlers.push({query:I,handler:$})}},{key:"componentDidMount",value:function(){var I=this;if(this.props.responsive){var $=this.props.responsive.map(function(F){return F.breakpoint});$.sort(function(F,D){return F-D}),$.forEach(function(F,D){var Y;D===0?Y=(0,i.default)({minWidth:0,maxWidth:F}):Y=(0,i.default)({minWidth:$[D-1]+1,maxWidth:F}),(0,a.canUseDOM)()&&I.media(Y,function(){I.setState({breakpoint:F})})});var V=(0,i.default)({minWidth:$.slice(-1)[0]});(0,a.canUseDOM)()&&this.media(V,function(){I.setState({breakpoint:null})})}}},{key:"componentWillUnmount",value:function(){this._responsiveMediaHandlers.forEach(function(I){_.unregister(I.query,I.handler)})}},{key:"render",value:function(){var I=this,$,V;this.state.breakpoint?(V=this.props.responsive.filter(function(J){return J.breakpoint===I.state.breakpoint}),$=V[0].settings==="unslick"?"unslick":u(u(u({},s.default),this.props),V[0].settings)):$=u(u({},s.default),this.props),$.centerMode&&($.slidesToScroll>1,$.slidesToScroll=1),$.fade&&($.slidesToShow>1,$.slidesToScroll>1,$.slidesToShow=1,$.slidesToScroll=1);var F=r.default.Children.toArray(this.props.children);F=F.filter(function(J){return typeof J=="string"?!!J.trim():!!J}),$.variableWidth&&($.rows>1||$.slidesPerRow>1)&&(console.warn("variableWidth is not supported in case of rows > 1 or slidesPerRow > 1"),$.variableWidth=!1);for(var D=[],Y=null,z=0;z<F.length;z+=$.rows*$.slidesPerRow){for(var A=[],R=z;R<z+$.rows*$.slidesPerRow;R+=$.slidesPerRow){for(var q=[],X=R;X<R+$.slidesPerRow&&($.variableWidth&&F[X].props.style&&(Y=F[X].props.style.width),!(X>=F.length));X+=1)q.push(r.default.cloneElement(F[X],{key:100*z+10*R+X,tabIndex:-1,style:{width:"".concat(100/$.slidesPerRow,"%"),display:"inline-block"}}));A.push(r.default.createElement("div",{key:10*z+R},q))}$.variableWidth?D.push(r.default.createElement("div",{key:z,style:{width:Y}},A)):D.push(r.default.createElement("div",{key:z},A))}if($==="unslick"){var oe="regular slider "+(this.props.className||"");return r.default.createElement("div",{className:oe},F)}else D.length<=$.slidesToShow&&($.unslick=!0);return r.default.createElement(o.InnerSlider,l({style:this.props.style,ref:this.innerSliderRefHandler},$),D)}}]),M}(r.default.Component);e.default=E})(Qy);(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=r(Qy);function r(i){return i&&i.__esModule?i:{default:i}}var o=t.default;e.default=o})(Ky);const gt=Kc(Ky);function S1(e,t){return function(){return e.apply(t,arguments)}}const{toString:eC}=Object.prototype,{getPrototypeOf:lm}=Object,Yd=(e=>t=>{const r=eC.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),yn=e=>(e=e.toLowerCase(),t=>Yd(t)===e),Kd=e=>t=>typeof t===e,{isArray:is}=Array,Ra=Kd("undefined");function tC(e){return e!==null&&!Ra(e)&&e.constructor!==null&&!Ra(e.constructor)&&Ar(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const k1=yn("ArrayBuffer");function rC(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&k1(e.buffer),t}const nC=Kd("string"),Ar=Kd("function"),N1=Kd("number"),Qd=e=>e!==null&&typeof e=="object",oC=e=>e===!0||e===!1,ql=e=>{if(Yd(e)!=="object")return!1;const t=lm(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},iC=yn("Date"),sC=yn("File"),aC=yn("Blob"),lC=yn("FileList"),cC=e=>Qd(e)&&Ar(e.pipe),dC=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||Ar(e.append)&&((t=Yd(e))==="formdata"||t==="object"&&Ar(e.toString)&&e.toString()==="[object FormData]"))},uC=yn("URLSearchParams"),hC=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Xa(e,t,{allOwnKeys:r=!1}={}){if(e===null||typeof e>"u")return;let o,i;if(typeof e!="object"&&(e=[e]),is(e))for(o=0,i=e.length;o<i;o++)t.call(null,e[o],o,e);else{const s=r?Object.getOwnPropertyNames(e):Object.keys(e),a=s.length;let c;for(o=0;o<a;o++)c=s[o],t.call(null,e[c],c,e)}}function C1(e,t){t=t.toLowerCase();const r=Object.keys(e);let o=r.length,i;for(;o-- >0;)if(i=r[o],t===i.toLowerCase())return i;return null}const _1=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),E1=e=>!Ra(e)&&e!==_1;function zf(){const{caseless:e}=E1(this)&&this||{},t={},r=(o,i)=>{const s=e&&C1(t,i)||i;ql(t[s])&&ql(o)?t[s]=zf(t[s],o):ql(o)?t[s]=zf({},o):is(o)?t[s]=o.slice():t[s]=o};for(let o=0,i=arguments.length;o<i;o++)arguments[o]&&Xa(arguments[o],r);return t}const fC=(e,t,r,{allOwnKeys:o}={})=>(Xa(t,(i,s)=>{r&&Ar(i)?e[s]=S1(i,r):e[s]=i},{allOwnKeys:o}),e),pC=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),mC=(e,t,r,o)=>{e.prototype=Object.create(t.prototype,o),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},xC=(e,t,r,o)=>{let i,s,a;const c={};if(t=t||{},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),s=i.length;s-- >0;)a=i[s],(!o||o(a,e,t))&&!c[a]&&(t[a]=e[a],c[a]=!0);e=r!==!1&&lm(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},gC=(e,t,r)=>{e=String(e),(r===void 0||r>e.length)&&(r=e.length),r-=t.length;const o=e.indexOf(t,r);return o!==-1&&o===r},vC=e=>{if(!e)return null;if(is(e))return e;let t=e.length;if(!N1(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},wC=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&lm(Uint8Array)),yC=(e,t)=>{const o=(e&&e[Symbol.iterator]).call(e);let i;for(;(i=o.next())&&!i.done;){const s=i.value;t.call(e,s[0],s[1])}},bC=(e,t)=>{let r;const o=[];for(;(r=e.exec(t))!==null;)o.push(r);return o},jC=yn("HTMLFormElement"),SC=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,o,i){return o.toUpperCase()+i}),Dg=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),kC=yn("RegExp"),T1=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),o={};Xa(r,(i,s)=>{let a;(a=t(i,s,e))!==!1&&(o[s]=a||i)}),Object.defineProperties(e,o)},NC=e=>{T1(e,(t,r)=>{if(Ar(e)&&["arguments","caller","callee"].indexOf(r)!==-1)return!1;const o=e[r];if(Ar(o)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},CC=(e,t)=>{const r={},o=i=>{i.forEach(s=>{r[s]=!0})};return is(e)?o(e):o(String(e).split(t)),r},_C=()=>{},EC=(e,t)=>(e=+e,Number.isFinite(e)?e:t),Qu="abcdefghijklmnopqrstuvwxyz",Fg="0123456789",P1={DIGIT:Fg,ALPHA:Qu,ALPHA_DIGIT:Qu+Qu.toUpperCase()+Fg},TC=(e=16,t=P1.ALPHA_DIGIT)=>{let r="";const{length:o}=t;for(;e--;)r+=t[Math.random()*o|0];return r};function PC(e){return!!(e&&Ar(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const OC=e=>{const t=new Array(10),r=(o,i)=>{if(Qd(o)){if(t.indexOf(o)>=0)return;if(!("toJSON"in o)){t[i]=o;const s=is(o)?[]:{};return Xa(o,(a,c)=>{const l=r(a,i+1);!Ra(l)&&(s[c]=l)}),t[i]=void 0,s}}return o};return r(e,0)},zC=yn("AsyncFunction"),RC=e=>e&&(Qd(e)||Ar(e))&&Ar(e.then)&&Ar(e.catch),U={isArray:is,isArrayBuffer:k1,isBuffer:tC,isFormData:dC,isArrayBufferView:rC,isString:nC,isNumber:N1,isBoolean:oC,isObject:Qd,isPlainObject:ql,isUndefined:Ra,isDate:iC,isFile:sC,isBlob:aC,isRegExp:kC,isFunction:Ar,isStream:cC,isURLSearchParams:uC,isTypedArray:wC,isFileList:lC,forEach:Xa,merge:zf,extend:fC,trim:hC,stripBOM:pC,inherits:mC,toFlatObject:xC,kindOf:Yd,kindOfTest:yn,endsWith:gC,toArray:vC,forEachEntry:yC,matchAll:bC,isHTMLForm:jC,hasOwnProperty:Dg,hasOwnProp:Dg,reduceDescriptors:T1,freezeMethods:NC,toObjectSet:CC,toCamelCase:SC,noop:_C,toFiniteNumber:EC,findKey:C1,global:_1,isContextDefined:E1,ALPHABET:P1,generateString:TC,isSpecCompliantForm:PC,toJSONObject:OC,isAsyncFn:zC,isThenable:RC};function $e(e,t,r,o,i){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),r&&(this.config=r),o&&(this.request=o),i&&(this.response=i)}U.inherits($e,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:U.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const O1=$e.prototype,z1={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{z1[e]={value:e}});Object.defineProperties($e,z1);Object.defineProperty(O1,"isAxiosError",{value:!0});$e.from=(e,t,r,o,i,s)=>{const a=Object.create(O1);return U.toFlatObject(e,a,function(l){return l!==Error.prototype},c=>c!=="isAxiosError"),$e.call(a,e.message,t,r,o,i),a.cause=e,a.name=e.name,s&&Object.assign(a,s),a};const MC=null;function Rf(e){return U.isPlainObject(e)||U.isArray(e)}function R1(e){return U.endsWith(e,"[]")?e.slice(0,-2):e}function Bg(e,t,r){return e?e.concat(t).map(function(i,s){return i=R1(i),!r&&s?"["+i+"]":i}).join(r?".":""):t}function $C(e){return U.isArray(e)&&!e.some(Rf)}const LC=U.toFlatObject(U,{},null,function(t){return/^is[A-Z]/.test(t)});function Xd(e,t,r){if(!U.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,r=U.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,v){return!U.isUndefined(v[h])});const o=r.metaTokens,i=r.visitor||u,s=r.dots,a=r.indexes,l=(r.Blob||typeof Blob<"u"&&Blob)&&U.isSpecCompliantForm(t);if(!U.isFunction(i))throw new TypeError("visitor must be a function");function d(x){if(x===null)return"";if(U.isDate(x))return x.toISOString();if(!l&&U.isBlob(x))throw new $e("Blob is not supported. Use a Buffer instead.");return U.isArrayBuffer(x)||U.isTypedArray(x)?l&&typeof Blob=="function"?new Blob([x]):Buffer.from(x):x}function u(x,h,v){let w=x;if(x&&!v&&typeof x=="object"){if(U.endsWith(h,"{}"))h=o?h:h.slice(0,-2),x=JSON.stringify(x);else if(U.isArray(x)&&$C(x)||(U.isFileList(x)||U.endsWith(h,"[]"))&&(w=U.toArray(x)))return h=R1(h),w.forEach(function(j,y){!(U.isUndefined(j)||j===null)&&t.append(a===!0?Bg([h],y,s):a===null?h:h+"[]",d(j))}),!1}return Rf(x)?!0:(t.append(Bg(v,h,s),d(x)),!1)}const f=[],m=Object.assign(LC,{defaultVisitor:u,convertValue:d,isVisitable:Rf});function b(x,h){if(!U.isUndefined(x)){if(f.indexOf(x)!==-1)throw Error("Circular reference detected in "+h.join("."));f.push(x),U.forEach(x,function(w,g){(!(U.isUndefined(w)||w===null)&&i.call(t,w,U.isString(g)?g.trim():g,h,m))===!0&&b(w,h?h.concat(g):[g])}),f.pop()}}if(!U.isObject(e))throw new TypeError("data must be an object");return b(e),t}function Ug(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(o){return t[o]})}function cm(e,t){this._pairs=[],e&&Xd(e,this,t)}const M1=cm.prototype;M1.append=function(t,r){this._pairs.push([t,r])};M1.toString=function(t){const r=t?function(o){return t.call(this,o,Ug)}:Ug;return this._pairs.map(function(i){return r(i[0])+"="+r(i[1])},"").join("&")};function IC(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function $1(e,t,r){if(!t)return e;const o=r&&r.encode||IC,i=r&&r.serialize;let s;if(i?s=i(t,r):s=U.isURLSearchParams(t)?t.toString():new cm(t,r).toString(o),s){const a=e.indexOf("#");a!==-1&&(e=e.slice(0,a)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class AC{constructor(){this.handlers=[]}use(t,r,o){return this.handlers.push({fulfilled:t,rejected:r,synchronous:o?o.synchronous:!1,runWhen:o?o.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){U.forEach(this.handlers,function(o){o!==null&&t(o)})}}const Wg=AC,L1={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},DC=typeof URLSearchParams<"u"?URLSearchParams:cm,FC=typeof FormData<"u"?FormData:null,BC=typeof Blob<"u"?Blob:null,UC={isBrowser:!0,classes:{URLSearchParams:DC,FormData:FC,Blob:BC},protocols:["http","https","file","blob","url","data"]},I1=typeof window<"u"&&typeof document<"u",WC=(e=>I1&&["ReactNative","NativeScript","NS"].indexOf(e)<0)(typeof navigator<"u"&&navigator.product),HC=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),VC=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:I1,hasStandardBrowserEnv:WC,hasStandardBrowserWebWorkerEnv:HC},Symbol.toStringTag,{value:"Module"})),mn={...VC,...UC};function qC(e,t){return Xd(e,new mn.classes.URLSearchParams,Object.assign({visitor:function(r,o,i,s){return mn.isNode&&U.isBuffer(r)?(this.append(o,r.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)}},t))}function YC(e){return U.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function KC(e){const t={},r=Object.keys(e);let o;const i=r.length;let s;for(o=0;o<i;o++)s=r[o],t[s]=e[s];return t}function A1(e){function t(r,o,i,s){let a=r[s++];const c=Number.isFinite(+a),l=s>=r.length;return a=!a&&U.isArray(i)?i.length:a,l?(U.hasOwnProp(i,a)?i[a]=[i[a],o]:i[a]=o,!c):((!i[a]||!U.isObject(i[a]))&&(i[a]=[]),t(r,o,i[a],s)&&U.isArray(i[a])&&(i[a]=KC(i[a])),!c)}if(U.isFormData(e)&&U.isFunction(e.entries)){const r={};return U.forEachEntry(e,(o,i)=>{t(YC(o),i,r,0)}),r}return null}function QC(e,t,r){if(U.isString(e))try{return(t||JSON.parse)(e),U.trim(e)}catch(o){if(o.name!=="SyntaxError")throw o}return(r||JSON.stringify)(e)}const dm={transitional:L1,adapter:["xhr","http"],transformRequest:[function(t,r){const o=r.getContentType()||"",i=o.indexOf("application/json")>-1,s=U.isObject(t);if(s&&U.isHTMLForm(t)&&(t=new FormData(t)),U.isFormData(t))return i&&i?JSON.stringify(A1(t)):t;if(U.isArrayBuffer(t)||U.isBuffer(t)||U.isStream(t)||U.isFile(t)||U.isBlob(t))return t;if(U.isArrayBufferView(t))return t.buffer;if(U.isURLSearchParams(t))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(s){if(o.indexOf("application/x-www-form-urlencoded")>-1)return qC(t,this.formSerializer).toString();if((c=U.isFileList(t))||o.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return Xd(c?{"files[]":t}:t,l&&new l,this.formSerializer)}}return s||i?(r.setContentType("application/json",!1),QC(t)):t}],transformResponse:[function(t){const r=this.transitional||dm.transitional,o=r&&r.forcedJSONParsing,i=this.responseType==="json";if(t&&U.isString(t)&&(o&&!this.responseType||i)){const a=!(r&&r.silentJSONParsing)&&i;try{return JSON.parse(t)}catch(c){if(a)throw c.name==="SyntaxError"?$e.from(c,$e.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:mn.classes.FormData,Blob:mn.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};U.forEach(["delete","get","head","post","put","patch"],e=>{dm.headers[e]={}});const um=dm,XC=U.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),GC=e=>{const t={};let r,o,i;return e&&e.split(`
`).forEach(function(a){i=a.indexOf(":"),r=a.substring(0,i).trim().toLowerCase(),o=a.substring(i+1).trim(),!(!r||t[r]&&XC[r])&&(r==="set-cookie"?t[r]?t[r].push(o):t[r]=[o]:t[r]=t[r]?t[r]+", "+o:o)}),t},Hg=Symbol("internals");function bs(e){return e&&String(e).trim().toLowerCase()}function Yl(e){return e===!1||e==null?e:U.isArray(e)?e.map(Yl):String(e)}function ZC(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let o;for(;o=r.exec(e);)t[o[1]]=o[2];return t}const JC=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Xu(e,t,r,o,i){if(U.isFunction(o))return o.call(this,t,r);if(i&&(t=r),!!U.isString(t)){if(U.isString(o))return t.indexOf(o)!==-1;if(U.isRegExp(o))return o.test(t)}}function e3(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,r,o)=>r.toUpperCase()+o)}function t3(e,t){const r=U.toCamelCase(" "+t);["get","set","has"].forEach(o=>{Object.defineProperty(e,o+r,{value:function(i,s,a){return this[o].call(this,t,i,s,a)},configurable:!0})})}class Gd{constructor(t){t&&this.set(t)}set(t,r,o){const i=this;function s(c,l,d){const u=bs(l);if(!u)throw new Error("header name must be a non-empty string");const f=U.findKey(i,u);(!f||i[f]===void 0||d===!0||d===void 0&&i[f]!==!1)&&(i[f||l]=Yl(c))}const a=(c,l)=>U.forEach(c,(d,u)=>s(d,u,l));return U.isPlainObject(t)||t instanceof this.constructor?a(t,r):U.isString(t)&&(t=t.trim())&&!JC(t)?a(GC(t),r):t!=null&&s(r,t,o),this}get(t,r){if(t=bs(t),t){const o=U.findKey(this,t);if(o){const i=this[o];if(!r)return i;if(r===!0)return ZC(i);if(U.isFunction(r))return r.call(this,i,o);if(U.isRegExp(r))return r.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,r){if(t=bs(t),t){const o=U.findKey(this,t);return!!(o&&this[o]!==void 0&&(!r||Xu(this,this[o],o,r)))}return!1}delete(t,r){const o=this;let i=!1;function s(a){if(a=bs(a),a){const c=U.findKey(o,a);c&&(!r||Xu(o,o[c],c,r))&&(delete o[c],i=!0)}}return U.isArray(t)?t.forEach(s):s(t),i}clear(t){const r=Object.keys(this);let o=r.length,i=!1;for(;o--;){const s=r[o];(!t||Xu(this,this[s],s,t,!0))&&(delete this[s],i=!0)}return i}normalize(t){const r=this,o={};return U.forEach(this,(i,s)=>{const a=U.findKey(o,s);if(a){r[a]=Yl(i),delete r[s];return}const c=t?e3(s):String(s).trim();c!==s&&delete r[s],r[c]=Yl(i),o[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const r=Object.create(null);return U.forEach(this,(o,i)=>{o!=null&&o!==!1&&(r[i]=t&&U.isArray(o)?o.join(", "):o)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,r])=>t+": "+r).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...r){const o=new this(t);return r.forEach(i=>o.set(i)),o}static accessor(t){const o=(this[Hg]=this[Hg]={accessors:{}}).accessors,i=this.prototype;function s(a){const c=bs(a);o[c]||(t3(i,a),o[c]=!0)}return U.isArray(t)?t.forEach(s):s(t),this}}Gd.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);U.reduceDescriptors(Gd.prototype,({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(o){this[r]=o}}});U.freezeMethods(Gd);const Tn=Gd;function Gu(e,t){const r=this||um,o=t||r,i=Tn.from(o.headers);let s=o.data;return U.forEach(e,function(c){s=c.call(r,s,i.normalize(),t?t.status:void 0)}),i.normalize(),s}function D1(e){return!!(e&&e.__CANCEL__)}function Ga(e,t,r){$e.call(this,e??"canceled",$e.ERR_CANCELED,t,r),this.name="CanceledError"}U.inherits(Ga,$e,{__CANCEL__:!0});function r3(e,t,r){const o=r.config.validateStatus;!r.status||!o||o(r.status)?e(r):t(new $e("Request failed with status code "+r.status,[$e.ERR_BAD_REQUEST,$e.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r))}const n3=mn.hasStandardBrowserEnv?{write(e,t,r,o,i,s){const a=[e+"="+encodeURIComponent(t)];U.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),U.isString(o)&&a.push("path="+o),U.isString(i)&&a.push("domain="+i),s===!0&&a.push("secure"),document.cookie=a.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function o3(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function i3(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function F1(e,t){return e&&!o3(t)?i3(e,t):t}const s3=mn.hasStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");let o;function i(s){let a=s;return t&&(r.setAttribute("href",a),a=r.href),r.setAttribute("href",a),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:r.pathname.charAt(0)==="/"?r.pathname:"/"+r.pathname}}return o=i(window.location.href),function(a){const c=U.isString(a)?i(a):a;return c.protocol===o.protocol&&c.host===o.host}}():function(){return function(){return!0}}();function a3(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function l3(e,t){e=e||10;const r=new Array(e),o=new Array(e);let i=0,s=0,a;return t=t!==void 0?t:1e3,function(l){const d=Date.now(),u=o[s];a||(a=d),r[i]=l,o[i]=d;let f=s,m=0;for(;f!==i;)m+=r[f++],f=f%e;if(i=(i+1)%e,i===s&&(s=(s+1)%e),d-a<t)return;const b=u&&d-u;return b?Math.round(m*1e3/b):void 0}}function Vg(e,t){let r=0;const o=l3(50,250);return i=>{const s=i.loaded,a=i.lengthComputable?i.total:void 0,c=s-r,l=o(c),d=s<=a;r=s;const u={loaded:s,total:a,progress:a?s/a:void 0,bytes:c,rate:l||void 0,estimated:l&&a&&d?(a-s)/l:void 0,event:i};u[t?"download":"upload"]=!0,e(u)}}const c3=typeof XMLHttpRequest<"u",d3=c3&&function(e){return new Promise(function(r,o){let i=e.data;const s=Tn.from(e.headers).normalize();let{responseType:a,withXSRFToken:c}=e,l;function d(){e.cancelToken&&e.cancelToken.unsubscribe(l),e.signal&&e.signal.removeEventListener("abort",l)}let u;if(U.isFormData(i)){if(mn.hasStandardBrowserEnv||mn.hasStandardBrowserWebWorkerEnv)s.setContentType(!1);else if((u=s.getContentType())!==!1){const[h,...v]=u?u.split(";").map(w=>w.trim()).filter(Boolean):[];s.setContentType([h||"multipart/form-data",...v].join("; "))}}let f=new XMLHttpRequest;if(e.auth){const h=e.auth.username||"",v=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";s.set("Authorization","Basic "+btoa(h+":"+v))}const m=F1(e.baseURL,e.url);f.open(e.method.toUpperCase(),$1(m,e.params,e.paramsSerializer),!0),f.timeout=e.timeout;function b(){if(!f)return;const h=Tn.from("getAllResponseHeaders"in f&&f.getAllResponseHeaders()),w={data:!a||a==="text"||a==="json"?f.responseText:f.response,status:f.status,statusText:f.statusText,headers:h,config:e,request:f};r3(function(j){r(j),d()},function(j){o(j),d()},w),f=null}if("onloadend"in f?f.onloadend=b:f.onreadystatechange=function(){!f||f.readyState!==4||f.status===0&&!(f.responseURL&&f.responseURL.indexOf("file:")===0)||setTimeout(b)},f.onabort=function(){f&&(o(new $e("Request aborted",$e.ECONNABORTED,e,f)),f=null)},f.onerror=function(){o(new $e("Network Error",$e.ERR_NETWORK,e,f)),f=null},f.ontimeout=function(){let v=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const w=e.transitional||L1;e.timeoutErrorMessage&&(v=e.timeoutErrorMessage),o(new $e(v,w.clarifyTimeoutError?$e.ETIMEDOUT:$e.ECONNABORTED,e,f)),f=null},mn.hasStandardBrowserEnv&&(c&&U.isFunction(c)&&(c=c(e)),c||c!==!1&&s3(m))){const h=e.xsrfHeaderName&&e.xsrfCookieName&&n3.read(e.xsrfCookieName);h&&s.set(e.xsrfHeaderName,h)}i===void 0&&s.setContentType(null),"setRequestHeader"in f&&U.forEach(s.toJSON(),function(v,w){f.setRequestHeader(w,v)}),U.isUndefined(e.withCredentials)||(f.withCredentials=!!e.withCredentials),a&&a!=="json"&&(f.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&f.addEventListener("progress",Vg(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&f.upload&&f.upload.addEventListener("progress",Vg(e.onUploadProgress)),(e.cancelToken||e.signal)&&(l=h=>{f&&(o(!h||h.type?new Ga(null,e,f):h),f.abort(),f=null)},e.cancelToken&&e.cancelToken.subscribe(l),e.signal&&(e.signal.aborted?l():e.signal.addEventListener("abort",l)));const x=a3(m);if(x&&mn.protocols.indexOf(x)===-1){o(new $e("Unsupported protocol "+x+":",$e.ERR_BAD_REQUEST,e));return}f.send(i||null)})},Mf={http:MC,xhr:d3};U.forEach(Mf,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const qg=e=>`- ${e}`,u3=e=>U.isFunction(e)||e===null||e===!1,B1={getAdapter:e=>{e=U.isArray(e)?e:[e];const{length:t}=e;let r,o;const i={};for(let s=0;s<t;s++){r=e[s];let a;if(o=r,!u3(r)&&(o=Mf[(a=String(r)).toLowerCase()],o===void 0))throw new $e(`Unknown adapter '${a}'`);if(o)break;i[a||"#"+s]=o}if(!o){const s=Object.entries(i).map(([c,l])=>`adapter ${c} `+(l===!1?"is not supported by the environment":"is not available in the build"));let a=t?s.length>1?`since :
`+s.map(qg).join(`
`):" "+qg(s[0]):"as no adapter specified";throw new $e("There is no suitable adapter to dispatch the request "+a,"ERR_NOT_SUPPORT")}return o},adapters:Mf};function Zu(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ga(null,e)}function Yg(e){return Zu(e),e.headers=Tn.from(e.headers),e.data=Gu.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),B1.getAdapter(e.adapter||um.adapter)(e).then(function(o){return Zu(e),o.data=Gu.call(e,e.transformResponse,o),o.headers=Tn.from(o.headers),o},function(o){return D1(o)||(Zu(e),o&&o.response&&(o.response.data=Gu.call(e,e.transformResponse,o.response),o.response.headers=Tn.from(o.response.headers))),Promise.reject(o)})}const Kg=e=>e instanceof Tn?e.toJSON():e;function Gi(e,t){t=t||{};const r={};function o(d,u,f){return U.isPlainObject(d)&&U.isPlainObject(u)?U.merge.call({caseless:f},d,u):U.isPlainObject(u)?U.merge({},u):U.isArray(u)?u.slice():u}function i(d,u,f){if(U.isUndefined(u)){if(!U.isUndefined(d))return o(void 0,d,f)}else return o(d,u,f)}function s(d,u){if(!U.isUndefined(u))return o(void 0,u)}function a(d,u){if(U.isUndefined(u)){if(!U.isUndefined(d))return o(void 0,d)}else return o(void 0,u)}function c(d,u,f){if(f in t)return o(d,u);if(f in e)return o(void 0,d)}const l={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c,headers:(d,u)=>i(Kg(d),Kg(u),!0)};return U.forEach(Object.keys(Object.assign({},e,t)),function(u){const f=l[u]||i,m=f(e[u],t[u],u);U.isUndefined(m)&&f!==c||(r[u]=m)}),r}const U1="1.6.2",hm={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{hm[e]=function(o){return typeof o===e||"a"+(t<1?"n ":" ")+e}});const Qg={};hm.transitional=function(t,r,o){function i(s,a){return"[Axios v"+U1+"] Transitional option '"+s+"'"+a+(o?". "+o:"")}return(s,a,c)=>{if(t===!1)throw new $e(i(a," has been removed"+(r?" in "+r:"")),$e.ERR_DEPRECATED);return r&&!Qg[a]&&(Qg[a]=!0,console.warn(i(a," has been deprecated since v"+r+" and will be removed in the near future"))),t?t(s,a,c):!0}};function h3(e,t,r){if(typeof e!="object")throw new $e("options must be an object",$e.ERR_BAD_OPTION_VALUE);const o=Object.keys(e);let i=o.length;for(;i-- >0;){const s=o[i],a=t[s];if(a){const c=e[s],l=c===void 0||a(c,s,e);if(l!==!0)throw new $e("option "+s+" must be "+l,$e.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new $e("Unknown option "+s,$e.ERR_BAD_OPTION)}}const $f={assertOptions:h3,validators:hm},Hn=$f.validators;class Fc{constructor(t){this.defaults=t,this.interceptors={request:new Wg,response:new Wg}}request(t,r){typeof t=="string"?(r=r||{},r.url=t):r=t||{},r=Gi(this.defaults,r);const{transitional:o,paramsSerializer:i,headers:s}=r;o!==void 0&&$f.assertOptions(o,{silentJSONParsing:Hn.transitional(Hn.boolean),forcedJSONParsing:Hn.transitional(Hn.boolean),clarifyTimeoutError:Hn.transitional(Hn.boolean)},!1),i!=null&&(U.isFunction(i)?r.paramsSerializer={serialize:i}:$f.assertOptions(i,{encode:Hn.function,serialize:Hn.function},!0)),r.method=(r.method||this.defaults.method||"get").toLowerCase();let a=s&&U.merge(s.common,s[r.method]);s&&U.forEach(["delete","get","head","post","put","patch","common"],x=>{delete s[x]}),r.headers=Tn.concat(a,s);const c=[];let l=!0;this.interceptors.request.forEach(function(h){typeof h.runWhen=="function"&&h.runWhen(r)===!1||(l=l&&h.synchronous,c.unshift(h.fulfilled,h.rejected))});const d=[];this.interceptors.response.forEach(function(h){d.push(h.fulfilled,h.rejected)});let u,f=0,m;if(!l){const x=[Yg.bind(this),void 0];for(x.unshift.apply(x,c),x.push.apply(x,d),m=x.length,u=Promise.resolve(r);f<m;)u=u.then(x[f++],x[f++]);return u}m=c.length;let b=r;for(f=0;f<m;){const x=c[f++],h=c[f++];try{b=x(b)}catch(v){h.call(this,v);break}}try{u=Yg.call(this,b)}catch(x){return Promise.reject(x)}for(f=0,m=d.length;f<m;)u=u.then(d[f++],d[f++]);return u}getUri(t){t=Gi(this.defaults,t);const r=F1(t.baseURL,t.url);return $1(r,t.params,t.paramsSerializer)}}U.forEach(["delete","get","head","options"],function(t){Fc.prototype[t]=function(r,o){return this.request(Gi(o||{},{method:t,url:r,data:(o||{}).data}))}});U.forEach(["post","put","patch"],function(t){function r(o){return function(s,a,c){return this.request(Gi(c||{},{method:t,headers:o?{"Content-Type":"multipart/form-data"}:{},url:s,data:a}))}}Fc.prototype[t]=r(),Fc.prototype[t+"Form"]=r(!0)});const Kl=Fc;class fm{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(s){r=s});const o=this;this.promise.then(i=>{if(!o._listeners)return;let s=o._listeners.length;for(;s-- >0;)o._listeners[s](i);o._listeners=null}),this.promise.then=i=>{let s;const a=new Promise(c=>{o.subscribe(c),s=c}).then(i);return a.cancel=function(){o.unsubscribe(s)},a},t(function(s,a,c){o.reason||(o.reason=new Ga(s,a,c),r(o.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const r=this._listeners.indexOf(t);r!==-1&&this._listeners.splice(r,1)}static source(){let t;return{token:new fm(function(i){t=i}),cancel:t}}}const f3=fm;function p3(e){return function(r){return e.apply(null,r)}}function m3(e){return U.isObject(e)&&e.isAxiosError===!0}const Lf={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Lf).forEach(([e,t])=>{Lf[t]=e});const x3=Lf;function W1(e){const t=new Kl(e),r=S1(Kl.prototype.request,t);return U.extend(r,Kl.prototype,t,{allOwnKeys:!0}),U.extend(r,t,null,{allOwnKeys:!0}),r.create=function(i){return W1(Gi(e,i))},r}const Et=W1(um);Et.Axios=Kl;Et.CanceledError=Ga;Et.CancelToken=f3;Et.isCancel=D1;Et.VERSION=U1;Et.toFormData=Xd;Et.AxiosError=$e;Et.Cancel=Et.CanceledError;Et.all=function(t){return Promise.all(t)};Et.spread=p3;Et.isAxiosError=m3;Et.mergeConfig=Gi;Et.AxiosHeaders=Tn;Et.formToJSON=e=>A1(U.isHTMLForm(e)?new FormData(e):e);Et.getAdapter=B1.getAdapter;Et.HttpStatusCode=x3;Et.default=Et;const Z=Et;function pm(e){return He({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"}}]})(e)}function g3(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"}}]})(e)}function Lo(e){return He({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"}}]})(e)}function Io(e){return He({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"}}]})(e)}function ki(e){return He({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"}}]})(e)}function Ao(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"}}]})(e)}function v3(e){return He({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"}}]})(e)}function H1(e){return He({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"}}]})(e)}function Go(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"}}]})(e)}function ln(e){return He({tag:"svg",attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"}}]})(e)}function cn(e){return He({tag:"svg",attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"}}]})(e)}function V1(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"}}]})(e)}function w3(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 416c114.9 0 208-93.1 208-208S370.9 0 256 0 48 93.1 48 208s93.1 208 208 208zM233.8 97.4V80.6c0-9.2 7.4-16.6 16.6-16.6h11.1c9.2 0 16.6 7.4 16.6 16.6v17c15.5.8 30.5 6.1 43 15.4 5.6 4.1 6.2 12.3 1.2 17.1L306 145.6c-3.8 3.7-9.5 3.8-14 1-5.4-3.4-11.4-5.1-17.8-5.1h-38.9c-9 0-16.3 8.2-16.3 18.3 0 8.2 5 15.5 12.1 17.6l62.3 18.7c25.7 7.7 43.7 32.4 43.7 60.1 0 34-26.4 61.5-59.1 62.4v16.8c0 9.2-7.4 16.6-16.6 16.6h-11.1c-9.2 0-16.6-7.4-16.6-16.6v-17c-15.5-.8-30.5-6.1-43-15.4-5.6-4.1-6.2-12.3-1.2-17.1l16.3-15.5c3.8-3.7 9.5-3.8 14-1 5.4 3.4 11.4 5.1 17.8 5.1h38.9c9 0 16.3-8.2 16.3-18.3 0-8.2-5-15.5-12.1-17.6l-62.3-18.7c-25.7-7.7-43.7-32.4-43.7-60.1.1-34 26.4-61.5 59.1-62.4zM480 352h-32.5c-19.6 26-44.6 47.7-73 64h63.8c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8h63.8c-28.4-16.3-53.3-38-73-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32z"}}]})(e)}function Bc(e){return He({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"}}]})(e)}function mm(e){return He({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"}}]})(e)}function an(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"}}]})(e)}function y3(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"}}]})(e)}function yo(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"}}]})(e)}function q1(e){return He({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"}}]})(e)}function An(e){return He({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"}}]})(e)}function b3(e){return He({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"}}]})(e)}function Xg(e){return He({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"}}]})(e)}function j3(e){return He({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"}}]})(e)}const ss=({showPopup:e,onClose:t})=>{const r=de();return e&&n.jsx(S3,{children:n.jsxs(k3,{children:[n.jsx(N3,{onClick:t,children:"×"}),n.jsx("h2",{children:"Welcome to PlaymoodTV!"}),n.jsx("p",{children:"Join us to explore a world of amazing content. Log in or register to get started."}),n.jsxs(C3,{children:[n.jsx(_3,{onClick:()=>r("/login"),children:"Log In"}),n.jsx(E3,{onClick:()=>r("/register"),children:"Register"})]})]})})},S3=S.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1052;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`,k3=S.div`
  text-align: center;
`,N3=S.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`,C3=S.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`,Y1=S.button`
  padding: 10px 20px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: grey;
  }
`,_3=S(Y1)`
  margin-bottom: 10px;

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`,E3=S(Y1)``;function en(e){for(var t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];throw Error("[Immer] minified error nr: "+e+(r.length?" "+r.map(function(i){return"'"+i+"'"}).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function bo(e){return!!e&&!!e[lt]}function Dn(e){var t;return!!e&&(function(r){if(!r||typeof r!="object")return!1;var o=Object.getPrototypeOf(r);if(o===null)return!0;var i=Object.hasOwnProperty.call(o,"constructor")&&o.constructor;return i===Object||typeof i=="function"&&Function.toString.call(i)===I3}(e)||Array.isArray(e)||!!e[n0]||!!(!((t=e.constructor)===null||t===void 0)&&t[n0])||xm(e)||gm(e))}function Zo(e,t,r){r===void 0&&(r=!1),as(e)===0?(r?Object.keys:Mi)(e).forEach(function(o){r&&typeof o=="symbol"||t(o,e[o],e)}):e.forEach(function(o,i){return t(i,o,e)})}function as(e){var t=e[lt];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:xm(e)?2:gm(e)?3:0}function Ri(e,t){return as(e)===2?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function T3(e,t){return as(e)===2?e.get(t):e[t]}function K1(e,t,r){var o=as(e);o===2?e.set(t,r):o===3?e.add(r):e[t]=r}function Q1(e,t){return e===t?e!==0||1/e==1/t:e!=e&&t!=t}function xm(e){return $3&&e instanceof Map}function gm(e){return L3&&e instanceof Set}function Po(e){return e.o||e.t}function vm(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=G1(e);delete t[lt];for(var r=Mi(t),o=0;o<r.length;o++){var i=r[o],s=t[i];s.writable===!1&&(s.writable=!0,s.configurable=!0),(s.get||s.set)&&(t[i]={configurable:!0,writable:!0,enumerable:s.enumerable,value:e[i]})}return Object.create(Object.getPrototypeOf(e),t)}function wm(e,t){return t===void 0&&(t=!1),ym(e)||bo(e)||!Dn(e)||(as(e)>1&&(e.set=e.add=e.clear=e.delete=P3),Object.freeze(e),t&&Zo(e,function(r,o){return wm(o,!0)},!0)),e}function P3(){en(2)}function ym(e){return e==null||typeof e!="object"||Object.isFrozen(e)}function vn(e){var t=Ff[e];return t||en(18,e),t}function O3(e,t){Ff[e]||(Ff[e]=t)}function If(){return Ma}function Ju(e,t){t&&(vn("Patches"),e.u=[],e.s=[],e.v=t)}function Uc(e){Af(e),e.p.forEach(z3),e.p=null}function Af(e){e===Ma&&(Ma=e.l)}function Gg(e){return Ma={p:[],l:Ma,h:e,m:!0,_:0}}function z3(e){var t=e[lt];t.i===0||t.i===1?t.j():t.g=!0}function eh(e,t){t._=t.p.length;var r=t.p[0],o=e!==void 0&&e!==r;return t.h.O||vn("ES5").S(t,e,o),o?(r[lt].P&&(Uc(t),en(4)),Dn(e)&&(e=Wc(t,e),t.l||Hc(t,e)),t.u&&vn("Patches").M(r[lt].t,e,t.u,t.s)):e=Wc(t,r,[]),Uc(t),t.u&&t.v(t.u,t.s),e!==X1?e:void 0}function Wc(e,t,r){if(ym(t))return t;var o=t[lt];if(!o)return Zo(t,function(c,l){return Zg(e,o,t,c,l,r)},!0),t;if(o.A!==e)return t;if(!o.P)return Hc(e,o.t,!0),o.t;if(!o.I){o.I=!0,o.A._--;var i=o.i===4||o.i===5?o.o=vm(o.k):o.o,s=i,a=!1;o.i===3&&(s=new Set(i),i.clear(),a=!0),Zo(s,function(c,l){return Zg(e,o,i,c,l,r,a)}),Hc(e,i,!1),r&&e.u&&vn("Patches").N(o,r,e.u,e.s)}return o.o}function Zg(e,t,r,o,i,s,a){if(bo(i)){var c=Wc(e,i,s&&t&&t.i!==3&&!Ri(t.R,o)?s.concat(o):void 0);if(K1(r,o,c),!bo(c))return;e.m=!1}else a&&r.add(i);if(Dn(i)&&!ym(i)){if(!e.h.D&&e._<1)return;Wc(e,i),t&&t.A.l||Hc(e,i)}}function Hc(e,t,r){r===void 0&&(r=!1),!e.l&&e.h.D&&e.m&&wm(t,r)}function th(e,t){var r=e[lt];return(r?Po(r):e)[t]}function Jg(e,t){if(t in e)for(var r=Object.getPrototypeOf(e);r;){var o=Object.getOwnPropertyDescriptor(r,t);if(o)return o;r=Object.getPrototypeOf(r)}}function to(e){e.P||(e.P=!0,e.l&&to(e.l))}function rh(e){e.o||(e.o=vm(e.t))}function Df(e,t,r){var o=xm(t)?vn("MapSet").F(t,r):gm(t)?vn("MapSet").T(t,r):e.O?function(i,s){var a=Array.isArray(i),c={i:a?1:0,A:s?s.A:If(),P:!1,I:!1,R:{},l:s,t:i,k:null,o:null,j:null,C:!1},l=c,d=$a;a&&(l=[c],d=Os);var u=Proxy.revocable(l,d),f=u.revoke,m=u.proxy;return c.k=m,c.j=f,m}(t,r):vn("ES5").J(t,r);return(r?r.A:If()).p.push(o),o}function R3(e){return bo(e)||en(22,e),function t(r){if(!Dn(r))return r;var o,i=r[lt],s=as(r);if(i){if(!i.P&&(i.i<4||!vn("ES5").K(i)))return i.t;i.I=!0,o=e0(r,s),i.I=!1}else o=e0(r,s);return Zo(o,function(a,c){i&&T3(i.t,a)===c||K1(o,a,t(c))}),s===3?new Set(o):o}(e)}function e0(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return vm(e)}function M3(){function e(s,a){var c=i[s];return c?c.enumerable=a:i[s]=c={configurable:!0,enumerable:a,get:function(){var l=this[lt];return $a.get(l,s)},set:function(l){var d=this[lt];$a.set(d,s,l)}},c}function t(s){for(var a=s.length-1;a>=0;a--){var c=s[a][lt];if(!c.P)switch(c.i){case 5:o(c)&&to(c);break;case 4:r(c)&&to(c)}}}function r(s){for(var a=s.t,c=s.k,l=Mi(c),d=l.length-1;d>=0;d--){var u=l[d];if(u!==lt){var f=a[u];if(f===void 0&&!Ri(a,u))return!0;var m=c[u],b=m&&m[lt];if(b?b.t!==f:!Q1(m,f))return!0}}var x=!!a[lt];return l.length!==Mi(a).length+(x?0:1)}function o(s){var a=s.k;if(a.length!==s.t.length)return!0;var c=Object.getOwnPropertyDescriptor(a,a.length-1);if(c&&!c.get)return!0;for(var l=0;l<a.length;l++)if(!a.hasOwnProperty(l))return!0;return!1}var i={};O3("ES5",{J:function(s,a){var c=Array.isArray(s),l=function(u,f){if(u){for(var m=Array(f.length),b=0;b<f.length;b++)Object.defineProperty(m,""+b,e(b,!0));return m}var x=G1(f);delete x[lt];for(var h=Mi(x),v=0;v<h.length;v++){var w=h[v];x[w]=e(w,u||!!x[w].enumerable)}return Object.create(Object.getPrototypeOf(f),x)}(c,s),d={i:c?5:4,A:a?a.A:If(),P:!1,I:!1,R:{},l:a,t:s,k:l,o:null,g:!1,C:!1};return Object.defineProperty(l,lt,{value:d,writable:!0}),l},S:function(s,a,c){c?bo(a)&&a[lt].A===s&&t(s.p):(s.u&&function l(d){if(d&&typeof d=="object"){var u=d[lt];if(u){var f=u.t,m=u.k,b=u.R,x=u.i;if(x===4)Zo(m,function(j){j!==lt&&(f[j]!==void 0||Ri(f,j)?b[j]||l(m[j]):(b[j]=!0,to(u)))}),Zo(f,function(j){m[j]!==void 0||Ri(m,j)||(b[j]=!1,to(u))});else if(x===5){if(o(u)&&(to(u),b.length=!0),m.length<f.length)for(var h=m.length;h<f.length;h++)b[h]=!1;else for(var v=f.length;v<m.length;v++)b[v]=!0;for(var w=Math.min(m.length,f.length),g=0;g<w;g++)m.hasOwnProperty(g)||(b[g]=!0),b[g]===void 0&&l(m[g])}}}}(s.p[0]),t(s.p))},K:function(s){return s.i===4?r(s):o(s)}})}var t0,Ma,bm=typeof Symbol<"u"&&typeof Symbol("x")=="symbol",$3=typeof Map<"u",L3=typeof Set<"u",r0=typeof Proxy<"u"&&Proxy.revocable!==void 0&&typeof Reflect<"u",X1=bm?Symbol.for("immer-nothing"):((t0={})["immer-nothing"]=!0,t0),n0=bm?Symbol.for("immer-draftable"):"__$immer_draftable",lt=bm?Symbol.for("immer-state"):"__$immer_state",I3=""+Object.prototype.constructor,Mi=typeof Reflect<"u"&&Reflect.ownKeys?Reflect.ownKeys:Object.getOwnPropertySymbols!==void 0?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,G1=Object.getOwnPropertyDescriptors||function(e){var t={};return Mi(e).forEach(function(r){t[r]=Object.getOwnPropertyDescriptor(e,r)}),t},Ff={},$a={get:function(e,t){if(t===lt)return e;var r=Po(e);if(!Ri(r,t))return function(i,s,a){var c,l=Jg(s,a);return l?"value"in l?l.value:(c=l.get)===null||c===void 0?void 0:c.call(i.k):void 0}(e,r,t);var o=r[t];return e.I||!Dn(o)?o:o===th(e.t,t)?(rh(e),e.o[t]=Df(e.A.h,o,e)):o},has:function(e,t){return t in Po(e)},ownKeys:function(e){return Reflect.ownKeys(Po(e))},set:function(e,t,r){var o=Jg(Po(e),t);if(o!=null&&o.set)return o.set.call(e.k,r),!0;if(!e.P){var i=th(Po(e),t),s=i==null?void 0:i[lt];if(s&&s.t===r)return e.o[t]=r,e.R[t]=!1,!0;if(Q1(r,i)&&(r!==void 0||Ri(e.t,t)))return!0;rh(e),to(e)}return e.o[t]===r&&(r!==void 0||t in e.o)||Number.isNaN(r)&&Number.isNaN(e.o[t])||(e.o[t]=r,e.R[t]=!0),!0},deleteProperty:function(e,t){return th(e.t,t)!==void 0||t in e.t?(e.R[t]=!1,rh(e),to(e)):delete e.R[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var r=Po(e),o=Reflect.getOwnPropertyDescriptor(r,t);return o&&{writable:!0,configurable:e.i!==1||t!=="length",enumerable:o.enumerable,value:r[t]}},defineProperty:function(){en(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){en(12)}},Os={};Zo($a,function(e,t){Os[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}}),Os.deleteProperty=function(e,t){return Os.set.call(this,e,t,void 0)},Os.set=function(e,t,r){return $a.set.call(this,e[0],t,r,e[0])};var A3=function(){function e(r){var o=this;this.O=r0,this.D=!0,this.produce=function(i,s,a){if(typeof i=="function"&&typeof s!="function"){var c=s;s=i;var l=o;return function(h){var v=this;h===void 0&&(h=c);for(var w=arguments.length,g=Array(w>1?w-1:0),j=1;j<w;j++)g[j-1]=arguments[j];return l.produce(h,function(y){var k;return(k=s).call.apply(k,[v,y].concat(g))})}}var d;if(typeof s!="function"&&en(6),a!==void 0&&typeof a!="function"&&en(7),Dn(i)){var u=Gg(o),f=Df(o,i,void 0),m=!0;try{d=s(f),m=!1}finally{m?Uc(u):Af(u)}return typeof Promise<"u"&&d instanceof Promise?d.then(function(h){return Ju(u,a),eh(h,u)},function(h){throw Uc(u),h}):(Ju(u,a),eh(d,u))}if(!i||typeof i!="object"){if((d=s(i))===void 0&&(d=i),d===X1&&(d=void 0),o.D&&wm(d,!0),a){var b=[],x=[];vn("Patches").M(i,d,b,x),a(b,x)}return d}en(21,i)},this.produceWithPatches=function(i,s){if(typeof i=="function")return function(d){for(var u=arguments.length,f=Array(u>1?u-1:0),m=1;m<u;m++)f[m-1]=arguments[m];return o.produceWithPatches(d,function(b){return i.apply(void 0,[b].concat(f))})};var a,c,l=o.produce(i,s,function(d,u){a=d,c=u});return typeof Promise<"u"&&l instanceof Promise?l.then(function(d){return[d,a,c]}):[l,a,c]},typeof(r==null?void 0:r.useProxies)=="boolean"&&this.setUseProxies(r.useProxies),typeof(r==null?void 0:r.autoFreeze)=="boolean"&&this.setAutoFreeze(r.autoFreeze)}var t=e.prototype;return t.createDraft=function(r){Dn(r)||en(8),bo(r)&&(r=R3(r));var o=Gg(this),i=Df(this,r,void 0);return i[lt].C=!0,Af(o),i},t.finishDraft=function(r,o){var i=r&&r[lt],s=i.A;return Ju(s,o),eh(void 0,s)},t.setAutoFreeze=function(r){this.D=r},t.setUseProxies=function(r){r&&!r0&&en(20),this.O=r},t.applyPatches=function(r,o){var i;for(i=o.length-1;i>=0;i--){var s=o[i];if(s.path.length===0&&s.op==="replace"){r=s.value;break}}i>-1&&(o=o.slice(i+1));var a=vn("Patches").$;return bo(r)?a(r,o):this.produce(r,function(c){return a(c,o)})},e}(),Nr=new A3,Z1=Nr.produce;Nr.produceWithPatches.bind(Nr);Nr.setAutoFreeze.bind(Nr);Nr.setUseProxies.bind(Nr);Nr.applyPatches.bind(Nr);Nr.createDraft.bind(Nr);Nr.finishDraft.bind(Nr);function La(e){"@babel/helpers - typeof";return La=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},La(e)}function D3(e,t){if(La(e)!=="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var o=r.call(e,t||"default");if(La(o)!=="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function F3(e){var t=D3(e,"string");return La(t)==="symbol"?t:String(t)}function B3(e,t,r){return t=F3(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,o)}return r}function i0(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?o0(Object(r),!0).forEach(function(o){B3(e,o,r[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o0(Object(r)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(r,o))})}return e}function Qt(e){return"Minified Redux error #"+e+"; visit https://redux.js.org/Errors?code="+e+" for the full message or use the non-minified dev environment for full errors. "}var s0=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}(),nh=function(){return Math.random().toString(36).substring(7).split("").join(".")},Vc={INIT:"@@redux/INIT"+nh(),REPLACE:"@@redux/REPLACE"+nh(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+nh()}};function U3(e){if(typeof e!="object"||e===null)return!1;for(var t=e;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function J1(e,t,r){var o;if(typeof t=="function"&&typeof r=="function"||typeof r=="function"&&typeof arguments[3]=="function")throw new Error(Qt(0));if(typeof t=="function"&&typeof r>"u"&&(r=t,t=void 0),typeof r<"u"){if(typeof r!="function")throw new Error(Qt(1));return r(J1)(e,t)}if(typeof e!="function")throw new Error(Qt(2));var i=e,s=t,a=[],c=a,l=!1;function d(){c===a&&(c=a.slice())}function u(){if(l)throw new Error(Qt(3));return s}function f(h){if(typeof h!="function")throw new Error(Qt(4));if(l)throw new Error(Qt(5));var v=!0;return d(),c.push(h),function(){if(v){if(l)throw new Error(Qt(6));v=!1,d();var g=c.indexOf(h);c.splice(g,1),a=null}}}function m(h){if(!U3(h))throw new Error(Qt(7));if(typeof h.type>"u")throw new Error(Qt(8));if(l)throw new Error(Qt(9));try{l=!0,s=i(s,h)}finally{l=!1}for(var v=a=c,w=0;w<v.length;w++){var g=v[w];g()}return h}function b(h){if(typeof h!="function")throw new Error(Qt(10));i=h,m({type:Vc.REPLACE})}function x(){var h,v=f;return h={subscribe:function(g){if(typeof g!="object"||g===null)throw new Error(Qt(11));function j(){g.next&&g.next(u())}j();var y=v(j);return{unsubscribe:y}}},h[s0]=function(){return this},h}return m({type:Vc.INIT}),o={dispatch:m,subscribe:f,getState:u,replaceReducer:b},o[s0]=x,o}function W3(e){Object.keys(e).forEach(function(t){var r=e[t],o=r(void 0,{type:Vc.INIT});if(typeof o>"u")throw new Error(Qt(12));if(typeof r(void 0,{type:Vc.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(Qt(13))})}function H3(e){for(var t=Object.keys(e),r={},o=0;o<t.length;o++){var i=t[o];typeof e[i]=="function"&&(r[i]=e[i])}var s=Object.keys(r),a;try{W3(r)}catch(c){a=c}return function(l,d){if(l===void 0&&(l={}),a)throw a;for(var u=!1,f={},m=0;m<s.length;m++){var b=s[m],x=r[b],h=l[b],v=x(h,d);if(typeof v>"u")throw d&&d.type,new Error(Qt(14));f[b]=v,u=u||v!==h}return u=u||s.length!==Object.keys(l).length,u?f:l}}function qc(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.length===0?function(o){return o}:t.length===1?t[0]:t.reduce(function(o,i){return function(){return o(i.apply(void 0,arguments))}})}function V3(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(o){return function(){var i=o.apply(void 0,arguments),s=function(){throw new Error(Qt(15))},a={getState:i.getState,dispatch:function(){return s.apply(void 0,arguments)}},c=t.map(function(l){return l(a)});return s=qc.apply(void 0,c)(i.dispatch),i0(i0({},i),{},{dispatch:s})}}}function eb(e){var t=function(o){var i=o.dispatch,s=o.getState;return function(a){return function(c){return typeof c=="function"?c(i,s,e):a(c)}}};return t}var tb=eb();tb.withExtraArgument=eb;const a0=tb;var rb=globalThis&&globalThis.__extends||function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,i){o.__proto__=i}||function(o,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(o[s]=i[s])},e(t,r)};return function(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");e(t,r);function o(){this.constructor=t}t.prototype=r===null?Object.create(r):(o.prototype=r.prototype,new o)}}(),q3=globalThis&&globalThis.__generator||function(e,t){var r={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},o,i,s,a;return a={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function c(d){return function(u){return l([d,u])}}function l(d){if(o)throw new TypeError("Generator is already executing.");for(;r;)try{if(o=1,i&&(s=d[0]&2?i.return:d[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,d[1])).done)return s;switch(i=0,s&&(d=[d[0]&2,s.value]),d[0]){case 0:case 1:s=d;break;case 4:return r.label++,{value:d[1],done:!1};case 5:r.label++,i=d[1],d=[0];continue;case 7:d=r.ops.pop(),r.trys.pop();continue;default:if(s=r.trys,!(s=s.length>0&&s[s.length-1])&&(d[0]===6||d[0]===2)){r=0;continue}if(d[0]===3&&(!s||d[1]>s[0]&&d[1]<s[3])){r.label=d[1];break}if(d[0]===6&&r.label<s[1]){r.label=s[1],s=d;break}if(s&&r.label<s[2]){r.label=s[2],r.ops.push(d);break}s[2]&&r.ops.pop(),r.trys.pop();continue}d=t.call(e,r)}catch(u){d=[6,u],i=0}finally{o=s=0}if(d[0]&5)throw d[1];return{value:d[0]?d[1]:void 0,done:!0}}},Zi=globalThis&&globalThis.__spreadArray||function(e,t){for(var r=0,o=t.length,i=e.length;r<o;r++,i++)e[i]=t[r];return e},Y3=Object.defineProperty,K3=Object.defineProperties,Q3=Object.getOwnPropertyDescriptors,l0=Object.getOwnPropertySymbols,X3=Object.prototype.hasOwnProperty,G3=Object.prototype.propertyIsEnumerable,c0=function(e,t,r){return t in e?Y3(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r},mo=function(e,t){for(var r in t||(t={}))X3.call(t,r)&&c0(e,r,t[r]);if(l0)for(var o=0,i=l0(t);o<i.length;o++){var r=i[o];G3.call(t,r)&&c0(e,r,t[r])}return e},oh=function(e,t){return K3(e,Q3(t))},Z3=function(e,t,r){return new Promise(function(o,i){var s=function(l){try{c(r.next(l))}catch(d){i(d)}},a=function(l){try{c(r.throw(l))}catch(d){i(d)}},c=function(l){return l.done?o(l.value):Promise.resolve(l.value).then(s,a)};c((r=r.apply(e,t)).next())})},J3=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?qc:qc.apply(null,arguments)};function e_(e){if(typeof e!="object"||e===null)return!1;var t=Object.getPrototypeOf(e);if(t===null)return!0;for(var r=t;Object.getPrototypeOf(r)!==null;)r=Object.getPrototypeOf(r);return t===r}function xo(e,t){function r(){for(var o=[],i=0;i<arguments.length;i++)o[i]=arguments[i];if(t){var s=t.apply(void 0,o);if(!s)throw new Error("prepareAction did not return an object");return mo(mo({type:e,payload:s.payload},"meta"in s&&{meta:s.meta}),"error"in s&&{error:s.error})}return{type:e,payload:o[0]}}return r.toString=function(){return""+e},r.type=e,r.match=function(o){return o.type===e},r}var t_=function(e){rb(t,e);function t(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];var i=e.apply(this,r)||this;return Object.setPrototypeOf(i,t.prototype),i}return Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.concat=function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];return e.prototype.concat.apply(this,r)},t.prototype.prepend=function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];return r.length===1&&Array.isArray(r[0])?new(t.bind.apply(t,Zi([void 0],r[0].concat(this)))):new(t.bind.apply(t,Zi([void 0],r.concat(this))))},t}(Array),r_=function(e){rb(t,e);function t(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];var i=e.apply(this,r)||this;return Object.setPrototypeOf(i,t.prototype),i}return Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.concat=function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];return e.prototype.concat.apply(this,r)},t.prototype.prepend=function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];return r.length===1&&Array.isArray(r[0])?new(t.bind.apply(t,Zi([void 0],r[0].concat(this)))):new(t.bind.apply(t,Zi([void 0],r.concat(this))))},t}(Array);function Bf(e){return Dn(e)?Z1(e,function(){}):e}function n_(e){return typeof e=="boolean"}function o_(){return function(t){return i_(t)}}function i_(e){e===void 0&&(e={});var t=e.thunk,r=t===void 0?!0:t;e.immutableCheck,e.serializableCheck,e.actionCreatorCheck;var o=new t_;return r&&(n_(r)?o.push(a0):o.push(a0.withExtraArgument(r.extraArgument))),o}var s_=!0;function a_(e){var t=o_(),r=e||{},o=r.reducer,i=o===void 0?void 0:o,s=r.middleware,a=s===void 0?t():s,c=r.devTools,l=c===void 0?!0:c,d=r.preloadedState,u=d===void 0?void 0:d,f=r.enhancers,m=f===void 0?void 0:f,b;if(typeof i=="function")b=i;else if(e_(i))b=H3(i);else throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');var x=a;typeof x=="function"&&(x=x(t));var h=V3.apply(void 0,x),v=qc;l&&(v=J3(mo({trace:!s_},typeof l=="object"&&l)));var w=new r_(h),g=w;Array.isArray(m)?g=Zi([h],m):typeof m=="function"&&(g=m(w));var j=v.apply(void 0,g);return J1(b,u,j)}function nb(e){var t={},r=[],o,i={addCase:function(s,a){var c=typeof s=="string"?s:s.type;if(!c)throw new Error("`builder.addCase` cannot be called with an empty action type");if(c in t)throw new Error("`builder.addCase` cannot be called with two reducers for the same action type");return t[c]=a,i},addMatcher:function(s,a){return r.push({matcher:s,reducer:a}),i},addDefaultCase:function(s){return o=s,i}};return e(i),[t,r,o]}function l_(e){return typeof e=="function"}function c_(e,t,r,o){r===void 0&&(r=[]);var i=typeof t=="function"?nb(t):[t,r,o],s=i[0],a=i[1],c=i[2],l;if(l_(e))l=function(){return Bf(e())};else{var d=Bf(e);l=function(){return d}}function u(f,m){f===void 0&&(f=l());var b=Zi([s[m.type]],a.filter(function(x){var h=x.matcher;return h(m)}).map(function(x){var h=x.reducer;return h}));return b.filter(function(x){return!!x}).length===0&&(b=[c]),b.reduce(function(x,h){if(h)if(bo(x)){var v=x,w=h(v,m);return w===void 0?x:w}else{if(Dn(x))return Z1(x,function(g){return h(g,m)});var w=h(x,m);if(w===void 0){if(x===null)return x;throw Error("A case reducer on a non-draftable value must not return undefined")}return w}return x},f)}return u.getInitialState=l,u}function d_(e,t){return e+"/"+t}function u_(e){var t=e.name;if(!t)throw new Error("`name` is a required option for createSlice");typeof process<"u";var r=typeof e.initialState=="function"?e.initialState:Bf(e.initialState),o=e.reducers||{},i=Object.keys(o),s={},a={},c={};i.forEach(function(u){var f=o[u],m=d_(t,u),b,x;"reducer"in f?(b=f.reducer,x=f.prepare):b=f,s[u]=b,a[m]=b,c[u]=x?xo(m,x):xo(m)});function l(){var u=typeof e.extraReducers=="function"?nb(e.extraReducers):[e.extraReducers],f=u[0],m=f===void 0?{}:f,b=u[1],x=b===void 0?[]:b,h=u[2],v=h===void 0?void 0:h,w=mo(mo({},m),a);return c_(r,function(g){for(var j in w)g.addCase(j,w[j]);for(var y=0,k=x;y<k.length;y++){var _=k[y];g.addMatcher(_.matcher,_.reducer)}v&&g.addDefaultCase(v)})}var d;return{name:t,reducer:function(u,f){return d||(d=l()),d(u,f)},actions:c,caseReducers:s,getInitialState:function(){return d||(d=l()),d.getInitialState()}}}var h_="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",f_=function(e){e===void 0&&(e=21);for(var t="",r=e;r--;)t+=h_[Math.random()*64|0];return t},p_=["name","message","stack","code"],ih=function(){function e(t,r){this.payload=t,this.meta=r}return e}(),d0=function(){function e(t,r){this.payload=t,this.meta=r}return e}(),m_=function(e){if(typeof e=="object"&&e!==null){for(var t={},r=0,o=p_;r<o.length;r++){var i=o[r];typeof e[i]=="string"&&(t[i]=e[i])}return t}return{message:String(e)}},Un=function(){function e(t,r,o){var i=xo(t+"/fulfilled",function(d,u,f,m){return{payload:d,meta:oh(mo({},m||{}),{arg:f,requestId:u,requestStatus:"fulfilled"})}}),s=xo(t+"/pending",function(d,u,f){return{payload:void 0,meta:oh(mo({},f||{}),{arg:u,requestId:d,requestStatus:"pending"})}}),a=xo(t+"/rejected",function(d,u,f,m,b){return{payload:m,error:(o&&o.serializeError||m_)(d||"Rejected"),meta:oh(mo({},b||{}),{arg:f,requestId:u,rejectedWithValue:!!m,requestStatus:"rejected",aborted:(d==null?void 0:d.name)==="AbortError",condition:(d==null?void 0:d.name)==="ConditionError"})}}),c=typeof AbortController<"u"?AbortController:function(){function d(){this.signal={aborted:!1,addEventListener:function(){},dispatchEvent:function(){return!1},onabort:function(){},removeEventListener:function(){},reason:void 0,throwIfAborted:function(){}}}return d.prototype.abort=function(){},d}();function l(d){return function(u,f,m){var b=o!=null&&o.idGenerator?o.idGenerator(d):f_(),x=new c,h;function v(g){h=g,x.abort()}var w=function(){return Z3(this,null,function(){var g,j,y,k,_,E,N;return q3(this,function(T){switch(T.label){case 0:return T.trys.push([0,4,,5]),k=(g=o==null?void 0:o.condition)==null?void 0:g.call(o,d,{getState:f,extra:m}),g_(k)?[4,k]:[3,2];case 1:k=T.sent(),T.label=2;case 2:if(k===!1||x.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};return _=new Promise(function(M,L){return x.signal.addEventListener("abort",function(){return L({name:"AbortError",message:h||"Aborted"})})}),u(s(b,d,(j=o==null?void 0:o.getPendingMeta)==null?void 0:j.call(o,{requestId:b,arg:d},{getState:f,extra:m}))),[4,Promise.race([_,Promise.resolve(r(d,{dispatch:u,getState:f,extra:m,requestId:b,signal:x.signal,abort:v,rejectWithValue:function(M,L){return new ih(M,L)},fulfillWithValue:function(M,L){return new d0(M,L)}})).then(function(M){if(M instanceof ih)throw M;return M instanceof d0?i(M.payload,b,d,M.meta):i(M,b,d)})])];case 3:return y=T.sent(),[3,5];case 4:return E=T.sent(),y=E instanceof ih?a(null,b,d,E.payload,E.meta):a(E,b,d),[3,5];case 5:return N=o&&!o.dispatchConditionRejection&&a.match(y)&&y.meta.condition,N||u(y),[2,y]}})})}();return Object.assign(w,{abort:v,requestId:b,arg:d,unwrap:function(){return w.then(x_)}})}}return Object.assign(l,{pending:s,rejected:a,fulfilled:i,typePrefix:t})}return e.withTypes=function(){return e},e}();function x_(e){if(e.meta&&e.meta.rejectedWithValue)throw e.payload;if(e.error)throw e.error;return e.payload}function g_(e){return e!==null&&typeof e=="object"&&typeof e.then=="function"}var jm="listenerMiddleware";xo(jm+"/add");xo(jm+"/removeAll");xo(jm+"/remove");var u0;typeof queueMicrotask=="function"&&queueMicrotask.bind(typeof window<"u"?window:typeof global<"u"?global:globalThis);M3();const Zd="https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/",v_=async({userId:e,verificationCode:t})=>{var r,o;try{return(await Z.post(`${Zd}verify-email`,{userId:e,verificationCode:t})).data}catch(i){throw console.error("Email verification failed:",i),new Error(((o=(r=i.response)==null?void 0:r.data)==null?void 0:o.message)||"Verification failed")}},w_=async e=>{var t,r;try{return(await Z.post(`${Zd}reverify`,{email:e})).data}catch(o){throw console.error("Resend verification code failed:",o),new Error(((r=(t=o.response)==null?void 0:t.data)==null?void 0:r.message)||"Failed to resend code")}},y_=async e=>{var t,r;try{const o=await Z.post(Zd,e);if(console.log("Register response:",o.data),o.data){const i={...o.data,role:o.data.role||"defaultRole"};localStorage.setItem("user",JSON.stringify(i))}return o.data}catch(o){throw console.error("Registration failed:",((t=o.response)==null?void 0:t.data)||o.message),((r=o.response)==null?void 0:r.data)||"Registration failed"}},b_=async e=>{try{const t=await Z.post(Zd+"login",e);return t.data&&localStorage.setItem("user",JSON.stringify({...t.data,role:t.data.role})),t.data}catch(t){throw console.error("Login failed:",t),t}},j_=()=>{localStorage.removeItem("user")},Za={register:y_,logout:j_,login:b_,verifyEmail:v_,resendVerificationCode:w_},Jd="https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users",ob=(e,t)=>{var o;let r=JSON.parse(localStorage.getItem("user"))||{watchlist:[]};t==="add"?r.watchlist=r.watchlist?[...r.watchlist,e]:[e]:t==="remove"&&(r.watchlist=((o=r.watchlist)==null?void 0:o.filter(i=>i!==e))||[]),localStorage.setItem("user",JSON.stringify(r))},ib=(e,t)=>{var o;let r=JSON.parse(localStorage.getItem("user"))||{like:[]};t==="like"?r.like=r.like?[...r.like,e]:[e]:t==="unlike"&&(r.like=((o=r.like)==null?void 0:o.filter(i=>i!==e))||[]),localStorage.setItem("user",JSON.stringify(r))},S_=async({contentId:e,token:t})=>{var r,o;try{const i=await Z.post(`${Jd}/like`,{contentId:e},{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});return ib(e,"like"),i.data}catch(i){const s=((o=(r=i.response)==null?void 0:r.data)==null?void 0:o.message)||"Failed to like content. Please try again.";throw new Error(s)}},k_=async({contentId:e,token:t})=>{var r,o;try{const i=await Z.post(`${Jd}/unlike`,{contentId:e},{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});return ib(e,"unlike"),i.data}catch(i){const s=((o=(r=i.response)==null?void 0:r.data)==null?void 0:o.message)||"Failed to unlike content. Please try again.";throw new Error(s)}},N_=async({userId:e,contentId:t,token:r})=>{var o,i;try{const s=await Z.post(`${Jd}/watchlist/${e}`,{contentId:t},{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});return ob(t,"add"),s.data}catch(s){const a=((i=(o=s.response)==null?void 0:o.data)==null?void 0:i.message)||"Failed to add to watchlist. Please try again.";throw new Error(a)}},C_=async({userId:e,contentId:t,token:r})=>{var o,i;try{const s=await Z.put(`${Jd}/unwatch/${e}`,{contentId:t},{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});return ob(t,"remove"),s.data}catch(s){const a=((i=(o=s.response)==null?void 0:o.data)==null?void 0:i.message)||"Failed to remove from watchlist. Please try again.";throw new Error(a)}},eu={likeContent:S_,unlikeContent:k_,addToWatchlist:N_,removeFromWatchlist:C_};let Ql=null;try{const e=localStorage.getItem("user");e&&e!=="undefined"&&(Ql=JSON.parse(e))}catch(e){console.error("Error parsing user from localStorage:",e),localStorage.removeItem("user")}const __={user:Ql?{...Ql,role:Ql.role||"defaultRole"}:null,isError:!1,isSuccess:!1,isLoading:!1,message:"",contentError:null},Xl=Un("auth/register",async(e,t)=>{try{const r=await Za.register(e),o={userId:r.userId,email:e.email,role:r.role||"defaultRole",token:r.token};return localStorage.setItem("user",JSON.stringify(o)),o}catch(r){const o=r.response&&r.response.data&&r.response.data.message||r.message||"Unable to connect to the server. Please try again later.";return t.rejectWithValue(o)}}),Gl=Un("auth/login",async(e,t)=>{try{const r=await Za.login(e);return{...r,role:r.role||"defaultRole"}}catch(r){return t.rejectWithValue(r.message||"Login failed")}}),Pn=Un("content/likeContent",async({contentId:e},t)=>{var r;try{const i=(r=t.getState().auth.user)==null?void 0:r.token;if(!i)throw new Error("No token found");return(await eu.likeContent({contentId:e,token:i})).contentId||e}catch(o){return t.rejectWithValue(o.message||"Error liking content")}}),On=Un("content/unlikeContent",async({contentId:e},t)=>{var r;try{const i=(r=t.getState().auth.user)==null?void 0:r.token;if(!i)throw new Error("No token found");return(await eu.unlikeContent({contentId:e,token:i})).contentId||e}catch(o){return t.rejectWithValue(o.message||"Error unliking content")}}),zn=Un("content/addToWatchlist",async({userId:e,contentId:t},r)=>{var o;try{const s=(o=r.getState().auth.user)==null?void 0:o.token;if(!s)throw new Error("No token found");return(await eu.addToWatchlist({userId:e,contentId:t,token:s})).contentId||t}catch(i){return r.rejectWithValue(i.message||"Error adding to watchlist")}}),Rn=Un("content/removeFromWatchlist",async({userId:e,contentId:t},r)=>{var o;try{const s=(o=r.getState().auth.user)==null?void 0:o.token;if(!s)throw new Error("No token found");return(await eu.removeFromWatchlist({userId:e,contentId:t,token:s})).contentId||t}catch(i){return r.rejectWithValue(i.message||"Error removing from watchlist")}}),ls=Un("auth/logout",async(e,t)=>{await Za.logout(),t.dispatch(wn()),localStorage.removeItem("user")}),Zl=Un("auth/verify-email",async({userId:e,verificationCode:t},r)=>{try{return await Za.verifyEmail({userId:e,verificationCode:t})}catch(o){const i=o.response&&o.response.data&&o.response.data.message||o.message||"Verification failed";return r.rejectWithValue(i)}}),Jl=Un("auth/reverify",async(e,t)=>{try{return await Za.resendVerificationCode(e)}catch(r){const o=r.response&&r.response.data&&r.response.data.message||r.message||"Failed to resend code";return t.rejectWithValue(o)}}),sb=u_({name:"auth",initialState:__,reducers:{reset:e=>{e.isLoading=!1,e.isSuccess=!1,e.isError=!1,e.message="",e.contentError=null},updateAuthUser:(e,t)=>{e.user=t.payload}},extraReducers:e=>{e.addCase(Xl.pending,t=>{t.isLoading=!0}).addCase(Xl.fulfilled,(t,r)=>{t.isLoading=!1,t.isSuccess=!0,t.user=r.payload}).addCase(Xl.rejected,(t,r)=>{t.isLoading=!1,t.isError=!0,t.message=r.payload}).addCase(Zl.pending,t=>{t.isLoading=!0}).addCase(Zl.fulfilled,t=>{t.isLoading=!1,t.isSuccess=!0,t.message="Email verified successfully"}).addCase(Zl.rejected,(t,r)=>{t.isLoading=!1,t.isError=!0,t.message=r.payload}).addCase(Jl.pending,t=>{t.isLoading=!0}).addCase(Jl.fulfilled,t=>{t.isLoading=!1,t.isSuccess=!0,t.message="Verification code resent"}).addCase(Jl.rejected,(t,r)=>{t.isLoading=!1,t.isError=!0,t.message=r.payload}).addCase(Gl.pending,t=>{t.isLoading=!0}).addCase(Gl.fulfilled,(t,r)=>{t.isLoading=!1,t.isSuccess=!0,t.user=r.payload}).addCase(Gl.rejected,(t,r)=>{t.isLoading=!1,t.isError=!0,t.message=r.payload,t.user=null}).addCase(ls.fulfilled,t=>{t.user=null,t.isSuccess=!1,t.isError=!1,t.message="",t.contentError=null}).addCase(Pn.pending,t=>{t.isLoading=!0}).addCase(Pn.fulfilled,(t,r)=>{t.isLoading=!1,t.isSuccess=!0,t.user&&t.user.like&&t.user.like.push(r.payload)}).addCase(Pn.rejected,(t,r)=>{t.isLoading=!1,t.contentError=r.payload}).addCase(On.pending,t=>{t.isLoading=!0}).addCase(On.fulfilled,(t,r)=>{t.isLoading=!1,t.isSuccess=!0,t.user&&t.user.like&&(t.user.like=t.user.like.filter(o=>o!==r.payload))}).addCase(On.rejected,(t,r)=>{t.isLoading=!1,t.contentError=r.payload}).addCase(zn.pending,t=>{t.isLoading=!0}).addCase(zn.fulfilled,(t,r)=>{t.isLoading=!1,t.isSuccess=!0,t.user&&t.user.watchlist&&t.user.watchlist.push(r.payload)}).addCase(zn.rejected,(t,r)=>{t.isLoading=!1,t.contentError=r.payload}).addCase(Rn.pending,t=>{t.isLoading=!0}).addCase(Rn.fulfilled,(t,r)=>{t.isLoading=!1,t.isSuccess=!0,t.user&&t.user.watchlist&&(t.user.watchlist=t.user.watchlist.filter(o=>o!==r.payload))}).addCase(Rn.rejected,(t,r)=>{t.isLoading=!1,t.contentError=r.payload})}}),{reset:wn,updateAuthUser:sh}=sb.actions,E_=sb.reducer,ab=Ne.memo(function({img:t,title:r,movie:o,views:i,desc:s,customStyle:a,progress:c,onVideoClick:l}){var je,Se;const[d,u]=p.useState(!1),[f,m]=p.useState(!1),[b,x]=p.useState(!1),[h,v]=p.useState(!1),w=cr(),[g,j]=p.useState([]),[y,k]=p.useState(0),[_,E]=p.useState(!1),{user:N,isError:T,message:M}=xt(G=>G.auth);if(p.useEffect(()=>{const G=()=>{m(window.innerWidth<=768)};return window.addEventListener("resize",G),G(),()=>window.removeEventListener("resize",G)},[]),p.useEffect(()=>{if((async()=>{try{const ae=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");j(ae.data)}catch(ae){console.error("Error fetching data:",ae)}})(),g.length>0){const ae=setInterval(()=>{k(ge=>(ge+1)%g.length)},3e4);return()=>clearInterval(ae)}},[g.length]),T)return n.jsxs("div",{children:["Error: ",M]});const L=()=>{u(!0),v(!0)},I=()=>{u(!1),v(!1)},$=G=>{G.preventDefault(),f?h||(u(!0),v(!0)):l()},V=G=>{G.stopPropagation(),h&&(l(),u(!1),v(!1))},F=async G=>{G.stopPropagation();try{if(N&&N._id&&(q!=null&&q._id)){const ae=q._id;oe?await w(On({userId:N._id,contentId:ae})).unwrap():await w(Pn({userId:N._id,contentId:ae})).unwrap()}else E(!0)}catch(ae){console.error("Error liking/unliking content:",ae)}},D=async G=>{G.stopPropagation();try{if(N&&N._id&&(q!=null&&q._id)){const ae=q._id;J?await w(Rn({userId:N._id,contentId:ae})).unwrap():await w(zn({userId:N._id,contentId:ae})).unwrap()}else E(!0)}catch(ae){console.error("Error adding/removing from watchlist:",ae)}},Y=G=>{G.stopPropagation(),x(!b)},z=G=>{G.stopPropagation();const ae=window.location.href;navigator.clipboard.writeText(ae).then(()=>alert("URL copied to clipboard!")).catch(ge=>console.error("Failed to copy: ",ge))},A=(r==null?void 0:r.slice(0,30))+"...",R=(s==null?void 0:s.slice(0,100))+"...",q=g&&g[y],X=q==null?void 0:q._id,oe=(je=N==null?void 0:N.like)==null?void 0:je.includes(X),J=(Se=N==null?void 0:N.watchlist)==null?void 0:Se.includes(X),xe=o==null?void 0:o.user;return n.jsxs("div",{className:"relative overflow-hidden w-full h-full",style:{maxWidth:"150px",height:"200px"},onMouseEnter:f?null:L,onMouseLeave:f?null:I,children:[n.jsx("div",{className:"absolute top-2 w-full px-1 flex justify-between z-10"}),!d&&!h?n.jsxs(n.Fragment,{children:[n.jsx("img",{className:"w-full h-full object-cover cursor-pointer rounded-md",src:t,alt:r,onClick:$}),n.jsxs("div",{className:"absolute bottom-0 w-full bg-black bg-opacity-70 flex justify-between p-2 gap-2 z-10",children:[n.jsx("h3",{className:"text-white text-sm font-normal leading-5 w-4/5 truncate",style:a||{},children:A}),f&&n.jsx(pm,{className:"text-white w-1/5 h-8 cursor-pointer",onClick:Y})]})]}):n.jsxs("div",{className:"flex flex-col justify-between h-full w-full",children:[n.jsx("div",{className:"h-10 w-full bg-black"}),n.jsx("video",{playsInline:!0,loop:!0,autoPlay:h,muted:!0,className:"w-full h-28 object-cover cursor-pointer rounded-md",onClick:V,children:n.jsx("source",{src:`${(o==null?void 0:o.video)||o}#t=0,15`})}),n.jsxs("div",{className:"h-36 w-full bg-black p-2 flex flex-col gap-1",onClick:G=>G.stopPropagation(),children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("div",{className:"flex w-12 h-3 rounded-sm bg-white justify-center gap-1 items-center",children:n.jsxs("h6",{className:"text-black text-[0.4rem]",children:["By: ",(xe==null?void 0:xe.name)||"Anonymous"]})}),n.jsxs("div",{className:"flex justify-end gap-1 items-center",children:[n.jsx(an,{className:`cursor-pointer text-sm ${oe?"text-red-600 fill-current":"text-gray-400"}`,onClick:F}),n.jsx("span",{className:`cursor-pointer text-sm ${J?"text-green-600":"text-gray-400"}`,onClick:D,children:J?n.jsx(Go,{}):n.jsx(An,{})}),n.jsx(yo,{className:"text-white cursor-pointer text-sm",onClick:z})]})]}),n.jsx("h4",{className:"text-white text-xs font-semibold truncate",style:a||{},children:A}),n.jsx("p",{className:"text-white text-[0.6rem] font-light line-clamp-2",children:R}),c>0&&n.jsx("div",{className:"w-full bg-gray-700 rounded-full h-1.5",children:n.jsx("div",{className:"bg-red-600 h-1.5 rounded-full",style:{width:`${c/300*100}%`}})})]})]}),b&&n.jsxs("div",{className:"absolute bottom-10 right-2 p-1 bg-black bg-opacity-80 text-white rounded-lg shadow-lg flex flex-col items-center space-y-1 z-20",onClick:G=>G.stopPropagation(),children:[n.jsx(an,{className:`cursor-pointer text-sm ${oe?"text-red-600 fill-current":"text-gray-400"}`,onClick:F}),n.jsx("span",{className:`cursor-pointer text-sm ${J?"text-green-600":"text-gray-400"}`,onClick:D,children:J?n.jsx(Go,{}):n.jsx(An,{})}),n.jsx(yo,{className:"text-white cursor-pointer text-sm",onClick:z})]}),_&&n.jsx(ss,{showPopup:_,onClose:()=>E(!1),onLogin:()=>E(!1),onRegister:()=>E(!1)})]})}),dr=({isOpen:e,content:t,onClose:r,handleNavigateToMovie:o})=>{var T,M;const[i,s]=p.useState(!1),[a,c]=p.useState(""),[l,d]=p.useState(""),u=cr(),{user:f}=xt(L=>L.auth),m=p.useRef(null),[b,x]=p.useState({show:!1,message:"",isError:!1});p.useEffect(()=>{console.log("Content prop:",t)},[t]);const h=async L=>{var I;if(!f||!f.token||!(t!=null&&t._id)){console.warn("Cannot save progress: Missing user, token, or content._id",{user:f,contentId:t==null?void 0:t._id,currentTime:L});return}try{console.log("Saving progress for contentId:",t._id,"time:",L);const $=await Z.post("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/progress/",{contentId:t._id,progress:L},{headers:{Authorization:`Bearer ${f.token}`}});console.log("Progress saved successfully:",$.data)}catch($){console.error("Error saving video progress:",((I=$.response)==null?void 0:I.data)||$.message)}},v=()=>{if(m.current){const L=m.current.currentTime;Math.floor(L)%5===0&&L>0&&h(L)}};p.useEffect(()=>{const L=m.current;return L&&(L.addEventListener("timeupdate",v),L.addEventListener("pause",()=>{L.currentTime>0&&h(L.currentTime)})),()=>{L&&L.currentTime>0&&(L.removeEventListener("timeupdate",v),L.removeEventListener("pause",()=>h(L.currentTime)),h(L.currentTime))}},[t,f]);const w=async L=>{var I,$,V,F;if(L.preventDefault(),!f||!f.token){s(!0);return}if(!a.trim()){d("Comment cannot be empty.");return}if(!(t!=null&&t._id)||typeof t._id!="string"||t._id.trim()===""){d("Invalid content ID. Please try again."),console.error("Invalid content._id:",t==null?void 0:t._id);return}try{const D=`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${t._id}/comment`,Y={contentId:t._id,text:a};console.log("Submitting comment:",{url:D,payload:Y,contentId:t._id,token:f.token.substring(0,10)+"..."});const z=await Z.post(D,Y,{headers:{Authorization:`Bearer ${f.token}`,"Content-Type":"application/json"}});console.log("Comment response:",z.data),t.comments=[...t.comments||[],z.data.comment],c(""),d("")}catch(D){console.error("Error adding comment:",{response:(I=D.response)==null?void 0:I.data,status:($=D.response)==null?void 0:$.status,message:D.message});const Y=((F=(V=D.response)==null?void 0:V.data)==null?void 0:F.error)||"Failed to add comment. Please try again.";d(Y)}};if(!e||!t||!t._id||typeof t._id!="string"||t._id.trim()==="")return console.warn("ContentModal: Invalid or missing content",{isOpen:e,content:t}),null;const g=(T=f==null?void 0:f.like)==null?void 0:T.includes(t._id),j=(M=f==null?void 0:f.watchlist)==null?void 0:M.includes(t._id),y=async()=>{try{if(f&&f._id){const L=t._id;g?await u(On({userId:f._id,contentId:L})).unwrap():await u(Pn({userId:f._id,contentId:L})).unwrap()}else s(!0)}catch(L){console.error("Error liking/unliking content:",L)}},k=async()=>{try{if(f&&f._id){const L=t._id;j?await u(Rn({userId:f._id,contentId:L})).unwrap():await u(zn({userId:f._id,contentId:L})).unwrap()}else s(!0)}catch(L){console.error("Error adding/removing from watchlist:",L)}},_=L=>{L.stopPropagation();const I=window.location.href;navigator.clipboard.writeText(I).then(()=>{x({show:!0,message:"Link copied to clipboard!",isError:!1}),setTimeout(()=>x({show:!1,message:"",isError:!1}),3e3)}).catch($=>{console.error("Failed to copy: ",$),x({show:!0,message:"Failed to copy link. Please try again.",isError:!0}),setTimeout(()=>x({show:!1,message:"",isError:!1}),3e3)})},E=()=>{x({show:!1,message:"",isError:!1})},N=n.jsxs(T_,{children:[n.jsxs(P_,{children:[n.jsx(z_,{onClick:r,"aria-label":"Close modal",children:"×"}),n.jsx(O_,{children:n.jsx("video",{ref:m,src:`${t.video}#t=0,15`,autoPlay:!0,controls:!0,preload:"metadata",className:"w-full h-full object-cover rounded-t-lg"})}),n.jsxs(R_,{children:[n.jsx("h2",{className:"text-base sm:text-lg md:text-xl font-semibold",children:t.title}),n.jsx("p",{className:"text-xs sm:text-sm md:text-base text-black mt-2 line-clamp-2",children:t.description}),n.jsxs(M_,{children:[n.jsx($_,{onClick:()=>o(t),children:"Watch"}),n.jsxs(L_,{children:[n.jsx(an,{className:`cursor-pointer text-lg sm:text-xl ${g?"text-red-600 fill-current":"text-gray-400"}`,onClick:y,"aria-label":g?"Unlike content":"Like content"}),n.jsx("span",{className:`cursor-pointer text-lg sm:text-xl ${j?"text-green-600":"text-gray-400"}`,onClick:k,"aria-label":j?"Remove from watchlist":"Add to watchlist",children:j?n.jsx(Go,{}):n.jsx(An,{})}),n.jsx(yo,{className:"text-[#541011] cursor-pointer text-lg sm:text-xl",onClick:_,"aria-label":"Copy link"})]})]}),n.jsxs(I_,{children:[n.jsx("h3",{className:"text-sm sm:text-base font-semibold mt-4 mb-2",children:"Comments"}),l&&n.jsx(Q_,{children:l}),n.jsxs(A_,{onSubmit:w,children:[n.jsx(D_,{type:"text",value:a,onChange:L=>{c(L.target.value),d("")},placeholder:"Add a comment...","aria-label":"Comment input"}),n.jsx(F_,{type:"submit",disabled:!a.trim(),children:"Post"})]}),n.jsx(B_,{children:t.comments&&t.comments.length>0?t.comments.map((L,I)=>n.jsxs(U_,{children:[n.jsxs(W_,{children:[n.jsx(H_,{src:L.user.profileImage||"https://via.placeholder.com/32",alt:L.user.name}),n.jsxs("div",{children:[n.jsx(V_,{children:L.user.name}),n.jsx(q_,{children:new Date(L.createdAt).toLocaleDateString()})]})]}),n.jsx(Y_,{children:L.text})]},L._id||I)):n.jsx(K_,{children:"No comments yet. Be the first to comment!"})})]})]})]}),i&&n.jsx(X_,{children:n.jsxs(G_,{children:[n.jsx("p",{className:"text-sm sm:text-base",children:"Please log in to like, add to playlist, or comment."}),n.jsx("button",{className:"mt-4 bg-[#541011] text-white py-2 px-4 rounded text-sm sm:text-base",onClick:()=>s(!1),children:"Close"})]})}),b.show&&n.jsxs(Z_,{isError:b.isError,children:[n.jsx("p",{children:b.message}),n.jsx("button",{onClick:E,children:"Close"})]})]});return e?Ap.createPortal(N,document.body):null},T_=S.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10010; /* Increased to ensure above all elements */
  padding: 1rem;
  animation: fade-in 0.3s ease-in;
`,P_=S.div`
  position: relative;
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 95vw;
  max-height: 90vh; /* Increased to allow more content */
  overflow: hidden; /* Prevent overflow from affecting layout */
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    max-width: 600px;
  }

  @media (min-width: 768px) {
    max-width: 800px;
  }
`,O_=S.div`
  width: 100%;
  aspect-ratio: 16 / 9; /* Maintain consistent video aspect ratio */
  max-height: 40vh; /* Limit max height */
  min-height: 200px; /* Ensure minimum height */
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }
`,z_=S.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #dc2626;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  z-index: 10013; /* Increased to stay above all modal layers */
`,R_=S.div`
  padding: 1rem;
  flex: 1; /* Take remaining space */
  overflow-y: auto; /* Allow scrolling for content */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 640px) {
    padding: 1.25rem;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #541011;
    border-radius: 3px;
  }
`,M_=S.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
  }
`,$_=S.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  width: 100%;
  font-size: 0.875rem;
  cursor: pointer;

  @media (min-width: 640px) {
    width: auto;
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
`,L_=S.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`,I_=S.div`
  margin-top: 0.75rem;
  width: 100%;
`,A_=S.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`,D_=S.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #333;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #541011;
  }

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`,F_=S.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #6b1516;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`,B_=S.div`
  max-height: 200px; /* Increased max-height for comments */
  overflow-y: auto;
  padding-right: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #541011;
    border-radius: 2px;
  }
`,U_=S.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  background: #f1f1f1;
  border-radius: 4px;
`,W_=S.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,H_=S.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: 640px) {
    width: 32px;
    height: 32px;
  }
`,V_=S.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`,q_=S.span`
  font-size: 0.625rem;
  color: #666;

  @media (min-width: 640px) {
    font-size: 0.75rem;
  }
`,Y_=S.p`
  font-size: 0.75rem;
  color: #333;
  margin: 0;
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`,K_=S.p`
  font-size: 0.75rem;
  color: #666;
  text-align: center;
  margin: 0.5rem 0;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`,Q_=S.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`,X_=S.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10011; /* Above ModalOverlay */
  padding: 1rem;
  animation: fade-in 0.3s ease-in;
`,G_=S.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  max-width: 90vw;
  text-align: center;

  @media (min-width: 640px) {
    max-width: 300px;
    padding: 1.25rem;
  }
`,Z_=S.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: ${({isError:e})=>e?"#ff4d4f":"#541011"};
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10012; /* Above PopupOverlay */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 90%;
  max-width: 260px;

  @media (min-width: 640px) {
    max-width: 280px;
    padding: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    text-align: center;

    @media (min-width: 640px) {
      font-size: 0.875rem;
    }
  }

  button {
    background: #fff;
    color: ${({isError:e})=>e?"#ff4d4f":"#28a745"};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.75rem;

    @media (min-width: 640px) {
      font-size: 0.875rem;
    }
  }
`;function ye(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(!1),[s,a]=p.useState(null),[c,l]=p.useState(null);p.useEffect(()=>{async function x(){try{console.log("Requesting data from API");const h=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",h),h.data&&Array.isArray(h.data)){const v=h.data.filter(w=>w.category==="Top 10");r(v)}else console.error("Unexpected data format:",h.data),l("Unexpected data format.")}catch(h){console.error("Error fetching data:",h),l("Error fetching data.")}}x()},[]);const d=x=>{a(x),i(!0)},u=()=>{i(!1),a(null)},f=(x,h)=>`${x.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${h}`,m=x=>{const h=f(x.title,x._id);console.log("Navigating to movie with slug:",h),e(`/movie/${h}`)},b={dots:!1,infinite:!0,speed:500,slidesToShow:3,slidesToScroll:1,initialSlide:0,autoplay:!0,autoplaySpeed:3e3,cssEase:"linear",arrows:!0,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1,dots:!1,arrows:!0}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:1,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}}]};return n.jsxs(J_,{children:[c?n.jsx("div",{className:"error-message",children:c}):n.jsx(gt,{...b,children:Array.isArray(t)&&t.map((x,h)=>n.jsx("div",{className:"sidebar-slide",children:n.jsx(ab,{img:x.thumbnail,title:x.title,movie:x,views:x.views,desc:x.description,customStyle:{},onVideoClick:()=>d(x)})},x._id))}),n.jsx(dr,{isOpen:o,content:s,onClose:u,handleNavigateToMovie:m})]})}const J_=S.div`
  .sidebar-slide {
    width: 300px; /* Increased width for better visibility */
    height: 200px; /* Fixed height for consistency */
    margin: 0 4px; /* Horizontal spacing */
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    overflow: visible; /* Prevent clipping of content */
    z-index: 10; /* Ensure clickable */
  }

  .sidebar-slide img,
  .sidebar-slide video {
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  .sidebar-slide:hover img,
  .sidebar-slide:hover video {
    transform: scale(1.05); /* Zoom on hover */
  }

  .slick-slider {
    width: 100%;
    max-width: 1000px; /* Increased to accommodate arrows and slides */
    margin: 0 auto;
    position: relative; /* Ensure arrows are positioned relative to slider */
  }

  .slick-list,
  .slick-track {
    display: flex;
    align-items: center;
  }

  /* Style default arrows */
  .slick-prev,
  .slick-next {
    display: block !important; /* Show default arrows */
    z-index: 20; /* Ensure arrows are above slides */
    width: 30px;
    height: 30px;
    transform: translate(0, -50%); /* Center vertically */
  }

  .slick-prev {
    left: -40px; /* Position left arrow outside slider */
  }

  .slick-next {
    right: -40px; /* Position right arrow outside slider */
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px; /* Increase arrow size */
    color: #ffffff; /* White arrows for visibility */
    opacity: 0.8; /* Slightly transparent */
    transition: opacity 0.3s ease;
  }

  .slick-prev:hover:before,
  .slick-next:hover:before {
    opacity: 1; /* Full opacity on hover */
  }

  /* Ensure touch events are not blocked */
  .sidebar-slide * {
    pointer-events: auto;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .sidebar-slide {
      width: 120px;
      height: 180px;
      margin: 0 2px;
    }

    .slick-slider {
      max-width: 300px;
    }

    .slick-prev {
      left: -30px;
    }

    .slick-next {
      right: -30px;
    }

    .slick-prev:before,
    .slick-next:before {
      font-size: 24px; /* Smaller arrows for tablet */
    }
  }

  @media (max-width: 480px) {
    .sidebar-slide {
      width: 100px;
      height: 150px;
    }

    .slick-slider {
      max-width: 200px;
    }

    .slick-prev {
      left: -25px;
    }

    .slick-next {
      right: -25px;
    }

    .slick-prev:before,
    .slick-next:before {
      font-size: 20px; /* Smaller arrows for mobile */
    }
  }
`;function rr(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(!1),[s,a]=p.useState(null),[c,l]=p.useState(null);p.useEffect(()=>{async function x(){try{console.log("Requesting data from API");const h=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",h),h.data&&Array.isArray(h.data)){const v=h.data.filter(w=>w.category==="Top 10");r(v)}else console.error("Unexpected data format:",h.data),l("Unexpected data format.")}catch(h){console.error("Error fetching data:",h),l("Error fetching data.")}}x()},[]);const d=x=>{a(x),i(!0)},u=()=>{i(!1),a(null)},f=(x,h)=>`${x.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${h}`,m=x=>{const h=f(x.title,x._id);console.log("Navigating to movie with slug:",h),e(`/movie/${h}`)},b={dots:!1,infinite:!0,speed:500,slidesToShow:3,slidesToScroll:1,initialSlide:0,autoplay:!0,autoplaySpeed:3e3,cssEase:"linear",arrows:!0,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1,dots:!1,arrows:!0}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:1,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}}]};return n.jsxs(eE,{children:[c?n.jsx("div",{className:"error-message",children:c}):n.jsx(gt,{...b,children:Array.isArray(t)&&t.map((x,h)=>n.jsx("div",{className:"sidebar-slide",children:n.jsx(ab,{img:x.thumbnail,title:x.title,movie:x,views:x.views,desc:x.description,customStyle:{},onVideoClick:()=>d(x)})},x._id))}),n.jsx(dr,{isOpen:o,content:s,onClose:u,handleNavigateToMovie:m})]})}const eE=S.div`
  .sidebar-slide {
    width: 300px; /* Increased width for better visibility */
    height: 200px; /* Fixed height for consistency */
    margin: 0 4px; /* Horizontal spacing */
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    overflow: visible; /* Prevent clipping of content */
    z-index: 10; /* Ensure clickable */
  }

  .sidebar-slide img,
  .sidebar-slide video {
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  .sidebar-slide:hover img,
  .sidebar-slide:hover video {
    transform: scale(1.05); /* Zoom on hover */
  }

  .slick-slider {
    width: 100%;
    max-width: 1000px; /* Increased to accommodate arrows and slides */
    margin: 0 auto;
    position: relative; /* Ensure arrows are positioned relative to slider */
  }

  .slick-list,
  .slick-track {
    display: flex;
    align-items: center;
  }

  /* Style default arrows */
  .slick-prev,
  .slick-next {
    display: block !important; /* Show default arrows */
    z-index: 20; /* Ensure arrows are above slides */
    width: 30px;
    height: 30px;
    transform: translate(0, -50%); /* Center vertically */
  }

  .slick-prev {
    left: -40px; /* Position left arrow outside slider */
  }

  .slick-next {
    right: -40px; /* Position right arrow outside slider */
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px; /* Increase arrow size */
    color: #ffffff; /* White arrows for visibility */
    opacity: 0.8; /* Slightly transparent */
    transition: opacity 0.3s ease;
  }

  .slick-prev:hover:before,
  .slick-next:hover:before {
    opacity: 1; /* Full opacity on hover */
  }

  /* Ensure touch events are not blocked */
  .sidebar-slide * {
    pointer-events: auto;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .sidebar-slide {
      width: 120px;
      height: 180px;
      margin: 0 2px;
    }

    .slick-slider {
      max-width: 300px;
    }

    .slick-prev {
      left: -30px;
    }

    .slick-next {
      right: -30px;
    }

    .slick-prev:before,
    .slick-next:before {
      font-size: 24px; /* Smaller arrows for tablet */
    }
  }

  @media (max-width: 480px) {
    .sidebar-slide {
      width: 100px;
      height: 150px;
    }

    .slick-slider {
      max-width: 200px;
    }

    .slick-prev {
      left: -25px;
    }

    .slick-next {
      right: -25px;
    }

    .slick-prev:before,
    .slick-next:before {
      font-size: 20px; /* Smaller arrows for mobile */
    }
  }
`,tu=({isOpen:e,onClose:t,onSubmit:r})=>e?n.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50",children:n.jsxs("div",{className:"bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto",children:[n.jsx("h2",{className:"text-lg sm:text-xl text-center text-black font-semibold mb-4",children:"Coming Soon!"}),n.jsx("p",{className:"mb-4 text-sm sm:text-base text-black",children:"Subscribe to get notified when this feature is available:"}),n.jsxs("form",{onSubmit:r,children:[n.jsx("input",{type:"email",className:"w-full px-3 py-2 mb-4 border rounded text-sm sm:text-base",placeholder:"Enter your email",required:!0}),n.jsx("button",{type:"submit",className:"w-full bg-[#541011] text-white py-2 rounded text-sm sm:text-base",children:"Subscribe"})]}),n.jsx("button",{onClick:t,className:"mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded text-sm sm:text-base",children:"Close"})]})}):null;function Tt({}){p.useState(!1);const e=de();p.useState(!1);const[t,r]=p.useState(!0),[o,i]=p.useState(!1),s=cr(),{user:a}=xt(dn=>dn.auth),[c,l]=p.useState(""),[d,u]=p.useState([]),[f,m]=p.useState([]),b=()=>{s(ls()),s(wn()),e("/")},x=()=>{i(!1)},h=dn=>{dn.preventDefault(),console.log("Email submitted"),i(!1)};p.useEffect(()=>{(async()=>{try{const Co=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");m(Co.data)}catch(Co){console.error("Error fetching data:",Co)}})()},[]),p.useEffect(()=>{w()},[c,f]);const v=dn=>{l(dn.target.value)},w=()=>{const dn=f.filter(Co=>{var Cm;return(Cm=Co.name)==null?void 0:Cm.toLowerCase().includes(c.toLowerCase())});u(dn)};p.useState(!1),p.useState(!1),p.useState(!1);const[g,j]=p.useState(!0),[y,k]=p.useState(!0),[_,E]=p.useState(!0),[N,T]=p.useState(!0),[M,L]=p.useState(!0),[I,$]=p.useState(!0),[V,F]=p.useState(!0),[D,Y]=p.useState(!0),[z,A]=p.useState(!0),R=()=>{j(!g)},q=()=>{j(!g)},X=()=>{k(!y)},oe=()=>{k(!y)},J=()=>{E(!_)},xe=()=>{E(!_)},je=()=>{T(!N)},Se=()=>{T(!N)},G=()=>{L(!M)},ae=()=>{L(!M)},ge=()=>{$(!I)},te=()=>{$(!I)},we=()=>{F(!V)},Ie=()=>{F(!V)},H=()=>{Y(!D)},W=()=>{Y(!D)},ie=()=>{A(!z)},ke=()=>{A(!z)},[Ve,Qe]=p.useState(!0),Me=()=>{Qe(!Ve)},[he,be]=p.useState(!1),Be=()=>{be(!he)},[qe,dt]=p.useState(!1),[vt,Bt]=p.useState(!1),[St,De]=p.useState(!1),[Zt,Tr]=p.useState(!1),[K,me]=p.useState(!1),[P,O]=p.useState(!1),[B,ee]=p.useState(!1),[fe,pe]=p.useState(!1),[ue,ce]=p.useState(!1),[ne,ze]=p.useState(!1),[Ye,_e]=p.useState(!1),[Ae,Xe]=p.useState(!1),[Ut,Jt]=p.useState(!1),[ur,Hr]=p.useState(!1),[Ot,$t]=p.useState(!1),yr=()=>{dt(!qe)},Vr=()=>{Bt(!vt)},qr=()=>{Tr(!Zt)},Yr=()=>{De(!St)},Ee=()=>{me(!K)},zt=()=>{O(!P)},qt=()=>{ee(!B)},Kr=()=>{pe(!fe)},Ge=()=>{ce(!ue)},kt=()=>{ze(!ne)},Lt=()=>{_e(!Ye)},er=()=>{Xe(!Ae)},Pr=()=>{i(!0)},Ja=()=>{Jt(!Ut)},hb=()=>{Hr(!ur)},fb=()=>{$t(!Ot)};return n.jsxs(tE,{children:[n.jsxs("div",{className:"flex justify-between flex-col bg-black  items-center py-2 px-8 h-20",children:[n.jsxs("div",{className:"flex w-full items-center justify-around gap-10",children:[n.jsx("div",{className:"w-48 cursor-pointer",children:n.jsx("img",{src:Ze,alt:"Playmood Logo",onClick:()=>e("/")})}),n.jsx("div",{className:"w-15 h-15 flex justify-center items-center rounded-full  cursor-pointer",onClick:()=>{e(a?"/dashboard":"/login")},children:n.jsx("img",{src:tn,alt:"Profile Icon",className:"w-6 h-6"})})]}),n.jsxs("div",{className:" flex justify-between w-full gab-10 ",children:[n.jsx(C,{to:"/",className:" text-[0.5rem]  text-white hover:text-red-600",children:"HOME"}),n.jsx(C,{to:"/channels",className:"text-white  text-[0.5rem] hover:text-red-600",children:"CHANNELS"}),n.jsx(C,{onClick:Pr,className:"text-white  text-[0.5rem] hover:text-red-600",children:"SCHEDULE"}),n.jsx(C,{onClick:Pr,className:"text-white  text-[0.5rem] hover:text-red-600",children:"SPACES"}),n.jsx(C,{to:"/stories",className:"text-white  text-[0.5rem] hover:text-red-600",children:"STORIES"}),n.jsx(C,{to:"/diaries",className:"text-white  text-[0.5rem] hover:text-red-600",children:"DIARIES"})]})]}),n.jsx(tu,{isOpen:o,onClose:x,onSubmit:h}),n.jsx(oE,{children:Ve?n.jsx(rE,{children:window.innerWidth<=768?n.jsx(em,{className:"mobile-hamburger",size:30,color:"white",onClick:Me}):n.jsx(nE,{children:t?n.jsx("img",{src:tn}):n.jsx("img",{src:tn})})}):n.jsxs(iE,{onMouseLeave:Me,children:[n.jsxs("div",{className:"flex align-middle justify-between",children:[a&&n.jsx("button",{className:"bg-red-600 text-white  px-3 rounded-md text-xs cursor-pointer  transition-colors duration-300 ease-in-out",onClick:b,children:"Logout"}),n.jsx("button",{className:" w-8 h-8 text-sm rounded-full text-white",onClick:Me,children:" X "})]}),n.jsxs("div",{className:"mt-33",children:[a&&n.jsx("div",{className:"",children:n.jsxs("div",{className:" flex gap-5 align-middle my-4 ",children:[n.jsx("img",{className:" w-8 h-8",src:tn,onClick:()=>{e("/dashboard")}}),n.jsx("h1",{className:"text-sm self-center ",children:a.name})]})}),!he&&n.jsxs(n.Fragment,{children:[!a&&n.jsxs("div",{onClick:()=>{e("/login")},children:[" ",n.jsx("button",{className:"font-semibold text-[10px] w-28 h-10 bg-red-950 text-white rounded-md",children:"Sign In / Register"})]}),n.jsx("div",{className:"search_tab",children:n.jsxs("div",{className:"flex items-center",children:[g?n.jsx("img",{src:va,onMouseEnter:R}):n.jsx("img",{src:wa,onMouseOut:q}),n.jsx("input",{type:"text",placeholder:"Search...",value:c,onChange:v,className:"ml-2 p-1 bg-transparent  border-b border-white text-red-200 text-sm focus:outline-none"})]})}),n.jsx("div",{className:"search_results",children:d.map((dn,Co)=>n.jsx("div",{className:"search_result_item",children:dn.name},Co))}),n.jsxs("div",{className:"home_tab",onClick:()=>{e("/")},children:[y?n.jsx("img",{src:ga,onMouseEnter:X}):n.jsx("img",{src:Sa,onMouseOut:oe}),n.jsx("p",{children:"Home"})]}),n.jsxs("div",{className:"recommended_tab",onClick:()=>{e("/recommended")},children:[_?n.jsx("img",{src:ya,onMouseEnter:J}):n.jsx("img",{src:ba,onMouseOut:xe}),n.jsx("p",{children:"Recommended"})]}),n.jsxs("div",{className:"new_tab",onClick:()=>{e("/newplaymood")},children:[N?n.jsx("img",{src:fa,onMouseEnter:je}):n.jsx("img",{src:ka,onMouseOut:Se}),n.jsx("p",{children:"New on playmood"})]}),n.jsxs("div",{className:"channels_tab",onClick:()=>{e("/channels")},children:[M?n.jsx("img",{src:pa,onMouseEnter:G}):n.jsx("img",{src:Na,onMouseOut:ae}),n.jsx("p",{children:"Channels"})]}),n.jsxs("div",{className:"spaces_tab",onClick:Pr,children:[I?n.jsx("img",{src:ja,onMouseEnter:ge}):n.jsx("img",{src:Ca,onMouseOut:te}),n.jsx("p",{children:"Spaces"})]}),n.jsxs("div",{className:"schedule_tab",onClick:Pr,children:[V?n.jsx("img",{src:_a,onMouseEnter:we}):n.jsx("img",{src:Ea,onMouseOut:Ie}),n.jsx("p",{children:"Schedule"})]}),n.jsxs("div",{className:"favorites_tab",onClick:()=>{e(a?"/dashboard":"/login")},children:[D?n.jsx("img",{src:ma,onMouseEnter:H}):n.jsx("img",{src:Pa,onMouseOut:W}),n.jsx("p",{children:"Favorites"})]})]}),n.jsxs("div",{className:"categories",onClick:Be,children:[z?n.jsx("img",{src:xa,onMouseEnter:ke}):n.jsx("img",{src:Ta,onMouseOut:ie}),n.jsx("p",{children:"Categories"})]}),he&&n.jsxs("div",{className:"categories_subsection",children:[n.jsx("h3",{onClick:yr,children:"TOP 10"}),qe&&n.jsx(ye,{}),n.jsx("h3",{onClick:Vr,children:"New on Playmood"}),vt&&n.jsx(ye,{}),n.jsx("h3",{onClick:Yr,children:"Channels"}),St&&n.jsx(ye,{}),n.jsx("h3",{onClick:qr,children:"Diaries"}),Zt&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ee,children:"Spaces"}),K&&n.jsx(ye,{}),n.jsx("h3",{onClick:zt,children:"Recommendations for you"}),P&&n.jsx(ye,{}),n.jsx("h3",{onClick:qt,children:"Interviews"}),B&&n.jsx(ye,{}),n.jsx("h3",{onClick:Kr,children:"Fashion Shows Stories"}),fe&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ee,children:"Spaces"}),K&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ge,children:"Documentaries and Reports"}),ue&&n.jsx(ye,{}),n.jsx("h3",{onClick:kt,children:"Behind the cameras"}),ne&&n.jsx(ye,{}),n.jsx("h3",{onClick:Lt,children:"Soon in Playmood"}),Ye&&n.jsx(ye,{}),n.jsx("h3",{onClick:er,children:"Teen"}),Ae&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ja,children:"Best in Fashion"}),Ut&&n.jsx(ye,{}),n.jsx("h3",{onClick:hb,children:"Only in Playmood"}),ur&&n.jsx(ye,{}),n.jsx("h3",{onClick:fb,children:"Watchlist"}),Ot&&n.jsx(ye,{})]})]})]})})]})}const tE=S.div`
    height: 80px;
    width: 100%;
    // background-color: rgba(0,0,0,0.6);

    color: white;
    position: fixed;
    top: 0px;
    left: 0px; 
    // z-index: 1001;
`;S.div` 
    width:100%;
    height: fit-content;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    padding:5px 5px 5px 60px;   
`;S.div`h
  width:100%;
  display:flex;
  justify-content: space-between;
  margin-top:15px;
  .links{
    display:flex;
    color: white;
    text-decoration: none;
    font-size: 0.7rem;
    font-weight: 500;
    padding-left:5px;
    @media screen and (max-width: 600px){
        font-size: 0.5rem;
    }
    &:hover{
        color:rgb(140,7,52);
        font-weight: 700;
    }
}
}
`;S.div`
    width:100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: Space-between;
    gap: 10px; 
    .profile-container{
      width: 40px;
      background-color:rgb(140,7,52);
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:100%;
        cursor: pointer;
       
        img{
            width: 80%;
            height: 80%;
            
          
           
        }
    }
    .main-logo{
        height: 40px;
        width:auto;
        cursor: pointer;
        padding-right:150px;
    }
`;const rE=S.div`
    width: 60px; 
    height: 100vh;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    img{
        height: 40px;
        width: 40px;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
      left: 0;  // Align to the left instead of right
      right: unset;  // Remove the right positioning
      // Full width on mobile screens
  }
`,nE=S.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px solid rgba(255,255,255,0.4);
`;S.div`
    height: fit-content;
    width:100%;
    background-color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 30px 0px 30px 0px;
    gap: 40px;
    img{
        width: 25px;
        height: 25px;
    }
`;const oE=S.div`
    display: flex;
    height: 10%;
    align-items: center;
    gap: 30px;
    position: relative;
    top: 10px;
    left: -10px;
    // z-index: 1000;

`,iE=S.div`
width: 250px;
height: 100vh;
background-color: black;
top: 0;
left: 0; // Align to the left
position: fixed;
padding: 20px 10px 0px 10px;
display: flex;
flex-direction: column;
gap: 18px;

    .categories_subsection{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        padding-left: 50px;
        gap: 15px;
        h3{
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            cursor: pointer;
        }
    }
    .user_and_settings{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
        }
        .head_section{
            h1{
                font-size: 0.8rem;
            }
            p{
                font-size: 0.6rem;
            }
            cursor: pointer;
        }
    }
    .search_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 10px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .home_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .recommended_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .new_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .channels_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .spaces_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .schedule_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .favorites_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .categories{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 768px) {
      left: 0;  // Align to the left instead of right
      right: unset;  // Remove the right positioning
      // Full width on mobile screens
  }

`;function Pt({}){p.useState(!1);const e=de();p.useState(!1);const[t,r]=p.useState(!0),[o,i]=p.useState(!1),s=cr(),{user:a}=xt(Lt=>Lt.auth),c=()=>{s(ls()),s(wn()),e("/")};p.useState(!1),p.useState(!1),p.useState(!1);const l=()=>{r(!t)},d=()=>{r(!t)},[u,f]=p.useState(!0),[m,b]=p.useState(!0),[x,h]=p.useState(!0),[v,w]=p.useState(!0),[g,j]=p.useState(!0),[y,k]=p.useState(!0),[_,E]=p.useState(!0),[N,T]=p.useState(!0),[M,L]=p.useState(!0),I=()=>{f(!u)},$=()=>{f(!u)},V=()=>{b(!m)},F=()=>{b(!m)},D=()=>{h(!x)},Y=()=>{h(!x)},z=()=>{w(!v)},A=()=>{w(!v)},R=()=>{j(!g)},q=()=>{j(!g)},X=()=>{k(!y)},oe=()=>{k(!y)},J=()=>{E(!_)},xe=()=>{E(!_)},je=()=>{T(!N)},Se=()=>{T(!N)},G=()=>{L(!M)},ae=()=>{L(!M)},[ge,te]=p.useState(!0),we=()=>{te(!ge)},[Ie,H]=p.useState(!1),W=()=>{H(!Ie)},ie=()=>{i(!0)},ke=()=>{i(!1)},Ve=Lt=>{Lt.preventDefault(),console.log("Email submitted"),i(!1)},[Qe,Me]=p.useState(!1),[he,be]=p.useState(!1),[Be,qe]=p.useState(!1),[dt,vt]=p.useState(!1),[Bt,St]=p.useState(!1),[De,Zt]=p.useState(!1),[Tr,K]=p.useState(!1),[me,P]=p.useState(!1),[O,B]=p.useState(!1),[ee,fe]=p.useState(!1),[pe,ue]=p.useState(!1),[ce,ne]=p.useState(!1),[ze,Ye]=p.useState(!1),[_e,Ae]=p.useState(!1),[Xe,Ut]=p.useState(!1),Jt=()=>{Me(!Qe)},ur=()=>{be(!he)},Hr=()=>{vt(!dt)},Ot=()=>{qe(!Be)},$t=()=>{St(!Bt)},yr=()=>{Zt(!De)},Vr=()=>{K(!Tr)},qr=()=>{P(!me)},Yr=()=>{B(!O)},Ee=()=>{fe(!ee)},zt=()=>{ue(!pe)},qt=()=>{ne(!ce)},Kr=()=>{Ye(!ze)},Ge=()=>{Ae(!_e)},kt=()=>{Ut(!Xe)};return n.jsx(sE,{children:n.jsxs(aE,{children:[n.jsxs("nav",{className:"w-full h-full flex gap-16  justify-between",children:[n.jsxs("div",{className:"flex h-full flex-row gap-8 items-center",children:[n.jsx(C,{to:"/",className:"text-white text-sm font-medium hover:text-[#541011]",children:"HOME"}),n.jsx(C,{to:"/channels",className:"text-white text-sm font-medium hover:text-[#541011]",children:"CHANNELS"}),n.jsx(C,{onClick:ie,className:"text-white text-sm font-medium hover:text-[#541011]",children:"SCHEDULE"}),n.jsx(C,{onClick:ie,className:"text-white text-sm font-medium hover:text-[#541011]",children:"SPACES"}),n.jsx(C,{to:"/stories",className:"text-white text-sm font-medium hover:text-[#541011]",children:"STORIES"}),n.jsx(C,{to:"/diaries",className:"text-white text-sm font-medium hover:text-[#541011]",children:"DIARIES"})]}),n.jsxs("div",{className:"flex gap-8 items-center ",children:[n.jsxs("div",{className:"flex items-center justify-center gap-4 w-auto h-10 border border-white cursor-pointer px-6",onClick:()=>{e(a?"/dashboard":"/login")},children:[n.jsx("p",{className:"text-base",children:"Post"}),n.jsx(An,{})]}),n.jsx("img",{src:Ze,className:"h-10 cursor-pointer",alt:"Playmood",onClick:()=>e("/")})]}),n.jsx(tu,{isOpen:o,onClose:ke,onSubmit:Ve})]}),n.jsx(uE,{children:ge?n.jsxs(lE,{onMouseEnter:we,onMouseLeave:we,children:[n.jsx(cE,{children:t?n.jsx("img",{src:tn,onMouseEnter:l}):n.jsx("img",{src:tn,onMouseOut:d,onMouseEnter:we})}),n.jsxs(dE,{children:[u?n.jsx("img",{src:va,onMouseEnter:I}):n.jsx("img",{src:wa,onMouseOut:$}),m?n.jsx("img",{src:ga,onMouseEnter:V}):n.jsx("img",{src:Sa,onMouseOut:F}),x?n.jsx("img",{src:ya,onMouseEnter:D}):n.jsx("img",{src:ba,onMouseOut:Y}),v?n.jsx("img",{src:fa,onMouseEnter:z}):n.jsx("img",{src:ka,onMouseOut:A}),g?n.jsx("img",{src:pa,onMouseEnter:R}):n.jsx("img",{src:Na,onMouseOut:q}),y?n.jsx("img",{src:ja,onMouseEnter:X}):n.jsx("img",{src:Ca,onMouseOut:oe}),_?n.jsx("img",{src:_a,onMouseEnter:J}):n.jsx("img",{src:Ea,onMouseOut:xe}),N?n.jsx("img",{src:ma,onMouseEnter:je}):n.jsx("img",{src:Pa,onMouseOut:Se}),M?n.jsx("img",{src:xa,onMouseEnter:ae}):n.jsx("img",{src:Ta,onMouseOut:G})]})]}):n.jsxs(hE,{onMouseLeave:we,children:[a&&n.jsxs("div",{className:"user_and_settings",children:[n.jsxs("div",{className:"head_section",children:[n.jsx("h1",{children:a.name}),n.jsx("ul",{children:n.jsx("li",{children:n.jsx("button",{className:"lgt_btn",onClick:c,children:"Logout"})})})]}),a&&n.jsx("img",{src:`${a.profile}?${new Date().getTime()}`,alt:"Profile",className:"w-32 h-32 rounded-full",onClick:()=>{e("/dashboard")}})]}),!Ie&&n.jsxs(n.Fragment,{children:[!a&&n.jsxs("div",{onClick:()=>{e("/login")},children:[" ",n.jsx("button",{className:"font-semibold w-44 h-10 bg-red-950 text-white text-[14px] rounded-md",children:"Sign In / Register"})]}),n.jsxs("div",{className:"search_tab",children:[u?n.jsx("img",{src:va,onMouseEnter:I}):n.jsx("img",{src:wa,onMouseOut:$}),n.jsx("p",{children:"Search"})]}),n.jsxs("div",{className:"home_tab",onClick:()=>{e("/")},children:[m?n.jsx("img",{src:ga,onMouseEnter:V}):n.jsx("img",{src:Sa,onMouseOut:F}),n.jsx("p",{children:"Home"})]}),n.jsxs("div",{className:"recommended_tab",onClick:()=>{e("/recommended")},children:[x?n.jsx("img",{src:ya,onMouseEnter:D}):n.jsx("img",{src:ba,onMouseOut:Y}),n.jsx("p",{children:"Recommended"})]}),n.jsxs("div",{className:"new_tab",onClick:()=>{e("/newplaymood")},children:[v?n.jsx("img",{src:fa,onMouseEnter:z}):n.jsx("img",{src:ka,onMouseOut:A}),n.jsx("p",{children:"New on playmood"})]}),n.jsxs("div",{className:"channels_tab",onClick:()=>{e("/channels")},children:[g?n.jsx("img",{src:pa,onMouseEnter:R}):n.jsx("img",{src:Na,onMouseOut:q}),n.jsx("p",{children:"Channels"})]}),n.jsxs("div",{className:"spaces_tab",onClick:ie,children:[y?n.jsx("img",{src:ja,onMouseEnter:X}):n.jsx("img",{src:Ca,onMouseOut:oe}),n.jsx("p",{children:"Spaces"})]}),n.jsxs("div",{className:"schedule_tab",onClick:ie,children:[_?n.jsx("img",{src:_a,onMouseEnter:J}):n.jsx("img",{src:Ea,onMouseOut:xe}),n.jsx("p",{children:"Schedule"})]}),n.jsxs("div",{className:"favorites_tab",onClick:()=>{e(a?"/dashboard":"/login")},children:[N?n.jsx("img",{src:ma,onMouseEnter:je}):n.jsx("img",{src:Pa,onMouseOut:Se}),n.jsx("p",{children:"Favorites"})]})]}),n.jsxs("div",{className:"categories",onClick:W,children:[M?n.jsx("img",{src:xa,onMouseEnter:ae}):n.jsx("img",{src:Ta,onMouseOut:G}),n.jsx("p",{children:"Categories"})]}),Ie&&n.jsxs("div",{className:"categories_subsection",children:[n.jsx("h3",{onClick:Jt,children:"TOP 10"}),Qe&&n.jsx(ye,{}),n.jsx("h3",{onClick:ur,children:"New on Playmood"}),he&&n.jsx(rr,{}),n.jsx("h3",{onClick:Ot,children:"Channels"}),Be&&n.jsx(rr,{}),n.jsx("h3",{onClick:Hr,children:"Diaries"}),dt&&n.jsx(rr,{}),n.jsx("h3",{onClick:$t,children:"Spaces"}),Bt&&n.jsx(rr,{}),n.jsx("h3",{onClick:yr,children:"Recommendations for you"}),De&&n.jsx(rr,{}),n.jsx("h3",{onClick:Vr,children:"Interviews"}),Tr&&n.jsx(rr,{}),n.jsx("h3",{onClick:qr,children:"Fashion Shows Stories"}),me&&n.jsx(rr,{}),n.jsx("h3",{onClick:$t,children:"Spaces"}),Bt&&n.jsx(rr,{}),n.jsx("h3",{onClick:Yr,children:"Documentaries and Reports"}),O&&n.jsx(rr,{}),n.jsx("h3",{onClick:Ee,children:"Behind the cameras"}),ee&&n.jsx(rr,{}),n.jsx("h3",{onClick:zt,children:"Soon in Playmood"}),pe&&n.jsx(rr,{}),n.jsx("h3",{onClick:qt,children:"Teen"}),ce&&n.jsx(rr,{}),n.jsx("h3",{onClick:Kr,children:"Best in Fashion"}),ze&&n.jsx(rr,{}),n.jsx("h3",{onClick:Ge,children:"Only in Playmood"}),_e&&n.jsx(rr,{}),n.jsx("h3",{onClick:kt,children:"Watchlist"}),Xe&&n.jsx(rr,{})]})]})})]})})}const sE=S.div`
    height: 80px;
    width: 100%;
    background-color: rgba(0,0,0,0.6);
    color: white;
    position: fixed;
    top: 0px;
    left: 0px; 
    z-index: 1001;
`,aE=S.nav`
    width: 100%;
    height: 100%; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 260px 0px 80px;
`;S.div` 
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    p{
        cursor: pointer;
    }
    .links{
        color: white;
        text-decoration: none;
        font-size: 0.8rem;
        font-weight: 500;
    }

`;S.div`
    height: fit-content;
    display: flex;
    margin-left: 600px;
`;S.div`
 
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px; 
    margin-right:70px;
    .profile-container{
        width: 80px;
        height: 40px;
        display: flex;
        font-size:15px;
        border-style: solid;
        border-color:white;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 1px;
        img{
            width: 25%;
            height: 40%;
            padding-left:4px;
           
        }

     
      
    }

    .main-logo{
      height: 40px;
      width:auto;
      cursor: pointer;
  }

`;const lE=S.div`
    width: 60px; 
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    img{
        height: 40px;
        width: 40px;
        cursor: pointer;
    }

`,cE=S.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px solid rgba(255,255,255,0.4);
`,dE=S.div`
    height: fit-content;
    width:100%;
    background-color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 30px 0px 30px 0px;
    gap: 40px;
    img{
        width: 25px;
        height: 25px;
    }
`,uE=S.div`
    display: flex;
    height: 10%;
    align-items: center;
    gap: 30px;
    // position: relative;
    // top: -40px;
    // left: -90px;
    // z-index: 1000;

`,hE=S.div`
width: 240px;
height: 100vh;
background-color: black;
top: 0;
right: 0; // Align to the left
position: fixed;
padding: 20px 10px 0px 20px;
display: flex;
flex-direction: column;
gap: 20px;

    .categories_subsection{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        padding-left: 50px;
        gap: 15px;
        h3{
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            cursor: pointer;
        }
    }
    .user_and_settings{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
        }
        .head_section{
            h1{
                font-size: 0.8rem;
            }
            p{
                font-size: 0.6rem;
            }
            cursor: pointer;
        }
    }
    .search_tab{
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .home_tab{
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .recommended_tab{
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .new_tab{
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .channels_tab{
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .spaces_tab{
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .schedule_tab{
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .favorites_tab{
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .categories{
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }

`,it=Ne.memo(function({img:t,title:r,movie:o,views:i,desc:s,customStyle:a,progress:c,onVideoClick:l}){var ae,ge;const[d,u]=p.useState(!1),[f,m]=p.useState(!1),[b,x]=p.useState(!1),[h,v]=p.useState(!1),[w,g]=p.useState(null),[j,y]=p.useState({show:!1,message:"",isError:!1}),[k,_]=p.useState({start:0,end:15}),E=cr(),{user:N}=xt(te=>te.auth),T=p.useRef(null),M=p.useRef({x:0,y:0}),L=p.useRef(!1);p.useEffect(()=>{var te,we;(te=o==null?void 0:o.shortPreview)!=null&&te.start&&((we=o==null?void 0:o.shortPreview)!=null&&we.end)&&_({start:o.shortPreview.start,end:o.shortPreview.end})},[o]),p.useEffect(()=>{const te=()=>{m(window.innerWidth<=768)};return window.addEventListener("resize",te),te(),()=>window.removeEventListener("resize",te)},[]);const I=()=>{f||(u(!0),v(!0))},$=()=>{f||(u(!1),v(!1))},V=te=>{const we=te.type==="mousedown"?te.clientX:te.touches[0].clientX,Ie=te.type==="mousedown"?te.clientY:te.touches[0].clientY;M.current={x:we,y:Ie},L.current=!1},F=()=>{L.current=!0},D=te=>{te.preventDefault(),te.stopPropagation();const we=te.type==="click"?te.clientX:te.changedTouches[0].clientX,Ie=te.type==="click"?te.clientY:te.changedTouches[0].clientY,H=Math.sqrt(Math.pow(we-M.current.x,2)+Math.pow(Ie-M.current.y,2));!L.current&&H<10&&(f?h?(l(),u(!1),v(!1)):(u(!0),v(!0)):l())},Y=async te=>{te.stopPropagation(),g(null);try{if(!N){G(!0);return}const we=o==null?void 0:o._id;if(!we){g("Content ID is missing. Please try again."),console.error("Content ID not found in movie object:",o);return}J?await E(On({contentId:we})).unwrap():await E(Pn({contentId:we})).unwrap()}catch(we){console.error("Like error:",we),g("Failed to like/unlike content. Please try again.")}},z=async te=>{te.stopPropagation(),g(null);try{if(!N){G(!0);return}const we=o==null?void 0:o._id;if(!we){g("Content ID is missing. Please try again.");return}const Ie=N.userId||N._id;if(!Ie){g("User ID is missing. Please log in again."),G(!0);return}xe?await E(Rn({userId:Ie,contentId:we})).unwrap():await E(zn({userId:Ie,contentId:we})).unwrap()}catch(we){console.error("Watchlist error:",we),g("Failed to update watchlist. Please try again.")}},A=te=>{te.stopPropagation(),x(!b)},R=te=>{te.stopPropagation();const we=window.location.href;navigator.clipboard.writeText(we).then(()=>{y({show:!0,message:"Link copied to clipboard!",isError:!1}),setTimeout(()=>y({show:!1,message:"",isError:!1}),3e3)}).catch(Ie=>{console.error("Failed to copy: ",Ie),y({show:!0,message:"Failed to copy link. Please try again.",isError:!0}),setTimeout(()=>y({show:!1,message:"",isError:!1}),3e3)})},q=()=>{y({show:!1,message:"",isError:!1})},X=(r==null?void 0:r.slice(0,30))+"...",oe=(s==null?void 0:s.slice(0,100))+"...",J=((ae=N==null?void 0:N.like)==null?void 0:ae.includes(o==null?void 0:o._id))||!1,xe=((ge=N==null?void 0:N.watchlist)==null?void 0:ge.includes(o==null?void 0:o._id))||!1,je=o==null?void 0:o.user,[Se,G]=p.useState(!1);return n.jsxs("div",{className:"relative overflow-hidden md:w-full h-[78%] w-60 md:mr-0.5",onMouseEnter:I,onMouseLeave:$,onMouseDown:V,onMouseMove:F,onTouchStart:V,onTouchMove:F,onTouchEnd:D,children:[j.show&&n.jsxs(fE,{isError:j.isError,children:[n.jsx("p",{children:j.message}),n.jsx("button",{onClick:q,children:"Close"})]}),n.jsx("div",{className:"absolute top-2.5 w-full px-1 flex justify-between"}),!d&&!h?n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"h-[70%]",children:n.jsx("img",{className:"w-full h-full object-cover cursor-pointer",src:t,alt:r,onClick:D})}),n.jsxs("div",{className:"absolute bottom-3 w-full bg-black bg-opacity-50 flex justify-between p-3 gap-2.5",children:[n.jsx("h3",{className:"text-white text-base font-normal leading-6 w-[80%]",style:a||{},children:X}),f&&n.jsx(pm,{className:"text-white w-1/5 h-10 cursor-pointer",onClick:A})]})]}):n.jsxs("div",{className:"flex flex-col justify-between h-full w-full",children:[n.jsx("div",{className:"h-20 w-full bg-black"}),n.jsx("video",{ref:T,playsInline:!0,loop:!0,autoPlay:h,muted:!0,className:"w-full object-cover h-36 cursor-pointer",onClick:D,children:n.jsx("source",{src:o!=null&&o.video?`${o.video}#t=${k.start},${k.end}`:""})}),n.jsxs("div",{className:"h-52 w-full bg-black p-2 flex flex-col gap-2 mb-8",onClick:te=>te.stopPropagation(),children:[n.jsxs("div",{className:"flex justify-between align-middle",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("div",{className:"flex w-20 h-4 rounded-sm bg-white justify-center gap-1 items-center",children:n.jsxs("h6",{className:"text-black text-[0.35rem]",children:["By: ",(je==null?void 0:je.name)||"Anonymous"]})}),n.jsxs("div",{className:"flex items-center gap-1 text-white text-[0.5rem]",children:[n.jsx(mm,{className:"text-white"}),n.jsx("span",{children:i||0})]})]}),n.jsxs("div",{className:"flex justify-end gap-1 items-center",children:[n.jsx(an,{className:`cursor-pointer ${J?"text-red-600 fill-current":"text-gray-400"}`,onClick:Y}),n.jsx("span",{className:`cursor-pointer ${xe?"text-green-600":"text-gray-400"}`,onClick:z,children:xe?n.jsx(Go,{}):n.jsx(An,{})}),n.jsx(yo,{className:"text-white cursor-pointer",onClick:R})]})]}),n.jsx("h4",{className:"text-white text-sm font-semibold",style:a||{},children:X}),n.jsx("p",{className:"text-white text-xs font-light",children:oe}),c>0&&n.jsx("div",{className:"w-full bg-gray-700 rounded-full h-2",children:n.jsx("div",{className:"bg-red-600 h-2 rounded-full",style:{width:`${c/300*100}%`}})})]})]}),b&&n.jsxs("div",{className:"absolute bottom-12 right-5 p-2 bg-black bg-opacity-80 text-white rounded-lg shadow-lg flex flex-col items-center space-y-2",onClick:te=>te.stopPropagation(),children:[n.jsx(an,{className:`cursor-pointer ${J?"text-red-600 fill-current":"text-gray-400"}`,onClick:Y}),n.jsx("span",{className:`cursor-pointer ${xe?"text-green-600":"text-gray-400"}`,onClick:z,children:xe?n.jsx(Go,{}):n.jsx(An,{})}),n.jsx(yo,{className:"text-white cursor-pointer",onClick:R})]}),Se&&n.jsx(ss,{showPopup:Se,onClose:()=>G(!1),onLogin:()=>G(!1),onRegister:()=>G(!1)})]})}),fE=S.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({isError:e})=>"#541011"};
  color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: 300px;

  p {
    margin: 0;
    font-size: 14px;
    text-align: center;
  }

  button {
    background: #fff;
    color: ${({isError:e})=>e?"#ff4d4f":"#28a745"};
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }
`,pE=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,mE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},xE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function gE(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Top 10").slice(0,10);console.log("Filtered and limited Top 10 data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:500,slidesToShow:5,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(mE,{}),nextArrow:n.jsx(xE,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(vE,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map((h,v)=>n.jsxs("div",{className:"slides",children:[n.jsx("h1",{className:"movie-ids","aria-label":`Rank ${v+1}`,children:v+1}),n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})]},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const vE=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${pE} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  .movie-ids {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    left: -30px;
    width: 40px;
    height: 40px;
    color: white;
    font-size: 54px;
    font-weight: bold;
    z-index: 5;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 1024px) {
    .movie-ids {
      left: -30px;
      width: 30px;
      height: 30px;
      font-size: 18px;
    }
  }

  @media (max-width: 600px) {
    .movie-ids {
      left: -25px;
      width: 25px;
      height: 25px;
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }

    .movie-ids {
      left: -20px;
      width: 20px;
      height: 20px;
      font-size: 14px;
    }
  }
`,wE=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,yE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},bE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function jE(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Documentarie");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:5,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(yE,{}),nextArrow:n.jsx(bE,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(SE,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const SE=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${wE} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`;function kE(){const e=de(),[t,r]=p.useState([]);p.useEffect(()=>{(async()=>{try{const a=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/creators",{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});Array.isArray(a.data)?r(a.data):console.error("Response data is not an array:",a.data)}catch(a){console.error("Error fetching creators:",a)}})()},[]);const o={dots:!1,infinite:!0,speed:300,slidesToShow:1,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:3e3,autoplaySpeed:3e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]},i=s=>{console.log("Slide clicked",s),e("/creator",{state:{creatorId:s._id||""}})};return n.jsx(gt,{...o,children:Array.isArray(t)&&t.map((s,a)=>n.jsxs("div",{className:"slidescircle relative",onClick:()=>i(s),children:[n.jsx("img",{src:s.profileImage,alt:`Creator ${a}`,className:"w-full h-auto"}),n.jsx("div",{className:"absolute inset-0 flex flex-col justify-center items-center space-y-2"})]},s._id))})}function NE(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null);p.useEffect(()=>{async function l(){try{console.log("Requesting data from API");const d=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(d.data&&Array.isArray(d.data)){const u=d.data.filter(f=>f.category==="Top 10");r(u)}else console.error("Unexpected data format:",d.data),i("Unexpected data format.")}catch(d){console.error("Error fetching data:",d),i("Error fetching data.")}}l()},[]);const s=(l,d)=>l?`${l.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${d}`:(console.error("Missing title for content:",d),d),a=l=>{const d=s(l.title,l._id);console.log("Navigating to movie with slug:",d),e(`/movie/${d}`)},c={dots:!1,infinite:!0,speed:500,slidesToShow:4,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:3e3,autoplaySpeed:3e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]};return n.jsx(gt,{...c,children:Array.isArray(t)&&t.map((l,d)=>n.jsx("div",{className:"slidescircle",onClick:()=>a(l),children:n.jsx("img",{src:l.thumbnail,alt:`Thumbnail ${d}`})},l._id))})}function CE(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null);p.useState(null),p.useState(!1),p.useEffect(()=>{async function l(){try{console.log("Requesting data from API");const d=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",d),d.data&&Array.isArray(d.data)){const u=d.data.filter(f=>f.category==="Top 10");r(u)}else console.error("Unexpected data format:",d.data),i("Unexpected data format.")}catch(d){console.error("Error fetching data:",d),i("Error fetching data.")}}l()},[]);const s=(l,d)=>l?`${l.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${d}`:(console.error("Missing title for content:",d),d),a=l=>{const d=s(l.title,l._id);console.log("Navigating to movie with slug:",d),e(`/movie/${d}`)},c={dots:!1,infinite:!0,speed:500,slidesToShow:4,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:3e3,autoplaySpeed:3e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]};return n.jsx(gt,{...c,children:Array.isArray(t)&&t.map((l,d)=>n.jsx("div",{className:"slidescircle",onClick:()=>a(l),children:n.jsx("img",{src:l.thumbnail,alt:`Thumbnail ${d}`})},l._id))})}const _E=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,EE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},TE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function PE(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Teen");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:3,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(EE,{}),nextArrow:n.jsx(TE,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(OE,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const OE=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${_E} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`,zE=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,RE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},ME=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function $E(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Documentarie");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:5,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(RE,{}),nextArrow:n.jsx(ME,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(LE,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const LE=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${zE} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`,IE=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,AE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},DE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function h0(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Documentarie");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:5,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(AE,{}),nextArrow:n.jsx(DE,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(FE,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const FE=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${IE} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`,BE=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,UE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},WE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function HE(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Documentarie");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:5,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(UE,{}),nextArrow:n.jsx(WE,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(VE,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const VE=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${BE} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`,qE=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,YE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},KE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function QE(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Documentarie");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:5,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(YE,{}),nextArrow:n.jsx(KE,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(XE,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const XE=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${qE} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`,GE=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,ZE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},JE=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function e6(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Documentarie");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:5,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(ZE,{}),nextArrow:n.jsx(JE,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(t6,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const t6=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${GE} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`,r6=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,n6=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},o6=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function i6(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Teen");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:3,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(n6,{}),nextArrow:n.jsx(o6,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(s6,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const s6=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${r6} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`,a6=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,l6=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},c6=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function d6(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Documentarie");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:5,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(l6,{}),nextArrow:n.jsx(c6,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(u6,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const u6=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${a6} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`,h6=Wr`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`,f6=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow prev-arrow",onClick:t,children:n.jsx(ln,{className:"arrow-icon"})})},p6=e=>{const{onClick:t}=e;return n.jsx("div",{className:"custom-arrow next-arrow",onClick:t,children:n.jsx(cn,{className:"arrow-icon"})})};function m6(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{async function h(){try{console.log("Requesting data from API");const v=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",v),v.data&&Array.isArray(v.data)){const w=v.data.filter(g=>g.category==="Teen");console.log("Filtered Documentaries data:",w),r(w)}else console.error("Unexpected data format:",v.data),i("Unexpected data format.")}catch(v){console.error("Error fetching data:",v),i("Error fetching data.")}}h()},[]);const u=h=>{a(h),l(!0)},f=()=>{l(!1),a(null)},m=(h,v)=>`${h.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${v}`,b=h=>{const v=m(h.title,h._id);console.log("Navigating to movie with slug:",v),e(`/movie/${v}`)},x={dots:!1,infinite:!0,speed:300,slidesToShow:3,slidesToScroll:1,initialSlide:0,prevArrow:n.jsx(f6,{}),nextArrow:n.jsx(p6,{}),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0,arrows:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2,arrows:!0}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]};return n.jsxs(x6,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...x,ref:d,children:Array.isArray(t)&&t.map(h=>n.jsx("div",{className:"slides",children:n.jsx(it,{img:h.thumbnail,title:h.title,movie:h,views:h.views,desc:h.description,customStyle:{},onVideoClick:()=>u(h)})},h._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:f,handleNavigateToMovie:b})]})}const x6=S.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${h6} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important;
    }
  }
`;var Uf={exports:{}},Wf={exports:{}},Ia=1e3,Aa=Ia*60,Da=Aa*60,Fa=Da*24,g6=Fa*365.25,v6=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return w6(e);if(r==="number"&&isNaN(e)===!1)return t.long?b6(e):y6(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function w6(e){if(e=String(e),!(e.length>100)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),o=(t[2]||"ms").toLowerCase();switch(o){case"years":case"year":case"yrs":case"yr":case"y":return r*g6;case"days":case"day":case"d":return r*Fa;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Da;case"minutes":case"minute":case"mins":case"min":case"m":return r*Aa;case"seconds":case"second":case"secs":case"sec":case"s":return r*Ia;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function y6(e){return e>=Fa?Math.round(e/Fa)+"d":e>=Da?Math.round(e/Da)+"h":e>=Aa?Math.round(e/Aa)+"m":e>=Ia?Math.round(e/Ia)+"s":e+"ms"}function b6(e){return Sl(e,Fa,"day")||Sl(e,Da,"hour")||Sl(e,Aa,"minute")||Sl(e,Ia,"second")||e+" ms"}function Sl(e,t,r){if(!(e<t))return e<t*1.5?Math.floor(e/t)+" "+r:Math.ceil(e/t)+" "+r+"s"}(function(e,t){t=e.exports=i.debug=i.default=i,t.coerce=l,t.disable=a,t.enable=s,t.enabled=c,t.humanize=v6,t.names=[],t.skips=[],t.formatters={};var r;function o(d){var u=0,f;for(f in d)u=(u<<5)-u+d.charCodeAt(f),u|=0;return t.colors[Math.abs(u)%t.colors.length]}function i(d){function u(){if(u.enabled){var f=u,m=+new Date,b=m-(r||m);f.diff=b,f.prev=r,f.curr=m,r=m;for(var x=new Array(arguments.length),h=0;h<x.length;h++)x[h]=arguments[h];x[0]=t.coerce(x[0]),typeof x[0]!="string"&&x.unshift("%O");var v=0;x[0]=x[0].replace(/%([a-zA-Z%])/g,function(g,j){if(g==="%%")return g;v++;var y=t.formatters[j];if(typeof y=="function"){var k=x[v];g=y.call(f,k),x.splice(v,1),v--}return g}),t.formatArgs.call(f,x);var w=u.log||t.log||console.log.bind(console);w.apply(f,x)}}return u.namespace=d,u.enabled=t.enabled(d),u.useColors=t.useColors(),u.color=o(d),typeof t.init=="function"&&t.init(u),u}function s(d){t.save(d),t.names=[],t.skips=[];for(var u=(typeof d=="string"?d:"").split(/[\s,]+/),f=u.length,m=0;m<f;m++)u[m]&&(d=u[m].replace(/\*/g,".*?"),d[0]==="-"?t.skips.push(new RegExp("^"+d.substr(1)+"$")):t.names.push(new RegExp("^"+d+"$")))}function a(){t.enable("")}function c(d){var u,f;for(u=0,f=t.skips.length;u<f;u++)if(t.skips[u].test(d))return!1;for(u=0,f=t.names.length;u<f;u++)if(t.names[u].test(d))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}})(Wf,Wf.exports);var j6=Wf.exports;(function(e,t){t=e.exports=j6,t.log=i,t.formatArgs=o,t.save=s,t.load=a,t.useColors=r,t.storage=typeof chrome<"u"&&typeof chrome.storage<"u"?chrome.storage.local:c(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function r(){return typeof window<"u"&&window.process&&window.process.type==="renderer"?!0:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}t.formatters.j=function(l){try{return JSON.stringify(l)}catch(d){return"[UnexpectedJSONParseError]: "+d.message}};function o(l){var d=this.useColors;if(l[0]=(d?"%c":"")+this.namespace+(d?" %c":" ")+l[0]+(d?"%c ":" ")+"+"+t.humanize(this.diff),!!d){var u="color: "+this.color;l.splice(1,0,u,"color: inherit");var f=0,m=0;l[0].replace(/%[a-zA-Z%]/g,function(b){b!=="%%"&&(f++,b==="%c"&&(m=f))}),l.splice(m,0,u)}}function i(){return typeof console=="object"&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(l){try{l==null?t.storage.removeItem("debug"):t.storage.debug=l}catch{}}function a(){var l;try{l=t.storage.debug}catch{}return!l&&typeof process<"u"&&"env"in process&&(l={}.DEBUG),l}t.enable(a());function c(){try{return window.localStorage}catch{}}})(Uf,Uf.exports);var S6=Uf.exports,f0=S6("jsonp"),k6=_6,N6=0;function C6(){}function _6(e,t,r){typeof t=="function"&&(r=t,t={}),t||(t={});var o=t.prefix||"__jp",i=t.name||o+N6++,s=t.param||"callback",a=t.timeout!=null?t.timeout:6e4,c=encodeURIComponent,l=document.getElementsByTagName("script")[0]||document.head,d,u;a&&(u=setTimeout(function(){f(),r&&r(new Error("Timeout"))},a));function f(){d.parentNode&&d.parentNode.removeChild(d),window[i]=C6,u&&clearTimeout(u)}function m(){window[i]&&f()}return window[i]=function(b){f0("jsonp got",b),f(),r&&r(null,b)},e+=(~e.indexOf("?")?"&":"?")+s+"="+c(i),e=e.replace("?&","?"),f0('jsonp req "%s"',e),d=document.createElement("script"),d.src=e,l.parentNode.insertBefore(d,l),m}const ri=Kc(k6);var E6=Object.defineProperty,T6=Object.defineProperties,P6=Object.getOwnPropertyDescriptors,Yc=Object.getOwnPropertySymbols,lb=Object.prototype.hasOwnProperty,cb=Object.prototype.propertyIsEnumerable,p0=(e,t,r)=>t in e?E6(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,$r=(e,t)=>{for(var r in t||(t={}))lb.call(t,r)&&p0(e,r,t[r]);if(Yc)for(var r of Yc(t))cb.call(t,r)&&p0(e,r,t[r]);return e},Sm=(e,t)=>T6(e,P6(t)),km=(e,t)=>{var r={};for(var o in e)lb.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&Yc)for(var o of Yc(e))t.indexOf(o)<0&&cb.call(e,o)&&(r[o]=e[o]);return r};function tt(e){const t=Object.entries(e).filter(([,r])=>r!=null).map(([r,o])=>`${encodeURIComponent(r)}=${encodeURIComponent(String(o))}`);return t.length>0?`?${t.join("&")}`:""}const O6=e=>!!e&&(typeof e=="object"||typeof e=="function")&&typeof e.then=="function",z6=(e,t)=>({left:window.outerWidth/2+(window.screenX||window.screenLeft||0)-e/2,top:window.outerHeight/2+(window.screenY||window.screenTop||0)-t/2}),R6=(e,t)=>({top:(window.screen.height-t)/2,left:(window.screen.width-e)/2});function M6(e,t,r){var o=t,{height:i,width:s}=o,a=km(o,["height","width"]);const c=$r({height:i,width:s,location:"no",toolbar:"no",status:"no",directories:"no",menubar:"no",scrollbars:"yes",resizable:"no",centerscreen:"yes",chrome:"yes"},a),l=window.open(e,"",Object.keys(c).map(d=>`${d}=${c[d]}`).join(", "));if(r){const d=window.setInterval(()=>{try{(l===null||l.closed)&&(window.clearInterval(d),r(l))}catch(u){console.error(u)}},1e3)}return l}function $6(e){var t=e,{beforeOnClick:r,children:o,className:i,disabled:s,disabledStyle:a={opacity:.6},forwardedRef:c,networkLink:l,networkName:d,onClick:u,onShareWindowClose:f,openShareDialogOnClick:m=!0,opts:b,resetButtonStyle:x=!0,style:h,url:v,windowHeight:w=400,windowPosition:g="windowCenter",windowWidth:j=550}=t,y=km(t,["beforeOnClick","children","className","disabled","disabledStyle","forwardedRef","networkLink","networkName","onClick","onShareWindowClose","openShareDialogOnClick","opts","resetButtonStyle","style","url","windowHeight","windowPosition","windowWidth"]);const k=async N=>{const T=l(v,b);if(!s){if(N.preventDefault(),r){const M=r();O6(M)&&await M}if(m){const M=$r({height:w,width:j},g==="windowCenter"?z6(j,w):R6(j,w));M6(T,M,f)}u&&u(N,T)}},_=Zy("react-share__ShareButton",{"react-share__ShareButton--disabled":!!s,disabled:!!s},i),E=$r($r(x?{backgroundColor:"transparent",border:"none",padding:0,font:"inherit",color:"inherit",cursor:"pointer"}:{},h),s&&a);return n.jsx("button",Sm($r({},y),{className:_,onClick:k,ref:c,style:E,children:o}))}function yt(e,t,r,o){function i(s,a){const c=r(s),l=$r({},s);return Object.keys(c).forEach(u=>{delete l[u]}),n.jsx($6,Sm($r($r({},o),l),{forwardedRef:a,networkName:e,networkLink:t,opts:r(s)}))}return i.displayName=`ShareButton-${e}`,p.forwardRef(i)}function L6(e,{subject:t,body:r,separator:o}){return"mailto:"+tt({subject:t,body:r?r+o+e:e})}yt("email",L6,e=>({subject:e.subject,body:e.body,separator:e.separator||" "}),{openShareDialogOnClick:!1,onClick:(e,t)=>{window.location.href=t}});function I6(e,{appId:t,redirectUri:r,to:o}){return"https://www.facebook.com/dialog/send"+tt({link:e,redirect_uri:r||e,app_id:t,to:o})}yt("facebookmessenger",I6,e=>({appId:e.appId,redirectUri:e.redirectUri,to:e.to}),{windowWidth:1e3,windowHeight:820});class A6 extends Error{constructor(t){super(t),this.name="AssertionError"}}function pt(e,t){if(!e)throw new A6(t)}function D6(e,{hashtag:t}){return pt(e,"facebook.url"),"https://www.facebook.com/sharer/sharer.php"+tt({u:e,hashtag:t})}const F6=yt("facebook",D6,e=>({hashtag:e.hashtag}),{windowWidth:550,windowHeight:400}),B6=F6;function U6(){const e=p.useRef(!1);return p.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]),p.useCallback(()=>e.current,[])}function W6(e){var t=e,{children:r=m=>m,className:o,getCount:i,url:s}=t,a=km(t,["children","className","getCount","url"]);const c=U6(),[l,d]=p.useState(void 0),[u,f]=p.useState(!1);return p.useEffect(()=>{f(!0),i(s,m=>{c()&&(d(m),f(!1))})},[s]),n.jsx("span",Sm($r({className:Zy("react-share__ShareCount",o)},a),{children:!u&&l!==void 0&&r(l)}))}function ni(e){const t=r=>n.jsx(W6,$r({getCount:e},r));return t.displayName=`ShareCount(${e.name})`,t}function H6(e,t){const r=`https://graph.facebook.com/?id=${e}&fields=og_object{engagement}`;ri(r,(o,i)=>{t(!o&&i&&i.og_object&&i.og_object.engagement?i.og_object.engagement.count:void 0)})}ni(H6);function V6(e,{title:t}){return pt(e,"hatena.url"),`http://b.hatena.ne.jp/add?mode=confirm&url=${e}&title=${t}`}yt("hatena",V6,e=>({title:e.title}),{windowWidth:660,windowHeight:460,windowPosition:"windowCenter"});function q6(e,t){ri("https://bookmark.hatenaapis.com/count/entry"+tt({url:e}),(o,i)=>{t(i??void 0)})}ni(q6);function Y6(e,{title:t,description:r}){return pt(e,"instapaper.url"),"http://www.instapaper.com/hello2"+tt({url:e,title:t,description:r})}yt("instapaper",Y6,e=>({title:e.title,description:e.description}),{windowWidth:500,windowHeight:500,windowPosition:"windowCenter"});function K6(e,{title:t}){return pt(e,"line.url"),"https://social-plugins.line.me/lineit/share"+tt({url:e,text:t})}yt("line",K6,e=>({title:e.title}),{windowWidth:500,windowHeight:500});function Q6(e,{title:t,summary:r,source:o}){return pt(e,"linkedin.url"),"https://linkedin.com/shareArticle"+tt({url:e,mini:"true",title:t,summary:r,source:o})}const X6=yt("linkedin",Q6,({title:e,summary:t,source:r})=>({title:e,summary:t,source:r}),{windowWidth:750,windowHeight:600}),G6=X6;function Z6(e,{title:t,description:r}){return pt(e,"livejournal.url"),"https://www.livejournal.com/update.bml"+tt({subject:t,event:r})}yt("livejournal",Z6,e=>({title:e.title,description:e.description}),{windowWidth:660,windowHeight:460});function J6(e,{title:t,description:r,imageUrl:o}){return pt(e,"mailru.url"),"https://connect.mail.ru/share"+tt({url:e,title:t,description:r,image_url:o})}yt("mailru",J6,e=>({title:e.title,description:e.description,imageUrl:e.imageUrl}),{windowWidth:660,windowHeight:460});function eT(e,{title:t,description:r,image:o}){return pt(e,"ok.url"),"https://connect.ok.ru/offer"+tt({url:e,title:t,description:r,imageUrl:o})}yt("ok",eT,e=>({title:e.title,description:e.description,image:e.image}),{windowWidth:588,windowHeight:480,windowPosition:"screenCenter"});function tT(e,t){window.OK||(window.OK={Share:{count:function(s,a){var c,l;(l=(c=window.OK.callbacks)[s])==null||l.call(c,a)}},callbacks:[]});const r="https://connect.ok.ru/dk",o=window.OK.callbacks.length;return window.ODKL={updateCount(i,s){var a,c;const l=i===""?0:parseInt(i.replace("react-share-",""),10);(c=(a=window.OK.callbacks)[l])==null||c.call(a,s===""?void 0:parseInt(s,10))}},window.OK.callbacks.push(t),ri(r+tt({"st.cmd":"extLike",uid:`react-share-${o}`,ref:e}))}ni(tT);function rT(e,{media:t,description:r,pinId:o}){return o?`https://pinterest.com/pin/${o}/repin/x/`:(pt(e,"pinterest.url"),pt(t,"pinterest.media"),"https://pinterest.com/pin/create/button/"+tt({url:e,media:t,description:r}))}yt("pinterest",rT,e=>({media:e.media,description:e.description,pinId:e.pinId}),{windowWidth:1e3,windowHeight:730});function nT(e,t){ri("https://api.pinterest.com/v1/urls/count.json"+tt({url:e}),(o,i)=>{t(i?i.count:void 0)})}ni(nT);function oT(e,{title:t}){return pt(e,"pocket.url"),"https://getpocket.com/save"+tt({url:e,title:t})}yt("pocket",oT,e=>({title:e.title}),{windowWidth:500,windowHeight:500});function iT(e,{title:t}){return pt(e,"reddit.url"),"https://www.reddit.com/submit"+tt({url:e,title:t})}yt("reddit",iT,e=>({title:e.title}),{windowWidth:660,windowHeight:460,windowPosition:"windowCenter"});function sT(e,{title:t}){return pt(e,"gab.url"),"https://gab.com/compose"+tt({url:e,text:t})}yt("gab",sT,e=>({title:e.title}),{windowWidth:660,windowHeight:640,windowPosition:"windowCenter"});function aT(e,t){const r=`https://www.reddit.com/api/info.json?limit=1&url=${e}`;ri(r,{param:"jsonp"},(o,i)=>{t(!o&&i&&i.data&&i.data.children.length>0&&i.data.children[0].data.score?i.data.children[0].data.score:void 0)})}ni(aT);function lT(e,{title:t}){return pt(e,"telegram.url"),"https://telegram.me/share/url"+tt({url:e,text:t})}yt("telegram",lT,e=>({title:e.title}),{windowWidth:550,windowHeight:400});function cT(e,{title:t,caption:r,tags:o,posttype:i}){return pt(e,"tumblr.url"),"https://www.tumblr.com/widgets/share/tool"+tt({canonicalUrl:e,title:t,caption:r,tags:o,posttype:i})}yt("tumblr",cT,e=>({title:e.title,tags:(e.tags||[]).join(","),caption:e.caption,posttype:e.posttype||"link"}),{windowWidth:660,windowHeight:460});function dT(e,t){return ri("https://api.tumblr.com/v2/share/stats"+tt({url:e}),(o,i)=>{t(!o&&i&&i.response?i.response.note_count:void 0)})}ni(dT);function uT(e,{title:t,via:r,hashtags:o=[],related:i=[]}){return pt(e,"twitter.url"),pt(Array.isArray(o),"twitter.hashtags is not an array"),pt(Array.isArray(i),"twitter.related is not an array"),"https://twitter.com/intent/tweet"+tt({url:e,text:t,via:r,hashtags:o.length>0?o.join(","):void 0,related:i.length>0?i.join(","):void 0})}const hT=yt("twitter",uT,e=>({hashtags:e.hashtags,title:e.title,via:e.via,related:e.related}),{windowWidth:550,windowHeight:400}),fT=hT;function pT(e,{title:t,separator:r}){return pt(e,"viber.url"),"viber://forward"+tt({text:t?t+r+e:e})}yt("viber",pT,e=>({title:e.title,separator:e.separator||" "}),{windowWidth:660,windowHeight:460});function mT(e,{title:t,image:r,noParse:o,noVkLinks:i}){return pt(e,"vk.url"),"https://vk.com/share.php"+tt({url:e,title:t,image:r,noparse:o?1:0,no_vk_links:i?1:0})}yt("vk",mT,e=>({title:e.title,image:e.image,noParse:e.noParse,noVkLinks:e.noVkLinks}),{windowWidth:660,windowHeight:460});function xT(e,t){window.VK||(window.VK={}),window.VK.Share={count:(i,s)=>{var a,c;return(c=(a=window.VK.callbacks)==null?void 0:a[i])==null?void 0:c.call(a,s)}},window.VK.callbacks=[];const r="https://vk.com/share.php",o=window.VK.callbacks.length;return window.VK.callbacks.push(t),ri(r+tt({act:"count",index:o,url:e}))}ni(xT);function gT(e,{title:t,image:r}){return pt(e,"weibo.url"),"http://service.weibo.com/share/share.php"+tt({url:e,title:t,pic:r})}yt("weibo",gT,e=>({title:e.title,image:e.image}),{windowWidth:660,windowHeight:550,windowPosition:"screenCenter"});function vT(){return/(android|iphone|ipad|mobile)/i.test(navigator.userAgent)}function wT(e,{title:t,separator:r}){return pt(e,"whatsapp.url"),"https://"+(vT()?"api":"web")+".whatsapp.com/send"+tt({text:t?t+r+e:e})}const yT=yt("whatsapp",wT,e=>({title:e.title,separator:e.separator||" "}),{windowWidth:550,windowHeight:400}),bT=yT;function jT(e,{quote:t,hashtag:r}){return pt(e,"workplace.url"),"https://work.facebook.com/sharer.php"+tt({u:e,quote:t,hashtag:r})}yt("workplace",jT,e=>({quote:e.quote,hashtag:e.hashtag}),{windowWidth:550,windowHeight:400});const ST=({open:e,onClose:t,shareUrl:r})=>n.jsxs(kT,{children:[n.jsx(B6,{url:r,quote:"Check out this video on PlayMood",onClick:()=>t(),children:n.jsx(js,{as:g3})}),n.jsx(fT,{url:r,title:"Check out this video on PlayMood",onClick:()=>t(),children:n.jsx(js,{as:Ao})}),n.jsx(bT,{url:r,title:"Check out this video on PlayMood",onClick:()=>t(),children:n.jsx(js,{as:v3})}),n.jsx(js,{as:Lo}),n.jsx(G6,{url:r,title:"Check out this video on PlayMood",onClick:()=>t(),children:n.jsx(js,{as:Io})})]}),kT=S.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }
`,js=S.div`
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
  margin: 5px;

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 768px) {
    margin: 10px;
    font-size: 14px; /* Adjust the margin for better spacing on mobile */
  }
`,le="/instagram.png",db="/assets/channels-02c9fbed.png",NT="/play-button2.png",CT="/addbutton.png",_T="/whiteheart.png",ET="/redheart.png",TT="/sendmessage.png";function ub(e){return He({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"}}]})(e)}function PT(e){return He({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]})(e)}function OT(e){return He({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"}}]})(e)}function zT(e){return He({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"}}]})(e)}function RT(e){return He({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"}}]})(e)}const MT=({showPopup:e,onClose:t})=>(de(),e&&n.jsx($T,{children:n.jsx(LT,{children:n.jsx("h2",{children:"Link Copied!"})})})),$T=S.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  background-color: white;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 45%;
  }
`,LT=S.div`
  text-align: center;
`;S.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;const IT=({likedContent:e,homePageData:t,contentIndex:r,isVisibleOnMobile:o})=>{var w,g;const i=de(),s=cr(),a=xt(j=>j.auth.user),[c,l]=p.useState(!1),[d,u]=p.useState(!1),f=e.length>0?e:t,m=f[r%f.length]||{};if(p.useEffect(()=>{console.log("LikedContentCard props:",{likedContent:e,homePageData:t,contentIndex:r,isVisibleOnMobile:o,currentContent:m,contentArrayLength:f.length})},[e,t,r,o,m,f]),!o||!m._id)return console.log("Not rendering LikedContentCard: isVisibleOnMobile or currentContent._id missing"),null;const b=()=>{const j=m.video||"";console.log("Sharing video URL:",j),navigator.clipboard.writeText(j).then(()=>{l(!0),setTimeout(()=>l(!1),3e3)}).catch(y=>{console.error("Error copying to clipboard:",y)})},x=()=>{m._id&&i(`/movie/${m._id}`,{state:{movie:m.video||"",title:m.title||"",desc:m.description||"",credits:m.credit||""}})},h=async()=>{if(!a){u(!0);return}try{const j=m._id;a.like&&a.like.includes(j)?await s(On({userId:a._id,contentId:j})):await s(Pn({userId:a._id,contentId:j}))}catch(j){console.error("Error liking/unliking content:",j)}},v=async()=>{if(!a){u(!0);return}try{const j=m._id;a.watchlist&&a.watchlist.includes(j)?await s(Rn({userId:a._id,contentId:j})):await s(zn({userId:a._id,contentId:j}))}catch(j){console.error("Error adding/removing from watchlist:",j)}};return n.jsxs(AT,{children:[n.jsx(DT,{backgroundImage:m.thumbnail||"/16_models.png",children:n.jsxs(FT,{children:[n.jsxs(YT,{children:[n.jsx(an,{onClick:h,style:{color:(w=a==null?void 0:a.like)!=null&&w.includes(m._id)?"#ff0000":"#541011"}}),n.jsx(b3,{onClick:b})]}),n.jsxs(BT,{children:[n.jsx(UT,{children:m.title||"No Title"}),n.jsx(WT,{children:n.jsxs(HT,{children:["Category",n.jsx(m0,{children:"•"}),m.category||"N/A",n.jsx(m0,{children:"•"}),m.credit||"N/A"]})}),n.jsx(VT,{children:n.jsxs(qT,{children:[n.jsxs(x0,{onClick:x,children:[n.jsx(q1,{})," Play Now"]}),n.jsxs(x0,{onClick:v,children:[n.jsx(An,{})," ",(g=a==null?void 0:a.watchlist)!=null&&g.includes(m._id)?"Remove from Watchlist":"Add to Watchlist"]})]})})]})]})}),n.jsx(MT,{showPopup:c,onClose:()=>l(!1)}),n.jsx(ss,{showPopup:d,onClose:()=>u(!1)})]})},AT=S.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  position: relative;
  top: 20px;

  @media screen and (max-width: 414px) {
    min-height: 350px;
  }
`,DT=S.div`
  position: relative;
  width: 300px;
  height: 450px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-image: url(${e=>e.backgroundImage});
  background-size: cover;
  background-position: center;
  overflow: hidden; /* Ensure the gradient doesn't overflow */

  /* Gradient overlay */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%; /* Adjust height to control gradient coverage */
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 2) 0%, /* Darker at the bottom */
      rgba(0, 0, 0, 0.9) 50%, /* Slightly transparent in the middle */
      rgba(0, 0, 0, 0) 100% /* Fully transparent at the top */
    );
    pointer-events: none; /* Allow clicks to pass through */
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 350px;
    height: 400px;
  }

  @media (max-width: 320px) {
    width: 85%;
    height: 350px;
  }
`,FT=S.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 10px;
`,BT=S.div`
  position: absolute;
  bottom: 10px; /* Add some padding from the bottom */
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Ensure content is above the gradient */
`,UT=S.p`
  margin: 0;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  color: #ffffff; /* White for better contrast */
  background-color: rgba(0, 0, 0, 0.5); /* Slightly darker background for readability */
  padding: 5px 30px;
  margin: 5px 10px;
  border-radius: 4px;
`,WT=S.div`
  margin-bottom: 12px;
`,HT=S.p`
  margin: 0px 10px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  color: #ffffff; 
`,m0=S.span`
  margin: 0 6px;
  font-size: 14px;
`,VT=S.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,qT=S.div`
  display: flex;
  align-self: center;
`,YT=S.div`
  width: full;
  display: flex;
  gap:8px;
  color: #541011;

  // @media (max-width: 768px) {
  //   top: -180px;
  //   right: -120px;
  // }

  // @media (max-width: 425px) {
  //   right: -100px;
  // }

  // @media (max-width: 320px) {
  //   top: -240px;
  //   right: -80px;
  // }
`,x0=S.button`
  display: flex;
  align-items: center;
  max-width: 200px;
  width: auto;
  height: auto;
  margin: 7px;
  padding: 10px;
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 12px;

  &:hover {
    background-color: #541011;
    color: white;
  }
`,KT=S.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  padding: 1rem;

  .popup-content {
    background-color: white;
    padding: 1.25rem;
    border-radius: 0.5rem 0.5rem 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%;
    max-width: 500px;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .accept-btn {
    background-color: #541011;
    &:hover {
      background-color: #6b1516;
    }
  }

  .opt-out-btn {
    background-color: #6b7280;
    &:hover {
      background-color: #4b5563;
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    .popup-content {
      padding: 1rem;
    }

    h2 {
      font-size: 1rem;
    }

    p {
      font-size: 0.75rem;
    }

    button {
      font-size: 0.7rem;
      padding: 0.4rem 0.8rem;
    }
  }
`,QT=Wr`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`,Ss=S.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  img {
    height: 15px;
    width: 15px;
    margin-left: 4px;
    position: relative;
    top: 1px;
  }

  &:hover {
    animation: ${QT} 1.5s infinite;
    box-shadow: 0 0 8px 2px #541011, 0 0 16px 4px #54101180;
    border-color: #541011;
    color: #ffffff;
  }
`,g0=S.div`
  display: flex;
  gap: 20px;
  margin-top: ${e=>e.marginTop?"8px":"0"};
`,XT=S.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
`,GT=S.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;
    svg {
      font-size: 40px;
    }
  }
`,ZT=S.div`
  width: 100vw;
  height: 55vh;
  position: ${e=>e.isFixed?"fixed":"relative"};
  top: 0;
  left: 0;
  z-index: 300;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  align-items: center;
  transition: position 0.3s ease; /* Smooth transition for position change */

  @media screen and (max-width: 768px) {
    position: relative;
    height: auto;
    flex-direction: column;
    z-index: 200;
  }
`,JT=S.div`
  width: 60vw;
  height: 55vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 301;

  .banner-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8);
  }

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 300px;
  }
`,e8=S.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 70px 100px 70px 60%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.0) 0%,
    rgba(0, 0, 0.0, 1.2) 60%,
    rgba(0, 0, 0, 0.9) 70%,
    rgba(0, 0, 0, 0.95) 100%
  );
  z-index: 303;
  color: white;

  h1 {
    font-size: 1.9rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    max-width: 500px;
    // color:#541011;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    max-width: 500px;
  }

  .view-more-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.9rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  }

  .flex {
    max-width: 500px;
  }

  @media screen and (max-width: 1000px) {
    padding: 50px 60px 50px 40%;
    h1 {
      font-size: 1.8rem;
    }
    p {
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    padding: 20px;
    align-items: center;
    background: rgba(0, 0, 0, 0.85);
    text-align: center;

    h1,
    p,
    .flex {
      max-width: 100%;
    }
  }
`,t8=S.div`
  width: 100%;
  height: 100%;
  position: relative;
`,r8=S.div`
  width: 100%;
  height: 100%;
  display: ${e=>e.active?"flex":"none"};
  align-items: center;
`,n8=S.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 304;

  input[type="radio"] {
    appearance: none;
    width: 12px;
    height: 12px;
    background-color: #ffffff80;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:checked {
      background-color: #541011;
    }

    &:hover {
      background-color: #54101180;
    }
  }

  @media screen and (max-width: 768px) {
    bottom: 10px;

    input[type="radio"] {
      width: 10px;
      height: 10px;
    }
  }
`,o8=S.div`
  height: fit-content;
  width: 100%;
  position: relative;
  z-index: 200;
  background-color: black;
  padding-top: 80px;

  @media screen and (max-width: 768px) {
    padding-top: 0;
  }
`,i8=S.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  color: white;
  min-height: 400px;

  @media screen and (max-width: 768px) {
    padding: 10px;
    margin-top: 80px;
    margin-bottom: 0px;
  }
`,s8=S.div`
  width: 100%;
  position: relative;
  z-index: 200;
  box-sizing: border-box;
  overflow-x: hidden;
  margin-top: 378px;

  @media screen and (max-width: 768px) {
    padding: 10px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`,nr=S.div`
  height: 340px;
  width: 92%;
  margin: 0px 20px 5px 20px;
  display: flex;
  gap: 0px;
  flex-direction: column;

  @media screen and (max-width: 495px) {
    margin-top: 120px;
    margin-bottom: 0px;
    height: 240px;
  }
`,or=S.h3`
  font-size: 1.5rem;
  color: white;
  padding-bottom: 30px;
  font-weight: 600;

  @media only screen and (min-width: 300px) {
    font-size: 1.5rem;
    padding: 5px 5px 20px 25px;
  }

  @media only screen and (min-width: 800px) {
    font-size: 1.8rem;
    padding: 5px 5px 20px 60px;
  }
`,a8=S.div`
  height: fit-content;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 60px 20px 60px;
  position: relative;
  z-index: 200;

  .contact-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  }

  .instagrams {
    display: flex;
    gap: 5px;

    .instagram-official {
      display: flex;
      height: fit-content;
      align-items: center;
      color: white;

      .instagram-links {
        a {
          text-decoration: none;
          color: white;
        }
      }

      img {
        height: 20px;
        width: 20px;
      }
    }
  }

  div {
    height: fit-content;
    display: flex;
    gap: 10px;
    color: white;

    p {
      font-size: 0.7rem;
      cursor: pointer;
    }

    img {
      height: 80px;
      width: 100%;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding-bottom: 10px;
    text-align: center;
  }
`,l8=(e,t)=>{let r;return(...o)=>{clearTimeout(r),r=setTimeout(()=>e.apply(null,o),t)}};function c8({channels:e,set_channels:t,isMobile:r,setIsMobile:o,showCookiesPopup:i,setShowCookiesPopup:s,isLiked:a,setIsLiked:c,user:l,homePageData:d,setHomePageData:u,contentIndex:f,setContentIndex:m,shareModalOpen:b,setShareModalOpen:x,shareUrl:h,showWelcomePopup:v,setShowWelcomePopup:w,likedContent:g,setLikedContent:j,sliderContainerRef:y}){const k=cr(),_=de(),E="https://res.cloudinary.com/di97mcvbu/video/upload/v1708430555/contents/q1xhinruadpovy0jxf6f.mp4",[N,T]=p.useState(0),[M,L]=p.useState(!0);p.useEffect(()=>{localStorage.getItem("cookiesAccepted")||s(!0)},[s]),p.useEffect(()=>{const R=()=>{o(window.innerWidth<=768)};return window.addEventListener("resize",R),()=>window.removeEventListener("resize",R)},[o]),p.useEffect(()=>{let R;return l||(R=setTimeout(()=>{w(!0)},15e3)),()=>clearTimeout(R)},[l,w]),p.useEffect(()=>{(async()=>{try{const q=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");u(q.data)}catch(q){console.error("Error fetching data:",q),Je.error("Failed to load content")}})()},[u]),p.useEffect(()=>{if(l&&l.like&&d.length>0){const R=d.filter(q=>l.like.includes(q._id));j(R)}else j([])},[l,d,j]),p.useEffect(()=>{if(d.length>0){const R=setInterval(()=>{T(q=>(q+1)%Math.min(3,d.length))},3e4);return()=>clearInterval(R)}},[d.length]),p.useEffect(()=>{const R=l8(()=>{const q=document.getElementById("channel");if(q){const oe=q.getBoundingClientRect().top<=0;L(!oe)}},100);return window.addEventListener("scroll",R),()=>window.removeEventListener("scroll",R)},[]);const I=()=>{localStorage.setItem("cookiesAccepted","true"),s(!1)},$=()=>{localStorage.setItem("cookiesAccepted","false"),s(!1)},V=async()=>{c(!a);try{if(l&&l._id){const R=d[N];if(R){const q=R._id;l.like&&l.like.includes(q)?await k(On({userId:l._id,contentId:q})):await k(Pn({userId:l._id,contentId:q}))}}else w(!0)}catch(R){console.error("Error liking/unliking content:",R),Je.error("Error updating like status")}},F=async()=>{try{if(l&&l._id){const R=d[N];if(R){const q=R._id;l.watchlist&&l.watchlist.includes(q)?await k(Rn({userId:l._id,contentId:q})):await k(zn({userId:l._id,contentId:q}))}}else w(!0)}catch(R){console.error("Error adding/removing from watchlist:",R),Je.error("Error updating watchlist")}},D=()=>{const R=d[N];R&&_(`/movie/${R._id}`,{state:{movie:R.video,title:R.title||"",desc:R.description||"",credits:R.credit||""}})},Y=(R,q)=>R&&R.length>q?R.slice(0,q)+"...":R||"",z=R=>{T(R)},A=()=>n.jsx(KT,{children:n.jsxs("div",{className:"popup-content",children:[n.jsx("h2",{children:"Cookies Policy"}),n.jsx("p",{children:"We use cookies to enhance your experience. Please accept our cookies policy."}),n.jsxs("div",{className:"button-group",children:[n.jsx("button",{className:"accept-btn",onClick:I,children:"Accept"}),n.jsx("button",{className:"opt-out-btn",onClick:$,children:"Opt Out"})]})]})});return n.jsxs(XT,{children:[i&&n.jsx(A,{}),r?n.jsx(GT,{children:n.jsx(Tt,{channels:e,set_channels:t})}):n.jsx(Pt,{channels:e,set_channels:t}),e&&n.jsxs("div",{className:"h-[500px] w-[1000px] absolute top-[100px] left-[250px] z-[1001] overflow-hidden flex justify-center items-center rounded-2xl md:w-4/5 md:h-4/5 md:left-20 md:top-[100px]",children:[n.jsx("button",{className:"absolute w-5 h-5 top-2.5 right-2.5 bg-red-500 border-none rounded-full text-white text-lg cursor-pointer",onClick:()=>t(!1),children:n.jsx(ub,{})}),n.jsx("img",{src:db,alt:"",className:"w-full h-full absolute object-cover top-0 left-0 z-[-1]"}),n.jsxs("div",{className:"h-fit w-4/5 flex justify-center items-center flex-col gap-2.5",children:[n.jsx("h2",{className:"text-white text-2xl md:text-xl",style:{textShadow:"2px 2px red"},children:"This feature is Coming Soon"}),n.jsx("p",{className:"text-white text-xl md:text-sm",style:{textShadow:"1px 1px red"},children:"Our content creators are doing great, and we are building a special platform for them!"}),n.jsxs("form",{className:"flex justify-center items-center gap-5 w-1/2 mx-auto md:flex-col",children:[n.jsx("input",{name:"name",placeholder:"Name",type:"text",className:"px-5 py-2.5 rounded-full"}),n.jsx("input",{name:"email",placeholder:"Email",type:"email",className:"px-5 py-2.5 rounded-full"}),n.jsx("button",{className:"bg-red-500 px-5 py-2.5 text-white border-none rounded-full cursor-pointer",children:"Subscribe"})]})]})]}),n.jsxs(o8,{children:[r?n.jsx(n.Fragment,{children:n.jsx(i8,{children:d.length===0?n.jsx("p",{style:{color:"white",textAlign:"center"},children:"Loading content..."}):n.jsx(IT,{likedContent:g,homePageData:d,contentIndex:f,isVisibleOnMobile:r})})}):n.jsx(ZT,{isFixed:M,children:n.jsxs(t8,{children:[d.slice(0,3).map((R,q)=>{var X;return n.jsxs(r8,{active:q===N,children:[n.jsx(JT,{children:n.jsx("video",{className:"banner-video",muted:!0,loop:!0,autoPlay:!0,playsInline:!0,onError:oe=>{console.error("Banner video error:",oe),oe.target.src=E},children:n.jsx("source",{src:R.video,type:"video/mp4"})},`banner-${R._id}`)}),n.jsxs(e8,{children:[n.jsx("div",{className:"title-truncate mb-",children:n.jsx("h1",{className:"font-semibold",children:Y(R.title,20)})}),n.jsxs("div",{className:"description-truncate mb-8",children:[n.jsx("p",{children:R.description||""}),((X=R.description)==null?void 0:X.length)>150&&n.jsx("button",{className:"view-more-btn",children:"View more"})]}),n.jsxs(g0,{children:[n.jsxs(Ss,{onClick:D,children:["WATCH NOW",n.jsx("img",{src:NT,alt:"play"})]}),n.jsxs(Ss,{onClick:F,children:["ADD TO WATCHLIST",n.jsx("img",{src:CT,alt:"add"})]})]}),n.jsxs(g0,{marginTop:!0,children:[n.jsxs(Ss,{onClick:V,children:["LIKE",n.jsx("img",{src:a?ET:_T,alt:"heart"})]}),n.jsxs(Ss,{onClick:()=>x(oe=>!oe),children:["SHARE",n.jsx("img",{src:TT,alt:"share"})]}),n.jsx(Ss,{onClick:()=>t(oe=>!oe),children:"ADD TO FAVOURITE +"})]}),b&&n.jsx(ST,{open:b,onClose:()=>x(!1),shareUrl:h})]})]},`slide-${R._id}`)}),n.jsx(n8,{children:[0,1,2].map(R=>n.jsx("input",{type:"radio",name:"banner-slide",checked:N===R,onChange:()=>z(R)},`radio-${R}`))})]})}),n.jsxs(s8,{ref:y,children:[n.jsxs(nr,{className:"video-category",id:"top10",children:[n.jsx(or,{children:"Top 10"}),n.jsx(gE,{})]}),n.jsxs(nr,{className:"video-category-this",id:"newonplay",children:[n.jsx(or,{children:"New on Playmood"}),n.jsx(jE,{})]}),n.jsxs(nr,{className:"video-category-circle",id:"channel",children:[n.jsx(or,{children:"Channels"}),n.jsx(kE,{})]}),n.jsxs(nr,{className:"video-category-circle",id:"diaries",children:[n.jsx(or,{children:"Diaries"}),n.jsx(NE,{})]}),n.jsxs(nr,{className:"video-category-circle",id:"spaces",children:[n.jsx(or,{children:"Spaces"}),n.jsx(CE,{})]}),n.jsxs(nr,{className:"video-category-1",id:"recommended",children:[n.jsx(or,{children:"Recommended for you"}),n.jsx(PE,{})]}),n.jsxs(nr,{className:"video-category-1",id:"interviews",children:[n.jsx(or,{children:"Interviews"}),n.jsx($E,{})]}),n.jsxs(nr,{className:"video-category-1",id:"fashion",children:[n.jsx(or,{children:"Fashion Shows"}),n.jsx(h0,{})]}),n.jsxs(nr,{className:"video-category-1",id:"social",children:[n.jsx(or,{children:"Social"}),n.jsx(m6,{})]}),n.jsxs(nr,{className:"video-category-1",id:"documentaries",children:[n.jsx(or,{children:"Documentaries and Reports"}),n.jsx(HE,{})]}),n.jsxs(nr,{className:"video-category-1",id:"documentaries",children:[n.jsx(or,{children:"Behind the Cameras"}),n.jsx(QE,{})]}),n.jsxs(nr,{className:"video-category-1",id:"documentaries",children:[n.jsx(or,{children:"Soon in Playmood"}),n.jsx(e6,{})]}),n.jsxs(nr,{className:"video-category-1",id:"teens",children:[n.jsx(or,{children:"Teens"}),n.jsx(i6,{})]}),n.jsxs(nr,{className:"video-category-1",id:"social",children:[n.jsx(or,{children:"Best in Fashion"}),n.jsx(h0,{})]}),n.jsxs(nr,{className:"video-category-1",id:"infashion",children:[n.jsx(or,{children:"Only in playmood"}),n.jsx(d6,{})]})]}),n.jsx(ss,{showPopup:v,onClose:()=>w(!1),onLogin:()=>w(!1),onRegister:()=>w(!1)}),n.jsxs(a8,{children:[n.jsx("div",{children:n.jsx("img",{src:Ze,alt:"PlaymoodTV Logo"})}),n.jsxs("div",{className:"instagrams",children:[n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",children:n.jsx("img",{src:le,alt:"Instagram"})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://www.instagram.com/playmoodlat/",children:n.jsx("img",{src:le,alt:"Instagram"})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://www.instagram.com/playmoodmx/",children:n.jsx("img",{src:le,alt:"Instagram"})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]}),n.jsx("div",{}),n.jsxs("div",{className:"contact-footer",children:[n.jsx("h2",{children:"Contact us:"}),n.jsx("h3",{children:"Creators@playmoodtv.com"}),n.jsxs("div",{children:[n.jsx("p",{onClick:()=>_("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{onClick:()=>_("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})]})}function d8(){const[e,t]=p.useState(!1),[r,o]=p.useState(window.innerWidth<=768),[i,s]=p.useState(!1),[a,c]=p.useState(!1),[l,d]=p.useState([]),[u,f]=p.useState(0),[m,b]=p.useState(!1),[x]=p.useState(""),[h,v]=p.useState(!1),[w,g]=p.useState([]),j=p.useRef(null),y=xt(k=>k.auth.user);return n.jsx(c8,{channels:e,set_channels:t,isMobile:r,setIsMobile:o,showCookiesPopup:i,setShowCookiesPopup:s,isLiked:a,setIsLiked:c,user:y,homePageData:l,setHomePageData:d,contentIndex:u,setContentIndex:f,shareModalOpen:m,setShareModalOpen:b,shareUrl:x,showWelcomePopup:h,setShowWelcomePopup:v,likedContent:w,setLikedContent:g,sliderContainerRef:j})}function u8(){const[e,t]=p.useState([]),r=de(),[o,i]=p.useState(!1),[s,a]=p.useState(window.innerWidth<=768);p.useEffect(()=>{(async()=>{try{const d=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");t(d.data),console.log(d.data)}catch(d){console.error("Error fetching data:",d)}})()},[]);const c=l=>{l._id?r(`/movie/${l._id}`,{state:{movie:l.video,title:l.title||"",desc:l.description||"",credits:l.credit||""}}):console.error("Content _id is missing:",l)};return n.jsxs("div",{className:"h-full w-full bg-black",children:[s?n.jsx(h8,{children:n.jsx(Tt,{channels:o,set_channels:i})}):n.jsx(Pt,{channels:o,set_channels:i}),n.jsxs("div",{className:"flex mt-16",children:[n.jsxs("div",{className:"w-1/5 bg-gray-500 h-full flex flex-col gap-8",children:[n.jsxs("div",{className:"mt-32 flex justify-center",children:[n.jsx("h1",{className:" md:text-3xl  text-red-600",children:"Playmood"}),n.jsx("p",{className:"text-white md:text-2xl",children:"TV"})]}),n.jsxs("div",{className:"flex flex-col items-center",children:[n.jsx(C,{to:"/",className:" text-white text-sm font-medium w-full",children:n.jsx("div",{className:"py-5 cursor-pointer flex justify-center hover:bg-white hover:text-red-600",children:"HOME"})}),n.jsx(C,{to:"#",className:"text-white text-sm font-medium w-full",children:n.jsx("div",{className:"py-5 cursor-pointer flex justify-center hover:bg-white hover:text-red-600",children:"TV Guide"})})]})]}),n.jsxs("div",{className:"w-4/5 h-full bg-black pt-2 flex flex-col items-center my-10",children:[n.jsx("div",{className:"w-auto flex align-middle justify-center my-4",children:n.jsx("h1",{className:"text-red-800 font-bold text-2xl",children:"SCHEDULES"})}),n.jsxs("table",{className:"w-full border-2 border-white text-white",children:[n.jsx("thead",{className:"border-2 border-white h-36",children:n.jsxs("tr",{children:[n.jsx("th",{className:"border-2 border-white",children:"Early"}),n.jsx("th",{className:"border-2 border-white",children:"Late"}),n.jsx("th",{className:"border-2 border-white",children:"Medium"}),n.jsx("th",{className:"border-2 border-white",children:"Hard"})]})}),n.jsx("tbody",{children:e.slice(0,6).map((l,d)=>n.jsxs("tr",{className:"border-2 border-white h-20 cursor-pointer text-center",children:[n.jsx("td",{onClick:()=>c(l),className:"border-2 border-white",children:l.title}),n.jsx("td",{className:"border-2 border-white"}),n.jsx("td",{className:"border-2 border-white"}),n.jsx("td",{className:"border-2 border-white"})]},d))})]})]})]})]})}const h8=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top:60px;
    left:8px;
    cursor: pointer;
    color: white;
    &:hover{
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }

  
`;function f8({}){p.useState(!1);const e=de();p.useState(!1);const[t,r]=p.useState(!0),o=cr(),{user:i}=xt(er=>er.auth),[s,a]=p.useState(""),[c,l]=p.useState([]),[d,u]=p.useState([]),f=()=>{o(ls()),o(wn()),e("/")};p.useEffect(()=>{(async()=>{try{const Pr=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");u(Pr.data)}catch(Pr){console.error("Error fetching data:",Pr)}})()},[]),p.useEffect(()=>{b()},[s,d]);const m=er=>{a(er.target.value)},b=()=>{const er=d.filter(Pr=>{var Ja;return(Ja=Pr.name)==null?void 0:Ja.toLowerCase().includes(s.toLowerCase())});l(er)};p.useState(!1),p.useState(!1),p.useState(!1);const[x,h]=p.useState(!0),[v,w]=p.useState(!0),[g,j]=p.useState(!0),[y,k]=p.useState(!0),[_,E]=p.useState(!0),[N,T]=p.useState(!0),[M,L]=p.useState(!0),[I,$]=p.useState(!0),[V,F]=p.useState(!0),D=()=>{h(!x)},Y=()=>{h(!x)},z=()=>{w(!v)},A=()=>{w(!v)},R=()=>{j(!g)},q=()=>{j(!g)},X=()=>{k(!y)},oe=()=>{k(!y)},J=()=>{E(!_)},xe=()=>{E(!_)},je=()=>{T(!N)},Se=()=>{T(!N)},G=()=>{L(!M)},ae=()=>{L(!M)},ge=()=>{$(!I)},te=()=>{$(!I)},we=()=>{F(!V)},Ie=()=>{F(!V)},[H,W]=p.useState(!0),ie=()=>{W(!H)},[ke,Ve]=p.useState(!1),Qe=()=>{Ve(!ke)},[Me,he]=p.useState(!1),[be,Be]=p.useState(!1),[qe,dt]=p.useState(!1),[vt,Bt]=p.useState(!1),[St,De]=p.useState(!1),[Zt,Tr]=p.useState(!1),[K,me]=p.useState(!1),[P,O]=p.useState(!1),[B,ee]=p.useState(!1),[fe,pe]=p.useState(!1),[ue,ce]=p.useState(!1),[ne,ze]=p.useState(!1),[Ye,_e]=p.useState(!1),[Ae,Xe]=p.useState(!1),[Ut,Jt]=p.useState(!1),ur=()=>{he(!Me)},Hr=()=>{Be(!be)},Ot=()=>{Bt(!vt)},$t=()=>{dt(!qe)},yr=()=>{De(!St)},Vr=()=>{Tr(!Zt)},qr=()=>{me(!K)},Yr=()=>{O(!P)},Ee=()=>{ee(!B)},zt=()=>{pe(!fe)},qt=()=>{ce(!ue)},Kr=()=>{ze(!ne)},Ge=()=>{_e(!Ye)},kt=()=>{Xe(!Ae)},Lt=()=>{Jt(!Ut)};return n.jsxs(p8,{children:[n.jsx("div",{className:"flex justify-between flex-col  items-center "}),n.jsx(g8,{children:H?n.jsx(m8,{children:window.innerWidth<=768?n.jsx(em,{size:30,color:"white",onClick:ie}):n.jsx(x8,{children:t?n.jsx("img",{src:tn}):n.jsx("img",{src:tn})})}):n.jsxs(v8,{onMouseLeave:ie,children:[n.jsxs("div",{className:"flex align-middle justify-between",children:[i&&n.jsx("button",{className:"bg-red-600 text-white  px-3 rounded-md text-xs cursor-pointer  transition-colors duration-300 ease-in-out",onClick:f,children:"Logout"}),n.jsx("button",{className:" w-8 h-8 text-sm rounded-full text-white",onClick:ie,children:" X "})]}),n.jsxs("div",{className:"mt-33",children:[i&&n.jsx("div",{className:"",children:n.jsxs("div",{className:" flex gap-5 align-middle my-4 ",children:[n.jsx("img",{className:" w-8 h-8",src:tn,onClick:()=>{e("/dashboard")}}),n.jsx("h1",{className:"text-sm self-center ",children:i.name})]})}),!ke&&n.jsxs(n.Fragment,{children:[!i&&n.jsxs("div",{onClick:()=>{e("/login")},children:[" ",n.jsx("button",{className:"font-semibold text-[10px] w-28 h-10 bg-red-950 text-white rounded-md",children:"Sign In / Register"})]}),n.jsx("div",{className:"search_tab",children:n.jsxs("div",{className:"flex items-center",children:[x?n.jsx("img",{src:va,onMouseEnter:D}):n.jsx("img",{src:wa,onMouseOut:Y}),n.jsx("input",{type:"text",placeholder:"Search...",value:s,onChange:m,className:"ml-2 p-1 bg-transparent  border-b border-white text-red-200 text-sm focus:outline-none"})]})}),n.jsx("div",{className:"search_results",children:c.map((er,Pr)=>n.jsx("div",{className:"search_result_item",children:er.name},Pr))}),n.jsxs("div",{className:"home_tab",onClick:()=>{e("/")},children:[v?n.jsx("img",{src:ga,onMouseEnter:z}):n.jsx("img",{src:Sa,onMouseOut:A}),n.jsx("p",{children:"Home"})]}),n.jsxs("div",{className:"recommended_tab",onClick:()=>{e("/recommended")},children:[g?n.jsx("img",{src:ya,onMouseEnter:R}):n.jsx("img",{src:ba,onMouseOut:q}),n.jsx("p",{children:"Recommended"})]}),n.jsxs("div",{className:"new_tab",onClick:()=>{e("/newplaymood")},children:[y?n.jsx("img",{src:fa,onMouseEnter:X}):n.jsx("img",{src:ka,onMouseOut:oe}),n.jsx("p",{children:"New on playmood"})]}),n.jsxs("div",{className:"channels_tab",onClick:()=>{e("/channels")},children:[_?n.jsx("img",{src:pa,onMouseEnter:J}):n.jsx("img",{src:Na,onMouseOut:xe}),n.jsx("p",{children:"Channels"})]}),n.jsxs("div",{className:"spaces_tab",onClick:()=>{e("/spaces")},children:[N?n.jsx("img",{src:ja,onMouseEnter:je}):n.jsx("img",{src:Ca,onMouseOut:Se}),n.jsx("p",{children:"Spaces"})]}),n.jsxs("div",{className:"schedule_tab",onClick:()=>{e("/schedule")},children:[M?n.jsx("img",{src:_a,onMouseEnter:G}):n.jsx("img",{src:Ea,onMouseOut:ae}),n.jsx("p",{children:"Schedule"})]}),n.jsxs("div",{className:"favorites_tab",onClick:()=>{e("/favourites")},children:[I?n.jsx("img",{src:ma,onMouseEnter:ge}):n.jsx("img",{src:Pa,onMouseOut:te}),n.jsx("p",{children:"Favorites"})]})]}),n.jsxs("div",{className:"categories",onClick:Qe,children:[V?n.jsx("img",{src:xa,onMouseEnter:Ie}):n.jsx("img",{src:Ta,onMouseOut:we}),n.jsx("p",{children:"Categories"})]}),ke&&n.jsxs("div",{className:"categories_subsection",children:[n.jsx("h3",{onClick:ur,children:"TOP 10"}),Me&&n.jsx(ye,{}),n.jsx("h3",{onClick:Hr,children:"New on Playmood"}),be&&n.jsx(ye,{}),n.jsx("h3",{onClick:$t,children:"Channels"}),qe&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ot,children:"Diaries"}),vt&&n.jsx(ye,{}),n.jsx("h3",{onClick:yr,children:"Spaces"}),St&&n.jsx(ye,{}),n.jsx("h3",{onClick:Vr,children:"Recommendations for you"}),Zt&&n.jsx(ye,{}),n.jsx("h3",{onClick:qr,children:"Interviews"}),K&&n.jsx(ye,{}),n.jsx("h3",{onClick:Yr,children:"Fashion Shows Stories"}),P&&n.jsx(ye,{}),n.jsx("h3",{onClick:yr,children:"Spaces"}),St&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ee,children:"Documentaries and Reports"}),B&&n.jsx(ye,{}),n.jsx("h3",{onClick:zt,children:"Behind the cameras"}),fe&&n.jsx(ye,{}),n.jsx("h3",{onClick:qt,children:"Soon in Playmood"}),ue&&n.jsx(ye,{}),n.jsx("h3",{onClick:Kr,children:"Teen"}),ne&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ge,children:"Best in Fashion"}),Ye&&n.jsx(ye,{}),n.jsx("h3",{onClick:kt,children:"Only in Playmood"}),Ae&&n.jsx(ye,{}),n.jsx("h3",{onClick:Lt,children:"Watchlist"}),Ut&&n.jsx(ye,{})]})]})]})})]})}const p8=S.div`
    height: 80px;
    width: 100%;
    // background-color: rgba(0,0,0,0.6);

    color: white;
    position: fixed;
    top: 0px;
    left: 0px; 
    // z-index: 1001;
`;S.div` 
    width:100%;
    height: fit-content;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    padding:5px 5px 5px 60px;   
`;S.div`h
  width:100%;
  display:flex;
  justify-content: space-between;
  margin-top:15px;
  .links{
    display:flex;
    color: white;
    text-decoration: none;
    font-size: 0.7rem;
    font-weight: 500;
    padding-left:5px;
    @media screen and (max-width: 600px){
        font-size: 0.5rem;
    }
    &:hover{
        color:rgb(140,7,52);
        font-weight: 700;
    }
}
}
`;S.div`
    width:100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: Space-between;
    gap: 10px; 
    .profile-container{
      width: 40px;
      background-color:rgb(140,7,52);
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:100%;
        cursor: pointer;
       
        img{
            width: 80%;
            height: 80%;
            
          
           
        }
    }
    .main-logo{
        height: 40px;
        width:auto;
        cursor: pointer;
        padding-right:150px;
    }
`;const m8=S.div`
    width: 60px; 
    height: 100vh;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    img{
        height: 40px;
        width: 40px;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
      left: 0;  // Align to the left instead of right
      right: unset;  // Remove the right positioning
      // Full width on mobile screens
  }
`,x8=S.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px solid rgba(255,255,255,0.4);
`;S.div`
    height: fit-content;
    width:100%;
    background-color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 30px 0px 30px 0px;
    gap: 40px;
    img{
        width: 25px;
        height: 25px;
    }
`;const g8=S.div`
    display: flex;
    height: 10%;
    align-items: center;
    gap: 30px;
    position: relative;
    top: 10px;
    left: -10px;
    // z-index: 1000;

`,v8=S.div`
width: 250px;
height: 100vh;
background-color: black;
top: 0;
left: 0; // Align to the left
position: fixed;
padding: 20px 10px 0px 10px;
display: flex;
flex-direction: column;
gap: 18px;

    .categories_subsection{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        padding-left: 50px;
        gap: 15px;
        h3{
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            cursor: pointer;
        }
    }
    .user_and_settings{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
        }
        .head_section{
            h1{
                font-size: 0.8rem;
            }
            p{
                font-size: 0.6rem;
            }
            cursor: pointer;
        }
    }
    .search_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 10px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .home_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .recommended_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .new_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .channels_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .spaces_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .schedule_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .favorites_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .categories{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 768px) {
      left: 0;  // Align to the left instead of right
      right: unset;  // Remove the right positioning
      // Full width on mobile screens
  }

`,oi=Ne.memo(function({img:t,title:r,movie:o,views:i,desc:s,customStyle:a,progress:c,onVideoClick:l}){var je,Se;const[d,u]=p.useState(!1),[f,m]=p.useState(!1),[b,x]=p.useState(!1),[h,v]=p.useState(!1),[w,g]=p.useState(null),[j,y]=p.useState({show:!1,message:"",isError:!1}),[k,_]=p.useState({start:0,end:15}),E=cr(),{user:N}=xt(G=>G.auth),T=p.useRef(null);p.useEffect(()=>{var G,ae;if((G=o==null?void 0:o.shortPreview)!=null&&G.start&&((ae=o==null?void 0:o.shortPreview)!=null&&ae.end))_({start:o.shortPreview.start,end:o.shortPreview.end});else{const ge=document.createElement("video");return ge.src=(o==null?void 0:o.video)||"",ge.preload="metadata",ge.onloadedmetadata=()=>{const te=ge.duration||300,we=Math.floor(Math.random()*6)+10,Ie=Math.max(0,te-we),H=Math.floor(Math.random()*Ie),W=H+we;_({start:H,end:W}),ge.remove()},ge.onerror=()=>{console.error("Error loading video metadata:",o==null?void 0:o.video),_({start:0,end:10}),ge.remove()},()=>{ge.remove()}}},[o]),p.useEffect(()=>{const G=()=>{m(window.innerWidth<=768)};return window.addEventListener("resize",G),G(),()=>window.removeEventListener("resize",G)},[]);const M=()=>{u(!0),v(!0),T.current&&(T.current.currentTime=k.start,T.current.play().catch(G=>{console.error("Error playing video on hover:",G),v(!1)}))},L=()=>{u(!1),v(!1),T.current&&(T.current.pause(),T.current.currentTime=k.start)},I=G=>{G.preventDefault(),f?h||(u(!0),v(!0),T.current&&(T.current.currentTime=k.start,T.current.play().catch(ae=>{console.error("Error playing video on click:",ae),v(!1)}))):l()},$=G=>{G.stopPropagation(),h&&(l(),u(!1),v(!1),T.current&&T.current.pause())},V=async G=>{G.stopPropagation(),g(null);try{if(!N){xe(!0);return}const ae=o==null?void 0:o._id;if(!ae){g("Content ID is missing. Please try again."),console.error("Content ID not found in movie object:",o);return}q?await E(On({contentId:ae})).unwrap():await E(Pn({contentId:ae})).unwrap()}catch(ae){console.error("Like error:",ae),g("Failed to like/unlike content. Please try again.")}},F=async G=>{G.stopPropagation(),g(null);try{if(!N){xe(!0);return}const ae=o==null?void 0:o._id;if(!ae){g("Content ID is missing. Please try again.");return}const ge=N.userId||N._id;if(!ge){g("User ID is missing. Please log in again."),xe(!0);return}X?await E(Rn({userId:ge,contentId:ae})).unwrap():await E(zn({userId:ge,contentId:ae})).unwrap()}catch(ae){console.error("Watchlist error:",ae),g("Failed to update watchlist. Please try again.")}},D=G=>{G.stopPropagation(),x(!b)},Y=G=>{G.stopPropagation();const ae=window.location.href;navigator.clipboard.writeText(ae).then(()=>{y({show:!0,message:"Link copied to clipboard!",isError:!1}),setTimeout(()=>y({show:!1,message:"",isError:!1}),3e3)}).catch(ge=>{console.error("Failed to copy: ",ge),y({show:!0,message:"Failed to copy link. Please try again.",isError:!0}),setTimeout(()=>y({show:!1,message:"",isError:!1}),3e3)})},z=()=>{y({show:!1,message:"",isError:!1})},A=(r==null?void 0:r.slice(0,30))+"...",R=(s==null?void 0:s.slice(0,100))+"...",q=((je=N==null?void 0:N.like)==null?void 0:je.includes(o==null?void 0:o._id))||!1,X=((Se=N==null?void 0:N.watchlist)==null?void 0:Se.includes(o==null?void 0:o._id))||!1,oe=o==null?void 0:o.user,[J,xe]=p.useState(!1);return n.jsxs("div",{className:"relative overflow-hidden w-full h-[78%] mr-0.5",onMouseEnter:f?null:M,onMouseLeave:f?null:L,children:[j.show&&n.jsxs(w8,{isError:j.isError,children:[n.jsx("p",{children:j.message}),n.jsx("button",{onClick:z,children:"Close"})]}),n.jsx("div",{className:"absolute top-2.5 w-full px-1 flex justify-between"}),!d&&!h?n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"h-[70%]",children:n.jsx("img",{className:"w-full h-full object-cover cursor-pointer",src:t,alt:r,onClick:I})}),n.jsxs("div",{className:"absolute bottom-0 w-full bg-black bg-opacity-50 flex justify-between p-3 gap-2.5",children:[n.jsx("h3",{className:"text-white text-base font-normal leading-6 w-[80%]",style:a||{},children:A}),f&&n.jsx(pm,{className:"text-white w-1/5 h-10 cursor-pointer",onClick:D})]})]}):n.jsxs("div",{className:"flex flex-col justify-between h-full w-full",children:[n.jsx("div",{className:"h-20 w-full bg-black"}),n.jsx("video",{ref:T,playsInline:!0,loop:!0,autoPlay:h,muted:!0,className:"w-full object-cover h-36 cursor-pointer",onClick:$,children:n.jsx("source",{src:o!=null&&o.video?`${o.video}#t=${k.start},${k.end}`:""})}),n.jsxs("div",{className:"h-52 w-full bg-black p-2 flex flex-col gap-2 mb-8",onClick:G=>G.stopPropagation(),children:[n.jsxs("div",{className:"flex justify-between align-middle",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("div",{className:"flex w-20 h-4 rounded-sm bg-white justify-center gap-1 items-center",children:n.jsxs("h6",{className:"text-black text-[0.35rem]",children:["By: ",(oe==null?void 0:oe.name)||"Anonymous"]})}),n.jsxs("div",{className:"flex items-center gap-1 text-white text-[0.5rem]",children:[n.jsx(mm,{className:"text-white"}),n.jsx("span",{children:i||0})]})]}),n.jsxs("div",{className:"flex justify-end gap-1 items-center",children:[n.jsx(an,{className:`cursor-pointer ${q?"text-red-600 fill-current":"text-gray-400"}`,onClick:V}),n.jsx("span",{className:`cursor-pointer ${X?"text-green-600":"text-gray-400"}`,onClick:F,children:X?n.jsx(Go,{}):n.jsx(An,{})}),n.jsx(yo,{className:"text-white cursor-pointer",onClick:Y})]})]}),n.jsx("h4",{className:"text-white text-sm font-semibold",style:a||{},children:A}),n.jsx("p",{className:"text-white text-xs font-light",children:R}),c>0&&n.jsx("div",{className:"w-full bg-gray-700 rounded-full h-2",children:n.jsx("div",{className:"bg-red-600 h-2 rounded-full",style:{width:`${c/300*100}%`}})})]})]}),b&&n.jsxs("div",{className:"absolute bottom-12 right-5 p-2 bg-black bg-opacity-80 text-white rounded-lg shadow-lg flex flex-col items-center space-y-2",onClick:G=>G.stopPropagation(),children:[n.jsx(an,{className:`cursor-pointer ${q?"text-red-600 fill-current":"text-gray-400"}`,onClick:V}),n.jsx("span",{className:`cursor-pointer ${X?"text-green-600":"text-gray-400"}`,onClick:F,children:X?n.jsx(Go,{}):n.jsx(An,{})}),n.jsx(yo,{className:"text-white cursor-pointer",onClick:Y})]}),J&&n.jsx(ss,{showPopup:J,onClose:()=>xe(!1),onLogin:()=>xe(!1),onRegister:()=>xe(!1)})]})}),w8=S.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({isError:e})=>"#541011"};
  color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: 300px;

  p {
    margin: 0;
    font-size: 14px;
    text-align: center;
  }

  button {
    background: #fff;
    color: ${({isError:e})=>e?"#ff4d4f":"#28a745"};
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }
`;function y8(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1);p.useEffect(()=>{async function x(){try{console.log("Requesting data from API");const h=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(h.data&&Array.isArray(h.data)){const v=h.data.filter(w=>w.category==="Top 10");r(v)}else console.error("Unexpected data format:",h.data),i("Unexpected data format.")}catch(h){console.error("Error fetching data:",h),i("Error fetching data.")}}x()},[]);const d=x=>{a(x),l(!0)},u=()=>{l(!1),a(null)},f=(x,h)=>`${x.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${h}`,m=x=>{const h=f(x.title,x._id);console.log("Navigating to movie with slug:",h),e(`/movie/${h}`)},b={dots:!1,infinite:!0,speed:500,slidesToShow:5,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:3e3,autoplaySpeed:3e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]};return n.jsxs(n.Fragment,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...b,children:Array.isArray(t)&&t.map(x=>n.jsx("div",{className:"slides",children:n.jsx(oi,{img:x.thumbnail,title:x.title,movie:x,views:x.views,desc:x.description,customStyle:{},onVideoClick:()=>d(x)})},x._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:u,handleNavigateToMovie:m})]})}function b8(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),[s,a]=p.useState(null),[c,l]=p.useState(!1);p.useEffect(()=>{async function x(){try{console.log("Requesting data from API");const h=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(h.data&&Array.isArray(h.data)){const v=h.data.filter(w=>w.category==="Top 10");r(v)}else console.error("Unexpected data format:",h.data),i("Unexpected data format.")}catch(h){console.error("Error fetching data:",h),i("Error fetching data.")}}x()},[]);const d=x=>{a(x),l(!0)},u=()=>{l(!1),a(null)},f=(x,h)=>`${x.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${h}`,m=x=>{const h=f(x.title,x._id);console.log("Navigating to movie with slug:",h),e(`/movie/${h}`)},b={dots:!1,infinite:!0,speed:500,slidesToShow:5,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:3e3,autoplaySpeed:3e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]};return n.jsxs(n.Fragment,{children:[o?n.jsx("div",{className:"error-message",children:o}):n.jsx(gt,{...b,children:Array.isArray(t)&&t.map((x,h)=>n.jsx("div",{className:"slides",onClick:()=>d(x),children:n.jsx(oi,{img:x.thumbnail,title:x.title,movie:x,views:x.views,desc:x.description,customStyle:{},onVideoClick:()=>d(x)})},x._id))}),n.jsx(dr,{isOpen:c,content:s,onClose:u,handleNavigateToMovie:m})]})}function j8({}){p.useState(!1);const e=de();p.useState(!1),p.useState(!0);const t=cr(),{user:r}=xt(kt=>kt.auth),[o,i]=p.useState(""),[s,a]=p.useState([]),[c,l]=p.useState([]),d=()=>{t(ls()),t(wn()),e("/")};p.useEffect(()=>{(async()=>{try{const Lt=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");l(Lt.data)}catch(Lt){console.error("Error fetching data:",Lt)}})()},[]),p.useEffect(()=>{f()},[o,c]);const u=kt=>{i(kt.target.value)},f=()=>{const kt=c.filter(Lt=>{var er;return(er=Lt.name)==null?void 0:er.toLowerCase().includes(o.toLowerCase())});a(kt)};p.useState(!1),p.useState(!1),p.useState(!1);const[m,b]=p.useState(!0),[x,h]=p.useState(!0),[v,w]=p.useState(!0),[g,j]=p.useState(!0),[y,k]=p.useState(!0),[_,E]=p.useState(!0),[N,T]=p.useState(!0),[M,L]=p.useState(!0),[I,$]=p.useState(!0),V=()=>{b(!m)},F=()=>{b(!m)},D=()=>{h(!x)},Y=()=>{h(!x)},z=()=>{w(!v)},A=()=>{w(!v)},R=()=>{j(!g)},q=()=>{j(!g)},X=()=>{k(!y)},oe=()=>{k(!y)},J=()=>{E(!_)},xe=()=>{E(!_)},je=()=>{T(!N)},Se=()=>{T(!N)},G=()=>{L(!M)},ae=()=>{L(!M)},ge=()=>{$(!I)},te=()=>{$(!I)},[we,Ie]=p.useState(!0),H=()=>{Ie(!we)},[W,ie]=p.useState(!1),ke=()=>{ie(!W)},[Ve,Qe]=p.useState(!1),[Me,he]=p.useState(!1),[be,Be]=p.useState(!1),[qe,dt]=p.useState(!1),[vt,Bt]=p.useState(!1),[St,De]=p.useState(!1),[Zt,Tr]=p.useState(!1),[K,me]=p.useState(!1),[P,O]=p.useState(!1),[B,ee]=p.useState(!1),[fe,pe]=p.useState(!1),[ue,ce]=p.useState(!1),[ne,ze]=p.useState(!1),[Ye,_e]=p.useState(!1),[Ae,Xe]=p.useState(!1),Ut=()=>{Qe(!Ve)},Jt=()=>{he(!Me)},ur=()=>{dt(!qe)},Hr=()=>{Be(!be)},Ot=()=>{Bt(!vt)},$t=()=>{De(!St)},yr=()=>{Tr(!Zt)},Vr=()=>{me(!K)},qr=()=>{O(!P)},Yr=()=>{ee(!B)},Ee=()=>{pe(!fe)},zt=()=>{ce(!ue)},qt=()=>{ze(!ne)},Kr=()=>{_e(!Ye)},Ge=()=>{Xe(!Ae)};return n.jsxs(S8,{children:[n.jsx("div",{className:"flex justify-between flex-col  items-center "}),n.jsx(N8,{children:we?n.jsx(k8,{children:window.innerWidth>768?n.jsx(em,{size:30,color:"white",onClick:H}):n.jsx("div",{})}):n.jsxs(C8,{onMouseLeave:H,children:[n.jsxs("div",{className:"flex align-middle justify-between",children:[r&&n.jsx("button",{className:"bg-red-600 text-white  px-3 rounded-md text-xs cursor-pointer  transition-colors duration-300 ease-in-out",onClick:d,children:"Logout"}),n.jsx("button",{className:" w-8 h-8 text-sm rounded-full text-white",onClick:H,children:" X "})]}),n.jsxs("div",{className:"mt-33",children:[r&&n.jsx("div",{className:"",children:n.jsxs("div",{className:" flex gap-5 align-middle my-4 ",children:[n.jsx("img",{className:" w-8 h-8",src:tn,onClick:()=>{e("/dashboard")}}),n.jsx("h1",{className:"text-sm self-center ",children:r.name})]})}),!W&&n.jsxs(n.Fragment,{children:[!r&&n.jsxs("div",{onClick:()=>{e("/login")},children:[" ",n.jsx("button",{className:"font-semibold text-[10px] w-28 h-10 bg-red-950 text-white rounded-md",children:"Sign In / Register"})]}),n.jsx("div",{className:"search_tab",children:n.jsxs("div",{className:"flex items-center",children:[m?n.jsx("img",{src:va,onMouseEnter:V}):n.jsx("img",{src:wa,onMouseOut:F}),n.jsx("input",{type:"text",placeholder:"Search...",value:o,onChange:u,className:"ml-2 p-1 bg-transparent  border-b border-white text-red-200 text-sm focus:outline-none"})]})}),n.jsx("div",{className:"search_results",children:s.map((kt,Lt)=>n.jsx("div",{className:"search_result_item",children:kt.name},Lt))}),n.jsxs("div",{className:"home_tab",onClick:()=>{e("/")},children:[x?n.jsx("img",{src:ga,onMouseEnter:D}):n.jsx("img",{src:Sa,onMouseOut:Y}),n.jsx("p",{children:"Home"})]}),n.jsxs("div",{className:"recommended_tab",onClick:()=>{e("/recommended")},children:[v?n.jsx("img",{src:ya,onMouseEnter:z}):n.jsx("img",{src:ba,onMouseOut:A}),n.jsx("p",{children:"Recommended"})]}),n.jsxs("div",{className:"new_tab",onClick:()=>{e("/newplaymood")},children:[g?n.jsx("img",{src:fa,onMouseEnter:R}):n.jsx("img",{src:ka,onMouseOut:q}),n.jsx("p",{children:"New on playmood"})]}),n.jsxs("div",{className:"channels_tab",onClick:()=>{e("/channels")},children:[y?n.jsx("img",{src:pa,onMouseEnter:X}):n.jsx("img",{src:Na,onMouseOut:oe}),n.jsx("p",{children:"Channels"})]}),n.jsxs("div",{className:"spaces_tab",onClick:()=>{e("/spaces")},children:[_?n.jsx("img",{src:ja,onMouseEnter:J}):n.jsx("img",{src:Ca,onMouseOut:xe}),n.jsx("p",{children:"Spaces"})]}),n.jsxs("div",{className:"schedule_tab",onClick:()=>{e("/schedule")},children:[N?n.jsx("img",{src:_a,onMouseEnter:je}):n.jsx("img",{src:Ea,onMouseOut:Se}),n.jsx("p",{children:"Schedule"})]}),n.jsxs("div",{className:"favorites_tab",onClick:()=>{e("/favourites")},children:[M?n.jsx("img",{src:ma,onMouseEnter:G}):n.jsx("img",{src:Pa,onMouseOut:ae}),n.jsx("p",{children:"Favorites"})]})]}),n.jsxs("div",{className:"categories",onClick:ke,children:[I?n.jsx("img",{src:xa,onMouseEnter:te}):n.jsx("img",{src:Ta,onMouseOut:ge}),n.jsx("p",{children:"Categories"})]}),W&&n.jsxs("div",{className:"categories_subsection",children:[n.jsx("h3",{onClick:Ut,children:"TOP 10"}),Ve&&n.jsx(ye,{}),n.jsx("h3",{onClick:Jt,children:"New on Playmood"}),Me&&n.jsx(ye,{}),n.jsx("h3",{onClick:Hr,children:"Channels"}),be&&n.jsx(ye,{}),n.jsx("h3",{onClick:ur,children:"Diaries"}),qe&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ot,children:"Spaces"}),vt&&n.jsx(ye,{}),n.jsx("h3",{onClick:$t,children:"Recommendations for you"}),St&&n.jsx(ye,{}),n.jsx("h3",{onClick:yr,children:"Interviews"}),Zt&&n.jsx(ye,{}),n.jsx("h3",{onClick:Vr,children:"Fashion Shows Stories"}),K&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ot,children:"Spaces"}),vt&&n.jsx(ye,{}),n.jsx("h3",{onClick:qr,children:"Documentaries and Reports"}),P&&n.jsx(ye,{}),n.jsx("h3",{onClick:Yr,children:"Behind the cameras"}),B&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ee,children:"Soon in Playmood"}),fe&&n.jsx(ye,{}),n.jsx("h3",{onClick:zt,children:"Teen"}),ue&&n.jsx(ye,{}),n.jsx("h3",{onClick:qt,children:"Best in Fashion"}),ne&&n.jsx(ye,{}),n.jsx("h3",{onClick:Kr,children:"Only in Playmood"}),Ye&&n.jsx(ye,{}),n.jsx("h3",{onClick:Ge,children:"Watchlist"}),Ae&&n.jsx(ye,{})]})]})]})})]})}const S8=S.div`
    height: 80px;
    width: 100%;
    // background-color: rgba(0,0,0,0.6);

    color: white;
    position: fixed;
    top: 0px;
    right: 0px; 
     z-index: 10;
`;S.div`
    width:100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: Space-between;
    gap: 10px; 
    .profile-container{
      width: 40px;
      background-color:rgb(140,7,52);
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:100%;
        cursor: pointer;
       
        img{
            width: 80%;
            height: 80%;
            
          
           
        }
    }
    .main-logo{
        height: 40px;
        width:auto;
        cursor: pointer;
        padding-right:150px;
    }
`;const k8=S.div`
    width: 60px; 
    height: 100vh;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    img{
        height: 40px;
        width: 40px;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
      left: 0;  // Align to the left instead of right
      right: unset;  // Remove the right positioning
      // Full width on mobile screens
  }
`;S.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px solid rgba(255,255,255,0.4);
`;const N8=S.div`
    display: flex;
    height: 10%;
    align-items: center;
    gap: 30px;
    position: relative;
    top: 10px;
    right: 0px;
    // z-index: 1000;

`,C8=S.div`
width: 250px;
height: 100vh;
background-color: black;
top: 0;
right: 0; // Align to the left
position: fixed;
padding: 20px 10px 0px 10px;
display: flex;
flex-direction: column;
gap: 18px;

    .categories_subsection{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        padding-left: 50px;
        gap: 15px;
        h3{
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            cursor: pointer;
        }
    }
    .user_and_settings{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
        }
        .head_section{
            h1{
                font-size: 0.8rem;
            }
            p{
                font-size: 0.6rem;
            }
            cursor: pointer;
        }
    }
    .search_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 10px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .home_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .recommended_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .new_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .channels_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .spaces_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .schedule_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .favorites_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .categories{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
`;function _8(){const[e,t]=p.useState(!1),[r,o]=p.useState(!1),[i,s]=p.useState(!1),[a,c]=p.useState(!1),[l,d]=p.useState(!0),[u,f]=p.useState(!1),[m,b]=p.useState(null),[x,h]=p.useState(null),[v,w]=p.useState(!1),[g,j]=p.useState(""),[y,k]=p.useState(""),[_,E]=p.useState([]),[N,T]=p.useState(1),[M,L]=p.useState(!1),I=5,$=de(),{user:V}=xt(W=>W.auth),{slug:F}=Up(),D=F&&/^[0-9a-fA-F]{24}$/.test(F.split("-").pop())?F.split("-").pop():null,Y=p.useRef(null),z=async W=>{var ie;if(!V||!V.token||!D){console.warn("Cannot save progress: Missing user, token, or contentId",{user:V,contentId:D,currentTime:W});return}try{console.log("Saving progress for contentId:",D,"time:",W);const ke=await Z.post("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/progress/",{contentId:D,progress:W},{headers:{Authorization:`Bearer ${V.token}`}});console.log("Progress saved successfully:",ke.data)}catch(ke){console.error("Error saving video progress:",((ie=ke.response)==null?void 0:ie.data)||ke.message)}},A=()=>{if(Y.current){const W=Y.current.currentTime;Math.floor(W)%5===0&&W>0&&z(W)}};p.useEffect(()=>{const W=Y.current;return W&&(W.addEventListener("timeupdate",A),W.addEventListener("pause",()=>{W.currentTime>0&&z(W.currentTime)})),()=>{W&&W.currentTime>0&&(W.removeEventListener("timeupdate",A),W.removeEventListener("pause",()=>z(W.currentTime)),z(W.currentTime))}},[D,V]),p.useEffect(()=>{(async()=>{var ie,ke,Ve;if(!D){console.error("Invalid contentId:",D,"Slug:",F),h("Invalid movie ID."),d(!1);return}try{console.log("Fetching movie data for contentId:",D);const Qe=await Z.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${D}?page=${N}&limit=${I}`,{headers:{Authorization:`Bearer ${(V==null?void 0:V.token)||""}`}});b(Qe.data),E(Qe.data.comments||[]),L(((ie=Qe.data.comments)==null?void 0:ie.length)===I)}catch(Qe){console.error("Error fetching movie:",((ke=Qe.response)==null?void 0:ke.data)||Qe.message),h(((Ve=Qe.response)==null?void 0:Ve.status)===401?"Please sign in to view this content.":"Failed to load movie data.")}finally{d(!1)}})()},[D,V,N]);const R=async()=>{var W;f(!0);try{const ie=N+1,ke=await Z.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${D}/comments?page=${ie}&limit=${I}`,{headers:{Authorization:`Bearer ${(V==null?void 0:V.token)||""}`}});E([..._,...ke.data.comments]),T(ie),L(ke.data.comments.length===I)}catch(ie){console.error("Error fetching more comments:",((W=ie.response)==null?void 0:W.data)||ie.message),k("Failed to load more comments. Please try again.")}finally{f(!1)}},q=async W=>{var ie,ke,Ve,Qe;if(W.preventDefault(),!V||!V.token){w(!0);return}if(!g.trim()){k("Comment cannot be empty.");return}if(!D||typeof D!="string"||D.trim()===""){k("Invalid content ID. Please try again."),console.error("Invalid contentId:",D);return}try{const Me=`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${D}/comment`,he={contentId:D,text:g};console.log("Submitting comment:",{url:Me,payload:he,contentId:D,token:V.token.substring(0,10)+"..."});const be=await Z.post(Me,he,{headers:{Authorization:`Bearer ${V.token}`,"Content-Type":"application/json"}});console.log("Comment response:",be.data),E([be.data.comment,..._]),j(""),k(""),T(1),L(!0)}catch(Me){console.error("Error adding comment:",{response:(ie=Me.response)==null?void 0:ie.data,status:(ke=Me.response)==null?void 0:ke.status,message:Me.message});const he=((Qe=(Ve=Me.response)==null?void 0:Ve.data)==null?void 0:Qe.error)||"Failed to add comment. Please try again.";k(he)}},X=async()=>{var W;if(!V){w(!0);return}try{(await Z.post("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe/",{creatorId:(W=m==null?void 0:m.user)==null?void 0:W._id},{headers:{Authorization:`Bearer ${V.token}`}})).status===201&&(c(!0),alert("Subscribed successfully"))}catch(ie){console.error("Error subscribing:",ie)}},oe=async()=>{var W;try{(await Z.put("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe/",{creatorId:(W=m==null?void 0:m.user)==null?void 0:W._id},{headers:{Authorization:`Bearer ${V.token}`}})).status===200&&(c(!1),alert("Unsubscribed successfully"))}catch(ie){console.error("Error unsubscribing:",ie)}};if(l)return n.jsx("div",{className:"flex justify-center items-center h-screen bg-black text-white",children:n.jsxs("div",{className:"flex flex-col items-center",children:[n.jsx("img",{src:Ze,alt:"Loading logo",className:"w-32 mb-5 animate-bounce"}),n.jsx("p",{className:"text-lg font-semibold animate-pulse",children:"Loading..."})]})});if(x||!m)return n.jsxs("div",{className:"flex flex-col items-center justify-center h-screen text-center bg-black",children:[n.jsx("h1",{className:"text-2xl font-semibold mb-4 text-white",children:x}),n.jsx("button",{className:"px-4 py-2 bg-[#541011] text-white rounded-lg hover:bg-white hover:text-[#541011] transition duration-200",onClick:()=>$("/login"),children:"Sign In"})]});const J=()=>{Y.current&&(Y.current.currentTime=0,Y.current.play())},xe=()=>{if(!V){w(!0);return}s(!0),setTimeout(()=>s(!1),4e3)},je=()=>{const W=window.location.href;navigator.clipboard.writeText(W).then(()=>alert("URL copied to clipboard!")).catch(ie=>console.error("Failed to copy: ",ie))},Se=()=>{V?console.log("User liked the movie"):w(!0)},G=()=>{t(!e)},{title:ae,description:ge,credits:te,views:we,like:Ie,user:H}=m;return n.jsx(E8,{children:n.jsxs("div",{className:"h-auto",children:[n.jsx(j8,{}),n.jsx("div",{className:"video-container relative mt-20",children:n.jsx("video",{muted:!0,playsInline:!0,autoPlay:!0,controls:!0,ref:Y,controlsList:"nodownload",className:`object-cover z-1 ${r?"bottom-0 right-0 w-52":"w-full h-[550px] static"} md:${r?"h-auto":"h-[200px]"}`,children:n.jsx("source",{src:m==null?void 0:m.video,type:"video/mp4"})})}),n.jsx(T8,{children:n.jsx(f8,{})}),n.jsx("div",{className:"movie-title",children:n.jsx("h1",{children:ae})}),n.jsxs("div",{className:"home-page-icon",children:[n.jsx("img",{src:Ze,alt:"",onClick:()=>$("/")}),n.jsx("img",{src:tn,onClick:()=>$(V?"/dashboard":"/login")})]}),n.jsxs("div",{className:"flex flex-col md:flex-row w-full gap-[3rem] md:gap-[8rem] h-auto my-[2rem] mx-12",children:[n.jsxs("div",{className:"w-[100%] md:w-[30%]",children:[n.jsxs("div",{className:"mb-3",children:[n.jsxs("div",{className:"h-auto w-[300px] md:flex-row my-5 md:my-0",children:[n.jsxs("p",{className:"text-[15px] md:text-[12px] sm:text-[10px] p-[15px] md:p-[5px] cursor-pointer text-white hover:text-red-500",children:["Title: ",ae]}),n.jsxs("div",{className:"flex gap-2 px-3 justify-between align-middle my-5",children:[n.jsxs("div",{className:"flex gap-1 items-center",children:[n.jsx(mm,{className:"text-white"}),n.jsx("h6",{className:"text-white text-[0.6rem]",children:we||0})]}),n.jsxs("div",{className:"flex gap-1 items-center",onClick:Se,children:[n.jsx(an,{className:"text-white cursor-pointer"}),n.jsx("h6",{className:"text-white text-[0.6rem]",children:Ie||0})]}),n.jsx("div",{className:"flex gap-1 items-center",onClick:je,children:n.jsx(y3,{className:"text-white cursor-pointer"})})]})]}),n.jsxs("div",{className:"h-[50px] w-[300px] flex gap-[50px] relative md:p-[5px]",children:[n.jsxs("button",{className:"w-[50%] gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] px-[15px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]",onClick:J,children:[n.jsx(q1,{})," Play Again"]}),n.jsx("button",{className:"w-[50%] gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] px-[15px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]",children:"NEXT VIDEO"})]})]}),n.jsxs("div",{className:"h-[50px] w-[300px] flex gap-[10px] relative md:flex-col p-[5px] mb-0 md:mb-8",children:[n.jsxs("button",{className:"md:w-[40%] gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px]",children:[n.jsx(j3,{})," By: ",H?H.name:"Anonymous"]}),n.jsxs("button",{onClick:xe,className:"bg-[#541011] gap-2 md:w-[40%] text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px]",children:[n.jsx(w3,{})," Donate"]}),n.jsxs("button",{onClick:a?oe:X,className:`bg-[#541011] md:w-[40%] gap-2 text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px] ${a?"btn-danger":"btn-success"}`,children:[n.jsx(H1,{})," ",a?"Unsubscribe":"Subscribe"]})]})]}),n.jsx("div",{className:"mt-1 md:mt-0 h-auto w-[100%] md:w-[30%]",children:n.jsxs("div",{className:"movie-right-cont h-auto",children:[n.jsxs("div",{className:"menutitle ml-[18px] flex items-center gap-[30px] h-[50px] mx-auto",children:[n.jsx("p",{className:"production_par cursor-pointer text-white hover:text-red-500",onClick:()=>t(!1),children:"Information"}),n.jsx("button",{className:"gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] px-[15px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]",onClick:G,children:"Production ~ Credits"})]}),i&&n.jsx("div",{className:"popup-message fixed top-[200px] right-[100px] bg-[rgba(0,0,0,0.8)] text-white p-[10px_20px] rounded z-[9999] text-[12px] animate-fadeOut",children:"Added to favorites!"}),n.jsx("div",{children:e?n.jsx("div",{className:"flex items-center justify-between text-white w-[90%] mx-auto",children:n.jsxs("p",{children:[n.jsx("b",{children:"Credits: "}),te]})}):n.jsx("div",{className:"movieinformation text-white w-[90%] h-auto flex mx-auto relative md:text-[12px]",children:n.jsx("p",{children:ge})})})]})}),n.jsx("div",{className:"w-[30%]",children:n.jsxs("div",{className:"mt-1 md:mt-0 h-auto w-[100%] md:w-[70%]",children:[n.jsx("h3",{className:"text-sm font-semibold mt-4 mb-2 text-white",children:"Comments"}),y&&n.jsx(W8,{children:y}),n.jsxs(O8,{onSubmit:q,children:[n.jsx(z8,{type:"text",value:g,onChange:W=>{j(W.target.value),k("")},placeholder:"Add a comment...","aria-label":"Comment input"}),n.jsx(R8,{type:"submit",disabled:!g.trim(),children:"Post"})]}),n.jsx(M8,{children:_&&_.length>0?_.map((W,ie)=>n.jsxs(L8,{children:[n.jsxs(I8,{children:[n.jsx(A8,{src:W.user.profileImage||"https://via.placeholder.com/32",alt:W.user.name}),n.jsxs("div",{children:[n.jsx(D8,{children:W.user.name}),n.jsx(F8,{children:new Date(W.createdAt).toLocaleDateString()})]})]}),n.jsx(B8,{children:W.text})]},W._id||ie)):n.jsx(U8,{children:"No comments yet. Be the first to comment!"})}),M&&n.jsx($8,{onClick:R,disabled:u,children:u?"Loading...":"Load More"})]})})]}),n.jsxs("div",{className:"md:my-32",children:[n.jsxs("div",{id:"interviews",className:"video-category-four h-[390px] w-[90%] mx-[30px] mb-[40px] flex flex-col md:mx-[20px] md:my-[20px] md:mb-[50px]",children:[n.jsx("h3",{className:"video-category-title text-white pb-[20px] font-semibold text-[1.5rem] md:text-[1.3rem] lg:text-[1.5rem]",children:"Recommended for you"}),n.jsx(y8,{})]}),V&&n.jsxs("div",{id:"interviews",className:"video-category-four h-[380px] w-[90%] my-[30px] mx-[50px] mt-[50px] flex flex-col gap-[20px] md:mx-[20px] md:my-[20px] md:mb-[50px]",children:[n.jsx("h3",{className:"video-category-title text-white pb-[20px] font-semibold text-[1.5rem] md:text-[1.3rem] lg:text-[1.5rem]",children:"Continue Watching"}),n.jsx(b8,{})]}),n.jsx(ss,{showPopup:v,onClose:()=>w(!1),onLogin:()=>w(!1),onRegister:()=>w(!1)})]}),n.jsxs(P8,{children:[n.jsx("div",{children:n.jsx("img",{src:Ze})}),n.jsxs("div",{className:"instagrams",children:[n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",children:n.jsx("img",{src:le})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",children:"Official"})})]}),n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://www.instagram.com/playmoodlat/",children:n.jsx("img",{src:le})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodlat/",target:"_blank",children:"Latam"})})]}),n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://www.instagram.com/playmoodmx/",children:n.jsx("img",{src:le})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodmx/",target:"_blank",children:"MX"})})]})]}),n.jsx("div",{}),n.jsxs("div",{className:"contact-footer",children:[n.jsx("h2",{children:"Contact us:"}),n.jsx("h3",{children:"Creators@playmoodtv.com"}),n.jsxs("div",{children:[n.jsx("p",{onClick:()=>$("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{onClick:()=>$("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})})}const E8=S.div`
  width: auto;
  height: ${e=>e.isMinimized?"100px":"auto"};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: black;
`,T8=S.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 10px;
    left: 5px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;
    svg {
      font-size: 40px;
    }
  }
  @media (max-width: 790px) {
    svg {
      position: relative;
      z-index: 1000;
      font-size: 30px;
      top: 6px;
      left: 8px;
    }
  }
`,P8=S.div`
  height: fit-content;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 60px;
  .contact-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  }
  .instagrams {
    display: flex;
    gap: 5px;
    .instagram-official {
      display: flex;
      height: fit-content;
      align-items: center;
      color: white;
      .instagram-links a {
        text-decoration: none;
        color: white;
      }
      img {
        height: 20px;
        width: 20px;
      }
    }
  }
  div {
    height: fit-content;
    display: flex;
    gap: 10px;
    color: white;
    p {
      font-size: 0.7rem;
      cursor: pointer;
    }
    img {
      height: 80px;
      width: 100%;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
    text-align: center;
  }
`,O8=S.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`,z8=S.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #333;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #541011;
  }
`,R8=S.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover:not(:disabled) {
    background: #6b1516;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`,M8=S.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 0.25rem;
`,$8=S.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  margin-top: 0.5rem;
  align-self: center;
  &:hover:not(:disabled) {
    background: #6b1516;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`,L8=S.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  background: #1a1a1a;
  border-radius: 4px;
`,I8=S.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,A8=S.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`,D8=S.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
`,F8=S.span`
  font-size: 0.625rem;
  color: #999;
`,B8=S.p`
  font-size: 0.75rem;
  color: #fff;
  margin: 0;
  line-height: 1.3;
`,U8=S.p`
  font-size: 0.75rem;
  color: #999;
  text-align: center;
  margin: 0.5rem 0;
`,W8=S.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  text-align: center;
`;function H8(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const l=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/creators",{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}});console.log("Response:",l),Array.isArray(l.data)?i(l.data):console.error("Response data is not an array:",l.data)}catch(l){console.error("Error fetching creators:",l)}})()},[]),o.filter(c=>c.category==="Top 10");const a=c=>{console.log("Slide clicked",c),e("/creator",{state:{name:c.name||"",profileImage:c.profileImage||"",bannerImage:c.bannerImage||"",content:c.content||"",subscribers:c.subscribers||0,socialMedia:c.socialMedia||{}}})};return n.jsxs(V8,{children:[t?n.jsx(Y8,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"CHANNELS"}),n.jsx(q8,{children:Array.isArray(o)&&o.map((c,l)=>n.jsxs("div",{className:"slidescircle relative",onClick:()=>a(c),children:[n.jsx("img",{src:c.profileImage,alt:`Thumbnail ${l}`}),n.jsxs("div",{className:"absolute inset-0 flex flex-col justify-center items-center space-y-2",children:[n.jsx("button",{className:"bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700",children:"View Content"}),n.jsx("button",{className:"bg-[#541011] text-white px-4 py-2 rounded hover:bg-[#461718]",children:"Subscribe"})]})]},c._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const V8=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const q8=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,Y8=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function K8(){const[e,t]=p.useState(!1),[r,o]=p.useState(window.innerWidth<=768),i=()=>{o(window.innerWidth<=768)};return p.useEffect(()=>(window.addEventListener("resize",i),()=>{window.removeEventListener("resize",i)}),[]),n.jsxs(Q8,{children:[r?n.jsx(Z8,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{channels:e,set_channels:t})}):n.jsx(Pt,{channels:e,set_channels:t}),n.jsxs(X8,{children:[n.jsx(G8,{children:"Privacy Policy"}),n.jsx(bn,{children:"Effective Date: 01/09/2023"}),n.jsx(Vn,{children:'Welcome to PlaymoodTV ("we," "our," or "us"). We value your privacy, and this Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information. By accessing or using our website, you consent to the practices described in this Privacy Policy.'}),n.jsx(bn,{children:"Information We Collect"}),n.jsxs(kl,{children:[n.jsxs("li",{children:[n.jsx("b",{children:"Personal Information:"})," When you visit our website, we may collect personal information you provide directly, such as your name, email address, and contact details. We collect this information when you fill out forms, subscribe to newsletters, or communicate with us."]}),n.jsxs("li",{children:[n.jsx("b",{children:"Automated Information:"})," We may collect certain information automatically when you visit our website, such as your IP address, browser type, operating system, and browsing behavior. We may use cookies, web beacons, and similar technologies to gather this data."]})]}),n.jsx(bn,{children:"How we use your information"}),n.jsx(Vn,{children:"We may use your personal information for the following purposes:"}),n.jsxs(kl,{children:[n.jsx("li",{children:"To provide, maintain, and improve our website and services."}),n.jsx("li",{children:"To respond to your inquiries, comments, or questions."}),n.jsx("li",{children:"To send you newsletters, updates, and promotional materials."}),n.jsx("li",{children:"To monitor and analyze usage patterns and trends."}),n.jsx("li",{children:"To protect our rights, privacy, safety, or property, and/or that of you or others."})]}),n.jsx(bn,{children:"Disclosure of Your Information"}),n.jsx(Vn,{children:"We may share your personal information in the following circumstances:"}),n.jsxs(kl,{children:[n.jsx("li",{children:"With third-party service providers who assist us in operating our website and providing services."}),n.jsx("li",{children:"With your consent, when you choose to share information on our website."}),n.jsx("li",{children:"To comply with legal obligations or protect our rights and safety."})]}),n.jsx(bn,{children:"Security"}),n.jsx(Vn,{children:"We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission or storage system is entirely secure, and we cannot guarantee the security of your information"}),n.jsx(bn,{children:"Your Choices"}),n.jsx(Vn,{children:"You have choices regarding the personal information we collect:"}),n.jsxs(kl,{children:[n.jsx("li",{children:"You can access, correct, or update your personal information by contacting us."}),n.jsx("li",{children:"You can opt out of receiving promotional emails by following the instructions in the emails."})]}),n.jsx(bn,{children:"Children's Privacy"}),n.jsx(Vn,{children:"Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us, and we will remove it."}),n.jsx(bn,{children:"Changes to This Privacy Policy"}),n.jsx(Vn,{children:"We may update this Privacy Policy from time to time to reflect changes to our practices. The updated policy will be posted on this page, and the date of the latest revision will be indicated. We encourage you to review this Privacy Policy periodically."}),n.jsx(bn,{children:"Contact Us"}),n.jsx(Vn,{children:"If you have questions, concerns, or requests regarding this Privacy Policy, please contact us at creators@playmoodtv.com."})]})]})}const Q8=S.div`
    height: fit-content;
    width: 100%;
    background-color: black;
`,X8=S.div`
    height: fit-content;
    width: 90%;
    margin: 0px auto 0px auto;
    padding: 100px 0px 50px 0px;
    display:flex;
    flex-direction: column;
    gap: 10px;
`,G8=S.h2`
    color: white;
    font-size: 1rem;
`,bn=S.h3`  
    color: white;
    font-size: 0.9rem;
`,Z8=S.div`
  display: none; /* Hide by default */

  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: absolute;
    top: 10px;
    left: 5px;
    cursor: pointer;
    color: white;
    &:hover{
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }

  @media (max-width: 425px) {
    svg{
      position: relative;
      font-size: 30px;
      top:6px;
      left:8px
    }
  }
`,Vn=S.p`  
    color:white;
    line-height: 1.5;
    font-size: 0.7rem;
`,kl=S.ul`
    color: white;
    li{
        line-height: 1.5;
        font-size: 0.7rem;
    }
`;function J8(){return n.jsxs(eP,{children:[n.jsx(Header,{}),n.jsxs(tP,{children:[n.jsx(rP,{children:"Cookies Policy"}),n.jsx(qn,{children:"Effective Date: 01/09/2023"}),n.jsx(Yn,{children:'Welcome to PlaymoodTV ("we," "our," or "us"). This Cookies Policy is designed to help you understand how we use cookies and similar technologies on our website. By accessing or using our website, you consent to the use of cookies as described in this policy.'}),n.jsx(qn,{children:"What Are Cookies"}),n.jsx(Yn,{children:"Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide valuable information to website owners. Cookies can serve various purposes, such as recognizing your device, remembering your preferences, and improving your browsing experience."}),n.jsx(qn,{children:"Types of Cookies We Use"}),n.jsx(Yn,{children:"We may use the following types of cookies on our website:"}),n.jsxs(v0,{children:[n.jsxs("li",{children:[n.jsx("b",{children:"Essential Cookies:"})," These cookies are necessary for the website to function properly. They enable core functionalities, such as navigating between pages and accessing secure areas of the website. You cannot opt out of these cookies."]}),n.jsxs("li",{children:[n.jsx("b",{children:"Analytical/Performance Cookies:"})," These cookies allow us to collect information about how visitors use our website. They help us understand which pages are most popular, how users navigate the site, and if they encounter any errors. The data collected is used to improve the website's performance."]}),n.jsxs("li",{children:[n.jsx("b",{children:"Functionality Cookies:"})," These cookies remember choices you make on the website, such as language preferences and customizations. They enhance your user experience by providing personalized features."]}),n.jsxs("li",{children:[n.jsx("b",{children:"Targeting/Advertising Cookies:"})," These cookies are used to deliver advertisements that are relevant to your interests. They may also limit the number of times you see an ad and help measure the effectiveness of advertising campaigns."]})]}),n.jsx(qn,{children:"How We Use Cookies"}),n.jsx(Yn,{children:"We use cookies for the following purposes:"}),n.jsxs(v0,{children:[n.jsx("li",{children:"To provide and improve our website and services."}),n.jsx("li",{children:"To analyze website usage and trends."}),n.jsx("li",{children:"To remember your preferences and settings."}),n.jsx("li",{children:"To deliver personalized content and advertising."})]}),n.jsx(qn,{children:"Security"}),n.jsx(Yn,{children:"We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission or storage system is entirely secure, and we cannot guarantee the security of your information"}),n.jsx(qn,{children:"Your Choices"}),n.jsx(Yn,{children:"You can manage your cookie preferences and settings through your web browser. Most web browsers allow you to control cookie settings and delete cookies at any time. However, please note that disabling certain cookies may affect the functionality of our website."}),n.jsx(qn,{children:"Changes to This Cookies Policy"}),n.jsx(Yn,{children:"We may update this Cookies Policy from time to time to reflect changes in our use of cookies. The updated policy will be posted on this page with an effective date, so please check back periodically to stay informed about our cookie practices."}),n.jsx(qn,{children:"Contact Us"}),n.jsx(Yn,{children:"If you have questions, concerns, or requests regarding this Privacy Policy, please contact us at creators@playmoodtv.com."})]})]})}const eP=S.div`
    height: fit-content;
    width: 100%;
    background-color: black;
`,tP=S.div`
    height: fit-content;
    width: 90%;
    margin: 0px auto 0px auto;
    padding: 100px 0px 50px 0px;
    display:flex;
    flex-direction: column;
    gap: 10px;
`,rP=S.h2`
    color: white;
    font-size: 1rem;
`,qn=S.h3`  
    color: white;
    font-size: 0.9rem;
`,Yn=S.p`  
    color:white;
    line-height: 1.5;
    font-size: 0.7rem;
`,v0=S.ul`
    color: white;
    li{
        line-height: 1.5;
        font-size: 0.7rem;
    }
`,nP=()=>{const e=de(),[t,r]=p.useState(""),[o,i]=p.useState(""),[s,a]=p.useState(""),c=cr(),{user:l,isLoading:d,isError:u,isSuccess:f,message:m}=xt(x=>x.auth);p.useEffect(()=>{u&&(a(m),alert(`Login Error: ${m}`)),f&&l&&l.role&&(console.log("Redirecting to /dashboard"),e("/dashboard")),c(wn())},[l,u,f,m,e,c]);const b=async x=>{x.preventDefault(),a("");const h={email:t,password:o};try{await c(Gl(h))}catch{a("An error occurred during login."),alert("An error occurred during login.")}};return n.jsxs(oP,{children:[n.jsx(iP,{src:Ze,alt:"Playmood Logo",onClick:()=>e("/")}),n.jsxs(sP,{children:[n.jsx("h2",{children:"Login"}),s&&n.jsx(dP,{children:s}),n.jsx(w0,{type:"text",placeholder:"Enter email",id:"email",name:"email",value:t,onChange:x=>r(x.target.value)}),n.jsx(w0,{type:"password",placeholder:"Enter password",id:"password",value:o,onChange:x=>i(x.target.value)}),n.jsx(aP,{onClick:b,disabled:d,children:d?"Logging in...":"Login"}),n.jsx(lP,{onClick:()=>e("/forgot-password"),children:"Forgot password?"}),n.jsx(cP,{onClick:()=>e("/register"),children:"Create an account"})]})]})},oP=S.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`,iP=S.img`
  height: 100px;
  width: auto;
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    width: 60%;
    height: auto;
  }
`,sP=S.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  gap: 8;

  h2 {
    text-align: center;
    padding: 5px;
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`,w0=S.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`,aP=S.button`
  width: 100%;
  padding: 10px;
  background-color: #541011;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`,lP=S.span`
  color: #541011;
  cursor: pointer;
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`,cP=S.button`
  color: #fff;
  background-color: #808080;
  border: none;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
`,dP=S.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;function uP(){return n.jsx("div",{className:"loadingSpinnerContainer",children:n.jsx("div",{className:"loadingSpinner"})})}const hP=()=>{const e=de(),t=cr(),[r,o]=p.useState([]),[i,s]=p.useState([]),[a,c]=p.useState(""),[l,d]=p.useState(""),[u,f]=p.useState("");p.useEffect(()=>{(async()=>{try{const V=(await Z.get("https://restcountries.com/v3.1/all")).data.map(F=>{var D;return{name:F.name.common,code:(D=F.idd)!=null&&D.root?`${F.idd.root}${F.idd.suffixes?F.idd.suffixes[0]:""}`:""}});s(V),o(V.map(F=>F.code).filter(F=>F))}catch($){console.error("Error fetching countries:",$),f("Failed to load countries. Please try again.")}})()},[]);const[m,b]=p.useState({name:"",email:"",password:"",age:"",country:"",address:"",selectedCode:"",phoneNumber:""}),{user:x,isLoading:h,isSuccess:v}=xt(I=>I.auth),{name:w,email:g,password:j,age:y,country:k,address:_,phoneNumber:E}=m;p.useEffect(()=>{console.log("useEffect triggered:",{isSuccess:v,user:x}),v&&(e("/emailverify",{state:{userId:x==null?void 0:x.userId,email:g}}),t(wn()))},[v,x,e,t,g]);const N=I=>{b({...m,[I.target.name]:I.target.value})},T=I=>{const $=I.target.value;c($),b({...m,country:$})},M=I=>{const $=I.target.value;d($),b({...m,selectedCode:$})},L=async I=>{if(I.preventDefault(),f(""),!w||!g||!j||!k){f("Please fill in all required fields.");return}try{const $=await t(Xl(m)).unwrap();console.log("Signup result:",$),e("/emailverify",{state:{userId:$.userId,email:g}})}catch($){console.error("Signup error:",$),f($.message||"Registration failed. Please try again later."),t(wn())}};return n.jsxs(fP,{children:[n.jsx(pP,{src:Ze,alt:"Playmood Logo"}),n.jsxs(mP,{onSubmit:L,children:[n.jsx("h2",{children:"Sign Up"}),u&&n.jsx(wP,{children:u}),n.jsx(ai,{type:"text",name:"name",placeholder:"Name",value:w,onChange:N}),n.jsx(ai,{type:"email",name:"email",placeholder:"Email",value:g,onChange:N}),n.jsx(ai,{type:"password",name:"password",placeholder:"Password",value:j,onChange:N}),n.jsxs(y0,{value:a,onChange:T,children:[n.jsx("option",{value:"",children:"Select Country"}),i.map((I,$)=>n.jsx("option",{value:I.name,children:I.name},$))]}),n.jsx(ai,{type:"text",name:"age",placeholder:"Age (Optional)",value:y,onChange:N}),n.jsx(ai,{type:"text",name:"address",placeholder:"Address (Optional)",value:_,onChange:N}),n.jsxs(y0,{value:l,onChange:M,children:[n.jsx("option",{value:"",children:"Select Code"}),r.map((I,$)=>n.jsx("option",{value:I,children:I},$))]}),n.jsx(ai,{type:"tel",name:"phoneNumber",placeholder:"Phone Number (Optional)",value:E,onChange:N}),n.jsx(xP,{type:"submit",disabled:h,children:h?"Signing Up...":"Sign Up"}),n.jsxs(gP,{children:["Already have an account?"," ",n.jsx(vP,{onClick:()=>e("/login"),children:"Sign In"})]})]}),h&&n.jsx(uP,{})]})},fP=S.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`,pP=S.img`
  height: 100px;
  width: auto;
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    width: 60%;
    height: auto;
  }
`,mP=S.form`
  background-color: #fff;
  padding: 10px 20px 20px 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 40%;
  h2 {
    text-align: center;
    padding: 5px;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`,ai=S.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`,y0=S.select`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`,xP=S.button`
  color: #fff;
  background-color: #541011;
  border: none;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
`,gP=S.p`
  margin-top: 10px;
  text-align: center;
`,vP=S.span`
  color: #541011;
  cursor: pointer;
  text-decoration: underline;
`,wP=S.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;S.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;S.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;S.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;S.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;S.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;S.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;S.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;S.button`
    padding: 10px;
    background-color: #541011;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;function yP(){const e=de(),[t,r]=p.useState([]);p.useEffect(()=>{(async()=>{try{const c=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");r(c.data)}catch(c){console.error("Error fetching data:",c)}})()},[]);const o=t.filter(a=>a.category==="Top 10").map(a=>({id:a.id,thumbnail:a.thumbnail})),i={dots:!1,infinite:!0,speed:500,slidesToShow:5,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:2e3,autoplaySpeed:2e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]},s=(a,c)=>{const l=a.target;l.tagName.toLowerCase()==="video"&&l.closest(".slidescircle")&&e("/movie/{_id}",{state:{movie:c.video,title:c.title||"",desc:c.description||"",credits:c.credit||""}})};return n.jsx(gt,{...i,children:o.map((a,c)=>n.jsx("div",{className:"slidesfriends",onClick:l=>s(l,a),children:n.jsx("img",{src:a.thumbnail,alt:`Thumbnail ${c}`})},a.id))})}const bP=S.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`,jP=S.div`
  text-align: center;
`,SP=S.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`,kP=S.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;S.button`
  padding: 10px 20px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;const NP=S.button`
  padding: 10px 20px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`,CP=({onClose:e,children:t})=>n.jsx(bP,{children:n.jsxs(jP,{children:[n.jsx(SP,{onClick:e,children:"×"}),t,n.jsx(kP,{children:n.jsx(NP,{onClick:()=>navigate("/"),children:"Apply"})})]})});function _P(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null),s=xt(l=>l.auth.user);p.useEffect(()=>{(async()=>{if(!s||!s._id){console.warn("User or user._id is undefined, skipping fetch"),r([]);return}try{const d=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/likes",{headers:{Authorization:`Bearer ${s.token}`}});console.log("API Response:",d.data),r(d.data.likedContents||[])}catch(d){console.error("Error fetching data:",d),i("Failed to load liked content. Please try again later."),r([])}})()},[s]);const a={dots:!1,infinite:!0,speed:500,slidesToShow:2,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:2e3,autoplaySpeed:2e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]},c=(l,d)=>{const u=l.target;u.tagName.toLowerCase()==="video"&&u.closest(".dashslide")&&e(`/movie/${d.id}`,{state:{movie:d.video,title:d.title||"",desc:d.description||"",credits:d.credit||""}})};return n.jsx(gt,{...a,children:o?n.jsx("div",{children:o}):t&&t.length>0?t.map((l,d)=>n.jsx("div",{className:"dashslide",onClick:u=>c(u,l),children:n.jsx(oi,{img:l.thumbnail,title:l.title,movie:l.video,id:l.id,desc:l.description,customStyle:{}})},l.id||d)):n.jsx("div",{className:"text-white flex text-center",children:"No liked content available"})})}function EP(){const e=de();Up();const[t,r]=p.useState([]),o=xt(l=>l.auth.user),[i,s]=p.useState(null);p.useEffect(()=>{(async()=>{try{const d=o._id,u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/watchlist",{headers:{Authorization:`Bearer ${o.token}`}});r(u.data.watchList)}catch(d){console.error("Error fetching data:",d),s("Failed to load favourite content. Please try again later."),r([])}})()},[]);const a={dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:3e3,autoplaySpeed:3e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]},c=(l,d)=>{const u=l.target;u.tagName.toLowerCase()==="video"&&u.closest(".dashslide")&&e("/movie/{_id}",{state:{movie:d.video,title:d.title||"",desc:d.description||"",credits:d.credit||""}})};return n.jsx(gt,{...a,children:i?n.jsx("div",{children:i}):t&&t.length>0?t.map((l,d)=>n.jsx("div",{className:"dashslide",onClick:u=>c(u,l),children:n.jsx(oi,{img:l.thumbnail,title:l.title,movie:l.video,id:l.id,desc:l.description,customStyle:{}})},l.id||d)):n.jsx("div",{className:"text-white flex text-center",children:"No watchlist content available"})})}const Nm=({onClose:e})=>{const t=de(),{token:r,user:o}=xt($=>(console.log("Redux auth state:",$.auth),$.auth||{})),[i,s]=p.useState({title:"",description:"",credit:"",category:"Top 10"}),[a,c]=p.useState([]),[l,d]=p.useState(0),[u,f]=p.useState(10),[m,b]=p.useState(null),[x,h]=p.useState(!1),[v,w]=p.useState(!1),[g,j]=p.useState(""),[y,k]=p.useState(0),_=p.useRef(null),E=()=>{const $=JSON.parse(localStorage.getItem("user")||"{}"),V=($==null?void 0:$.token)||"",F=($==null?void 0:$._id)||"";return console.log("Stored auth data:",{storedUserId:F,storedToken:V}),{userId:(o==null?void 0:o._id)||F,authToken:r||V}},N=$=>{const V=$.target.files,F=Array.from(V);if(console.log("Selected files:",F),c(F),F.length>0){const D=F.find(Y=>Y.type.startsWith("video/"));if(D){const Y=URL.createObjectURL(D),z=document.createElement("video");z.src=Y,z.preload="metadata",z.onloadedmetadata=()=>{b(z.duration),d(0),f(Math.min(10,z.duration)),URL.revokeObjectURL(Y),z.remove()},z.onerror=()=>{j("Unable to load video metadata."),URL.revokeObjectURL(Y),z.remove()}}}},T=$=>{const{name:V,value:F}=$.target;s(D=>({...D,[V]:F}))},M=$=>{const{name:V,value:F}=$.target,D=parseFloat(F)||0;V==="previewStart"?(d(D),u<D+10&&f(Math.min(D+10,m||1/0))):V==="previewEnd"&&(f(D),l>D-15&&d(Math.max(0,D-15)));const Y=u-l;Y<10||Y>15?j("Preview must be between 10 and 15 seconds."):j("")},L=()=>{if(_.current&&m){_.current.currentTime=l,_.current.play();const $=()=>{_.current.currentTime>=u&&(_.current.pause(),_.current.removeEventListener("timeupdate",$))};_.current.addEventListener("timeupdate",$)}},I=async $=>{if($.preventDefault(),!a.length){j("Please select at least one file to upload.");return}const V=u-l;if(V<10||V>15){j("Preview must be between 10 and 15 seconds.");return}const{userId:F,authToken:D}=E();if(console.log("Submitting with:",{userId:F,authToken:D}),!F||!D){j("You must be logged in to upload videos. Redirecting to login..."),setTimeout(()=>{t("/login")},2e3);return}h(!0),j(""),w(!1);const Y=new FormData;Y.append("title",i.title),Y.append("description",i.description),Y.append("credit",i.credit),Y.append("category",i.category),Y.append("userId",F),Y.append("previewStart",l),Y.append("previewEnd",u),a.forEach(z=>{Y.append("files",z)});try{console.log("Sending request with token:",D);const z=await Z.post("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content",Y,{headers:{Authorization:`Bearer ${D}`,"Content-Type":"multipart/form-data"},timeout:6e5,onUploadProgress:A=>{const R=Math.round(A.loaded/A.total*100);console.log(`Upload Progress: ${R}%`),k(R)}});console.log("Video submitted successfully:",z.data),w(!0),setTimeout(()=>{e()},2e3)}catch(z){console.error("Error submitting video:",z),z.code==="ECONNABORTED"?j("Request timed out. Please check your network or try again later."):z.response?j(`Failed to upload video: ${z.response.data.message||z.response.statusText}`):j("An error occurred while uploading. Please try again.")}finally{h(!1)}};return n.jsxs(n.Fragment,{children:[n.jsx(PP,{onClick:e}),n.jsxs(TP,{children:[n.jsx(OP,{onClick:e,children:"×"}),n.jsx("h2",{children:"Submit Video"}),g&&n.jsx(IP,{children:g}),n.jsxs(zP,{onSubmit:I,children:[n.jsx(Kn,{children:"Title"}),n.jsx(ks,{type:"text",name:"title",value:i.title,onChange:T,required:!0}),n.jsx(Kn,{children:"Video Description"}),n.jsx(RP,{name:"description",value:i.description,onChange:T,required:!0}),n.jsx(Kn,{children:"Production Credits"}),n.jsx(ks,{type:"text",name:"credit",value:i.credit,onChange:T}),n.jsx(Kn,{children:"Category"}),n.jsxs(MP,{name:"category",value:i.category,onChange:T,children:[n.jsx("option",{value:"Top 10",children:"Top 10"}),n.jsx("option",{value:"Fashion Show",children:"Fashion Show"}),n.jsx("option",{value:"Teen",children:"Teens"}),n.jsx("option",{value:"Channels",children:"Channels"}),n.jsx("option",{value:"Documentarie",children:"Documentaries"}),n.jsx("option",{value:"Interview",children:"Interviews"}),n.jsx("option",{value:"Social",children:"Social"}),n.jsx("option",{value:"Behind the camera",children:"Behind the camera"}),n.jsx("option",{value:"Soon in Playmood",children:"Soon in Playmood"}),n.jsx("option",{value:"Watchlist",children:"Watchlist"}),n.jsx("option",{value:"Daries",children:"Recommended"}),n.jsx("option",{value:"New on Playmood",children:"New on Playmood"}),n.jsx("option",{value:"Only in Playmood",children:"Only in Playmood"})]}),n.jsx(Kn,{children:"Upload Video and Thumbnail"}),n.jsx(ks,{type:"file",accept:"video/*,image/*",multiple:!0,onChange:N}),a.length>0&&a.some($=>$.type.startsWith("video/"))&&n.jsxs(n.Fragment,{children:[n.jsx(Kn,{children:"Preview Selection (10–15 seconds)"}),m?n.jsxs(n.Fragment,{children:[n.jsx(FP,{children:n.jsx("video",{ref:_,controls:!0,src:URL.createObjectURL(a.find($=>$.type.startsWith("video/"))),style:{width:"100%",maxHeight:"200px"}})}),n.jsxs(BP,{children:[n.jsxs("div",{children:[n.jsx(Kn,{children:"Start Time (seconds)"}),n.jsx(ks,{type:"number",name:"previewStart",value:l,onChange:M,min:"0",max:m-10,step:"0.1",required:!0})]}),n.jsxs("div",{children:[n.jsx(Kn,{children:"End Time (seconds)"}),n.jsx(ks,{type:"number",name:"previewEnd",value:u,onChange:M,min:l+10,max:m,step:"0.1",required:!0})]}),n.jsx(UP,{type:"button",onClick:L,children:"Play Preview"})]}),n.jsxs(WP,{children:["Preview Duration: ",(u-l).toFixed(1)," seconds"]})]}):n.jsx("p",{children:"Loading video duration..."})]}),n.jsx($P,{type:"submit",disabled:x||!a.length||!E().userId||!E().authToken,children:x?"Uploading...":"Upload"}),v&&n.jsx(LP,{children:n.jsx("p",{children:"Video uploaded successfully!"})})]}),x&&n.jsx(AP,{children:n.jsx(DP,{style:{width:`${y}%`}})})]})]})},TP=S.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 600px;
  width: 90%;
  max-height: 80vh; /* Limit modal height to 80% of viewport */
  overflow-y: auto; /* Enable vertical scrolling */
  box-sizing: border-box; /* Include padding in width/height calculations */

  /* Responsive adjustments */
  @media (max-width: 600px) {
    max-width: 95%;
    padding: 15px;
  }
`,PP=S.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`,OP=S.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
`,zP=S.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`,Kn=S.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,ks=S.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`,RP=S.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
`,MP=S.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`,$P=S.button`
  padding: 10px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  opacity: ${e=>e.disabled?.6:1};
  pointer-events: ${e=>e.disabled?"none":"auto"};

  &:hover:not(:disabled) {
    background-color: #3d0c0d;
  }
`,LP=S.div`
  background-color: #28a745;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  text-align: center;
`,IP=S.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  text-align: center;
`,AP=S.div`
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 4px;
  margin-top: 10px;
`,DP=S.div`
  background-color: #541011;
  height: 10px;
  border-radius: 4px;
  transition: width 0.2s ease-in-out;
`,FP=S.div`
  margin-bottom: 10px;
`,BP=S.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`,UP=S.button`
  padding: 10px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #3d0c0d;
  }
`,WP=S.p`
  font-size: 12px;
  color: #333;
  margin-top: 5px;
`,HP=({show:e,onClose:t,message:r})=>e?n.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",children:n.jsxs("div",{className:"bg-white rounded-lg p-4 w-1/3",children:[n.jsx("h2",{className:"text-xl mb-4",children:"Message"}),n.jsx("p",{className:"mb-4",children:r}),n.jsx("button",{className:"bg-red-500 text-white py-2 px-4 rounded",onClick:t,children:"Close"})]})}):null;function VP(){const e=de();Up();const[t,r]=p.useState([]),o=xt(l=>l.auth.user),[i,s]=p.useState(null);p.useEffect(()=>{(async()=>{try{const d=o._id,u=await Z.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/watchlist/${d}`,{headers:{Authorization:`Bearer ${o.token}`}});r(u.data.watchList)}catch(d){console.error("Error fetching data:",d),s("Failed to load favourite content. Please try again later."),r([])}})()},[]);const a={dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:3e3,autoplaySpeed:3e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]},c=(l,d)=>{const u=l.target;u.tagName.toLowerCase()==="video"&&u.closest(".dashslide")&&e("/movie/{_id}",{state:{movie:d.video,title:d.title||"",desc:d.description||"",credits:d.credit||""}})};return n.jsx(gt,{...a,children:i?n.jsx("div",{children:i}):t&&t.length>0?t.map((l,d)=>n.jsx("div",{className:"dashslide",onClick:u=>c(u,l),children:n.jsx(it,{img:l.thumbnail,title:l.title,movie:l.video,id:l.id,desc:l.description,customStyle:{}})},l.id||d)):n.jsx("div",{className:"text-white flex text-center",children:"No Favorite content available"})})}function qP(){const e=de(),[t,r]=p.useState([]),[o,i]=p.useState(null);p.useEffect(()=>{async function c(){try{console.log("Requesting data from API");const l=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");if(console.log("API response:",l),l.data&&Array.isArray(l.data)){const d=l.data.filter(u=>u.category==="Teen");r(d)}else console.error("Unexpected data format:",l.data),i("Unexpected data format.")}catch(l){console.error("Error fetching data:",l),i("Error fetching data.")}}c()},[]);const s={dots:!1,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,initialSlide:0,autoplay:!0,speed:3e3,autoplaySpeed:3e3,cssEase:"linear",arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]},a=(c,l)=>{const d=c.target;d.tagName.toLowerCase()==="video"&&d.closest(".dashslide")&&e("/movie/{_id}",{state:{movie:l.video,title:l.title||"",desc:l.description||"",credits:l.credit||""}})};return n.jsx(gt,{...s,children:t.map((c,l)=>n.jsx("div",{className:"dashslide",onClick:d=>a(d,c),children:n.jsx(oi,{img:c.thumbnail,title:c.title,movie:c.video,id:c.id,desc:c.description,customStyle:{}})},c.id))})}const Nl="/default-profile.png";function YP(){const[e,t]=p.useState(!1),r=()=>{t(!e)},o=de(),i=cr(),[s,a]=p.useState(!1),c=()=>{a(!s)},[l,d]=p.useState(!1),[u,f]=p.useState(null),{user:m,userToken:b}=xt(he=>he.auth),x=m&&m.role==="admin",h=m&&m.role==="creator",v=m&&m._id,[w,g]=p.useState(!1),[j,y]=p.useState(!1);p.useState({title:"",description:"",productionCredits:"",category:"",file:null});const[k,_]=p.useState(""),[E,N]=p.useState(!1),[T,M]=p.useState({name:"",email:"",phone:"",dateOfBirth:"",city:"",age:"",address:""}),[L,I]=p.useState(null),[$,V]=p.useState(null),[F,D]=p.useState({bankLocation:"United States",accountHolderName:"",beneficiaryName:"",bankName:"",routingNumber:"",abaRouting:"",accountHolderNameSecondary:""}),Y=()=>{t(!1),I(null),V(null)},z=he=>{const{name:be,value:Be}=he.target;M(qe=>({...qe,[be]:Be}))},A=he=>{const be=he.target.files[0];be&&(I(be),V(URL.createObjectURL(be)))},R=he=>{const{name:be,value:Be}=he.target;D(qe=>({...qe,[be]:Be}))},q=async()=>{var he,be,Be,qe,dt,vt,Bt;if(m&&m.token)try{const De=(await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/profile/",{headers:{Authorization:`Bearer ${m.token}`}})).data.user;De&&(f(De),i(sh(De)),M({name:De.name||"",email:De.email||"",phone:De.phone||"",dateOfBirth:De.dateOfBirth||"",city:De.city||"",age:De.age||"",address:De.address||""}),D({bankLocation:((he=De.billing)==null?void 0:he.bankLocation)||"United States",accountHolderName:((be=De.billing)==null?void 0:be.accountHolderName)||"",beneficiaryName:((Be=De.billing)==null?void 0:Be.beneficiaryName)||"",bankName:((qe=De.billing)==null?void 0:qe.bankName)||"",routingNumber:((dt=De.billing)==null?void 0:dt.routingNumber)||"",abaRouting:((vt=De.billing)==null?void 0:vt.abaRouting)||"",accountHolderNameSecondary:((Bt=De.billing)==null?void 0:Bt.accountHolderNameSecondary)||""}),V(De.profile||Nl))}catch(St){console.error("Failed to fetch user data:",St)}};p.useEffect(()=>{q()},[m,i]);const X=async(he,be,Be)=>{var qe;try{const dt=new FormData;return dt.append("profileImage",be),(await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/${he}`,dt,{headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${Be}`}})).data.user.profileImage}catch(dt){throw console.error("Error updating profile image:",((qe=dt.response)==null?void 0:qe.data)||dt.message),toast.error("Failed to update profile image."),dt}},oe=()=>{const he=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,be=/^\+?[\d\s-]{7,15}$/,Be=/^[a-zA-Z\s]{2,}$/;return!T.name||!Be.test(T.name)?(toast.error("Please enter a valid name (at least 2 characters, letters only)."),!1):!T.email||!he.test(T.email)?(toast.error("Please enter a valid email address."),!1):T.phone&&!be.test(T.phone)?(toast.error("Please enter a valid phone number."),!1):T.age&&(isNaN(T.age)||T.age<0||T.age>120)?(toast.error("Please enter a valid age (0-120)."),!1):!0},J=()=>{const he=/^\d{9}$/;return F.routingNumber&&!he.test(F.routingNumber)?(toast.error("Routing number must be 9 digits."),!1):F.accountHolderName!==F.accountHolderNameSecondary?(toast.error("Account holder names must match."),!1):!0},xe=async()=>{var he;if(oe())try{let be=m.profile;L&&(be=await X(v,L,m.token));const qe=(await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/${v}`,{name:T.name,email:T.email,phone:T.phone,dateOfBirth:T.dateOfBirth,city:T.city,age:T.age,address:T.address,profile:be},{headers:{Authorization:`Bearer ${m.token}`}})).data.user;i(sh(qe)),f(qe),localStorage.setItem("authUser",JSON.stringify(qe)),Y()}catch(be){console.error("Error updating profile:",((he=be.response)==null?void 0:he.data)||be.message)}},je=async()=>{var he;if(J())try{const Be=(await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/${v}`,{billing:{bankLocation:F.bankLocation,accountHolderName:F.accountHolderName,beneficiaryName:F.beneficiaryName,bankName:F.bankName,routingNumber:F.routingNumber,abaRouting:F.abaRouting}},{headers:{Authorization:`Bearer ${m.token}`}})).data.user;i(sh(Be)),f(Be),localStorage.setItem("authUser",JSON.stringify(Be)),toast.success("Billing information updated successfully!"),a(!1)}catch(be){console.error("Error updating billing info:",((he=be.response)==null?void 0:he.data)||be.message),toast.error("Failed to update billing information.")}},Se=async()=>{try{(await Z.post("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange",{userId:v,requestedRole:"creator"},{headers:{Authorization:`Bearer ${m.token}`}})).status===201?_("Your request to become a creator has been submitted."):_("There was an issue submitting your request. Please try again.")}catch(he){console.error("Error applying as creator:",he),_("There was an issue submitting your request. Please try again.")}N(!0)},[G,ae]=p.useState(!1),ge=()=>{y(!0)},te=()=>{y(!1)},we=()=>{g(!0)},Ie=()=>{g(!1)},H=he=>{he.preventDefault(),console.log("Email submitted"),g(!1)},[W,ie]=p.useState(window.innerWidth<=768),ke=()=>{ie(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",ke),()=>{window.removeEventListener("resize",ke)}),[]);const[Ve,Qe]=p.useState("LIKES"),Me=he=>{Qe(he)};return n.jsx(KP,{children:n.jsxs(QP,{children:[W?n.jsx(XP,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{channels:l,set_channels:d})}):n.jsx(Pt,{channels:l,set_channels:d}),l&&n.jsxs("div",{className:"h-[500px] w-[1000px] absolute top-[100px] left-[250px] z-[1001] overflow-hidden flex justify-center items-center rounded-2xl md:w-4/5 md:h-4/5 md:left-20 md:top-[100px]",children:[n.jsx("button",{className:"absolute w-5 h-5 top-2.5 right-2.5 bg-red-500 border-none rounded-full text-white text-lg cursor-pointer",onClick:()=>d(!1),children:n.jsx(ub,{})}),n.jsx("img",{src:db,alt:"",className:"w-full h-full absolute object-cover top-0 left-0 z-[-1]"}),n.jsxs("div",{className:"h-fit w-4/5 flex justify-center items-center flex-col gap-2.5",children:[n.jsx("h2",{className:"text-white text-2xl md:text-xl",style:{textShadow:"2px 2px red"},children:"This feature is Coming Soon"}),n.jsx("p",{className:"text-white text-xl md:text-sm",style:{textShadow:"1px 1px red"},children:"Our content creators are doing great, and we are building a special platform for them!"}),n.jsxs("form",{className:"flex justify-center items-center gap-5 w-1/2 mx-auto md:flex-col",children:[n.jsx("input",{name:"name",placeholder:"Name",type:"text",className:"px-5 py-2.5 rounded-full"}),n.jsx("input",{name:"email",placeholder:"Email",type:"email",className:"px-5 py-2.5 rounded-full"}),n.jsx("button",{className:"bg-red-500 px-5 py-2.5 text-white border-none rounded-full cursor-pointer",children:"Subscribe"})]})]})]}),n.jsxs(GP,{className:"w-4/5 mx-auto my-20 flex justify-between items-center",children:[e?n.jsxs("div",{className:"flex items-center text-white gap-12",children:[n.jsx("div",{className:"bg-[#541011] rounded-full p-5",children:n.jsx(Bc,{})}),n.jsx("h1",{children:m&&m.name})]}):n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"w-36 h-36 rounded-full bg-white flex items-center justify-center font-semibold",onClick:()=>document.getElementById("profileImage").click(),children:m&&m.profile?n.jsx("img",{src:`${m.profile}?${new Date().getTime()}`,alt:"Profile",className:"w-32 h-32 rounded-full object-cover",onError:he=>{he.target.src=Nl}}):n.jsx("img",{src:Nl,alt:"Default Profile",className:"w-32 h-32 rounded-full object-cover"})}),n.jsx("input",{type:"file",id:"profileImage",className:"hidden",onChange:he=>{const be=he.target.files[0];be&&(I(be),V(URL.createObjectURL(be)),X(v,be,m.token).then(()=>q()))}}),n.jsx("h1",{className:"text-white",children:m&&m.name})]}),n.jsxs("div",{className:"flex flex-row justify-center align-middle gap-2",children:[n.jsx("h3",{className:"text-white text-base",children:"EDIT PROFILE"}),n.jsx("div",{className:"h-15 w-12 flex items-center justify-center cursor-pointer text-white text-[20px]",onClick:r,children:n.jsx(Bc,{})})]}),n.jsxs("div",{className:"dash-btn flex",children:[x&&n.jsx("button",{className:"bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]",onClick:()=>o("/admin"),children:"Admin Page"}),!h&&n.jsx("button",{className:"bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]",onClick:Se,children:"Become a Creator"}),h&&n.jsxs(n.Fragment,{children:[n.jsx("button",{className:"bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]",onClick:()=>o("/creatorpage"),children:"View Channel"}),n.jsx("button",{className:"bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]",onClick:ge,children:"Upload a Video for Review"})]})]}),G&&n.jsxs(CP,{onClose:()=>ae(!1),children:[n.jsx("h2",{children:"Terms and Agreements"}),n.jsx("p",{children:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam"})]}),j&&n.jsx(Nm,{onClose:te}),n.jsx(HP,{show:E,onClose:()=>N(!1),message:k})]}),e?n.jsxs("div",{className:"w-4/5 h-fit bg-black mx-auto my-10 rounded-lg flex flex-col p-8 relative shadow-lg",children:[n.jsx("button",{className:"absolute top-4 right-4 text-white text-2xl hover:text-red-500",onClick:Y,children:"×"}),n.jsx("h2",{className:"text-white text-3xl font-semibold mb-6",children:"Edit Profile"}),n.jsxs("form",{className:"flex flex-col gap-6",children:[n.jsxs("div",{className:"flex flex-col items-center",children:[n.jsx("div",{className:"w-24 h-24 rounded-full overflow-hidden border-2 border-white",children:n.jsx("img",{src:$||Nl,alt:"Profile Preview",className:"w-full h-full object-cover"})}),n.jsxs("label",{className:"mt-2 text-white text-sm cursor-pointer hover:text-[#541011]",children:["Change Profile Picture",n.jsx("input",{type:"file",accept:"image/*",className:"hidden",onChange:A})]})]}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Full Name *"}),n.jsx("input",{type:"text",name:"name",value:T.name,onChange:z,placeholder:"Enter your full name",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]",required:!0})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Email *"}),n.jsx("input",{type:"email",name:"email",value:T.email,onChange:z,placeholder:"Enter your email",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]",required:!0})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Phone Number"}),n.jsx("input",{type:"tel",name:"phone",value:T.phone,onChange:z,placeholder:"Enter your phone number",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Date of Birth"}),n.jsx("input",{type:"date",name:"dateOfBirth",value:T.dateOfBirth,onChange:z,className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"City"}),n.jsx("input",{type:"text",name:"city",value:T.city,onChange:z,placeholder:"Enter your city",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Age"}),n.jsx("input",{type:"number",name:"age",value:T.age,onChange:z,placeholder:"Enter your age",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]",min:"0",max:"120"})]}),n.jsxs("div",{className:"flex flex-col md:col-span-2",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Address"}),n.jsx("input",{type:"text",name:"address",value:T.address,onChange:z,placeholder:"Enter your address",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]})]}),n.jsx("button",{type:"button",className:"w-52 mt-4 py-3 bg-transparent text-white border border-white rounded-md hover:bg-[#541011] hover:text-white transition-colors",onClick:xe,children:"Save Profile"}),n.jsx("button",{type:"button",className:"w-52 mt-2 py-3 bg-transparent text-white border border-white rounded-md hover:text-[#541011] transition-colors",onClick:c,children:s?"Hide Billing Info":"Show Billing Info"}),s&&n.jsxs("div",{className:"mt-6",children:[n.jsx("h3",{className:"text-white text-xl font-medium mb-4",children:"Billing Information"}),n.jsx("p",{className:"text-xs text-white mb-2",children:"Why do we ask for your bank information?"}),n.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Bank Location"}),n.jsxs("select",{name:"bankLocation",value:F.bankLocation,onChange:R,className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md focus:outline-none focus:border-[#541011]",children:[n.jsx("option",{value:"United States",children:"United States"}),n.jsx("option",{value:"United Kingdom",children:"United Kingdom"}),n.jsx("option",{value:"Others",children:"Others"})]})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Account Holder's Name"}),n.jsx("input",{type:"text",name:"accountHolderName",value:F.accountHolderName,onChange:R,placeholder:"Name as on bank documents",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Beneficiary Name"}),n.jsx("input",{type:"text",name:"beneficiaryName",value:F.beneficiaryName,onChange:R,placeholder:"Beneficiary Name",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Bank Name"}),n.jsx("input",{type:"text",name:"bankName",value:F.bankName,onChange:R,placeholder:"Bank Name",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"9-Digit Routing Number"}),n.jsx("input",{type:"text",name:"routingNumber",value:F.routingNumber,onChange:R,placeholder:"9 digits",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Routing (ABA)"}),n.jsx("input",{type:"text",name:"abaRouting",value:F.abaRouting,onChange:R,placeholder:"Routing (ABA)",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]}),n.jsxs("div",{className:"flex flex-col",children:[n.jsx("label",{className:"text-white text-sm mb-1",children:"Confirm Account Holder's Name"}),n.jsx("input",{type:"text",name:"accountHolderNameSecondary",value:F.accountHolderNameSecondary,onChange:R,placeholder:"Name as on bank documents",className:"w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"})]})]}),n.jsx("button",{type:"button",className:"w-52 mt-6 py-3 bg-transparent text-white border border-white rounded-md hover:bg-[#541011] hover:text-white transition-colors",onClick:je,children:"Save Billing"})]})]})]}):n.jsxs(n.Fragment,{children:[n.jsxs(ZP,{className:"h-fit w-1/3 ml-36 flex justify-between gap-5 md:relative md:left-36 md:w-full md:my-1 md:ml-0 md:gap-0 md:justify-center md:text-xs",children:[n.jsxs("button",{className:"flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]",onClick:()=>Me("LIKES"),children:[n.jsx(OT,{}),n.jsx("span",{className:"ml-1 text-xs",children:"LIKES"})]}),n.jsxs("button",{className:"flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]",onClick:()=>Me("FAVORITES"),children:[n.jsx(zT,{}),n.jsx("span",{className:"ml-1 text-xs",children:"FAVORITES"})]}),n.jsxs("button",{className:"flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]",onClick:()=>Me("FOR YOU"),children:[n.jsx(RT,{}),n.jsx("span",{className:"ml-1 text-xs",children:"FOR_YOU"})]}),n.jsxs("button",{className:"flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]",onClick:()=>Me("WATCHLIST"),children:[n.jsx(PT,{}),n.jsx("span",{className:"ml-1 text-xs",children:"WATCHLIST"})]})]}),n.jsxs(JP,{className:"w-4/5 mx-auto my-2 h-72 md:w-[90%] md:mx-auto",children:[Ve==="LIKES"&&n.jsx(_P,{}),Ve==="FAVORITES"&&n.jsx(VP,{}),Ve==="FOR YOU"&&n.jsx(qP,{}),Ve==="WATCHLIST"&&n.jsx(EP,{})]}),n.jsxs(e7,{children:[n.jsx("button",{onClick:we,className:"text-white text-sm font-medium",children:"DONATIONS"}),n.jsx("button",{onClick:we,className:"text-white text-sm font-medium",children:"SUBSCRIPTION"}),n.jsx("button",{onClick:we,className:"text-white text-sm font-medium",children:"FRIENDS"}),n.jsx("button",{onClick:we,className:"text-white text-sm font-medium",children:"FRIENDS REQUEST"}),n.jsx("button",{onClick:we,className:"text-white text-sm font-medium",children:"BLOCK USERS"})]}),n.jsx(tu,{isOpen:w,onClose:Ie,onSubmit:H}),n.jsx(t7,{children:n.jsx(yP,{})}),n.jsxs("div",{className:"w-4/5 mx-auto my-12 h-72 flex justify-between sm:w-9/10 sm:flex-col sm:ml-32 sm:items-center",children:[n.jsxs("div",{className:"w-1/5 h-full flex flex-col gap-2.5",children:[n.jsx("button",{className:"py-1 bg-none text-white rounded-sm border border-white cursor-pointer hover:text-red-500",children:"Activity history"}),n.jsx("button",{className:"py-1 bg-none text-white rounded-sm border border-white cursor-pointer hover:text-red-500",children:"Manage cookies"}),n.jsx("button",{className:"py-1 bg-none text-white rounded-sm border border-white cursor-pointer hover:text-red-500",children:"Remove cache"})]}),n.jsx("div",{className:"w-3/4 h-full border border-white p-4 rounded-md",children:n.jsxs("div",{className:"flex gap-5 text-white",children:[n.jsx("h4",{children:"History"}),n.jsx("button",{className:"bg-none border border-white py-1 px-1.5 text-white rounded-sm",children:"Remove history"})]})})]})]}),n.jsxs(r7,{children:[n.jsx("div",{children:n.jsx("img",{src:Ze})}),n.jsxs("div",{className:"instagrams",children:[n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",children:n.jsx("img",{src:le})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",children:"Official"})})]}),n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://www.instagram.com/playmoodlat/",children:n.jsx("img",{src:le})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodlat/",target:"_blank",children:"Latam"})})]}),n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://www.instagram.com/playmoodmx/",children:n.jsx("img",{src:le})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodmx/",target:"_blank",children:"MX"})})]})]}),n.jsx("div",{}),n.jsxs("div",{className:"contact-footer",children:[n.jsx("h2",{children:"Contact us:"}),n.jsx("h3",{children:"Creators@playmoodtv.com"}),n.jsxs("div",{children:[n.jsx("p",{onClick:()=>o("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{onClick:()=>o("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})})}const KP=S.div`
    height: fit-content;
    width: 100%;
    display: flex;
`,QP=S.div`
    width: 100%;
    height: 100%;
    background-color: #191818;
    display: flex;
    flex-direction: column;
    .edit-profile{
        width: 55vw;
        height: fit-content;
        background-color: grey;
        margin: 10px auto 10px auto;
        border-radius: 10px;
        display: flex;
        padding: 60px 20px 20px 40px;
        flex-direction: column;
        .billing_information_section{
            display: flex;
            height: fit-content;
            width: 100%;
            .billing_section{
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-top: 20px;
                widt: 100%;
                .billing_infos{
                    display: flex;
                    width: 100%;
                    height: fit-content;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    .billing_infos_section_one{
                        .billing_info_enter{
                            color: white;
                            font-size: 1rem;
                        }
                        .billing_info_why{
                            font-size: 0.6rem;
                            color: white;
                        }
                        .billing_info_location{
                            font-size: 0.8rem;
                            color: white;
                        }
                        .billing_info_country{
                            width: 15vw;
                            padding: 4px;
                        }
                        .billing_info_name{
                            font-size: 0.8rem;
                            color: white;
                        }
                        .billing_info_inputs{
                            width: 20vw;
                            padding: 4px;
                        }
                    }
                    .billing_section_secondsection{
                        .billing_info_enter{
                            color: white;
                            font-size: 1rem;
                        }
                        .billing_info_why{
                            font-size: 0.6rem;
                            color: white;
                        }
                        .billing_info_location{
                            font-size: 0.8rem;
                            color: white;
                        }
                        .billing_info_country{
                            width: 15vw;
                            padding: 4px;
                        }
                        .billing_info_name{
                            font-size: 0.8rem;
                            color: white;
                        }
                        .billing_info_inputs{
                            width: 20vw;
                            padding: 4px;
                        }
                    }
                }
                .billing_info_enter{
                    color: white;
                    font-size: 1rem;
                }
                .billing_info_why{
                    font-size: 0.6rem;
                    color: white;
                }
                .billing_info_location{
                    font-size: 0.8rem;
                    color: white;
                }
                .billing_info_country{
                    width: 15vw;
                    padding: 4px;
                }
                .billing_info_name{
                    font-size: 0.8rem;
                    color: white;
                }
                .billing_info_inputs{
                    width: 20vw;
                    padding: 4px;
                }
            }
            .billing_section_secondsection{
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-top: 20px;
                .billing_info_enter{
                    color: white;
                    font-size: 1rem;
                }
                .billing_info_why{
                    font-size: 0.6rem;
                    color: white;
                }
                .billing_info_location{
                    font-size: 0.8rem;
                    color: white;
                }
                .billing_info_country{
                    width: 15vw;
                    padding: 4px;
                }
                .billing_info_name{
                    font-size: 0.8rem;
                    color: white;
                }
                .billing_info_inputs{
                    width: 20vw;
                    padding: 4px;
                }
            }
        }
        .billing-btn{
            width: 200px;
            margin-top: 20px;
            height: 50px;
            background: none;
            color: white;
            border: 1px solid white;
            &:hover{
                color: #541011;
                cursor: pointer;
            }
        }
        .user-data{
            color: white;
            font-size: 2rem;
            font-weight: 400;
        }
        .user-info{
            width: 100%;
            height: fit-content;
            margin-top: 10px;
            display: flex; 
            justify-content: space-between;
            .user-info-first{
                display: flex;
                flex-direction: column;
                width: 50%;
                padding: 0px 20px 0px 0px;
                gap: 10px;
                input{
                    width: 100%;
                    padding: 15px;
                    background: none;
                    color: white;
                    border: 1px solid white;
                    &::placeholder{
                        color: white;
                    }
                }
            }
            .user-info-second{
                display: flex;
                flex-direction: column;
                width: 50%;
                padding: 0px 0px 0px 20px;
                gap: 10px;
                input{
                    width: 100%;
                    padding: 15px;
                    background: none;
                    color: #fff;
                    border: 1px solid white;
                    &::placeholder{
                        color: white;
                    }
                }
            }
        }
    }
`,XP=S.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: relative;
    font-size: 30px;
    top:60px;
    left:8px;
    cursor: pointer;
    color: white;
    &:hover{
      color: #541011;
    }
    z-index: 1000;
    svg {
      font-size: 40px;
    }
  }
`,GP=S.div`
  width: 80%;
  margin: 100px auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user-edits {
    display: flex;
    align-items: center;
    color: white;
    gap: 50px;
    .user-edits-container {
      background-color: #541011;
      border-radius: 100%;
      padding: 20px;
    }
  }
  .picture-placeholder {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .edit-user-dashboard {
    display: flex;
    flex-direction: row;
    gap: 10px;
    h3 {
        padding-top:20px;
      color: white;
      font-size: 1.0rem;
    }
    .edit-button-dashboard {
      height: 60px;
      width: 50px;
      background-color:;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img {
        height: 25px;
        width: 25px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    .user-edits {
      margin-top: 20px;
      text-align: center;
      gap: 20px;
    }
    .picture-placeholder {
      width: 100px;
      height: 100px;
      font-size: 1.2rem;
    }
    .edit-user-dashboard {
      margin-top: 20px;
      flex-direction: column;
      align-items: center;
      h3 {
        margin-bottom: 10px;
      }
      .edit-button-dashboard {
        width: 30px;
        height: 30px;
        img {
          height: 15px;
        }
      }
    }
  }
`,ZP=S.div`
  height: fit-content;
  width: 30%;
  margin-left: 150px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  p {
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    position:relative;
    left:150px;
    margin: 2px 0;
    margin-left: 0px;
    gap: 0px;
    justify-content: center;
    flex-direction: column;
    font-size:8px;
  }
`,JP=S.div`
  width: 80%;
  margin: 10px auto;
  height: 300px;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 10px auto;
  }
`,e7=S.div`
  height: fit-content;
  width: 50%;
  margin-left: 150px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  p {
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 85%;
    margin: 20px auto;
    flex-direction: column;
    align-items: center;
    font-size:15px;
    p {
      margin-bottom: 10px;
    }
  }
`,t7=S.div`
  width: 80%;
  margin: 50px auto 20px auto;
  height: 200px;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 50px auto;
  }
`,r7=S.div`
    height: fit-content;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 20px 60px 20px 60px;
    .contact-footer {
        display: flex;
        flex-direction: column;
        gap: 10px;
        div {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
    }
    .instagrams {
        display: flex;
        gap: 5px;
        .instagram-official {
            display: flex;
            height: fit-content;
            align-items: center;
            color: white;
            .instagram-links {
                a {
                    text-decoration: none;
                    color: white;
                }
            }
            img {
                height: 20px;
                width: 20px;
            }
        }
    }
    div {
        height: fit-content;
        display: flex;
        gap: 10px;
        color: white;
        p {
            font-size: 0.7rem;
            cursor: pointer;
        }
        img {
            height: 80px;
            width: 100%;
            cursor: pointer;
        }
    }
    @media screen and (max-width: 600px) {
        flex-direction: column;
        padding: 10px;
    }
`;S.div`
    height: 500px;
    width: 1000px;
    position: absolute;
    top: 100px;
    left: 250px;
    z-index: 1001;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    @media screen and (max-width: 1000px) {
        width: 70%;
        height: 70%;
        left: 80px;
        top: 100px;
    }
    img {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: cover;
        top: 0;
        left: 0;
        z-index: -1;
    }
    div {
        height: fit-content;
        width: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        h2 {
            color: white;
            font-size: 2rem;
            text-shadow: 2px 2px red;
            @media screen and (max-width: 1000px) {
                font-size: 1.2rem;
            }
        }
        p {
            color: white;
            font-size: 1.2rem;
            text-shadow: 1px 1px red;
            @media screen and (max-width: 1000px) {
                font-size: 0.9rem;
            }
        }
        .form {
            display: flex;
            justify-content: center;
            align-item: center;
            gap: 20px;
            width: 50%;
            margin: 0px auto 0px auto;
            @media screen and (max-width: 1000px) {
                flex-direction: column;
            }
            .inputfield {
                padding: 10px 20px;
                border-radius: 20px;
            }
            .subscribe-button {
                background-color: red;
                padding: 10px 20px;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
            }
        }
    }
`;S.button`
  position: absolute;
  width:20px;
  height:20px;
  top: 10px;
  right: 10px;
  background: red;
  border: none;
  border-radius: 100%;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;const n7=({onClose:e})=>{const[t,r]=p.useState({username:"",email:""}),o=s=>{const{name:a,value:c}=s.target;r(l=>({...l,[a]:c}))},i=s=>{s.preventDefault(),console.log("Submitting user data:",t),e()};return n.jsxs(n.Fragment,{children:[n.jsx(i7,{onClick:e}),n.jsxs(o7,{children:[n.jsx(s7,{onClick:e,children:"×"}),n.jsx("h2",{children:"Add New User"}),n.jsxs(a7,{onSubmit:i,children:[n.jsxs(b0,{children:[n.jsx("label",{children:"Username"}),n.jsx(j0,{type:"text",name:"username",value:t.username,onChange:o,required:!0})]}),n.jsxs(b0,{children:[n.jsx("label",{children:"Email"}),n.jsx(j0,{type:"email",name:"email",value:t.email,onChange:o,required:!0})]}),n.jsx(l7,{type:"submit",children:"Create User"})]})]})]})},o7=S.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`,i7=S.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`,s7=S.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`,a7=S.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,b0=S.div`
  display: flex;
  flex-direction: column;
`,j0=S.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;S.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;S.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;const l7=S.button`
  padding: 10px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`,c7=({onClose:e,contentId:t})=>{const[r,o]=p.useState({title:"",description:"",credit:"",category:"",thumbnail:"null",video:null}),[i,s]=p.useState(!1),[a,c]=p.useState(!1);p.useEffect(()=>{(async()=>{if(t)try{const m=await Z.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${t}`);m.status===200?o(m.data||{}):console.error("Failed to fetch content details:",m.data.error)}catch(m){console.error("Error fetching content details:",m)}})()},[t]);const l=f=>{o({...r,[f.target.name]:f.target.value})},d=f=>{o({...r,[f.target.name]:f.target.files[0]})},u=async()=>{const f=new FormData;f.append("title",r.title),f.append("description",r.description),f.append("credit",r.credit),f.append("category",r.category),f.append("thumbnail",r.thumbnail),f.append("video",r.video),s(!0);try{const m=await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${t}`,f,{headers:{"Content-Type":"multipart/form-data"}});m.status===200?(c(!0),console.log("Content updated successfully")):console.error("Failed to update content:",m.data.error)}catch(m){console.error("Error updating content:",m)}finally{s(!1)}};return n.jsxs(n.Fragment,{children:[n.jsx(u7,{onClick:e}),n.jsxs(d7,{children:[n.jsx(h7,{onClick:e,children:"×"}),n.jsx("h2",{children:"Update Video"}),Object.keys(r).length>0&&n.jsxs(f7,{children:[n.jsx("label",{children:"Title"}),n.jsx(Cl,{type:"text",name:"title",onChange:l}),n.jsx("label",{children:"Video Description"}),n.jsx(p7,{name:"description",onChange:l}),n.jsx("label",{children:"Production Credits"}),n.jsx(Cl,{type:"text",name:"credit",onChange:l}),n.jsx("label",{children:"Category"}),n.jsxs(m7,{name:"category",onChange:l,children:[n.jsx("option",{value:"Top 10",children:"Top 10"}),n.jsx("option",{value:"Fashion Show",children:"Fashion Show"}),n.jsx("option",{value:"Teen",children:"Teens"}),n.jsx("option",{value:"Documentarie",children:"Documentaries"}),n.jsx("option",{value:"Interview",children:"Interviews"}),n.jsx("option",{value:"Social",children:"Social"}),n.jsx("option",{value:"Behind the camera",children:"Behind the camera"}),n.jsx("option",{value:"Soon in Playmood",children:"Soon in Playmood"}),n.jsx("option",{value:"Daries",children:"Daries"})]}),n.jsx("label",{children:"Upload Video Image"}),n.jsx(Cl,{type:"file",accept:"image/*",onChange:d}),n.jsx("label",{children:"Upload Video"}),n.jsx(Cl,{type:"file",accept:"video/*",onChange:d}),n.jsx(x7,{type:"button",onClick:u,children:i?"Updating...":"Update"}),a&&n.jsx(g7,{children:n.jsx("p",{children:"Video uploaded successfully!"})})]})]})]})},d7=S.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`,u7=S.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`,h7=S.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`,f7=S.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`,Cl=S.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`,p7=S.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`,m7=S.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`,x7=S.button`
    padding: 10px;
    background-color: #541011;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`,g7=S.div`
  background-color: #541011; /* Bootstrap success color */
  color: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
`,v7=({isOpen:e,onClose:t,videoUrl:r})=>e?n.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center",children:n.jsxs("div",{className:"bg-white p-4 rounded shadow-lg w-3/4 h-3/4",children:[n.jsx("button",{className:"absolute top-2 right-2 bg-red-500 text-white p-2 rounded",onClick:t,children:"Close"}),n.jsxs("video",{controls:!0,className:"w-full h-full",children:[n.jsx("source",{src:r,type:"video/mp4"}),"Your browser does not support the video tag."]})]})}):null,w7=()=>{const{user:e,isError:t,message:r,token:o}=xt(H=>H.auth);if(t)return n.jsxs("div",{children:["Error: ",r]});const[i,s]=p.useState([]),[a,c]=p.useState(""),[l,d]=p.useState(!1),[u,f]=p.useState(null),[m,b]=p.useState([]),[x,h]=p.useState("");p.useState("");const[v,w]=p.useState(!1),[g,j]=p.useState(!1),[y,k]=p.useState("dashboard"),[_,E]=p.useState([]),[N,T]=p.useState(""),[M,L]=p.useState(!1),I=cr(),$=de(),V=()=>{I(ls()),I(wn()),$("/")};p.useEffect(()=>{D(),Y(),z(),X()},[]);const F=H=>{T(H),L(!0)},D=async()=>{console.log(i);try{let H="https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/";a!=="all"&&(H+=`?category=${a}`);const W=await fetch(H);if(!W.ok){console.error(`Failed to fetch videos. Status: ${W.status}, ${W.statusText}`);return}const ie=await W.json();s(ke=>[...ke,...ie])}catch(H){console.error("Error fetching videos:",H)}},Y=async()=>{try{const H=await fetch("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/unapproved",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.token}`}});if(!H.ok){console.error(`Failed to fetch unapproved videos. Status: ${H.status}, ${H.statusText}`);return}const W=await H.json();s(ie=>[...ie,...W])}catch(H){console.error("Error fetching unapproved videos:",H)}},z=async()=>{try{const W=await(await fetch("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.token}`}})).json();b(W)}catch(H){console.error("Error fetching users:",H)}},A=async H=>{try{const W=await fetch(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/demote/${H}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.token}`}});if(W.ok){const ie=await W.json();b(m.map(ke=>ke.id===H?ie:ke))}else console.error("Failed to demote user:",W.status,W.statusText)}catch(W){console.error("Error demoting user:",W)}},R=async H=>{try{const W=await fetch(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/approve/${H}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.token}`}});if(W.ok){const ie=await W.json();s(i.map(ke=>ke._id===H?ie:ke))}else console.error("Failed to approve video:",W.status,W.statusText)}catch(W){console.error("Error approving video:",W)}},q=async H=>{try{const W=await fetch(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/decline/${H}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${accessToken}`}});if(W.ok){const ie=await W.json();s(i.map(ke=>ke._id===H?ie:ke))}else console.error("Failed to decline video:",W.status,W.statusText)}catch(W){console.error("Error declining video:",W)}},X=async()=>{try{const H=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/",{headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.token}`}});E(H.data)}catch(H){console.error("Error fetching creator requests:",H)}},oe=async H=>{var W;try{await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/${H}`,{status:"approved"},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.token}`}}),E(_.filter(ie=>ie._id!==H))}catch(ie){console.error("Error approving creator request:",((W=ie.response)==null?void 0:W.data)||ie.message)}},J=async H=>{var W;try{await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange/${H}`,{status:"declined"},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.token}`}}),E(_.filter(ie=>ie._id!==H))}catch(ie){console.error("Error declining creator request:",((W=ie.response)==null?void 0:W.data)||ie.message)}},xe=()=>{j(!0)},je=()=>{w(!1)},Se=()=>{j(!1)},G=()=>{},ae=H=>{const W=H.target.value;c(W),D()},ge=async H=>{try{console.log("Updating Content with ID:",H),f(H),d(!0)}catch(W){console.error("Error updating content:",W)}},te=async H=>{try{console.log("Deleting video with ID:",H)}catch(W){console.error("Error deleting video:",W)}},we=async(H,W)=>{try{console.log("Updating user role:",H,W)}catch(ie){console.error("Error updating user role:",ie)}},Ie=()=>{switch(y){case"videos":return n.jsxs("div",{className:"flex-1 min-w-[300px] bg-gray-100 border border-gray-300 rounded p-5",children:[n.jsx("h2",{children:"Video Management"}),n.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[n.jsxs("select",{className:"p-2 border border-gray-300 rounded",name:"category",value:a,onChange:ae,children:[n.jsx("option",{value:"all",children:"All Categories"}),n.jsx("option",{value:"top10",children:"Top 10"}),n.jsx("option",{value:"fashion",children:"Fashion Show"}),n.jsx("option",{value:"teens",children:"Teens"}),n.jsx("option",{value:"documentaries",children:"Documentaries"}),n.jsx("option",{value:"interviews",children:"Interviews"})]}),n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:xe,children:"Add New Video"})]}),n.jsxs("div",{className:"max-h-[300px] overflow-y-auto mb-4",children:[n.jsx("h3",{className:"text-lg font-semibold mb-2",children:"All Videos"}),n.jsx("ul",{className:"list-none p-0 m-0",children:i.filter(H=>a===""||H.category===a).map(H=>n.jsxs("li",{className:"bg-gray-800 p-2 rounded mb-2 flex justify-between items-center",children:[n.jsxs("div",{children:[n.jsx("p",{className:"m-0 text-white",children:H.title}),n.jsxs("p",{className:"m-0 text-gray-400 text-sm",children:["Category: ",H.category]})]}),n.jsxs("div",{className:"flex gap-1",children:[n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:()=>ge(H._id),children:"Update"}),n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:()=>te(H._id),children:"Delete"})]})]},H._id))})]}),n.jsxs("div",{className:"max-h-[300px] overflow-y-auto",children:[n.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Unapproved Videos"}),n.jsx("ul",{className:"list-none p-0 m-0",children:i.filter(H=>!H.isApproved).map(H=>n.jsxs("li",{className:"bg-gray-800 p-2 rounded mb-2 flex justify-between items-center",children:[n.jsxs("div",{children:[n.jsx("p",{className:"m-0 text-white",children:H.title}),n.jsxs("p",{className:"m-0 text-gray-400 text-sm",children:["Category: ",H.category]})]}),n.jsxs("div",{className:"flex gap-1",children:[n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:()=>F(H.videoUrl),children:"View"}),n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:()=>R(H._id),children:"Approve"}),n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:()=>q(H._id),children:"Decline"})]})]},H._id))})]})]});case"users":return n.jsxs("div",{className:"flex-1 min-w-[300px] bg-gray-100 border border-gray-300 rounded p-5",children:[n.jsx("h2",{children:"User Management"}),n.jsxs("div",{className:"mb-4",children:[n.jsx("input",{className:"p-2 border border-gray-300 rounded",type:"text",placeholder:"Search users...",value:x,onChange:H=>h(H.target.value)}),n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:G,children:"Search"})]}),n.jsxs("div",{className:"max-h-[400px] overflow-y-auto",children:[n.jsx("h3",{className:"text-lg font-semibold mb-2",children:"All Users"}),n.jsx("ul",{className:"list-none p-0 m-0",children:m.filter(H=>H&&(!x||H.name&&H.name.toLowerCase().includes(x.toLowerCase())||H.email&&H.email.toLowerCase().includes(x.toLowerCase()))).map(H=>H?n.jsxs("li",{className:"bg-gray-800 p-2 rounded mb-2 flex justify-between items-center",children:[n.jsxs("div",{children:[n.jsx("p",{className:"m-0 text-white",children:H.name}),n.jsxs("p",{className:"m-0 text-gray-400 text-sm",children:["Email: ",H.email]}),n.jsxs("p",{className:"m-0 text-gray-400 text-sm",children:["Role: ",H.role]})]}),n.jsxs("div",{className:"flex gap-1 items-center",children:[n.jsxs("select",{className:"p-2 bg-gray-700 text-white rounded",value:H.role,onChange:W=>we(H._id,W.target.value),children:[n.jsx("option",{value:"user",children:"User"}),n.jsx("option",{value:"creator",children:"Creator"}),n.jsx("option",{value:"admin",children:"Admin"})]}),n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:()=>A(H._id),children:"Demote to User"})]})]},H._id):null)})]}),n.jsxs("div",{className:"max-h-[400px] overflow-y-auto mt-4",children:[n.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Creator Requests"}),n.jsx("ul",{className:"list-none p-0 m-0",children:_.map(H=>H.user?n.jsxs("li",{className:"bg-gray-800 p-2 rounded mb-2 flex justify-between items-center",children:[n.jsxs("div",{children:[n.jsx("p",{className:"m-0 text-white",children:H.user.name}),n.jsxs("p",{className:"m-0 text-gray-400 text-sm",children:["Email: ",H.user.email]})]}),n.jsxs("div",{className:"flex gap-1",children:[n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:()=>oe(H._id),children:"Approve"}),n.jsx("button",{className:"p-2 bg-red-900 text-white rounded",onClick:()=>J(H._id),children:"Decline"})]})]},H._id):null)})]})]})}};return n.jsxs("div",{className:"flex flex-col md:flex-row gap-4",children:[n.jsxs("div",{className:"w-full md:w-1/4 bg-gray-200 p-4 rounded",children:[n.jsxs("div",{className:"flex justify-between",children:[n.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Menu"}),n.jsx("ul",{children:n.jsx("li",{children:n.jsx("button",{class:"bg-[#e72b2b] text-white py-1 px-3 border-none rounded cursor-pointer text-xs transition-colors duration-300 mt-2",onClick:V,children:"Logout"})})})]}),n.jsxs("ul",{className:"list-none p-0",children:[n.jsx("li",{className:`cursor-pointer p-2 rounded mb-2 ${y==="dashboard"?"bg-red-900 text-white":"bg-gray-300"}`,onClick:()=>k("dashboard"),children:"Dashboard"}),n.jsx("li",{className:`cursor-pointer p-2 rounded mb-2 ${y==="videos"?"bg-red-900 text-white":"bg-gray-300"}`,onClick:()=>k("videos"),children:"Video Management"}),n.jsx("li",{className:`cursor-pointer p-2 rounded mb-2 ${y==="users"?"bg-red-900 text-white":"bg-gray-300"}`,onClick:()=>k("users"),children:"User Management"})]})]}),n.jsx("div",{className:"flex-1",children:Ie()}),M&&n.jsx(v7,{isOpen:M,onClose:()=>L(!1),videoUrl:N}),v&&n.jsx(n7,{onClose:je}),g&&n.jsx(Nm,{onClose:Se}),l&&n.jsx(c7,{contentId:u,onClose:()=>d(!1)})]})};function y7(){const e=de();return n.jsxs("div",{className:"flex flex-col items-center justify-center min-h-screen bg-black text-gray-800",children:[n.jsx("h1",{className:"text-6xl text-red-600 font-bold mb-4",children:"404"}),n.jsxs("p",{className:"text-xl text-white mb-8 text-center ",children:["Oops! you miss your way, let help you back! ",n.jsx("br",{})," click on the button below"]}),n.jsx("button",{onClick:()=>e("/"),className:"px-6 py-2 bg-[#541011] text-white rounded hover:bg-[#8b2a2c] transition",children:"Go to Home"})]})}function b7(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(j7,{children:[t?n.jsx(k7,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"NEW ON PLAYMOOD"}),n.jsx(S7,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const j7=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const S7=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,k7=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function N7(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(C7,{children:[t?n.jsx(E7,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"RECOMMENDED FOR YOU"}),n.jsx(_7,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const C7=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const _7=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,E7=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function T7(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const d=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(d.data)}catch(d){console.error("Error fetching data:",d)}})()},[]);const a=o.filter(l=>l.category==="Top 10"),c=l=>{e("/newplaymood",{state:{movie:l.video,title:l.title||"",desc:l.description||"",credits:l.credit||""}})};return n.jsxs(P7,{children:[t?n.jsx(z7,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"SPACES"}),n.jsx(O7,{children:a.map((l,d)=>n.jsx("div",{className:"slidescircle",onClick:u=>c(u),children:n.jsx("img",{src:l.thumbnail,alt:`Thumbnail ${d}`})},l.id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const P7=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const O7=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,z7=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function R7(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const d=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(d.data)}catch(d){console.error("Error fetching data:",d)}})()},[]);const a=o.filter(l=>l.category==="Top 10"),c=l=>{e("/newplaymood",{state:{movie:l.video,title:l.title||"",desc:l.description||"",credits:l.credit||""}})};return n.jsxs(M7,{children:[t?n.jsx(L7,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"DIARIES"}),n.jsx($7,{children:a.map((l,d)=>n.jsx("div",{className:"slidescircle",onClick:u=>c(u),children:n.jsx("img",{src:l.thumbnail,alt:`Thumbnail ${d}`})},l.id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const M7=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const $7=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,L7=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function I7(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(A7,{children:[t?n.jsx(F7,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"STORIES"}),n.jsx(D7,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const A7=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const D7=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,F7=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function B7(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(U7,{children:[t?n.jsx(H7,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"INTERVIEWS"}),n.jsx(W7,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const U7=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const W7=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,H7=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function V7(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(q7,{children:[t?n.jsx(K7,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"FASHION SHOW STORIES"}),n.jsx(Y7,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const q7=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const Y7=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,K7=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function Q7(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(X7,{children:[t?n.jsx(Z7,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"DOCUMENTARIES AND REPORTS"}),n.jsx(G7,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const X7=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const G7=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,Z7=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function J7(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(eO,{children:[t?n.jsx(rO,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"BEHIND THE CAMERAS"}),n.jsx(tO,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const eO=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const tO=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,rO=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function nO(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(oO,{children:[t?n.jsx(sO,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"SOON IN PLAYMOOD"}),n.jsx(iO,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const oO=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const iO=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,sO=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function aO(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(lO,{children:[t?n.jsx(dO,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"TEENS"}),n.jsx(cO,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const lO=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const cO=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,dO=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function uO(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(hO,{children:[t?n.jsx(pO,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"BEST IN FASHION"}),n.jsx(fO,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const hO=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const fO=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,pO=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function mO(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}),[]),p.useEffect(()=>{(async()=>{try{const u=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(u.data)}catch(u){console.error("Error fetching data:",u)}})()},[]);const a=o.filter(d=>d.category==="Top 10"),c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(xO,{children:[t?n.jsx(vO,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"ONLY IN PLAYMOOD"}),n.jsx(gO,{children:a.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const xO=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const gO=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,vO=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function wO(){const e=de(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),s=xt(d=>d.auth.user),a=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",a),()=>{window.removeEventListener("resize",a)}),[]),p.useEffect(()=>{(async()=>{try{const u=s._id,f=await Z.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/watchlist/${u}`);i(f.data.watchList)}catch(u){console.error("Error fetching data:",u)}})()},[]);const c=(d,u)=>`${d.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${u}`,l=d=>{const u=c(d.title,d._id);console.log("Navigating to movie with slug:",u),e(`/movie/${u}`)};return n.jsxs(yO,{children:[t?n.jsx(jO,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex ",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:"WATCHLIST"}),n.jsx(bO,{children:o.map(d=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(d),children:n.jsx(it,{img:d.thumbnail,title:d.title,movie:d.video,id:d.id,desc:d.description,customStyle:{}})},d._id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsxs("div",{className:"flex flex-column",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"md:h-20 md:w-auto h-10 w-28 cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>e("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const yO=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const bO=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,jO=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function SO(){var d,u;const e=ti(),[t,r]=p.useState(window.innerWidth<=768),[o,i]=p.useState([]),[s,a]=p.useState([]),c=()=>{r(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",c),()=>{window.removeEventListener("resize",c)}),[]),p.useEffect(()=>{(async()=>{try{const m=await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/");i(m.data)}catch(m){console.error("Error fetching data:",m)}})()},[]),p.useEffect(()=>{if(e.state&&e.state.creator){const f=e.state.creator._id,m=o.filter(b=>b.creatorId===f);a(m)}},[e.state,o]);const l=f=>{navigate(`/movie/${f.id}`,{state:{movie:f.video,title:f.title||"",desc:f.description||"",credits:f.credit||""}})};return n.jsxs(kO,{children:[t?n.jsx(CO,{onClick:()=>handle_sidebar_hover(),children:n.jsx(Tt,{})}):n.jsx(Pt,{}),n.jsxs("div",{className:"flex",children:[n.jsx("div",{className:" hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  ",children:n.jsxs("div",{className:" flex flex-col gap-1 text-sm  md:text-xl font-medium text-white ",children:[n.jsx(C,{to:"/newplaymood",className:"hover:text-red-700",children:"New on Playmood"}),n.jsx(C,{to:"/channels",className:"hover:text-red-700",children:"Channels"}),n.jsx(C,{to:"/diaries",className:"hover:text-red-700",children:"Diaries"}),n.jsx(C,{to:"/spaces",className:"hover:text-red-700",children:"Spaces"}),n.jsx(C,{to:"/recommended",className:"hover:text-red-700",children:"Recommendations for you"}),n.jsx(C,{to:"/interviews",className:"hover:text-red-700",children:"Interviews"}),n.jsx(C,{to:"/fashion",className:"hover:text-red-700",children:"Fashion Shows Stories"}),n.jsx(C,{to:"/documentaries",className:"hover:text-red-700",children:"Documentaries and report"}),n.jsx(C,{to:"/cameras",className:"hover:text-red-700",children:"Behind the cameras"}),n.jsx(C,{to:"/soon",className:"hover:text-red-700",children:"Soon in Playmood"}),n.jsx(C,{to:"/teen",className:"hover:text-red-700",children:"Teen"}),n.jsx(C,{to:"/bestfashion",className:"hover:text-red-700",children:"Best in Fashion"}),n.jsx(C,{to:"/onlyplaymood",className:"hover:text-red-700",children:"Only in Playmood"}),n.jsx(C,{to:"/watchlist",className:"hover:text-red-700",children:"Watchlist"})]})}),n.jsxs("div",{className:"h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8",children:[n.jsxs("div",{className:"flex justify-between",children:[n.jsx("h3",{className:"pl-16 pb-2 text-white text-[1.5rem] font-bold",children:((u=(d=e.state)==null?void 0:d.creator)==null?void 0:u.name)||"Creator Name"}),n.jsx("button",{className:"bg-[#541011] text-white px-2 py-1 rounded hover:bg-[#461718]",children:"Subscribe"})]}),n.jsx(NO,{children:s.map(f=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>l(f),children:n.jsx(it,{img:f.thumbnail,title:f.title,movie:f.video,id:f.id,desc:f.description,customStyle:{}})},f.id))})]})]}),n.jsxs("div",{className:"h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ",children:[n.jsx("div",{className:"flex-shrink-0",children:n.jsx("img",{className:"h-20 w-auto cursor-pointer",src:Ze,alt:"Logo"})}),n.jsxs("div",{className:"flex flex-row md:flex-row gap-4 md:gap-5",children:[n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs("div",{className:"flex items-center text-white gap-2",children:[n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:n.jsx("img",{className:"h-7 w-7",src:le,alt:"Instagram"})}),n.jsx("p",{children:n.jsx("a",{className:"no-underline text-white",href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]}),n.jsxs("div",{className:"flex flex-row text-white text-xs gap-2 md:mr-10",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"cursor-pointer",children:"Contact us:"}),n.jsx("h3",{className:"cursor-pointer",children:"Creators@playmoodtv.com"})]}),n.jsxs("div",{className:"flex flex-row md:flex-col gap-1",children:[n.jsx("p",{className:"cursor-pointer",onClick:()=>navigate("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{className:"cursor-pointer",onClick:()=>navigate("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{className:"cursor-pointer",children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const kO=S.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;S.div`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`;const NO=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,CO=S.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;function _O(){const{state:e}=ti(),t=de(),r=xt(A=>A.auth.user),o=(r==null?void 0:r._id)||null,[i,s]=p.useState(!1),[a,c]=p.useState(!1),[l,d]=p.useState(null),[u,f]=p.useState([]),[m,b]=p.useState(!1),[x,h]=p.useState(!1),[v,w]=p.useState([]),[g,j]=p.useState(!1),[y,k]=p.useState(!1),[_,E]=p.useState(""),[N,T]=p.useState({});p.useEffect(()=>{(async()=>{if(!e||!e.creatorId){E("Creator ID is missing.");return}j(!0),E("");try{const R=(r==null?void 0:r.token)||localStorage.getItem("token"),q=await Z.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${e.creatorId}`,{headers:{Authorization:`Bearer ${R}`}});if(d(q.data),f(q.data.content||[]),console.log("creatorData:",q.data),o&&R){const oe=(await Z.get("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com//api/subscribe/subscribers",{headers:{Authorization:`Bearer ${R}`}})).data.some(J=>J.creatorId===e.creatorId);s(oe)}}catch(R){console.error("Error fetching creator data:",R),E("Failed to load creator data.")}finally{j(!1)}})()},[e,r,o]);const M=async()=>{var A,R,q;if(!o){E("Please log in to subscribe.");return}c(!0),setTimeout(()=>{c(!1)},1e3);try{const X=(r==null?void 0:r.token)||localStorage.getItem("token");if(!X){E("Authentication token missing.");return}i?(await Z.put("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe",{creatorId:e.creatorId},{headers:{Authorization:`Bearer ${X}`}}),s(!1),d(oe=>({...oe,subscribers:oe.subscribers>0?oe.subscribers-1:0}))):(await Z.post("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe",{creatorId:e.creatorId},{headers:{Authorization:`Bearer ${X}`}}),s(!0),d(oe=>({...oe,subscribers:oe.subscribers+1})))}catch(X){console.error("Subscription error:",((A=X.response)==null?void 0:A.data)||X.message),E(((q=(R=X.response)==null?void 0:R.data)==null?void 0:q.message)||(i?"Failed to unsubscribe.":"Failed to subscribe."))}},L=async()=>{if(!e||!e.creatorId){E("Creator ID is missing."),k(!1);return}k(!0),E("");try{const A=(r==null?void 0:r.token)||localStorage.getItem("token"),R=await Z.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${e.creatorId}`,{headers:{Authorization:`Bearer ${A}`}});w(Array.isArray(R.data)?R.data:[])}catch(A){console.error("Error fetching community posts:",A),E("Failed to load community posts.")}finally{k(!1)}},I=async(A,R)=>{if(!o){E("Please log in to like posts.");return}try{const q=(r==null?void 0:r.token)||localStorage.getItem("token"),X=R?`/api/community/${A}/unlike`:`/api/community/${A}/like`;await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com${X}`,{},{headers:{Authorization:`Bearer ${q}`}}),w(oe=>oe.map(J=>J._id===A?{...J,likes:R?J.likes.filter(xe=>xe!==o):[...J.likes,o]}:J))}catch(q){console.error("Error liking/unliking post:",q),E("Failed to update like status.")}},$=async A=>{var R;if(!o){E("Please log in to comment.");return}if(!((R=N[A])!=null&&R.trim())){E("Comment cannot be empty.");return}try{const q=(r==null?void 0:r.token)||localStorage.getItem("token"),X=await Z.post(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${A}/comment`,{content:N[A]},{headers:{Authorization:`Bearer ${q}`}});w(oe=>oe.map(J=>J._id===A?{...J,comments:[...J.comments,{_id:X.data.commentId||Date.now(),user:o,content:N[A],timestamp:new Date().toISOString()}]}:J)),T(oe=>({...oe,[A]:""}))}catch(q){console.error("Error adding comment:",q),E("Failed to add comment.")}},V=()=>{x||L(),h(!x)},F=()=>{h(!1)},D=A=>{t(`/movie/${A._id}`,{state:{movie:A.video,title:A.title||"",desc:A.description||"",credits:A.credit||""}})},Y=()=>b(!0),z=()=>b(!1);return g?n.jsx(S0,{children:"Loading creator data..."}):!l&&!g?n.jsx(ah,{children:"Creator data not available."}):n.jsxs("div",{className:"homecontent w-full overflow-x-hidden flex flex-col items-center bg-black",children:[n.jsx("div",{className:"w-full h-auto",children:n.jsxs("div",{className:"bg-slate-400 w-full h-[200px] relative",children:[n.jsx("img",{className:"w-full h-full object-cover",src:(l==null?void 0:l.bannerImage)||"https://via.placeholder.com/1200x200",alt:"banner"}),n.jsxs("div",{className:"flex w-full sm:w-[200px] absolute right-5 top-[80%] transform -translate-y-[50%] justify-around items-center flex-row gap-[10px] px-2",children:[l!=null&&l.twitter?n.jsx("a",{href:l.twitter,target:"_blank",rel:"noopener noreferrer",children:n.jsx(Ao,{className:"text-[24px] text-white cursor-pointer hover:text-[#541011]"})}):n.jsx(Ao,{className:"text-[24px] text-gray-400 cursor-not-allowed"}),l!=null&&l.instagram?n.jsx("a",{href:l.instagram,target:"_blank",rel:"noopener noreferrer",children:n.jsx(Lo,{className:"text-[24px] text-white cursor-pointer hover:text-[#541011]"})}):n.jsx(Lo,{className:"text-[24px] text-gray-400 cursor-not-allowed"}),l!=null&&l.linkedin?n.jsx("a",{href:l.linkedin,target:"_blank",rel:"noopener noreferrer",children:n.jsx(Io,{className:"text-[24px] text-white cursor-pointer hover:text-[#541011]"})}):n.jsx(Io,{className:"text-[24px] text-gray-400 cursor-not-allowed"}),l!=null&&l.tiktok?n.jsx("a",{href:l.tiktok,target:"_blank",rel:"noopener noreferrer",children:n.jsx(ki,{className:"text-[24px] text-white cursor-pointer hover:text-[#541011]"})}):n.jsx(ki,{className:"text-[24px] text-gray-400 cursor-not-allowed"})]})]})}),n.jsxs("div",{className:"w-full flex justify-between py-6 px-10",children:[n.jsxs("div",{className:"flex gap-5",children:[n.jsx("div",{className:"w-20 h-20 rounded-full bg-slate-400",children:n.jsx("img",{src:(l==null?void 0:l.profileImage)||"https://via.placeholder.com/80",alt:"profile",className:"w-20 h-20 rounded-full"})}),n.jsxs("div",{className:"gap-2",children:[n.jsx("h2",{className:"font-semibold text-white",children:(l==null?void 0:l.name)||"Creator Name"}),n.jsxs("h6",{className:"text-sm text-white",children:[(l==null?void 0:l.subscribers)||0," subscribers"]})]})]}),n.jsxs("div",{className:"flex justify-center items-center",children:[n.jsx("button",{className:`bg-[#541011] w-[70%] h-[40%] gap-2 text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px] ${a?"spank":""}`,onClick:M,children:i?"Unsubscribe":"Subscribe"}),n.jsx(H1,{className:"text-white"})]})]}),n.jsx("div",{className:"w-full flex justify-between py-6 px-10",children:n.jsxs("div",{className:"flex justify-between md:w-1/3 w-full",children:[n.jsx("a",{className:"text-white text-sm font-medium hover:cursor-pointer",onClick:()=>t("/"),children:"HOME"}),n.jsx("button",{className:`text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer ${x?"":"underline"}`,onClick:F,children:"VIDEOS"}),n.jsx("button",{className:"text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer",onClick:F,children:"PLAYLIST"}),n.jsx("button",{className:`text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer ${x?"underline":""}`,onClick:V,children:"COMMUNITY"}),n.jsx("button",{className:"text-white text-[12px] md:text-sm font-medium bg-transparent border-none cursor-pointer",onClick:Y,children:"ABOUT"})]})}),n.jsx("div",{className:"w-[100%] h-auto bg-[#541012]-400 px-10",children:x?n.jsxs(n.Fragment,{children:[n.jsx("h2",{className:"text-white font-semibold my-8",children:"Community Posts"}),_&&n.jsx(ah,{children:_}),y?n.jsx(S0,{children:"Loading posts..."}):v.length===0?n.jsx(k0,{children:"No community posts available."}):n.jsx(TO,{children:v.map(A=>{var q;const R=A.likes.includes(o);return n.jsx(PO,{children:n.jsxs(OO,{children:[n.jsxs(zO,{children:[n.jsx(RO,{src:A.user.profileImage,alt:A.user.name}),n.jsxs("div",{children:[n.jsx(MO,{children:A.user.name}),n.jsx($O,{children:new Date(A.timestamp).toLocaleDateString()})]})]}),n.jsx(LO,{children:A.content}),n.jsxs(IO,{children:[n.jsxs(AO,{isLiked:R,onClick:()=>I(A._id,R),children:[n.jsx(an,{})," ",A.likes.length]}),n.jsxs(DO,{children:[n.jsx(V1,{})," ",A.comments.length]})]}),n.jsx(FO,{children:A.comments.map(X=>n.jsxs(BO,{children:[n.jsx(UO,{children:X.content}),n.jsx(WO,{children:new Date(X.timestamp).toLocaleDateString()})]},X._id))}),n.jsxs(HO,{children:[n.jsx(VO,{value:N[A._id]||"",onChange:X=>T(oe=>({...oe,[A._id]:X.target.value})),placeholder:"Add a comment..."}),n.jsx(qO,{onClick:()=>$(A._id),disabled:!((q=N[A._id])!=null&&q.trim()),children:"Post"})]})]})},A._id)})})]}):n.jsxs(n.Fragment,{children:[n.jsx("h2",{className:"text-white font-semibold my-8",children:"Videos"}),_&&n.jsx(ah,{children:_}),u.length===0?n.jsx(k0,{children:"No videos available."}):n.jsx(EO,{children:u.map(A=>n.jsx("div",{className:"flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105",onClick:()=>D(A),children:n.jsx(oi,{img:A.thumbnail,title:A.title,movie:A.video,id:A._id,desc:A.description,customStyle:{}})},A._id))})]})}),n.jsxs(o9,{children:[n.jsx("div",{children:n.jsx("img",{src:Ze})}),n.jsxs("div",{className:"instagrams",children:[n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",children:n.jsx("img",{src:le})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",children:"Official"})})]}),n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://www.instagram.com/playmoodlat/",children:n.jsx("img",{src:le})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodlat/",target:"_blank",children:"Latam"})})]}),n.jsxs("div",{className:"instagram-official",children:[n.jsx("a",{href:"https://www.instagram.com/playmoodmx/",children:n.jsx("img",{src:le})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodmx/",target:"_blank",children:"MX"})})]})]}),n.jsx("div",{}),n.jsxs("div",{className:"contact-footer",children:[n.jsx("h2",{children:"Contact us:"}),n.jsx("h3",{children:"Creators@playmoodtv.com"}),n.jsxs("div",{children:[n.jsx("p",{onClick:()=>t("/privacy-policy"),children:"Privacy Policy"}),n.jsx("p",{onClick:()=>t("/cookies"),children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{children:"All rights reserved to PlaymoodTV 2023"})})]})]}),m&&n.jsx(YO,{onClick:z,children:n.jsxs(KO,{onClick:A=>A.stopPropagation(),children:[n.jsx(QO,{onClick:z,children:"×"}),n.jsxs(XO,{children:[n.jsx(GO,{src:(l==null?void 0:l.profileImage)||"https://via.placeholder.com/60",alt:"Creator Profile"}),n.jsx("h2",{children:(l==null?void 0:l.name)||"Creator Name"})]}),n.jsxs(ZO,{children:[n.jsx("p",{children:(l==null?void 0:l.about)||"No description available."}),n.jsxs(JO,{children:["Subscribers: ",(l==null?void 0:l.subscribers)||0]}),n.jsxs(e9,{children:[n.jsx("h3",{children:"Connect with Me"}),n.jsxs(t9,{children:[l!=null&&l.twitter?n.jsx("a",{href:l.twitter,target:"_blank",rel:"noopener noreferrer",children:n.jsx(Ao,{size:24,className:"hover:text-[#541011]"})}):n.jsx(Ao,{size:24,className:"text-gray-400 cursor-not-allowed"}),l!=null&&l.instagram?n.jsx("a",{href:l.instagram,target:"_blank",rel:"noopener noreferrer",children:n.jsx(Lo,{size:24,className:"hover:text-[#541011]"})}):n.jsx(Lo,{size:24,className:"text-gray-400 cursor-not-allowed"}),l!=null&&l.linkedin?n.jsx("a",{href:l.linkedin,target:"_blank",rel:"noopener noreferrer",children:n.jsx(Io,{size:24,className:"hover:text-[#541011]"})}):n.jsx(Io,{size:24,className:"text-gray-400 cursor-not-allowed"}),l!=null&&l.tiktok?n.jsx("a",{href:l.tiktok,target:"_blank",rel:"noopener noreferrer",children:n.jsx(ki,{size:24,className:"hover:text-[#541011]"})}):n.jsx(ki,{size:24,className:"text-gray-400 cursor-not-allowed"})]})]})]}),n.jsx(r9,{children:n.jsx(n9,{className:a?"spank":"",onClick:M,subscribed:i,children:i?"Unsubscribe":"Subscribe"})})]})})]})}const EO=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;

  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`,TO=S.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
`,PO=S.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`,OO=S.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
`,zO=S.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`,RO=S.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`,MO=S.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`,$O=S.span`
  font-size: 0.8rem;
  color: #999;
`,LO=S.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #ccc;
  margin-bottom: 10px;
`,IO=S.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
`,AO=S.button`
  background: none;
  border: none;
  color: ${e=>e.isLiked?"#541011":"#ccc"};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;

  &:hover {
    color: #541011;
  }
`,DO=S.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;

  &:hover {
    color: #541011;
  }
`,FO=S.div`
  margin-bottom: 10px;
`,BO=S.div`
  background: #222;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 5px;
`,UO=S.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 0;
`,WO=S.span`
  font-size: 0.7rem;
  color: #999;
`,HO=S.div`
  display: flex;
  gap: 10px;
`,VO=S.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #333;
  color: #fff;
`,qO=S.button`
  background: #541011;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #fff;
    color: #541011;
  }
`,ah=S.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`,S0=S.div`
  color: #fff;
  text-align: center;
  font-size: 1rem;
  margin: 20px 0;
`,k0=S.div`
  color: #ccc;
  text-align: center;
  font-size: 1rem;
  margin: 20px 0;
`,YO=S.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,KO=S.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  color: #fff;
`,QO=S.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`,XO=S.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
`,GO=S.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  background: #ccc;
`,ZO=S.div`
  margin-bottom: 20px;

  p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #ccc;
  }
`,JO=S.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #fff;
  margin: 10px 0;
`,e9=S.div`
  h3 {
    font-size: 1rem;
    margin: 10px 0;
  }
`,t9=S.div`
  display: flex;
  gap: 15px;

  a {
    color: #fff;
    transition: color 0.3s ease;
  }
`,r9=S.div`
  display: flex;
  justify-content: center;
`,n9=S.button`
  background-color: ${e=>e.subscribed?"#ccc":"#541011"};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #541011;
  }

  &.spank {
    animation: spank 0.3s ease;
  }

  @keyframes spank {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`,o9=S.div`
  height: fit-content;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 60px 20px 60px;

  .contact-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  }

  .instagrams {
    display: flex;
    gap: 5px;

    .instagram-official {
      display: flex;
      height: fit-content;
      align-items: center;
      color: white;

      .instagram-links {
        a {
          text-decoration: none;
          color: white;
        }
      }

      img {
        height: 20px;
        width: 20px;
      }
    }
  }

  div {
    height: fit-content;
    display: flex;
    gap: 10px;
    color: white;

    p {
      font-size: 0.7rem;
      cursor: pointer;
    }

    img {
      height: 80px;
      width: 100%;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
    text-align: center;
  }
`,i9=({isOpen:e,onClose:t,creatorName:r,setCreatorName:o,about:i,setAbout:s,instagram:a,setInstagram:c,tiktok:l,setTiktok:d,linkedin:u,setLinkedin:f,twitter:m,setTwitter:b,bannerImage:x,setBannerImageFile:h,handleUpdateChannelInfo:v})=>{const[w,g]=p.useState(null),[j,y]=p.useState(null),[k,_]=p.useState("");p.useEffect(()=>{if(w){const N=URL.createObjectURL(w);return y(N),h(w),()=>URL.revokeObjectURL(N)}else y(null),h(null)},[w,h]);const E=N=>{const T=N.target.files[0];if(T){if(!["image/jpeg","image/png","image/jpg"].includes(T.type)){_("Please upload a JPEG or PNG image."),g(null),y(null),h(null);return}if(T.size>5242880){_("File size must be less than 5MB."),g(null),y(null),h(null);return}_(""),g(T)}else _(""),g(null),y(null),h(null)};return e?n.jsx("div",{className:"fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50",children:n.jsxs("div",{className:"bg-white p-8 rounded shadow-md w-[90%] max-w-lg",children:[n.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Edit Channel"}),n.jsxs("div",{className:"mb-4",children:[n.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Banner Image"}),x&&n.jsxs("div",{className:"mt-2 mb-2",children:[n.jsx("img",{src:x,alt:"Current Banner",className:"w-full h-32 object-cover rounded"}),n.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Current banner image"})]}),n.jsx("input",{type:"file",accept:"image/jpeg,image/png,image/jpg",onChange:E,className:"mt-2 p-2 border rounded w-full"}),j&&n.jsxs("div",{className:"mt-2 mb-2",children:[n.jsx("img",{src:j,alt:"Banner Preview",className:"w-full h-32 object-cover rounded"}),n.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Preview of new banner"})]}),k&&n.jsx("p",{className:"text-red-500 text-sm mt-1",children:k})]}),n.jsxs("div",{className:"mb-4",children:[n.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Creator Name"}),n.jsx("input",{type:"text",value:r,onChange:N=>o(N.target.value),className:"mt-2 p-2 border rounded w-full"})]}),n.jsxs("div",{className:"mb-4",children:[n.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"About"}),n.jsx("textarea",{value:i,onChange:N=>s(N.target.value),className:"mt-2 p-2 border rounded w-full",rows:"4"})]}),n.jsxs("div",{className:"mb-4",children:[n.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Instagram URL"}),n.jsx("input",{type:"text",value:a,onChange:N=>c(N.target.value),placeholder:"https://instagram.com/yourhandle",className:"mt-2 p-2 border rounded w-full"})]}),n.jsxs("div",{className:"mb-4",children:[n.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"TikTok URL"}),n.jsx("input",{type:"text",value:l,onChange:N=>d(N.target.value),placeholder:"https://tiktok.com/@yourhandle",className:"mt-2 p-2 border rounded w-full"})]}),n.jsxs("div",{className:"mb-4",children:[n.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"LinkedIn URL"}),n.jsx("input",{type:"text",value:u,onChange:N=>f(N.target.value),placeholder:"https://linkedin.com/in/yourhandle",className:"mt-2 p-2 border rounded w-full"})]}),n.jsxs("div",{className:"mb-4",children:[n.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Twitter URL"}),n.jsx("input",{type:"text",value:m,onChange:N=>b(N.target.value),placeholder:"https://twitter.com/yourhandle",className:"mt-2 p-2 border rounded w-full"})]}),n.jsxs("div",{className:"flex justify-end gap-4",children:[n.jsx("button",{onClick:t,className:"bg-gray-300 p-2 rounded",children:"Cancel"}),n.jsx("button",{onClick:v,className:"bg-[#541011] text-white p-2 rounded",disabled:k||!r.trim(),children:"Save"})]})]})}):null};function s9(){const e=de(),{user:t}=xt(K=>K.auth),[r,o]=p.useState(window.innerWidth<=768),[i,s]=p.useState(""),[a,c]=p.useState(null),[l,d]=p.useState(""),[u,f]=p.useState(""),[m,b]=p.useState(""),[x,h]=p.useState(""),[v,w]=p.useState(""),[g,j]=p.useState(""),[y,k]=p.useState(""),[_,E]=p.useState(!1),[N,T]=p.useState(!1),[M,L]=p.useState(!1),[I,$]=p.useState(!1),[V,F]=p.useState(!1),[D,Y]=p.useState(!1),[z,A]=p.useState([]),[R,q]=p.useState(""),[X,oe]=p.useState({}),[J,xe]=p.useState(null),[je,Se]=p.useState(""),[G,ae]=p.useState("Uploads"),[ge,te]=p.useState(""),[we,Ie]=p.useState(!1),[H,W]=p.useState(!1),[ie,ke]=p.useState([]),Ve=()=>{o(window.innerWidth<=768)};p.useEffect(()=>(window.addEventListener("resize",Ve),()=>window.removeEventListener("resize",Ve)),[]),p.useEffect(()=>{const K=async()=>{try{const me=await Z.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${t._id}`,{headers:{Authorization:`Bearer ${t.token}`}});s(me.data.bannerImage||""),d(me.data.profileImage||""),f(me.data.name||""),b(me.data.about||""),h(me.data.instagram||""),w(me.data),j(me.data),k(me.data.twitter||"")}catch(me){console.error("Error fetching channel details:",me),te("Failed to load channel details. Please try again later.")}};t&&t._id&&K()},[t]),p.useEffect(()=>{const K=async()=>{Ie(!0);try{const me=await Z.get("https://playmoodserver-stg-0/api/community/${userId}",{headers:{Authorization:`Bearer ${t.token}`}}),P=Array.isArray(me.data)?me.data.map(O=>({...O,likes:Array.isArray(O.likes)?O.likes:[],comments:Array.isArray(O.comments)?O.comments:[]})):[];A(P),te("")}catch(me){console.error("Error fetching community posts:",me),te("Failed to load community posts. Please try again later.")}finally{Ie(!1)}};t&&t._id&&G==="Community"&&K()},[t,G]);const Qe=async()=>{var K,me;W(!0),te("");try{const P=new FormData;P.append("name",u),P.append("about",m),P.append("instagram",x),P.append("tiktok",v),P.append("linkedin",g),P.append("twitter",y),a&&P.append("bannerImage",a);const O=await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${t._id}`,P,{headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${t.token}`}});s(O.data.bannerImage||""),d(O.data.profileImage||""),f(O.data.name||""),b(O.data.about||""),h(O.data.instagram||""),w(O.data.tiktok||""),j(O.data.linkedin||""),k(O.data.twitter||""),c(null),E(!1),T(!1),te("")}catch(P){console.error("Error updating channel info:",P),te(((me=(K=P.response)==null?void 0:K.data)==null?void 0:me.message)||"Failed to update channel. Please check your inputs or try again later.")}finally{W(!1)}},Me=()=>{L(!0)},he=()=>{L(!1)},be=()=>{$(!0)},Be=()=>{$(!1)},qe=()=>{ae("Community")},dt=async()=>{try{const K=await Z.post("https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/create",{content:R},{headers:{Authorization:`Bearer ${t.token}`}});A([{...K.data,likes:Array.isArray(K.data.likes)?K.data.likes:[],comments:Array.isArray(K.data.comments)?K.data.comments:[]},...z]),q(""),F(!1),te("")}catch(K){console.error("Error creating community post:",K),te("Failed to create post. Please try again later.")}},vt=async()=>{if(!(!J||!je.trim()))try{const K=await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${J}`,{content:je},{headers:{Authorization:`Bearer ${t.token}`}});A(z.map(me=>me._id===J?{...me,content:K.data.content,comments:Array.isArray(K.data.comments)?K.data.comments:[]}:me)),Se(""),xe(null),Y(!1),te("")}catch(K){console.error("Error updating post:",K),te("Failed to update post. Please try again later.")}},Bt=async K=>{if(window.confirm("Are you sure you want to delete this post?"))try{await Z.delete(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${K}`,{headers:{Authorization:`Bearer ${t.token}`}}),A(z.filter(me=>me._id!==K)),te("")}catch(me){console.error("Error deleting post:",me),te("Failed to delete post. Please try again later.")}},St=async K=>{var me;if(!((me=X[K])!=null&&me.trim())){te("Comment cannot be empty.");return}try{const P=await Z.post(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${K}/comment`,{content:X[K]},{headers:{Authorization:`Bearer ${t.token}`}});A(z.map(O=>O._id===K?{...O,comments:Array.isArray(P.data.comments)?P.data.comments:[...O.comments,{_id:P.data.commentId||Date.now(),user:{_id:t._id,name:t.name},content:X[K],timestamp:new Date().toISOString()}]}:O)),oe(O=>({...O,[K]:""})),te("")}catch(P){console.error("Error adding comment:",P),te("Failed to add comment. Please try again later.")}},De=async(K,me)=>{if(window.confirm("Are you sure you want to delete this comment?"))try{await Z.delete(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${K}/comment/${me}`,{headers:{Authorization:`Bearer ${t.token}`}}),A(z.map(P=>P._id===K?{...P,comments:P.comments.filter(O=>O._id!==me)}:P)),te("")}catch(P){console.error("Error deleting comment:",P),te("Failed to delete comment. Please try again later.")}},Zt=async K=>{try{const me=z.find(ee=>ee._id===K),O=Array.isArray(me==null?void 0:me.likes)&&me.likes.includes(t==null?void 0:t._id)?`/api/community/${K}/unlike`:`/api/community/${K}/like`,B=await Z.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com${O}`,{},{headers:{Authorization:`Bearer ${t.token}`}});A(z.map(ee=>ee._id===K?{...ee,likes:Array.isArray(B.data.likes)?B.data.likes:[]}:ee)),te("")}catch(me){console.error("Error liking/unliking post:",me),te("Failed to like/unlike post. Please try again later.")}},Tr=K=>{e(`/movie/${K._id}`,{state:{movie:K.video,title:K.title||"",desc:K.description||"",credits:K.credit||""}})};return n.jsxs(a9,{children:[ge&&n.jsx(W9,{children:ge}),n.jsx(l9,{children:n.jsxs(c9,{children:[n.jsx(d9,{src:i,alt:"Channel banner"}),n.jsxs(u9,{children:[y?n.jsx(_l,{href:y,target:"_blank",rel:"noopener noreferrer","aria-label":"Twitter",children:n.jsx(Ao,{})}):n.jsx(Ao,{className:"disabled","aria-label":"Twitter (disabled)"}),x?n.jsx(_l,{href:x,target:"_blank",rel:"noopener noreferrer","aria-label":"Instagram",children:n.jsx(Lo,{})}):n.jsx(Lo,{className:"disabled","aria-label":"Instagram (disabled)"}),g?n.jsx(_l,{href:g,target:"_blank",rel:"noopener noreferrer","aria-label":"LinkedIn",children:n.jsx(Io,{})}):n.jsx(Io,{className:"disabled","aria-label":"LinkedIn (disabled)"}),v?n.jsx(_l,{href:v,target:"_blank",rel:"noopener noreferrer","aria-label":"TikTok",children:n.jsx(ki,{})}):n.jsx(ki,{className:"disabled","aria-label":"TikTok (disabled)"})]})]})}),n.jsxs(h9,{children:[n.jsxs(f9,{children:[n.jsx(p9,{children:l?n.jsx(m9,{src:`${l}?${new Date().getTime()}`,alt:"Profile",onClick:()=>e("/dashboard")}):n.jsx(x9,{})}),n.jsxs(g9,{children:[n.jsx("h2",{children:u||(t==null?void 0:t.name)}),n.jsxs("h6",{children:[(t==null?void 0:t.subscribers)||0," subscribers"]})]})]}),n.jsxs(v9,{children:[n.jsx(lh,{onClick:()=>F(!0),"aria-label":"Create Community Post",children:"Create Post"}),n.jsx(lh,{onClick:Me,"aria-label":"Upload a Video",children:"Upload a Video"}),n.jsxs(lh,{onClick:()=>T(!0),"aria-label":"Edit Channel",children:["Edit Channel ",n.jsx(Bc,{})]})]})]}),n.jsx(w9,{children:n.jsxs(y9,{children:[n.jsx(El,{className:G==="Uploads"?"active":"",onClick:()=>e("/"),"aria-label":"Home",children:"HOME"}),n.jsx(El,{onClick:be,"aria-label":"Donations",children:"DONATIONS"}),n.jsx(El,{className:G==="Community"?"active":"",onClick:qe,"aria-label":"Community",children:"COMMUNITY"}),n.jsx(El,{onClick:be,"aria-label":"Analytics",children:"ANALYTICS"})]})}),n.jsxs(b9,{children:[n.jsx(j9,{children:G==="Uploads"?"Your Uploads":"Community Posts"}),G==="Uploads"?n.jsx(S9,{children:ie.length===0?n.jsx(z0,{children:"No uploads yet. Upload a video to get started!"}):ie.map(K=>n.jsx(k9,{onClick:()=>Tr(K),children:n.jsx(oi,{img:K.thumbnail,title:K.title,movie:K.video,id:K._id,desc:K.description,customStyle:{}})},K._id))}):n.jsx(N9,{children:we?n.jsx(H9,{children:"Loading posts..."}):z.length===0?n.jsx(z0,{children:"No community posts yet. Create one to get started!"}):z.map(K=>{var P;const me=Array.isArray(K.likes)&&K.likes.includes(t==null?void 0:t._id);return n.jsx(C9,{children:n.jsxs(_9,{children:[n.jsxs(E9,{children:[n.jsx(T9,{src:K.user.profileImage,alt:K.user.name}),n.jsxs("div",{className:"flex-1",children:[n.jsx(P9,{children:K.user.name}),n.jsx(O9,{children:new Date(K.createdAt).toLocaleDateString()})]}),K.user._id===(t==null?void 0:t._id)&&n.jsxs("div",{className:"flex gap-2",children:[n.jsx(Bc,{className:"edit-icon",onClick:()=>{xe(K._id),Se(K.content),Y(!0)},title:"Edit Post","aria-label":"Edit Post"}),n.jsx(Xg,{className:"delete-icon",onClick:()=>Bt(K._id),title:"Delete Post","aria-label":"Delete Post"})]})]}),n.jsx(z9,{children:K.content}),n.jsxs(R9,{children:[n.jsxs(M9,{isLiked:me,onClick:()=>Zt(K._id),"aria-label":me?"Unlike Post":"Like Post",children:[n.jsx(an,{})," ",K.likes.length]}),n.jsxs($9,{"aria-label":"View Comments",children:[n.jsx(V1,{})," ",K.comments.length]}),n.jsx(yo,{className:"share-icon",onClick:()=>{const O=window.location.href;navigator.clipboard.writeText(O).then(()=>alert("URL copied!"))},title:"Share Post","aria-label":"Share Post"})]}),n.jsx(L9,{children:K.comments.map(O=>n.jsxs(I9,{children:[n.jsxs(A9,{children:[n.jsx("strong",{children:O.user.name||O.user}),": ",O.content]}),n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(D9,{children:new Date(O.timestamp).toLocaleDateString()}),O.user._id===(t==null?void 0:t._id)&&n.jsx(Xg,{className:"delete-icon",onClick:()=>De(K._id,O._id),title:"Delete Comment","aria-label":"Delete Comment"})]})]},O._id))}),n.jsxs(F9,{children:[n.jsx(B9,{value:X[K._id]||"",onChange:O=>oe(B=>({...B,[K._id]:O.target.value})),placeholder:"Add a comment...","aria-label":"Comment Input"}),n.jsx(U9,{onClick:()=>St(K._id),disabled:!((P=X[K._id])!=null&&P.trim()),"aria-label":"Submit Comment",children:"Post"})]})]})},K._id)})})]}),M&&n.jsx(Nm,{onClose:he}),N&&n.jsx(i9,{isOpen:N,onClose:()=>T(!1),creatorName:u,setCreatorName:f,about:m,setAbout:b,instagram:x,setInstagram:h,tiktok:v,setTiktok:w,linkedin:g,setLinkedin:j,twitter:y,setTwitter:k,bannerImage:i,setBannerImageFile:c,handleUpdateChannelInfo:Qe}),n.jsx(tu,{isOpen:I,onClose:Be,onSubmit:()=>$(!1)}),V&&n.jsx(N0,{children:n.jsxs(C0,{children:[n.jsx(_0,{children:"Create Community Post"}),n.jsx(E0,{value:R,onChange:K=>q(K.target.value),placeholder:"What's on your mind?",rows:"4","aria-label":"Community Post Content"}),n.jsxs(T0,{children:[n.jsx(P0,{onClick:()=>F(!1),"aria-label":"Cancel",children:"Cancel"}),n.jsx(O0,{onClick:dt,disabled:!R.trim(),"aria-label":"Submit Post",children:"Post"})]})]})}),D&&n.jsx(N0,{children:n.jsxs(C0,{children:[n.jsx(_0,{children:"Edit Community Post"}),n.jsx(E0,{value:je,onChange:K=>Se(K.target.value),placeholder:"Update your post...",rows:"4","aria-label":"Edit Post Content"}),n.jsxs(T0,{children:[n.jsx(P0,{onClick:()=>{Y(!1),Se(""),xe(null)},"aria-label":"Cancel",children:"Cancel"}),n.jsx(O0,{onClick:vt,disabled:!je.trim(),"aria-label":"Save Post",children:"Save"})]})]})}),n.jsxs(V9,{children:[n.jsx("div",{children:n.jsx(q9,{src:Ze,alt:"PlaymoodTV Logo"})}),n.jsxs("div",{className:"instagrams",children:[n.jsxs(ch,{children:[n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==","aria-label":"Official PlaymoodTV Instagram",children:n.jsx(dh,{src:le,alt:"Instagram"})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==",target:"_blank",rel:"noopener noreferrer",children:"Official"})})]}),n.jsxs(ch,{children:[n.jsx("a",{href:"https://www.instagram.com/playmoodlat/","aria-label":"PlaymoodTV Latam Instagram",children:n.jsx(dh,{src:le,alt:"Instagram"})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodlat/",target:"_blank",rel:"noopener noreferrer",children:"Latam"})})]}),n.jsxs(ch,{children:[n.jsx("a",{href:"https://www.instagram.com/playmoodmx/","aria-label":"PlaymoodTV MX Instagram",children:n.jsx(dh,{src:le,alt:"Instagram"})}),n.jsx("p",{className:"instagram-links",children:n.jsx("a",{href:"https://www.instagram.com/playmoodmx/",target:"_blank",rel:"noopener noreferrer",children:"MX"})})]})]}),n.jsx("div",{}),n.jsxs("div",{className:"contact-footer",children:[n.jsx("h2",{children:"Contact us:"}),n.jsx("h3",{children:"Creators@playmoodtv.com"}),n.jsxs("div",{children:[n.jsx(R0,{onClick:()=>e("/privacy-policy"),role:"button","aria-label":"Privacy Policy",children:"Privacy Policy"}),n.jsx(R0,{onClick:()=>e("/cookies"),role:"button","aria-label":"Cookies Policy",children:"Cookies Policy"})]}),n.jsx("div",{children:n.jsx("p",{children:"All rights reserved to PlaymoodTV 2023"})})]})]})]})}const a9=S.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.70);
  overflow-x: hidden;

  > div:not(:last-child) {
    flex: 1 0 auto;
  }
`,l9=S.div`
  width: 100%;
`,c9=S.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #94a3b8;

  @media screen and (max-width: 768px) {
    height: 150px;
  }

  @media screen and (max-width: 480px) {
    height: 120px;
  }
`,d9=S.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,u9=S.div`
  display: flex;
  position: absolute;
  right: 15px;
  top: 80%;
  transform: translateY(-50%);
  gap: 10px;
  padding: 5px;

  svg {
    font-size: 24px;
    color: white;
    cursor: pointer;
    transition: color 0.3s;

    &.disabled {
      color: #9ca3af;
      cursor: not-allowed;
    }
  }

  @media screen and (max-width: 768px) {
    right: 10px;
    gap: 8px;
    svg {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 480px) {
    top: 70%;
    flex-wrap: wrap;
    justify-content: center;
    right: 5px;
    svg {
      font-size: 18px;
    }
  }
`,_l=S.a`
  color: white;
  &:hover {
    color: #541011;
  }
`,h9=S.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 60px;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 16px 20px;
    gap: 16px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px 15px;
  }
`,f9=S.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`,p9=S.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #94a3b8;
  overflow: hidden;

  @media screen and (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`,m9=S.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`,x9=S.div`
  width: 100%;
  height: 100%;
  background-color: #6b7280;
`,g9=S.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin: 0;
  }

  h6 {
    font-size: 0.875rem;
    color: white;
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 1.25rem;
    }
    h6 {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 480px) {
    h2 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.7rem;
    }
  }
`,v9=S.div`
  display: flex;
  gap: 8px;
  width: 45%;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }
`,lh=S.button`
  background-color: #541011;
  color: #f3f3f3;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 80%;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: white;
    color: #541011;
  }

  &:last-child {
    width: 40%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 200px;
    font-size: 12px;
    padding: 8px;

    &:last-child {
      width: 100%;
      max-width: 150px;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 11px;
    padding: 6px;
  }
`,w9=S.div`
  width: 100%;
  padding: 24px 60px;

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px 15px;
  }
`,y9=S.div`
  display: flex;
  justify-content: space-between;
  width: 33.33%;

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
`,El=S.button`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;

  &.active {
    text-decoration: underline;
  }

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`,b9=S.div`
  width: 100%;
  padding: 0 60px;
  background-color: transparent;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 0 15px;
  }
`,j9=S.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 32px 0;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
    margin: 24px 0;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
    margin: 16px 0;
  }
`,S9=S.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 40px;

  @media screen and (max-width: 1000px) {
    margin-top: 10%;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    gap: 15px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
    gap: 10px;
  }
`,k9=S.div`
  flex-grow: 1;
  width: 210px;
  max-width: 210px;
  max-height: 310px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (min-width: 769px) {
    flex: none;
    width: 250px;
    max-width: 250px;
    max-height: 350px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 200px;
    max-height: 280px;
  }

  @media screen and (max-width: 480px) {
    max-width: 160px;
    max-height: 240px;
  }
`,N9=S.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
  margin-bottom: 40px;

  @media screen and (max-width: 1000px) {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 5px;
    gap: 15px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
    gap: 10px;
  }
`,C9=S.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`,_9=S.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  width: 100%;
  box-sizing: border-box;

  .edit-icon, .delete-icon, .share-icon {
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #541011;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 15px;
  }

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`,E9=S.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`,T9=S.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;

  @media screen and (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`,P9=S.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;

  @media screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`,O9=S.span`
  font-size: 0.8rem;
  color: #999;

  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`,z9=S.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #ccc;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`,R9=S.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    gap: 10px;
  }
`,M9=S.button`
  background: none;
  border: none;
  color: ${e=>e.isLiked?"#541011":"#ccc"};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`,$9=S.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`,L9=S.div`
  margin-bottom: 10px;
`,I9=S.div`
  background: #222;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    padding: 8px;
  }
`,A9=S.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 0;

  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`,D9=S.span`
  font-size: 0.7rem;
  color: #999;

  @media screen and (max-width: 480px) {
    font-size: 0.6rem;
  }
`,F9=S.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`,B9=S.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #333;
  color: #fff;
  font-size: 0.9rem;

  @media screen and (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`,U9=S.button`
  background: #541011;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #fff;
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`,N0=S.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
`,C0=S.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 16px;
    max-width: 400px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px;
    max-width: 300px;
  }
`,_0=S.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`,E0=S.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  resize: vertical;

  @media screen and (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`,T0=S.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`,P0=S.button`
  background-color: #d1d5db;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #9ca3af;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`,O0=S.button`
  background-color: #541011;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #fff;
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`,W9=S.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;

  @media screen and (max-width: 480px) {
    padding: 8px;
    font-size: 0.8rem;
  }
`,H9=S.div`
  color: #fff;
  text-align: center;
  font-size: 1rem;
  padding: 20px;

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    padding: 15px;
  }
`,z0=S.div`
  color: #ccc;
  text-align: center;
  font-size: 1rem;
  padding: 20px;

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    padding: 15px;
  }
`,V9=S.div`
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 60px;
  flex-shrink: 0;

  .contact-footer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    h2, h3 {
      margin: 0;
      color: white;
      font-size: 1rem;
    }
  }

  .instagrams {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    text-align: center;
    gap: 15px;

    .instagrams {
      flex-direction: column;
      gap: 10px;
    }

    .contact-footer {
      align-items: center;
      div {
        align-items: center;
      }
    }
  }

  @media screen and (max-width: 480px) {
    padding: 15px;
    .contact-footer h2, .contact-footer h3 {
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 320px) {
    padding: 10px;
    .contact-footer h2, .contact-footer h3 {
      font-size: 0.8rem;
    }
  }
`,q9=S.img`
  height: 80px;
  width: auto;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    height: 60px;
  }

  @media screen and (max-width: 480px) {
    height: 50px;
  }

  @media screen and (max-width: 320px) {
    height: 40px;
  }
`,ch=S.div`
  display: flex;
  align-items: center;
  color: white;

  .instagram-links {
    margin-left: 5px;
    a {
      text-decoration: none;
      color: white;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 480px) {
    .instagram-links a {
      font-size: 0.7rem;
    }
  }

  @media screen and (max-width: 320px) {
    .instagram-links a {
      font-size: 0.6rem;
    }
  }
`,dh=S.img`
  height: 20px;
  width: 20px;

  @media screen and (max-width: 480px) {
    height: 18px;
    width: 18px;
  }

  @media screen and (max-width: 320px) {
    height: 16px;
    width: 16px;
  }
`,R0=S.p`
  font-size: 0.7rem;
  cursor: pointer;
  margin: 0;
  color: white;

  @media screen and (max-width: 480px) {
    font-size: 0.65rem;
  }

  @media screen and (max-width: 320px) {
    font-size: 0.6rem;
  }
`,Y9=()=>{const e=de(),{state:t}=ti(),r=cr(),{isLoading:o,isError:i,isSuccess:s,message:a}=xt(y=>y.auth),[c,l]=p.useState(new Array(6).fill("")),[d,u]=p.useState(60),[f,m]=p.useState(!0),[b,x]=p.useState(""),h=t==null?void 0:t.userId,v=t==null?void 0:t.email;p.useEffect(()=>{if(!h||!v){x("Invalid verification link. Please register again.");return}i&&(x(a||"Verification failed. Please try again."),window.alert(a||"Verification failed. Please try again.")),s&&(window.alert("Email verified successfully!"),e("/login"),r(wn()))},[i,s,a,e,r]),p.useEffect(()=>{let y;return d>0?y=setInterval(()=>u(k=>k-1),1e3):m(!1),()=>clearInterval(y)},[d]);const w=(y,k)=>{const _=[...c];_[k]=y.toUpperCase(),l(_)},g=()=>{if(!h){x("User ID is missing. Please register again.");return}const y=c.join("");if(y.length!==6){x("Please enter a 6-digit code.");return}r(Zl({userId:h,verificationCode:y}))},j=()=>{if(!v){x("Email is missing. Please register again.");return}r(Jl(v)),u(60),m(!0),x(""),window.alert("Verification code resent successfully!")};return n.jsx(K9,{children:n.jsxs(Q9,{children:[n.jsx(X9,{children:"Email Verification"}),n.jsx(G9,{children:"Please enter the 6-digit code sent to your email address (Case Sensitive!)."}),b&&n.jsx(nz,{children:b}),n.jsx(Z9,{children:c.map((y,k)=>n.jsx(J9,{id:`input-${k}`,type:"text",maxLength:"1",value:y,onChange:_=>w(_.target.value,k),disabled:o||!h},k))}),n.jsx(ez,{children:d>0?`Resend code in ${d}s`:"Didn’t receive a code?"}),n.jsx(tz,{onClick:j,disabled:f||o||!v,children:"Resend Code"}),n.jsx(rz,{onClick:g,disabled:o||!h,children:"Verify"})]})})},K9=S.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`,Q9=S.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 400px;
`,X9=S.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`,G9=S.p`
  margin-bottom: 20px;
  color: #666;
`,Z9=S.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`,J9=S.input`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    border-color: #541011;
    outline: none;
  }
`,ez=S.p`
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 20px;
`,tz=S.button`
  background-color: ${e=>e.disabled?"#ccc":"#541011"};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  margin-bottom: 20px;
`,rz=S.button`
  background-color: #541011;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  width: 100%;
`,nz=S.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`,oz=ZS([{path:"/",element:n.jsx(d8,{})},{path:"/admin",element:n.jsx(w7,{})},{path:"/dashboard",element:n.jsx(YP,{})},{path:"/creator",element:n.jsx(_O,{})},{path:"/creatorpage",element:n.jsx(s9,{})},{path:"/schedule",element:n.jsx(u8,{})},{path:"/movie/:slug",element:n.jsx(_8,{})},{path:"/channels",element:n.jsx(H8,{})},{path:"/spaces",element:n.jsx(T7,{})},{path:"/diaries",element:n.jsx(R7,{})},{path:"/stories",element:n.jsx(I7,{})},{path:"/newplaymood",element:n.jsx(b7,{})},{path:"/creator/:id",element:n.jsx(SO,{})},{path:"/interviews",element:n.jsx(B7,{})},{path:"/fashion",element:n.jsx(V7,{})},{path:"/documentaries",element:n.jsx(Q7,{})},{path:"/cameras",element:n.jsx(J7,{})},{path:"/soon",element:n.jsx(nO,{})},{path:"/teen",element:n.jsx(aO,{})},{path:"/bestfashion",element:n.jsx(uO,{})},{path:"/onlyplaymood",element:n.jsx(mO,{})},{path:"/watchlist",element:n.jsx(wO,{})},{path:"/recommended",element:n.jsx(N7,{})},{path:"/privacy-policy",element:n.jsx(K8,{})},{path:"/cookies",element:n.jsx(J8,{})},{path:"/login",element:n.jsx(nP,{})},{path:"/register",element:n.jsx(hP,{})},{path:"/emailverify",element:n.jsx(Y9,{})},{path:"*",element:n.jsx(y7,{})}]);function iz(){return n.jsxs(n.Fragment,{children:[n.jsx(HS,{router:oz}),n.jsx(cf,{})]})}const sz=a_({reducer:{auth:E_}});window.location.hostname==="localhost"||window.location.hostname==="[::1]"||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/);function az(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})}uh.createRoot(document.getElementById("root")).render(n.jsx(Ne.StrictMode,{children:n.jsx(Jk,{store:sz,children:n.jsx(iz,{})})}));az();
