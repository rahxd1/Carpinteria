__twttrlr(function(using, provide, loadrunner, define) {provide("$xd/json2.js", function(exports) {window.JSON||(window.JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(b&&typeof b!="function"&&(typeof b!="object"||typeof b.length!="number"))throw new Error("JSON.stringify");return str("",{"":a})}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}();exports();loadrunner.Script.loaded.push("$xd/json2.js")});
provide("util/util",function(a){function e(a,b){for(var c=0,d;d=a[c];c++)if(b==d)return c;return-1}function d(a){for(var b in a)a.hasOwnProperty(b)&&!a[b]&&a[b]!==!1&&a[b]!==0&&delete a[b]}function c(a){return b([],a)}function b(a){for(var b=1,c;c=arguments[b];b++)for(var d in c)a[d]=c[d];return a}a({aug:b,array:c,compact:d,indexOf:e})});
provide("util/events",function(a){using("util/util",function(b){function d(){this.completed=!1,this.callbacks=[]}var c={bind:function(a,b){this._handlers=this._handlers||{},this._handlers[a]=this._handlers[a]||[];return this._handlers[a].push(b)},unbind:function(a,c){if(!!this._handlers[a])if(c){var d=b.indexOf(this._handlers[a],c);d>=0&&this._handlers[a].splice(d,1)}else this._handlers[a]=[]},trigger:function(a,b){var c=this._handlers&&this._handlers[a];b.type=a;if(c)for(var d=0,e;e=c[d];d++)e.call(this,b)}};d.prototype.addCallback=function(a){this.completed?a.apply(this,this.results):this.callbacks.push(a)},d.prototype.complete=function(){this.results=makeArray(arguments),this.completed=!0;for(var a=0,b;b=this.callbacks[a];a++)b.apply(this,this.results)},a({Emitter:c,Promise:d})})});
provide("xd/jsonrpc",function(a){using("util/util","util/events",function(b,c){function f(){a(function(a){return new d(a)})}function e(){this.id=e.id++}function d(a){this.con=a}b.aug(d.prototype,{expose:function(a){this.con.bind("message",this._handleRequest(a))},call:function(a){var b,c=this;b||(b={},this.con.bind("message",function(a){var c;try{a=JSON.parse(a)}catch(d){return}typeof a.id=="number"&&(c=b[a.id])&&(a.error?c.trigger("error",a):c.trigger("success",a),delete b[a.id])}));var d=new e;b[d.id]=d;return d.send(this.con,a,Array.prototype.slice.call(arguments,1))},_handleRequest:function(a){var b=this;return function(d){var e,f;try{d=JSON.parse(d)}catch(g){return}typeof d.id=="number"&&typeof a[d.method]=="function"&&(f=b._responseCallbacks(d.id),e=a[d.method].apply(a,d.params.concat(f)),typeof e!="undefined"&&f[0](e))}},_responseCallbacks:function(a){var b=this.con;return[function(d){b.send(JSON.stringify({id:a,result:d}))},function c(c){b.send(JSON.stringify({id:a,error:c}))}]}}),e.id=0,b.aug(e.prototype,c.Emitter,{send:function(a,b,c){a.send(JSON.stringify({id:this.id,method:b,params:c}));return this},success:function(a){this.bind("success",a);return this},error:function(a){this.bind("error",a);return this}}),typeof JSON=="undefined"?using("$xd/json2.js",function(){f()}):f()})})});