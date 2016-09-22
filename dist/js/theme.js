'use strict';window.whatInput=function(){'use strict';/*
    ---------------
    variables
    ---------------
  */// array of actively pressed keys
var activeKeys=[];// cache document.body
var body;// boolean: true if touch buffer timer is running
var buffer=false;// the last used input type
var currentInput=null;// `input` types that don't accept text
var nonTypingInputs=['button','checkbox','file','image','radio','reset','submit'];// detect version of mouse wheel event to use
// via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
var mouseWheel=detectWheel();// list of modifier keys commonly used with the mouse and
// can be safely ignored to prevent false keyboard detection
var ignoreMap=[16,// shift
17,// control
18,// alt
91,// Windows key / left Apple cmd
93// Windows menu / right Apple cmd
];// mapping of events to input types
var inputMap={'keydown':'keyboard','keyup':'keyboard','mousedown':'mouse','mousemove':'mouse','MSPointerDown':'pointer','MSPointerMove':'pointer','pointerdown':'pointer','pointermove':'pointer','touchstart':'touch'};// add correct mouse wheel event mapping to `inputMap`
inputMap[detectWheel()]='mouse';// array of all used input types
var inputTypes=[];// mapping of key codes to a common name
var keyMap={9:'tab',13:'enter',16:'shift',27:'esc',32:'space',37:'left',38:'up',39:'right',40:'down'};// map of IE 10 pointer events
var pointerMap={2:'touch',3:'touch',// treat pen like touch
4:'mouse'};// touch buffer timer
var timer;/*
    ---------------
    functions
    ---------------
  */// allows events that are also triggered to be filtered out for `touchstart`
function eventBuffer(){clearTimer();setInput(event);buffer=true;timer=window.setTimeout(function(){buffer=false;},650);}function bufferedEvent(event){if(!buffer)setInput(event);}function unBufferedEvent(event){clearTimer();setInput(event);}function clearTimer(){window.clearTimeout(timer);}function setInput(event){var eventKey=key(event);var value=inputMap[event.type];if(value==='pointer')value=pointerType(event);// don't do anything if the value matches the input type already set
if(currentInput!==value){var eventTarget=target(event);var eventTargetNode=eventTarget.nodeName.toLowerCase();var eventTargetType=eventTargetNode==='input'?eventTarget.getAttribute('type'):null;if(// only if the user flag to allow typing in form fields isn't set
!body.hasAttribute('data-whatinput-formtyping')&&// only if currentInput has a value
currentInput&&// only if the input is `keyboard`
value==='keyboard'&&// not if the key is `TAB`
keyMap[eventKey]!=='tab'&&(// only if the target is a form input that accepts text
eventTargetNode==='textarea'||eventTargetNode==='select'||eventTargetNode==='input'&&nonTypingInputs.indexOf(eventTargetType)<0)||// ignore modifier keys
ignoreMap.indexOf(eventKey)>-1){// ignore keyboard typing
}else{switchInput(value);}}if(value==='keyboard')logKeys(eventKey);}function switchInput(string){currentInput=string;body.setAttribute('data-whatinput',currentInput);if(inputTypes.indexOf(currentInput)===-1)inputTypes.push(currentInput);}function key(event){return event.keyCode?event.keyCode:event.which;}function target(event){return event.target||event.srcElement;}function pointerType(event){if(typeof event.pointerType==='number'){return pointerMap[event.pointerType];}else{return event.pointerType==='pen'?'touch':event.pointerType;// treat pen like touch
}}// keyboard logging
function logKeys(eventKey){if(activeKeys.indexOf(keyMap[eventKey])===-1&&keyMap[eventKey])activeKeys.push(keyMap[eventKey]);}function unLogKeys(event){var eventKey=key(event);var arrayPos=activeKeys.indexOf(keyMap[eventKey]);if(arrayPos!==-1)activeKeys.splice(arrayPos,1);}function bindEvents(){body=document.body;// pointer events (mouse, pen, touch)
if(window.PointerEvent){body.addEventListener('pointerdown',bufferedEvent);body.addEventListener('pointermove',bufferedEvent);}else if(window.MSPointerEvent){body.addEventListener('MSPointerDown',bufferedEvent);body.addEventListener('MSPointerMove',bufferedEvent);}else{// mouse events
body.addEventListener('mousedown',bufferedEvent);body.addEventListener('mousemove',bufferedEvent);// touch events
if('ontouchstart'in window){body.addEventListener('touchstart',eventBuffer);}}// mouse wheel
body.addEventListener(mouseWheel,bufferedEvent);// keyboard events
body.addEventListener('keydown',unBufferedEvent);body.addEventListener('keyup',unBufferedEvent);document.addEventListener('keyup',unLogKeys);}/*
    ---------------
    utilities
    ---------------
  */// detect version of mouse wheel event to use
// via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
function detectWheel(){return mouseWheel='onwheel'in document.createElement('div')?'wheel':// Modern browsers support "wheel"
document.onmousewheel!==undefined?'mousewheel':// Webkit and IE support at least "mousewheel"
'DOMMouseScroll';// let's assume that remaining browsers are older Firefox
}/*
    ---------------
    init

    don't start script unless browser cuts the mustard,
    also passes if polyfills are used
    ---------------
  */if('addEventListener'in window&&Array.prototype.indexOf){// if the dom is already ready already (script was placed at bottom of <body>)
if(document.body){bindEvents();// otherwise wait for the dom to load (script was placed in the <head>)
}else{document.addEventListener('DOMContentLoaded',bindEvents);}}/*
    ---------------
    api
    ---------------
  */return{// returns string: the current input type
ask:function ask(){return currentInput;},// returns array: currently pressed keys
keys:function keys(){return activeKeys;},// returns array: all the detected input types
types:function types(){return inputTypes;},// accepts string: manually set the input type
set:switchInput};}();
'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};!function($){"use strict";var FOUNDATION_VERSION='6.2.2';// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation={version:FOUNDATION_VERSION,/**
   * Stores initialized plugins.
   */_plugins:{},/**
   * Stores generated unique ids for plugin instances
   */_uuids:[],/**
   * Returns a boolean for RTL support
   */rtl:function rtl(){return $('html').attr('dir')==='rtl';},/**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */plugin:function plugin(_plugin,name){// Object key to use when adding to global Foundation object
// Examples: Foundation.Reveal, Foundation.OffCanvas
var className=name||functionName(_plugin);// Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
// Examples: data-reveal, data-off-canvas
var attrName=hyphenate(className);// Add to the Foundation object and the plugins list (for reflowing)
this._plugins[attrName]=this[className]=_plugin;},/**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */registerPlugin:function registerPlugin(plugin,name){var pluginName=name?hyphenate(name):functionName(plugin.constructor).toLowerCase();plugin.uuid=this.GetYoDigits(6,pluginName);if(!plugin.$element.attr('data-'+pluginName)){plugin.$element.attr('data-'+pluginName,plugin.uuid);}if(!plugin.$element.data('zfPlugin')){plugin.$element.data('zfPlugin',plugin);}/**
           * Fires when the plugin has initialized.
           * @event Plugin#init
           */plugin.$element.trigger('init.zf.'+pluginName);this._uuids.push(plugin.uuid);return;},/**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */unregisterPlugin:function unregisterPlugin(plugin){var pluginName=hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));this._uuids.splice(this._uuids.indexOf(plugin.uuid),1);plugin.$element.removeAttr('data-'+pluginName).removeData('zfPlugin')/**
           * Fires when the plugin has been destroyed.
           * @event Plugin#destroyed
           */.trigger('destroyed.zf.'+pluginName);for(var prop in plugin){plugin[prop]=null;//clean up script to prep for garbage collection.
}return;},/**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */reInit:function reInit(plugins){var isJQ=plugins instanceof $;try{if(isJQ){plugins.each(function(){$(this).data('zfPlugin')._init();});}else{var type=typeof plugins==='undefined'?'undefined':_typeof(plugins),_this=this,fns={'object':function object(plgs){plgs.forEach(function(p){p=hyphenate(p);$('[data-'+p+']').foundation('_init');});},'string':function string(){plugins=hyphenate(plugins);$('[data-'+plugins+']').foundation('_init');},'undefined':function undefined(){this['object'](Object.keys(_this._plugins));}};fns[type](plugins);}}catch(err){console.error(err);}finally{return plugins;}},/**
   * returns a random base-36 uid with namespacing
   * @function
   * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
   * @param {String} namespace - name of plugin to be incorporated in uid, optional.
   * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
   * @returns {String} - unique id
   */GetYoDigits:function GetYoDigits(length,namespace){length=length||6;return Math.round(Math.pow(36,length+1)-Math.random()*Math.pow(36,length)).toString(36).slice(1)+(namespace?'-'+namespace:'');},/**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */reflow:function reflow(elem,plugins){// If plugins is undefined, just grab everything
if(typeof plugins==='undefined'){plugins=Object.keys(this._plugins);}// If plugins is a string, convert it to an array with one item
else if(typeof plugins==='string'){plugins=[plugins];}var _this=this;// Iterate through each plugin
$.each(plugins,function(i,name){// Get the current plugin
var plugin=_this._plugins[name];// Localize the search to all elements inside elem, as well as elem itself, unless elem === document
var $elem=$(elem).find('[data-'+name+']').addBack('[data-'+name+']');// For each plugin found, initialize it
$elem.each(function(){var $el=$(this),opts={};// Don't double-dip on plugins
if($el.data('zfPlugin')){console.warn("Tried to initialize "+name+" on an element that already has a Foundation plugin.");return;}if($el.attr('data-options')){var thing=$el.attr('data-options').split(';').forEach(function(e,i){var opt=e.split(':').map(function(el){return el.trim();});if(opt[0])opts[opt[0]]=parseValue(opt[1]);});}try{$el.data('zfPlugin',new plugin($(this),opts));}catch(er){console.error(er);}finally{return;}});});},getFnName:functionName,transitionend:function transitionend($elem){var transitions={'transition':'transitionend','WebkitTransition':'webkitTransitionEnd','MozTransition':'transitionend','OTransition':'otransitionend'};var elem=document.createElement('div'),end;for(var t in transitions){if(typeof elem.style[t]!=='undefined'){end=transitions[t];}}if(end){return end;}else{end=setTimeout(function(){$elem.triggerHandler('transitionend',[$elem]);},1);return'transitionend';}}};Foundation.util={/**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */throttle:function throttle(func,delay){var timer=null;return function(){var context=this,args=arguments;if(timer===null){timer=setTimeout(function(){func.apply(context,args);timer=null;},delay);}};}};// TODO: consider not making this a jQuery function
// TODO: need way to reflow vs. re-initialize
/**
 * The Foundation jQuery method.
 * @param {String|Array} method - An action to perform on the current jQuery object.
 */var foundation=function foundation(method){var type=typeof method==='undefined'?'undefined':_typeof(method),$meta=$('meta.foundation-mq'),$noJS=$('.no-js');if(!$meta.length){$('<meta class="foundation-mq">').appendTo(document.head);}if($noJS.length){$noJS.removeClass('no-js');}if(type==='undefined'){//needs to initialize the Foundation object, or an individual plugin.
Foundation.MediaQuery._init();Foundation.reflow(this);}else if(type==='string'){//an individual method to invoke on a plugin or group of plugins
var args=Array.prototype.slice.call(arguments,1);//collect all the arguments, if necessary
var plugClass=this.data('zfPlugin');//determine the class of plugin
if(plugClass!==undefined&&plugClass[method]!==undefined){//make sure both the class and method exist
if(this.length===1){//if there's only one, call it directly.
plugClass[method].apply(plugClass,args);}else{this.each(function(i,el){//otherwise loop through the jQuery collection and invoke the method on each
plugClass[method].apply($(el).data('zfPlugin'),args);});}}else{//error for no class or no method
throw new ReferenceError("We're sorry, '"+method+"' is not an available method for "+(plugClass?functionName(plugClass):'this element')+'.');}}else{//error for invalid argument type
throw new TypeError('We\'re sorry, '+type+' is not a valid parameter. You must use a string representing the method you wish to invoke.');}return this;};window.Foundation=Foundation;$.fn.foundation=foundation;// Polyfill for requestAnimationFrame
(function(){if(!Date.now||!window.Date.now)window.Date.now=Date.now=function(){return new Date().getTime();};var vendors=['webkit','moz'];for(var i=0;i<vendors.length&&!window.requestAnimationFrame;++i){var vp=vendors[i];window.requestAnimationFrame=window[vp+'RequestAnimationFrame'];window.cancelAnimationFrame=window[vp+'CancelAnimationFrame']||window[vp+'CancelRequestAnimationFrame'];}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var lastTime=0;window.requestAnimationFrame=function(callback){var now=Date.now();var nextTime=Math.max(lastTime+16,now);return setTimeout(function(){callback(lastTime=nextTime);},nextTime-now);};window.cancelAnimationFrame=clearTimeout;}/**
   * Polyfill for performance.now, required by rAF
   */if(!window.performance||!window.performance.now){window.performance={start:Date.now(),now:function now(){return Date.now()-this.start;}};}})();if(!Function.prototype.bind){Function.prototype.bind=function(oThis){if(typeof this!=='function'){// closest thing possible to the ECMAScript 5
// internal IsCallable function
throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');}var aArgs=Array.prototype.slice.call(arguments,1),fToBind=this,fNOP=function fNOP(){},fBound=function fBound(){return fToBind.apply(this instanceof fNOP?this:oThis,aArgs.concat(Array.prototype.slice.call(arguments)));};if(this.prototype){// native functions don't have a prototype
fNOP.prototype=this.prototype;}fBound.prototype=new fNOP();return fBound;};}// Polyfill to get the name of a function in IE9
function functionName(fn){if(Function.prototype.name===undefined){var funcNameRegex=/function\s([^(]{1,})\(/;var results=funcNameRegex.exec(fn.toString());return results&&results.length>1?results[1].trim():"";}else if(fn.prototype===undefined){return fn.constructor.name;}else{return fn.prototype.constructor.name;}}function parseValue(str){if(/true/.test(str))return true;else if(/false/.test(str))return false;else if(!isNaN(str*1))return parseFloat(str);return str;}// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str){return str.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase();}}(jQuery);
'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};!function($){// Default set of media queries
var defaultQueries={'default':'only screen',landscape:'only screen and (orientation: landscape)',portrait:'only screen and (orientation: portrait)',retina:'only screen and (-webkit-min-device-pixel-ratio: 2),'+'only screen and (min--moz-device-pixel-ratio: 2),'+'only screen and (-o-min-device-pixel-ratio: 2/1),'+'only screen and (min-device-pixel-ratio: 2),'+'only screen and (min-resolution: 192dpi),'+'only screen and (min-resolution: 2dppx)'};var MediaQuery={queries:[],current:'',/**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */_init:function _init(){var self=this;var extractedStyles=$('.foundation-mq').css('font-family');var namedQueries;namedQueries=parseStyleToObject(extractedStyles);for(var key in namedQueries){if(namedQueries.hasOwnProperty(key)){self.queries.push({name:key,value:'only screen and (min-width: '+namedQueries[key]+')'});}}this.current=this._getCurrentSize();this._watcher();},/**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */atLeast:function atLeast(size){var query=this.get(size);if(query){return window.matchMedia(query).matches;}return false;},/**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */get:function get(size){for(var i in this.queries){if(this.queries.hasOwnProperty(i)){var query=this.queries[i];if(size===query.name)return query.value;}}return null;},/**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */_getCurrentSize:function _getCurrentSize(){var matched;for(var i=0;i<this.queries.length;i++){var query=this.queries[i];if(window.matchMedia(query.value).matches){matched=query;}}if((typeof matched==='undefined'?'undefined':_typeof(matched))==='object'){return matched.name;}else{return matched;}},/**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */_watcher:function _watcher(){var _this=this;$(window).on('resize.zf.mediaquery',function(){var newSize=_this._getCurrentSize(),currentSize=_this.current;if(newSize!==currentSize){// Change the current media query
_this.current=newSize;// Broadcast the media query change on the window
$(window).trigger('changed.zf.mediaquery',[newSize,currentSize]);}});}};Foundation.MediaQuery=MediaQuery;// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
window.matchMedia||(window.matchMedia=function(){'use strict';// For browsers that support matchMedium api such as IE 9 and webkit
var styleMedia=window.styleMedia||window.media;// For those that don't support matchMedium
if(!styleMedia){var style=document.createElement('style'),script=document.getElementsByTagName('script')[0],info=null;style.type='text/css';style.id='matchmediajs-test';script.parentNode.insertBefore(style,script);// 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
info='getComputedStyle'in window&&window.getComputedStyle(style,null)||style.currentStyle;styleMedia={matchMedium:function matchMedium(media){var text='@media '+media+'{ #matchmediajs-test { width: 1px; } }';// 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
if(style.styleSheet){style.styleSheet.cssText=text;}else{style.textContent=text;}// Test if media query is true or false
return info.width==='1px';}};}return function(media){return{matches:styleMedia.matchMedium(media||'all'),media:media||'all'};};}());// Thank you: https://github.com/sindresorhus/query-string
function parseStyleToObject(str){var styleObject={};if(typeof str!=='string'){return styleObject;}str=str.trim().slice(1,-1);// browsers re-quote string style values
if(!str){return styleObject;}styleObject=str.split('&').reduce(function(ret,param){var parts=param.replace(/\+/g,' ').split('=');var key=parts[0];var val=parts[1];key=decodeURIComponent(key);// missing `=` should be `null`:
// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
val=val===undefined?null:decodeURIComponent(val);if(!ret.hasOwnProperty(key)){ret[key]=val;}else if(Array.isArray(ret[key])){ret[key].push(val);}else{ret[key]=[ret[key],val];}return ret;},{});return styleObject;}Foundation.MediaQuery=MediaQuery;}(jQuery);
'use strict';!function($){/**
 * Motion module.
 * @module foundation.motion
 */var initClasses=['mui-enter','mui-leave'];var activeClasses=['mui-enter-active','mui-leave-active'];var Motion={animateIn:function animateIn(element,animation,cb){animate(true,element,animation,cb);},animateOut:function animateOut(element,animation,cb){animate(false,element,animation,cb);}};function Move(duration,elem,fn){var anim,prog,start=null;// console.log('called');
function move(ts){if(!start)start=window.performance.now();// console.log(start, ts);
prog=ts-start;fn.apply(elem);if(prog<duration){anim=window.requestAnimationFrame(move,elem);}else{window.cancelAnimationFrame(anim);elem.trigger('finished.zf.animate',[elem]).triggerHandler('finished.zf.animate',[elem]);}}anim=window.requestAnimationFrame(move);}/**
 * Animates an element in or out using a CSS transition class.
 * @function
 * @private
 * @param {Boolean} isIn - Defines if the animation is in or out.
 * @param {Object} element - jQuery or HTML object to animate.
 * @param {String} animation - CSS class to use.
 * @param {Function} cb - Callback to run when animation is finished.
 */function animate(isIn,element,animation,cb){element=$(element).eq(0);if(!element.length)return;var initClass=isIn?initClasses[0]:initClasses[1];var activeClass=isIn?activeClasses[0]:activeClasses[1];// Set up the animation
reset();element.addClass(animation).css('transition','none');requestAnimationFrame(function(){element.addClass(initClass);if(isIn)element.show();});// Start the animation
requestAnimationFrame(function(){element[0].offsetWidth;element.css('transition','').addClass(activeClass);});// Clean up the animation when it finishes
element.one(Foundation.transitionend(element),finish);// Hides the element (for out animations), resets the element, and runs a callback
function finish(){if(!isIn)element.hide();reset();if(cb)cb.apply(element);}// Resets transitions and removes motion-specific classes
function reset(){element[0].style.transitionDuration=0;element.removeClass(initClass+' '+activeClass+' '+animation);}}Foundation.Move=Move;Foundation.Motion=Motion;}(jQuery);
'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};!function($){var MutationObserver=function(){var prefixes=['WebKit','Moz','O','Ms',''];for(var i=0;i<prefixes.length;i++){if(prefixes[i]+'MutationObserver'in window){return window[prefixes[i]+'MutationObserver'];}}return false;}();var triggers=function triggers(el,type){el.data(type).split(' ').forEach(function(id){$('#'+id)[type==='close'?'trigger':'triggerHandler'](type+'.zf.trigger',[el]);});};// Elements with [data-open] will reveal a plugin that supports it when clicked.
$(document).on('click.zf.trigger','[data-open]',function(){triggers($(this),'open');});// Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
$(document).on('click.zf.trigger','[data-close]',function(){var id=$(this).data('close');if(id){triggers($(this),'close');}else{$(this).trigger('close.zf.trigger');}});// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
$(document).on('click.zf.trigger','[data-toggle]',function(){triggers($(this),'toggle');});// Elements with [data-closable] will respond to close.zf.trigger events.
$(document).on('close.zf.trigger','[data-closable]',function(e){e.stopPropagation();var animation=$(this).data('closable');if(animation!==''){Foundation.Motion.animateOut($(this),animation,function(){$(this).trigger('closed.zf');});}else{$(this).fadeOut().trigger('closed.zf');}});$(document).on('focus.zf.trigger blur.zf.trigger','[data-toggle-focus]',function(){var id=$(this).data('toggle-focus');$('#'+id).triggerHandler('toggle.zf.trigger',[$(this)]);});/**
* Fires once after all other scripts have loaded
* @function
* @private
*/$(window).load(function(){checkListeners();});function checkListeners(){eventsListener();resizeListener();scrollListener();closemeListener();}//******** only fires this function once on load, if there's something to watch ********
function closemeListener(pluginName){var yetiBoxes=$('[data-yeti-box]'),plugNames=['dropdown','tooltip','reveal'];if(pluginName){if(typeof pluginName==='string'){plugNames.push(pluginName);}else if((typeof pluginName==='undefined'?'undefined':_typeof(pluginName))==='object'&&typeof pluginName[0]==='string'){plugNames.concat(pluginName);}else{console.error('Plugin names must be strings');}}if(yetiBoxes.length){var listeners=plugNames.map(function(name){return'closeme.zf.'+name;}).join(' ');$(window).off(listeners).on(listeners,function(e,pluginId){var plugin=e.namespace.split('.')[0];var plugins=$('[data-'+plugin+']').not('[data-yeti-box="'+pluginId+'"]');plugins.each(function(){var _this=$(this);_this.triggerHandler('close.zf.trigger',[_this]);});});}}function resizeListener(debounce){var timer=void 0,$nodes=$('[data-resize]');if($nodes.length){$(window).off('resize.zf.trigger').on('resize.zf.trigger',function(e){if(timer){clearTimeout(timer);}timer=setTimeout(function(){if(!MutationObserver){//fallback for IE 9
$nodes.each(function(){$(this).triggerHandler('resizeme.zf.trigger');});}//trigger all listening elements and signal a resize event
$nodes.attr('data-events',"resize");},debounce||10);//default time to emit resize event
});}}function scrollListener(debounce){var timer=void 0,$nodes=$('[data-scroll]');if($nodes.length){$(window).off('scroll.zf.trigger').on('scroll.zf.trigger',function(e){if(timer){clearTimeout(timer);}timer=setTimeout(function(){if(!MutationObserver){//fallback for IE 9
$nodes.each(function(){$(this).triggerHandler('scrollme.zf.trigger');});}//trigger all listening elements and signal a scroll event
$nodes.attr('data-events',"scroll");},debounce||10);//default time to emit scroll event
});}}function eventsListener(){if(!MutationObserver){return false;}var nodes=document.querySelectorAll('[data-resize], [data-scroll], [data-mutate]');//element callback
var listeningElementsMutation=function listeningElementsMutation(mutationRecordsList){var $target=$(mutationRecordsList[0].target);//trigger the event handler for the element depending on type
switch($target.attr("data-events")){case"resize":$target.triggerHandler('resizeme.zf.trigger',[$target]);break;case"scroll":$target.triggerHandler('scrollme.zf.trigger',[$target,window.pageYOffset]);break;// case "mutate" :
// console.log('mutate', $target);
// $target.triggerHandler('mutate.zf.trigger');
//
// //make sure we don't get stuck in an infinite loop from sloppy codeing
// if ($target.index('[data-mutate]') == $("[data-mutate]").length-1) {
//   domMutationObserver();
// }
// break;
default:return false;//nothing
}};if(nodes.length){//for each element that needs to listen for resizing, scrolling, (or coming soon mutation) add a single observer
for(var i=0;i<=nodes.length-1;i++){var elementObserver=new MutationObserver(listeningElementsMutation);elementObserver.observe(nodes[i],{attributes:true,childList:false,characterData:false,subtree:false,attributeFilter:["data-events"]});}}}// ------------------------------------
// [PH]
// Foundation.CheckWatchers = checkWatchers;
Foundation.IHearYou=checkListeners;// Foundation.ISeeYou = scrollListener;
// Foundation.IFeelYou = closemeListener;
}(jQuery);// function domMutationObserver(debounce) {
//   // !!! This is coming soon and needs more work; not active  !!! //
//   var timer,
//   nodes = document.querySelectorAll('[data-mutate]');
//   //
//   if (nodes.length) {
//     // var MutationObserver = (function () {
//     //   var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
//     //   for (var i=0; i < prefixes.length; i++) {
//     //     if (prefixes[i] + 'MutationObserver' in window) {
//     //       return window[prefixes[i] + 'MutationObserver'];
//     //     }
//     //   }
//     //   return false;
//     // }());
//
//
//     //for the body, we need to listen for all changes effecting the style and class attributes
//     var bodyObserver = new MutationObserver(bodyMutation);
//     bodyObserver.observe(document.body, { attributes: true, childList: true, characterData: false, subtree:true, attributeFilter:["style", "class"]});
//
//
//     //body callback
//     function bodyMutation(mutate) {
//       //trigger all listening elements and signal a mutation event
//       if (timer) { clearTimeout(timer); }
//
//       timer = setTimeout(function() {
//         bodyObserver.disconnect();
//         $('[data-mutate]').attr('data-events',"mutate");
//       }, debounce || 150);
//     }
//   }
// }
'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}!function($){/**
 * Sticky module.
 * @module foundation.sticky
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */var Sticky=function(){/**
   * Creates a new instance of a sticky thing.
   * @class
   * @param {jQuery} element - jQuery object to make sticky.
   * @param {Object} options - options object passed when creating the element programmatically.
   */function Sticky(element,options){_classCallCheck(this,Sticky);this.$element=element;this.options=$.extend({},Sticky.defaults,this.$element.data(),options);this._init();Foundation.registerPlugin(this,'Sticky');}/**
   * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
   * @function
   * @private
   */_createClass(Sticky,[{key:'_init',value:function _init(){var $parent=this.$element.parent('[data-sticky-container]'),id=this.$element[0].id||Foundation.GetYoDigits(6,'sticky'),_this=this;if(!$parent.length){this.wasWrapped=true;}this.$container=$parent.length?$parent:$(this.options.container).wrapInner(this.$element);this.$container.addClass(this.options.containerClass);this.$element.addClass(this.options.stickyClass).attr({'data-resize':id});this.scrollCount=this.options.checkEvery;this.isStuck=false;$(window).one('load.zf.sticky',function(){if(_this.options.anchor!==''){_this.$anchor=$('#'+_this.options.anchor);}else{_this._parsePoints();}_this._setSizes(function(){_this._calc(false);});_this._events(id.split('-').reverse().join('-'));});}/**
   * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
   * @function
   * @private
   */},{key:'_parsePoints',value:function _parsePoints(){var top=this.options.topAnchor==""?1:this.options.topAnchor,btm=this.options.btmAnchor==""?document.documentElement.scrollHeight:this.options.btmAnchor,pts=[top,btm],breaks={};for(var i=0,len=pts.length;i<len&&pts[i];i++){var pt;if(typeof pts[i]==='number'){pt=pts[i];}else{var place=pts[i].split(':'),anchor=$('#'+place[0]);pt=anchor.offset().top;if(place[1]&&place[1].toLowerCase()==='bottom'){pt+=anchor[0].getBoundingClientRect().height;}}breaks[i]=pt;}this.points=breaks;return;}/**
   * Adds event handlers for the scrolling element.
   * @private
   * @param {String} id - psuedo-random id for unique scroll event listener.
   */},{key:'_events',value:function _events(id){var _this=this,scrollListener=this.scrollListener='scroll.zf.'+id;if(this.isOn){return;}if(this.canStick){this.isOn=true;$(window).off(scrollListener).on(scrollListener,function(e){if(_this.scrollCount===0){_this.scrollCount=_this.options.checkEvery;_this._setSizes(function(){_this._calc(false,window.pageYOffset);});}else{_this.scrollCount--;_this._calc(false,window.pageYOffset);}});}this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger',function(e,el){_this._setSizes(function(){_this._calc(false);if(_this.canStick){if(!_this.isOn){_this._events(id);}}else if(_this.isOn){_this._pauseListeners(scrollListener);}});});}/**
   * Removes event handlers for scroll and change events on anchor.
   * @fires Sticky#pause
   * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
   */},{key:'_pauseListeners',value:function _pauseListeners(scrollListener){this.isOn=false;$(window).off(scrollListener);/**
     * Fires when the plugin is paused due to resize event shrinking the view.
     * @event Sticky#pause
     * @private
     */this.$element.trigger('pause.zf.sticky');}/**
   * Called on every `scroll` event and on `_init`
   * fires functions based on booleans and cached values
   * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
   * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
   */},{key:'_calc',value:function _calc(checkSizes,scroll){if(checkSizes){this._setSizes();}if(!this.canStick){if(this.isStuck){this._removeSticky(true);}return false;}if(!scroll){scroll=window.pageYOffset;}if(scroll>=this.topPoint){if(scroll<=this.bottomPoint){if(!this.isStuck){this._setSticky();}}else{if(this.isStuck){this._removeSticky(false);}}}else{if(this.isStuck){this._removeSticky(true);}}}/**
   * Causes the $element to become stuck.
   * Adds `position: fixed;`, and helper classes.
   * @fires Sticky#stuckto
   * @function
   * @private
   */},{key:'_setSticky',value:function _setSticky(){var _this=this,stickTo=this.options.stickTo,mrgn=stickTo==='top'?'marginTop':'marginBottom',notStuckTo=stickTo==='top'?'bottom':'top',css={};css[mrgn]=this.options[mrgn]+'em';css[stickTo]=0;css[notStuckTo]='auto';css['left']=this.$container.offset().left+parseInt(window.getComputedStyle(this.$container[0])["padding-left"],10);this.isStuck=true;this.$element.removeClass('is-anchored is-at-'+notStuckTo).addClass('is-stuck is-at-'+stickTo).css(css)/**
                  * Fires when the $element has become `position: fixed;`
                  * Namespaced to `top` or `bottom`, e.g. `sticky.zf.stuckto:top`
                  * @event Sticky#stuckto
                  */.trigger('sticky.zf.stuckto:'+stickTo);this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){_this._setSizes();});}/**
   * Causes the $element to become unstuck.
   * Removes `position: fixed;`, and helper classes.
   * Adds other helper classes.
   * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
   * @fires Sticky#unstuckfrom
   * @private
   */},{key:'_removeSticky',value:function _removeSticky(isTop){var stickTo=this.options.stickTo,stickToTop=stickTo==='top',css={},anchorPt=(this.points?this.points[1]-this.points[0]:this.anchorHeight)-this.elemHeight,mrgn=stickToTop?'marginTop':'marginBottom',notStuckTo=stickToTop?'bottom':'top',topOrBottom=isTop?'top':'bottom';css[mrgn]=0;css['bottom']='auto';if(isTop){css['top']=0;}else{css['top']=anchorPt;}css['left']='';this.isStuck=false;this.$element.removeClass('is-stuck is-at-'+stickTo).addClass('is-anchored is-at-'+topOrBottom).css(css)/**
                  * Fires when the $element has become anchored.
                  * Namespaced to `top` or `bottom`, e.g. `sticky.zf.unstuckfrom:bottom`
                  * @event Sticky#unstuckfrom
                  */.trigger('sticky.zf.unstuckfrom:'+topOrBottom);}/**
   * Sets the $element and $container sizes for plugin.
   * Calls `_setBreakPoints`.
   * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
   * @private
   */},{key:'_setSizes',value:function _setSizes(cb){this.canStick=Foundation.MediaQuery.atLeast(this.options.stickyOn);if(!this.canStick){cb();}var _this=this,newElemWidth=this.$container[0].getBoundingClientRect().width,comp=window.getComputedStyle(this.$container[0]),pdng=parseInt(comp['padding-right'],10);if(this.$anchor&&this.$anchor.length){this.anchorHeight=this.$anchor[0].getBoundingClientRect().height;}else{this._parsePoints();}this.$element.css({'max-width':newElemWidth-pdng+'px'});var newContainerHeight=this.$element[0].getBoundingClientRect().height||this.containerHeight;if(this.$element.css("display")=="none"){newContainerHeight=0;}this.containerHeight=newContainerHeight;this.$container.css({height:newContainerHeight});this.elemHeight=newContainerHeight;if(this.isStuck){this.$element.css({"left":this.$container.offset().left+parseInt(comp['padding-left'],10)});}this._setBreakPoints(newContainerHeight,function(){if(cb){cb();}});}/**
   * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
   * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
   * @param {Function} cb - optional callback function to be called on completion.
   * @private
   */},{key:'_setBreakPoints',value:function _setBreakPoints(elemHeight,cb){if(!this.canStick){if(cb){cb();}else{return false;}}var mTop=emCalc(this.options.marginTop),mBtm=emCalc(this.options.marginBottom),topPoint=this.points?this.points[0]:this.$anchor.offset().top,bottomPoint=this.points?this.points[1]:topPoint+this.anchorHeight,// topPoint = this.$anchor.offset().top || this.points[0],
// bottomPoint = topPoint + this.anchorHeight || this.points[1],
winHeight=window.innerHeight;if(this.options.stickTo==='top'){topPoint-=mTop;bottomPoint-=elemHeight+mTop;}else if(this.options.stickTo==='bottom'){topPoint-=winHeight-(elemHeight+mBtm);bottomPoint-=winHeight-mBtm;}else{//this would be the stickTo: both option... tricky
}this.topPoint=topPoint;this.bottomPoint=bottomPoint;if(cb){cb();}}/**
   * Destroys the current sticky element.
   * Resets the element to the top position first.
   * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
   * @function
   */},{key:'destroy',value:function destroy(){this._removeSticky(true);this.$element.removeClass(this.options.stickyClass+' is-anchored is-at-top').css({height:'',top:'',bottom:'','max-width':''}).off('resizeme.zf.trigger');if(this.$anchor&&this.$anchor.length){this.$anchor.off('change.zf.sticky');}$(window).off(this.scrollListener);if(this.wasWrapped){this.$element.unwrap();}else{this.$container.removeClass(this.options.containerClass).css({height:''});}Foundation.unregisterPlugin(this);}}]);return Sticky;}();Sticky.defaults={/**
   * Customizable container template. Add your own classes for styling and sizing.
   * @option
   * @example '&lt;div data-sticky-container class="small-6 columns"&gt;&lt;/div&gt;'
   */container:'<div data-sticky-container></div>',/**
   * Location in the view the element sticks to.
   * @option
   * @example 'top'
   */stickTo:'top',/**
   * If anchored to a single element, the id of that element.
   * @option
   * @example 'exampleId'
   */anchor:'',/**
   * If using more than one element as anchor points, the id of the top anchor.
   * @option
   * @example 'exampleId:top'
   */topAnchor:'',/**
   * If using more than one element as anchor points, the id of the bottom anchor.
   * @option
   * @example 'exampleId:bottom'
   */btmAnchor:'',/**
   * Margin, in `em`'s to apply to the top of the element when it becomes sticky.
   * @option
   * @example 1
   */marginTop:1,/**
   * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.
   * @option
   * @example 1
   */marginBottom:1,/**
   * Breakpoint string that is the minimum screen size an element should become sticky.
   * @option
   * @example 'medium'
   */stickyOn:'medium',/**
   * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.
   * @option
   * @example 'sticky'
   */stickyClass:'sticky',/**
   * Class applied to sticky container. Foundation defaults to `sticky-container`.
   * @option
   * @example 'sticky-container'
   */containerClass:'sticky-container',/**
   * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.
   * @option
   * @example 50
   */checkEvery:-1};/**
 * Helper function to calculate em values
 * @param Number {em} - number of em's to calculate into pixels
 */function emCalc(em){return parseInt(window.getComputedStyle(document.body,null).fontSize,10)*em;}// Window exports
