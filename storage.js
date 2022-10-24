/*! For license information please see storage.js.LICENSE.txt */
"use strict";(self.webpackChunkfirebase_r=self.webpackChunkfirebase_r||[]).push([[851],{186:(e,t,n)=>{n.d(t,{j:()=>fe}),n(235);var s,r=n(258),o=n(444),i=n(909);!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(s||(s={}));const a="firebasestorage.googleapis.com";class c extends o.ZR{constructor(e,t){super(u(e),`Firebase Storage: ${t} (${u(e)})`),this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,c.prototype)}_codeEquals(e){return u(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}function u(e){return"storage/"+e}function l(){return new c("unknown","An unknown error occurred, please check the error payload for server response.")}function h(e){return new c("invalid-argument",e)}function d(){return new c("app-deleted","The Firebase app was deleted.")}function p(e,t){return new c("invalid-format","String does not match format '"+e+"': "+t)}function f(e){throw new c("internal-error","Internal error: "+e)}class _{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=s.NO_ERROR,this.sendPromise_=new Promise((e=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=s.ABORT,e()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=s.NETWORK_ERROR,e()})),this.xhr_.addEventListener("load",(()=>{e()}))}))}send(e,t,n,s){if(this.sent_)throw f("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==s)for(const e in s)s.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,s[e].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw f("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw f("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponseText(){if(!this.sent_)throw f("cannot .getResponseText() before sending");return this.xhr_.responseText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class g{createConnection(){return new _}}class m{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=m.makeFromUrl(e,t)}catch(t){return new m(e,"")}if(""===n.path)return n;throw new c("invalid-default-bucket","Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let n=null;const s="([A-Za-z0-9.\\-_]+)",r=new RegExp("^gs://"+s+"(/(.*))?$","i");function o(e){e.path_=decodeURIComponent(e.path)}const i=t.replace(/[.]/g,"\\."),u=[{regex:r,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${i}/v[A-Za-z0-9_]+/b/${s}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:o},{regex:new RegExp(`^https?://${t===a?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${s}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:o}];for(let t=0;t<u.length;t++){const s=u[t],r=s.regex.exec(e);if(r){const e=r[s.indices.bucket];let t=r[s.indices.path];t||(t=""),n=new m(e,t),s.postModify(n);break}}if(null==n)throw function(e){return new c("invalid-url","Invalid URL '"+e+"'.")}(e);return n}}class w{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function b(e){return"string"==typeof e||e instanceof String}function k(e){return y()&&e instanceof Blob}function y(){return"undefined"!=typeof Blob}function R(e,t,n,s){if(s<t)throw h(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw h(`Invalid value for '${e}'. Expected ${n} or less.`)}function v(e,t,n){let s=t;return null==n&&(s=`https://${t}`),`${n}://${s}/v0${e}`}function x(e){const t=encodeURIComponent;let n="?";for(const s in e)e.hasOwnProperty(s)&&(n=n+(t(s)+"=")+t(e[s])+"&");return n=n.slice(0,-1),n}class T{constructor(e,t,n,s,r,o,i,a,c,u,l){this.url_=e,this.method_=t,this.headers_=n,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=i,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=u,this.pool_=l,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise(((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()}))}start_(){const e=(e,t)=>{const n=this.resolve_,s=this.reject_,r=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(r,r.getResponseText());void 0!==e?n(e):n()}catch(e){s(e)}else if(null!==r){const e=l();e.serverResponse=r.getResponseText(),this.errorCallback_?s(this.errorCallback_(r,e)):s(e)}else t.canceled?s(this.appDelete_?d():new c("canceled","User canceled the upload/download.")):s(new c("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))};this.canceled_?e(0,new C(!1,null,!0)):this.backoffId_=function(e,t,n){let s=1,r=null,o=!1,i=0;function a(){return 2===i}let c=!1;function u(...e){c||(c=!0,t.apply(null,e))}function l(t){r=setTimeout((()=>{r=null,e(h,a())}),t)}function h(e,...t){if(c)return;if(e)return void u.call(null,e,...t);if(a()||o)return void u.call(null,e,...t);let n;s<64&&(s*=2),1===i?(i=2,n=0):n=1e3*(s+Math.random()),l(n)}let d=!1;function p(e){d||(d=!0,c||(null!==r?(e||(i=2),clearTimeout(r),l(0)):e||(i=1)))}return l(0),setTimeout((()=>{o=!0,p(!0)}),n),p}(((e,t)=>{if(t)return void e(!1,new C(!1,null,!0));const n=this.pool_.createConnection();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then((()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===s.NO_ERROR,o=n.getStatus();if(!t||this.isRetryStatusCode_(o)){const t=n.getErrorCode()===s.ABORT;return void e(!1,new C(!1,null,t))}const i=-1!==this.successCodes_.indexOf(o);e(!0,new C(i,n))}))}),e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}isRetryStatusCode_(e){const t=e>=500&&e<600,n=-1!==[408,429].indexOf(e),s=-1!==this.additionalRetryCodes_.indexOf(e);return t||n||s}}class C{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function O(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function S(...e){const t=O();if(void 0!==t){const n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(y())return new Blob(e);throw new c("unsupported-environment","This browser doesn't seem to support creating Blobs")}const P="raw",I="base64",U="base64url",A="data_url";class E{constructor(e,t){this.data=e,this.contentType=t||null}}function B(e,t){switch(e){case P:return new E(H(t));case I:case U:return new E(M(e,t));case A:return new E(function(e){const t=new z(e);return t.base64?M(I,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw p(A,"Malformed data URL.")}return H(t)}(t.rest)}(t),new z(t).contentType)}throw l()}function H(e){const t=[];for(let n=0;n<e.length;n++){let s=e.charCodeAt(n);s<=127?t.push(s):s<=2047?t.push(192|s>>6,128|63&s):55296==(64512&s)?n<e.length-1&&56320==(64512&e.charCodeAt(n+1))?(s=65536|(1023&s)<<10|1023&e.charCodeAt(++n),t.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|63&s)):t.push(239,191,189):56320==(64512&s)?t.push(239,191,189):t.push(224|s>>12,128|s>>6&63,128|63&s)}return new Uint8Array(t)}function M(e,t){switch(e){case I:{const n=-1!==t.indexOf("-"),s=-1!==t.indexOf("_");if(n||s)throw p(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?");break}case U:{const n=-1!==t.indexOf("+"),s=-1!==t.indexOf("/");if(n||s)throw p(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=atob(t)}catch(t){throw p(e,"Invalid character found")}const s=new Uint8Array(n.length);for(let e=0;e<n.length;e++)s[e]=n.charCodeAt(e);return s}class z{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw p(A,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;var s,r;null!=n&&(this.base64=(r=";base64",(s=n).length>=r.length&&s.substring(s.length-r.length)===r),this.contentType=this.base64?n.substring(0,n.length-";base64".length):n),this.rest=e.substring(e.indexOf(",")+1)}}class q{constructor(e,t){let n=0,s="";k(e)?(this.data_=e,n=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(k(this.data_)){const o=(n=this.data_,s=e,r=t,n.webkitSlice?n.webkitSlice(s,r):n.mozSlice?n.mozSlice(s,r):n.slice?n.slice(s,r):null);return null===o?null:new q(o)}var n,s,r;{const n=new Uint8Array(this.data_.buffer,e,t-e);return new q(n,!0)}}static getBlob(...e){if(y()){const t=e.map((e=>e instanceof q?e.data_:e));return new q(S.apply(null,t))}{const t=e.map((e=>b(e)?B(P,e).data:e.data_));let n=0;t.forEach((e=>{n+=e.byteLength}));const s=new Uint8Array(n);let r=0;return t.forEach((e=>{for(let t=0;t<e.length;t++)s[r++]=e[t]})),new q(s,!0)}}uploadData(){return this.data_}}function L(e){let t;try{t=JSON.parse(e)}catch(e){return null}return"object"!=typeof(n=t)||Array.isArray(n)?null:t;var n}function $(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}function F(e,t){return t}class N{constructor(e,t,n,s){this.server=e,this.local=t||e,this.writable=!!n,this.xform=s||F}}let j=null;function D(){if(j)return j;const e=[];e.push(new N("bucket")),e.push(new N("generation")),e.push(new N("metageneration")),e.push(new N("name","fullPath",!0));const t=new N("name");t.xform=function(e,t){return function(e){return!b(e)||e.length<2?e:$(e)}(t)},e.push(t);const n=new N("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new N("timeCreated")),e.push(new N("updated")),e.push(new N("md5Hash",null,!0)),e.push(new N("cacheControl",null,!0)),e.push(new N("contentDisposition",null,!0)),e.push(new N("contentEncoding",null,!0)),e.push(new N("contentLanguage",null,!0)),e.push(new N("contentType",null,!0)),e.push(new N("metadata","customMetadata",!0)),j=e,j}function W(e,t,n){const s=L(t);return null===s?null:function(e,t,n){const s={type:"file"},r=n.length;for(let e=0;e<r;e++){const r=n[e];s[r.local]=r.xform(s,t[r.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){const n=e.bucket,s=e.fullPath,r=new m(n,s);return t._makeStorageReference(r)}})}(s,e),s}(e,s,n)}class V{constructor(e,t,n,s){this.url=e,this.method=t,this.handler=n,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function K(e){if(!e)throw l()}function G(e,t){return function(n,s){const r=W(e,s,t);return K(null!==r),r}}function X(e){return function(t,n){let s;var r,o;return 401===t.getStatus()?s=t.getResponseText().includes("Firebase App Check token is invalid")?new c("unauthorized-app","This app does not have permission to access Firebase Storage on this project."):new c("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(o=e.bucket,s=new c("quota-exceeded","Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(r=e.path,s=new c("unauthorized","User does not have permission to access '"+r+"'.")):s=n,s.serverResponse=n.serverResponse,s}}function Z(e){const t=X(e);return function(n,s){let r=t(n,s);var o;return 404===n.getStatus()&&(o=e.path,r=new c("object-not-found","Object '"+o+"' does not exist.")),r.serverResponse=s.serverResponse,r}}function J(e,t,n,s,r){const o={};t.isRoot?o.prefix="":o.prefix=t.path+"/",n&&n.length>0&&(o.delimiter=n),s&&(o.pageToken=s),r&&(o.maxResults=r);const i=v(t.bucketOnlyServerUrl(),e.host,e._protocol),a=e.maxOperationRetryTime,c=new V(i,"GET",function(e,t){return function(n,s){const r=function(e,t,n){const s=L(n);return null===s?null:function(e,t,n){const s={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n.prefixes)for(const r of n.prefixes){const n=r.replace(/\/$/,""),o=e._makeStorageReference(new m(t,n));s.prefixes.push(o)}if(n.items)for(const r of n.items){const n=e._makeStorageReference(new m(t,r.name));s.items.push(n)}return s}(e,t,s)}(e,t,s);return K(null!==r),r}}(e,t.bucket),a);return c.urlParams=o,c.errorHandler=X(t),c}function Y(e,t,n,s,r){const o=t.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"},a=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();i["Content-Type"]="multipart/related; boundary="+a;const u=function(e,t,n){const s=Object.assign({},n);return s.fullPath=e.path,s.size=t.size(),s.contentType||(s.contentType=function(e,t){return t&&t.type()||"application/octet-stream"}(0,t)),s}(t,s,r),l="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+function(e,t){const n={},s=t.length;for(let r=0;r<s;r++){const s=t[r];s.writable&&(n[s.server]=e[s.local])}return JSON.stringify(n)}(u,n)+"\r\n--"+a+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",h="\r\n--"+a+"--",d=q.getBlob(l,s,h);if(null===d)throw new c("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.");const p={name:u.fullPath},f=v(o,e.host,e._protocol),_=e.maxUploadRetryTime,g=new V(f,"POST",G(e,n),_);return g.urlParams=p,g.headers=i,g.body=d.uploadData(),g.errorHandler=X(t),g}class Q{constructor(e,t){this._service=e,this._location=t instanceof m?t:m.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Q(e,t)}get root(){const e=new m(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return $(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new m(this._location.bucket,e);return new Q(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new c("invalid-root-operation","The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function ee(e){const t={prefixes:[],items:[]};return te(e,t).then((()=>t))}async function te(e,t,n){const s={pageToken:n},r=await async function(e,t){null!=t&&"number"==typeof t.maxResults&&R("options.maxResults",1,1e3,t.maxResults);const n=t||{},s=J(e.storage,e._location,"/",n.pageToken,n.maxResults);return(await e.storage.makeRequestWithTokens(s)).getPromise()}(e,s);t.prefixes.push(...r.prefixes),t.items.push(...r.items),null!=r.nextPageToken&&await te(e,t,r.nextPageToken)}async function ne(e){e._throwIfRoot("getDownloadURL");const t=function(e,t,n){const s=v(t.fullServerUrl(),e.host,e._protocol),r=e.maxOperationRetryTime,o=new V(s,"GET",function(e,t){return function(n,s){const r=W(e,s,t);return K(null!==r),function(e,t,n,s){const r=L(t);if(null===r)return null;if(!b(r.downloadTokens))return null;const o=r.downloadTokens;if(0===o.length)return null;const i=encodeURIComponent;return o.split(",").map((t=>{const r=e.bucket,o=e.fullPath;return v("/b/"+i(r)+"/o/"+i(o),n,s)+x({alt:"media",token:t})}))[0]}(r,s,e.host,e._protocol)}}(e,n),r);return o.errorHandler=Z(t),o}(e.storage,e._location,D());return(await e.storage.makeRequestWithTokens(t)).getPromise().then((e=>{if(null===e)throw new c("no-download-url","The given file does not have any download URLs.");return e}))}function se(e,t){if(e instanceof oe){const n=e;if(null==n._bucket)throw new c("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");const s=new Q(n,n._bucket);return null!=t?se(s,t):s}return void 0!==t?function(e,t){const n=function(e,t){const n=t.split("/").filter((e=>e.length>0)).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),s=new m(e._location.bucket,n);return new Q(e.storage,s)}(e,t):e}function re(e,t){const n=null==t?void 0:t.storageBucket;return null==n?null:m.makeFromBucketSpec(n,e)}class oe{constructor(e,t,n,s,r,o){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._pool=s,this._url=r,this._firebaseVersion=o,this._bucket=null,this._host=a,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?m.makeFromBucketSpec(r,this._host):re(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=m.makeFromBucketSpec(this._url,e):this._bucket=re(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){R("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){R("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach((e=>e.cancel())),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Q(this,e)}_makeRequest(e,t,n){if(this._deleted)return new w(d());{const s=function(e,t,n,s,r,o){const i=x(e.urlParams),a=e.url+i,c=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(c,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(c,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(null!=t?t:"AppManager")}(c,o),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(c,s),new T(a,e.method,c,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r)}(e,this._appId,t,n,this._pool,this._firebaseVersion);return this._requests.add(s),s.getPromise().then((()=>this._requests.delete(s)),(()=>this._requests.delete(s))),s}}async makeRequestWithTokens(e){const[t,n]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n)}}const ie="@firebase/storage",ae="0.8.4",ce="storage";function ue(e,t,n,s){return function(e,t,n="raw",s){e._throwIfRoot("uploadString");const r=B(n,t),o=Object.assign({},s);return null==o.contentType&&null!=r.contentType&&(o.contentType=r.contentType),function(e,t,n){e._throwIfRoot("uploadBytes");const s=Y(e.storage,e._location,D(),new q(t,!0),n);return e.storage.makeRequestWithTokens(s).then((e=>e.getPromise())).then((t=>({metadata:t,ref:e})))}(e,r.data,o)}(e=(0,o.m9)(e),t,n,s)}function le(e){return async function(e){e._throwIfRoot("getMetadata");const t=function(e,t,n){const s=v(t.fullServerUrl(),e.host,e._protocol),r=e.maxOperationRetryTime,o=new V(s,"GET",G(e,n),r);return o.errorHandler=Z(t),o}(e.storage,e._location,D());return(await e.storage.makeRequestWithTokens(t)).getPromise()}(e=(0,o.m9)(e))}function he(e,t){return function(e,t){if(t&&/^[A-Za-z]+:\/\//.test(t)){if(e instanceof oe)return new Q(e,t);throw h("To use ref(service, url), the first argument must be a Storage instance.")}return se(e,t)}(e=(0,o.m9)(e),t)}(0,r._registerComponent)(new i.wA(ce,(function(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return new oe(n,s,o,new g,t,r.SDK_VERSION)}),"PUBLIC").setMultipleInstances(!0)),(0,r.registerVersion)(ie,ae,""),(0,r.registerVersion)(ie,ae,"esm2017");var de=n(774);let pe;const fe=e=>{let t=he(pe);Shiny.addCustomMessageHandler("fireblaze-storage-ref",(function(n){pe||(pe=function(e=(0,r.getApp)(),t){return e=(0,o.m9)(e),(0,r._getProvider)(e,ce).getImmediate({identifier:t})}(e)),t=n.path?he(pe,n.path):he(pe)})),Shiny.addCustomMessageHandler("fireblaze-upload-file",(function(e){ue(t,e.encoded,"data_url").then((t=>{if(!e.response)return;let n={response:t.metadata,success:!0};(0,de.H9)(e.response,n,e.ns)})).catch((t=>{e.response&&(0,de.H9)(e.response,{success:!1,response:t},e.ns)}))})),Shiny.addCustomMessageHandler("fireblaze-download-file",(function(e){(function(e){return ne(e=(0,o.m9)(e))})(t).then((t=>{if(!e.response)return;let n={response:t,success:!0};(0,de.H9)(e.response,n,e.ns)})).catch((t=>{e.response&&(0,de.H9)(e.response,{success:!1,response:t},e.ns)}))})),Shiny.addCustomMessageHandler("fireblaze-delete-file",(function(e){(function(e){return async function(e){e._throwIfRoot("deleteObject");const t=function(e,t){const n=v(t.fullServerUrl(),e.host,e._protocol),s=e.maxOperationRetryTime,r=new V(n,"DELETE",(function(e,t){}),s);return r.successCodes=[200,204],r.errorHandler=Z(t),r}(e.storage,e._location);return(await e.storage.makeRequestWithTokens(t)).getPromise()}(e=(0,o.m9)(e))})(t).then((()=>{e.response&&(0,de.H9)(e.response,{success:!0,response:null},e.ns)})).catch((t=>{e.response&&(0,de.H9)(e.response,{success:!1,response:t},e.ns)}))})),Shiny.addCustomMessageHandler("fireblaze-get-metadata",(function(e){le(t).then((t=>{e.response&&(0,de.H9)(e.response,{success:!0,response:t},e.ns)})).catch((t=>{e.response&&(0,de.H9)(e.response,{success:!1,response:t},e.ns)}))})),Shiny.addCustomMessageHandler("fireblaze-list-all-files",(function(e){(function(e){return ee(e=(0,o.m9)(e))})(t).then((t=>{(0,de.H9)(e.response,{success:!0,response:t.items},e.ns)})).catch((t=>{e.response&&(0,de.H9)(e.response,{success:!1,response:t},e.ns)}))}))}}},e=>{e.O(0,[647,818],(()=>(186,e(e.s=186)))),e.O()}]);