Foundation.plugin(Sticky,'Sticky');}(jQuery);
'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}!function($){/**
 * Toggler module.
 * @module foundation.toggler
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 */var Toggler=function(){/**
   * Creates a new instance of Toggler.
   * @class
   * @fires Toggler#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */function Toggler(element,options){_classCallCheck(this,Toggler);this.$element=element;this.options=$.extend({},Toggler.defaults,element.data(),options);this.className='';this._init();this._events();Foundation.registerPlugin(this,'Toggler');}/**
   * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
   * @function
   * @private
   */_createClass(Toggler,[{key:'_init',value:function _init(){var input;// Parse animation classes if they were set
if(this.options.animate){input=this.options.animate.split(' ');this.animationIn=input[0];this.animationOut=input[1]||null;}// Otherwise, parse toggle class
else{input=this.$element.data('toggler');// Allow for a . at the beginning of the string
this.className=input[0]==='.'?input.slice(1):input;}// Add ARIA attributes to triggers
var id=this.$element[0].id;$('[data-open="'+id+'"], [data-close="'+id+'"], [data-toggle="'+id+'"]').attr('aria-controls',id);// If the target is hidden, add aria-hidden
this.$element.attr('aria-expanded',this.$element.is(':hidden')?false:true);}/**
   * Initializes events for the toggle trigger.
   * @function
   * @private
   */},{key:'_events',value:function _events(){this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger',this.toggle.bind(this));}/**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */},{key:'toggle',value:function toggle(){this[this.options.animate?'_toggleAnimate':'_toggleClass']();}},{key:'_toggleClass',value:function _toggleClass(){this.$element.toggleClass(this.className);var isOn=this.$element.hasClass(this.className);if(isOn){/**
       * Fires if the target element has the class after a toggle.
       * @event Toggler#on
       */this.$element.trigger('on.zf.toggler');}else{/**
       * Fires if the target element does not have the class after a toggle.
       * @event Toggler#off
       */this.$element.trigger('off.zf.toggler');}this._updateARIA(isOn);}},{key:'_toggleAnimate',value:function _toggleAnimate(){var _this=this;if(this.$element.is(':hidden')){Foundation.Motion.animateIn(this.$element,this.animationIn,function(){_this._updateARIA(true);this.trigger('on.zf.toggler');});}else{Foundation.Motion.animateOut(this.$element,this.animationOut,function(){_this._updateARIA(false);this.trigger('off.zf.toggler');});}}},{key:'_updateARIA',value:function _updateARIA(isOn){this.$element.attr('aria-expanded',isOn?true:false);}/**
   * Destroys the instance of Toggler on the element.
   * @function
   */},{key:'destroy',value:function destroy(){this.$element.off('.zf.toggler');Foundation.unregisterPlugin(this);}}]);return Toggler;}();Toggler.defaults={/**
   * Tells the plugin if the element should animated when toggled.
   * @option
   * @example false
   */animate:false};// Window exports
Foundation.plugin(Toggler,'Toggler');}(jQuery);
// /**
//  * File navigation.js.
//  *
//  * Handles toggling the navigation menu for small screens and enables TAB key
//  * navigation support for dropdown menus.
//  */
// ( function() {
// 	var container, button, menu, links, subMenus, i, len;
//
// 	container = document.getElementById( 'site-navigation' );
// 	if ( ! container ) {
// 		return;
// 	}
//
// 	button = container.getElementsByTagName( 'button' )[0];
// 	if ( 'undefined' === typeof button ) {
// 		return;
// 	}
//
// 	menu = container.getElementsByTagName( 'ul' )[0];
//
// 	// Hide menu toggle button if menu is empty and return early.
// 	if ( 'undefined' === typeof menu ) {
// 		button.style.display = 'none';
// 		return;
// 	}
//
// 	menu.setAttribute( 'aria-expanded', 'false' );
// 	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
// 		menu.className += ' nav-menu';
// 	}
//
// 	button.onclick = function() {
// 		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
// 			container.className = container.className.replace( ' toggled', '' );
// 			button.setAttribute( 'aria-expanded', 'false' );
// 			menu.setAttribute( 'aria-expanded', 'false' );
// 		} else {
// 			container.className += ' toggled';
// 			button.setAttribute( 'aria-expanded', 'true' );
// 			menu.setAttribute( 'aria-expanded', 'true' );
// 		}
// 	};
//
// 	// Get all the link elements within the menu.
// 	links    = menu.getElementsByTagName( 'a' );
// 	subMenus = menu.getElementsByTagName( 'ul' );
//
// 	// Set menu items with submenus to aria-haspopup="true".
// 	for ( i = 0, len = subMenus.length; i < len; i++ ) {
// 		subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
// 	}
//
// 	// Each time a menu link is focused or blurred, toggle focus.
// 	for ( i = 0, len = links.length; i < len; i++ ) {
// 		links[i].addEventListener( 'focus', toggleFocus, true );
// 		links[i].addEventListener( 'blur', toggleFocus, true );
// 	}
//
// 	/**
// 	 * Sets or removes .focus class on an element.
// 	 */
// 	function toggleFocus() {
// 		var self = this;
//
// 		// Move up through the ancestors of the current link until we hit .nav-menu.
// 		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {
//
// 			// On li elements toggle the class .focus.
// 			if ( 'li' === self.tagName.toLowerCase() ) {
// 				if ( -1 !== self.className.indexOf( 'focus' ) ) {
// 					self.className = self.className.replace( ' focus', '' );
// 				} else {
// 					self.className += ' focus';
// 				}
// 			}
//
// 			self = self.parentElement;
// 		}
// 	}
// } )();
"use strict";
'use strict';/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */(function(){var isWebkit=navigator.userAgent.toLowerCase().indexOf('webkit')>-1,isOpera=navigator.userAgent.toLowerCase().indexOf('opera')>-1,isIe=navigator.userAgent.toLowerCase().indexOf('msie')>-1;if((isWebkit||isOpera||isIe)&&document.getElementById&&window.addEventListener){window.addEventListener('hashchange',function(){var id=location.hash.substring(1),element;if(!/^[A-z0-9_-]+$/.test(id)){return;}element=document.getElementById(id);if(element){if(!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)){element.tabIndex=-1;}element.focus();}},false);}})();
'use strict';jQuery(document).ready(function($){$(document).foundation();Foundation.Motion.animateIn($('.hero__animation-control'),'animate',function(){this.addClass('done');});var stickyHeader=$('.sticky-header');$(window).on('scroll',Foundation.util.throttle(function(e){console.log('scroll');if($(window).scrollTop()>100&&!stickyHeader.hasClass('is-stuck')){stickyHeader.addClass('is-stuck');}else if($(window).scrollTop()<100&&stickyHeader.hasClass('is-stuck')){stickyHeader.removeClass('is-stuck');}},200));});